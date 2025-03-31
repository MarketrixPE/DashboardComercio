import React, { useEffect, useState } from "react";
import LogoDark from "../../../assets/images/logo/logo-azul.png";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import { useUserRole } from "../../../core/utils/UserRoleContext";
import { login } from "../../../core/services/AuthService";
import { clearLocalStorage } from "../../../core/Interceptors/apiClient";
import Uploader from "../../../shared/components/Atoms/Uploader";
import Swal from "sweetalert2";
import { LoadingDots } from "../../../shared/components/Atoms/LoadingDots/LoadingDots";
import { useFormValidation } from "../../../shared/components/Auth/useFormValidation";
import { InputField } from "../../../shared/components/Atoms/InputField/InputField";
import { useDocumentValidation } from "../../../core/services/DocumentValidation/DocumentValidationService";
import {
  formatDate,
  useCommerceService,
} from "../../../core/services/Operador/UserCommerce/UserCommerceService";
import CustomDropdown from "../../../shared/components/Atoms/Dropdown/Dropdown";
import { findUbigeoIds } from "../../../core/models/ubigueo/ubigeo";
import { AnimatePresence, motion } from "framer-motion";
import {
  UserPlus,
  BarChart3,
  MessageCircle,
  PieChart,
  Bell,
  X,
  ShoppingBag,
  Star,
  TrendingUp,
  Users,
  DollarSign,
  Droplets,
  Globe,
} from "lucide-react";
import IconWrapper from "../../../shared/components/Atoms/IconWrapper/IconWrapper";
import TypeWriter from "../../../shared/components/Atoms/TypeWriter/TypeWriter";
import SplineBackground from "../../../shared/components/Organisms/Spline/SplineBackground";

interface Benefit {
  id: number;
  icon: JSX.Element;
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  caseStudy: string;
  stats?: string;
}

