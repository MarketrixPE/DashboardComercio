import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import AnimatedCss from "../../Atoms/Animated/Animated";

// Definimos un tipo genérico para los objetos de trend
interface TrendItem {
  date: string; // Propiedad común en todos los trends
  [key: string]: string | number; // Permitimos otras propiedades que pueden ser string o number
}

interface MetricCardProps {
  title: string;
  count: number;
  growthLabel: string;
  trend: TrendItem[]; // Usamos el tipo TrendItem
  trendKey: string; // La clave que usaremos para los datos del gráfico (debe ser un número)
  gradient: string;
  darkGradient: string;
  buttonColor: string;
  buttonHoverColor: string;
  chartType: "area" | "bar";
  chartOptions: ApexOptions;
  onCompareClick: () => void;
  animationDelay: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  count,
  growthLabel,
  trend,
  trendKey,
  gradient,
  darkGradient,
  buttonColor,
  buttonHoverColor,
  chartType,
  chartOptions,
  onCompareClick,
  animationDelay,
}) => {
  const trendClass =
    growthLabel.includes("Nuevo crecimiento") || growthLabel.includes("+")
      ? "text-green-300"
      : growthLabel.includes("-")
      ? "text-red-300"
      : "text-gray-300";

  // Aseguramos que los datos del gráfico sean números
  const chartData = trend.map((item) => {
    const value = item[trendKey];
    return typeof value === "number" ? value : 0; // Si no es un número, devolvemos 0
  });

  return (
    <AnimatedCss animation="fadeInUp" duration="1s" delay={animationDelay}>
      <div
        className={`p-6 bg-gradient-to-b ${gradient} ${darkGradient} rounded-lg shadow-lg relative overflow-hidden h-48 w-72 sm:w-80`}
      >
        <div className="flex justify-between items-start">
          <div>
            <p className="text-3xl font-bold text-white mb-1">
              {count.toLocaleString()}
              <span className={`text-sm font-normal ml-2 ${trendClass}`}>
                ({growthLabel})
              </span>
            </p>
            <p className="text-white/90 text-sm">{title}</p>
          </div>
          <button
            onClick={onCompareClick}
            className={`text-white text-sm ${buttonColor} ${buttonHoverColor} px-3 py-1 rounded-lg transition-colors duration-200`}
          >
            Comparar
          </button>
        </div>
        <div className="h-16">
          <ReactApexChart
            options={chartOptions}
            series={[{ name: title, data: chartData }]}
            type={chartType}
            height={60}
          />
        </div>
      </div>
    </AnimatedCss>
  );
};

export default MetricCard;