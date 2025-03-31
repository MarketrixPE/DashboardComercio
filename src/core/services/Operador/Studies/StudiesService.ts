import { AxiosError } from "axios";
import { commerceClient } from "../../../Interceptors/apiClient";
import { Study, StudyRequest } from "../../../models/Studies";

const API_URL = `${import.meta.env.VITE_API_BASE_URL_COMMERCE}/studies`;

export const getStudies = async (): Promise<Study[]> => {
  try {
    const response = await commerceClient.get(API_URL);
    return response.data.data || [];
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.warn("No hay estudios disponibles.");
      return [];
    } else {
      const errorMessage =
        error.response?.data?.message || "Error al obtener los estudios.";
      console.error("Error en el servicio de estudios:", errorMessage);
      throw new Error(errorMessage);
    }
  }
};

export const getStudyById = async (id: number): Promise<{ data: Study }> => {
  try {
    const response = await commerceClient.post(`${API_URL}/show`, { id });
    return response.data;
  } catch (error: any) {
    let errorMessage = "Error al obtener el estudio.";
    errorMessage = error.response.data?.message || errorMessage;
    console.error("Error en el servicio de obtener estudio:", errorMessage);
    throw new Error(errorMessage);
  }
};

export const getStudiesByBranch = async (
  branchId: string
): Promise<Study[]> => {
  try {
    const response = await commerceClient.post(`${API_URL}/generalSegment`, {
      branch_id: branchId,
    });
    return response.data.data || [];
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.warn("No hay estudios disponibles.");
      return [];
    } else {
      const errorMessage =
        error.response?.data?.message || "Error al obtener los estudios.";
      console.error("Error en el servicio de estudios:", errorMessage);
      throw new Error(errorMessage);
    }
  }
};

export const createStudy = async (studyData: StudyRequest): Promise<void> => {
  try {
    await commerceClient.post(`${API_URL}/createSegment`, studyData);
  } catch (error: any) {
    let errorMessage = "Error al crear el estudio.";

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
    console.error("Error en el servicio de creación de estudio:", errorMessage);

    throw new Error(errorMessage);
  }
};

export const updateStudy = async (
  id: number,
  studyData: StudyRequest
): Promise<void> => {
  try {
    await commerceClient.post(`${API_URL}/${id}/update`, studyData);
  } catch (error: any) {
    let errorMessage = "Error al actualizar el estudio.";
    if (error.response) {
      errorMessage =
        error.response.data?.message ||
        error.response.statusText ||
        errorMessage;
    }
    console.error(
      "Error en el servicio de actualización de estudio:",
      errorMessage
    );
    throw new Error(errorMessage);
  }
};

export const deleteStudy = async (id: number): Promise<void> => {
  try {
    await commerceClient.delete(`${API_URL}/${id}`);
  } catch (error: any) {
    let errorMessage = "Error al eliminar el estudio.";
    if (error instanceof AxiosError && error.response) {
      errorMessage = error.response.data?.message || errorMessage;
    }
    console.error(
      "Error en el servicio de eliminación de estudio:",
      errorMessage
    );
    throw new Error(errorMessage);
  }
};

export const uploadStudyImage = async (imageFile: File): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append("imagen", imageFile);

    // Axios detecta automáticamente FormData y establece el Content-Type adecuado
    const response = await commerceClient.post(`${API_URL}/imagen`, formData);
    return response.data;
  } catch (error: any) {
    let errorMessage = "Error al subir la imagen.";
    if (error instanceof AxiosError && error.response) {
      errorMessage = error.response.data?.message || errorMessage;
    }
    console.error("Error en el servicio de carga de imagen:", errorMessage);
    throw new Error(errorMessage);
  }
};
