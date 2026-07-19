/**
 * Script de importação em massa — CSV → Supabase
 * Portal Cidadania OS · CERPI
 *
 * Importa cadastros de pessoas a partir de um arquivo CSV para as
 * tabelas `pessoas` e `matriculas` do Supabase.
 *
 * Colunas esperadas no CSV (case-insensitive, ordem livre):
 *   nome, cpf, data_nascimento, telefone, email,
 *   endereco, bairro, cidade, estado, cep,
 *   nucleo  ← nome do núcleo (ex: "empregabilidade", "esporte")
 *
 * Colunas opcionais:
 *   genero, nome_responsavel, telefone_responsavel, observacao
 *
 * Como executar:
 *   npx tsx scripts/import-pessoas.ts --arquivo cadastros.csv
 *   npx tsx scripts/import-pessoas.ts --arquivo cadastros.csv --dry-run
 *   npx tsx scripts/import-pessoas.ts --arquivo cadastros.csv --nucleo empregabilidade
 *
 * Dependências (instalar uma vez):
 *   npm install tsx papaparse @supabase/supabase-js --save-dev
 *   npm install --save-dev @types/papaparse
 */

import * as fs   from "fs";
import * as path from "path";
import Papa      from "papaparse";
import { createClient } from "@supabase/supabase-js";

// ── Lê argumentos CLI ─────────────────────────────────────────────────────────

const args    = process.argv.slice(2);
const getArg  = (flag: string) => { const i = args.indexOf(flag); return i !== -1 ? args[i + 1] : undefined; };
const hasFlag = (flag: string) => args.includes(flag);

const CSV_FILE   = getArg("--arquivo") ?? getArg("-a");
const DRY_RUN    = hasFlag("--dry-run") || hasFlag("-n");
const NUCLEO_ARG = getArg("--nucleo");   // sobrescreve coluna nucleo do CSV (opcional)

if (!CSV_FILE) {
  console.error("❌  Informe o arquivo CSV: --arquivo <caminho>");
  console.error("    Exemplo: npx tsx scripts/import-pessoas.ts --arquivo cadastros.csv");
  process.exit(1);
}

if (!fs.existsSync(CSV_FILE)) {
  console.error(`❌  Arquivo não encontrado: ${CSV_FILE}`);
  process.exit(1);
}

// ── Carrega .env.local automaticamente ───────────────────────────────────────

const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = val;
  }
  console.log("✅  .env.local carregado.");
}

// ── Configuração Supabase ─────────────────────────────────────────────────────

