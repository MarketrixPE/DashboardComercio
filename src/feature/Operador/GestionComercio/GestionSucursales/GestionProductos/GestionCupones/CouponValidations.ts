import { commonValidations } from "../../../../../../shared/components/Auth/Validations/commonValidations";

export const couponValidations = {
  validateTitle: (title: string): string | undefined => {
    const requiredError = commonValidations.validateRequired(title, 'título');
    if (requiredError) return requiredError;
    
    return commonValidations.validateLength(title, 3, 100, 'título');
  },

  validateDescription: (description: string): string | undefined => {
    const requiredError = commonValidations.validateRequired(description, 'descripción');
    if (requiredError) return requiredError;
    
    return commonValidations.validateLength(description, 10, 500, 'descripción');
  },

  validateBarcode: (barcode: string): string | undefined => {
    const requiredError = commonValidations.validateRequired(barcode, 'código de barras');
    if (requiredError) return requiredError;
    
    if (!/^[0-9A-Z]+$/.test(barcode)) {
      return "El código de barras solo debe contener números y letras mayúsculas";
    }
    
    return commonValidations.validateLength(barcode, 5, 20, 'código de barras');
  },

  validatePoints: (points: string): string | undefined => {
    if (!points) return "Los puntos son requeridos";
    
    const numPoints = parseInt(points);
    if (isNaN(numPoints)) return "Los puntos deben ser un número válido";
    if (numPoints <= 0) return "Los puntos deben ser mayores a 0";
    if (numPoints > 10000) return "Los puntos no pueden exceder 10000";
  },

  validateDiscount: (discount: string): string | undefined => {
    if (!discount) return undefined; // Descuento es opcional
    
    const numDiscount = parseFloat(discount);
    if (isNaN(numDiscount)) return "El descuento debe ser un número válido";
    if (numDiscount < 0) return "El descuento no puede ser negativo";
    if (numDiscount > 100) return "El descuento no puede ser mayor a 100%";
  },

  validateTerms: (terms: string): string | undefined => {
    const requiredError = commonValidations.validateRequired(terms, 'términos y condiciones');
    if (requiredError) return requiredError;
    
    return commonValidations.validateLength(terms, 20, 1000, 'términos y condiciones');
  },

  validateExpirationDate: (date: string): string | undefined => {
    if (!date) return "La fecha de vencimiento es requerida";
    
    const expirationDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Resetear hora para comparar solo fechas

    if (expirationDate < today) {
      return "La fecha de vencimiento no puede ser anterior a hoy";
    }

    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 2); // máximo 2 años en el futuro
    if (expirationDate > maxDate) {
      return "La fecha de vencimiento no puede ser mayor a 2 años en el futuro";
    }
  },

  validateImage: (image: File | null, isEditing: boolean): string | undefined => {
    if (!image && !isEditing) {
      return "La imagen del cupón es requerida";
    }
    
    if (image) {
      const maxSize = 100 * 1024 * 1024; // 10MB
      if (image.size > maxSize) {
        return "La imagen no debe superar los 10MB";
      }
      if (!image.type.match(/^image\/(jpeg|jpg|png)$/)) {
        return "La imagen debe estar en formato JPG o PNG";
      }
    }
  }
};