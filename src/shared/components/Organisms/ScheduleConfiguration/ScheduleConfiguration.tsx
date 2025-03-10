import React, { useState, useEffect } from 'react';

// Definir un tipo para los días de la semana
type DayOfWeek =
  | 'Lunes'
  | 'Martes'
  | 'Miércoles'
  | 'Jueves'
  | 'Viernes'
  | 'Sábado'
  | 'Domingo';

// Definir el tipo de cada periodo de tiempo
interface TimePeriod {
  start: string;
  end: string;
}

// Definir el tipo del estado `schedule`
export type ScheduleState = {
  [key in DayOfWeek]: TimePeriod[];
};

// Agregar `onScheduleChange` como prop
interface ScheduleConfigurationProps {
  onScheduleChange: (schedule: ScheduleState) => void;
}

const ScheduleConfiguration: React.FC<ScheduleConfigurationProps> = ({
  onScheduleChange,
}) => {
  const [schedule, setSchedule] = useState<ScheduleState>({
    Lunes: [],
    Martes: [],
    Miércoles: [],
    Jueves: [],
    Viernes: [],
    Sábado: [],
    Domingo: [],
  });

  // Llamamos a `onScheduleChange` cada vez que el estado de `schedule` cambie
  useEffect(() => {
    onScheduleChange(schedule);
  }, [schedule, onScheduleChange]);

  const handleRemovePeriod = (day: DayOfWeek, index: number) => {
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [day]: prevSchedule[day].filter((_, i) => i !== index),
    }));
  };

  const handleAddPeriod = (day: DayOfWeek) => {
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [day]: [...prevSchedule[day], { start: '', end: '' }],
    }));
  };

  const handleInputChange = (
    day: DayOfWeek,
    index: number,
    field: 'start' | 'end',
    value: string,
  ) => {
    let formattedValue = value;

    // Verificar si tiene más de 2 caracteres y no tiene ':'
    if (value.length === 2 && !value.includes(':')) {
      formattedValue = `${value}:`; // Insertar ':' después de dos caracteres
    }

    // Verificar si se han introducido 4 números y agregar ':'
    if (value.length === 4 && !value.includes(':')) {
      formattedValue = `${value.slice(0, 2)}:${value.slice(2)}`;
    }

    const updatedDay = [...schedule[day]];
    updatedDay[index][field] = formattedValue;

    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [day]: updatedDay,
    }));
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Configuración de horarios
        </h3>
      </div>
      <div className="bg-white rounded-lg overflow-auto">
        <table className="m-8 divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Día
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Periodo(s)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Object.keys(schedule).map((day) => (
              <tr key={day}>
                <td className="px-4 py-2">{day}</td>
                <td className="flex flex-row items-center gap-4 px-4 py-2">
                  {schedule[day as DayOfWeek].map((period, index) => (
                    <div key={index} className="flex gap-4">
                      <input
                        type="text"
                        value={period.start}
                        className="border border-gray-300 rounded px-2 py-1 w-24"
                        placeholder="Hora inicio"
                        onChange={(e) =>
                          handleInputChange(
                            day as DayOfWeek,
                            index,
                            'start',
                            e.target.value,
                          )
                        }
                      />
                      <input
                        type="text"
                        value={period.end}
                        className="border border-gray-300 rounded px-2 py-1 w-24"
                        placeholder="Hora fin"
                        onChange={(e) =>
                          handleInputChange(
                            day as DayOfWeek,
                            index,
                            'end',
                            e.target.value,
                          )
                        }
                      />
                      <button
                        className="bg-red-500 text-white rounded px-2 py-1"
                        onClick={() =>
                          handleRemovePeriod(day as DayOfWeek, index)
                        }
                      >
                        X
                      </button>
                    </div>
                  ))}
                  <button
                    className="bg-blue-500 text-white rounded px-2 py-1"
                    onClick={() => handleAddPeriod(day as DayOfWeek)}
                  >
                    +
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleConfiguration;
