import { AxiosError } from "axios";
import { commerceClient } from "../../../Interceptors/apiClient";

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL_COMMERCE}`;

type MetricsParams = {
  uuid: number | string | null;
  timeFrame?: string;
  startDate?: string;
  endDate?: string;
};

const fetchMetrics = async (endpoint: string, params: MetricsParams, errorMessage: string) => {
  try {
    const response = await commerceClient.post(`${API_BASE_URL}/${endpoint}`, params);
    return response.data.data || {};
  } catch (error: any) {
    let message = errorMessage;
    if (error instanceof AxiosError && error.response) {
      message = error.response.data?.message || message;
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

export const getPointsGainedAndLostTrend = (params: MetricsParams) =>
  fetchMetrics("metrics/points-gained-lost-trend", params, "Error al obtener la tendencia de puntos ganados y perdidos.");