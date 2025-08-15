export interface Company {
  id: number;
  tipo_documento: string;
  numero_documento: string;
  razon_social: string;
  nombre_comercial: string;
  numeros_contacto: string;
  logo: string;
  activo: number;
  membership_id: number;
  discount_plan_id: number;
  created_at: string;

  user?: {
    id: number;
    name: string;
    last_name: string;
    email: string;
    phone: string;
  };
}
