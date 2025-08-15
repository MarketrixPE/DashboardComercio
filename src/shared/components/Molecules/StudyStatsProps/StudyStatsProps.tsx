import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useState } from "react";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

export interface StudyStatsProps {
  stats: {
    total_preguntas: number;
    rango_edades: {
      [key: string]: number;
    };
    total_respuestas: {
      female_respuestas: number;
      male_respuestas: number;
    };
    respuestas_por_distrito: {
      id: number;
      nombre: string;
      cantidad_respuestas: number;
    }[];
    preguntas_y_respuestas?: {
      id: number;
      pregunta: string;
      respuestas: {
        id: number;
        respuesta: string;
        total_respuestas?: number;
      }[];
    }[];
  };
}

// Interfaz para los elementos de distritosData
interface DistritoData {
  name: string;
  value: number;
  porcentaje: number;
  otrosDistritos?: { nombre: string; cantidad_respuestas: number }[];
}

// Componente para personalizar el tooltip del PieChart
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-gray-800 p-2 border border-gray-300 dark:border-gray-600 rounded shadow">
        <p className="text-gray-800 dark:text-white">
          {data.name}: {data.value} ({data.porcentaje.toFixed(1)}%)
        </p>
      </div>
    );
  }
  return null;
};

export const StudyStatsView = ({ stats }: StudyStatsProps) => {
  // Calcular porcentajes para rangos de edades
  const totalEdades = Object.values(stats.rango_edades).reduce(
    (acc, curr) => acc + curr,
    0
  );
  const edadesConPorcentaje = Object.entries(stats.rango_edades).map(
    ([range, value]) => ({
      name: range,
      value: value,
      porcentaje: totalEdades > 0 ? (value / totalEdades) * 100 : 0,
    })
  );

  // Calcular porcentajes para género
  const totalGenero =
    stats.total_respuestas.female_respuestas +
    stats.total_respuestas.male_respuestas;
  const generoData = [
    {
      name: "Mujer",
      value: stats.total_respuestas.female_respuestas,
      porcentaje:
        totalGenero > 0
          ? (stats.total_respuestas.female_respuestas / totalGenero) * 100
          : 0,
    },
    {
      name: "Hombre",
      value: stats.total_respuestas.male_respuestas,
      porcentaje:
        totalGenero > 0
          ? (stats.total_respuestas.male_respuestas / totalGenero) * 100
          : 0,
    },
  ];

  // Calcular total de respuestas por distrito
  const totalDistritos = stats.respuestas_por_distrito.reduce(
    (acc, curr) => acc + curr.cantidad_respuestas,
    0
  );

  // Procesar datos de distritos
  const maxDistritos = 4;
  const distritosOrdenados = [...stats.respuestas_por_distrito].sort(
    (a, b) => b.cantidad_respuestas - a.cantidad_respuestas
  );
  const distritosPrincipales = distritosOrdenados.slice(0, maxDistritos);
  const distritosOtros = distritosOrdenados.slice(maxDistritos);
  const totalOtros = distritosOtros.reduce(
    (acc, curr) => acc + curr.cantidad_respuestas,
    0
  );

  const distritosData: DistritoData[] = [
    ...distritosPrincipales.map((distrito) => ({
      name: distrito.nombre,
      value: distrito.cantidad_respuestas,
      porcentaje:
        totalDistritos > 0
          ? (distrito.cantidad_respuestas / totalDistritos) * 100
          : 0,
    })),
    ...(distritosOtros.length > 0
      ? [
          {
            name: "Otros",
            value: totalOtros,
            porcentaje:
              totalDistritos > 0 ? (totalOtros / totalDistritos) * 100 : 0,
            otrosDistritos: distritosOtros.map((d) => ({
              nombre: d.nombre,
              cantidad_respuestas: d.cantidad_respuestas,
            })),
          },
        ]
      : []),
  ];

  // Ordenar los rangos de edad para presentarlos correctamente
  const ordenRangosEdad: Record<string, number> = {
    "0-18": 1,
    "19-30": 2,
    "31-45": 3,
    "46-55": 4,
    "56-70": 5,
    "71 a +": 6,
  };

  const edadesOrdenadas = [...edadesConPorcentaje].sort((a, b) => {
    return (ordenRangosEdad[a.name] || 99) - (ordenRangosEdad[b.name] || 99);
  });

  // Estado para el tooltip de "Otros"
  const [tooltipContent, setTooltipContent] = useState<{
    visible: boolean;
    distritos: { nombre: string; cantidad_respuestas: number }[];
    x: number;
    y: number;
  }>({ visible: false, distritos: [], x: 0, y: 0 });

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement>,
    distritos: { nombre: string; cantidad_respuestas: number }[]
  ) => {
    setTooltipContent({
      visible: true,
      distritos,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleMouseLeave = () => {
    setTooltipContent({ visible: false, distritos: [], x: 0, y: 0 });
  };

  return (
    <div className="w-full bg-white-translucent dark:bg-boxdark rounded-lg shadow-md">
      <div className="py-12 px-4 md:px-20">
        {/* Contenedor principal para Rangos de Edad y Respuestas por Pregunta */}
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mb-8">
          {/* Rangos de Edad */}
          <div className="md:w-1/2 bg-gray-50 dark:bg-boxdark-2 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Rangos de Edad
            </h3>
            <div className="space-y-4">
              {edadesOrdenadas.map((edad) => (
                <div
                  key={edad.name}
                  className="flex items-center justify-between"
                >
                  <div className="w-24">{edad.name}</div>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                      <div
                        className="bg-blue-400 h-4 rounded-full"
                        style={{ width: `${edad.porcentaje}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-24 text-right">
                    {edad.value} ({edad.porcentaje.toFixed(1)}%)
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Respuestas por Pregunta */}
          {stats.preguntas_y_respuestas && stats.preguntas_y_respuestas.length > 0 && (
            <div className="md:w-1/2 bg-gray-50 dark:bg-boxdark-2 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                Respuestas por Pregunta
              </h3>
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {stats.preguntas_y_respuestas.map((pregunta) => {
                  const totalRespuestasPregunta = pregunta.respuestas.reduce(
                    (acc, resp) => acc + (resp.total_respuestas || 0),
                    0
                  );

                  return (
                    <div
                      key={pregunta.id}
                      className="bg-white dark:bg-boxdark p-4 rounded-lg shadow-sm"
                    >
                      <h4 className="font-medium text-black dark:text-white mb-3 truncate" title={pregunta.pregunta}>
                        {pregunta.pregunta}
                      </h4>
                      <div className="space-y-3">
                        {pregunta.respuestas.map((respuesta) => {
                          const totalRespuestas = respuesta.total_respuestas || 0;
                          const porcentaje =
                            totalRespuestasPregunta > 0
                              ? (totalRespuestas / totalRespuestasPregunta) * 100
                              : 0;

                          return (
                            <div
                              key={respuesta.id}
                              className="flex items-center justify-between"
                            >
                              <div
                                className="w-1/3 text-sm truncate"
                                title={respuesta.respuesta}
                              >
                                {respuesta.respuesta}
                              </div>
                              <div className="flex-1 mx-2">
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                  <div
                                    className="bg-blue-500 h-3 rounded-full"
                                    style={{ width: `${porcentaje}%` }}
                                  ></div>
                                </div>
                              </div>
                              <div className="w-16 text-right text-xs">
                                {totalRespuestas} ({porcentaje.toFixed(0)}%)
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Contenedor para Género y Distrito */}
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          {/* Distribución por Género */}
          <div
            className="p-4 bg-gray-50 dark:bg-boxdark-2 rounded-lg md:w-1/2"
            aria-label="Gráfico circular que muestra la distribución por género"
          >
            <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">
              Distribución por Género
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={generoData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, porcentaje }) =>
                      `${name}: ${porcentaje.toFixed(0)}%`
                    }
                    labelLine={true}
                  >
                    {generoData.map((_entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Respuestas por Distrito */}
          <div
            className="md:w-1/2 bg-gray-50 dark:bg-boxdark-2 rounded-lg p-4"
            aria-label="Lista de respuestas por distrito con barras de progreso"
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Respuestas por Distrito
            </h3>
            <div className="space-y-4">
              {distritosData.map((distrito) => (
                <div
                  key={distrito.name}
                  className="flex items-center justify-between"
                  onMouseEnter={
                    distrito.otrosDistritos
                      ? (e) => handleMouseEnter(e, distrito.otrosDistritos!)
                      : undefined
                  }
                  onMouseLeave={
                    distrito.otrosDistritos ? handleMouseLeave : undefined
                  }
                >
                  <div className="w-24 truncate">{distrito.name}</div>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                      <div
                        className="bg-blue-400 h-4 rounded-full"
                        style={{ width: `${distrito.porcentaje}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-24 text-right">
                    {distrito.value} ({distrito.porcentaje.toFixed(1)}%)
                  </div>
                </div>
              ))}
            </div>
            {tooltipContent.visible && (
              <div
                className="fixed bg-gray-800 text-white p-2 rounded shadow-lg z-50 text-sm"
                style={{
                  top: tooltipContent.y + 10,
                  left: tooltipContent.x + 10,
                }}
                role="tooltip"
              >
                <h4 className="font-semibold mb-1">Otros Distritos:</h4>
                <ul>
                  {tooltipContent.distritos.map((d) => (
                    <li key={d.nombre}>
                      {d.nombre}: {d.cantidad_respuestas}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyStatsView;