import axios from "axios";

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

const refreshAccessToken = async (baseURL: string) => {
  const refreshToken = localStorage.getItem("commerce_refresh_token");

  if (!refreshToken) {
    console.error(
      "No se encontró el refresh_token para commerce. Es necesario iniciar sesión nuevamente."
    );
    throw new Error("Refresh token no encontrado");
  }

  try {
    const response = await axios.post(`${baseURL}/refresh-token`, {
      refresh_token: refreshToken,
    });

    const { access_token } = response.data;
    localStorage.setItem("commerce_access_token", access_token);
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
      const token = localStorage.getItem("commerce_access_token");

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

      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        if (!isRefreshing) {
          isRefreshing = true;

          try {
            const newAccessToken = await refreshAccessToken(baseURL);
            isRefreshing = false;

            originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

            return apiClient(originalRequest);
          } catch (refreshError) {
            isRefreshing = false;
            console.error("Error crítico: no se pudo renovar el token.", refreshError);

            // Limpiar almacenamiento y redirigir
            localStorage.removeItem("commerce_access_token");
            localStorage.removeItem("commerce_refresh_token");
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

export const clearLocalStorage = () => {
  localStorage.clear();
  console.log("LocalStorage ha sido limpiado.");
};