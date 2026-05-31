"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import DashboardHeader from "@/components/shared/DashboardHeader";
import DemonstrationTable from "@/libs/table/DemonstrationTable";
import { api, User } from "@/libs/api";
import info from "@/config/app.info";

type EditalResumo = {
  id: number;
  titulo: string;
  frenteAtuacao: string;
  regiaoImediata: string;
  valorMaximo: number;
  status: string;
};

type Projeto = {
  id: number;
  nomeProjeto: string;
  proponente: string;
  edital: string;
  resumo: string;
  status: string;
};

type Ranking = {
  projetoId: number;
  nomeProjeto: string;
  proponente: string;
  notaFinal: number;
  avaliacaoCompleta: boolean;
  pendencias: number;
};

type Criterio = {
  id: number;
  nome: string;
  descricao?: string;
  ordem: number;
};

type EditalDetalhe = EditalResumo & {
  criterios: Criterio[];
};

export default function Avaliador() {
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status");
  const [editais, setEditais] = useState<EditalResumo[]>([]);
  const [selected, setSelected] = useState<EditalResumo | null>(null);
  const [detalhe, setDetalhe] = useState<EditalDetalhe | null>(null);
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [ranking, setRanking] = useState<Ranking[]>([]);
  const [auditores, setAuditores] = useState<User[]>([]);
  const [activeProject, setActiveProject] = useState<Projeto | null>(null);
  const [scores, setScores] = useState<Record<number, string>>({});
  const [comments, setComments] = useState<Record<number, string>>({});
  const [auditorId, setAuditorId] = useState("");

  useEffect(() => {
    api<EditalResumo[]>("/avaliador/editais")
      .then((data) => {
        const filtered = statusParam ? data.filter((edital) => edital.status === statusParam) : data;
        setEditais(filtered);
        setSelected(filtered[0] ?? null);
      })
      .catch(() => toast.error("Nao foi possivel carregar seus editais."));
    api<User[]>("/users/perfil?profile=AUDITOR").then(setAuditores).catch(() => setAuditores([]));
  }, [statusParam]);

  useEffect(() => {
    if (!selected) return;
    Promise.all([
      api<EditalDetalhe>(`/editais/${selected.id}`),
      api<Projeto[]>(`/avaliador/editais/${selected.id}/projetos`),
      api<Ranking[]>(`/avaliador/editais/${selected.id}/ranking`),
    ])
      .then(([edital, projetosData, rankingData]) => {
        setDetalhe(edital);
        setProjetos(projetosData);
        setRanking(rankingData);
        setActiveProject(projetosData[0] ?? null);
      })
      .catch(() => toast.error("Nao foi possivel carregar os projetos."));
  }, [selected]);

  const stats = useMemo(() => [
    { l: "Editais", v: String(editais.length), sub: "vinculados" },
    { l: "Projetos", v: String(projetos.length), sub: "recebidos" },
    { l: "Ranking", v: String(ranking.filter((item) => item.avaliacaoCompleta).length), sub: "completas" },
    { l: "Pendencias", v: String(ranking.reduce((sum, item) => sum + item.pendencias, 0)), sub: "criterios" },
  ], [editais.length, projetos.length, ranking]);

  const salvarAvaliacao = async () => {
    if (!activeProject || !detalhe) return;
    const invalid = detalhe.criterios.some((criterio) => {
      const value = Number(scores[criterio.id]);
      return !Number.isInteger(value) || value < 1 || value > 10;
    });
    if (invalid) {
      toast.error("Preencha todos os criterios com notas inteiras de 1 a 10.");
      return;
    }
    try {
      await api<void>(`/avaliador/projetos/${activeProject.id}/avaliacoes`, {
        method: "POST",
        body: JSON.stringify({
          notas: detalhe.criterios.map((criterio) => ({
            criterioId: criterio.id,
            nota: Number(scores[criterio.id] ?? 0),
            comentario: comments[criterio.id] ?? "",
          })),
        }),
      });
      toast.success("Avaliacao salva.");
      setRanking(await api<Ranking[]>(`/avaliador/editais/${detalhe.id}/ranking`));
    } catch {
      toast.error("Preencha todos os criterios com notas de 1 a 10.");
    }
  };

  const selecionarVencedor = async (projetoId: number) => {
    if (!detalhe || !auditorId) {
      toast.error("Selecione um auditor antes de encerrar o edital.");
      return;
    }
    try {
      await api(`/avaliador/editais/${detalhe.id}/selecionar-vencedor`, {
        method: "POST",
        body: JSON.stringify({ projetoId, auditorId: Number(auditorId) }),
      });
      toast.success("Projeto vencedor selecionado e acompanhamento iniciado.");
      setRanking(await api<Ranking[]>(`/avaliador/editais/${detalhe.id}/ranking`));
    } catch {
      toast.error("Ainda existem avaliacoes pendentes ou o auditor e invalido.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader label="Area do avaliador" title={`Avaliacao Tecnica ${info.name}`} />
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground font-mono"><span className="text-ocean">*</span> Avaliacao</div>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl leading-[1.02]">Projetos e <span className="text-gradient italic">ranking</span></h1>
            <p className="mt-2 text-muted-foreground max-w-xl">Avalie criterios, acompanhe pendencias e selecione o projeto vencedor com o auditor responsavel.</p>
          </div>
          <select value={selected?.id ?? ""} onChange={(e) => setSelected(editais.find((item) => item.id === Number(e.target.value)) ?? null)} className="px-4 py-3 rounded-xl bg-card border border-border text-sm">
            {editais.map((edital) => <option key={edital.id} value={edital.id}>{edital.titulo}</option>)}
          </select>
        </div>

        <DemonstrationTable values={stats} cols={4} light />

        <div className="mt-10 grid lg:grid-cols-12 gap-6">
          <section className="lg:col-span-5 space-y-3">
            {projetos.map((projeto) => (
              <button key={projeto.id} onClick={() => setActiveProject(projeto)} className={`w-full text-left bg-card border rounded-2xl p-5 transition-all ${activeProject?.id === projeto.id ? "border-ocean shadow-soft" : "border-border hover:border-primary/30"}`}>
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">{projeto.status}</div>
                <h2 className="mt-2 font-display text-xl leading-tight">{projeto.nomeProjeto}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{projeto.proponente}</p>
              </button>
            ))}
          </section>

          <section className="lg:col-span-7 bg-card border border-border rounded-2xl p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">Formulario de avaliacao</div>
                <h2 className="mt-2 font-display text-2xl">{activeProject?.nomeProjeto ?? "Selecione um projeto"}</h2>
              </div>
              <button onClick={salvarAvaliacao} disabled={!activeProject} className="rounded-full bg-gradient-hero text-primary-foreground px-5 py-2.5 text-sm font-medium disabled:opacity-50">Salvar</button>
            </div>

            <div className="mt-6 space-y-4">
              {detalhe?.criterios.map((criterio) => (
                <div key={criterio.id} className="rounded-xl border border-border bg-background/60 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-medium">{criterio.nome}</div>
                      <div className="text-xs text-muted-foreground">{criterio.descricao || "Nota de 1 a 10"}</div>
                    </div>
                    <input type="number" min="1" max="10" step="1" value={scores[criterio.id] ?? ""} onChange={(e) => setScores((prev) => ({ ...prev, [criterio.id]: e.target.value }))} className="w-24 rounded-lg border border-border bg-card px-3 py-2 text-sm" />
                  </div>
                  <textarea value={comments[criterio.id] ?? ""} onChange={(e) => setComments((prev) => ({ ...prev, [criterio.id]: e.target.value }))} placeholder="Comentario tecnico" className="mt-3 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm min-h-20" />
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-border flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">Ranking final</div>
              <div className="font-display text-2xl">Classificacao por media</div>
            </div>
            <select value={auditorId} onChange={(e) => setAuditorId(e.target.value)} className="px-4 py-2.5 rounded-xl bg-background border border-border text-sm">
              <option value="">Selecionar auditor</option>
              {auditores.map((auditor) => <option key={auditor.id} value={auditor.id}>{auditor.nome}</option>)}
            </select>
          </div>
          {ranking.map((item, index) => (
            <div key={item.projetoId} className="px-5 py-4 border-t border-border flex items-center gap-4">
              <div className="font-mono text-muted-foreground w-8">{index + 1}</div>
              <div className="flex-1">
                <div className="font-medium">{item.nomeProjeto}</div>
                <div className="text-xs text-muted-foreground">{item.proponente} - {item.avaliacaoCompleta ? "completa" : `${item.pendencias} pendencias`}</div>
              </div>
              <div className="font-display text-2xl">{Number(item.notaFinal).toFixed(2)}</div>
              <button onClick={() => selecionarVencedor(item.projetoId)} disabled={!item.avaliacaoCompleta} className="rounded-full border border-border px-4 py-2 text-sm hover:bg-secondary disabled:opacity-40">Escolher</button>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
