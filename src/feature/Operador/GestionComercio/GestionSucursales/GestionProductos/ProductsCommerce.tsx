import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { LoadingDots } from "../../../../../shared/components/Atoms/LoadingDots/LoadingDots";
import Uploader from "../../../../../shared/components/Atoms/Uploader";
import TablaItem, {
  RowData,
  Column,
} from "../../../../../shared/components/Molecules/TablaItem/TablaItem";
import {
  createProduct,
  deleteProduct,
  getCategories,
  getProductsByBranchId,
  getSubcategoriesByCategoryId,
  showProduct,
  updateProduct,
  generateSuggestions,
} from "../../../../../core/services/Operador/Producto/ProductoService";
import CustomDropdown from "../../../../../shared/components/Atoms/Dropdown/Dropdown";
import { productValidations } from "./ProductValidations";

interface FormValues {
  titulo: string;
  descripcion_corta: string;
  descripcion: string;
  precio: string;
  precio_sin_oferta: string;
  sucursal: string;
  coupon: number;
  tipo: string;
  activo: string;
  likes: string;
  rating: string;
  tiene_descuento: string;
  porcentaje_descuento: string;
  fecha_vencimiento: string;
  categories: number[];
  subcategories: number[];
  puntos: string;
}

interface Category {
  id: number;
  titulo: string;
}

interface Subcategory {
  id: number;
  descripcion: string;
}

interface ProductTypeOption {
  id: number;
  text: string;
}

interface EstadoCuponOption {
  id: number;
  text: string;
}

interface ProductsProps {
  branchId: string | null;
  selectedBranchName: string;
  branchAddress: string;
  onBackClick?: () => void;
  inheritedCategory: number | null;
  inheritedSubcategory: number | null;
}

