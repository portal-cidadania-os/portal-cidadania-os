-- ============================================================
-- CERPI — Criação do usuário administrador
-- Execute no Supabase Dashboard → SQL Editor
-- Projeto: portal-cidadania-os-staging
-- ============================================================

-- 1. Criar o usuário admin@cerpi.com.br
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@cerpi.com.br',
  crypt('@Cerpi748596#', gen_salt('bf')),
  NOW(),
  '{"provider": "email", "providers": ["email"], "role": "admin"}'::jsonb,
  '{"role": "admin", "nome_completo": "Administrador CERPI"}'::jsonb,
  NOW(),
  NOW(),
  '', '', '', ''
)
ON CONFLICT (email) DO UPDATE
  SET raw_app_meta_data = EXCLUDED.raw_app_meta_data,
      raw_user_meta_data = EXCLUDED.raw_user_meta_data;

-- 2. Criar tabela de perfis com controle de acesso
CREATE TABLE IF NOT EXISTS public.profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role          TEXT NOT NULL DEFAULT 'user'
                  CHECK (role IN ('admin', 'staff', 'user')),
  nome_completo TEXT,
  nucleo        TEXT,
  ativo         BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Usuário vê apenas o próprio perfil; admin vê todos
CREATE POLICY "profiles_self" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_admin_all" ON public.profiles
  FOR ALL USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

-- 3. Trigger para criar perfil automaticamente ao cadastrar
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (id, role, nome_completo)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_app_meta_data->>'role', 'user'),
    NEW.raw_user_meta_data->>'nome_completo'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. Inserir/atualizar perfil do admin
INSERT INTO public.profiles (id, role, nome_completo)
SELECT id, 'admin', 'Administrador CERPI'
FROM auth.users WHERE email = 'admin@cerpi.com.br'
ON CONFLICT (id) DO UPDATE SET role = 'admin';

-- Resultado: confirmar criação
SELECT id, email, email_confirmed_at,
       raw_app_meta_data->>'role' AS app_role
FROM auth.users WHERE email = 'admin@cerpi.com.br';
