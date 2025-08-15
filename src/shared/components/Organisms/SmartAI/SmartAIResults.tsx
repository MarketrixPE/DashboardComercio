// src/components/SmartAI/components/SmartAIResults.tsx
import React, { useState } from 'react';
import Swal from 'sweetalert2';

interface SmartAIResultsProps {
  results: any[];
  sql?: string | null;
  queryType: string;
}

const SmartAIResults: React.FC<SmartAIResultsProps> = ({ results, sql, queryType }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  if (!results || results.length === 0) {
    return null;
  }

  // Obtener columnas del primer resultado
  const columns = Object.keys(results[0]);
  
  // Paginación
  const totalPages = Math.ceil(results.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentResults = results.slice(startIndex, endIndex);

  // Formatear valor de celda
  const formatCellValue = (value: any, key: string): string => {
    if (value === null || value === undefined) {
      return '-';
    }

    // Formatear números
    if (typeof value === 'number') {
      // Si parece ser un ID, no formatear
      if (key.toLowerCase().includes('id') || key.toLowerCase().includes('uuid')) {
        return value.toString();
      }
      // Si es un número grande, usar formato con comas
      if (value >= 1000) {
        return value.toLocaleString();
      }
      return value.toString();
    }

    // Formatear fechas
    if (typeof value === 'string' && value.includes('-') && value.length >= 10) {
      try {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          });
        }
      } catch {
        // Si no es una fecha válida, devolver como string
      }
    }

    return value.toString();
  };

  // Obtener tipo de icono según el tipo de consulta
  const getQueryIcon = () => {
    const iconMap: { [key: string]: string } = {
      'analytics': 'fa-chart-bar',
      'advice': 'fa-lightbulb',
      'mixed': 'fa-chart-line',
      'general': 'fa-table'
    };
    return iconMap[queryType] || 'fa-table';
  };

  // Mostrar SQL
  const showSQL = () => {
    if (!sql) return;

    Swal.fire({
      title: 'SQL Ejecutado',
      html: `
        <div class="text-left">
          <pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto"><code>${sql}</code></pre>
          <div class="mt-3 text-xs text-gray-500">
            <i class="fas fa-info-circle mr-1"></i>
            Esta consulta se ejecutó contra tu base de datos real
          </div>
        </div>
      `,
      width: '80%',
      showConfirmButton: false,
      showCloseButton: true,
      customClass: {
        popup: 'text-left'
      }
    });
  };

  // Exportar datos (simulado)
  const exportData = () => {
    const csvContent = [
      columns.join(','),
      ...results.map(row => 
        columns.map(col => 
          typeof row[col] === 'string' && row[col].includes(',') 
            ? `"${row[col]}"` 
            : row[col]
        ).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `smart-ai-results-${Date.now()}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-3">
              <i className={`fas ${getQueryIcon()} text-green-600 dark:text-green-400`}></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Resultados de la consulta
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {results.length} registro{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''} • 
                Datos 100% reales
              </p>
            </div>
          </div>
          
          <div className="hidden items-center space-x-2">
            {sql && (
              <button
                onClick={showSQL}
                className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                title="Ver SQL ejecutado"
              >
                <i className="fas fa-code mr-1"></i>
                SQL
              </button>
            )}
            
            <button
              onClick={exportData}
              className="px-3 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
              title="Exportar a CSV"
            >
              <i className="fas fa-download mr-1"></i>
              CSV
            </button>
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  {column.replace(/_/g, ' ')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            {currentResults.map((row, index) => (
              <tr 
                key={index}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                {columns.map((column) => (
                  <td
                    key={column}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300"
                  >
                    {formatCellValue(row[column], column)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Mostrando {startIndex + 1} a {Math.min(endIndex, results.length)} de {results.length} resultados
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Página {currentPage} de {totalPages}
              </span>
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartAIResults;