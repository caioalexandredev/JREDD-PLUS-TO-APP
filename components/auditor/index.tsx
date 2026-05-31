"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import DashboardHeader from "@/components/shared/DashboardHeader";
import DemonstrationTable from "@/libs/table/DemonstrationTable";
import { api } from "@/libs/api";

type Atividade = {
  id: number;
  nome: string;
  responsavel?: string;
  inicio?: string;
  fim?: string;
  descricao?: string;
  status: string;
};

type Evidencia = {
  id: number;
  atividadeId?: number;
  atividade?: string;
  fotoDocumentoId: string;
  descricao: string;
  status: "PENDENTE" | "APROVADA" | "REJEITADA";
  comentarioAuditor?: string;
  criadoEm: string;
};

type Projeto = {
  id: number;
  nome: string;
  proponente: string;
  auditor: string;
  criadoEm: string;
  atividades: Atividade[];
  evidencias: Evidencia[];
};

export default function Auditor() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [selected, setSelected] = useState<Projeto | null>(null);
  const [comments, setComments] = useState<Record<number, string>>({});

  useEffect(() => {
    api<Projeto[]>("/auditor/projetos")
      .then((data) => {
        setProjetos(data);
        setSelected(data[0] ?? null);
      })
      .catch(() => toast.error("Nao foi possivel carregar os projetos do auditor."));
  }, []);

  const stats = useMemo(() => [
    { l: "Projetos", v: String(projetos.length), sub: "atribuidos" },
    { l: "Atividades", v: String(selected?.atividades.length ?? 0), sub: "no cronograma" },
    { l: "Pendentes", v: String(selected?.evidencias.filter((item) => item.status === "PENDENTE").length ?? 0), sub: "evidencias" },
    { l: "Validadas", v: String(selected?.evidencias.filter((item) => item.status === "APROVADA").length ?? 0), sub: "aprovadas" },
  ], [projetos.length, selected]);

  const validar = async (evidenciaId: number, status: "APROVADA" | "REJEITADA") => {
    try {
      await api(`/auditor/evidencias/${evidenciaId}/validar`, {
        method: "POST",
        body: JSON.stringify({ status, comentario: comments[evidenciaId] ?? "" }),
      });
      toast.success(status === "APROVADA" ? "Evidencia aprovada." : "Evidencia rejeitada.");
      if (selected) {
        const refreshed = await api<Projeto>(`/projetos/${selected.id}`);
        setSelected(refreshed);
        setProjetos((prev) => prev.map((item) => item.id === refreshed.id ? refreshed : item));
      }
    } catch {
      toast.error("Nao foi possivel validar a evidencia.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader label="Area do auditor" title="Acompanhamento e evidencias" />
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground font-mono"><span className="text-leaf">●</span> Auditoria</div>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl leading-[1.02]">Gestao de <span className="text-gradient italic">impacto</span></h1>
            <p className="mt-2 text-muted-foreground max-w-xl">Acompanhe o cronograma do projeto vencedor e valide as evidencias enviadas pelo proponente.</p>
          </div>
          <select value={selected?.id ?? ""} onChange={(e) => setSelected(projetos.find((item) => item.id === Number(e.target.value)) ?? null)} className="px-4 py-3 rounded-xl bg-card border border-border text-sm">
            {projetos.map((projeto) => <option key={projeto.id} value={projeto.id}>{projeto.nome}</option>)}
          </select>
        </div>

        <DemonstrationTable values={stats} cols={4} light />

        <div className="mt-10 grid lg:grid-cols-12 gap-6">
          <section className="lg:col-span-5 bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-border">
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">Cronograma</div>
              <h2 className="mt-2 font-display text-2xl">{selected?.nome ?? "Nenhum projeto"}</h2>
              <p className="text-sm text-muted-foreground">{selected?.proponente}</p>
            </div>
            {selected?.atividades.map((atividade) => (
              <div key={atividade.id} className="px-5 py-4 border-t border-border">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-medium">{atividade.nome}</div>
                  <span className="text-[10px] uppercase tracking-[0.16em] font-mono px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{atividade.status}</span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{atividade.inicio ?? "Sem inicio"} · {atividade.fim ?? "Sem fim"}</div>
                {atividade.descricao && <p className="mt-2 text-sm text-foreground/75">{atividade.descricao}</p>}
              </div>
            ))}
          </section>

          <section className="lg:col-span-7 space-y-3">
            {selected?.evidencias.length === 0 && (
              <div className="text-center py-16 border border-dashed border-border rounded-2xl text-muted-foreground">Nenhuma evidencia enviada.</div>
            )}
            {selected?.evidencias.map((evidencia) => (
              <article key={evidencia.id} className="bg-card border border-border rounded-2xl p-5">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="h-24 md:w-32 rounded-xl bg-gradient-mesh border border-border flex items-center justify-center text-xs text-muted-foreground shrink-0">
                    Foto
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] uppercase tracking-[0.16em] font-mono px-2 py-0.5 rounded-full border ${evidencia.status === "APROVADA" ? "bg-leaf/15 text-leaf border-leaf/30" : evidencia.status === "REJEITADA" ? "bg-destructive/10 text-destructive border-destructive/30" : "bg-ocean/15 text-ocean border-ocean/30"}`}>{evidencia.status}</span>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">{evidencia.atividade ?? "Sem atividade"}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed">{evidencia.descricao}</p>
                    {evidencia.comentarioAuditor && <p className="mt-2 text-xs text-muted-foreground">Parecer: {evidencia.comentarioAuditor}</p>}
                    <textarea value={comments[evidencia.id] ?? ""} onChange={(e) => setComments((prev) => ({ ...prev, [evidencia.id]: e.target.value }))} placeholder="Parecer do auditor" className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm min-h-20" />
                    <div className="mt-3 flex justify-end gap-2">
                      <button onClick={() => validar(evidencia.id, "REJEITADA")} className="rounded-full border border-border px-4 py-2 text-sm hover:bg-secondary">Rejeitar</button>
                      <button onClick={() => validar(evidencia.id, "APROVADA")} className="rounded-full bg-gradient-hero text-primary-foreground px-4 py-2 text-sm">Aprovar</button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
