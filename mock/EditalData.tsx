export type EditalStatus = "Aberto" | "Encerrando" | "Em análise" | "Encerrado";

export type Edital = {
  id: string;
  title: string;
  region: string;
  value: string;
  valueNumber: number;
  deadline: string;
  deadlineDays: number;
  theme: string;
  status: EditalStatus;
  publishedAt: string;
  agency: string;
  modality: string;
  publicTarget: string[];
  summary: string;
  scope: string[];
  eligibility: string[];
  timeline: { phase: string; date: string }[];
  documents: { name: string; size: string }[];
  criterios?: { nome: string; descricao: string; ordem: number }[];
  contact: { name: string; email: string; phone: string };
};

export const editais: Edital[] = [
  {
    id: "TO-2026-018",
    title: "Recuperação de nascentes — Bacia do Tocantins",
    region: "Norte",
    value: "R$ 4,2 mi",
    valueNumber: 4_200_000,
    deadline: "12 dias",
    deadlineDays: 12,
    theme: "Recuperação",
    status: "Aberto",
    publishedAt: "12 mai 2026",
    agency: "SEMARH-TO · Fundo JREDD+",
    modality: "Chamada pública concorrencial",
    publicTarget: ["Associações", "Cooperativas", "ONGs ambientais", "Comitês de bacia"],
    summary:
      "Apoio a projetos de recuperação de áreas de preservação permanente em nascentes prioritárias da bacia hidrográfica do rio Tocantins, com foco em segurança hídrica e regularização ambiental.",
    scope: [
      "Cercamento e isolamento de nascentes",
      "Plantio de mudas nativas do Cerrado",
      "Monitoramento hidrológico por 24 meses",
      "Engajamento de comunidades ribeirinhas",
    ],
    eligibility: [
      "CNPJ ativo há pelo menos 24 meses",
      "Atuação comprovada em recuperação ambiental",
      "Contrapartida mínima de 10% (econômica ou não-econômica)",
      "Área-alvo dentro do território tocantinense",
    ],
    timeline: [
      { phase: "Publicação", date: "12 mai 2026" },
      { phase: "Encerramento das inscrições", date: "11 jun 2026" },
      { phase: "Análise técnica", date: "12 jun – 02 jul 2026" },
      { phase: "Divulgação dos resultados", date: "10 jul 2026" },
      { phase: "Início da execução", date: "01 ago 2026" },
    ],
    documents: [
      { name: "Edital completo.pdf", size: "1.4 MB" },
      { name: "Anexo I — Modelo de proposta.docx", size: "240 KB" },
      { name: "Anexo II — Planilha orçamentária.xlsx", size: "82 KB" },
    ],
    contact: { name: "Coordenação Técnica JREDD+", email: "editais@jredd.to.gov.br", phone: "(63) 3218-0000" },
  },
  {
    id: "TO-2026-017",
    title: "Agrofloresta para agricultura familiar",
    region: "Sudeste",
    value: "R$ 1,8 mi",
    valueNumber: 1_800_000,
    deadline: "27 dias",
    deadlineDays: 27,
    theme: "Agricultura",
    status: "Aberto",
    publishedAt: "05 mai 2026",
    agency: "SEAGRO-TO · Fundo JREDD+",
    modality: "Chamada pública simplificada",
    publicTarget: ["Agricultores familiares", "Assentamentos da reforma agrária", "Cooperativas"],
    summary:
      "Implantação de sistemas agroflorestais (SAFs) em unidades produtivas familiares, integrando segurança alimentar, restauração florestal e geração de renda via créditos de carbono.",
    scope: [
      "Diagnóstico participativo das propriedades",
      "Implantação de SAFs em até 5 ha por família",
      "Assistência técnica continuada",
      "Acesso ao mercado de carbono jurisdicional",
    ],
    eligibility: [
      "DAP/CAF ativa",
      "Propriedade dentro do estado do Tocantins",
      "Adesão ao monitoramento por satélite",
    ],
    timeline: [
      { phase: "Publicação", date: "05 mai 2026" },
      { phase: "Encerramento das inscrições", date: "26 jun 2026" },
      { phase: "Análise e habilitação", date: "27 jun – 15 jul 2026" },
      { phase: "Resultado final", date: "25 jul 2026" },
    ],
    documents: [
      { name: "Edital completo.pdf", size: "1.1 MB" },
      { name: "Manual SAF.pdf", size: "3.2 MB" },
    ],
    contact: { name: "Núcleo de Agricultura Sustentável", email: "saf@jredd.to.gov.br", phone: "(63) 3218-0011" },
  },
  {
    id: "TO-2026-015",
    title: "Prevenção de queimadas no Jalapão",
    region: "Leste",
    value: "R$ 6,5 mi",
    valueNumber: 6_500_000,
    deadline: "4 dias",
    deadlineDays: 4,
    theme: "Fogo",
    status: "Encerrando",
    publishedAt: "18 abr 2026",
    agency: "Naturatins · Fundo JREDD+",
    modality: "Chamada pública concorrencial",
    publicTarget: ["Brigadas comunitárias", "ICMBio", "Associações quilombolas", "ONGs"],
    summary:
      "Fortalecimento de brigadas comunitárias e Manejo Integrado do Fogo (MIF) no mosaico de unidades de conservação do Jalapão, com foco em redução de área queimada e emissões evitadas.",
    scope: [
      "Formação e equipagem de brigadas",
      "Aceiros estratégicos e queimas prescritas",
      "Monitoramento com torres e satélites",
      "Educação ambiental em escolas locais",
    ],
    eligibility: [
      "Atuação prévia em MIF (mínimo 2 temporadas)",
      "Convênio com órgão gestor de UC",
      "Plano operacional anual aprovado",
    ],
    timeline: [
      { phase: "Publicação", date: "18 abr 2026" },
      { phase: "Encerramento das inscrições", date: "03 jun 2026" },
      { phase: "Análise técnica", date: "04 – 20 jun 2026" },
      { phase: "Resultado final", date: "30 jun 2026" },
    ],
    documents: [
      { name: "Edital completo.pdf", size: "1.8 MB" },
      { name: "Plano MIF de referência.pdf", size: "4.5 MB" },
    ],
    contact: { name: "Coordenação MIF Tocantins", email: "mif@jredd.to.gov.br", phone: "(63) 3218-0022" },
  },
  {
    id: "TO-2026-014",
    title: "Educação ambiental em escolas indígenas",
    region: "Bico do Papagaio",
    value: "R$ 920 mil",
    valueNumber: 920_000,
    deadline: "33 dias",
    deadlineDays: 33,
    theme: "Educação",
    status: "Aberto",
    publishedAt: "28 abr 2026",
    agency: "SEDUC-TO · Fundo JREDD+",
    modality: "Chamada pública simplificada",
    publicTarget: ["Associações indígenas", "Universidades", "ONGs de educação"],
    summary:
      "Desenvolvimento de materiais e atividades de educação socioambiental contextualizadas em escolas indígenas, articulando saberes tradicionais e ciências do clima.",
    scope: [
      "Formação de professores indígenas",
      "Produção de materiais bilíngues",
      "Hortas escolares agroecológicas",
      "Encontros intergeracionais",
    ],
    eligibility: [
      "Anuência da liderança indígena local",
      "Equipe com pedagogo(a) e antropólogo(a)",
    ],
    timeline: [
      { phase: "Publicação", date: "28 abr 2026" },
      { phase: "Encerramento", date: "02 jul 2026" },
      { phase: "Resultado", date: "20 jul 2026" },
    ],
    documents: [{ name: "Edital completo.pdf", size: "900 KB" }],
    contact: { name: "Coordenação de Educação Ambiental", email: "edu@jredd.to.gov.br", phone: "(63) 3218-0033" },
  },
  {
    id: "TO-2026-012",
    title: "Conservação de áreas privadas — RPPN",
    region: "Central",
    value: "R$ 2,4 mi",
    valueNumber: 2_400_000,
    deadline: "19 dias",
    deadlineDays: 19,
    theme: "Conservação",
    status: "Aberto",
    publishedAt: "10 abr 2026",
    agency: "Naturatins · Fundo JREDD+",
    modality: "Chamada pública concorrencial",
    publicTarget: ["Proprietários rurais", "RPPNs reconhecidas"],
    summary:
      "Pagamento por serviços ambientais (PSA) a proprietários de Reservas Particulares do Patrimônio Natural com plano de manejo aprovado.",
    scope: ["PSA por hectare conservado", "Apoio à elaboração de planos de manejo", "Monitoramento por sensoriamento remoto"],
    eligibility: ["RPPN averbada", "Plano de manejo válido", "Sem embargos ambientais"],
    timeline: [
      { phase: "Publicação", date: "10 abr 2026" },
      { phase: "Encerramento", date: "18 jun 2026" },
      { phase: "Resultado", date: "15 jul 2026" },
    ],
    documents: [{ name: "Edital completo.pdf", size: "1.2 MB" }],
    contact: { name: "Núcleo de PSA", email: "psa@jredd.to.gov.br", phone: "(63) 3218-0044" },
  },
  {
    id: "TO-2026-009",
    title: "Mensuração de estoque de carbono",
    region: "Estadual",
    value: "R$ 3,1 mi",
    valueNumber: 3_100_000,
    deadline: "Encerrado",
    deadlineDays: -1,
    theme: "Carbono",
    status: "Em análise",
    publishedAt: "02 fev 2026",
    agency: "SEMARH-TO · Fundo JREDD+",
    modality: "Pregão técnico",
    publicTarget: ["Instituições de pesquisa", "Consultorias técnicas certificadas"],
    summary:
      "Contratação de inventário florestal e modelagem de estoque de carbono para a jurisdição do Tocantins, alinhado ao padrão TREES 2.0.",
    scope: ["Parcelas permanentes", "LiDAR aerotransportado", "Modelagem geoespacial"],
    eligibility: ["Credenciamento ART/Crea", "Equipe sênior com publicações na área"],
    timeline: [
      { phase: "Publicação", date: "02 fev 2026" },
      { phase: "Encerramento", date: "20 abr 2026" },
      { phase: "Análise técnica", date: "21 abr – 15 jun 2026" },
    ],
    documents: [{ name: "Termo de referência.pdf", size: "2.1 MB" }],
    contact: { name: "Coordenação MRV", email: "mrv@jredd.to.gov.br", phone: "(63) 3218-0055" },
  },
  {
    id: "TO-2025-031",
    title: "Bioeconomia do babaçu",
    region: "Bico do Papagaio",
    value: "R$ 1,2 mi",
    valueNumber: 1_200_000,
    deadline: "Encerrado",
    deadlineDays: -1,
    theme: "Bioeconomia",
    status: "Encerrado",
    publishedAt: "15 set 2025",
    agency: "SEAGRO-TO · Fundo JREDD+",
    modality: "Chamada pública simplificada",
    publicTarget: ["Cooperativas de quebradeiras de coco", "Associações comunitárias"],
    summary:
      "Apoio a cadeias produtivas do babaçu lideradas por mulheres extrativistas, com foco em agregação de valor e certificação socioambiental.",
    scope: ["Equipamentos de beneficiamento", "Acesso a mercados", "Certificação orgânica"],
    eligibility: ["Coletivos de mulheres extrativistas", "Atuação no território"],
    timeline: [
      { phase: "Publicação", date: "15 set 2025" },
      { phase: "Encerramento", date: "30 out 2025" },
      { phase: "Resultado", date: "10 dez 2025" },
    ],
    documents: [{ name: "Edital completo.pdf", size: "1.0 MB" }],
    contact: { name: "Núcleo de Bioeconomia", email: "bio@jredd.to.gov.br", phone: "(63) 3218-0066" },
  },
];

export const themes = ["Recuperação", "Agricultura", "Fogo", "Educação", "Conservação", "Carbono", "Bioeconomia"];
export const regions = ["Norte", "Sudeste", "Leste", "Central", "Bico do Papagaio", "Estadual"];
export const statuses: EditalStatus[] = ["Aberto", "Encerrando", "Em análise", "Encerrado"];

export function statusColor(s: EditalStatus) {
  switch (s) {
    case "Aberto":
      return "bg-leaf/15 text-leaf border-leaf/30";
    case "Encerrando":
      return "bg-destructive/10 text-destructive border-destructive/30";
    case "Em análise":
      return "bg-ocean/15 text-ocean border-ocean/30";
    case "Encerrado":
      return "bg-muted text-muted-foreground border-border";
  }
}
