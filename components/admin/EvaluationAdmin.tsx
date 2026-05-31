"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";

type Criterio = {
  id: string;
  label: string;
  description: string;
  weight: number;
  group: "Elegibilidade" | "Técnico" | "Socioambiental" | "Financeiro";
};

const criterios: Criterio[] = [
  { id: "c1", group: "Elegibilidade", label: "Documentação completa", description: "Estatuto, CNPJ ativo, certidões negativas e ata de eleição da diretoria.", weight: 5 },
  { id: "c2", group: "Elegibilidade", label: "Atuação comprovada na região", description: "Mínimo de 24 meses de atuação na área geográfica do edital.", weight: 5 },
  { id: "c3", group: "Elegibilidade", label: "Capacidade institucional", description: "Quadro técnico mínimo e experiência prévia em projetos REDD+/PSA.", weight: 5 },
  { id: "c4", group: "Técnico", label: "Coerência da teoria de mudança", description: "Cadeia de impacto, indicadores SMART e linha de base demonstrada.", weight: 10 },
  { id: "c5", group: "Técnico", label: "Linha de base e MRV", description: "Sistema de monitoramento, reporte e verificação com metodologia validada.", weight: 10 },
  { id: "c6", group: "Técnico", label: "Adicionalidade demonstrada", description: "Impacto além do cenário de referência (BAU) com evidências.", weight: 10 },
  { id: "c7", group: "Socioambiental", label: "Consulta livre e informada", description: "Atas de consulta a comunidades indígenas, quilombolas e tradicionais.", weight: 8 },
  { id: "c8", group: "Socioambiental", label: "Salvaguardas de Cancún", description: "Aderência às 7 salvaguardas com plano de mitigação de riscos.", weight: 8 },
  { id: "c9", group: "Socioambiental", label: "Equidade de gênero e juventude", description: "Metas explícitas de participação de mulheres e jovens na governança.", weight: 6 },
  { id: "c10", group: "Financeiro", label: "Orçamento detalhado e coerente", description: "Memória de cálculo por rubrica e custos compatíveis com o mercado.", weight: 8 },
  { id: "c11", group: "Financeiro", label: "Contrapartida e cofinanciamento", description: "Demonstração de recursos próprios ou parcerias formalizadas.", weight: 5 },
  { id: "c12", group: "Financeiro", label: "Cronograma físico-financeiro", description: "Desembolsos alinhados aos marcos de entrega do projeto.", weight: 5 },
];

const projeto = {
  id: "PRJ-2026-0418",
  title: "Recuperação de nascentes — Vale do Araguaia",
  proponente: "Instituto Verde Tocantins",
  cnpj: "12.345.678/0001-90",
  editalId: "TO-2026-018",
  editalTitulo: "Recuperação de áreas degradadas — Bacia do Araguaia",
  responsavel: "Maria Helena Vasconcelos · Coordenadora de Projetos",
  contato: "projetos@institutoverdeto.org.br · (63) 99812-4477",
  valor: "R$ 1.820.000,00",
  contrapartida: "R$ 320.000,00 (17,5%)",
  prazo: "36 meses",
  area: "1.240 ha em 47 propriedades",
  municipios: ["Araguacema", "Caseara", "Marianópolis do Tocantins", "Pium"],
  bioma: "Cerrado / transição Amazônia",
  beneficiarios: "215 famílias agricultoras familiares + 3 comunidades tradicionais",
  resumo:
    "O projeto propõe restaurar 1.240 hectares de áreas de preservação permanente em nascentes e matas ciliares ao longo de afluentes do Araguaia, combinando plantio de espécies nativas, regeneração natural assistida e cercamento. Inclui pagamento por serviços ambientais (PSA-Água) para 215 famílias, governança comunitária e monitoramento por sensoriamento remoto.",
  objetivos: [
    "Restaurar 1.240 ha de APPs em 36 meses com taxa de sobrevivência ≥75%",
    "Reduzir em 40% o assoreamento de 12 nascentes prioritárias",
    "Implantar PSA-Água para 215 famílias com renda média de R$ 4.800/ano",
    "Treinar 80 brigadistas comunitários em prevenção a incêndios",
  ],
  metodologia:
    "Combinação de plantio total (60%) e regeneração natural assistida (40%), com viveiro comunitário de 180 mil mudas/ano. MRV via parcelas permanentes + Sentinel-2 com verificação anual independente.",
  riscos: [
    { r: "Incêndios florestais no período seco", m: "Aceiros + brigadas comunitárias treinadas" },
    { r: "Baixa adesão de proprietários", m: "PSA escalonado + assistência técnica contínua" },
    { r: "Volatilidade de preços de insumos", m: "Compra antecipada e contrapartida em mudas" },
  ],
  equipe: [
    "1 Coordenador geral (Engenheiro Florestal, Dr.)",
    "2 Técnicos de campo (Eng. Agrônomos)",
    "1 Especialista em MRV (Geógrafo)",
    "1 Assistente social",
    "4 Brigadistas / viveiristas locais",
  ],
};

