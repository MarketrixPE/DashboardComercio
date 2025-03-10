import { commerceClient } from "../../../Interceptors/apiClient";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_COMMERCE;

export const getCoupons = async () => {
  try {
    const response = await commerceClient.get(`${API_BASE_URL}/coupons`);
    return response.data.data;
  } catch (error: any) {
    console.error("Detalles del error al obtener los cupones:", error);
    console.error("Respuesta del servidor:", error.response);
    throw new Error(
      error.response?.data?.message || "Error al obtener los cupones."
    );
  }
};

export const createCoupon = async (formData: FormData) => {
  try {
    const response = await commerceClient.post(
      `${API_BASE_URL}/coupons/create`,
      formData
    );
    return response.data;
  } catch (error: any) {
    console.error("Error al crear el cupón:", error);
    throw new Error(
      error.response?.data?.message || "Error al crear el cupón."
    );
  }
};

export const getCouponsByProduct = async (productId: string) => {
  try {
    const response = await commerceClient.get(
      `${API_BASE_URL}/coupons/product/${productId}`
    );
    return response.data || [];
  } catch (error: any) {
    console.error("Error al obtener cupones por producto:", error);

    if (error.response?.status === 404) {
      return { data: [] };
    }

    throw new Error(
      error.response?.data?.message || "Error al obtener los cupones."
    );
  }
};


export const updateCoupon = async (couponId: string, formData: FormData) => {
  try {
    const response = await commerceClient.post(
      `${API_BASE_URL}/coupons/${couponId}/update`,
      formData
    );
    return response.data;
  } catch (error: any) {
    console.error(`Error al actualizar el cupón ${couponId}:`, error);
    throw new Error(
      error.response?.data?.message || "Error al actualizar el cupón."
    );
  }
};

export const getCouponDetails = async (couponId: string) => {
  try {
    const response = await commerceClient.get(
      `${API_BASE_URL}/coupons/show/${couponId}`
    );
    return response.data;
  } catch (error: any) {
    console.error(
      `Error al obtener los detalles del cupón ${couponId}:`,
      error
    );
    throw new Error(
      error.response?.data?.message ||
        "Error al obtener los detalles del cupón."
    );
  }
};

export const deleteCoupon = async (couponId: string) => {
  try {
    const response = await commerceClient.delete(
      `${API_BASE_URL}/coupons/${couponId}`
    );
    return response.data;
  } catch (error: any) {
    console.error(`Error al eliminar el cupón ${couponId}:`, error);
    throw new Error(
      error.response?.data?.message || "Error al eliminar el cupón."
    );
  }
};