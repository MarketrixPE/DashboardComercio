import { StudyQuestion } from "../../../../../core/models/Studies";
import { commonValidations } from "../../../../../shared/components/Auth/Validations/commonValidations";

export const studiesValidations = {
  validateStudyTitle: (title: string): string | undefined => {
    const requiredError = commonValidations.validateRequired(title, 'título del estudio');
    if (requiredError) return requiredError;
    
    return commonValidations.validateLength(title, 3, 100, 'título del estudio');
  },

  validateStudyDescription: (description: string): string | undefined => {
    const requiredError = commonValidations.validateRequired(description, 'descripción del estudio');
    if (requiredError) return requiredError;
    
    return commonValidations.validateLength(description, 10, 500, 'descripción del estudio');
  },

  validateSampleSize: (sample: number | null): string | undefined => {
    if (sample === null) return "El tamaño de la muestra es requerido";
    if (sample <= 0) return "El tamaño de la muestra debe ser mayor a 0";
    if (sample > 10000) return "El tamaño de la muestra no puede exceder 10,000";
  },

  validateAgeRange: (
    startAge: number | null, 
    endAge: number | null
  ): string | undefined => {
    if (startAge !== null && endAge !== null) {
      if (startAge < 0 || endAge < 0) return "Las edades no pueden ser negativas";
      if (startAge > endAge) return "La edad inicial no puede ser mayor que la edad final";
      if (startAge > 100 || endAge > 100) return "Las edades no pueden ser mayores a 100";
    }
  },

  validateStudyImage: (
    image: File | string | null, 
    isEditing: boolean
  ): string | undefined => {
    if (!image && !isEditing) {
      return "La imagen del estudio es requerida";
    }
    
    if (image instanceof File) {
      const imageValidation = commonValidations.validateImage(image);
      if (imageValidation) return imageValidation;
    }
  },

  validateQuestion: (question: StudyQuestion): string | undefined => {
    // Validar pregunta
    if (!question.pregunta.trim()) {
      return "La pregunta no puede estar vacía";
    }

    if (question.pregunta.trim().length > 50) {
      return "La pregunta no puede exceder 50 caracteres";
    }

    // Validar respuestas
    const activeAnswers = question.answers.filter(a => !a.delete);
    
    if (activeAnswers.length < 2) {
      return "Cada pregunta debe tener al menos 2 respuestas";
    }

    if (activeAnswers.length > 4) {
      return "No pueden haber más de 4 respuestas por pregunta";
    }

    const invalidAnswer = activeAnswers.find(answer => 
      !answer.respuesta.trim() || answer.respuesta.trim().length > 50
    );

    if (invalidAnswer) {
      return "Las respuestas no pueden estar vacías y deben tener máximo 50 caracteres";
    }
  },

  validateQuestionSet: (questions: StudyQuestion[]): string | undefined => {
    const activeQuestions = questions.filter(q => !q.delete);

    if (activeQuestions.length === 0) {
      return "Debe haber al menos una pregunta en el estudio";
    }

    if (activeQuestions.length > 4) {
      return "No pueden haber más de 4 preguntas en el estudio";
    }

    for (const question of activeQuestions) {
      const questionError = studiesValidations.validateQuestion(question);
      if (questionError) return questionError;
    }
  },

  validateStudySegmentation: (
    type: number, 
    gender: string | null, 
    startAge: number | null, 
    endAge: number | null,
    selectedDistritos: number[]
  ): string | undefined => {
    if (type === 2) {
      if (gender && !['M', 'F'].includes(gender)) {
        return "Género inválido";
      }
  
      if (startAge === null) {
        return "La edad mínima es requerida para un estudio segmentado";
      }
      if (endAge === null) {
        return "La edad máxima es requerida para un estudio segmentado";
      }
  
      if (startAge < 14) {
        return "La edad mínima debe ser al menos 14 años";
      }
      if (endAge > 130) {
        return "La edad máxima no puede exceder 130 años";
      }
      const ageError = studiesValidations.validateAgeRange(startAge, endAge);
      if (ageError) return ageError;
  
      if (selectedDistritos.length === 0) {
        return "Debe seleccionar al menos un distrito para un estudio segmentado";
      }
      if (selectedDistritos.length > 5) {
        return "No pueden seleccionarse más de 5 distritos";
      }
    }
  },
};