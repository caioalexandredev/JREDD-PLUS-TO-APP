"use client";

import ModuleCard from "./ModuleCard";
import { ModuleHeader } from "./ModuleHeader";

export default function Modules() {
  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <ModuleHeader />
        <ModuleCard />
      </div>
    </section>
  );
}