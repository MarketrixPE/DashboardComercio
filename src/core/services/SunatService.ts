import axios from "axios";

const API_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImdpYW5sdWMyMDE2QGdtYWlsLmNvbSJ9.ylXWCIonqQeDbainpDT8cj-0TAUIXuY3ajXlRdn0sOE";
const API_BASE_URL = "https://dniruc.apisperu.com/api/v1";

export const validateRUC = async (ruc: string) => {
  if (!ruc || ruc.length !== 11) {
    throw new Error("El RUC debe tener 11 dígitos.");
  }

  try {
    const { data } = await axios.get(`${API_BASE_URL}/ruc/${ruc}?token=${API_TOKEN}`);
    console.log(data)
    return data; // Retorna la información de la empresa
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Error al consultar el RUsssC.";
    throw new Error(errorMessage);
  }
};
