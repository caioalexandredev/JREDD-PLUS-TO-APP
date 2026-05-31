import { Suspense } from "react";
import UnauthorizedContent from "./UnauthorizedContent";

export default function AcessoNaoAutorizadoPage() {
  return (
    <main className="min-h-screen bg-gradient-soft px-6 py-10 flex items-center justify-center">
      <Suspense fallback={null}>
        <UnauthorizedContent />
      </Suspense>
    </main>
  );
}
