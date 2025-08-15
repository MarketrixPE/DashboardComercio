import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../../core/services/AuthService";
import { useUserRole } from "../../../../core/utils/UserRoleContext";
import { InputField } from "../../../../shared/components/Atoms/InputField/InputField";
import { LoadingDots } from "../../../../shared/components/Atoms/LoadingDots/LoadingDots";
import { useFormValidation } from "../../../../shared/components/Auth/useFormValidation";

interface LoginFormProps {
  setIsRegister: (value: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ setIsRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setRole } = useUserRole();
  const { errors, validateForm } = useFormValidation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const isValid = validateForm({ email, password, isRegister: false });
    if (!isValid) return;

    try {
      setIsLoading(true);
      const data = await login(email, password);
      const role = data.role === 2 ? "commerce" : "branch_manager";
      setRole(role);
      setTimeout(() => {
        if (role === "branch_manager") {
          navigate("/mi-sucursal");
        } else {
          navigate("/mi-dashboard"); // Redirige a ruta de commerce
        }
      }, 1000);
    } catch (err: any) {
      setError(err.message || "Credenciales Inválidas");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-center mb-5 text-gray-600">
        Iniciar Sesión
      </h2>
      {error && (
        <p className="text-red-600 text-sm text-center mb-4">{error}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Correo"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          placeholder="Correo electrónico"
          required
        />
        <InputField
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          placeholder="Contraseña"
          required
          autocomplete="current-password"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          disabled={isLoading}
        >
          {isLoading ? (
            <LoadingDots text="Iniciando sesión..." />
          ) : (
            "Iniciar Sesión"
          )}
        </button>
      </form>
      <p className="text-sm text-center mt-4 text-gray-600">
        ¿No tienes cuenta?{" "}
        <button
          type="button"
          className="text-blue-600 hover:underline font-medium"
          onClick={() => setIsRegister(true)}
        >
          Regístrate aquí
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
