import { defineConfig } from "orval";

export default defineConfig({
  portalEditais: {
    input: {
      target: "http://localhost:8282/v3/api-docs",
    },
    output: {
      mode: "tags-split",
      target: "api/generated",
      client: "react-query",
      baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8282",
      override: {
        mutator: {
          path: "api/axios-instance.ts",
          name: "customAxiosInstance",
        },
      },
    },
  },
});