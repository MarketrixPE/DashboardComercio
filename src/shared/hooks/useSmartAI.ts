// src/core/hooks/useSmartAI.ts
import { useState, useCallback, useEffect } from "react";

import { HelperService } from "../../core/services/HelperService";
import {
  SmartAIResponse,
  SmartAICapabilities,
  ConversationContext,
  SmartAIFeedback,
  ConversationManager,
  checkSmartAIHealth,
  getSmartAICapabilities,
  processSmartAIQuery,
  sendSmartAIFeedback,
} from "../../core/services/SmartAIService/SmartAIService";

interface UseSmartAIReturn {
  // Estados principales
  isLoading: boolean;
  error: string | null;
  response: SmartAIResponse | null;
  capabilities: SmartAICapabilities | null;
  conversationContext: ConversationContext | null;
  isHealthy: boolean;

  // Funciones principales
  sendQuery: (query: string) => Promise<void>;
  clearConversation: () => void;
  sendFeedback: (feedback: Omit<SmartAIFeedback, "query">) => Promise<void>;

  // Estados derivados
  hasResults: boolean;
  hasCharts: boolean;
  hasRecommendations: boolean;
  isOutOfScope: boolean;
  responseTime: number | null;

  // Utilidades
  getQueryHistory: () => string[];
  canSendQuery: boolean;
}

export const useSmartAI = (): UseSmartAIReturn => {
  // Estados principales
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<SmartAIResponse | null>(null);
  const [capabilities, setCapabilities] = useState<SmartAICapabilities | null>(
    null
  );
  const [conversationContext, setConversationContext] =
    useState<ConversationContext | null>(null);
  const [isHealthy, setIsHealthy] = useState(true);
  const [lastQuery, setLastQuery] = useState<string>("");

  // Cargar contexto guardado al inicializar
  useEffect(() => {
    const savedContext = ConversationManager.loadContext();
    if (savedContext) {
      setConversationContext(savedContext);
      console.log(
        "[useSmartAI] Contexto cargado:",
        ConversationManager.getContextSummary(savedContext)
      );
    }
  }, []);

  // Verificar salud del servicio al inicializar
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const healthy = await checkSmartAIHealth();
        setIsHealthy(healthy);
      } catch (error) {
        console.warn("[useSmartAI] Health check failed");
        setIsHealthy(false);
      }
    };

    checkHealth();
  }, []);

  // Cargar capacidades al inicializar
  useEffect(() => {
    const loadCapabilities = async () => {
      if (!HelperService.isAuthenticated()) return;

      try {
        const caps = await getSmartAICapabilities();
        setCapabilities(caps);
        console.log("[useSmartAI] Capacidades cargadas:", caps);
      } catch (error) {
        console.warn("[useSmartAI] No se pudieron cargar capacidades:", error);
      }
    };

    loadCapabilities();
  }, []);

  /**
   * Enviar consulta al Smart AI
   */
  const sendQuery = useCallback(
    async (query: string) => {
      if (!HelperService.isAuthenticated()) {
        setError("Debe iniciar sesión para usar Smart AI");
        return;
      }

      if (!query.trim()) {
        setError("Debe escribir una consulta");
        return;
      }

      setIsLoading(true);
      setError(null);
      setLastQuery(query);

      try {
        console.log("[useSmartAI] Enviando consulta:", {
          query: query.substring(0, 100),
          hasContext: !!conversationContext,
          userType: HelperService.getUserType(),
          userName: HelperService.getUserName(),
        });

        // Agregar mensaje del usuario al contexto
        const updatedContext = ConversationManager.addMessage(
          conversationContext,
          "user",
          query
        );

        // Procesar consulta
        const smartResponse = await processSmartAIQuery(
          query,
          conversationContext ?? undefined
        );

        // Agregar respuesta del asistente al contexto
        const finalContext = ConversationManager.addMessage(
          updatedContext,
          "assistant",
          smartResponse.text,
          smartResponse.sql || undefined
        );

        // Actualizar estados
        setResponse(smartResponse);
        setConversationContext(finalContext);

        // Guardar contexto
        ConversationManager.saveContext(finalContext);

        console.log("[useSmartAI] Consulta procesada exitosamente:", {
          type: smartResponse.type,
          hasResults: Array.isArray(smartResponse.results) && smartResponse.results.length > 0,
          hasCharts: smartResponse.charts?.length > 0,
          hasRecommendations: smartResponse.smartRecommendations?.length > 0,
          responseTime: smartResponse.metadata?.response_time,
          realData: smartResponse.real_data,
        });
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Error procesando consulta";
        console.error("[useSmartAI] Error en consulta:", errorMessage);
        setError(errorMessage);
        setResponse(null);
      } finally {
        setIsLoading(false);
      }
    },
    [conversationContext]
  );

  /**
   * Limpiar conversación
   */
  const clearConversation = useCallback(() => {
    setConversationContext(null);
    setResponse(null);
    setError(null);
    setLastQuery("");
    ConversationManager.clearContext();
    console.log("[useSmartAI] Conversación limpiada");
  }, []);

  /**
   * Enviar feedback sobre la respuesta
   */
  const sendFeedback = useCallback(
    async (feedback: Omit<SmartAIFeedback, "query">) => {
      if (!lastQuery) {
        throw new Error("No hay consulta para calificar");
      }

      try {
        await sendSmartAIFeedback({
          ...feedback,
          query: lastQuery,
        });

        console.log("[useSmartAI] Feedback enviado:", {
          rating: feedback.rating,
          hasText: !!feedback.feedback_text,
        });
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Error enviando feedback";
        console.error("[useSmartAI] Error enviando feedback:", errorMessage);
        throw new Error(errorMessage);
      }
    },
    [lastQuery]
  );

  /**
   * Obtener historial de consultas del usuario
   */
  const getQueryHistory = useCallback((): string[] => {
    if (!conversationContext) return [];

    return conversationContext.messages
      .filter((msg) => msg.role === "user")
      .map((msg) => msg.content)
      .slice(-5); // Últimas 5 consultas
  }, [conversationContext]);

  // Estados derivados
  const hasResults = !!(response?.results && response.results.length > 0);
  const hasCharts = !!(response?.charts && response.charts.length > 0);
  const hasRecommendations = !!(
    response?.smartRecommendations && response.smartRecommendations.length > 0
  );
  const isOutOfScope = response?.type === "out_of_scope";
  const responseTime = response?.metadata?.response_time || null;
  const canSendQuery =
    !isLoading && isHealthy && HelperService.isAuthenticated();

  return {
    // Estados principales
    isLoading,
    error,
    response,
    capabilities,
    conversationContext,
    isHealthy,

    // Funciones principales
    sendQuery,
    clearConversation,
    sendFeedback,

    // Estados derivados
    hasResults,
    hasCharts,
    hasRecommendations,
    isOutOfScope,
    responseTime,

    // Utilidades
    getQueryHistory,
    canSendQuery,
  };
};
