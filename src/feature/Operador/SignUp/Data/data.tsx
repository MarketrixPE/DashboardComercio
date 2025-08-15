import {
  BarChart3,
  MessageCircle,
  PieChart,
  Bell,
  ShoppingBag,
  TrendingUp,
  Users,
  DollarSign,
  Droplets,
  Globe,
} from "lucide-react";

export interface Benefit {
  id: number;
  icon: JSX.Element;
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  caseStudy: string;
  stats?: string;
}

// Define los datos de benefits
export const benefits: Benefit[] = [
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

export const testimonials = [
  {
    id: 1,
    type: "commerce",
    name: "Alejandra Mendoza",
    business: "Restaurante Sabores del Mar",
    image: "/testimonials/alejandra.jpg",
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
    image: "/testimonials/carlos.jpg",
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
    image: "/testimonials/sofia.jpg",
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
    image: "/testimonials/martin.jpg",
    quote:
      "Las notificaciones de ofertas cercanas son geniales. La semana pasada recibí un alert de mi restaurante favorito con 40% de descuento justo cuando estaba buscando dónde almorzar. La app es intuitiva y me encanta completar encuestas para ganar puntos adicionales.",
    stats: [
      { label: "Encuestas completadas", value: "28" },
      { label: "Puntos ganados", value: "610" },
      { label: "Ofertas aprovechadas", value: "34" },
    ],
  },
];

export const impactData = [
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

export const environmentalData = [
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
