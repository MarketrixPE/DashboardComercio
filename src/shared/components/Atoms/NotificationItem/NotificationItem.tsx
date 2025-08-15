import { Link } from "react-router-dom";
import { Notification } from "../../../../core/types/notifications";

interface NotificationItemProps {
  notification: Notification;
  onNotificationClick: (notificationId: string) => void;
  onRemoveNotification: (notificationId: string) => void;
}

const NotificationItem = ({
  notification,
  onNotificationClick,
  onRemoveNotification,
}: NotificationItemProps) => {
  const formatTimeAgo = (timestamp: Date): string => {
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - timestamp.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(
        (now.getTime() - timestamp.getTime()) / (1000 * 60)
      );
      return diffInMinutes <= 1
        ? "Hace un momento"
        : `Hace ${diffInMinutes} minutos`;
    } else if (diffInHours < 24) {
      return `Hace ${diffInHours} hora${diffInHours !== 1 ? "s" : ""}`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `Hace ${diffInDays} día${diffInDays !== 1 ? "s" : ""}`;
    }
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "expired_coupon":
        return (
          <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-red-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        );
      case "warning":
        return (
          <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-yellow-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        );
      case "success":
        return (
          <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        );
      case "error":
        return (
          <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-red-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        );
      case "info":
      default:
        return (
          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        );
    }
  };

  const getPriorityBadge = (priority?: "low" | "medium" | "high") => {
    if (!priority) return null;

    const styles = {
      high: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
      medium:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
      low: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
    };

    const labels = {
      high: "Alta",
      medium: "Media",
      low: "Baja",
    };

    return (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${styles[priority]}`}
      >
        {labels[priority]}
      </span>
    );
  };

  const getNotificationLink = () => {
    switch (notification.type) {
      case "expired_coupon":
        // Redirigir a la página de cupones o detalles del cupón
        return `/coupons/${notification.data?.coupon?.id}`;
      default:
        return "#";
    }
  };

  const handleClick = () => {
    onNotificationClick(notification.id);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRemoveNotification(notification.id);
  };

  return (
    <li className="relative">
      <Link
        className={`flex items-start gap-3 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4 transition-colors ${
          !notification.isRead ? "bg-blue-50 dark:bg-blue-900/20" : ""
        }`}
        to={getNotificationLink()}
        onClick={handleClick}
      >
        {/* Icono de la notificación */}
        {getNotificationIcon(notification.type)}

        {/* Contenido de la notificación */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-medium text-black dark:text-white">
                  {notification.title}
                </p>
                {getPriorityBadge(notification.priority)}
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                {notification.message}
              </p>

              {/* Información adicional para cupones vencidos */}
              {notification.type === "expired_coupon" && notification.data && (
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 space-y-1">
                  <div className="flex items-center gap-4">
                    <span>
                      <span className="font-medium">Sucursal:</span>{" "}
                      {notification.data.branch.descripcion}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span>
                      <span className="font-medium">Producto:</span>{" "}
                      {notification.data.product.titulo}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span>
                      <span className="font-medium">Vencido:</span>{" "}
                      {notification.data.coupon.dias_vencido} día(s)
                    </span>
                    <span>
                      <span className="font-medium">Puntos:</span>{" "}
                      {notification.data.coupon.puntos}
                    </span>
                  </div>
                </div>
              )}

              {/* Acciones personalizadas si existen */}
              {notification.actions && notification.actions.length > 0 && (
                <div className="mt-2 flex gap-2">
                  {notification.actions.map((action) => (
                    <button
                      key={action.id}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        action.action();
                      }}
                      className={`px-2 py-1 text-xs rounded transition-colors ${
                        action.style === "primary"
                          ? "bg-primary text-white hover:bg-primary/90"
                          : action.style === "danger"
                          ? "bg-red-500 text-white hover:bg-red-600"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                      }`}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Botón eliminar */}
            <button
              onClick={handleRemove}
              className="flex-shrink-0 ml-2 text-gray-400 hover:text-red-500 transition-colors"
              title="Eliminar notificación"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Tiempo transcurrido */}
          <p className="text-xs text-gray-400 mt-2">
            {formatTimeAgo(notification.timestamp)}
          </p>
        </div>

        {/* Indicador de no leído */}
        {!notification.isRead && (
          <div className="absolute right-2 top-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          </div>
        )}
      </Link>
    </li>
  );
};

export default NotificationItem;
