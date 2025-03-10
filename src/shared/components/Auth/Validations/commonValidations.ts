export const commonValidations = {
  validateRequired: (value: any, fieldName: string): string | undefined => {
    if (!value || (typeof value === "string" && !value.trim())) {
      return `El campo <strong>${fieldName}</strong> es requerido`;
    }
  },

  validateLength: (value: string, min: number, max: number, fieldName: string): string | undefined => {
    if (value.length < min) return `El campo ${fieldName} debe tener al menos ${min} caracteres`;
    if (value.length > max) return `El campo ${fieldName} no debe exceder los ${max} caracteres`;
  },

  validateImage: (
    file: File | null | undefined,
    maxSize: number = 10
  ): string | undefined => {
    if (file) {
      if (file.size > maxSize * 1024 * 1024)
        return `La imagen no debe superar los ${maxSize}MB`;
      if (!file.type.startsWith("image/"))
        return "El archivo debe ser una imagen";
    }
  },
};
