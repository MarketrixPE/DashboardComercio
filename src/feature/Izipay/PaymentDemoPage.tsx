// src/pages/PaymentDemoPage.tsx
import React, { useState } from "react";
import MockIzipayForm from "../../shared/components/Payments/MockIzipayForm";

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

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface OrderData {
  orderId: string;
  amount: number;
  customerEmail: string;
  items: OrderItem[];
}

const PaymentDemoPage: React.FC = () => {
  const [paymentStatus, setPaymentStatus] = useState<
    "pending" | "success" | "error" | null
  >(null);
  const [paymentResult, setPaymentResult] = useState<
    PaymentSuccessData | PaymentErrorData | null
  >(null);
  const [showForm, setShowForm] = useState<boolean>(false);

  // Datos de ejemplo para la demostración
  const orderData: OrderData = {
    orderId: "ORD-" + Math.floor(100000 + Math.random() * 900000),
    amount: 149.99,
    customerEmail: "cliente@ejemplo.com",
    items: [{ name: "Suscripción Premium", price: 149.99, quantity: 1 }],
  };

  const handlePaymentSuccess = (data: PaymentSuccessData): void => {
    console.log("Pago exitoso:", data);
    setPaymentStatus("success");
    setPaymentResult(data);
    setShowForm(false);
  };

  const handlePaymentError = (error: PaymentErrorData): void => {
    console.error("Error en pago:", error);
    setPaymentStatus("error");
    setPaymentResult(error);
    setShowForm(false);
  };

  const resetDemo = (): void => {
    setPaymentStatus(null);
    setPaymentResult(null);
    setShowForm(false);
  };

  const startCheckout = (): void => {
    setShowForm(true);
    setPaymentStatus("pending");
    setPaymentResult(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-boxdark rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
            Demo de Integración de Pagos - Izipay
          </h1>

          {!showForm && !paymentStatus && (
            <div className="mb-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
                <p className="text-blue-800 dark:text-blue-200">
                  Esta es una demostración de cómo se integraría el formulario
                  de pago Izipay. Los datos y transacciones son simulados para
                  fines de demostración.
                </p>
              </div>

              <div className="border dark:border-gray-700 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                  Resumen de Compra
                </h2>
                <div className="space-y-4">
                  {orderData.items.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Cantidad: {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold">
                        S/ {item.price.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t dark:border-gray-700">
                  <div className="flex justify-between font-bold">
                    <p>Total</p>
                    <p>S/ {orderData.amount.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={startCheckout}
                className="w-full py-3 px-6 bg-[#3c50e0] hover:bg-[#3544b8] text-white rounded-lg transition-colors font-medium"
              >
                Proceder al Pago
              </button>
            </div>
          )}

          {showForm && (
            <MockIzipayForm
              amount={orderData.amount}
              orderId={orderData.orderId}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentError={handlePaymentError}
            />
          )}

          {paymentStatus === "success" && (
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <svg
                  className="h-12 w-12 text-green-500 mr-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h2 className="text-2xl font-bold text-green-800 dark:text-green-200">
                  ¡Pago Exitoso!
                </h2>
              </div>

              <div className="mb-6">
                <p className="text-green-700 dark:text-green-300 mb-2">
                  Su pago ha sido procesado correctamente.
                </p>
                <p className="text-green-600 dark:text-green-400 text-sm">
                  Recibirá un correo de confirmación en breve.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-md mb-6">
                <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">
                  Detalles de la transacción:
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      ID de Transacción:
                    </span>
                    <span className="font-medium">
                      {(paymentResult as PaymentSuccessData)?.transactionId ||
                        "2587TR6C901"}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Monto:
                    </span>
                    <span className="font-medium">
                      S/ {orderData.amount.toFixed(2)}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Fecha:
                    </span>
                    <span className="font-medium">
                      {new Date().toLocaleDateString()}{" "}
                      {new Date().toLocaleTimeString()}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Método:
                    </span>
                    <span className="font-medium">
                      Tarjeta terminada en{" "}
                      {(paymentResult as PaymentSuccessData)?.last4 || "1234"}
                    </span>
                  </li>
                </ul>
              </div>

              <button
                onClick={resetDemo}
                className="py-2 px-6 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                Volver a la Demostración
              </button>
            </div>
          )}

          {paymentStatus === "error" && (
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <svg
                  className="h-12 w-12 text-red-500 mr-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h2 className="text-2xl font-bold text-red-800 dark:text-red-200">
                  Error en el Pago
                </h2>
              </div>

              <div className="mb-6">
                <p className="text-red-700 dark:text-red-300 mb-2">
                  Hubo un problema al procesar su pago.
                </p>
                <p className="text-red-600 dark:text-red-400 text-sm">
                  {(paymentResult as PaymentErrorData)?.error ||
                    "La transacción fue rechazada por el banco emisor."}
                </p>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setPaymentStatus(null); // Reinicia el estado de pago
                    setPaymentResult(null); // Limpia el resultado anterior
                    setShowForm(true); // Muestra el formulario nuevamente
                  }}
                  className="py-2 px-6 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Intentar Nuevamente
                </button>

                <button
                  onClick={resetDemo}
                  className="py-2 px-6 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentDemoPage;
