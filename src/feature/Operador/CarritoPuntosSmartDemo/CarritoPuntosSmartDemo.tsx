import { useState, useEffect } from 'react';

// Definición de tipos
interface PaquetePuntos {
  id: number;
  puntos: number;
  precio: number;
  descripcion: string;
  tipo?: string; // Para diferenciar entre paquetes normales y membresías
}

interface CarritoItem {
  paquete: PaquetePuntos;
  cantidad: number;
}

// Tipos para membresías
interface Membresia {
  id: number;
  nombre: string;
  precioMensual: number;
  precioAnual: number;
  puntosMensuales: number;
  color: string;
  descripcion: string;
}

const CarritoPuntosSmartDemo = () => {
  // Lista de paquetes disponibles
  const paquetesDisponibles: PaquetePuntos[] = [
    { id: 1, puntos: 1000, precio: 9.90, descripcion: '1,000 PS' },
    { id: 2, puntos: 10000, precio: 19.90, descripcion: '10,000 PS' },
    { id: 3, puntos: 50000, precio: 39.90, descripcion: '50,000 PS' },
  ];
  
  // Lista de membresías disponibles
  const membresiasDisponibles: Membresia[] = [
    { 
      id: 1, 
      nombre: "GOLD", 
      precioMensual: 0, 
      precioAnual: 0, 
      puntosMensuales: 500,
      color: "#b8860b",
      descripcion: "GRATIS"
    },
    { 
      id: 2, 
      nombre: "INFINITY", 
      precioMensual: 9.90, 
      precioAnual: 99.90, 
      puntosMensuales: 5000,
      color: "#4758e3",
      descripcion: "S/ 9.90 Mensual"
    },
    { 
      id: 3, 
      nombre: "EMPRESARIAL", 
      precioMensual: 49.90, 
      precioAnual: 539.90, 
      puntosMensuales: 10000,
      color: "#8e44ad",
      descripcion: "S/ 49.90 Mensual"
    }
  ];

  // Estados
  const [itemsCarrito, setItemsCarrito] = useState<CarritoItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [totalPuntos, setTotalPuntos] = useState<number>(0);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Estados para membresías
  const [membresiaActual, setMembresiaActual] = useState<Membresia>(membresiasDisponibles[2]); // EMPRESARIAL por defecto
  const [mostrarModalMembresia, setMostrarModalMembresia] = useState<boolean>(false);
  const [mostrarModalConfirmacion, setMostrarModalConfirmacion] = useState<boolean>(false);
  const [membresiaNueva, setMembresiaNueva] = useState<Membresia | null>(null);
  const [fechaProximaFacturacion, setFechaProximaFacturacion] = useState<string>("");

  // Simular fecha de próxima facturación (15 días después de la fecha actual)
  useEffect(() => {
    const fechaActual = new Date();
    const fechaProxima = new Date(fechaActual);
    fechaProxima.setDate(fechaProxima.getDate() + 15); // 15 días después
    
    const dia = fechaProxima.getDate().toString().padStart(2, '0');
    const mes = (fechaProxima.getMonth() + 1).toString().padStart(2, '0');
    const anio = fechaProxima.getFullYear();
    
    setFechaProximaFacturacion(`${dia}/${mes}/${anio}`);
  }, []);

  // Actualizar totales cada vez que cambia el carrito
  useEffect(() => {
    const nuevoTotal = itemsCarrito.reduce(
      (sum, item) => sum + item.paquete.precio * item.cantidad,
      0
    );
    
    const nuevoPuntos = itemsCarrito.reduce(
      (sum, item) => sum + item.paquete.puntos * item.cantidad,
      0
    );

    setTotal(nuevoTotal);
    setTotalPuntos(nuevoPuntos);
  }, [itemsCarrito]);

  // Agregar paquete al carrito
  const agregarAlCarrito = (paquete: PaquetePuntos) => {
    const itemExistente = itemsCarrito.find(
      (item) => item.paquete.id === paquete.id
    );

    if (itemExistente) {
      setItemsCarrito(
        itemsCarrito.map((item) =>
          item.paquete.id === paquete.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      setItemsCarrito([...itemsCarrito, { paquete, cantidad: 1 }]);
    }
  };

  // Actualizar cantidad de un paquete
  const actualizarCantidad = (paqueteId: number, nuevaCantidad: number) => {
    if (nuevaCantidad < 0) return;

    if (nuevaCantidad === 0) {
      setItemsCarrito(itemsCarrito.filter((item) => item.paquete.id !== paqueteId));
    } else {
      setItemsCarrito(
        itemsCarrito.map((item) =>
          item.paquete.id === paqueteId
            ? { ...item, cantidad: nuevaCantidad }
            : item
        )
      );
    }
  };

  // Eliminar un paquete del carrito
  const eliminarDelCarrito = (paqueteId: number) => {
    setItemsCarrito(itemsCarrito.filter((item) => item.paquete.id !== paqueteId));
  };

  // Vaciar carrito
  const vaciarCarrito = () => {
    setItemsCarrito([]);
  };
  
  // Seleccionar una nueva membresía
  const seleccionarMembresia = (membresia: Membresia) => {
    if (membresia.id === membresiaActual.id) {
      return; // No hacemos nada si selecciona la misma membresía
    }
    
    setMembresiaNueva(membresia);
    setMostrarModalMembresia(true);
  };
  
  // Confirmar cambio de membresía
  const confirmarCambioMembresia = () => {
    if (membresiaNueva) {
      // Crear un paquete de puntos basado en la membresía seleccionada
      const paqueteMembresia: PaquetePuntos = {
        id: 1000 + membresiaNueva.id, // ID único para evitar conflictos con paquetes normales
        puntos: membresiaNueva.puntosMensuales,
        precio: membresiaNueva.precioMensual,
        descripcion: `Membresía ${membresiaNueva.nombre}`,
        tipo: 'membresia'
      };
      
      // Eliminar cualquier membresía existente en el carrito
      const carritoSinMembresias = itemsCarrito.filter(item => item.paquete.tipo !== 'membresia');
      
      // Añadir la nueva membresía al carrito
      setItemsCarrito([
        ...carritoSinMembresias,
        { paquete: paqueteMembresia, cantidad: 1 }
      ]);
      
      // Actualizar la membresía actual
      setMembresiaActual(membresiaNueva);
      
      // Mostrar modal de confirmación
      setMostrarModalConfirmacion(true);
    }
    setMostrarModalMembresia(false);
  };
  
  // Cerrar modal de confirmación de membresía añadida
  const cerrarModalConfirmacion = () => {
    setMostrarModalConfirmacion(false);
    setMembresiaNueva(null);
  };
  
  // Cancelar cambio de membresía
  const cancelarCambioMembresia = () => {
    setMembresiaNueva(null);
    setMostrarModalMembresia(false);
  };

  // Simular proceso de pago
  const procesarPago = async () => {
    if (itemsCarrito.length === 0) return;
    
    setIsLoading(true);
    
    // Simulamos un proceso de pago
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsLoading(false);
      setMostrarConfirmacion(true);
    } catch (error) {
      setIsLoading(false);
      console.error("Error en el proceso de pago:", error);
    }
  };

  // Cerrar confirmación y reiniciar carrito
  const cerrarConfirmacion = () => {
    setMostrarConfirmacion(false);
    setItemsCarrito([]);
  };

  // Componente de loading dots
  const LoadingDots = () => (
    <div className="flex space-x-1 justify-center items-center">
      <div className="h-2 w-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
      <div className="h-2 w-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      <div className="h-2 w-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
    </div>
  );

  return (
    <>
      <div className="shadow-xl p-4 sm:p-6 md:p-8 rounded-lg container mx-auto bg-white dark:bg-boxdark">
        {/* Sección de Membresías */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
            Elige tu Membresía
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {membresiasDisponibles.map((membresia) => (
              <div 
                key={membresia.id} 
                className={`
                  rounded-lg overflow-hidden border border-stroke dark:border-gray-700
                  bg-white dark:bg-gray-800 flex flex-col
                  ${membresia.id === membresiaActual.id ? 'ring-2 ring-blue-500' : ''}
                `}
              >
                <div 
                  className="p-4 text-center text-white" 
                  style={{ backgroundColor: membresia.color }}
                >
                  <div className="text-xl font-bold">{membresia.nombre}</div>
                  <div className="text-sm opacity-90">{membresia.descripcion}</div>
                  {membresia.precioAnual > 0 && (
                    <div className="text-xs opacity-80 mt-1">
                      S/ {membresia.precioAnual.toFixed(2)} Anual
                    </div>
                  )}
                </div>
                
                <div className="p-4 flex-grow flex items-center justify-center">
                  <p className="text-black dark:text-white text-center">
                    Hasta <span className="font-bold">{membresia.puntosMensuales.toLocaleString()}</span> Puntos Mensuales por cada sucursal
                  </p>
                </div>
                
                <button 
                  onClick={() => seleccionarMembresia(membresia)}
                  className={`
                    w-full py-2 px-4 text-sm font-medium transition-colors duration-200
                    ${membresia.id === membresiaActual.id ? 
                      'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 cursor-default' : 
                      'text-white hover:opacity-90'
                    }
                  `}
                  style={{ 
                    backgroundColor: membresia.id === membresiaActual.id ? '' : membresia.color
                  }}
                  disabled={membresia.id === membresiaActual.id}
                >
                  {membresia.id === membresiaActual.id ? 'Membresía Actual' : 'Ver Membresía'}
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="text-white bg-[#1c2434] p-2 rounded-full flex items-center justify-center w-8 h-8">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </div>
              <div className="text-sm sm:text-base md:text-xl font-semibold text-black dark:text-white">
                Comprar Puntos Smart
              </div>
            </div>
          </div>

          {/* Contenedor principal */}
          <div className="flex flex-col mt-4 space-y-6">
            {/* Paquetes disponibles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {paquetesDisponibles.map((paquete) => (
                <div 
                  key={paquete.id} 
                  className="rounded-lg border border-stroke dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800 flex flex-col"
                >
                  <div className="bg-[#3c50e0] p-4 text-center text-white">
                    <div className="text-2xl font-bold">{paquete.puntos.toLocaleString()}</div>
                    <div className="text-sm opacity-90">Puntos Smart</div>
                  </div>
                  <div className="p-4 flex-grow flex items-center justify-center">
                    <div className="text-xl font-semibold text-black dark:text-white">
                      S/ {paquete.precio.toFixed(2)}
                    </div>
                  </div>
                  <button 
                    onClick={() => agregarAlCarrito(paquete)}
                    className="w-full bg-[#3c50e0] hover:bg-[#3545c4] text-white py-2 px-4 text-sm font-medium transition-colors duration-200"
                  >
                    Agregar al carrito
                  </button>
                </div>
              ))}
            </div>

            {/* Carrito */}
            <div className="rounded-lg border border-stroke dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
              <div className="flex items-center mb-4">
                <h3 className="text-sm sm:text-base font-semibold text-black dark:text-white">
                  Mi Carrito 
                  {itemsCarrito.length > 0 && (
                    <span className="ml-2 bg-[#3c50e0] text-white text-xs rounded-full px-2 py-0.5">
                      {itemsCarrito.length}
                    </span>
                  )}
                </h3>
              </div>

              {itemsCarrito.length === 0 ? (
                <p className="text-center py-6 text-gray-500 dark:text-gray-400 italic">
                  Tu carrito está vacío
                </p>
              ) : (
                <>
                  {/* Items del carrito */}
                  <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                    {itemsCarrito.map((item) => (
                      <div 
                        key={item.paquete.id} 
                        className="flex justify-between items-center py-2 border-b border-stroke dark:border-gray-700"
                      >
                        <div>
                          <div className="font-medium text-black dark:text-white">
                            {item.paquete.descripcion}
                            {item.paquete.tipo === 'membresia' && (
                              <span className="ml-2 px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                                Cambio de Plan
                              </span>
                            )}
                          </div>
                          <div className="text-[#3c50e0] dark:text-blue-400 font-medium">
                            S/ {(item.paquete.precio * item.cantidad).toFixed(2)}
                            {item.paquete.tipo === 'membresia' && (
                              <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                                /mes
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center">
                            <button 
                              onClick={() => actualizarCantidad(item.paquete.id, item.cantidad - 1)}
                              className="w-7 h-7 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded border border-stroke dark:border-gray-600 text-black dark:text-white"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-black dark:text-white">
                              {item.cantidad}
                            </span>
                            <button 
                              onClick={() => actualizarCantidad(item.paquete.id, item.cantidad + 1)}
                              className="w-7 h-7 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded border border-stroke dark:border-gray-600 text-black dark:text-white"
                            >
                              +
                            </button>
                          </div>
                          <button 
                            onClick={() => eliminarDelCarrito(item.paquete.id)}
                            className="w-7 h-7 flex items-center justify-center bg-red-100 dark:bg-red-900/20 rounded text-red-600 dark:text-red-400 font-bold"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Resumen */}
                  <div className="border-t border-stroke dark:border-gray-700 pt-4 mb-4">
                    <div className="flex justify-between mb-2 text-black dark:text-white">
                      <span>Total Puntos:</span>
                      <span className="font-medium text-[#3c50e0] dark:text-blue-400">
                        {totalPuntos.toLocaleString()} PS
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold text-black dark:text-white">
                      <span>Total a Pagar:</span>
                      <span className="text-[#3c50e0] dark:text-blue-400">
                        S/ {total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
                    <button
                      className="w-full sm:w-auto text-[#3c50e0] border-[#3c50e0] dark:text-blue-400 dark:border-blue-400 rounded border py-2 px-4 sm:px-6 font-medium text-sm sm:text-base"
                      onClick={vaciarCarrito}
                    >
                      Vaciar carrito
                    </button>
                    <button
                      onClick={procesarPago}
                      className="w-full sm:w-auto bg-[#3c50e0] hover:bg-[#3545c4] text-white rounded py-2 px-4 sm:px-6 font-medium text-sm sm:text-base"
                      disabled={isLoading || itemsCarrito.length === 0}
                    >
                      {isLoading ? (
                        <LoadingDots />
                      ) : (
                        "Proceder al pago"
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Modal de confirmación de compra */}
        {mostrarConfirmacion && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-semibold text-[#3c50e0] dark:text-blue-400 mb-4 text-center">
                ¡Compra realizada con éxito!
              </h3>
              <p className="text-center text-black dark:text-white mb-2">
                Has adquirido <strong>{totalPuntos.toLocaleString()}</strong> Puntos Smart
              </p>
              <p className="text-center text-black dark:text-white mb-2">
                Total pagado: <strong>S/ {total.toFixed(2)}</strong>
              </p>
              {itemsCarrito.some(item => item.paquete.tipo === 'membresia') && (
                <div className="my-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                  <p className="text-blue-800 dark:text-blue-200">
                    Tu cambio de membresía se hará efectivo a partir del <strong>{fechaProximaFacturacion}</strong>
                  </p>
                </div>
              )}
              <p className="text-center text-gray-500 dark:text-gray-400 text-sm mb-6">
                Recibirás un correo electrónico con los detalles de tu compra.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={cerrarConfirmacion}
                  className="bg-[#3c50e0] hover:bg-[#3545c4] text-white rounded py-2 px-6 font-medium text-sm sm:text-base"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Modal de cambio de membresía */}
        {mostrarModalMembresia && membresiaNueva && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999]">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-semibold text-[#3c50e0] dark:text-blue-400 mb-4 text-center">
                Cambio de Membresía
              </h3>
              
              <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                <p className="text-center text-blue-700 dark:text-blue-300 mb-2">
                  Estás cambiando tu membresía de <strong>{membresiaActual.nombre}</strong> a <strong>{membresiaNueva.nombre}</strong>
                </p>
                <p className="text-center text-blue-700 dark:text-blue-300">
                  El cambio se hará efectivo a partir de tu próxima fecha de facturación: <strong>{fechaProximaFacturacion}</strong>
                </p>
              </div>
              
              <div className="flex flex-col space-y-3 p-4 bg-gray-50 dark:bg-gray-700/20 rounded-lg mb-6">
                <div className="flex justify-between">
                  <span className="text-black dark:text-white">Membresía actual:</span>
                  <span className="font-medium text-black dark:text-white">{membresiaActual.nombre}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black dark:text-white">Nueva membresía:</span>
                  <span className="font-medium" style={{ color: membresiaNueva.color }}>{membresiaNueva.nombre}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black dark:text-white">Nuevo precio mensual:</span>
                  <span className="font-medium text-black dark:text-white">
                    S/ {membresiaNueva.precioMensual.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black dark:text-white">Puntos mensuales:</span>
                  <span className="font-medium text-black dark:text-white">
                    {membresiaNueva.puntosMensuales.toLocaleString()}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-between gap-4">
                <button
                  onClick={cancelarCambioMembresia}
                  className="w-1/2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded py-2 px-4 font-medium text-sm"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmarCambioMembresia}
                  className="w-1/2 bg-[#3c50e0] hover:bg-[#3545c4] text-white rounded py-2 px-4 font-medium text-sm"
                >
                  Confirmar Cambio
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Modal de confirmación de membresía añadida al carrito */}
        {mostrarModalConfirmacion && membresiaNueva && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-center text-black dark:text-white mb-2">
                ¡Membresía añadida al carrito!
              </h3>
              
              <div className="my-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                <p className="text-blue-700 dark:text-blue-300 mb-2">
                  <span className="font-medium">{membresiaNueva.nombre}</span> se ha añadido a tu carrito de compras
                </p>
                <p className="text-blue-700 dark:text-blue-300">
                  El cambio se hará efectivo a partir del <strong>{fechaProximaFacturacion}</strong>
                </p>
              </div>
              
              <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                Completa el proceso de pago para finalizar tu cambio de membresía.
              </p>
              
              <div className="flex justify-center">
                <button
                  onClick={cerrarModalConfirmacion}
                  className="bg-[#3c50e0] hover:bg-[#3545c4] text-white rounded-lg py-2 px-6 font-medium transition-colors duration-200"
                >
                  Continuar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CarritoPuntosSmartDemo;