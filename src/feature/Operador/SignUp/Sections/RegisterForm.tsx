import React, { useState } from "react";
import Swal from "sweetalert2";
import { InputField } from "../../../../shared/components/Atoms/InputField/InputField";
import { LoadingDots } from "../../../../shared/components/Atoms/LoadingDots/LoadingDots";
import { CommerceError, useCommerceService } from "../../../../core/services/Operador/UserCommerce/UserCommerceService";
import { Link } from "react-router-dom";
import CustomDropdown from "../../../../shared/components/Atoms/Dropdown/Dropdown";

interface RegisterFormProps {
  setIsRegister: (value: boolean) => void;
}

interface MembershipOption {
  id: number;
  text: string;
}

interface RegistrationData {
  nombre: string;
  lastName: string;
  phone: string;
  email: string;
  reference: string;
  membershipId: string;
  code?: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ setIsRegister }) => {
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("+51");
  const [code, setCode] = useState("");
  const [membershipId, setMembershipId] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const { registerSimpleCommerce } = useCommerceService();

  const membershipOptions: MembershipOption[] = [
    { id: 1, text: "Gold" },
    { id: 2, text: "Infinity" },
    { id: 3, text: "Empresarial" },
  ];

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    
    // Solo permitir números y el símbolo +
    const cleanInput = input.replace(/[^0-9+]/g, '');
    
    // Asegurar que siempre empiece con +51
    let formattedPhone = cleanInput.startsWith("+51") ? cleanInput : "+51" + cleanInput.replace(/^\+?51/, "");
    
    // Limitar a máximo 12 caracteres (+51 + 9 dígitos)
    if (formattedPhone.length <= 12) {
      setPhone(formattedPhone);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 25) setCode(value);
  };

  const handleMembershipClick = () => {
    console.log("🎯 handleMembershipClick ejecutado!"); // Debug
    
    Swal.fire({
      title: "¡Promoción Especial!",
      html: `
        <div style="text-align: center;">
          <h3 style="color: #2563eb; margin-bottom: 15px;">🎉 Membresía Empresarial GRATIS</h3>
          <p style="font-size: 16px; margin-bottom: 10px;">
            Durante los <strong>primeros 3 meses</strong> tendrás acceso completo a todas las funcionalidades de la membresía Empresarial.
          </p>
          <p style="font-size: 14px; color: #6b7280;">
            Aprovecha esta oportunidad única para hacer crecer tu negocio con nuestras herramientas avanzadas.
          </p>
        </div>
      `,
      icon: "info",
      confirmButtonText: "¡Genial!",
      confirmButtonColor: "#2563eb",
    }).then(() => {
      console.log("✅ SweetAlert cerrado");
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptTerms) {
      Swal.fire({
        icon: "warning",
        title: "Acepta los términos",
        text: "Debes aceptar los términos y condiciones y las políticas de privacidad para continuar.",
        confirmButtonText: "Entendido",
      });
      return;
    }

    // Validaciones básicas
    if (!nombre.trim()) {
      Swal.fire({
        icon: "error",
        title: "Campo requerido",
        text: "El nombre es obligatorio",
        confirmButtonText: "Entendido",
      });
      return;
    }

    if (!lastName.trim()) {
      Swal.fire({
        icon: "error",
        title: "Campo requerido",
        text: "El apellido es obligatorio",
        confirmButtonText: "Entendido",
      });
      return;
    }

    if (!email.trim()) {
      Swal.fire({
        icon: "error",
        title: "Campo requerido",
        text: "El correo electrónico es obligatorio",
        confirmButtonText: "Entendido",
      });
      return;
    }

    if (!phone.trim() || phone === "+51") {
      Swal.fire({
        icon: "error",
        title: "Campo requerido",
        text: "El número de teléfono es obligatorio",
        confirmButtonText: "Entendido",
      });
      return;
    }

    try {
      setIsLoading(true);
      
      const registrationData: RegistrationData = {
        nombre: nombre.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        reference: "Dashboard",
        membershipId: membershipId.toString(),
      };

      // Solo agregar code si no está vacío
      if (code.trim()) {
        registrationData.code = code.trim();
      }

      // Log para ver exactamente qué datos se están enviando
      console.log("🚀 Datos enviados al endpoint:", registrationData);

      const response = await registerSimpleCommerce(registrationData);

      // Éxito
      await Swal.fire({
        title: "¡Registro Exitoso!",
        html: `<strong>${response.mensaje}</strong><br><br>Tu ID de registro es: <strong>${response.id}</strong>`,
        icon: "success",
        confirmButtonText: "Entendido",
      });
      setIsRegister(false);

    } catch (error: any) {
      console.error("Error en el registro:", error);
      
      let errorMessage = "Error en el registro";

      if (error instanceof CommerceError) {
        errorMessage = error.message;
        
        // Manejo de errores del nuevo formato
        if (error.newApiErrors && error.newApiErrors.length > 0) {
          const errorMessages = error.newApiErrors.map(err => 
            `• ${err.campo}: ${err.mensaje}`
          ).join("<br>");
          errorMessage = `${error.message}<br><br>${errorMessages}`;
        }
      } else {
        errorMessage = error.message || "No se pudo conectar con el servidor";
      }

      await Swal.fire({
        title: "Error en el registro",
        html: errorMessage,
        icon: "error",
        confirmButtonText: "Entendido",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          ¡Registra tu cuenta Smart ahora mismo!
        </h2>
        <span className="inline-block mt-2 bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-lg">
          Plan <span className="font-bold">Empresarial</span> gratis durante los
          primeros 3 meses
        </span>
      </div>

      <div className="max-h-60 overflow-y-auto space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingresa tu nombre"
            required
          />
          
          <InputField
            label="Apellido"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Ingresa tu apellido"
            required
          />

          <InputField
            label="Correo Electrónico"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            required
          />

          <InputField
            label="Número de Teléfono"
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="+51987654321"
            required
            maxLength={12}
          />

          <InputField
            label="Código de Referido (Opcional)"
            type="text"
            value={code}
            onChange={handleCodeChange}
            placeholder="Ingrese su código de referido"
            maxLength={25}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Membresía
            </label>
            <CustomDropdown
              options={membershipOptions}
              value={membershipId}
              onChange={setMembershipId}
              placeholder="Seleccione una membresía"
              className="w-full"
              disabled={true}
              defaultValue={3}
              onClick={handleMembershipClick}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="accept-terms"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="accept-terms" className="text-sm text-gray-700">
              Acepto los{" "}
              <Link
                to="/terminos-condiciones-puntos-smart"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                términos y condiciones
              </Link>{" "}
              y las{" "}
              <Link
                to="/politica-privacidad-puntos-smart"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                políticas de privacidad
              </Link>
            </label>
          </div>

          <div className="flex gap-4 mt-4 justify-end">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              onClick={() => setIsRegister(false)}
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
              disabled={isLoading}
            >
              {isLoading ? (
                <LoadingDots text="Registrando..." />
              ) : (
                "Registrar"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;