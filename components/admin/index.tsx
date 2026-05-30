"use client";

import { motion } from "motion/react";
import { editais, Edital, EditalStatus, statusColor } from "@/mock/EditalData";
import { AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import NovoEditalModal from "./NovoEditalModal";
import Link from "next/link";
import { mockSubs } from "@/mock/AdminSubmission";
import { subStatusStyle } from "@/model/edital/TSubStatus";
import HeaderAdmin from "./HeaderAdmin";
import DemonstrationTable from "@/libs/table/DemonstrationTable";
import Tabs, { TabOption } from "@/libs/tab/Tabs";

const TABS: TabOption[] = [
  { value: "editais", label: "Editais publicados" },
  { value: "submissoes", label: "Submissões recebidas" },
];

export default function Admin() {
  const [tab, setTab] = useState<string>("editais");
  const [items, setItems] = useState<Edital[]>(editais);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"Todos" | EditalStatus>("Todos");

  const filteredEditais = useMemo(
    () => items.filter((e) => {
      if (statusFilter !== "Todos" && e.status !== statusFilter) return false;
      if (query && !`${e.title} ${e.id} ${e.theme} ${e.region}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    }),
    [items, query, statusFilter],
  );

  const totalValue = items.reduce((s, e) => s + e.valueNumber, 0);
  const formatMi = (v: number) =>
    v >= 1_000_000 ? `R$ ${(v / 1_000_000).toFixed(1)} mi` : `R$ ${(v / 1_000).toFixed(0)} mil`;

  const stats = [
    { l: "Editais", v: items.length.toString(), sub: `${items.filter((e) => e.status === "Aberto").length} abertos` },
    { l: "Submissões", v: mockSubs.length.toString(), sub: `${mockSubs.filter((s) => s.status === "Em análise").length} em análise` },
    { l: "Valor publicado", v: formatMi(totalValue), sub: "Carteira ativa" },
    { l: "Aprovação", v: `${Math.round((mockSubs.filter((s) => s.status === "Aprovado").length / mockSubs.length) * 100)}%`, sub: "últimos 90 dias" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <HeaderAdmin />

      <div className="mx-auto max-w-7xl px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground font-mono"><span className="text-destructive">●</span> Painel administrativo</div>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl tracking-[-0.02em] leading-[1.02]">
              Gestão de <span className="text-gradient italic">editais</span>
            </h1>
            <p className="mt-2 text-muted-foreground max-w-xl">Cadastre novos editais, acompanhe a carteira ativa e monitore o pipeline de submissões em avaliação.</p>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-hero text-primary-foreground px-5 py-3 text-sm font-medium shadow-glow hover:shadow-elevated transition-all hover:-translate-y-0.5"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" strokeLinecap="round" /></svg>
            Novo edital
          </button>
        </motion.div>

        <DemonstrationTable values={stats} cols={4} light />

        <Tabs
          options={TABS}
          activeTab={tab}
          onChange={setTab}
          className="mt-10"
        />

        {tab === "editais" && (
          <>
            <div className="mt-6 flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
              <div className="relative flex-1">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar edital por código, tema, região…" className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border text-sm focus:outline-none focus:border-ocean focus:ring-4 focus:ring-ocean/10 transition-all" />
              </div>
              <div className="flex gap-1 p-1 bg-secondary rounded-xl overflow-x-auto">
                {(["Todos", "Aberto", "Encerrando", "Em análise", "Encerrado"] as const).map((f) => (
                  <button key={f} onClick={() => setStatusFilter(f)} className={`text-xs px-3 py-2 rounded-lg whitespace-nowrap transition-all ${statusFilter === f ? "bg-card shadow-soft text-foreground" : "text-muted-foreground hover:text-foreground"}`}>{f}</button>
                ))}
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
              <table className="w-full text-sm">
                <thead className="bg-secondary/50">
                  <tr className="text-left text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">
                    <th className="px-5 py-3">Edital</th>
                    <th className="px-5 py-3 hidden md:table-cell">Tema</th>
                    <th className="px-5 py-3 hidden lg:table-cell">Região</th>
                    <th className="px-5 py-3">Valor</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEditais.map((e) => (
                    <tr key={e.id} className="border-t border-border hover:bg-secondary/30 transition-colors">
                      <td className="px-5 py-4">
                        <div style={{paddingTop: '15px', paddingBottom: '15px'}} className="pt-4">
                          <div className="font-medium leading-tight">{e.title}</div>
                          <div className="text-xs text-muted-foreground font-mono mt-0.5">{e.id} · {e.publishedAt}</div>
                        </div>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell text-muted-foreground">{e.theme}</td>
                      <td className="px-5 py-4 hidden lg:table-cell text-muted-foreground">{e.region}</td>
                      <td className="px-5 py-4 font-display">{e.value}</td>
                      <td className="px-5 py-4">
                        <span className={`text-[10px] uppercase tracking-[0.16em] font-mono px-2 py-0.5 rounded-full border ${statusColor(e.status)}`}>{e.status}</span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link href="/editais/$id" className="text-xs px-3 py-1.5 rounded-full border border-border hover:bg-secondary hover:border-primary/40 transition-all inline-flex items-center gap-1">
                          Abrir
                          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {filteredEditais.length === 0 && (
                    <tr><td colSpan={6} className="px-5 py-16 text-center text-muted-foreground">Nenhum edital encontrado.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === "submissoes" && (
          <div className="mt-6 space-y-3">
            {mockSubs.map((s, idx) => (
              <motion.article
                key={s.id}
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
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <NovoEditalModal
            onClose={() => setOpen(false)}
            onCreate={(e) => { setItems((prev) => [e, ...prev]); setOpen(false); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}