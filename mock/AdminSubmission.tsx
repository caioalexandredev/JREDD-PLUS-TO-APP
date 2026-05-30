import { SubStatus } from "@/model/edital/TSubStatus";

export type AdminSubmission = {
    id: string;
    proponente: string;
    project: string;
    editalId: string;
    status: SubStatus;
    score: number;
    value: string;
    submittedAt: string;
};

export const mockSubs: AdminSubmission[] = [
  { id: "PRJ-2026-0418", proponente: "Instituto Verde Tocantins", project: "Recuperação de nascentes — Vale do Araguaia", editalId: "TO-2026-018", status: "Em análise", score: 78, value: "R$ 1,8 mi", submittedAt: "há 2 dias" },
  { id: "PRJ-2026-0411", proponente: "Cooperativa Cerrado Vivo", project: "Brigadas voluntárias do Jalapão Norte", editalId: "TO-2026-015", status: "Aprovado", score: 92, value: "R$ 920 mil", submittedAt: "há 5 dias" },
  { id: "PRJ-2026-0407", proponente: "AME — Associação Mulheres Extrativistas", project: "Cadeia do babaçu — Bico do Papagaio", editalId: "TO-2026-017", status: "Ajustes solicitados", score: 64, value: "R$ 640 mil", submittedAt: "há 1 semana" },
  { id: "PRJ-2026-0392", proponente: "Universidade Federal do Tocantins", project: "Inventário florestal — Bacia do Araguaia", editalId: "TO-2026-009", status: "Em análise", score: 71, value: "R$ 2,1 mi", submittedAt: "há 9 dias" },
  { id: "PRJ-2026-0388", proponente: "ONG Águas do Cerrado", project: "PSA RPPN Serra das Cordilheiras", editalId: "TO-2026-012", status: "Reprovado", score: 41, value: "R$ 480 mil", submittedAt: "há 12 dias" },
  { id: "PRJ-2026-0377", proponente: "Coletivo Indígena Krahô", project: "Educação bilíngue e clima", editalId: "TO-2026-014", status: "Aprovado", score: 88, value: "R$ 310 mil", submittedAt: "há 14 dias" },
];