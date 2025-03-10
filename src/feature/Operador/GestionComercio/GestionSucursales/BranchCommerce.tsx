import { useEffect, useRef, useState } from "react";

import { Icon } from "@iconify/react";
import Swal from "sweetalert2";
import TablaItem, {
  Column,
  RowData,
} from "../../../../shared/components/Molecules/TablaItem/TablaItem";
import LocationPicker from "../../../../shared/components/Organisms/LocationPicker/LocationPicker";
import Uploader from "../../../../shared/components/Atoms/Uploader";
import { LoadingDots } from "../../../../shared/components/Atoms/LoadingDots/LoadingDots";
import iconEstuMercado from "../../../../assets/svg/iconEstudiosMercados.svg";

import {
  createBranch,
  deleteBranch,
  getBranchById,
  getBranchesByCompanyId,
  getCategories,
  getSubcategoriesByCategoryId,
  updateBranch,
} from "../../../../core/services/Operador/Branch/BranchService";
import ProductsCommerce from "./GestionProductos/ProductsCommerce";
import SurveysCommerce from "./GestionEncuestas/SurveysCommerce";
import { branchValidations } from "./BranchValidations";
import StudiesCommerce from "./GestionEstudiosMercado/StudiesCommerce";

interface BranchProps {
  selectedCompanyId: string | null;
  selectedCompanyName: string;
  onBackClick: () => void;
}

