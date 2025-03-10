import React, { useState, useEffect } from 'react';
import './SuscripcionesSmart.css';

// Definición de tipos
interface Membresia {
  id: number;
  titulo: string;
  caracteristicas: string[];
  precio: string;
  precioAnual: string | null;
  puntosMensuales: string;
}

interface Props {
  membershipId?: number;
}

const VisualizacionMembresias: React.FC<Props> = ({ membershipId = 3 }) => {
  // El ID de la membresía seleccionada (3 = Empresarial siempre)
  const [membershipIdSeleccionado, setMembershipIdSeleccionado] = 
    useState<number>(3);
    
  // Estado para el plan que se está visualizando (puede ser diferente del seleccionado)
  const [planVisualizando, setPlanVisualizando] = useState<number>(3);
  

  // Datos de membresías
  const membresias: Membresia[] = [
    {
      id: 1,
      titulo: "GOLD",
      caracteristicas: [
        "Enviar Puntos Smart",
        "Canjear Puntos Smart",
        "Creación de Cupones Smart",
        "Crear Encuestas Smart",
        "Reporte Estadístico de Encuestas",
        "Crear Promociones Smart (3 Km)",
        "Crear Sucursales (1)",
        "Tu Tienda Smart",
        "Soporte Smart",
      ],
      precio: "GRATIS",
      precioAnual: null,
      puntosMensuales: "500 puntos mensuales para tu sucursal",
    },
    {
      id: 2,
      titulo: "INFINITY",
      caracteristicas: [
        "Enviar Puntos Smart",
        "Canjear Puntos Smart",
        "Creación de Cupones Smart",
        "Crear Encuestas Smart",
        "Reporte Estadístico de Encuestas",
        "Crear Promociones Smart (3 Km)",
        "Tu Tienda Smart",
        "Crear Sucursales (Hasta 2)",
        "Estudio de Mercado (1/mes)",
        "Promociones con Segmentación (2/mes)",
        "Soporte Smart",
      ],
      precio: "S/ 9.90 Mensual",
      precioAnual: "S/ 99.90 Anual",
      puntosMensuales: "Hasta 5,000 Puntos Mensuales por cada sucursal",
    },
    {
      id: 3,
      titulo: "EMPRESARIAL",
      caracteristicas: [
        "Enviar Puntos Smart",
        "Canjear Puntos Smart",
        "Creación de Cupones Smart",
        "Crear Encuestas Smart",
        "Reporte Estadístico de Encuestas",
        "Crear Promociones Smart (3 Km)",
        "Tu Tienda Smart",
        "Crear Sucursales (Hasta 10)",
        "Estudios de Mercado (Ilimitado)",
        "Promociones con Segmentación (Ilimitado)",
        "Aparece en Sugeridos",
        "Soporte Smart",
      ],
      precio: "S/ 49.90 Mensual",
      precioAnual: "S/ 539.90 Anual",
      puntosMensuales: "Hasta 10,000 Puntos Mensuales por cada sucursal",
    },
  ];

  // Actualizar el ID seleccionado cuando cambia la prop
  useEffect(() => {
    // Forzar que siempre sea el empresarial (3) como seleccionado oficialmente
    setMembershipIdSeleccionado(3);
    // También inicializar el plan visualizado al mismo
    setPlanVisualizando(3);
  }, [membershipId]);

  // Clases para el tema oscuro/claro
  const contenedorClase = "shadow-xl p-4 sm:p-6 md:p-8 rounded-lg container mx-auto bg-white-translucent dark:bg-boxdark";
  const textoClase = "text-black dark:text-white";
  const tituloClase = "text-sm sm:text-base md:text-title-md2 font-semibold text-black dark:text-white";
  const cardClase = "rounded-lg border border-stroke dark:border-strokedark p-4 space-y-3";
  const btnPrimarioClase = "bg-[#3c50e0] hover:bg-[#3545c4] text-white rounded py-2 px-4 sm:px-6 font-medium text-sm sm:text-base w-full";
  const btnSecundarioClase = "text-[#3c50e0] border-[#3c50e0] hover:bg-[#3c50e0] hover:text-white rounded border py-2 px-4 sm:px-6 font-medium text-sm sm:text-base w-full";
  
  // Definir un tipo para el estilo del plan
  type EstiloPlan = {
    color: string;
    bgColor: string;
    textColor: string;
    bulletColor: string;
  };

  // Estilos específicos por plan con tipado correcto
  const estilosPorPlan: Record<number, EstiloPlan> = {
    1: { // GOLD
      color: 'border-amber-300',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20',
      textColor: 'text-amber-800 dark:text-amber-300',
      bulletColor: 'text-amber-500 dark:text-amber-300'
    },
    2: { // INFINITY
      color: 'border-[#3c50e0]',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-[#3c50e0] dark:text-blue-300',
      bulletColor: 'text-[#3c50e0] dark:text-blue-300'
    },
    3: { // EMPRESARIAL
      color: 'border-purple-300',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      textColor: 'text-purple-800 dark:text-purple-300',
      bulletColor: 'text-purple-500 dark:text-purple-300'
    }
  };

  // Función para manejar la visualización de un plan
  const verPlan = (id: number) => {
    // Cambiamos qué plan se está visualizando, sin cambiar el plan activo/seleccionado
    setPlanVisualizando(id);
    console.log(`Visualizando detalles del plan ${id}`);
  };

  // Reglas específicas por plan con tipado correcto
  const reglasPlanes: Record<number, string[]> = {
    1: [ // GOLD
      "Cuando el Comercio se registre, por defecto estará en el Plan Gold",
      "El Comercio podrá cambiar de Plan cuando lo desee",
      "Si el Comercio quiere registrar más de una sucursal deberá cambiar de Plan"
    ],
    2: [ // INFINITY
      "Las sucursales podrán tener acceso ilimitado a todas las funciones de manera autónoma",
      "Cada sucursal tendrá un crédito de hasta 5,000 Puntos Smart por mes",
      "Los Puntos no utilizados por la sucursal en el mes no serán acumulables para el siguiente mes",
      "El titular del Plan podrá comprar Puntos y transferirlos a sus sucursales",
      "Las sucursales no podrán transferir Puntos entre ellas"
    ],
    3: [ // EMPRESARIAL
      "Las sucursales podrán tener acceso ilimitado a todas las funciones de manera autónoma",
      "Cada sucursal tendrá un crédito de hasta 10,000 Puntos Smart por mes",
      "Los Puntos no utilizados por la sucursal en el mes no serán acumulables para el siguiente mes",
      "El titular del Plan podrá comprar Puntos y transferirlos a sus sucursales", 
      "Las sucursales no podrán transferir Puntos entre ellas"
    ]
  };

  // Paquetes de puntos
  const paquetesPuntos = [
    '1000 PS por S/.9.90',
    '10,000 PS por S/.19.90',
    '50,000 PS por S/.39.90'
  ];

  return (
    <div className="font-sans">      
      <div className={contenedorClase}>
        {/* Header con título y toggle de tema */}
        <div className="flex justify-between items-center mb-6">
          <h1 className={`${tituloClase} text-xl md:text-2xl`}>Plan de Membresías Smart 2025</h1>
        </div>
        
        {/* Planes de membresía */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {membresias.map((plan) => (
            <div 
              key={plan.id} 
              className={`${cardClase} ${estilosPorPlan[plan.id].bgColor} border-2 ${plan.id === membershipIdSeleccionado ? 'border-[#3c50e0]' : estilosPorPlan[plan.id].color} flex-1 relative card-hover`}
            >
              {/* Fondo animado según tipo de plan */}
              {plan.id === 1 && (
                <div className="absolute inset-0 transition-opacity duration-500">
                  <div className="gold-bubble-1"></div>
                  <div className="gold-bubble-2"></div>
                  <div className="gold-bubble-3"></div>
                </div>
              )}
              {plan.id === 2 && (
                <div className="absolute inset-0 transition-opacity duration-500">
                  <div className="infinity-bubble-1"></div>
                  <div className="infinity-bubble-2"></div>
                  <div className="infinity-bubble-3"></div>
                  <div className="infinity-bubble-4"></div>
                </div>
              )}
              {plan.id === 3 && (
                <div className="absolute inset-0 transition-opacity duration-500">
                  <div className="empresarial-bubble-1"></div>
                  <div className="empresarial-bubble-2"></div>
                  <div className="empresarial-bubble-3"></div>
                  <div className="empresarial-bubble-4"></div>
                </div>
              )}
              
              {plan.id === membershipIdSeleccionado && (
  <div className="seleccionado-badge">
  ✓ Seleccionado
</div>
              )}
              <div className="relative z-10">
                <h2 className={`text-lg font-bold ${estilosPorPlan[plan.id].textColor}`}>{plan.titulo}</h2>
                <p className={`text-base font-semibold ${estilosPorPlan[plan.id].textColor}`}>{plan.precio}</p>
                {plan.precioAnual && (
                  <p className={`text-sm ${estilosPorPlan[plan.id].textColor} opacity-80`}>{plan.precioAnual}</p>
                )}
                <p className={`text-sm ${textoClase} mt-2`}>{plan.puntosMensuales}</p>
                <button 
                  className={`${plan.id === membershipIdSeleccionado ? btnSecundarioClase : btnPrimarioClase} mt-2 transition-all duration-300 hover:shadow-md`}
                  onClick={() => verPlan(plan.id)}
                >
                  {plan.id === membershipIdSeleccionado ? 'Membresía Actual' : 
                  plan.id === planVisualizando ? 'Visualizando' : 'Ver Membresía'}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Características del plan visualizado */}
        <div className={`${cardClase} mb-6`}>
          <h2 className={`${tituloClase} border-b border-stroke dark:border-strokedark pb-2 mb-3`}>
            Características del Plan {membresias.find(p => p.id === planVisualizando)?.titulo}
            {planVisualizando !== membershipIdSeleccionado && (
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">(Visualizando)</span>
            )}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {membresias.find(p => p.id === planVisualizando)?.caracteristicas.map((caracteristica, index) => (
              <div key={index} className="flex items-center">
                <div className="w-2 h-2 bg-[#3c50e0] rounded-full mr-2"></div>
                <p className={textoClase}>{caracteristica}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Reglas específicas del plan visualizado */}
        <div className={`${cardClase} mb-6 ${estilosPorPlan[planVisualizando].bgColor}`}>
          <h2 className={`font-bold ${estilosPorPlan[planVisualizando].textColor}`}>
            Detalles del Plan {membresias.find(p => p.id === planVisualizando)?.titulo}
            {planVisualizando !== membershipIdSeleccionado && (
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">(Visualizando)</span>
            )}
          </h2>
          <ul className="space-y-1 mt-2">
            {reglasPlanes[planVisualizando].map((regla, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className={`pt-1 ${estilosPorPlan[planVisualizando].bulletColor}`}>•</span>
                <span className={textoClase}>{regla}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Comparativa de planes */}
        <div className={`${cardClase} mb-6`}>
          <h2 className={`${tituloClase} border-b border-stroke dark:border-strokedark pb-2 mb-3`}>
            Comparativa de Planes
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-2 border border-stroke dark:border-strokedark text-left bg-gray-100 dark:bg-gray-800">Característica</th>
                  {membresias.map(plan => (
                    <th 
                      key={plan.id}
                      className={`p-2 border border-stroke dark:border-strokedark text-left 
                      ${plan.id === membershipIdSeleccionado ? 'bg-[#3c50e0]/10 dark:bg-[#3c50e0]/20' : 'bg-gray-100 dark:bg-gray-800'}`}
                    >
                      {plan.titulo}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className={textoClase}>
                  <td className="p-2 border border-stroke dark:border-strokedark">Precio</td>
                  {membresias.map(plan => (
                    <td 
                      key={plan.id} 
                      className={`p-2 border border-stroke dark:border-strokedark
                      ${plan.id === membershipIdSeleccionado ? 'bg-[#3c50e0]/5 dark:bg-[#3c50e0]/10' : ''}`}
                    >
                      {plan.precio}
                    </td>
                  ))}
                </tr>
                <tr className={textoClase}>
                  <td className="p-2 border border-stroke dark:border-strokedark">Puntos</td>
                  {membresias.map(plan => (
                    <td 
                      key={plan.id} 
                      className={`p-2 border border-stroke dark:border-strokedark
                      ${plan.id === membershipIdSeleccionado ? 'bg-[#3c50e0]/5 dark:bg-[#3c50e0]/10' : ''}`}
                    >
                      {plan.puntosMensuales.replace("Hasta ", "").replace(" por cada sucursal", "")}
                    </td>
                  ))}
                </tr>
                <tr className={textoClase}>
                  <td className="p-2 border border-stroke dark:border-strokedark">Sucursales</td>
                  {membresias.map(plan => {
                    const sucursales = plan.caracteristicas.find(c => c.includes("Crear Sucursales"));
                    return (
                      <td 
                        key={plan.id} 
                        className={`p-2 border border-stroke dark:border-strokedark
                        ${plan.id === membershipIdSeleccionado ? 'bg-[#3c50e0]/5 dark:bg-[#3c50e0]/10' : ''}`}
                      >
                        {sucursales ? sucursales.replace("Crear Sucursales ", "") : "No disponible"}
                      </td>
                    );
                  })}
                </tr>
                <tr className={textoClase}>
                  <td className="p-2 border border-stroke dark:border-strokedark">Estudios de Mercado</td>
                  {membresias.map(plan => {
                    // Buscar estudios de mercado en las características, considerando diferentes formas de escritura
                    const estudios = plan.caracteristicas.find(c => 
                      c.includes("Estudio de Mercado") || 
                      c.includes("Estudios de Mercado")
                    );
                    return (
                      <td 
                        key={plan.id} 
                        className={`p-2 border border-stroke dark:border-strokedark
                        ${plan.id === membershipIdSeleccionado ? 'bg-[#3c50e0]/5 dark:bg-[#3c50e0]/10' : ''}`}
                      >
                        {estudios ? 
                          estudios.includes("(1/mes)") ? "(1/mes)" :
                          estudios.includes("(Ilimitado)") ? "(Ilimitado)" :
                          estudios.replace("Estudio de Mercado ", "").replace("Estudios de Mercado ", "") 
                          : "No disponible"}
                      </td>
                    );
                  })}
                </tr>
                <tr className={textoClase}>
                  <td className="p-2 border border-stroke dark:border-strokedark">Promociones con Segmentación</td>
                  {membresias.map(plan => {
                    let promociones = "No disponible";
                    
                    if (plan.id === 1) {
                      promociones = "No disponible";
                    } else if (plan.id === 2) {
                      promociones = "(2/mes)";
                    } else if (plan.id === 3) {
                      promociones = "(Ilimitado)";
                    }
                    
                    return (
                      <td 
                        key={plan.id} 
                        className={`p-2 border border-stroke dark:border-strokedark
                        ${plan.id === membershipIdSeleccionado ? 'bg-[#3c50e0]/5 dark:bg-[#3c50e0]/10' : ''}`}
                      >
                        {promociones}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Paquetes de Puntos */}
        <div className={`${cardClase} mb-6`}>
          <h2 className={`${tituloClase} border-b border-stroke dark:border-strokedark pb-2 mb-3`}>
            Paquetes de Puntos Smart Adicionales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {paquetesPuntos.map((paquete, index) => (
              <div key={index} className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 text-center font-medium text-green-800 dark:text-green-300">
                {paquete}
              </div>
            ))}
          </div>
        </div>
        
        {/* Notas */}
        <div className="text-sm text-gray-600 dark:text-gray-400 mt-6 space-y-1">
          <p>
            Puedes cambiar de plan en cualquier momento. Al cambiar a un plan superior, obtendrás acceso inmediato a todas sus características.
          </p>
          <p>
            Los puntos Smart no utilizados no se acumulan para el siguiente mes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VisualizacionMembresias;