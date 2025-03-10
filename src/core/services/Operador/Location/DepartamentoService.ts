import { AxiosError } from "axios";
import { commerceClient } from "../../../Interceptors/apiClient";

// Interface para el Departamento
export interface Departamento {
  id: number;
  departamento: string;
}
const API_URL = import.meta.env.VITE_API_BASE_URL_COMMERCE;

// Función para obtener departamentos
export const getDepartamentos = async (): Promise<Departamento[]> => {
  try {
    const response = await commerceClient.get(`${API_URL}/departamento`);
    if (response.data && response.data.data) {
      return response.data.data as Departamento[];
    } else {
      return [];
    }
  } catch (error: any) {
    let errorMessage = "Error al obtener los departamentos";
    if (error instanceof AxiosError && error.response) {
      errorMessage = error.response.data?.message || errorMessage;
    }
    console.error("Error en el servicio de departamentos:", errorMessage);
    throw new Error(errorMessage);
  }
};
