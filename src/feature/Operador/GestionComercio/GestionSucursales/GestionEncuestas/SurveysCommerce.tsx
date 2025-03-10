import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { LoadingDots } from "../../../../../shared/components/Atoms/LoadingDots/LoadingDots";
import TablaItem, {
  RowData,
  Column,
} from "../../../../../shared/components/Molecules/TablaItem/TablaItem";
import {
  createSurvey,
  getSurveyById,
  getSurveysByBranch,
  updateSurvey,
} from "../../../../../core/services/Operador/Surveys/SurveysService";
import {
  Question,
  Answer,
  SurveyStats,
} from "../../../../../core/models/surveys";
import SurveyStatsView from "../../../../../shared/components/Molecules/SurveyStatsView/SurveyStatsView";
import { Icon } from "@iconify/react/dist/iconify.js";

interface SurveysProps {
  branchId: string | null;
  selectedBranchName: string;
  branchAddress: string;
  onBackClick?: () => void;
}

function SurveysCommerce({
  onBackClick,
  branchId,
  branchAddress,
  selectedBranchName,
}: SurveysProps) {
  const [data, setData] = useState<RowData[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSurveyId, setCurrentSurveyId] = useState<number | null>(null);
  const [preguntas, setPreguntas] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [surveyStats, setSurveyStats] = useState<SurveyStats | null>(null);

  const fetchSurveys = async () => {
    if (!branchId) {
      Swal.fire("Error", "No se ha seleccionado una sucursal válida.", "error");
      return;
    }

    setIsLoading(true);
    try {
      const response = await getSurveysByBranch(branchId); // Envía el branchId
      if (response.length === 0) {
        Swal.fire({
          icon: "info",
          title: "No hay encuestas",
          text: "No hay encuestas disponibles para mostrar.",
        });
      }
      const formattedData = response.map((survey: any) => ({
        id: survey.id,
        titulo: survey.titulo,
        puntos: survey.puntos,
        activo: survey.activo,
        sucursal: survey.branch_id,
        created_at: survey.fecha_creacion,
        imagen: survey.imagen,
      }));
      setData(formattedData);
    } catch (error) {
      Swal.fire("Error", "No se pudieron cargar las encuestas.", "error");
    } finally {
      setIsLoading(false);
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

    // Validar que haya al menos una pregunta activa
    const activeQuestions = preguntas.filter((q) => !q.delete);
    if (activeQuestions.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Encuesta vacía",
        text: "Debes agregar al menos una pregunta a la encuesta.",
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
      const formData = {
        branch_id: Number(branchId),
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
                    // Solo enviamos la respuesta, sin ID
                    respuesta: a.respuesta.trim(),
                  })),
              };
            } else {
              // Para preguntas existentes
              return {
                id: q.id,
                pregunta: q.pregunta.trim(),
                delete: q.delete || false,
                answers: q.answers
                  .filter((a) => !a.delete || (!isNewAnswer(a.id) && a.delete))
                  .map((a) => {
                    if (isNewAnswer(a.id)) {
                      // Para respuestas nuevas
                      return {
                        respuesta: a.respuesta.trim(),
                      };
                    } else {
                      // Para respuestas existentes
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

      if (isEditing && currentSurveyId) {
        await updateSurvey(currentSurveyId, formData);
        Swal.fire("Éxito", "Encuesta actualizada correctamente.", "success");
      } else {
        await createSurvey(formData);
        Swal.fire("Éxito", "Encuesta creada correctamente.", "success");
      }

      clearForm();
      setShowForm(false);
      fetchSurveys();
    } catch (error: any) {
      Swal.fire(
        "Error",
        error.message || "No se pudo guardar la encuesta.",
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

    setPreguntas((prevPreguntas: Question[]) =>
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
    setIsEditing(true);
    setCurrentSurveyId(row.id);
    setShowForm(true);
    setIsLoading(true);
    try {
      const survey = await getSurveyById(row.id);
      console.log("Datos de la encuesta:", survey);

      // Configurar las preguntas para edición
      setPreguntas(
        survey.data.preguntas_y_respuestas?.map((q) => ({
          id: q.id,
          pregunta: q.pregunta,
          answers: q.respuestas.map((a) => ({
            id: a.id,
            respuesta: a.respuesta,
          })),
        })) || []
      );

      // Guardar las estadísticas incluyendo preguntas_y_respuestas
      if (survey.data.total_preguntas) {
        setSurveyStats({
          total_preguntas: survey.data.total_preguntas,
          rango_edades: survey.data.rango_edades || {},
          total_respuestas: survey.data.total_respuestas || {
            female_respuestas: 0,
            male_respuestas: 0,
          },
          respuestas_por_distrito: survey.data.respuestas_por_distrito || [],
          preguntas_y_respuestas: survey.data.preguntas_y_respuestas || [],
        });
      }
    } catch (error) {
      Swal.fire(
        "Error",
        "No se pudieron cargar los datos de la encuesta.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  //Se oculto el delete
  // const onDelete = async (row: RowData) => {
  //   Swal.fire({
  //     title: "¿Estás seguro?",
  //     text: `Se eliminará la encuesta "${row.titulo}". Esta acción no se puede deshacer.`,
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonText: "Sí, eliminar",
  //     cancelButtonText: "Cancelar",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         await deleteSurvey(row.id);
  //         Swal.fire("Eliminado", "La encuesta ha sido eliminada.", "success");
  //         fetchSurveys();
  //       } catch (error) {
  //         Swal.fire("Error", "No se pudo eliminar la encuesta.", "error");
  //       }
  //     }
  //   });
  // };

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
  const validateAnswerContent = (answer: Answer): boolean => {
    return answer.respuesta.trim() !== "";
  };

  // Función mejorada para validar las respuestas de una pregunta
  const validateQuestionAnswers = (
    question: Question
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
    const newQuestion: Question = {
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

  const columns: Column[] = [
    {
      Header: "Acciones",
      Cell: (row: RowData) => (
        <div className="flex space-x-2">
          <button
            className="relative p-2 bg-sky-500  text-slate-50 flex items-center rounded-lg group overflow-hidden transition-all duration-500 ease-in-out w-[2rem] hover:w-[7rem]"
            onClick={() => onEdit(row)}
          >
            <Icon
              icon="healthicons:low-bars-outline"
              className="flex-shrink-0 relative right-1"
              width="25"
              height="24"
            />
            <span className="ml-0 opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 group-hover:ml-2 transition-all duration-500 ease-in-out delay-100">
              Estadistica
            </span>
          </button>
        </div>
      ),
    },
    { Header: "Título", accessor: "titulo" },
    { Header: "Puntos", accessor: "puntos" },
    { Header: "Fecha de Creación", accessor: "created_at" },
    {
      Header: "Estado",
      accessor: "activo",
      Cell: (row: RowData) => (
        <span className={row.activo ? "text-green-500" : "text-red-500"}>
          {row.activo ? "Activo" : "Inactivo"}
        </span>
      ),
    },
  ];

  useEffect(() => {
    fetchSurveys();
  }, []);

  const getSaveButtonClass = () => {
    if (isLoading) return "bg-gray-400 text-white cursor-not-allowed";
    return "bg-primary text-gray hover:bg-opacity-90";
  };

  return (
    <div className="container mx-auto my-8">
      {showForm ? (
        <div className="formulario">
          {isEditing ? (
            // En modo edición, solo mostrar las estadísticas
            <div className="mt-8">
              <div className="flex gap-4">
                <i
                  className="fas fa-chevron-left text-white bg-[#1c2434] p-2 rounded-full flex items-center justify-center w-8 h-8 cursor-pointer"
                  onClick={() => setShowForm(false)}
                ></i>
                <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">
                  Estadísticas de la Encuesta
                </h2>
              </div>
              {surveyStats && <SurveyStatsView stats={surveyStats} />}
            </div>
          ) : (
            <div className="flex flex-col gap-4 shadow-xl p-8 bg-white-translucent dark:bg-boxdark rounded-lg">
              <div className="w-full flex gap-4 mb-8 items-start ">
                <i
                  className="fas fa-chevron-left text-white bg-[#1c2434] p-2 rounded-full flex items-center justify-center w-8 h-8 cursor-pointer"
                  onClick={() => setShowForm(false)}
                ></i>
                <div className="flex flex-col">
                  <label className="text-title-md2 font-semibold text-black dark:text-white">
                    {isEditing
                      ? `Editar Encuesta de: ${selectedBranchName}`
                      : `Agregar Encuesta a: ${selectedBranchName}`}
                  </label>
                  <p>{branchAddress}</p>
                </div>
              </div>
              <div>
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

              <div className="flex justify-end gap-4">
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
          title="Mis Encuestas"
          showBackButton={true}
          onBackClick={onBackClick}
          buttonLabel="Nueva Encuesta"
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

export default SurveysCommerce;
