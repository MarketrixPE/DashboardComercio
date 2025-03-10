import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { LoadingDots } from "../../../../../shared/components/Atoms/LoadingDots/LoadingDots";
import TablaItem, {
  RowData,
  Column,
} from "../../../../../shared/components/Molecules/TablaItem/TablaItem";
import { Icon } from "@iconify/react/dist/iconify.js";
import StudyStatsView from "../../../../../shared/components/Molecules/StudyStatsProps/StudyStatsProps";
import {
  getStudiesByBranch,
  uploadStudyImage,
  updateStudy,
  createStudy,
  getStudyById,
} from "../../../../../core/services/Operador/Studies/StudiesService";
import {
  StudyAnswer,
  StudyQuestion,
  StudyStats,
} from "../../../../../core/models/Studies";
import {
  DEPARTAMENTOS,
  DISTRITOS,
  PROVINCIAS,
} from "../../../../../core/models/ubigueo/ubigeo";
import CascadingLocationDropdown from "../../../../../shared/components/Organisms/CascadingLocationDropdown/CascadingLocationDropdown";
import Uploader from "../../../../../shared/components/Atoms/Uploader";

interface StudiesProps {
  branchId: string | null;
  selectedBranchName: string;
  branchAddress: string;
  onBackClick?: () => void;
}

