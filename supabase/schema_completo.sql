-- ============================================================
-- CERPI — Portal Cidadania OS
-- Schema completo do banco de dados Supabase
-- Execute no SQL Editor: https://supabase.com/dashboard/project/tqdekdtkyfkdxkfcqrjz/sql
-- ============================================================

-- ============================================================
-- 0. EXTENSÕES
-- ============================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- ============================================================
-- 1. TABELA CENTRAL: pessoas
-- Um único registro por CPF — compartilhado por todos os núcleos
-- ============================================================
CREATE TABLE IF NOT EXISTS public.pessoas (
  id                uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  cpf               text        UNIQUE NOT NULL,
  nome              text        NOT NULL,
  data_nascimento   date,
  genero            text,                          -- masculino, feminino, nao_binario, prefiro_nao_dizer
  whatsapp          text,
  email             text,
  bairro            text,
  cidade            text        DEFAULT 'Piracicaba',
  renda             text,                          -- ate_1sm, 1_3sm, acima_3sm
  escolaridade      text,                          -- fundamental, medio, superior, pos
  situacao_emprego  text,                          -- empregado, desempregado, autonomo, empresario
  created_at        timestamptz DEFAULT now(),
  updated_at        timestamptz DEFAULT now()
);

-- ============================================================
-- 2. MATRÍCULAS
-- Vínculo entre pessoa e núcleo — cada pessoa pode estar em vários núcleos
-- ============================================================
CREATE TABLE IF NOT EXISTS public.matriculas (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  pessoa_id       uuid        NOT NULL REFERENCES public.pessoas(id) ON DELETE CASCADE,
  nucleo          text        NOT NULL,            -- slug do núcleo (ex: "farmacia", "esporte")
  status          text        DEFAULT 'ativo',     -- ativo, concluido, suspenso, aguardando
  data_matricula  date        DEFAULT now(),
  observacoes     text,
  created_at      timestamptz DEFAULT now(),
  UNIQUE(pessoa_id, nucleo)
);


-- ============================================================
-- 3. FARMÁCIA SOLIDÁRIA
-- ============================================================

-- Catálogo de medicamentos
CREATE TABLE IF NOT EXISTS public.farmacia_remedios (
  id                uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  nome              text    NOT NULL,
  principio_ativo   text,
  tipo              text,                          -- comprimido, capsula, xarope, injetavel, pomada, outro
  unidade           text,                          -- mg, ml, mcg, UI
  necessita_receita boolean DEFAULT false,
  created_at        timestamptz DEFAULT now()
);

-- Estoque (entradas)
CREATE TABLE IF NOT EXISTS public.farmacia_estoque (
  id            uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  remedio_id    uuid    REFERENCES public.farmacia_remedios(id),
  quantidade    integer DEFAULT 0,
  lote          text,
  validade      date,
  origem        text,                              -- doacao, compra, programa_governo
  doador        text,
  data_entrada  date    DEFAULT now(),
  observacoes   text,
  created_at    timestamptz DEFAULT now()
);

-- Dispensação (saídas — quem recebeu o quê)
CREATE TABLE IF NOT EXISTS public.farmacia_atendimentos (
  id                  uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  pessoa_id           uuid    REFERENCES public.pessoas(id),
  remedio_id          uuid    REFERENCES public.farmacia_remedios(id),
  quantidade          integer NOT NULL,
  data_atendimento    date    DEFAULT now(),
  apresentou_receita  boolean DEFAULT false,
  cid                 text,                        -- código da doença (CID-10)
  atendente           text,
  observacoes         text,
  created_at          timestamptz DEFAULT now()
);


-- ============================================================
-- 4. SORRIA COM CRISTO — Odontologia
-- ============================================================

-- Prontuário odontológico
CREATE TABLE IF NOT EXISTS public.odonto_prontuarios (
  id                  uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  pessoa_id           uuid    NOT NULL REFERENCES public.pessoas(id) ON DELETE CASCADE,
  queixa_principal    text,
  historico_saude     text,
  alergias            text,
  medicamentos_em_uso text,
  dentista            text,
  data_abertura       date    DEFAULT now(),
  observacoes         text,
  created_at          timestamptz DEFAULT now()
);

