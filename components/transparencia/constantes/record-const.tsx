type RecordItem = {
  id: string;
  type: "Projeto" | "Prestação de contas" | "Auditoria" | "Edital";
  title: string;
  org: string;
  region: string;
  value: string;
  status: "Aprovado" | "Em execução" | "Concluído" | "Em análise" | "Reprovado";
  date: string;
};

const records: RecordItem[] = [
  { id: "PRJ-2026-184", type: "Projeto", title: "Recuperação de nascentes — Rio do Sono", org: "Inst. Ecológica do Tocantins", region: "Central", value: "R$ 1,2 M", status: "Em execução", date: "12 mai 2026" },
  { id: "PRJ-2026-181", type: "Projeto", title: "Brigada indígena Krahô — MIF", org: "Associação Mãkraré", region: "Leste", value: "R$ 820 k", status: "Em execução", date: "08 mai 2026" },
  { id: "AUD-2026-027", type: "Auditoria", title: "Auditoria operacional ciclo 2025", org: "CGU / SEMARH", region: "Estadual", value: "—", status: "Aprovado", date: "02 mai 2026" },
  { id: "PC-2026-099", type: "Prestação de contas", title: "Prestação parcial Q1/2026 — SAF Babaçu", org: "Cooperativa COPPALJ", region: "Bico do Papagaio", value: "R$ 412 k", status: "Aprovado", date: "28 abr 2026" },
  { id: "PRJ-2026-175", type: "Projeto", title: "Cerrado em pé — RPPN Serra Geral", org: "Fundação Cerrado", region: "Sudeste", value: "R$ 2,4 M", status: "Concluído", date: "20 abr 2026" },
  { id: "ED-2026-018", type: "Edital", title: "Recuperação de nascentes — Bacia do Tocantins", org: "SEMARH-TO", region: "Norte", value: "R$ 4,2 M", status: "Em análise", date: "12 mai 2026" },
  { id: "PC-2026-088", type: "Prestação de contas", title: "Prestação final — Educação Krahô", org: "Mãkraré + UFT", region: "Leste", value: "R$ 680 k", status: "Em análise", date: "10 abr 2026" },
  { id: "AUD-2026-024", type: "Auditoria", title: "Auditoria de campo — SAF Tocantinópolis", org: "TCE-TO", region: "Norte", value: "—", status: "Aprovado", date: "05 abr 2026" },
  { id: "PRJ-2025-402", type: "Projeto", title: "Bioeconomia do pequi", org: "Cooperfruta", region: "Central", value: "R$ 1,8 M", status: "Em execução", date: "22 mar 2026" },
  { id: "PC-2026-072", type: "Prestação de contas", title: "Prestação Q4/2025 — MIF Jalapão", org: "Naturatins", region: "Leste", value: "R$ 1,1 M", status: "Reprovado", date: "18 mar 2026" },
  { id: "PRJ-2025-388", type: "Projeto", title: "Monitoramento de fauna — Cantão", org: "ICMBio", region: "Norte", value: "R$ 560 k", status: "Concluído", date: "12 mar 2026" },
  { id: "ED-2026-015", type: "Edital", title: "Prevenção de queimadas no Jalapão", org: "Naturatins", region: "Leste", value: "R$ 6,5 M", status: "Em análise", date: "18 abr 2026" },
];

export default records;
