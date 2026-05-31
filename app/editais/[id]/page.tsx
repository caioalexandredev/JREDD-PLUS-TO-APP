"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import Navbar from "@/components/home/navbar";
import Rodape from "@/components/home/rodape";
import { api } from "@/libs/api";
import {
  DocumentoVinculadoApi,
  editalStatusColor,
  editalStatusLabel,
  EditalDetalheApi,
  formatCurrencyRange,
  formatDate,
} from "@/libs/jredd-api-types";

const API_URL = (process.env.NEXT_PUBLIC_API_URL?.trim() || "http://localhost:8282").replace(/\/$/, "");

export default function EditalPublicoDetalhePage() {
  const params = useParams<{ id: string }>();
  const editalId = params.id;
  const [edital, setEdital] = useState<EditalDetalheApi | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadEdital = useCallback(async () => {
    if (!editalId) return;
    setLoading(true);
    try {
      const response = await api<EditalDetalheApi>(`/editais/${editalId}`, { skipUnauthorizedRedirect: true });
      setEdital(response);
      setError("");
    } catch {
      setError("Nao foi possivel carregar os detalhes do edital.");
      setEdital(null);
    } finally {
      setLoading(false);
    }
  }, [editalId]);

  useEffect(() => {
    loadEdital();
  }, [loadEdital]);

  const criterios = useMemo(
    () => [...(edital?.criterios ?? [])].sort((a, b) => (a.ordem ?? 0) - (b.ordem ?? 0)),
    [edital],
  );
  const documentos = edital?.documentos ?? [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 pt-32 pb-16">
        <div className="mb-6">
          <Link href="/editais" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Voltar aos editais
          </Link>
        </div>

        {loading && <div className="rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground">Carregando edital...</div>}
        {!loading && error && <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-5 text-sm text-destructive">{error}</div>}

        {!loading && !error && edital && (
          <div className="space-y-8">
            <section className="bg-card border border-border rounded-2xl p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="max-w-3xl">
                  <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground font-mono">Edital #{edital.id}</div>
                  <h1 className="mt-3 font-display text-4xl sm:text-5xl leading-[1.02]">{edital.titulo}</h1>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{edital.resumo || "Resumo nao informado."}</p>
                </div>
                <span className={`w-fit text-[10px] uppercase tracking-[0.16em] font-mono px-3 py-1 rounded-full border ${editalStatusColor(edital.status)}`}>
                  {editalStatusLabel(edital.status)}
                </span>
              </div>

              <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden">
                <Info label="Orgao proponente" value={edital.orgaoProponente || "Nao informado"} />
                <Info label="Frente de atuacao" value={edital.frenteAtuacao || "Nao informada"} />
                <Info label="Regiao imediata" value={edital.regiaoImediata || "Nao informada"} />
                <Info label="Faixa de valor" value={formatCurrencyRange(edital.valorMinimo, edital.valorMaximo)} />
                <Info label="Inicio das inscricoes" value={formatDate(edital.inicioRecebimentoPropostas)} />
                <Info label="Fim das inscricoes" value={formatDate(edital.fimRecebimentoPropostas)} />
                <Info label="Estado" value={edital.estado || "Nao informado"} />
                <Info label="Atualizado em" value={formatDate(edital.atualizadoEm?.slice(0, 10))} />
              </div>

              <Link
                href={`/auth?next=${encodeURIComponent(`/submeter?editalId=${edital.id}`)}`}
                className="mt-6 inline-flex rounded-full bg-gradient-hero text-primary-foreground px-5 py-3 text-sm font-medium shadow-glow hover:shadow-elevated transition-all"
              >
                Submeter proposta
              </Link>
            </section>

            <div className="grid lg:grid-cols-3 gap-6">
              <section className="lg:col-span-2 bg-card border border-border rounded-2xl overflow-hidden">
                <div className="px-6 py-5 border-b border-border">
                  <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-muted-foreground">Criterios de avaliacao</div>
                  <div className="mt-1 text-sm text-muted-foreground">Criterios que serao usados na avaliacao das propostas.</div>
                </div>
                <div className="p-6 grid md:grid-cols-2 gap-3">
                  {criterios.length === 0 && <div className="md:col-span-2 rounded-2xl border border-dashed border-border py-12 text-center text-muted-foreground">Nenhum criterio cadastrado.</div>}
                  {criterios.map((criterio, index) => (
                    <article key={criterio.id ?? `${criterio.nome}-${index}`} className="rounded-2xl border border-border bg-secondary/30 p-4">
                      <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">Ordem {criterio.ordem ?? index + 1}</div>
                      <h2 className="mt-2 font-display text-xl">{criterio.nome}</h2>
                      <p className="mt-2 text-sm text-muted-foreground">{criterio.descricao || "Sem descricao."}</p>
                    </article>
                  ))}
                </div>
              </section>

              <aside className="bg-card border border-border rounded-2xl p-6 h-fit">
                <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-muted-foreground">Documentos</div>
                <div className="mt-4 space-y-3">
                  {documentos.length === 0 && <div className="rounded-2xl border border-dashed border-border py-10 text-center text-sm text-muted-foreground">Nenhum documento publicado.</div>}
                  {documentos.map((documento) => <DocumentoRow key={documento.id} documento={documento} />)}
                </div>
              </aside>
            </div>
          </div>
        )}
      </main>
      <Rodape />
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card p-4">
      <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">{label}</div>
      <div className="mt-1 text-sm font-medium">{value}</div>
    </div>
  );
}

function DocumentoRow({ documento }: { documento: DocumentoVinculadoApi }) {
  return (
    <a
      href={`${API_URL}/documentos/${documento.id}`}
      target="_blank"
      rel="noreferrer"
      className="block rounded-2xl border border-border bg-secondary/30 p-4 hover:bg-secondary/60 transition-colors"
    >
      <div className="font-medium truncate">{documento.nomeOriginal}</div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground font-mono">Baixar documento</div>
    </a>
  );
}
