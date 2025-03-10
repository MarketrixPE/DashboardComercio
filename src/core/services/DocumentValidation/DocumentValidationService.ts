// src/core/services/DocumentValidation/DocumentValidationService.ts

import axios from 'axios';

interface DNIData {
  dni: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  fecha_nacimiento: string;
  sexo: string;
  direccion: string;
  ubigeo: string;
  distrito: string;
  provincia: string;
  departamento: string;
}

interface RUCData {
  ruc: string;
  razon_social: string;
  tipo_contribuyente: string;
  activo: string;
  condicion: string;
  direccion: string;
  ubigeo: string;
  distrito: string;
  provincia: string;
  departamento: string;
}

interface APIResponse<T> {
  respuesta: string;
  data: T;
  codigo: number;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE;

export const useDocumentValidation = () => {
  const validateDNI = async (dni: string) => {
    try {
      const response = await axios.get<APIResponse<DNIData>>(`${API_BASE_URL}/consulta/dni/${dni}`);
      
      if (response.data.codigo === 0 || !response.data.data) {
        return {
          isValid: false,
          error: response.data.respuesta || 'Error en la consulta del DNI'
        };
      }

      return {
        isValid: true,
        data: response.data.data
      };
    } catch (error: any) {
      return {
        isValid: false,
        error: error.response?.data?.respuesta || 'Error en la consulta del DNI'
      };
    }
  };

  const validateRUC = async (ruc: string) => {
    try {
      const response = await axios.get<APIResponse<RUCData>>(`${API_BASE_URL}/consulta/ruc/${ruc}`);
      
      if (response.data.codigo === 0 || !response.data.data) {
        return {
          isValid: false,
          error: response.data.respuesta || 'Error en la consulta del RUC'
        };
      }

      return {
        isValid: true,
        data: response.data.data
      };
    } catch (error: any) {
      return {
        isValid: false,
        error: error.response?.data?.respuesta || 'Error en la consulta del RUC'
      };
    }
  };

  return {
    validateDNI,
    validateRUC
  };
};