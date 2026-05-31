import Link from "next/link";
import Navbar from "@/components/home/navbar";
import Rodape from "@/components/home/rodape";
import info from "@/config/app.info";

export default function LgpdPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 pt-32 pb-16">
        <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground font-mono">LGPD</div>
        <h1 className="mt-3 font-display text-5xl leading-[1.02]">Protecao de dados pessoais</h1>
        <p className="mt-5 text-muted-foreground leading-relaxed">
          O {info.name} trata dados pessoais apenas para cadastro, submissao, avaliacao, auditoria e transparencia dos projetos ambientais. O acesso aos paineis internos e limitado ao perfil autorizado de cada usuario.
        </p>
        <div className="mt-8 grid sm:grid-cols-3 gap-3">
          {["Finalidade clara", "Acesso controlado", "Rastreabilidade"].map((item) => (
            <div key={item} className="rounded-2xl border border-border bg-card p-4 text-sm font-medium shadow-soft">{item}</div>
          ))}
        </div>
        <Link href="/" className="mt-8 inline-flex rounded-full border border-border px-5 py-3 text-sm hover:bg-secondary transition-colors">Voltar ao inicio</Link>
      </main>
      <Rodape />
    </div>
  );
}