-- Planos de tratamento
CREATE TABLE IF NOT EXISTS public.odonto_tratamentos (
  id                  uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  pessoa_id           uuid    REFERENCES public.pessoas(id),
  tipo                text,                        -- extracao, restauracao, profilaxia, canal, protese, clareamento
  descricao           text,
  status              text    DEFAULT 'planejado', -- planejado, em_andamento, concluido, cancelado
  sessoes_previstas   integer DEFAULT 1,
  sessoes_realizadas  integer DEFAULT 0,
  dentista            text,
  data_inicio         date    DEFAULT now(),
  data_conclusao      date,
  created_at          timestamptz DEFAULT now()
);

-- Consultas / sessões
CREATE TABLE IF NOT EXISTS public.odonto_consultas (
  id              uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  pessoa_id       uuid    REFERENCES public.pessoas(id),
  tratamento_id   uuid    REFERENCES public.odonto_tratamentos(id),
  data_consulta   date    NOT NULL,
  procedimento    text,
  dentista        text,
  compareceu      boolean DEFAULT true,
  observacoes     text,
  created_at      timestamptz DEFAULT now()
);


-- ============================================================
-- 5. MADUREIRA SAÚDE — Clínica (Medicina · Nutrição · Psicologia)
-- ============================================================

-- Prontuário clínico
CREATE TABLE IF NOT EXISTS public.saude_prontuarios (
  id                  uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  pessoa_id           uuid    NOT NULL REFERENCES public.pessoas(id) ON DELETE CASCADE,
  especialidade       text,                        -- clinica_geral, nutricao, psicologia
  anamnese            text,
  historico_familiar  text,
  alergias            text,
  medicamentos_em_uso text,
  profissional        text,
  data_abertura       date    DEFAULT now(),
  observacoes         text,
  created_at          timestamptz DEFAULT now()
);

-- Consultas
CREATE TABLE IF NOT EXISTS public.saude_consultas (
  id              uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  pessoa_id       uuid    REFERENCES public.pessoas(id),
  especialidade   text,
  profissional    text,
  data_consulta   date    NOT NULL,
  diagnostico     text,
  cid             text,
  prescricao      text,
  retorno         date,
  compareceu      boolean DEFAULT true,
  observacoes     text,
  created_at      timestamptz DEFAULT now()
);

-- Exames solicitados / resultados
CREATE TABLE IF NOT EXISTS public.saude_exames (
  id                  uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  pessoa_id           uuid    REFERENCES public.pessoas(id),
  tipo                text,
  solicitante         text,
  data_solicitacao    date    DEFAULT now(),
  data_realizacao     date,
  resultado           text,
  arquivo_url         text,
  created_at          timestamptz DEFAULT now()
);


-- ============================================================
-- 6. EMPREGABILIDADE — Vagas & Emprego
-- ============================================================

-- Empresas parceiras
CREATE TABLE IF NOT EXISTS public.emprego_empresas (
  id                uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  nome              text    NOT NULL,
  cnpj              text,
  setor             text,
  contato_nome      text,
  contato_telefone  text,
  contato_email     text,
  ativa             boolean DEFAULT true,
  created_at        timestamptz DEFAULT now()
);

-- Vagas disponíveis
CREATE TABLE IF NOT EXISTS public.emprego_vagas (
  id                  uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa_id          uuid    REFERENCES public.emprego_empresas(id),
  titulo              text    NOT NULL,
  descricao           text,
  requisitos          text,
  tipo                text    DEFAULT 'clt',       -- clt, pj, temporario, estagio, aprendiz
  salario_min         numeric,
  salario_max         numeric,
  cidade              text    DEFAULT 'Piracicaba',
  status              text    DEFAULT 'aberta',    -- aberta, encerrada, preenchida
  vagas_total         integer DEFAULT 1,
  vagas_preenchidas   integer DEFAULT 0,
  data_publicacao     date    DEFAULT now(),
  data_encerramento   date,
  created_at          timestamptz DEFAULT now()
);

