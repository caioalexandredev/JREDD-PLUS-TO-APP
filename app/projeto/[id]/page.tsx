"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { toast } from "sonner";
import DashboardHeader from "@/components/shared/DashboardHeader";
import { api, downloadDocumento, getStoredUser, uploadDocumento } from "@/libs/api";
import {
  evidenciaStatusColor,
  evidenciaStatusLabel,
  formatDate,
  ProjetoDetalheApi,
  projetoStatusColor,
  projetoStatusLabel,
} from "@/libs/jredd-api-types";

export default function ProjetoDetalhePage() {
  const params = useParams<{ id: string }>();
  const [projeto, setProjeto] = useState<ProjetoDetalheApi | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [descricao, setDescricao] = useState("");
  const [atividadeId, setAtividadeId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [sending, setSending] = useState(false);

  const user = useMemo(() => getStoredUser(), []);
  const canSendEvidence = user?.profile === "PROPONENTE" && (projeto?.status === "APROVADO" || projeto?.status === "EM_EXECUCAO");

  const loadProjeto = useCallback(async () => {
    if (!params.id) return;
    setLoading(true);
    try {
      const response = await api<ProjetoDetalheApi>(`/projetos/${params.id}`);
      setProjeto(response);
      setError("");
    } catch {
      setError("Nao foi possivel carregar os dados do projeto.");
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    loadProjeto();
  }, [loadProjeto]);

  const enviarEvidencia = async () => {
    if (!projeto || !file || !descricao.trim()) {
      toast.error("Informe o documento e a descricao da evidencia.");
      return;
    }
    setSending(true);
    try {
      const documento = await uploadDocumento(file, "EVIDENCIA");
      await api(`/projetos/${projeto.id}/evidencias`, {
        method: "POST",
        body: JSON.stringify({
          fotoDocumentoId: documento.id,
          descricao,
          atividadeId: atividadeId ? Number(atividadeId) : null,
        }),
      });
      toast.success("Evidencia enviada para validacao.");
      setDescricao("");
      setAtividadeId("");
      setFile(null);
      await loadProjeto();
    } catch {
      toast.error("Nao foi possivel enviar a evidencia.");
    } finally {
      setSending(false);
    }
  };

  const baixarDocumento = async (documentoId?: string | null) => {
    if (!documentoId) return;
    try {
      await downloadDocumento(documentoId);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Nao foi possivel baixar o documento.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader label="Detalhe do projeto" title={`Projeto #${params.id}`} />
      <main className="mx-auto max-w-7xl px-6 py-10">
        {loading && <div className="rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground">Carregando projeto...</div>}
        {!loading && error && <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-5 text-sm text-destructive">{error}</div>}

        {!loading && !error && projeto && (
          <div className="space-y-8">
            <section className="bg-card border border-border rounded-2xl p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
                <div>
                  <span className={`inline-flex text-[10px] uppercase tracking-[0.16em] font-mono px-2.5 py-1 rounded-full border ${projetoStatusColor(projeto.status)}`}>
                    {projetoStatusLabel(projeto.status)}
                  </span>
                  <h1 className="mt-4 font-display text-3xl sm:text-4xl leading-tight">{projeto.nome || "Projeto sem nome"}</h1>
                  <p className="mt-2 text-muted-foreground max-w-3xl">{projeto.resumo || "Resumo nao informado."}</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 lg:w-[28rem]">
                  <Info label="Proponente" value={projeto.proponente || "Nao informado"} />
                  <Info label="Fiscal" value={projeto.auditor || "Nao definido"} />
                  <Info label="Edital" value={projeto.editalTitulo || projeto.edital?.titulo || "Nao vinculado"} />
                  <Info label="Criado em" value={formatDateTime(projeto.criadoEm)} />
                </div>
              </div>
            </section>

            <div className="grid lg:grid-cols-12 gap-6">
              <section className="lg:col-span-7 space-y-3">
                <Step title="Etapa 1 - Instituicao e representante">
                  <InfoGrid items={[
                    ["Razao social", projeto.instituicao?.razaoSocial],
                    ["Nome fantasia", projeto.instituicao?.nomeFantasia],
                    ["CNPJ", projeto.instituicao?.cnpj],
                    ["Natureza juridica", projeto.instituicao?.naturezaJuridica],
                    ["Area de atuacao", projeto.instituicao?.areaAtuacao],
                    ["Representante", projeto.instituicao?.representanteLegal?.nomeCompleto || projeto.instituicao?.representanteLegal?.nome],
                    ["E-mail", projeto.instituicao?.representanteLegal?.email],
                    ["Telefone", projeto.instituicao?.representanteLegal?.telefone],
                  ]} />
                </Step>

                <Step title="Etapa 2 - Caracterizacao">
                  <InfoGrid items={[
                    ["Nome do projeto", projeto.nome],
                    ["Resumo", projeto.resumo],
                    ["Justificativa e merito", projeto.justificativaMerito],
                    ["Edital", projeto.editalTitulo || projeto.edital?.titulo],
                    ["Frente de atuacao", projeto.edital?.frenteAtuacao],
                    ["Regiao imediata", projeto.edital?.regiaoImediata],
                  ]} />
                </Step>

                <Step title="Etapa 3 - Localizacao">
                  <InfoGrid items={[
                    ["Municipio", projeto.localizacao?.municipio?.nome],
                    ["Comunidade", projeto.localizacao?.comunidade],
                    ["Latitude", projeto.localizacao?.latitude],
                    ["Longitude", projeto.localizacao?.longitude],
                  ]} />
                </Step>

                <Step title="Etapa 4 - Publico beneficiado">
                  <InfoGrid items={[
                    ["Mulheres", projeto.publicoBeneficiado?.mulheresQuant],
                    ["Homens", projeto.publicoBeneficiado?.homensQuant],
                    ["Criancas", projeto.publicoBeneficiado?.criancasQuant],
                    ["Jovens", projeto.publicoBeneficiado?.jovensQuant],
                    ["Idosos", projeto.publicoBeneficiado?.idososQuant],
                    ["Povos indigenas", projeto.publicoBeneficiado?.povosIndigenasQuant],
                    ["Quilombolas", projeto.publicoBeneficiado?.quilombolasQuant],
                    ["Agricultura familiar", projeto.publicoBeneficiado?.agricultoresFamiliarQuant],
                    ["Comunidades tradicionais", projeto.publicoBeneficiado?.comunidadesTradicionaisQuant],
                    ["Renda media", projeto.publicoBeneficiado?.rendaMedia],
                    ["Fonte de renda", projeto.publicoBeneficiado?.fonteRendaPrincipal],
                    ["Aplicacao do beneficio", projeto.publicoBeneficiado?.descricaoAplicacaoBeneficio],
                  ]} />
                </Step>

                <Step title="Etapa 5 - Plano de execucao">
                  <InfoGrid items={[
                    ["Objetivo geral", projeto.planoExecucao?.objetivoGeral],
                    ["Objetivo especifico", projeto.planoExecucao?.objetivoEspecifico],
                  ]} />
                  <div className="mt-5 space-y-3">
                    {(projeto.planoExecucao?.atividades ?? []).map((atividade, index) => (
                      <div key={`${atividade.id ?? index}`} className="rounded-xl border border-border bg-secondary/40 p-4">
                        <div className="font-medium">{atividade.descricao || `Atividade ${index + 1}`}</div>
                        <div className="mt-2 grid sm:grid-cols-3 gap-3 text-sm">
                          <Info label="Responsavel" value={atividade.responsavel || "Nao informado"} />
                          <Info label="Inicio" value={formatDate(atividade.dataInicio)} />
                          <Info label="Fim" value={formatDate(atividade.dataFim)} />
                        </div>
                      </div>
                    ))}
                  </div>
                </Step>

                <Step title="Etapa 6 - Declaracoes">
                  <InfoGrid items={[
                    ["Veracidade das informacoes", yesNo(projeto.declarouVeracidadeInformacoes)],
                    ["Tratamento de dados LGPD", yesNo(projeto.autorizouTratamentoDadosLgpd)],
                    ["Prestacao de contas", yesNo(projeto.comprometeuPrestacaoContas)],
                    ["Monitoramento e auditoria", yesNo(projeto.autorizouMonitoramentoAuditoria)],
                  ]} />
                </Step>
              </section>

              <aside className="lg:col-span-5 space-y-5">
                {canSendEvidence && (
                  <section className="bg-card border border-border rounded-2xl p-5">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">Nova evidencia</div>
                    <h2 className="mt-2 font-display text-2xl">Acompanhamento</h2>
                    <select value={atividadeId} onChange={(event) => setAtividadeId(event.target.value)} className="mt-4 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm">
                      <option value="">Sem atividade especifica</option>
                      {(projeto.atividades ?? []).map((atividade) => (
                        <option key={atividade.id} value={atividade.id}>{atividade.nome || atividade.descricao || `Atividade ${atividade.id}`}</option>
                      ))}
                    </select>
                    <input type="file" onChange={(event: ChangeEvent<HTMLInputElement>) => setFile(event.target.files?.[0] ?? null)} className="mt-3 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" />
                    <textarea value={descricao} onChange={(event) => setDescricao(event.target.value)} placeholder="Descreva a evidencia enviada" className="mt-3 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm min-h-28" />
                    <button onClick={enviarEvidencia} disabled={sending} className="mt-3 w-full rounded-full bg-gradient-hero text-primary-foreground px-4 py-2.5 text-sm font-medium disabled:opacity-50">
                      {sending ? "Enviando..." : "Enviar evidencia"}
                    </button>
                  </section>
                )}

                <section className="bg-card border border-border rounded-2xl p-5">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">Linha do tempo</div>
                  <h2 className="mt-2 font-display text-2xl">Evidencias</h2>
                  <div className="mt-5 space-y-3">
                    {(projeto.evidencias ?? []).length === 0 && <div className="rounded-xl border border-dashed border-border py-10 text-center text-sm text-muted-foreground">Nenhuma evidencia enviada.</div>}
                    {(projeto.evidencias ?? []).map((evidencia) => (
                      <article key={evidencia.id} className="relative rounded-xl border border-border bg-secondary/35 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className={`inline-flex text-[10px] uppercase tracking-[0.16em] font-mono px-2 py-0.5 rounded-full border ${evidenciaStatusColor(evidencia.status)}`}>
                              {evidenciaStatusLabel(evidencia.status)}
                            </span>
                            <div className="mt-2 text-sm font-medium">{evidencia.atividade || `Evidencia ${evidencia.id}`}</div>
                          </div>
                          <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground font-mono">{formatDateTime(evidencia.criadoEm)}</span>
                        </div>
                        <p className="mt-3 text-sm text-foreground/80">{evidencia.descricao || "Sem descricao."}</p>
                        {evidencia.comentarioAuditor && (
                          <p className="mt-3 rounded-lg bg-card border border-border p-3 text-xs text-muted-foreground">
                            Parecer de {evidencia.validadoPor || "fiscal"}: {evidencia.comentarioAuditor}
                          </p>
                        )}
                        {evidencia.fotoDocumentoId && (
                          <button onClick={() => baixarDocumento(evidencia.fotoDocumentoId)} className="mt-3 text-xs px-3 py-1.5 rounded-full border border-border hover:bg-card transition-colors">
                            Baixar documento
                          </button>
                        )}
                      </article>
                    ))}
                  </div>
                </section>

                <Link href={backHref(user?.profile)} className="inline-flex w-full justify-center rounded-full border border-border px-4 py-2.5 text-sm hover:bg-secondary transition-colors">
                  Voltar
                </Link>
              </aside>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function Step({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="group bg-card border border-border rounded-2xl overflow-hidden" open>
      <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between gap-3">
        <span className="font-display text-xl">{title}</span>
        <span className="text-sm text-muted-foreground group-open:rotate-180 transition-transform">v</span>
      </summary>
      <div className="border-t border-border px-5 py-5">{children}</div>
    </details>
  );
}

function InfoGrid({ items }: { items: Array<[string, unknown]> }) {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {items.map(([label, value]) => (
        <Info key={label} label={label} value={valueToText(value)} />
      ))}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-background/60 p-3">
      <div className="text-[10px] uppercase tracking-[0.16em] font-mono text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm text-foreground break-words">{value}</div>
    </div>
  );
}

function valueToText(value: unknown) {
  if (value === null || value === undefined || value === "") return "Nao informado";
  return String(value);
}

function yesNo(value?: boolean | null) {
  return value ? "Sim" : "Nao";
}

function formatDateTime(value?: string | null) {
  if (!value) return "Nao informado";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return formatDate(value);
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" }).format(date);
}

function backHref(profile?: string) {
  if (profile === "ADMINISTRADOR") return "/admin";
  if (profile === "AVALIADOR") return "/avaliador?status=EM_AVALIACAO";
  if (profile === "AUDITOR") return "/auditor";
  return "/painel";
}
