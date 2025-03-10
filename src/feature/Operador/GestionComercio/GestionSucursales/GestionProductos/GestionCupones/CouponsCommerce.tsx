import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { LoadingDots } from "../../../../../../shared/components/Atoms/LoadingDots/LoadingDots";
import Uploader from "../../../../../../shared/components/Atoms/Uploader";
import TablaItem, {
  RowData,
  Column,
} from "../../../../../../shared/components/Molecules/TablaItem/TablaItem";
import {
  createCoupon,
  deleteCoupon,
  getCouponDetails,
  getCouponsByProduct,
  updateCoupon,
} from "../../../../../../core/services/Operador/Coupons/CouponsService";
import { couponValidations } from "./CouponValidations";

interface CouponsProps {
  productId: string | null;
  productTitle: string;
  onBackClick: () => void;
}

const CouponsCommerce = ({
  productId,
  productTitle,
  onBackClick,
}: CouponsProps) => {
  const [coupons, setCoupons] = useState<RowData[]>([]);
  const [couponForm, setCouponForm] = useState({
    titulo: "",
    descripcion: "",
    codigo_barras: "",
    product_id: "",
    porcentaje_descuento: "",
    puntos: "",
    terminos: "",
    activo: 1,
    fecha_vencimiento: "",
    imagen: null as File | null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCouponId, setSelectedCouponId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const hasFetchedCoupons = useRef(false);

  const initializeForm = () => {
    setCouponForm({
      titulo: "",
      descripcion: "",
      codigo_barras: "",
      product_id: "",
      porcentaje_descuento: "",
      puntos: "",
      terminos: "",
      activo: 1,
      fecha_vencimiento: "",
      imagen: null,
    });
    setIsEditing(false);
    setSelectedCouponId(null);
  };

  const fetchCoupons = async () => {
    if (!productId) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se proporcionó un ID de producto válido.",
      });
      return;
    }

    try {
      const response = await getCouponsByProduct(productId);

      if (!response.data || response.data.length === 0) {
        setCoupons([]);
        // Solo mostramos el mensaje info si es la primera carga
        if (coupons.length === 0) {
          Swal.fire({
            icon: "info",
            title: "No hay cupones",
            text: "No hay cupones disponibles para este producto.",
          });
        }
      } else {
        setCoupons(
          response.data.map((coupon: any) => ({
            id: coupon.id,
            titulo: coupon.titulo,
            descripcion: coupon.descripcion,
            codigo_barras: coupon.codigo_barras,
            imagen: coupon.imagen,
            product_id: coupon.product_id,
            fecha_vencimiento: coupon.expiration_date,
            puntos: coupon.puntos,
            terminos: coupon.terminos,
            fecha_creacion: coupon.fecha,
          }))
        );
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.message || "No se pudieron obtener los cupones del producto.",
      });
      console.error("Error al obtener cupones por producto:", error);
    }
  };

  useEffect(() => {
    if (!hasFetchedCoupons.current) {
      hasFetchedCoupons.current = true;
      fetchCoupons();
    }
  }, [productId]);

  const validateCouponForm = (): boolean => {
    const titleError = couponValidations.validateTitle(couponForm.titulo);
    const descriptionError = couponValidations.validateDescription(
      couponForm.descripcion
    );
    const barcodeError = couponValidations.validateBarcode(
      couponForm.codigo_barras
    );
    const pointsError = couponValidations.validatePoints(couponForm.puntos);
    const discountError = couponValidations.validateDiscount(
      couponForm.porcentaje_descuento
    );
    const termsError = couponValidations.validateTerms(couponForm.terminos);
    const dateError = couponValidations.validateExpirationDate(
      couponForm.fecha_vencimiento
    );
    const imageError = couponValidations.validateImage(
      couponForm.imagen,
      isEditing
    );

    const validationErrors: Record<string, string | undefined> = {
      title: titleError,
      description: descriptionError,
      barcode: barcodeError,
      points: pointsError,
      discount: discountError,
      terms: termsError,
      date: dateError,
      image: imageError,
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

  const saveCoupon = async () => {
    if (!validateCouponForm()) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      Object.keys(couponForm).forEach((key) => {
        const value = couponForm[key as keyof typeof couponForm];
        if (value !== null) formData.append(key, value as string | Blob);
      });

      formData.append("product_id", productId || "");

      if (isEditing && selectedCouponId) {
        await updateCoupon(selectedCouponId, formData);
        Swal.fire({ icon: "success", title: "Actualización exitosa" });

        await fetchCoupons();
      } else {
        const response = await createCoupon(formData);
        console.log("Respuesta de createCoupon:", response.data);
        if (response.data) {
          setCoupons((prev) => [
            ...prev,
            {
              ...response.data,
              fecha_creacion: new Date().toISOString(), // Usar fecha actual si no viene del servidor
              fecha_vencimiento: couponForm.fecha_vencimiento, // Del formulario
            },
          ]);
        }

        Swal.fire({ icon: "success", title: "Cupón creado exitosamente" });
      }

      setShowForm(false);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Error al guardar el cupón.";
      Swal.fire({ icon: "error", title: "Error", text: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCouponHandler = async (couponId: string) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto.",
      icon: "warning",
      showCancelButton: true,
    });

    if (result.isConfirmed) {
      try {
        await deleteCoupon(couponId);
        setCoupons((prev) => prev.filter((coupon) => coupon.id !== couponId));
        Swal.fire({ icon: "success", title: "Cupón eliminado exitosamente" });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo eliminar el cupón.",
        });
      }
    }
  };

  const columns: Column[] = [
    {
      Header: "Acciones",
      Cell: (row: RowData) => (
        <div className="flex space-x-2">
          {/* Botón de Editar */}
          <button
            className="relative p-2 bg-blue-500 text-slate-50 flex items-center rounded-lg group overflow-hidden transition-all duration-500 ease-in-out w-[2rem] hover:w-[6rem]"
            onClick={() => handleEdit(row.id)}
          >
            <i className="far fa-edit"></i>
            <span className="ml-0 opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 group-hover:ml-2 transition-all duration-500 ease-in-out delay-100">
              Editar
            </span>
          </button>

          {/* Botón de Eliminar */}
          <button
            className="relative p-2 bg-red-500 text-slate-50 flex items-center rounded-lg group overflow-hidden transition-all duration-500 ease-in-out w-[2rem] hover:w-[6rem]"
            onClick={() => deleteCouponHandler(row.id)}
          >
            <i className="far fa-trash-alt"></i>
            <span className="ml-0 opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 group-hover:ml-2 transition-all duration-500 ease-in-out delay-100">
              Eliminar
            </span>
          </button>
        </div>
      ),
    },
    { Header: "Título", accessor: "titulo" as keyof RowData },
    { Header: "Descripción", accessor: "descripcion" as keyof RowData },
    { Header: "Puntos", accessor: "puntos" as keyof RowData },
    {
      Header: "Fecha de Vencimiento",
      accessor: "fecha_vencimiento" as keyof RowData,
    },
  ];

  const handleEdit = async (id: string) => {
    try {
      const response = await getCouponDetails(id);

      const coupon = response.data;

      setCouponForm({
        titulo: coupon.titulo || "",
        descripcion: coupon.descripcion || "",
        codigo_barras: coupon.codigo_barras || "",
        product_id: coupon.product_id?.toString() || productId || "",
        porcentaje_descuento: coupon.porcentaje_descuento || "",
        puntos: coupon.puntos?.toString() || "",
        terminos: coupon.terminos || "",
        activo: coupon.activo || 1,
        fecha_vencimiento: coupon.expiration_date || "",
        imagen: null,
      });

      if (coupon.imagen) {
        setImagePreview(coupon.imagen);
      }

      setSelectedCouponId(id);
      setIsEditing(true);
      setShowForm(true);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar los datos del cupón.",
      });
      console.error("Error al obtener los datos del cupón:", error);
    }
  };

  const handleCancelClick = () => {
    setShowForm(false);
    initializeForm();
    setImagePreview(null);
  };

  return (
    <div className="container mx-auto py-8">
      {showForm ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveCoupon();
          }}
          className="shadow-xl p-8 bg-white dark:bg-boxdark rounded-lg transition-colors duration-300"
        >
          <div className="flex items-center gap-4 mb-6">
            <i
              className="fas fa-chevron-left text-white bg-[#1c2434] p-2 rounded-full flex items-center justify-center w-8 h-8 cursor-pointer"
              onClick={handleCancelClick}
            ></i>
            <p className="text-title-sm font-semibold text-black dark:text-white">
              {isEditing ? "Editar Cupón" : "Agregar Cupón"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block text-black dark:text-white">
              Título *
              <input
                type="text"
                className="w-full rounded border border-stroke py-2 px-4 text-black dark:text-white dark:bg-boxdark dark:border-strokedark focus:border-primary"
                value={couponForm.titulo}
                onChange={(e) =>
                  setCouponForm((prev) => ({ ...prev, titulo: e.target.value }))
                }
                
              />
            </label>

            <label className="block text-black dark:text-white">
              Puntos *
              <input
                type="number"
                className="w-full rounded border border-stroke py-2 px-4 text-black dark:text-white dark:bg-boxdark dark:border-strokedark focus:border-primary"
                value={couponForm.puntos}
                onChange={(e) =>
                  setCouponForm((prev) => ({ ...prev, puntos: e.target.value }))
                }
                
              />
            </label>

            <label className="block text-black dark:text-white">
              Código de Barras *
              <input
                type="text"
                className="w-full rounded border border-stroke py-2 px-4 text-black dark:text-white dark:bg-boxdark dark:border-strokedark focus:border-primary"
                value={couponForm.codigo_barras}
                onChange={(e) =>
                  setCouponForm((prev) => ({
                    ...prev,
                    codigo_barras: e.target.value,
                  }))
                }
                
              />
            </label>

            <label className="block text-black dark:text-white">
              Porcentaje de Descuento (%)
              <input
                type="number"
                className="w-full rounded border border-stroke py-2 px-4 text-black dark:text-white dark:bg-boxdark dark:border-strokedark focus:border-primary"
                value={couponForm.porcentaje_descuento}
                onChange={(e) =>
                  setCouponForm((prev) => ({
                    ...prev,
                    porcentaje_descuento: e.target.value,
                  }))
                }
              />
            </label>

            <label className="block text-black dark:text-white">
              Descripción *
              <textarea
                className="w-full rounded border border-stroke py-2 px-4 text-black dark:text-white dark:bg-boxdark dark:border-strokedark focus:border-primary"
                value={couponForm.descripcion}
                onChange={(e) =>
                  setCouponForm((prev) => ({
                    ...prev,
                    descripcion: e.target.value,
                  }))
                }
                
              />
            </label>

            <label className="block text-black dark:text-white">
              Términos y Condiciones *
              <textarea
                className="w-full rounded border border-stroke py-2 px-4 text-black dark:text-white dark:bg-boxdark dark:border-strokedark focus:border-primary"
                value={couponForm.terminos}
                onChange={(e) =>
                  setCouponForm((prev) => ({
                    ...prev,
                    terminos: e.target.value,
                  }))
                }
                
              />
            </label>

            <label className="block text-black dark:text-white">
              Fecha de Vencimiento *
              <input
                type="date"
                className="w-full rounded border border-stroke py-2 px-4 text-black dark:text-white dark:bg-boxdark dark:border-strokedark focus:border-primary"
                value={couponForm.fecha_vencimiento}
                onChange={(e) =>
                  setCouponForm((prev) => ({
                    ...prev,
                    fecha_vencimiento: e.target.value,
                  }))
                }
                
              />
            </label>

            <label className="block text-black dark:text-white">
              Estado
              <select
                className="w-full rounded border border-stroke py-2 px-4 text-black dark:text-white dark:bg-boxdark dark:border-strokedark focus:border-primary"
                value={couponForm.activo}
                onChange={(e) =>
                  setCouponForm((prev) => ({
                    ...prev,
                    activo: Number(e.target.value),
                  }))
                }
              >
                <option value={1}>Activo</option>
                <option value={0}>Inactivo</option>
              </select>
            </label>

            <label className="block text-black dark:text-white">
              Imagen *
              <Uploader
                onFileSelect={(file) =>
                  setCouponForm((prev) => ({ ...prev, imagen: file }))
                }
                accept="image/jpeg, image/jpg, image/png"
                maxSize={10 * 1024 * 1024}
                label="Haga click para cargar o arrastrar y soltar"
                initialPreview={
                  isEditing && imagePreview ? imagePreview : undefined
                }
              />
            </label>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                initializeForm();
              }}
              className="text-gray-700 dark:text-white border border-gray-400 dark:border-strokedark rounded px-4 py-2 hover:bg-gray-100 dark:hover:bg-boxdark-2 transition-colors duration-300"
              disabled={isLoading}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className={`rounded px-4 py-2 transition-colors duration-300 ${
                isLoading
                  ? "bg-gray-400 dark:bg-gray-600 text-white cursor-not-allowed"
                  : "bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-800"
              }`}
              disabled={isLoading}
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
        </form>
      ) : (
        <TablaItem
          columns={columns}
          data={coupons}
          showBackButton={true}
          onBackClick={onBackClick}
          title={`Cupones de ${productTitle}`}
          buttonLabel="Agregar Cupón"
          onButtonClick={() => {
            initializeForm();
            setShowForm(true);
          }}
          showButton={coupons.length === 0}
        />
      )}
    </div>
  );
};

export default CouponsCommerce;
