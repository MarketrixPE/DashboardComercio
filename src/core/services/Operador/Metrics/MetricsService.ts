import { AxiosError } from "axios";
import { commerceClient } from "../../../Interceptors/apiClient";

// Ajustar la base URL para que coincida con las rutas del backend
const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL_COMMERCE}`;

type MetricsParams = {
  uuid: number | string | null;
  timeFrame?: string;
  startDate?: string;
  endDate?: string;
};

// Función genérica para hacer peticiones
const fetchMetrics = async (endpoint: string, params: MetricsParams, errorMessage: string) => {
  try {
    const response = await commerceClient.post(`${API_BASE_URL}/${endpoint}`, params);
    return response.data.data || {};
  } catch (error: any) {
    let message = errorMessage;
    if (error instanceof AxiosError && error.response) {
      message = error.response.data?.message || message;
      // Incluir más detalles del error en los logs
      console.error(`Error en ${endpoint}:`, {
        message,
        status: error.response?.status,
        data: error.response?.data,
      });
    } else {
      console.error(message, error);
    }
    throw new Error(message);
  }
};

// Funciones específicas que usan la función genérica
export const getPointsMetrics = (params: MetricsParams) =>
  fetchMetrics("metrics/points", params, "Error al obtener métricas de puntos.");

export const getCouponsMetrics = (params: MetricsParams) =>
  fetchMetrics("metrics/coupons", params, "Error al obtener métricas de cupones.");

export const getPromotionsMetrics = (params: MetricsParams) =>
  fetchMetrics("metrics/promotions", params, "Error al obtener métricas de promociones.");

export const getSurveysMetrics = (params: MetricsParams) =>
  fetchMetrics("metrics/surveys", params, "Error al obtener métricas de encuestas.");

export const getMarketStudiesMetrics = (params: MetricsParams) =>
  fetchMetrics("metrics/studies", params, "Error al obtener métricas de estudios.");

export const getMetricsTrend = (params: MetricsParams) =>
  fetchMetrics("metrics/trend", params, "Error al obtener la tendencia de métricas.");