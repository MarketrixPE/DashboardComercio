import { commonValidations } from "../../../../../shared/components/Auth/Validations/commonValidations";
import { PromotionDetailsState } from "./PromotionsCommerce";

export const promotionsValidations = {
  validatePromotionTitle: (title: string): string | undefined => {
    const requiredError = commonValidations.validateRequired(title, "título de la promoción");
    if (requiredError) return requiredError;
    
    return commonValidations.validateLength(title, 3, 100, "título de la promoción");
  },

  validatePromotionDescription: (description: string): string | undefined => {
    const requiredError = commonValidations.validateRequired(description, "descripción de la promoción");
    if (requiredError) return requiredError;
     
    return commonValidations.validateLength(description, 10, 500, "descripción de la promoción");
  },

  validatePromotionImage: (image: File | null): string | undefined => {
    if (!image) {
      return "La imagen de la promoción es requerida";
    }
    const imageValidation = commonValidations.validateImage(image);
    if (imageValidation) return imageValidation;
  },

  validateAgeRange: (
    startAge: number | null,
    endAge: number | null,
    isSegmented: boolean
  ): string | undefined => {
    if (isSegmented) {
      if (startAge === null) {
        return "La edad mínima es requerida para una promoción segmentada";
      }
      if (endAge === null) {
        return "La edad máxima es requerida para una promoción segmentada";
      }
      if (startAge < 14) {
        return "La edad mínima debe ser al menos 14 años por derechos de privacidad";
      }
      if (endAge > 130) {
        return "La edad máxima no puede exceder 130 años";
      }
      if (startAge > endAge) {
        return "La edad inicial no puede ser mayor que la edad final";
      }
    }
  },

  validateGender: (gender: string | null): string | undefined => {
    if (gender && !["M", "F"].includes(gender)) {
      return "Género inválido";
    }
  },

  validateDistricts: (
    districts: number[],
    isSegmented: boolean
  ): string | undefined => {
    if (isSegmented) {
      if (districts.length === 0) {
        return "Debe seleccionar al menos un distrito para una promoción segmentada";
      }
      if (districts.length > 1) {
        return "Solo puede seleccionar un distrito para esta promoción";
      }
    }
  },

  validatePromotion: (promotion: PromotionDetailsState, selectedImage: File | null, selectedDistritos: number[]): string | undefined => {
    const titleError = promotionsValidations.validatePromotionTitle(promotion.titulo);
    if (titleError) return titleError;

    const descError = promotionsValidations.validatePromotionDescription(promotion.descripcion);
    if (descError) return descError;

    const imageError = promotionsValidations.validatePromotionImage(selectedImage);
    if (imageError) return imageError;

    const ageError = promotionsValidations.validateAgeRange(
      promotion.age_start,
      promotion.age_end,
      promotion.promocionType === "segmentada"
    );
    if (ageError) return ageError;

    const genderError = promotionsValidations.validateGender(promotion.gender);
    if (genderError) return genderError;

    const districtError = promotionsValidations.validateDistricts(
      selectedDistritos,
      promotion.promocionType === "segmentada"
    );
    if (districtError) return districtError;
  },
};