import Link from "next/link";

export default function MarcoLegalPage() {
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
            Fundamentos Regulatórios
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-[-0.02em] leading-[1.05] text-foreground">
            Marco Legal e <span className="text-primary">Governança</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Nossa plataforma opera sob rigorosos padrões internacionais e normativas nacionais para garantir a transparência, a segurança jurídica e a eficácia na gestão dos recursos do JREDD+ no Tocantins.
          </p>
        </header>

        <div className="space-y-8">
        
          <section className="bg-card border border-border rounded-3xl p-8 shadow-soft relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-16 -mr-16 h-48 w-48 rounded-full bg-gradient-mesh opacity-20 blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary font-mono text-sm font-bold">1</span>
                <h2 className="font-display text-2xl md:text-3xl">Base Regulatória Climática e Internacional</h2>
              </div>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>A plataforma está inserida no contexto de governança e repartição de benefícios do <strong>Programa Jurisdicional de REDD+ (JREDD+)</strong> do Estado do Tocantins.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>O mecanismo financeiro deve seguir estritamente as salvaguardas socioambientais desenhadas e exigidas pela <strong>Organização das Nações Unidas (ONU)</strong> no Acordo de Cancún (UNFCCC).</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>O programa e a ferramenta devem atender aos requisitos de transparência e aos padrões de excelência para a certificação de créditos de carbono, com destaque para as exigências do padrão internacional <strong>ART TREES</strong>.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>A estruturação da geração de créditos (Estudo de Linha de Base e Plano de MRV) deve ser fundamentada em metodologias reconhecidas por certificadoras e auditores independentes internacionais, como o <strong>VCS (Verified Carbon Standard)</strong> da Verra ou o <strong>Gold Standard</strong>.</span>
                </li>
              </ul>
            </div>
          </section>

          <div className="grid lg:grid-cols-2 gap-8">
            <section className="bg-card border border-border rounded-3xl p-8 shadow-soft flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center h-8 w-8 rounded-full bg-secondary text-foreground font-mono text-sm font-bold border border-border">2</span>
                <h2 className="font-display text-2xl">Regularização Territorial e Fiscal</h2>
              </div>
              <div className="space-y-3 flex-1">
                <RegulatoryItem title="CAR" desc="Cadastro Ambiental Rural: Registro obrigatório no SICAR, gerenciado pela SEMARH-TO, indispensável para atestar APP, Reserva Legal e remanescentes." />
                <RegulatoryItem title="Matrícula" desc="Documento cartorial atualizado e sem ônus que comprova a titularidade da terra junto ao Cartório de Registro de Imóveis." />
                <RegulatoryItem title="CCIR" desc="Certificado de Cadastro de Imóvel Rural: Atestado de cadastro no sistema federal, emitido pelo INCRA." />
                <RegulatoryItem title="ITR" desc="Imposto Territorial Rural: Comprovante exigido de regularidade fiscal junto à Receita Federal (últimos 5 anos)." />
                <RegulatoryItem title="Contratos" desc="De Arrendamento/Cessão de Uso: Exigência jurídica formal para intervenções quando o executor não é o proprietário da terra." />
              </div>
            </section>

            <section className="bg-card border border-border rounded-3xl p-8 shadow-soft flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center h-8 w-8 rounded-full bg-secondary text-foreground font-mono text-sm font-bold border border-border">3</span>
                <h2 className="font-display text-2xl">Licenciamento e Responsabilidade</h2>
              </div>
              <div className="space-y-3 flex-1">
                <RegulatoryItem title="PRAD" desc="Plano de Recuperação de Áreas Degradadas: Documento técnico legalmente obrigatório que baseia o planejamento das intervenções." />
                <RegulatoryItem title="ART / RRT" desc="Obrigatoriedade de vínculo jurídico do profissional técnico via CREA (ART) ou CAU (RRT)." />
                <RegulatoryItem title="Licenças" desc="Subordinação à SEMARH-TO para obtenção de Licença Prévia (LP), de Instalação (LI), de Operação (LO) ou Autorização Ambiental." />
                <RegulatoryItem title="Autorizações" desc="Específicas estaduais: Emissão de Autorização para Supressão de Vegetação e Outorga de Uso dos Recursos Hídricos (SEMARH)." />
                <RegulatoryItem title="Anuências" desc="FUNAI (territórios indígenas), INCRA (quilombolas) e ICMBio (unidades de conservação ou zonas de amortecimento)." />
                <RegulatoryItem title="TCRA / TAC" desc="Termo de Compromisso de Recuperação Ambiental (SEMARH) e Termo de Ajustamento de Conduta (MP ou órgão ambiental)." />
              </div>
            </section>
          </div>

          <section className="bg-card border border-border rounded-3xl p-8 shadow-soft">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary font-mono text-sm font-bold">4</span>
              <h2 className="font-display text-2xl md:text-3xl">Governança, Transparência e Proteção de Dados</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-border bg-secondary/30 p-5">
                <div className="font-medium mb-2">Comprovação Institucional</div>
                <p className="text-sm text-muted-foreground">Submissão condicionada à comprovação jurídica (CNPJ/CPF, Estatuto Social, Ata de Eleição) e Certidões Negativas (Federal, Estadual, Municipal, TST e SEMARH-TO).</p>
              </div>
              <div className="rounded-2xl border border-border bg-secondary/30 p-5">
                <div className="font-medium mb-2">Conformidade com a LGPD</div>
                <p className="text-sm text-muted-foreground">A plataforma garante os termos de veracidade de informações e de concordância com as regras da Lei Geral de Proteção de Dados referentes ao uso de dados pessoais.</p>
              </div>
              <div className="rounded-2xl border border-border bg-secondary/30 p-5">
                <div className="font-medium mb-2">Validade Jurídica (Gov.br)</div>
                <p className="text-sm text-muted-foreground">O sistema possui validade jurídica de acesso e autenticação através de Assinatura Eletrônica (integração Gov.br) ou Certificado Digital padrão ICP-Brasil.</p>
              </div>
            </div>
          </section>

          {/* 5. Base Legal do Edital do Evento */}
          <section className="bg-card border border-border rounded-3xl p-8 shadow-soft">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex items-center justify-center h-8 w-8 rounded-full bg-secondary text-foreground font-mono text-sm font-bold border border-border">5</span>
              <h2 className="font-display text-2xl">Base Legal do Evento (HACKAMARH)</h2>
            </div>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-3">
                <svg className="h-5 w-5 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>O desenvolvimento da plataforma durante a maratona é regido pelo <strong>Regulamento Conjunto SEMARH/UNITINS/NIT Nº 06/2026</strong>.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="h-5 w-5 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>A proteção e gestão dos direitos de Propriedade Intelectual das soluções criadas atendem à <strong>RESOLUÇÃO/CONSUNI/UNITINS Nº 24</strong>, de 11 de novembro de 2019.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="h-5 w-5 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>O formato de premiação e participação é amparado juridicamente como Concurso Cultural, isento de sorte/álea, conforme estabelecido no <strong>art. 3º, inciso II, da Lei Federal nº 5.768/1971</strong> e no <strong>art. 30 do Decreto nº 70.951/1972</strong>.</span>
              </li>
            </ul>
          </section>

        </div>
      </main>
    </div>
  );
}


function RegulatoryItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-3 rounded-xl hover:bg-secondary/30 transition-colors">
      <div className="shrink-0 pt-0.5">
        <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-secondary border border-border text-[10px] uppercase tracking-widest font-mono font-medium text-foreground min-w-[70px]">
          {title}
        </span>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {desc}
      </p>
    </div>
  );
}