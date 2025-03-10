// En el archivo de interfaces (models/surveys.ts)
export interface SurveyStats {
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
  // Agregar la nueva propiedad
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

export interface Answer {
  id?: number;
  delete?: boolean;
  respuesta: string;
}

export interface Question {
  id?: number;
  delete?: boolean;
  pregunta: string;
  answers: Answer[];
}

export interface Survey {
  id: number;
  titulo: string;
  imagen: string;
  puntos: number;
  activo: number;
  sucursal: number;
  created_at: string;
  questions?: Question[];
  preguntas_y_respuestas?: {
    id: number;
    pregunta: string;
    respuestas: {
      id: number;
      respuesta: string;
      total_respuestas?: number;
    }[];
  }[];
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
}
