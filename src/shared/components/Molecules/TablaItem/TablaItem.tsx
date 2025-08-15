import React, { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

export interface RowData {
  [key: string]: any;
}

export interface Column {
  Header: string;
  accessor?: keyof RowData;
  Cell?: (row: RowData) => JSX.Element;
}

interface TableProps {
  data: RowData[];
  columns: Column[];
  onEdit?: (row: RowData) => void;
  onDelete?: (row: RowData) => void;
  title: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  newButtonLabel?: string;
  onNewButtonClick?: () => void;
  showButton?: boolean;
  showNewButton?: boolean;
  showBackButton?: boolean;
  branchAddress?: string;
  onBackClick?: () => void;
  extraControls?: React.ReactNode;
}

const TablaItem: React.FC<TableProps> = ({
  data,
  columns,
  title,
  buttonLabel,
  onButtonClick,
  newButtonLabel,
  onNewButtonClick,
  showButton = true,
  showNewButton = true,
  showBackButton = false,
  onBackClick,
  branchAddress,
  extraControls,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile view on mount and window resize
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is typical md breakpoint
    };

    checkIsMobile(); // Check on mount
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const filteredData = data.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="p-4 md:p-6 rounded-xl bg-whiteTrans border border-[#d6d6d6] dark:bg-boxdark dark:border-[#111827] shadow-sm">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center gap-3">
          {showBackButton && (
            <button
              onClick={onBackClick}
              className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-primary" />
            </button>
          )}
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              {title}
            </h1>
            {branchAddress && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {branchAddress}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-1/2 justify-end">
          <div className="w-[25%]">{extraControls}</div>
          {showNewButton && newButtonLabel && (
            <button
              onClick={onNewButtonClick}
              className="px-4 py-2 text-primary border-2 border-primary rounded-lg hover:bg-primary/10 transition-colors font-medium whitespace-nowrap"
            >
              {newButtonLabel}
            </button>
          )}
          {showButton && buttonLabel && (
            <button
              onClick={onButtonClick}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium whitespace-nowrap"
            >
              {buttonLabel}
            </button>
          )}
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-boxdark focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          />
        </div>
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
        >
          <option value="10">10 por página</option>
          <option value="20">20 por página</option>
          <option value="50">50 por página</option>
        </select>
      </div>

      {/* Mobile Cards View */}
      {isMobile && (
        <div className="space-y-4">
          {paginatedData.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm"
            >
              {columns.map((column, colIndex) => (
                <div key={`${rowIndex}-${colIndex}`}>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {column.Header}:
                  </span>
                  <div className="mt-1 text-gray-900 dark:text-gray-100">
                    {column.Cell
                      ? column.Cell(row)
                      : row[column.accessor as keyof RowData]}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Desktop Table View */}
      {!isMobile && (
        <div className="overflow-x-hidden rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="w-full table-auto divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    scope="col"
                    className={`px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider`}
                  >
                    {column.Header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors h-14"
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={`${rowIndex}-${colIndex}`}
                      className={`px-6 py-4 text-sm text-gray-900 dark:text-gray-100 ${
                        column.Header !== "Acciones"
                          ? "truncate max-w-[200px]"
                          : ""
                      }`}
                      title={
                        column.Header !== "Acciones" && !column.Cell
                          ? (row[column.accessor as keyof RowData] as string)
                          : undefined
                      }
                    >
                      {column.Cell
                        ? column.Cell(row)
                        : row[column.accessor as keyof RowData]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Section */}
      <div className="flex items-center justify-between mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Anterior</span>
        </button>
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {currentPage} / {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <span className="hidden sm:inline">Siguiente</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TablaItem;
