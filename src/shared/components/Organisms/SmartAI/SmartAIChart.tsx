// // src/components/SmartAI/components/SmartAIChart.tsx
// import React from 'react';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// } from 'chart.js';
// import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
// import { ChartConfig } from '../../../../core/services/SmartAIService/SmartAIService';

// // Registrar componentes de Chart.js
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// );

// interface SmartAIChartProps {
//   chartConfig: ChartConfig;
// }

// const SmartAIChart: React.FC<SmartAIChartProps> = ({ chartConfig }) => {
//   // Validar props antes de continuar
//   if (!chartConfig) {
//     return (
//       <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-6">
//         <div className="flex items-center justify-center h-64 text-gray-500">
//           <div className="text-center">
//             <i className="fas fa-exclamation-triangle text-4xl mb-2 text-yellow-500"></i>
//             <p>Configuración de gráfico no disponible</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Validar datos del gráfico
//   if (!chartConfig.data || !chartConfig.data.datasets || !Array.isArray(chartConfig.data.datasets)) {
//     return (
//       <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-6">
//         <div className="flex items-center justify-center h-64 text-gray-500">
//           <div className="text-center">
//             <i className="fas fa-chart-bar text-4xl mb-2"></i>
//             <p>No hay datos disponibles para mostrar</p>
//             <p className="text-sm mt-1">Datos del gráfico incompletos o malformados</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Opciones comunes para todos los gráficos
//   const commonOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'top' as const,
//         labels: {
//           usePointStyle: true,
//           padding: 20,
//           color: '#374151', // text-gray-700
//         },
//       },
//       title: {
//         display: true,
//         text: chartConfig.title || 'Gráfico sin título',
//         font: {
//           size: 16,
//           weight: 'bold' as const,
//         },
//         color: '#111827', // text-gray-900
//         padding: {
//           bottom: 20,
//         },
//       },
//       tooltip: {
//         backgroundColor: 'rgba(0, 0, 0, 0.8)',
//         titleColor: '#ffffff',
//         bodyColor: '#ffffff',
//         cornerRadius: 8,
//         padding: 12,
//         displayColors: true,
//       },
//     },
//   };

//   // Opciones específicas para gráficos de barras y líneas
//   const cartesianOptions = {
//     ...commonOptions,
//     scales: {
//       x: {
//         grid: {
//           color: 'rgba(0, 0, 0, 0.1)',
//         },
//         ticks: {
//           color: '#6B7280', // text-gray-500
//         },
//       },
//       y: {
//         grid: {
//           color: 'rgba(0, 0, 0, 0.1)',
//         },
//         ticks: {
//           color: '#6B7280', // text-gray-500
//         },
//         beginAtZero: true,
//       },
//     },
//   };

//   // Renderizar el gráfico según el tipo
//   const renderChart = () => {
//     const { type, data } = chartConfig;

//     try {
//       switch (type) {
//         case 'bar':
//           return (
//             <Bar 
//               data={data} 
//               options={cartesianOptions}
//               height={300}
//             />
//           );
        
//         case 'line':
//           return (
//             <Line 
//               data={data} 
//               options={cartesianOptions}
//               height={300}
//             />
//           );
        
//         case 'pie':
//           return (
//             <Pie 
//               data={data} 
//               options={commonOptions}
//               height={300}
//             />
//           );
        
//         case 'doughnut':
//           return (
//             <Doughnut 
//               data={data} 
//               options={commonOptions}
//               height={300}
//             />
//           );
        
//         case 'area':
//           // Para gráficos de área, usar Line con fill
//           const areaData = {
//             ...data,
//             datasets: data.datasets.map(dataset => ({
//               ...dataset,
//               fill: true,
//               backgroundColor: dataset.backgroundColor || 'rgba(59, 130, 246, 0.1)',
//             }))
//           };
          
//           return (
//             <Line 
//               data={areaData} 
//               options={cartesianOptions}
//               height={300}
//             />
//           );
        