export function ProductsCommerce({
  onBackClick,
  branchId,
  branchAddress,
  selectedBranchName,
  inheritedCategory,
  inheritedSubcategory,
}: ProductsProps) {
  const [data, setData] = useState<RowData[]>([]);
  const [filteredData, setFilteredData] = useState<RowData[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [formValues, setFormValues] = useState<FormValues>({
    titulo: "",
    descripcion_corta: "",
    descripcion: "",
    precio: "",
    precio_sin_oferta: "",
    sucursal: "",
    coupon: 0,
    tipo: "",
    activo: "1",
    likes: "0",
    rating: "0.00",
    tiene_descuento: "0",
    porcentaje_descuento: "0",
    fecha_vencimiento: "",
    categories: [],
    subcategories: [],
    puntos: "",
  });
  const hasFetchedProducts = useRef<boolean>(false);
  const [imageFiles, setImageFiles] = useState<
    { file: File | null; url: string }[]
  >([{ file: null, url: "" }]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showSuggestionForm, setShowSuggestionForm] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>(
    null
  );

  const roundToOneDecimal = (value: string | number): string => {
    const num = parseFloat(String(value)) || 0;
    return (Math.round(num * 10) / 10).toFixed(1);
  };

  useEffect(() => {
    if (formValues.precio_sin_oferta) {
      const precioSinOfertaNum = parseFloat(formValues.precio_sin_oferta);
      if (!isNaN(precioSinOfertaNum)) {
        const puntosValue = Math.ceil(precioSinOfertaNum).toString();
        setFormValues((prev) => ({
          ...prev,
          puntos: puntosValue,
        }));
      } else {
        setFormValues((prev) => ({
          ...prev,
          puntos: "",
        }));
      }
    } else {
      setFormValues((prev) => ({
        ...prev,
        puntos: "",
      }));
    }
  }, [formValues.precio_sin_oferta]);

  useEffect(() => {
    const precioSinOferta = parseFloat(formValues.precio_sin_oferta) || 0;
    const descuento = parseFloat(formValues.porcentaje_descuento) || 0;
    const descuentoAmount = (precioSinOferta * descuento) / 100;
    const precioFinal = precioSinOferta - descuentoAmount;

    const roundedPrecioFinal = roundToOneDecimal(precioFinal);

    setFormValues((prev) => ({
      ...prev,
      precio: precioFinal > 0 ? roundedPrecioFinal : "0.0",
    }));
  }, [formValues.precio_sin_oferta, formValues.porcentaje_descuento]);

  useEffect(() => {
    if (!hasFetchedProducts.current) {
      hasFetchedProducts.current = true;
      fetchProducts();
    }
  }, [branchId]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const products = await getProductsByBranchId(branchId ?? "");
      console.log(products, "products");
      if (!products || products.length === 0) {
        setData([]);
        setFilteredData([]);
        if (isInitialLoad) {
          Swal.fire({
            icon: "info",
            title: "No hay productos",
            text: "No hay productos disponibles para esta sucursal.",
          });
        }
        setIsInitialLoad(false);
        return;
      }
      const roundedProducts = products.map((product: RowData) => ({
        ...product,
        precio: roundToOneDecimal(product.precio),
        precio_sin_oferta: roundToOneDecimal(product.precio_sin_oferta),
      }));
      setData(roundedProducts);
      setFilteredData(roundedProducts);
      setIsInitialLoad(false);
    } catch (error) {
      Swal.fire("Error", "Hubo un problema al obtener los productos.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const getSaveButtonClass = (): string => {
    return isLoading
      ? "bg-gray-400 text-white cursor-not-allowed"
      : "bg-primary text-gray hover:bg-opacity-90";
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Validar entrada en tiempo real
    if (name === "precio_sin_oferta") {
      // Permitir solo números y un punto (.), no comas
      const sanitizedValue = value.replace(/[^0-9.]/g, "");
      setFormValues((prev) => ({ ...prev, [name]: sanitizedValue }));
    } else if (name === "puntos" || name === "porcentaje_descuento") {
      // Permitir solo números enteros (sin puntos ni comas)
      const sanitizedValue = value.replace(/[^0-9]/g, "");
      setFormValues((prev) => ({ ...prev, [name]: sanitizedValue }));
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEstadoChange = (value: number) => {
    setFormValues((prev) => ({
      ...prev,
      activo: String(value),
    }));
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (file: File, index: number) => {
    const fileUrl = URL.createObjectURL(file);
    setImageFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles[index] = { file, url: fileUrl };
      return updatedFiles;
    });
  };

  useEffect(() => {
    if (inheritedCategory) setSelectedCategory(inheritedCategory);
    if (inheritedSubcategory) setSelectedSubcategory(inheritedSubcategory);
  }, [inheritedCategory, inheritedSubcategory]);

  const initializeForm = () => {
    setFormValues({
      titulo: "",
      descripcion_corta: "",
      descripcion: "",
      precio: "",
      precio_sin_oferta: "",
      sucursal: branchId || "",
      coupon: 0,
      activo: "1",
      tipo: "",
      likes: "0",
      rating: "0.00",
      tiene_descuento: "0",
      porcentaje_descuento: "0",
      fecha_vencimiento: "",
      categories: [],
      subcategories: [],
      puntos: "",
    });
    setImageFiles([{ file: null, url: "" }]);
    setIsEditing(false);
    setSelectedProductId(null);
    if (inheritedCategory) setSelectedCategory(inheritedCategory);
    if (inheritedSubcategory) setSelectedSubcategory(inheritedSubcategory);
  };

  const handleFilterChange = (value: number) => {
    setSelectedType(String(value));
    if (value) {
      const selectedTypeName = productTypeOptions.find(
        (type) => type.id === value
      )?.text;
      if (selectedTypeName) {
        const filtered = data.filter(
          (product) => product.tipo === selectedTypeName
        );
        setFilteredData(filtered);
      }
    } else {
      setFilteredData(data);
    }
  };

  const validateProductForm = (): boolean => {
    const roundedPrecioSinOferta = roundToOneDecimal(
      formValues.precio_sin_oferta
    );

    const titleError = productValidations.validateTitle(formValues.titulo);
    const shortDescError = productValidations.validateShortDescription(
      formValues.descripcion_corta
    );
    const descError = productValidations.validateDescription(
      formValues.descripcion
    );
    const priceError = productValidations.validatePrice(
      formValues.precio_sin_oferta
    );
    const categoryError = productValidations.validateCategory(selectedCategory);
    const subcategoryError = productValidations.validateSubcategory(
      selectedSubcategory,
      !!selectedCategory
    );
    const typeError = productValidations.validateProductType(formValues.tipo);
    const expirationError = productValidations.validateExpirationDate(
      formValues.fecha_vencimiento,
      formValues.tipo
    );
    const imageError = productValidations.validateProductImage(
      imageFiles,
      isEditing
    );
    const discountError = productValidations.validateDiscount(
      formValues.porcentaje_descuento
    );
    const pointsError = productValidations.validatePoints(formValues.puntos);

    const validationErrors: Record<string, string | undefined> = {
      title: titleError,
      shortDescription: shortDescError,
      description: descError,
      price: priceError,
      category: categoryError,
      subcategory: subcategoryError,
      type: typeError,
      expiration: expirationError,
      image: imageError,
      discount: discountError,
      points: pointsError,
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
    setFormValues((prev) => ({
      ...prev,
      precio_sin_oferta: roundedPrecioSinOferta,
    }));
    return true;
  };

  const saveOrUpdateProduct = async () => {
    if (!validateProductForm()) return;
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("titulo", formValues.titulo);
      formData.append("descripcion_corta", formValues.descripcion_corta);
      formData.append("descripcion", formValues.descripcion);
      formData.append("precio", formValues.precio);
      formData.append("precio_sin_oferta", formValues.precio_sin_oferta || "");
      formData.append("sucursal", formValues.sucursal || "");
      formData.append("tipo", formValues.tipo);
      formData.append("activo", formValues.activo);
      formData.append("likes", formValues.likes);
      formData.append("rating", formValues.rating);
      formData.append("tiene_descuento", formValues.tiene_descuento);
      formData.append("porcentaje_descuento", formValues.porcentaje_descuento);
      formData.append("fecha_vencimiento", formValues.fecha_vencimiento || "");

      if (formValues.puntos) {
        formData.append("puntos", formValues.puntos);
      }

      imageFiles.forEach((image, index) => {
        if (image.file) {
          formData.append(`imagen${index + 1}`, image.file);
        }
      });

      if (selectedCategory) {
        formData.append("categories[]", selectedCategory.toString());
      }
      if (selectedSubcategory) {
        formData.append("subcategories[]", selectedSubcategory.toString());
      }

      if (isEditing && selectedProductId) {
        await updateProduct(selectedProductId, formData);
        Swal.fire(
          "¡Actualizado!",
          "El producto y su cupón fueron actualizados con éxito.",
          "success"
        );
      } else {
        await createProduct(formData);
        Swal.fire(
          "¡Producto creado!",
          "El producto y su cupón fueron creados con éxito.",
          "success"
        );
      }

      await fetchProducts();
      setShowForm(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al guardar el producto.",
      });
      console.error("Error al guardar o actualizar el producto:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateSuggestions = async () => {
    if (!formValues.titulo) {
      Swal.fire({
        icon: "warning",
        title: "Falta el título",
        text: "Por favor, ingresa un título para generar sugerencias.",
      });
      return;
    }
    if (!imageFiles[0]?.file) {
      Swal.fire({
        icon: "warning",
        title: "Falta la imagen",
        text: "Por favor, sube una imagen para generar sugerencias.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const suggestions = await generateSuggestions(
        formValues.titulo,
        imageFiles[0].file
      );
      const { data } = suggestions;

      const tipoMap: { [key: string]: string } = {
        "Tipo 1": "1", // Standard
        "Tipo 3": "3", // Flash
      };

      const tipoValue = tipoMap[data.tipo] || formValues.tipo;

      setFormValues((prev) => ({
        ...prev,
        descripcion_corta: data.descripcion_corta || prev.descripcion_corta,
        descripcion: data.descripcion_completa || prev.descripcion,
        precio_sin_oferta:
          roundToOneDecimal(data.precio.replace("S/ ", "")) ||
          prev.precio_sin_oferta,
        tipo: tipoValue,
        porcentaje_descuento:
          data.descuento.replace("%", "") || prev.porcentaje_descuento,
        tiene_descuento: data.descuento ? "1" : prev.tiene_descuento,
        fecha_vencimiento: data.fecha_expiracion || prev.fecha_vencimiento,
      }));

      setShowSuggestionForm(false);
      setShowForm(true);

      Swal.fire({
        icon: "success",
        title: "Sugerencias generadas",
        text: "Las sugerencias se han aplicado al formulario.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron generar las sugerencias. Intenta de nuevo.",
      });
      console.error("Error al generar sugerencias:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async (row: RowData) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Se eliminará el producto "${row.titulo}". Esta acción no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProduct(row.id);
          setData((prevData) =>
            prevData.filter((product) => product.id !== row.id)
          );
          Swal.fire(
            "¡Eliminado!",
            "El producto ha sido eliminado correctamente.",
            "success"
          );
          fetchProducts();
        } catch (error) {
          Swal.fire(
            "Error",
            "Hubo un problema al intentar eliminar el producto.",
            "error"
          );
          console.error("Error al eliminar el producto:", error);
        }
      }
    });
  };

  const onEdit = async (row: RowData) => {
    try {
      const response = await showProduct(row.id);
      const product = response.data.product;
      const coupon = response.data.coupon;

      if (product.categories && product.categories.length > 0) {
        const categoryId = product.categories[0].id;
        setSelectedCategory(categoryId);
        const subcategoryId =
          product.subcategories && product.subcategories.length > 0
            ? product.subcategories[0].id
            : null;
        if (subcategoryId) {
          setTimeout(() => setSelectedSubcategory(subcategoryId), 500);
        }
      }

      const precioSinOfertaValue =
        roundToOneDecimal(product.precio_sin_oferta) || "0.0";
      const puntosValue =
        coupon?.puntos?.toString() ||
        Math.ceil(parseFloat(precioSinOfertaValue)).toString();

      setFormValues({
        titulo: product.titulo || "",
        descripcion_corta: product.descripcion_corta || "",
        descripcion: product.descripcion || "",
        precio: roundToOneDecimal(product.precio) || "0.0",
        precio_sin_oferta: precioSinOfertaValue,
        sucursal: product.branch_id?.toString() || branchId || "",
        coupon: coupon ? 1 : 0,
        tipo: product.tipo?.toString() || "",
        activo: product.activo?.toString() || "1",
        likes: product.likes?.toString() || "0",
        rating: product.rating?.toString() || "0.00",
        tiene_descuento: product.tiene_descuento?.toString() || "0",
        porcentaje_descuento: coupon?.porcentaje_descuento?.toString() || "0",
        fecha_vencimiento: product.fecha_vencimiento || "",
        categories: product.categories
          ? product.categories.map((cat: any) => cat.id)
          : [],
        subcategories: product.subcategories
          ? product.subcategories.map((sub: any) => sub.id)
          : [],
        puntos: puntosValue,
      });

      setImageFiles([
        product.imagen1
          ? { file: null, url: product.imagen1 }
          : { file: null, url: "" },
        product.imagen2
          ? { file: null, url: product.imagen2 }
          : { file: null, url: "" },
        product.imagen3
          ? { file: null, url: product.imagen3 }
          : { file: null, url: "" },
      ]);

      setSelectedProductId(product.id);
      setIsEditing(true);
      setShowForm(true);
    } catch (error) {
      Swal.fire("Error", "Error al obtener los datos del producto", "error");
      console.error("Error al obtener los datos del producto:", error);
    }
  };

  const columns: Column[] = [
    {
      Header: "Acciones",
      Cell: (row: RowData) => (
        <div className="flex space-x-2">
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
    { Header: "Título", accessor: "titulo" as keyof RowData },
    {
      Header: "Precio",
      accessor: "precio" as keyof RowData,
      Cell: (row: RowData) => row.precio,
    },
    {
      Header: "Tipo",
      accessor: "tipo" as keyof RowData,
      Cell: (row: RowData) => {
        const productType = productTypeOptions.find(
          (type) => type.text === row.tipo
        );
        return <span>{productType ? productType.text : "Desconocido"}</span>;
      },
    },
    {
      Header: "Estado",
      accessor: "activo" as keyof RowData,
      Cell: (row: RowData) => (
        <span
          className={`px-2 py-1 rounded text-white ${
            row.activo === "1" || row.activo === 1
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        >
          {row.activo === "1" || row.activo === 1 ? "Activo" : "Inactivo"}
        </span>
      ),
    },
  ];

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

  const estadoCupon: EstadoCuponOption[] = [
    { id: 0, text: "Inactivo" },
    { id: 1, text: "Activo" },
  ];

  const productTypeOptions: ProductTypeOption[] = [
    { id: 1, text: "Standard" },
    { id: 3, text: "Flash" },
    { id: 4, text: "Destacados" },
  ];

  const handleOpenSuggestionForm = () => {
    initializeForm();
    setShowSuggestionForm(true);
  };

  return (
    <>
      <>
        {showSuggestionForm ? (
          <div className="shadow-xl p-8 rounded-lg container mx-auto bg-white-translucent dark:bg-boxdark">
            <div className="w-full flex gap-4 mb-8 items-start">
              <i
                className="fas mt-1 fa-chevron-left text-white bg-[#1c2434] p-2 rounded-full flex items-center justify-center w-8 h-8 cursor-pointer"
                onClick={() => setShowSuggestionForm(false)}
              ></i>
              <div className="flex flex-col">
                <label className="text-title-md2 font-semibold text-black dark:text-white">
                  Generar Producto con IA para: {selectedBranchName}
                </label>
                <p>{branchAddress}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label>
                Título *
                <input
                  type="text"
                  name="titulo"
                  value={formValues.titulo}
                  onChange={handleInputChange}
                  className="w-full rounded border border-stroke py-3 pl-3.5 pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white"
                />
              </label>
              <label>
                Imagen *
                <Uploader
                  onFileSelect={(file: File) => handleImageUpload(file, 0)}
                  accept="image/jpeg, image/jpg, image/png"
                  maxSize={100 * 1024 * 1024}
                  label="Imagen 1"
                  className="w-full rounded border border-stroke py-3 px-4 text-black dark:text-white dark:border-strokedark dark:bg-boxdark focus:border-primary"
                  initialPreview={imageFiles[0]?.url || ""}
                />
              </label>
            </div>
            <div className="mt-4 flex justify-end gap-4.5">
              <button
                className="text-[#3c50e0] border-[#3c50e0] rounded border py-2 px-6 font-medium"
                onClick={() => setShowSuggestionForm(false)}
              >
                Cancelar
              </button>
              <button
                onClick={handleGenerateSuggestions}
                className={`rounded py-2 px-6 font-medium ${
                  isLoading
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-yellow-500 text-white hover:bg-opacity-90"
                }`}
                disabled={isLoading}
                aria-label="Generar sugerencias con IA"
              >
                {isLoading ? <LoadingDots /> : "Generar Sugerencias"}
              </button>
            </div>
          </div>
        ) : showForm ? (
          <div className="shadow-xl p-8 rounded-lg container mx-auto bg-white-translucent dark:bg-boxdark">
            <div className="w-full flex gap-4 mb-8 items-start">
              <i
                className="fas mt-1 fa-chevron-left text-white bg-[#1c2434] p-2 rounded-full flex items-center justify-center w-8 h-8 cursor-pointer"
                onClick={() => setShowForm(false)}
              ></i>
              <div className="flex flex-col">
                <label className="text-title-md2 font-semibold text-black dark:text-white">
                  {isEditing
                    ? `Editar Producto de: ${selectedBranchName}`
                    : `Agregar Producto a: ${selectedBranchName}`}
                </label>
                <p>{branchAddress}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                  Detalles del Producto
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label>
                    Título *
                    <input
                      type="text"
                      name="titulo"
                      value={formValues.titulo}
                      onChange={handleInputChange}
                      className="w-full rounded border border-stroke py-3 pl-3.5 pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white"
                    />
                  </label>
                  <label>
                    Descripción Corta *
                    <input
                      type="text"
                      name="descripcion_corta"
                      value={formValues.descripcion_corta}
                      onChange={handleInputChange}
                      className="w-full rounded border border-stroke py-3 pl-3.5 pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white"
                    />
                  </label>
                  <label className="md:col-span-2">
                    Descripción *
                    <textarea
                      name="descripcion"
                      value={formValues.descripcion}
                      onChange={handleTextAreaChange}
                      className="w-full rounded border border-stroke py-3 pl-3.5 pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white"
                      rows={4}
                    />
                  </label>
                  <label>
                    Tipo *
                    <CustomDropdown
                      options={productTypeOptions}
                      value={formValues.tipo ? Number(formValues.tipo) : null}
                      onChange={(value: number) =>
                        setFormValues((prev) => ({
                          ...prev,
                          tipo: String(value),
                        }))
                      }
                      placeholder="Seleccione un tipo"
                      className="w-full rounded border border-stroke py-3 pl-3.5 pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white"
                    />
                  </label>
                  <div className="w-full flex gap-4">
                    <label>
                      Categoría:
                      <select
                        value={selectedCategory || ""}
                        className="w-full rounded border border-stroke py-3 pl-3.5 pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white"
                        onChange={(e) =>
                          setSelectedCategory(
                            e.target.value ? parseInt(e.target.value) : null
                          )
                        }
                      >
                        <option value="">Seleccionar categoría</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.titulo}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Subcategoría:
                      <select
                        value={selectedSubcategory || ""}
                        className={`w-full rounded border border-stroke py-3 pl-3.5 pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white ${
                          selectedCategory ? "text-black" : "text-gray-400"
                        }`}
                        onChange={(e) =>
                          setSelectedSubcategory(
                            e.target.value ? parseInt(e.target.value) : null
                          )
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
                    </label>
                  </div>
                  {formValues.tipo === "2" || formValues.tipo === "3" ? (
                    <label>
                      Fecha de Vencimiento:
                      <input
                        type="date"
                        name="fecha_vencimiento"
                        value={formValues.fecha_vencimiento}
                        onChange={handleInputChange}
                        className="w-full rounded border border-stroke py-3 pl-3.5 pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white"
                      />
                    </label>
                  ) : null}
                  <label>
                    Estado *
                    <CustomDropdown
                      options={estadoCupon}
                      value={Number(formValues.activo)}
                      onChange={handleEstadoChange}
                      placeholder="Seleccione estado"
                      className="w-full rounded border border-stroke py-3 pl-3.5 pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white"
                    />
                  </label>
                  <label>
                    Precio Inicial *
                    <input
                      type="text"
                      name="precio_sin_oferta"
                      value={formValues.precio_sin_oferta}
                      onChange={handleInputChange}
                      className="w-full rounded border border-stroke py-3 pl-3.5 pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white"
                      placeholder="Ejemplo: 15.9"
                    />
                  </label>
                </div>
              </div>

              <div className="col-span-2 mt-6">
                <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                  Detalles del Cupón
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label>
                    Porcentaje de Descuento del Cupón *
                    <input
                      type="text"
                      name="porcentaje_descuento"
                      value={formValues.porcentaje_descuento}
                      onChange={handleInputChange}
                      className="w-full rounded border border-stroke py-3 pl-3.5 pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white"
                      min="0"
                      max="100"
                      placeholder="Ejemplo: 10"
                    />
                  </label>
                  <label>
                    Precio final (calculado)
                    <input
                      type="number"
                      name="precio"
                      value={formValues.precio}
                      className="w-full rounded border border-stroke py-3 pl-3.5 pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white bg-gray-100 cursor-not-allowed"
                      disabled
                    />
                  </label>
                  <label>
                    Puntos (opcional)
                    <input
                      type="text"
                      name="puntos"
                      value={formValues.puntos}
                      onChange={handleInputChange}
                      className="w-full rounded border border-stroke py-3 pl-3.5 pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white"
                      placeholder="Se calcula automáticamente según el precio"
                    />
                  </label>
                </div>
              </div>

              <div className="col-span-2 mt-6">
                <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                  Imagen del Producto
                </h3>
                <label className="md:col-span-2">
                  Imagen
                  <div className="flex flex-col md:flex-row gap-4 mt-2">
                    <Uploader
                      onFileSelect={(file: File) => handleImageUpload(file, 0)}
                      accept="image/jpeg, image/jpg, image/png"
                      maxSize={100 * 1024 * 1024}
                      label="Imagen 1"
                      className="w-full rounded border border-stroke py-3 px-4 text-black dark:text-white dark:border-strokedark dark:bg-boxdark focus:border-primary"
                      initialPreview={imageFiles[0]?.url || ""}
                    />
                  </div>
                </label>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-4.5">
              <button
                className="text-[#3c50e0] border-[#3c50e0] rounded border py-2 px-6 font-medium"
                onClick={() => setShowForm(false)}
              >
                Cancelar
              </button>
              <button
                onClick={saveOrUpdateProduct}
                className={`rounded py-2 px-6 font-medium ${getSaveButtonClass()}`}
                disabled={isLoading}
                aria-label={
                  isEditing ? "Actualizar producto" : "Guardar producto"
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
        ) : (
          <TablaItem
            data={filteredData}
            columns={columns}
            title={`Productos de ${selectedBranchName}`}
            branchAddress={branchAddress}
            buttonLabel="Agregar Producto"
            onButtonClick={() => {
              initializeForm();
              setShowForm(true);
            }}
            showBackButton={true}
            showNewButton={true}
            newButtonLabel="Generar Producto con IA"
            onNewButtonClick={handleOpenSuggestionForm}
            onBackClick={onBackClick}
            extraControls={
              <CustomDropdown
                options={[
                  { id: 0, text: "Todos los Tipos" },
                  ...productTypeOptions,
                ]}
                value={selectedType ? Number(selectedType) : null}
                onChange={handleFilterChange}
                placeholder="Filtrar por tipo"
                className="h-auto px-2 rounded border border-stroke dark:bg-boxdark dark:border-strokedark dark:text-white"
              />
            }
          />
        )}
      </>
    </>
  );
}

export default ProductsCommerce;
