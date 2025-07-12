// src/api/axios.ts
import axios from "axios";
import { setupAuthInterceptor, setupErrorInterceptor } from "./interceptor/index";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

// เรียกใช้ interceptor
setupAuthInterceptor(api);
setupErrorInterceptor(api);

export default api;
