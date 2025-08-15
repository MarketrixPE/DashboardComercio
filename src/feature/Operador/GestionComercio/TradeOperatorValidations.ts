import { commonValidations } from "../../../shared/components/Auth/Validations/commonValidations";

export const tradeOperatorValidations = {
  validateRUC: (ruc: string): string | undefined => {
    if (!ruc) return "El RUC es requerido";
    if (ruc.length !== 11) return "El RUC debe tener 11 dígitos";
    if (!/^\d+$/.test(ruc)) return "El RUC solo debe contener números";
    if (!["10", "20"].includes(ruc.substring(0, 2))) {
      return "El RUC debe comenzar con 10 o 20";
    }
  },

  validateBusinessName: (name: string): string | undefined => {
    const requiredError = commonValidations.validateRequired(name, 'nombre comercial');
    if (requiredError) return requiredError;
    
    return commonValidations.validateLength(name, 3, 100,'nombre comercial');
  },

  validateRazonSocial: (razon: string): string | undefined => {
    const requiredError = commonValidations.validateRequired(razon, 'razón social');
    if (requiredError) return requiredError;
    
    return commonValidations.validateLength(razon, 3, 150,'razón social');
  },

  validateContactNumber: (number: string): string | undefined => {
    if (!number) return "El número de contacto es requerido";
    if (!number.startsWith('+51')) return "El número debe empezar con +51";
    
    const numberWithoutPrefix = number.replace('+51', '');
    if (numberWithoutPrefix.length !== 9) {
      return "El número debe tener 9 dígitos después del +51";
    }
    if (!/^\d+$/.test(numberWithoutPrefix)) {
      return "El número solo debe contener dígitos después del +51";
    }
  },

  validateLogo: (logo: File | null | undefined, isEditing: boolean): string | undefined => {
    if (!logo && !isEditing) {
      return "El logo es requerido";
    }
    if (logo) {
      const maxSize = 100; // 10MB
      if (logo.size > maxSize * 1024 * 1024) {
        return `El logo no debe superar los ${maxSize}MB`;
      }
      if (!logo.type.match(/^image\/(jpeg|jpg|png)$/)) {
        return "El logo debe ser una imagen en formato JPG o PNG";
      }
    }
  }
};