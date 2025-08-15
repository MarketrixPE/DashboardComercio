// src/components/SmartAI/components/SmartAIRecommendations.tsx
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { SmartRecommendation, SmartAIFormatters } from '../../../../core/services/SmartAIService/SmartAIService';


interface SmartAIRecommendationsProps {
  recommendations: SmartRecommendation[];
  userRole?: number | null;
  companyName?: string | null;
}

const SmartAIRecommendations: React.FC<SmartAIRecommendationsProps> = ({ 
  recommendations, 
  userRole, 
  companyName 
}) => {
  const [expandedRec, setExpandedRec] = useState<number | null>(null);

  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  // Manejar acción de recomendación
  const handleRecommendationAction = (recommendation: SmartRecommendation) => {
    Swal.fire({
      title: `🚀 ${recommendation.name}`,
      html: `
        <div class="text-left space-y-3">
          <p class="text-gray-600">${recommendation.description}</p>
          
          <div class="bg-blue-50 p-3 rounded-lg">
            <h4 class="font-medium text-blue-900 mb-2">💡 ¿Por qué esta recomendación?</h4>
            <p class="text-blue-800 text-sm">${recommendation.reasoning}</p>
          </div>
          
          <div class="bg-green-50 p-3 rounded-lg">
            <h4 class="font-medium text-green-900 mb-2">📈 Impacto esperado:</h4>
            <ul class="text-green-800 text-sm space-y-1">
              ${Object.entries(recommendation.expectedImpact)
                .map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`)
                .join('')}
            </ul>
          </div>
          
          <div class="bg-yellow-50 p-3 rounded-lg">
            <h4 class="font-medium text-yellow-900 mb-2">⏱️ Plan de implementación:</h4>
            <p class="text-yellow-800 text-sm mb-2"><strong>Tiempo estimado:</strong> ${recommendation.implementation.timeline}</p>
            <p class="text-yellow-800 text-sm mb-2"><strong>Costo:</strong> ${recommendation.implementation.cost}</p>
            <ol class="text-yellow-800 text-sm space-y-1">
              ${recommendation.implementation.steps.map(step => `<li>${step}</li>`).join('')}
            </ol>
          </div>
        </div>
      `,
      width: '600px',
      showCancelButton: true,
      confirmButtonText: recommendation.actionButton.text,
      cancelButtonText: 'Cerrar',
      confirmButtonColor: getButtonColor(recommendation.actionButton.color),
      customClass: {
        popup: 'text-left'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí podrías integrar con los sistemas reales de creación
        Swal.fire({
          title: '🎯 Próximamente',
          text: `La funcionalidad para ${recommendation.actionButton.text.toLowerCase()} estará disponible pronto. Por ahora, puedes seguir los pasos manualmente.`,
          icon: 'info'
        });
      }
    });
  };

  // Obtener color del botón
  const getButtonColor = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'blue': '#3B82F6',
      'green': '#10B981',
      'purple': '#8B5CF6',
      'orange': '#F59E0B',
      'red': '#EF4444',
      'indigo': '#6366F1',
      'gray': '#6B7280'
    };
    return colorMap[color] || colorMap.blue;
  };

  // Obtener clase CSS para la prioridad
  const getPriorityClass = (priority: string) => {
    const { color } = SmartAIFormatters.formatPriority(priority);
    const classMap: { [key: string]: string } = {
      'red': 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800',
      'orange': 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800',
      'yellow': 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800',
      'green': 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800'
    };
    return classMap[color] || classMap.yellow;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <i className="fas fa-lightbulb text-yellow-500 mr-2"></i>
          Recomendaciones Smart para {companyName}
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {recommendations.length} recomendación{recommendations.length !== 1 ? 'es' : ''}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {recommendations.map((recommendation, index) => {
          const priorityFormat = SmartAIFormatters.formatPriority(recommendation.priority);
          const isExpanded = expandedRec === index;

          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Header de la recomendación */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className="text-2xl mr-3 mt-1">
                      {recommendation.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {recommendation.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {recommendation.description}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 border rounded-full text-xs font-medium ${getPriorityClass(recommendation.priority)}`}>
                          {priorityFormat.icon} {priorityFormat.text}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {SmartAIFormatters.formatConfidence(recommendation.confidence)} confianza
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contenido de la recomendación */}
              <div className="p-4">
                {/* Razonamiento */}
                <div className="mb-4">
                  <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    💡 ¿Por qué esta recomendación?
                  </h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {recommendation.reasoning}
                  </p>
                </div>

                {/* Timeline y costo */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <h6 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                      Tiempo
                    </h6>
                    <p className="text-sm text-gray-900 dark:text-white">
                      <i className="fas fa-clock text-gray-400 mr-1"></i>
                      {SmartAIFormatters.formatTimeline(recommendation.implementation.timeline)}
                    </p>
                  </div>
                  <div>
                    <h6 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                      Costo
                    </h6>
                    <p className="text-sm text-gray-900 dark:text-white">
                      <i className="fas fa-dollar-sign text-gray-400 mr-1"></i>
                      {recommendation.implementation.cost}
                    </p>
                  </div>
                </div>

                {/* Impacto esperado */}
                <div className="mb-4">
                  <h6 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                    📈 Impacto esperado
                  </h6>
                  <div className="space-y-1">
                    {Object.entries(recommendation.expectedImpact).slice(0, 2).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400 capitalize">
                          {key.replace(/_/g, ' ')}:
                        </span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Botón expandir/contraer */}
                <button
                  onClick={() => setExpandedRec(isExpanded ? null : index)}
                  className="w-full text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-4 py-2 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  {isExpanded ? (
                    <>
                      <i className="fas fa-chevron-up mr-1"></i>
                      Ver menos
                    </>
                  ) : (
                    <>
                      <i className="fas fa-chevron-down mr-1"></i>
                      Ver plan completo
                    </>
                  )}
                </button>

                {/* Contenido expandido */}
                {isExpanded && (
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-4 space-y-4">
                    {/* Pasos de implementación */}
                    <div>
                      <h6 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                        📋 Pasos de implementación:
                      </h6>
                      <ol className="space-y-2">
                        {recommendation.implementation.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start text-sm">
                            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5">
                              {stepIndex + 1}
                            </span>
                            <span className="text-gray-600 dark:text-gray-400">
                              {step}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Impacto completo */}
                    {Object.keys(recommendation.expectedImpact).length > 2 && (
                      <div>
                        <h6 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                          📊 Impacto detallado:
                        </h6>
                        <div className="grid grid-cols-1 gap-2">
                          {Object.entries(recommendation.expectedImpact).slice(2).map(([key, value]) => (
                            <div key={key} className="flex justify-between text-sm p-2 bg-gray-50 dark:bg-gray-700/50 rounded">
                              <span className="text-gray-600 dark:text-gray-400 capitalize">
                                {key.replace(/_/g, ' ')}:
                              </span>
                              <span className="text-gray-900 dark:text-white font-medium">
                                {value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Botón de acción */}
                <button
                  onClick={() => handleRecommendationAction(recommendation)}
                  className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors`}
                  style={{ backgroundColor: getButtonColor(recommendation.actionButton.color) }}
                >
                  <i className="fas fa-rocket mr-2"></i>
                  {recommendation.actionButton.text}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Información adicional */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-start">
          <i className="fas fa-info-circle text-blue-500 mr-3 mt-0.5"></i>
          <div>
            <h4 className="text-blue-800 dark:text-blue-200 font-medium mb-1">
              Recomendaciones personalizadas
            </h4>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              Estas recomendaciones están basadas en el análisis de tus datos reales de negocio. 
              {userRole === 2 ? ' Como administrador de comercio' : ' Como administrador de sucursal'}, 
              puedes implementar estas estrategias para hacer crecer tu negocio.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartAIRecommendations;