import { ApexOptions } from "apexcharts";
import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";

// Interfaz para los datos de points-gained-lost-trend
export interface PointsGainedLostTrend {
  date: string;
  points_gained: number;
  points_lost: number;
}

interface ChartOneProps {
  data: PointsGainedLostTrend[];
  timeFrame: string;
}

const ChartOne: React.FC<ChartOneProps> = ({ data, timeFrame }) => {
  const processedData = useMemo(() => {
    if (!data || data.length === 0) {
      return { dates: [], gainedPoints: [], lostPoints: [] };
    }

    const groupByTimeUnit = (items: PointsGainedLostTrend[]) => {
      const grouped = items.reduce((acc, item) => {
        const date = new Date(item.date);
        let key;
        switch (timeFrame) {
          case "today":
          case "yesterday":
            key = date.toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
              timeZone: "America/Bogota",
            }).replace(/:\d{2}\s/, " "); // Quitar minutos y dos puntos, dejando solo "12 p.m."
            break;
          case "last_7_days":
            key = date.toLocaleDateString("es-ES", { weekday: "short" });
            break;
          case "current_month":
          case "last_month":
            key = date.toLocaleDateString("es-ES", { day: "2-digit" });
            break;
          case "current_year":
            key = date.toLocaleDateString("es-ES", { month: "short" });
            break;
          default:
            key = date.toLocaleDateString("es-ES", { day: "2-digit", month: "short" });
        }
        if (!acc[key]) {
          acc[key] = { points_gained: 0, points_lost: 0, count: 0, originalDate: date };
        }
        acc[key].points_gained += item.points_gained ?? 0;
        acc[key].points_lost += item.points_lost ?? 0;
        acc[key].count += 1;
        return acc;
      }, {} as Record<string, { points_gained: number; points_lost: number; count: number; originalDate: Date }>);

      const dates = Object.keys(grouped).sort((a, b) => {
        const aDate = grouped[a].originalDate;
        const bDate = grouped[b].originalDate;

        if (timeFrame === "today" || timeFrame === "yesterday") {
          const aHour = aDate.getHours();
          const bHour = bDate.getHours();
          return aHour - bHour;
        } else if (timeFrame === "last_7_days") {
          const dayOrder = ["sáb", "dom", "lun", "mar", "mié", "jue", "vie"];
          const aDayIndex = dayOrder.indexOf(a);
          const bDayIndex = dayOrder.indexOf(b);
          return aDayIndex - bDayIndex;
        } else {
          return aDate.getTime() - bDate.getTime();
        }
      });

      const gainedPoints = dates.map((key) => grouped[key].points_gained);
      const lostPoints = dates.map((key) => grouped[key].points_lost);

      return { dates, gainedPoints, lostPoints };
    };

    return groupByTimeUnit(data);
  }, [data, timeFrame]);

  const shouldRotateLabels = processedData.dates.length > 5;

  const options: ApexOptions = {
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Satoshi, sans-serif",
      fontSize: "12px",
    },
    colors: ["#008FFB", "#00E396"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      height: 350,
      type: "area",
      dropShadow: {
        enabled: true,
        color: "#623CEA14",
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },
      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: 2,
      curve: "smooth",
    },
    grid: {
      borderColor: "#2D3041",
      strokeDashArray: 0,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: ["#008FFB", "#00E396"],
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 6,
      },
    },
    xaxis: {
      type: "category",
      categories: processedData.dates,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: "#A5A5A5",
        },
        rotate: shouldRotateLabels ? -45 : 0,
        hideOverlappingLabels: true,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
      labels: {
        style: {
          colors: "#A5A5A5",
        },
        formatter: (value) => value.toFixed(0),
      },
      min: Math.floor(Math.min(...processedData.gainedPoints, ...processedData.lostPoints, 0) * 1.1),
      max: Math.ceil(Math.max(...processedData.gainedPoints, ...processedData.lostPoints, 1) * 1.1),
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
    tooltip: {
      theme: "dark",
      custom: ({ series, dataPointIndex }) => {
        const date = processedData.dates[dataPointIndex] || "N/A";
        const gained = series[0][dataPointIndex] || 0;
        const lost = series[1][dataPointIndex] || 0;
        return `
          <div class="p-2 bg-gray-800 text-white rounded">
            <p><strong>${date}</strong></p>
            <p>Puntos Ganados: ${gained.toLocaleString()}</p>
            <p>Puntos Perdidos: ${lost.toLocaleString()}</p>
          </div>
        `;
      },
    },
  };

  const series = [
    {
      name: "Puntos Ganados",
      data: processedData.gainedPoints,
    },
    {
      name: "Puntos Perdidos",
      data: processedData.lostPoints,
    },
  ];

  return (
    <div
      aria-label="Gráfico de tendencia de puntos ganados y perdidos"
      className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-12"
    >
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-full">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-[#3056D3]">
                Tendencia de Puntos Ganados y Perdidos
              </p>
              <p className="text-sm font-medium text-gray-400">
                {processedData.dates.length > 0 ? processedData.dates[0] : "N/A"} -{" "}
                {processedData.dates.length > 0 ? processedData.dates[processedData.dates.length - 1] : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" role="img" aria-label={`Gráfico de tendencia de ${processedData.dates[0] || 'inicio'} a ${processedData.dates[processedData.dates.length - 1] || 'fin'}`}>
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;