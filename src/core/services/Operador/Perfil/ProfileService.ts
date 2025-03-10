import { commerceClient } from "../../../Interceptors/apiClient";

const API_URL = `${import.meta.env.VITE_API_BASE_URL_COMMERCE}/profile`;

// Función para obtener los datos del perfil
export const fetchProfile = async (uuid: string) => {
  try {
    const response = await commerceClient.post(`${API_URL}`, { uuid });
    return response.data.data; // Ajusta según la estructura de respuesta de la API
  } catch (error: any) {
    console.error("Error al obtener el perfil:", error);
    throw new Error(error.response?.data?.message || "Error al obtener el perfil.");
  }
};

// Función para actualizar el perfil
export const updateProfile = async (profileData: FormData) => {
  try {
    const response = await commerceClient.post(`${API_URL}/update`, profileData);
    return response.data;
  } catch (error: any) {
    console.error("Error al actualizar el perfil:", error);
    throw new Error(error.response?.data?.message || "Error al actualizar el perfil.");
  }
};
