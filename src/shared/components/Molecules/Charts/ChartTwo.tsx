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
  widthClass?: string;
}

const ChartComponent: React.FC<ChartProps> = ({
  title,
  series,
  categories,
  chartType = 'bar',
  colors = ['#3C50E0', '#80CAEE', '#FF4560', '#00E396'],
  height = 348,
  widthClass = 'w-full',
}) => {
  const maxValue = Math.max(...series.flatMap(s => s.data), 1); 
  const yAxisMax = Math.ceil(maxValue * 1.1); 

  const shouldRotateLabels = categories.length > 5; 

  const options: ApexOptions = {
    colors,
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: chartType,
      height,
      stacked: false,
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
        columnWidth: '50%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories,
      labels: {
        rotate: shouldRotateLabels ? -45 : 0, 
        trim: true,
        hideOverlappingLabels: true,
        style: {
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      min: 0,
      max: yAxisMax,
      tickAmount: 5,
      labels: {
        formatter: (value) => Math.round(value).toString(),
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      fontFamily: 'Satoshi',
      fontWeight: 500,
      fontSize: '14px',
      markers: {
        size: 6,
      },
    },
    fill: {
      opacity: 1,
    }
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
        <div id="chart" className="" role="img" aria-label={`Gráfico de ${title}`}>
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