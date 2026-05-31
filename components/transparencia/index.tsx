"use client";

import Navbar from "../home/navbar";
import TransparenciaHero from "./TransparenciaHero";
import TransparenciaKPIs from "./TransparenciaKPIs";
import TransparenciaMapaAlocacao from "./TransparenciaMapaAlocacao";
import TransparenciaFinanceiro from "./TransparenciaFinanceiro";
import ProjetosRegiao from "./ProjetosRegiao";
import RegistroPublico from "./RegistroPublico";

export default function Transparencia() {
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <TransparenciaHero />

      <TransparenciaKPIs />

      <TransparenciaMapaAlocacao />

      <TransparenciaFinanceiro />

      <ProjetosRegiao />

      <RegistroPublico />

      <footer />
    </div>
  );
}