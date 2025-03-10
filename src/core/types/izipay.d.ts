// src/types/izipay.d.ts
// Este archivo declara los tipos para la integración con Izipay

// Extender la interfaz global Window para incluir el SDK de Izipay
declare global {
    interface Window {
      KR?: {
        setFormConfig: (config: KRFormConfig) => void;
        onSubmit: (callback: (event: any) => void) => void;
        onPaymentSuccess: (callback: (event: KRPaymentSuccessEvent) => void) => void;
        onPaymentError: (callback: (event: KRPaymentErrorEvent) => void) => void;
        onPaymentRefused: (callback: (event: KRPaymentErrorEvent) => void) => void;
      };
    }
  }
  
  // Configuración del formulario de Izipay
  export interface KRFormConfig {
    formToken: string;
    amount: number;
    currency: string;
    orderId: string;
    formId: string;
    language?: string;
  }
  
  // Evento de éxito de pago
  export interface KRPaymentSuccessEvent {
    transactionId: string;
    amount: number;
    currency: string;
    orderId: string;
    paymentMethod?: string;
    paymentMethodType?: string;
    metadata?: Record<string, any>;
  }
  
  // Evento de error de pago
  export interface KRPaymentErrorEvent {
    errorCode: string;
    errorMessage: string;
    detailedErrorCode?: string;
    detailedErrorMessage?: string;
    orderId?: string;
  }
  
  // Datos de éxito de pago para el manejo en la aplicación
  export interface PaymentSuccessData {
    transactionId: string;
    amount: number;
    orderId: string;
    date: string;
    last4?: string;
  }
  
  // Datos de error de pago para el manejo en la aplicación
  export interface PaymentErrorData {
    error: string;
    errorCode?: string;
    reason?: string;
    orderId: string;
  }