-- Candidaturas
CREATE TABLE IF NOT EXISTS public.emprego_candidaturas (
  id                uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  pessoa_id         uuid    REFERENCES public.pessoas(id),
  vaga_id           uuid    REFERENCES public.emprego_vagas(id),
  status            text    DEFAULT 'enviada',     -- enviada, em_analise, aprovada, reprovada, contratada
  data_candidatura  date    DEFAULT now(),
  data_retorno      date,
  observacoes       text,
  created_at        timestamptz DEFAULT now(),
  UNIQUE(pessoa_id, vaga_id)
);


-- ============================================================
-- 7. CURSOS GRATUITOS
-- ============================================================

-- Catálogo de cursos
CREATE TABLE IF NOT EXISTS public.cursos_catalogo (
  id            uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  nome          text    NOT NULL,
  descricao     text,
  carga_horaria integer,
  modalidade    text    DEFAULT 'presencial',      -- presencial, online, hibrido
  instrutor     text,
  categoria     text,                              -- beleza, idiomas, tecnologia, empreendedorismo, saude, outro
  ativo         boolean DEFAULT true,
  created_at    timestamptz DEFAULT now()
);

-- Turmas de cada curso
CREATE TABLE IF NOT EXISTS public.cursos_turmas (
  id                  uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  curso_id            uuid    REFERENCES public.cursos_catalogo(id),
  codigo              text,
  data_inicio         date,
  data_fim            date,
  horario             text,
  local               text,
  vagas_total         integer DEFAULT 30,
  vagas_disponiveis   integer DEFAULT 30,
  status              text    DEFAULT 'aberta',    -- aberta, em_andamento, concluida, cancelada
  created_at          timestamptz DEFAULT now()
);

-- Inscrições
CREATE TABLE IF NOT EXISTS public.cursos_inscricoes (
  id                  uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  pessoa_id           uuid    REFERENCES public.pessoas(id),
  turma_id            uuid    REFERENCES public.cursos_turmas(id),
  status              text    DEFAULT 'inscrito',  -- inscrito, em_andamento, concluido, desistiu, reprovado
  nota_final          numeric,
  certificado_emitido boolean DEFAULT false,
  certificado_url     text,
  data_inscricao      date    DEFAULT now(),
  created_at          timestamptz DEFAULT now(),
  UNIQUE(pessoa_id, turma_id)
);

-- Presenças por aula
CREATE TABLE IF NOT EXISTS public.cursos_presencas (
  id          uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  pessoa_id   uuid    REFERENCES public.pessoas(id),
  turma_id    uuid    REFERENCES public.cursos_turmas(id),
  data_aula   date    NOT NULL,
  presente    boolean DEFAULT true,
  justificativa text,
  created_at  timestamptz DEFAULT now()
);


-- ============================================================
-- 8. NÚCLEO CRESCER — Empresários e Empreendedoras
-- ============================================================

-- Empresas cadastradas
CREATE TABLE IF NOT EXISTS public.crescer_empresas (
  id                  uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  pessoa_id           uuid    REFERENCES public.pessoas(id),
  nome_empresa        text    NOT NULL,
  cnpj                text,
  mei                 boolean DEFAULT false,
  setor               text,
  porte               text    DEFAULT 'micro',     -- micro, pequena, media
  tempo_atuacao       text,
  faturamento_mensal  text,
  principal_desafio   text,
  status              text    DEFAULT 'ativo',
  data_cadastro       date    DEFAULT now(),
  created_at          timestamptz DEFAULT now()
);

-- Sessões de mentoria
CREATE TABLE IF NOT EXISTS public.crescer_mentorias (
  id              uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  pessoa_id       uuid    REFERENCES public.pessoas(id),
  empresa_id      uuid    REFERENCES public.crescer_empresas(id),
  mentor          text,
  data_mentoria   date    NOT NULL,
  tema            text,
  duracao_min     integer,
  resultado       text,
  proximos_passos text,
  created_at      timestamptz DEFAULT now()
);

-- Eventos do CRESCER
CREATE TABLE IF NOT EXISTS public.crescer_eventos (
  id          uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  nome        text    NOT NULL,
  descricao   text,
  data_evento date,
  local       text,
  vagas       integer,
  created_at  timestamptz DEFAULT now()
);

