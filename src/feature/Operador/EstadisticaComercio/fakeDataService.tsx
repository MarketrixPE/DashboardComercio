// Definición de constantes
export const TIME_FRAMES = {
  TODAY: "today",
  YESTERDAY: "yesterday",
  LAST_7_DAYS: "last_7_days",
  CURRENT_MONTH: "month",
  LAST_MONTH: "last_month",
  CURRENT_YEAR: "year",
  ALL_TIME: "all_time",
} as const;

// Tipos para los marcos de tiempo
export type TimeFrameType = (typeof TIME_FRAMES)[keyof typeof TIME_FRAMES];

// Interfaces para los indicadores de crecimiento y diferentes tipos de datos
export interface GrowthIndicator {
  value: number;
  trend: "up" | "down" | "neutral";
  label: string;
}

export interface TrendItem {
  date: string;
}

export interface PointsTrendItem extends TrendItem {
  total_points: number;
}

export interface CouponsTrendItem extends TrendItem {
  total_coupons: number;
}

export interface PromotionsTrendItem extends TrendItem {
  total_promotions: number;
}

export interface SurveysTrendItem extends TrendItem {
  total_surveys: number;
}

export interface MarketStudiesTrendItem extends TrendItem {
  total_market_studies: number;
}

export interface CombinedTrendItem extends TrendItem {
  total_points: number;
  total_coupons: number;
  total_promotions: number;
  total_surveys: number;
  total_market_studies: number;
}

// Interfaces para las respuestas de las APIs
export interface TrendData {
  points_trend: PointsTrendItem[];
  coupons_trend: CouponsTrendItem[];
  promotions_trend: PromotionsTrendItem[];
  surveys_trend: SurveysTrendItem[];
  market_studies_trend: MarketStudiesTrendItem[];
  timeFrame: string;
  last_updated: string;
}

export interface MetricsBase {
  growth_percentage: number;
  growth_indicator: GrowthIndicator;
}

export interface PointsMetricsResponse extends MetricsBase {
  current_balance: number;
  trend: PointsTrendItem[];
}

export interface CouponsMetricsResponse extends MetricsBase {
  current_coupons_count: number;
  redeemed_coupons: CouponsTrendItem[];
}

export interface PromotionsMetricsResponse extends MetricsBase {
  current_promotions_count: number;
  active_promotions: PromotionsTrendItem[];
}

export interface SurveysMetricsResponse extends MetricsBase {
  current_surveys_count: number;
  completed_surveys: SurveysTrendItem[];
}

export interface MarketStudiesMetricsResponse extends MetricsBase {
  current_market_studies_count: number;
  completed_market_studies: MarketStudiesTrendItem[];
}

// Interfaz para los parámetros
export interface MetricsParams {
  userId?: number;
  timeFrame: TimeFrameType;
  startDate?: string;
  endDate?: string;
}

// Clase generadora de datos falsos
class FakeDataGenerator {
  private baseCounts: {
    points: number;
    coupons: number;
    promotions: number;
    surveys: number;
    marketStudies: number;
  };
  
  private baseGrowth: {
    points: number;
    coupons: number;
    promotions: number;
    surveys: number;
    marketStudies: number;
  };
  
  private seed: number;
  
  constructor() {
    this.baseCounts = {
      points: 10000,
      coupons: 450,
      promotions: 120,
      surveys: 350,
      marketStudies: 75,
    };
    
    // Valores base de crecimiento para cada categoría
    this.baseGrowth = {
      points: 12,
      coupons: 8,
      promotions: 5,
      surveys: 15,
      marketStudies: 10,
    };
    
    // Configurar semilla para datos consistentes
    this.seed = Date.now();
  }
  
