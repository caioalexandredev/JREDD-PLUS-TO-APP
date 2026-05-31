"use client";

export type PageResponse<T> = {
  content: T[];
  totalElements?: number;
  totalPages?: number;
  number?: number;
  size?: number;
};

export type EditalStatusApi = "RASCUNHO" | "ABERTO" | "EM_AVALIACAO" | "ENCERRADO";

export type EditalResumoApi = {
  id: number;
  titulo: string;
  estadoId?: number;
  estado?: string;
  orgaoProponenteId?: number;
  frenteAtuacaoId?: number;
  regiaoImediataId?: number;
  frenteAtuacao?: string;
  regiaoImediata?: string;
  valorMinimo?: number;
  valorMaximo?: number;
  status: EditalStatusApi;
  inicioRecebimentoPropostas?: string;
  fimRecebimentoPropostas?: string;
  resumo?: string;
  orgaoProponente?: string;
};

export type CriterioAvaliacaoApi = {
  id?: number;
  nome: string;
  descricao?: string | null;
  ordem?: number | null;
};

export type DocumentoVinculadoApi = {
  id: string;
  nomeOriginal: string;
};

export type DocumentoEditalApi = {
  id: number;
  editalId: number;
  documentoId: string;
  nomeOriginal: string;
  tipoConteudo?: string | null;
  tamanhoBytes?: number | null;
  url?: string | null;
  criadoEm?: string | null;
};

export type EditalDetalheApi = EditalResumoApi & {
  criterios?: CriterioAvaliacaoApi[];
  documentos?: DocumentoVinculadoApi[];
  criadoEm?: string;
  atualizadoEm?: string;
};

export type StatusProjetoApi =
  | "RASCUNHO"
  | "SUBMETIDO"
  | "EM_AVALIACAO"
  | "APROVADO"
  | "REPROVADO"
  | "EM_EXECUCAO"
  | "CONCLUIDO";

export type ProjetoResumoApi = {
  id: number;
  nome: string;
  instituicaoId?: string | null;
  razaoSocialInstituicao?: string | null;
  editalId?: number | null;
  nomeEdital?: string | null;
  dataCriacao?: string | null;
  progresso?: string | null;
  status: StatusProjetoApi;
};

export type ProjetoIndicadoresApi = {
  totalSubmissoes: number;
  submetidos: number;
  emAvaliacao: number;
  aprovados: number;
  reprovados: number;
  emExecucao: number;
};

export type ProjetoDetalheApi = {
  id: number;
  editalId?: number | null;
  nome?: string | null;
  proponente?: string | null;
  auditor?: string | null;
  criadoEm?: string | null;
  atividades: {
    id: number;
    nome?: string | null;
    responsavel?: string | null;
    inicio?: string | null;
    fim?: string | null;
    descricao?: string | null;
    status?: string | null;
  }[];
  evidencias: {
    id: number;
    atividadeId?: number | null;
    atividade?: string | null;
    descricao?: string | null;
    status?: string | null;
    comentarioAuditor?: string | null;
    criadoEm?: string | null;
  }[];
};

export type NaturezaJuridicaApi = {
  id: number;
  codigo?: string | null;
  nome: string;
};

export type MunicipioApi = {
  id: number;
  nome: string;
  regiaoImediata?: { id: number; nome: string } | null;
};

export function editalStatusLabel(status?: EditalStatusApi) {
  if (status === "ABERTO") return "Aberto";
  if (status === "EM_AVALIACAO") return "Em avaliacao";
  if (status === "ENCERRADO") return "Encerrado";
  return "Rascunho";
}

export function editalStatusColor(status?: EditalStatusApi) {
  if (status === "ABERTO") return "bg-leaf/15 text-leaf border-leaf/30";
  if (status === "EM_AVALIACAO") return "bg-ocean/15 text-ocean border-ocean/30";
  if (status === "ENCERRADO") return "bg-muted text-muted-foreground border-border";
  return "bg-amber-500/10 text-amber-600 border-amber-500/20";
}

export function projetoStatusLabel(status?: StatusProjetoApi | string | null) {
  if (status === "RASCUNHO") return "Rascunho";
  if (status === "SUBMETIDO") return "Submetido";
  if (status === "EM_AVALIACAO") return "Em avaliacao";
  if (status === "APROVADO") return "Aprovado";
  if (status === "REPROVADO") return "Reprovado";
  if (status === "EM_EXECUCAO") return "Em execucao";
  if (status === "CONCLUIDO") return "Concluido";
  return "Rascunho";
}

export function projetoStatusColor(status?: StatusProjetoApi | string | null) {
  if (status === "APROVADO" || status === "EM_EXECUCAO" || status === "CONCLUIDO") return "bg-leaf/10 text-leaf border-leaf/20";
  if (status === "EM_AVALIACAO" || status === "SUBMETIDO") return "bg-ocean/10 text-ocean border-ocean/20";
  if (status === "REPROVADO") return "bg-destructive/10 text-destructive border-destructive/20";
  return "bg-muted text-muted-foreground border-border";
}

export function formatCurrency(value?: number | null) {
  if (value == null) return "Nao informado";
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(value);
}

export function formatCurrencyRange(min?: number | null, max?: number | null) {
  if (min != null && max != null) return `${formatCurrency(min)} a ${formatCurrency(max)}`;
  return formatCurrency(max ?? min);
}

export function formatDate(value?: string | null) {
  if (!value) return "Nao informado";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" }).format(date);
}