//         default:
//           return (
//             <div className="flex items-center justify-center h-64 text-gray-500">
//               <div className="text-center">
//                 <i className="fas fa-chart-bar text-4xl mb-2"></i>
//                 <p>Tipo de gráfico no soportado: {type}</p>
//               </div>
//             </div>
//           );
//       }
//     } catch (error) {
//       console.error('Error renderizando gráfico:', error);
//       return (
//         <div className="flex items-center justify-center h-64 text-red-500">
//           <div className="text-center">
//             <i className="fas fa-exclamation-circle text-4xl mb-2"></i>
//             <p>Error al renderizar el gráfico</p>
//             <p className="text-sm mt-1">Por favor, verifica los datos del gráfico</p>
//           </div>
//         </div>
//       );
//     }
//   };

//   // Obtener icono según el tipo de gráfico
//   const getChartIcon = () => {
//     const iconMap: Record<string, string> = {
//       bar: 'fa-chart-bar',
//       line: 'fa-chart-line',
//       pie: 'fa-chart-pie',
//       doughnut: 'fa-chart-pie',
//       area: 'fa-chart-area'
//     };
    
//     return iconMap[chartConfig.type] || 'fa-chart-bar';
//   };

//   // Obtener estadísticas del gráfico - VERSIÓN CORREGIDA
//   const getChartStats = () => {
//     try {
//       const { data } = chartConfig;
      
//       // Validaciones de seguridad
//       if (!data || !data.datasets || !Array.isArray(data.datasets)) {
//         return { totalDataPoints: 0, maxValue: 0, minValue: 0 };
//       }

//       // Filtrar datasets válidos
//       const validDatasets = data.datasets.filter(dataset => 
//         dataset && 
//         Array.isArray(dataset.data) && 
//         dataset.data.length > 0
//       );

//       if (validDatasets.length === 0) {
//         return { totalDataPoints: 0, maxValue: 0, minValue: 0 };
//       }

//       // Calcular estadísticas
//       const totalDataPoints = validDatasets.reduce((sum, dataset) => {
//         return sum + (dataset.data?.length || 0);
//       }, 0);

//       // Obtener todos los valores numéricos
//       const allValues = validDatasets.flatMap(dataset => 
//         dataset.data.filter(value => typeof value === 'number' && !isNaN(value))
//       );

//       if (allValues.length === 0) {
//         return { totalDataPoints, maxValue: 0, minValue: 0 };
//       }

//       const maxValue = Math.max(...allValues);
//       const minValue = Math.min(...allValues);
      
//       return { 
//         totalDataPoints, 
//         maxValue: isFinite(maxValue) ? maxValue : 0, 
//         minValue: isFinite(minValue) ? minValue : 0 
//       };
//     } catch (error) {
//       console.error('Error calculando estadísticas del gráfico:', error);
//       return { totalDataPoints: 0, maxValue: 0, minValue: 0 };
//     }
//   };

//   const stats = getChartStats();

//   return (
//     <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
//       {/* Header del gráfico */}
//       <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center">
//             <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-3">
//               <i className={`fas ${getChartIcon()} text-blue-600 dark:text-blue-400`}></i>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                 {chartConfig.title || 'Gráfico sin título'}
//               </h3>
//               <p className="text-sm text-gray-500 dark:text-gray-400">
//                 {stats.totalDataPoints} punto(s) de datos
//                 {stats.maxValue > 0 && (
//                   <> • Rango: {stats.minValue.toLocaleString()} - {stats.maxValue.toLocaleString()}</>
//                 )}
//               </p>
//             </div>
//           </div>
          
//           <div className="flex items-center space-x-2">
//             {/* Tipo de gráfico */}
//             <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full capitalize">
//               {chartConfig.type || 'unknown'}
//             </span>
            
//             {/* Botón para descargar (futuro) */}
//             <button 
//               className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1"
//               title="Opciones del gráfico"
//             >
//               <i className="fas fa-ellipsis-v"></i>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Contenido del gráfico */}
//       <div className="p-6">
//         <div className="relative h-80">
//           {renderChart()}
//         </div>
        
//         {/* Información adicional del gráfico */}
//         <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
//           <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
//             <span>
//               <i className="fas fa-info-circle mr-1"></i>
//               Gráfico generado automáticamente basado en datos reales
//             </span>
//             <span>
//               <i className="fas fa-database mr-1"></i>
//               {stats.totalDataPoints} registros analizados
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SmartAIChart;




