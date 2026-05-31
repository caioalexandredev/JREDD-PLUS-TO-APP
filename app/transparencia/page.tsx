import Navbar from "@/components/home/navbar";
import Rodape from "@/components/home/rodape";
import Transparencia from "@/components/home/transparencia";

export default function TransparenciaPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <Transparencia />
      </main>
      <Rodape />
    </div>
  );
}
