import React from "react";
import ReactApexChart from "react-apexcharts";
import { TimeFrameType, TIME_FRAMES } from "../../../hooks/useMetrics";

interface ComparisonModalProps {
  comparisonMetric: "points" | "coupons" | "promotions" | "surveys" | "marketStudies";
  showCompareModal: boolean;
  setShowCompareModal: (value: boolean) => void;
  compareTimeFrame1: TimeFrameType;
  setCompareTimeFrame1: (value: TimeFrameType) => void;
  compareTimeFrame2: TimeFrameType;
  setCompareTimeFrame2: (value: TimeFrameType) => void;
  range1Data: any[];
  range2Data: any[];
}

const ComparisonModal: React.FC<ComparisonModalProps> = ({
  comparisonMetric,
  showCompareModal,
  setShowCompareModal,
  compareTimeFrame1,
  setCompareTimeFrame1,
  compareTimeFrame2,
  setCompareTimeFrame2,
  range1Data,
  range2Data,
}) => {
  if (!showCompareModal) return null;

  const metricTitle =
    comparisonMetric === "points"
      ? "Puntos"
      : comparisonMetric === "coupons"
      ? "Canjes"
      : comparisonMetric === "promotions"
      ? "Promociones"
      : comparisonMetric === "surveys"
      ? "Encuestas"
      : "Estudios de Mercado";

  const dataKey =
    comparisonMetric === "points"
      ? "total_points"
      : comparisonMetric === "coupons"
      ? "total_coupons"
      : comparisonMetric === "promotions"
      ? "total_promotions"
      : comparisonMetric === "surveys"
      ? "total_surveys"
      : "total_market_studies";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999]">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={() => setShowCompareModal(false)}
      ></div>
      <div className="relative bg-white dark:bg-boxdark rounded-lg p-6 shadow-lg w-full max-w-4xl">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Comparar {metricTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-gray-800 dark:text-gray-200 mr-2">
              Período 1:
            </label>
            <select
              className="px-3 py-2 border rounded-lg bg-white dark:bg-boxdark dark:border-strokedark dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
              value={compareTimeFrame1}
              onChange={(e) => setCompareTimeFrame1(e.target.value as TimeFrameType)}
            >
              <option value={TIME_FRAMES.TODAY}>Hoy</option>
              <option value={TIME_FRAMES.YESTERDAY}>Ayer</option>
              <option value={TIME_FRAMES.LAST_7_DAYS}>Últimos 7 días</option>
              <option value={TIME_FRAMES.CURRENT_MONTH}>Mes</option>
              <option value={TIME_FRAMES.LAST_MONTH}>Mes Anterior</option>
              <option value={TIME_FRAMES.CURRENT_YEAR}>Año</option>
              <option value={TIME_FRAMES.ALL_TIME}>Toda la Historia</option>
            </select>
          </div>
          <div>
            <label className="text-gray-800 dark:text-gray-200 mr-2">
              Período 2:
            </label>
            <select
              className="px-3 py-2 border rounded-lg bg-white dark:bg-boxdark dark:border-strokedark dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
              value={compareTimeFrame2}
              onChange={(e) => setCompareTimeFrame2(e.target.value as TimeFrameType)}
            >
              <option value={TIME_FRAMES.TODAY}>Hoy</option>
              <option value={TIME_FRAMES.YESTERDAY}>Ayer</option>
              <option value={TIME_FRAMES.LAST_7_DAYS}>Últimos 7 días</option>
              <option value={TIME_FRAMES.CURRENT_MONTH}>Mes</option>
              <option value={TIME_FRAMES.LAST_MONTH}>Mes Anterior</option>
              <option value={TIME_FRAMES.CURRENT_YEAR}>Año</option>
              <option value={TIME_FRAMES.ALL_TIME}>Toda la Historia</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <ReactApexChart
              options={{
                chart: { type: "bar" as const, toolbar: { show: false } },
                plotOptions: { bar: { borderRadius: 2, columnWidth: "50%" } },
                xaxis: { categories: range1Data.map((item) => item.date), labels: { rotate: -45 } },
                yaxis: { title: { text: metricTitle } },
              }}
              series={[{ name: metricTitle, data: range1Data.map((item) => item[dataKey]) }]}
              type="bar"
              height={300}
            />
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <ReactApexChart
              options={{
                chart: { type: "bar" as const, toolbar: { show: false } },
                plotOptions: { bar: { borderRadius: 2, columnWidth: "50%" } },
                xaxis: { categories: range2Data.map((item) => item.date), labels: { rotate: -45 } },
                yaxis: { title: { text: metricTitle } },
              }}
              series={[{ name: metricTitle, data: range2Data.map((item) => item[dataKey]) }]}
              type="bar"
              height={300}
            />
          </div>
        </div>

        <button
          onClick={() => setShowCompareModal(false)}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ComparisonModal;