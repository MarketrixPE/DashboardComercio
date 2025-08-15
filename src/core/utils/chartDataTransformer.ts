// src/core/utils/chartDataTransformer.ts

/**
 * Interfaz para los datos que llegan del backend
 */
interface BackendChartData {
  label: string;
  value: number;
  originalData?: any;
}

/**
 * Interfaz para los datos transformados de Chart.js
 */
interface ChartJSData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
    fill?: boolean;
  }>;
}

/**
 * Colores predefinidos para los gráficos
 */
const CHART_COLORS = {
  primary: ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'],
  background: ['rgba(59, 130, 246, 0.1)', 'rgba(239, 68, 68, 0.1)', 'rgba(16, 185, 129, 0.1)', 'rgba(245, 158, 11, 0.1)', 'rgba(139, 92, 246, 0.1)', 'rgba(6, 182, 212, 0.1)', 'rgba(132, 204, 22, 0.1)', 'rgba(249, 115, 22, 0.1)']
};

/**
 * Transformar datos del backend al formato Chart.js
 */
export const transformChartData = (
  backendData: BackendChartData[], 
  chartType: string,
  title?: string
): ChartJSData => {
  if (!Array.isArray(backendData) || backendData.length === 0) {
    console.warn('[ChartTransformer] Datos inválidos o vacíos:', backendData);
    return {
      labels: ['Sin datos'],
      datasets: [{
        label: 'Sin datos',
        data: [0],
        backgroundColor: CHART_COLORS.background[0],
        borderColor: CHART_COLORS.primary[0],
        borderWidth: 2
      }]
    };
  }

  console.log('[ChartTransformer] Transformando datos:', {
    inputData: backendData,
    chartType,
    dataLength: backendData.length
  });

  // Extraer labels y valores
  const labels = backendData.map(item => {
    // Prioridad 1: Usar el label si ya es descriptivo
    if (item.label && item.label !== 'Sin categoría') {
      return item.label;
    }

    // Prioridad 2: Usar datos originales para construir labels
    if (item.originalData) {
      // Nombres de sucursales
      if (item.originalData.sucursal) {
        return item.originalData.sucursal;
      }
      if (item.originalData.branch_name) {
        return item.originalData.branch_name;
      }
      
      // Tipos de transacciones (ya deberían venir traducidos del backend)
      if (item.originalData.tipo_transaccion) {
        return item.originalData.tipo_transaccion;
      }
      
      // Fallback: Si solo tenemos ID de sucursal
      if (item.originalData.destination_id) {
        return `Sucursal ${item.originalData.destination_id}`;
      }
    }
    
    // Fallback final
    return `Item ${item.value}`;
  });

  const values = backendData.map(item => {
    // El valor real debe estar en originalData para gráficos de actividad
    if (item.originalData && item.originalData.transaction_count !== undefined) {
      return item.originalData.transaction_count;
    }
    if (item.originalData && item.originalData.count !== undefined) {
      return item.originalData.count;
    }
    // Fallback al value directo
    return typeof item.value === 'number' ? item.value : 0;
  });

  console.log('[ChartTransformer] Datos extraídos:', {
    labels,
    values,
    maxValue: Math.max(...values),
    minValue: Math.min(...values)
  });

  // Configurar colores según el tipo de gráfico
  let backgroundColor: string | string[];
  let borderColor: string | string[];

  if (chartType === 'pie' || chartType === 'doughnut') {
    // Para gráficos circulares, usar colores diferentes para cada segmento
    backgroundColor = values.map((_, index) => CHART_COLORS.primary[index % CHART_COLORS.primary.length]);
    borderColor = '#ffffff';
  } else {
    // Para gráficos de barras/líneas, usar un color consistente
    backgroundColor = chartType === 'bar' 
      ? values.map((_, index) => CHART_COLORS.background[index % CHART_COLORS.background.length])
      : CHART_COLORS.background[0];
    borderColor = chartType === 'bar'
      ? values.map((_, index) => CHART_COLORS.primary[index % CHART_COLORS.primary.length])
      : CHART_COLORS.primary[0];
  }

  const transformedData: ChartJSData = {
    labels,
    datasets: [{
      label: title || 'Datos',
      data: values,
      backgroundColor,
      borderColor,
      borderWidth: 2,
      ...(chartType === 'area' && { fill: true })
    }]
  };

  console.log('[ChartTransformer] Datos transformados:', transformedData);

  return transformedData;
};

/**
 * Validar si los datos del backend son válidos para transformar
 */
export const isValidBackendChartData = (data: any): data is BackendChartData[] => {
  if (!Array.isArray(data)) {
    console.warn('[ChartTransformer] Data is not an array:', typeof data);
    return false;
  }

  if (data.length === 0) {
    console.warn('[ChartTransformer] Data array is empty');
    return false;
  }

  const isValid = data.every(item => 
    typeof item === 'object' && 
    item !== null &&
    (typeof item.label === 'string' || typeof item.value === 'number')
  );

  if (!isValid) {
    console.warn('[ChartTransformer] Invalid data structure:', data);
  }

  return isValid;
};

/**
 * Detectar si los datos necesitan transformación
 */
export const needsTransformation = (chartData: any): boolean => {
  // Si ya tiene la estructura de Chart.js, no necesita transformación
  if (chartData && chartData.labels && chartData.datasets) {
    return false;
  }

  // Si es un array de objetos con label/value, necesita transformación
  if (Array.isArray(chartData)) {
    return true;
  }

  return false;
};