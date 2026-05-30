import Hero from "@/components/home/hero";
import Modules from "@/components/home/modules";
import Navbar from "@/components/home/navbar";

export default function Page() {
  return <>
    <Navbar />
    <main>
      <Hero />
      <Modules />
    </main>
  </>
}