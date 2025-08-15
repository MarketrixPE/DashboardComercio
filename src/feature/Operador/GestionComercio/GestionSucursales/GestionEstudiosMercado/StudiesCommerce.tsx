import { useEffect, useRef, useState } from "react";
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
import { studiesValidations } from "./studiesValidations";

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
    type: 1,
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
  const isModalShownRef = useRef(false);

  useEffect(() => {
    if (!isEditing || !currentStudyId) return;

    const updateStats = async () => {
      try {
        const response = await getStudyById(currentStudyId);
        const studyData = response.data;
        setStudyStats({
          total_preguntas: studyData.total_preguntas || 0,
          rango_edades: studyData.rango_edades || {},
          total_respuestas: studyData.total_respuestas || {
            female_respuestas: 0,
            male_respuestas: 0,
          },
          respuestas_por_distrito: studyData.respuestas_por_distrito || [],
          preguntas_y_respuestas: studyData.preguntas_y_respuestas || [],
        });
      } catch (error) {
        if (!isModalShownRef.current) {
          isModalShownRef.current = true;
          Swal.fire(
            "Error",
            "No se pudieron cargar las estadísticas del estudio.",
            "error"
          ).then(() => {
            isModalShownRef.current = false;
          });
        }
      }
    };

    updateStats();

    const intervalId = setInterval(updateStats, 3000);

    return () => clearInterval(intervalId);
  }, [isEditing, currentStudyId]);

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
    console.log("fetchStudies called with branchId:", branchId); // Debug
    if (!branchId) {
      if (!isModalShownRef.current) {
        isModalShownRef.current = true;
        Swal.fire(
          "Error",
          "No se ha seleccionado una sucursal válida.",
          "error"
        ).then(() => {
          isModalShownRef.current = false;
        });
      }
      return;
    }

    setIsLoading(true);
    try {
      const response = await getStudiesByBranch(branchId);
      if (response.length === 0 && !isModalShownRef.current) {
        console.log("Showing no studies modal"); // Debug
        isModalShownRef.current = true;
        Swal.fire({
          icon: "info",
          title: "No hay estudios",
          text: "No hay estudios disponibles para mostrar.",
        }).then(() => {
          isModalShownRef.current = false;
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
      if (!isModalShownRef.current) {
        isModalShownRef.current = true;
        Swal.fire("Error", "No se pudieron cargar los estudios.", "error").then(
          () => {
            isModalShownRef.current = false;
          }
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadImage = async () => {
    if (!selectedImage) return null;

    try {
      const response = await uploadStudyImage(selectedImage);
      console.log(response, "response");
      const imageUrl = response?.data?.data?.url;

      if (!imageUrl) {
        throw new Error(
          "No se encontró la URL de la imagen en la respuesta del servidor."
        );
      }

      return imageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      Swal.fire("Error", "No se pudo subir la imagen.", "error");
      return null;
    }
  };

  const isNewAnswer = (answerId?: number) => {
    return !answerId || answerId >= 1000000000000;
  };

  const isNewQuestion = (questionId?: number) => {
    return !questionId || questionId >= 1000000000000;
  };

  const handleSubmit = async () => {
    if (!branchId) {
      Swal.fire("Error", "No se ha seleccionado una sucursal válida.", "error");
      return;
    }

    // Validate basic study details
    const titleError = studiesValidations.validateStudyTitle(
      studyDetails.titulo
    );
    if (titleError) {
      Swal.fire("Error", titleError, "warning");
      return;
    }

    const descriptionError = studiesValidations.validateStudyDescription(
      studyDetails.descripcion
    );
    if (descriptionError) {
      Swal.fire("Error", descriptionError, "warning");
      return;
    }

    const sampleSizeError = studiesValidations.validateSampleSize(
      studyDetails.muestra
    );
    if (sampleSizeError) {
      Swal.fire("Error", sampleSizeError, "warning");
      return;
    }

    // Validate study image
    const imageError = studiesValidations.validateStudyImage(
      selectedImage || studyDetails.imagen,
      isEditing
    );
    if (imageError) {
      Swal.fire("Error", imageError, "warning");
      return;
    }

    // Validate segmentation for segmented studies
    const segmentationError = studiesValidations.validateStudySegmentation(
      studyDetails.type,
      studyDetails.gender,
      studyDetails.age_start,
      studyDetails.age_end,
      selectedDistritos
    );
    if (segmentationError) {
      Swal.fire("Error", segmentationError, "warning");
      return;
    }

    // Validate question set
    const questionSetError = studiesValidations.validateQuestionSet(preguntas);
    if (questionSetError) {
      Swal.fire("Error", questionSetError, "warning");
      return;
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

      // Preparar distritos para enviar al backend
      const distritosToSend =
        selectedDistritos.length > 0
          ? selectedDistritos.join(",")
          : studyDetails.district
          ? String(studyDetails.district)
          : "";

      const formData = {
        branch_id: branchId,
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

      console.log(
        "Payload enviado al backend:",
        JSON.stringify(formData, null, 2)
      );

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

      const response = await getStudyById(row.id);
      const studyData = response.data;

      setStudyDetails({
        titulo: studyData.titulo,
        descripcion: studyData.descripcion,
        type: studyData.type || (row.tipo === "General" ? 1 : 2),
        muestra: studyData.muestra || row.muestra,
        age_start: studyData.age_start || null,
        age_end: studyData.age_end || null,
        gender: studyData.gender || null,
        district: studyData.district
          ? Number(studyData.district.split(",")[0])
          : null,
        imagen: studyData.imagen || "",
      });

      setPreguntas(
        studyData.preguntas_y_respuestas?.map((q: any) => ({
          id: q.id,
          pregunta: q.pregunta,
          answers: q.respuestas.map((a: any) => ({
            id: a.id,
            respuesta: a.respuesta,
            delete: false,
          })),
          delete: false,
        })) || []
      );

      setStudyStats({
        total_preguntas: studyData.total_preguntas || 0,
        rango_edades: studyData.rango_edades || {},
        total_respuestas: studyData.total_respuestas || {
          female_respuestas: 0,
          male_respuestas: 0,
        },
        respuestas_por_distrito: studyData.respuestas_por_distrito || [],
        preguntas_y_respuestas: studyData.preguntas_y_respuestas || [],
      });

      setCurrentStudyId(studyData.id);

      setIsEditing(true);
      setShowForm(true);
    } catch (error) {
      if (!isModalShownRef.current) {
        isModalShownRef.current = true;
        Swal.fire(
          "Error",
          "No se pudieron cargar los datos del estudio.",
          "error"
        ).then(() => {
          isModalShownRef.current = false;
        });
      }
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
    setStudyDetails({
      titulo: "",
      descripcion: "",
      type: 1,
      muestra: 0,
      age_start: null,
      age_end: null,
      gender: null,
      district: null,
      imagen: "",
    });

    setSelectedImage(null);
    setImagePreview(null);

    setSelectedDepartamento(null);
    setSelectedProvincia(null);
    setSelectedDistritos([]);

    const preguntaInicial = {
      id: Date.now(),
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
    setStudyStats(null); // Limpiar estadísticas al cerrar el formulario
  };

  const validateAnswerContent = (answer: StudyAnswer): boolean => {
    return answer.respuesta.trim() !== "";
  };

  const validateQuestionAnswers = (
    question: StudyQuestion
  ): {
    isValid: boolean;
    error?: string;
  } => {
    if (!question.pregunta.trim()) {
      return {
        isValid: false,
        error: "La pregunta debe estar escrita",
      };
    }

    const activeAnswers = question.answers.filter((answer) => !answer.delete);

    if (activeAnswers.length < 2) {
      return {
        isValid: false,
        error: "Las preguntas necesita al menos 2 respuestas",
      };
    }

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
    if (preguntas.filter((q) => !q.delete).length >= 10) {
      Swal.fire(
        "Límite alcanzado",
        "Solo puedes agregar hasta 10 preguntas.",
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

    const newQuestion: StudyQuestion = {
      id: Date.now(),
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
        return prevPreguntas.filter((_, i) => i !== index);
      } else {
        return prevPreguntas.map((q, i) =>
          i === index ? { ...q, delete: true } : q
        );
      }
    });
  };

  const handleQuestionChange = (index: number, value: string) => {
    setPreguntas((prevPreguntas) =>
      prevPreguntas.map((q, i) => (i === index ? { ...q, pregunta: value } : q))
    );
  };

  const handleDetailChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    const { name, value } = e.target;
    let newValue: string | number | null = value === "" ? null : value;

    if (name === "type") {
      newValue = Number(value); // Convertir explícitamente a número
    } else if (name === "age_start" || name === "age_end") {
      const numValue = value === "" ? null : Number(value);
      if (numValue !== null) {
        if (name === "age_start" && numValue < 14) newValue = 14;
        if (name === "age_end" && numValue > 130) newValue = 130;
      }
    }

    setStudyDetails((prev) => ({
      ...prev,
      [name]:
        newValue === null
          ? null
          : name === "age_start" || name === "age_end" || name === "type"
          ? Number(newValue)
          : value,
    }));
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
              Estadística
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
          {isEditing ? (
            // En modo edición, mostrar las estadísticas
            <div className="mt-8">
              <div className="flex gap-4">
                <i
                  className="fas fa-chevron-left text-white bg-[#1c2434] p-2 rounded-full flex items-center justify-center w-8 h-8 cursor-pointer"
                  onClick={() => {
                    setShowForm(false);
                    setStudyStats(null); // Limpiar estadísticas al cerrar
                  }}
                ></i>
                <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">
                  Estadísticas del Estudio
                </h2>
              </div>
              {studyStats ? (
                <StudyStatsView stats={studyStats} />
              ) : (
                <div className="text-gray-500">Cargando estadísticas...</div>
              )}
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

              {/* Detalles generales del estudio - Información Básica */}
              <div className="bg-white dark:bg-gray-900 p-5 rounded-lg border border-gray-100 dark:border-gray-800 mb-6">
                <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">
                  Información Básica
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 dark:text-white font-medium mb-2">
                      Descripción:
                    </label>
                    <textarea
                      name="descripcion"
                      value={studyDetails.descripcion}
                      onChange={handleDetailChange}
                      placeholder="Descripción del estudio"
                      className="w-full h-[100px] rounded border border-stroke dark:border-strokedark py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-boxdark dark:text-white"
                      rows={4}
                    />
                  </div>
                  <div className="md:col-span-2">
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
                      maxSize={100 * 1024 * 1024}
                      label="Sube una imagen para el estudio"
                      initialPreview={imagePreview || studyDetails.imagen}
                      className="w-full rounded border border-stroke py-3 px-4 text-black dark:text-white dark:border-strokedark dark:bg-boxdark focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Alcance del Estudio */}
              <div className="bg-white dark:bg-gray-900 p-5 rounded-lg border border-gray-100 dark:border-gray-800 mb-6">
                <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">
                  Alcance del Estudio
                </h3>
                <div className="form-group mb-4">
                  <label className="block text-gray-700 dark:text-white font-medium mb-2">
                    Selecciona el tipo de estudio:
                  </label>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <label className="flex items-center p-3 border rounded-md cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                      <input
                        type="radio"
                        name="type"
                        value="1"
                        checked={studyDetails.type === 1}
                        onChange={handleDetailChange}
                        className="mr-3"
                      />
                      <div>
                        <span className="font-medium block mb-1">General</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Enviar a todos los usuarios disponibles
                        </span>
                      </div>
                    </label>
                    <label className="flex items-center p-3 border rounded-md cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                      <input
                        type="radio"
                        name="type"
                        value="2"
                        checked={studyDetails.type === 2}
                        onChange={handleDetailChange}
                        className="mr-3"
                      />
                      <div>
                        <span className="font-medium block mb-1">
                          Segmentado
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Enviar según criterios demográficos
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Campos de segmentación */}
                {studyDetails.type === 2 && (
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
                          value={studyDetails.gender || ""}
                          onChange={handleDetailChange}
                          className="w-full rounded border border-stroke py-2 px-4 dark:bg-boxdark dark:border-strokedark dark:text-white"
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
                            value={studyDetails.age_start ?? ""}
                            onChange={handleDetailChange}
                            className="w-full rounded border border-stroke py-2 px-4 dark:bg-boxdark dark:border-strokedark dark:text-white"
                            required={studyDetails.type === 2}
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
                            value={studyDetails.age_end ?? ""}
                            onChange={handleDetailChange}
                            className="w-full rounded border border-stroke py-2 px-4 dark:bg-boxdark dark:border-strokedark dark:text-white"
                            required={studyDetails.type === 2}
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
                          maxDistritos={5}
                        />
                      </div>
                    </div>
                  </div>
                )}
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
          title="Mis Estudios de mercado"
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
