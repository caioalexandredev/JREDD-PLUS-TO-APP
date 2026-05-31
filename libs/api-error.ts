import { AxiosError } from "axios";

interface ValidationError {
  name: string;
  message: string;
}

export function resolveApiError(error: unknown): string {
  if (!(error instanceof AxiosError)) return "Ocorreu um erro inesperado.";

  const data = error.response?.data;

  if (Array.isArray(data)) {
    return data
      .filter((e): e is ValidationError => !!e?.message)
      .map((e) => e.message)
      .join(" • ");
  }

  if (typeof data === "string" && data.length > 0) return data;

  if (typeof data?.message === "string") return data.message;

  return `Erro ${error.response?.status ?? "desconhecido"}.`;
}