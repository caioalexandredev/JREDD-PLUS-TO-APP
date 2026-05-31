import Grid from "@/libs/core/Grid";
import Section from "../SectionSubmeter";
import Field from "@/libs/fields/Field";
import Textarea from "@/libs/fields/Textarea";
import { Input } from "@/libs/fields/Input";
import { AtividadeForm, PlanoForm } from "../types";

type Props = {
  value: PlanoForm;
  onChange: (value: PlanoForm) => void;
};

const emptyActivity: AtividadeForm = {
  descricao: "",
  responsavel: "",
  dataInicio: "",
  dataFim: "",
};

export default function Step5({ value, onChange }: Props) {
  const set = (field: keyof PlanoForm, fieldValue: string) => onChange({ ...value, [field]: fieldValue });
  const setAtividade = (index: number, field: keyof AtividadeForm, fieldValue: string) => {
    const atividades = value.atividades.map((atividade, current) => current === index ? { ...atividade, [field]: fieldValue } : atividade);
    onChange({ ...value, atividades });
  };
  const addAtividade = () => onChange({ ...value, atividades: [...value.atividades, { ...emptyActivity }] });
  const removeAtividade = (index: number) => {
    if (value.atividades.length === 1) return;
    onChange({ ...value, atividades: value.atividades.filter((_, current) => current !== index) });
  };

  return (
    <>
      <Section title="Objetivos">
        <Grid>
          <Field label="Objetivo geral" span={12} required>
            <Textarea value={value.objetivoGeral} onChange={(e) => set("objetivoGeral", e.target.value)} placeholder="Descreva o objetivo principal do projeto." />
          </Field>
          <Field label="Objetivos especificos" span={12} required hint="Um por linha">
            <Textarea value={value.objetivoEspecifico} onChange={(e) => set("objetivoEspecifico", e.target.value)} rows={5} placeholder={"1. ...\n2. ...\n3. ..."} />
          </Field>
        </Grid>
      </Section>

      <Section title="Atividades">
        <div className="space-y-3">
          {value.atividades.map((atividade, index) => (
            <div key={index} className="rounded-xl border border-border bg-background/50 p-4 grid grid-cols-12 gap-3">
              <Field label="Descricao" span={6}>
                <Input value={atividade.descricao} onChange={(e) => setAtividade(index, "descricao", e.target.value)} placeholder={`Atividade ${index + 1}`} />
              </Field>
              <Field label="Responsavel" span={6}>
                <Input value={atividade.responsavel} onChange={(e) => setAtividade(index, "responsavel", e.target.value)} />
              </Field>
              <Field label="Inicio" span={3}>
                <Input type="date" value={atividade.dataInicio} onChange={(e) => setAtividade(index, "dataInicio", e.target.value)} />
              </Field>
              <Field label="Fim" span={3}>
                <Input type="date" value={atividade.dataFim} onChange={(e) => setAtividade(index, "dataFim", e.target.value)} />
              </Field>
              <div className="col-span-12 flex justify-end">
                <button type="button" onClick={() => removeAtividade(index)} disabled={value.atividades.length === 1} className="text-xs text-muted-foreground hover:text-destructive disabled:opacity-40">
                  Remover atividade
                </button>
              </div>
            </div>
          ))}
          <button type="button" onClick={addAtividade} className="w-full rounded-xl border border-dashed border-border py-3 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/40 transition">
            + Adicionar atividade
          </button>
        </div>
      </Section>

      <Section title="Cronograma mensal">
        <div className="grid grid-cols-12 gap-1 text-[10px]">
          <div className="col-span-3 text-muted-foreground uppercase tracking-wider py-2">Atividade</div>
          {Array.from({ length: 9 }).map((_, m) => <div key={m} className="text-center text-muted-foreground py-2 font-mono">M{m + 1}</div>)}
          {value.atividades.map((atividade, index) => (
            <div key={index} className="contents">
              <div className="col-span-3 py-2 text-sm truncate">{atividade.descricao || `Atividade ${index + 1}`}</div>
              {Array.from({ length: 9 }).map((_, m) => (
                <div key={`${index}-${m}`} className={`h-7 rounded ${m >= index && m <= index + 2 ? "bg-gradient-hero" : "bg-secondary"}`} />
              ))}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
