const modules = [
{
    id: "editais",
    num: "01",
    title: "Portal de Editais",
    tag: "Oportunidades",
    desc: "Centralize todas as oportunidades de financiamento ambiental em um único lugar. Busca avançada com filtros por região, tema, público-alvo, valor e prazo.",
    bullets: ["Histórico completo de editais", "Alertas automáticos por interesse", "Download de documentos oficiais", "Cadastro e publicação rápida"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h12l4 4v12a0 0 0 0 1 0 0H4z"/><path d="M16 4v4h4M8 12h8M8 16h8M8 8h2"/></svg>
    ),
  },
  {
    id: "submissao",
    num: "02",
    title: "Submissão Guiada",
    tag: "10 etapas inteligentes",
    desc: "Do cadastro do proponente à assinatura via Gov.br. Validação automática de CNPJ, certidões, georreferenciamento com KML/SHP e diagnóstico territorial via MapBiomas.",
    bullets: ["Simulador de aprovação em tempo real", "Integração MapBiomas + análise de fogo", "Validação documental automática", "Assinatura digital Gov.br / ICP"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l3 6 6 1-4.5 4.5L18 20l-6-3-6 3 1.5-6.5L3 9l6-1z"/></svg>
    ),
  },
  {
    id: "avaliacao",
    num: "03",
    title: "Avaliação Técnica",
    tag: "Inteligência territorial",
    desc: "Tela tripartite: projeto + critérios pontuais + camadas MapBiomas (fogo, degradação, cobertura). O avaliador decide com evidência geoespacial ao lado.",
    bullets: ["Workflow Submetido → Contratação", "Pareceres multi-avaliador consolidados", "Camadas temporais 2018–2026", "Transparência por proponente"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></svg>
    ),
  },
  {
    id: "gestao",
    num: "04",
    title: "Gestão & Execução",
    tag: "Pós-aprovação",
    desc: "Plano de trabalho, cronograma físico-financeiro, atualizações de campo georreferenciadas, gestão de parcelas e prestação de contas integrada.",
    bullets: ["Registro fotográfico com geo-tag", "Alertas de atraso e consumo", "Pendências do fiscal do Estado", "Nota fiscal, recibo e contrato"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M8 4v4M16 4v4M8 15l2 2 5-5"/></svg>
    ),
  },
  {
    id: "transparencia",
    num: "05",
    title: "Portal da Transparência",
    tag: "Dashboards públicos",
    desc: "Painel REDD+ consolidado: hectares conservados, tCO₂ evitado, comunidades atendidas, recursos captados e executados. Aberto à sociedade.",
    bullets: ["Mapa do estado por status", "Indicadores por município", "Resultados por real investido", "Governança e auditoria"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3v18h18"/><path d="M7 14l4-4 3 3 5-6"/></svg>
    ),
  },
];

export default modules;