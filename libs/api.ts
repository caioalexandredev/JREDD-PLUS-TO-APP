"use client";

export type Profile = "PROPONENTE" | "ADMINISTRADOR" | "AVALIADOR" | "AUDITOR";

export type User = {
  id: number;
  nome: string;
  email: string;
  profile: Profile;
};

type ApiOptions = RequestInit & {
  skipUnauthorizedRedirect?: boolean;
};

const API_URL = (process.env.NEXT_PUBLIC_API_URL?.trim() || "http://localhost:8282").replace(/\/$/, "");
const TOKEN_KEY = "jredd_token";
const USER_KEY = "jredd_user";
const PROFILE_KEY = "jredd_profile";
const SESSION_MAX_AGE = 60 * 60 * 5;

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function saveSession(token: string, user: User) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  document.cookie = `${TOKEN_KEY}=${encodeURIComponent(token)}; path=/; max-age=${SESSION_MAX_AGE}; SameSite=Lax`;
  document.cookie = `${PROFILE_KEY}=${encodeURIComponent(user.profile)}; path=/; max-age=${SESSION_MAX_AGE}; SameSite=Lax`;
}

export function clearSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0; SameSite=Lax`;
  document.cookie = `${PROFILE_KEY}=; path=/; max-age=0; SameSite=Lax`;
}

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function routeForProfile(profile: Profile) {
  if (profile === "ADMINISTRADOR") return "/admin";
  if (profile === "AVALIADOR") return "/avaliador?status=EM_AVALIACAO";
  if (profile === "AUDITOR") return "/auditor";
  return "/painel";
}

export async function api<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const { skipUnauthorizedRedirect, ...requestOptions } = options;
  const token = getToken();
  const headers = new Headers(requestOptions.headers);
  if (!headers.has("Content-Type") && !(requestOptions.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${path}`, { ...requestOptions, headers });
  if ((response.status === 401 || response.status === 403) && !skipUnauthorizedRedirect) {
    if (response.status === 401) {
      clearSession();
    }
    redirectUnauthorized(response.status === 401 ? "session" : "role");
    throw new Error("Acesso nao autorizado.");
  }
  console.log(response);
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Nao foi possivel concluir a operacao.");
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export async function login(email: string, password: string) {
  const auth = await api<{ token: string }>("/auth", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    skipUnauthorizedRedirect: true,
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

function redirectUnauthorized(reason: "session" | "role") {
  if (typeof window === "undefined") return;
  if (window.location.pathname === "/acesso-nao-autorizado") return;
  window.location.assign(`/acesso-nao-autorizado?reason=${reason}`);
}
