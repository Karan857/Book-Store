// src/api/interceptors/error.interceptor.ts
import  type{ AxiosInstance } from "axios";

export const setupErrorInterceptor = (api: AxiosInstance) => {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        // ตัวอย่าง: redirect ถ้า unauthorized
        if (error.response.status === 401) {
          window.location.href = "/login";
        }
        // แสดง error message จาก server
        alert(error.response.data.message || "Something went wrong!");
      }
      return Promise.reject(error);
    }
  );
};
