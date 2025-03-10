import { AxiosError } from "axios";
import { commerceClient } from "../../../Interceptors/apiClient";

const API_URL = `${import.meta.env.VITE_API_BASE_URL_COMMERCE}/metrics`;

type MetricsParams = {
  userId: number;
  timeFrame?: string;
  startDate?: string;
  endDate?: string;
};

export const getPointsMetrics = async (params: MetricsParams) => {
  try {
    const response = await commerceClient.post(`${API_URL}/points`, params);
    return response.data.data || {};
  } catch (error: any) {
    let errorMessage = "Error al obtener métricas de puntos.";
    if (error instanceof AxiosError && error.response) {
      errorMessage = error.response.data?.message || errorMessage;
    }
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const getCouponsMetrics = async (params: MetricsParams) => {
  try {
    const response = await commerceClient.post(`${API_URL}/coupons`, params);
    return response.data.data || {};
  } catch (error: any) {
    let errorMessage = "Error al obtener métricas de cupones.";
    if (error instanceof AxiosError && error.response) {
      errorMessage = error.response.data?.message || errorMessage;
    }
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const getPromotionsMetrics = async (params: MetricsParams) => {
  try {
    const response = await commerceClient.post(`${API_URL}/promotions`, params);
    return response.data.data || {};
  } catch (error: any) {
    let errorMessage = "Error al obtener métricas de promociones.";
    if (error instanceof AxiosError && error.response) {
      errorMessage = error.response.data?.message || errorMessage;
    }
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const getSurveysMetrics = async (params: MetricsParams) => {
  try {
    const response = await commerceClient.post(`${API_URL}/surveys`, params);
    return response.data.data || {};
  } catch (error: any) {
    let errorMessage = "Error al obtener métricas de encuestas.";
    if (error instanceof AxiosError && error.response) {
      errorMessage = error.response.data?.message || errorMessage;
    }
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const getMarketStudiesMetrics = async (params: MetricsParams) => {
  try {
    const response = await commerceClient.post(`${API_URL}/studies`, params);
    return response.data.data || {};
  } catch (error: any) {
    let errorMessage = "Error al obtener métricas de estudios.";
    if (error instanceof AxiosError && error.response) {
      errorMessage = error.response.data?.message || errorMessage;
    }
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const getMetricsTrend = async (params: MetricsParams) => {
  console.log("Parámetros enviados:", params);
  try {
    const response = await commerceClient.post(`${API_URL}/trend`, params);
    console.log("getMetricsTrend",response.data.data)
    return response.data.data || {};
  } catch (error: any) {
    let errorMessage = "Error al obtener la tendencia de métricas.";
    if (error instanceof AxiosError && error.response) {
      errorMessage = error.response.data?.message || errorMessage;
    }
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};
