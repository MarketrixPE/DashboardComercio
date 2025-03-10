import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect, useRef } from 'react';
import ReactApexChart from 'react-apexcharts';

const options: ApexOptions = {
  colors: ['#3C50E0'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'bar',
    height: 335,
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },

  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: '25%',
          },
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
      columnWidth: '25%',
      borderRadiusApplication: 'end',
      borderRadiusWhenStacked: 'last',
    },
  },
  dataLabels: {
    enabled: false,
  },

  xaxis: {
    // Mostrar los últimos 30 días
    categories: Array.from({ length: 30 }, (_, i) => (i + 1).toString()),
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    fontFamily: 'Satoshi',
    fontWeight: 500,
    fontSize: '14px',

    markers: {
      size: 99,
    },
  },
  fill: {
    opacity: 1,
  },
};

interface ChartState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ChartFour: React.FC = () => {
  const [state, ] = useState<ChartState>({
    series: [
      {
        name: 'Cupones',
        // Datos para los últimos 30 días
        data: [
          44, 55, 41, 67, 22, 43, 65, 34, 55, 78, 90, 54, 32, 21, 45, 66, 77,
          32, 56, 65, 34, 55, 67, 90, 44, 55, 41, 67, 22, 43,
        ],
      },
    ],
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <>
      <div
        className="flex justify-between items-center
 col-span-12 xl:col-span-4"
      >
        <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-md w-max">
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">Oct 4, 2024 - Oct 10, 2024</span>
          </div>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="text-gray-500 bg-white border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 flex items-center"
          >
            Anual
            <svg
              className="w-4 h-4 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-1 w-28 bg-white shadow-lg rounded-md">
              <ul>
                <li className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                A diario
                </li>
                <li className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                Semanalmente
                </li>
                <li className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                Anual
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
        <div className="mb-4 justify-between gap-4 sm:flex">
          <div>
            <h4 className="text-xl font-semibold text-black dark:text-white">
              Respuestas a Encuestas de Cupones por Día{' '}
            </h4>
          </div>
        </div>

        <div>
          <div id="chartTwo" className="-ml-5 -mb-9">
            <ReactApexChart
              options={options}
              series={state.series}
              type="bar"
              height={350}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChartFour;
