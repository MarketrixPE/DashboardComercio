import { commerceClient } from "../../../Interceptors/apiClient";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_COMMERCE;

// Obtener la lista de productos
export const getProductList = async () => {
  try {
    const response = await commerceClient.get(`${API_BASE_URL}/product`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener la lista de productos:", error);
    throw error;
  }
};

// Obtener la lista de tipos de productos
export const getProductTypeList = async () => {
  try {
    const response = await commerceClient.get(`${API_BASE_URL}/productType`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener la lista de tipos de productos:", error);
    throw error;
  }
};

// Obtener la lista de productos por branchId
export const getProductsByBranchId = async (branchId: any) => {
  try {
    const response = await commerceClient.get(
      `${API_BASE_URL}/product/branch/${branchId}`
    );
    return response.data?.data || [];
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.warn("No hay productos disponibles para esta sucursal.");
      return []; // Retorna un array vacío
    }
    throw new Error(
      error.response?.data?.message || "Error al obtener los productos."
    );
  }
};

// Crear un nuevo producto
export const createProduct = async (formData: FormData) => {
  try {
    const response = await commerceClient.post(
      `${API_BASE_URL}/product/create`,
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Error al crear el producto:", error);
    throw error;
  }
};

// Actualizar un producto existente
export const updateProduct = async (productId: string, formData: FormData) => {
  try {
    const response = await commerceClient.post(
      `${API_BASE_URL}/product/${productId}/update`,
      formData
    );
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el producto ${productId}:`, error);
    throw error;
  }
};

// Mostrar un producto específico
export const showProduct = async (productId: string) => {
  try {
    const response = await commerceClient.get(
      `${API_BASE_URL}/product/show/${productId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error al obtener los detalles del producto ${productId}:`,
      error
    );
    throw error;
  }
};

// Eliminar un producto
export const deleteProduct = async (productId: string) => {
  try {
    const response = await commerceClient.delete(
      `${API_BASE_URL}/product/${productId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el producto ${productId}:`, error);
    throw error;
  }
};


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