import { AxiosError } from "axios";
import { commerceClient } from "../../Interceptors/apiClient";

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
 * Obtener todos los trabajadores de una compañía
 */
export const getUsersOfCompany = async (companyId: string) => {
  if (!companyId) {
    throw new Error("El ID de la compañía es obligatorio.");
  }

  try {
    const { data } = await commerceClient.post(
      `${API_BASE_URL}/users/company/workers`,
      { company_id: companyId }
    );
    
    if (data.success !== false) {
      return data;
    }
    
    throw new Error("No se encontraron trabajadores para esta compañía.");
  } catch (error) {
    return handleApiError(error, "Error al obtener los trabajadores de la compañía.");
  }
};

/**
 * Obtener trabajadores de una sucursal específica
 */
export const getBranchWorkers = async (branchId: string) => {
  if (!branchId) {
    throw new Error("El ID de la sucursal es obligatorio.");
  }

  try {
    const { data } = await commerceClient.post(
      `${API_BASE_URL}/users/branch/workers`,
      { branch_uuid: branchId }
    );
    
    if (data.success !== false) {
      return data;
    }
    
    throw new Error("No se encontraron trabajadores para esta sucursal.");
  } catch (error) {
    return handleApiError(error, "Error al obtener los trabajadores de la sucursal.");
  }
};

/**
 * Obtener detalles de un usuario específico
 */
export const getUserDetails = async (uuid: string) => {
  if (!uuid) {
    throw new Error("El UUID del usuario es obligatorio.");
  }

  try {
    const { data } = await commerceClient.post(
      `${API_BASE_URL}/users/show`,
      { uuid }
    );
    
    if (data.success !== false) {
      return data;
    }
    
    throw new Error("No se encontró el usuario solicitado.");
  } catch (error) {
    return handleApiError(error, "Error al obtener los detalles del usuario.");
  }
};

/**
 * Crear un nuevo usuario
 */
export const createUser = async (userData: {
  name: string;
  last_name: string;
  email: string;
  password: string;
  role: number;
  branch_id: string;
  company_id: string;
}) => {
  // Validar que los campos requeridos estén presentes
  const requiredFields = ['name', 'last_name', 'email', 'password', 'role', 'branch_id', 'company_id'];
  for (const field of requiredFields) {
    if (!userData[field as keyof typeof userData]) {
      throw new Error(`El campo ${field} es obligatorio para crear un usuario.`);
    }
  }

  try {
    // Asegurarse de que todos los valores sean del tipo correcto
    const sanitizedUserData = {
      name: String(userData.name),
      last_name: String(userData.last_name),
      email: String(userData.email),
      password: String(userData.password),
      role: Number(userData.role),
      branch_id: String(userData.branch_id),
      company_id: String(userData.company_id)
    };

    const { data } = await commerceClient.post(
      `${API_BASE_URL}/users/store`,
      sanitizedUserData
    );
    
    if (data.success !== false) {
      return data;
    }
    
    throw new Error("No se pudo crear el usuario.");
  } catch (error) {
    return handleApiError(error, "Error al crear el usuario.");
  }
};

/**
 * Obtener las sucursales de una compañía
 */
export const getCompanyBranches = async (companyId: string) => {
  if (!companyId) {
    throw new Error("El ID de la compañía es obligatorio.");
  }

  try {
    const { data } = await commerceClient.post(
      `${API_BASE_URL}/branch/company`,
      { company_id: companyId }
    );
    
    if (data.status === "success" && data.data) {
      return data.data;
    }
    
    throw new Error("No se encontraron sucursales para esta compañía.");
  } catch (error) {
    return handleApiError(error, "Error al obtener las sucursales de la compañía.");
  }
};
export const updateUser = async (
  uuid: string,
  userData: {
    name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    role?: number;
    status?: number;
    branch_id?: string;
    company_id?: string | null;
  }
) => {
  if (!uuid) {
    throw new Error("El UUID del usuario es obligatorio.");
  }

  try {
    // Filtrar propiedades undefined del objeto antes de enviarlo
    const filteredUserData = Object.entries(userData)
      .filter(([_, value]) => value !== undefined)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    const { data } = await commerceClient.post(
      `${API_BASE_URL}/users/update/${uuid}`,
      filteredUserData
    );
    
    if (data.success !== false) {
      return data;
    }
    
    throw new Error("No se pudo actualizar el usuario.");
  } catch (error) {
    return handleApiError(error, "Error al actualizar el usuario.");
  }
};