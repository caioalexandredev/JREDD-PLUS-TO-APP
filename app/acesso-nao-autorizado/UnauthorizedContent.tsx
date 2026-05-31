"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { clearSession } from "@/libs/api";
import info from "@/config/app.info";

export default function UnauthorizedContent() {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");
  const isSession = reason === "session";

  return (
    <section className="w-full max-w-3xl bg-card border border-border rounded-3xl shadow-elevated overflow-hidden">
      <div className="p-8 sm:p-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/70 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">
          Acesso restrito
        </div>
        <h1 className="mt-6 font-display text-4xl sm:text-6xl leading-[1.02]">
          Voce nao tem permissao para acessar esta area.
        </h1>
        <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">
          {isSession
            ? "Sua sessao expirou ou nao foi reconhecida. Entre novamente para continuar usando os modulos protegidos da plataforma."
            : `O perfil da sua conta nao possui autorizacao para este painel. Cada area do ${info.name} e liberada conforme o papel do usuario.`}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            href="/auth"
            onClick={() => clearSession()}
            className="inline-flex items-center justify-center rounded-full bg-foreground text-background px-5 py-3 text-sm font-medium hover:bg-foreground/90 transition-colors"
          >
            Entrar com outra conta
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-border bg-card px-5 py-3 text-sm font-medium hover:bg-secondary transition-colors"
          >
            Voltar ao inicio
          </Link>
        </div>
      </div>
      <div className="bg-foreground text-background px-8 sm:px-10 py-5 text-sm">
        Em caso de duvida, solicite ao administrador a revisao do perfil vinculado ao seu usuario.
      </div>
    </section>
  );
}