-- Participações em eventos
CREATE TABLE IF NOT EXISTS public.crescer_participacoes (
  id          uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  pessoa_id   uuid    REFERENCES public.pessoas(id),
  evento_id   uuid    REFERENCES public.crescer_eventos(id),
  confirmado  boolean DEFAULT false,
  compareceu  boolean,
  created_at  timestamptz DEFAULT now(),
  UNIQUE(pessoa_id, evento_id)
);


-- ============================================================
-- 9. PROMOÇÃO SOCIAL
-- ============================================================

-- Ações sociais (eventos de distribuição, mutirões, etc.)
CREATE TABLE IF NOT EXISTS public.social_acoes (
  id                  uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  nome                text    NOT NULL,
  descricao           text,
  tipo                text,                        -- cesta_basica, kit_higiene, roupas, brinquedos, mutirao, outro
  data_acao           date,
  local               text,
  responsavel         text,
  meta_beneficiarios  integer,
  created_at          timestamptz DEFAULT now()
);

-- Beneficiários de cada ação
CREATE TABLE IF NOT EXISTS public.social_beneficiarios (
  id                uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  pessoa_id         uuid    REFERENCES public.pessoas(id),
  acao_id           uuid    REFERENCES public.social_acoes(id),
  item_recebido     text,
  quantidade        integer DEFAULT 1,
  data_recebimento  date    DEFAULT now(),
  observacoes       text,
  created_at        timestamptz DEFAULT now()
);

-- Cestas básicas (controle separado por recorrência)
CREATE TABLE IF NOT EXISTS public.social_cestas (
  id              uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  pessoa_id       uuid    REFERENCES public.pessoas(id),
  data_entrega    date    DEFAULT now(),
  tipo_cesta      text    DEFAULT 'basica',        -- basica, reforcada, natalina, pascoa
  quantidade      integer DEFAULT 1,
  responsavel     text,
  comprovante_url text,
  observacoes     text,
  created_at      timestamptz DEFAULT now()
);


-- ============================================================
-- 10. NÚCLEO DE APOIO — Assistência Social
-- ============================================================

-- Casos abertos
CREATE TABLE IF NOT EXISTS public.apoio_casos (
  id                uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  pessoa_id         uuid    REFERENCES public.pessoas(id),
  tipo              text,                          -- psicologico, social, juridico, familiar
  descricao         text,
  prioridade        text    DEFAULT 'normal',      -- urgente, alta, normal, baixa
  status            text    DEFAULT 'aberto',      -- aberto, em_atendimento, encerrado
  responsavel       text,
  data_abertura     date    DEFAULT now(),
  data_encerramento date,
  created_at        timestamptz DEFAULT now()
);

-- Atendimentos vinculados ao caso
CREATE TABLE IF NOT EXISTS public.apoio_atendimentos (
  id                  uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  caso_id             uuid    REFERENCES public.apoio_casos(id),
  pessoa_id           uuid    REFERENCES public.pessoas(id),
  data_atendimento    date    NOT NULL,
  tipo                text,
  profissional        text,
  relato              text,
  encaminhamentos     text,
  retorno             date,
  created_at          timestamptz DEFAULT now()
);


-- ============================================================
-- 11. NÚCLEO ESPORTE — Futebol · Futsal · Vôlei
-- ============================================================

-- Modalidades esportivas
CREATE TABLE IF NOT EXISTS public.esporte_modalidades (
  id          uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  nome        text    NOT NULL,                    -- futebol, futsal, volei
  descricao   text,
  dias_treino text,
  horario     text,
  local       text,
  tecnico     text,
  ativa       boolean DEFAULT true,
  created_at  timestamptz DEFAULT now()
);

-- Atletas inscritos por modalidade
CREATE TABLE IF NOT EXISTS public.esporte_atletas (
  id              uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  pessoa_id       uuid    REFERENCES public.pessoas(id),
  modalidade_id   uuid    REFERENCES public.esporte_modalidades(id),
  posicao         text,
  numero_camisa   integer,
  status          text    DEFAULT 'ativo',         -- ativo, inativo, suspenso, lesionado
  data_inicio     date    DEFAULT now(),
  created_at      timestamptz DEFAULT now(),
  UNIQUE(pessoa_id, modalidade_id)
);