const SignUp: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [phone, setPhone] = useState("+51");
  const [alias, setAlias] = useState("");
  const [nomComercio, setnomComercio] = useState("");
  const [referalCode, setReferalCode] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const { registerCommerce } = useCommerceService();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setRole } = useUserRole();
  const { errors, validateForm } = useFormValidation();
  const [formStep, setFormStep] = useState(1);
  const [ruc, setRuc] = useState("");
  const [dni, setDni] = useState("");
  const [isValidatingRuc, setIsValidatingRuc] = useState(false);
  const [isValidatingDni, setIsValidatingDni] = useState(false);
  const [membershipId, setMembershipId] = useState<number | "">(3);
  const { validateDNI, validateRUC } = useDocumentValidation();

  interface AdminData {
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    fecha_nacimiento: string;
    gender: string;
    distrito: string;
    provincia: string;
    departamento: string;
  }

  const [businessData, setBusinessData] = useState({
    razon_social: "",
    distrito: "",
    provincia: "",
    departamento: "",
  });

  const [adminData, setAdminData] = useState<AdminData>({
    nombres: "",
    apellido_paterno: "",
    apellido_materno: "",
    fecha_nacimiento: "",
    gender: "",
    distrito: "",
    provincia: "",
    departamento: "",
  });

  useEffect(() => {
    clearLocalStorage();
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    // Mantener +51 como prefijo
    if (!input.startsWith("+51")) {
      setPhone("+51" + input.replace(/^\+?51/, ""));
    } else {
      setPhone(input);
    }
  };

  const handleNextStep = () => {
    if (!ruc || !dni) {
      Swal.fire({
        icon: "info",
        title: "Ruc y DNI necesario",
        text: "Por favor, ingrese el RUC y DNI para validar su identidad",
        confirmButtonText: "Entendido",
      });
      return;
    }

    // if (!businessData.razon_social || !adminData.nombres) {
    //   Swal.fire({
    //     title: "Error",
    //     text: "Por favor, valide el RUC y DNI antes de continuar",
    //     icon: "error",
    //     confirmButtonText: "Entendido",
    //   });
    //   return;
    // }

    setFormStep(2);
  };

  const handlePrevStep = () => {
    if (formStep === 1) {
      setIsRegister(false);
    } else {
      setFormStep(1);
    }
  };

  const handleRucChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 11) {
      setRuc(value);
      if (value.length === 11) {
        if (!/^(10|15|17|20)/.test(value)) {
          Swal.fire({
            title: "Error",
            text: "El RUC debe empezar con 10, 15, 17 o 20",
            icon: "error",
            confirmButtonText: "Entendido",
          });
          return;
        }

        setIsValidatingRuc(true);
        try {
          const result = await validateRUC(value);
          console.log(result);
          if (result.isValid && result.data) {
            // Actualizar datos del comercio
            setBusinessData({
              razon_social: result.data.razon_social,
              distrito: result.data.distrito,
              provincia: result.data.provincia,
              departamento: result.data.departamento,
            });

            if (
              result.data.activo !== "ACTIVO" ||
              result.data.condicion !== "HABIDO"
            ) {
              Swal.fire({
                title: "Advertencia",
                html: `El RUC tiene el siguiente estado:<br/>
                    Condición: ${result.data.condicion}<br/>
                    Estado: ${result.data.activo}`,
                icon: "warning",
                confirmButtonText: "Entendido",
              });
            }
          }
        } catch (error) {
          console.error("Error validando RUC:", error);
          Swal.fire({
            title: "Error",
            text: "No se pudo validar el RUC",
            icon: "error",
            confirmButtonText: "Entendido",
          });
        } finally {
          setIsValidatingRuc(false);
        }
      }
    }
  };

  const handleDniChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 8) {
      setDni(value);
      if (value.length === 8) {
        setIsValidatingDni(true);
        try {
          const result = await validateDNI(value);
          console.log("validateDNI", result);
          if (result.isValid && result.data) {
            const ubigeoIds = findUbigeoIds(
              result.data.departamento,
              result.data.provincia,
              result.data.distrito
            );

            if (
              !ubigeoIds.departamentoId ||
              !ubigeoIds.provinciaId ||
              !ubigeoIds.distritoId
            ) {
              console.error(
                "No se pudieron encontrar todos los IDs de ubigeo:",
                {
                  departamento: result.data.departamento,
                  provincia: result.data.provincia,
                  distrito: result.data.distrito,
                  ubigeoIds,
                }
              );

              Swal.fire({
                title: "Advertencia",
                text: "No se pudieron validar los datos de ubicación correctamente",
                icon: "warning",
                confirmButtonText: "Entendido",
              });
            }

            setAdminData({
              nombres: result.data.nombres,
              apellido_paterno: result.data.apellido_paterno,
              apellido_materno: result.data.apellido_materno,
              fecha_nacimiento: formatDate(result.data.fecha_nacimiento),
              gender: result.data.sexo,
              distrito: ubigeoIds.distritoId?.toString() || "",
              provincia: ubigeoIds.provinciaId?.toString() || "",
              departamento: ubigeoIds.departamentoId?.toString() || "",
            });

            setName(result.data.nombres);
            setLastName(
              `${result.data.apellido_paterno} ${result.data.apellido_materno}`
            );
          }
        } catch (error) {
          console.error("Error validando DNI:", error);
          Swal.fire({
            title: "Error",
            text: "No se pudo validar el DNI",
            icon: "error",
            confirmButtonText: "Entendido",
          });
        } finally {
          setIsValidatingDni(false);
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (isRegister) {
      const isValid = validateForm({
        email,
        password,
        passwordConfirmation,
        phone,
        name,
        lastName,
        alias,
        avatar,
        referalCode,
        nomComercio,
        membershipId,
        isRegister: true,
      });

      if (!isValid) return;

      try {
        setIsLoading(true);

        if (!businessData.razon_social || !adminData.nombres) {
          throw new Error("Por favor, valide el RUC y DNI antes de continuar");
        }

        const registrationData = {
          name: adminData.nombres,
          last_name: `${adminData.apellido_paterno} ${adminData.apellido_materno}`,
          email,
          password,
          password_confirmation: passwordConfirmation,
          phone,
          role: 2,
          alias,
          avatar,
          referal_code: referalCode || undefined,
          dni: dni,
          fecha_nacimiento: adminData.fecha_nacimiento,
          gender: adminData.gender,
          numero_documento: ruc,
          razon_social: businessData.razon_social,
          distrito: adminData.distrito,
          provincia: adminData.provincia,
          departamento: adminData.departamento,
          nombre_comercial: nomComercio,
          membership_id: membershipId,
        };

        await registerCommerce(registrationData);

        await Swal.fire({
          title: "¡Registro Exitoso!",
          text: "Por favor, verifica tu correo electrónico para activar tu cuenta",
          icon: "success",
          confirmButtonText: "Entendido",
        });

        setIsRegister(false);
      } catch (err: any) {
        console.error("Error en registro:", err);

        if (err.validationErrors) {
          // Mapeo de nombres de campos para mensajes en español
          interface ValidationErrors {
            [key: string]: string[]; // cada campo puede tener un array de mensajes de error
          }

          // En el catch del handleSubmit:
          if (err.validationErrors) {
            const fieldTranslations: { [key: string]: string } = {
              email: "Correo electrónico",
              avatar: "Imagen del comercio",
              numero_documento: "RUC",
              phone: "Teléfono",
              alias: "Alias",
              password: "Contraseña",
              password_confirmation: "Confirmación de contraseña",
            };

            const messageTranslations: { [key: string]: string } = {
              "El correo electrónico ya está registrado.":
                "El correo electrónico ya está registrado",
              "La imagen del comercio es requerida.":
                "La imagen del comercio es requerida",
              "The numero documento has already been taken.":
                "Este RUC ya está registrado en el sistema",
              "The email has already been taken":
                "Este correo electrónico ya está registrado",
              "The alias field must not be greater than 15 characters.":
                "El alias no debe tener más de 15 caracteres",
            };

            const errorMessages = Object.entries(
              err.validationErrors as ValidationErrors
            )
              .map(([field, messages]) => {
                const fieldName = fieldTranslations[field] || field;
                const translatedMessages = (messages as string[]).map(
                  (msg) => messageTranslations[msg] || msg
                );
                return `• ${fieldName}: ${translatedMessages.join(", ")}`;
              })
              .join("<br>");

            await Swal.fire({
              title: "Por favor, corrige los siguientes errores",
              html: errorMessages,
              icon: "warning",
              confirmButtonText: "Entendido",
              confirmButtonColor: "#3085d6",
            });
          }
        } else {
          // Manejar otros tipos de errores
          let errorMessage = err.message || "Error en el registro";

          const generalErrorMessages = {
            "The email has already been taken":
              "Este correo electrónico ya está registrado",
            "The phone has already been taken":
              "Este teléfono ya está registrado",
            "The password field must be at least 8 characters.":
              "La contraseña debe tener al menos 8 caracteres",
            "The password confirmation does not match":
              "Las contraseñas no coinciden",
          };

          Object.entries(generalErrorMessages).forEach(([english, spanish]) => {
            if (errorMessage.includes(english)) {
              errorMessage = errorMessage.replace(english, spanish);
            }
          });

          await Swal.fire({
            title: "Por favor, corrige los siguientes errores",
            text: errorMessage,
            icon: "warning",
            confirmButtonText: "Entendido",
            confirmButtonColor: "#3085d6",
          });
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      const isValid = validateForm({
        email,
        password,
        isRegister: false,
      });

      if (!isValid) return;

      try {
        setIsLoading(true);
        const data = await login(email, password);
        const role =
          data.role === 2
            ? "commerce"
            : data.role === 3
            ? "branch_manager"
            : "commerce";
        setRole(role === "branch_manager" ? "commerce" : role);
        setShowThanks(true);

        const dashboard =
          data.role === 3 ? "/dashboard-sucursal" : "/mi-dashboard";
        setTimeout(() => navigate(dashboard));
      } catch (err: any) {
        if (err.message === "Verifique su Correo") {
          setError("Verifique su Correo");
        } else {
          setError(err.message || "Credenciales Invalidas");
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const [showCard, setShowCard] = useState<boolean>(false);
  const membershipPlans = [{ id: 3, text: "Infinity" }];
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);

  const benefits: Benefit[] = [
    {
      id: 1,
      icon: <MessageCircle className="w-20 h-20 text-blue-400" />,
      title: "Encuestas Smart",
      shortDescription:
        "Crea encuestas personalizadas, obtén feedback en tiempo real y comprende mejor a tu público objetivo con análisis detallados.",
      fullDescription:
        "Nuestras Encuestas Smart son herramientas avanzadas que te permiten crear cuestionarios personalizados dirigidos a tu público objetivo. Cada encuesta completada por un Usuario Smart genera 20 puntos para ellos, incentivando altas tasas de participación. Obtén información demográfica precisa gracias a nuestra segmentación por distrito, edad y género.",
      features: [
        "Segmentación por distrito con visualización en mapa interactivo",
        "Filtros dinámicos por rango de edad para análisis generacional",
        "Selección por género con estadísticas comparativas",
        "Exportación de datos en múltiples formatos",
        "Plantillas prediseñadas para distintos objetivos comerciales",
        "Los usuarios ganan 20 Puntos Smart por cada encuesta realizada",
      ],
      caseStudy:
        "La Cafetería Aroma implementó encuestas smart obteniendo 240 respuestas en 48 horas, identificando que el 78% de sus clientes entre 25-34 años prefería opciones veganas, lo que resultó en un nuevo menú que aumentó las ventas en un 23%.",
      stats:
        "Nuestras encuestas tienen una tasa de respuesta promedio del 68%, muy superior al 15-25% de la industria.",
    },
    {
      id: 2,
      icon: <BarChart3 className="w-20 h-20 text-blue-400" />,
      title: "Reducción de Pérdidas",
      shortDescription:
        "Convierte potenciales desechos en nuevas oportunidades de venta, reduciendo el desperdicio y aumentando tu rentabilidad.",
      fullDescription:
        "Reduce significativamente el desperdicio de alimentos y productos perecibles, convirtiendo lo que serían pérdidas en oportunidades de venta. En lugar de desechar productos en buen estado, ofrécelos con descuentos atractivos a través de nuestra plataforma. Nuestra app atrae clientes a tu establecimiento en tiempo real, permitiéndote ocupar mesas o capacidad libre en horas de baja concurrencia.",
      features: [
        "Conversión de excedentes en ventas adicionales",
        "Reducción del desperdicio de alimentos hasta en un 75%",
        "Atracción de nuevos clientes de forma constante",
        "Optimización de horas de baja afluencia",
        "Oportunidades de cross-selling y up-selling",
      ],
      caseStudy:
        "Una panadería implementó promociones antes del cierre enviando notificaciones de descuentos del 40%. Lograron vender el 95% de sus productos diarios, reduciendo el desperdicio en un 85% y atrayendo a 120 nuevos clientes mensuales que posteriormente realizaron compras regulares.",
      stats:
        "A nivel mundial, el 41% de usuarios hacen alguna compra extra en el establecimiento y el 61% descubre un nuevo establecimiento gracias a promociones como las de Puntos Smart.",
    },
    {
      id: 3,
      icon: <PieChart className="w-20 h-20 text-blue-400" />,
      title: "Panel de Control Smart",
      shortDescription:
        "Visualiza datos segmentados en gráficos intuitivos y comprende el comportamiento de diferentes grupos demográficos en tu mercado.",
      fullDescription:
        "Nuestro Panel de Control Smart transforma datos complejos en visualizaciones intuitivas y fáciles de interpretar. Obtén información valiosa sobre tus clientes, observa patrones de comportamiento, identifica oportunidades de mercado y detecta tendencias emergentes a través de gráficos dinámicos e informes personalizados que te ayudarán a optimizar tu estrategia comercial.",
      features: [
        "Estadísticas por distrito con comparativa de potencial de mercado",
        "Análisis generacional por grupo etario con tendencias de consumo",
        "Distribución por género con preferencias de producto",
        "Reportes automáticos con la frecuencia que elijas",
        "Métricas de conversión y retención de clientes",
        "Benchmarking con negocios similares en tu zona",
      ],
      caseStudy:
        "Un restaurante familiar utilizó las estadísticas del panel de control para identificar que familias con niños pequeños frecuentaban su local principalmente los domingos entre 12-3pm. Implementaron un menú infantil y actividades para niños en ese horario, incrementando sus ventas dominicales en un 35%.",
      stats:
        "Los comercios que utilizan activamente nuestro Panel de Control reportan un incremento del 28% en ventas tras 3 meses.",
    },
    {
      id: 4,
      icon: <Bell className="w-20 h-20 text-blue-400" />,
      title: "Promociones Smart en Tiempo Real",
      shortDescription:
        "Envía ofertas exclusivas geolocalizadas a usuarios cercanos a tu negocio en el momento preciso para maximizar ventas.",
      fullDescription:
        "Nuestras Promociones Smart utilizan tecnología de geolocalización avanzada para enviar notificaciones de ofertas a Usuarios Activos en Tiempo Real. Aumenta la ocupación de tu establecimiento con promociones ilimitadas, define tus productos en oferta y los horarios que más te convengan. Gracias a la Realidad Aumentada, puedes incluir fotografías de productos en 3D para mayor atractivo visual.",
      features: [
        "Geolocalización para enviar promociones a usuarios cercanos",
        "Notificaciones en tiempo real con resultados inmediatos",
        "Visualizaciones en 3D con realidad aumentada",
        "Mayor frecuencia de visitas por cliente",
        "Atracción constante de nuevos clientes",
        "Ocupación optimizada de tu establecimiento",
      ],
      caseStudy:
        "Un cine implementó promociones smart para funciones con baja ocupación. Enviando ofertas una hora antes de la función a usuarios cercanos, lograron aumentar la ocupación de salas del 15% al 78% en promedio, incrementando además las ventas de snacks y bebidas.",
      stats:
        "Las promociones geolocalizadas tienen una tasa de conversión 5 veces mayor que las promociones tradicionales.",
    },
  ];

  const openModal = (benefitId: number) => {
    const benefit = benefits.find((benefit) => benefit.id === benefitId);
    if (benefit) {
      setSelectedBenefit(benefit);
    }
  };

  const closeModal = () => {
    setSelectedBenefit(null);
  };

  const handleShowCard = () => {
    setShowCard(true);
  };

  const [activeTab, setActiveTab] = useState("all");

  const testimonials = [
    {
      id: 1,
      type: "commerce",
      name: "Alejandra Mendoza",
      business: "Restaurante Sabores del Mar",
      image: "/testimonials/alejandra.jpg", // Reemplazar con ruta real
      quote:
        "Gracias a Puntos Smart, hemos reducido nuestro desperdicio de alimentos en un 75% y hemos atraído a muchos clientes nuevos que ahora son habituales. El panel de control nos da información valiosa sobre nuestros clientes.",
      stats: [
        { label: "Reducción de desperdicio", value: "75%" },
        { label: "Nuevos clientes mensuales", value: "+45" },
        { label: "Aumento en ventas", value: "32%" },
      ],
    },
    {
      id: 2,
      type: "commerce",
      name: "Carlos Vega",
      business: "Café Aroma",
      image: "/testimonials/carlos.jpg", // Reemplazar con ruta real
      quote:
        "Implementamos las Encuestas Smart y descubrimos preferencias que desconocíamos. Gracias a esto, adaptamos nuestro menú y ahora los fines de semana tenemos el local lleno. Las promociones en tiempo real nos ayudan a llenar mesas en horarios que antes estaban vacíos.",
      stats: [
        { label: "Aumento en reservas", value: "58%" },
        { label: "Encuestas completadas", value: "240+" },
        { label: "ROI de la inversión", value: "415%" },
      ],
    },
    {
      id: 3,
      type: "user",
      name: "Sofía Ramírez",
      image: "/testimonials/sofia.jpg", // Reemplazar con ruta real
      quote:
        "Desde que uso Puntos Smart no solo ahorro dinero, sino que descubrí lugares increíbles cerca de mi oficina. Me encanta saber que al usar la app estoy ayudando a reducir el desperdicio de alimentos. Ya he acumulado más de 500 puntos que he canjeado en diferentes comercios.",
      stats: [
        { label: "Puntos acumulados", value: "520" },
        { label: "Ahorro mensual", value: "S/180" },
        { label: "Nuevos lugares descubiertos", value: "12" },
      ],
    },
    {
      id: 4,
      type: "user",
      name: "Martín López",
      image: "/testimonials/martin.jpg", // Reemplazar con ruta real
      quote:
        "Las notificaciones de ofertas cercanas son geniales. La semana pasada recibí un alert de mi restaurante favorito con 40% de descuento justo cuando estaba buscando dónde almorzar. La app es intuitiva y me encanta completar encuestas para ganar puntos adicionales.",
      stats: [
        { label: "Encuestas completadas", value: "28" },
        { label: "Puntos ganados", value: "610" },
        { label: "Ofertas aprovechadas", value: "34" },
      ],
    },
  ];

  // Filtrar testimonios según la pestaña activa
  const filteredTestimonials =
    activeTab === "all"
      ? testimonials
      : testimonials.filter((t) => t.type === activeTab);

  const impactData = [
    {
      icon: <ShoppingBag className="w-6 h-6 text-blue-400" />,
      value: "41%",
      label: "de usuarios hacen compras adicionales",
    },
    {
      icon: <Users className="w-6 h-6 text-blue-400" />,
      value: "61%",
      label: "descubre nuevos establecimientos",
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-blue-400" />,
      value: "28%",
      label: "de aumento promedio en ventas",
    },
  ];

  // Datos de impacto ambiental ampliados
  const environmentalData = [
    {
      icon: <Globe className="w-6 h-6 text-green-400" />,
      value: "10%",
      label:
        "de emisiones de gases de efecto invernadero son causadas por desperdicio de alimentos",
    },
    {
      icon: <Droplets className="w-6 h-6 text-green-400" />,
      value: "25%",
      label: "del agua dulce se destina a alimentos que se desperdician",
    },
    {
      icon: <DollarSign className="w-6 h-6 text-green-400" />,
      value: "1.1B",
      label: "de dólares perdidos anualmente por desperdicio alimentario",
    },
  ];

  return (
    <>
      <SplineBackground />
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Capa de fondo con efecto glassmorphism */}
        <div className="absolute inset-0 backdrop-filter backdrop-blur-lg shadow-lg"></div>

        {/* Contenido del header */}
        <div className="relative max-w-[111rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center overflow-hidden">
              <img className="h-8 w-auto" src={LogoDark} alt="Logo" />
            </div>

            {/* Navigation Links */}
            <div className="flex">
              <nav className="hidden md:flex space-x-8">
                <a
                  href="#"
                  className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium"
                >
                  ¿Cómo funcionamos?
                </a>
                <a
                  href="#"
                  className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium"
                >
                  Preguntas frecuentes
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <div className="h-screen overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-center min-h-screen relative z-[1] p-4 md:p-[5%] max-[767px]:mt-16 max-[767px]:justify-center">
          {/* Contenido - Centrado en móvil, alineado a la izquierda en desktop */}
          <div className="w-full md:w-1/2 max-w-2xl text-white text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-hero relative">
              <span
                className="block text-5xl md:text-8xl mb-0 leading-none bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 600 }}
              >
                Puntos
              </span>
              <span className="block fredoka-SemiBold text-6xl md:text-9xl font-black tracking-tighter mb-4 md:mb-8 leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#00d6bd] to-[#FFF]">
                Smart
              </span>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-cyan-400/10 rounded-full blur-3xl -z-10"></div>
            </h1>

            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/0 via-cyan-400/30 to-cyan-400/0 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>

              <p className="text-xl md:text-2xl font-light fredoka-SemiBold text-gray-300 leading-relaxed max-w-xl tracking-wide relative z-10 mx-auto md:mx-0">
                <span className="text-cyan-300 font-medium">
                  Aumenta tus ventas
                </span>{" "}
                y{" "}
                <span className="text-cyan-300 font-medium">
                  fideliza clientes
                </span>{" "}
                con nuestras{" "}
                <span className="inline-block min-w-40">
                  <TypeWriter
                    words={[
                      "PROMOCIONES",
                      "ENCUESTAS",
                      "ESTADISTICAS",
                      "HERRAMIENTAS",
                    ]}
                    highlightColor="#3944EB"
                    className="text-xl md:text-2xl"
                  />{" "}
                </span>
                <span className="text-white font-medium animate-pulse">
                  smart
                </span>{" "}
                y <span className="text-white font-medium">medibles</span>.
              </p>
            </div>

            {/* Línea decorativa con animación - centrada en móvil */}
            <div className="relative mt-8 group mx-auto md:mx-0">
              <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-300/0 via-white/80 to-cyan-300/0 -translate-x-full animate-shimmer"></div>
              </div>
            </div>

            {/* Botón CTA - centrado en móvil */}
            <button
              className="mt-8 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-full shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center gap-2 group mx-auto md:mx-0"
              onClick={handleShowCard}
            >
              <span>Inicia Sesión / Regístrate Aquí</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Tarjeta de login/register - Ancho adaptativo */}
          <div
            className={`relative w-[27rem] items-center h-[400px] perspective-1000 transition-all duration-500 
                        max-[767px]:absolute max-[767px]:z-[99] max-[767px]:flex max-[767px]:justify-cente max-[767px]:justify-center  ${
                          showCard
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 translate-x-20 pointer-events-none"
                        }`}
          >
            <div
              className={`card ${
                showThanks ? "show-thanks" : isRegister ? "flipped" : ""
              }`}
            >
              {/* Botón de cierre (X) en la esquina superior derecha */}
              <button
                type="button"
                className="absolute right-2 top-2 z-10  text-white rounded-full w-8 h-8 flex items-center justify-center  transition-colors duration-200"
                onClick={() => setShowCard(false)}
                aria-label="Cerrar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="form login-form">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-center mb-5 text-white">
                    Iniciar Sesión
                  </h2>
                </div>

                {error && <p className="error">{error}</p>}

                <form onSubmit={handleSubmit}>
                  <InputField
                    label="Correo"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                    placeholder="Correo electrónico"
                    required
                  />
                  <InputField
                    label="Contraseña"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
                    placeholder="Contraseña"
                    required
                    autocomplete="current-password"
                  />
                  <button type="submit" className="btn" disabled={isLoading}>
                    {isLoading ? (
                      <LoadingDots
                        text={
                          isRegister ? "Registrando..." : "Iniciando sesión..."
                        }
                      />
                    ) : isRegister ? (
                      "Registrarse"
                    ) : (
                      "Iniciar Sesión"
                    )}
                  </button>
                </form>

                <p className="text-sm text-center mt-4">
                  ¿No tienes cuenta?{" "}
                  <button
                    type="button"
                    className="link"
                    onClick={() => setIsRegister(true)}
                  >
                    Regístrate aquí
                  </button>
                </p>
              </div>

              <div className="form register-form">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-center mb-5 text-white">
                    ¡Registra tu Comercio Smart ahora mismo!
                  </h2>
                  <span className="bg-[#3944eb] p-2 text-white rounded-lg">
                    Plan <span className="font-bold">Infinity</span> gratis
                    durante los primeros 3 meses
                  </span>
                </div>

                {error && <p className="error">{error}</p>}

                <div className="h-auto max-h-80 overflow-y-auto">
                  <div>
                    {formStep === 1 ? (
                      <>
                        <InputField
                          label="RUC del comercio"
                          type="text"
                          value={ruc}
                          onChange={handleRucChange}
                          error={errors.ruc}
                          placeholder="Ingrese el RUC del comercio"
                          required
                          maxLength={11}
                        />
                        {isValidatingRuc && (
                          <div className="text-sm text-blue-600 mt-1">
                            Validando RUC...
                          </div>
                        )}
                        <InputField
                          label="DNI del administrador"
                          type="text"
                          value={dni}
                          onChange={handleDniChange}
                          error={errors.dni}
                          placeholder="Ingrese el DNI del administrador"
                          required
                          maxLength={8}
                        />
                        {isValidatingDni && (
                          <div className="text-sm text-blue-600 mt-1">
                            Validando DNI...
                          </div>
                        )}
                        <div className="flex gap-4 mt-4 justify-end">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handlePrevStep}
                            disabled={isLoading}
                          >
                            Atrás
                          </button>
                          <button
                            type="button"
                            className="btn"
                            onClick={handleNextStep}
                            disabled={isLoading}
                          >
                            Siguiente
                          </button>
                        </div>
                      </>
                    ) : (
                      <form onSubmit={handleSubmit}>
                        {" "}
                        {/* Agregamos el form aquí */}
                        <InputField
                          label="Correo"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          error={errors.email}
                          placeholder="Correo electrónico"
                          required
                        />
                        <InputField
                          label="Num. Celular"
                          type="tel"
                          value={phone}
                          onChange={handlePhoneChange}
                          error={errors.phone}
                          placeholder="Número de teléfono"
                          required
                        />
                        <InputField
                          label="Contraseña"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          error={errors.password}
                          placeholder="Contraseña"
                          required
                          autocomplete="current-password"
                        />
                        <InputField
                          label="Confirmar Contraseña"
                          type="password"
                          value={passwordConfirmation}
                          onChange={(e) =>
                            setPasswordConfirmation(e.target.value)
                          }
                          error={errors.passwordConfirmation}
                          placeholder="Confirma tu contraseña"
                          required
                        />
                        <InputField
                          label="Alias"
                          type="text"
                          value={alias}
                          onChange={(e) => setAlias(e.target.value)}
                          error={errors.alias}
                          placeholder="Alias"
                          required
                        />
                        <InputField
                          label="Nombre del Comercio"
                          type="text"
                          value={nomComercio}
                          onChange={(e) => setnomComercio(e.target.value)}
                          error={errors.nomComercio}
                          placeholder="Nombre del Comercio"
                          required
                        />
                        <label className="hidden mb-2 sm:mb-3 text-sm font-medium text-black dark:text-white">
                          Membresía
                        </label>
                        <CustomDropdown
                          options={membershipPlans}
                          value={membershipId ? Number(membershipId) : null}
                          onChange={(value) => setMembershipId(value)}
                          placeholder="Seleccione una membresía"
                          className="hidden dark:bg-boxdark dark:border-strokedark dark:text-white cursor-help"
                          disabled
                          defaultValue={3}
                        />
                        <InputField
                          label="Código de Referido (Opcional)"
                          type="text"
                          value={referalCode}
                          onChange={(e) => setReferalCode(e.target.value)}
                          placeholder="Ingresa el código de referido (opcional)"
                          maxLength={25}
                        />
                        <div className="">
                          <label>Avatar de Usuario</label>
                          <Uploader
                            onFileSelect={(file) => setAvatar(file)}
                            accept="image/jpeg, image/jpg, image/png"
                            maxSize={5 * 1024 * 1024}
                            label="Sube tu avatar aquí"
                            className="h-[16.5rem]"
                          />
                          {errors.avatar && (
                            <span className="text-red-600 text-xs mt-1 block">
                              {errors.avatar}
                            </span>
                          )}
                        </div>
                        <div className="flex gap-4 mt-4 justify-end">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handlePrevStep}
                            disabled={isLoading}
                          >
                            Atrás
                          </button>
                          <button
                            type="submit"
                            className="btn"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <LoadingDots text="Registrando..." />
                            ) : (
                              "Registrarse"
                            )}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-b from-[#000] to-gray-900  text-white py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-center text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 50,
            }}
          >
            <motion.span
              className="block"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Impulsa tu negocio con
            </motion.span>
            <motion.span
              className="block text-4xl text-blue-400"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Puntos Smart
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              y fideliza a tus clientes
            </motion.span>
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-8 mt-12 mb-16">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.id}
                className="text-center bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-all duration-300 cursor-pointer group relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 50,
                }}
                onClick={() => openModal(benefit.id)}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
                }}
              >
                {/* Efecto de brillo al hacer hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/30 to-blue-600/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.15 + 0.2,
                      duration: 0.5,
                      type: "spring",
                    }}
                  >
                    <IconWrapper>{benefit.icon}</IconWrapper>
                  </motion.div>

                  <motion.h3
                    className="font-semibold text-xl mb-2 text-blue-300"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.3, duration: 0.4 }}
                  >
                    {benefit.title}
                  </motion.h3>

                  <motion.p
                    className="text-gray-300 text-sm"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.4, duration: 0.4 }}
                  >
                    {benefit.shortDescription}
                  </motion.p>

                  <motion.div
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm inline-flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 0 }} // Mantiene opacity:0 para que sólo aparezca en hover
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <span>Ver detalles</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <p className="mb-6">
              Accede a un dashboard completo con estadísticas demográficas
              detalladas, tendencias por segmento y comportamiento específico de
              tus clientes para tomar decisiones más precisas y efectivas.
            </p>
            <motion.button
              className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-500 transition-colors duration-300 font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.getElementById("top");
                element?.scrollIntoView({ behavior: "smooth" });
                setIsRegister(true);
              }}
            >
              Comienza Ahora
            </motion.button>
          </motion.div>
        </div>

        {/* Modal de beneficio */}
        <AnimatePresence>
          {selectedBenefit && (
            <motion.div
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <motion.div
                className="bg-gray-800 max-w-2xl rounded-xl overflow-auto h-auto max-h-[92vh]"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  {/* Cabecera del modal con degradado */}
                  <div className="bg-gradient-to-r from-blue-800 to-blue-600 p-6 relative">
                    <button
                      onClick={closeModal}
                      className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-1 rounded-full transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>

                    <div className="flex items-center">
                      <div className="bg-white/10 p-4 rounded-full mr-4">
                        {selectedBenefit.icon}
                      </div>
                      <h3 className="text-2xl font-bold">
                        {selectedBenefit.title}
                      </h3>
                    </div>
                  </div>

                  {/* Contenido del modal */}
                  <div className="p-6">
                    <div className="mb-6">
                      <h4 className="text-xl font-semibold mb-2 text-blue-300">
                        Descripción
                      </h4>
                      <p className="text-gray-300">
                        {selectedBenefit.fullDescription}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-xl font-semibold mb-2 text-blue-300">
                        Características
                      </h4>
                      <ul className="space-y-2">
                        {selectedBenefit.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-blue-400 mr-2">•</span>
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xl font-semibold mb-2 text-blue-300">
                        Caso de Éxito
                      </h4>
                      <div className="bg-gray-700/50 p-4 rounded-lg border-l-4 border-blue-500">
                        <p className="text-gray-300 italic">
                          {selectedBenefit.caseStudy}
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                      <button
                        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                        onClick={closeModal}
                      >
                        Cerrar
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 py-24 text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* ----- SECCIÓN 1: TESTIMONIOS ----- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            {/* Encabezado */}
            <div className="text-center mb-16">
              <motion.h2
                className="text-4xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Historias de Éxito con
                <br />
                <span className="text-5xl md:text-6xl bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">
                  Puntos Smart
                </span>
              </motion.h2>

              <motion.p
                className="max-w-2xl mx-auto text-lg mb-8 text-gray-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Descubre cómo Puntos Smart está transformando la experiencia
                tanto de comercios como de usuarios mientras genera un impacto
                positivo en el planeta.
              </motion.p>

              {/* Tabs para filtrar testimonios */}
              <div className="flex justify-center mb-12">
                <div className="bg-gray-800/70 p-1 rounded-full inline-flex shadow-lg">
                  <button
                    className={`px-5 py-2 rounded-full transition-all ${
                      activeTab === "all"
                        ? "bg-blue-600 text-white"
                        : "text-gray-200 hover:text-white"
                    }`}
                    onClick={() => setActiveTab("all")}
                  >
                    Todos
                  </button>
                  <button
                    className={`px-5 py-2 rounded-full transition-all ${
                      activeTab === "commerce"
                        ? "bg-blue-600 text-white"
                        : "text-gray-200 hover:text-white"
                    }`}
                    onClick={() => setActiveTab("commerce")}
                  >
                    Comercios
                  </button>
                  <button
                    className={`px-5 py-2 rounded-full transition-all ${
                      activeTab === "user"
                        ? "bg-blue-600 text-white"
                        : "text-gray-200 hover:text-white"
                    }`}
                    onClick={() => setActiveTab("user")}
                  >
                    Usuarios
                  </button>
                </div>
              </div>
            </div>

            {/* Tarjetas de Testimonios */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {filteredTestimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 shadow-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: testimonial.id * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-xl">
                          {testimonial.name}
                        </h3>
                        {testimonial.business && (
                          <p className="text-gray-300">
                            {testimonial.business}
                          </p>
                        )}
                        <div className="flex mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className="text-yellow-300 fill-yellow-300"
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <blockquote className="text-gray-200 italic mb-6">
                      "{testimonial.quote}"
                    </blockquote>

                    <div className="grid grid-cols-3 gap-2">
                      {testimonial.stats.map((stat, idx) => (
                        <div
                          key={idx}
                          className="bg-gray-700/50 p-3 rounded-lg text-center"
                        >
                          <div className="text-xl font-bold text-yellow-300">
                            {stat.value}
                          </div>
                          <div className="text-xs text-gray-300">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ----- SECCIÓN 2: IMPACTO ----- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Impacto Positivo
              </h2>
              <p className="text-gray-400 max-w-3xl mx-auto">
                Con Puntos Smart, cada compra contribuye a combatir problemas
                globales como el desperdicio de alimentos y la emisión de gases
                de efecto invernadero. Tu pequeña acción genera un gran impacto.
              </p>
            </div>

            {/* Impacto en el Negocio */}
            <motion.div
              className="bg-gray-800 rounded-2xl p-8 mb-12 shadow-xl border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 text-center text-white">
                El impacto de Puntos Smart en tu negocio
              </h3>

              <div className="grid md:grid-cols-3 gap-6">
                {impactData.map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-gray-700/50 rounded-xl p-6 text-center border border-gray-700 hover:border-blue-500 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.3)",
                    }}
                  >
                    <div className="bg-gray-800 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                      {item.icon}
                    </div>
                    <div className="text-3xl font-bold text-blue-400 mb-1">
                      {item.value}
                    </div>
                    <div className="text-gray-300">{item.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Impacto Ambiental */}
            <motion.div
              className="bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 text-center text-white">
                Impacto ambiental y social
              </h3>

              <div className="grid md:grid-cols-3 gap-6">
                {environmentalData.map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-gray-700/50 rounded-xl p-6 text-center border border-gray-700 hover:border-green-500 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(74, 222, 128, 0.3)",
                    }}
                  >
                    <div className="bg-gray-800 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                      {item.icon}
                    </div>
                    <div className="text-3xl font-bold text-green-400 mb-1">
                      {item.value}
                    </div>
                    <div className="text-gray-300">{item.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ----- SECCIÓN 3: VIDEO ----- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold mb-4">
                Conoce más sobre Puntos Smart
              </h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Mira cómo nuestro CEO explica nuestra visión y cómo estamos
                revolucionando la forma en que los negocios conectan con sus
                clientes.
              </p>
            </div>

            <motion.div
              className="rounded-2xl overflow-hidden shadow-2xl relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://servicios.puntossmart.com/img/videoRoger.mp4"
                  title="CEO Puntos Smart - Visión y Funcionalidad"
                  frameBorder="0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* ----- SECCIÓN 4: CTA FINAL ----- */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-gray-900 px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setIsRegister(true);
              }}
            >
              <UserPlus className="w-5 h-5" />
              Únete a Puntos Smart
            </motion.button>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
