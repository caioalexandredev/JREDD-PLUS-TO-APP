import Field from "@/libs/fields/Field";
import Section from "../SectionSubmeter";
import { Select } from "@/libs/fields/Select";
import { Input } from "@/libs/fields/Input";
import Grid from "@/libs/core/Grid";
import { InstituicaoForm, NaturezaJuridicaApi } from "../types";

type Props = {
  value: InstituicaoForm;
  naturezas: NaturezaJuridicaApi[];
  onChange: (value: InstituicaoForm) => void;
};

export default function Step1({ value, naturezas, onChange }: Props) {
  const set = (field: keyof InstituicaoForm, fieldValue: string) => onChange({ ...value, [field]: fieldValue });
  const setRepresentante = (field: keyof InstituicaoForm["representanteLegal"], fieldValue: string) =>
    onChange({ ...value, representanteLegal: { ...value.representanteLegal, [field]: fieldValue } });

  return (
    <>
      <Section title="Dados da instituicao" hint="Razao social, CNPJ e perfil juridico">
        <Grid>
          <Field label="Razao social" span={8} required>
            <Input value={value.razaoSocial} onChange={(e) => set("razaoSocial", e.target.value)} placeholder="Instituto Verde Tocantins" />
          </Field>
          <Field label="Nome fantasia" span={4}>
            <Input value={value.nomeFantasia} onChange={(e) => set("nomeFantasia", e.target.value)} placeholder="Verde TO" />
          </Field>
          <Field label="CNPJ" span={4} required>
            <Input value={value.cnpj} onChange={(e) => set("cnpj", e.target.value)} placeholder="00.000.000/0001-00" />
          </Field>
          <Field label="Data de fundacao" span={4}>
            <Input value={value.dataFundacao} onChange={(e) => set("dataFundacao", e.target.value)} type="date" />
          </Field>
          <Field label="Natureza juridica" span={4} required>
            <Select value={value.idNaturezaJuridica} onChange={(e) => set("idNaturezaJuridica", e.target.value)}>
              <option value="">Selecione</option>
              {naturezas.map((natureza) => (
                <option key={natureza.id} value={natureza.id}>{natureza.nome}</option>
              ))}
            </Select>
          </Field>
          <Field label="Area de atuacao" span={6}>
            <Input value={value.areaAtuacao} onChange={(e) => set("areaAtuacao", e.target.value)} placeholder="Conservacao ambiental, agroecologia" />
          </Field>
          <Field label="Site" span={6}>
            <Input value={value.site} onChange={(e) => set("site", e.target.value)} placeholder="https://" />
          </Field>
          <Field label="Redes sociais" span={12}>
            <Input value={value.redesSociais} onChange={(e) => set("redesSociais", e.target.value)} placeholder="@institutoverde - linkedin.com/..." />
          </Field>
        </Grid>
      </Section>

      <Section title="Representante legal">
        <Grid>
          <Field label="Nome completo" span={8} required>
            <Input value={value.representanteLegal.nomeCompleto} onChange={(e) => setRepresentante("nomeCompleto", e.target.value)} placeholder="Maria Aparecida Souza" />
          </Field>
          <Field label="Cargo" span={4} required>
            <Input value={value.representanteLegal.cargo} onChange={(e) => setRepresentante("cargo", e.target.value)} placeholder="Diretora-presidente" />
          </Field>
          <Field label="CPF" span={4} required>
            <Input value={value.representanteLegal.cpf} onChange={(e) => setRepresentante("cpf", e.target.value)} placeholder="000.000.000-00" />
          </Field>
          <Field label="RG" span={4}>
            <Input value={value.representanteLegal.rg} onChange={(e) => setRepresentante("rg", e.target.value)} placeholder="00.000.000-0 SSP/TO" />
          </Field>
          <Field label="Telefone" span={4} required>
            <Input value={value.representanteLegal.telefone} onChange={(e) => setRepresentante("telefone", e.target.value)} placeholder="(63) 9 0000-0000" />
          </Field>
          <Field label="E-mail" span={12} required>
            <Input value={value.representanteLegal.email} onChange={(e) => setRepresentante("email", e.target.value)} type="email" placeholder="representante@instituicao.org.br" />
          </Field>
        </Grid>
      </Section>
    </>
  );
}
