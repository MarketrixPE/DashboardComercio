import { useState } from "react";

interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  id: string; // Agregar 'id' aquí
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange, disabled = false, id }) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked || false);

  const handleChange = () => {
    if (!disabled) {
      setIsChecked(!isChecked);
      if (onChange) {
        onChange(!isChecked); // Notificar al componente padre el cambio de estado
      }
    }
  };

  return (
    <div>
      <label
        htmlFor={id} // Vincula el 'label' con el 'input' mediante 'id'
        className={`flex cursor-pointer select-none items-center ${disabled && 'opacity-50'}`}
      >
        <div className="relative">
          <input
            type="checkbox"
            id={id} // Asignar el 'id' único aquí
            className="sr-only"
            checked={isChecked}
            onChange={handleChange}
            disabled={disabled}
          />
          <div
            className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
              isChecked ? 'border-primary bg-gray dark:bg-transparent' : 'border-gray-300'
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-sm ${isChecked ? 'bg-primary' : ''}`}
            ></span>
          </div>
        </div>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
