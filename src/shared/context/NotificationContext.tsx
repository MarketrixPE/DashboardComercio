import React, { createContext, useContext, useEffect, useRef } from 'react';
import { useNotifications } from '../hooks/useNotifications';

// Importar tipos directamente sin alias
import { 
  NotificationContextType, 
  NotificationSettings, 
  NotificationFilter, 
  NotificationStats,
  Notification
} from '../../core/types/notifications';

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: React.ReactNode;
  pollingInterval?: number; // en milisegundos (default: 5 minutos)
  enablePolling?: boolean;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
  pollingInterval = 5 * 60 * 1000, // 5 minutos por defecto
  enablePolling = true
}) => {
  const notificationHook = useNotifications();
  const pollingRef = useRef<NodeJS.Timeout>();

  // Configuraciones por defecto
  const defaultSettings: NotificationSettings = {
    enableExpiredCoupons: true,
    enableProductAlerts: true,
    enableSystemNotifications: true,
    checkInterval: 5, // minutos
    maxNotifications: 50
  };

  const [settings, setSettings] = React.useState<NotificationSettings>(() => {
    // Cargar configuraciones desde localStorage si existen
    const savedSettings = localStorage.getItem('notification_settings');
    return savedSettings ? { ...defaultSettings, ...JSON.parse(savedSettings) } : defaultSettings;
  });

  // Guardar configuraciones en localStorage cuando cambien
  const updateSettings = React.useCallback((newSettings: Partial<NotificationSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem('notification_settings', JSON.stringify(updatedSettings));
  }, [settings]);

  // Filtrar notificaciones
  const filterNotifications = React.useCallback((filter: NotificationFilter): Notification[] => {
    return notificationHook.notifications.filter((notification: Notification) => {
      // Filtro por tipo
      if (filter.type && !filter.type.includes(notification.type)) {
        return false;
      }

      // Filtro por estado de lectura
      if (filter.isRead !== undefined && notification.isRead !== filter.isRead) {
        return false;
      }

      // Filtro por fecha desde
      if (filter.dateFrom && notification.timestamp < filter.dateFrom) {
        return false;
      }

      // Filtro por fecha hasta
      if (filter.dateTo && notification.timestamp > filter.dateTo) {
        return false;
      }

      // Filtro por prioridad
      if (filter.priority && notification.priority && !filter.priority.includes(notification.priority)) {
        return false;
      }

      // Filtro por branch (para cupones vencidos)
      if (filter.branchId && notification.type === 'expired_coupon' && notification.data) {
        if (!filter.branchId.includes(notification.data.branch.id.toString())) {
          return false;
        }
      }

      return true;
    });
  }, [notificationHook.notifications]);

  // Obtener estadísticas
  const getStats = React.useCallback((): NotificationStats => {
    const notifications = notificationHook.notifications;
    
    const byType = notifications.reduce((acc, notification) => {
      acc[notification.type] = (acc[notification.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const byPriority = notifications.reduce((acc, notification: Notification) => {
      const priority = notification.priority || 'medium';
      acc[priority] = (acc[priority] || 0) + 1;
      return acc;
    }, { low: 0, medium: 0, high: 0 });

    return {
      total: notifications.length,
      unread: notificationHook.unreadCount,
      byType: byType as Record<Notification['type'], number>,
      byPriority
    };
  }, [notificationHook.notifications, notificationHook.unreadCount]);

  // Limpiar notificaciones antiguas basándose en maxNotifications
  const cleanupOldNotifications = React.useCallback(() => {
    if (notificationHook.notifications.length > settings.maxNotifications) {
      // Mantener las más recientes y las no leídas
      const sortedNotifications = [...notificationHook.notifications]
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      
      const toKeep = sortedNotifications.slice(0, settings.maxNotifications);
      const unreadToKeep = notificationHook.notifications.filter(n => !n.isRead);
      
      // Combinar y eliminar duplicados
      const finalToKeep = new Set([...toKeep.map(n => n.id), ...unreadToKeep.map(n => n.id)]);
      
      notificationHook.notifications.forEach(notification => {
        if (!finalToKeep.has(notification.id)) {
          notificationHook.removeNotification(notification.id);
        }
      });
    }
  }, [notificationHook.notifications, settings.maxNotifications, notificationHook.removeNotification]);

  // Configurar polling automático
  useEffect(() => {
    if (enablePolling && settings.enableExpiredCoupons) {
      const startPolling = () => {
        pollingRef.current = setInterval(() => {
          notificationHook.refreshNotifications();
        }, pollingInterval);
      };

      startPolling();

      return () => {
        if (pollingRef.current) {
          clearInterval(pollingRef.current);
        }
      };
    }
  }, [enablePolling, settings.enableExpiredCoupons, pollingInterval, notificationHook.refreshNotifications]);

  // Limpiar notificaciones antiguas periódicamente
  useEffect(() => {
    const cleanupInterval = setInterval(cleanupOldNotifications, 30 * 60 * 1000); // cada 30 minutos
    return () => clearInterval(cleanupInterval);
  }, [cleanupOldNotifications]);

  // Valor del contexto
  const contextValue: NotificationContextType = {
    notifications: notificationHook.notifications,
    unreadCount: notificationHook.unreadCount,
    loading: notificationHook.loading,
    settings,
    addNotification: notificationHook.addNotification,
    markAsRead: notificationHook.markAsRead,
    markAllAsRead: notificationHook.markAllAsRead,
    removeNotification: notificationHook.removeNotification,
    clearAllNotifications: notificationHook.clearAllNotifications,
    filterNotifications,
    getStats,
    updateSettings,
    refreshNotifications: notificationHook.refreshNotifications
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

// Hook para usar el contexto
export const useNotificationContext = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext debe ser usado dentro de un NotificationProvider');
  }
  return context;
};

export default NotificationContext;