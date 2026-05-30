import Grid from "@/libs/core/Grid";
import Section from "../SectionSubmeter";
import Field from "@/libs/fields/Field";
import Textarea from "@/libs/fields/Textarea";
import { Input } from "@/libs/fields/Input";

export default function Step5() {
  return (
    <>
      <Section title="Objetivos">
        <Grid>
          <Field label="Objetivo geral" span={12} required>
            <Textarea placeholder="Descreva o objetivo principal do projeto." />
          </Field>
          <Field label="Objetivos específicos" span={12} required hint="Um por linha">
            <Textarea rows={5} placeholder={"1. ...\n2. ...\n3. ..."} />
          </Field>
        </Grid>
      </Section>

      <Section title="Atividades">
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border border-border bg-background/50 p-4 grid grid-cols-12 gap-3">
              <Field label="Atividade" span={6}>
                <Input placeholder={`Atividade ${i}`} />
              </Field>
              <Field label="Responsável" span={6}>
                <Input />
              </Field>
              <Field label="Início" span={3}>
                <Input type="date" />
              </Field>
              <Field label="Fim" span={3}>
                <Input type="date" />
              </Field>
              <Field label="Descrição" span={6}>
                <Input />
              </Field>
            </div>
          ))}
          <button type="button" className="w-full rounded-xl border border-dashed border-border py-3 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/40 transition">+ Adicionar atividade</button>
        </div>
      </Section>

      <Section title="Cronograma mensal">
        <div className="grid grid-cols-12 gap-1 text-[10px]">
          <div className="col-span-3 text-muted-foreground uppercase tracking-wider py-2">Atividade</div>
          {Array.from({ length: 9 }).map((_, m) => <div key={m} className="text-center text-muted-foreground py-2 font-mono">M{m + 1}</div>)}
          {[1, 2, 3].map((a) => (
            <>
              <div key={`l${a}`} className="col-span-3 py-2 text-sm">Atividade {a}</div>
              {Array.from({ length: 9 }).map((_, m) => (
                <div key={`${a}-${m}`} className={`h-7 rounded ${m >= a - 1 && m <= a + 2 ? "bg-gradient-hero" : "bg-secondary"}`} />
              ))}
            </>
          ))}
        </div>
      </Section>
    </>
  );
}