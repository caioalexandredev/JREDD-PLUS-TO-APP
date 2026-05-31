import Field from "@/libs/fields/Field";
import Section from "../SectionSubmeter";
import Grid from "@/libs/core/Grid";
import { Input } from "@/libs/fields/Input";
import { Select } from "@/libs/fields/Select";
import { LocalizacaoForm, MunicipioApi } from "../types";

type Props = {
  value: LocalizacaoForm;
  municipios: MunicipioApi[];
  onChange: (value: LocalizacaoForm) => void;
};

export default function Step3({ value, municipios, onChange }: Props) {
  const set = (field: keyof LocalizacaoForm, fieldValue: string) => onChange({ ...value, [field]: fieldValue });

  return (
    <>
      <Section title="Georreferenciamento" hint="Informe a coordenada central e o municipio da area do projeto">
        <div className="grid lg:grid-cols-12 gap-4">
          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden border border-border bg-gradient-mesh min-h-[320px]">
            <svg viewBox="0 0 400 280" className="absolute inset-0 w-full h-full">
              <defs>
                <pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M40 0H0V40" fill="none" stroke="oklch(0.55 0.12 220 / 0.08)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="400" height="280" fill="url(#g)" />
              <path d="M180 80 Q220 90 230 130 T210 200 Q180 215 150 195 Q140 150 160 110 Z" fill="oklch(0.52 0.11 165 / 0.25)" stroke="oklch(0.52 0.11 165)" strokeWidth="2" strokeDasharray="4 3" />
              <circle cx="190" cy="140" r="4" fill="oklch(0.52 0.11 165)" />
            </svg>
            <div className="absolute top-4 left-4 glass rounded-full px-3 py-1.5 text-[10px] uppercase tracking-wider font-mono">Localizacao declarada</div>
            <div className="absolute bottom-4 right-4 flex gap-2">
              {["KML", "KMZ", "SHP", "GeoJSON"].map((f) => <span key={f} className="text-[10px] glass px-2 py-1 rounded-md font-mono">{f}</span>)}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-3">
            <Grid>
              <Field label="Latitude" span={6}>
                <Input value={value.latitude} onChange={(e) => set("latitude", e.target.value)} placeholder="-10.184" />
              </Field>
              <Field label="Longitude" span={6}>
                <Input value={value.longitude} onChange={(e) => set("longitude", e.target.value)} placeholder="-48.333" />
              </Field>
              <Field label="Municipio" span={12} required>
                <Select value={value.idMunicipio} onChange={(e) => set("idMunicipio", e.target.value)}>
                  <option value="">Selecione</option>
                  {municipios.map((municipio) => (
                    <option key={municipio.id} value={municipio.id}>{municipio.nome}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Comunidade" span={12} required>
                <Input value={value.comunidade} onChange={(e) => set("comunidade", e.target.value)} placeholder="Taquarucu" />
              </Field>
            </Grid>
          </div>
        </div>
      </Section>

      <Section title="Diagnostico territorial" hint="Os indicadores territoriais poderao ser enriquecidos no acompanhamento">
        <div className="grid sm:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden">
          {[
            { l: "Cobertura florestal", v: "A calcular" },
            { l: "Area degradada", v: "A calcular" },
            { l: "Historico de fogo", v: "A calcular" },
            { l: "Uso agropecuario", v: "A calcular" },
          ].map((k) => (
            <div key={k.l} className="bg-card p-4">
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{k.l}</div>
              <div className="font-display text-2xl mt-1">{k.v}</div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
