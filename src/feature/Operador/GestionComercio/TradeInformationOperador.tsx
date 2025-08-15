import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { LoadingDots } from "../../../shared/components/Atoms/LoadingDots/LoadingDots";
import Uploader from "../../../shared/components/Atoms/Uploader";
import Cookies from "js-cookie";
import {
  getCompanyDetails,
  updateCompany,
} from "../../../core/services/Operador/TradeService/TradeService";
import { validateRUC } from "../../../core/services/SunatService";
import CustomDropdown from "../../../shared/components/Atoms/Dropdown/Dropdown";
import { tradeOperatorValidations } from "./TradeOperatorValidations";
import { HelperService } from "../../../core/services/HelperService";

// Interfaz actualizada para los datos de la empresa
interface CompanyData {
  id: number;
  nombre_comercial: string;
  razon_social: string;
  numero_documento: string;
  tipo_documento: string;
  numeros_contacto: string;
  logo: string | null;
  activo: number;
  membership_id: number;
  discount_plan_id: number;
  encrypted_id: string;
  user?: {
    id: number;
    name: string;
    last_name: string;
    email: string;
    phone: string;
  };
}

function TradeInformationOperador() {
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tipoDocumento, setTipoDocumento] = useState("6");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [razonSocial, setRazonSocial] = useState("");
  const [nombreComercial, setNombreComercial] = useState("");
  const [numerosContacto, setNumeroscontacto] = useState("+51");
  const [isLoading, setIsLoading] = useState(false);
  const [logo, setLogo] = useState<File | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [membershipId, setMembershipId] = useState<number>(3); // Default a 3 (Empresarial)
  const [discountPlanId, setDiscountPlanId] = useState<number>(1); // Default a 1 (10%)

  const validateOperatorForm = (): boolean => {
    const documentError = tradeOperatorValidations.validateRUC(numeroDocumento);
    const businessNameError = tradeOperatorValidations.validateBusinessName(nombreComercial);
    const razonError = tradeOperatorValidations.validateRazonSocial(razonSocial);
    const contactError = tradeOperatorValidations.validateContactNumber(numerosContacto);
    const logoError = tradeOperatorValidations.validateLogo(logo, isEditing);

    const validationErrors: Record<string, string | undefined> = {
      document: documentError,
      businessName: businessNameError,
      razonSocial: razonError,
      contact: contactError,
      logo: logoError,
    };

    const errors = Object.values(validationErrors).filter((error) => error !== undefined);

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

  // const validateRUCOnChange = async (ruc: string) => {
  //   try {
  //     const rucInfo = await validateRUC(ruc);
  //     if (rucInfo && rucInfo.razonSocial) {
  //       Swal.fire(
  //         "RUC válido",
  //         `Razón Social: ${rucInfo.razonSocial || "No disponible"}`,
  //         "success"
  //       );
  //       setRazonSocial(rucInfo.razonSocial || "");
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "RUC no válido",
  //         text: "El RUC ingresado no es válido o no tiene datos asociados.",
  //       });
  //     }
  //   } catch (error: any) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error en la validación",
  //       text: error.message || "Ocurrió un problema al validar el RUC.",
  //     });
  //   }
  // };

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
        setCompanyData(null);
        setShowForm(true); // Mostrar formulario si no hay datos
        Swal.fire({
          icon: "info",
          title: "No hay datos",
          text: "No se encontró información de la compañía. Por favor, ingrese los datos.",
        });
        return;
      }

      const company = await getCompanyDetails(encryptedCompanyId);
      if (!company) {
        setCompanyData(null);
        setShowForm(true);
        Swal.fire({
          icon: "info",
          title: "No hay datos",
          text: "No hay información disponible para mostrar.",
        });
        return;
      }

      const formattedData: CompanyData = {
        id: company.id,
        nombre_comercial: company.nombre_comercial,
        razon_social: company.razon_social,
        numero_documento: company.numero_documento,
        tipo_documento: company.tipo_documento,
        numeros_contacto: company.numeros_contacto,
        logo: company.logo,
        activo: company.activo,
        membership_id: company.membership_id || 3,
        discount_plan_id: company.discount_plan_id || 1,
        encrypted_id: encryptedCompanyId,
        user: company.user, // Incluir datos del usuario
      };
      setCompanyData(formattedData);
      setShowForm(false);
    } catch (error: any) {
      console.error("Error al cargar los datos:", error);
      setShowForm(true);
    } finally {
      setIsLoading(false);
    }
  };

  const onEdit = async () => {
    clearFormFields();
    setShowForm(true);
    setIsEditing(true);
    setIsLoading(true);
    try {
      if (!encryptedCompanyId) {
        throw new Error("No se encontró el ID encriptado de la compañía.");
      }

      const company = await getCompanyDetails(encryptedCompanyId);
      setTipoDocumento(company.tipo_documento);
      setNumeroDocumento(company.numero_documento);
      setRazonSocial(company.razon_social);
      setNombreComercial(company.nombre_comercial);
      setLogoUrl(company.logo);
      // Usar el teléfono del usuario, no numeros_contacto
      setNumeroscontacto(company.user?.phone || "+51");
      setMembershipId(company.membership_id || 3);
      setDiscountPlanId(company.discount_plan_id || 1);
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
      const rucInfo = await validateRUC(numeroDocumento);
      const membershipIdNumber = Number(membershipId);
      const discountPlanIdNumber = Number(discountPlanId);

      if (isNaN(membershipIdNumber) || isNaN(discountPlanIdNumber)) {
        throw new Error("Debe seleccionar una membresía y un plan de descuento válidos.");
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
        const encryptedId = Cookies.get("commerce_company_id");
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

  const clearFormFields = () => {
    setTipoDocumento("6");
    setNumeroDocumento("");
    setRazonSocial("");
    setNombreComercial("");
    setDiscountPlanId(1);
    setMembershipId(3);
    setLogo(null);
  };

  const getSaveButtonClass = () => {
    if (isLoading) return "bg-gray-400 text-white cursor-not-allowed";
    return "bg-blue-600 text-white hover:bg-blue-700";
  };

  // const discountPlans = [{ id: 1, text: "10%" }];
  const membershipPlans = [{ id: 3, text: "Empresarial" }];

  return (
    <div className="container mx-auto my-8">
      {showForm ? (
        <div className="formulario">
          <div className="flex flex-col gap-4 shadow-xl p-4 sm:p-6 md:p-8 rounded-lg container mx-auto bg-white-translucent dark:bg-boxdark my-4 sm:my-8">
            {/* Header */}
            <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4 items-start">
              <i
                className="fas fa-chevron-left text-white bg-[#1c2434] p-2 rounded-full flex items-center justify-center w-8 h-8 cursor-pointer"
                onClick={handleCancelClick}
                aria-label="Volver"
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
                  disabled={isLoading}
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
                    // Removida la validación automática del RUC
                  }}
                  className="w-full rounded border border-stroke py-2 sm:py-3 px-4 sm:pl-3.5 sm:pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white"
                  disabled={isLoading}
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
                  disabled={isLoading}
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
                  disabled={isLoading}
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
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Membresía */}
            <div className="flex flex-col sm:flex-row w-full gap-4">
              <div className="w-full sm:w-[49%]">
                <label className="mb-2 sm:mb-3 block text-sm font-medium text-black dark:text-white">
                  Membresía
                </label>
                <div data-tooltip-id="membershipTooltip">
                  <CustomDropdown
                    options={membershipPlans}
                    value={membershipId}
                    onChange={(value) => setMembershipId(value)}
                    placeholder="Seleccione una membresía"
                    className="dark:bg-boxdark dark:border-strokedark dark:text-white cursor-help"
                    disabled
                    defaultValue={3}
                  />
                </div>
              </div>
            </div>

            {/* Logo */}
            <div className="w-full">
              <label className="mb-2 sm:mb-3 block text-sm font-medium text-black dark:text-white">
                {isEditing ? "Editar logo de comercio" : "Agregar logo de comercio"}
              </label>
              <Uploader
                onFileSelect={(file) => setLogo(file)}
                accept="image/jpeg, image/jpg, image/png"
                maxSize={5 * 1024 * 1024} // Reducido a 5 MB
                label="Sube tu logo aquí"
                initialPreview={logo ? URL.createObjectURL(logo) : logoUrl || undefined}
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
                aria-label={isEditing ? "Actualizar empresa" : "Guardar empresa"}
              >
                {isLoading ? <LoadingDots /> : isEditing ? "Actualizar" : "Guardar"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-boxdark shadow-xl rounded-lg p-6 sm:p-8">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <LoadingDots />
            </div>
          ) : companyData ? (
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Logo */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-gray-300 dark:border-strokedark flex items-center justify-center overflow-hidden">
                  {companyData.logo ? (
                    <img
                      src={companyData.logo}
                      alt="Logo de la empresa"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                      Sin logo
                    </div>
                  )}
                </div>
              </div>

              {/* Información */}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-white">
                    {companyData.nombre_comercial}
                  </h1>
                  <button
                    onClick={onEdit}
                    className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition duration-300"
                    aria-label="Editar información del comercio"
                  >
                    Editar
                  </button>
                </div>

                <h2 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                  {companyData.razon_social}
                </h2>

                <div className="space-y-3 text-gray-600 dark:text-gray-400">
                  <p>
                    <span className="font-medium text-black dark:text-white">Tipo de Documento:</span>{" "}
                    {companyData.tipo_documento === "6" ? "RUC" : "Otro"}
                  </p>
                  <p>
                    <span className="font-medium text-black dark:text-white">Número de Documento:</span>{" "}
                    {companyData.numero_documento}
                  </p>
                  <p>
                    <span className="font-medium text-black dark:text-white">Número de Contacto:</span>{" "}
                    {/* Usar el teléfono del usuario, con fallback a numeros_contacto */}
                    {companyData.user?.phone || companyData.numeros_contacto || "No disponible"}
                  </p>
                  <p>
                    <span className="font-medium text-black dark:text-white">Membresía:</span>{" "}
                    {membershipPlans.find((plan) => plan.id === companyData.membership_id)?.text || "Empresarial"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-600 dark:text-gray-400">
              No hay información disponible. Por favor, agregue los datos del comercio.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TradeInformationOperador;