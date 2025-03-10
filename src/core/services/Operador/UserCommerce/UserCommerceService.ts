import { commerceClient } from "../../../Interceptors/apiClient";

const API_BASE_URL = import.meta.env.VITE_API_BASE;

interface CommerceRegistrationData {
  // Datos del administrador
  name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone: string;
  role: number;
  alias: string;
  avatar?: File | null;
  referal_code?: string;
  fecha_nacimiento: string;
  gender: string;
  dni: string;
  // Datos del comercio
  numero_documento: string;
  razon_social: string;
  distrito: string;
  provincia: string;
  departamento: string;
  nombre_comercial: string;
  membership_id: number | "";
}

interface ValidationError {
  [key: string]: string[];
}

class CommerceError extends Error {
  validationErrors?: ValidationError;
  
  constructor(message: string, validationErrors?: ValidationError) {
    super(message);
    this.validationErrors = validationErrors;
  }
}

export const formatDate = (dateStr: string): string => {
  const [day, month, year] = dateStr.split('/');
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
      console.error('Error completo:', error.response?.data);
      
      // Si hay errores de validación
      if (error.response?.data?.errors) {
        throw new CommerceError(
          error.response.data.message || 'Error de validación',
          error.response.data.errors
        );
      }
      
      // Si es otro tipo de error
      throw new CommerceError(
        error.response?.data?.message || 'Error en el registro del comercio'
      );
    }
  };

  return {
    registerCommerce
  };
};