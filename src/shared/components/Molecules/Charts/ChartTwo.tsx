import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface ChartProps {
  title: string;
  series: {
    name: string;
    data: number[];
  }[];
  categories: string[];
  chartType?: 'bar' | 'line';
  colors?: string[];
  height?: number;
  widthClass?: string; // Nueva propiedad para personalizar la clase del ancho
}

const ChartComponent: React.FC<ChartProps> = ({
  title,
  series,
  categories,
  chartType = 'bar',
  colors = ['#3C50E0', '#80CAEE', '#FF4560', '#00E396'],
  height = 348,
  widthClass = 'w-full', // Por defecto w-4/5
}) => {
  const options: ApexOptions = {
    colors,
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: chartType,
      height,
      stacked: false, // Desapilamos las barras
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%', // Ajusta el ancho de las columnas
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories, // Categorías dinámicas basadas en los datos que pases
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      fontFamily: 'Satoshi',
      fontWeight: 500,
      fontSize: '14px',
      markers: {
        size: 6, // Cambié `radius` a `size` para ajustar el tamaño del marcador
      },
    },
    fill: {
      opacity: 1,
    },
  };

  return (
    <div className={`col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-10 h-full pb-0 ${widthClass}`}>
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            {title}
          </h4>
        </div>
      </div>

      <div>
        <div id="chart" className="">
          <ReactApexChart
            options={options}
            series={series}
            type={chartType}
            height={height}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;
