import { commerceClient } from "../../../Interceptors/apiClient";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_COMMERCE;

export const getBranchesByCompany = async (companyId: number) => {
  if (!companyId) {
    throw new Error("El ID de la empresa es obligatorio.");
  }

  try {
    const { data } = await commerceClient.get(
      `${API_BASE_URL}/company/${companyId}/branches`
    );
    return data.data; // Retorna solo los datos necesarios
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      console.warn("No hay sucursales disponibles.");
      return [];
    } else {
      throw new Error(
        error.response?.data?.message || "Error al obtener las sucursales."
      );
    }
  }
};