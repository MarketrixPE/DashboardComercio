import { useState, useEffect, useRef } from "react";
import ChartOne, {
  PointsTrend,
} from "../../../shared/components/Molecules/Charts/ChartOne";
import ChartComponent from "../../../shared/components/Molecules/Charts/ChartTwo";
import ChartThree from "../../../shared/components/Molecules/Charts/ChartThree";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import AnimatedCss from "../../../shared/components/Atoms/Animated/Animated";
import GeneralService from "../../../core/services/GeneralService";
import "./SmartDashboard.css";
import { fakeDataService } from "./fakeDataService";

// Definir interfaces para los indicadores de crecimiento
interface GrowthIndicator {
  value: number;
  trend: "up" | "down" | "neutral";
  label: string;
}

// Interface para las métricas
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

// Primero definimos TIME_FRAMES
const TIME_FRAMES = {
  TODAY: "today",
  YESTERDAY: "yesterday",
  LAST_7_DAYS: "last_7_days",
  CURRENT_MONTH: "month",
  LAST_MONTH: "last_month",
  CURRENT_YEAR: "year",
  ALL_TIME: "all_time",
} as const;

// Primero definimos las interfaces para cada tipo de trend
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

// Interface para la respuesta del API
interface TrendData {
  points_trend: PointsTrendItem[];
  coupons_trend: CouponsTrendItem[];
  promotions_trend: PromotionsTrendItem[];
  surveys_trend: SurveysTrendItem[];
  market_studies_trend: MarketStudiesTrendItem[];
  timeFrame: string;
  last_updated: string;
}

// Después definimos el tipo basado en TIME_FRAMES
type TimeFrameType = (typeof TIME_FRAMES)[keyof typeof TIME_FRAMES];

const SmartDashboard = () => {
  const [timeFrame, setTimeFrame] = useState<TimeFrameType>(TIME_FRAMES.TODAY);
  const [chartData, setChartData] = useState<{
    series: Array<{
      name: string;
      data: number[];
    }>;
    categories: string[];
  }>({
    series: [],
    categories: [],
  });
  const [pointsTrendData, setPointsTrendData] = useState<PointsTrend[]>([]);
  const userId = GeneralService.getUserId();
  const getDateRangeForTimeFrame = () => {
    const today = new Date();
    if (
      timeFrame === TIME_FRAMES.TODAY ||
      timeFrame === TIME_FRAMES.YESTERDAY
    ) {
      return {
        timeFrame,
      };
    }
    switch (timeFrame) {
      case TIME_FRAMES.LAST_7_DAYS:
        const last7Days = new Date(today);
        last7Days.setDate(today.getDate() - 7);
        return {
          timeFrame,
          startDate: last7Days.toISOString().split("T")[0],
          endDate: today.toISOString().split("T")[0],
        };

      case TIME_FRAMES.CURRENT_MONTH:
        return {
          timeFrame,
          startDate: new Date(today.getFullYear(), today.getMonth(), 1)
            .toISOString()
            .split("T")[0],
          endDate: new Date(today.getFullYear(), today.getMonth() + 1, 0)
            .toISOString()
            .split("T")[0],
        };

      case TIME_FRAMES.LAST_MONTH:
        return {
          timeFrame,
          startDate: new Date(today.getFullYear(), today.getMonth() - 1, 1)
            .toISOString()
            .split("T")[0],
          endDate: new Date(today.getFullYear(), today.getMonth(), 0)
            .toISOString()
            .split("T")[0],
        };

      case TIME_FRAMES.CURRENT_YEAR:
        return {
          timeFrame,
          startDate: new Date(today.getFullYear(), 0, 1)
            .toISOString()
            .split("T")[0],
          endDate: new Date(today.getFullYear(), 11, 31)
            .toISOString()
            .split("T")[0],
        };

      case TIME_FRAMES.ALL_TIME:
        return {
          timeFrame,
          startDate: "2020-01-01",
          endDate: today.toISOString().split("T")[0],
        };

      default:
        return {
          timeFrame: TIME_FRAMES.TODAY,
        };
    }
  };

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

  // Modificado para usar el servicio de datos falsos
  const fetchMetrics = async () => {
    try {
      // Aquí usamos nuestro servicio de datos falsos en lugar de llamadas a la API real
      const [points, coupons, promotions, surveys, marketStudies] =
        await Promise.all([
          fakeDataService.getPointsMetrics({ userId, timeFrame }),
          fakeDataService.getCouponsMetrics({ userId, timeFrame }),
          fakeDataService.getPromotionsMetrics({ userId, timeFrame }),
          fakeDataService.getSurveysMetrics({ userId, timeFrame }),
          fakeDataService.getMarketStudiesMetrics({ userId, timeFrame }),
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
          trend: coupons.redeemed_coupons || [],
        },
        promotions: {
          count: promotions.current_promotions_count || 0,
          growth: promotions.growth_percentage + "%",
          growth_indicator: promotions.growth_indicator,
          trend: promotions.active_promotions || [],
        },
        surveys: {
          count: surveys.current_surveys_count || 0,
          growth: surveys.growth_percentage + "%",
          growth_indicator: surveys.growth_indicator,
          trend: surveys.completed_surveys || [],
        },
        marketStudies: {
          count: marketStudies.current_market_studies_count || 0,
          growth: marketStudies.growth_percentage + "%",
          growth_indicator: marketStudies.growth_indicator,
          trend: marketStudies.completed_market_studies || [],
        },
      });
    } catch (error) {
      console.error("Error fetching metrics:", error);
    }
  };

  const processTrendDataForChart = (trendData: TrendData) => {
    const {
      coupons_trend,
      promotions_trend,
      surveys_trend,
      market_studies_trend,
    } = trendData;

    // Obtener todas las fechas únicas y ordenarlas
    const allDates = new Set([
      ...coupons_trend.map((item) => item.date.split(" ")[0]),
      ...promotions_trend.map((item) => item.date.split(" ")[0]),
      ...surveys_trend.map((item) => item.date.split(" ")[0]),
      ...market_studies_trend.map((item) => item.date.split(" ")[0]),
    ]);

    const sortedDates = Array.from(allDates).sort();

    // Crear arrays de datos para cada serie
    const surveysData = sortedDates.map(
      (date) =>
        surveys_trend.find((item) => item.date.startsWith(date))
          ?.total_surveys || 0
    );

    const promotionsData = sortedDates.map(
      (date) =>
        promotions_trend.find((item) => item.date.startsWith(date))
          ?.total_promotions || 0
    );

    const couponsData = sortedDates.map(
      (date) =>
        coupons_trend.find((item) => item.date.startsWith(date))
          ?.total_coupons || 0
    );

    const marketStudiesData = sortedDates.map(
      (date) =>
        market_studies_trend.find((item) => item.date.startsWith(date))
          ?.total_market_studies || 0
    );

    // Formatear las fechas para las categorías según el timeFrame
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
          return dateObj.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "short",
          });
      }
    });

    setChartData({
      series: [
        {
          name: "Encuestas Completadas",
          data: surveysData,
        },
        {
          name: "Estudios de Mercado",
          data: marketStudiesData,
        },
        {
          name: "Promociones Activas",
          data: promotionsData,
        },
        {
          name: "Cupones Canjeados",
          data: couponsData,
        },
      ],
      categories: formattedDates,
    });
  };

  // Modificado para usar el servicio de datos falsos
  const fetchTrendData = async () => {
    try {
      const params = {
        userId,
        ...getDateRangeForTimeFrame(),
      };

      // Usamos el servicio de datos falsos
      const trendData = await fakeDataService.getMetricsTrend(params);
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
    } catch (error) {
      console.error("Error al obtener datos para los gráficos:", error);
    }
  };

  useEffect(() => {
    fetchMetrics();
    fetchTrendData();
  }, [timeFrame]);

  const chartOptions: ApexOptions = {
    chart: {
      type: "area" as const,
      sparkline: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: 1.5, // Línea más delgada
      colors: ["rgba(255,255,255,0.8)"], // Línea más visible
    },
    markers: {
      size: 3, // Marcadores más pequeños
      colors: ["#fff"], // Blanco sólido
      strokeColors: "#fff", // Borde blanco
      strokeWidth: 1, // Borde más delgado
      hover: {
        size: 3,
        sizeOffset: 0, // Sin cambio de tamaño en hover
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0,
        opacityTo: 0,
      },
    },
    tooltip: {
      enabled: false,
    },
    grid: {
      show: false,
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);

  // Definir una constante para el ancho de la tarjeta
  const CARD_WIDTH = 280; // Ancho de cada tarjeta + espacio
  const CARDS_PER_PAGE = 3; // Número de tarjetas visibles por página

  const scrollCards = (direction: string) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      // Desplazarse por la cantidad exacta de una página (3 tarjetas)
      const scrollAmount =
        direction === "left"
          ? -CARD_WIDTH * CARDS_PER_PAGE
          : CARD_WIDTH * CARDS_PER_PAGE;

      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });

      // Actualizar la página activa basada en la dirección
      if (direction === "left" && activePage > 0) {
        setActivePage(activePage - 1);
      } else if (direction === "right" && activePage < 2) {
        setActivePage(activePage + 1);
      }
    }
  };

  const scrollToPage = (pageIndex: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: pageIndex * CARD_WIDTH * CARDS_PER_PAGE,
        behavior: "smooth",
      });
      setActivePage(pageIndex);
    }
  };
  return (
    <>
      <div className="w-full p-6 rounded-lg shadow-lg min-h-screen bg-gray-50 dark:bg-boxdark">
        <div className="max-w-screen-2xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 mb-6">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white">
              Panel de análisis inteligente
            </h1>
            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 sm:gap-4">
              <select
                className="w-full sm:w-auto px-3 sm:px-4 py-2 border rounded-lg bg-white dark:bg-boxdark dark:border-strokedark dark:text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                value={timeFrame}
                onChange={(e) => setTimeFrame(e.target.value as TimeFrameType)}
              >
                <option value={TIME_FRAMES.TODAY}>Hoy</option>
                <option value={TIME_FRAMES.YESTERDAY}>Ayer</option>
                <option value={TIME_FRAMES.LAST_7_DAYS}>Últimos 7 días</option>
                <option value={TIME_FRAMES.CURRENT_MONTH}>Mes</option>
                <option value={TIME_FRAMES.LAST_MONTH}>Mes Anterior</option>
                <option value={TIME_FRAMES.CURRENT_YEAR}>Año</option>
                <option value={TIME_FRAMES.ALL_TIME}>Toda la Historia</option>
              </select>
              {/* <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm sm:text-base transition-colors duration-200">
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Exportar Excel</span>
              </button> */}
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="mb-6">
            {/* Contenedor principal con indicador de desplazamiento */}
            <div className="relative">
              {/* Contenedor con desplazamiento horizontal */}
              <div
                className="overflow-x-auto pb-4 hide-scrollbar"
                ref={scrollContainerRef}
              >
                <div className="flex space-x-4 sm:space-x-6 w-max">
                  {/* Puntos Card */}
                  <AnimatedCss animation="fadeInUp" duration="1s" delay="0.1s">
                    <div className="p-6 bg-gradient-to-b from-indigo-600 to-indigo-400 dark:to-indigo-800 rounded-lg shadow-lg relative overflow-hidden h-48 w-72 sm:w-80">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-3xl font-bold text-white mb-1">
                            {metrics.points.count.toLocaleString()}
                            <span
                              className={`text-sm font-normal ml-2 ${
                                metrics.points.growth_indicator.trend === "up"
                                  ? "text-green-300"
                                  : metrics.points.growth_indicator.trend ===
                                    "down"
                                  ? "text-red-300"
                                  : "text-gray-300"
                              }`}
                            >
                              ({metrics.points.growth_indicator.label})
                            </span>
                          </p>
                          <p className="text-white/90 text-sm">Total Puntos</p>
                        </div>
                      </div>
                      <div className="h-16">
                        <ReactApexChart
                          options={chartOptions}
                          series={[
                            {
                              name: "Points",
                              data: metrics.points.trend.map(
                                (point) => point.total_points
                              ),
                            },
                          ]}
                          type="area"
                          height={60}
                        />
                      </div>
                    </div>
                  </AnimatedCss>

                  {/* Canjes Card */}
                  <AnimatedCss animation="fadeInUp" duration="1s" delay="0.2s">
                    <div className="p-6 bg-gradient-to-b from-gray-600 to-gray-400 dark:to-gray-800 rounded-lg shadow-lg relative overflow-hidden h-48 w-72 sm:w-80">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-3xl font-bold text-white mb-1">
                            {metrics.coupons.count}
                            <span
                              className={`text-sm font-normal ml-2 ${
                                metrics.coupons.growth_indicator.trend === "up"
                                  ? "text-green-300"
                                  : metrics.coupons.growth_indicator.trend ===
                                    "down"
                                  ? "text-red-300"
                                  : "text-gray-300"
                              }`}
                            >
                              ({metrics.coupons.growth_indicator.label})
                            </span>
                          </p>
                          <p className="text-white/90 text-sm">
                            Canjes Realizados
                          </p>
                        </div>
                      </div>
                      <div className="h-16">
                        <ReactApexChart
                          options={chartOptions}
                          series={[
                            {
                              name: "Coupons",
                              data: metrics.coupons.trend
                                .slice(-7)
                                .map(() => Math.floor(Math.random() * 100)),
                            },
                          ]}
                          type="area"
                          height={60}
                        />
                      </div>
                    </div>
                  </AnimatedCss>

                  {/* Promociones Card */}
                  <AnimatedCss animation="fadeInUp" duration="1s" delay="0.3s">
                    <div className="p-6 bg-gradient-to-b from-amber-600 to-amber-300 dark:to-amber-800 rounded-lg shadow-lg relative overflow-hidden h-48 w-72 sm:w-80">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-3xl font-bold text-white mb-1">
                            {metrics.promotions.count}
                            <span
                              className={`text-sm font-normal ml-2 ${
                                metrics.promotions.growth_indicator.trend ===
                                "up"
                                  ? "text-green-300"
                                  : metrics.promotions.growth_indicator
                                      .trend === "down"
                                  ? "text-red-300"
                                  : "text-gray-300"
                              }`}
                            >
                              ({metrics.promotions.growth_indicator.label})
                            </span>
                          </p>
                          <p className="text-white/90 text-sm">
                            Promociones Activas
                          </p>
                        </div>
                      </div>
                      <div className="h-16">
                        <ReactApexChart
                          options={{
                            ...chartOptions,
                            stroke: {
                              ...chartOptions.stroke,
                              colors: ["rgba(255,255,255,0.8)"],
                            },
                          }}
                          series={[
                            {
                              name: "Promociones",
                              data: metrics.promotions.trend
                                .slice(-7)
                                .map(() => Math.floor(Math.random() * 100)),
                            },
                          ]}
                          type="area"
                          height={60}
                        />
                      </div>
                    </div>
                  </AnimatedCss>

                  {/* Encuestas Card */}
                  <AnimatedCss animation="fadeInUp" duration="1s" delay="0.4s">
                    <div className="p-6 bg-gradient-to-b from-teal-600 to-teal-400 dark:to-teal-800 rounded-lg shadow-lg relative overflow-hidden h-48 w-72 sm:w-80">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-3xl font-bold text-white mb-1">
                            {metrics.surveys.count}
                            <span
                              className={`text-sm font-normal ml-2 ${
                                metrics.surveys.growth_indicator.trend === "up"
                                  ? "text-green-300"
                                  : metrics.surveys.growth_indicator.trend ===
                                    "down"
                                  ? "text-red-300"
                                  : "text-gray-300"
                              }`}
                            >
                              ({metrics.surveys.growth_indicator.label})
                            </span>
                          </p>
                          <p className="text-white/90 text-sm">
                            Encuestas Completadas
                          </p>
                        </div>
                      </div>
                      <div className="h-16">
                        <ReactApexChart
                          options={{
                            chart: {
                              type: "bar" as const,
                              sparkline: {
                                enabled: true,
                              },
                              toolbar: {
                                show: false,
                              },
                            },
                            plotOptions: {
                              bar: {
                                borderRadius: 2,
                                columnWidth: "50%",
                                colors: {
                                  ranges: [
                                    {
                                      from: 0,
                                      to: Infinity,
                                      color: "rgba(255, 255, 255, 0.3)",
                                    },
                                  ],
                                },
                              },
                            },
                            stroke: {
                              show: false,
                            },
                            fill: {
                              opacity: 1,
                            },
                            tooltip: {
                              enabled: false,
                            },
                            grid: {
                              show: false,
                            },
                            xaxis: {
                              labels: {
                                show: false,
                              },
                              axisBorder: {
                                show: false,
                              },
                            },
                            yaxis: {
                              labels: {
                                show: false,
                              },
                            },
                          }}
                          series={[
                            {
                              name: "Encuestas",
                              data: metrics.surveys.trend
                                .slice(-12)
                                .map(() => Math.floor(Math.random() * 50)),
                            },
                          ]}
                          type="bar"
                          height={60}
                        />
                      </div>
                    </div>
                  </AnimatedCss>

                  {/* Estudios de Mercado Card */}
                  <div className="p-6 bg-gradient-to-b from-purple-600 to-purple-400 dark:to-purple-800 rounded-lg shadow-lg relative overflow-hidden h-48 w-72 sm:w-80">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-3xl font-bold text-white mb-1">
                          {metrics.marketStudies.count}
                          <span
                            className={`text-sm font-normal ml-2 ${
                              metrics.marketStudies.growth_indicator.trend ===
                              "up"
                                ? "text-green-300"
                                : metrics.marketStudies.growth_indicator
                                    .trend === "down"
                                ? "text-red-300"
                                : "text-gray-300"
                            }`}
                          >
                            ({metrics.marketStudies.growth_indicator.label})
                          </span>
                        </p>
                        <p className="text-white/90 text-sm">
                          Estudios de Mercado
                        </p>
                      </div>
                    </div>
                    <div className="h-16">
                      <ReactApexChart
                        options={{
                          chart: {
                            type: "bar" as const,
                            sparkline: {
                              enabled: true,
                            },
                            toolbar: {
                              show: false,
                            },
                          },
                          plotOptions: {
                            bar: {
                              borderRadius: 2,
                              columnWidth: "50%",
                              colors: {
                                ranges: [
                                  {
                                    from: 0,
                                    to: Infinity,
                                    color: "rgba(255, 255, 255, 0.3)",
                                  },
                                ],
                              },
                            },
                          },
                          stroke: {
                            show: false,
                          },
                          fill: {
                            opacity: 1,
                          },
                          tooltip: {
                            enabled: false,
                          },
                          grid: {
                            show: false,
                          },
                          xaxis: {
                            labels: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                            },
                          },
                          yaxis: {
                            labels: {
                              show: false,
                            },
                          },
                        }}
                        series={[
                          {
                            name: "Estudios de Mercado",
                            data: metrics.marketStudies.trend
                              .slice(-12)
                              .map(() => Math.floor(Math.random() * 50)),
                          },
                        ]}
                        type="bar"
                        height={60}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Indicadores de navegación */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2">
                <button
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-r-lg text-white backdrop-blur-sm"
                  aria-label="Desplazar izquierda"
                  onClick={() => scrollCards("left")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
              </div>

              <div className="absolute right-0 top-1/2 -translate-y-1/2">
                <button
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-l-lg text-white backdrop-blur-sm"
                  aria-label="Desplazar derecha"
                  onClick={() => scrollCards("right")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Indicadores de página */}
            <div className="flex justify-center mt-4">
              <div className="flex space-x-2">
                <span
                  className={`w-2 h-2 rounded-full cursor-pointer ${
                    activePage === 0
                      ? "bg-gray-800 dark:bg-gray-300"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                  onClick={() => scrollToPage(0)}
                ></span>
                <span
                  className={`w-2 h-2 rounded-full cursor-pointer ${
                    activePage === 1
                      ? "bg-gray-800 dark:bg-gray-300"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                  onClick={() => scrollToPage(1)}
                ></span>
                <span
                  className={`w-2 h-2 rounded-full cursor-pointer ${
                    activePage === 2
                      ? "bg-gray-800 dark:bg-gray-300"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                  onClick={() => scrollToPage(2)}
                ></span>
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <AnimatedCss animation="fadeInLeft" duration="1s" delay="0.5s">
              <div className="bg-white dark:bg-boxdark rounded-lg shadow-sm">
                <div className="h-[auto] sm:h-[auto]">
                  <ChartComponent
                    title="Métrica de Promociones, Canjes y Encuestas"
                    series={chartData.series}
                    categories={chartData.categories}
                    chartType="bar"
                    colors={["#3C50E0", "#80CAEE", "#ff0000"]}
                  />
                </div>
              </div>
            </AnimatedCss>
            <AnimatedCss animation="fadeInRight" duration="1s" delay="0.5s">
              <div className="bg-white dark:bg-boxdark rounded-lg shadow-sm">
                <div className="h-auto">
                  {/* Pasar el timeFrame seleccionado como prop al componente ChartThree */}
                  <ChartThree timeFrame={timeFrame} />
                </div>
              </div>
            </AnimatedCss>
          </div>
          <div className="mb-6">
            {/* Chart Component - Full Width */}
            <AnimatedCss animation="fadeInUp" duration="1s" delay="0.5s">
              <div className="lg:col-span-2 bg-white dark:bg-boxdark rounded-lg shadow-sm">
                <ChartOne data={pointsTrendData} />
              </div>
            </AnimatedCss>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmartDashboard;
