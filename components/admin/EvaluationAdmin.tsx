"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/libs/api";
import { formatDate, ProjetoDetalheApi } from "@/libs/jredd-api-types";

export default function EvaluationAdmin() {
  const params = useParams<{ id: string }>();
  const [projeto, setProjeto] = useState<ProjetoDetalheApi | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!params.id) return;
    api<ProjetoDetalheApi>(`/projetos/${params.id}`)
      .then((response) => {
        setProjeto(response);
        setError("");
      })
      .catch(() => setError("Nao foi possivel carregar os dados do projeto."))
      .finally(() => setLoading(false));
  }, [params.id]);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 glass border-b border-border">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center gap-4">
          <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Voltar ao painel
          </Link>
          <div className="h-6 w-px bg-border" />
          <div className="hidden sm:block">
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono"><span className="text-destructive">o</span> Dossie tecnico</div>
            <div className="text-sm font-medium leading-tight font-mono">Projeto #{params.id}</div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        {loading && <div className="rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground">Carregando projeto...</div>}
        {!loading && error && <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-5 text-sm text-destructive">{error}</div>}

        {!loading && !error && projeto && (
          <>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground font-mono"><span className="text-destructive">o</span> Edital #{projeto.editalId ?? "-"}</div>
              <h1 className="mt-3 font-display text-3xl sm:text-4xl tracking-[-0.02em] leading-[1.05]">{projeto.nome || "Projeto sem nome"}</h1>
              <p className="mt-2 text-muted-foreground">
                {projeto.proponente || "Proponente nao informado"} - Auditor: {projeto.auditor || "nao definido"} - Criado em {formatDate(projeto.criadoEm?.slice(0, 10))}
              </p>
            </motion.div>

            <div className="mt-8 grid lg:grid-cols-3 gap-6">
              <section className="lg:col-span-2 bg-card border border-border rounded-3xl overflow-hidden">
                <div className="px-6 py-5 border-b border-border">
                  <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-muted-foreground">Plano de execucao</div>
                  <div className="mt-1 text-sm text-muted-foreground">Atividades cadastradas pelo proponente</div>
                </div>
                <div className="p-6 space-y-3">
                  {projeto.atividades.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-border py-12 text-center text-muted-foreground">
                      Nenhuma atividade cadastrada.
                    </div>
                  )}
                  {projeto.atividades.map((atividade) => (
                    <article key={atividade.id} className="rounded-2xl border border-border bg-secondary/30 p-4">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                        <div>
                          <div className="font-medium">{atividade.nome || atividade.descricao || `Atividade ${atividade.id}`}</div>
                          <div className="mt-1 text-sm text-muted-foreground">{atividade.descricao || "Sem descricao"}</div>
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.16em] font-mono px-2 py-1 rounded-full border border-border bg-card text-muted-foreground">
                          {atividade.status || "Sem status"}
                        </span>
                      </div>
                      <div className="mt-4 grid sm:grid-cols-3 gap-3 text-xs text-muted-foreground">
                        <Info label="Responsavel" value={atividade.responsavel || "Nao informado"} />
                        <Info label="Inicio" value={formatDate(atividade.inicio)} />
                        <Info label="Fim" value={formatDate(atividade.fim)} />
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <aside className="space-y-4">
                <div className="bg-card border border-border rounded-3xl p-6">
                  <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-muted-foreground">Resumo</div>
                  <div className="mt-4 text-sm space-y-2">
                    <div className="flex justify-between gap-4"><span className="text-muted-foreground">Atividades</span><span>{projeto.atividades.length}</span></div>
                    <div className="flex justify-between gap-4"><span className="text-muted-foreground">Evidencias</span><span>{projeto.evidencias.length}</span></div>
                    <div className="flex justify-between gap-4"><span className="text-muted-foreground">Auditor</span><span className="truncate">{projeto.auditor || "Nao definido"}</span></div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-3xl p-6">
                  <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-muted-foreground mb-3">Evidencias</div>
                  <div className="space-y-2">
                    {projeto.evidencias.length === 0 && <div className="text-sm text-muted-foreground">Nenhuma evidencia enviada.</div>}
                    {projeto.evidencias.map((evidencia) => (
                      <div key={evidencia.id} className="rounded-xl border border-border bg-secondary/40 p-3">
                        <div className="text-sm font-medium">{evidencia.atividade || `Evidencia ${evidencia.id}`}</div>
                        <div className="text-xs text-muted-foreground mt-1">{evidencia.descricao || "Sem descricao"}</div>
                        <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground font-mono mt-2">{evidencia.status || "Sem status"}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.16em] font-mono text-muted-foreground">{label}</div>
      <div className="text-sm text-foreground">{value}</div>
    </div>
  );
}
