// src/components/SmartAI/SmartAI.tsx
import React, { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';
import { HelperService } from '../../../core/services/HelperService';
import { SmartAIFormatters } from '../../../core/services/SmartAIService/SmartAIService';
import { LoadingDots } from '../../../shared/components/Atoms/LoadingDots/LoadingDots';
import { useSmartAI } from '../../../shared/hooks/useSmartAI';
import SmartAIChart from '../../../shared/components/Organisms/SmartAI/SmartAIChart';
import SmartAIRecommendations from '../../../shared/components/Organisms/SmartAI/SmartAIRecommendations';
import SmartAIResults from '../../../shared/components/Organisms/SmartAI/SmartAIResults';


const SmartAI: React.FC = () => {
  // Estados locales
  const [query, setQuery] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [feedbackText, setFeedbackText] = useState('');

  // Refs
  const queryInputRef = useRef<HTMLTextAreaElement>(null);
  const responseRef = useRef<HTMLDivElement>(null);

  // Hook Smart AI
  const {
    isLoading,
    error,
    response,
    capabilities,
    conversationContext,
    isHealthy,
    sendQuery,
    clearConversation,
    sendFeedback,
    hasResults,
    hasCharts,
    hasRecommendations,
    isOutOfScope,
    responseTime,
    canSendQuery
  } = useSmartAI();

  // Info del usuario
  const userName = HelperService.getUserName();
  const companyName = HelperService.getCompanyName();
  const userRole = HelperService.getUserRole();

  // Auto-scroll al recibir respuesta
  useEffect(() => {
    if (response && responseRef.current) {
      responseRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [response]);

  // Limpiar formulario al enviar
  const handleSendQuery = async () => {
    if (!query.trim() || !canSendQuery) return;

    const trimmedQuery = query.trim();
    setQuery(''); // Limpiar inmediatamente
    
    try {
      await sendQuery(trimmedQuery);
    } catch (error) {
      // El error ya se maneja en el hook
      console.error('Error enviando consulta:', error);
    }
  };

  // Manejar Enter para enviar
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendQuery();
    }
  };

  // Enviar feedback
  const handleSendFeedback = async () => {
    if (rating === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Calificación requerida',
        text: 'Por favor selecciona una calificación del 1 al 5.'
      });
      return;
    }

    try {
      await sendFeedback({
        rating,
        feedback_text: feedbackText.trim() || undefined
      });

      Swal.fire({
        icon: 'success',
        title: 'Feedback enviado',
        text: '¡Gracias por tu retroalimentación!',
        timer: 2000,
        showConfirmButton: false
      });

      setShowFeedback(false);
      setRating(0);
      setFeedbackText('');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo enviar el feedback. Intenta nuevamente.'
      });
    }
  };

  // Usar sugerencia
  const handleUseSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    queryInputRef.current?.focus();
  };

  // Renderizar estado de salud del servicio
  const renderHealthStatus = () => {
    if (!isHealthy) {
      return (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg dark:bg-red-900/20 dark:border-red-800">
          <div className="flex items-center">
            <i className="fas fa-exclamation-triangle text-red-500 mr-2"></i>
            <span className="text-red-700 dark:text-red-300">
              Smart AI temporalmente no disponible. Intenta más tarde.
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  // Renderizar header con info del usuario
  const renderHeader = () => (
    <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg border">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            🧠 Smart AI Assistant
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Hola <strong>{userName}</strong>, soy Kira, tu asistente inteligente para{' '}
            <strong>{companyName}</strong>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {userRole === 2 ? 'Administrador de Comercio' : 'Administrador de Sucursal'} • 
            Datos 100% reales de tu negocio
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          {conversationContext && conversationContext.messages.length > 0 && (
            <button
              onClick={clearConversation}
              className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
              title="Limpiar conversación"
            >
              <i className="fas fa-trash mr-2"></i>
              Limpiar
            </button>
          )}
          
          <div className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            isHealthy 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
          }`}>
            <div className={`w-2 h-2 rounded-full mr-2 ${
              isHealthy ? 'bg-green-400' : 'bg-red-400'
            }`}></div>
            {isHealthy ? 'En línea' : 'Desconectado'}
          </div>
        </div>
      </div>
    </div>
  );

  // Renderizar sugerencias
  const renderSuggestions = () => {
    const suggestions = response?.suggestions || capabilities?.capabilities
      .flatMap(cap => cap.examples)
      .slice(0, 4) || [
      'Analiza mis ventas de esta semana',
      '¿Cómo puedo mejorar mi negocio?',
      'Muéstrame mis cupones más exitosos',
      'Recomiéndame una estrategia de crecimiento'
    ];

    return (
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          💡 Consultas sugeridas:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleUseSuggestion(suggestion)}
              disabled={isLoading}
              className="text-left p-3 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className="fas fa-lightbulb text-blue-500 mr-2"></i>
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Renderizar input de consulta
  const renderQueryInput = () => (
    <div className="mb-6">
      <div className="relative">
        <textarea
          ref={queryInputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={`Pregúntame sobre ${companyName}... Ejemplo: "¿Cómo están mis ventas?" o "Recomiéndame estrategias para crecer"`}
          disabled={!canSendQuery}
          className="w-full p-4 pr-16 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white resize-none disabled:opacity-50 disabled:cursor-not-allowed"
          rows={3}
          maxLength={1000}
        />
        
        <div className="absolute bottom-3 right-3 flex items-center space-x-2">
          {query.length > 0 && (
            <span className={`text-xs ${
              query.length > 900 ? 'text-red-500' : 'text-gray-400'
            }`}>
              {query.length}/1000
            </span>
          )}
          
          <button
            onClick={handleSendQuery}
            disabled={!canSendQuery || !query.trim()}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Enviar consulta (Enter)"
          >
            {isLoading ? (
              <div className="w-4 h-4">
                <LoadingDots />
              </div>
            ) : (
              <i className="fas fa-paper-plane"></i>
            )}
          </button>
        </div>
      </div>
      
      {!isHealthy && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          <i className="fas fa-exclamation-circle mr-1"></i>
          Servicio no disponible temporalmente
        </p>
      )}
    </div>
  );

  // Renderizar respuesta
  const renderResponse = () => {
    if (!response) return null;

    return (
      <div ref={responseRef} className="space-y-6">
        {/* Respuesta principal */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-3">
                <i className="fas fa-robot text-blue-600 dark:text-blue-400"></i>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Kira</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {response.type === 'analytics' && '📊 Análisis de datos'}
                  {response.type === 'advice' && '💡 Recomendaciones'}
                  {response.type === 'mixed' && '🔍 Análisis + Consejos'}
                  {response.type === 'out_of_scope' && '❌ Fuera de alcance'}
                  {response.type === 'general' && '💬 Respuesta general'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
              {response.real_data && (
                <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-2 py-1 rounded">
                  ✅ Datos reales
                </span>
              )}
              {responseTime && (
                <span>{responseTime}ms</span>
              )}
              <span>{SmartAIFormatters.formatConfidence(response.confidence)}</span>
            </div>
          </div>

          {/* Texto de respuesta */}
          <div className="prose dark:prose-invert max-w-none mb-4">
            <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
              {response.text}
            </div>
          </div>

          {/* Insights */}
          {response.insights && response.insights.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                🔍 Insights:
              </h4>
              <div className="space-y-1">
                {response.insights.map((insight, index) => (
                  <div key={index} className="text-sm text-gray-600 dark:text-gray-400">
                    • {insight.text}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
            <div className="hidden items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
              {response.sql && (
                <button
                  onClick={() => {
                    Swal.fire({
                      title: 'SQL Ejecutado',
                      html: `<pre class="text-left text-sm bg-gray-100 p-3 rounded overflow-x-auto">${response.sql}</pre>`,
                      width: '80%',
                      showConfirmButton: false,
                      showCloseButton: true
                    });
                  }}
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <i className="fas fa-code mr-1"></i>
                  Ver SQL
                </button>
              )}
              {hasResults && (
                <span>
                  <i className="fas fa-table mr-1"></i>
                  {response.results?.length} resultado(s)
                </span>
              )}
            </div>

            <button
              onClick={() => setShowFeedback(true)}
              className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <i className="fas fa-thumbs-up mr-1"></i>
              Calificar respuesta
            </button>
          </div>
        </div>

        {/* Resultados de datos */}
        {hasResults && (
          <SmartAIResults 
            results={response.results!} 
            sql={response.sql}
            queryType={response.type}
          />
        )}

        {/* Gráficos */}
        {hasCharts && (
          <div className="space-y-4">
            {response.charts.map((chart, index) => (
              <SmartAIChart key={index} chartConfig={chart} />
            ))}
          </div>
        )}

        {/* Recomendaciones Smart */}
        {hasRecommendations && (
          <SmartAIRecommendations 
            recommendations={response.smartRecommendations} 
            userRole={userRole}
            companyName={companyName}
          />
        )}

        {/* Sugerencias de seguimiento para respuestas out of scope */}
        {isOutOfScope && response.suggestions && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
              💡 Prueba preguntando sobre:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {response.suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleUseSuggestion(suggestion)}
                  className="text-left text-sm text-yellow-700 dark:text-yellow-300 hover:text-yellow-900 dark:hover:text-yellow-100 p-2 rounded hover:bg-yellow-100 dark:hover:bg-yellow-900/30"
                >
                  • {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Renderizar modal de feedback
  const renderFeedbackModal = () => {
    if (!showFeedback) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Califica esta respuesta
          </h3>
          
          {/* Rating stars */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              ¿Qué tan útil fue esta respuesta?
            </p>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl ${
                    star <= rating 
                      ? 'text-yellow-400' 
                      : 'text-gray-300 dark:text-gray-600'
                  } hover:text-yellow-400 transition-colors`}
                >
                  <i className="fas fa-star"></i>
                </button>
              ))}
            </div>
          </div>

          {/* Feedback text */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Comentarios adicionales (opcional)
            </label>
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="¿Cómo podemos mejorar?"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              rows={3}
              maxLength={500}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowFeedback(false);
                setRating(0);
                setFeedbackText('');
              }}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              Cancelar
            </button>
            <button
              onClick={handleSendFeedback}
              disabled={rating === 0}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Enviar feedback
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Renderizar error
  const renderError = () => {
    if (!error) return null;

    return (
      <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <div className="flex items-start">
          <i className="fas fa-exclamation-circle text-red-500 mr-3 mt-0.5"></i>
          <div>
            <h4 className="text-red-800 dark:text-red-200 font-medium mb-1">
              Error procesando consulta
            </h4>
            <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  };

  // Si no está autenticado
  if (!HelperService.isAuthenticated()) {
    return (
      <div className="container mx-auto my-8 p-6">
        <div className="text-center py-12">
          <i className="fas fa-lock text-4xl text-gray-400 mb-4"></i>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Acceso requerido
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Debes iniciar sesión para usar Smart AI
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-8 px-4 max-w-6xl">
      {renderHeader()}
      {renderHealthStatus()}
      {renderError()}
      {!response && renderSuggestions()}
      {renderQueryInput()}
      {renderResponse()}
      {renderFeedbackModal()}
    </div>
  );
};

export default SmartAI;