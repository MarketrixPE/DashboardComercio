import React, { useRef, useState } from "react";
import { Download } from "lucide-react";
import ChartOne from "../../../shared/components/Molecules/Charts/ChartOne";
import ChartComponent from "../../../shared/components/Molecules/Charts/ChartTwo";
import AnimatedCss from "../../../shared/components/Atoms/Animated/Animated";
import "./SmartDashboard.css";
import { areaChartOptions, barChartOptions } from "../../../shared/components/Organisms/chartOptions/chartOptions";
import ComparisonModal from "../../../shared/components/Organisms/ComparisonModal/ComparisonModal";
import MetricCard from "../../../shared/components/Organisms/MetricCard/MetricCard";
import { useMetrics, TimeFrameType, TIME_FRAMES } from "../../../shared/hooks/useMetrics";


const SmartDashboard: React.FC = () => {
  const {
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
  } = useMetrics();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);

  const CARD_WIDTH = 280;
  const CARDS_PER_PAGE = 3;

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
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm sm:text-base transition-colors duration-200">
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Exportar Excel</span>
              </button>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="mb-6">
            <div className="relative">
              <div className="overflow-x-auto pb-4 hide-scrollbar" ref={scrollContainerRef}>
                <div className="flex space-x-4 sm:space-x-6 w-max">
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
                  <MetricCard
                    title="Promociones Activas"
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
                      stroke: { ...areaChartOptions.stroke, colors: ["rgba(255,255,255,0.8)"] },
                    }}
                    onCompareClick={() => {
                      setComparisonMetric("promotions");
                      setShowCompareModal(true);
                    }}
                    animationDelay="0.3s"
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
                </div>
              </div>

              {/* Navigation Arrows */}
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

            {/* Pagination Dots */}
            <div className="flex justify-center mt-4">
              <div className="flex space-x-2">
                {[0, 1, 2].map((page) => (
                  <span
                    key={page}
                    className={`w-2 h-2 rounded-full cursor-pointer ${
                      activePage === page
                        ? "bg-gray-800 dark:bg-gray-300"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                    onClick={() => scrollToPage(page)}
                  ></span>
                ))}
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
                <div className="h-auto">{/* <ChartThree /> */}</div>
              </div>
            </AnimatedCss>
          </div>
          <div className="mb-6">
            <AnimatedCss animation="fadeInUp" duration="1s" delay="0.5s">
              <div className="lg:col-span-2 bg-white dark:bg-boxdark rounded-lg shadow-sm">
                <ChartOne data={pointsTrendData} />
              </div>
            </AnimatedCss>
          </div>
        </div>
      </div>

      {/* Comparison Modal */}
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