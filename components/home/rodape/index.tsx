import FooterBottom from "./FooterBottom";
import FooterBrand from "./FooterBrand";
import FooterCol from "./FooterCol";

export default function Rodape() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid md:grid-cols-12 gap-10">
          <FooterBrand />
          
          <FooterCol 
            title="Plataforma" 
            links={[
              { label: "Editais", href: "/editais" },
              { label: "Submissão", href: "/submissao" },
              { label: "Avaliação", href: "/avaliacao" },
              { label: "Gestão", href: "/gestao" },
              { label: "Transparência", href: "/transparencia" }
            ]} 
          />
          
          <FooterCol 
            title="Institucional" 
            links={[
              { label: "Sobre o REDD+", href: "/sobre" },
              { label: "Marco legal", href: "/marco-legal" },
              { label: "LGPD", href: "/lgpd" },
              { label: "Acessibilidade", href: "/acessibilidade" },
              { label: "Contato", href: "/contato" }
            ]} 
          />
        </div>
        <FooterBottom />
      </div>
    </footer>
  );
}