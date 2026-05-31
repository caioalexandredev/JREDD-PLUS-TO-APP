import Link from "next/link";
import Navbar from "@/components/home/navbar";
import Rodape from "@/components/home/rodape";
import { editais, statusColor } from "@/mock/EditalData";

export default function EditaisPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 pt-32 pb-16">
        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground font-mono">Chamadas publicas</div>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl leading-[1.02]">
            Editais ambientais abertos e em acompanhamento
          </h1>
          <p className="mt-4 text-muted-foreground">
            Consulte chamadas, prazos, regioes e documentos para preparar propostas ao JREDD+.
          </p>
        </div>

        <section className="mt-10 grid md:grid-cols-2 gap-4">
          {editais.map((edital) => (
            <article key={edital.id} className="bg-card border border-border rounded-2xl p-5 shadow-soft">
              <div className="flex items-start justify-between gap-3">
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">{edital.id}</div>
                <span className={`text-[10px] uppercase tracking-[0.16em] font-mono px-2 py-0.5 rounded-full border ${statusColor(edital.status)}`}>
                  {edital.status}
                </span>
              </div>
              <h2 className="mt-3 font-display text-2xl leading-tight">{edital.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{edital.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="rounded-full bg-secondary px-3 py-1">{edital.theme}</span>
                <span className="rounded-full bg-secondary px-3 py-1">{edital.region}</span>
                <span className="rounded-full bg-secondary px-3 py-1">{edital.value}</span>
              </div>
              <Link href="/auth" className="mt-5 inline-flex rounded-full border border-border px-4 py-2 text-sm hover:bg-secondary transition-colors">
                Submeter proposta
              </Link>
            </article>
          ))}
        </section>
      </main>
      <Rodape />
    </div>
  );
}
