import { ApexOptions } from "apexcharts";
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import GeneralService from "../../../../core/services/GeneralService";
import { TIME_FRAMES } from "../../../../feature/Operador/EstadisticaComercio/fakeDataService";


// Definimos la estructura de datos para el gráfico
interface GenderDataItem {
  gender: string;
  count: number;
  percentage: number;
  color: string;
}

interface ChartThreeProps {
  timeFrame?: string;
}

const ChartThree: React.FC<ChartThreeProps> = ({ timeFrame = TIME_FRAMES.TODAY }) => {
  const [series, setSeries] = useState<number[]>([44, 56]);
  const [labels, setLabels] = useState<string[]>(["Mujeres", "Hombres"]);
  const [colors, setColors] = useState<string[]>(["#8FD0EF", "#0FADCF"]);
  const [genderData, setGenderData] = useState<GenderDataItem[]>([
    { gender: "Mujeres", count: 1650, percentage: 44, color: "#8FD0EF" },
    { gender: "Hombres", count: 2100, percentage: 56, color: "#0FADCF" }
  ]);
  const [loading, setLoading] = useState(false);
  const userId = GeneralService.getUserId();

  // Opciones del gráfico
  const options: ApexOptions = {
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "donut",
    },
    colors: colors,
    labels: labels,
    legend: {
      show: false,
      position: "bottom",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          background: "transparent",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 350,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  // Función para generar datos de género basados en el timeFrame
  const generateGenderData = (timeFrame: string): Promise<GenderDataItem[]> => {
    return new Promise((resolve) => {
      // Base de datos predefinida
      const baseData = [
        { gender: "Mujeres", baseCount: 16200, color: "#8FD0EF" },
        { gender: "Hombres", baseCount: 14500, color: "#0FADCF" }
      ];
      
      // Multiplicador según el filtro de tiempo
      let multiplier = 1.0;
      switch (timeFrame) {
        case TIME_FRAMES.TODAY:
          multiplier = 0.08;
          break;
        case TIME_FRAMES.YESTERDAY:
          multiplier = 0.09;
          break;
        case TIME_FRAMES.LAST_7_DAYS:
          multiplier = 0.3;
          break;
        case TIME_FRAMES.CURRENT_MONTH:
          multiplier = 0.65;
          break;
        case TIME_FRAMES.LAST_MONTH:
          multiplier = 0.60;
          break;
        case TIME_FRAMES.CURRENT_YEAR:
          multiplier = 0.9;
          break;
        case TIME_FRAMES.ALL_TIME:
          multiplier = 1.0;
          break;
      }
      
      // Generar variación basada en el timeFrame y calcular totales
      let total = 0;
      const data: GenderDataItem[] = baseData.map(item => {
        // Añadir variación aleatoria según el timeFrame
        const seed = Date.now() + item.gender.length;
        const randomFactor = ((seed % 20) / 100) - 0.1; // Entre -0.1 y +0.1
        
        const count = Math.round(item.baseCount * multiplier * (1 + randomFactor));
        total += count;
        
        return {
          gender: item.gender,
          count,
          percentage: 0, // Se calculará después
          color: item.color
        };
      });
      
      // Calcular porcentajes
      data.forEach(item => {
        item.percentage = Math.round((item.count / total) * 100);
      });
      
      // Simular retraso de API
      setTimeout(() => {
        resolve(data);
      }, 300);
    });
  };

  // Efecto para cargar datos al cambiar el timeFrame
  useEffect(() => {
    const fetchGenderData = async () => {
      setLoading(true);
      try {
        const data = await generateGenderData(timeFrame);
        setGenderData(data);
        
        // Actualizar series, labels y colors para el gráfico
        setSeries(data.map(item => item.percentage));
        setLabels(data.map(item => item.gender));
        setColors(data.map(item => item.color));
      } catch (error) {
        console.error("Error generando datos de género:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchGenderData();
  }, [timeFrame, userId]);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-4 sm:p-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8 h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h5 className="text-lg sm:text-xl font-semibold text-black dark:text-white">
            Análisis de Género
          </h5>
          {loading && <span className="text-sm text-gray-500">Actualizando datos...</span>}
        </div>
      </div>

      {/* Chart */}
      <div className="mb-6 w-full">
        <div id="chartThree" className="mx-auto flex justify-center">
          {loading ? (
            <div className="h-[350px] flex items-center justify-center">
              <div className="animate-pulse">Cargando datos...</div>
            </div>
          ) : (
            <ReactApexChart
              options={options}
              series={series}
              type="donut"
            />
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 sm:px-8">
        {genderData.map((item, index) => (
          <div key={index} className="flex items-center w-full">
            <span 
              className="mr-2 block h-3 w-3 rounded-full" 
              style={{ backgroundColor: item.color }}
            ></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span>{item.gender}</span>
              <span>{item.percentage}%</span>
            </p>
          </div>
        ))}
      </div>
      
      {/* Total Count */}
      <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
        Total: {loading ? "..." : 
          genderData.reduce((acc, item) => acc + item.count, 0).toLocaleString()} usuarios
      </div>
    </div>
  );
};

export default ChartThree;