# Convenção de Migrations — Portal Cidadania OS (CERPI)

## Regra de ouro

**Todo SQL que você for rodar no Supabase vira um arquivo aqui antes de rodar no dashboard.**

Nunca rode SQL diretamente no dashboard sem antes criar o arquivo de migration correspondente.

## Nomenclatura

```
NNN_descricao_curta.sql
```

Exemplos:
```
001_schema_inicial.sql
002_add_campo_foto_pessoas.sql
003_add_tabela_agendamentos_saude.sql
004_index_matriculas_nucleo.sql
```

- `NNN` = número sequencial com 3 dígitos (001, 002, 003...)
- `descricao_curta` = snake_case, máximo 5 palavras, sem acentos

## Fluxo obrigatório

```
1. Você decide que precisa de uma mudança no banco
2. Cria o arquivo SQL aqui: supabase/migrations/NNN_descricao.sql
3. git add + git commit (o arquivo vai para o GitHub)
4. Roda no Supabase STAGING (SQL Editor ou psql)
5. Testa — funciona?
6. Roda no Supabase PRODUCAO
7. Atualiza o cabeçalho do arquivo com as datas de aplicação
```

## Cabeçalho padrão de cada arquivo

```sql
-- ============================================================
-- Migration NNN — Descrição
-- Portal Cidadania OS (CERPI)
-- Criado em: YYYY-MM-DD
-- Aplicado em staging:   YYYY-MM-DD
-- Aplicado em producao:  YYYY-MM-DD (ou: pendente)
-- ============================================================
```

## Por que isso importa

Se a máquina local pegar fogo, o GitHub tem o histórico completo de tudo
que foi aplicado no banco — em que ordem, em que data. Para recriar o banco
do zero: aplique as migrations em ordem (001, 002, 003...) e tudo volta.

Sem migrations versionadas, a única forma de saber o que está no banco
é olhar para o banco — e se o banco morrer, você perdeu.

## Histórico

| # | Arquivo | Staging | Produção |
|---|---|---|---|
| 001 | schema_inicial | pendente | pendente |
