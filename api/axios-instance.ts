import Axios, { AxiosError, AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

export const axiosInstance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8282",
  headers: { "Content-Type": "application/json" },
  timeout: 15_000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      Cookies.remove("auth_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const customAxiosInstance = <T>(
  config: AxiosRequestConfig
): Promise<T> => {
  return axiosInstance(config).then((res) => res.data);
};