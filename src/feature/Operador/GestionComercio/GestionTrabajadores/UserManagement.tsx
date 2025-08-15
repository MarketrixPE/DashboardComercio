import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import { HelperService } from "../../../../core/services/HelperService";
import {
  getUsersOfCompany,
  getUserDetails,
  updateUser,
  createUser,
  getCompanyBranches,
  getBranchWorkers,
} from "../../../../core/services/UserService/UserService";
import { LoadingDots } from "../../../../shared/components/Atoms/LoadingDots/LoadingDots";
import TablaItem, {
  RowData,
  Column,
} from "../../../../shared/components/Molecules/TablaItem/TablaItem";

function UserManagement() {
  // Estados para la tabla de usuarios
  const [data, setData] = useState<RowData[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [, setShowButton] = useState(false);

  // Estados para el formulario de usuario
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<number>(4); // Default: Operador
  const [branchId, setBranchId] = useState<string>("");
  const [status, setStatus] = useState<number>(1);

  // Control de carga inicial
  const hasFetchedUsers = useRef(false);
  const encryptedCompanyId = HelperService.getCompanyId();
  const ManagerbranchId = HelperService.getBranchId();
  const userRole = HelperService.getUserRole();

  const fetchData = async () => {
    setIsLoading(true);

    try {
      let response;

      if (userRole === 3 && ManagerbranchId) {
        response = await getBranchWorkers(ManagerbranchId);
      } else if (userRole === 2) {
        if (!encryptedCompanyId) {
          setData([]);
          setShowButton(true);
          Swal.fire({
            icon: "info",
            title: "No hay datos",
            text: "No se encontró información de la compañía.",
          });
          return;
        }
        response = await getUsersOfCompany(encryptedCompanyId);
      } else {
        throw new Error("Rol de usuario no válido o no autorizado.");
      }

      if (!response || !response.workers || response.workers.length === 0) {
        setData([]);
        setShowButton(true);
        Swal.fire({
          icon: "info",
          title: "No hay datos",
          text: "No hay usuarios disponibles para mostrar.",
        });
        return;
      }

      const formattedData = response.workers.map((worker: any) => ({
        id: worker.id,
        uuid: worker.uuid,
        name: worker.name,
        last_name: worker.last_name,
        email: worker.email,
        alias: worker.alias,
        rol_id: worker.rol_id,
        nombre_rol: worker.nombre_rol,
        branch_uuid: worker.branch_uuid || "",
        branch_name: worker.branch_name || "",
        status: worker.status === undefined ? 1 : worker.status,
      }));

      setData(formattedData);
      setShowButton(false);
    } catch (error: any) {
      console.error("Error al cargar los usuarios:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Ocurrió un error al cargar los usuarios.",
      });
      setShowButton(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Validación del formulario de usuario
  const validateUserForm = (): boolean => {
    // Validar nombre
    if (!name || name.trim().length < 2) {
      Swal.fire({
        icon: "error",
        title: "Error de validación",
        text: "El nombre debe tener al menos 2 caracteres.",
      });
      return false;
    }

    // Validar apellido
    if (!lastName || lastName.trim().length < 2) {
      Swal.fire({
        icon: "error",
        title: "Error de validación",
        text: "El apellido debe tener al menos 2 caracteres.",
      });
      return false;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Error de validación",
        text: "Debe ingresar un email válido.",
      });
      return false;
    }

    // Validar contraseña solo en modo creación
    if (!isEditing) {
      if (!password || password.length < 8) {
        Swal.fire({
          icon: "error",
          title: "Error de validación",
          text: "La contraseña debe tener al menos 8 caracteres.",
        });
        return false;
      }

      if (password !== confirmPassword) {
        Swal.fire({
          icon: "error",
          title: "Error de validación",
          text: "Las contraseñas no coinciden.",
        });
        return false;
      }
    } else if (password && password.length > 0 && password.length < 8) {
      Swal.fire({
        icon: "error",
        title: "Error de validación",
        text: "La contraseña debe tener al menos 8 caracteres.",
      });
      return false;
    } else if (password && confirmPassword && password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error de validación",
        text: "Las contraseñas no coinciden.",
      });
      return false;
    }

    // Validar sucursal para roles 3 o 4
    const branchIdToUse = userRole === 3 ? ManagerbranchId : branchId;
    if ((role === 3 || role === 4) && !branchIdToUse) {
      Swal.fire({
        icon: "error",
        title: "Error de validación",
        text: "Debe seleccionar una sucursal para este rol.",
      });
      return false;
    }

    return true;
  };

  // Estados para las sucursales disponibles
  const [branches, setBranches] = useState<Array<{ id: string; name: string }>>(
    []
  );

  const fetchBranches = async () => {
    try {
      if (userRole === 3 && ManagerbranchId) {
        // Para gerentes de sucursal, usar ManagerbranchId
        setBranches([
          {
            id: ManagerbranchId,
            name: "Sucursal Actual", // Obtener el nombre real si está disponible
          },
        ]);
        setBranchId(ManagerbranchId);
      } else if (userRole === 2 && encryptedCompanyId) {
        // Para gerentes de compañía, obtener todas las sucursales
        const branchesData = await getCompanyBranches(encryptedCompanyId);

        if (
          !branchesData ||
          !Array.isArray(branchesData) ||
          branchesData.length === 0
        ) {
          setBranches([]);
          console.warn("No se encontraron sucursales para esta compañía.");
          return;
        }

        const formattedBranches = branchesData.map((branch) => ({
          id: branch.uuid,
          name: branch.descripcion || `Sucursal ${branch.uuid.slice(0, 6)}`,
        }));

        setBranches(formattedBranches);
      } else {
        throw new Error(
          "No se encontró información de la compañía o sucursal."
        );
      }
    } catch (error) {
      console.error("Error al cargar sucursales:", error);
      setBranches([]);
    }
  };

  // Función para editar un usuario
  const onEdit = async (row: RowData) => {
    clearFormFields();
    setCurrentUserId(row.uuid);
    setShowForm(true);
    setIsEditing(true);
    setIsLoading(true);

    try {
      // Cargar sucursales disponibles
      await fetchBranches();

      // Obtener detalles del usuario
      const userDetails = await getUserDetails(row.uuid);
      if (!userDetails || !userDetails.user) {
        throw new Error("No se pudieron obtener los detalles del usuario.");
      }

      const user = userDetails.user;

      // Rellenar el formulario con los datos del usuario
      setName(user.name || "");
      setLastName(user.last_name || "");
      setEmail(user.email || "");
      setRole(userRole === 3 ? 4 : user.role || 4); // Fijar en Operador para gerentes de sucursal
      setStatus(user.status === undefined ? 1 : user.status);
      setBranchId(
        userRole === 3 ? ManagerbranchId : user.branches?.[0]?.id || ""
      );
      setPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error al cargar datos",
        text: error.message || "No se pudieron cargar los datos del usuario.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Función para crear o actualizar un usuario
  const handleSubmit = async () => {
    if (!validateUserForm()) return;
    setIsLoading(true);

    try {
      const branchIdToUse = userRole === 3 ? ManagerbranchId : branchId;
      if (isEditing && currentUserId) {
        const userData: {
          name?: string;
          last_name?: string;
          email?: string;
          role?: number;
          status?: number;
          branch_id?: string;
          company_id?: string | null;
          password?: string;
        } = {
          name,
          last_name: lastName,
          email,
          role,
          status,
          branch_id: branchIdToUse || undefined,
          company_id: encryptedCompanyId || null,
        };

        if (password) {
          userData.password = password;
        }

        await updateUser(currentUserId, userData);
        Swal.fire(
          "Actualización exitosa",
          "El usuario ha sido actualizado correctamente.",
          "success"
        );
      } else {
        if (!password) {
          Swal.fire({
            icon: "error",
            title: "Error de validación",
            text: "La contraseña es obligatoria para crear un usuario.",
          });
          setIsLoading(false);
          return;
        }

        const userData = {
          name,
          last_name: lastName,
          email,
          password,
          role,
          branch_id: branchIdToUse,
          company_id: encryptedCompanyId || "",
        };

        await createUser(userData);
        Swal.fire(
          "Registro exitoso",
          "El usuario ha sido creado correctamente.",
          "success"
        );
      }

      setShowForm(false);
      fetchData();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: isEditing ? "Error al actualizar" : "Error",
        text: error.message || "Hubo un problema en la operación.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Limpiar campos del formulario
  const clearFormFields = () => {
    setName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setRole(userRole === 3 ? 4 : 4); // Fijar en Operador para gerentes de sucursal
    setBranchId(userRole === 3 ? ManagerbranchId : "");
    setStatus(1);
  };

  // Cancelar edición/creación
  const handleCancelClick = () => {
    setShowForm(false);
    clearFormFields();
  };

  // Iniciar la carga de datos una sola vez
  useEffect(() => {
    if (!hasFetchedUsers.current) {
      hasFetchedUsers.current = true;
      fetchData();
      fetchBranches();
    }
  }, []);

  // Definición de columnas para la tabla
  const columns: Column[] = [
    {
      Header: "Acciones",
      Cell: (row: RowData) => (
        <div className="flex space-x-2">
          <button
            className="relative p-2 bg-blue-500 text-slate-50 flex items-center rounded-lg group overflow-hidden transition-all duration-500 ease-in-out w-[2rem] hover:w-[6rem]"
            onClick={() => onEdit(row)}
          >
            <i className="far fa-edit"></i>
            <span className="ml-0 opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 group-hover:ml-2 transition-all duration-500 ease-in-out delay-100">
              Editar
            </span>
          </button>
        </div>
      ),
    },
    {
      Header: "Nombre",
      accessor: "name",
      Cell: (row: RowData) => <span>{`${row.name} ${row.last_name}`}</span>,
    },
    { Header: "Email", accessor: "email" },
    {
      Header: "Rol",
      accessor: "nombre_rol",
    },
    {
      Header: "Sucursal",
      accessor: "branch_name",
      Cell: (row: RowData) => <span>{row.branch_name || "N/A"}</span>,
    },
    {
      Header: "Estado",
      accessor: "status",
      Cell: (row: RowData) => (
        <span
          className={
            row.status === 1
              ? "text-white bg-green-500 px-3 py-1 rounded-md"
              : "text-white bg-red-500 px-3 py-1 rounded-md"
          }
        >
          {row.status === 1 ? "Activo" : "Inactivo"}
        </span>
      ),
    },
  ];

  // Clase para el botón de guardar
  const getSaveButtonClass = () => {
    if (isLoading) return "bg-gray-400 text-white cursor-not-allowed";
    return "bg-blue-600 text-white hover:bg-blue-700";
  };

  // Función para mostrar el formulario de creación
  const handleButtonClick = async () => {
    clearFormFields();
    setShowForm(true);
    setIsEditing(false);
    await fetchBranches();
  };

  return (
    <>
      {showForm && (
        <div className="formulario">
          <div className="flex flex-col gap-4 shadow-xl p-4 sm:p-6 md:p-8 rounded-lg container mx-auto bg-white-translucent dark:bg-boxdark my-4 sm:my-8">
            {/* Header */}
            <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4 items-start">
              <i
                className="fas fa-chevron-left text-white bg-[#1c2434] p-2 rounded-full flex items-center justify-center w-8 h-8 cursor-pointer"
                onClick={handleCancelClick}
              ></i>
              <label className="text-base sm:text-lg md:text-title-md2 font-semibold text-black dark:text-white">
                {isEditing
                  ? userRole === 3
                    ? "Editar Operador"
                    : "Editar Usuario"
                  : userRole === 3
                  ? "Agregar Operador"
                  : "Agregar Usuario"}
              </label>
            </div>

            {/* Título de sección */}
            <h2 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-white">
              Información del Usuario
            </h2>

            {/* Nombre y Apellido */}
            <div className="w-full flex flex-col sm:flex-row gap-4 sm:justify-between">
              <div className="w-full sm:w-[49%]">
                <label className="mb-2 sm:mb-3 block text-sm font-medium text-black dark:text-white">
                  Nombre
                </label>
                <input
                  type="text"
                  placeholder="Ingrese el nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded border border-stroke py-2 sm:py-3 px-4 sm:pl-3.5 sm:pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white"
                />
              </div>
              <div className="w-full sm:w-[49%]">
                <label className="mb-2 sm:mb-3 block text-sm font-medium text-black dark:text-white">
                  Apellido
                </label>
                <input
                  type="text"
                  placeholder="Ingrese el apellido"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full rounded border border-stroke py-2 sm:py-3 px-4 sm:pl-3.5 sm:pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white"
                />
              </div>
            </div>

            {/* Email */}
            <div className="w-full">
              <label className="mb-2 sm:mb-3 block text-sm font-medium text-black dark:text-white">
                Email
              </label>
              <input
                type="email"
                placeholder="Ingrese el email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded border border-stroke py-2 sm:py-3 px-4 sm:pl-3.5 sm:pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white"
              />
            </div>

            {/* Contraseña y Confirmación */}
            <div className="w-full flex flex-col sm:flex-row gap-4 sm:justify-between">
              <div className="w-full sm:w-[49%]">
                <label className="mb-2 sm:mb-3 block text-sm font-medium text-black dark:text-white">
                  {isEditing ? "Nueva Contraseña (opcional)" : "Contraseña"}
                </label>
                <input
                  type="password"
                  placeholder={
                    isEditing
                      ? "Dejar en blanco para mantener"
                      : "Ingrese la contraseña"
                  }
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded border border-stroke py-2 sm:py-3 px-4 sm:pl-3.5 sm:pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white"
                />
              </div>
              <div className="w-full sm:w-[49%]">
                <label className="mb-2 sm:mb-3 block text-sm font-medium text-black dark:text-white">
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  placeholder="Confirme la contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded border border-stroke py-2 sm:py-3 px-4 sm:pl-3.5 sm:pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white"
                />
              </div>
            </div>

            {/* Rol y Sucursal */}

            {userRole !== 3 && (
              <div className="w-full flex flex-col sm:flex-row gap-4 sm:justify-between">
                <div className="w-full sm:w-[49%]">
                  <label className="mb-2 sm:mb-3 block text-sm font-medium text-black dark:text-white">
                    Rol
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(Number(e.target.value))}
                    className="w-full rounded border border-stroke py-2 sm:py-3 px-4 sm:pl-3.5 sm:pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white"
                  >
                    <option value={3}>Admin de Sucursal</option>
                    <option value={4}>Operador</option>
                  </select>
                  <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    <i className="fas fa-info-circle mr-1"></i>
                    {role === 3
                      ? "Máximo 1 Admin por sucursal"
                      : "Máximo 2 Operadores por sucursal"}
                  </div>
                </div>
                <div className="w-full sm:w-[49%]">
                  <label className="mb-2 sm:mb-3 block text-sm font-medium text-black dark:text-white">
                    Sucursal
                  </label>
                  <select
                    value={branchId}
                    onChange={(e) => setBranchId(e.target.value)}
                    className="w-full rounded border border-stroke py-2 sm:py-3 px-4 sm:pl-3.5 sm:pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white"
                  >
                    <option value="">Seleccione una sucursal</option>
                    {branches.map((branch) => (
                      <option key={branch.id} value={branch.id}>
                        {branch.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Estado (solo en modo edición) */}
            {isEditing && (
              <div className="w-full">
                <label className="mb-2 sm:mb-3 block text-sm font-medium text-black dark:text-white">
                  Estado
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(Number(e.target.value))}
                  className="w-full rounded border border-stroke py-2 sm:py-3 px-4 sm:pl-3.5 sm:pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white"
                >
                  <option value={1}>Activo</option>
                  <option value={0}>Inactivo</option>
                </select>
              </div>
            )}

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4.5 mt-6 sm:mt-8">
              <button
                className="w-full sm:w-auto text-[#3c50e0] border-[#3c50e0] flex justify-center rounded border py-2 px-4 sm:px-6 font-medium hover:shadow-1 dark:border-strokedark dark:text-white"
                type="reset"
                onClick={handleCancelClick}
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                className={`w-full sm:w-auto flex justify-center rounded py-2 px-4 sm:px-6 font-medium ${getSaveButtonClass()}`}
                disabled={isLoading}
                aria-label={
                  isEditing ? "Actualizar usuario" : "Guardar usuario"
                }
              >
                {isLoading ? (
                  <LoadingDots />
                ) : isEditing ? (
                  "Actualizar"
                ) : (
                  "Guardar"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {!showForm && (
        <div className="container mx-auto my-8">
          <TablaItem
            data={data}
            columns={columns}
            title={
              userRole === 3 ? "Gestión de Operadores" : "Gestión de Usuarios"
            }
            buttonLabel={
              userRole === 3 ? "Agregar Operador" : "Agregar Usuario"
            }
            onButtonClick={handleButtonClick}
            showNewButton={true}
          />
        </div>
      )}
    </>
  );
}

export default UserManagement;
