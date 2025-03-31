import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles: ("commerce" | "branch_manager")[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const token =
    localStorage.getItem("commerce_access_token") ||
    localStorage.getItem("branch_manager_access_token");

  const userRole = localStorage.getItem("user_role");
  
  let role = "guest";
  if (userRole === "2") {
    role = "commerce";
  } else if (userRole === "3") {
    role = "branch_manager";
  }

  if (!token || !allowedRoles.includes(role as any)) {
    console.log("ProtectedRoute - Redirigiendo al login");
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;