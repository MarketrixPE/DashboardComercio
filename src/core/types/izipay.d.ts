
declare global {
  interface Window {
    Izipay?: {
      new (config: IzipayConfig): IzipayInstance;
    };
  }
}

// Configuración de Izipay
export interface IzipayConfig {
  publicKey: string;
  merchantId: string;
  mode: 'TEST' | 'PROD';
  amount: number;
  orderId: string;
  email: string;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
  onClose?: () => void;
}

// Instancia de Izipay con el método checkout
export interface IzipayInstance {
  checkout: () => void;
}