-- Treinos registrados
CREATE TABLE IF NOT EXISTS public.esporte_treinos (
  id              uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  modalidade_id   uuid    REFERENCES public.esporte_modalidades(id),
  data_treino     date    NOT NULL,
  local           text,
  observacoes     text,
  created_at      timestamptz DEFAULT now()
);

-- Presenças nos treinos
CREATE TABLE IF NOT EXISTS public.esporte_presencas (
  id              uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  atleta_id       uuid    REFERENCES public.esporte_atletas(id),
  treino_id       uuid    REFERENCES public.esporte_treinos(id),
  presente        boolean DEFAULT true,
  justificativa   text,
  created_at      timestamptz DEFAULT now(),
  UNIQUE(atleta_id, treino_id)
);


-- ============================================================
-- 12. CAMPANHAS — Páscoa · Natal · Ação Kids · Eventos especiais
-- ============================================================

-- Campanhas (genérico para qualquer evento especial)
CREATE TABLE IF NOT EXISTS public.campanhas (
  id                  uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  slug                text    UNIQUE NOT NULL,     -- pascoa-2025, natal-2025, acao-kids-fev-2025
  nome                text    NOT NULL,
  descricao           text,
  tipo                text,                        -- pascoa, natal, acao_kids, empreendedoras, outro
  data_inicio         date,
  data_fim            date,
  meta_beneficiarios  integer,
  status              text    DEFAULT 'planejada', -- planejada, em_andamento, concluida
  created_at          timestamptz DEFAULT now()
);

-- Participantes de cada campanha
CREATE TABLE IF NOT EXISTS public.campanhas_participantes (
  id                uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  campanha_id       uuid    REFERENCES public.campanhas(id),
  pessoa_id         uuid    REFERENCES public.pessoas(id),
  item_recebido     text,
  data_participacao date    DEFAULT now(),
  observacoes       text,
  created_at        timestamptz DEFAULT now(),
  UNIQUE(campanha_id, pessoa_id)
);


-- ============================================================
-- 13. ÍNDICES DE PERFORMANCE
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_pessoas_cpf            ON public.pessoas(cpf);
CREATE INDEX IF NOT EXISTS idx_pessoas_nome           ON public.pessoas(nome);
CREATE INDEX IF NOT EXISTS idx_matriculas_pessoa       ON public.matriculas(pessoa_id);
CREATE INDEX IF NOT EXISTS idx_matriculas_nucleo       ON public.matriculas(nucleo);
CREATE INDEX IF NOT EXISTS idx_farm_atend_pessoa       ON public.farmacia_atendimentos(pessoa_id);
CREATE INDEX IF NOT EXISTS idx_farm_estoque_remedio    ON public.farmacia_estoque(remedio_id);
CREATE INDEX IF NOT EXISTS idx_odonto_pront_pessoa     ON public.odonto_prontuarios(pessoa_id);
CREATE INDEX IF NOT EXISTS idx_odonto_consulta_pessoa  ON public.odonto_consultas(pessoa_id);
CREATE INDEX IF NOT EXISTS idx_saude_pront_pessoa      ON public.saude_prontuarios(pessoa_id);
CREATE INDEX IF NOT EXISTS idx_saude_consulta_pessoa   ON public.saude_consultas(pessoa_id);
CREATE INDEX IF NOT EXISTS idx_emprego_cand_pessoa     ON public.emprego_candidaturas(pessoa_id);
CREATE INDEX IF NOT EXISTS idx_emprego_cand_vaga       ON public.emprego_candidaturas(vaga_id);
CREATE INDEX IF NOT EXISTS idx_cursos_insc_pessoa      ON public.cursos_inscricoes(pessoa_id);
CREATE INDEX IF NOT EXISTS idx_cursos_pres_pessoa      ON public.cursos_presencas(pessoa_id);
CREATE INDEX IF NOT EXISTS idx_crescer_emp_pessoa      ON public.crescer_empresas(pessoa_id);
CREATE INDEX IF NOT EXISTS idx_social_benef_pessoa     ON public.social_beneficiarios(pessoa_id);
CREATE INDEX IF NOT EXISTS idx_social_cestas_pessoa    ON public.social_cestas(pessoa_id);
CREATE INDEX IF NOT EXISTS idx_apoio_casos_pessoa      ON public.apoio_casos(pessoa_id);
CREATE INDEX IF NOT EXISTS idx_esporte_atleta_pessoa   ON public.esporte_atletas(pessoa_id);
CREATE INDEX IF NOT EXISTS idx_campanha_part_pessoa    ON public.campanhas_participantes(pessoa_id);


