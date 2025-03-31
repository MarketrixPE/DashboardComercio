import axios from "axios";

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

    // Guardar tokens
    localStorage.setItem(`${actualUserType}_access_token`, access_token);

    localStorage.setItem(`${actualUserType}_refresh_token`, refresh_token);

    localStorage.setItem("user_role", role.toString());

    if (company_id) {
      // Guardar el ID encriptado directamente
      localStorage.setItem(
        `${actualUserType}_company_id`,
        company_id
      );
      console.log("ID de compañía guardado:", company_id);
    }

    // Guardar datos de sucursal si es un gerente de sucursal
    if (role === 3 && response.data.branch_id) {
      localStorage.setItem(
        `${actualUserType}_branch_id`,
        response.data.branch_id
      );
      localStorage.setItem(
        `${actualUserType}_sucursal`,
        response.data.sucursal || ""
      );
      localStorage.setItem(
        `${actualUserType}_latitud`,
        response.data.latitud || ""
      );
      localStorage.setItem(
        `${actualUserType}_longitud`,
        response.data.longitud || ""
      );
    }

    // Guardar datos de usuario con el prefijo adecuado
    Object.entries(userData).forEach(([key, value]) => {
      const storageKey = `${actualUserType}_${key}`;
      localStorage.setItem(storageKey, value as string);
    });

    return { ...response.data, userType: actualUserType };
  } catch (error: any) {
    // Manejo de errores (sin cambios)
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

// Modificación a la función getToken
const getToken = (userType?: string): string | null => {
  // Si no se proporciona userType, intentar detectarlo del localStorage
  if (!userType) {
    const role = localStorage.getItem("user_role");
    userType = role === "3" ? "branch_manager" : "commerce";
  }

  return localStorage.getItem(`${userType}_access_token`);
};

// Modificación a la función logout
export const logout = async (userType?: string): Promise<void> => {
  // Si no se proporciona userType, detectarlo
  if (!userType) {
    const role = localStorage.getItem("user_role");
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

    // Limpiar todas las claves relacionadas con la sesión
    Object.keys(localStorage).forEach((key) => {
      if (
        key.startsWith("commerce_") ||
        key.startsWith("branch_manager_") ||
        key === "user_role"
      ) {
        localStorage.removeItem(key);
      }
    });

    window.history.replaceState(null, "", "/");
    window.location.href = "/";
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};