import Submeter from "@/components/submeter/Submeter";
import { Suspense } from "react";


export default function Page() {
  return <Suspense
    fallback={
      <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">
        Carregando ambiente de submissão...
      </div>
    }
  >
    <Submeter />
  </Suspense>
}