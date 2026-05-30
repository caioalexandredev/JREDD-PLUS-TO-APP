import pages from "@/config/pages.consts";
import { Submission } from "@/model/edital/ISubmission";
import { SubStatus } from "@/model/edital/TSubStatus";
import { motion } from "motion/react";
import Link from "next/link";

type Props = {
  s: Submission;
  idx: number;
}

const subStatusStyle: Record<SubStatus, string> = {
  "Rascunho": "bg-muted text-muted-foreground border-border",
  "Em análise": "bg-ocean/10 text-ocean border-ocean/20",
  "Aprovado": "bg-leaf/10 text-leaf border-leaf/20",
  "Ajustes solicitados": "bg-amber-500/10 text-amber-600 border-amber-500/20",
  "Reprovado": "bg-destructive/10 text-destructive border-destructive/20",
};

export default function EditalCard({ s, idx }: Props) {
  return <motion.article
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, delay: idx * 0.04 }}
    className="group bg-card border border-border rounded-2xl p-5 hover:shadow-soft hover:border-primary/30 transition-all"
  >
    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-[10px] uppercase tracking-[0.16em] font-mono px-2 py-0.5 rounded-full border ${subStatusStyle[s.status]}`}>{s.status}</span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">{s.id}</span>
        </div>
        <h3 className="mt-2 font-display text-xl leading-tight">{s.project}</h3>
        <div className="mt-1 text-sm text-muted-foreground truncate">Edital · {s.edital}</div>
      </div>

      <div className="flex items-center gap-6 lg:gap-8 shrink-0">
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">Valor</div>
          <div className="font-display text-lg">{s.value}</div>
        </div>
        <div className="hidden md:block w-32">
          <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground mb-1">
            <span>Progresso</span><span>{s.progress}%</span>
          </div>
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-gradient-hero" style={{ width: `${s.progress}%` }} />
          </div>
          <div className="mt-1 text-[10px] text-muted-foreground font-mono">Atualizado {s.updatedAt}</div>
        </div>
        <Link
          href={pages.submeter.path}
          className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-full border border-border hover:bg-secondary hover:border-primary/40 transition-all"
        >
          {s.status === "Rascunho" ? "Continuar" : "Abrir"}
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </Link>
      </div>
    </div>
  </motion.article>
}