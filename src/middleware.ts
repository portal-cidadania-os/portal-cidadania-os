import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ============================================================
// Portal Cidadania OS — Middleware de Proteção de Rotas
// Protege rotas autenticadas via Supabase SSR (server-side).
// Substitui o redirect client-side com window.location.href
// ============================================================

// Rotas que exigem autenticação (qualquer usuário logado)
const ROTAS_PROTEGIDAS = ["/portal", "/minha-conta", "/inscricoes"];

// Rotas que exigem autenticação + role admin
const ROTAS_ADMIN = ["/admin"];

// Rotas que NÃO devem ser acessíveis se já estiver logado
const ROTAS_PUBLICAS_SOMENTE = ["/entrar"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Verifica o tipo de rota
  const rotaAdmin        = ROTAS_ADMIN.some((r) => pathname.startsWith(r));
  const rotaProtegida    = ROTAS_PROTEGIDAS.some((r) => pathname.startsWith(r));
  const rotaPublicaSomente = ROTAS_PUBLICAS_SOMENTE.some((r) => pathname.startsWith(r));

  // Se não é nenhuma das rotas gerenciadas, deixa passar
  if (!rotaAdmin && !rotaProtegida && !rotaPublicaSomente) {
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

  // Sem sessão → redireciona para /entrar
  if ((rotaProtegida || rotaAdmin) && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/entrar";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // Extrai role uma vez
  const role = user?.app_metadata?.role as string | undefined;

  // Rota admin + sem role admin → redireciona para /portal
  if (rotaAdmin && user && role !== "admin") {
    const url = request.nextUrl.clone();
    url.pathname = "/portal";
    return NextResponse.redirect(url);
  }

  // Admin acessando /portal → redireciona para /admin
  if (rotaProtegida && user && role === "admin" && pathname.startsWith("/portal")) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  // Rota de login + já autenticado → redireciona conforme role
  if (rotaPublicaSomente && user) {
    const url = request.nextUrl.clone();
    url.pathname = role === "admin" ? "/admin" : "/portal";
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
