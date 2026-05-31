import Field from "@/libs/fields/Field";
import Section from "../SectionSubmeter";
import Grid from "@/libs/core/Grid";
import { Input } from "@/libs/fields/Input";
import { Select } from "@/libs/fields/Select";
import Textarea from "@/libs/fields/Textarea";
import { PublicoForm } from "../types";

type Props = {
  value: PublicoForm;
  onChange: (value: PublicoForm) => void;
};

const groups: Array<{ key: keyof PublicoForm; label: string }> = [
  { key: "mulheresQuant", label: "Mulheres" },
  { key: "homensQuant", label: "Homens" },
  { key: "criancasQuant", label: "Crianças" },
  { key: "jovensQuant", label: "Jovens" },
  { key: "idososQuant", label: "Idosos" },
  { key: "povosIndigenasQuant", label: "Povos indígenas" },
  { key: "quilombolasQuant", label: "Quilombolas" },
  { key: "agricultoresFamiliarQuant", label: "Agricultores familiares" },
  { key: "comunidadesTradicionaisQuant", label: "Comunidades tradicionais" },
];

export default function Step4({ value, onChange }: Props) {
  const set = (field: keyof PublicoForm, fieldValue: string) => onChange({ ...value, [field]: fieldValue });

  return (
    <>
      <Section title="Beneficiarios estimados" hint="Quantitativos por grupo">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {groups.map((g) => (
            <Field key={g.key} label={g.label} span={12}>
              <Input type="number" min={0} value={value[g.key]} onChange={(e) => set(g.key, e.target.value)} placeholder="0" />
            </Field>
          ))}
        </div>
      </Section>

      <Section title="Perfil socioeconomico">
        <Grid>
          <Field label="Renda média (R$)" span={6}>
            <Input type="number" min={0} step="0.01" value={value.rendaMedia} onChange={(e) => set("rendaMedia", e.target.value)} placeholder="1200.00" />
          </Field>
          <Field label="Fonte de renda principal" span={6}>
            <Select value={value.fonteRendaPrincipal} onChange={(e) => set("fonteRendaPrincipal", e.target.value)}>
              <option value="">Selecione</option>
              <option>Agricultura familiar</option>
              <option>Extrativismo</option>
              <option>Pecuaria</option>
              <option>Outro</option>
            </Select>
          </Field>
          <Field label="Como serao beneficiados?" span={12} required>
            <Textarea value={value.descricaoAplicacaoBeneficio} onChange={(e) => set("descricaoAplicacaoBeneficio", e.target.value)} placeholder="Detalhe a forma de impacto direto e indireto sobre cada grupo." />
          </Field>
        </Grid>
      </Section>
    </>
  );
}
