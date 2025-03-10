import { commonValidations } from "../../../../../shared/components/Auth/Validations/commonValidations";

export const productValidations = {
  validateTitle: (title: string): string | undefined => {
    const requiredError = commonValidations.validateRequired(title, 'título');
    if (requiredError) return requiredError;
    
    return commonValidations.validateLength(title, 3, 100, 'titulo');
  },

  validateShortDescription: (desc: string): string | undefined => {
    const requiredError = commonValidations.validateRequired(desc, 'descripción corta');
    if (requiredError) return requiredError;
    
    return commonValidations.validateLength(desc, 10, 150, 'descripción corta');
  },
  
  validateDescription: (desc: string): string | undefined => {
    const requiredError = commonValidations.validateRequired(desc, 'descripción');
    if (requiredError) return requiredError;
    
    return commonValidations.validateLength(desc, 20, 1000, 'descripción');
  },

  validatePrice: (price: string): string | undefined => {
    if (!price) return "El precio es requerido";
    
    const numPrice = parseFloat(price);
    if (isNaN(numPrice)) return "El precio debe ser un número válido";
    if (numPrice <= 0) return "El precio debe ser mayor a 0";
    if (numPrice > 999999) return "El precio es demasiado alto";
  },

  validateCategory: (category: number | null): string | undefined => {
    if (!category) return "Debe seleccionar una categoría";
  },

  validateSubcategory: (subcategory: number | null, hasCategory: boolean): string | undefined => {
    if (hasCategory && !subcategory) return "Debe seleccionar una subcategoría";
  },

  validateProductType: (type: string): string | undefined => {
    if (!type) return "Debe seleccionar un tipo de producto";
  },

  validateExpirationDate: (date: string, type: string): string | undefined => {
    if ((type === "2" || type === "3") && !date) {
      return "La fecha de vencimiento es requerida para este tipo de producto";
    }
    if (date) {
      const expirationDate = new Date(date);
      const today = new Date();
      if (expirationDate < today) {
        return "La fecha de vencimiento no puede ser anterior a hoy";
      }
    }
  },

  validateProductImage: (image: { file: File | null; url: string }[], isEditing: boolean): string | undefined => {
    if (!isEditing && (!image[0]?.file && !image[0]?.url)) {
      return "Debe subir al menos una imagen del producto";
    }
    
    for (const img of image) {
      if (img.file) {
        if (img.file.size > 10 * 1024 * 1024) {
          return "La imagen no debe superar los 10MB";
        }
        if (!img.file.type.match(/^image\/(jpeg|jpg|png)$/)) {
          return "La imagen debe estar en formato JPG o PNG";
        }
      }
    }
  }
};