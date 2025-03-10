import { useState } from 'react';

const RadioInputComponent = () => {
  const [respuestas, setRespuestas] = useState(['Yes', 'No']); // Respuestas iniciales
  const [newRespuesta, setNewRespuesta] = useState(''); // Nueva respuesta

  // Función para manejar la tecla Enter
  const handleKeyPress = (e: { key: string; }) => {
    if (e.key === 'Enter' && newRespuesta.trim() !== '') {
      setRespuestas([...respuestas, newRespuesta.trim()]); // Agregar nueva respuesta
      setNewRespuesta(''); // Limpiar input
    }
  };

  // Función para eliminar una respuesta
  const handleDelete = (index: number) => {
    const newRespuestas = respuestas.filter((_, i) => i !== index); // Eliminar la respuesta por índice
    setRespuestas(newRespuestas);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-black dark:text-white mb-2">
        Respuestas *
      </label>

      <div className="flex flex-col space-y-2">
        {respuestas.map((respuesta, index) => (
          <div key={index} className="flex items-center justify-between">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="respuesta"
                value={respuesta}
                className="form-radio text-blue-600 h-4 w-4 border-gray-300"
              />
              <span className="ml-2 text-gray-800">{respuesta}</span>
            </label>
            {/* Botón para eliminar respuesta */}
            <button
              onClick={() => handleDelete(index)}
              className="hover:text-red-700 ml-2"
            >
              &#x2716;
            </button>
          </div>
        ))}

        {/* Input para agregar nueva respuesta */}
        <label className="inline-flex items-center">
          <input
            type="radio"
            disabled
            className="form-radio text-blue-600 h-4 w-4 border-gray-300"
          />
          <input
            type="text"
            value={newRespuesta}
            onChange={(e) => setNewRespuesta(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Añadir respuesta"
            className="ml-2 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-600 text-gray-600"
          />
        </label>
      </div>
    </div>
  );
};

export default RadioInputComponent;
