import { AxiosError } from "axios";
import { commerceClient } from "../../../Interceptors/apiClient";
import { Company } from "../../../models/Company";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_COMMERCE;

/**
 * Manejo centralizado de errores de API
 */
const handleApiError = (error: any, defaultMessage: string): never => {
  let errorMessage = defaultMessage;
  if (error instanceof AxiosError && error.response) {
    errorMessage = error.response.data?.message || defaultMessage;
  }
  console.error(errorMessage);
  throw new Error(errorMessage);
};

/**
 * Obtener detalles de una empresa por su ID encriptado
 * Utilizando el endpoint POST /companies/show-encrypted
 */
export const getCompanyDetails = async (encryptedId: string): Promise<Company> => {
  if (!encryptedId) {
    throw new Error("El ID encriptado de la empresa es obligatorio.");
  }

  try {
    const { data } = await commerceClient.post(
      `${API_BASE_URL}/companies/show-encrypted`,
      { company_id: encryptedId }
    );
    
    if (data.success && data.data) {
      return data.data;
    }
    
    throw new Error("No se encontró la empresa solicitada.");
  } catch (error) {
    return handleApiError(error, "Error al obtener los detalles de la empresa.");
  }
};

/**
 * Actualizar detalles de una empresa usando el ID encriptado
 * Utilizando el endpoint POST /companies/update/{encryptedId}
 */
export const updateCompany = async (
  encryptedId: string,
  companyData: {
    tipo_documento: string;
    numero_documento: string;
    razon_social: string;
    nombre_comercial: string;
    numeros_contacto: string;
    activo: number;
    logo: File | null;
    discount_plan_id: number;
  }
): Promise<void> => {
  if (!encryptedId) {
    throw new Error("El ID encriptado de la empresa es obligatorio.");
  }

  try {
    const formData = new FormData();

    formData.append("tipo_documento", companyData.tipo_documento);
    formData.append("numero_documento", companyData.numero_documento);
    formData.append("razon_social", companyData.razon_social);
    formData.append("nombre_comercial", companyData.nombre_comercial);
    formData.append("numeros_contacto", companyData.numeros_contacto || "");
    formData.append("activo", companyData.activo.toString());
    formData.append("discount_plan_id", companyData.discount_plan_id.toString());

    if (companyData.logo) {
      formData.append("logo", companyData.logo);
    }

    // Usando el endpoint con ID encriptado
    await commerceClient.post(`${API_BASE_URL}/companies/update/${encryptedId}`, formData);
  } catch (error: any) {
    handleApiError(error, "Error al actualizar la empresa.");
  }
};