import { SubStatus } from "./TSubStatus";

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