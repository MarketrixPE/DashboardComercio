// src/core/services/SmartAIService/SmartAIService.ts
import { AxiosError } from "axios";
import { commerceClient } from "../../Interceptors/apiClient";
import { HelperService } from "../HelperService";

const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL;

/**
 * Tipos de datos para Smart AI
 */
export interface SmartAIQuery {
  query: string;
  conversation_context?: ConversationContext;
}

export interface ConversationContext {
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
    sql_used?: string;
  }>;
  messageCount: number;
}

export interface SmartAIResponse {
  type: 'analytics' | 'advice' | 'mixed' | 'out_of_scope' | 'general';
  text: string;
  sql: string | null;
  results: any[] | null;
  charts: ChartConfig[];
  insights: Insight[];
  smartRecommendations: SmartRecommendation[];
  suggestions?: string[];
  confidence: number;
  context_used: boolean;
  real_data: boolean;
  mock_data: boolean;
  metadata: {
    response_time: number;
    query_type: string;
    confidence: number;
    processed_at: string;
    ai_version: string;
    data_source: string;
    user_context: {
      role: string;
      business: string;
      branches_analyzed: number;
    };
    sql_executed: boolean;
    real_results_count: number;
  };
}

export interface ChartConfig {
  type: 'bar' | 'line' | 'pie' | 'doughnut' | 'area';
  title: string;
  data: {
    labels: string[];
    datasets: Array<{
      label?: string;
      data: number[];
      backgroundColor?: string | string[];
      borderColor?: string;
      fill?: boolean;
    }>;
  };
}

export interface Insight {
  type: string;
  text: string;
}

export interface SmartRecommendation {
  tool: string;
  name: string;
  description: string;
  icon: string;
  priority: 'urgente' | 'alta' | 'media' | 'baja';
  confidence: number;
  reasoning: string;
  implementation: {
    steps: string[];
    timeline: string;
    cost: string;
  };
  expectedImpact: {
    [key: string]: string;
  };
  actionButton: {
    text: string;
    action: string;
    color: string;
  };
}

export interface SmartAICapabilities {
  version: string;
  status: string;
  user_context: {
    role: string;
    companies: number;
    branches: number;
    business_names: string[];
  };
  capabilities: Array<{
    category: string;
    description: string;
    examples: string[];
    tools?: string[];
  }>;
  data_sources: string[];
}

export interface SmartAIFeedback {
  query: string;
  response_id?: string;
  rating: number; // 1-5
  feedback_text?: string;
}

/**
 * Manejo centralizado de errores de API
 */
const handleSmartAIError = (error: any, defaultMessage: string): never => {
  let errorMessage = defaultMessage;

  const errorMessages: { [key: string]: string } = {
    "Token de autenticación requerido": "Debe iniciar sesión para usar Smart AI.",
    "Query es requerido y debe ser un string válido": "Debe escribir una consulta válida.",
    "Query demasiado largo": "La consulta es demasiado larga. Máximo 1000 caracteres.",
    "Error procesando consulta con datos reales": "Error procesando su consulta. Intente reformularla.",
    "Usuario sin permisos": "No tiene permisos para acceder a esta información.",
    "Base de datos no disponible": "Servicio temporalmente no disponible. Intente más tarde."
  };

  if (error instanceof AxiosError && error.response) {
    const apiError = error.response.data?.error;
    errorMessage = errorMessages[apiError] || apiError || defaultMessage;
  }

  console.error('[SmartAI] Error:', errorMessage);
  throw new Error(errorMessage);
};

/**
 * Validar datos antes de enviar al API
 */
const validateQuery = (query: string): void => {
  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    throw new Error("Debe escribir una consulta válida.");
  }

  if (query.length > 1000) {
    throw new Error("La consulta es demasiado larga. Máximo 1000 caracteres.");
  }
};

/**
 * Verificar autenticación antes de hacer requests
 */
const checkAuthentication = (): void => {
  const token = HelperService.getAccessToken();
  if (!token) {
    throw new Error("Debe iniciar sesión para usar Smart AI.");
  }
};

/**
 * Procesar consulta con Smart AI
 */
export const processSmartAIQuery = async (
  query: string, 
  conversationContext?: ConversationContext
): Promise<SmartAIResponse> => {
  checkAuthentication();
  validateQuery(query);

  try {
    const requestData: SmartAIQuery = {
      query: query.trim(),
      conversation_context: conversationContext
    };

    console.log('[SmartAI] Enviando consulta:', {
      query: query.substring(0, 100),
      hasContext: !!conversationContext,
      userRole: HelperService.getUserRole(),
      businessName: HelperService.getCompanyName()
    });

    const { data } = await commerceClient.post(
      `${WEBSOCKET_URL}/api/smart-ai/query`,
      requestData
    );

    if (data.success && data.data) {
      console.log('[SmartAI] Respuesta exitosa:', {
        type: data.data.type,
        hasResults: data.data.results?.length > 0,
        hasCharts: data.data.charts?.length > 0,
        hasRecommendations: data.data.smartRecommendations?.length > 0,
        responseTime: data.data.metadata?.response_time
      });

      return data.data;
    }

    throw new Error("No se pudo procesar la consulta.");
  } catch (error) {
    return handleSmartAIError(error, "Error procesando consulta inteligente.");
  }
};

