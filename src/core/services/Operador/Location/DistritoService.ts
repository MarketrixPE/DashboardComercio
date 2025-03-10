import { AxiosError } from "axios";
import { commerceClient } from "../../../Interceptors/apiClient";

// Interface para el Distrito
export interface Distrito {
  id: number;
  distrito: string;
}

const API_URL = import.meta.env.VITE_API_BASE_URL_COMMERCE;

// Función para obtener distritos en función del ID de la provincia
export const getDistritos = async (provinciaId: string): Promise<Distrito[]> => {
  try {
    const response = await commerceClient.get(`${API_URL}/distrito/${provinciaId}`);
    if (response.data && response.data.data) {
      return response.data.data as Distrito[];
    } else {
      return [];
    }
  } catch (error: any) {
    let errorMessage = "Error al obtener los distritos";
    if (error instanceof AxiosError && error.response) {
      errorMessage = error.response.data?.message || errorMessage;
    }
    console.error("Error en el servicio de distritos:", errorMessage);
    throw new Error(errorMessage);
  }
};
