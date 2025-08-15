import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { TimeFrameType, TIME_FRAMES } from "../../../hooks/useMetrics";

// Hook personalizado para obtener la altura de la ventana dinámicamente
const useWindowHeight = () => {
  const [windowHeight, setWindowHeight] = useState(typeof window !== "undefined" ? window.innerHeight : 0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Inicializar con la altura actual

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowHeight;
};

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
  const windowHeight = useWindowHeight();

  const chartHeight = Math.floor(windowHeight * 0.4);

  if (!showCompareModal) return null;

  const metricTitle =
    comparisonMetric === "points"
      ? "Puntos Ganados y Perdidos"
      : comparisonMetric === "coupons"
      ? "Canjes"
      : comparisonMetric === "promotions"
      ? "Promociones"
      : comparisonMetric === "surveys"
      ? "Encuestas"
      : "Estudios de Mercado";

  const dataKey =
    comparisonMetric === "points"
      ? null
      : comparisonMetric === "coupons"
      ? "total_coupons"
      : comparisonMetric === "promotions"
      ? "total_promotions"
      : comparisonMetric === "surveys"
      ? "total_surveys"
      : "total_market_studies";

  const groupDataByTimeFrame = (data: any[], timeFrame: TimeFrameType) => {
    if (!data || !data.length) {
      return comparisonMetric === "points"
        ? { categories: [], gainedValues: [], lostValues: [] }
        : { categories: [], values: [] };
    }

    const getTimeKey = (date: string) => {
      const dateObj = new Date(date);
      if (timeFrame === TIME_FRAMES.TODAY || timeFrame === TIME_FRAMES.YESTERDAY) {
        const hours = dateObj.getHours();
        const period = hours >= 12 ? "PM" : "AM";
        const displayHour = hours % 12 || 12;
        return `${displayHour}${period}`;
      } else if (timeFrame === TIME_FRAMES.LAST_7_DAYS) {
        return dateObj.toLocaleDateString("es-ES", { weekday: "short" });
      } else if (timeFrame === TIME_FRAMES.CURRENT_MONTH || timeFrame === TIME_FRAMES.LAST_MONTH) {
        return dateObj.toLocaleDateString("es-ES", { day: "2-digit" });
      } else if (timeFrame === TIME_FRAMES.CURRENT_YEAR) {
        return dateObj.toLocaleDateString("es-ES", { month: "short" });
      } else {
        return dateObj.toLocaleDateString("es-ES", { year: "numeric", month: "2-digit", day: "2-digit" });
      }
    };

    if (comparisonMetric === "points") {
      const groupedData: { [key: string]: { gained: number; lost: number } } = {};
      data.forEach((item) => {
        const timeKey = getTimeKey(item.date);
        if (!groupedData[timeKey]) {
          groupedData[timeKey] = { gained: 0, lost: 0 };
        }
        groupedData[timeKey].gained += item.points_gained || 0;
        groupedData[timeKey].lost += item.points_lost || 0;
      });

      const categories = Object.keys(groupedData).sort((a, b) => {
        if (timeFrame === TIME_FRAMES.TODAY || timeFrame === TIME_FRAMES.YESTERDAY) {
          // Convertir las etiquetas a formato numérico para ordenar correctamente
          const getHourValue = (label: string) => {
            const hour = parseInt(label);
            const isPM = label.includes("PM");
            return (hour % 12) + (isPM ? 12 : 0);
          };
          return getHourValue(a) - getHourValue(b);
        }
        return a.localeCompare(b);
      });
      const gainedValues = categories.map((key) => groupedData[key].gained);
      const lostValues = categories.map((key) => groupedData[key].lost);

      return { categories, gainedValues, lostValues };
    } else {
      const groupedData: { [key: string]: number } = {};
      data.forEach((item) => {
        const timeKey = getTimeKey(item.date);
        if (!groupedData[timeKey]) {
          groupedData[timeKey] = 0;
        }
        groupedData[timeKey] += item[dataKey!] || 0;
      });

      const categories = Object.keys(groupedData).sort((a, b) => {
        if (timeFrame === TIME_FRAMES.TODAY || timeFrame === TIME_FRAMES.YESTERDAY) {
          const getHourValue = (label: string) => {
            const hour = parseInt(label);
            const isPM = label.includes("PM");
            return (hour % 12) + (isPM ? 12 : 0);
          };
          return getHourValue(a) - getHourValue(b);
        }
        return a.localeCompare(b);
      });
      const values = categories.map((key) => groupedData[key]);

      return { categories, values };
    }
  };

  const range1Processed = groupDataByTimeFrame(range1Data, compareTimeFrame1);
  const range2Processed = groupDataByTimeFrame(range2Data, compareTimeFrame2);

  const maxValue1 =
    comparisonMetric === "points"
      ? Math.max(
          ...(range1Processed.gainedValues || []),
          ...(range1Processed.lostValues || []),
          1
        )
      : Math.max(...(range1Processed.values || []), 1);
  const maxValue2 =
    comparisonMetric === "points"
      ? Math.max(
          ...(range2Processed.gainedValues || []),
          ...(range2Processed.lostValues || []),
          1
        )
      : Math.max(...(range2Processed.values || []), 1);
  const yAxisMax1 = Math.ceil(maxValue1 * 1.1);
  const yAxisMax2 = Math.ceil(maxValue2 * 1.1);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999]">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={() => setShowCompareModal(false)}
      ></div>
      <div className="relative bg-white dark:bg-boxdark rounded-lg p-6 shadow-lg w-full max-w-[80%] overflow-y-auto h-full max-h-[80%]">
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
                plotOptions: { bar: { borderRadius: 2, columnWidth: "40%" } },
                xaxis: { categories: range1Processed.categories, labels: { rotate: -45 } },
                yaxis: {
                  title: { text: metricTitle },
                  min: 0,
                  max: yAxisMax1,
                  tickAmount: 5,
                  labels: { formatter: (value) => Math.round(value).toString() },
                },
                legend: { position: "top" },
                colors: comparisonMetric === "points" ? ["#008FFB", "#00E396"] : ["#008FFB"],
              }}
              series={
                comparisonMetric === "points"
                  ? [
                      {
                        name: "Puntos Ganados",
                        data: range1Processed.gainedValues || [],
                      },
                      {
                        name: "Puntos Perdidos",
                        data: range1Processed.lostValues || [],
                      },
                    ]
                  : [{ name: metricTitle, data: range1Processed.values || [] }]
              }
              type="bar"
              height={chartHeight} // Altura proporcional (40% de la pantalla)
            />
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <ReactApexChart
              options={{
                chart: { type: "bar" as const, toolbar: { show: false } },
                plotOptions: { bar: { borderRadius: 2, columnWidth: "40%" } },
                xaxis: { categories: range2Processed.categories, labels: { rotate: -45 } },
                yaxis: {
                  title: { text: metricTitle },
                  min: 0,
                  max: yAxisMax2,
                  tickAmount: 5,
                  labels: { formatter: (value) => Math.round(value).toString() },
                },
                legend: { position: "top" },
                colors: comparisonMetric === "points" ? ["#006abc", "#00ae74"] : ["#6900fb"],
              }}
              series={
                comparisonMetric === "points"
                  ? [
                      { name: "Puntos Perdidos", data: range2Processed.gainedValues || [] },
                      { name: "Puntos Ganados", data: range2Processed.lostValues || [] },
                    ]
                  : [{ name: metricTitle, data: range2Processed.values || [] }]
              }
              type="bar"
              height={chartHeight}
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