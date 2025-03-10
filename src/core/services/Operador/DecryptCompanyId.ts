import { commerceClient } from "../../Interceptors/apiClient";

export const decryptCompanyId = async (encryptedCompanyId: string): Promise<string> => {
  try {
    const response = await commerceClient.post("/decrypt-company-id", {
      company_id: encryptedCompanyId,
    });

    // Asegúrate de verificar si el campo `company_id` está presente en la respuesta
    if (response.data && response.data.success && response.data.company_id) {
      return response.data.company_id;
    } else {
      throw new Error("Respuesta inválida del servidor.");
    }
  } catch (error: any) {
    console.error("Error al desencriptar el company_id:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Error al desencriptar el company_id");
  }
};
