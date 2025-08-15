import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";
import LocationPicker from "../../../../shared/components/Organisms/LocationPicker/LocationPicker";
import Uploader from "../../../../shared/components/Atoms/Uploader";
import { LoadingDots } from "../../../../shared/components/Atoms/LoadingDots/LoadingDots";
import iconEstuMercado from "../../../../assets/svg/iconEstudiosMercados.svg";
import iconPromotions from "../../../../assets/svg/iconPromocionesSmart.svg";
import {
  createBranch,
  getBranchById,
  getBranchesByCompanyId,
  getCategories,
  getSubcategoriesByCategoryId,
  updateBranch,
  checkBranchLimit,
} from "../../../../core/services/Operador/Branch/BranchService";
import ProductsCommerce from "./GestionProductos/ProductsCommerce";
import SurveysCommerce from "./GestionEncuestas/SurveysCommerce";
import { branchValidations } from "./BranchValidations";
import StudiesCommerce from "./GestionEstudiosMercado/StudiesCommerce";
import { HelperService } from "../../../../core/services/HelperService";
import PromotionsCommerce from "./GestionPromociones/PromotionsCommerce";
import { ChevronLeft } from "lucide-react";
import "./BranchCommerce.css";

interface RowData {
  id: string;
  uuid: string;
  item: string;
  address: string;
  contact: string;
  status: string;
  departamento?: string;
  provincia?: string;
  distrito?: string;
  horarios?: string;
  latitud?: string;
  longitud?: string;
}

interface BranchProps {
  selectedCompanyId: string | null;
  selectedCompanyName: string | null;
  onBackClick?: () => void;
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
  const [, setBranchCoordinates] = useState({ lat: "", long: "" });
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
  const [isPromotionsView, setIsPromotionsView] = useState(false);
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
  const [canCreateBranch, setCanCreateBranch] = useState(true);
  const [isNewImageSelected, setIsNewImageSelected] = useState(false);
  const [isFlipped, setIsFlipped] = useState<{ [key: string]: boolean }>({});

  const handleFlip = (id: string) => {
    setIsFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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

  useEffect(() => {
    const checkBranchCreationLimit = async () => {
      try {
        const limitData = await checkBranchLimit();
        setCanCreateBranch(limitData.can_create || true);
      } catch (error) {
        console.error("Error al verificar límite de sucursales:", error);
        setCanCreateBranch(true);
      }
    };

    if (selectedCompanyId) {
      checkBranchCreationLimit();
    }
  }, [selectedCompanyId]);

  const encryptedCompanyId = HelperService.getCompanyId() || "";

  const fetchBranches = async () => {
    setIsLoading(true);
    try {
      const branches = await getBranchesByCompanyId(encryptedCompanyId);
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
        id: branch.uuid,
        uuid: branch.uuid,
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

    const errors = Object.values(validationErrors).filter(
      (error) => error !== undefined
    );

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
    if (!isBranchEditing && !canCreateBranch) {
      Swal.fire({
        icon: "warning",
        title: "Límite de sucursales alcanzado",
        text: "Has alcanzado el límite de sucursales para tu plan actual. Actualiza tu membresía para crear más sucursales.",
        confirmButtonText: "Entendido",
      });
      return;
    }

    if (!validateBranchForm()) return;
    setIsLoading(true);
    try {
      const formData = new FormData();

      formData.append("descripcion", branchDescription);
      formData.append("direccion", branchAddress);
      formData.append("numeros_contacto", branchContact);
      formData.append("horarios", branchSchedule);
      formData.append("latitud", latitud);
      formData.append("longitud", longitud);

      if (departamento) formData.append("departamento", departamento);
      if (provincia) formData.append("provincia", provincia);
      if (distrito) formData.append("distrito", distrito);

      if (selectedCategory)
        formData.append("category_id", selectedCategory.toString());
      if (selectedSubcategory)
        formData.append("subcategory_id", selectedSubcategory.toString());

      if (!isBranchEditing) {
        formData.append("company_id", encryptedCompanyId);
        formData.append("activo", branchStatus === "Activo" ? "1" : "0");
        if (typeof likes !== "undefined")
          formData.append("likes", likes.toString());
        if (typeof rating !== "undefined")
          formData.append("rating", rating.toString());

        if (logo && logo instanceof File) {
          formData.append("imagen", logo);
        } else {
          throw new Error("Debes seleccionar una imagen para la sucursal");
        }
      } else {
        if (isNewImageSelected && logo instanceof File) {
          formData.append("imagen", logo);
        }
      }

      try {
        if (isBranchEditing && selectedBranchId) {
          formData.append("branch_id", selectedBranchId);

          console.log("Enviando datos para actualización:");
          for (let [key, value] of formData.entries()) {
            console.log(
              `${key}: ${
                value instanceof File ? "Archivo: " + value.name : value
              }`
            );
          }

          const updateResponse = await updateBranch(selectedBranchId, formData);

          if (updateResponse.status === "success" || updateResponse.success) {
            Swal.fire({
              icon: "success",
              title: "¡Actualizado!",
              text:
                updateResponse.message ||
                "La sucursal fue actualizada correctamente.",
              confirmButtonText: "Aceptar",
            });
          } else {
            throw new Error(
              updateResponse.message || "Error al actualizar la sucursal"
            );
          }
        } else {
          const createResponse = await createBranch(formData);
          if (createResponse.success || createResponse.status === "success") {
            Swal.fire({
              icon: "success",
              title: "¡Creado!",
              text:
                createResponse.message ||
                "La sucursal fue creada correctamente.",
              confirmButtonText: "Aceptar",
            });
          } else {
            throw new Error(
              createResponse.message || "Error al crear la sucursal"
            );
          }
        }

        await fetchBranches();
        setShowBranchForm(false);
      } catch (updateCreateError: any) {
        console.error("Update/Create Error:", updateCreateError);
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            updateCreateError.message ||
            "Hubo un problema al guardar la sucursal.",
        });
      }
    } catch (error: any) {
      console.error("General Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Hubo un problema al guardar la sucursal.",
      });
    } finally {
      setIsLoading(false);
    }
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
      setSelectedBranchId(branchData.uuid);
      setBranchSchedule(branchData.horarios || "");
      setLatitud(branchData.latitud || "-12.046309176843495");
      setLongitud(branchData.longitud || "-77.04274243266966");
      setLogo(branchData.imagen || null);
      setIsNewImageSelected(false);
      setDistrito(branchData.distrito || "");
      await delay(100);

      if (branchData.category_id) {
        setSelectedCategory(branchData.category_id);
      } else if (branchData.categories && branchData.categories.length > 0) {
        setSelectedCategory(branchData.categories[0]?.id || null);
      }

      await delay(100);

      if (branchData.subcategory_id) {
        setSelectedSubcategory(branchData.subcategory_id);
      } else if (
        branchData.subcategories &&
        branchData.subcategories.length > 0
      ) {
        setSelectedSubcategory(branchData.subcategories[0]?.id || null);
      }

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
    setBranchContact("+51");
    setBranchSchedule("");
    setSelectedBranchId(null);
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setIsBranchEditing(false);
    setLogo(null);
    setIsNewImageSelected(false);
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

  const onProd = async (row: RowData) => {
    try {
      const branchData = await getBranchById(row.id);
      if (!branchData) {
        Swal.fire("Error", "No se encontró la sucursal.", "error");
        return;
      }

      if (branchData.category_id) {
        setSelectedCategory(branchData.category_id);
      } else if (branchData.categories && branchData.categories.length > 0) {
        setSelectedCategory(branchData.categories[0]?.id || null);
      } else {
        setSelectedCategory(null);
      }

      if (branchData.subcategory_id) {
        setSelectedSubcategory(branchData.subcategory_id);
      } else if (
        branchData.subcategories &&
        branchData.subcategories.length > 0
      ) {
        setSelectedSubcategory(branchData.subcategories[0]?.id || null);
      } else {
        setSelectedSubcategory(null);
      }

      setSelectedBranchId(row.id);
      setSelectedBranchName(row.item);
      setSelectedBranchAddress(row.address);
      setIsProductView(true);
    } catch (error) {
      console.error("Error al cargar los datos de la sucursal:", error);
      Swal.fire(
        "Error",
        "No se pudo cargar los datos de la sucursal.",
        "error"
      );
    }
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

  const onPro = (row: RowData) => {
    setSelectedBranchId(row.id);
    setSelectedBranchName(row.item);
    setSelectedBranchAddress(row.address);
    setLatitud(row.latitud || "");
    setLongitud(row.longitud || "");
    setIsPromotionsView(true);
  };

  const handleBackToTrade = () => {
    setIsProductView(false);
    setIsSurveysView(false);
    setIsStudiesView(false);
    setIsPromotionsView(false);
    fetchBranches();
  };

  const handleLocationSelect = async (lat: string, lng: string) => {
    setBranchCoordinates({ lat, long: lng });
    setLatitud(lat);
    setLongitud(lng);

    try {
      const geocoder = new google.maps.Geocoder();
      const latlng = { lat: parseFloat(lat), lng: parseFloat(lng) };
      const response = await geocoder.geocode({ location: latlng });

      if (response.results[0]) {
        const fullAddress = response.results[0].formatted_address;
        const cleanAddress = fullAddress.replace(
          /^[A-Z0-9]+\+[A-Z0-9]+,\s*/,
          ""
        );
        setBranchAddress(cleanAddress);
      } else {
        Swal.fire({
          icon: "warning",
          title: "Dirección no encontrada",
          text: "No se pudo obtener una dirección válida para las coordenadas seleccionadas.",
        });
        setBranchAddress("");
      }
    } catch (error) {
      console.error("Error al obtener la dirección:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo conectar con el servicio de geolocalización.",
      });
      setBranchAddress("");
    }
  };

  const onButtonClick = () => {
    if (!canCreateBranch) {
      Swal.fire({
        icon: "warning",
        title: "Límite de sucursales alcanzado",
        text: "Has alcanzado el límite de sucursales para tu plan actual. Actualiza tu membresía para crear más sucursales.",
        confirmButtonText: "Entendido",
      });
      return;
    }

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
      <style>
        {`
          .perspective-1000 {
            perspective: 1000px;
          }
          .transform-style-3d {
            transform-style: preserve-3d;
            transition: transform 0.5s;
          }
          .backface-hidden {
            backface-visibility: hidden;
          }
          .flip {
            transform: rotateY(180deg);
          }
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
        `}
      </style>
      {showBranchForm && (
        <div className="shadow-xl p-4 sm:p-6 md:p-8 rounded-lg container mx-auto bg-white-translucent dark:bg-boxdark">
          <div className="flex flex-col">
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

            <div className="flex flex-col mt-4 space-y-4">
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
                    onFileSelect={(file) => {
                      setLogo(file);
                      setIsNewImageSelected(true);
                    }}
                    accept="image/jpeg, image/jpg, image/png"
                    maxSize={100 * 1024 * 1024}
                    label="Sube tu logo aquí"
                    initialPreview={typeof logo === "string" ? logo : undefined}
                    className="w-full rounded border border-stroke py-3 px-4 text-black dark:text-white dark:border-strokedark dark:bg-boxdark focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </div>

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
        !isStudiesView &&
        !isPromotionsView && (
          <div className="p-4 sm:p-6 md:p-8 rounded-lg bg-white-translucent dark:bg-boxdark">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
                  {`Sucursales de ${selectedCompanyName}`}
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onButtonClick}
                  className="px-4 py-2 bg-primary dark:bg-blue-600 text-white rounded font-medium hover:bg-opacity-90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!canCreateBranch}
                >
                  Agregar Sucursal
                </button>
              </div>
            </div>

            {/* No Data or Loading State */}
            {data.length === 0 && !isLoading && (
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-100 dark:border-gray-800 text-center">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No hay sucursales disponibles para mostrar.
                </p>
              </div>
            )}
            {isLoading ? (
              <div className="text-center py-10">
                <LoadingDots />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.map((row) => (
                  <div
                    key={row.id}
                    className="p-4 sm:p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm transform transition-all duration-300"
                  >
                    <div
                      className={`relative w-full min-h-[300px] perspective-1000 transform-style-3d ${
                        isFlipped[row.id] ? "flip" : ""
                      }`}
                    >
                      {/* Cara frontal */}
                      <div className="absolute w-full h-full backface-hidden">
                        <div className="flex items-center justify-between mb-4 min-h-[60px]">
                          <div className="flex items-center w-full">
                            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mr-4 min-w-[48px]">
                              <Icon
                                icon="mdi:store"
                                className="text-blue-500 dark:text-blue-400"
                                width="24"
                                height="24"
                              />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white line-clamp-2 break-words">
                              {row.item}
                            </h3>
                          </div>
                          <div className="flex items-center min-w-[40px]">
                            <button
                              onClick={() => onEdit(row)}
                              className="flex items-center justify-center w-8 h-8 bg-gray-400 dark:bg-gray-700 rounded-lg transition-all duration-300 hover:bg-[#3B82F6] dark:hover:bg-[#3B82F6]"
                              aria-label="Editar"
                            >
                              <Icon
                                icon="fa:edit"
                                className="text-white"
                                width="16"
                                height="16"
                              />
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 truncate overflow-hidden whitespace-nowrap">
                          Dirección:
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mb-3 truncate overflow-hidden whitespace-nowrap">
                          {row.address}
                        </p>

                        <p className="text-gray-600 dark:text-gray-300 mb-3">
                          Contacto: {row.contact}
                        </p>
                        <span
                          className={
                            row.status === "Activo"
                              ? "inline-block bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium"
                              : "inline-block bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 px-3 py-1 rounded-full text-sm font-medium"
                          }
                        >
                          {row.status}
                        </span>
                        <div
                          onClick={() => handleFlip(row.id)}
                          className="flex justify-start mb-4 mt-4 w-full cursor-pointer p-[10px] pulso pulse-glow"
                        >
                          <span className="bg-blue-500 font-medium dark:bg-blue-600 text-white text-base w-full text-center cursor-pointer ">
                            Mis Herramientas Smart
                          </span>
                        </div>
                      </div>

                      {/* Cara trasera */}
                      <div className="absolute w-full h-full backface-hidden rotate-y-180">
                        <div className="flex flex-col items-center justify-center h-full p-4 rounded-lg">
                          <div className="grid grid-cols-2 gap-4 w-full">
                            <button
                              onClick={() => onSur(row)}
                              className="flex flex-col items-center bg-white dark:bg-gray-700 rounded-lg p-3 transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                              aria-label="Encuestas"
                            >
                              <div className="w-10 h-10 flex items-center justify-center bg-[#81C784] rounded-full">
                                <Icon
                                  icon="wpf:survey"
                                  className="text-white"
                                  width="20"
                                  height="20"
                                />
                              </div>
                              <span className="mt-2 text-xs text-gray-900 dark:text-gray-100 font-medium text-center">
                                Encuestas
                              </span>
                            </button>
                            <button
                              onClick={() => onStud(row)}
                              className="flex flex-col items-center bg-white dark:bg-gray-700 rounded-lg p-3 transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                              aria-label="Estudios de Mercado"
                            >
                              <div className="w-10 h-10 flex items-center justify-center bg-[#9575CD] rounded-full">
                                <img
                                  src={iconEstuMercado}
                                  alt="Estudios de Mercado"
                                  className="w-5 h-5"
                                />
                              </div>
                              <span className="mt-2 text-xs text-gray-900 dark:text-gray-100 font-medium text-center">
                                E. Mercado
                              </span>
                            </button>
                            <button
                              onClick={() => onPro(row)}
                              className="hidden flex-col items-center bg-white dark:bg-gray-700 rounded-lg p-3 transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                              aria-label="Promociones Smart"
                            >
                              <div className="w-10 h-10 flex items-center justify-center bg-[#b375cd] rounded-full">
                                <img
                                  src={iconPromotions}
                                  alt="Promociones Smart"
                                  className="w-5 h-5"
                                />
                              </div>
                              <span className="mt-2 text-xs text-gray-900 dark:text-gray-100 font-medium text-center">
                                Promociones
                              </span>
                            </button>
                            <button
                              onClick={() => onProd(row)}
                              className="flex flex-col items-center bg-white dark:bg-gray-700 rounded-lg p-3 transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                              aria-label="Productos"
                            >
                              <div className="w-10 h-10 flex items-center justify-center bg-[#64B5F6] rounded-full">
                                <Icon
                                  icon="dashicons:products"
                                  className="text-white"
                                  width="20"
                                  height="20"
                                />
                              </div>
                              <span className="mt-2 text-xs text-gray-900 dark:text-gray-100 font-medium text-center">
                                Productos
                              </span>
                            </button>
                          </div>
                          <button
                            onClick={() => handleFlip(row.id)}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                          >
                            Volver
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {onBackClick && (
              <div className="mt-6 flex justify-start">
                <button
                  onClick={onBackClick}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-blue-500 dark:text-blue-400 border border-blue-500 dark:border-blue-400 rounded font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-300"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Volver</span>
                </button>
                <i
                  className="fas fa-chevron-left text-white bg-[#1c2434] p-2 rounded-full flex items-center justify-center w-8 h-8 cursor-pointer"
                  onClick={onBackClick}
                  aria-label="Volver"
                ></i>
              </div>
            )}
          </div>
        )}
      {isProductView && (
        <ProductsCommerce
          selectedBranchName={selectedBranchName} //sucursal
          branchId={selectedBranchId} // branch_id
          branchAddress={selectedBranchAddress} //direccion
          inheritedCategory={selectedCategory}
          inheritedSubcategory={selectedSubcategory}
          onBackClick={handleBackToTrade}
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
      {isPromotionsView && (
        <PromotionsCommerce
          selectedBranchName={selectedBranchName}
          branchId={selectedBranchId}
          branchAddress={selectedBranchAddress}
          onBackClick={handleBackToTrade}
          latitud={latitud}
          longitud={longitud}
        />
      )}
    </>
  );
}

export default BranchCommerce;
