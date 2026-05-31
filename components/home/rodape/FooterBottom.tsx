import info from "@/config/app.info";

export default function FooterBottom() {
    return (
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-xs text-muted-foreground font-mono">
            © 2026 Governo do Estado do Tocantins · Programa {info.name}
          </div>
          <div className="text-xs text-muted-foreground">
            Tecnologia para uma Gestão Ambiental Acessível, Eficiente e Orientada por Dados
          </div>
        </div>
    )
}