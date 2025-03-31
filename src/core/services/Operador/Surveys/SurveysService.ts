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
