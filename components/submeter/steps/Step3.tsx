import Field from "@/libs/fields/Field";
import Section from "../SectionSubmeter";
import Grid from "@/libs/core/Grid";
import { Input } from "@/libs/fields/Input";

export default function Step3() {
  return (
    <>
      <Section title="Georreferenciamento" hint="Importe um arquivo geográfico ou marque a área no mapa">
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
            <div className="absolute top-4 left-4 glass rounded-full px-3 py-1.5 text-[10px] uppercase tracking-wider font-mono">Polígono ativo · 542 ha</div>
            <div className="absolute bottom-4 right-4 flex gap-2">
              {["KML", "KMZ", "SHP", "GeoJSON"].map((f) => <span key={f} className="text-[10px] glass px-2 py-1 rounded-md font-mono">{f}</span>)}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-3">
            <Grid>
              <Field label="Latitude" span={6}>
                <Input placeholder="-10.184" />
              </Field>
              <Field label="Longitude" span={6}>
                <Input placeholder="-48.333" />
              </Field>
              <Field label="Município" span={12}>
                <Input placeholder="Palmas" />
              </Field>
              <Field label="Comunidade" span={12}>
                <Input placeholder="Taquaruçu" />
              </Field>
            </Grid>
          </div>
        </div>
      </Section>

      <Section title="Diagnóstico territorial · MapBiomas" hint="Gerado automaticamente">
        <div className="grid sm:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden">
          {[
            { l: "Cobertura florestal", v: "68%", c: "leaf" },
            { l: "Área degradada", v: "12%", c: "destructive" },
            { l: "Histórico de fogo", v: "3 eventos", c: "ocean" },
            { l: "Uso agropecuário", v: "20%", c: "mist" },
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