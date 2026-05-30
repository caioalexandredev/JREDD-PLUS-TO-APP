"use client";

import { AnimatePresence } from "motion/react";
import { useMemo, useState } from "react";
import { mockSubmissions } from "@/mock/SubmissaoData";
import { SubStatus } from "@/model/edital/TSubStatus";
import HeaderProponente from "./HeaderProponente";
import HeroProponente from "./HeroProponente";
import DemonstrationTable, { IDemonstrationTableValues } from "@/libs/table/DemonstrationTable";
import EditalCard from "./EditalCard";
import EditalSubmissionModal from "./EditalSubmissionModal";

const stats: IDemonstrationTableValues[] = [
  { l: "Submissões", v: '100' },
  { l: "Em análise", v: '1' },
  { l: "Aprovadas", v: '1' },
  { l: "Captado", v: '1' },
];

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
            <EditalCard key={s.id} idx={idx} s={s} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && <EditalSubmissionModal onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}