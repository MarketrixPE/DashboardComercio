import React, { useEffect, useState } from 'react';
import { IzipayConfig } from '../../../core/types/izipay';


// Define una interfaz para los datos de la transacción
interface TransactionData {
  amount: number;
  orderId: string;
  email: string;
}

const IzipayCheckout: React.FC = () => {
  const [izipayLoaded, setIzipayLoaded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Datos de la transacción
  const transaction: TransactionData = {
    amount: 1000,
    orderId: `ORDER-${Date.now()}`,
    email: 'cliente@example.com',
  };

  // Verifica si el script de Izipay está cargado
  useEffect(() => {
    const checkIzipay = () => {
      if (window.Izipay) {
        setIzipayLoaded(true);
      } else {
        setTimeout(checkIzipay, 100);
      }
    };
    checkIzipay();
  }, []);

  // Función para manejar el pago
  const handlePayment = () => {
    if (!izipayLoaded || !window.Izipay) {
      alert('Izipay no está cargado aún. Por favor, espera.');
      return;
    }

    setLoading(true);

    const config: IzipayConfig = {
      publicKey: 'TU_PUBLIC_KEY',
      merchantId: 'TU_MERCHANT_ID',
      mode: 'TEST',
      amount: transaction.amount,
      orderId: transaction.orderId,
      email: transaction.email,
      onSuccess: (response: any) => {
        setLoading(false);
        console.log('Pago exitoso:', response);
        alert('¡Pago realizado con éxito!');
      },
      onError: (error: any) => {
        setLoading(false);
        console.error('Error en el pago:', error);
        alert('Hubo un error al procesar el pago. Intenta nuevamente.');
      },
      onClose: () => {
        setLoading(false);
        console.log('El usuario cerró el pop-up');
      },
    };

    const izipay = new window.Izipay(config);

    // Abrir el pop-up
    izipay.checkout();
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Checkout con Izipay</h2>
      <p>Monto a pagar: S/ {(transaction.amount / 100).toFixed(2)}</p>
      <button
        onClick={handlePayment}
        disabled={!izipayLoaded || loading}
        style={{
          padding: '10px 20px',
          backgroundColor: loading ? '#ccc' : '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Procesando...' : 'Pagar con Izipay'}
      </button>
    </div>
  );
};

export default IzipayCheckout;