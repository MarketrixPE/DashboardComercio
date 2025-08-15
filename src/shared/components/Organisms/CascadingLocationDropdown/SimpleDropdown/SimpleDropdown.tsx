import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";

interface SimpleDropdownProps {
  options: { id: number; text: string }[];
  value: number | null;
  onChange: (value: number) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const SimpleDropdown: React.FC<SimpleDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Seleccione una opción",
  className = "",
  disabled = false,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((opt) => opt.id === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
        setSearchTerm(""); // Limpiar búsqueda al cerrar
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filtrar opciones según el término de búsqueda
  const filteredOptions = options.filter((option) =>
    option.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setDropdownOpen(!dropdownOpen)}
        disabled={disabled}
        className={`w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-boxdark border border-stroke dark:border-strokedark rounded
          ${disabled ? "opacity-60 cursor-not-allowed" : ""}
          dark:text-white transition-colors duration-300
          ${className}`}
      >
        <span
          className={`block truncate ${
            !selectedOption && "text-gray-500 dark:text-gray-400"
          }`}
        >
          {selectedOption ? selectedOption.text : placeholder}
        </span>
        <Icon
          icon="mdi-light:chevron-down"
          width="24"
          height="24"
          className={`transition-transform duration-200 ${
            dropdownOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      {dropdownOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 py-1 bg-white dark:bg-boxdark border border-stroke dark:border-strokedark rounded-lg shadow-lg">
          <div className="px-3 py-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar..."
              className="w-full px-3 py-2 border border-stroke dark:border-strokedark rounded bg-white dark:bg-boxdark dark:text-white focus:outline-none"
            />
          </div>
          <ul className="max-h-60 overflow-auto">
            {filteredOptions.map((option) => (
              <li
                key={option.id}
                className={`px-4 py-2 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/30 dark:text-white
                  ${
                    value === option.id ? "bg-blue-100 dark:bg-blue-800/30" : ""
                  }
                  transition-colors duration-300`}
                onClick={() => {
                  onChange(option.id);
                  setDropdownOpen(false);
                  setSearchTerm(""); // Limpiar búsqueda al seleccionar
                }}
              >
                {option.text}
              </li>
            ))}
            {filteredOptions.length === 0 && (
              <li className="px-4 py-2 text-gray-500 dark:text-gray-400">
                No se encontraron resultados
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
