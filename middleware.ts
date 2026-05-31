import { NextRequest, NextResponse } from "next/server";

type Profile = "PROPONENTE" | "ADMINISTRADOR" | "AVALIADOR" | "AUDITOR";

const TOKEN_COOKIE = "jredd_token";
const PROFILE_COOKIE = "jredd_profile";

const publicRoutes = [
  "/",
  "/auth",
  "/editais",
  "/transparencia",
  "/lgpd",
  "/privacidade",
  "/logout",
  "/acesso-nao-autorizado",
];

const protectedRoutes: Array<{ prefix: string; profiles: Profile[] }> = [
  { prefix: "/admin", profiles: ["ADMINISTRADOR"] },
  { prefix: "/evaluation", profiles: ["ADMINISTRADOR"] },
  { prefix: "/painel", profiles: ["PROPONENTE"] },
  { prefix: "/submeter", profiles: ["PROPONENTE"] },
  { prefix: "/avaliador", profiles: ["AVALIADOR"] },
  { prefix: "/auditor", profiles: ["AUDITOR"] },
];

const apiRoutePrefixes = [
  "/admin/editais",
  "/avaliador/editais",
  "/avaliador/projetos",
  "/auditor/projetos",
  "/auditor/evidencias",
  "/proponente/projetos",
  "/users",
  "/documentos",
  "/frentes-atuacao",
  "/regioes-imediatas",
  "/orgaos-proponentes",
  "/natureza-juridicas",
  "/municipios",
  "/projetos",
];

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (isStaticAsset(pathname) || isPublicRoute(pathname) || isApiRoute(pathname) || isApiLikeRequest(request)) {
    return NextResponse.next();
  }

  const rule = protectedRoutes.find((route) => matchesPrefix(pathname, route.prefix));
  if (!rule) {
    return NextResponse.next();
  }

  const token = request.cookies.get(TOKEN_COOKIE)?.value;
  const profile = resolveProfile(request, token);

  if (!token || !profile) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/auth";
    loginUrl.search = "";
    loginUrl.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  if (!rule.profiles.includes(profile)) {
    const unauthorizedUrl = request.nextUrl.clone();
    unauthorizedUrl.pathname = "/acesso-nao-autorizado";
    unauthorizedUrl.search = "";
    unauthorizedUrl.searchParams.set("reason", "role");
    return NextResponse.redirect(unauthorizedUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

function isPublicRoute(pathname: string) {
  return publicRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

function matchesPrefix(pathname: string, prefix: string) {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

function isStaticAsset(pathname: string) {
  return /\.[a-zA-Z0-9]+$/.test(pathname);
}

function isApiRoute(pathname: string) {
  return apiRoutePrefixes.some((prefix) => matchesPrefix(pathname, prefix));
}

function isApiLikeRequest(request: NextRequest) {
  const accept = request.headers.get("accept") ?? "";
  const contentType = request.headers.get("content-type") ?? "";
  const destination = request.headers.get("sec-fetch-dest") ?? "";
  return (
    accept.includes("application/json") ||
    contentType.includes("application/json") ||
    contentType.includes("multipart/form-data") ||
    destination === "empty"
  );
}

function resolveProfile(request: NextRequest, token?: string): Profile | undefined {
  const cookieProfile = request.cookies.get(PROFILE_COOKIE)?.value as Profile | undefined;
  if (isProfile(cookieProfile)) {
    return cookieProfile;
  }
  return getProfileFromToken(token);
}

function getProfileFromToken(token?: string): Profile | undefined {
  if (!token) return undefined;
  try {
    const payload = token.split(".")[1];
    if (!payload) return undefined;
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = JSON.parse(atob(normalized)) as { profile?: string };
    return isProfile(decoded.profile) ? decoded.profile : undefined;
  } catch {
    return undefined;
  }
}

function isProfile(value: unknown): value is Profile {
  return value === "PROPONENTE" || value === "ADMINISTRADOR" || value === "AVALIADOR" || value === "AUDITOR";
}
