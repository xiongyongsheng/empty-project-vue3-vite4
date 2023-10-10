import HttpRequest from "./index.js";
import { useUserStore } from "@/pinia/user";

class ApiRequest extends HttpRequest {
  constructor(options = {}) {
    super({
      baseURL: import.meta.env.VITE_API_URL,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      ...options,
    });
    this.useInterceptors();
  }
  useInterceptors() {
    this.instance.interceptors.request.use(
      (config) => {
        this.user = useUserStore();
        if (this.user.token) {
          config.headers.token = this.user.token;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    this.instance.interceptors.response.use(
      (response) => {
        this.user = useUserStore();
        const dataAxios = response.data;
        const { code, message, data } = dataAxios;
        switch (code) {
          case 1:
            return Promise.resolve(data);
          case 313: // 对于需要登录的网页，服务器可能返回此响应
          case 314: // 需要重新登录，服务器可能返回此响应
            this.user.token = null;
          default:
            return Promise.reject(dataAxios);
        }
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
}

export default ApiRequest;
