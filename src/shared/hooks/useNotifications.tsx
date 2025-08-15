import { useState, useEffect, useCallback } from 'react';
import { ExpiredCoupon, Notification, NotificationType } from '../../core/types/notifications';
import { getAllExpiredCoupons } from '../../core/services/Operador/Coupons/expiredCouponsService';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Convertir cupones vencidos a notificaciones
  const convertCouponsToNotifications = (expiredCoupons: ExpiredCoupon[]): Notification[] => {
    return expiredCoupons.map((couponData) => ({
      id: `expired_coupon_${couponData.coupon.id}`,
      type: 'expired_coupon' as NotificationType,
      title: 'Cupón Vencido',
      message: `El cupón "${couponData.coupon.titulo}" en ${couponData.branch.descripcion} venció hace ${couponData.coupon.dias_vencido} día(s)`,
      timestamp: new Date(Date.now() - (couponData.coupon.dias_vencido * 24 * 60 * 60 * 1000)),
      isRead: false,
      priority: (couponData.coupon.dias_vencido > 30 ? 'low' : couponData.coupon.dias_vencido > 7 ? 'medium' : 'high') as 'low' | 'medium' | 'high',
      data: couponData
    }));
  };

  // Cargar notificaciones de cupones vencidos
  const loadExpiredCouponsNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAllExpiredCoupons();
      
      if (response.success && response.data.length > 0) {
        const couponNotifications = convertCouponsToNotifications(response.data);
        setNotifications(prev => {
          // Evitar duplicados basándose en el ID
          const existingIds = prev.map(n => n.id);
          const newNotifications = couponNotifications.filter(n => !existingIds.includes(n.id));
          return [...prev, ...newNotifications];
        });
      }
    } catch (error) {
      console.error('Error al cargar notificaciones de cupones vencidos:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Agregar notificación manual
  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `manual_${Date.now()}_${Math.random()}`,
      timestamp: new Date(),
      priority: notification.priority || 'medium' // Asegurar que priority esté definido
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  }, []);

  // Marcar notificación como leída
  const markAsRead = useCallback((notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  }, []);

  // Marcar todas como leídas
  const markAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  }, []);

  // Eliminar notificación
  const removeNotification = useCallback((notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  }, []);

  // Limpiar todas las notificaciones
  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Actualizar contador de no leídas
  useEffect(() => {
    const unreadCount = notifications.filter(n => !n.isRead).length;
    setUnreadCount(unreadCount);
  }, [notifications]);

  // Cargar notificaciones al montar el componente
  useEffect(() => {
    loadExpiredCouponsNotifications();
  }, [loadExpiredCouponsNotifications]);

  // Función para refrescar notificaciones - DEBE retornar Promise<void>
  const refreshNotifications = useCallback(async (): Promise<void> => {
    await loadExpiredCouponsNotifications();
  }, [loadExpiredCouponsNotifications]);

  return {
    notifications,
    loading,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications,
    refreshNotifications,
    loadExpiredCouponsNotifications
  };
};