import axios, {
  InternalAxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";

import { getCacheRequestData, handleCacheResponse } from "./cache";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api",
  // timeout: 2000,
});

function handleRequestAuthToken(config: InternalAxiosRequestConfig<any>) {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
}

api.interceptors.request.use((config) => {
  if (!config.headers) config.headers = {} as AxiosRequestHeaders;
  handleRequestAuthToken(config);
  const response = getCacheRequestData(config);

  if (response) {
    config.adapter = () => {
      return new Promise((resolve) => {
        resolve({ ...response, config });
      });
    };
  }
  return config;
});

api.interceptors.response.use(
  (config) => {
    handleCacheResponse(config);
    // return config;
    return {
      ...config,
      data: config.data,
    } as AxiosResponse;
  },
  (error) => {
    if (error.response && error.response.status == 401) {
      // clearCache(false);
      localStorage.removeItem("token");
    }

    return Promise.reject(error);
  }
);

export { api };
