import React from "react";
import { Link } from "react-router-dom";
// Usar la ruta correcta a la imagen
import NotFoundImage from "../../assets/animation/NotFount404.jpg";

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="max-w-4xl flex flex-col md:flex-row items-center">
        {/* Texto a la izquierda en pantallas medianas y grandes, arriba en móviles */}
        <div className="text-left md:w-1/2 mb-6 md:mb-0 md:pr-8">
          <h1 className="text-gray-800 font-bold">
            <span className="text-4xl">404 Error</span>
          </h1>
          <h2 className="text-2xl text-gray-700 mt-2 mb-4">Página no encontrada</h2>
          <p className="text-gray-600 mb-8">
            Lo sentimos, la página que estás buscando no existe o ha sido movida a otra ubicación.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
        
        {/* Imagen a la derecha en pantallas medianas y grandes, abajo en móviles */}
        <div className="md:w-1/2">
          <img 
            src={NotFoundImage} 
            alt="Error 404 - Página no encontrada" 
            className="w-full max-w-sm md:max-w-md mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;