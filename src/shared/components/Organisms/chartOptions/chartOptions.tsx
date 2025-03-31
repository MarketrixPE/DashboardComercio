import { ApexOptions } from "apexcharts";

export const areaChartOptions: ApexOptions = {
  chart: {
    type: "area" as const,
    sparkline: { enabled: true },
    toolbar: { show: false },
  },
  stroke: {
    curve: "smooth",
    width: 1.5,
    colors: ["rgba(255,255,255,0.8)"],
  },
  markers: {
    size: 3,
    colors: ["#fff"],
    strokeColors: "#fff",
    strokeWidth: 1,
    hover: { size: 3, sizeOffset: 0 },
  },
  fill: {
    type: "gradient",
    gradient: { opacityFrom: 0, opacityTo: 0 },
  },
  tooltip: { enabled: false },
  grid: { show: false },
  xaxis: { labels: { show: false }, axisBorder: { show: false } },
  yaxis: { labels: { show: false } },
};

export const barChartOptions: ApexOptions = {
  chart: {
    type: "bar" as const,
    sparkline: { enabled: true },
    toolbar: { show: false },
  },
  plotOptions: {
    bar: {
      borderRadius: 2,
      columnWidth: "50%",
      colors: {
        ranges: [{ from: 0, to: Infinity, color: "rgba(255, 255, 255, 0.3)" }],
      },
    },
  },
  stroke: { show: false },
  fill: { opacity: 1 },
  tooltip: { enabled: false },
  grid: { show: false },
  xaxis: { labels: { show: false }, axisBorder: { show: false } },
  yaxis: { labels: { show: false } },
};