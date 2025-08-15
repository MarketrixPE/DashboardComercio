import axios from "axios";
import Cookies from "js-cookie";

const COMMERCE_API_URL = import.meta.env.VITE_API_BASE_URL_COMMERCE;

interface LoginResponse {
  user_id: string;
  access_token: string;
  refresh_token: string;
  uuid: string;
  alias: string;
  role: number;
  email: string;
  name: string;
  last_name: string;
  avatar: string;
  company_id?: string;
}

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const API_URL = COMMERCE_API_URL;

    const response = await axios.post(`${API_URL}/login`, { email, password });
    console.log(response, "Login");
    const { access_token, refresh_token, company_id, role, ...userData } =
      response.data;

    const actualUserType = role === 3 ? "branch_manager" : "commerce";

    // Object to track cookies being set for logging
    const cookiesSet: { [key: string]: string } = {};

    // Guardar tokens
    Cookies.set(`${actualUserType}_access_token`, access_token);
    cookiesSet[`${actualUserType}_access_token`] = access_token;
    Cookies.set(`${actualUserType}_refresh_token`, refresh_token);
    cookiesSet[`${actualUserType}_refresh_token`] = refresh_token;

    if (typeof role === "number") {
      Cookies.set("user_role", role.toString());
      cookiesSet["user_role"] = role.toString();
    } else {
      console.error("Role es undefined o inválido:", role);
      throw new Error("La respuesta del servidor no contiene el rol del usuario.");
    }

    if (company_id) {
      Cookies.set(`${actualUserType}_company_id`, company_id);
      cookiesSet[`${actualUserType}_company_id`] = company_id;
      console.log("ID de compañía guardado:", company_id);
    }

    // Guardar datos de sucursal si es un gerente de sucursal
    if (role === 3 && response.data.branch_id) {
      Cookies.set(`${actualUserType}_branch_id`, response.data.branch_id);
      cookiesSet[`${actualUserType}_branch_id`] = response.data.branch_id;
      Cookies.set(`${actualUserType}_sucursal`, response.data.sucursal || "");
      cookiesSet[`${actualUserType}_sucursal`] = response.data.sucursal || "";
      Cookies.set(`${actualUserType}_latitud`, response.data.latitud || "");
      cookiesSet[`${actualUserType}_latitud`] = response.data.latitud || "";
      Cookies.set(`${actualUserType}_longitud`, response.data.longitud || "");
      cookiesSet[`${actualUserType}_longitud`] = response.data.longitud || "";
    }

    // Guardar datos de usuario con el prefijo adecuado
    Object.entries(userData).forEach(([key, value]) => {
      const storageKey = `${actualUserType}_${key}`;
      Cookies.set(storageKey, value as string);
      cookiesSet[storageKey] = value as string;
    });

    // Log all cookies being set
    console.log("Cookies guardadas:", cookiesSet);

    return { ...response.data, userType: actualUserType };
  } catch (error: any) {
    if (error.response?.data?.error === "User not found or inactive") {
      throw new Error("Usuario no encontrado o Correo no verificado");
    }

    let errorMessage = "Error al iniciar sesión";

    if (error.response) {
      errorMessage = error.response.data?.message;
    } else if (error.request) {
      errorMessage =
        "Error de conexión. Por favor, verifica tu conexión a internet.";
    } else {
      errorMessage = error.message;
    }

    throw new Error(errorMessage);
  }
};

const getToken = (userType?: string): string | null => {
  if (!userType) {
    const role = Cookies.get("user_role");
    userType = role === "3" ? "branch_manager" : "commerce";
  }

  const token = Cookies.get(`${userType}_access_token`);
  return token !== undefined ? token : null;
};

export const logout = async (userType?: string): Promise<void> => {
  if (!userType) {
    const role = Cookies.get("user_role");
    userType = role === "3" ? "branch_manager" : "commerce";
  }

  const token = getToken(userType);

  if (!token) {
    console.error("No hay token de autenticación disponible.");
    return;
  }

  const API_URL = COMMERCE_API_URL;

  try {
    await axios.post(
      `${API_URL}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Cierre de sesión exitoso");

    // Limpiar todas las cookies relacionadas con la sesión
    Object.keys(Cookies.get()).forEach((key) => {
      if (
        key.startsWith("commerce_") ||
        key.startsWith("branch_manager_") ||
        key === "user_role"
      ) {
        Cookies.remove(key);
      }
    });

    window.history.replaceState(null, "", "/");
    window.location.href = "/";
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};