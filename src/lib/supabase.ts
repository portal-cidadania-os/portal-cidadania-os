import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Erro Crítico: Variáveis de ambiente do Supabase ausentes no .env.local");
}

// createBrowserClient (SSR) armazena a sessão em cookies,
// permitindo que o middleware server-side leia a autenticação.
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
