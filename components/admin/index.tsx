"use client";

import { motion } from "motion/react";
import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import NovoEditalModal from "./NovoEditalModal";
import Link from "next/link";
import DemonstrationTable from "@/libs/table/DemonstrationTable";
import Tabs, { TabOption } from "@/libs/tab/Tabs";
import SubmissaoCard from "./SubmissaoCard";
import { api } from "@/libs/api";
import { toast } from "sonner";
import NavBarInterna from "@/libs/nav/NavBarInterna";
import {
  editalStatusColor,
  editalStatusLabel,
  EditalResumoApi,
  EditalStatusApi,
  formatCurrency,
  formatCurrencyRange,
  formatDate,
  PageResponse,
  ProjetoIndicadoresApi,
  ProjetoResumoApi,
} from "@/libs/jredd-api-types";

const TABS: TabOption[] = [
  { value: "editais", label: "Editais publicados" },
  { value: "submissoes", label: "Submissoes recebidas" },
];

const editalStatusOptions: Array<"Todos" | EditalStatusApi> = ["Todos", "RASCUNHO", "ABERTO", "EM_AVALIACAO", "ENCERRADO"];

const emptyIndicators: ProjetoIndicadoresApi = {
  totalSubmissoes: 0,
  submetidos: 0,
  emAvaliacao: 0,
  aprovados: 0,
  reprovados: 0,
  emExecucao: 0,
};

