import FooterBottom from "./FooterBottom";
import FooterBrand from "./FooterBrand";
import FooterCol from "./FooterCol";

export default function Rodape() {
    return (
        
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid md:grid-cols-12 gap-10">
          <FooterBrand />
          <FooterCol title="Plataforma" links={["Editais", "Submissão", "Avaliação", "Gestão", "Transparência"]} />
          <FooterCol title="Institucional" links={["Sobre o REDD+", "Marco legal", "LGPD", "Acessibilidade", "Contato"]} />
        </div>
        <FooterBottom />
      </div>
    </footer>
  );
}