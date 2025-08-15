import { FC } from "react";

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  className?: string;
  autocomplete?: string;
}

export const InputField: FC<InputFieldProps> = ({
  label,
  type,
  value,
  onChange,
  error,
  placeholder,
  required,
  maxLength,
  className = "", // Valor por defecto para evitar errores si no se pasa className
  autocomplete,
}) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-600">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        autoComplete={autocomplete}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
          error
            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        } ${className}`}
      />
      {error && (
        <span className="text-red-600 text-xs mt-1 block">{error}</span>
      )}
    </div>
  );
};