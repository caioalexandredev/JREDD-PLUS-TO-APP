"use client";

import { SubmitEventHandler, useState } from "react";
import { motion } from "motion/react";
import Field from "@/libs/fields/Field";
import { Input } from "@/libs/fields/Input";
import Button from "@/libs/button/Button";
import AsideLoginCadastro from "./AsideLoginCadastro";
import HeaderLoginCadastro from "./HeaderLoginCadastro";
import { toast } from "sonner";
import { api, login, routeForProfile } from "@/libs/api";
import { useRouter } from "next/navigation";
import info from "@/config/app.info";

export default function LoginCadastro() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handle: SubmitEventHandler<HTMLFormElement> = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      if (mode === "signin") {
        const form = new FormData(e.currentTarget);
        const user = await login(String(form.get("email")), String(form.get("password")));
        toast.success("Login realizado com sucesso!", {
          description: "Redirecionando para o seu painel...",
        });
        router.push(routeForProfile(user.profile));
      } else {
        const form = new FormData(e.currentTarget);
        await api("/users", {
          method: "POST",
          body: JSON.stringify({
            nome: String(form.get("nome")),
            email: String(form.get("email")),
            password: String(form.get("password")),
          }),
        });
        toast.success("Conta criada com sucesso!", {
          description: "Sua conta foi criada com sucesso. Realize o login!",
        });
        setMode("signin");
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";

      toast.error("Não foi possível autenticar.", {
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <AsideLoginCadastro />

      <main className="relative flex flex-col p-6 sm:p-12">
        <HeaderLoginCadastro />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="m-auto w-full max-w-md py-12"
        >
          <motion.div layout className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-3 font-mono">
            <span className="text-leaf">●</span> {mode === "signin" ? "Acesso à plataforma" : "Novo cadastro"}
          </motion.div>

          <motion.h2 layout className="font-display text-4xl sm:text-5xl tracking-[-0.02em] leading-[1.02]">
            {mode === "signin" ? <>Entrar na sua <span className="text-gradient italic">conta</span></> : <>Criar conta de <span className="text-gradient italic">proponente</span></>}
          </motion.h2>

          <motion.p layout className="mt-3 text-sm text-muted-foreground">
            {mode === "signin" ? "Use seu e-mail institucional ou um dos provedores oficiais." : "Após o cadastro você terá acesso à submissão guiada e ao painel da sua organização."}
          </motion.p>

          <motion.div layout className="my-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <div className="h-px flex-1 bg-border" />
            Área de Login
            <div className="h-px flex-1 bg-border" />
          </motion.div>

          <form onSubmit={handle} className="space-y-4">
            {mode === "signup" && (
              <Field label="Nome Completo">
                <Input name="nome" className="auth-input" placeholder="Nome Sobrenome" required />
              </Field>
            )}

            <Field label="E-mail">
              <Input name="email" type="email" className="auth-input" placeholder="voce@instituicao.org.br" required />
            </Field>
            <Field label="Senha" hint={mode === "signin" ? <button type="button" className="text-xs text-primary hover:underline">Esqueci minha senha</button> : undefined}>
              <Input name="password" type="password" className="auth-input" placeholder="••••••••" required minLength={mode === "signin" ? 3 : 8} />
            </Field>

            {mode === "signup" && (
              <label className="flex items-start gap-2.5 text-xs text-muted-foreground pt-1">
                <input type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-border accent-leaf" />
                <span>Li e concordo com os <a href="#" className="text-foreground underline">Termos de Uso</a> e a <a href="#" className="text-foreground underline">Política LGPD</a> do Programa {info.name}.</span>
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
              {mode === "signin" ? "Cadastre-se na plataforma" : "Entrar"}
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
