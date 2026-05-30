"use client";

import pages from "@/config/pages.consts";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { mockSubmissions } from "@/mock/SubmissaoData";
import { editais, statusColor } from "@/mock/EditalData";
import { SubStatus } from "@/model/edital/TSubStatus";
import HeaderProponente from "./HeaderProponente";
import HeroProponente from "./HeroProponente";
import DemonstrationTable from "@/libs/table/DemonstrationTable";

const subStatusStyle: Record<SubStatus, string> = {
  "Rascunho": "bg-muted text-muted-foreground border-border",
  "Em análise": "bg-ocean/10 text-ocean border-ocean/20",
  "Aprovado": "bg-leaf/10 text-leaf border-leaf/20",
  "Ajustes solicitados": "bg-amber-500/10 text-amber-600 border-amber-500/20",
  "Reprovado": "bg-destructive/10 text-destructive border-destructive/20",
};

export default function Proponente() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"Todos" | SubStatus>("Todos");
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    return mockSubmissions.filter((s) => {
      if (filter !== "Todos" && s.status !== filter) return false;
      if (query && !`${s.project} ${s.edital} ${s.id}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [query, filter]);

  const stats = [
    { l: "Submissões", v: mockSubmissions.length.toString() },
    { l: "Em análise", v: mockSubmissions.filter((s) => s.status === "Em análise").length.toString() },
    { l: "Aprovadas", v: mockSubmissions.filter((s) => s.status === "Aprovado").length.toString() },
    { l: "Captado", v: "R$ 920 mil" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <HeaderProponente />
      <div className="mx-auto max-w-7xl px-6 py-12">
        <HeroProponente setOpen={setOpen} />
        <DemonstrationTable values={stats} cols={4} light />

        <div className="mt-10 flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por projeto, edital ou protocolo…"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border text-sm focus:outline-none focus:border-ocean focus:ring-4 focus:ring-ocean/10 transition-all"
            />
          </div>
          <div className="flex gap-1 p-1 bg-secondary rounded-xl overflow-x-auto">
            {(["Todos", "Rascunho", "Em análise", "Aprovado", "Ajustes solicitados"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs px-3 py-2 rounded-lg whitespace-nowrap transition-all ${filter === f ? "bg-card shadow-soft text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >{f}</button>
            ))}
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {filtered.length === 0 && (
            <div className="text-center py-16 border border-dashed border-border rounded-2xl">
              <div className="text-muted-foreground">Nenhuma submissão encontrada.</div>
            </div>
          )}
          {filtered.map((s, idx) => (
            <motion.article
              key={s.id}
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
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && <EditalPicker onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

function EditalPicker({ onClose }: { onClose: () => void }) {

  const [q, setQ] = useState("");
  const open = editais.filter((e) => e.status === "Aberto" || e.status === "Encerrando");
  const list = open.filter((e) => !q || `${e.title} ${e.theme} ${e.region}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 20, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-card border border-border rounded-3xl shadow-elevated overflow-hidden"
      >
        <div className="p-6 border-b border-border">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground font-mono"><span className="text-leaf">●</span> Nova submissão</div>
              <h2 className="mt-2 font-display text-2xl tracking-[-0.01em]">Escolha o edital</h2>
              <p className="mt-1 text-sm text-muted-foreground">Selecione um edital aberto para iniciar a submissão guiada em 10 etapas.</p>
            </div>
            <button onClick={onClose} className="h-9 w-9 inline-flex items-center justify-center rounded-full hover:bg-secondary transition-colors">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" /></svg>
            </button>
          </div>

          <div className="relative mt-4">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
            <input
              value={q} onChange={(e) => setQ(e.target.value)} autoFocus
              placeholder="Buscar edital por tema, região…"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary/60 border border-transparent text-sm focus:outline-none focus:border-ocean focus:bg-card transition-all"
            />
          </div>
        </div>

        <div className="max-h-[55vh] overflow-y-auto p-3">
          {list.length === 0 && <div className="text-center py-12 text-muted-foreground text-sm">Nenhum edital encontrado.</div>}
          {list.map((e) => (
            <button
              key={e.id}
              className="w-full text-left p-4 rounded-xl hover:bg-secondary/60 transition-colors group flex items-start gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[10px] uppercase tracking-[0.16em] font-mono px-2 py-0.5 rounded-full border ${statusColor(e.status)}`}>{e.status}</span>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">{e.id} · {e.region}</span>
                </div>
                <div className="mt-1.5 font-display text-base leading-snug">{e.title}</div>
                <div className="mt-1 text-xs text-muted-foreground">{e.theme} · Prazo: {e.deadline} · {e.value}</div>
              </div>
              <svg className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-border bg-secondary/30 flex items-center justify-between text-xs text-muted-foreground">
          <span>Não encontrou? <Link href={pages.editais.path} className="text-foreground underline">Ver todos os editais</Link></span>
          <button onClick={onClose} className="px-3 py-1.5 rounded-full hover:bg-card transition-colors">Cancelar</button>
        </div>
      </motion.div>
    </motion.div>
  );
}