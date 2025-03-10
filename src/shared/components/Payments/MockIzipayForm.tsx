// src/components/payments/MockIzipayForm.tsx
// Este componente simula un formulario de pago para desarrollo/demostración
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { LoadingDots } from '../Atoms/LoadingDots/LoadingDots';

interface MockIzipayFormProps {
  amount: number;
  orderId: string;
  onPaymentSuccess: (data: PaymentSuccessData) => void;
  onPaymentError: (error: PaymentErrorData) => void;
}

interface PaymentSuccessData {
  transactionId: string;
  amount: number;
  orderId: string;
  date: string;
  last4?: string;
}

interface PaymentErrorData {
  error: string;
  errorCode?: string;
  reason?: string;
  orderId: string;
}

interface FormErrors {
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
  cardHolder?: string;
}

const MockIzipayForm: React.FC<MockIzipayFormProps> = ({
  amount,
  orderId,
  onPaymentSuccess,
  onPaymentError
}) => {
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expiry, setExpiry] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');
  const [cardHolder, setCardHolder] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // Formatea el número de tarjeta mientras el usuario escribe
  const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, '');
    let formatted = '';
    for (let i = 0; i < input.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formatted += ' ';
      }
      formatted += input[i];
    }
    setCardNumber(formatted.substring(0, 19)); // 16 dígitos + 3 espacios
  };

  // Formatea la fecha de expiración mientras el usuario escribe
  const handleExpiryChange = (e: ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, '');
    if (input.length > 2) {
      input = input.substring(0, 2) + '/' + input.substring(2, 4);
    }
    setExpiry(input);
  };

  // Validación básica de tarjeta
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    // Validar número de tarjeta (debe tener 16 dígitos)
    if (cardNumber.replace(/\s/g, '').length !== 16) {
      errors.cardNumber = 'El número debe tener 16 dígitos';
    }
    
    // Validar fecha de expiración (formato MM/YY)
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      errors.expiry = 'Use el formato MM/YY';
    } else {
      const [month, year] = expiry.split('/');
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
      
      if (parseInt(month) < 1 || parseInt(month) > 12) {
        errors.expiry = 'Mes inválido';
      } else if (
        parseInt(year) < currentYear || 
        (parseInt(year) === currentYear && parseInt(month) < currentMonth)
      ) {
        errors.expiry = 'La tarjeta ha expirado';
      }
    }
    
    // Validar CVV (3-4 dígitos)
    if (!/^\d{3,4}$/.test(cvv)) {
      errors.cvv = 'El CVV debe tener 3 o 4 dígitos';
    }
    
    // Validar nombre del titular
    if (!cardHolder.trim()) {
      errors.cardHolder = 'Ingrese el nombre del titular';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsProcessing(true);
    
    // Simular procesamiento de pago (tiempo aleatorio)
    const processingTime = 1000 + Math.random() * 2000;
    await new Promise(resolve => setTimeout(resolve, processingTime));
    
    // Simular resultado aleatorio (90% éxito, 10% error)
    const isSuccessful = Math.random() < 0.5;
    
    if (isSuccessful) {
      const mockTransactionId = 'TR' + Date.now().toString().substring(7);
      onPaymentSuccess({
        transactionId: mockTransactionId,
        amount: amount,
        orderId: orderId,
        date: new Date().toISOString(),
        last4: cardNumber.replace(/\s/g, '').slice(-4)
      });
    } else {
      // Códigos de error simulados comunes
      const errorCodes: string[] = [
        'DECLINED_BY_BANK',
        'INSUFFICIENT_FUNDS',
        'EXPIRED_CARD',
        'TRANSACTION_NOT_PERMITTED',
        'SUSPECTED_FRAUD'
      ];
      const randomError = errorCodes[Math.floor(Math.random() * errorCodes.length)];
      
      onPaymentError({
        error: getErrorMessage(randomError),
        errorCode: randomError,
        orderId: orderId
      });
    }
    
    setIsProcessing(false);
  };
  
  // Función para traducir códigos de error
  const getErrorMessage = (code: string): string => {
    const errorMessages: Record<string, string> = {
      'DECLINED_BY_BANK': 'Transacción rechazada por el banco emisor',
      'INSUFFICIENT_FUNDS': 'Fondos insuficientes',
      'EXPIRED_CARD': 'La tarjeta ha expirado',
      'TRANSACTION_NOT_PERMITTED': 'Transacción no permitida para esta tarjeta',
      'SUSPECTED_FRAUD': 'Transacción marcada como sospechosa'
    };
    
    return errorMessages[code] || 'Error desconocido';
  };

  return (
    <div className="w-full mx-auto bg-white dark:bg-boxdark rounded-lg shadow-md p-6">
      <div className="mb-6 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Información de Pago
        </h3>
        
        <div className="flex space-x-2">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" 
              alt="Visa" className="h-8" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" 
              alt="Mastercard" className="h-8" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png" 
              alt="American Express" className="h-8" />
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Número de Tarjeta
          </label>
          <input
            type="text"
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="1234 5678 9012 3456"
            className={`w-full px-3 py-2 border rounded-md ${
              formErrors.cardNumber 
                ? 'border-red-500 dark:border-red-500' 
                : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
            maxLength={19}
          />
          {formErrors.cardNumber && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.cardNumber}</p>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Fecha de Expiración
            </label>
            <input
              type="text"
              value={expiry}
              onChange={handleExpiryChange}
              placeholder="MM/YY"
              className={`w-full px-3 py-2 border rounded-md ${
                formErrors.expiry 
                  ? 'border-red-500 dark:border-red-500' 
                  : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              maxLength={5}
            />
            {formErrors.expiry && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.expiry}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Código de Seguridad (CVV)
            </label>
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 4))}
              placeholder="123"
              className={`w-full px-3 py-2 border rounded-md ${
                formErrors.cvv 
                  ? 'border-red-500 dark:border-red-500' 
                  : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              maxLength={4}
            />
            {formErrors.cvv && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.cvv}</p>
            )}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Nombre del Titular
          </label>
          <input
            type="text"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
            placeholder="NOMBRE COMO APARECE EN LA TARJETA"
            className={`w-full px-3 py-2 border rounded-md ${
              formErrors.cardHolder 
                ? 'border-red-500 dark:border-red-500' 
                : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
          />
          {formErrors.cardHolder && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.cardHolder}</p>
          )}
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full py-3 rounded-md ${
              isProcessing
                ? 'bg-indigo-400 dark:bg-indigo-600 cursor-not-allowed'
                : 'bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600'
            } text-white font-medium transition-colors`}
          >
            {isProcessing ? (
              <span className="flex items-center justify-center">
                <LoadingDots />
                <span className="ml-2">Procesando...</span>
              </span>
            ) : (
              `Pagar S/ ${amount.toFixed(2)}`
            )}
          </button>
        </div>
        
        <div className="mt-4 flex items-center justify-center space-x-2">
          <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Conexión segura. Sus datos están protegidos.
          </span>
        </div>
      </form>
    </div>
  );
};

export default MockIzipayForm;