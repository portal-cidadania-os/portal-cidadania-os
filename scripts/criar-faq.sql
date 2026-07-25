-- ============================================================
-- CERPI — Tabela de FAQ + seed inicial
-- Execute no Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Tabela
CREATE TABLE IF NOT EXISTS public.faq_items (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pergunta   text NOT NULL,
  resposta   text NOT NULL,
  categoria  text NOT NULL DEFAULT 'geral',  -- geral | emprego | saude | cursos | campanhas | nucleo
  modulo     text,                           -- slug do núcleo (ex: 'sorria-com-cristo')
  ordem      int  NOT NULL DEFAULT 0,
  ativo      boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  busca_ts   tsvector GENERATED ALWAYS AS (
               to_tsvector('portuguese', pergunta || ' ' || resposta)
             ) STORED
);

CREATE INDEX IF NOT EXISTS faq_busca_idx    ON public.faq_items USING GIN (busca_ts);
CREATE INDEX IF NOT EXISTS faq_categoria_idx ON public.faq_items (categoria, ativo);

ALTER TABLE public.faq_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "faq_public_read" ON public.faq_items;
CREATE POLICY "faq_public_read" ON public.faq_items
  FOR SELECT USING (ativo = true);

DROP POLICY IF EXISTS "faq_admin_all" ON public.faq_items;
CREATE POLICY "faq_admin_all" ON public.faq_items
  FOR ALL USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- 2. Seed — perguntas iniciais
INSERT INTO public.faq_items (pergunta, resposta, categoria, ordem) VALUES

-- GERAL
('O que é o CERPI?',
 'O CERPI — Centro Restaurando Cidadania é uma organização social com sede em Piracicaba/SP que oferece serviços gratuitos de empregabilidade, saúde, cursos, esporte e ação social para famílias em vulnerabilidade.',
 'geral', 1),

('Como me cadastrar no CERPI?',
 'Acesse a seção "Cadastre-se" no site ou clique em "Criar Conta" no menu. Preencha seus dados e um de nossos atendentes entrará em contato para orientar os próximos passos.',
 'geral', 2),

('O CERPI cobra alguma taxa pelos serviços?',
 'Não. Todos os serviços do CERPI são totalmente gratuitos para famílias em situação de vulnerabilidade social cadastradas em nossa base.',
 'geral', 3),

('Qual o endereço do CERPI?',
 'Estamos localizados em Piracicaba/SP, no bairro Madureira. Entre em contato pelo WhatsApp ou pela página Fale Conosco para informações detalhadas de endereço e horários.',
 'geral', 4),

('Como entrar em contato com o CERPI?',
 'Você pode entrar em contato pelo WhatsApp, pelo formulário na página Fale Conosco, ou comparecer presencialmente na sede durante o horário de atendimento.',
 'geral', 5),

-- EMPREGO
('Como me inscrever para uma vaga de emprego?',
 'Acesse a seção "Vagas & Emprego" no menu, encontre a vaga de interesse e clique em "Candidatar-se". Você precisará ter um cadastro ativo no portal.',
 'emprego', 1),

('Quais tipos de vagas o CERPI oferece?',
 'Trabalhamos com vagas em diversas áreas: serviços gerais, comércio, indústria, administrativo e outros. As vagas são de empresas parceiras locais de Piracicaba e região.',
 'emprego', 2),

('Preciso ter experiência para me candidatar a uma vaga?',
 'Não necessariamente. Muitas vagas são para pessoas sem experiência. Além disso, oferecemos cursos de capacitação que podem ajudá-lo a se preparar para o mercado de trabalho.',
 'emprego', 3),

('O CERPI oferece currículo e orientação profissional?',
 'Sim! Nosso núcleo de Empregabilidade oferece apoio na elaboração de currículo e orientação para entrevistas. Fale com nossa equipe para agendar um atendimento.',
 'emprego', 4),

-- SAÚDE
('Quais serviços de saúde o CERPI oferece?',
 'Oferecemos atendimento odontológico gratuito pelo Sorria com Cristo, além de encaminhamentos para consultas médicas, exames e distribuição de medicamentos pela Farmácia Social.',
 'saude', 1),

('Como funciona a Farmácia Social?',
 'A Farmácia Social distribui medicamentos gratuitamente para cadastrados com receita médica válida. Funciona mediante comprovação de necessidade e estoque disponível.',
 'saude', 2),

('Como agendar atendimento odontológico?',
 'O agendamento é feito presencialmente na sede ou pelo WhatsApp. As consultas são realizadas pelo núcleo Sorria com Cristo mediante disponibilidade de agenda.',
 'saude', 3),

-- CURSOS
('Quais cursos o CERPI oferece?',
 'Oferecemos cursos nas áreas de informática, artesanato, culinária, costura, idiomas e capacitação profissional. Os cursos são gratuitos para cadastrados.',
 'cursos', 1),

('Como me inscrever em um curso?',
 'Acesse a seção "Cursos & Capacitação" no portal, escolha o curso desejado e clique em "Inscrever-se". As inscrições ficam sujeitas à disponibilidade de vagas.',
 'cursos', 2),

('Os cursos emitem certificado?',
 'Sim! Ao concluir o curso com presença mínima exigida, emitimos um certificado de conclusão que pode ser usado no seu currículo.',
 'cursos', 3),

-- CAMPANHAS
('Como participar das campanhas do CERPI?',
 'Acesse a seção "Campanhas" no portal para ver as campanhas ativas. Você pode participar como beneficiário ou colaborador. Cada campanha tem instruções específicas.',
 'campanhas', 1),

('Como posso ajudar nas campanhas solidárias?',
 'Você pode contribuir como voluntário, com doações de itens específicos ou com recursos financeiros. Acesse a página da campanha para ver como ajudar.',
 'campanhas', 2),

-- NUCLEO (exemplo Sorria com Cristo)
('O que é o Núcleo Sorria com Cristo?',
 'O Sorria com Cristo é o núcleo de odontologia social do CERPI. Oferecemos atendimento odontológico gratuito — limpeza, restauração, extração e outros procedimentos — para famílias em vulnerabilidade.',
 'nucleo', 1),

('Como funciona o voluntariado no CERPI?',
 'Temos diversas áreas para voluntários: atendimento, eventos, saúde, ensino e administração. Acesse a seção "Voluntariado" e preencha o formulário de interesse.',
 'geral', 6)

ON CONFLICT DO NOTHING;

-- Confirmar
SELECT categoria, count(*) FROM public.faq_items GROUP BY categoria ORDER BY categoria;
