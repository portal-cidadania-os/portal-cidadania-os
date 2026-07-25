import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

// GET /api/faq?q=texto&categoria=geral&modulo=sorria-com-cristo
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q         = searchParams.get("q")?.trim() ?? "";
  const categoria = searchParams.get("categoria") ?? "";
  const modulo    = searchParams.get("modulo") ?? "";

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  let query = supabase
    .from("faq_items")
    .select("id, pergunta, resposta, categoria, modulo, ordem")
    .eq("ativo", true)
    .order("ordem", { ascending: true })
    .limit(12);

  // Filtro por categoria
  if (categoria && categoria !== "todos") {
    query = query.eq("categoria", categoria);
  }

  // Filtro por módulo (núcleo específico)
  if (modulo) {
    query = query.or(`modulo.eq.${modulo},modulo.is.null`);
  }

  // Full-text search se houver texto
  if (q.length >= 2) {
    query = query.textSearch("busca_ts", q, {
      type: "websearch",
      config: "portuguese",
    });
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ items: data ?? [] });
}