// src/components/SmartAI/components/SmartAIChart.tsx
import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { ChartConfig } from '../../../../core/services/SmartAIService/SmartAIService';
import { needsTransformation, isValidBackendChartData, transformChartData } from '../../../../core/utils/chartDataTransformer';


// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface SmartAIChartProps {
  chartConfig: ChartConfig;
}

const SmartAIChart: React.FC<SmartAIChartProps> = ({ chartConfig }) => {
  // Transformar datos si es necesario
  const processedChartData = useMemo(() => {
    console.log('[SmartAIChart] Procesando configuración:', chartConfig);

    if (!chartConfig) {
      console.warn('[SmartAIChart] No hay configuración de gráfico');
      return null;
    }

    // Si los datos ya están en formato Chart.js, usarlos directamente
    if (!needsTransformation(chartConfig.data)) {
      console.log('[SmartAIChart] Datos ya están en formato Chart.js');
      return chartConfig;
    }

    // Si los datos necesitan transformación (formato backend)
    if (isValidBackendChartData(chartConfig.data)) {
      console.log('[SmartAIChart] Transformando datos del backend');
      const transformedData = transformChartData(
        chartConfig.data, 
        chartConfig.type, 
        chartConfig.title
      );

      return {
        ...chartConfig,
        data: transformedData
      };
    }

    console.error('[SmartAIChart] Formato de datos no reconocido:', chartConfig.data);
    return null;
  }, [chartConfig]);

  // Validar datos procesados
  if (!processedChartData) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-6">
        <div className="flex items-center justify-center h-64 text-gray-500">
          <div className="text-center">
            <i className="fas fa-exclamation-triangle text-4xl mb-2 text-yellow-500"></i>
            <p>Configuración de gráfico no disponible</p>
            <p className="text-sm mt-1">Los datos no tienen el formato correcto</p>
          </div>
        </div>
      </div>
    );
  }

  // Validar estructura final de datos
  if (!processedChartData.data || !processedChartData.data.datasets || !Array.isArray(processedChartData.data.datasets)) {
    console.error('[SmartAIChart] Datos procesados inválidos:', processedChartData.data);
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-6">
        <div className="flex items-center justify-center h-64 text-gray-500">
          <div className="text-center">
            <i className="fas fa-chart-bar text-4xl mb-2"></i>
            <p>No hay datos disponibles para mostrar</p>
            <p className="text-sm mt-1">Error procesando datos del gráfico</p>
          </div>
        </div>
      </div>
    );
  }

  // Opciones comunes para todos los gráficos
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          color: '#374151',
        },
      },
      title: {
        display: true,
        text: processedChartData.title || 'Gráfico sin título',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
        color: '#111827',
        padding: {
          bottom: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        cornerRadius: 8,
        padding: 12,
        displayColors: true,
        callbacks: {
          title: function(context: any) {
            return context[0].label || 'Dato';
          },
          label: function(context: any) {
            const label = context.dataset.label || '';
            const value = context.parsed.y !== undefined ? context.parsed.y : context.parsed;
            return `${label}: ${value.toLocaleString()}`;
          }
        }
      },
    },
  };

  // Opciones específicas para gráficos de barras y líneas
  const cartesianOptions = {
    ...commonOptions,
    scales: {
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: '#6B7280',
          maxRotation: 45,
          minRotation: 0
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: '#6B7280',
          callback: function(value: any) {
            return value.toLocaleString();
          }
        },
        beginAtZero: true,
      },
    },
  };

  // Renderizar el gráfico según el tipo
  const renderChart = () => {
    const { type, data } = processedChartData;

    try {
      switch (type) {
        case 'bar':
          return (
            <Bar 
              data={data} 
              options={cartesianOptions}
              height={300}
            />
          );
        
        case 'line':
          return (
            <Line 
              data={data} 
              options={cartesianOptions}
              height={300}
            />
          );
        
        case 'pie':
          return (
            <Pie 
              data={data} 
              options={commonOptions}
              height={300}
            />
          );
        
        case 'doughnut':
          return (
            <Doughnut 
              data={data} 
              options={commonOptions}
              height={300}
            />
          );
        
        case 'area':
          const areaData = {
            ...data,
            datasets: data.datasets.map(dataset => ({
              ...dataset,
              fill: true,
              backgroundColor: Array.isArray(dataset.backgroundColor) 
                ? dataset.backgroundColor[0] 
                : dataset.backgroundColor || 'rgba(59, 130, 246, 0.1)',
            }))
          };
          
          return (
            <Line 
              data={areaData} 
              options={cartesianOptions}
              height={300}
            />
          );
        
        default:
          return (
            <div className="flex items-center justify-center h-64 text-gray-500">
              <div className="text-center">
                <i className="fas fa-chart-bar text-4xl mb-2"></i>
                <p>Tipo de gráfico no soportado: {type}</p>
              </div>
            </div>
          );
      }
    } catch (error) {
      console.error('Error renderizando gráfico:', error);
      console.error('Datos del gráfico:', data);
      return (
        <div className="flex items-center justify-center h-64 text-red-500">
          <div className="text-center">
            <i className="fas fa-exclamation-circle text-4xl mb-2"></i>
            <p>Error al renderizar el gráfico</p>
            <p className="text-sm mt-1">Revisa la consola para más detalles</p>
          </div>
        </div>
      );
    }
  };

  // Obtener icono según el tipo de gráfico
  const getChartIcon = () => {
    const iconMap: Record<string, string> = {
      bar: 'fa-chart-bar',
      line: 'fa-chart-line',
      pie: 'fa-chart-pie',
      doughnut: 'fa-chart-pie',
      area: 'fa-chart-area'
    };
    
    return iconMap[processedChartData.type] || 'fa-chart-bar';
  };

  // Obtener estadísticas del gráfico
  const getChartStats = () => {
    try {
      const { data } = processedChartData;
      
      if (!data || !data.datasets || !Array.isArray(data.datasets)) {
        return { totalDataPoints: 0, maxValue: 0, minValue: 0 };
      }

      const validDatasets = data.datasets.filter(dataset => 
        dataset && Array.isArray(dataset.data) && dataset.data.length > 0
      );

      if (validDatasets.length === 0) {
        return { totalDataPoints: 0, maxValue: 0, minValue: 0 };
      }

      const totalDataPoints = validDatasets.reduce((sum, dataset) => {
        return sum + (dataset.data?.length || 0);
      }, 0);

      const allValues = validDatasets.flatMap(dataset => 
        dataset.data.filter(value => typeof value === 'number' && !isNaN(value))
      );

      if (allValues.length === 0) {
        return { totalDataPoints, maxValue: 0, minValue: 0 };
      }

      const maxValue = Math.max(...allValues);
      const minValue = Math.min(...allValues);
      
      return { 
        totalDataPoints, 
        maxValue: isFinite(maxValue) ? maxValue : 0, 
        minValue: isFinite(minValue) ? minValue : 0 
      };
    } catch (error) {
      console.error('Error calculando estadísticas del gráfico:', error);
      return { totalDataPoints: 0, maxValue: 0, minValue: 0 };
    }
  };

  const stats = getChartStats();

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
      {/* Header del gráfico */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-3">
              <i className={`fas ${getChartIcon()} text-blue-600 dark:text-blue-400`}></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {processedChartData.title || 'Actividad de Sucursales'}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {stats.totalDataPoints} punto(s) de datos
                {stats.maxValue > 0 && (
                  <> • Rango: {stats.minValue.toLocaleString()} - {stats.maxValue.toLocaleString()}</>
                )}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full capitalize">
              {processedChartData.type || 'unknown'}
            </span>
            
            <button 
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1"
              title="Opciones del gráfico"
            >
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Contenido del gráfico */}
      <div className="p-6">
        <div className="relative h-80">
          {renderChart()}
        </div>
        
        {/* Información adicional del gráfico */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>
              <i className="fas fa-info-circle mr-1"></i>
              Gráfico generado automáticamente basado en datos reales
            </span>
            <span>
              <i className="fas fa-database mr-1"></i>
              {stats.totalDataPoints} registros analizados
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartAIChart;