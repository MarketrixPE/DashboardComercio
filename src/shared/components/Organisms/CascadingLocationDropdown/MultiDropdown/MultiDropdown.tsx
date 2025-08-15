import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
interface MultiDropdownProps {
  options: { id: number; text: string }[];
  values: number[];
  onChange: (values: number[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  maxSelections?: number;
}


export const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options,
  values,
  onChange,
  placeholder = "Seleccione opciones",
  className = "",
  disabled = false,
  maxSelections = 5,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedTexts = options
    .filter(opt => values.includes(opt.id))
    .map(opt => opt.text);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
        setSearchTerm(''); // Limpiar búsqueda al cerrar
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (id: number) => {
    if (values.includes(id)) {
      onChange(values.filter(v => v !== id));
    } else if (values.length < maxSelections) {
      onChange([...values, id]);
    }
  };

  // Filtrar opciones según el término de búsqueda
  const filteredOptions = options.filter(option =>
    option.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setDropdownOpen(!dropdownOpen)}
        disabled={disabled}
        className={`w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-boxdark border border-stroke dark:border-strokedark rounded
          ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
          dark:text-white transition-colors duration-300
          ${className}`}
      >
        <span className={`block truncate ${selectedTexts.length === 0 && 'text-gray-500 dark:text-gray-400'}`}>
          {selectedTexts.length > 0 
            ? `${selectedTexts.join(", ")} (${selectedTexts.length}/${maxSelections})` 
            : placeholder}
        </span>
        <Icon 
          icon="mdi-light:chevron-down"
          width="24" 
          height="24"
          className={`transition-transform duration-200 ${dropdownOpen ? 'transform rotate-180' : ''}`}
        />
      </button>

      {dropdownOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 py-1 bg-white dark:bg-boxdark border border-stroke dark:border-strokedark rounded-lg shadow-lg transition-colors duration-300">
          <div className="px-3 py-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar..."
              className="w-full px-3 py-2 border border-stroke dark:border-strokedark rounded bg-white dark:bg-boxdark dark:text-white focus:outline-none"
            />
          </div>
          {values.length > 0 && (
            <div className="px-3 py-2 border-b border-stroke dark:border-strokedark">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Seleccionados ({values.length}/{maxSelections}):</p>
              <div className="flex flex-wrap gap-1">
                {values.map(id => {
                  const option = options.find(opt => opt.id === id);
                  return option ? (
                    <span 
                      key={option.id} 
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 dark:bg-blue-800/50 text-blue-800 dark:text-blue-200"
                    >
                      {option.text}
                      <button
                        type="button"
                        className="ml-1 text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          onChange(values.filter(v => v !== id));
                        }}
                      >
                        <Icon icon="mdi-light:close" width="14" height="14" />
                      </button>
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          )}
          <div className="max-h-60 overflow-auto">
            {filteredOptions.map((option) => (
              <li
                key={option.id}
                className={`px-4 py-2 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/30 list-none dark:text-white
                  ${values.includes(option.id) ? 'bg-blue-100 dark:bg-blue-800/30' : ''}
                  ${values.length >= maxSelections && !values.includes(option.id) ? 'opacity-50' : ''}
                  transition-colors duration-300`}
                onClick={() => handleOptionClick(option.id)}
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={values.includes(option.id)}
                    readOnly
                    className="mr-2"
                  />
                  {option.text}
                </div>
              </li>
            ))}
            {filteredOptions.length === 0 && (
              <div className="px-4 py-2 text-gray-500 dark:text-gray-400">No se encontraron resultados</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};