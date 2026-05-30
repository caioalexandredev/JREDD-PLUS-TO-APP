"use client";

import SimuladorCard from "./SimuladorCard";
import SimuladorText from "./SimuladorText";

export default function Simulador() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-[40rem] w-[40rem] rounded-full bg-gradient-mesh blur-3xl opacity-60 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
        <SimuladorText /> 
        <SimuladorCard />
      </div>
    </section>
  );
}