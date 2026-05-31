"use client";

import { AnimatePresence } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { mockSubmissions } from "@/mock/SubmissaoData";
import { SubStatus } from "@/model/edital/TSubStatus";
import HeaderProponente from "./HeaderProponente";
import HeroProponente from "./HeroProponente";
import DemonstrationTable, { IDemonstrationTableValues } from "@/libs/table/DemonstrationTable";
import EditalCard from "./EditalCard";
import EditalSubmissionModal from "./EditalSubmissionModal";
import { api, uploadDocumento } from "@/libs/api";
import { toast } from "sonner";

type Projeto = {
  id: number;
  nome: string;
  auditor: string;
  atividades: { id: number; nome: string; status: string; inicio?: string; fim?: string }[];
  evidencias: { id: number; descricao: string; status: string; atividade?: string }[];
};

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
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [evidenceText, setEvidenceText] = useState<Record<number, string>>({});
  const [evidenceFile, setEvidenceFile] = useState<Record<number, File | null>>({});

  useEffect(() => {
    api<Projeto[]>("/proponente/projetos")
      .then(setProjetos)
      .catch(() => setProjetos([]));
  }, []);

  const filtered = useMemo(() => {
    return mockSubmissions.filter((s) => {
      if (filter !== "Todos" && s.status !== filter) return false;
      if (query && !`${s.project} ${s.edital} ${s.id}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [query, filter]);

  const enviarEvidencia = async (projetoId: number) => {
    const file = evidenceFile[projetoId];
    if (!file || !evidenceText[projetoId]) {
      toast.error("Informe uma foto e uma descricao.");
      return;
    }
    try {
      const documento = await uploadDocumento(file, "EVIDENCIA");
      await api(`/projetos/${projetoId}/evidencias`, {
        method: "POST",
        body: JSON.stringify({ fotoDocumentoId: documento.id, descricao: evidenceText[projetoId] }),
      });
      toast.success("Evidencia enviada para validacao.");
      setProjetos(await api<Projeto[]>("/proponente/projetos"));
      setEvidenceText((prev) => ({ ...prev, [projetoId]: "" }));
      setEvidenceFile((prev) => ({ ...prev, [projetoId]: null }));
    } catch {
      toast.error("Nao foi possivel enviar a evidencia.");
    }
  };

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

        {projetos.length > 0 && (
          <section className="mt-12">
            <div className="mb-5">
              <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground font-mono"><span className="text-leaf">●</span> Acompanhamento</div>
              <h2 className="mt-2 font-display text-3xl">Projetos em execucao</h2>
            </div>
            <div className="space-y-4">
              {projetos.map((projeto) => (
                <article key={projeto.id} className="bg-card border border-border rounded-2xl p-5">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1">
                      <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">Auditor: {projeto.auditor}</div>
                      <h3 className="mt-2 font-display text-2xl">{projeto.nome}</h3>
                      <div className="mt-4 grid md:grid-cols-2 gap-2">
                        {projeto.atividades.map((atividade) => (
                          <div key={atividade.id} className="rounded-xl bg-secondary/50 border border-border p-3">
                            <div className="text-sm font-medium">{atividade.nome}</div>
                            <div className="text-xs text-muted-foreground mt-1">{atividade.status}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="lg:w-96">
                      <div className="text-sm font-medium mb-2">Nova evidencia</div>
                      <input type="file" accept="image/*" onChange={(e) => setEvidenceFile((prev) => ({ ...prev, [projeto.id]: e.target.files?.[0] ?? null }))} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" />
                      <textarea value={evidenceText[projeto.id] ?? ""} onChange={(e) => setEvidenceText((prev) => ({ ...prev, [projeto.id]: e.target.value }))} placeholder="Descreva a evidencia enviada" className="mt-3 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm min-h-24" />
                      <button onClick={() => enviarEvidencia(projeto.id)} className="mt-3 w-full rounded-full bg-gradient-hero text-primary-foreground px-4 py-2.5 text-sm font-medium">Enviar evidencia</button>
                    </div>
                  </div>
                  {projeto.evidencias.length > 0 && (
                    <div className="mt-5 pt-4 border-t border-border flex flex-wrap gap-2">
                      {projeto.evidencias.map((evidencia) => (
                        <span key={evidencia.id} className="text-xs px-3 py-1 rounded-full bg-secondary text-muted-foreground">{evidencia.status} · {evidencia.descricao}</span>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}
      </div>

      <AnimatePresence>
        {open && <EditalSubmissionModal onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