function StudiesCommerce({
  onBackClick,
  branchId,
  branchAddress,
  selectedBranchName,
}: StudiesProps) {
  const [data, setData] = useState<RowData[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [preguntas, setPreguntas] = useState<StudyQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [studyStats, setStudyStats] = useState<StudyStats | null>(null);
  const [currentStudyId, setCurrentStudyId] = useState<number | null>(null);
  const [studyDetails, setStudyDetails] = useState({
    titulo: "",
    descripcion: "",
    type: 1, // 1=General, 2=Segmentado
    muestra: 70,
    age_start: null as number | null,
    age_end: null as number | null,
    gender: null as string | null,
    district: null as number | null,
    imagen: "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedDepartamento, setSelectedDepartamento] = useState<
    number | null
  >(null);
  const [selectedProvincia, setSelectedProvincia] = useState<number | null>(
    null
  );
  const [selectedDistritos, setSelectedDistritos] = useState<number[]>([]);

  const handleDepartamentoChange = (id: number) => {
    setSelectedDepartamento(id);
    setSelectedProvincia(null);
    setSelectedDistritos([]);
  };

  const handleProvinciaChange = (id: number) => {
    setSelectedProvincia(id);
    setSelectedDistritos([]);
  };

  const handleDistritosChange = (ids: number[]) => {
    setSelectedDistritos(ids);
  };

  const fetchStudies = async () => {
    if (!branchId) {
      Swal.fire("Error", "No se ha seleccionado una sucursal válida.", "error");
      return;
    }

    setIsLoading(true);
    try {
      const response = await getStudiesByBranch(branchId);
      if (response.length === 0) {
        Swal.fire({
          icon: "info",
          title: "No hay estudios",
          text: "No hay estudios disponibles para mostrar.",
        });
      }
      const formattedData = response.map((study: any) => ({
        id: study.id,
        titulo: study.titulo,
        descripcion: study.descripcion,
        tipo: study.type === 1 ? "General" : "Segmentado",
        muestra: study.muestra,
        sucursal: study.branch_id,
        created_at: study.created_at,
        imagen: study.imagen,
      }));
      setData(formattedData);
    } catch (error) {
      Swal.fire("Error", "No se pudieron cargar los estudios.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadImage = async () => {
    if (!selectedImage) return null;

    try {
      const response = await uploadStudyImage(selectedImage);
      return response.url || response.data?.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      Swal.fire("Error", "No se pudo subir la imagen.", "error");
      return null;
    }
  };

  // Función auxiliar para determinar si una respuesta es nueva
  const isNewAnswer = (answerId?: number) => {
    return !answerId || answerId >= 1000000000000; // IDs temporales serán timestamps
  };

  const isNewQuestion = (questionId?: number) => {
    return !questionId || questionId >= 1000000000000; // IDs temporales del frontend
  };

  const handleSubmit = async () => {
    if (!branchId) {
      Swal.fire("Error", "No se ha seleccionado una sucursal válida.", "error");
      return;
    }

    // Validar título y descripción
    if (!studyDetails.titulo.trim()) {
      Swal.fire("Error", "El título del estudio es obligatorio.", "error");
      return;
    }

    if (!studyDetails.descripcion.trim()) {
      Swal.fire("Error", "La descripción del estudio es obligatoria.", "error");
      return;
    }
    // Validar selección de distritos para estudios segmentados - NUEVO
    if (studyDetails.type === 2 && selectedDistritos.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Selección de distritos",
        text: "Debe seleccionar al menos un distrito para el estudio segmentado.",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
      });
      return;
    }
    // Validar que haya al menos una pregunta activa
    const activeQuestions = preguntas.filter((q) => !q.delete);
    if (activeQuestions.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Estudio vacío",
        text: "Debes agregar al menos una pregunta al estudio.",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
      });
      return;
    }

    for (let i = 0; i < activeQuestions.length; i++) {
      const question = activeQuestions[i];
      const validation = validateQuestionAnswers(question);

      if (!validation.isValid) {
        Swal.fire({
          icon: "warning",
          title: "Validación incompleta",
          text: `Pregunta ${i + 1}: ${validation.error}`,
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
        });
        return;
      }

      // Validación adicional para las respuestas
      const activeAnswers = question.answers.filter((a) => !a.delete);
      const emptyAnswers = activeAnswers.filter(
        (a) => !validateAnswerContent(a)
      );

      if (emptyAnswers.length > 0) {
        Swal.fire({
          icon: "warning",
          title: "Respuestas incompletas",
          text: `Hay respuestas vacías en la pregunta ${
            i + 1
          }. Todas las respuestas deben tener contenido.`,
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
        });
        return;
      }
    }
    setIsLoading(true);
    try {
      // Subir imagen si hay una nueva seleccionada
      let imageUrl = studyDetails.imagen;
      if (selectedImage) {
        const uploadedImageUrl = await handleUploadImage();
        if (uploadedImageUrl) {
          imageUrl = uploadedImageUrl;
        }
      }
      // Preparar distritos para enviar al backend - NUEVO
      // Convertir el array de distritos a string separado por comas
      const distritosToSend =
        selectedDistritos.length > 0
          ? selectedDistritos.join(",")
          : studyDetails.district
          ? String(studyDetails.district)
          : "";

      const formData = {
        branch_id: Number(branchId),
        titulo: studyDetails.titulo,
        descripcion: studyDetails.descripcion,
        type: studyDetails.type,
        muestra: studyDetails.muestra,
        age_start: studyDetails.age_start,
        age_end: studyDetails.age_end,
        gender: studyDetails.gender,
        district: distritosToSend,
        imagen: imageUrl,
        questions: preguntas
          .filter((q) => {
            return !q.delete || (!isNewQuestion(q.id) && q.delete);
          })
          .map((q) => {
            if (isNewQuestion(q.id)) {
              // Para preguntas nuevas
              return {
                pregunta: q.pregunta.trim(),
                answers: q.answers
                  .filter((a) => !a.delete)
                  .map((a) => ({
                    respuesta: a.respuesta.trim(),
                  })),
              };
            } else {
              return {
                id: q.id,
                pregunta: q.pregunta.trim(),
                delete: q.delete || false,
                answers: q.answers
                  .filter((a) => !a.delete || (!isNewAnswer(a.id) && a.delete))
                  .map((a) => {
                    if (isNewAnswer(a.id)) {
                      return {
                        respuesta: a.respuesta.trim(),
                      };
                    } else {
                      return {
                        id: a.id,
                        respuesta: a.respuesta.trim(),
                        delete: a.delete || false,
                      };
                    }
                  }),
              };
            }
          }),
      };

      // Validación final para asegurar que no haya respuestas vacías
      const hasEmptyAnswers = formData.questions.some((q) =>
        q.answers.some((a) => !a.respuesta.trim())
      );

      if (hasEmptyAnswers) {
        Swal.fire({
          icon: "warning",
          title: "Validación fallida",
          text: "Todas las respuestas deben tener contenido antes de guardar.",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
        });
        return;
      }

      if (isEditing && currentStudyId) {
        await updateStudy(currentStudyId, formData);
        Swal.fire("Éxito", "Estudio actualizado correctamente.", "success");
      } else {
        await createStudy(formData);
        Swal.fire("Éxito", "Estudio creado correctamente.", "success");
      }

      clearForm();
      setShowForm(false);
      fetchStudies();
    } catch (error: any) {
      Swal.fire(
        "Error",
        error.message || "No se pudo guardar el estudio.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const addAnswer = (questionIndex: number) => {
    const visibleAnswers = preguntas[questionIndex].answers.filter(
      (a) => !a.delete
    );

    if (visibleAnswers.length >= 4) {
      Swal.fire(
        "Límite alcanzado",
        "Solo puedes agregar hasta 4 respuestas por pregunta.",
        "info"
      );
      return;
    }

    setPreguntas((prevPreguntas: StudyQuestion[]) =>
      prevPreguntas.map((q, qIndex) =>
        qIndex === questionIndex
          ? {
              ...q,
              answers: [
                ...q.answers,
                {
                  id: Date.now(),
                  respuesta: "",
                  delete: false,
                },
              ],
            }
          : q
      )
    );
  };

  const onEdit = async (row: RowData) => {
    try {
      setIsLoading(true);

      // Usar el servicio existente para obtener los detalles del estudio
      const response = await getStudyById(row.id);
      const studyData = response.data;

      // Establecer los datos del estudio
      setStudyDetails({
        titulo: studyData.titulo,
        descripcion: studyData.descripcion,
        type: studyData.type || (row.tipo === "General" ? 1 : 2),
        muestra: studyData.muestra || row.muestra,
        age_start: studyData.age_start || null,
        age_end: studyData.age_end || null,
        gender: studyData.gender || null,
        district: studyData.district ? Number(studyData.district.split(',')[0]) : null,
        imagen: studyData.imagen || "",
      });

      setStudyStats({
        total_preguntas: studyData.total_preguntas || 0,
        rango_edades: studyData.rango_edades || {},
        total_respuestas: studyData.total_respuestas || {
          female_respuestas: 0,
          male_respuestas: 0,
        },
        respuestas_por_distrito: studyData.respuestas_por_distrito || [],
        preguntas_y_respuestas: studyData.preguntas_y_respuestas,
      });

      setCurrentStudyId(studyData.id);

      setIsEditing(true);
      setShowForm(true);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar las estadísticas del estudio.",
      });
      console.error("Error al cargar estadísticas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAnswer = (
    questionIndex: number,
    answerId: number | undefined
  ) => {
    setPreguntas((prevPreguntas) =>
      prevPreguntas.map((q, qIndex) =>
        qIndex === questionIndex
          ? {
              ...q,
              answers: isNewAnswer(answerId)
                ? q.answers.filter((a) => a.id !== answerId)
                : q.answers.map((a) =>
                    a.id === answerId ? { ...a, delete: true } : a
                  ),
            }
          : q
      )
    );
  };

  const handleAnswerChange = (
    questionIndex: number,
    answerId: number | undefined,
    newValue: string
  ) => {
    setPreguntas((prevPreguntas) =>
      prevPreguntas.map((q, qIndex) =>
        qIndex === questionIndex
          ? {
              ...q,
              answers: q.answers.map((a) =>
                a.id === answerId ? { ...a, respuesta: newValue } : a
              ),
            }
          : q
      )
    );
  };

  const clearForm = () => {
    // Restablecer detalles del estudio
    setStudyDetails({
      titulo: "",
      descripcion: "",
      type: 1,
      muestra: 70,
      age_start: null,
      age_end: null,
      gender: null,
      district: null,
      imagen: "",
    });

    // Limpiar imagen
    setSelectedImage(null);
    setImagePreview(null);

    // Resetear ubicación - NUEVO
    setSelectedDepartamento(null);
    setSelectedProvincia(null);
    setSelectedDistritos([]);

    // Crear una pregunta inicial con dos respuestas por defecto
    const preguntaInicial = {
      id: Date.now(), // ID temporal para el frontend
      pregunta: "",
      answers: [
        {
          id: Date.now() + 1,
          respuesta: "",
          delete: false,
        },
        {
          id: Date.now() + 2,
          respuesta: "",
          delete: false,
        },
      ],
      delete: false,
    };

    setPreguntas([preguntaInicial]);
  };

  // Función para validar que una respuesta tenga contenido
  const validateAnswerContent = (answer: StudyAnswer): boolean => {
    return answer.respuesta.trim() !== "";
  };

  // Función mejorada para validar las respuestas de una pregunta
  const validateQuestionAnswers = (
    question: StudyQuestion
  ): {
    isValid: boolean;
    error?: string;
  } => {
    // Verificar que la pregunta tenga contenido
    if (!question.pregunta.trim()) {
      return {
        isValid: false,
        error: "La pregunta debe estar escrita",
      };
    }

    // Filtrar respuestas válidas (no eliminadas)
    const activeAnswers = question.answers.filter((answer) => !answer.delete);

    // Verificar que haya al menos 2 respuestas
    if (activeAnswers.length < 2) {
      return {
        isValid: false,
        error: "Las preguntas necesita al menos 2 respuestas",
      };
    }

    // Verificar que todas las respuestas tengan contenido
    const emptyAnswerIndex = activeAnswers.findIndex(
      (answer) => !validateAnswerContent(answer)
    );
    if (emptyAnswerIndex !== -1) {
      return {
        isValid: false,
        error: `La respuesta ${emptyAnswerIndex + 1} está vacía`,
      };
    }

    return { isValid: true };
  };

  const validateAllQuestions = (): {
    isValid: boolean;
    invalidQuestionIndex?: number;
    error?: string;
  } => {
    for (let i = 0; i < preguntas.length; i++) {
      const pregunta = preguntas[i];
      if (!pregunta.delete) {
        // Solo validar preguntas no eliminadas
        const validation = validateQuestionAnswers(pregunta);
        if (!validation.isValid) {
          return {
            isValid: false,
            invalidQuestionIndex: i + 1,
            error: validation.error,
          };
        }
      }
    }

    return { isValid: true };
  };

  const addQuestion = () => {
    if (preguntas.filter((q) => !q.delete).length >= 4) {
      Swal.fire(
        "Límite alcanzado",
        "Solo puedes agregar hasta 4 preguntas.",
        "info"
      );
      return;
    }

    // Validar las preguntas existentes
    const validation = validateAllQuestions();

    if (!validation.isValid) {
      Swal.fire({
        icon: "warning",
        title: "Validación incompleta",
        text: `${validation.error}`,
      });
      return;
    }

    // Añadir nueva pregunta con ID temporal
    const newQuestion: StudyQuestion = {
      id: Date.now(), // ID temporal para el frontend
      pregunta: "",
      answers: [],
      delete: false,
    };

    setPreguntas((prevPreguntas) => [...prevPreguntas, newQuestion]);
  };

  const deleteQuestion = (index: number) => {
    setPreguntas((prevPreguntas) => {
      const questionToDelete = prevPreguntas[index];

      if (isNewQuestion(questionToDelete.id)) {
        // Si es una pregunta nueva, la eliminamos completamente del array
        return prevPreguntas.filter((_, i) => i !== index);
      } else {
        // Si es una pregunta del backend, la marcamos como eliminada
        return prevPreguntas.map((q, i) =>
          i === index ? { ...q, delete: true } : q
        );
      }
    });
  };

  // Actualizar el manejador de cambios de pregunta
  const handleQuestionChange = (index: number, value: string) => {
    setPreguntas((prevPreguntas) =>
      prevPreguntas.map((q, i) => (i === index ? { ...q, pregunta: value } : q))
    );
  };

  const handleDetailChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Registra el valor para depuración
    console.log(`Cambiando ${name} a:`, value, typeof value);

    setStudyDetails((prev) => ({
      ...prev,
      [name]:
        value === ""
          ? null
          : name === "type" ||
            name === "muestra" ||
            name === "age_start" ||
            name === "age_end" ||
            name === "district"
          ? Number(value)
          : value,
    }));

    // Log después del cambio para verificar
    if (name === "type") {
      console.log("Nuevo tipo después del cambio:", Number(value));
    }
  };

  const columns: Column[] = [
    {
      Header: "Acciones",
      Cell: (row: RowData) => (
        <div className="flex space-x-2">
          <button
            className="relative p-2 bg-sky-500 text-slate-50 flex items-center rounded-lg group overflow-hidden transition-all duration-500 ease-in-out w-[2rem] hover:w-[7rem]"
            onClick={() => onEdit(row)}
          >
            <Icon
              icon="healthicons:low-bars-outline"
              className="flex-shrink-0 relative right-1"
              width="25"
              height="24"
            />
            <span className="ml-0 opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 group-hover:ml-2 transition-all duration-500 ease-in-out delay-100">
              {isEditing ? "Editar" : "Estadística"}
            </span>
          </button>
        </div>
      ),
    },
    { Header: "Título", accessor: "titulo" },
    { Header: "Descripción", accessor: "descripcion" },
    { Header: "Tipo", accessor: "tipo" },
    { Header: "Muestra", accessor: "muestra" },
  ];

  useEffect(() => {
    fetchStudies();
  }, [branchId]);

  const getSaveButtonClass = () => {
    if (isLoading) return "bg-gray-400 text-white cursor-not-allowed";
    return "bg-primary text-gray hover:bg-opacity-90";
  };

  return (
    <div className="container mx-auto my-8">
      {showForm ? (
        <div className="formulario">
          {isEditing && studyStats ? (
            // En modo edición, mostrar las estadísticas
            <div className="mt-8">
              <div className="flex gap-4">
                <i
                  className="fas fa-chevron-left text-white bg-[#1c2434] p-2 rounded-full flex items-center justify-center w-8 h-8 cursor-pointer"
                  onClick={() => setShowForm(false)}
                ></i>
                <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">
                  Estadísticas del Estudio
                </h2>
              </div>
              {studyStats && <StudyStatsView stats={studyStats} />}
            </div>
          ) : (
            <div className="flex flex-col gap-4 shadow-xl p-8 bg-white-translucent dark:bg-boxdark rounded-lg">
              <div className="w-full flex gap-4 mb-8 items-start">
                <i
                  className="fas fa-chevron-left text-white bg-[#1c2434] p-2 rounded-full flex items-center justify-center w-8 h-8 cursor-pointer"
                  onClick={() => setShowForm(false)}
                ></i>
                <div className="flex flex-col">
                  <label className="text-title-md2 font-semibold text-black dark:text-white">
                    {isEditing
                      ? `Editar Estudio de: ${selectedBranchName}`
                      : `Agregar Estudio a: ${selectedBranchName}`}
                  </label>
                  <p>{branchAddress}</p>
                </div>
              </div>

              {/* Detalles generales del estudio */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-700 dark:text-white font-medium mb-2">
                    Título del Estudio:
                  </label>
                  <input
                    type="text"
                    name="titulo"
                    value={studyDetails.titulo}
                    onChange={handleDetailChange}
                    placeholder="Título del estudio"
                    className="w-full rounded border border-stroke dark:border-strokedark py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-boxdark dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-white font-medium mb-2">
                    Muestra (n°):
                  </label>
                  <input
                    type="number"
                    name="muestra"
                    value={studyDetails.muestra || ""}
                    onChange={handleDetailChange}
                    placeholder="Tamaño de muestra"
                    className="w-full rounded border border-stroke dark:border-strokedark py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-boxdark dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-white font-medium mb-2">
                    Tipo de Estudio:
                  </label>
                  <select
                    name="type"
                    value={studyDetails.type}
                    onChange={handleDetailChange}
                    className="w-full rounded border border-stroke dark:border-strokedark py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-boxdark dark:text-white"
                  >
                    <option value={1}>General</option>
                    <option value={2}>Segmentado</option>
                  </select>
                </div>
                <p></p>
                {/* Mostrar estos campos solo si es estudio segmentado */}
                {studyDetails.type === 2 && (
                  <>
                    <div>
                      <label className="block text-gray-700 dark:text-white font-medium mb-2">
                        Género:
                      </label>
                      <select
                        name="gender"
                        value={studyDetails.gender || ""}
                        onChange={handleDetailChange}
                        className="w-full rounded border border-stroke dark:border-strokedark py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-boxdark dark:text-white"
                      >
                        <option value="">Todos</option>
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-gray-700 dark:text-white font-medium mb-2">
                          Edad Min:
                        </label>
                        <input
                          type="number"
                          name="age_start"
                          value={studyDetails.age_start || ""}
                          onChange={handleDetailChange}
                          placeholder="Edad mínima"
                          className="w-full rounded border border-stroke dark:border-strokedark py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-boxdark dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 dark:text-white font-medium mb-2">
                          Edad Max:
                        </label>
                        <input
                          type="number"
                          name="age_end"
                          value={studyDetails.age_end || ""}
                          onChange={handleDetailChange}
                          placeholder="Edad máxima"
                          className="w-full rounded border border-stroke dark:border-strokedark py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-boxdark dark:text-white"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2 mt-4">
                      <label className="block text-gray-700 dark:text-white font-medium mb-2">
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
                        maxDistritos={5}
                      />
                    </div>
                  </>
                )}
                <div className="md:col-span-2 flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/2">
                    <label className="block text-gray-700 dark:text-white font-medium mb-2">
                      Imagen:
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
                      label="Sube una imagen para el estudio"
                      initialPreview={imagePreview || studyDetails.imagen}
                      className="w-full rounded border border-stroke py-3 px-4 text-black dark:text-white dark:border-strokedark dark:bg-boxdark focus:border-primary"
                    />
                  </div>

                  <div className="w-full md:w-1/2">
                    <label className="block text-gray-700 dark:text-white font-medium mb-2">
                      Descripción:
                    </label>
                    <textarea
                      name="descripcion"
                      value={studyDetails.descripcion}
                      onChange={handleDetailChange}
                      placeholder="Descripción del estudio"
                      className="w-full h-[85%] rounded border border-stroke dark:border-strokedark py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-boxdark dark:text-white"
                      rows={5}
                    />
                  </div>
                </div>
              </div>

              {/* Preguntas y respuestas */}
              <div className="mt-6">
                <h3 className="text-lg font-medium text-black dark:text-white mb-4">
                  Preguntas del Estudio
                </h3>
                {preguntas.map((q, index) =>
                  !q.delete ? (
                    <div
                      key={index}
                      className="mb-6 p-4 border border-gray-300 dark:border-strokedark rounded-md shadow-sm bg-white dark:bg-boxdark transition-colors duration-300"
                    >
                      <label className="block text-gray-700 dark:text-white font-medium mb-2">
                        Pregunta:
                      </label>
                      <input
                        type="text"
                        value={q.pregunta}
                        onChange={(e) => {
                          const newValue = e.target.value.slice(0, 50);
                          handleQuestionChange(index, newValue);
                        }}
                        placeholder="Escribe tu pregunta aquí (máx. 50 caracteres)"
                        className="w-full rounded border border-stroke dark:border-strokedark py-2 px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-boxdark dark:text-white transition-colors duration-300"
                      />

                      <button
                        onClick={() => deleteQuestion(index)}
                        className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 mb-4 transition-colors duration-300"
                      >
                        Eliminar Pregunta
                      </button>

                      <label className="block text-gray-700 dark:text-white font-medium mb-2">
                        Respuestas:
                      </label>
                      {q.answers
                        .filter((a) => !a.delete)
                        .map((a) => (
                          <div
                            key={a.id}
                            className="flex items-center gap-2 mb-2"
                          >
                            <input
                              type="text"
                              value={a.respuesta}
                              onChange={(e) =>
                                handleAnswerChange(
                                  index,
                                  a.id,
                                  e.target.value.slice(0, 50)
                                )
                              }
                              placeholder="Respuesta"
                              className="w-full rounded border border-stroke dark:border-strokedark py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-boxdark dark:text-white transition-colors duration-300"
                            />
                            <button
                              onClick={() => deleteAnswer(index, a.id)}
                              className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-300"
                            >
                              Eliminar
                            </button>
                          </div>
                        ))}

                      <button
                        onClick={() => addAnswer(index)}
                        className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors duration-300"
                      >
                        + Añadir respuesta
                      </button>
                    </div>
                  ) : null
                )}
                <button
                  onClick={addQuestion}
                  className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 mt-4 block transition-colors duration-300"
                >
                  + Añadir pregunta
                </button>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  className="text-[#3c50e0] border-[#3c50e0] rounded border py-2 px-6 font-medium"
                  onClick={() => setShowForm(false)}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`rounded py-2 px-6 font-medium ${getSaveButtonClass()}`}
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
          )}
        </div>
      ) : (
        <TablaItem
          data={data}
          columns={columns}
          title="Mis Estudios"
          showBackButton={true}
          onBackClick={onBackClick}
          buttonLabel="Nuevo Estudio"
          onButtonClick={() => {
            setShowForm(true);
            clearForm();
            setIsEditing(false);
          }}
        />
      )}
    </div>
  );
}

export default StudiesCommerce;
