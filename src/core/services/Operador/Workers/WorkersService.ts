import { commerceClient } from "../../../Interceptors/apiClient"; // Usa tu instancia configurada con lógica de tokens
import { AxiosError } from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL_COMMERCE}`;

// Interfaces para los datos
export interface Worker {
  id: number;
  name: string;
  last_name: string;
  email: string;
  phone: string | null;
  alias: string | null;
  role: number;
  activo: number;
  fecha_nacimiento: string | null;
  genero: string | null; // Cambiado de "genero" a "genero"
  avatar: string | null;
  branch: {
    branch_id: number;
    descripcion: string;
    direccion: string;
    activo: number;
  };
}

export interface WorkerPayload {
  name: string;
  last_name: string;
  email: string;
  password?: string; // Marca estos campos como opcionales
  password_confirmation?: string;
  phone: string;
  alias: string;
  genero: "M" | "F" | "";
  avatar?: File;
  sucursal: number;
  fecha_nacimiento: string;
  role: number;
  workerId: number | null;
  passwordChanged: boolean;
}

// Obtener trabajadores por sucursal
export const getWorkersByBranch = async (
  branchId: number
): Promise<Worker[]> => {
  try {
    const response = await commerceClient.get(
      `${API_URL}/branch/${branchId}/workers`
    );
    return response.data.data || [];
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.warn("No se encontraron trabajadores para la sucursal.");
      return []; // Devuelve una lista vacía
    } else {
      const errorMessage =
        error.response?.data?.message || "Error al obtener los trabajadores.";
      console.error("Error en el servicio de trabajadores:", errorMessage);
      throw new Error(errorMessage);
    }
  }
};

// Crear un nuevo trabajador
export const createWorker = async (workerData: WorkerPayload): Promise<void> => {
  const formData = new FormData();

  // Campos obligatorios
  formData.append("name", workerData.name);
  formData.append("last_name", workerData.last_name);
  formData.append("email", workerData.email);
  formData.append("phone", workerData.phone);
  formData.append("role", workerData.role.toString());
  formData.append("alias", workerData.alias);
  formData.append("genero", workerData.genero);
  formData.append("sucursal", workerData.sucursal.toString());
  formData.append("fecha_nacimiento", workerData.fecha_nacimiento);

  // Campos opcionales
  if (workerData.password) {
    formData.append("password", workerData.password);
  }

  if (workerData.password_confirmation) {
    formData.append("password_confirmation", workerData.password_confirmation);
  }

  if (workerData.avatar) {
    formData.append("avatar", workerData.avatar);
  }

  try {
    const response = await commerceClient.post(`${API_URL}/workers/create`, formData);
    
    // Verificar si la respuesta tiene éxito
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Error al crear el trabajador');
    }
  } catch (error: any) {
    // Manejar errores específicos de validación
    if (error.response?.status === 422) {
      // Error de validación
      const validationErrors = error.response.data.errors;
      if (validationErrors?.email) {
        throw new Error(validationErrors.email[0]);
      }
    }

    // Para otros tipos de errores
    let errorMessage = "Error al crear el trabajador";
    if (error instanceof AxiosError && error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }
    
    console.error("Error en el servicio de creación de trabajador:", errorMessage);
    throw new Error(errorMessage);
  }
};

// Actualizar un trabajador existente
export const updateWorker = async (
  workerId: number,
  workerData: WorkerPayload
): Promise<void> => {
  const formData = new FormData();

  // Campos obligatorios
  formData.append("name", workerData.name);
  formData.append("last_name", workerData.last_name);
  formData.append("email", workerData.email);
  formData.append("phone", workerData.phone);
  formData.append("role", workerData.role.toString());
  formData.append("alias", workerData.alias);
  formData.append("genero", workerData.genero);
  formData.append("sucursal", workerData.sucursal.toString());
  formData.append("fecha_nacimiento", workerData.fecha_nacimiento);

  // Campos opcionales
  if (workerData.password) {
    formData.append("password", workerData.password);
  }

  if (workerData.password_confirmation) {
    formData.append("password_confirmation", workerData.password_confirmation);
  }

  if (workerData.avatar) {
    formData.append("avatar", workerData.avatar);
  }

  try {
    await commerceClient.post(
      `${API_URL}/workers/${workerId}/update`,
      formData
    );
  } catch (error: any) {
    let errorMessage = "Error al actualizar el trabajador";
    if (error instanceof AxiosError && error.response) {
      errorMessage = error.response.data?.message || errorMessage;
    }
    console.error(
      "Error en el servicio de actualización de trabajador:",
      errorMessage
    );
    throw new Error(errorMessage);
  }
};

// Eliminar un trabajador
export const deleteWorker = async (workerId: number): Promise<void> => {
  try {
    await commerceClient.delete(`${API_URL}/workers/${workerId}`); // Corrige el prefijo aquí
  } catch (error: any) {
    let errorMessage = "Error al eliminar el trabajador";
    if (error instanceof AxiosError && error.response) {
      errorMessage = error.response.data?.message || errorMessage;
    }
    console.error(
      "Error en el servicio de eliminación de trabajador:",
      errorMessage
    );
    throw new Error(errorMessage);
  }
};

// Obtener datos de un trabajador por ID
export const getWorkerById = async (workerId: number): Promise<Worker> => {
  try {
    const response = await commerceClient.get(`${API_URL}/workers/${workerId}`);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error("No se encontró el trabajador solicitado.");
  } catch (error: any) {
    let errorMessage = "Error al obtener el trabajador";
    if (error instanceof AxiosError && error.response) {
      errorMessage = error.response.data?.message || errorMessage;
    }
    console.error("Error en el servicio de obtener trabajador:", errorMessage);
    throw new Error(errorMessage);
  }
};
