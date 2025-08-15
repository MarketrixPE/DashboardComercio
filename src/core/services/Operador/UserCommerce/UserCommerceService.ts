import { commerceClient } from "../../../Interceptors/apiClient";

const API_BASE_URL = import.meta.env.VITE_API_BASE;
const API_BASE_URL_REGISTRO = import.meta.env.VITE_API_BASE_REGISTRO;
interface CommerceRegistrationData {
  name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone: string;
  avatar?: File | null;
  referal_code?: string;
  dni: string;
  numero_documento: string;
  nombre_comercial: string;
  membership_id: number | "";
  razon_social?: string;
}

// Nueva interfaz para el endpoint simplificado
interface SimpleRegistrationData {
  nombre: string;
  lastName: string;
  phone: string;
  email: string;
  reference: string;
  membershipId: string;
  code?: string;
}

interface ValidationError {
  [key: string]: string[];
}

// Nueva interfaz para errores del nuevo API
interface NewApiError {
  mensaje: string;
  errores?: Array<{
    mensaje: string;
    campo: string;
  }>;
}

// Nueva interfaz para respuesta exitosa del nuevo API
interface NewApiSuccess {
  mensaje: string;
  id: number;
  fecha: string;
}

export class CommerceError extends Error {
  validationErrors?: ValidationError;
  newApiErrors?: Array<{ mensaje: string; campo: string }>;

  constructor(
    message: string,
    validationErrors?: ValidationError,
    newApiErrors?: Array<{ mensaje: string; campo: string }>
  ) {
    super(message);
    this.validationErrors = validationErrors;
    this.newApiErrors = newApiErrors;
  }
}

export const formatDate = (dateStr: string): string => {
  const [day, month, year] = dateStr.split("/");
  return `${year}-${month}-${day}`;
};

export const useCommerceService = () => {
  const registerCommerce = async (data: CommerceRegistrationData) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (value instanceof File) {
            formData.append(key, value);
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      const response = await commerceClient.post(
        `${API_BASE_URL}/commerce/register`,
        formData
      );

      return response.data;
    } catch (error: any) {
      console.error("Error completo:", error.response?.data);

      // Si hay errores de validación
      if (error.response?.data?.errors) {
        const commerceError = new CommerceError(
          error.response.data.message || "Error de validación",
          error.response.data.errors
        );
        console.log("CommerceError lanzado:", commerceError);
        throw commerceError;
      }

      // Si es otro tipo de error con mensaje del backend
      if (error.response?.data?.message) {
        const commerceError = new CommerceError(error.response.data.message);
        console.log(
          "CommerceError lanzado (sin validationErrors):",
          commerceError
        );
        throw commerceError;
      }

      // Si no hay respuesta del backend (por ejemplo, error de red)
      const commerceError = new CommerceError(
        error.message || "No se pudo conectar con el servidor"
      );
      console.log("CommerceError lanzado (error genérico):", commerceError);
      throw commerceError;
    }
  };

  // Nueva función para el endpoint simplificado
  const registerSimpleCommerce = async (
    data: SimpleRegistrationData
  ): Promise<NewApiSuccess> => {
    try {
      const response = await commerceClient.post(
        `${API_BASE_URL_REGISTRO}/api/registro`,
        data
      );

      return response.data as NewApiSuccess;
    } catch (error: any) {
      console.error("Error en registro simplificado:", error);

      // Manejo de errores del nuevo API
      if (error.response?.data) {
        const errorData = error.response.data as NewApiError;

        const commerceError = new CommerceError(
          errorData.mensaje || "Error en el registro",
          undefined, 
          errorData.errores
        );

        throw commerceError;
      }

      // Error de conexión u otro error
      const commerceError = new CommerceError(
        error.message || "No se pudo conectar con el servidor"
      );
      throw commerceError;
    }
  };

  return {
    registerCommerce,
    registerSimpleCommerce,
  };
};
