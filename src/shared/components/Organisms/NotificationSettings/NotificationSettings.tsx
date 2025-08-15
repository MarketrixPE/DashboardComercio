import React, { useState } from 'react';
import { useNotificationContext } from '../../../context/NotificationContext';

interface NotificationSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({ isOpen, onClose }) => {
  const { settings, updateSettings, getStats } = useNotificationContext();
  const [localSettings, setLocalSettings] = useState(settings);
  const stats = getStats();

  const handleSave = () => {
    updateSettings(localSettings);
    onClose();
  };

  const handleReset = () => {
    setLocalSettings(settings);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-boxdark rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stroke dark:border-strokedark">
          <h3 className="text-lg font-semibold text-black dark:text-white">
            Configuración de Notificaciones
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Estadísticas */}
          <div className="bg-gray-50 dark:bg-meta-4 rounded-lg p-4">
            <h4 className="text-sm font-medium text-black dark:text-white mb-3">
              Estadísticas
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-300">Total:</span>
                <span className="ml-2 font-semibold text-black dark:text-white">
                  {stats.total}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-300">No leídas:</span>
                <span className="ml-2 font-semibold text-red-600">
                  {stats.unread}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-300">Cupones vencidos:</span>
                <span className="ml-2 font-semibold text-black dark:text-white">
                  {stats.byType.expired_coupon || 0}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-300">Otras:</span>
                <span className="ml-2 font-semibold text-black dark:text-white">
                  {stats.total - (stats.byType.expired_coupon || 0)}
                </span>
              </div>
            </div>
          </div>

          {/* Configuraciones */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-black dark:text-white">
              Configuraciones
            </h4>

            {/* Cupones vencidos */}
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm text-black dark:text-white">
                  Notificar cupones vencidos
                </label>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Recibir alertas cuando los cupones expiren
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={localSettings.enableExpiredCoupons}
                  onChange={(e) => setLocalSettings({
                    ...localSettings,
                    enableExpiredCoupons: e.target.checked
                  })}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Alertas de productos */}
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm text-black dark:text-white">
                  Alertas de productos
                </label>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Notificaciones sobre productos y stock
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={localSettings.enableProductAlerts}
                  onChange={(e) => setLocalSettings({
                    ...localSettings,
                    enableProductAlerts: e.target.checked
                  })}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Notificaciones del sistema */}
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm text-black dark:text-white">
                  Notificaciones del sistema
                </label>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Actualizaciones y mensajes del sistema
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={localSettings.enableSystemNotifications}
                  onChange={(e) => setLocalSettings({
                    ...localSettings,
                    enableSystemNotifications: e.target.checked
                  })}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Intervalo de verificación */}
            <div>
              <label className="block text-sm text-black dark:text-white mb-2">
                Intervalo de verificación (minutos)
              </label>
              <select
                value={localSettings.checkInterval}
                onChange={(e) => setLocalSettings({
                  ...localSettings,
                  checkInterval: parseInt(e.target.value)
                })}
                className="w-full px-3 py-2 border border-stroke rounded-md bg-white dark:bg-form-input dark:border-form-strokedark text-black dark:text-white"
              >
                <option value={1}>1 minuto</option>
                <option value={5}>5 minutos</option>
                <option value={10}>10 minutos</option>
                <option value={15}>15 minutos</option>
                <option value={30}>30 minutos</option>
                <option value={60}>1 hora</option>
              </select>
            </div>

            {/* Máximo número de notificaciones */}
            <div>
              <label className="block text-sm text-black dark:text-white mb-2">
                Máximo número de notificaciones
              </label>
              <select
                value={localSettings.maxNotifications}
                onChange={(e) => setLocalSettings({
                  ...localSettings,
                  maxNotifications: parseInt(e.target.value)
                })}
                className="w-full px-3 py-2 border border-stroke rounded-md bg-white dark:bg-form-input dark:border-form-strokedark text-black dark:text-white"
              >
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={200}>200</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-stroke dark:border-strokedark">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            Restablecer
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border border-stroke dark:border-strokedark rounded-md text-black dark:text-white hover:bg-gray-50 dark:hover:bg-meta-4"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;