export function BranchCommerce({
  selectedCompanyId,
  selectedCompanyName,
  onBackClick,
}: BranchProps) {
  const [data, setData] = useState<RowData[]>([]);
  const [branchDescription, setBranchDescription] = useState("");
  const [branchAddress, setBranchAddress] = useState("");
  const [branchStatus, setBranchStatus] = useState("Activo");
  const [branchContact, setBranchContact] = useState("+51");

  const [branchSchedule, setBranchSchedule] = useState("");
  const [, setBranchCoordinates] = useState({
    lat: "",
    long: "",
  });
  const [showBranchForm, setShowBranchForm] = useState(false);
  const [isBranchEditing, setIsBranchEditing] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null);
  const [selectedBranchName, setSelectedBranchName] = useState<string>("");
  const [selectedBranchAddress, setSelectedBranchAddress] =
    useState<string>("");

  const [departamento, setDepartamento] = useState("");
  const [provincia, setProvincia] = useState("");
  const [distrito, setDistrito] = useState("");
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");
  const [isProductView, setIsProductView] = useState(false);
  const [isSurveysView, setIsSurveysView] = useState(false);
  const [isStudiesView, setIsStudiesView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [logo, setLogo] = useState<File | null>(null);
  const [likes] = useState("1");
  const [rating] = useState("5");
  const hasFetchedBranches = useRef(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [categories, setCategories] = useState<
    { id: number; titulo: string }[]
  >([]);
  const [subcategories, setSubcategories] = useState<
    { id: number; descripcion: string }[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>(
    null
  );
  {
    /*-------------- INICIO DATA SELECT ----------------- */
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubcategories = async () => {
      if (selectedCategory) {
        try {
          const subcategoriesData = await getSubcategoriesByCategoryId(
            selectedCategory
          );
          setSubcategories(subcategoriesData);
        } catch (error) {
          console.error("Error al cargar subcategorías:", error);
        }
      } else {
        setSubcategories([]);
        setSelectedSubcategory(null);
      }
    };
    fetchSubcategories();
  }, [selectedCategory]);

  {
    /*-------------- FIN DATA SELECT ----------------- */
  }

  const fetchBranches = async () => {
    setIsLoading(true);
    try {
      const branches = await getBranchesByCompanyId(selectedCompanyId || "");

      if (branches.length === 0) {
        setData([]);

        if (isInitialLoad) {
          Swal.fire({
            icon: "info",
            title: "No hay sucursales",
            text: "No hay sucursales disponibles para mostrar.",
          });
        }
        setIsInitialLoad(false);
        return;
      }

      const formattedData: RowData[] = branches.map((branch: any) => ({
        id: branch.id,
        item: branch.descripcion,
        address: branch.direccion,
        contact: branch.numeros_contacto,
        status: branch.activo === 1 ? "Activo" : "Inactivo",
        departamento: branch.departamento,
        provincia: branch.provincia,
        distrito: branch.distrito,
        horarios: branch.horarios,
        latitud: branch.latitud,
        longitud: branch.longitud,
      }));
      setData(formattedData);
      setIsInitialLoad(false);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Error al obtener las sucursales.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetchedBranches.current && selectedCompanyId) {
      hasFetchedBranches.current = true;
      fetchBranches();
    }
  }, [selectedCompanyId]);

  //CRUD

  const validateBranchForm = (): boolean => {
    const descriptionError =
      branchValidations.validateDescription(branchDescription);
    const addressError = branchValidations.validateAddress(branchAddress);
    const contactError = branchValidations.validateContact(branchContact);
    const scheduleError = branchValidations.validateSchedule(branchSchedule);
    const categoryError = branchValidations.validateCategory(selectedCategory);
    const subcategoryError = branchValidations.validateSubcategory(
      selectedSubcategory,
      !!selectedCategory
    );
    const locationError = branchValidations.validateLocation(latitud, longitud);
    const logoError = branchValidations.validateLogo(logo, isBranchEditing);

    const validationErrors: Record<string, string | undefined> = {
      description: descriptionError,
      address: addressError,
      contact: contactError,
      schedule: scheduleError,
      category: categoryError,
      subcategory: subcategoryError,
      location: locationError,
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

  const saveOrUpdateBranch = async () => {
    if (!validateBranchForm()) return;
    setIsLoading(true);
    try {
      const formData = new FormData();

      // Explicitly convert status to number and log
      const activeStatus = branchStatus === "Activo" ? 1 : 0;
      console.log("Attempting to set status:", {
        branchStatus,
        activeStatus,
        selectedBranchId,
      });

      formData.append("descripcion", branchDescription);
      formData.append("direccion", branchAddress);

      console.log(
        "Estado a enviar:",
        branchStatus,
        "Valor de activo:",
        branchStatus === "Activo" ? "1" : "0"
      );
      formData.append("activo", branchStatus === "Activo" ? "1" : "0");
      formData.append("numeros_contacto", branchContact);
      formData.append("horarios", branchSchedule);
      formData.append("latitud", latitud);
      formData.append("longitud", longitud);
      formData.append("departamento", departamento);
      formData.append("provincia", provincia);
      formData.append("distrito", distrito);
      formData.append("company_id", selectedCompanyId || "");
      formData.append("likes", likes);
      formData.append("rating", rating);

      if (!isBranchEditing && logo) {
        formData.append("imagen", logo);
      }

      if (selectedCategory)
        formData.append("categories[]", selectedCategory.toString());
      if (selectedSubcategory)
        formData.append("subcategories[]", selectedSubcategory.toString());

      try {
        if (isBranchEditing && selectedBranchId) {
          // Actualización
          const updateResponse = await updateBranch(selectedBranchId, formData);

          console.log("Update Response:", updateResponse);

          Swal.fire("¡Actualizado!", "La sucursal fue actualizada.", "success");
        } else {
          // Creación
          const createResponse = await createBranch(formData);

          console.log("Create Response:", createResponse);

          Swal.fire("¡Creado!", "La sucursal fue creada.", "success");
        }

        await fetchBranches();

        setShowBranchForm(false);
      } catch (updateCreateError) {
        console.error("Update/Create Error:", updateCreateError);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al guardar la sucursal.",
        });
      }
    } catch (error) {
      console.error("General Error:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al guardar la sucursal.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async (row: RowData) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Se eliminará la sucursal "${row.item}". Esta acción no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteBranch(row.id);
          setData((prevData) =>
            prevData.filter((branch) => branch.id !== row.id)
          );
          Swal.fire(
            "¡Eliminado!",
            "La sucursal ha sido eliminada correctamente.",
            "success"
          );
        } catch (error) {
          Swal.fire(
            "Error",
            "Hubo un problema al eliminar la sucursal.",
            "error"
          );
          console.error("Error al eliminar la sucursal:", error);
        }
      }
    });
  };

  const onEdit = async (row: RowData) => {
    try {
      const branchData = await getBranchById(row.id);

      if (!branchData) {
        Swal.fire("Error", "No se encontró la sucursal.", "error");
        return;
      }

      setBranchDescription(branchData.descripcion || "");
      setBranchAddress(branchData.direccion || "");
      setBranchContact(branchData.numeros_contacto || "");
      setBranchStatus(branchData.activo === 1 ? "Activo" : "Inactivo");
      setSelectedBranchId(branchData.id);
      setBranchSchedule(branchData.horarios || "");
      setLatitud(branchData.latitud || "-12.046309176843495");
      setLongitud(branchData.longitud || "-77.04274243266966");
      setLogo(branchData.imagen || null);

      setDistrito(branchData.distrito || "");
      await delay(100);

      setSelectedCategory(branchData.categories?.[0]?.id || null);
      await delay(100);

      setSelectedSubcategory(branchData.subcategories?.[0]?.id || null);

      setShowBranchForm(true);
      setIsBranchEditing(true);
    } catch (error) {
      console.error("Error al cargar los datos de la sucursal:", error);
      Swal.fire(
        "Error",
        "No se pudo cargar los datos de la sucursal.",
        "error"
      );
    }
  };

  const initializeForm = () => {
    setBranchDescription("");
    setBranchAddress("");
    setBranchStatus("Activo");
    setBranchContact("");
    setBranchSchedule("");
    setSelectedBranchId(null);
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setIsBranchEditing(false);
    setLogo(null);
    setDepartamento("");
    setProvincia("");
    setDistrito("");

    setLatitud("");
    setLongitud("");
  };

  const getSaveButtonClass = () => {
    if (isLoading) return "bg-gray-400 text-white cursor-not-allowed";
    return "bg-primary text-gray hover:bg-opacity-90";
  };

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const onProd = (row: RowData) => {
    setSelectedBranchId(row.id);
    setSelectedBranchName(row.item);
    setSelectedBranchAddress(row.address);
    setIsProductView(true);
  };
  const onSur = (row: RowData) => {
    setSelectedBranchId(row.id);
    setSelectedBranchName(row.item);
    setIsSurveysView(true);
  };
  const onStud = (row: RowData) => {
    setSelectedBranchId(row.id);
    setSelectedBranchName(row.item);
    setIsStudiesView(true);
  };
  const handleBackToTrade = () => {
    setIsProductView(false);
    setIsSurveysView(false);
    setIsStudiesView(false);
    fetchBranches();
  };

  const columns: Column[] = [
    {
      Header: "Acciones",
      Cell: (row: RowData) => (
        <div className="flex space-x-2">
          <button
            title="Encuestas"
            className="relative pl-1.5 bg-[#81C784] text-slate-50 flex items-center rounded-lg group overflow-hidden transition-all duration-500 ease-in-out w-[2rem] hover:w-[7rem]"
            onClick={() => onSur(row)}
          >
            <Icon
              icon="wpf:survey"
              className="flex-shrink-0"
              width="20"
              height="20"
            />
            <span className="ml-0 opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 group-hover:ml-2 transition-all duration-500 ease-in-out delay-100">
              Encuestas
            </span>
          </button>

          <button
            title="Encuestas"
            className="relative pl-1.5 bg-[#9575CD] text-slate-50 flex items-center rounded-lg group overflow-hidden transition-all duration-500 ease-in-out w-[2rem] hover:w-[9rem]"
            onClick={() => onStud(row)}
          >
            <img
              src={iconEstuMercado}
              alt="Estudios de Mercado"
              className="flex-shrink-0 w-5 h-5"
            />
            <span className="ml-0 opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 group-hover:ml-2 transition-all duration-500 ease-in-out delay-100 whitespace-nowrap">
              E. de mercado
            </span>
          </button>

          <button
            title="Productos"
            className="relative pl-1.5  bg-[#64B5F6] text-slate-50 flex items-center rounded-lg group overflow-hidden transition-all duration-500 ease-in-out w-[2rem] hover:w-[7rem]"
            onClick={() => onProd(row)}
          >
            <Icon
              icon="dashicons:products"
              className="flex-shrink-0"
              width="20"
              height="20"
            />
            <span className="ml-0 opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 group-hover:ml-2 transition-all duration-500 ease-in-out delay-100">
              Productos
            </span>
          </button>

          <button
            className="relative p-2 bg-blue-500 text-slate-50 flex items-center rounded-lg group overflow-hidden transition-all duration-500 ease-in-out w-[2rem] hover:w-[5rem]"
            onClick={() => onEdit(row)}
          >
            <i className="far fa-edit"></i>
            <span className="ml-0 opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 group-hover:ml-2 transition-all duration-500 ease-in-out delay-100">
              Editar
            </span>
          </button>

          <button
            className="relative p-2 bg-red-500 text-slate-50 flex items-center rounded-lg group overflow-hidden transition-all duration-500 ease-in-out w-[2rem] hover:w-[6rem]"
            onClick={() => onDelete(row)}
          >
            <i className="far fa-trash-alt"></i>
            <span className="ml-0 opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 group-hover:ml-2 transition-all duration-500 ease-in-out delay-100">
              Eliminar
            </span>
          </button>
        </div>
      ),
    },
    { Header: "Descripción", accessor: "item" as keyof RowData },
    { Header: "Dirección", accessor: "address" as keyof RowData },
    { Header: "Contacto", accessor: "contact" as keyof RowData },
    {
      Header: "Estado",
      accessor: "status" as keyof RowData,
      Cell: (row: RowData) => (
        <span
          className={
            row.status === "Activo"
              ? "text-white bg-green-500 px-3 py-1 rounded-md"
              : "text-white bg-red-500 px-3 py-1 rounded-md"
          }
        >
          {row.status}
        </span>
      ),
    },
  ];

  const handleLocationSelect = async (lat: string, lng: string) => {
    setBranchCoordinates({ lat, long: lng });
    setLatitud(lat);
    setLongitud(lng);

    try {
      const geocoder = new google.maps.Geocoder();
      const latlng = { lat: parseFloat(lat), lng: parseFloat(lng) };

      const response = await geocoder.geocode({ location: latlng });

      if (response.results[0]) {
        // Limpiar la dirección eliminando el código plus
        const fullAddress = response.results[0].formatted_address;
        const cleanAddress = fullAddress.replace(
          /^[A-Z0-9]+\+[A-Z0-9]+,\s*/,
          ""
        );

        setBranchAddress(cleanAddress);
      }
    } catch (error) {
      console.error("Error al obtener la dirección:", error);
    }
  };

  const onButtonClick = () => {
    initializeForm();
    setShowBranchForm(true);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (!input.startsWith("+51")) {
      setBranchContact("+51" + input.replace(/^\+?51/, ""));
    } else {
      setBranchContact(input);
    }
  };

  return (
    <>
      {showBranchForm && (
        // Contenedor principal
        <div className="shadow-xl p-4 sm:p-6 md:p-8 rounded-lg container mx-auto bg-white-translucent dark:bg-boxdark">
          <div className="flex flex-col">
            {/* Header del formulario */}
            <div className="flex items-center gap-2 sm:gap-4">
              <i
                className="fas fa-chevron-left text-white bg-[#1c2434] p-2 rounded-full flex items-center justify-center w-8 h-8 cursor-pointer"
                onClick={() => setShowBranchForm(false)}
              ></i>
              <label className="text-sm sm:text-base md:text-title-md2 font-semibold text-black dark:text-white">
                {isBranchEditing
                  ? `Editar Sucursal de: ${selectedCompanyName}`
                  : `Agregar Sucursal a: ${selectedCompanyName}`}
              </label>
            </div>

            {/* Contenedor de campos */}
            <div className="flex flex-col mt-4 space-y-4">
              {/* Campos básicos */}
              <label className="block">
                <span className="block text-sm font-medium mb-1">
                  Nombre o Descripción *
                </span>
                <input
                  className="w-full rounded border border-stroke py-2 sm:py-3 px-4 sm:pl-3.5 sm:pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white text-sm sm:text-base"
                  value={branchDescription}
                  onChange={(e) => setBranchDescription(e.target.value)}
                />
              </label>

              <label className="hidden">
                <span className="block text-sm font-medium mb-1">
                  Dirección *
                </span>
                <input
                  className="w-full rounded border border-stroke py-2 sm:py-3 px-4 sm:pl-3.5 sm:pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white text-sm sm:text-base"
                  value={branchAddress}
                  onChange={(e) => setBranchAddress(e.target.value)}
                />
              </label>

              {/* Grupo de categorías */}
              <div className="w-full flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/2">
                  <label className="block text-sm font-medium mb-1">
                    Categoría:
                  </label>
                  <select
                    value={selectedCategory || ""}
                    className="w-full rounded border border-stroke py-2 sm:py-3 px-4 sm:pl-3.5 sm:pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white text-sm sm:text-base"
                    onChange={(e) =>
                      setSelectedCategory(parseInt(e.target.value))
                    }
                  >
                    <option value="">Seleccionar categoría</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.titulo}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full sm:w-1/2">
                  <label className="block text-sm font-medium mb-1">
                    Subcategoría:
                  </label>
                  <select
                    value={selectedSubcategory || ""}
                    className={`w-full rounded border border-stroke py-2 sm:py-3 px-4 sm:pl-3.5 sm:pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white text-sm sm:text-base ${
                      selectedCategory ? "text-black" : "text-gray-400"
                    }`}
                    onChange={(e) =>
                      setSelectedSubcategory(parseInt(e.target.value))
                    }
                    disabled={!selectedCategory}
                  >
                    <option value="">Seleccionar subcategoría</option>
                    {subcategories.map((subcategory) => (
                      <option key={subcategory.id} value={subcategory.id}>
                        {subcategory.descripcion}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Grupo de contacto y horarios */}
              <div className="w-full flex flex-col sm:flex-row gap-4">
                <label className="w-full sm:w-1/2">
                  <span className="block text-sm font-medium mb-1">
                    Contacto
                  </span>
                  <input
                    type="tel"
                    placeholder="Número de teléfono"
                    className="w-full rounded border border-stroke py-2 sm:py-3 px-4 sm:pl-3.5 sm:pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white text-sm sm:text-base"
                    value={branchContact}
                    onChange={handlePhoneChange}
                  />
                </label>
                <label className="w-full sm:w-1/2">
                  <span className="block text-sm font-medium mb-1">
                    Horarios
                  </span>
                  <input
                    className="w-full rounded border border-stroke py-2 sm:py-3 px-4 sm:pl-3.5 sm:pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white text-sm sm:text-base"
                    value={branchSchedule}
                    placeholder="Lun - Vie / 8:00 - 20:00"
                    onChange={(e) => setBranchSchedule(e.target.value)}
                  />
                </label>
              </div>

              {/* Estado */}
              <select
                className="w-full rounded border border-stroke py-2 sm:py-3 px-4 sm:pl-3.5 sm:pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white text-sm sm:text-base"
                value={branchStatus === "Activo" ? "1" : "0"}
                onChange={(e) => {
                  console.log("Valor seleccionado:", e.target.value);
                  setBranchStatus(
                    e.target.value === "1" ? "Activo" : "Inactivo"
                  );
                }}
              >
                <option value="1">Activo</option>
                <option value="0">Inactivo</option>
              </select>
              {/* Grupo de ubicación y logo */}
              <div className="w-full flex flex-col lg:flex-row gap-4">
                <div className="w-full lg:w-1/2 flex flex-col">
                  <label className="block text-sm font-medium mb-3">
                    Dirección de la Sucursal
                  </label>
                  <LocationPicker
                    onSelectLocation={handleLocationSelect}
                    initialCoordinates={{
                      lat: parseFloat(latitud) || -12.046309176843495,
                      lng: parseFloat(longitud) || -77.04274243266966,
                    }}
                  />
                </div>

                <div className="w-full lg:w-1/2 flex flex-col">
                  <label className="block text-sm font-medium mb-3">
                    Logo de la Empresa
                  </label>
                  <Uploader
                    onFileSelect={(file) => setLogo(file)}
                    accept="image/jpeg, image/jpg, image/png"
                    maxSize={10 * 1024 * 1024}
                    label="Sube tu logo aquí"
                    initialPreview={typeof logo === "string" ? logo : undefined}
                    className="w-full rounded border border-stroke py-3 px-4 text-black dark:text-white dark:border-strokedark dark:bg-boxdark focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3 sm:gap-4.5">
            <button
              className="w-full sm:w-auto text-[#3c50e0] border-[#3c50e0] rounded border py-2 px-4 sm:px-6 font-medium text-sm sm:text-base"
              onClick={() => setShowBranchForm(false)}
            >
              Cancelar
            </button>
            <button
              onClick={saveOrUpdateBranch}
              className={`w-full sm:w-auto rounded py-2 px-4 sm:px-6 font-medium text-sm sm:text-base ${getSaveButtonClass()}`}
              disabled={isLoading}
              aria-label={
                isBranchEditing ? "Actualizar sucursal" : "Guardar sucursal"
              }
            >
              {isLoading ? (
                <LoadingDots />
              ) : isBranchEditing ? (
                "Actualizar"
              ) : (
                "Guardar"
              )}
            </button>
          </div>
        </div>
      )}
      {!showBranchForm &&
        !isProductView &&
        !isSurveysView &&
        !isStudiesView && (
          <div className="container mx-auto my-8">
            <TablaItem
              data={data}
              columns={columns}
              title={`Sucursales de ${selectedCompanyName}`}
              buttonLabel="Agregar Sucursal"
              onButtonClick={onButtonClick}
              newButtonLabel="Importar"
              showBackButton={true}
              onBackClick={onBackClick}
            />
          </div>
        )}
      {isProductView && (
        <ProductsCommerce
          selectedBranchName={selectedBranchName}
          branchId={selectedBranchId}
          branchAddress={selectedBranchAddress}
          onBackClick={handleBackToTrade}
          inheritedCategory={selectedCategory}
          inheritedSubcategory={selectedSubcategory}
        />
      )}
      {isSurveysView && (
        <SurveysCommerce
          selectedBranchName={selectedBranchName}
          branchId={selectedBranchId}
          branchAddress={selectedBranchAddress}
          onBackClick={handleBackToTrade}
        />
      )}
      {isStudiesView && (
        <StudiesCommerce
          selectedBranchName={selectedBranchName}
          branchId={selectedBranchId}
          branchAddress={selectedBranchAddress}
          onBackClick={handleBackToTrade}
        />
      )}
    </>
  );
}

export default BranchCommerce;
