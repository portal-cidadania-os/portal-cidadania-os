# Portal Cidadania OS — CERPI

**Centro Restaurando Cidadania Piracicaba** — portal institucional e de serviços sociais.

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 14 (App Router) |
| Linguagem | TypeScript 5 |
| Estilo | Tailwind CSS 3 |
| Banco / Auth | Supabase (sa-east-1) |
| Cliente Supabase | `@supabase/ssr` (createBrowserClient) |
| Deploy | Vercel |

---

## Setup local

### Pré-requisitos

- Node.js 18+
- npm 9+

### 1. Clonar e instalar

```bash
git clone <url-do-repo>
cd portal-cidadania-os
npm install
```

### 2. Configurar variáveis de ambiente

```bash
cp .env.example .env.local
```

Edite `.env.local` com os valores reais do Supabase Dashboard:

- **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- **anon key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`
- **Connection string (URI)** → `PORTAL_CIDADANIA_SUPABASE_DB_URL`

> `.env.local` está no `.gitignore` e **nunca** deve ser commitado.

### 3. Rodar em desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:3000`.

### 4. Build de produção

```bash
npm run build
npm start
```

---

## Autenticação e papéis

- Autenticação via Supabase Auth (e-mail + senha).
- Papel de admin: `app_metadata.role = "admin"` (definido no Dashboard → Authentication → Users).
- Após login, usuários comuns são redirecionados para `/portal`; admins para `/admin`.

---

## Banco de dados (Supabase)

### Migrações

As migrações ficam em `supabase/migrations/` (quando criadas via Supabase CLI).

Para aplicar localmente:

```bash
npx supabase db push --db-url "$PORTAL_CIDADANIA_SUPABASE_DB_URL"
```

> **Atenção LGPD:** o banco contém dados pessoais de cidadãos. Dumps (`*.dump`, `*.sql.gz`) estão no `.gitignore` e **nunca** devem ser versionados.

### Tabelas principais

| Tabela | Descrição |
|--------|-----------|
| `faq_items` | Perguntas frequentes (FAQ chatbot) |

---

## Variáveis de ambiente

Consulte [`.env.example`](.env.example) para a lista completa de variáveis necessárias.

---

## Workflow de branches

| Branch | Uso |
|--------|-----|
| `main` | Produção (deploy automático via Vercel) |
| `develop` | Desenvolvimento principal |
| `chore/*`, `feat/*`, `fix/*` | Branches de trabalho |

Nunca commitar diretamente na `main`. Abrir PR de `develop` → `main` após revisão.

---

## Scripts disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Build de produção
npm start        # Inicia servidor de produção
npm run lint     # Lint (ESLint via Next.js)
```
