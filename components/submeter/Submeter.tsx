"use client";

import pages from "@/config/pages.consts";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";
import Step5 from "./steps/Step5";
import Step6 from "./steps/Step6";
import NavBarInterna from "@/libs/nav/NavBarInterna";
import { api } from "@/libs/api";
import { EditalDetalheApi, formatCurrencyRange, formatDate, MunicipioApi, NaturezaJuridicaApi, PageResponse } from "@/libs/jredd-api-types";
import { SubmissionForm } from "./types";
import { useRouter, useSearchParams } from "next/navigation";

const steps = [
  { n: "01", t: "Identificação do proponente", s: "Dados da instituição e representante legal" },
  { n: "02", t: "Caracterizacao do projeto", s: "Nome, edital e justificativa" },
  { n: "03", t: "Localização e área", s: "Georreferenciamento e município" },
  { n: "04", t: "Público beneficiado", s: "Quantitativos e perfil socioeconômico" },
  { n: "05", t: "Plano de execução", s: "Objetivos, atividades e cronograma" },
  { n: "06", t: "Declarações e submissão", s: "Termos obrigatórios e envio" },
] as const;

const initialForm: SubmissionForm = {
  etapa1: {
    razaoSocial: "",
    nomeFantasia: "",
    cnpj: "",
    dataFundacao: "",
    idNaturezaJuridica: "",
    areaAtuacao: "",
    site: "",
    redesSociais: "",
    representanteLegal: {
      nomeCompleto: "",
      cpf: "",
      rg: "",
      email: "",
      telefone: "",
      cargo: "",
    },
  },
  etapa2: {
    nomeProjeto: "",
    resumo: "",
    justificativaMerito: "",
  },
  etapa3: {
    latitude: "",
    longitude: "",
    idMunicipio: "",
    comunidade: "",
  },
  etapa4: {
    mulheresQuant: "",
    homensQuant: "",
    criancasQuant: "",
    jovensQuant: "",
    idososQuant: "",
    povosIndigenasQuant: "",
    quilombolasQuant: "",
    agricultoresFamiliarQuant: "",
    comunidadesTradicionaisQuant: "",
    rendaMedia: "",
    fonteRendaPrincipal: "",
    descricaoAplicacaoBeneficio: "",
  },
  etapa5: {
    objetivoGeral: "",
    objetivoEspecifico: "",
    atividades: [{ descricao: "", responsavel: "", dataInicio: "", dataFim: "" }],
  },
  etapa6: {
    declarouVeracidadeInformacoes: false,
    autorizouTratamentoDadosLgpd: false,
    comprometeuPrestacaoContas: false,
    autorizouMonitoramentoAuditoria: false,
  },
};