-- ============================================================
-- 14. ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Habilita RLS em todas as tabelas
ALTER TABLE public.pessoas                    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matriculas                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.farmacia_remedios          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.farmacia_estoque           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.farmacia_atendimentos      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.odonto_prontuarios         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.odonto_tratamentos         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.odonto_consultas           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saude_prontuarios          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saude_consultas            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saude_exames               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emprego_empresas           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emprego_vagas              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emprego_candidaturas       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cursos_catalogo            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cursos_turmas              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cursos_inscricoes          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cursos_presencas           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crescer_empresas           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crescer_mentorias          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crescer_eventos            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crescer_participacoes      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_acoes               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_beneficiarios       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_cestas              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.apoio_casos                ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.apoio_atendimentos         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.esporte_modalidades        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.esporte_atletas            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.esporte_treinos            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.esporte_presencas          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campanhas                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campanhas_participantes    ENABLE ROW LEVEL SECURITY;


-- ── POLÍTICAS: pessoas ──
-- Anônimo pode inserir (cadastro público)
CREATE POLICY "anon_insert_pessoas" ON public.pessoas
  FOR INSERT TO anon WITH CHECK (true);

-- Autenticado lê tudo
CREATE POLICY "auth_select_pessoas" ON public.pessoas
  FOR SELECT TO authenticated USING (true);

-- Autenticado atualiza
CREATE POLICY "auth_update_pessoas" ON public.pessoas
  FOR UPDATE TO authenticated USING (true);


-- ── POLÍTICAS: matriculas ──
CREATE POLICY "anon_insert_matriculas" ON public.matriculas
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "auth_select_matriculas" ON public.matriculas
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "auth_update_matriculas" ON public.matriculas
  FOR UPDATE TO authenticated USING (true);


-- ── POLÍTICAS: tabelas públicas de leitura (catálogos, vagas, cursos, eventos) ──
-- Qualquer um pode ver vagas, cursos, eventos — não precisa estar logado
CREATE POLICY "public_select_vagas"         ON public.emprego_vagas       FOR SELECT USING (true);
CREATE POLICY "public_select_empresas"      ON public.emprego_empresas     FOR SELECT USING (true);
CREATE POLICY "public_select_cursos"        ON public.cursos_catalogo      FOR SELECT USING (true);
CREATE POLICY "public_select_turmas"        ON public.cursos_turmas        FOR SELECT USING (true);
CREATE POLICY "public_select_eventos"       ON public.crescer_eventos      FOR SELECT USING (true);
CREATE POLICY "public_select_campanhas"     ON public.campanhas            FOR SELECT USING (true);
CREATE POLICY "public_select_modalidades"   ON public.esporte_modalidades  FOR SELECT USING (true);
CREATE POLICY "public_select_remedios"      ON public.farmacia_remedios    FOR SELECT USING (true);

-- ── POLÍTICAS: tabelas sensíveis — apenas autenticado lê ──
CREATE POLICY "auth_all_farm_estoque"       ON public.farmacia_estoque         FOR ALL TO authenticated USING (true);
CREATE POLICY "auth_all_farm_atend"         ON public.farmacia_atendimentos    FOR ALL TO authenticated USING (true);
CREATE POLICY "auth_all_odonto_pront"       ON public.odonto_prontuarios       FOR ALL TO authenticated USING (true);
CREATE POLICY "auth_all_odonto_trat"        ON public.odonto_tratamentos       FOR ALL TO authenticated USING (true);
CREATE POLICY "auth_all_odonto_cons"        ON public.odonto_consultas         FOR ALL TO authenticated USING (true);
CREATE POLICY "auth_all_saude_pront"        ON public.saude_prontuarios        FOR ALL TO authenticated USING (true);
CREATE POLICY "auth_all_saude_cons"         ON public.saude_consultas          FOR ALL TO authenticated USING (true);
CREATE POLICY "auth_all_saude_exam"         ON public.saude_exames             FOR ALL TO authenticated USING (true);
CREATE POLICY "auth_all_apoio_casos"        ON public.apoio_casos              FOR ALL TO authenticated USING (true);
CREATE POLICY "auth_all_apoio_atend"        ON public.apoio_atendimentos       FOR ALL TO authenticated USING (true);

