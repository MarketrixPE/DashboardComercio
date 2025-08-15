import { SimpleDropdown } from './SimpleDropdown/SimpleDropdown';
import { MultiDropdown } from './MultiDropdown/MultiDropdown';

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