export default function Submeter(): React.ReactNode {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editalId = searchParams.get("editalId");
  const [current, setCurrent] = useState(0);
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [form, setForm] = useState<SubmissionForm>(initialForm);
  const [projectId, setProjectId] = useState<number | null>(null);
  const [edital, setEdital] = useState<EditalDetalheApi | null>(null);
  const [naturezas, setNaturezas] = useState<NaturezaJuridicaApi[]>([]);
  const [municipios, setMunicipios] = useState<MunicipioApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!editalId) {
      setLoading(false);
      return;
    }
    Promise.all([
      api<EditalDetalheApi>(`/editais/${editalId}`),
      api<PageResponse<NaturezaJuridicaApi>>("/natureza-juridicas?size=100"),
      api<PageResponse<MunicipioApi>>("/municipios?size=500"),
    ])
      .then(([editalResponse, naturezaPage, municipioPage]) => {
        setEdital(editalResponse);
        setNaturezas(naturezaPage.content ?? []);
        setMunicipios(municipioPage.content ?? []);
      })
      .catch(() => toast.error("Não foi possível carregar os dados para submissão."))
      .finally(() => setLoading(false));
  }, [editalId]);

  const progress = useMemo(() => Math.round(((completed.size + (saving ? 0 : current / steps.length)) / steps.length) * 100), [completed.size, current, saving]);

  const prev = () => setCurrent((i) => Math.max(0, i - 1));

  const goToStep = (index: number) => {
    if (index <= current || completed.has(index - 1)) {
      setCurrent(index);
    }
  };

  const saveCurrentStep = async () => {
    if (!editalId || !edital) {
      toast.error("Selecione um edital antes de iniciar a submissão.");
      return;
    }
    const validationMessage = validateStep(current, form);
    if (validationMessage) {
      toast.error(validationMessage);
      return;
    }

    setSaving(true);
    try {
      const response = await submitStep(current, form, Number(editalId), projectId);
      if ("id" in response && typeof response.id === "number") {
        setProjectId(response.id);
      }
      setCompleted((items) => new Set(items).add(current));
      if (current < steps.length - 1) {
        setCurrent((i) => Math.min(steps.length - 1, i + 1));
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        toast.success("Projeto submetido com sucesso.");
        router.push(pages.painel.path);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Não foi possível salvar esta etapa.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">
        Carregando submissão...
      </div>
    );
  }

  if (!editalId || !edital) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="max-w-lg rounded-2xl border border-border bg-card p-8 text-center">
          <div className="font-display text-3xl">Edital não selecionado</div>
          <p className="mt-3 text-sm text-muted-foreground">Escolha um edital aberto para iniciar a submissão de projeto.</p>
          <Link href={pages.painel.path} className="mt-6 inline-flex rounded-full bg-gradient-hero text-primary-foreground px-5 py-3 text-sm font-medium">
            Voltar ao painel
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavBarInterna title={'Instituto Verde Tocantins'} subtitle={'Área do proponente'} />
      <div className="mx-auto max-w-7xl px-6 py-10 grid lg:grid-cols-12 gap-10">
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-24">
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4 font-mono">Etapas - {current + 1}/{steps.length}</div>
            <nav className="space-y-1">
              {steps.map((s, i) => {
                const isDone = completed.has(i) && i !== current;
                const isCurrent = i === current;
                return (
                  <button
                    key={s.n}
                    onClick={() => goToStep(i)}
                    className={`w-full text-left flex items-start gap-3 p-3 rounded-xl transition-all ${isCurrent ? "bg-card shadow-soft border border-border" : "hover:bg-secondary/60 border border-transparent"}`}
                  >
                    <div className="relative shrink-0">
                      <div className={`h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-mono ${isDone ? "bg-gradient-hero text-primary-foreground" : isCurrent ? "bg-card border-2 border-leaf text-leaf" : "bg-secondary text-muted-foreground"}`}>
                        {isDone ? "OK" : s.n}
                      </div>
                      {isCurrent && <div className="absolute inset-0 rounded-full bg-leaf animate-pulse-ring" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className={`text-sm leading-tight ${isCurrent ? "font-medium text-foreground" : "text-foreground/80"}`}>{s.t}</div>
                      <div className="text-[11px] text-muted-foreground mt-0.5 truncate">{s.s}</div>
                    </div>
                  </button>
                );
              })}
            </nav>

            <div className="mt-8 rounded-2xl bg-gradient-mesh border border-border p-5">
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono">Resumo do edital</div>
              <div className="mt-3 text-sm font-medium">{edital.frenteAtuacao || "Frente não informada"}</div>
              <div className="mt-1 text-xs text-muted-foreground">{edital.regiaoImediata || "Região não informada"}</div>
              <div className="mt-3 text-xs text-muted-foreground">{formatCurrencyRange(edital.valorMinimo, edital.valorMaximo)}</div>
              <div className="mt-1 text-xs text-muted-foreground">Inscrições até {formatDate(edital.fimRecebimentoPropostas)}</div>
            </div>
          </div>
        </aside>

        <main className="lg:col-span-9 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-xs text-muted-foreground">Etapa {steps[current].n}</span>
                <span className="h-px w-12 bg-border" />
                <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{steps[current].s}</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl tracking-[-0.02em] leading-[1.02]">
                {steps[current].t}
              </h1>

              <div className="mt-10">
                {current === 0 && <Step1 value={form.etapa1} naturezas={naturezas} onChange={(etapa1) => setForm((prev) => ({ ...prev, etapa1 }))} />}
                {current === 1 && <Step2 value={form.etapa2} edital={edital} onChange={(etapa2) => setForm((prev) => ({ ...prev, etapa2 }))} />}
                {current === 2 && <Step3 value={form.etapa3} municipios={municipios} onChange={(etapa3) => setForm((prev) => ({ ...prev, etapa3 }))} />}
                {current === 3 && <Step4 value={form.etapa4} onChange={(etapa4) => setForm((prev) => ({ ...prev, etapa4 }))} />}
                {current === 4 && <Step5 value={form.etapa5} onChange={(etapa5) => setForm((prev) => ({ ...prev, etapa5 }))} />}
                {current === 5 && <Step6 value={form.etapa6} onChange={(etapa6) => setForm((prev) => ({ ...prev, etapa6 }))} />}
              </div>

              <div className="mt-12 flex items-center justify-between gap-4 pt-6 border-t border-border">
                <button
                  onClick={prev}
                  disabled={current === 0 || saving}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  Etapa anterior
                </button>
                <div className="text-xs text-muted-foreground hidden sm:block">
                  {current + 1} de {steps.length}
                </div>
                <button
                  onClick={saveCurrentStep}
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-hero text-primary-foreground px-6 py-3 text-sm font-medium shadow-glow hover:shadow-elevated transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {saving ? "Salvando..." : current < steps.length - 1 ? `Salvar e continuar` : "Submeter projeto"}
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={current < steps.length - 1 ? "M5 12h14M13 5l7 7-7 7" : "M5 13l4 4L19 7"} strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

async function submitStep(current: number, form: SubmissionForm, editalId: number, projectId: number | null): Promise<{ id: number }> {
  if (current === 0) {
    return api<{ id: number }>("/projetos/etapa-1", {
      method: "POST",
      body: JSON.stringify({
        instituicao: {
          ...form.etapa1,
          idNaturezaJuridica: Number(form.etapa1.idNaturezaJuridica),
        },
      }),
    });
  }
  if (!projectId) throw new Error("Salve a identificacao do proponente antes de continuar.");
  if (current === 1) {
    return api<{ id: number }>(`/projetos/etapa-2/${projectId}`, {
      method: "POST",
      body: JSON.stringify({ ...form.etapa2, idEdital: editalId }),
    });
  }
  if (current === 2) {
    return api<{ id: number }>(`/projetos/etapa-3/${projectId}`, {
      method: "POST",
      body: JSON.stringify({ localizacao: { ...form.etapa3, idMunicipio: Number(form.etapa3.idMunicipio) } }),
    });
  }
  if (current === 3) {
    return api<{ id: number }>(`/projetos/etapa-4/${projectId}`, {
      method: "POST",
      body: JSON.stringify({
        publicoBeneficiado: {
          mulheresQuant: toInt(form.etapa4.mulheresQuant),
          homensQuant: toInt(form.etapa4.homensQuant),
          criancasQuant: toInt(form.etapa4.criancasQuant),
          jovensQuant: toInt(form.etapa4.jovensQuant),
          idososQuant: toInt(form.etapa4.idososQuant),
          povosIndigenasQuant: toInt(form.etapa4.povosIndigenasQuant),
          quilombolasQuant: toInt(form.etapa4.quilombolasQuant),
          agricultoresFamiliarQuant: toInt(form.etapa4.agricultoresFamiliarQuant),
          comunidadesTradicionaisQuant: toInt(form.etapa4.comunidadesTradicionaisQuant),
          rendaMedia: form.etapa4.rendaMedia ? Number(form.etapa4.rendaMedia) : null,
          fonteRendaPrincipal: form.etapa4.fonteRendaPrincipal,
          descricaoAplicacaoBeneficio: form.etapa4.descricaoAplicacaoBeneficio,
        },
      }),
    });
  }
  if (current === 4) {
    return api<{ id: number }>(`/projetos/etapa-5/${projectId}`, {
      method: "POST",
      body: JSON.stringify({ planoExecucao: form.etapa5 }),
    });
  }
  return api<{ id: number }>(`/projetos/etapa-6/${projectId}`, {
    method: "POST",
    body: JSON.stringify(form.etapa6),
  });
}

function validateStep(current: number, form: SubmissionForm) {
  if (current === 0) {
    const rep = form.etapa1.representanteLegal;
    if (!form.etapa1.razaoSocial || !form.etapa1.cnpj || !form.etapa1.idNaturezaJuridica) return "Preencha razão social, CNPJ e natureza jurídica.";
    if (!rep.nomeCompleto || !rep.cpf || !rep.email || !rep.telefone || !rep.cargo) return "Preencha os dados obrigatorios do representante legal.";
  }
  if (current === 1 && (!form.etapa2.nomeProjeto || !form.etapa2.justificativaMerito)) return "Preencha nome do projeto e justificativa.";
  if (current === 2 && (!form.etapa3.idMunicipio || !form.etapa3.comunidade)) return "Preencha município e comunidade.";
  if (current === 3) {
    const requiredNumbers = [
      form.etapa4.mulheresQuant,
      form.etapa4.homensQuant,
      form.etapa4.criancasQuant,
      form.etapa4.jovensQuant,
      form.etapa4.idososQuant,
      form.etapa4.povosIndigenasQuant,
      form.etapa4.quilombolasQuant,
      form.etapa4.agricultoresFamiliarQuant,
      form.etapa4.comunidadesTradicionaisQuant,
    ];
    if (requiredNumbers.some((value) => value === "")) return "Informe todos os quantitativos de beneficiários.";
    if (!form.etapa4.descricaoAplicacaoBeneficio) return "Descreva como o público será beneficiado.";
  }
  if (current === 4) {
    if (!form.etapa5.objetivoGeral || !form.etapa5.objetivoEspecifico) return "Preencha os objetivos do projeto.";
    if (form.etapa5.atividades.some((atividade) => !atividade.descricao || !atividade.responsavel || !atividade.dataInicio || !atividade.dataFim)) return "Preencha todas as atividades do plano de execução.";
  }
  if (current === 5 && Object.values(form.etapa6).some((accepted) => !accepted)) return "Aceite todos os termos obrigatórios para submeter.";
  return "";
}

function toInt(value: string) {
  return Number.parseInt(value || "0", 10);
}
