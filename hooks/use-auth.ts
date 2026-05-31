"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAuthStore } from "@/stores/auth.store";

import { useLogin } from "@/api/generated/autenticação/autenticação";
import {
  useCreate,
  getLoggedInUser,
  getGetLoggedInUserQueryKey,
} from "@/api/generated/usuários/usuários";
import { resolveApiError } from "@/libs/api-error";

export function useAuth(callbacks?: { onSignupSuccess?: () => void }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setSession, clearSession, isAuthenticated, user } = useAuthStore();

  const { mutate: loginMutate, isPending: isLoggingIn } = useLogin({
    mutation: {
      onSuccess: async (token) => {
        try {
          const me = await getLoggedInUser();
          setSession(token, me);

          queryClient.setQueryData(getGetLoggedInUserQueryKey(), me);

          toast.success("Login realizado!", { description: "Redirecionando..." });
          router.push("/dashboard");
        } catch {
          toast.error("Não foi possível carregar seu perfil.");
        }
      },
      onError: (error) => {
        toast.error("Credenciais inválidas", {
          description: resolveApiError(error),
        });
      },
    },
  });

  const { mutate: signupMutate, isPending: isSigningUp } = useCreate({
    mutation: {
      onSuccess: () => {
        toast.success("Conta criada!", {
          description: "Faça login para continuar.",
        });
        callbacks?.onSignupSuccess?.();
      },
      onError: (error) => {
        toast.error("Erro ao criar conta", {
          description: resolveApiError(error),
        });
      },
    },
  });

  const logout = () => {
    clearSession();
    queryClient.clear();
    router.push("/login");
    toast.info("Sessão encerrada.");
  };

  return {
    login: (data: { email: string; password: string }) => loginMutate({ data }),
    signup: (data: Parameters<typeof signupMutate>[0]["data"]) => signupMutate({ data }),
    logout,
    isAuthenticated,
    user,
    isLoggingIn,
    isSigningUp,
  };
}