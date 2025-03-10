export interface Company {
  id: number;
  tipo_documento: string;
  numero_documento: string;
  razon_social: string;
  nombre_comercial: string;
  numeros_contacto: string; // Este campo sigue siendo relevante
  logo: string; // Imagen del logo de la empresa
  activo: number; // Estado activo o inactivo
  membership_id: number; // ID del tipo de membresía
  discount_plan_id: number; // ID del plan de descuentos
  created_at: string; // Fecha de creación
}
