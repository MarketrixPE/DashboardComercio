// types/notifications.ts

export interface ExpiredCoupon {
  coupon: {
    id: number;
    titulo: string;
    descripcion: string;
    codigo_barras: string;
    imagen: string;
    puntos: number;
    porcentaje_descuento: number;
    fecha_vencimiento: string;
    dias_vencido: number;
    estado?: string;
    activo?: number;
  };
  product: {
    id: number;
    titulo: string;
  };
  branch: {
    id: number;
    descripcion: string;
    direccion: string;
  };
}

export interface ExpiredCouponsResponse {
  success: boolean;
  message: string;
  total_expired: number;
  user_branches_count: number;
  data: ExpiredCoupon[];
}

export type NotificationType = 'expired_coupon' | 'info' | 'warning' | 'success' | 'error';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  data?: any;
  priority?: 'low' | 'medium' | 'high';
  actions?: NotificationAction[];
}

export interface NotificationAction {
  id: string;
  label: string;
  action: () => void;
  style?: 'primary' | 'secondary' | 'danger';
}

export interface NotificationSettings {
  enableExpiredCoupons: boolean;
  enableProductAlerts: boolean;
  enableSystemNotifications: boolean;
  checkInterval: number; // en minutos
  maxNotifications: number;
}

export interface NotificationFilter {
  type?: NotificationType[];
  isRead?: boolean;
  dateFrom?: Date;
  dateTo?: Date;
  priority?: ('low' | 'medium' | 'high')[];
  branchId?: string[];
}

export interface NotificationStats {
  total: number;
  unread: number;
  byType: Record<NotificationType, number>;
  byPriority: Record<'low' | 'medium' | 'high', number>;
}

// Eventos del sistema de notificaciones
export interface NotificationEvent {
  type: 'notification_added' | 'notification_read' | 'notification_removed';
  notification: Notification;
  timestamp: Date;
}

// Configuración de polling para notificaciones en tiempo real
export interface NotificationPollingConfig {
  enabled: boolean;
  interval: number; // en milisegundos
  maxRetries: number;
  onError?: (error: Error) => void;
}

// Contexto de notificaciones para Provider
export interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  settings: NotificationSettings;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  removeNotification: (notificationId: string) => void;
  clearAllNotifications: () => void;
  filterNotifications: (filter: NotificationFilter) => Notification[];
  getStats: () => NotificationStats;
  updateSettings: (settings: Partial<NotificationSettings>) => void;
  refreshNotifications: () => Promise<void>;
}