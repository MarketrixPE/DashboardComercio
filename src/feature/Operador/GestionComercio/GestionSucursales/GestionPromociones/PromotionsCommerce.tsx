import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { LoadingDots } from "../../../../../shared/components/Atoms/LoadingDots/LoadingDots";
import TablaItem, {
  RowData,
  Column,
} from "../../../../../shared/components/Molecules/TablaItem/TablaItem";
import { Icon } from "@iconify/react/dist/iconify.js";
import Uploader from "../../../../../shared/components/Atoms/Uploader";
import {
  getPromotionsByBranch,
  createPromotion,
  getPromotionById,
  getNearbyCustumers,
  sendPromotion,
  getSegmentedNearbyCustumers,
  sendSegmentedPromotion,
} from "../../../../../core/services/Operador/Promotions/PromotionsService";
import {
  NearbyCustomer,
  DistritoData,
} from "../../../../../core/services/Operador/Promotions/Promotions";
import {
  DEPARTAMENTOS,
  DISTRITOS,
  PROVINCIAS,
} from "../../../../../core/models/ubigueo/ubigeo";
import CascadingLocationDropdown from "../../../../../shared/components/Organisms/CascadingLocationDropdown/CascadingLocationDropdown";
import { promotionsValidations } from "./promotionsValidations";

interface PromotionsProps {
  branchId: string | null;
  selectedBranchName: string;
  branchAddress: string;
  onBackClick?: () => void;
  latitud?: string;
  longitud?: string;
}

interface LocationCoords {
  latitud: number;
  longitud: number;
}

export interface PromotionDetailsState {
  titulo: string;
  descripcion: string;
  branch_id: string;
  imagen: string;
  latitud: string | number;
  longitud: string | number;
  promocionType: "basica" | "segmentada";
  age_start: number | null;
  age_end: number | null;
  gender: string | null;
  district: string | null;
}

