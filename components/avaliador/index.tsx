"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import DashboardHeader from "@/components/shared/DashboardHeader";
import DemonstrationTable from "@/libs/table/DemonstrationTable";
import { api, User } from "@/libs/api";
import info from "@/config/app.info";
import {
  evidenciaStatusColor,
  evidenciaStatusLabel,
  formatDate,
  ProjetoDetalheApi,
  projetoStatusColor,
  projetoStatusLabel,
} from "@/libs/jredd-api-types";
import NavBarInterna from "@/libs/nav/NavBarInterna";

const RealMap = dynamic(() => import("@/components/maps/RealMap"), { ssr: false });

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
  latitude?: string | null;
  longitude?: string | null;
  regiaoImediata?: string | null;
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

type ActiveTab = "formulario" | "dados";

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
  const [activeProjectDetail, setActiveProjectDetail] = useState<ProjetoDetalheApi | null>(null);
  const [projectDetailLoading, setProjectDetailLoading] = useState(false);
  const [scores, setScores] = useState<Record<number, string>>({});
  const [comments, setComments] = useState<Record<number, string>>({});
  const [winnerCandidate, setWinnerCandidate] = useState<Ranking | null>(null);
  const [confirmAuditorId, setConfirmAuditorId] = useState("");
  const [selectingWinner, setSelectingWinner] = useState(false);
  const [projectMenuOpen, setProjectMenuOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<ActiveTab>("formulario");

  useEffect(() => {
    api<EditalResumo[]>("/avaliador/editais")
      .then((data) => {
        const filtered = statusParam ? data.filter((edital) => edital.status === statusParam) : data;
        setEditais(filtered);
        setSelected(filtered[0] ?? null);
      })
      .catch(() => toast.error("Não foi possível carregar seus editais."));
    api<User[]>("/users/perfil?profile=AUDITOR").then(setAuditores).catch(() => setAuditores([]));
  }, [statusParam]);

  useEffect(() => {
    if (!selected) {
      setDetalhe(null);
      setProjetos([]);
      setRanking([]);
      setActiveProject(null);
      return;
    }
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
        setActiveTab("formulario");
      })
      .catch(() => toast.error("Não foi possível carregar os projetos."));
  }, [selected]);

  useEffect(() => {
    setScores({});
    setComments({});
    
    if (!activeProject) {
      setActiveProjectDetail(null);
      return;
    }
    setProjectDetailLoading(true);
    api<ProjetoDetalheApi>(`/projetos/${activeProject.id}`)
      .then(setActiveProjectDetail)
      .catch(() => {
        setActiveProjectDetail(null);
        toast.error("Não foi possível carregar os dados completos do projeto.");
      })
      .finally(() => setProjectDetailLoading(false));
  }, [activeProject]);

  const stats = useMemo(() => [
    { l: "Editais", v: String(editais.length), sub: "vinculados" },
    { l: "Projetos", v: String(projetos.length), sub: "do edital" },
    { l: "Avaliações", v: String(ranking.filter((item) => item.avaliacaoCompleta).length), sub: "completas" },
    { l: "Pendências", v: String(ranking.reduce((sum, item) => sum + item.pendencias, 0)), sub: "critérios" },
  ], [editais.length, projetos.length, ranking]);

  const canSelectWinner = ranking.length > 0 && ranking.every((item) => item.avaliacaoCompleta);
  const sortedCriterios = useMemo(
    () => [...(detalhe?.criterios ?? [])].sort((a, b) => (a.ordem ?? 0) - (b.ordem ?? 0)),
    [detalhe?.criterios],
  );

  const selecionarProjeto = (projeto: Projeto) => {
    setActiveProject(projeto);
    setActiveTab("formulario");
  };

  const salvarAvaliacao = async () => {
    if (!activeProject || !detalhe) return;
    const invalid = sortedCriterios.some((criterio) => {
      const value = Number(scores[criterio.id]);
      return !Number.isInteger(value) || value < 1 || value > 10;
    });
    if (invalid) {
      toast.error("Preencha todos os critérios com notas inteiras de 1 a 10.");
      return;
    }
    try {
      await api<void>(`/avaliador/projetos/${activeProject.id}/avaliacoes`, {
        method: "POST",
        body: JSON.stringify({
          notas: sortedCriterios.map((criterio) => ({
            criterioId: criterio.id,
            nota: Number(scores[criterio.id] ?? 0),
            comentario: comments[criterio.id] ?? "",
          })),
        }),
      });
      toast.success("Avaliação salva.");
      setRanking(await api<Ranking[]>(`/avaliador/editais/${detalhe.id}/ranking`));
    } catch {
      toast.error("Preencha todos os critérios com notas de 1 a 10.");
    }
  };

  const selecionarVencedor = async () => {
    if (!detalhe || !winnerCandidate || !confirmAuditorId) {
      toast.error("Selecione um fiscal antes de encerrar o edital.");
      return;
    }
    setSelectingWinner(true);
    try {
      await api(`/avaliador/editais/${detalhe.id}/selecionar-vencedor`, {
        method: "POST",
        body: JSON.stringify({ projetoId: winnerCandidate.projetoId, auditorId: Number(confirmAuditorId) }),
      });
      toast.success("Projeto vencedor selecionado e fiscal vinculado.");
      const data = await api<EditalResumo[]>("/avaliador/editais");
      const filtered = statusParam ? data.filter((edital) => edital.status === statusParam) : data;
      setEditais(filtered);
      setSelected(filtered[0] ?? null);
      setWinnerCandidate(null);
      setConfirmAuditorId("");
    } catch {
      toast.error("Ainda existem avaliações pendentes ou o fiscal é inválido.");
    } finally {
      setSelectingWinner(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBarInterna title="Área do avaliador" subtitle={`Avaliação Técnica ${info.name}`} />
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground font-mono"><span className="text-ocean">*</span> Avaliacao</div>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl leading-[1.02]">Avaliação de <span className="text-gradient italic">projetos</span></h1>
            <p className="mt-2 text-muted-foreground max-w-xl">Selecione um edital, avalie os projetos vinculados e acompanhe a classificacao por media.</p>
          </div>
          <label className="lg:w-[26rem]">
            <span className="block mb-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">Edital em avaliação</span>
            <select value={selected?.id ?? ""} onChange={(e) => setSelected(editais.find((item) => item.id === Number(e.target.value)) ?? null)} className="w-full px-4 py-3 rounded-xl bg-card border border-border text-sm">
              {editais.length === 0 && <option value="">Nenhum edital disponivel</option>}
              {editais.map((edital) => <option key={edital.id} value={edital.id}>{edital.titulo}</option>)}
            </select>
          </label>
        </div>

        <DemonstrationTable values={stats} cols={4} light />

        {activeProject ? (
          <DecisionMaps projeto={activeProject} />
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground">Selecione um projeto para visualizar os mapas de apoio.</div>
        )}

        <div className="mt-6 grid lg:grid-cols-12 gap-6">
          <section className={`${projectMenuOpen ? "lg:col-span-4" : "lg:col-span-1"} bg-card border border-border rounded-2xl overflow-hidden transition-all`}>
            <div className="p-4 border-b border-border flex items-center justify-between gap-3">
              {projectMenuOpen && (
                <div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">Projetos</div>
                  <div className="font-display text-xl">Selecionar projeto</div>
                </div>
              )}
              <button onClick={() => setProjectMenuOpen((value) => !value)} className="ml-auto rounded-full border border-border px-3 py-2 text-xs hover:bg-secondary transition-colors">
                {projectMenuOpen ? "Retrair" : "Abrir"}
              </button>
            </div>
            <div className="p-3 space-y-2">
              {projetos.length === 0 && projectMenuOpen && (
                <div className="rounded-xl border border-dashed border-border py-10 text-center text-sm text-muted-foreground">Nenhum projeto para este edital.</div>
              )}
              {projetos.map((projeto, index) => (
                <button
                  key={projeto.id}
                  onClick={() => selecionarProjeto(projeto)}
                  title={projeto.nomeProjeto}
                  className={`w-full text-left border rounded-xl transition-all ${activeProject?.id === projeto.id ? "border-ocean bg-ocean/5 shadow-soft" : "border-border hover:border-primary/30 hover:bg-secondary/40"} ${projectMenuOpen ? "p-4" : "px-2 py-3 text-center"}`}
                >
                  {projectMenuOpen ? (
                    <>
                      <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">{projeto.status}</div>
                      <h2 className="mt-2 font-display text-lg leading-tight">{projeto.nomeProjeto}</h2>
                      <p className="mt-1 text-xs text-muted-foreground">{projeto.proponente}</p>
                    </>
                  ) : (
                    <span className="font-mono text-xs text-muted-foreground">{index + 1}</span>
                  )}
                </button>
              ))}
            </div>
          </section>

          <section className={`${projectMenuOpen ? "lg:col-span-8" : "lg:col-span-11"} bg-card border border-border rounded-2xl p-6 transition-all`}>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">Projeto selecionado</div>
                <h2 className="mt-2 font-display text-2xl">{activeProject?.nomeProjeto ?? "Selecione um projeto"}</h2>
                {activeProject && <p className="mt-1 text-sm text-muted-foreground">{activeProject.proponente}</p>}
              </div>
              <Tabs activeTab={activeTab} onChange={setActiveTab} />
            </div>

            {activeTab === "formulario" && (
              <div className="mt-6">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">Formulário de avaliação</div>
                    <div className="text-sm text-muted-foreground">Notas obrigatórias de 1 a 10 para cada critério.</div>
                  </div>
                  <button onClick={salvarAvaliacao} disabled={!activeProject} className="rounded-full bg-gradient-hero text-primary-foreground px-5 py-2.5 text-sm font-medium disabled:opacity-50">Salvar</button>
                </div>
                <div className="space-y-4">
                  {sortedCriterios.length === 0 && <div className="rounded-xl border border-dashed border-border py-12 text-center text-muted-foreground">Nenhum critério cadastrado.</div>}
                  {sortedCriterios.map((criterio) => (
                    <div key={criterio.id} className="rounded-xl border border-border bg-background/60 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="font-medium">{criterio.nome}</div>
                          <div className="text-xs text-muted-foreground">{criterio.descricao || "Nota de 1 a 10"}</div>
                        </div>
                        <input type="number" min="1" max="10" step="1" value={scores[criterio.id] ?? ""} onChange={(e) => setScores((prev) => ({ ...prev, [criterio.id]: e.target.value }))} className="w-24 rounded-lg border border-border bg-card px-3 py-2 text-sm" />
                      </div>
                      <textarea value={comments[criterio.id] ?? ""} onChange={(e) => setComments((prev) => ({ ...prev, [criterio.id]: e.target.value }))} placeholder="Comentário técnico" className="mt-3 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm min-h-20" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "dados" && (
              <ProjectDataTab loading={projectDetailLoading} projeto={activeProjectDetail} />
            )}
          </section>
        </div>

        <section className="mt-8 bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-border flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">Ranking final</div>
              <div className="font-display text-2xl">Classificacao por media</div>
            </div>
            <div className="text-sm text-muted-foreground">{canSelectWinner ? "Pronto para selecao do vencedor" : "Selecao liberada apos todas as avaliacoes"}</div>
          </div>
          {ranking.length === 0 && <div className="px-5 py-12 text-center text-sm text-muted-foreground">Nenhum projeto no ranking deste edital.</div>}
          {ranking.map((item, index) => (
            <div key={item.projetoId} className="px-5 py-4 border-t border-border flex items-center gap-4">
              <div className="font-mono text-muted-foreground w-8">{index + 1}</div>
              <div className="flex-1">
                <div className="font-medium">{item.nomeProjeto}</div>
                <div className="text-xs text-muted-foreground">{item.proponente} - {item.avaliacaoCompleta ? "completa" : `${item.pendencias} pendências`}</div>
              </div>
              <div className="font-display text-2xl">{Number(item.notaFinal).toFixed(2)}</div>
              <button onClick={() => setWinnerCandidate(item)} disabled={!canSelectWinner} className="rounded-full border border-border px-4 py-2 text-sm hover:bg-secondary disabled:opacity-40">Escolher</button>
            </div>
          ))}
        </section>
      </main>

      {winnerCandidate && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-card border border-border rounded-2xl p-6 shadow-soft">
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">Confirmar vencedor</div>
            <h2 className="mt-2 font-display text-2xl">{winnerCandidate.nomeProjeto}</h2>
            <p className="mt-2 text-sm text-muted-foreground">Ao confirmar, este projeto sera aprovado, os demais serao reprovados e o edital sera encerrado.</p>
            <label className="mt-5 block text-sm font-medium">Fiscal responsável</label>
            <select value={confirmAuditorId} onChange={(e) => setConfirmAuditorId(e.target.value)} className="mt-2 w-full px-4 py-3 rounded-xl bg-background border border-border text-sm">
              <option value="">Selecionar fiscal</option>
              {auditores.map((auditor) => <option key={auditor.id} value={auditor.id}>{auditor.nome}</option>)}
            </select>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setWinnerCandidate(null)} className="rounded-full border border-border px-4 py-2 text-sm hover:bg-secondary">Cancelar</button>
              <button onClick={selecionarVencedor} disabled={selectingWinner || !confirmAuditorId} className="rounded-full bg-gradient-hero text-primary-foreground px-5 py-2 text-sm disabled:opacity-50">
                {selectingWinner ? "Confirmando..." : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Tabs({ activeTab, onChange }: { activeTab: ActiveTab; onChange: (tab: ActiveTab) => void }) {
  return (
    <div className="flex gap-1 p-1 bg-secondary rounded-xl w-fit">
      <button onClick={() => onChange("formulario")} className={`text-sm px-4 py-2 rounded-lg transition-all ${activeTab === "formulario" ? "bg-card shadow-soft text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
        Formulário de avaliação
      </button>
      <button onClick={() => onChange("dados")} className={`text-sm px-4 py-2 rounded-lg transition-all ${activeTab === "dados" ? "bg-card shadow-soft text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
        Dados do projeto
      </button>
    </div>
  );
}

function DecisionMaps({ projeto }: { projeto: Projeto }) {
  const center = resolveProjectCenter(projeto);

  return (
    <section className="mt-8 grid md:grid-cols-2 gap-4">
      <div className="rounded-2xl border border-border overflow-hidden bg-card">
        <div className="px-4 py-3 border-b border-border">
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">Apoio territorial</div>
          <div className="text-sm font-medium">Degradacao florestal</div>
        </div>
        <div className="h-72"><RealMap kind="degradacao" center={center} /></div>
      </div>
      <div className="rounded-2xl border border-border overflow-hidden bg-card">
        <div className="px-4 py-3 border-b border-border">
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">Apoio territorial</div>
          <div className="text-sm font-medium">Focos de calor</div>
        </div>
        <div className="h-72"><RealMap kind="fogo" center={center} /></div>
      </div>
    </section>
  );
}

function ProjectDataTab({ loading, projeto }: { loading: boolean; projeto: ProjetoDetalheApi | null }) {
  if (loading) {
    return <div className="mt-6 rounded-xl border border-dashed border-border py-14 text-center text-muted-foreground">Carregando dados do projeto...</div>;
  }
  if (!projeto) {
    return <div className="mt-6 rounded-xl border border-dashed border-border py-14 text-center text-muted-foreground">Selecione um projeto para consultar os dados completos.</div>;
  }

  return (
    <div className="mt-6 space-y-3">
      <div className="rounded-xl border border-border bg-background/60 p-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <span className={`inline-flex text-[10px] uppercase tracking-[0.16em] font-mono px-2.5 py-1 rounded-full border ${projetoStatusColor(projeto.status)}`}>{projetoStatusLabel(projeto.status)}</span>
            <h3 className="mt-3 font-display text-2xl">{projeto.nome || "Projeto sem nome"}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{projeto.resumo || "Resumo não informado."}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-2 md:w-80">
            <Info label="Proponente" value={projeto.proponente || "Não informado"} />
            <Info label="Fiscal" value={projeto.auditor || "Não definido"} />
            <Info label="Edital" value={projeto.editalTitulo || projeto.edital?.titulo || "Não vinculado"} />
            <Info label="Criado em" value={formatDateTime(projeto.criadoEm)} />
          </div>
        </div>
      </div>

      <DetailSection title="Etapa 1 - Instituicao e representante">
        <InfoGrid items={[
          ["Razão social", projeto.instituicao?.razaoSocial],
          ["Nome fantasia", projeto.instituicao?.nomeFantasia],
          ["CNPJ", projeto.instituicao?.cnpj],
          ["Natureza jurídica", projeto.instituicao?.naturezaJuridica],
          ["Área de atuação", projeto.instituicao?.areaAtuacao],
          ["Representante", projeto.instituicao?.representanteLegal?.nomeCompleto || projeto.instituicao?.representanteLegal?.nome],
          ["E-mail", projeto.instituicao?.representanteLegal?.email],
          ["Telefone", projeto.instituicao?.representanteLegal?.telefone],
        ]} />
      </DetailSection>

      <DetailSection title="Etapa 2 - Caracterizacao">
        <InfoGrid items={[
          ["Nome do projeto", projeto.nome],
          ["Resumo", projeto.resumo],
          ["Justificativa e merito", projeto.justificativaMerito],
          ["Frente de atuação", projeto.edital?.frenteAtuacao],
          ["Região imediata", projeto.edital?.regiaoImediata],
        ]} />
      </DetailSection>

      <DetailSection title="Etapa 3 - Localizacao">
        <InfoGrid items={[
          ["Município", projeto.localizacao?.municipio?.nome],
          ["Comunidade", projeto.localizacao?.comunidade],
          ["Latitude", projeto.localizacao?.latitude],
          ["Longitude", projeto.localizacao?.longitude],
        ]} />
      </DetailSection>

      <DetailSection title="Etapa 4 - Público beneficiado">
        <InfoGrid items={[
          ["Mulheres", projeto.publicoBeneficiado?.mulheresQuant],
          ["Homens", projeto.publicoBeneficiado?.homensQuant],
          ["Crianças", projeto.publicoBeneficiado?.criancasQuant],
          ["Jovens", projeto.publicoBeneficiado?.jovensQuant],
          ["Idosos", projeto.publicoBeneficiado?.idososQuant],
          ["Povos indígenas", projeto.publicoBeneficiado?.povosIndigenasQuant],
          ["Quilombolas", projeto.publicoBeneficiado?.quilombolasQuant],
          ["Agricultura familiar", projeto.publicoBeneficiado?.agricultoresFamiliarQuant],
          ["Comunidades tradicionais", projeto.publicoBeneficiado?.comunidadesTradicionaisQuant],
          ["Renda média", projeto.publicoBeneficiado?.rendaMedia],
          ["Fonte de renda", projeto.publicoBeneficiado?.fonteRendaPrincipal],
          ["Aplicação do benefício", projeto.publicoBeneficiado?.descricaoAplicacaoBeneficio],
        ]} />
      </DetailSection>

      <DetailSection title="Etapa 5 - Plano de execução">
        <InfoGrid items={[
          ["Objetivo geral", projeto.planoExecucao?.objetivoGeral],
          ["Objetivo especifico", projeto.planoExecucao?.objetivoEspecifico],
        ]} />
        <div className="mt-4 space-y-3">
          {(projeto.planoExecucao?.atividades ?? []).map((atividade, index) => (
            <div key={`${atividade.id ?? index}`} className="rounded-xl border border-border bg-background/60 p-4">
              <div className="font-medium">{atividade.descricao || `Atividade ${index + 1}`}</div>
              <div className="mt-2 grid sm:grid-cols-3 gap-2">
                <Info label="Responsável" value={atividade.responsavel || "Não informado"} />
                <Info label="Início" value={formatDate(atividade.dataInicio)} />
                <Info label="Fim" value={formatDate(atividade.dataFim)} />
              </div>
            </div>
          ))}
        </div>
      </DetailSection>

      <DetailSection title="Etapa 6 - Declaracoes">
        <InfoGrid items={[
          ["Veracidade das informações", yesNo(projeto.declarouVeracidadeInformacoes)],
          ["Tratamento de dados LGPD", yesNo(projeto.autorizouTratamentoDadosLgpd)],
          ["Prestacao de contas", yesNo(projeto.comprometeuPrestacaoContas)],
          ["Monitoramento e auditoria", yesNo(projeto.autorizouMonitoramentoAuditoria)],
        ]} />
      </DetailSection>

      <DetailSection title="Atividades e evidências">
        <div className="grid md:grid-cols-2 gap-3">
          {(projeto.atividades ?? []).map((atividade) => (
            <div key={atividade.id} className="rounded-xl border border-border bg-background/60 p-4">
              <div className="font-medium">{atividade.nome || atividade.descricao || `Atividade ${atividade.id}`}</div>
              <div className="mt-1 text-xs text-muted-foreground">{atividade.responsavel || "Responsável não informado"}</div>
              <div className="mt-3 text-[10px] uppercase tracking-[0.16em] font-mono text-muted-foreground">{atividade.status || "Sem status"}</div>
            </div>
          ))}
          {(projeto.atividades ?? []).length === 0 && <div className="md:col-span-2 rounded-xl border border-dashed border-border py-10 text-center text-sm text-muted-foreground">Nenhuma atividade cadastrada.</div>}
        </div>
        <div className="mt-4 space-y-3">
          {(projeto.evidencias ?? []).map((evidencia) => (
            <div key={evidencia.id} className="rounded-xl border border-border bg-background/60 p-4">
              <span className={`inline-flex text-[10px] uppercase tracking-[0.16em] font-mono px-2 py-0.5 rounded-full border ${evidenciaStatusColor(evidencia.status)}`}>{evidenciaStatusLabel(evidencia.status)}</span>
              <div className="mt-2 text-sm font-medium">{evidencia.atividade || `Evidência ${evidencia.id}`}</div>
              <p className="mt-2 text-sm text-muted-foreground">{evidencia.descricao || "Sem descrição."}</p>
              {evidencia.comentarioAuditor && <p className="mt-3 rounded-lg bg-card border border-border p-3 text-xs text-muted-foreground">Parecer de {evidencia.validadoPor || "fiscal"}: {evidencia.comentarioAuditor}</p>}
            </div>
          ))}
          {(projeto.evidencias ?? []).length === 0 && <div className="rounded-xl border border-dashed border-border py-10 text-center text-sm text-muted-foreground">Nenhuma evidência enviada.</div>}
        </div>
      </DetailSection>
    </div>
  );
}

function DetailSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="group rounded-xl border border-border bg-secondary/20 overflow-hidden">
      <summary className="cursor-pointer list-none px-4 py-3 flex items-center justify-between gap-3">
        <span className="font-display text-lg">{title}</span>
        <span className="text-sm text-muted-foreground group-open:rotate-180 transition-transform">v</span>
      </summary>
      <div className="border-t border-border p-4">{children}</div>
    </details>
  );
}

function InfoGrid({ items }: { items: Array<[string, unknown]> }) {
  return (
    <div className="grid sm:grid-cols-2 gap-2">
      {items.map(([label, value]) => (
        <Info key={label} label={label} value={valueToText(value)} />
      ))}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <div className="text-[10px] uppercase tracking-[0.16em] font-mono text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm text-foreground break-words">{value}</div>
    </div>
  );
}

function resolveProjectCenter(projeto: Projeto): [number, number] {
  const latitude = Number(String(projeto.latitude ?? "").replace(",", "."));
  const longitude = Number(String(projeto.longitude ?? "").replace(",", "."));
  if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
    return [latitude, longitude];
  }
  const regiao = (projeto.regiaoImediata ?? "").toLowerCase();
  if (regiao.includes("araguaina")) return [-7.1911, -48.2078];
  if (regiao.includes("gurupi")) return [-11.7289, -49.0684];
  if (regiao.includes("paraiso")) return [-10.1750, -48.8823];
  if (regiao.includes("porto nacional")) return [-10.7081, -48.4172];
  return [-10.1843, -48.3336];
}

function valueToText(value: unknown) {
  if (value === null || value === undefined || value === "") return "Não informado";
  return String(value);
}

function yesNo(value?: boolean | null) {
  return value ? "Sim" : "Não";
}

function formatDateTime(value?: string | null) {
  if (!value) return "Não informado";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return formatDate(value);
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" }).format(date);
}
