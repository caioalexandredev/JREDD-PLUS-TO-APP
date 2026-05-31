"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { clearSession } from "@/libs/api";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    clearSession();
    router.replace("/");
  }, [router]);

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center">
        <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground font-mono">Encerrando sessao</div>
        <h1 className="mt-3 font-display text-4xl">Saindo com seguranca</h1>
        <p className="mt-3 text-sm text-muted-foreground">Limpando seus dados de acesso neste navegador.</p>
      </div>
    </main>
  );
}
