// src/shared/hooks/useMetricsWebSocket.ts
import { useState, useEffect, useCallback, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { HelperService } from "../../core/services/HelperService";
import { getBranchesByCompanyId } from "../../core/services/Operador/Branch/BranchService";

// Reutilizar todas las interfaces existentes del hook original
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

// MANTENER EXACTAMENTE LA MISMA INTERFAZ QUE EL HOOK ORIGINAL
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
  // NUEVOS estados específicos de WebSocket
  connected: boolean;
  connecting: boolean;
  error: string | null;
  lastUpdate: string | null;
}

const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL;

// Métricas por defecto (igual que el hook original)
const defaultMetrics: Metrics = {
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
};

export const useMetricsWebSocket = (): UseMetricsReturn => {
  // Estados originales
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
  const [metrics, setMetrics] = useState<Metrics>(defaultMetrics);
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

  // Estados WebSocket
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);

  // Referencias
  const socketRef = useRef<Socket | null>(null);

  // Obtener datos del usuario
  const commerceUuid = HelperService.getUserUuid();
  const encryptedCompanyId = HelperService.getCompanyId() || "";
  const authToken = HelperService.getAccessToken();
  const effectiveUuid = selectedBranch || commerceUuid;

  // Función para conectar WebSocket
  const connectSocket = useCallback(() => {
    if (socketRef.current?.connected || !authToken || !effectiveUuid) {
      return;
    }

    setConnecting(true);
    setError(null);
    console.log("🔌 Conectando a WebSocket:", WEBSOCKET_URL);

    const socket = io(WEBSOCKET_URL, {
      transports: ["polling"],
      timeout: 10000,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ WebSocket conectado:", socket.id);
      setConnected(true);
      setConnecting(false);
      setError(null);

      // AGREGAR ESTE DEBUG DEL TOKEN:
      console.log("🔑 Debug token:", {
        tokenLength: authToken?.length,
        tokenStart: authToken?.substring(0, 20),
        tokenEnd: authToken?.substring(authToken.length - 20),
        isExpired: checkIfTokenExpired(authToken),
      });

      console.log("📤 Enviando suscripción:", {
        effectiveUuid,
        timeFrame,
        authToken: !!authToken,
      });
      socket.emit("subscribe-metrics", {
        uuid: effectiveUuid,
        timeFrame,
        userId: commerceUuid,
        authToken,
      });
    });

    socket.on("disconnect", (reason) => {
      console.log("❌ WebSocket desconectado:", reason);
      setConnected(false);
      setConnecting(false);
    });

    socket.on("connect_error", (error) => {
      console.error("🚨 Error de conexión:", error);
      setConnected(false);
      setConnecting(false);
      setError(`Error de conexión: ${error.message}`);
    });

    // Modifica los eventos WebSocket para usar esta función
    socket.on("metrics-initial-data", (data) => {
      console.log("📊 Datos iniciales recibidos:", {
        timestamp: data.timestamp,
        metrics: data.metrics,
        chartData: data.chartData,
        pointsTrendData: data.pointsTrendData,
        pointsGainedLostTrend: data.pointsGainedLostTrend,
        coupons_trend: data.coupons_trend,
        promotions_trend: data.promotions_trend,
        surveys_trend: data.surveys_trend,
        market_studies_trend: data.market_studies_trend,
      });
      setMetrics(data.metrics || defaultMetrics);
      if (
        data.coupons_trend &&
        data.promotions_trend &&
        data.surveys_trend &&
        data.market_studies_trend
      ) {
        processTrendDataForChart({
          coupons_trend: data.coupons_trend,
          promotions_trend: data.promotions_trend,
          surveys_trend: data.surveys_trend,
          market_studies_trend: data.market_studies_trend,
        });
      } else {
        setChartData(data.chartData || { series: [], categories: [] });
      }
      setPointsTrendData(data.pointsTrendData || []);
      setPointsGainedLostTrend(data.pointsGainedLostTrend || []);
      setLastUpdate(data.timestamp);
      setError(null);
    });

    socket.on("metrics-updated", (data) => {
      console.log("🔄 Métricas actualizadas:", {
        timestamp: data.timestamp,
        metrics: data.metrics,
        chartData: data.chartData,
        pointsTrendData: data.pointsTrendData,
        pointsGainedLostTrend: data.pointsGainedLostTrend,
        coupons_trend: data.coupons_trend,
        promotions_trend: data.promotions_trend,
        surveys_trend: data.surveys_trend,
        market_studies_trend: data.market_studies_trend,
      });
      setMetrics(data.metrics || defaultMetrics);
      if (
        data.coupons_trend &&
        data.promotions_trend &&
        data.surveys_trend &&
        data.market_studies_trend
      ) {
        processTrendDataForChart({
          coupons_trend: data.coupons_trend,
          promotions_trend: data.promotions_trend,
          surveys_trend: data.surveys_trend,
          market_studies_trend: data.market_studies_trend,
        });
      } else {
        setChartData(data.chartData || { series: [], categories: [] });
      }
      setPointsTrendData(data.pointsTrendData || []);
      setPointsGainedLostTrend(data.pointsGainedLostTrend || []);
      setLastUpdate(data.timestamp);
      setError(null);
    });

    socket.on("comparison-data", (data) => {
      console.log("📊 Datos de comparación recibidos");
      setRange1Data(data.range1Data || []);
      setRange2Data(data.range2Data || []);
    });

    socket.on("metrics-error", (errorData) => {
      console.error("❌ Error en métricas:", errorData);
      setError(errorData.message);
    });
  }, [authToken, effectiveUuid, timeFrame, commerceUuid]);

  function checkIfTokenExpired(token: string | null): boolean {
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Date.now() / 1000;
    return payload.exp < now;
  } catch {
    return true;
  }
}
  // Función para actualizar suscripción
  const updateSubscription = useCallback(
    (newTimeFrame: TimeFrameType) => {
      if (socketRef.current?.connected && authToken) {
        console.log(
          `🔄 Actualizando suscripción: ${effectiveUuid} (${newTimeFrame})`
        );
        socketRef.current.emit("update-subscription", {
          uuid: effectiveUuid,
          timeFrame: newTimeFrame,
        });
      }
    },
    [authToken, effectiveUuid]
  );

  // Función para datos de comparación
  const fetchComparisonData = useCallback(() => {
    if (socketRef.current?.connected && showCompareModal) {
      console.log(
        `📊 Solicitando comparación: ${comparisonMetric} - ${compareTimeFrame1} vs ${compareTimeFrame2}`
      );
      socketRef.current.emit("fetch-comparison-data", {
        metric: comparisonMetric,
        timeFrame1: compareTimeFrame1,
        timeFrame2: compareTimeFrame2,
        uuid: effectiveUuid,
      });
    }
  }, [
    showCompareModal,
    comparisonMetric,
    compareTimeFrame1,
    compareTimeFrame2,
    effectiveUuid,
  ]);

  // Cargar sucursales
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

  const processTrendDataForChart = (trendData: any) => {
    const {
      coupons_trend,
      promotions_trend,
      surveys_trend,
      market_studies_trend,
    } = trendData;
    const groupByTimeUnit = (
      data: { date: string; value: number }[],
      timeFrame: string
    ) => {
      const grouped = data.reduce((acc, item) => {
        const date = new Date(item.date);
        let key;
        switch (timeFrame) {
          case TIME_FRAMES.TODAY:
          case TIME_FRAMES.YESTERDAY:
            key = date.toLocaleTimeString("es-ES", {
              hour: "2-digit",
              hour12: true,
              timeZone: "America/Bogota",
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
            key = date.toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "short",
            });
        }
        acc[key] = (acc[key] || 0) + item.value;
        return acc;
      }, {} as Record<string, number>);
      return grouped;
    };

    const promotionsDataByTime = groupByTimeUnit(
      promotions_trend.map((item: any) => ({
        date: item.date,
        value: item.total_promotions,
      })),
      timeFrame
    );
    const surveysDataByTime = groupByTimeUnit(
      surveys_trend.map((item: any) => ({
        date: item.date,
        value: item.total_surveys,
      })),
      timeFrame
    );
    const couponsDataByTime = groupByTimeUnit(
      coupons_trend.map((item: any) => ({
        date: item.date,
        value: item.total_coupons,
      })),
      timeFrame
    );
    const marketStudiesDataByTime = groupByTimeUnit(
      market_studies_trend.map((item: any) => ({
        date: item.date,
        value: item.total_market_studies,
      })),
      timeFrame
    );

    const allTimeUnits = Array.from(
      new Set([
        ...Object.keys(promotionsDataByTime),
        ...Object.keys(surveysDataByTime),
        ...Object.keys(couponsDataByTime),
        ...Object.keys(marketStudiesDataByTime),
      ])
    ).sort();

    setChartData({
      series: [
        {
          name: "Encuestas Completadas",
          data: allTimeUnits.map((t) => surveysDataByTime[t] || 0),
        },
        {
          name: "Estudios de Mercado",
          data: allTimeUnits.map((t) => marketStudiesDataByTime[t] || 0),
        },
        {
          name: "Promociones Lanzadas",
          data: allTimeUnits.map((t) => promotionsDataByTime[t] || 0),
        },
        {
          name: "Cupones Canjeados",
          data: allTimeUnits.map((t) => couponsDataByTime[t] || 0),
        },
      ],
      categories: allTimeUnits,
    });
  };

  // Conectar WebSocket
  useEffect(() => {
    if (authToken && effectiveUuid && !socketRef.current) {
      connectSocket();
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [connectSocket, authToken, effectiveUuid]);

  // Actualizar suscripción cuando cambien los filtros
  useEffect(() => {
    if (connected && effectiveUuid) {
      updateSubscription(timeFrame);
    }
  }, [timeFrame, effectiveUuid, connected, updateSubscription]);

  // Manejar comparación
  useEffect(() => {
    if (showCompareModal) {
      fetchComparisonData();
    }
  }, [
    showCompareModal,
    comparisonMetric,
    compareTimeFrame1,
    compareTimeFrame2,
    fetchComparisonData,
  ]);

  // Wrappers para setTimeFrame y setSelectedBranch
  const handleSetTimeFrame = useCallback((newTimeFrame: TimeFrameType) => {
    setTimeFrame(newTimeFrame);
  }, []);

  const handleSetSelectedBranch = useCallback((newBranch: string) => {
    setSelectedBranch(newBranch);
  }, []);

  return {
    timeFrame,
    setTimeFrame: handleSetTimeFrame,
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
    setSelectedBranch: handleSetSelectedBranch,
    connected,
    connecting,
    error,
    lastUpdate,
  };
};

export default useMetricsWebSocket;
