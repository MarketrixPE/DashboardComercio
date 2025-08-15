import { AxiosError } from "axios";
import { commerceClient } from "../../../Interceptors/apiClient";
import { Question, Survey } from "../../../models/surveys";

const API_URL = `${import.meta.env.VITE_API_BASE_URL_COMMERCE}/surveys`;

export const getSurveys = async (): Promise<Survey[]> => {
  try {
    const response = await commerceClient.get(API_URL);
    return response.data.data || [];
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.warn("No hay encuestas disponibles.");
      return [];
    } else {
      const errorMessage =
        error.response?.data?.message || "Error al obtener las encuestas.";
      console.error("Error en el servicio de encuestas:", errorMessage);
      throw new Error(errorMessage);
    }
  }
};

export const getSurveyById = async (id: number): Promise<{ data: Survey }> => {
  try {
    const response = await commerceClient.post(`${API_URL}/show`, { id });
    return response.data;
  } catch (error: any) {
    let errorMessage = "Error al obtener la encuesta.";
    errorMessage = error.response.data?.message || errorMessage;
    console.error("Error en el servicio de obtener encuesta:", errorMessage);
    throw new Error(errorMessage);
  }
};

export const getSurveysByBranch = async (
  branchId: string
): Promise<Survey[]> => {
  try {
    const response = await commerceClient.post(`${API_URL}/branch`, {
      branch_id: branchId,
    });
    return response.data?.data && Array.isArray(response.data.data)
      ? response.data.data
      : [];
  } catch (error: any) {
    console.warn("Error fetching surveys:", error.response?.data || error);
    if (error.response?.status === 404) {
      return [];
    }
    const errorMessage =
      error.response?.data?.message || "Error al obtener las encuestas.";
    throw new Error(errorMessage);
  }
};

export const createSurvey = async (surveyData: {
  branch_id: string;
  questions: Question[];
}): Promise<void> => {
  try {
    await commerceClient.post(`${API_URL}/create`, surveyData);
  } catch (error: any) {
    let errorMessage = "Error al crear la encuesta.";
    if (error.response) {
      errorMessage =
        error.response.data?.message ||
        error.response.statusText ||
        errorMessage;
    }
    console.error(
      "Error en el servicio de creación de encuesta:",
      errorMessage
    );
    throw new Error(errorMessage);
  }
};

export const updateSurvey = async (
  id: number,
  surveyData: {
    branch_id: string;
    questions: Question[];
  }
): Promise<void> => {
  try {
    await commerceClient.post(`${API_URL}/${id}/update`, surveyData);
  } catch (error: any) {
    let errorMessage = "Error al actualizar la encuesta.";
    if (error.response) {
      errorMessage =
        error.response.data?.message ||
        error.response.statusText ||
        errorMessage;
    }
    console.error(
      "Error en el servicio de actualización de encuesta:",
      errorMessage
    );
    throw new Error(errorMessage);
  }
};

export const deleteSurvey = async (id: number): Promise<void> => {
  try {
    await commerceClient.delete(`${API_URL}/${id}`);
  } catch (error: any) {
    let errorMessage = "Error al eliminar la encuesta.";
    if (error instanceof AxiosError && error.response) {
      errorMessage = error.response.data?.message || errorMessage;
    }
    console.error(
      "Error en el servicio de eliminación de encuesta:",
      errorMessage
    );
    throw new Error(errorMessage);
  }
};

export const generateSurveySuggestions = async (
  branchId: string,
  theme: string,
  image?: File
): Promise<{ branch_id: string; questions: Question[] }> => {
  try {
    const formData = new FormData();
    formData.append("branch_id", branchId);
    formData.append("theme", theme);
    if (image) {
      formData.append("image", image);
    }

    const response = await commerceClient.post(`${API_URL}/generate`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.data;
  } catch (error: any) {
    let errorMessage = "Error al generar sugerencias de encuesta.";
    if (error.response) {
      errorMessage =
        error.response.data?.message ||
        error.response.statusText ||
        errorMessage;
    }
    console.error(
      "Error en el servicio de generación de sugerencias:",
      errorMessage
    );
    throw new Error(errorMessage);
  }
};