  // Pseudorandom consistente
  private random(min = 0, max = 100): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    const rnd = this.seed / 233280;
    return min + rnd * (max - min);
  }
  
  // Generar variación para tendencias
  private generateVariation(base: number, variance = 0.2): number {
    const variation = this.random(-variance * base, variance * base);
    return Math.round(base + variation);
  }
  
  // Generar fechas para el rango de tiempo especificado
  private generateDatesForTimeFrame(timeFrame: TimeFrameType): Date[] {
    const today = new Date();
    const dates: Date[] = [];
    
    switch(timeFrame) {
      case TIME_FRAMES.TODAY:
        // Horas del día actual
        for (let hour = 0; hour < 24; hour += 2) {
          const date = new Date(today);
          date.setHours(hour, 0, 0, 0);
          dates.push(date);
        }
        break;
        
      case TIME_FRAMES.YESTERDAY:
        // Horas del día anterior
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        for (let hour = 0; hour < 24; hour += 2) {
          const date = new Date(yesterday);
          date.setHours(hour, 0, 0, 0);
          dates.push(date);
        }
        break;
        
      case TIME_FRAMES.LAST_7_DAYS:
        // Últimos 7 días
        for (let day = 6; day >= 0; day--) {
          const date = new Date(today);
          date.setDate(today.getDate() - day);
          date.setHours(0, 0, 0, 0);
          dates.push(date);
        }
        break;
        
      case TIME_FRAMES.CURRENT_MONTH:
        // Días del mes actual
        const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
        for (let day = 1; day <= daysInMonth; day++) {
          const date = new Date(today.getFullYear(), today.getMonth(), day);
          dates.push(date);
        }
        break;
        
      case TIME_FRAMES.LAST_MONTH:
        // Días del mes anterior
        const lastMonth = new Date(today);
        lastMonth.setMonth(today.getMonth() - 1);
        const daysInLastMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0).getDate();
        for (let day = 1; day <= daysInLastMonth; day++) {
          const date = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), day);
          dates.push(date);
        }
        break;
        
      case TIME_FRAMES.CURRENT_YEAR:
        // Meses del año actual
        for (let month = 0; month < 12; month++) {
          const date = new Date(today.getFullYear(), month, 1);
          dates.push(date);
        }
        break;
        
      case TIME_FRAMES.ALL_TIME:
        // Últimos 3 años por trimestre
        for (let year = 2; year >= 0; year--) {
          for (let quarter = 0; quarter < 4; quarter++) {
            const date = new Date(today.getFullYear() - year, quarter * 3, 1);
            dates.push(date);
          }
        }
        break;
        
      default:
        // Predeterminado: últimos 7 días
        for (let day = 6; day >= 0; day--) {
          const date = new Date(today);
          date.setDate(today.getDate() - day);
          dates.push(date);
        }
    }
    
    return dates;
  }
  
  // Generar datos de tendencia para una métrica específica
  private generateTrendData(baseCount: number, dates: Date[], growthRate: number): CombinedTrendItem[] {
    // Añadir algo de aleatoriedad pero mantener una tendencia general
    const trend: CombinedTrendItem[] = [];
    let currentCount = baseCount * 0.7; // Comenzar un poco más bajo
    
    dates.forEach((date) => {
      // Agregar crecimiento con cada punto de datos
      currentCount += this.generateVariation(currentCount * (growthRate / 1000), 0.1);
      
      // Asegurar que no sea negativo
      currentCount = Math.max(0, currentCount);
      
      // Formatear fecha según el formato requerido por la aplicación
      const formattedDate = `${date.toISOString().split('T')[0]} 00:00:00`;
      
      trend.push({
        date: formattedDate,
        total_points: Math.round(currentCount),
        total_coupons: Math.round(currentCount * 0.045),
        total_promotions: Math.round(currentCount * 0.012),
        total_surveys: Math.round(currentCount * 0.035),
        total_market_studies: Math.round(currentCount * 0.0075)
      });
    });
    
    return trend;
  }
  
  // Generar indicador de crecimiento
  private generateGrowthIndicator(baseGrowth: number): GrowthIndicator {
    const growth = this.generateVariation(baseGrowth, 0.5);
    const isPositive = growth > 0;
    const trend = isPositive ? "up" : growth < 0 ? "down" : "neutral";
    
    return {
      value: Math.abs(growth),
      trend,
      label: `${isPositive ? '+' : ''}${growth.toFixed(1)}%`
    };
  }
  
  // Generar todas las métricas para un marco de tiempo específico
  public generateMetricsForTimeFrame(timeFrame: TimeFrameType): {
    points: {
      count: number;
      growth: string;
      growth_indicator: GrowthIndicator;
      trend: PointsTrendItem[];
    };
    coupons: {
      count: number;
      growth: string;
      growth_indicator: GrowthIndicator;
      trend: CouponsTrendItem[];
    };
    promotions: {
      count: number;
      growth: string;
      growth_indicator: GrowthIndicator;
      trend: PromotionsTrendItem[];
    };
    surveys: {
      count: number;
      growth: string;
      growth_indicator: GrowthIndicator;
      trend: SurveysTrendItem[];
    };
    marketStudies: {
      count: number;
      growth: string;
      growth_indicator: GrowthIndicator;
      trend: MarketStudiesTrendItem[];
    };
  } {
    const dates = this.generateDatesForTimeFrame(timeFrame);
    const trend = this.generateTrendData(this.baseCounts.points, dates, this.baseGrowth.points);
    
    // Extraer tendencias específicas para cada tipo de métrica
    const pointsTrend = trend.map(item => ({ 
      date: item.date, 
      total_points: item.total_points 
    }));
    
    const couponsTrend = trend.map(item => ({ 
      date: item.date, 
      total_coupons: item.total_coupons 
    }));
    
    const promotionsTrend = trend.map(item => ({ 
      date: item.date, 
      total_promotions: item.total_promotions 
    }));
    
    const surveysTrend = trend.map(item => ({ 
      date: item.date, 
      total_surveys: item.total_surveys 
    }));
    
    const marketStudiesTrend = trend.map(item => ({ 
      date: item.date, 
      total_market_studies: item.total_market_studies 
    }));
    
    // Crear el objeto metrics siguiendo la estructura de la aplicación
    return {
      points: {
        count: this.baseCounts.points,
        growth: `${this.baseGrowth.points}%`,
        growth_indicator: this.generateGrowthIndicator(this.baseGrowth.points),
        trend: pointsTrend
      },
      coupons: {
        count: this.baseCounts.coupons,
        growth: `${this.baseGrowth.coupons}%`,
        growth_indicator: this.generateGrowthIndicator(this.baseGrowth.coupons),
        trend: couponsTrend
      },
      promotions: {
        count: this.baseCounts.promotions,
        growth: `${this.baseGrowth.promotions}%`,
        growth_indicator: this.generateGrowthIndicator(this.baseGrowth.promotions),
        trend: promotionsTrend
      },
      surveys: {
        count: this.baseCounts.surveys,
        growth: `${this.baseGrowth.surveys}%`,
        growth_indicator: this.generateGrowthIndicator(this.baseGrowth.surveys),
        trend: surveysTrend
      },
      marketStudies: {
        count: this.baseCounts.marketStudies,
        growth: `${this.baseGrowth.marketStudies}%`,
        growth_indicator: this.generateGrowthIndicator(this.baseGrowth.marketStudies),
        trend: marketStudiesTrend
      }
    };
  }
  
  // Generar datos de tendencia para todos los tipos de métricas
  public generateMetricsTrend(timeFrame: TimeFrameType): TrendData {
    const dates = this.generateDatesForTimeFrame(timeFrame);
    const trend = this.generateTrendData(this.baseCounts.points, dates, this.baseGrowth.points);
    
    return {
      points_trend: trend.map(item => ({
        date: item.date,
        total_points: item.total_points
      })),
      coupons_trend: trend.map(item => ({
        date: item.date,
        total_coupons: item.total_coupons
      })),
      promotions_trend: trend.map(item => ({
        date: item.date,
        total_promotions: item.total_promotions
      })),
      surveys_trend: trend.map(item => ({
        date: item.date,
        total_surveys: item.total_surveys
      })),
      market_studies_trend: trend.map(item => ({
        date: item.date,
        total_market_studies: item.total_market_studies
      })),
      timeFrame,
      last_updated: new Date().toISOString()
    };
  }
}

