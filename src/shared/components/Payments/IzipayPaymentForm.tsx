// src/components/payments/IzipayPaymentForm.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingDots } from '../Atoms/LoadingDots/LoadingDots';

interface PaymentSuccessData {
  transactionId: string;
  amount: number;
  orderId: string;
  date: string;
}

interface PaymentErrorData {
  error: string;
  errorCode?: string;
  reason?: string;
  orderId: string;
}

interface IzipayPaymentFormProps {
  amount: number;
  orderId: string;
  customerEmail: string;
  onPaymentSuccess: (data: PaymentSuccessData) => void;
  onPaymentError: (error: PaymentErrorData) => void;
}

const IzipayPaymentForm: React.FC<IzipayPaymentFormProps> = ({ 
  amount, 
  orderId, 
  customerEmail,
  onPaymentSuccess,
  onPaymentError
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [, setTransactionId] = useState<string | null>(null);
  const [, setPaymentStatus] = useState<'pending' | 'success' | 'error' | 'refused'>('pending');
  const formRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Configuración de Izipay (valores de ejemplo para desarrollo)
  const izipayConfig = {
    // NOTA: Usar estos valores solo para desarrollo/demostración
    MERCHANT_ID: '123456789',
    PUBLIC_KEY: 'testpublickey_DEMOPUBLICKEY95me92597fd28tGD4r5',
    // Siempre usar 'TEST' para desarrollo
    ENVIRONMENT: 'TEST',
  };

  useEffect(() => {
    // Cargar el script de Izipay dinámicamente
    const loadIzipayScript = () => {
      const script = document.createElement('script');
      script.src = izipayConfig.ENVIRONMENT === 'TEST'
        ? 'https://static.micuentaweb.pe/static/js/krypton-client/V4.0/stable/kr-payment-form.min.js'
        : 'https://static.micuentaweb.pe/static/js/krypton-client/V4.0/stable/kr-payment-form.min.js';
      script.setAttribute('kr-public-key', izipayConfig.PUBLIC_KEY);
      script.setAttribute('kr-language', 'es-ES');
      script.setAttribute('kr-post-url-success', `${window.location.origin}/payment/success`);
      script.setAttribute('kr-post-url-refused', `${window.location.origin}/payment/error`);
      
      script.onload = initializeForm;
      script.onerror = () => {
        setError('No se pudo cargar el formulario de pago. Por favor, intente más tarde.');
        setLoading(false);
      };
      
      document.head.appendChild(script);
      return () => {
        document.head.removeChild(script);
      };
    };

    loadIzipayScript();
  }, []);

  const initializeForm = async () => {
    if (window.KR) {
      try {
        // Inicializar el formulario de Izipay
        const KR = window.KR;
        
        // Obtener token
        const formToken = await fetchFormToken();
        if (!formToken) return;
        
        KR.setFormConfig({
          formToken: formToken,
          amount: amount * 100, // Izipay requiere el monto en centavos
          currency: 'PEN', // Moneda peruana
          orderId: orderId,
          formId: 'izipay-form',
          language: 'es-ES',
        });
        
        // Configurar listeners de eventos
        KR.onSubmit(onFormSubmitted);
        KR.onPaymentSuccess(handlePaymentSuccess);
        KR.onPaymentError(handlePaymentError);
        KR.onPaymentRefused(handlePaymentRefused);
        
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError('Error al inicializar el formulario: ' + err.message);
        } else {
          setError('Error desconocido al inicializar el formulario');
        }
        setLoading(false);
      }
    }
  };

  // Mock de obtención de token (para desarrollo/demostración)
  const fetchFormToken = async (): Promise<string | null> => {
    // En un entorno real, esta función debería llamar a tu backend
    // para obtener un token real de Izipay. Para fines de demostración,
    // devolvemos un token de ejemplo.
    
    // Simular retraso de red
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      // Este es un token falso para demostración
      // En producción NUNCA hagas esto - el token debe generarse en el backend
      const mockToken = "y2kyb3FzMXN4MT1DMTM4ODA2ODU3fHRva2VuUHVibGljVGVzdA==";
      
      console.log('Token de demostración generado', {
        amount: amount,
        orderId: orderId,
        email: customerEmail
      });
      
      // Para testing, puedes simular errores aleatoriamente
      if (Math.random() < 0.1) { // 10% de probabilidad de error
        throw new Error('Error simulado de conexión');
      }
      
      return mockToken;
    } catch (err) {
      if (err instanceof Error) {
        setError('Error al comunicarse con el servidor: ' + err.message);
      } else {
        setError('Error desconocido al comunicarse con el servidor');
      }
      setLoading(false);
      return null;
    }
  };

  const onFormSubmitted = (_event: any) => {
    setLoading(true);
    // El formulario se encargará de redirigir según configuración
  };

  const handlePaymentSuccess = (event: any) => {
    setPaymentStatus('success');
    setTransactionId(event.transactionId);
    setLoading(false);
    
    // Notificar al componente padre
    onPaymentSuccess({
      transactionId: event.transactionId,
      amount: amount,
      orderId: orderId,
      date: new Date().toISOString()
    });
    
    // Opcional: redirigir a página de éxito
    navigate('/payment/confirmation', {
      state: {
        status: 'success',
        transactionId: event.transactionId,
        amount: amount,
        orderId: orderId
      }
    });
  };

  const handlePaymentError = (event: any) => {
    setPaymentStatus('error');
    setError(event.errorMessage || 'Error en el procesamiento del pago');
    setLoading(false);
    
    onPaymentError({
      error: event.errorMessage || 'Error desconocido',
      errorCode: event.errorCode,
      orderId: orderId
    });
  };

  const handlePaymentRefused = (event: any) => {
    setPaymentStatus('refused');
    setError('Pago rechazado: ' + (event.errorMessage || 'La transacción fue rechazada'));
    setLoading(false);
    
    onPaymentError({
      error: 'Pago rechazado',
      errorCode: event.errorCode,
      reason: event.errorMessage,
      orderId: orderId
    });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 p-6 bg-white dark:bg-boxdark rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
        Realizar Pago
      </h2>
      
      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <LoadingDots />
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Cargando formulario de pago...
          </p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-3 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Reintentar
          </button>
        </div>
      )}
      
      {!loading && !error && (
        <>
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-300">Monto a pagar:</span>
              <span className="font-bold text-gray-800 dark:text-white">S/ {amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-300">Orden:</span>
              <span className="text-gray-800 dark:text-white">{orderId}</span>
            </div>
          </div>
          
          {/* Contenedor para el formulario de Izipay */}
          <div 
            id="izipay-form" 
            ref={formRef}
            className="kr-embedded"
            kr-form-token="FORM_TOKEN_PLACEHOLDER"
          >
            {/* Izipay reemplazará este div con su formulario */}
            <div className="kr-pan"></div>
            <div className="kr-expiry"></div>
            <div className="kr-security-code"></div>
            <button className="kr-payment-button"></button>
          </div>
          
          <div className="mt-6 flex justify-between">
            <button
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
          </div>
          
          {/* Información de seguridad */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center mb-4">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm text-gray-600 dark:text-gray-300">Transacción segura con encriptación SSL</span>
            </div>
            <div className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-sm text-gray-600 dark:text-gray-300">Sus datos están protegidos</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default IzipayPaymentForm;