import { Suspense } from "react";
import Avaliador from "@/components/avaliador";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Avaliador />
    </Suspense>
  );
}
