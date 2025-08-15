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
    
    // Validar la cantidad de decimales
    if (price.includes(".")) {
      const decimalPart = price.split(".")[2];
      if (decimalPart && decimalPart.length > 2) {
        return "El precio no puede tener más de dos decimales";
      }
    }

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
      // Crear fecha sin problema de zona horaria
      const [year, month, day] = date.split('-');
      const expirationDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      const today = new Date();
      
      // Comparar solo fechas
      expirationDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      
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
        if (img.file.size > 100 * 1024 * 1024) {
          return "La imagen no debe superar los 10MB";
        }
        if (!img.file.type.match(/^image\/(jpeg|jpg|png)$/)) {
          return "La imagen debe estar en formato JPG o PNG";
        }
      }
    }
  },

  validateDiscount: (discount: string): string | undefined => {
    const requiredError = commonValidations.validateRequired(
      discount,
      "porcentaje de descuento"
    );
    if (requiredError) return requiredError;

    const discountValue = parseFloat(discount);
    if (isNaN(discountValue)) return "El porcentaje de descuento debe ser un número válido";

    // Validar que sea un número entero (sin decimales)
    if (!Number.isInteger(discountValue)) {
      return "El porcentaje de descuento debe ser un número entero";
    }

    if (discountValue < 0 || discountValue > 100) {
      return "El porcentaje de descuento debe estar entre 0 y 100";
    }
  },

  validatePoints: (points: string): string | undefined => {
    if (!points) return undefined; // Puntos es opcional

    const pointsValue = parseInt(points);
    if (isNaN(pointsValue)) return "Los puntos deben ser un número entero válido";
    if (pointsValue <= 0) return "Los puntos deben ser mayores a 0";
    if (pointsValue > 999999) return "Los puntos son demasiado altos";
  }
};