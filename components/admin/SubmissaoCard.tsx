import { AdminSubmission } from "@/mock/AdminSubmission";
import { subStatusStyle } from "@/model/edital/TSubStatus";
import { motion } from "motion/react";

type Props = {
  s: AdminSubmission,
  idx: number
}

export default function SubmissaoCard({
  idx, s
}: Props) {
  return <motion.article
    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: idx * 0.04 }}
    className="bg-card border border-border rounded-2xl p-5 hover:shadow-soft hover:border-primary/30 transition-all"
  >
    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-[10px] uppercase tracking-[0.16em] font-mono px-2 py-0.5 rounded-full border ${subStatusStyle[s.status]}`}>{s.status}</span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">{s.id} · {s.editalId}</span>
        </div>
        <h3 className="mt-2 font-display text-xl leading-tight">{s.project}</h3>
        <div className="mt-1 text-sm text-muted-foreground">{s.proponente} · enviado {s.submittedAt}</div>
      </div>
      <div className="flex items-center gap-6 lg:gap-8 shrink-0">
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">Valor</div>
          <div className="font-display text-lg">{s.value}</div>
        </div>
        <div className="hidden md:block w-32">
          <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground mb-1">
            <span>Score técnico</span><span>{s.score}/100</span>
          </div>
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <div className={`h-full ${s.score >= 80 ? "bg-leaf" : s.score >= 60 ? "bg-ocean" : "bg-destructive"}`} style={{ width: `${s.score}%` }} />
          </div>
        </div>
        <button className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-full border border-border hover:bg-secondary hover:border-primary/40 transition-all">
          Avaliar
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </div>
  </motion.article>
}