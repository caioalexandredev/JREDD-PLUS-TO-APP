import Field from "@/libs/fields/Field";
import Section from "../SectionSubmeter";
import { Select } from "@/libs/fields/Select";
import { Input } from "@/libs/fields/Input";
import Grid from "@/libs/core/Grid";

export default function Step1() {
  return (
    <>
      <Section title="Dados da instituição" hint="Razão social, CNPJ e perfil jurídico">
        <Grid>
          <Field label="Razão social" span={8} required>
            <Input placeholder="Instituto Verde Tocantins" />
          </Field>
          <Field label="Nome fantasia" span={4}>
            <Input placeholder="Verde TO" />
          </Field>
          <Field label="CNPJ" span={4} required><Input placeholder="00.000.000/0001-00" /></Field>
          <Field label="Data de fundação" span={4}><Input type="date" /></Field>
          <Field label="Natureza jurídica" span={4} required>
            <Select>
              <option>OSCIP</option>
              <option>Associação</option>
              <option>Fundação</option>
              <option>Cooperativa</option>
            </Select>
          </Field>
          <Field label="Área de atuação" span={6}>
            <Input placeholder="Conservação ambiental, agroecologia" />
          </Field>
          <Field label="Site" span={6}>
            <Input placeholder="https://" /></Field>
          <Field label="Redes sociais" span={12}>
            <Input placeholder="@institutoverde · linkedin.com/..." /></Field>
        </Grid>
      </Section>

      <Section title="Representante legal">
        <Grid>
          <Field label="Nome completo" span={8} required><Input placeholder="Maria Aparecida Souza" /></Field>
          <Field label="Cargo" span={4} required><Input placeholder="Diretora-presidente" /></Field>
          <Field label="CPF" span={4} required><Input placeholder="000.000.000-00" /></Field>
          <Field label="RG" span={4}><Input placeholder="00.000.000-0 SSP/TO" /></Field>
          <Field label="Telefone" span={4} required><Input placeholder="(63) 9 0000-0000" /></Field>
          <Field label="E-mail" span={12} required><Input type="email" placeholder="representante@instituicao.org.br" /></Field>
        </Grid>
      </Section>
    </>
  );
}