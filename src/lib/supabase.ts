import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Erro Crítico: Variáveis de ambiente do Supabase ausentes no .env.local");
}

// Inicialização do cliente único para chamadas ao banco e autenticação
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
