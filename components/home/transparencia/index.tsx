"use client";

import TransparenciaHeader from "./TransparenciaHeader";
import TransparenciaGrid from "./TransparenciaGrid";
import TransparenciaMaopVisulization from "./TransparenciaMapVisulization";
import TransparenciaCaption from "./TransparenciaCaption";

export default function Transparencia() {
  return (
    <section className="relative py-32 px-6 bg-foreground text-background overflow-hidden">
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-ocean/30 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-leaf/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <TransparenciaHeader />
        <TransparenciaGrid />

        <div className="mt-16 grid lg:grid-cols-3 gap-6">

        <TransparenciaMaopVisulization />
        <TransparenciaCaption />

        </div>
      </div>
    </section>
  )
}