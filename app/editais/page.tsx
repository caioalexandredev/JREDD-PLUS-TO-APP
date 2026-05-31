"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/home/navbar";
import Rodape from "@/components/home/rodape";
import info from "@/config/app.info";
import { api } from "@/libs/api";
import {
  editalStatusColor,
  editalStatusLabel,
  EditalResumoApi,
  formatCurrencyRange,
  formatDate,
  PageResponse,
} from "@/libs/jredd-api-types";

export default function EditaisPage() {
  const [editais, setEditais] = useState<EditalResumoApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api<PageResponse<EditalResumoApi>>("/editais?size=100", { skipUnauthorizedRedirect: true })
      .then((page) => {
        setEditais(page.content ?? []);
        setError("");
      })
      .catch(() => setError("Nao foi possivel carregar os editais agora. Tente novamente em alguns instantes."))
      .finally(() => setLoading(false));
  }, []);

  const sorted = useMemo(
    () => [...editais].sort((a, b) => String(a.fimRecebimentoPropostas ?? "").localeCompare(String(b.fimRecebimentoPropostas ?? ""))),
    [editais],
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 pt-32 pb-16">
        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground font-mono">Chamadas publicas</div>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl leading-[1.02]">
            Editais ambientais abertos e em acompanhamento
          </h1>
          <p className="mt-4 text-muted-foreground">
            Consulte chamadas, prazos, regioes e documentos para preparar propostas ao {info.name}.
          </p>
        </div>

        {loading && (
          <section className="mt-10 grid md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-64 rounded-2xl border border-border bg-card animate-pulse" />
            ))}
          </section>
        )}

        {!loading && error && (
          <div className="mt-10 rounded-2xl border border-destructive/20 bg-destructive/5 px-5 py-4 text-sm text-destructive">
            {error}
          </div>
        )}

        {!loading && !error && sorted.length === 0 && (
          <div className="mt-10 rounded-2xl border border-dashed border-border px-5 py-16 text-center text-muted-foreground">
            Nenhum edital publicado no momento.
          </div>
        )}

        {!loading && !error && sorted.length > 0 && (
          <section className="mt-10 grid md:grid-cols-2 gap-4">
            {sorted.map((edital) => (
              <article key={edital.id} className="bg-card border border-border rounded-2xl p-5 shadow-soft">
                <div className="flex items-start justify-between gap-3">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">#{edital.id}</div>
                  <span className={`text-[10px] uppercase tracking-[0.16em] font-mono px-2 py-0.5 rounded-full border ${editalStatusColor(edital.status)}`}>
                    {editalStatusLabel(edital.status)}
                  </span>
                </div>
                <h2 className="mt-3 font-display text-2xl leading-tight">{edital.titulo}</h2>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{edital.resumo || "Resumo do edital ainda nao informado."}</p>
                <div className="mt-5 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span className="rounded-full bg-secondary px-3 py-1">{edital.frenteAtuacao || "Frente nao informada"}</span>
                  <span className="rounded-full bg-secondary px-3 py-1">{edital.regiaoImediata || "Regiao nao informada"}</span>
                  <span className="rounded-full bg-secondary px-3 py-1">{formatCurrencyRange(edital.valorMinimo, edital.valorMaximo)}</span>
                  <span className="rounded-full bg-secondary px-3 py-1">
                    Inscricoes: {formatDate(edital.inicioRecebimentoPropostas)} a {formatDate(edital.fimRecebimentoPropostas)}
                  </span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Link
                    href={`/editais/${edital.id}`}
                    className="inline-flex rounded-full border border-border px-4 py-2 text-sm hover:bg-secondary transition-colors"
                  >
                    Ver edital
                  </Link>
                  <Link
                    href={`/auth?next=${encodeURIComponent(`/submeter?editalId=${edital.id}`)}`}
                    className="inline-flex rounded-full bg-gradient-hero text-primary-foreground px-4 py-2 text-sm font-medium hover:shadow-soft transition-all"
                  >
                    Submeter proposta
                  </Link>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
      <Rodape />
    </div>
  );
}
