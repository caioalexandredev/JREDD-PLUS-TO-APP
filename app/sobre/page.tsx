import Link from "next/link";

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-6 py-16 lg:py-24">

        <div className="mb-10">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Voltar para o início
          </Link>
        </div>

        <header className="mb-16 max-w-4xl">
          <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground font-mono mb-4">
            Sobre a nossa plataforma
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-[-0.02em] leading-[1.05] text-foreground">
            Tecnologia e Transparência para o <span className="text-primary">Futuro do Tocantins</span>
          </h1>
        </header>

        <div className="space-y-12">

          <section className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-soft">
            <h2 className="font-display text-2xl md:text-3xl mb-6">A Nossa Essência e o Nosso Desafio</h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                A nossa plataforma nasce do objetivo central do <strong>HACKAMARH</strong>: desenvolver uma ferramenta tecnológica focada na democratização do acesso a fundos de carbono e impacto do Programa Jurisdicional de REDD+ (JREDD+). O nosso grande desafio é garantir o monitoramento efetivo da restauração ecológica de áreas degradadas, entregando transparência e rastreabilidade para os ativos naturais do Estado do Tocantins.
              </p>
              <p>
                O <strong>REDD+</strong> é um instrumento econômico de redução das emissões dos gases de efeito estufa por desmatamento e degradação florestal. Por ser um instrumento econômico, ele precisa transmitir segurança jurídica e confiabilidade, convencendo compradores de créditos de carbono (como grandes empresas globais) e a própria ONU (UNFCCC).
              </p>
              <div className="mt-6 rounded-2xl bg-secondary/40 border border-border p-6 text-foreground/90">
                <p className="font-medium mb-2">A nossa grande dor atual:</p>
                <p className="text-sm text-muted-foreground">
                  Comprovar que o recurso financeiro gerado pela venda de carbono está realmente chegando na base e fazendo a diferença. Precisamos mostrar de forma transparente que os recursos estão sendo aplicados respeitando as salvaguardas socioambientais e beneficiando povos indígenas, agricultura familiar, governo do estado e grandes produtores rurais. Além disso, é essencial provar que o desmatamento e a degradação — especialmente o fogo, que é o principal elemento que degrada o Cerrado — foram reduzidos.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="mb-8">
              <h2 className="font-display text-2xl md:text-3xl">Como a Plataforma Funciona</h2>
              <p className="mt-2 text-muted-foreground">
                Para resolver esse problema complexo de governança e repartição de benefícios, a nossa solução é estruturada em três níveis fundamentais:
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-3xl p-8 shadow-soft flex flex-col hover:border-primary/30 transition-colors">
                <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-mono text-lg font-bold mb-6">
                  1
                </div>
                <h3 className="font-display text-xl mb-4">Interface Pública e Portal de Editais</h3>
                <ul className="space-y-3 text-sm text-muted-foreground flex-1">
                  <li className="flex gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    Interface pública onde é possível acessar editais e preencher informações sobre associações.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    Submissão de projetos detalhando nome, objetivos, justificativa, metodologia e aplicação do recurso.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    Uso de indicadores específicos (redução de fogo/desmatamento, etnias e mulheres atendidas).
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    Foco estadual prioritário no apoio a projetos de maior porte (acima de R$ 1 milhão).
                  </li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-3xl p-8 shadow-soft flex flex-col hover:border-primary/30 transition-colors">
                <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-mono text-lg font-bold mb-6">
                  2
                </div>
                <h3 className="font-display text-xl mb-4">Gestão, Inteligência e Prestação de Contas</h3>
                <ul className="space-y-3 text-sm text-muted-foreground flex-1">
                  <li className="flex gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    Acesso restrito para proponentes e gestores do comitê do fundo do clima.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    Capacidade de geoprocessamento e análise geoespacial, incluindo polígono da área de intervenção.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    Interoperabilidade com INPE, MapBiomas e CIGMA para cruzamento de dados e histórico de fogo/fitofisionomia.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    Prestação de contas orçamentária e monitoramento de metas físicas, fiscalizado pelo Estado.
                  </li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-3xl p-8 shadow-soft flex flex-col hover:border-primary/30 transition-colors">
                <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-mono text-lg font-bold mb-6">
                  3
                </div>
                <h3 className="font-display text-xl mb-4">Dashboards de Governança e Alta Gestão</h3>
                <ul className="space-y-3 text-sm text-muted-foreground flex-1">
                  <li className="flex gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    Painel de governança projetado para entregar respostas rápidas e visuais via dashboards dinâmicos.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    Desenhado para auditores internacionais, Governador, secretários e compradores de crédito de carbono.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    Geração de mapas automáticos mostrando onde os projetos acontecem e cruzando dados de impacto.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    Visualização instantânea de recursos, áreas atendidas e recortes sociais (indígenas, quilombolas, mulheres).
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden bg-primary/5 border border-primary/20 rounded-3xl p-8 md:p-12 shadow-soft">
            <div className="absolute top-0 right-0 -mt-16 -mr-16 h-64 w-64 rounded-full bg-gradient-mesh opacity-30 blur-3xl pointer-events-none"></div>

            <div className="relative z-10 max-w-3xl">
              <div className="text-[10px] uppercase tracking-[0.22em] text-primary font-mono mb-4">Resultados</div>
              <h2 className="font-display text-3xl mb-4">O Nosso Impacto</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Ao conectar esses três níveis, a plataforma elimina o trabalho manual e fragmentado, valorizando os esforços do Estado do Tocantins (que possui cerca de 11 milhões de hectares de florestas) na mitigação das mudanças climáticas.
              </p>
              <p className="text-foreground/90 leading-relaxed text-lg mt-4 font-medium">
                Entregamos informações em tempo ágil para mostrar exatamente o que chegou lá na base e qual diferença foi feita na vida da mulher e da criança indígena, do povo quilombola e das comunidades tradicionais.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}