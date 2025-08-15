import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL_COMMERCE = import.meta.env.VITE_API_BASE_URL_COMMERCE;

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

const onTokenRefreshed = (newToken: string) => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

const addSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

const refreshAccessToken = async (baseURL: string, role: string) => {
  const refreshTokenKey = role === "branch_manager" ? "branch_manager_refresh_token" : "commerce_refresh_token";
  const accessTokenKey = role === "branch_manager" ? "branch_manager_access_token" : "commerce_access_token";
  const refreshToken = Cookies.get(refreshTokenKey);

  if (!refreshToken) {
    console.error(`No se encontró el ${refreshTokenKey}. Es necesario iniciar sesión nuevamente.`);
    throw new Error("Refresh token no encontrado");
  }

  try {
    const response = await axios.post(`${baseURL}/refresh-token`, {
      refresh_token: refreshToken,
    });

    const { access_token } = response.data;
    Cookies.set(accessTokenKey, access_token, { expires: 7 });
    onTokenRefreshed(access_token);

    return access_token;
  } catch (error) {
    console.error("Error al renovar el token:", error);
    throw error;
  }
};

// Crear cliente con interceptores
const createApiClient = (baseURL: string) => {
  const apiClient = axios.create({
    baseURL,
  });

  // Interceptor de solicitudes
  apiClient.interceptors.request.use(
    (config) => {
      const userRole = Cookies.get("user_role");
      const tokenKey = userRole === "3" ? "branch_manager_access_token" : "commerce_access_token";
      const token = Cookies.get(tokenKey);

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Interceptor de respuestas
  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      const userRole = Cookies.get("user_role");
      const role = userRole === "3" ? "branch_manager" : "commerce";

      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        if (!isRefreshing) {
          isRefreshing = true;

          try {
            const newAccessToken = await refreshAccessToken(baseURL, role);
            isRefreshing = false;

            originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

            return apiClient(originalRequest);
          } catch (refreshError) {
            isRefreshing = false;
            console.error("Error crítico: no se pudo renovar el token.", refreshError);

            // Limpiar cookies según el rol
            clearCookies(role);
            window.location.href = "/";

            return Promise.reject(refreshError);
          }
        } else {
          return new Promise((resolve) => {
            addSubscriber((newToken) => {
              originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
              resolve(apiClient(originalRequest));
            });
          });
        }
      }

      return Promise.reject(error);
    }
  );

  return apiClient;
};

// Cliente configurado para commerce
export const commerceClient = createApiClient(API_BASE_URL_COMMERCE);

// Limpiar cookies según el rol
export const clearCookies = (role: string = "commerce") => {
  if (role === "branch_manager") {
    Cookies.remove("branch_manager_access_token");
    Cookies.remove("branch_manager_refresh_token");
  } else {
    Cookies.remove("commerce_access_token");
    Cookies.remove("commerce_refresh_token");
  }
  console.log(`Cookies para ${role} han sido limpiadas.`);
};