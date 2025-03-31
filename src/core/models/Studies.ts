// Modelo para las respuestas de una pregunta
export interface StudyAnswer {
    id?: number;
    respuesta: string;
    total_respuestas?: number;
    delete?: boolean;
  }
  
  // Modelo para las preguntas del estudio
  export interface StudyQuestion {
    id?: number;
    pregunta: string;
    answers: StudyAnswer[];
    delete?: boolean;
  }
  
  // Modelo para las estadísticas de un estudio
  export interface StudyStats {
    total_preguntas: number;
    rango_edades: {
      [key: string]: number;
    };
    total_respuestas: {
      female_respuestas: number;
      male_respuestas: number;
    };
    respuestas_por_distrito: {
      id: number;
      nombre: string;
      cantidad_respuestas: number;
    }[];
    preguntas_y_respuestas?: {
      id: number;
      pregunta: string;
      respuestas: {
        id: number;
        respuesta: string;
        total_respuestas?: number;
      }[];
    }[];
  }
  
  // Modelo completo para un estudio
  export interface Study {
    id: number;
    titulo: string;
    descripcion: string;
    imagen: string;
    type: number; // 1=General, 2=Segmentado
    muestra: number;
    branch_id: number;
    created_at: string;
    age_start?: number | null;
    age_end?: number | null;
    gender?: string | null;
    district: string | null;
    
    // Campos para estadísticas
    total_preguntas?: number;
    rango_edades?: {
      [key: string]: number;
    };
    total_respuestas?: {
      female_respuestas: number;
      male_respuestas: number;
    };
    respuestas_por_distrito?: {
      id: number;
      nombre: string;
      cantidad_respuestas: number;
    }[];
    preguntas_y_respuestas?: {
      id: number;
      pregunta: string;
      respuestas: {
        id: number;
        respuesta: string;
        total_respuestas?: number;
      }[];
    }[];
  }
  
  // Modelo para crear o actualizar un estudio
  export interface StudyRequest {
    branch_id: string;
    titulo: string;
    descripcion: string;
    type: number;
    muestra: number;
    age_start: number | null;
    age_end: number | null;
    gender: string | null;
    district: string | null;
    imagen: string;
    questions: {
      id?: number;
      pregunta: string;
      delete?: boolean;
      answers: {
        id?: number;
        respuesta: string;
        delete?: boolean;
      }[];
    }[];
  }