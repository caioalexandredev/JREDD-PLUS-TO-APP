import { MunicipioApi, NaturezaJuridicaApi } from "@/libs/jredd-api-types";

export type { MunicipioApi, NaturezaJuridicaApi };

export type InstituicaoForm = {
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  dataFundacao: string;
  idNaturezaJuridica: string;
  areaAtuacao: string;
  site: string;
  redesSociais: string;
  representanteLegal: {
    nomeCompleto: string;
    cpf: string;
    rg: string;
    email: string;
    telefone: string;
    cargo: string;
  };
};

export type CaracterizacaoForm = {
  nomeProjeto: string;
  resumo: string;
  justificativaMerito: string;
};

export type LocalizacaoForm = {
  latitude: string;
  longitude: string;
  idMunicipio: string;
  comunidade: string;
};

export type PublicoForm = {
  mulheresQuant: string;
  homensQuant: string;
  criancasQuant: string;
  jovensQuant: string;
  idososQuant: string;
  povosIndigenasQuant: string;
  quilombolasQuant: string;
  agricultoresFamiliarQuant: string;
  comunidadesTradicionaisQuant: string;
  rendaMedia: string;
  fonteRendaPrincipal: string;
  descricaoAplicacaoBeneficio: string;
};

export type AtividadeForm = {
  descricao: string;
  responsavel: string;
  dataInicio: string;
  dataFim: string;
};

export type PlanoForm = {
  objetivoGeral: string;
  objetivoEspecifico: string;
  atividades: AtividadeForm[];
};

export type TermosForm = {
  declarouVeracidadeInformacoes: boolean;
  autorizouTratamentoDadosLgpd: boolean;
  comprometeuPrestacaoContas: boolean;
  autorizouMonitoramentoAuditoria: boolean;
};

export type SubmissionForm = {
  etapa1: InstituicaoForm;
  etapa2: CaracterizacaoForm;
  etapa3: LocalizacaoForm;
  etapa4: PublicoForm;
  etapa5: PlanoForm;
  etapa6: TermosForm;
};

export type LookupOptions = {
  naturezas: NaturezaJuridicaApi[];
  municipios: MunicipioApi[];
};
