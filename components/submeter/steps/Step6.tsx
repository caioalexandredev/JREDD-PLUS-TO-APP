import Section from "../SectionSubmeter";

export default function Step6() {
  const terms = [
    "Declaro a veracidade de todas as informações prestadas neste formulário.",
    "Autorizo o tratamento de dados pessoais conforme a LGPD para fins de avaliação e execução do projeto.",
    "Comprometo-me com a prestação de contas dentro dos prazos estabelecidos pelo edital.",
    "Autorizo o monitoramento e auditoria do projeto pelo órgão gestor e pela sociedade civil.",
  ];
  return (
    <>
      <Section title="Termos obrigatórios">
        <div className="space-y-3">
          {terms.map((t, i) => (
            <label key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-secondary/40 cursor-pointer transition">
              <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-border accent-leaf" />
              <span className="text-sm text-foreground/85 leading-relaxed">{t}</span>
            </label>
          ))}
        </div>
      </Section>

      <div className="mt-8 rounded-2xl bg-gradient-hero text-primary-foreground p-6 grain relative overflow-hidden">
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-leaf/30 blur-3xl" />
        <div className="relative flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-primary-foreground/15 backdrop-blur flex items-center justify-center">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <div>
            <div className="font-display text-xl">Pronto para submeter</div>
            <p className="text-primary-foreground/75 text-sm mt-0.5">Aderência ao edital: <span className="font-medium">82%</span> · Probabilidade estimada: <span className="font-medium">Alta</span></p>
          </div>
        </div>
      </div>
    </>
  );
}