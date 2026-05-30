export type SubStatus = "Rascunho" | "Em análise" | "Aprovado" | "Ajustes solicitados" | "Reprovado";

export const subStatusStyle: Record<SubStatus, string> = {
  "Rascunho": "bg-muted text-muted-foreground border-border",
  "Em análise": "bg-ocean/10 text-ocean border-ocean/20",
  "Aprovado": "bg-leaf/10 text-leaf border-leaf/20",
  "Ajustes solicitados": "bg-amber-500/10 text-amber-600 border-amber-500/20",
  "Reprovado": "bg-destructive/10 text-destructive border-destructive/20",
};