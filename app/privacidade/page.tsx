import Link from "next/link";
import Navbar from "@/components/home/navbar";
import Rodape from "@/components/home/rodape";

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 pt-32 pb-16">
        <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground font-mono">Privacidade</div>
        <h1 className="mt-3 font-display text-5xl leading-[1.02]">Politica de privacidade</h1>
        <p className="mt-5 text-muted-foreground leading-relaxed">
          As informacoes submetidas na plataforma sao usadas para operacao dos editais, analise tecnica, acompanhamento de evidencias e prestacao de contas. Dados sensiveis devem ser acessados somente por usuarios autorizados.
        </p>
        <section className="mt-8 space-y-3">
          {["Coletamos somente dados necessarios ao fluxo do edital.", "Protegemos rotas internas por perfil de usuario.", "Solicitacoes de revisao podem ser encaminhadas ao administrador da plataforma."].map((item) => (
            <div key={item} className="rounded-2xl border border-border bg-card p-4 text-sm text-muted-foreground shadow-soft">{item}</div>
          ))}
        </section>
        <Link href="/" className="mt-8 inline-flex rounded-full border border-border px-5 py-3 text-sm hover:bg-secondary transition-colors">Voltar ao inicio</Link>
      </main>
      <Rodape />
    </div>
  );
}
