import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";

interface Option {
  id: number;
  text: string;
}

interface CustomDropdownProps {
  options: Option[];
  value: number | null;
  onChange: (value: number) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  defaultValue?: number;
  onClick?: () => void; // Nuevo prop opcional
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Seleccione una opción",
  className = "",
  disabled = false,
  defaultValue,
  onClick, // Destructuring del nuevo prop
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const effectiveValue = value ?? defaultValue;
  const selectedOption = options.find((opt) => opt.id === effectiveValue);

  // Este useEffect forzará el cierre cuando el valor cambie
  useEffect(() => {
    setDropdownOpen(false);
  }, [value]);

  useEffect(() => {
    if (defaultValue !== undefined && value === null) {
      onChange(defaultValue);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleButtonClick = () => {
    console.log("🔥 Dropdown clicked!", { disabled, onClick: !!onClick }); // Debug
    
    // Si hay un onClick personalizado, ejecutarlo SIEMPRE (incluso si disabled)
    if (onClick) {
      console.log("📞 Ejecutando onClick personalizado..."); // Debug
      onClick();
    }
    
    // Solo abrir/cerrar dropdown si no está disabled
    if (!disabled) {
      console.log("📂 Abriendo/cerrando dropdown..."); // Debug
      setDropdownOpen(!dropdownOpen);
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={handleButtonClick}
        disabled={disabled && !onClick} // Solo disabled si no hay onClick
        className={`w-full flex items-center justify-between px-4 py-3 border rounded
    bg-white dark:bg-boxdark border-stroke dark:border-strokedark text-black dark:text-white
    ${disabled && !onClick ? "opacity-60 cursor-not-allowed" : ""}
    ${onClick ? "cursor-pointer" : disabled ? "cursor-not-allowed" : ""}
    ${className}`}
      >
        <span
          className={`block truncate ${!selectedOption && "text-gray-500"}`}
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
        <ul
          className="absolute z-50 w-full mt-1 py-1 border rounded-lg shadow-lg max-h-60 overflow-auto
    bg-white dark:bg-boxdark border-stroke dark:border-strokedark"
        >
          {options.map((option) => (
            <li
              key={option.id}
              className={`px-4 py-2 cursor-pointer
    hover:bg-blue-50 dark:hover:bg-blue-900
    ${effectiveValue === option.id ? "bg-blue-100 dark:bg-blue-800" : ""}
    text-black dark:text-white`}
              onClick={() => onChange(option.id)}
            >
              {option.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;