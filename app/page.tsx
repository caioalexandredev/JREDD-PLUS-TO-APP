import Hero from "@/components/home/hero";
import Modules from "@/components/home/modules";
import Navbar from "@/components/home/navbar";
import Simulador from "@/components/home/simulador";
import Transparencia from "@/components/home/transparencia";

export default function Page() {
  return <>
    <Navbar />
    <main>
      <Hero />
      <Modules />
      <Simulador />
      <Transparencia /> 
    </main>
  </>
}