const subStatusStyle = "bg-ocean/10 text-ocean border-ocean/20";

const MapVisualization = dynamic(() => import("@/components/maps/RealMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-secondary/30 text-xs text-muted-foreground font-mono">
      Carregando mapa satélite...
    </div>
  ),
});

export default function EvaluationAdmin() {
  const [tab, setTab] = useState<"checklist" | "dossie">("checklist");
  const [mapView, setMapView] = useState<"degradacao" | "fogo">("degradacao");
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [parecer, setParecer] = useState("");
  const [recomendacao, setRecomendacao] = useState<"aprovar" | "ajustes" | "reprovar" | "">("");
  const [coordenadas, setCoordenadas] = useState<[number, number] | null>(null);

  useEffect(() => {
    async function buscarDadosDoProjeto() {
      try {
        setTimeout(() => {
          setCoordenadas([-10.1843, -48.3336]);
        }, 1500);

      } catch (error) {
        console.error("Erro ao buscar coordenadas", error);
      }
    }

    buscarDadosDoProjeto();
  }, []);

  const totalWeight = criterios.reduce((s, c) => s + c.weight, 0);
  const score = useMemo(
    () => criterios.filter((c) => checked[c.id]).reduce((s, c) => s + c.weight, 0),
    [checked],
  );
  const scorePct = Math.round((score / totalWeight) * 100);
  const checkedCount = Object.values(checked).filter(Boolean).length;

  const save = () => {

  };

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
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono"><span className="text-destructive">●</span> Avaliação técnica</div>
            <div className="text-sm font-medium leading-tight font-mono">{1} · {projeto.editalId}</div>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <span className={`text-[10px] uppercase tracking-[0.16em] font-mono px-2 py-1 rounded-full border ${subStatusStyle}`}>Em análise</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground font-mono"><span className="text-destructive">●</span> {projeto.editalTitulo}</div>
          <h1 className="mt-3 font-display text-3xl sm:text-4xl tracking-[-0.02em] leading-[1.05]">{projeto.title}</h1>
          <p className="mt-2 text-muted-foreground">{projeto.proponente} · {projeto.municipios.join(", ")} · {projeto.area}</p>
        </motion.div>

        <div className="mt-8 grid lg:grid-cols-2 gap-4">
          <MapCard
            label="Degradação florestal"
            kind="degradacao"
            active={mapView === "degradacao"}
            onClick={() => setMapView("degradacao")}
            center={coordenadas}
            stats={[
              { l: "Área degradada", v: "412 ha" },
              { l: "Severidade média", v: "Moderada" },
              { l: "Tendência 12m", v: "↘ -8%" },
            ]}
          />

          <MapCard
            label="Focos de calor / fogo"
            kind="fogo"
            active={mapView === "fogo"}
            onClick={() => setMapView("fogo")}
            center={coordenadas}
            stats={[
              { l: "Focos (90 dias)", v: "37" },
              { l: "Risco atual", v: "Alto" },
              { l: "Última detecção", v: "há 3 dias" },
            ]}
          />
        </div>

        <div className="mt-8 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-card border border-border rounded-3xl overflow-hidden">
            <div className="px-6 pt-5 border-b border-border">
              <div className="flex gap-1 p-1 bg-secondary rounded-xl w-fit">
                {([
                  ["checklist", "Checklist de avaliação"],
                  ["dossie", "Dossiê do projeto"],
                ] as const).map(([k, label]) => (
                  <button
                    key={k}
                    onClick={() => setTab(k)}
                    className={`text-sm px-4 py-2 rounded-lg transition-all ${tab === k ? "bg-card shadow-soft text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="py-3 text-xs text-muted-foreground font-mono">
                {tab === "checklist"
                  ? `${checkedCount}/${criterios.length} critérios atendidos · pontuação ${score}/${totalWeight}`
                  : "Informações declaradas pelo proponente — use como referência para a avaliação"}
              </div>
            </div>

            {tab === "checklist" && (
              <div className="p-6 space-y-6">
                {(["Elegibilidade", "Técnico", "Socioambiental", "Financeiro"] as const).map((grupo) => (
                  <div key={grupo}>
                    <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-muted-foreground mb-3">{grupo}</div>
                    <div className="space-y-2">
                      {criterios.filter((c) => c.group === grupo).map((c) => {
                        const on = !!checked[c.id];
                        return (
                          <button
                            key={c.id}
                            onClick={() => setChecked((p) => ({ ...p, [c.id]: !p[c.id] }))}
                            className={`w-full text-left flex items-start gap-3 p-3 rounded-xl border transition-all ${on ? "bg-leaf/5 border-leaf/40" : "bg-secondary/40 border-transparent hover:border-border"}`}
                          >
                            <span className={`mt-0.5 h-5 w-5 shrink-0 rounded-md border-2 inline-flex items-center justify-center transition-all ${on ? "bg-leaf border-leaf" : "border-border bg-background"}`}>
                              {on && <svg className="h-3 w-3 text-background" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                            </span>
                            <span className="flex-1 min-w-0">
                              <span className="flex items-center justify-between gap-2">
                                <span className="font-medium text-sm">{c.label}</span>
                                <span className="text-[10px] font-mono text-muted-foreground shrink-0">peso {c.weight}</span>
                              </span>
                              <span className="block text-xs text-muted-foreground mt-0.5">{c.description}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-muted-foreground mb-2">Parecer técnico</div>
                  <textarea
                    value={parecer}
                    onChange={(e) => setParecer(e.target.value)}
                    rows={5}
                    placeholder="Descreva fundamentos, ressalvas e recomendações ao proponente…"
                    className="w-full px-3 py-3 rounded-xl bg-secondary/60 border border-transparent text-sm focus:outline-none focus:border-ocean focus:bg-card transition-all resize-none"
                  />
                </div>
              </div>
            )}

            {tab === "dossie" && (
              <div className="p-6 space-y-6">
                <Section title="Identificação">
                  <Info l="ID submissão" v={projeto.id} />
                  <Info l="Proponente" v={projeto.proponente} />
                  <Info l="CNPJ" v={projeto.cnpj} />
                  <Info l="Responsável" v={projeto.responsavel} />
                  <Info l="Contato" v={projeto.contato} />
                </Section>

                <Section title="Escopo territorial">
                  <Info l="Área de intervenção" v={projeto.area} />
                  <Info l="Bioma" v={projeto.bioma} />
                  <Info l="Municípios" v={projeto.municipios.join(", ")} />
                  <Info l="Beneficiários" v={projeto.beneficiarios} />
                </Section>

                <Section title="Orçamento e prazo">
                  <Info l="Valor solicitado" v={projeto.valor} />
                  <Info l="Contrapartida" v={projeto.contrapartida} />
                  <Info l="Prazo de execução" v={projeto.prazo} />
                </Section>

                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-muted-foreground mb-2">Resumo executivo</div>
                  <p className="text-sm leading-relaxed text-foreground/90">{projeto.resumo}</p>
                </div>

                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-muted-foreground mb-2">Objetivos e metas</div>
                  <ul className="space-y-1.5">
                    {projeto.objetivos.map((o) => (
                      <li key={o} className="text-sm flex gap-2"><span className="text-leaf">●</span>{o}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-muted-foreground mb-2">Metodologia</div>
                  <p className="text-sm leading-relaxed text-foreground/90">{projeto.metodologia}</p>
                </div>

                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-muted-foreground mb-2">Riscos e mitigação</div>
                  <div className="space-y-2">
                    {projeto.riscos.map((r) => (
                      <div key={r.r} className="p-3 rounded-xl bg-secondary/40 border border-border">
                        <div className="text-sm font-medium">{r.r}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">Mitigação: {r.m}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-muted-foreground mb-2">Equipe</div>
                  <ul className="space-y-1.5">
                    {projeto.equipe.map((e) => (
                      <li key={e} className="text-sm flex gap-2"><span className="text-ocean">▸</span>{e}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-4">
            <div className="bg-card border border-border rounded-3xl p-6">
              <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-muted-foreground">Score técnico</div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-display text-5xl tracking-[-0.02em]">{scorePct}</span>
                <span className="text-muted-foreground text-sm">/100</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-secondary overflow-hidden">
                <div className={`h-full transition-all ${scorePct >= 80 ? "bg-leaf" : scorePct >= 60 ? "bg-ocean" : "bg-destructive"}`} style={{ width: `${scorePct}%` }} />
              </div>
              <div className="mt-2 text-xs text-muted-foreground font-mono">{score} de {totalWeight} pontos</div>
            </div>

            <div className="bg-card border border-border rounded-3xl p-6">
              <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-muted-foreground mb-3">Recomendação</div>
              <div className="space-y-2">
                {([
                  ["aprovar", "Aprovar", "bg-leaf/10 border-leaf/40 text-leaf"],
                  ["ajustes", "Solicitar ajustes", "bg-amber-500/10 border-amber-500/40 text-amber-600"],
                  ["reprovar", "Reprovar", "bg-destructive/10 border-destructive/40 text-destructive"],
                ] as const).map(([k, label, cls]) => (
                  <button
                    key={k}
                    onClick={() => setRecomendacao(k)}
                    className={`w-full text-left text-sm px-4 py-2.5 rounded-xl border transition-all ${recomendacao === k ? cls : "bg-secondary/40 border-transparent hover:border-border"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-3xl p-6">
              <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-muted-foreground mb-2">Resumo</div>
              <div className="text-sm space-y-1.5">
                <div className="flex justify-between"><span className="text-muted-foreground">Critérios</span><span>{checkedCount}/{criterios.length}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Mapa ativo</span><span className="capitalize">{mapView}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Recomendação</span><span className="capitalize">{recomendacao || "—"}</span></div>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 bg-card border border-border rounded-3xl">
          <div>
            <div className="text-sm font-medium">Pronto para finalizar?</div>
            <div className="text-xs text-muted-foreground mt-0.5">A avaliação será registrada no histórico do projeto e o proponente será notificado.</div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/admin" className="px-4 py-2.5 text-sm rounded-full hover:bg-secondary transition-colors">Cancelar</Link>
            <button
              onClick={save}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-hero text-primary-foreground px-6 py-3 text-sm font-medium shadow-glow hover:shadow-elevated transition-all hover:-translate-y-0.5"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Salvar avaliação
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MapCard({ 
  label, 
  kind, 
  active, 
  onClick, 
  stats, 
  center
}: { 
  label: string; 
  kind: "degradacao" | "fogo"; 
  active: boolean; 
  onClick: () => void; 
  stats: { l: string; v: string }[];
  center: [number, number] | null;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`bg-card border rounded-3xl overflow-hidden transition-all ${active ? "border-primary/40 shadow-soft" : "border-border"}`}>
      <div className="px-5 py-4 flex items-center justify-between border-b border-border">
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-muted-foreground">Mapa interativo</div>
          <div className="font-display text-lg tracking-[-0.01em]">{label}</div>
        </div>
        <button onClick={onClick} className={`text-[10px] uppercase tracking-[0.18em] font-mono px-2.5 py-1 rounded-full border transition-all ${active ? "bg-foreground text-background border-foreground" : "border-border hover:bg-secondary"}`}>
          {active ? "ativo" : "ativar"}
        </button>
      </div>
      
      <div className="relative h-80 w-full overflow-hidden z-0 bg-secondary/20 flex flex-col items-center justify-center">
        {center ? (
          <MapVisualization kind={kind} center={center} />
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
            <span className="text-xs text-muted-foreground font-mono animate-pulse">
              Buscando satélite...
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 divide-x divide-border border-t border-border">
        {stats.map((s) => (
          <div key={s.l} className="p-3">
            <div className="text-[10px] uppercase tracking-[0.16em] font-mono text-muted-foreground">{s.l}</div>
            <div className="text-sm font-medium mt-0.5">{s.v}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-muted-foreground mb-3">{title}</div>
      <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-2">{children}</dl>
    </div>
  );
}

function Info({ l, v }: { l: string; v: string }) {
  return (
    <div className="flex flex-col">
      <dt className="text-[10px] uppercase tracking-[0.16em] font-mono text-muted-foreground">{l}</dt>
      <dd className="text-sm">{v}</dd>
    </div>
  );
}