const SUPABASE_URL  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_KEY   = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("❌  Variáveis NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY não encontradas.");
  console.error("    Certifique-se de que .env.local existe na raiz do projeto.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

// ── Tipos ─────────────────────────────────────────────────────────────────────

interface CsvRow {
  nome?:                string;
  cpf?:                 string;
  data_nascimento?:     string;
  telefone?:            string;
  email?:               string;
  endereco?:            string;
  bairro?:              string;
  cidade?:              string;
  estado?:              string;
  cep?:                 string;
  genero?:              string;
  nome_responsavel?:    string;
  telefone_responsavel?: string;
  observacao?:          string;
  nucleo?:              string;
  [key: string]:        string | undefined;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Remove tudo que não for dígito do CPF e garante 11 chars */
function normalizeCpf(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  return digits.length === 11 ? digits : null;
}

/** Normaliza data para formato ISO (YYYY-MM-DD) */
function normalizeDate(raw: string): string | null {
  if (!raw) return null;
  // Aceita DD/MM/YYYY ou YYYY-MM-DD
  const ddmmyyyy = raw.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (ddmmyyyy) return `${ddmmyyyy[3]}-${ddmmyyyy[2]}-${ddmmyyyy[1]}`;
  const iso = raw.match(/^\d{4}-\d{2}-\d{2}$/);
  if (iso) return raw;
  return null;
}

/** Normaliza telefone: mantém apenas dígitos */
function normalizeTelefone(raw: string): string | null {
  if (!raw) return null;
  const digits = raw.replace(/\D/g, "");
  return digits.length >= 10 ? digits : null;
}

/** Lowercase + trim de todas as chaves do CSV */
function normalizeRow(row: Record<string, string>): CsvRow {
  const out: CsvRow = {};
  for (const [k, v] of Object.entries(row)) {
    out[k.toLowerCase().trim()] = v?.trim() ?? "";
  }
  return out;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ── Contadores ────────────────────────────────────────────────────────────────

let totalLinhas   = 0;
let importadas    = 0;
let atualizadas   = 0;
let erros         = 0;
let puladas       = 0;

// ── Import principal ──────────────────────────────────────────────────────────

async function importRow(row: CsvRow, lineNumber: number): Promise<void> {
  const nome = row.nome?.trim();
  const cpfRaw = row.cpf ?? "";
  const cpf    = normalizeCpf(cpfRaw);
  const nucleo = (NUCLEO_ARG ?? row.nucleo ?? "").toLowerCase().trim();

  if (!nome) {
    console.warn(`  ⚠️  Linha ${lineNumber}: nome vazio. Pulando.`);
    puladas++;
    return;
  }

  if (!cpf) {
    console.warn(`  ⚠️  Linha ${lineNumber} (${nome}): CPF inválido "${cpfRaw}". Pulando.`);
    puladas++;
    return;
  }

  const pessoaPayload = {
    nome,
    cpf,
    data_nascimento:      normalizeDate(row.data_nascimento ?? ""),
    telefone:             normalizeTelefone(row.telefone ?? ""),
    email:                row.email || null,
    endereco:             row.endereco || null,
    bairro:               row.bairro || null,
    cidade:               row.cidade || "Piracicaba",
    estado:               row.estado || "SP",
    cep:                  row.cep?.replace(/\D/g, "") || null,
    genero:               row.genero || null,
    nome_responsavel:     row.nome_responsavel || null,
    telefone_responsavel: normalizeTelefone(row.telefone_responsavel ?? "") || null,
    observacao:           row.observacao || null,
  };

  if (DRY_RUN) {
    console.log(`  [DRY-RUN] Linha ${lineNumber}: ${nome} (CPF ${cpf}) → nucleo="${nucleo}"`);
    importadas++;
    return;
  }

  // Upsert na tabela pessoas (conflito em CPF)
  const { data: pessoaRow, error: pessoaErr } = await supabase
    .from("pessoas")
    .upsert(pessoaPayload, { onConflict: "cpf" })
    .select("id, created_at, updated_at")
    .single();

  if (pessoaErr || !pessoaRow) {
    console.error(`  ❌  Linha ${lineNumber} (${nome}): erro ao salvar pessoa — ${pessoaErr?.message}`);
    erros++;
    return;
  }

  const isNovo = pessoaRow.created_at === pessoaRow.updated_at;
  if (isNovo) importadas++; else atualizadas++;

  // Matrícula no núcleo (se informado)
  if (nucleo) {
    const { error: matErr } = await supabase
      .from("matriculas")
      .upsert(
        { pessoa_id: pessoaRow.id, nucleo, status: "ativo" },
        { onConflict: "pessoa_id,nucleo" }
      );

    if (matErr) {
      console.warn(`  ⚠️  Linha ${lineNumber} (${nome}): matrícula no núcleo "${nucleo}" falhou — ${matErr.message}`);
    } else {
      console.log(`  ✅  Linha ${lineNumber}: ${nome} → nucleo="${nucleo}" ${isNovo ? "(novo)" : "(atualizado)"}`);
    }
  } else {
    console.log(`  ✅  Linha ${lineNumber}: ${nome} ${isNovo ? "(novo)" : "(atualizado)"} — sem núcleo definido`);
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log("🚀  Import Pessoas — Portal Cidadania OS (CERPI)");
  console.log(`    Arquivo:    ${CSV_FILE}`);
  console.log(`    Supabase:   ${SUPABASE_URL}`);
  if (NUCLEO_ARG) console.log(`    Núcleo:     ${NUCLEO_ARG} (forçado via CLI)`);
  if (DRY_RUN)    console.log("    [DRY-RUN]   Nenhum dado será gravado no banco.");
  console.log("");

  // Lê e parseia o CSV
  const csvContent = fs.readFileSync(CSV_FILE, "utf-8");
  const { data, errors: parseErrors } = Papa.parse<Record<string, string>>(csvContent, {
    header:        true,
    skipEmptyLines: true,
    encoding:      "UTF-8",
  });

  if (parseErrors.length > 0) {
    console.warn(`⚠️  ${parseErrors.length} erro(s) de parsing no CSV:`);
    parseErrors.forEach((e) => console.warn(`   Linha ${e.row}: ${e.message}`));
  }

  totalLinhas = data.length;
  console.log(`📋  ${totalLinhas} linha(s) encontrada(s) no CSV.\n`);

  for (let i = 0; i < data.length; i++) {
    const row = normalizeRow(data[i]);
    await importRow(row, i + 2); // +2 porque linha 1 é o header
    await sleep(150); // throttle gentil com o Supabase
  }

  // ── Resumo ────────────────────────────────────────────────────────────────
  console.log("\n" + "=".repeat(50));
  console.log("  RESUMO DA IMPORTAÇÃO");
  console.log("=".repeat(50));
  console.log(`  Total de linhas:  ${totalLinhas}`);
  console.log(`  Novas pessoas:    ${importadas}`);
  console.log(`  Atualizadas:      ${atualizadas}`);
  console.log(`  Puladas:          ${puladas}`);
  console.log(`  Erros:            ${erros}`);
  if (DRY_RUN) console.log("\n  [DRY-RUN] Nenhum dado foi gravado.");
  console.log("=".repeat(50));

  if (erros > 0) {
    console.error(`\n❌  Importação concluída com ${erros} erro(s).`);
    process.exit(1);
  } else {
    console.log("\n🎉  Importação concluída com sucesso!");
  }
}

main().catch((e) => {
  console.error("Erro fatal:", e);
  process.exit(1);
});