/**
 * Obtener capacidades del Smart AI
 */
export const getSmartAICapabilities = async (): Promise<SmartAICapabilities> => {
  checkAuthentication();

  try {
    const { data } = await commerceClient.get(
      `${WEBSOCKET_URL}/api/smart-ai/capabilities`
    );

    if (data.success && data.data) {
      return data.data;
    }

    throw new Error("No se pudieron obtener las capacidades del sistema.");
  } catch (error) {
    return handleSmartAIError(error, "Error obteniendo capacidades del Smart AI.");
  }
};

/**
 * Enviar feedback sobre una respuesta
 */
export const sendSmartAIFeedback = async (feedback: SmartAIFeedback): Promise<void> => {
  checkAuthentication();

  if (!feedback.rating || feedback.rating < 1 || feedback.rating > 5) {
    throw new Error("La calificación debe estar entre 1 y 5.");
  }

  try {
    const { data } = await commerceClient.post(
      `${WEBSOCKET_URL}/api/smart-ai/feedback`,
      feedback
    );

    if (data.success) {
      console.log('[SmartAI] Feedback enviado exitosamente');
      return;
    }

    throw new Error("No se pudo enviar el feedback.");
  } catch (error) {
    return handleSmartAIError(error, "Error enviando feedback.");
  }
};

/**
 * Verificar estado del servicio Smart AI
 */
export const checkSmartAIHealth = async (): Promise<boolean> => {
  try {
    const { data } = await commerceClient.get(
      `${WEBSOCKET_URL}/api/smart-ai/health`
    );

    return data.success && data.status === 'healthy';
  } catch (error) {
    console.warn('[SmartAI] Health check failed:', error);
    return false;
  }
};

/**
 * Utilidades para el contexto de conversación
 */
export class ConversationManager {
  private static readonly MAX_MESSAGES = 10;
  private static readonly STORAGE_KEY = 'smartai_conversation_context';

  /**
   * Agregar mensaje al contexto
   */
  static addMessage(
    context: ConversationContext | null,
    role: 'user' | 'assistant',
    content: string,
    sqlUsed?: string
  ): ConversationContext {
    const newMessage = {
      role,
      content,
      timestamp: new Date().toISOString(),
      ...(sqlUsed && { sql_used: sqlUsed })
    };

    if (!context) {
      return {
        messages: [newMessage],
        messageCount: 1
      };
    }

    const updatedMessages = [...context.messages, newMessage];
    
    // Mantener solo los últimos MAX_MESSAGES mensajes
    if (updatedMessages.length > this.MAX_MESSAGES) {
      updatedMessages.splice(0, updatedMessages.length - this.MAX_MESSAGES);
    }

    return {
      messages: updatedMessages,
      messageCount: updatedMessages.length
    };
  }

  /**
   * Limpiar contexto de conversación
   */
  static clearContext(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }

  /**
   * Guardar contexto en localStorage
   */
  static saveContext(context: ConversationContext): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(context));
      } catch (error) {
        console.warn('[SmartAI] No se pudo guardar el contexto:', error);
      }
    }
  }

  /**
   * Cargar contexto desde localStorage
   */
  static loadContext(): ConversationContext | null {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        return saved ? JSON.parse(saved) : null;
      } catch (error) {
        console.warn('[SmartAI] No se pudo cargar el contexto:', error);
        return null;
      }
    }
    return null;
  }

  /**
   * Obtener resumen del contexto para debugging
   */
  static getContextSummary(context: ConversationContext | null): string {
    if (!context || context.messages.length === 0) {
      return "Sin contexto previo";
    }

    const lastMessage = context.messages[context.messages.length - 1];
    const messageCount = context.messages.length;
    
    return `${messageCount} mensaje(s). Último: ${lastMessage.role} - ${lastMessage.content.substring(0, 50)}...`;
  }
}

/**
 * Utilidades para formatear respuestas
 */
export class SmartAIFormatters {
  /**
   * Formatear prioridad para mostrar
   */
  static formatPriority(priority: string): { text: string; color: string; icon: string } {
    const priorityMap = {
      'urgente': { text: 'Urgente', color: 'red', icon: '🚨' },
      'alta': { text: 'Alta', color: 'orange', icon: '⚡' },
      'media': { text: 'Media', color: 'yellow', icon: '📋' },
      'baja': { text: 'Baja', color: 'green', icon: '📝' }
    };

    return priorityMap[priority as keyof typeof priorityMap] || priorityMap.media;
  }

  /**
   * Formatear tiempo de implementación
   */
  static formatTimeline(timeline: string): string {
    return timeline
      .replace(/minutos?/g, 'min')
      .replace(/horas?/g, 'h')
      .replace(/días?/g, 'd')
      .replace(/semanas?/g, 'sem');
  }

  /**
   * Formatear confianza como porcentaje
   */
  static formatConfidence(confidence: number): string {
    return `${Math.round(confidence * 100)}%`;
  }
}