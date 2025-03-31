import { useState, useEffect } from "react";
import { HelperService } from "../../core/services/HelperService";
import { getPointsMetrics, getCouponsMetrics, getPromotionsMetrics, getSurveysMetrics, getMarketStudiesMetrics, getMetricsTrend } from "../../core/services/Operador/Metrics/MetricsService";


interface GrowthIndicator {
  value: number;
  trend: "up" | "down" | "neutral";
  label: string;
}

interface Metrics {
  points: {
    count: number;
    growth: string;
    growth_indicator: GrowthIndicator;
    trend: Array<{ date: string; total_points: number }>;
  };
  coupons: {
    count: number;
    growth: string;
    growth_indicator: GrowthIndicator;
    trend: Array<{ date: string; total_coupons: number }>;
  };
  promotions: {
    count: number;
    growth: string;
    growth_indicator: GrowthIndicator;
    trend: Array<{ date: string; total_promotions: number }>;
  };
  surveys: {
    count: number;
    growth: string;
    growth_indicator: GrowthIndicator;
    trend: Array<{ date: string; total_surveys: number }>;
  };
  marketStudies: {
    count: number;
    growth: string;
    growth_indicator: GrowthIndicator;
    trend: Array<{ date: string; total_market_studies: number }>;
  };
}

interface PointsTrendItem {
  date: string;
  total_points: number;
}

interface CouponsTrendItem {
  date: string;
  total_coupons: number;
}

interface PromotionsTrendItem {
  date: string;
  total_promotions: number;
}

interface MarketStudiesTrendItem {
  date: string;
  total_market_studies: number;
}

interface SurveysTrendItem {
  date: string;
  total_surveys: number;
}

interface TrendData {
  points_trend: PointsTrendItem[];
  coupons_trend: CouponsTrendItem[];
  promotions_trend: PromotionsTrendItem[];
  surveys_trend: SurveysTrendItem[];
  market_studies_trend: MarketStudiesTrendItem[];
  timeFrame: string;
  last_updated: string;
}

export const TIME_FRAMES = {
  TODAY: "today",
  YESTERDAY: "yesterday",
  LAST_7_DAYS: "last_7_days",
  CURRENT_MONTH: "month",
  LAST_MONTH: "last_month",
  CURRENT_YEAR: "year",
  ALL_TIME: "all_time",
} as const;

export type TimeFrameType = (typeof TIME_FRAMES)[keyof typeof TIME_FRAMES];

interface UseMetricsReturn {
  timeFrame: TimeFrameType;
  setTimeFrame: (value: TimeFrameType) => void;
  metrics: Metrics;
  chartData: {
    series: Array<{ name: string; data: number[] }>;
    categories: string[];
  };
  pointsTrendData: PointsTrendItem[];
  comparisonMetric: "points" | "coupons" | "promotions" | "surveys" | "marketStudies";
  setComparisonMetric: (value: "points" | "coupons" | "promotions" | "surveys" | "marketStudies") => void;
  showCompareModal: boolean;
  setShowCompareModal: (value: boolean) => void;
  compareTimeFrame1: TimeFrameType;
  setCompareTimeFrame1: (value: TimeFrameType) => void;
  compareTimeFrame2: TimeFrameType;
  setCompareTimeFrame2: (value: TimeFrameType) => void;
  range1Data: any[];
  range2Data: any[];
}

