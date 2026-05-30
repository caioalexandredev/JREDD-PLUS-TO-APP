import { motion } from "motion/react";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>
};

export default function HeroProponente({
  setOpen
}: Props) {
  return <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
    <div>
      <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground font-mono"><span className="text-leaf">●</span> Painel do proponente</div>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl tracking-[-0.02em] leading-[1.02]">
        Suas <span className="text-gradient italic">submissões</span>
      </h1>
      <p className="mt-2 text-muted-foreground max-w-xl">Acompanhe o andamento das propostas, retome rascunhos e inicie novas submissões aos editais abertos.</p>
    </div>

    <button
      onClick={() => setOpen(true)}
      className="group inline-flex items-center gap-2 rounded-full bg-gradient-hero text-primary-foreground px-5 py-3 text-sm font-medium shadow-glow hover:shadow-elevated transition-all hover:-translate-y-0.5"
    >
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" strokeLinecap="round" /></svg>
      Nova submissão
    </button>
  </motion.div>
}