function PromotionsCommerce({
  onBackClick,
  branchId,
  branchAddress,
  selectedBranchName,
  latitud,
  longitud,
}: PromotionsProps) {
  const [data, setData] = useState<RowData[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nearbyCustumers, setNearbyCustumers] = useState<NearbyCustomer[]>([]);
  const [showNearbyCustumersModal, setShowNearbyCustumersModal] =
    useState<boolean>(false);
  const [, setCurrentPromotionId] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [promotionDetails, setPromotionDetails] =
    useState<PromotionDetailsState>({
      titulo: "",
      descripcion: "",
      branch_id: "",
      imagen: "",
      latitud: "",
      longitud: "",
      promocionType: "basica",
      age_start: null,
      age_end: null,
      gender: null,
      district: null,
    });

  // Estados para manejar la selección de ubicación
  const [selectedDepartamento, setSelectedDepartamento] = useState<
    number | null
  >(null);
  const [selectedProvincia, setSelectedProvincia] = useState<number | null>(
    null
  );
  const [selectedDistritos, setSelectedDistritos] = useState<number[]>([]);

  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [selectedPromotion, setSelectedPromotion] = useState<any>(null);

  // Manejadores para los cambios de ubicación
  const handleDepartamentoChange = (id: number) => {
    setSelectedDepartamento(id);
    setSelectedProvincia(null);
    setSelectedDistritos([]);
    setPromotionDetails((prev) => ({ ...prev, district: null }));
  };

  const handleProvinciaChange = (id: number) => {
    setSelectedProvincia(id);
    setSelectedDistritos([]);
    setPromotionDetails((prev) => ({ ...prev, district: null }));
  };

  const handleDistritosChange = (ids: number[]) => {
    setSelectedDistritos(ids);
    // Convertir los IDs de distritos a una cadena separada por comas
    const districtString = ids.length > 0 ? ids.join(",") : null;
    setPromotionDetails((prev) => ({
      ...prev,
      district: districtString,
    }));
  };

  const fetchPromotions = async (): Promise<void> => {
    if (!branchId) {
      Swal.fire("Error", "No se ha seleccionado una sucursal válida.", "error");
      return;
    }

    setIsLoading(true);
    try {
      const response = await getPromotionsByBranch(branchId);

      if (response.length === 0) {
        Swal.fire({
          icon: "info",
          title: "No hay promociones",
          text: "No hay promociones disponibles para mostrar.",
        });
      }

      const formattedData = response.map((promotion) => ({
        id: promotion.id,
        titulo: promotion.titulo || "Sin título",
        descripcion: promotion.descripcion || "Sin descripción",
        sucursal: promotion.branch_id,
        created_at: promotion.created_at || new Date().toISOString(),
        imagen: promotion.imagen || "",
      }));

      setData(formattedData);
    } catch (error) {
      console.error("Error fetching promotions:", error);
      Swal.fire("Error", "No se pudieron cargar las promociones.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const getLocationCoords = (): LocationCoords => {
    if (latitud && longitud) {
      return {
        latitud: parseFloat(latitud),
        longitud: parseFloat(longitud),
      };
    }

    return {
      latitud: 0,
      longitud: 0,
    };
  };

  const createPromotionOnly = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("titulo", promotionDetails.titulo);
      formData.append("descripcion", promotionDetails.descripcion);
      formData.append("branch_id", branchId as string);
      formData.append("imagen", selectedImage as File);

      const response = await createPromotion(formData);

      if (response && response.data) {
        Swal.fire("Éxito", "Promoción creada correctamente.", "success");
        clearForm();
        setShowForm(false);
        fetchPromotions();
      }
    } catch (error: any) {
      Swal.fire(
        "Error",
        error.message || "No se pudo crear la promoción.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const processDistricts = (districts: DistritoData[]): string => {
    if (!districts || districts.length === 0) {
      return "Sin información de distritos";
    }

    const districtMap: { [key: string]: { nombre: string; total: number } } =
      {};

    districts.forEach((district) => {
      const id = district.distrito_id.toString();
      const nombre = district.distrito_nombre;

      if (!districtMap[id]) {
        districtMap[id] = { nombre, total: 0 };
      }
      districtMap[id].total += district.usuarios;
    });

    const result = Object.values(districtMap)
      .map((info) => `${info.nombre} (${info.total})`)
      .join(", ");

    return result;
  };

  const handleSubmit = async (): Promise<void> => {
    if (!branchId) {
      Swal.fire("Error", "No se ha seleccionado una sucursal válida.", "error");
      return;
    }

    // Validar los datos antes de proceder
    const validationError = promotionsValidations.validatePromotion(
      promotionDetails,
      selectedImage,
      selectedDistritos
    );
    if (validationError) {
      Swal.fire("Error", validationError, "warning");
      return;
    }

    setIsLoading(true);
    try {
      // Preparar datos básicos de la promoción
      const formData = new FormData();
      formData.append("titulo", promotionDetails.titulo);
      formData.append("descripcion", promotionDetails.descripcion);
      formData.append("branch_id", branchId as string);
      formData.append("imagen", selectedImage as File);
      formData.append("type", promotionDetails.promocionType);

      if (promotionDetails.promocionType === "basica") {
        const location = getLocationCoords();
        setPromotionDetails((prev) => ({
          ...prev,
          branch_id: branchId,
          latitud: location.latitud,
          longitud: location.longitud,
        }));

        // Buscar usuarios cercanos
        const nearbyCustumersResponse = await getNearbyCustumers(
          location.latitud,
          location.longitud
        );

        if (
          nearbyCustumersResponse &&
          nearbyCustumersResponse.data &&
          Array.isArray(nearbyCustumersResponse.data) &&
          nearbyCustumersResponse.data.length > 0
        ) {
          setNearbyCustumers(nearbyCustumersResponse.data);
          setShowNearbyCustumersModal(true);
        } else {
          Swal.fire({
            icon: "info",
            title: "Sin usuarios cercanos",
            text: "No se encontraron usuarios cercanos para enviar la promoción. ¿Desea crear la promoción de todos modos?",
            showCancelButton: true,
            confirmButtonText: "Sí, crear promoción",
            cancelButtonText: "Cancelar",
          }).then((result) => {
            if (result.isConfirmed) {
              createPromotionOnly();
            }
          });
        }
      } else {
        // Promoción segmentada
        const segmentData = {
          age_start: promotionDetails.age_start,
          age_end: promotionDetails.age_end,
          gender: promotionDetails.gender,
          district: promotionDetails.district,
        };

        // Agregar datos de segmentación al formData
        if (promotionDetails.age_start !== null)
          formData.append("age_start", promotionDetails.age_start.toString());
        if (promotionDetails.age_end !== null)
          formData.append("age_end", promotionDetails.age_end.toString());
        if (promotionDetails.gender !== null)
          formData.append("gender", promotionDetails.gender);
        if (promotionDetails.district !== null)
          formData.append("district", promotionDetails.district);

        setPromotionDetails((prev) => ({
          ...prev,
          branch_id: branchId,
        }));

        // Buscar usuarios segmentados
        const segmentedUsersResponse = await getSegmentedNearbyCustumers(
          segmentData
        );

        let hasUsers = false;
        let usersToShow: NearbyCustomer[] = [];

        if (segmentedUsersResponse && segmentedUsersResponse.data) {
          if (Array.isArray(segmentedUsersResponse.data)) {
            hasUsers = segmentedUsersResponse.data.length > 0;
            if (hasUsers) {
              usersToShow = segmentedUsersResponse.data;
            }
          } else if (
            "usuarios" in segmentedUsersResponse.data &&
            segmentedUsersResponse.data.usuarios > 0
          ) {
            hasUsers = true;

            const districts = segmentedUsersResponse.data.distritos || [];

            const totalUsers = segmentedUsersResponse.data.usuarios;
            const maleUsers = districts
              .filter((d) => d.genero === "M")
              .reduce((sum, current) => sum + current.usuarios, 0);
            const femaleUsers = districts
              .filter((d) => d.genero === "F")
              .reduce((sum, current) => sum + current.usuarios, 0);

            const malePercentage =
              totalUsers > 0 ? Math.round((maleUsers / totalUsers) * 100) : 0;
            const femalePercentage =
              totalUsers > 0 ? Math.round((femaleUsers / totalUsers) * 100) : 0;

            const districtInfo = processDistricts(districts);

            usersToShow = [
              {
                user_id: `${totalUsers}`,
                genero: `${malePercentage}% hombres, ${femalePercentage}% mujeres`,
                distance: 0,
                latitud: "0",
                longitud: "0",
                created_at: new Date().toISOString(),
                additionalInfo: `Se encontraron ${totalUsers} usuarios que cumplen con los criterios de segmentación.`,
                districtInfo: districtInfo,
              },
            ];
          }

          if (hasUsers) {
            setNearbyCustumers(usersToShow);
            setShowNearbyCustumersModal(true);
          } else {
            Swal.fire({
              icon: "info",
              title: "Sin usuarios encontrados",
              text: "No se encontraron usuarios que cumplan con los criterios de segmentación. ¿Desea crear la promoción de todos modos?",
              showCancelButton: true,
              confirmButtonText: "Sí, crear promoción",
              cancelButtonText: "Cancelar",
            }).then((result) => {
              if (result.isConfirmed) {
                createPromotionOnly();
              }
            });
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Error en la respuesta",
            text: "No se pudo procesar la respuesta del servidor.",
          });
        }
      }
    } catch (error: any) {
      console.error("Error completo:", error);
      Swal.fire(
        "Error",
        error.response?.data?.message ||
          error.message ||
          "No se pudieron buscar usuarios.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendPromotion = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("titulo", promotionDetails.titulo);
      formData.append("descripcion", promotionDetails.descripcion);
      formData.append("branch_id", branchId as string);
      formData.append("imagen", selectedImage as File);
      formData.append("type", promotionDetails.promocionType);

      if (promotionDetails.promocionType === "segmentada") {
        if (promotionDetails.age_start !== null)
          formData.append("age_start", promotionDetails.age_start.toString());
        if (promotionDetails.age_end !== null)
          formData.append("age_end", promotionDetails.age_end.toString());
        if (promotionDetails.gender !== null)
          formData.append("gender", promotionDetails.gender);
        if (promotionDetails.district !== null)
          formData.append("district", promotionDetails.district);
      }

      const response = await createPromotion(formData);

      if (response && response.data) {
        const promotionId = response.data.id;

        if (promotionDetails.promocionType === "basica") {
          await sendPromotion(
            promotionDetails.latitud,
            promotionDetails.longitud,
            promotionId
          );
        } else {
          await sendSegmentedPromotion({
            age_start: promotionDetails.age_start,
            age_end: promotionDetails.age_end,
            gender: promotionDetails.gender,
            district: promotionDetails.district,
            promotion_id: promotionId,
          });
        }

        Swal.fire(
          "Éxito",
          `Promoción ${
            promotionDetails.promocionType === "basica"
              ? "básica"
              : "segmentada"
          } creada y enviada correctamente.`,
          "success"
        );
        setShowNearbyCustumersModal(false);
        clearForm();
        setShowForm(false);
        fetchPromotions();
      }
    } catch (error: any) {
      Swal.fire(
        "Error",
        error.message || "No se pudo crear o enviar la promoción.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onView = async (row: RowData): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await getPromotionById(row.id);
      setSelectedPromotion(response.data);
      setShowDetailModal(true);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo cargar la promoción.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDetailChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    const { name, value } = e.target;
    let newValue: string | number | null = value === "" ? null : value;

    if (name === "age_start" || name === "age_end") {
      const numValue = value === "" ? null : Number(value);
      if (numValue !== null) {
        if (name === "age_start" && numValue < 14) newValue = 14;
        if (name === "age_end" && numValue > 130) newValue = 130;
      }
    }

    setPromotionDetails((prev) => ({
      ...prev,
      [name]:
        newValue === null
          ? null
          : name === "age_start" || name === "age_end"
          ? Number(newValue)
          : value,
    }));
  };

  const clearForm = (): void => {
    setPromotionDetails({
      titulo: "",
      descripcion: "",
      branch_id: "",
      imagen: "",
      latitud: "",
      longitud: "",
      promocionType: "basica",
      age_start: null,
      age_end: null,
      gender: null,
      district: null,
    });
    setSelectedImage(null);
    setImagePreview(null);
    setCurrentPromotionId(null);
    setNearbyCustumers([]);
    setSelectedDepartamento(null);
    setSelectedProvincia(null);
    setSelectedDistritos([]);
  };

  const columns: Column[] = [
    {
      Header: "Acciones",
      Cell: (row: RowData) => (
        <div className="flex space-x-2">
          <button
            className="relative p-2 bg-sky-500 text-slate-50 flex items-center rounded-lg group overflow-hidden transition-all duration-500 ease-in-out w-[2rem] hover:w-[5rem]"
            onClick={() => onView(row)}
          >
            <Icon
              icon="mdi:eye"
              className="flex-shrink-0 relative right-1"
              width="25"
              height="24"
            />
            <span className="ml-0 opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 group-hover:ml-2 transition-all duration-500 ease-in-out delay-100">
              Ver
            </span>
          </button>
        </div>
      ),
    },
    {
      Header: "Título",
      accessor: "titulo",
      Cell: (row: RowData) => (
        <span className="font-medium text-sm">
          {row.titulo || "Sin título"}
        </span>
      ),
    },
    {
      Header: "Descripción",
      accessor: "descripcion",
      Cell: (row: RowData) => (
        <div className="max-w-md">
          <span className="text-sm line-clamp-2">
            {row.descripcion || "Sin descripción"}
          </span>
        </div>
      ),
    },
    {
      Header: "Imagen",
      accessor: "imagen",
      Cell: (row: RowData) => (
        <div className="flex justify-center">
          <img
            src={row.imagen}
            alt={row.titulo}
            className="w-16 h-16 object-cover rounded-md"
          />
        </div>
      ),
    },
    {
      Header: "Fecha de Creación",
      accessor: "created_at",
      Cell: (row: RowData) => {
        let displayDate = "Fecha no disponible";

        if (row.created_at) {
          if (
            typeof row.created_at === "string" &&
            row.created_at.includes("/")
          ) {
            displayDate = row.created_at;
          } else {
            const date = new Date(row.created_at);
            if (!isNaN(date.getTime())) {
              displayDate = date.toLocaleString("es-ES", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              });
            }
          }
        }

        return <span>{displayDate}</span>;
      },
    },
  ];

  useEffect(() => {
    fetchPromotions();
  }, [branchId]);

  const getSaveButtonClass = (): string => {
    if (isLoading) return "bg-gray-400 text-white cursor-not-allowed";
    return "bg-primary text-gray hover:bg-opacity-90";
  };

  return (
    <div className="container mx-auto my-8">
      {/* Modal de detalle de promoción */}
      {showDetailModal && selectedPromotion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-boxdark p-6 rounded-lg w-full max-w-2xl mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-black dark:text-white">
                {selectedPromotion.title}
              </h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
              >
                <Icon icon="mdi:close" width="24" height="24" />
              </button>
            </div>

            <div className="mb-6">
              <img
                src={selectedPromotion.imagen}
                alt={selectedPromotion.titulo}
                className="w-full max-h-64 object-contain rounded-lg mb-4"
              />

              <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                  Descripción:
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {selectedPromotion.description}
                </p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      Sucursal:
                    </span>
                    <span className="ml-2 text-gray-600 dark:text-gray-400">
                      {selectedBranchName}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      Fecha de Expiración:
                    </span>
                    <span className="ml-2 text-gray-600 dark:text-gray-400">
                      {selectedPromotion.expiration_date
                        ? new Date(
                            selectedPromotion.expiration_date
                          ).toLocaleString("es-ES")
                        : "No disponible"}
                    </span>
                  </div>
                  {selectedPromotion.clicks_count && (
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Vistas:
                      </span>
                      <span className="ml-2 text-gray-600 dark:text-gray-400">
                        {selectedPromotion.clicks_count}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 bg-[#3c50e0] text-white rounded-md hover:bg-blue-700"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {showForm ? (
        <div className="formulario">
          <div className="flex flex-col gap-4 shadow-xl p-8 bg-white-translucent dark:bg-boxdark rounded-lg">
            {/* Header */}
            <div className="w-full flex gap-4 mb-8 items-start">
              <button
                className="text-white bg-[#1c2434] p-2 rounded-full flex items-center justify-center w-8 h-8"
                onClick={() => setShowForm(false)}
                aria-label="Volver"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <div className="flex flex-col">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                  Agregar Promoción a: {selectedBranchName}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {branchAddress}
                </p>
              </div>
            </div>

            {/* Form Content */}
            <div className="space-y-6">
              {/* Detalles básicos de la promoción */}
              <div className="bg-white dark:bg-gray-900 p-5 rounded-lg border border-gray-100 dark:border-gray-800">
                <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">
                  Información Básica
                </h3>

                <div className="grid grid-cols-1 gap-4">
                  {/* Título */}
                  <div className="form-group">
                    <label
                      htmlFor="promotion-title"
                      className="block text-gray-700 dark:text-white font-medium mb-2"
                    >
                      Título de la Promoción: *
                    </label>
                    <input
                      id="promotion-title"
                      type="text"
                      name="titulo"
                      value={promotionDetails.titulo}
                      onChange={handleDetailChange}
                      placeholder="Título de la promoción"
                      className="w-full rounded border border-stroke dark:border-strokedark py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-boxdark dark:text-white"
                    />
                  </div>

                  {/* Descripción */}
                  <div className="form-group">
                    <label
                      htmlFor="promotion-description"
                      className="block text-gray-700 dark:text-white font-medium mb-2"
                    >
                      Descripción: *
                    </label>
                    <textarea
                      id="promotion-description"
                      name="descripcion"
                      value={promotionDetails.descripcion}
                      onChange={handleDetailChange}
                      placeholder="Descripción de la promoción"
                      className="w-full h-[100px] rounded border border-stroke dark:border-strokedark py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-boxdark dark:text-white"
                      rows={4}
                    />
                  </div>

                  {/* Imagen */}
                  <div className="form-group">
                    <label className="block text-gray-700 dark:text-white font-medium mb-2">
                      Imagen: *
                    </label>
                    <Uploader
                      onFileSelect={(file) => {
                        setSelectedImage(file);
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setImagePreview(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }}
                      accept="image/jpeg, image/jpg, image/png"
                      maxSize={10 * 1024 * 1024}
                      label="Sube una imagen para la promoción"
                      initialPreview={imagePreview || promotionDetails.imagen}
                      className="w-full rounded border border-stroke py-3 px-4 text-black dark:text-white dark:border-strokedark dark:bg-boxdark focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Tipo de promoción */}
              <div className="bg-white dark:bg-gray-900 p-5 rounded-lg border border-gray-100 dark:border-gray-800">
                <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">
                  Alcance de la Promoción
                </h3>

                <div className="form-group mb-4">
                  <label className="block text-gray-700 dark:text-white font-medium mb-2">
                    Selecciona el tipo de distribución:
                  </label>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <label className="flex items-center p-3 border rounded-md cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                      <input
                        type="radio"
                        name="promocionType"
                        value="basica"
                        checked={promotionDetails.promocionType === "basica"}
                        onChange={() =>
                          setPromotionDetails((prev) => ({
                            ...prev,
                            promocionType: "basica",
                          }))
                        }
                        className="mr-3"
                      />
                      <div>
                        <span className="font-medium block mb-1">
                          Ubicación
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Enviar a usuarios cercanos a la sucursal
                        </span>
                      </div>
                    </label>

                    <label className="flex items-center p-3 border rounded-md cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                      <input
                        type="radio"
                        name="promocionType"
                        value="segmentada"
                        checked={
                          promotionDetails.promocionType === "segmentada"
                        }
                        onChange={() =>
                          setPromotionDetails((prev) => ({
                            ...prev,
                            promocionType: "segmentada",
                          }))
                        }
                        className="mr-3"
                      />
                      <div>
                        <span className="font-medium block mb-1">
                          Segmentación
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Enviar según criterios demográficos
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Campos de segmentación */}
                {promotionDetails.promocionType === "segmentada" && (
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md mt-4 border border-gray-200 dark:border-gray-700">
                    <h4 className="text-md font-medium mb-3 text-gray-700 dark:text-gray-300">
                      Criterios de Segmentación
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Género:
                        </label>
                        <select
                          name="gender"
                          value={promotionDetails.gender || ""}
                          onChange={handleDetailChange}
                          className="w-full rounded border border-stroke py-2 px-4 dark:bg-boxdark dark:border-strokedark"
                        >
                          <option value="">Todos</option>
                          <option value="M">Masculino</option>
                          <option value="F">Femenino</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Edad Mínima: <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            name="age_start"
                            min="14"
                            max="130"
                            value={promotionDetails.age_start ?? ""}
                            onChange={handleDetailChange}
                            className="w-full rounded border border-stroke py-2 px-4 dark:bg-boxdark dark:border-strokedark dark:text-white"
                            required={
                              promotionDetails.promocionType === "segmentada"
                            }
                            placeholder="Mínimo 14"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Edad Máxima: <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            name="age_end"
                            min="14"
                            max="130"
                            value={promotionDetails.age_end ?? ""}
                            onChange={handleDetailChange}
                            className="w-full rounded border border-stroke py-2 px-4 dark:bg-boxdark dark:border-strokedark dark:text-white"
                            required={
                              promotionDetails.promocionType === "segmentada"
                            }
                            placeholder="Máximo 130"
                          />
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">
                          Ubicación:
                        </label>
                        <CascadingLocationDropdown
                          departamentos={DEPARTAMENTOS}
                          provincias={PROVINCIAS}
                          distritos={DISTRITOS}
                          selectedDepartamento={selectedDepartamento}
                          selectedProvincia={selectedProvincia}
                          selectedDistritos={selectedDistritos}
                          onDepartamentoChange={handleDepartamentoChange}
                          onProvinciaChange={handleProvinciaChange}
                          onDistritosChange={handleDistritosChange}
                          maxDistritos={1}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                className="text-[#3c50e0] border-[#3c50e0] rounded border py-2 px-6 font-medium hover:bg-blue-50 dark:hover:bg-opacity-10 transition-colors"
                onClick={() => setShowForm(false)}
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`rounded py-2 px-6 font-medium transition-colors ${getSaveButtonClass()}`}
              >
                {isLoading ? <LoadingDots /> : "Guardar"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <TablaItem
          data={data}
          columns={columns}
          title="Mis Promociones"
          showBackButton={true}
          onBackClick={onBackClick}
          buttonLabel="Nueva Promoción"
          onButtonClick={() => {
            setShowForm(true);
            clearForm();
          }}
        />
      )}

      {/* Modal de usuarios cercanos */}
      {showNearbyCustumersModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-boxdark p-6 rounded-lg w-full max-w-lg mx-4">
            <h2 className="text-xl font-bold mb-4 text-black dark:text-white">
              {promotionDetails.promocionType === "basica"
                ? "Usuarios cercanos encontrados"
                : "Usuarios segmentados encontrados"}
            </h2>

            <div className="mb-6">
              <p className="mb-2 text-gray-700 dark:text-gray-300">
                {promotionDetails.promocionType === "basica"
                  ? `Se encontraron ${nearbyCustumers.length} usuarios cercanos a tu ubicación.`
                  : nearbyCustumers[0]?.additionalInfo ||
                    `Se encontraron ${nearbyCustumers.length} usuarios que cumplen con los criterios de segmentación.`}
              </p>

              <div className="max-h-60 overflow-y-auto mt-4 border rounded-md">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        {promotionDetails.promocionType === "basica"
                          ? "ID"
                          : "Num Total de Usuarios"}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Género
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        {promotionDetails.promocionType === "basica"
                          ? "Distancia"
                          : "Detalle"}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    {nearbyCustumers.map((customer) => (
                      <tr
                        key={customer.user_id}
                        className="hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {customer.user_id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {promotionDetails.promocionType === "basica"
                            ? customer.genero === "M"
                              ? "Masculino"
                              : customer.genero === "F"
                              ? "Femenino"
                              : "No especificado"
                            : customer.genero}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {promotionDetails.promocionType === "basica"
                            ? `${(
                                parseFloat(customer.distance.toString()) * 1000
                              ).toFixed(2)} m`
                            : customer.districtInfo ||
                              "Sin información de distritos"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Resumen de criterios de segmentación */}
              {promotionDetails.promocionType === "segmentada" && (
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-100 dark:border-blue-800">
                  <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
                    Criterios de segmentación aplicados:
                  </h4>
                  <ul className="text-xs text-blue-700 dark:text-blue-400 space-y-1">
                    <li>
                      <span className="font-medium">Género:</span>{" "}
                      {promotionDetails.gender
                        ? promotionDetails.gender === "M"
                          ? "Masculino"
                          : "Femenino"
                        : "Todos"}
                    </li>
                    <li>
                      <span className="font-medium">Edad:</span>{" "}
                      {promotionDetails.age_start !== null &&
                      promotionDetails.age_end !== null
                        ? `${promotionDetails.age_start} - ${promotionDetails.age_end} años`
                        : promotionDetails.age_start !== null
                        ? `Desde ${promotionDetails.age_start} años`
                        : promotionDetails.age_end !== null
                        ? `Hasta ${promotionDetails.age_end} años`
                        : "Todas las edades"}
                    </li>
                    <li>
                      <span className="font-medium">Distritos:</span>{" "}
                      {promotionDetails.district || "Todos"}
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowNearbyCustumersModal(false);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={handleSendPromotion}
                disabled={isLoading}
                className="px-4 py-2 bg-[#3c50e0] text-white rounded-md hover:bg-blue-700"
              >
                {isLoading ? (
                  <LoadingDots />
                ) : (
                  `Enviar Promoción ${
                    promotionDetails.promocionType === "segmentada"
                      ? "Segmentada"
                      : ""
                  }`
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PromotionsCommerce;
