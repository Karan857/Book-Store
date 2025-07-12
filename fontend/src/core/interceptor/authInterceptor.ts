import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";

export const setupAuthInterceptor = (api: AxiosInstance) => {
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem("token");
      if (token && config.headers) {
        // สำหรับ axios v1+ การตั้ง header ต้องใช้ .set()
        config.headers.set("Authorization", `Bearer ${token}`);
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};
