// validaciones personalisadas para SmartUsers.ts

export const validateSmartUserPassword = (
    password: string, 
    isEditing?: boolean
  ): string | undefined => {
    // Si está editando y la contraseña es el placeholder, no validamos
    if (isEditing && password === "••••••••••••") {
      return undefined;
    }
  
    // Si está editando y la contraseña no es el placeholder, o si es un nuevo usuario
    if (!isEditing || (isEditing && password !== "••••••••••••")) {
      if (!password) {
        return "La contraseña es requerida";
      }
      if (password.length < 8) {
        return "La contraseña debe tener al menos 8 caracteres";
      }
    }
  };
  
  export const validateSmartUserPasswordConfirmation = (
    password: string,
    confirmation: string,
    isEditing?: boolean
  ): string | undefined => {
    // Si está editando y ambas contraseñas son el placeholder, no validamos
    if (isEditing && password === "••••••••••••" && confirmation === "••••••••••••") {
      return undefined;
    }
  
    // Si está editando y al menos una contraseña no es el placeholder, o si es un nuevo usuario
    if (!isEditing || (isEditing && (password !== "••••••••••••" || confirmation !== "••••••••••••"))) {
      if (!confirmation) {
        return "La confirmación de contraseña es requerida";
      }
      if (password !== confirmation) {
        return "Las contraseñas no coinciden";
      }
    }
  };