import { useState, useEffect } from "react";
import { HelperService } from "../../core/services/HelperService";
import {
  getPointsMetrics,
  getCouponsMetrics,
  getPromotionsMetrics,
  getSurveysMetrics,
  getMarketStudiesMetrics,
  getMetricsTrend,
  getPointsGainedAndLostTrend,
} from "../../core/services/Operador/Metrics/MetricsService";
import { getBranchesByCompanyId } from "../../core/services/Operador/Branch/BranchService";

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

interface PointsGainedLostTrend {
  date: string;
  points_gained: number;
  points_lost: number;
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

interface Branch {
  uuid: string;
  descripcion: string;
}

interface UseMetricsReturn {
  timeFrame: TimeFrameType;
  setTimeFrame: (value: TimeFrameType) => void;
  metrics: Metrics;
  chartData: {
    series: Array<{ name: string; data: number[] }>;
    categories: string[];
  };
  pointsTrendData: PointsTrendItem[];
  pointsGainedLostTrend: PointsGainedLostTrend[];
  comparisonMetric:
    | "points"
    | "coupons"
    | "promotions"
    | "surveys"
    | "marketStudies";
  setComparisonMetric: (
    value: "points" | "coupons" | "promotions" | "surveys" | "marketStudies"
  ) => void;
  showCompareModal: boolean;
  setShowCompareModal: (value: boolean) => void;
  compareTimeFrame1: TimeFrameType;
  setCompareTimeFrame1: (value: TimeFrameType) => void;
  compareTimeFrame2: TimeFrameType;
  setCompareTimeFrame2: (value: TimeFrameType) => void;
  range1Data: any[];
  range2Data: any[];
  branches: Branch[];
  selectedBranch: string;
  setSelectedBranch: (value: string) => void;
}

export const useMetrics = (): UseMetricsReturn => {
  const commerceUuid = HelperService.getUserUuid();
  const encryptedCompanyId = HelperService.getCompanyId() || "";
  const [timeFrame, setTimeFrame] = useState<TimeFrameType>(TIME_FRAMES.TODAY);
  const [comparisonMetric, setComparisonMetric] = useState<
    "points" | "coupons" | "promotions" | "surveys" | "marketStudies"
  >("marketStudies");
  const [chartData, setChartData] = useState<{
    series: Array<{ name: string; data: number[] }>;
    categories: string[];
  }>({ series: [], categories: [] });
  const [pointsTrendData, setPointsTrendData] = useState<PointsTrendItem[]>([]);
  const [pointsGainedLostTrend, setPointsGainedLostTrend] = useState<
    PointsGainedLostTrend[]
  >([]);
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
  const [compareTimeFrame1, setCompareTimeFrame1] = useState<TimeFrameType>(
    TIME_FRAMES.TODAY
  );
  const [compareTimeFrame2, setCompareTimeFrame2] = useState<TimeFrameType>(
    TIME_FRAMES.LAST_MONTH
  );
  const [range1Data, setRange1Data] = useState<any[]>([]);
  const [range2Data, setRange2Data] = useState<any[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<string>("");

  const uuid = selectedBranch || commerceUuid;

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const companyBranches = await getBranchesByCompanyId(
          encryptedCompanyId
        );
        setBranches(companyBranches);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };
    fetchBranches();
  }, [encryptedCompanyId]);

  const fetchMetrics = async () => {
    try {
      const params = { uuid, timeFrame };
      console.log("Parámetros enviados a fetchMetrics:", params);
      const [points, coupons, promotions, surveys, marketStudies] =
        await Promise.all([
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

    // Agrupar por hora o fecha según el timeFrame
    const groupByTimeUnit = (data: { date: string; value: number }[], timeFrame: string) => {
      const grouped = data.reduce((acc, item) => {
        const date = new Date(item.date);
        let key;
        switch (timeFrame) {
          case TIME_FRAMES.TODAY:
          case TIME_FRAMES.YESTERDAY:
            key = date.toLocaleTimeString("es-ES", { 
              hour: "2-digit", 
              hour12: true, 
              timeZone: "America/Bogota" 
            });
            break;
          case TIME_FRAMES.LAST_7_DAYS:
            key = date.toLocaleDateString("es-ES", { weekday: "short" });
            break;
          case TIME_FRAMES.CURRENT_MONTH:
          case TIME_FRAMES.LAST_MONTH:
            key = date.toLocaleDateString("es-ES", { day: "2-digit" });
            break;
          case TIME_FRAMES.CURRENT_YEAR:
            key = date.toLocaleDateString("es-ES", { month: "short" });
            break;
          default:
            key = date.toLocaleDateString("es-ES", { day: "2-digit", month: "short" });
        }
        acc[key] = (acc[key] || 0) + item.value;
        return acc;
      }, {} as Record<string, number>);

      return grouped;
    };

    const promotionsDataByTime = groupByTimeUnit(
      promotions_trend.map(item => ({ date: item.date, value: item.total_promotions })),
      trendData.timeFrame
    );
    const surveysDataByTime = groupByTimeUnit(
      surveys_trend.map(item => ({ date: item.date, value: item.total_surveys })),
      trendData.timeFrame
    );
    const couponsDataByTime = groupByTimeUnit(
      coupons_trend.map(item => ({ date: item.date, value: item.total_coupons })),
      trendData.timeFrame
    );
    const marketStudiesDataByTime = groupByTimeUnit(
      market_studies_trend.map(item => ({ date: item.date, value: item.total_market_studies })),
      trendData.timeFrame
    );

    const allTimeUnits = Array.from(new Set([
      ...Object.keys(promotionsDataByTime),
      ...Object.keys(surveysDataByTime),
      ...Object.keys(couponsDataByTime),
      ...Object.keys(marketStudiesDataByTime),
    ])).sort();

    const formattedTimeUnits = allTimeUnits;

    setChartData({
      series: [
        { name: "Encuestas Completadas", data: allTimeUnits.map(t => surveysDataByTime[t] || 0) },
        { name: "Estudios de Mercado", data: allTimeUnits.map(t => marketStudiesDataByTime[t] || 0) },
        { name: "Promociones Lanzadas", data: allTimeUnits.map(t => promotionsDataByTime[t] || 0) },
        { name: "Cupones Canjeados", data: allTimeUnits.map(t => couponsDataByTime[t] || 0) },
      ],
      categories: formattedTimeUnits,
    });
  };

  const fetchTrendData = async () => {
    try {
      const params = { uuid, timeFrame };
      console.log("Parámetros enviados a fetchTrendData:", params);
      const trendData = await getMetricsTrend(params);
      processTrendDataForChart(trendData);

      if (trendData.points_trend) {
        setPointsTrendData(
          trendData.points_trend.map(
            (point: { date: any; total_points: any }) => ({
              date: point.date,
              total_points: point.total_points,
            })
          )
        );
      }

      const gainedLostTrend = await getPointsGainedAndLostTrend(params);
      setPointsGainedLostTrend(gainedLostTrend.trend || []);
    } catch (error) {
      console.error("Error al obtener datos para los gráficos:", error);
      setPointsGainedLostTrend([]);
    }
  };

  const fetchComparisonData = async () => {
    try {
      let data1, data2;

      const params1 = { uuid, timeFrame: compareTimeFrame1 };
      const params2 = { uuid, timeFrame: compareTimeFrame2 };

      console.log(
        "Parámetros enviados a fetchComparisonData (range1):",
        params1
      );
      console.log(
        "Parámetros enviados a fetchComparisonData (range2):",
        params2
      );

      if (comparisonMetric === "points") {
        [data1, data2] = await Promise.all([
          getPointsGainedAndLostTrend(params1),
          getPointsGainedAndLostTrend(params2),
        ]);
        setRange1Data(data1.trend || []);
        setRange2Data(data2.trend || []);
      } else {
        const fetchFunction = {
          points: getPointsMetrics,
          coupons: getCouponsMetrics,
          promotions: getPromotionsMetrics,
          surveys: getSurveysMetrics,
          marketStudies: getMarketStudiesMetrics,
        }[comparisonMetric];

        [data1, data2] = await Promise.all([
          fetchFunction(params1),
          fetchFunction(params2),
        ]);
        setRange1Data(data1.trend || []);
        setRange2Data(data2.trend || []);
      }
    } catch (error) {
      console.error("Error fetching comparison data:", error);
    }
  };

  useEffect(() => {
    if (showCompareModal) {
      fetchComparisonData();
    }
  }, [
    showCompareModal,
    compareTimeFrame1,
    compareTimeFrame2,
    comparisonMetric,
    uuid,
  ]);

  useEffect(() => {
    fetchMetrics();
    fetchTrendData();
    const intervalId = setInterval(() => {
      fetchMetrics();
      fetchTrendData();
    }, 30000);
    return () => clearInterval(intervalId);
  }, [timeFrame, uuid]);

  return {
    timeFrame,
    setTimeFrame,
    metrics,
    chartData,
    pointsTrendData,
    pointsGainedLostTrend,
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
    branches,
    selectedBranch,
    setSelectedBranch,
  };
};