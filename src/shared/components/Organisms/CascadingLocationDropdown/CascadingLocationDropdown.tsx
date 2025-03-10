import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';

// Interfaces para los datos geográficos
interface Departamento {
  idDepa: number;
  departamento: string;
}

interface Provincia {
  idProv: number;
  provincia: string;
  idDepa: number;
}

interface Distrito {
  idDist: number;
  distrito: string;
  idProv: number;
}

// Props para el dropdown simple
interface SimpleDropdownProps {
  options: { id: number; text: string }[];
  value: number | null;
  onChange: (value: number) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

// Props para el dropdown múltiple
interface MultiDropdownProps {
  options: { id: number; text: string }[];
  values: number[];
  onChange: (values: number[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  maxSelections?: number;
}

// Props para el componente principal
interface CascadingLocationDropdownProps {
  departamentos: Departamento[];
  provincias: Provincia[];
  distritos: Distrito[];
  selectedDepartamento: number | null;
  selectedProvincia: number | null;
  selectedDistritos: number[];
  onDepartamentoChange: (id: number) => void;
  onProvinciaChange: (id: number) => void;
  onDistritosChange: (ids: number[]) => void;
  maxDistritos?: number;
}

// Componente de dropdown simple (para departamento y provincia)
const SimpleDropdown: React.FC<SimpleDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Seleccione una opción",
  className = "",
  disabled = false,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find(opt => opt.id === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
        <span className={`block truncate ${!selectedOption && 'text-gray-500 dark:text-gray-400'}`}>
          {selectedOption ? selectedOption.text : placeholder}
        </span>
        <Icon 
          icon="mdi-light:chevron-down"
          width="24" 
          height="24"
          className={`transition-transform duration-200 ${dropdownOpen ? 'transform rotate-180' : ''}`}
        />
      </button>

      {dropdownOpen && !disabled && (
        <ul className="absolute z-50 w-full mt-1 py-1 bg-white dark:bg-boxdark border border-stroke dark:border-strokedark rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <li
              key={option.id}
              className={`px-4 py-2 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/30 dark:text-white
                ${value === option.id ? 'bg-blue-100 dark:bg-blue-800/30' : ''}
                transition-colors duration-300
              `}
              onClick={() => {
                onChange(option.id);
                setDropdownOpen(false);
              }}
            >
              {option.text}
            </li>
          ))}
          {options.length === 0 && (
            <li className="px-4 py-2 text-gray-500 dark:text-gray-400">No hay opciones disponibles</li>
          )}
        </ul>
      )}
    </div>
  );
};

// Componente de dropdown múltiple (para distritos)
const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options,
  values,
  onChange,
  placeholder = "Seleccione opciones",
  className = "",
  disabled = false,
  maxSelections = 5,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedTexts = options
    .filter(opt => values.includes(opt.id))
    .map(opt => opt.text);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (id: number) => {
    if (values.includes(id)) {
      // Si ya está seleccionado, lo quitamos
      onChange(values.filter(v => v !== id));
    } else if (values.length < maxSelections) {
      // Si no está seleccionado y no hemos llegado al máximo, lo añadimos
      onChange([...values, id]);
    }
  };

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
            {options.map((option) => (
              <li
                key={option.id}
                className={`px-4 py-2 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/30 list-none dark:text-white
                  ${values.includes(option.id) ? 'bg-blue-100 dark:bg-blue-800/30' : ''}
                  ${values.length >= maxSelections && !values.includes(option.id) ? 'opacity-50' : ''}
                  transition-colors duration-300
                `}
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
          </div>
          {options.length === 0 && (
            <div className="px-4 py-2 text-gray-500 dark:text-gray-400">No hay opciones disponibles</div>
          )}
        </div>
      )}
    </div>
  );
};

// Componente principal
const CascadingLocationDropdown: React.FC<CascadingLocationDropdownProps> = ({
  departamentos,
  provincias,
  distritos,
  selectedDepartamento,
  selectedProvincia,
  selectedDistritos,
  onDepartamentoChange,
  onProvinciaChange,
  onDistritosChange,
  maxDistritos = 5
}) => {
  // Formatear las opciones para los dropdowns
  const departamentoOptions = departamentos.map(d => ({
    id: d.idDepa,
    text: d.departamento
  }));

  // Filtrar provincias por departamento seleccionado
  const provinciasFiltradas = selectedDepartamento 
    ? provincias.filter(p => p.idDepa === selectedDepartamento)
    : [];
  
  const provinciaOptions = provinciasFiltradas.map(p => ({
    id: p.idProv,
    text: p.provincia
  }));

  // Filtrar distritos por provincia seleccionada
  const distritosFiltrados = selectedProvincia 
    ? distritos.filter(d => d.idProv === selectedProvincia)
    : [];
  
  const distritoOptions = distritosFiltrados.map(d => ({
    id: d.idDist,
    text: d.distrito
  }));

  // Manejador de cambio de departamento
  const handleDepartamentoChange = (id: number) => {
    onDepartamentoChange(id);
    // Resetear provincia y distritos
    onProvinciaChange(0);
    onDistritosChange([]);
  };

  // Manejador de cambio de provincia
  const handleProvinciaChange = (id: number) => {
    onProvinciaChange(id);
    // Resetear distritos
    onDistritosChange([]);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-end md:space-x-4 space-y-4 md:space-y-0">
    <div className="md:w-1/3">
      <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
        Departamento
      </label>
      <SimpleDropdown
        options={departamentoOptions}
        value={selectedDepartamento}
        onChange={handleDepartamentoChange}
        placeholder="Seleccione un departamento"
      />
    </div>

    <div className="md:w-1/3">
      <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
        Provincia
      </label>
      <SimpleDropdown
        options={provinciaOptions}
        value={selectedProvincia}
        onChange={handleProvinciaChange}
        placeholder="Seleccione una provincia"
        disabled={!selectedDepartamento}
      />
    </div>

    <div className="md:w-1/3">
      <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
        Distritos (máx. {maxDistritos})
      </label>
      <MultiDropdown
        options={distritoOptions}
        values={selectedDistritos}
        onChange={onDistritosChange}
        placeholder="Seleccione distritos"
        disabled={!selectedProvincia}
        maxSelections={maxDistritos}
      />
    </div>
  </div>
  );
};

export default CascadingLocationDropdown;