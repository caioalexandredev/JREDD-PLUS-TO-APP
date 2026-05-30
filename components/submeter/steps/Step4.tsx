import Field from "@/libs/fields/Field";
import Section from "../SectionSubmeter";
import Grid from "@/libs/core/Grid";
import { Input } from "@/libs/fields/Input";
import { Select } from "@/libs/fields/Select";
import Textarea from "@/libs/fields/Textarea";

export default function Step4() {
  const groups = ["Mulheres", "Homens", "Crianças", "Jovens", "Idosos", "Povos indígenas", "Quilombolas", "Agricultores familiares", "Comunidades tradicionais"];
  return (
    <>
      <Section title="Beneficiários estimados" hint="Quantitativos por grupo">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {groups.map((g) => (
            <Field key={g} label={g} span={12}><Input type="number" placeholder="0" /></Field>
          ))}
        </div>
      </Section>

      <Section title="Perfil socioeconômico">
        <Grid>
          <Field label="Renda média (R$)" span={6}>
            <Input placeholder="1.200,00" />
          </Field>
          <Field label="Fonte de renda principal" span={6}>
            <Select>
              <option>Agricultura familiar</option>
              <option>Extrativismo</option>
              <option>Pecuária</option>
              <option>Outro</option>
            </Select>
          </Field>
          <Field label="Como serão beneficiados?" span={12} required>
            <Textarea placeholder="Detalhe a forma de impacto direto e indireto sobre cada grupo." />
          </Field>
        </Grid>
      </Section>
    </>
  );
}