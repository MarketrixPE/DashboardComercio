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
 * Obtener empresa asociada a un usuario por su ID
 */
export const getCompanyByUser = async (userId: number) => {
  if (!userId) {
    throw new Error("El userId es obligatorio.");
  }

  try {
    const { data } = await commerceClient.get(
      `${API_BASE_URL}/company-by-user/${userId}`
    );
    return data.data;
  } catch (error) {
    handleApiError(error, "Error al obtener la empresa por usuario.");
  }
};

/**
 * Obtener detalles de una empresa por su ID
 */
export const getCompanyById = async (id: number): Promise<Company> => {
  if (!id) {
    throw new Error("El ID de la empresa es obligatorio.");
  }

  try {
    const { data } = await commerceClient.get(`${API_BASE_URL}/company/${id}`);
    if (data.success && data.data.length > 0) {
      return data.data[0];
    }
    throw new Error("No se encontró la empresa solicitada.");
  } catch (error) {
    handleApiError(error, "Error al obtener los detalles de la empresa.");
    throw error;
  }
};


export const createCompany = async (companyData: {
  tipo_documento: string;
  numero_documento: string;
  razon_social: string;
  nombre_comercial: string;
  numeros_contacto: string;
  activo: number;
  user_role_commerce: number;
  logo: File | null;
  membership_id: number;
  discount_plan_id: number;
}): Promise<void> => {
  const formData = new FormData();

  formData.append("tipo_documento", companyData.tipo_documento);
  formData.append("numero_documento", companyData.numero_documento);
  formData.append("razon_social", companyData.razon_social);
  formData.append("nombre_comercial", companyData.nombre_comercial);
  formData.append("numeros_contacto", companyData.numeros_contacto || "");
  formData.append("activo", companyData.activo.toString());
  formData.append("user_role_commerce", companyData.user_role_commerce.toString());
  formData.append("membership_id", companyData.membership_id.toString());
  formData.append("discount_plan_id", companyData.discount_plan_id.toString());

  if (companyData.logo) {
    formData.append("logo", companyData.logo);
  }

  try {
    await commerceClient.post(`${API_BASE_URL}/branches`, formData);
  } catch (error: any) {
    handleApiError(error, "Error al crear la empresa.");
  }
};



/**
 * Actualizar detalles de una empresa
 */
export const updateCompany = async (
  id: number,
  companyData: {
    tipo_documento: string;
    numero_documento: string;
    razon_social: string;
    nombre_comercial: string;
    numeros_contacto: string;
    activo: number;
    user_role_commerce: number;
    logo: File | null;
    membership_id: number;
    discount_plan_id: number;
  }
): Promise<void> => {
  if (!id) {
    throw new Error("El ID de la empresa es obligatorio.");
  }

  const formData = new FormData();

  formData.append("tipo_documento", companyData.tipo_documento);
  formData.append("numero_documento", companyData.numero_documento);
  formData.append("razon_social", companyData.razon_social);
  formData.append("nombre_comercial", companyData.nombre_comercial);
  formData.append("numeros_contacto", companyData.numeros_contacto || "");
  formData.append("activo", companyData.activo.toString());
  formData.append("user_role_commerce", companyData.user_role_commerce.toString());
  formData.append("membership_id", companyData.membership_id.toString());
  formData.append("discount_plan_id", companyData.discount_plan_id.toString());

  if (companyData.logo) {
    formData.append("logo", companyData.logo);
  }

  try {
    await commerceClient.post(`${API_BASE_URL}/company/${id}/update`, formData);
  } catch (error: any) {
    handleApiError(error, "Error al actualizar la empresa.");
  }
};

