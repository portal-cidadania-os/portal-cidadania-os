// ============================================================
// Portal Cidadania OS — Tipos Compartilhados
// ============================================================

export interface Curso {
  id: string;
  titulo: string;
  descricao: string;
  carga_horaria: number;
  modalidade: string;
  localizacao: string;
  status: string;
  created_at?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  nome_completo?: string;
  role: "admin" | "socio" | "colaborador" | "publico";
  cpf?: string;
  telefone?: string;
  created_at?: string;
}

export interface Noticia {
  id: string;
  titulo: string;
  resumo?: string;
  conteudo?: string;
  slug: string;
  publicado: boolean;
  created_at: string;
}

export interface Evento {
  id: string;
  titulo: string;
  descricao?: string;
  data_inicio: string;
  data_fim?: string;
  local?: string;
  online: boolean;
  link_inscricao?: string;
  status: "agendado" | "em_andamento" | "encerrado" | "cancelado";
}
