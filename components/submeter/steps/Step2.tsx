import Grid from "@/libs/core/Grid";
import Section from "../SectionSubmeter";
import Field from "@/libs/fields/Field";
import { Input } from "@/libs/fields/Input";
import Textarea from "@/libs/fields/Textarea";
import { CaracterizacaoForm } from "../types";
import { EditalDetalheApi } from "@/libs/jredd-api-types";

type Props = {
  value: CaracterizacaoForm;
  edital: EditalDetalheApi | null;
  onChange: (value: CaracterizacaoForm) => void;
};

export default function Step2({ value, edital, onChange }: Props) {
  const set = (field: keyof CaracterizacaoForm, fieldValue: string) => onChange({ ...value, [field]: fieldValue });

  return (
    <>
      <Section title="Dados gerais do projeto">
        <Grid>
          <Field label="Nome do projeto" span={12} required>
            <Input value={value.nomeProjeto} onChange={(e) => set("nomeProjeto", e.target.value)} placeholder="Recuperacao de nascentes - Bacia do Tocantins" />
          </Field>
          <Field label="Edital relacionado" span={12} required>
            <Input value={edital ? `#${edital.id} - ${edital.titulo}` : "Carregando edital..."} readOnly />
          </Field>
        </Grid>
      </Section>

      <Section title="Resumo executivo" hint="Ate 1.500 caracteres">
        <Textarea
          rows={6}
          value={value.resumo}
          onChange={(e) => set("resumo", e.target.value)}
          maxLength={1500}
          placeholder="Descreva o que o projeto se propoe a fazer, onde, com quem e quais resultados espera entregar."
        />
        <div className="mt-2 flex justify-end text-[11px] text-muted-foreground font-mono">{value.resumo.length} / 1500</div>
      </Section>

      <Section title="Problema e justificativa">
        <Grid>
          <Field label="Justificativa e merito" span={12} required>
            <Textarea value={value.justificativaMerito} onChange={(e) => set("justificativaMerito", e.target.value)} maxLength={1500} placeholder="Qual a relevancia e tamanho do problema identificado?" />
          </Field>
        </Grid>
      </Section>
    </>
  );
}
