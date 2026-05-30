import { Submission } from "@/model/edital/ISubmission";

export const mockSubmissions: Submission[] = [
    {
        id: "PRJ-2026-0418",
        project: "Recuperação de nascentes — Vale do Araguaia",
        edital: "Recuperação de nascentes — Bacia do Tocantins",
        editalId: "TO-2026-018",
        status: "Em análise",
        progress: 100,
        updatedAt: "há 2 dias",
        value: "R$ 1,8 mi",
    },
    {
        id: "PRJ-2026-0392",
        project: "Brigadas comunitárias do Jalapão",
        edital: "Prevenção e combate a incêndios florestais",
        editalId: "TO-2026-017",
        status: "Aprovado",
        progress: 100,
        updatedAt: "há 11 dias",
        value: "R$ 920 mil",
    },
    {
        id: "PRJ-2026-0501",
        project: "Cadeia produtiva do babaçu — Bico do Papagaio",
        edital: "Fomento à bioeconomia do Cerrado",
        editalId: "TO-2026-016",
        status: "Rascunho",
        progress: 42,
        updatedAt: "há 4 horas",
        value: "R$ 640 mil",
    },
    {
        id: "PRJ-2026-0377",
        project: "Educação ambiental nas escolas rurais",
        edital: "Educação ambiental no semiárido",
        editalId: "TO-2026-015",
        status: "Ajustes solicitados",
        progress: 86,
        updatedAt: "há 1 semana",
        value: "R$ 310 mil",
    },
];