-- ── POLÍTICAS: inscrições e candidaturas — anônimo insere, autenticado lê ──
CREATE POLICY "anon_insert_candidaturas"    ON public.emprego_candidaturas    FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "auth_select_candidaturas"    ON public.emprego_candidaturas    FOR SELECT TO authenticated USING (true);
CREATE POLICY "auth_update_candidaturas"    ON public.emprego_candidaturas    FOR UPDATE TO authenticated USING (true);

CREATE POLICY "anon_insert_inscricoes"      ON public.cursos_inscricoes       FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "auth_select_inscricoes"      ON public.cursos_inscricoes       FOR SELECT TO authenticated USING (true);
CREATE POLICY "auth_update_inscricoes"      ON public.cursos_inscricoes       FOR UPDATE TO authenticated USING (true);

CREATE POLICY "anon_insert_participacoes"   ON public.crescer_participacoes   FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "auth_all_participacoes"      ON public.crescer_participacoes   FOR ALL TO authenticated USING (true);

CREATE POLICY "anon_insert_camp_part"       ON public.campanhas_participantes FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "auth_all_camp_part"          ON public.campanhas_participantes FOR ALL TO authenticated USING (true);

-- ── POLÍTICAS: restante das tabelas — apenas autenticado ──
CREATE POLICY "auth_all_presencas_curso"    ON public.cursos_presencas        FOR ALL TO authenticated USING (true);
CREATE POLICY "auth_all_crescer_emp"        ON public.crescer_empresas        FOR ALL TO authenticated USING (true);
CREATE POLICY "auth_all_crescer_ment"       ON public.crescer_mentorias       FOR ALL TO authenticated USING (true);
CREATE POLICY "auth_all_social_acoes"       ON public.social_acoes            FOR ALL TO authenticated USING (true);
CREATE POLICY "auth_all_social_benef"       ON public.social_beneficiarios    FOR ALL TO authenticated USING (true);
CREATE POLICY "auth_all_social_cestas"      ON public.social_cestas           FOR ALL TO authenticated USING (true);
CREATE POLICY "auth_all_esporte_atletas"    ON public.esporte_atletas         FOR ALL TO authenticated USING (true);
CREATE POLICY "auth_all_esporte_treinos"    ON public.esporte_treinos         FOR ALL TO authenticated USING (true);
CREATE POLICY "auth_all_esporte_presencas"  ON public.esporte_presencas       FOR ALL TO authenticated USING (true);
CREATE POLICY "auth_all_emprego_vagas"      ON public.emprego_vagas           FOR ALL TO authenticated USING (true);
CREATE POLICY "auth_all_emprego_emp"        ON public.emprego_empresas        FOR ALL TO authenticated USING (true);
CREATE POLICY "auth_all_cursos_cat"         ON public.cursos_catalogo         FOR ALL TO authenticated USING (true);
CREATE POLICY "auth_all_cursos_turmas"      ON public.cursos_turmas           FOR ALL TO authenticated USING (true);
CREATE POLICY "auth_all_crescer_eventos"    ON public.crescer_eventos         FOR ALL TO authenticated USING (true);
CREATE POLICY "auth_all_campanhas"          ON public.campanhas               FOR ALL TO authenticated USING (true);
CREATE POLICY "auth_all_modalidades"        ON public.esporte_modalidades     FOR ALL TO authenticated USING (true);
CREATE POLICY "auth_all_farm_remedios"      ON public.farmacia_remedios       FOR ALL TO authenticated USING (true);


-- ============================================================
-- 15. TRIGGER: atualiza updated_at em pessoas automaticamente
-- ============================================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_pessoas_updated_at
  BEFORE UPDATE ON public.pessoas
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- ============================================================
-- FIM DO SCHEMA
-- Projeto: portal-cidadania-os — CERPI Piracicaba
-- ============================================================
