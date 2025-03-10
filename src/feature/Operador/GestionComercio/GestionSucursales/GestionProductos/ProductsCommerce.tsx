import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { Icon } from "@iconify/react";
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
  getProductTypeList,
  getSubcategoriesByCategoryId,
  showProduct,
  updateProduct,
} from "../../../../../core/services/Operador/Producto/ProductoService";

import CouponsCommerce from "./GestionCupones/CouponsCommerce";
import { Tooltip } from "react-tooltip";
import CustomDropdown from "../../../../../shared/components/Atoms/Dropdown/Dropdown";
import { productValidations } from "./ProductValidations";

interface ProductsProps {
  branchId: string | null;
  selectedBranchName: string;
  branchAddress: string;
  onBackClick?: () => void;
  inheritedCategory?: number | null;
  inheritedSubcategory?: number | null;
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
  const [productTypes, setProductTypes] = useState<any[]>([]);
  const [selectedType, setSelectedType] = useState("");
  const [formValues, setFormValues] = useState({
    titulo: "",
    descripcion_corta: "",
    descripcion: "",
    precio: "",
    precio_sin_oferta: "",
    sucursal: "",
    coupon: 0,
    tipo: "",
    activo: "0",
    likes: "0",
    rating: "0.00",
    tiene_descuento: "0",
    porcentaje_descuento: "0.00",
    fecha_vencimiento: "",
    categories: [],
    subcategories: [],
  });
  const hasFetchedProducts = useRef(false);
  const [imageFiles, setImageFiles] = useState<
    { file: File | null; url: string }[]
  >([]);
  const [isCouponView, setIsCouponView] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [selectedProductTitle, setSelectedProductTitle] = useState<string>("");
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(() => {
    if (!hasFetchedProducts.current) {
      hasFetchedProducts.current = true;
      fetchProducts();
      fetchProductTypes();
    }
  }, [branchId]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const products = await getProductsByBranchId(branchId);
      console.log(products);
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

      setData(products);
      setFilteredData(products);
      setIsInitialLoad(false);
    } catch (error) {
      Swal.fire("Error", "Hubo un problema al obtener los productos.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const getSaveButtonClass = () => {
    return isLoading
      ? "bg-gray-400 text-white cursor-not-allowed"
      : "bg-primary text-gray hover:bg-opacity-90";
  };

  const fetchProductTypes = async () => {
    try {
      const response = await getProductTypeList();
      if (Array.isArray(response.data)) {
        setProductTypes(response.data); // Asigna el array contenido en `response.data`
      } else {
        console.error(
          "Error: el formato de tipos no es un array:",
          response.data
        );
        setProductTypes([]); // En caso de error, asigna un array vacío
      }
    } catch (error) {
      Swal.fire(
        "Error",
        "Hubo un problema al obtener los tipos de productos.",
        "error"
      );
      console.error("Error al obtener los tipos de productos:", error);
      setProductTypes([]);
    }
  };

  const handleDiscountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFormValues((prev) => ({
      ...prev,
      tiene_descuento: value,
      porcentaje_descuento: value === "0" ? "0.00" : prev.porcentaje_descuento, // Reinicia el porcentaje si no tiene descuento
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleEstadoChange = (value: number) => {
    // Si el producto no tiene cupón (coupon === 0) y está intentando activar (value === 1)
    if (formValues.coupon === 0 && value === 1) {
      Swal.fire({
        icon: "warning",
        title: "No se puede activar",
        text: "No se puede activar un producto sin cupón. Por favor, primero registre el producto y despues agregue un cupón.",
      });
      return;
    }

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
      updatedFiles[index] = { file, url: fileUrl }; // Reemplaza con el archivo nuevo
      return updatedFiles;
    });
  };

  useEffect(() => {
    if (inheritedCategory) {
      setSelectedCategory(inheritedCategory);
    }
    if (inheritedSubcategory) {
      setSelectedSubcategory(inheritedSubcategory);
    }
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
      activo: "0",
      tipo: "",
      likes: "0",
      rating: "0.00",
      tiene_descuento: "0",
      porcentaje_descuento: "0.00",
      fecha_vencimiento: "",
      categories: [],
      subcategories: [],
    });
    setImageFiles([]);
    setIsEditing(false);
    setSelectedProductId(null);

    if (inheritedCategory) {
      setSelectedCategory(inheritedCategory);
    }
    if (inheritedSubcategory) {
      setSelectedSubcategory(inheritedSubcategory);
    }
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    setSelectedType(selectedId);

    if (selectedId) {
      // Encuentra el nombre correspondiente en `productTypes` usando el ID seleccionado
      const selectedTypeName = productTypes.find(
        (type) => type.id === Number(selectedId)
      )?.nombre;

      if (selectedTypeName) {
        // Filtra los productos según el nombre encontrado
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
    const titleError = productValidations.validateTitle(formValues.titulo);
    const shortDescError = productValidations.validateShortDescription(
      formValues.descripcion_corta
    );
    const descError = productValidations.validateDescription(
      formValues.descripcion
    );
    const priceError = productValidations.validatePrice(formValues.precio);
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
      formData.append(
        "porcentaje_descuento",
        formValues.porcentaje_descuento || ""
      );
      formData.append("fecha_vencimiento", formValues.fecha_vencimiento || "");

      // Manejo de imágenes
      imageFiles.forEach((image, index) => {
        if (image.file) {
          formData.append(`imagen${index + 1}`, image.file);
        }
      });

      // Categorías y subcategorías
      if (selectedCategory) {
        formData.append("categories[]", selectedCategory.toString());
      }
      if (selectedSubcategory) {
        formData.append("subcategories[]", selectedSubcategory.toString());
      }

      // Crear o actualizar producto
      if (isEditing && selectedProductId) {
        await updateProduct(selectedProductId, formData);
        Swal.fire(
          "¡Actualizado!",
          "El producto fue actualizado con éxito.",
          "success"
        );
      } else {
        const productResponse = await createProduct(formData);
        setIsLoading(false);

        // Mostrar mensaje de éxito con opción de crear cupón
        const result = await Swal.fire({
          icon: "success",
          title: "¡Producto creado con éxito!",
          text: "¿Deseas crear un cupón para este producto?",
          showCancelButton: true,
          confirmButtonText: "Sí, crear cupón",
          cancelButtonText: "No, terminar",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
        });

        if (result.isConfirmed) {
          setSelectedProductId(productResponse.data.id);
          setSelectedProductTitle(productResponse.data.titulo);
          setIsCouponView(true);
        } else {
          setShowForm(false);
          await fetchProducts();
        }
      }

      // Recargar la lista de productos
      await fetchProducts();

      // Cerrar el formulario
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
      const product = response.data;

      console.log("Datos del producto:", product);

      // Primero establecemos solo el ID de la categoría
      if (product.categories && product.categories.length > 0) {
        const categoryId = product.categories[0].id; // Extraemos el ID
        setSelectedCategory(categoryId);

        // Guardamos el ID de la subcategoría
        const subcategoryId =
          product.subcategories && product.subcategories.length > 0
            ? product.subcategories[0].id // Extraemos el ID
            : null;

        // Esperamos a que se carguen las subcategorías
        if (subcategoryId) {
          setTimeout(() => {
            setSelectedSubcategory(subcategoryId);
          }, 500);
        }
      }

      setFormValues({
        titulo: product.titulo || "",
        descripcion_corta: product.descripcion_corta || "",
        descripcion: product.descripcion || "",
        precio: product.precio?.toString() || "",
        precio_sin_oferta: product.precio_sin_oferta?.toString() || "",
        sucursal: product.branch_id?.toString() || branchId || "",
        coupon: product.coupon,
        tipo: product.tipo?.toString() || "",
        activo: product.activo?.toString() || "0",
        likes: product.likes?.toString() || "0",
        rating: product.rating?.toString() || "0.00",
        tiene_descuento: product.tiene_descuento?.toString() || "0",
        porcentaje_descuento:
          product.porcentaje_descuento?.toString() || "0.00",
        fecha_vencimiento: product.fecha_vencimiento || "",
        categories: product.categories
          ? product.categories.map((cat: any) => cat.id)
          : [],
        subcategories: product.subcategories
          ? product.subcategories.map((sub: any) => sub.id)
          : [],
      });

      // Cargar imágenes existentes en el estado
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

      // Para debug
      console.log("Categoría seleccionada:", product.categories[0]);
      console.log("Subcategoría seleccionada:", product.subcategories[0]);
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
          {/* Botón de Ver Cupones */}
          <button
            className="relative pl-1 bg-green-500 text-slate-50 flex items-center rounded-lg group overflow-hidden transition-all duration-500 ease-in-out w-[2rem] hover:w-[7rem]"
            onClick={() => onViewCoupons(row)}
          >
            <Icon
              icon="mdi:coupon-outline"
              className="flex-shrink-0"
              width="25"
              height="24"
            />
            <span className="ml-0 opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 group-hover:ml-2 transition-all duration-500 ease-in-out delay-100">
              Cupones
            </span>
          </button>

          {/* Botón de Editar */}
          <button
            className="relative p-2 bg-blue-500 text-slate-50 flex items-center rounded-lg group overflow-hidden transition-all duration-500 ease-in-out w-[2rem] hover:w-[5rem]"
            onClick={() => onEdit(row)}
          >
            <i className="far fa-edit"></i>
            <span className="ml-0 opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 group-hover:ml-2 transition-all duration-500 ease-in-out delay-100">
              Editar
            </span>
          </button>

          {/* Botón de Eliminar */}
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
    { Header: "Precio", accessor: "precio" as keyof RowData },
    {
      Header: "Tipo",
      accessor: "tipo" as keyof RowData,
      Cell: (row: RowData) => {
        const productType = productTypes.find(
          (type) => type.nombre === row.tipo // Compara el nombre con el tipo
        );
        return productType ? productType.nombre : "Desconocido";
      },
    },
    {
      Header: "Cupón",
      accessor: "coupon" as keyof RowData,
      Cell: (row: RowData) => (
        <span
          className={`px-2 py-1 rounded text-white ${
            row.coupon === 1
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {row.coupon === 1 ? "Con cupón" : "Sin cupón"}
        </span>
      ),
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

  const onViewCoupons = (row: RowData) => {
    console.log("ID del producto seleccionado:", row.id); // Log del ID del producto
    setSelectedProductId(row.id); // ID del producto seleccionado
    setSelectedProductTitle(row.titulo); // Título del producto seleccionado
    setIsCouponView(true); // Cambia a la vista de cupones
  };

  const handleBackToProducts = () => {
    setIsCouponView(false); // Cambia a la vista de productos
    fetchProducts(); // Recarga los productos
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

  const estadoCupon = [
    { id: 0, text: "Inactivo" },
    { id: 1, text: "Activo" },
  ];

  return (
    <>
      {isCouponView ? (
        <CouponsCommerce
          productId={selectedProductId}
          productTitle={selectedProductTitle}
          onBackClick={handleBackToProducts}
        />
      ) : (
        <>
          {showForm ? (
            <div className="shadow-xl p-8 rounded-lg container mx-auto bg-white-translucent dark:bg-boxdark">
              <div className="w-full flex gap-4 mb-8 items-start ">
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
                  Precio *
                  <input
                    type="number"
                    name="precio"
                    value={formValues.precio}
                    onChange={handleInputChange}
                    className="w-full rounded border border-stroke py-3 pl-3.5 pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white"
                  />
                </label>
                <div className="w-full flex gap-4">
                  {/* Selector de Categorías */}
                  <label>
                    Categoría:
                    <select
                      value={selectedCategory || ""}
                      className="w-full rounded border border-stroke py-3 pl-3.5 pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white"
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
                  </label>

                  {/* Selector de Subcategorías */}
                  <label>
                    Subcategoría:
                    <select
                      value={selectedSubcategory || ""}
                      className={`w-full rounded border border-stroke py-3 pl-3.5 pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white ${
                        selectedCategory ? "text-black" : "text-gray-400"
                      }`}
                      onChange={(e) =>
                        setSelectedSubcategory(parseInt(e.target.value))
                      }
                      disabled={!selectedCategory} // Deshabilitado si no hay categoría seleccionada
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
                {/* Quitar */}
                <label className="hidden">
                  Precio Sin Oferta
                  <input
                    type="number"
                    name="precio_sin_oferta"
                    value={formValues.precio_sin_oferta}
                    onChange={handleInputChange}
                    className="w-full rounded border border-stroke py-3 pl-3.5 pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white"
                  />
                </label>
                <label>
                  Tipo *
                  <select
                    name="tipo"
                    value={formValues.tipo}
                    onChange={handleInputChange}
                    className="w-full rounded border border-stroke py-3 pl-3.5 pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white"
                  >
                    <option value="">Seleccione un tipo</option>
                    {productTypes.map((type: any) => (
                      <option key={type.id} value={type.id}>
                        {type.nombre}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Estado *
                  <div className="relative">
                    <CustomDropdown
                      options={estadoCupon}
                      value={Number(formValues.activo)}
                      onChange={handleEstadoChange}
                      placeholder="Seleccione estado"
                      className="w-full rounded border border-stroke py-3 pl-3.5 pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white"
                    />
                    {formValues.coupon === 0 && (
                      <Tooltip
                        id="estadoTooltip"
                        content="Necesita tener un cupón para activar el producto"
                        place="top"
                        className="bg-black dark:bg-boxdark text-white"
                      />
                    )}
                  </div>
                </label>
                <label className="hidden">
                  Likes
                  <input
                    type="number"
                    name="likes"
                    value={formValues.likes}
                    onChange={handleInputChange}
                    className="w-full rounded border border-stroke py-3 pl-3.5 pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white"
                  />
                </label>
                <label className="hidden">
                  Rating
                  <input
                    type="number"
                    name="rating"
                    step="0.01"
                    value={formValues.rating}
                    onChange={handleInputChange}
                    className="w-full rounded border border-stroke py-3 pl-3.5 pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white"
                  />
                </label>
                <label className="hidden">
                  Tiene Descuento
                  <select
                    name="tiene_descuento"
                    value={formValues.tiene_descuento}
                    onChange={handleDiscountChange}
                    className="w-full rounded border border-stroke py-3 pl-3.5 pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white"
                  >
                    <option value="1">Sí</option>
                    <option value="0">No</option>
                  </select>
                </label>
                <label className="hidden">
                  Porcentaje de Descuento
                  <input
                    type="number"
                    name="porcentaje_descuento"
                    step="0.01"
                    value={formValues.porcentaje_descuento}
                    onChange={handleInputChange}
                    className="w-full rounded border border-stroke py-3 pl-3.5 pr-4.5 dark:bg-boxdark dark:border-strokedark dark:text-white"
                    disabled={formValues.tiene_descuento === "0"} // Desactiva si "No"
                  />
                </label>
                {formValues.tipo === "3" || formValues.tipo === "2" ? (
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

                <label className="md:col-span-2">
                  Imágenes
                  <div className="flex flex-col md:flex-row gap-4 mt-2">
                    {Array.from({ length: 1 }).map((_, index) => (
                      <div
                        key={index}
                        className="w-full md:w-1/2 flex flex-col items-center"
                      >
                        <Uploader
                          onFileSelect={(file) =>
                            handleImageUpload(file, index)
                          }
                          accept="image/jpeg, image/jpg, image/png"
                          maxSize={10 * 1024 * 1024}
                          label={`Imagen ${index + 1}`}
                          className="w-full rounded border border-stroke py-3 px-4 text-black dark:text-white dark:border-strokedark dark:bg-boxdark focus:border-primary"
                          initialPreview={imageFiles[index]?.url || ""} // Mostrar la imagen existente
                        />
                      </div>
                    ))}
                  </div>
                </label>
              </div>
              <div className="mt-4 flex justify-end gap-4.5">
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
              onBackClick={onBackClick}
              extraControls={
                <select
                  value={selectedType}
                  onChange={handleFilterChange}
                  className=" h-auto px-2 rounded border border-stroke dark:bg-boxdark dark:border-strokedark dark:text-white"
                >
                  <option value="">Todos los Tipos</option>
                  {productTypes.map((type: any) => (
                    <option key={type.id} value={type.id}>
                      {type.nombre}
                    </option>
                  ))}
                </select>
              }
            />
          )}
        </>
      )}
    </>
  );
}

export default ProductsCommerce;
