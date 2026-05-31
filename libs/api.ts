"use client";

export type Profile = "PROPONENTE" | "ADMINISTRADOR" | "AVALIADOR" | "AUDITOR";

export type User = {
  id: number;
  nome: string;
  email: string;
  profile: Profile;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8282";
const TOKEN_KEY = "jredd_token";
const USER_KEY = "jredd_user";

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function saveSession(token: string, user: User) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function routeForProfile(profile: Profile) {
  if (profile === "ADMINISTRADOR") return "/admin";
  if (profile === "AVALIADOR") return "/avaliador";
  if (profile === "AUDITOR") return "/auditor";
  return "/painel";
}

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers = new Headers(options.headers);
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Não foi possível concluir a operação.");
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export async function login(email: string, password: string) {
  const auth = await api<{ token: string }>("/auth", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  const user = await api<User>("/users/my", {
    headers: { Authorization: `Bearer ${auth.token}` },
  });
  saveSession(auth.token, user);
  return user;
}

export async function uploadDocumento(file: File, contexto: "EDITAL" | "EVIDENCIA") {
  const form = new FormData();
  form.append("arquivo", file);
  return api<{ id: string; nomeOriginal: string }>(`/documentos?contexto=${contexto}`, {
    method: "POST",
    body: form,
  });
}
