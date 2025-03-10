import React, { ReactNode } from 'react';

interface CardDashboardProps {
  title: string;
  total?: string;
  rate?: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children?: ReactNode;
  showRate?: boolean; // Controla la visibilidad del rate
  isSquare?: boolean; // Nueva propiedad para elegir la forma del contenedor
}

const CardDashboard: React.FC<CardDashboardProps> = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  children,
  showRate = true, // El rate se muestra por defecto
  isSquare = false, // Por defecto, es rectangular (false)
}) => {
  return (
    <div
      className={`flex bg-white items-center p-4 border border-stroke
        ${
          isSquare
            ? 'w-full h-auto flex justify-between items-center gap-4'
            : 'rounded-sm'
        }`}
    >
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        {children}
      </div>

      <div className="flex items-end justify-between">
        <div className='w-max'>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {total}
          </h4>
          <span className="text-sm font-medium">{title}</span>
        </div>

        {showRate && ( // Condicional para mostrar o no el span del rate
          <span
            className={`flex items-center gap-1 text-sm font-medium ${
              levelUp && 'text-meta-3'
            } ${levelDown && 'text-meta-5'} `}
          >
            {rate}

            {levelUp && (
              <svg
                className="fill-meta-3"
                width="10"
                height="11"
                viewBox="0 0 10 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
                  fill=""
                />
              </svg>
            )}
            {levelDown && (
              <svg
                className="fill-meta-5"
                width="10"
                height="11"
                viewBox="0 0 10 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.64284 7.69237L9.09102 4.33987L10 5.22362L5 10.0849L-8.98488e-07 5.22362L0.908973 4.33987L4.35716 7.69237L4.35716 0.0848701L5.64284 0.0848704L5.64284 7.69237Z"
                  fill=""
                />
              </svg>
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default CardDashboard;