// Exportamos un objeto singleton para uso en el componente
export const fakeDataService = {
  // Para reemplazar las llamadas a getPointsMetrics, getCouponsMetrics, etc.
  getPointsMetrics: ({ timeFrame }: MetricsParams): Promise<PointsMetricsResponse> => {
    return new Promise((resolve) => {
      const generator = new FakeDataGenerator();
      const metrics = generator.generateMetricsForTimeFrame(timeFrame);
      
      setTimeout(() => {
        resolve({
          current_balance: metrics.points.count,
          growth_percentage: parseInt(metrics.points.growth),
          growth_indicator: metrics.points.growth_indicator,
          trend: metrics.points.trend
        });
      }, 300); // Simulamos un delay de la API
    });
  },
  
  getCouponsMetrics: ({ timeFrame }: MetricsParams): Promise<CouponsMetricsResponse> => {
    return new Promise((resolve) => {
      const generator = new FakeDataGenerator();
      const metrics = generator.generateMetricsForTimeFrame(timeFrame);
      
      setTimeout(() => {
        resolve({
          current_coupons_count: metrics.coupons.count,
          growth_percentage: parseInt(metrics.coupons.growth),
          growth_indicator: metrics.coupons.growth_indicator,
          redeemed_coupons: metrics.coupons.trend
        });
      }, 250);
    });
  },
  
  getPromotionsMetrics: ({ timeFrame }: MetricsParams): Promise<PromotionsMetricsResponse> => {
    return new Promise((resolve) => {
      const generator = new FakeDataGenerator();
      const metrics = generator.generateMetricsForTimeFrame(timeFrame);
      
      setTimeout(() => {
        resolve({
          current_promotions_count: metrics.promotions.count,
          growth_percentage: parseInt(metrics.promotions.growth),
          growth_indicator: metrics.promotions.growth_indicator,
          active_promotions: metrics.promotions.trend
        });
      }, 275);
    });
  },
  
  getSurveysMetrics: ({ timeFrame }: MetricsParams): Promise<SurveysMetricsResponse> => {
    return new Promise((resolve) => {
      const generator = new FakeDataGenerator();
      const metrics = generator.generateMetricsForTimeFrame(timeFrame);
      
      setTimeout(() => {
        resolve({
          current_surveys_count: metrics.surveys.count,
          growth_percentage: parseInt(metrics.surveys.growth),
          growth_indicator: metrics.surveys.growth_indicator,
          completed_surveys: metrics.surveys.trend
        });
      }, 320);
    });
  },
  
  getMarketStudiesMetrics: ({ timeFrame }: MetricsParams): Promise<MarketStudiesMetricsResponse> => {
    return new Promise((resolve) => {
      const generator = new FakeDataGenerator();
      const metrics = generator.generateMetricsForTimeFrame(timeFrame);
      
      setTimeout(() => {
        resolve({
          current_market_studies_count: metrics.marketStudies.count,
          growth_percentage: parseInt(metrics.marketStudies.growth),
          growth_indicator: metrics.marketStudies.growth_indicator,
          completed_market_studies: metrics.marketStudies.trend
        });
      }, 280);
    });
  },
  
  // Para reemplazar la llamada a getMetricsTrend
  getMetricsTrend: (params: MetricsParams): Promise<TrendData> => {
    return new Promise((resolve) => {
      const generator = new FakeDataGenerator();
      
      setTimeout(() => {
        resolve(generator.generateMetricsTrend(params.timeFrame));
      }, 350);
    });
  }
};