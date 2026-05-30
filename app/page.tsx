import Hero from "@/components/home/hero";
import Modules from "@/components/home/modules";
import Navbar from "@/components/home/navbar";
import Simulador from "@/components/home/simulador";

export default function Page() {
  return <>
    <Navbar />
    <main>
      <Hero />
      <Modules />
      <Simulador />
    </main>
  </>
}