export const useMetrics = (): UseMetricsReturn => {
  const uuid = HelperService.getUserUuid();
  const [timeFrame, setTimeFrame] = useState<TimeFrameType>(TIME_FRAMES.TODAY);
  const [comparisonMetric, setComparisonMetric] = useState<"points" | "coupons" | "promotions" | "surveys" | "marketStudies">("marketStudies");
  const [chartData, setChartData] = useState<{
    series: Array<{ name: string; data: number[] }>;
    categories: string[];
  }>({ series: [], categories: [] });
  const [pointsTrendData, setPointsTrendData] = useState<PointsTrendItem[]>([]);
  const [metrics, setMetrics] = useState<Metrics>({
    points: {
      count: 0,
      growth: "0%",
      growth_indicator: { value: 0, trend: "neutral", label: "0%" },
      trend: [],
    },
    coupons: {
      count: 0,
      growth: "0%",
      growth_indicator: { value: 0, trend: "neutral", label: "0%" },
      trend: [],
    },
    promotions: {
      count: 0,
      growth: "0%",
      growth_indicator: { value: 0, trend: "neutral", label: "0%" },
      trend: [],
    },
    surveys: {
      count: 0,
      growth: "0%",
      growth_indicator: { value: 0, trend: "neutral", label: "0%" },
      trend: [],
    },
    marketStudies: {
      count: 0,
      growth: "0%",
      growth_indicator: { value: 0, trend: "neutral", label: "0%" },
      trend: [],
    },
  });
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [compareTimeFrame1, setCompareTimeFrame1] = useState<TimeFrameType>(TIME_FRAMES.TODAY);
  const [compareTimeFrame2, setCompareTimeFrame2] = useState<TimeFrameType>(TIME_FRAMES.LAST_MONTH);
  const [range1Data, setRange1Data] = useState<any[]>([]);
  const [range2Data, setRange2Data] = useState<any[]>([]);

  const fetchMetrics = async () => {
    try {
      const params = { uuid, timeFrame };
      const [points, coupons, promotions, surveys, marketStudies] = await Promise.all([
        getPointsMetrics(params),
        getCouponsMetrics(params),
        getPromotionsMetrics(params),
        getSurveysMetrics(params),
        getMarketStudiesMetrics(params),
      ]);

      setMetrics({
        points: {
          count: points.current_balance || 0,
          growth: points.growth_percentage + "%",
          growth_indicator: points.growth_indicator,
          trend: points.trend || [],
        },
        coupons: {
          count: coupons.current_coupons_count || 0,
          growth: coupons.growth_percentage + "%",
          growth_indicator: coupons.growth_indicator,
          trend: coupons.trend || [],
        },
        promotions: {
          count: promotions.current_promotions_count || 0,
          growth: promotions.growth_percentage + "%",
          growth_indicator: promotions.growth_indicator,
          trend: promotions.trend || [],
        },
        surveys: {
          count: surveys.current_surveys_count || 0,
          growth: surveys.growth_percentage + "%",
          growth_indicator: surveys.growth_indicator,
          trend: surveys.trend || [],
        },
        marketStudies: {
          count: marketStudies.current_market_studies_count || 0,
          growth: marketStudies.growth_percentage + "%",
          growth_indicator: marketStudies.growth_indicator,
          trend: marketStudies.trend || [],
        },
      });
    } catch (error) {
      console.error("Error fetching metrics:", error);
    }
  };

  const processTrendDataForChart = (trendData: TrendData) => {
    const { coupons_trend, promotions_trend, surveys_trend, market_studies_trend } = trendData;

    const allDates = new Set([
      ...coupons_trend.map((item) => item.date.split(" ")[0]),
      ...promotions_trend.map((item) => item.date.split(" ")[0]),
      ...surveys_trend.map((item) => item.date.split(" ")[0]),
      ...market_studies_trend.map((item) => item.date.split(" ")[0]),
    ]);

    const sortedDates = Array.from(allDates).sort();

    const surveysData = sortedDates.map(
      (date) => surveys_trend.find((item) => item.date.startsWith(date))?.total_surveys || 0
    );
    const promotionsData = sortedDates.map(
      (date) => promotions_trend.find((item) => item.date.startsWith(date))?.total_promotions || 0
    );
    const couponsData = sortedDates.map(
      (date) => coupons_trend.find((item) => item.date.startsWith(date))?.total_coupons || 0
    );
    const marketStudiesData = sortedDates.map(
      (date) => market_studies_trend.find((item) => item.date.startsWith(date))?.total_market_studies || 0
    );

    const formattedDates = sortedDates.map((date) => {
      const dateObj = new Date(date);
      switch (timeFrame) {
        case TIME_FRAMES.TODAY:
        case TIME_FRAMES.YESTERDAY:
          return dateObj.toLocaleTimeString("es-ES", { hour: "2-digit" });
        case TIME_FRAMES.LAST_7_DAYS:
          return dateObj.toLocaleDateString("es-ES", { weekday: "short" });
        case TIME_FRAMES.CURRENT_MONTH:
        case TIME_FRAMES.LAST_MONTH:
          return dateObj.toLocaleDateString("es-ES", { day: "2-digit" });
        case TIME_FRAMES.CURRENT_YEAR:
          return dateObj.toLocaleDateString("es-ES", { month: "short" });
        default:
          return dateObj.toLocaleDateString("es-ES", { day: "2-digit", month: "short" });
      }
    });

    setChartData({
      series: [
        { name: "Encuestas Completadas", data: surveysData },
        { name: "Estudios de Mercado", data: marketStudiesData },
        { name: "Promociones Activas", data: promotionsData },
        { name: "Cupones Canjeados", data: couponsData },
      ],
      categories: formattedDates,
    });
  };

  const fetchTrendData = async () => {
    try {
      const params = { uuid, timeFrame };
      const trendData = await getMetricsTrend(params);
      processTrendDataForChart(trendData);

      if (trendData.points_trend) {
        setPointsTrendData(
          trendData.points_trend.map((point: { date: any; total_points: any }) => ({
            date: point.date,
            total_points: point.total_points,
          }))
        );
      }
    } catch (error) {
      console.error("Error al obtener datos para los gráficos:", error);
    }
  };

  const fetchComparisonData = async () => {
    try {
      const fetchFunction = {
        points: getPointsMetrics,
        coupons: getCouponsMetrics,
        promotions: getPromotionsMetrics,
        surveys: getSurveysMetrics,
        marketStudies: getMarketStudiesMetrics,
      }[comparisonMetric];

      const params1 = { uuid, timeFrame: compareTimeFrame1 };
      const data1 = await fetchFunction(params1);
      setRange1Data(data1.trend || []);

      const params2 = { uuid, timeFrame: compareTimeFrame2 };
      const data2 = await fetchFunction(params2);
      setRange2Data(data2.trend || []);
    } catch (error) {
      console.error("Error fetching metrics:", error);
    }
  };

  useEffect(() => {
    if (showCompareModal) {
      fetchComparisonData();
    }
  }, [showCompareModal, compareTimeFrame1, compareTimeFrame2]);

  useEffect(() => {
    fetchMetrics();
    fetchTrendData();
  }, [timeFrame]);

  return {
    timeFrame,
    setTimeFrame,
    metrics,
    chartData,
    pointsTrendData,
    comparisonMetric,
    setComparisonMetric,
    showCompareModal,
    setShowCompareModal,
    compareTimeFrame1,
    setCompareTimeFrame1,
    compareTimeFrame2,
    setCompareTimeFrame2,
    range1Data,
    range2Data,
  };
};