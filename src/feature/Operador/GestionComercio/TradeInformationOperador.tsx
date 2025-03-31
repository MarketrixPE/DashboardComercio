import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { Icon } from "@iconify/react/dist/iconify.js";
import { LoadingDots } from "../../../shared/components/Atoms/LoadingDots/LoadingDots";
import Uploader from "../../../shared/components/Atoms/Uploader";
import TablaItem, {
  RowData,
  Column,
} from "../../../shared/components/Molecules/TablaItem/TablaItem";
import {
  getCompanyDetails,
  updateCompany,
} from "../../../core/services/Operador/TradeService/TradeService";
import BranchCommerce from "./GestionSucursales/BranchCommerce";
import { Tooltip } from "react-tooltip";
import { validateRUC } from "../../../core/services/SunatService";
import CustomDropdown from "../../../shared/components/Atoms/Dropdown/Dropdown";
import { tradeOperatorValidations } from "./TradeOperatorValidations";
import { HelperService } from "../../../core/services/HelperService";

function TradeInformationOperador() {
  const [data, setData] = useState<RowData[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCompanyId, setCurrentCompanyId] = useState(null);
  const [tipoDocumento, setTipoDocumento] = useState("6");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [razonSocial, setRazonSocial] = useState("");
  const [nombreComercial, setNombreComercial] = useState("");
  const [numerosContacto, setNumeroscontacto] = useState("+51");
  const [selectedCompanyName, setSelectedCompanyName] = useState<string>("");
  const [isBranchView, setIsBranchView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [logo, setLogo] = useState<File | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [membershipId, setMembershipId] = useState<number | "">(3);
  const [discountPlanId, setDiscountPlanId] = useState<number | "">(1); // Default a 1 (10%)
  const [showButton, setShowButton] = useState(false);

  const validateOperatorForm = (): boolean => {
    const documentError = tradeOperatorValidations.validateRUC(numeroDocumento);
    const businessNameError =
      tradeOperatorValidations.validateBusinessName(nombreComercial);
    const razonError =
      tradeOperatorValidations.validateRazonSocial(razonSocial);
    const contactError =
      tradeOperatorValidations.validateContactNumber(numerosContacto);
    const logoError = tradeOperatorValidations.validateLogo(logo, isEditing);

    const validationErrors: Record<string, string | undefined> = {
      document: documentError,
      businessName: businessNameError,
      razonSocial: razonError,
      contact: contactError,
      logo: logoError,
    };

    // Filtrar y recolectar errores
    const errors = Object.values(validationErrors).filter(
      (error) => error !== undefined
    );

    // Si hay errores, mostrarlos todos en una lista
    if (errors.length > 0) {
      const errorList = errors.map((error) => `• ${error}`).join("<br>");

      Swal.fire({
        icon: "error",
        title: "Errores de validación",
        html: errorList,
      });
      return false;
    }

    return true;
  };

  const validateRUCOnChange = async (ruc: string) => {
    try {
      const rucInfo = await validateRUC(ruc);
      if (rucInfo && rucInfo.razonSocial) {
        Swal.fire(
          "RUC válido",
          `Razón Social: ${rucInfo.razonSocial || "No disponible"}`,
          "success"
        );
        setRazonSocial(rucInfo.razonSocial || ""); // Rellenar campo en el formulario
      } else {
        Swal.fire({
          icon: "error",
          title: "RUC no válido",
          text: "El RUC ingresado no es válido o no tiene datos asociados.",
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error en la validación",
        text: error.message || "Ocurrió un problema al validar el RUC.",
      });
    }
  };

  const handleCancelClick = () => {
    setShowForm(false);
    clearFormFields();
  };

  const hasFetchedCompanies = useRef(false);
  const encryptedCompanyId = HelperService.getCompanyId();

  const fetchData = async () => {
    setIsLoading(true);

    try {
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

      // Obtener los detalles de la compañía usando el ID encriptado
      const company = await getCompanyDetails(encryptedCompanyId);
      if (!company) {
        setData([]);
        setShowButton(true);
        Swal.fire({
          icon: "info",
          title: "No hay datos",
          text: "No hay empresas disponibles para mostrar.",
        });
        return;
      }

      const formattedData = [
        {
          id: company.id,
          nombre_comercial: company.nombre_comercial,
          status: company.activo === 1 ? "Activo" : "Inactivo",
          activo: company.activo,
          razon_social: company.razon_social,
          numero_documento: company.numero_documento,
          tipo_documento: company.tipo_documento,
          numeros_contacto: company.numeros_contacto,
          logo: company.logo,
          encrypted_id: encryptedCompanyId, // Guardar el ID encriptado para usarlo después
        },
      ];
      setData(formattedData);
      setShowButton(false); // Ocultar el botón si hay datos
    } catch (error: any) {
      console.error("Error al cargar los datos:", error);
      setShowButton(true); // Mostrar el botón en caso de error
    } finally {
      setIsLoading(false);
    }
  };

  const onEdit = async (row: RowData) => {
    clearFormFields();
    setCurrentCompanyId(row.id);
    setShowForm(true);
    setIsEditing(true);
    setIsLoading(true);
    console.log("first", encryptedCompanyId);
    try {
      if (!encryptedCompanyId) {
        throw new Error("No se encontró el ID encriptado de la compañía.");
      }

      // Usando el endpoint para obtener detalles usando ID encriptado
      const company = await getCompanyDetails(encryptedCompanyId);

      // Configurar los datos existentes de la empresa
      setTipoDocumento(company.tipo_documento);
      setNumeroDocumento(company.numero_documento);
      setRazonSocial(company.razon_social);
      setNombreComercial(company.nombre_comercial);
      setLogoUrl(company.logo);
      setNumeroscontacto(company.numeros_contacto);

      // Configurar los nuevos campos
      setMembershipId(company.membership_id || 3); // Default a 3 (Infinity)
      setDiscountPlanId(company.discount_plan_id || 1); // Default a 1 (10%)
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error al cargar datos",
        text: error.message || "No se pudieron cargar los datos de la empresa.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!validateOperatorForm()) return;
    setIsLoading(true);

    try {
      // Validar RUC
      const rucInfo = await validateRUC(numeroDocumento);
      const membershipIdNumber = Number(membershipId);
      const discountPlanIdNumber = Number(discountPlanId);

      if (isNaN(membershipIdNumber) || isNaN(discountPlanIdNumber)) {
        throw new Error(
          "Debe seleccionar una membresía y un plan de descuento válidos."
        );
      }

      const payload = {
        tipo_documento: tipoDocumento,
        numero_documento: numeroDocumento,
        razon_social: rucInfo.razonSocial || razonSocial,
        nombre_comercial: nombreComercial,
        numeros_contacto: numerosContacto,
        logo,
        activo: 1,
        discount_plan_id: discountPlanIdNumber,
      };

      if (isEditing) {
        // Obtener el ID encriptado (del objeto row o del localStorage)
        const encryptedId = localStorage.getItem("commerce_company_id");
        if (!encryptedId) {
          throw new Error("No se encontró el ID encriptado de la compañía.");
        }

        await updateCompany(encryptedId, payload);
        Swal.fire(
          "Actualización exitosa",
          "La empresa ha sido actualizada correctamente.",
          "success"
        );

        setShowForm(false);
        fetchData();
      } else {
        // Como no tenemos un método de creación con los 3 endpoints,
        // podemos mostrar un mensaje de que esta funcionalidad no está disponible
        Swal.fire({
          icon: "warning",
          title: "Funcionalidad no disponible",
          text: "La creación de nuevas empresas no está disponible actualmente. Por favor, contacte al administrador del sistema.",
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: isEditing ? "Error al actualizar" : "Error al guardar",
        text: error.message || "Hubo un problema en la operación.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetchedCompanies.current) {
      hasFetchedCompanies.current = true;
      fetchData();
    }
  }, []);

  const columns: Column[] = [
    {
      Header: "Acciones",
      Cell: (row: RowData) => (
        <div className="flex space-x-2">
          <button
            id="tooltip-branch"
            className="relative pl-1 bg-green-500 text-slate-50 flex items-center rounded-lg group overflow-hidden transition-all duration-500 ease-in-out w-[2rem] hover:w-[8rem]"
            onClick={() => onBranch(row)}
          >
            <Icon
              icon="material-symbols:home"
              className="flex-shrink-0 "
              width="24"
              height="24"
            />

            <span className="ml-0 opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 group-hover:ml-2 transition-all duration-500 ease-in-out delay-100">
              Sucursales
            </span>
          </button>

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
      Header: "Nombre ",
      accessor: "nombre_comercial" as keyof RowData,
    },
    { Header: "Razón Social", accessor: "razon_social" as keyof RowData },
    {
      Header: "Estado",
      accessor: "activo" as keyof RowData,
      Cell: (row: RowData) => (
        <span
          className={
            row.activo === 1
              ? "text-white bg-green-500 px-3 py-1 rounded-md"
              : "text-white bg-red-500 px-3 py-1 rounded-md"
          }
        >
          {row.activo === 1 ? "Activo" : "Inactivo"}
        </span>
      ),
    },
  ];

  const onBranch = (row: RowData) => {
    setCurrentCompanyId(row.id);
    setSelectedCompanyName(row.nombre_comercial);
    setIsBranchView(true);
  };

  const handleButtonClick = () => {
    clearFormFields();
    setShowForm(true);
    setIsEditing(false);
  };

  const handleBackToTrade = () => {
    setIsBranchView(false);
    fetchData();
  };

  const clearFormFields = () => {
    setTipoDocumento("6");
    setNumeroDocumento("");
    setRazonSocial("");
    setNombreComercial("");
    setDiscountPlanId(1); // Default a 1 (10%)
    setMembershipId(3); // Default a 3 (Infinity)
    setLogo(null);
  };

  const getSaveButtonClass = () => {
    if (isLoading) return "bg-gray-400 text-white cursor-not-allowed";
    return "bg-blue-600 text-white hover:bg-blue-700";
  };

  const discountPlans = [{ id: 1, text: "10%" }];
  const membershipPlans = [{ id: 3, text: "Infinity" }];

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
                  ? "Editar Información del Comercio"
                  : "Agregar Información del Comercio"}
              </label>
            </div>

            {/* Título de sección */}
            <h2 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-white">
              Información General
            </h2>

            {/* Documento */}
            <div className="w-full flex flex-col sm:flex-row gap-4 sm:justify-between">
              <div className="w-full sm:w-[49%]">
                <label className="mb-2 sm:mb-3 block text-sm font-medium text-black dark:text-white">
                  Tipo de Documento
                </label>
                <select
                  value={tipoDocumento}
                  onChange={(e) => setTipoDocumento(e.target.value)}
                  className="w-full rounded border border-stroke py-2 sm:py-3 px-4 sm:pl-3.5 sm:pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white"
                >
                  <option value="6">RUC</option>
                </select>
              </div>
              <div className="w-full sm:w-[49%]">
                <label className="mb-2 sm:mb-3 block text-sm font-medium text-black dark:text-white">
                  Número de Documento
                </label>
                <input
                  type="text"
                  placeholder="Ingrese el RUC"
                  value={numeroDocumento}
                  onChange={(e) => {
                    const ruc = e.target.value.replace(/\D/g, "").slice(0, 11);
                    setNumeroDocumento(ruc);
                    if (ruc.length === 11) {
                      validateRUCOnChange(ruc);
                    }
                  }}
                  className="w-full rounded border border-stroke py-2 sm:py-3 px-4 sm:pl-3.5 sm:pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white"
                />
              </div>
            </div>

            {/* Información comercial */}
            <div className="flex flex-col sm:flex-row w-full gap-4">
              <div className="w-full sm:w-[33%]">
                <label className="mb-2 sm:mb-3 block text-sm font-medium text-black dark:text-white">
                  Nombre Comercial
                </label>
                <input
                  value={nombreComercial}
                  onChange={(e) => setNombreComercial(e.target.value)}
                  className="w-full rounded border border-stroke py-2 sm:py-3 px-4 sm:pl-3.5 sm:pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white"
                />
              </div>
              <div className="w-full sm:w-[33%]">
                <label className="mb-2 sm:mb-3 block text-sm font-medium text-black dark:text-white">
                  Razón Social
                </label>
                <input
                  value={razonSocial}
                  onChange={(e) => setRazonSocial(e.target.value)}
                  className="w-full rounded border border-stroke py-2 sm:py-3 px-4 sm:pl-3.5 sm:pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white"
                />
              </div>
              <div className="w-full sm:w-[33%]">
                <label className="mb-2 sm:mb-3 block text-sm font-medium text-black dark:text-white">
                  Número de Contacto
                </label>
                <input
                  value={numerosContacto}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    if (!inputValue.startsWith("+51")) {
                      setNumeroscontacto("+51");
                    } else {
                      setNumeroscontacto(inputValue);
                    }
                  }}
                  className="w-full rounded border border-stroke py-2 sm:py-3 px-4 sm:pl-3.5 sm:pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white"
                />
              </div>
            </div>

            {/* Membresía y Plan de Descuento */}
            <div className="flex flex-col sm:flex-row w-full gap-4">
              <div className="w-full sm:w-[49%]">
                <label className="mb-2 sm:mb-3 block text-sm font-medium text-black dark:text-white">
                  Membresía
                </label>
                <div data-tooltip-id="membershipTooltip">
                  <CustomDropdown
                    options={membershipPlans}
                    value={membershipId ? Number(membershipId) : null}
                    onChange={(value) => setMembershipId(value)}
                    placeholder="Seleccione una membresía"
                    className="dark:bg-boxdark dark:border-strokedark dark:text-white cursor-help"
                    disabled
                    defaultValue={3}
                  />
                </div>
                <Tooltip
                  id="membershipTooltip"
                  content="Por los 3 primeros meses eres Infinity"
                  place="top"
                  className="bg-black dark:bg-boxdark text-white"
                />
              </div>
              <div className="w-full sm:w-[49%] hidden">
                {/* <label className="mb-2 sm:mb-3 block text-sm font-medium text-black dark:text-white">
                  Plan de Descuento
                </label> */}
                <CustomDropdown
                  options={discountPlans}
                  value={discountPlanId ? Number(discountPlanId) : null}
                  onChange={(value) => setDiscountPlanId(value)}
                  placeholder="Seleccione un plan de descuento"
                  className="dark:bg-boxdark dark:border-strokedark dark:text-white"
                />
              </div>
            </div>

            {/* Logo */}
            <div className="w-full">
              <label className="mb-2 sm:mb-3 block text-sm font-medium text-black dark:text-white">
                {isEditing
                  ? "Editar logo de comercio"
                  : "Agregar logo de comercio"}
              </label>
              <Uploader
                onFileSelect={(file) => setLogo(file)}
                accept="image/jpeg, image/jpg, image/png"
                maxSize={10 * 1024 * 1024}
                label="Sube tu logo aquí"
                initialPreview={
                  logo ? URL.createObjectURL(logo) : logoUrl || undefined
                }
                className="w-full rounded border border-stroke py-2 sm:py-3 px-4 text-black dark:text-white dark:border-strokedark dark:bg-boxdark focus:border-primary"
              />
            </div>

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
                  isEditing ? "Actualizar empresa" : "Guardar empresa"
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
      {!isBranchView && !showForm && (
        <div className="container mx-auto my-8">
          <TablaItem
            data={data}
            columns={columns}
            title="Mi Comercio Smart"
            buttonLabel="Agregar Comercio"
            onButtonClick={handleButtonClick}
            onEdit={onEdit}
            showNewButton={false}
            showButton={showButton}
          />
        </div>
      )}

      {isBranchView && (
        <BranchCommerce
          selectedCompanyId={currentCompanyId}
          selectedCompanyName={selectedCompanyName}
          onBackClick={handleBackToTrade}
        />
      )}
    </>
  );
}

export default TradeInformationOperador;