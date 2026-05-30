"use client";

import Link from "next/link";
import { SubmitEventHandler, useState } from "react";
import { motion } from "motion/react";
import Field from "@/libs/fields/Field";
import { Input } from "@/libs/fields/Input";
import Button from "@/libs/button/Button";
import AsideLoginCadastro from "./AsideLoginCadastro";

export default function LoginCadastro() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);

  const handle: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <AsideLoginCadastro />
      
      <main className="relative flex flex-col p-6 sm:p-12">
        <header className="flex items-center justify-between">
          <Link href="/" className="lg:hidden flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-hero">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v20M2 12h20" strokeLinecap="round" /></svg>
            </span>
            <span className="font-display text-xl tracking-tight">JREDD+</span>
          </Link>
          <Link href="/" className="ml-auto text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 transition-colors">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Voltar ao site
          </Link>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="m-auto w-full max-w-md py-12"
        >
          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-3 font-mono">
            <span className="text-leaf">●</span> {mode === "signin" ? "Acesso à plataforma" : "Novo cadastro"}
          </div>
          <h2 className="font-display text-4xl sm:text-5xl tracking-[-0.02em] leading-[1.02]">
            {mode === "signin" ? <>Entrar na sua <span className="text-gradient italic">conta</span></> : <>Criar conta de <span className="text-gradient italic">proponente</span></>}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            {mode === "signin" ? "Use seu e-mail institucional ou um dos provedores oficiais." : "Após o cadastro você terá acesso à submissão guiada e ao painel da sua organização."}
          </p>

          <div className="my-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <div className="h-px flex-1 bg-border" />
            ou com e-mail
            <div className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={handle} className="space-y-4">
            {mode === "signup" && (
              <Field label="Razão social">
                <Input className="auth-input" placeholder="Instituto Verde Tocantins" required />
              </Field>
            )}
            <Field label="E-mail">
              <Input type="email" className="auth-input" placeholder="voce@instituicao.org.br" required />
            </Field>
            <Field label="Senha" hint={mode === "signin" ? <button type="button" className="text-xs text-primary hover:underline">Esqueci minha senha</button> : undefined}>
              <Input type="password" className="auth-input" placeholder="••••••••" required minLength={8} />
            </Field>

            {mode === "signup" && (
              <label className="flex items-start gap-2.5 text-xs text-muted-foreground pt-1">
                <input type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-border accent-leaf" />
                <span>Li e concordo com os <a href="#" className="text-foreground underline">Termos de Uso</a> e a <a href="#" className="text-foreground underline">Política LGPD</a> do Programa JREDD+.</span>
              </label>
            )}
            <Button
              loading={loading}
              text={mode === "signin" ? "Entrar" : "Criar conta"}
            />
          </form>

          <p className="mt-8 text-sm text-center text-muted-foreground">
            {mode === "signin" ? "Ainda não tem conta?" : "Já possui acesso?"}{" "}
            <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="text-foreground font-medium hover:text-primary transition-colors">
              {mode === "signin" ? "Cadastre sua organização" : "Entrar"}
            </button>
          </p>
        </motion.div>

        <footer className="text-[10px] text-muted-foreground font-mono uppercase tracking-[0.2em] text-center">
          Conexão segura · TLS 1.3 · LGPD compliant
        </footer>
      </main>
    </div>
  );
}