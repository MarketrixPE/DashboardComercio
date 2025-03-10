interface MembresiaCardProps {
  titulo: string;
  caracteristicas: string[];
  precio: string;
  precioAnual: string | null;
  esSeleccionada: boolean;
  puntosMensuales: string;
}

export const MembresiaCard: React.FC<MembresiaCardProps> = ({ 
  titulo, 
  caracteristicas, 
  precio, 
  precioAnual, 
  esSeleccionada, 
  puntosMensuales, 
}) => {
  // Aplicamos estilos basados en si está seleccionada
  const cardBgColor = esSeleccionada 
    ? 'bg-blue-50 border-blue-600' 
    : 'bg-gray-900 border-gray-700';
  
  const textColor = esSeleccionada 
    ? 'text-blue-600' 
    : 'text-gray-300';
  
  const lineColor = esSeleccionada 
    ? 'bg-blue-500' 
    : 'bg-gray-600';
  
  const btnBgColor = esSeleccionada 
    ? 'border-blue-600 bg-white text-blue-700' 
    : 'border-gray-600 bg-gray-800 text-gray-300';

  return (
    <div className={`flex flex-col border-2 rounded-lg p-8 w-full mx-2 h-full transition-all duration-300 ${cardBgColor} ${esSeleccionada ? 'shadow-lg transform scale-105' : ''}`}>
      <h2 className={`text-3xl font-bold mb-6 text-center ${esSeleccionada ? 'text-blue-600' : 'text-gray-300'}`}>
        {titulo}
      </h2>
      
      <div className={`border-b ${esSeleccionada ? 'border-blue-300' : 'border-gray-700'} w-full mb-6`}></div>
      
      <div className="flex-grow">
        <ul className="space-y-4 mb-8">
          {caracteristicas.map((item, index) => (
            <li key={index} className="flex items-center gap-3">
              <div className={`w-4 h-0.5 ${lineColor}`}></div>
              <span className={`${textColor}`}>{item}</span>
            </li>
          ))}
                    
          {puntosMensuales && (
            <li className="flex items-center gap-3 font-medium">
              <div className={`w-4 h-0.5 ${lineColor}`}></div>
              <span className={`${textColor}`}>{puntosMensuales}</span>
            </li>
          )}
        </ul>
      </div>
      
      <div className={`p-4 border-2 rounded-lg text-center ${btnBgColor}`}>
        <div className="font-bold text-lg">
          {precio}
        </div>
        {precioAnual && (
          <div className={`text-sm mt-1 ${esSeleccionada ? 'text-gray-600' : 'text-gray-400'}`}>
            {precioAnual}
          </div>
        )}
      </div>
    </div>
  );
};