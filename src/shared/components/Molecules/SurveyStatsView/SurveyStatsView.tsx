import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

export interface SurveyStatsProps {
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
        total_respuestas?: number; // Ahora es opcional
      }[];
    }[];
  };
}

export const SurveyStatsView = ({ stats }: SurveyStatsProps) => {

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

  // Calcular porcentajes para distritos
  const totalDistritos = stats.respuestas_por_distrito.reduce(
    (acc, curr) => acc + curr.cantidad_respuestas,
    0
  );
  const distritosData = stats.respuestas_por_distrito.map((distrito) => ({
    name: distrito.nombre,
    value: distrito.cantidad_respuestas,
    porcentaje:
      totalDistritos > 0
        ? (distrito.cantidad_respuestas / totalDistritos) * 100
        : 0,
  }));

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

  return (
    <div className="w-full bg-white-translucent dark:bg-boxdark rounded-lg shadow-md">
      <div className="py-12 px-4 md:px-20">
        {/* Contenedor principal para ambas secciones en horizontal */}
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
          {stats.preguntas_y_respuestas &&
            stats.preguntas_y_respuestas.length > 0 && (
              <div className="md:w-1/2 bg-gray-50 dark:bg-boxdark-2 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                  Respuestas por Pregunta
                </h3>
                <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                  {stats.preguntas_y_respuestas.map((pregunta) => {
                    // Calcular el total de respuestas para esta pregunta
                    const totalRespuestasPregunta = pregunta.respuestas.reduce(
                      (acc, resp) => acc + (resp.total_respuestas || 0),
                      0
                    );

                    return (
                      <div
                        key={pregunta.id}
                        className="bg-white dark:bg-boxdark p-4 rounded-lg shadow-sm"
                      >
                        <h4
                          className="font-medium text-black dark:text-white mb-3 truncate"
                          title={pregunta.pregunta}
                        >
                          {pregunta.pregunta}
                        </h4>
                        <div className="space-y-3">
                          {pregunta.respuestas.map((respuesta) => {
                            const totalRespuestas =
                              respuesta.total_respuestas || 0;
                            const porcentaje =
                              totalRespuestasPregunta > 0
                                ? (totalRespuestas / totalRespuestasPregunta) *
                                  100
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

        {/* Contenedor Flexible para Género y Distrito */}
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mb-8">
          {/* Distribución por Género */}
          <div className="p-4 bg-gray-50 dark:bg-boxdark-2 rounded-lg md:w-1/2">
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
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {generoData.map((_entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Respuestas por Distrito */}
          <div className="p-4 bg-gray-50 dark:bg-boxdark-2 rounded-lg md:w-1/2">
            <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">
              Respuestas por Distrito
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={distritosData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8">
                    {distritosData.map((_entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyStatsView;
