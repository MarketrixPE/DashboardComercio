import React, { useRef, useState } from "react";
import { Download } from "lucide-react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import ChartOne from "../../../shared/components/Molecules/Charts/ChartOne";
import ChartComponent from "../../../shared/components/Molecules/Charts/ChartTwo";
import AnimatedCss from "../../../shared/components/Atoms/Animated/Animated";
import "./SmartDashboard.css";
import {
  areaChartOptions,
  barChartOptions,
} from "../../../shared/components/Organisms/chartOptions/chartOptions";
import ComparisonModal from "../../../shared/components/Organisms/ComparisonModal/ComparisonModal";
import MetricCard from "../../../shared/components/Organisms/MetricCard/MetricCard";
import { HelperService } from "../../../core/services/HelperService";
import {
  useMetricsWebSocket,
  TimeFrameType,
  TIME_FRAMES,
} from "../../../shared/hooks/useMetricsWebSocket";

const SmartDashboard: React.FC = () => {
  const {
    timeFrame,
    setTimeFrame,
    metrics,
    chartData,
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
  } = useMetricsWebSocket();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);
  const userRole = HelperService.getUserRole();

  const CARD_WIDTH = 280;
  const CARDS_PER_PAGE = 3;

  const exportToExcel = async () => {
    try {
      const workbook = new ExcelJS.Workbook();
      workbook.creator = "SmartDashboard";
      workbook.created = new Date();

      // Hoja de Métricas
      const metricsSheet = workbook.addWorksheet("Métricas");
      metricsSheet.columns = [
        { header: "Métrica", key: "metric", width: 25 },
        { header: "Valor", key: "value", width: 12 },
        { header: "Tendencia", key: "trend", width: 15 },
      ];

      metricsSheet.addRows([
        {
          metric: "Total Puntos",
          value: metrics.points.count,
          trend: metrics.points.growth_indicator.label,
        },
        {
          metric: "Encuestas Completadas",
          value: metrics.surveys.count,
          trend: metrics.surveys.growth_indicator.label,
        },
        {
          metric: "Estudios de Mercado",
          value: metrics.marketStudies.count,
          trend: metrics.marketStudies.growth_indicator.label,
        },
        {
          metric: "Promociones Lanzadas",
          value: metrics.promotions.count,
          trend: metrics.promotions.growth_indicator.label,
        },
        {
          metric: "Canjes Realizados",
          value: metrics.coupons.count,
          trend: metrics.coupons.growth_indicator.label,
        },
      ]);

      // Hoja de Datos de Gráficos
      const chartSheet = workbook.addWorksheet("Datos de Gráficos");
      chartSheet.columns = [
        { header: "Fecha", key: "date", width: 15 },
        { header: "Promociones", key: "promotions", width: 12 },
        { header: "Estudios de Mercado", key: "marketStudies", width: 15 },
        { header: "Canjes", key: "redemptions", width: 12 },
        { header: "Encuestas", key: "surveys", width: 12 },
      ];

      const chartDataRows = chartData.categories.map((category, index) => ({
        date: category,
        promotions: chartData.series[0]?.data[index] || 0,
        marketStudies: chartData.series[1]?.data[index] || 0,
        redemptions: chartData.series[2]?.data[index] || 0,
        surveys: chartData.series[3]?.data[index] || 0,
      }));
      chartSheet.addRows(chartDataRows);

      // Hoja de Tendencias de Puntos
      const trendSheet = workbook.addWorksheet("Tendencias de Puntos");
      trendSheet.columns = [
        { header: "Fecha", key: "date", width: 15 },
        { header: "Puntos Ganados", key: "gained", width: 15 },
        { header: "Puntos Perdidos", key: "lost", width: 15 },
      ];

      // Mapeo corregido para pointsGainedLostTrend
      const trendDataRows = (pointsGainedLostTrend || []).map((item: any) => ({
        date: item.date || "N/A",
        gained: typeof item.points_gained === "number" ? item.points_gained : 0,
        lost: typeof item.points_lost === "number" ? item.points_lost : 0,
      }));
      trendSheet.addRows(
        trendDataRows.length
          ? trendDataRows
          : [{ date: "N/A", gained: 0, lost: 0 }]
      );

      // Estilizar todas las hojas
      [metricsSheet, chartSheet, trendSheet].forEach((sheet) => {
        const headerRow = sheet.getRow(1);
        headerRow.font = { bold: true, size: 12 };
        headerRow.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFDDDDDD" },
        };
        headerRow.alignment = { vertical: "middle", horizontal: "center" };
        headerRow.height = 25;

        sheet.eachRow((row, rowNumber) => {
          if (rowNumber > 1) {
            row.eachCell((cell) => {
              cell.alignment = { vertical: "middle", horizontal: "left" };
              cell.border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" },
              };
            });
          }
        });
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(
        blob,
        `Dashboard_${timeFrame}_${new Date().toISOString().split("T")[0]}.xlsx`
      );
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      alert("Error al exportar el archivo. Por favor, intenta de nuevo.");
    }
  };

  const scrollCards = (direction: string) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount =
        direction === "left"
          ? -CARD_WIDTH * CARDS_PER_PAGE
          : CARD_WIDTH * CARDS_PER_PAGE;

      container.scrollBy({ left: scrollAmount, behavior: "smooth" });

      if (direction === "left" && activePage > 0) {
        setActivePage(activePage - 1);
      } else if (direction === "right" && activePage < 2) {
        setActivePage(activePage + 1);
      }
    }
  };

  return (
    <>
      <div className="w-full p-6 rounded-lg shadow-lg min-h-screen bg-gray-50 dark:bg-boxdark">
        <div className="max-w-screen-2xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 mb-6">
            <h1 className="text-lg sm:text-xl lg:text-3xl font-bold text-gray-800 dark:text-white">
              Panel de análisis inteligente
            </h1>
            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2 sm:gap-3">
              <select
                className="w-full sm:w-40 px-2 sm:px-3 py-1 sm:py-2 border rounded-lg bg-white dark:bg-boxdark dark:border-strokedark dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
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
              {userRole !== 3 && (
                <select
                  className="w-full sm:w-40 px-2 sm:px-3 py-1 sm:py-2 border rounded-lg bg-white dark:bg-boxdark dark:border-strokedark dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                >
                  <option value="">Todas las sucursales</option>
                  {branches.map((branch) => (
                    <option key={branch.uuid} value={branch.uuid}>
                      {branch.descripcion}
                    </option>
                  ))}
                </select>
              )}
              <button
                className="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors duration-200"
                onClick={exportToExcel}
              >
                <Download className="w-4 h-4" />
                <span>Exportar Excel</span>
              </button>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="mb-6">
            <div
              className="grid grid-cols-1 sm:flex sm:overflow-x-auto pb-4 hide-scrollbar"
              ref={scrollContainerRef}
            >
              <div className="grid grid-cols-1 sm:flex sm:space-x-4 sm:w-max gap-4 sm:gap-0">
                <MetricCard
                  title="Total Puntos"
                  count={metrics.points.count}
                  growthLabel={metrics.points.growth_indicator.label}
                  trend={metrics.points.trend}
                  trendKey="total_points"
                  gradient="from-indigo-600 to-indigo-400"
                  darkGradient="dark:to-indigo-800"
                  buttonColor="bg-indigo-700"
                  buttonHoverColor="hover:bg-indigo-800"
                  chartType="area"
                  chartOptions={areaChartOptions}
                  onCompareClick={() => {
                    setComparisonMetric("points");
                    setShowCompareModal(true);
                  }}
                  animationDelay="0.1s"
                />
                <MetricCard
                  title="Encuestas Completadas"
                  count={metrics.surveys.count}
                  growthLabel={metrics.surveys.growth_indicator.label}
                  trend={metrics.surveys.trend}
                  trendKey="total_surveys"
                  gradient="from-teal-600 to-teal-400"
                  darkGradient="dark:to-teal-800"
                  buttonColor="bg-teal-700"
                  buttonHoverColor="hover:bg-teal-800"
                  chartType="bar"
                  chartOptions={barChartOptions}
                  onCompareClick={() => {
                    setComparisonMetric("surveys");
                    setShowCompareModal(true);
                  }}
                  animationDelay="0.4s"
                />
                <MetricCard
                  title="Estudios de Mercado"
                  count={metrics.marketStudies.count}
                  growthLabel={metrics.marketStudies.growth_indicator.label}
                  trend={metrics.marketStudies.trend}
                  trendKey="total_market_studies"
                  gradient="from-purple-600 to-purple-400"
                  darkGradient="dark:to-purple-800"
                  buttonColor="bg-purple-700"
                  buttonHoverColor="hover:bg-purple-800"
                  chartType="bar"
                  chartOptions={barChartOptions}
                  onCompareClick={() => {
                    setComparisonMetric("marketStudies");
                    setShowCompareModal(true);
                  }}
                  animationDelay="0.5s"
                />
                <MetricCard
                  title="Promociones Lanzadas"
                  count={metrics.promotions.count}
                  growthLabel={metrics.promotions.growth_indicator.label}
                  trend={metrics.promotions.trend}
                  trendKey="total_promotions"
                  gradient="from-amber-600 to-amber-300"
                  darkGradient="dark:to-amber-800"
                  buttonColor="bg-amber-700"
                  buttonHoverColor="hover:bg-amber-800"
                  chartType="area"
                  chartOptions={{
                    ...areaChartOptions,
                    stroke: {
                      ...areaChartOptions.stroke,
                      colors: ["rgba(255,255,255,0.8)"],
                    },
                  }}
                  onCompareClick={() => {
                    setComparisonMetric("promotions");
                    setShowCompareModal(true);
                  }}
                  animationDelay="0.3s"
                />
                <MetricCard
                  title="Canjes Realizados"
                  count={metrics.coupons.count}
                  growthLabel={metrics.coupons.growth_indicator.label}
                  trend={metrics.coupons.trend}
                  trendKey="total_coupons"
                  gradient="from-gray-600 to-gray-400"
                  darkGradient="dark:to-gray-800"
                  buttonColor="bg-gray-700"
                  buttonHoverColor="hover:bg-gray-800"
                  chartType="area"
                  chartOptions={areaChartOptions}
                  onCompareClick={() => {
                    setComparisonMetric("coupons");
                    setShowCompareModal(true);
                  }}
                  animationDelay="0.2s"
                />
              </div>
            </div>

            {/* Mostrar flechas y paginación solo en pantallas grandes */}
            <div className="hidden sm:block relative">
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
                      d="M15 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <AnimatedCss animation="fadeInLeft" duration="1s" delay="0.5s">
              <div className="bg-white dark:bg-boxdark rounded-lg shadow-sm">
                <div className="h-[312px] sm:h-[412px] lg:h-[462px]">
                  <ChartComponent
                    title="Métricas de Promociones, Estudios, Canjes y Encuestas"
                    series={chartData.series}
                    categories={chartData.categories}
                    chartType="bar"
                    colors={["#1e9a90", "#9433ea", "#dc6c10", "#3d4f67"]}
                  />
                </div>
              </div>
            </AnimatedCss>

            <AnimatedCss animation="fadeInRight" duration="1s" delay="0.5s">
              <div className="bg-white dark:bg-boxdark rounded-lg shadow-sm">
                <div className="h-[300px] sm:h-[400px] lg:h-[450px]">
                  <ChartOne
                    data={pointsGainedLostTrend || []}
                    timeFrame={timeFrame}
                  />
                </div>
              </div>
            </AnimatedCss>
          </div>
        </div>
      </div>

      <ComparisonModal
        comparisonMetric={comparisonMetric}
        showCompareModal={showCompareModal}
        setShowCompareModal={setShowCompareModal}
        compareTimeFrame1={compareTimeFrame1}
        setCompareTimeFrame1={setCompareTimeFrame1}
        compareTimeFrame2={compareTimeFrame2}
        setCompareTimeFrame2={setCompareTimeFrame2}
        range1Data={range1Data}
        range2Data={range2Data}
      />
    </>
  );
};

export default SmartDashboard;
