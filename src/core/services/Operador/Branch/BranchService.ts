import { commerceClient } from "../../../Interceptors/apiClient";

const BASE_URL = import.meta.env.VITE_API_BASE_URL_COMMERCE;

export const getBranchesByCompanyId = async (companyId: string) => {
  try {
    const response = await commerceClient.get(
      `${BASE_URL}/branches/company/${companyId}`
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

// Crear una nueva sucursal
export const createBranch = async (formData: FormData): Promise<void> => {
  try {
    const response = await commerceClient.post(`/branches`, formData);
    return response.data;
  } catch (error: any) {
    console.error("Error al crear sucursal:", error);
    throw new Error(
      error.response?.data?.message || "No se pudo crear la sucursal."
    );
  }
};

// Actualizar una sucursal existente
export const updateBranch = async (
  branchId: string,
  formData: FormData
): Promise<void> => {
  try {
    const response = await commerceClient.post(
      `/branches/${branchId}/update`,
      formData
    );
    return response.data;
  } catch (error: any) {
    console.error("Error al actualizar sucursal:", error);
    throw new Error(
      error.response?.data?.message || "No se pudo actualizar la sucursal."
    );
  }
};

// Eliminar una sucursal
export const deleteBranch = async (branchId: string) => {
  try {
    const response = await commerceClient.delete(`${BASE_URL}/branches/${branchId}`);
    return response.data;
  } catch (error: any) {
    console.error("Error al eliminar sucursal:", error);
    throw new Error(
      error.response?.data?.message || "No se pudo eliminar la sucursal."
    );
  }
};

// Obtener detalles de una sucursal por ID
export const getBranchById = async (branchId: string) => {
  try {
    const response = await commerceClient.get(`/branches/${branchId}`);
    console.log("API response:", response.data);

    // Verifica si la respuesta contiene "data" como objeto
    if (!response.data?.data) {
      throw new Error("No se encontró la sucursal.");
    }

    // Retorna directamente el objeto "data"
    return response.data.data;
  } catch (error: any) {
    console.error("Error en getBranchById:", error);
    throw new Error(
      error.response?.data?.message || "No se pudo obtener la sucursal."
    );
  }
};


//Data Select
export const getCategories = async () => {
  try {
    const response = await commerceClient.get("/category");
    return response.data?.data || [];
  } catch (error: any) {
    console.error("Error al obtener categorías:", error);
    throw new Error("No se pudo obtener las categorías.");
  }
};

// Obtener subcategorías por categoría ID
export const getSubcategoriesByCategoryId = async (categoryId: number) => {
  try {
    const response = await commerceClient.get(`/subcategory/category/${categoryId}`);
    return response.data?.data || [];
  } catch (error: any) {
    console.error("Error al obtener subcategorías:", error);
    throw new Error("No se pudo obtener las subcategorías.");
  }
};

