import Link from "next/link";
import Navbar from "@/components/home/navbar";
import Rodape from "@/components/home/rodape";
import info from "@/config/app.info";

const contactChannels = [
  {
    title: "Atendimento institucional",
    value: "contato@ecovertice.to.gov.br",
    description: "Dúvidas gerais sobre a plataforma, editais e acesso aos módulos.",
    href: "mailto:contato@ecovertice.to.gov.br?subject=Contato%20EcoVertice%20Tocantins",
  },
  {
    title: "Suporte técnico",
    value: "suporte@ecovertice.to.gov.br",
    description: "Ajuda com login, submissões, documentos e instabilidades.",
    href: "mailto:suporte@ecovertice.to.gov.br?subject=Suporte%20EcoVertice%20Tocantins",
  },
  {
    title: "Telefone",
    value: "(63) 3218-2100",
    description: "Atendimento em dias úteis, das 8h às 18h.",
    href: "tel:+556332182100",
  },
];

const topics = [
  "Acesso de proponentes, avaliadores, auditores e administradores",
  "Publicação de editais e documentos oficiais",
  "Acompanhamento de submissões e evidências",
  "Transparência, LGPD e solicitações institucionais",
];

export default function ContatoPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 pt-32 pb-16">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Voltar para o início
          </Link>
        </div>

        <section className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground font-mono">
              Fale conosco
            </div>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.04]">
              Atendimento para o programa <span className="text-gradient italic">{info.name}</span>
            </h1>
            <p className="mt-5 max-w-2xl text-muted-foreground leading-relaxed">
              Entre em contato com a equipe responsável para tratar de dúvidas sobre editais, submissões,
              documentação, perfis de acesso, auditoria e transparência pública.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:contato@ecovertice.to.gov.br?subject=Contato%20EcoVertice%20Tocantins"
                className="inline-flex justify-center rounded-full bg-gradient-hero text-primary-foreground px-5 py-3 text-sm font-medium shadow-glow hover:shadow-elevated transition-all"
              >
                Enviar e-mail
              </a>
              <a
                href="tel:+556332182100"
                className="inline-flex justify-center rounded-full border border-border px-5 py-3 text-sm hover:bg-secondary transition-colors"
              >
                Ligar para atendimento
              </a>
            </div>
          </div>

          <aside className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono">
              Canais oficiais
            </div>
            <div className="mt-5 space-y-3">
              {contactChannels.map((channel) => (
                <a
                  key={channel.title}
                  href={channel.href}
                  className="block rounded-2xl border border-border bg-secondary/30 p-4 hover:bg-secondary/60 transition-colors"
                >
                  <div className="text-sm font-medium">{channel.title}</div>
                  <div className="mt-1 text-base text-foreground">{channel.value}</div>
                  <div className="mt-2 text-xs leading-relaxed text-muted-foreground">{channel.description}</div>
                </a>
              ))}
            </div>
          </aside>
        </section>

        <section className="mt-14 grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6">
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono">
              Assuntos atendidos
            </div>
            <div className="mt-5 grid sm:grid-cols-2 gap-3">
              {topics.map((topic) => (
                <div key={topic} className="rounded-xl border border-border bg-background/60 p-4 text-sm text-muted-foreground">
                  {topic}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl border border-border bg-secondary/40 p-6">
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono">
              Endereço institucional
            </div>
            <h2 className="mt-3 font-display text-2xl">Palmas, Tocantins</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Secretaria responsável pela gestão ambiental estadual. Atendimento presencial mediante agendamento
              pelos canais oficiais da plataforma.
            </p>
            <div className="mt-5 text-sm text-foreground">
              Praça dos Girassóis, Esplanada das Secretarias
              <br />
              Palmas - TO, Brasil
            </div>
          </div>
        </section>
      </main>
      <Rodape />
    </div>
  );
}
