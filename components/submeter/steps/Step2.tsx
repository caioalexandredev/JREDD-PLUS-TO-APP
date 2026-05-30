import Grid from "@/libs/core/Grid";
import Section from "../SectionSubmeter";
import Field from "@/libs/fields/Field";
import { Input } from "@/libs/fields/Input";
import { Select } from "@/libs/fields/Select";
import Textarea from "@/libs/fields/Textarea";

export default function Step2() {
  return (
    <>
      <Section title="Dados gerais do projeto">
        <Grid>
          <Field label="Nome do projeto" span={12} required><Input placeholder="Recuperação de nascentes — Bacia do Tocantins" /></Field>
          <Field label="Edital relacionado" span={12} required>
            <Select><option>TO-2026-018 · Recuperação de nascentes</option><option>TO-2026-015 · Prevenção de queimadas</option></Select>
          </Field>
        </Grid>
      </Section>

      <Section title="Resumo executivo" hint="Até 3.000 caracteres">
        <Textarea rows={6} placeholder="Descreva em até 3.000 caracteres o que o projeto se propõe a fazer, onde, com quem e quais resultados espera entregar." />
        <div className="mt-2 flex justify-end text-[11px] text-muted-foreground font-mono">0 / 3000</div>
      </Section>

      <Section title="Problema e justificativa">
        <Grid>
          <Field label="Justificativa e mérito" span={12} required>
            <Textarea placeholder="Qual a relevância e tamanho do problema indentificado?" />
          </Field>
        </Grid>
      </Section>
    </>
  );
}