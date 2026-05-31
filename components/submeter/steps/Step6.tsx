import Section from "../SectionSubmeter";
import { TermosForm } from "../types";

type Props = {
  value: TermosForm;
  onChange: (value: TermosForm) => void;
};

const terms: Array<{ key: keyof TermosForm; label: string }> = [
  { key: "declarouVeracidadeInformacoes", label: "Declaro a veracidade de todas as informações prestadas neste formulário." },
  { key: "autorizouTratamentoDadosLgpd", label: "Autorizo o tratamento de dados pessoais conforme a LGPD para fins de avaliação e execução do projeto." },
  { key: "comprometeuPrestacaoContas", label: "Comprometo-me com a prestação de contas dentro dos prazos estabelecidos pelo edital." },
  { key: "autorizouMonitoramentoAuditoria", label: "Autorizo o monitoramento e auditoria do projeto pelo órgão gestor e pela sociedade civil." },
];

export default function Step6({ value, onChange }: Props) {
  const set = (field: keyof TermosForm, fieldValue: boolean) => onChange({ ...value, [field]: fieldValue });
  const ready = terms.every((term) => value[term.key]);

  return (
    <>
      <Section title="Termos obrigatórios">
        <div className="space-y-3">
          {terms.map((term) => (
            <label key={term.key} className="flex items-start gap-3 p-3 rounded-xl hover:bg-secondary/40 cursor-pointer transition">
              <input checked={value[term.key]} onChange={(e) => set(term.key, e.target.checked)} type="checkbox" className="mt-0.5 h-4 w-4 rounded border-border accent-leaf" />
              <span className="text-sm text-foreground/85 leading-relaxed">{term.label}</span>
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
            <div className="font-display text-xl">{ready ? "Pronto para submeter" : "Revise os termos obrigatorios"}</div>
            <p className="text-primary-foreground/75 text-sm mt-0.5">
              A submissão será enviada ao edital selecionado após a confirmação dos termos.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
