import axios from "axios";
import { decryptCompanyId } from "./Operador/DecryptCompanyId";

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
  password: string,
  userType: "commerce"
): Promise<LoginResponse> => {
  try {
    const API_URL = COMMERCE_API_URL;

    const response = await axios.post(`${API_URL}/login`, { email, password });
    console.log(response, "Login");
    const { access_token, refresh_token, company_id, ...userData } =
      response.data;

    // Guardar los tokens con prefijo para commerce
    localStorage.setItem(`${userType}_access_token`, access_token);
    localStorage.setItem(`${userType}_refresh_token`, refresh_token);

    // Guardar company_id encriptado
    if (company_id) {
      localStorage.setItem(`${userType}_company_id_encrypted`, company_id);

      try {
        const decryptedCompanyId = await decryptCompanyId(company_id);
        console.log(decryptedCompanyId,"decryptedCompanyId")
        localStorage.setItem(`${userType}_company_id`, decryptedCompanyId);
      } catch (decryptError) {
        console.error("Error al desencriptar el company_id:", decryptError);
        // Continuar con el flujo aunque falle la desencriptación
      }
    }

    // Guardar datos de usuario con prefijo para commerce
    Object.entries(userData).forEach(([key, value]) => {
      const storageKey = `${userType}_${key}`;
      localStorage.setItem(storageKey, value as string);
    });

    return response.data;
  } catch (error: any) {
    if (error.response?.data?.error === "User not found or inactive") {
      throw new Error("Usuario no encontrado o Correo no verificado");
    }

    // Manejo más detallado del error
    let errorMessage = "Error al iniciar sesión";

    if (error.response) {
      errorMessage = error.response.data?.message;
    } else if (error.request) {
      // Error de red
      errorMessage =
        "Error de conexión. Por favor, verifica tu conexión a internet.";
    } else {
      // Otros errores
      errorMessage = error.message;
    }

    throw new Error(errorMessage);
  }
};

const getToken = (userType: "commerce") => {
  // Para commerce, buscamos "commerce_access_token"
  return localStorage.getItem(`${userType}_access_token`);
};

export const logout = async (userType: "commerce"): Promise<void> => {
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

    // Para commerce, eliminamos claves con prefijo "commerce_"
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("commerce_")) {
        localStorage.removeItem(key);
      }
    });

    window.history.replaceState(null, "", "/");
    window.location.href = "/";
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};