export default function Admin() {
  const [tab, setTab] = useState<string>("editais");
  const [editais, setEditais] = useState<EditalResumoApi[]>([]);
  const [projetos, setProjetos] = useState<ProjetoResumoApi[]>([]);
  const [indicadores, setIndicadores] = useState<ProjetoIndicadoresApi>(emptyIndicators);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"Todos" | EditalStatusApi>("Todos");
  const [loadingEditais, setLoadingEditais] = useState(true);
  const [loadingProjetos, setLoadingProjetos] = useState(true);

  const loadEditais = useCallback(async () => {
    setLoadingEditais(true);
    try {
      const page = await api<PageResponse<EditalResumoApi>>("/admin/editais?size=100");
      setEditais(page.content ?? []);
    } catch {
      setEditais([]);
      toast.error("Nao foi possivel carregar editais do backend.");
    } finally {
      setLoadingEditais(false);
    }
  }, []);

  const loadProjetos = useCallback(async () => {
    setLoadingProjetos(true);
    try {
      const [page, stats] = await Promise.all([
        api<PageResponse<ProjetoResumoApi>>("/projetos?size=100"),
        api<ProjetoIndicadoresApi>("/projetos/indicadores"),
      ]);
      setProjetos(page.content ?? []);
      setIndicadores(stats);
    } catch {
      setProjetos([]);
      setIndicadores(emptyIndicators);
      toast.error("Nao foi possivel carregar submissoes do backend.");
    } finally {
      setLoadingProjetos(false);
    }
  }, []);

  useEffect(() => {
    loadEditais();
    loadProjetos();
  }, [loadEditais, loadProjetos]);

  const filteredEditais = useMemo(
    () => editais.filter((edital) => {
      if (statusFilter !== "Todos" && edital.status !== statusFilter) return false;
      if (query && !`${edital.titulo} ${edital.id} ${edital.frenteAtuacao} ${edital.regiaoImediata}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    }),
    [editais, query, statusFilter],
  );

  const totalValue = editais.reduce((sum, edital) => sum + (edital.valorMaximo ?? 0), 0);
  const aprovacao = indicadores.totalSubmissoes > 0 ? Math.round((indicadores.aprovados / indicadores.totalSubmissoes) * 100) : 0;

  const stats = [
    { l: "Editais", v: editais.length.toString(), sub: `${editais.filter((edital) => edital.status === "ABERTO").length} abertos` },
    { l: "Submissoes", v: String(indicadores.totalSubmissoes ?? 0), sub: `${indicadores.emAvaliacao ?? 0} em avaliacao` },
    { l: "Valor publicado", v: formatCurrency(totalValue), sub: "Carteira ativa" },
    { l: "Aprovacao", v: `${aprovacao}%`, sub: "Projetos aprovados" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavBarInterna title={'SEMARH-TO · Coordenação JREDD+'} subtitle={'Administração'} />

      <div className="mx-auto max-w-7xl px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground font-mono"><span className="text-destructive">o</span> Painel administrativo</div>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl tracking-[-0.02em] leading-[1.02]">
              Gestao de <span className="text-gradient italic">editais</span>
            </h1>
            <p className="mt-2 text-muted-foreground max-w-xl">Cadastre novos editais, acompanhe a carteira ativa e monitore o pipeline de submissoes em avaliacao.</p>
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

        <Tabs options={TABS} activeTab={tab} onChange={setTab} className="mt-10" />

        {tab === "editais" && (
          <>
            <div className="mt-6 flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
              <div className="relative flex-1">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar edital por codigo, frente ou regiao" className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border text-sm focus:outline-none focus:border-ocean focus:ring-4 focus:ring-ocean/10 transition-all" />
              </div>
              <div className="flex gap-1 p-1 bg-secondary rounded-xl overflow-x-auto">
                {editalStatusOptions.map((status) => (
                  <button key={status} onClick={() => setStatusFilter(status)} className={`text-xs px-3 py-2 rounded-lg whitespace-nowrap transition-all ${statusFilter === status ? "bg-card shadow-soft text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                    {status === "Todos" ? "Todos" : editalStatusLabel(status)}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
              <table className="w-full text-sm">
                <thead className="bg-secondary/50">
                  <tr className="text-left text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">
                    <th className="px-5 py-3">Edital</th>
                    <th className="px-5 py-3 hidden md:table-cell">Frente</th>
                    <th className="px-5 py-3 hidden lg:table-cell">Regiao</th>
                    <th className="px-5 py-3">Valor</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEditais.map((edital) => (
                    <tr key={edital.id} className="border-t border-border hover:bg-secondary/30 transition-colors">
                      <td className="px-5 py-4">
                        <div className="py-4">
                          <div className="font-medium leading-tight">{edital.titulo}</div>
                          <div className="text-xs text-muted-foreground font-mono mt-0.5">#{edital.id} - {formatDate(edital.inicioRecebimentoPropostas)}</div>
                        </div>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell text-muted-foreground">{edital.frenteAtuacao || "-"}</td>
                      <td className="px-5 py-4 hidden lg:table-cell text-muted-foreground">{edital.regiaoImediata || "-"}</td>
                      <td className="px-5 py-4 font-display">{formatCurrencyRange(edital.valorMinimo, edital.valorMaximo)}</td>
                      <td className="px-5 py-4">
                        <span className={`text-[10px] uppercase tracking-[0.16em] font-mono px-2 py-0.5 rounded-full border ${editalStatusColor(edital.status)}`}>{editalStatusLabel(edital.status)}</span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link href={`/admin/editais/${edital.id}`} className="text-xs px-3 py-1.5 rounded-full border border-border hover:bg-secondary hover:border-primary/40 transition-all inline-flex items-center gap-1">
                          Abrir
                          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {loadingEditais && <tr><td colSpan={6} className="px-5 py-16 text-center text-muted-foreground">Carregando editais...</td></tr>}
                  {!loadingEditais && filteredEditais.length === 0 && (
                    <tr><td colSpan={6} className="px-5 py-16 text-center text-muted-foreground">Nenhum edital encontrado.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === "submissoes" && (
          <div className="mt-6 space-y-3">
            {loadingProjetos && <div className="rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground">Carregando submissoes...</div>}
            {!loadingProjetos && projetos.length === 0 && <div className="rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground">Nenhuma submissao encontrada.</div>}
            {!loadingProjetos && projetos.map((projeto, idx) => (
              <SubmissaoCard key={projeto.id} idx={idx} projeto={projeto} />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <NovoEditalModal
            onClose={() => setOpen(false)}
            onCreated={() => {
              setOpen(false);
              loadEditais();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
