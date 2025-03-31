export interface PromotionResponse {
  id: number;
  title: string;
  description: string;
  imagen: string;
  category: number;
  fecha_creacion: string;
  tipo: number;
}

export interface Promotion {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  branch_id: string;
  created_at: string;
  updated_at?: string;
}

export interface PromotionRequest {
  branch_id: string;
  titulo: string;
  descripcion: string;
  imagen: File;
}

export interface NearbyCustomer {
  user_id: number | string;
  latitud: string;
  longitud: string;
  created_at: string;
  distance: number;
  genero: string;
  additionalInfo?: string;
  districtInfo?: string;
}

export interface NearbyCustumersResponse {
  data: NearbyCustomer[] | { usuarios: number };  
  code?: number;
  status?: string;
  message?: string;
}

export interface SendPromotionRequest {
  latitud: string | number;
  longitud: string | number;
  promotion_id: number;
}

export interface SegmentedResponse {
  code: number;
  status: string;
  message: string;
  data: {
    usuarios: number;
    distritos: DistritoData[];
  };
}

export interface DistritoData {
  distrito_id: number;
  distrito_nombre: string;
  genero: string;
  usuarios: number;
}