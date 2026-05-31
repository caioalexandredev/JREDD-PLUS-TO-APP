import { create } from "zustand";
import { devtools } from "zustand/middleware";
import Cookies from "js-cookie";
import { UserResponseDTO } from "@/api/generated/portalDeEditaisAPI.schemas";

interface AuthState {
  user: UserResponseDTO | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setSession: (token: string, user: UserResponseDTO) => void;
  setUser: (user: UserResponseDTO) => void;
  clearSession: () => void;
  hydrateFromCookie: () => void;
}

const TOKEN_KEY = "auth_token";
const COOKIE_OPTIONS = {
  expires: 7,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
};

export const useAuthStore = create<AuthState>()(
  devtools(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: true,

      setSession: (token, user) => {
        Cookies.set(TOKEN_KEY, token, COOKIE_OPTIONS);
        set({ token, user, isAuthenticated: true, isLoading: false });
      },

      setUser: (user) => set({ user }),

      clearSession: () => {
        Cookies.remove(TOKEN_KEY);
        set({ token: null, user: null, isAuthenticated: false, isLoading: false });
      },

      hydrateFromCookie: () => {
        const token = Cookies.get(TOKEN_KEY) ?? null;
        set({ token, isAuthenticated: !!token, isLoading: false });
      },
    }),
    { name: "auth-store" }
  )
);