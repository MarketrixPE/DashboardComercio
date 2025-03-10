import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Icon } from "@iconify/react";
import { LoadingDots } from "../../../../../shared/components/Atoms/LoadingDots/LoadingDots";
import Uploader from "../../../../../shared/components/Atoms/Uploader";
import TablaItem, {
  RowData,
  Column,
} from "../../../../../shared/components/Molecules/TablaItem/TablaItem";
import {
  getWorkersByBranch,
  updateWorker,
  createWorker,
  deleteWorker,
  getWorkerById,
  WorkerPayload,
} from "../../../../../core/services/Operador/Workers/WorkersService";

interface BranchWorkersProps {
  branchId: number | null;
  branchName: string;
  onBackClick: () => void;
}

function BranchWorkers({
  branchId,
  branchName,
  onBackClick,
}: BranchWorkersProps) {
  const [data, setData] = useState<RowData[]>([]);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const initialWorkerData = {
    name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "+51",
    alias: "",
    genero: "" as "M" | "F" | "",
    avatar: null as File | null,
    sucursal: branchId as number | null,
    fecha_nacimiento: "",
    role: 4,
    workerId: null as number | null,
    passwordChanged: false,
  };

  const [workerData, setWorkerData] = useState(initialWorkerData);

  const resetForm = () => {
    setWorkerData(initialWorkerData);
    setAvatarUrl(null);
    setIsEditing(false);
  };

  // Modificar la función que muestra el formulario para nuevo trabajador
  const handleShowAddForm = () => {
    resetForm();
    setShowForm(true);
  };

  const fetchWorkers = async () => {
    if (!branchId) return;
    setIsLoading(true);
    try {
      const workers = await getWorkersByBranch(branchId);
      setData(
        workers.map((worker: any) => ({
          id: worker.worker_id,
          nombre: worker.name,
          email: worker.email,
          telefono: worker.phone,
          estado: worker.status,
        }))
      );
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error al cargar trabajadores",
        text: error.message || "Hubo un problema al obtener los trabajadores.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, [branchId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "password" || name === "password_confirmation") {
      setWorkerData((prev) => ({
        ...prev,
        [name]: value,
        passwordChanged: true,
      }));
    } else if (name === "phone") {
      // Manejo especial para el teléfono
      if (!value.startsWith("+51")) {
        // Si se borró el +51, lo mantenemos
        setWorkerData((prev) => ({
          ...prev,
          phone: "+51",
        }));
      } else {
        // Si mantiene el +51, actualizamos normalmente
        setWorkerData((prev) => ({
          ...prev,
          phone: value,
        }));
      }
    } else {
      setWorkerData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (file: File | null) => {
    setWorkerData((prev) => ({
      ...prev,
      avatar: file,
    }));
    setAvatarUrl(file ? URL.createObjectURL(file) : null); // Generar vista previa
  };

  const validateForm = () => {
    const requiredFields = [
      "name",
      "last_name",
      "email",
      "phone",
      "alias",
      "genero",
      "sucursal",
    ];

    for (const field of requiredFields) {
      if (!workerData[field as keyof typeof workerData]) {
        Swal.fire("Error", `El campo ${field} es obligatorio.`, "error");
        return false;
      }
    }

    if (workerData.genero !== "M" && workerData.genero !== "F") {
      Swal.fire("Error", "Debe seleccionar un género válido.", "error");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    // 1. Validación inicial del formulario
    if (!validateForm()) return;

    // 2. Validaciones específicas
    const validations = [
      { condition: !branchId, message: "La sucursal no está definida." },
      {
        condition: !workerData.sucursal,
        message: "Debe seleccionar una sucursal válida.",
      },
      {
        condition: workerData.genero !== "M" && workerData.genero !== "F",
        message: "Debe seleccionar un género válido.",
      },
    ];

    for (const validation of validations) {
      if (validation.condition) {
        Swal.fire("Error", validation.message, "error");
        return;
      }
    }

    // 3. Si se está editando, validar contraseñas
    if (isEditing && workerData.passwordChanged) {
      if (workerData.password !== workerData.password_confirmation) {
        Swal.fire("Error", "Las contraseñas no coinciden.", "error");
        return;
      }
      if (workerData.password.length < 6) {
        Swal.fire(
          "Error",
          "La contraseña debe tener al menos 6 caracteres.",
          "error"
        );
        return;
      }
    }

    setIsLoading(true);

    try {
      // 4. Preparar el payload base
      const basePayload: WorkerPayload = {
        ...workerData,
        avatar: workerData.avatar || undefined,
        role: workerData.role,
        sucursal: workerData.sucursal!,
        genero: workerData.genero,
      };

      // 5. Manejar campos de contraseña y realizar operación
      if (isEditing) {
        if (!workerData.passwordChanged) {
          // Si no se cambió la contraseña, omitir campos de contraseña
          const { password, password_confirmation, ...payloadWithoutPassword } =
            basePayload;
          await updateWorker(workerData.workerId!, payloadWithoutPassword);
        } else {
          // Si se cambió la contraseña, enviar payload completo
          await updateWorker(workerData.workerId!, basePayload);
        }
      } else {
        await createWorker(basePayload);
      }

      console.log("Payload enviado al backend:", basePayload);

      // 6. Mostrar mensaje de éxito
      Swal.fire({
        icon: "success",
        title: isEditing ? "Actualización exitosa" : "Creación exitosa",
        text: `El trabajador fue ${
          isEditing ? "actualizado" : "creado"
        } correctamente.`,
        showConfirmButton: false,
        timer: 1500,
      });

      // 7. Limpiar y actualizar
      resetForm();
      setShowForm(false);
      await fetchWorkers();
    } catch (error: any) {
      console.error("Error en operación:", error);

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Hubo un problema al guardar el trabajador.";

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (worker: RowData) => {
    try {
      setIsLoading(true);
      const workerDetails = await getWorkerById(worker.id);
      setWorkerData({
        name: workerDetails.name || "",
        last_name: workerDetails.last_name || "",
        email: workerDetails.email || "",
        password: "••••••••",
        password_confirmation: "••••••••",
        passwordChanged: false,
        phone: workerDetails.phone
          ? workerDetails.phone.startsWith("+51")
            ? workerDetails.phone
            : `+51${workerDetails.phone}`
          : "+51",
        alias: workerDetails.alias || "",
        genero:
          workerDetails.genero === "M" || workerDetails.genero === "F"
            ? workerDetails.genero
            : "",
        avatar: null,
        sucursal: workerDetails.branch?.branch_id || null,
        fecha_nacimiento: workerDetails.fecha_nacimiento || "",
        role: workerDetails.role || 4,
        workerId: workerDetails.id,
      });
      setAvatarUrl(workerDetails.avatar || null);
      setShowForm(true);
      setIsEditing(true);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al cargar trabajador",
        text: "No se pudieron cargar los datos del trabajador.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (workerId: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteWorker(workerId);
          Swal.fire(
            "¡Eliminado!",
            "El trabajador ha sido eliminado.",
            "success"
          );
          fetchWorkers();
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo eliminar el trabajador.",
          });
        }
      }
    });
  };

  const columns: Column[] = [
    { Header: "Nombre", accessor: "nombre" as keyof RowData },
    { Header: "Correo", accessor: "email" as keyof RowData },
    { Header: "Teléfono", accessor: "telefono" as keyof RowData },
    {
      Header: "Acciones",
      Cell: (row: RowData) => (
        <div className="flex space-x-2">
          <button className="text-blue-500" onClick={() => handleEdit(row)}>
            <Icon icon="mdi:pencil" width="20" />
          </button>
          <button className="text-red-500" onClick={() => handleDelete(row.id)}>
            <Icon icon="mdi:delete" width="20" />
          </button>
        </div>
      ),
    },
  ];
  const handleCancel = () => {
    resetForm();
    setShowForm(false);
  };

  return (
    <>
      {showForm ? (
        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className=" flex gap-4">
            <i
              className="items-start mb-2 fas fa-chevron-left text-white bg-[#1c2434] p-2 rounded-full flex justify-center w-8 h-8 cursor-pointer"
              onClick={handleCancel}
            ></i>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              {isEditing ? "Editar Trabajador" : "Crear Trabajador"}
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {/* Nombre */}
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Nombre
              </label>
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                value={workerData.name}
                onChange={handleInputChange}
                required
                className="w-full rounded border border-stroke py-3 pl-3.5 pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white"
              />
            </div>

            {/* Apellido */}
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Apellido
              </label>
              <input
                type="text"
                name="last_name"
                placeholder="Apellido"
                value={workerData.last_name}
                onChange={handleInputChange}
                required
                className="w-full rounded border border-stroke py-3 pl-3.5 pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white"
              />
            </div>

            {/* Correo */}
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Correo
              </label>
              <input
                type="email"
                name="email"
                placeholder="Correo"
                value={workerData.email}
                onChange={handleInputChange}
                required
                className="w-full rounded border border-stroke py-3 pl-3.5 pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white"
              />
            </div>

            {/* Teléfono */}
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Teléfono
              </label>
              <input
                type="text"
                name="phone"
                placeholder="Teléfono"
                value={workerData.phone}
                onChange={handleInputChange}
                required
                className="w-full rounded border border-stroke py-3 pl-3.5 pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white"
              />
            </div>

            {/* Alias */}
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Alias
              </label>
              <input
                type="text"
                name="alias"
                placeholder="Alias"
                value={workerData.alias}
                onChange={handleInputChange}
                className="w-full rounded border border-stroke py-3 pl-3.5 pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white"
              />
            </div>

            {/* Género */}
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Género
              </label>
              <select
                name="genero" // Cambia "genero" por "genero" para que coincida con el estado
                value={workerData.genero} // Vincula correctamente con el estado "genero"
                onChange={handleInputChange}
                required
                className="w-full rounded border border-stroke py-3 pl-3.5 pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white"
              >
                <option value="" disabled>
                  Seleccionar Género
                </option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            </div>

            {/* Contraseña */}
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                placeholder={isEditing ? "••••••••" : "Contraseña"}
                value={workerData.password}
                onChange={handleInputChange}
                onClick={
                  isEditing
                    ? (_e) => {
                        // Limpiar el campo al hacer click si está en modo edición
                        if (!workerData.passwordChanged) {
                          setWorkerData((prev) => ({
                            ...prev,
                            password: "",
                            password_confirmation: "",
                            passwordChanged: true,
                          }));
                        }
                      }
                    : undefined
                }
                required={!isEditing || workerData.passwordChanged}
                className="w-full rounded border border-stroke py-3 pl-3.5 pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white"
              />
              {isEditing && !workerData.passwordChanged && (
                <small className="text-gray-500">
                  Click para cambiar la contraseña
                </small>
              )}
            </div>

            {/* Confirmar Contraseña */}
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                name="password_confirmation"
                placeholder={isEditing ? "••••••••" : "Confirmar Contraseña"}
                value={workerData.password_confirmation}
                onChange={handleInputChange}
                onClick={
                  isEditing
                    ? (_e) => {
                        // Limpiar el campo al hacer click si está en modo edición
                        if (!workerData.passwordChanged) {
                          setWorkerData((prev) => ({
                            ...prev,
                            password: "",
                            password_confirmation: "",
                            passwordChanged: true,
                          }));
                        }
                      }
                    : undefined
                }
                required={!isEditing || workerData.passwordChanged}
                className="w-full rounded border border-stroke py-3 pl-3.5 pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white"
              />
            </div>

            {/* Fecha de nacimiento */}
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                name="fecha_nacimiento"
                value={workerData.fecha_nacimiento}
                onChange={handleInputChange}
                className="w-full rounded border border-stroke py-3 pl-3.5 pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white"
              />
            </div>

            {/* Uploader */}
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Subir Foto
              </label>
              <Uploader
                onFileSelect={(file) => {
                  handleFileChange(file);
                }}
                initialPreview={avatarUrl ?? undefined}
                accept="image/jpeg, image/jpg, image/png"
                maxSize={10 * 1024 * 1024}
                label="Sube tu foto o arrastra aquí"
              />
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-300"
              onClick={() => handleCancel()}
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                isLoading
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
              }`}
              disabled={isLoading}
            >
              {isLoading ? <LoadingDots /> : "Guardar"}
            </button>
          </div>
        </div>
      ) : (
        <div className="container mx-auto">
          <TablaItem
            data={data}
            columns={columns}
            showBackButton={true}
            onBackClick={onBackClick}
            title={`Trabajadores - ${branchName}`}
            buttonLabel="Agregar Trabajador"
            onButtonClick={handleShowAddForm}
          />
        </div>
      )}
    </>
  );
}

export default BranchWorkers;
