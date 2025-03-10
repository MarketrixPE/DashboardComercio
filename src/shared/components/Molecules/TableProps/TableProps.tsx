interface DataItem {
  url: string;
  views: string; // El valor de 'views' es una cadena que representa un porcentaje (ej. '75%')
}

interface ProgressListProps {
  data: DataItem[];
  className?: string; // Prop adicional para pasar clases de estilo personalizadas
}

const TableProps = ({ data, className }: ProgressListProps) => {
  return (
    <div className={`${className ? className : "xl:col-span-5"} sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark`}>
      <div>
        <h5 className="text-xl font-semibold text-black dark:text-white">
          Análisis de Género
        </h5>
      </div>

      {/* Títulos de las columnas */}
      <div className="flex justify-between py-2 px-4 text-gray-600">
        <div>URL</div>
        <div className="text-right">Views</div>
      </div>

      <div className="flex flex-col gap-2">
        {/* Contenido dinámico */}
        {data.map((item, index) => (
          <div key={index} className="relative">
            {/* Barra de progreso */}
            <div
              className="absolute top-0 left-0 h-full bg-blue-100 rounded-md"
              style={{ width: item.views }}
            ></div>

            {/* Contenido de URL y Views */}
            <div className="relative z-10 flex justify-between py-2 px-4">
              <div className="font-medium">{item.url}</div>
              <div className="text-right">{item.views}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableProps;
