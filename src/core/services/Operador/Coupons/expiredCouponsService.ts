import { commerceClient } from "../../../Interceptors/apiClient";
import { HelperService } from "../../HelperService";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_COMMERCE;

export interface ExpiredCoupon {
  coupon: {
    id: number;
    titulo: string;
    descripcion: string;
    codigo_barras: string;
    imagen: string;
    puntos: number;
    porcentaje_descuento: number;
    fecha_vencimiento: string;
    dias_vencido: number;
    estado?: string;
    activo?: number;
  };
  product: {
    id: number;
    titulo: string;
  };
  branch: {
    id: number;
    descripcion: string;
    direccion: string;
  };
}

export interface ExpiredCouponsResponse {
  success: boolean;
  message: string;
  total_expired: number;
  user_branches_count: number;
  data: ExpiredCoupon[];
}

/**
 * Obtiene cupones vencidos y desactivados para el usuario actual
 */
export const getExpiredCoupons = async (): Promise<ExpiredCouponsResponse> => {
  try {
    const userUuid = HelperService.getUserUuid();
    
    if (!userUuid) {
      throw new Error("No se encontró el UUID del usuario");
    }

    const response = await commerceClient.get(
      `${API_BASE_URL}/notifications/expired-coupons/user/${userUuid}`
    );
    
    return response.data;
  } catch (error: any) {
    console.error("Error al obtener cupones vencidos:", error);
    
    if (error.response?.status === 404) {
      return {
        success: true,
        message: "No hay cupones vencidos",
        total_expired: 0,
        user_branches_count: 0,
        data: []
      };
    }
    
    throw new Error(
      error.response?.data?.message || "Error al obtener cupones vencidos"
    );
  }
};

/**
 * Obtiene TODOS los cupones vencidos (activos e inactivos) para el usuario actual
 */
export const getAllExpiredCoupons = async (): Promise<ExpiredCouponsResponse> => {
  try {
    const userUuid = HelperService.getUserUuid();
    
    if (!userUuid) {
      throw new Error("No se encontró el UUID del usuario");
    }

    const response = await commerceClient.get(
      `${API_BASE_URL}/notifications/all-expired-coupons/user/${userUuid}`
    );
    
    return response.data;
  } catch (error: any) {
    console.error("Error al obtener todos los cupones vencidos:", error);
    
    if (error.response?.status === 404) {
      return {
        success: true,
        message: "No hay cupones vencidos",
        total_expired: 0,
        user_branches_count: 0,
        data: []
      };
    }
    
    throw new Error(
      error.response?.data?.message || "Error al obtener cupones vencidos"
    );
  }
};

/**
 * Ejecuta el comando para desactivar cupones vencidos
 */
export const checkExpiredCoupons = async () => {
  try {
    const response = await commerceClient.post(
      `${API_BASE_URL}/coupons/check-expired`
    );
    return response.data;
  } catch (error: any) {
    console.error("Error al verificar cupones vencidos:", error);
    throw new Error(
      error.response?.data?.message || "Error al verificar cupones vencidos"
    );
  }
};