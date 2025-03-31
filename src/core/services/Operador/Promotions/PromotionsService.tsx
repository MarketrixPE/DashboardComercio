import { AxiosError } from "axios";
import { commerceClient } from "../../../Interceptors/apiClient";
import {
  NearbyCustumersResponse,
  Promotion,
  SegmentedResponse,
} from "./Promotions";

const API_URL = `${import.meta.env.VITE_API_BASE_URL_COMMERCE}/promotions`;

export const getPromotionsByBranch = async (
  branchId: string
): Promise<Promotion[]> => {
  try {
    const response = await commerceClient.post(`${API_URL}/branch`, {
      branch_id: branchId,
    });

    const promotions = (response.data.data || []).map((item: any) => ({
      id: item.id,
      titulo: item.title || "",
      descripcion: item.description || "",
      imagen: item.imagen || "",
      branch_id: branchId,
      created_at: item.fecha_creacion || "",
      updated_at: item.updated_at || "",
    }));

    return promotions;
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.warn("No hay promociones disponibles.");
      return [];
    } else {
      const errorMessage =
        error.response?.data?.message || "Error al obtener las promociones.";
      console.error("Error en el servicio de promociones:", errorMessage);
      throw new Error(errorMessage);
    }
  }
};

export const getPromotionById = async (
  id: number
): Promise<{ data: Promotion }> => {
  try {
    const response = await commerceClient.post(`${API_URL}/show`, {
      id: id,
    });
    if (response.data.success || response.data.status === "success") {
      return response.data;
    }
    throw new Error("No se encontró la promoción solicitada.");
  } catch (error: any) {
    let errorMessage = "Error al obtener la promoción.";
    if (error instanceof AxiosError && error.response) {
      errorMessage = error.response.data?.message || errorMessage;
    }
    console.error("Error en el servicio de obtener promoción:", errorMessage);
    throw new Error(errorMessage);
  }
};

export const createPromotion = async (formData: FormData): Promise<any> => {
  try {
    const response = await commerceClient.post(`${API_URL}/create`, formData);
    return response.data;
  } catch (error: any) {
    let errorMessage = "Error al crear la promoción.";

    if (error.response && error.response.data) {
      if (error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (typeof error.response.data === "string") {
        errorMessage = error.response.data;
      } else if (error.response.data.error) {
        errorMessage =
          typeof error.response.data.error === "string"
            ? error.response.data.error
            : JSON.stringify(error.response.data.error);
      }
      if (error.response.data.errors) {
        const validationErrors = Array.isArray(error.response.data.errors)
          ? error.response.data.errors.join(", ")
          : JSON.stringify(error.response.data.errors);

        errorMessage = `${errorMessage} Detalles: ${validationErrors}`;
      }
    }
    console.error("Error completo:", error.response?.data);
    console.error(
      "Error en el servicio de creación de promoción:",
      errorMessage
    );

    throw new Error(errorMessage);
  }
};

export const getNearbyCustumers = async (
  latitud: number | string,
  longitud: number | string
): Promise<NearbyCustumersResponse> => {
  try {
    const formData = new FormData();
    formData.append("latitud", latitud.toString());
    formData.append("longitud", longitud.toString());

    const response = await commerceClient.post(
      `${API_URL}/notification/preview`,
      formData
    );
    return response.data;
  } catch (error: any) {
    let errorMessage = "Error al obtener usuarios cercanos.";
    if (error instanceof AxiosError && error.response) {
      errorMessage = error.response.data?.message || errorMessage;
    }
    console.error("Error en el servicio de usuarios cercanos:", errorMessage);
    throw new Error(errorMessage);
  }
};

export const sendPromotion = async (
  latitud: number | string,
  longitud: number | string,
  promotionId: number
): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append("latitud", latitud.toString());
    formData.append("longitud", longitud.toString());
    formData.append("promotion_id", promotionId.toString());

    const response = await commerceClient.post(
      `${API_URL}/notification/sentUsersPromotion`,
      formData
    );
    return response.data;
  } catch (error: any) {
    let errorMessage = "Error al enviar la promoción.";
    if (error instanceof AxiosError && error.response) {
      errorMessage = error.response.data?.message || errorMessage;
    }
    console.error("Error en el servicio de envío de promoción:", errorMessage);
    throw new Error(errorMessage);
  }
};

export const getSegmentedNearbyCustumers = async (segmentData: {
  age_start: number | null | string;
  age_end: number | null | string;
  gender: string | null;
  district: string | null;
}): Promise<SegmentedResponse> => {
  try {
    console.log("Enviando datos a la API:", segmentData);
    const response = await commerceClient.post(
      `${API_URL}/segment/details`,
      segmentData
    );
    console.log("Respuesta de la API:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error completo:", error.response?.data);
    let errorMessage = "Error al obtener usuarios segmentados.";
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }
    throw new Error(errorMessage);
  }
};

export const sendSegmentedPromotion = async (segmentData: {
  age_start: number | null;
  age_end: number | null;
  gender: string | null;
  district: string | null;
  promotion_id: number;
}): Promise<any> => {
  try {
    const response = await commerceClient.post(
      `${API_URL}/segment/submit`,
      segmentData
    );
    return response.data;
  } catch (error: any) {
    let errorMessage = "Error al enviar la promoción segmentada.";
    if (error instanceof AxiosError && error.response) {
      errorMessage = error.response.data?.message || errorMessage;
    }
    console.error(
      "Error en el servicio de envío de promoción segmentada:",
      errorMessage
    );
    throw new Error(errorMessage);
  }
};
