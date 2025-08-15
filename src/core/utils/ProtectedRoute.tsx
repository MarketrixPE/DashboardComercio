import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

interface ProtectedRouteProps {
  allowedRoles: ("commerce" | "branch_manager")[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const token =
    Cookies.get("commerce_access_token") ||
    Cookies.get("branch_manager_access_token");

  const userRole = Cookies.get("user_role");
  let role: string = "guest";
  if (userRole === "2") {
    role = "commerce";
  } else if (userRole === "3") {
    role = "branch_manager";
  }

  if (!token || !allowedRoles.includes(role as any)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;