import { useState } from "react";
import {
  validateSmartUserPassword,
  validateSmartUserPasswordConfirmation,
} from "./Validations/smartUserValidations";
import Swal from "sweetalert2";

interface ValidationErrors {
  email?: string;
  password?: string;
  passwordConfirmation?: string;
  phone?: string;
  name?: string;
  lastName?: string;
  alias?: string;
  avatar?: string;
  ruc?: string;
  dni?: string;
  referalCode?: string;
  nomComercio?: string;
  membershipId?: string;
  birthDate?: string;
  gender?: string;
}

interface FormData {
  email: string;
  password: string;
  passwordConfirmation?: string;
  phone?: string;
  name?: string;
  lastName?: string;
  alias?: string;
  avatar?: File | null;
  ruc?: string;
  dni?: string;
  referalCode?: string;
  nomComercio?: string;
  membershipId?: number | "";
  isRegister?: boolean;
  birthDate?: string;
  gender?: string;
  isEditing?: boolean;
}

export const useFormValidation = () => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateDNI = (dni: string): string | undefined => {
    if (!dni) return "El DNI es requerido";
    if (dni.length !== 8) return "El DNI debe tener 8 dígitos";
    if (!/^\d+$/.test(dni)) return "El DNI solo debe contener números";
  };

  const validateRUC = (ruc: string): string | undefined => {
    if (!ruc) return "El RUC es requerido";
    if (ruc.length !== 11) return "El RUC debe tener 11 dígitos";
    if (!/^\d+$/.test(ruc)) return "El RUC solo debe contener números";
    if (!["10", "20"].includes(ruc.substring(0, 2))) {
      return "El RUC debe comenzar con 10 o 20";
    }
  };

  const validateEmail = (email: string): string | undefined => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "El correo es requerido";
    if (!emailRegex.test(email))
      return "Por favor ingrese un correo electrónico válido";
  };

  const validatePassword = (password: string): string | undefined => {
    if (!password) return "La contraseña es requerida";
    if (password.length < 6)
      return "La contraseña debe tener al menos 6 caracteres";
  };

  const validatePasswordConfirmation = (
    password: string,
    confirmation: string
  ): string | undefined => {
    if (!confirmation) return "La confirmación de contraseña es requerida";
    if (password !== confirmation) return "Las contraseñas no coinciden";
  };

  const validatePhone = (phone: string): string | undefined => {
    const phoneRegex = /^\+51\d{9}$/;
    if (!phone) return "El teléfono es requerido";
    if (!phoneRegex.test(phone))
      return "El teléfono debe tener el formato +51XXXXXXXXX";
  };

  const validateName = (name: string): string | undefined => {
    if (!name.trim()) return "El nombre es requerido";
    if (name.length < 2) return "El nombre debe tener al menos 2 caracteres";
  };

  const validateLastName = (lastName: string): string | undefined => {
    if (!lastName.trim()) return "El apellido es requerido";
    if (lastName.length < 2)
      return "El apellido debe tener al menos 2 caracteres";
  };

  const validateAvatar = (
    avatar: File | null | undefined,
    isRegister: boolean
  ): string | undefined => {
    if (isRegister && !avatar) {
      return "El avatar es requerido";
    }
    if (avatar) {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(avatar.type)) {
        return "Solo se permiten archivos JPEG, JPG o PNG";
      }
      if (avatar.size > 100 * 1024 * 1024) {
        return "El avatar no debe superar los 100MB";
      }
    }
    return undefined;
  };

  const validateNombreComercial = (nombre: string): string | undefined => {
    if (!nombre.trim()) return "El nombre comercial es requerido";
    if (nombre.length < 3)
      return "El nombre comercial debe tener al menos 3 caracteres";
    if (nombre.length > 100)
      return "El nombre comercial no puede exceder los 100 caracteres";
    if (!/^[a-zA-ZÀ-ÿ0-9\s\-&.,']+$/u.test(nombre)) {
      return "El nombre comercial contiene caracteres no permitidos";
    }
  };

  const validateMembershipId = (
    membershipId: number | ""
  ): string | undefined => {
    if (membershipId === "") return "La membresía es requerida";
    if (![3].includes(Number(membershipId))) {
      return "La membresía seleccionada no es válida";
    }
  };

  const validateBirthDate = (date?: string): string | undefined => {
    if (!date) return "La fecha de nacimiento es requerida";

    const birthDate = new Date(date);
    const today = new Date();

    // Calcula la edad
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Ajusta la edad si aún no ha cumplido años este año
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    if (birthDate > today) return "La fecha no puede ser futura";
    if (age < 14) return "Debe ser mayor de 14 años";
    if (age > 130) return "La fecha de nacimiento no es válida";
  };

  const validateGender = (gender?: string): string | undefined => {
    if (!gender) return undefined; // Género es opcional
    if (!["M", "F", "O"].includes(gender)) return "Género no válido";
  };

  const validateForm = (formData: FormData): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.isRegister && !("isEditing" in formData)) {
      newErrors.email = validateEmail(formData.email);
      newErrors.password = validatePassword(formData.password);
    } else {
      newErrors.email = validateEmail(formData.email);
      newErrors.name = validateName(formData.name || "");

      if (formData.birthDate) {
        newErrors.birthDate = validateBirthDate(formData.birthDate);
      }

      if (formData.phone) {
        newErrors.phone = validatePhone(formData.phone);
      }

      if (formData.gender) {
        newErrors.gender = validateGender(formData.gender);
      }

      // Manejo específico de contraseñas según el contexto
      if ("isEditing" in formData) {
        newErrors.password = validateSmartUserPassword(
          formData.password,
          formData.isEditing
        );

        if (formData.passwordConfirmation) {
          newErrors.passwordConfirmation =
            validateSmartUserPasswordConfirmation(
              formData.password,
              formData.passwordConfirmation,
              formData.isEditing
            );
        }
      } else if (formData.isRegister) {
        if (formData.ruc) {
          newErrors.ruc = validateRUC(formData.ruc);
        }
        if (formData.dni) {
          newErrors.dni = validateDNI(formData.dni);
        }

        newErrors.password = validatePassword(formData.password);
        newErrors.passwordConfirmation = validatePasswordConfirmation(
          formData.password,
          formData.passwordConfirmation || ""
        );

        newErrors.lastName = validateLastName(formData.lastName || "");
        newErrors.avatar = validateAvatar(formData.avatar, formData.isRegister); // Actualizado
        if (formData.nomComercio) {
          newErrors.nomComercio = validateNombreComercial(formData.nomComercio);
        }
        if (formData.membershipId !== undefined) {
          newErrors.membershipId = validateMembershipId(formData.membershipId);
        }
      }
    }

    // Eliminar errores undefined
    Object.keys(newErrors).forEach((key) => {
      if (newErrors[key as keyof ValidationErrors] === undefined) {
        delete newErrors[key as keyof ValidationErrors];
      }
    });

    // Mostrar errores con Swal.fire
    if (Object.keys(newErrors).length > 0) {
      const errorMessages = Object.entries(newErrors)
        .map(([field, message]) => {
          const fieldTranslations: { [key: string]: string } = {
            email: "Correo",
            password: "Contraseña",
            passwordConfirmation: "Confirmación de contraseña",
            phone: "Teléfono",
            name: "Nombre",
            lastName: "Apellido",
            alias: "Alias",
            avatar: "Avatar",
            ruc: "RUC",
            dni: "DNI",
            nomComercio: "Nombre del comercio",
            birthDate: "Fecha de nacimiento",
            gender: "Género",
          };

          const fieldName = fieldTranslations[field] || field;
          return `• ${fieldName}: ${message}`;
        })
        .join("<br>");

      Swal.fire({
        title: "Por favor, corrige los siguientes errores",
        html: errorMessages,
        icon: "warning",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#3085d6",
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    errors,
    validateForm,
  };
};
