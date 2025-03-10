import { Navigate, Outlet } from "react-router-dom";

// Interfaz para roles permitidos
interface ProtectedRouteProps {
  allowedRoles: ("admin" | "commerce")[]; // Roles permitidos para la ruta
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const token =
    localStorage.getItem("access_token") || // Token de admin
    localStorage.getItem("commerce_access_token"); // Token de comercio

  // Detectar el rol según el tipo de usuario
  const rawRole =
    localStorage.getItem("commerce_role") || // Rol para comercio
    localStorage.getItem("role"); // Rol para admin

  const role = rawRole === "2" ? "commerce" : "admin"; // Determinar el rol final

  // Verifica autenticación y rol
  if (!token || !allowedRoles.includes(role as "admin" | "commerce")) {
    return <Navigate to="/" />; // Redirige al login si no está autenticado o el rol no coincide
  }

  return <Outlet />;
};

export default ProtectedRoute;
