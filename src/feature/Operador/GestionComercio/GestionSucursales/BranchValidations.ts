import { commonValidations } from "../../../../shared/components/Auth/Validations/commonValidations";

export const branchValidations = {
  validateDescription: (description: string): string | undefined => {
    const requiredError = commonValidations.validateRequired(description, 'descripción');
    if (requiredError) return requiredError;
    
    return commonValidations.validateLength(description, 3, 100,'descripción');
  },

  validateAddress: (address: string): string | undefined => {
    const requiredError = commonValidations.validateRequired(address, 'dirección');
    if (requiredError) return requiredError;
    
    return commonValidations.validateLength(address, 5, 200,'dirección');
  },

  validateContact: (contact: string): string | undefined => {
    if (!contact) return "El número de contacto es requerido";
    
    const phoneRegex = /^\+51\d{9}$/;
    if (!phoneRegex.test(contact)) {
      return "El número de contacto debe tener el formato +51XXXXXXXXX";
    }
  },

  validateSchedule: (schedule: string): string | undefined => {
    if (!schedule) return "El horario es requerido";
    if (schedule.length < 5) return "El horario debe ser más descriptivo";
    if (schedule.length > 100) return "El horario es demasiado largo";
  },

  validateCategory: (category: number | null): string | undefined => {
    if (!category) return "Debe seleccionar una categoría";
  },

  validateSubcategory: (subcategory: number | null, hasCategory: boolean): string | undefined => {
    if (hasCategory && !subcategory) return "Debe seleccionar una subcategoría";
  },

  validateLocation: (lat: string, lng: string): string | undefined => {
    if (!lat || !lng) return "Debe seleccionar una ubicación en el mapa";
    
    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);
    
    if (isNaN(latNum) || isNaN(lngNum)) return "Coordenadas inválidas";
    if (latNum < -90 || latNum > 90) return "Latitud fuera de rango";
    if (lngNum < -180 || lngNum > 180) return "Longitud fuera de rango";
  },

  validateLogo: (logo: File | null | undefined, isEditing: boolean): string | undefined => {
    if (!logo && !isEditing) {
      return "El logo es requerido";
    }
    if (logo instanceof File) {  // Verificamos que sea un archivo
      const maxSize = 10; // 10MB
      if (logo.size > maxSize * 1024 * 1024) {
        return `El logo no debe superar los ${maxSize}MB`;
      }
      if (!logo.type.startsWith('image/')) {
        return "El archivo debe ser una imagen";
      }
    }
    return undefined;
  }
};