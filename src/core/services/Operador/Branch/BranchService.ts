import { commerceClient } from "../../../Interceptors/apiClient";
import { HelperService } from "../../HelperService";

const BASE_URL = import.meta.env.VITE_API_BASE_URL_COMMERCE;

// Interfaces
interface Branch {
  uuid: string;
  descripcion: string;
  direccion: string;
  numeros_contacto: string;
  activo: number;
  horarios: string;
  latitud: string;
  longitud: string;
  departamento: string;
  provincia: string;
  distrito: string;
  imagen?: File | null;
  category_id?: number;
  subcategory_id?: number;
  categories?: { id: number }[];
  subcategories?: { id: number }[];
}

interface Category {
  id: number;
  titulo: string;
}

interface Subcategory {
  id: number;
  descripcion: string;
}

// Get branches for a company with the new POST endpoint
export const getBranchesByCompanyId = async (
  companyId: string
): Promise<Branch[]> => {
  try {
    // Create form data for the request
    const formData = new FormData();
    formData.append("company_id", companyId);

    const response = await commerceClient.post(
      `${BASE_URL}/branch/company`,
      formData
    );
    return response.data?.data || [];
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.warn("No hay sucursales disponibles.");
      return [];
    }
    throw new Error(
      error.response?.data?.message || "No se pudo obtener las sucursales."
    );
  }
};

// Create a new branch with the updated endpoint
export const createBranch = async (formData: FormData): Promise<any> => {
  try {
    const response = await commerceClient.post(
      `${BASE_URL}/branch/create`,
      formData
    );
    return response.data;
  } catch (error: any) {
    console.error("Error al crear sucursal:", error);
    throw new Error(
      error.response?.data?.message || "No se pudo crear la sucursal."
    );
  }
};

// Update a branch
export const updateBranch = async (
  branchId: string,
  formData: FormData
): Promise<any> => {
  try {
    if (!formData.has("branch_id")) {
      formData.append("branch_id", branchId);
    }

    const response = await commerceClient.post(
      `${BASE_URL}/branch/update`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        }
      }
    );
    
    return response.data;
  } catch (error: any) {
    console.error("Error al actualizar sucursal:", error);
    // Mejor manejo de errores para proporcionar mensajes más específicos
    if (error.response) {
      // Si hay una respuesta con error del servidor
      const errorMessage = error.response.data?.message || 
                          error.response.data?.error || 
                          "Error en el servidor al actualizar la sucursal.";
      throw new Error(errorMessage);
    } else if (error.request) {
      // Si no se recibió respuesta
      throw new Error("No se recibió respuesta del servidor. Verifica tu conexión.");
    } else {
      // Error en la configuración de la solicitud
      throw new Error("Error al configurar la solicitud: " + error.message);
    }
  }
};

// Get branch by ID
export const getBranchById = async (uuid: string): Promise<Branch> => {
  try {
    // Create form data for the request
    const formData = new FormData();
    formData.append("branch_id", uuid);

    const response = await commerceClient.post(
      `${BASE_URL}/branch/show`,
      formData
    );

    if (!response.data?.data) {
      throw new Error("No se encontró la sucursal.");
    }

    return response.data.data;
  } catch (error: any) {
    console.error("Error en getBranchById:", error);
    throw new Error(
      error.response?.data?.message || "No se pudo obtener la sucursal."
    );
  }
};

// Check branch creation limit
export const checkBranchLimit = async (): Promise<{ can_create: boolean }> => {
  try {
    const companyId = HelperService.getCompanyId() || "";

    const response = await commerceClient.post(
      `${BASE_URL}/membership/create/branches/limit`,
      { company_id: companyId }
    );

    return response.data;
  } catch (error: any) {
    console.error("Error al verificar límite de sucursales:", error);
    throw new Error(
      error.response?.data?.message ||
        "No se pudo verificar el límite de sucursales."
    );
  }
};

// Get categories
export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await commerceClient.get(`${BASE_URL}/category`);
    return response.data?.data || [];
  } catch (error: any) {
    console.error("Error al obtener categorías:", error);
    throw new Error("No se pudo obtener las categorías.");
  }
};

// Get subcategories by category ID
export const getSubcategoriesByCategoryId = async (
  categoryId: number
): Promise<Subcategory[]> => {
  try {
    const response = await commerceClient.get(
      `${BASE_URL}/subcategory/category/${categoryId}`
    );
    return response.data?.data || [];
  } catch (error: any) {
    console.error("Error al obtener subcategorías:", error);
    throw new Error("No se pudo obtener las subcategorías.");
  }
};
