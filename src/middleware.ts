import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ============================================================
// Portal Cidadania OS — Middleware de Proteção de Rotas
// Protege rotas autenticadas via Supabase SSR (server-side).
// Substitui o redirect client-side com window.location.href
// ============================================================

// Rotas que exigem autenticação
const ROTAS_PROTEGIDAS = ["/portal", "/minha-conta", "/inscricoes"];

// Rotas que NÃO devem ser acessíveis se já estiver logado
const ROTAS_PUBLICAS_SOMENTE = ["/entrar"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Verifica se é uma rota protegida
  const rotaProtegida = ROTAS_PROTEGIDAS.some((rota) =>
    pathname.startsWith(rota)
  );
  const rotaPublicaSomente = ROTAS_PUBLICAS_SOMENTE.some((rota) =>
    pathname.startsWith(rota)
  );

  // Se não é nenhuma das rotas gerenciadas, deixa passar
  if (!rotaProtegida && !rotaPublicaSomente) {
    return NextResponse.next();
  }

  // Cria cliente Supabase com cookies do request/response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options ?? {})
          );
        },
      },
    }
  );

  // Busca a sessão atual (atualiza tokens expirados automaticamente)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Rota protegida + sem sessão → redireciona para /entrar
  if (rotaProtegida && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/entrar";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // Rota de login + já autenticado → redireciona para /portal
  if (rotaPublicaSomente && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/portal";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    // Exclui arquivos estáticos e APIs internas do Next.js
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
