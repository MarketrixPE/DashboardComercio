import { AxiosError } from "axios";
import { commerceClient } from "../../../Interceptors/apiClient";

const API_URL = `${import.meta.env.VITE_API_BASE_URL_COMMERCE}/provincia`;

export interface Provincia {
  id: number;
  provincia: string;
}

// Función para obtener las provincias de un departamento específico
export const getProvincias = async (
  departamentoId: string
): Promise<Provincia[]> => {
  try {
    const response = await commerceClient.get(`${API_URL}/${departamentoId}`);
    if (response.data && response.data.data) {
      return response.data.data as Provincia[];
    } else {
      return [];
    }
  } catch (error: any) {
    let errorMessage = "Error al obtener las provincias";
    if (error instanceof AxiosError && error.response) {
      errorMessage = error.response.data?.message || errorMessage;
    }
    console.error("Error en el servicio de provincias:", errorMessage);
    throw new Error(errorMessage);
  }
};
