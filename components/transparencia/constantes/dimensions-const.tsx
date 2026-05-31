const dimensions = [
  {
    key: "conservacao",
    label: "Conservação",
    color: "leaf",
    items: [
      { label: "Área preservada", value: "412k ha", sub: "+8.2k este mês" },
      { label: "Área recuperada", value: "38.7k ha", sub: "+1.1k este mês" },
    ],
  },
  {
    key: "carbono",
    label: "Carbono",
    color: "ocean",
    items: [
      { label: "Estoque protegido", value: "92.4 MtCO₂e", sub: "MRV verificado" },
      { label: "Emissões evitadas", value: "148.2k tCO₂e", sub: "ciclo 2026" },
    ],
  },
  {
    key: "social",
    label: "Social",
    color: "primary",
    items: [
      { label: "Comunidades atendidas", value: "184", sub: "31 indígenas" },
      { label: "Famílias beneficiadas", value: "32.940", sub: "47% mulheres" },
    ],
  },
  {
    key: "financeiro",
    label: "Financeiro",
    color: "ocean",
    items: [
      { label: "Recursos captados", value: "R$ 142 M", sub: "ciclo 2026" },
      { label: "Recursos executados", value: "R$ 89 M", sub: "63% liberado" },
    ],
  },
  {
    key: "governanca",
    label: "Governança",
    color: "leaf",
    items: [
      { label: "Projetos auditados", value: "208", sub: "87% do total ativo" },
      { label: "Projetos concluídos", value: "94", sub: "ciclo 2024-25" },
    ],
  },
];

export default dimensions;