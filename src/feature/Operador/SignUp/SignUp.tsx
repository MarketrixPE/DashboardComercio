import React, { useState, useEffect } from "react";
import TypeWriter from "../../../shared/components/Atoms/TypeWriter/TypeWriter";
import LoginForm from "./Sections/LoginForm";
import RegisterForm from "./Sections/RegisterForm";
import bannersPS from "../../../assets/images/banners/bannersPS.png";
import "./SignUp.css";

const SignUp: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (showCard) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [showCard]);

  return (
    <div 
      className="h-screen overflow-hidden relative"
      style={{
        backgroundImage: `url(${bannersPS})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay opcional para mejorar la legibilidad del texto */}
      <div className="absolute inset-0 bg-black bg-opacity-30 z-[1]"></div>
      
      <div className="flex flex-col md:flex-row justify-between items-center min-h-screen relative z-[2] p-4 md:p-[5%] max-[767px]:mt-16 max-[767px]:justify-center">
        <div className="w-full md:w-1/2 max-w-2xl text-gray-800 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-hero relative">
            <span
              className="block text-6xl md:text-9xl mb-0 leading-none bg-[#132fff] bg-clip-text text-transparent"
              style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 600 }}
            >
              Puntos
            </span>
            <span className="block fredoka-SemiBold text-6xl md:text-9xl font-black tracking-tighter mb-4 md:mb-8 leading-none text-transparent bg-clip-text bg-[#132fff]">
              Smart
            </span>
          </h1>
          <p className="text-xl md:text-2xl font-medium fredoka-SemiBold text-white leading-relaxed max-w-xl tracking-wide">
            <span className="font-medium">Aumenta tus ventas</span>
            <span className="mx-2">y</span>
            <span className="font-medium">fideliza clientes</span>
            <span className="font-medium"> con nuestras </span>
            <span className="inline-block min-w-20">
              <TypeWriter
                words={[
                  "ENCUESTAS",
                  "ESTUDIOS",
                  "HERRAMIENTAS",
                  "PROMOCIONES",
                  "ESTADISTICAS",
                ]}
                highlightColor="#132fff"
                className="text-xl md:text-2xl"
              />
            </span>
            <span className="text-white font-medium ml-2">smart</span>
          </p>
          <button
            className="mt-8 px-6 py-3 bg-gradient-to-r from-[#132fff] to-[#4651f4] bg-[#132fff] text-white font-normal rounded-full shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center gap-2 group mx-auto md:mx-0"
            onClick={() => setShowCard(true)}
          >
            <span>Inicia Sesión / Regístrate Aquí</span>
            <svg
              className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Formularios */}
        {isVisible && (
          <div
            className={`relative w-[27rem] h-[425px] max-[767px]:absolute max-[767px]:z-[99] max-[767px]:flex max-[767px]:justify-center card-container ${
              showCard ? "card-container-enter" : "card-container-exit"
            }`}
          >
            <div className={`card ${isRegister ? "flipped" : ""}`}>
              <button
                className="absolute right-2 top-2 z-10 text-gray-600 hover:text-gray-800 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200"
                onClick={() => setShowCard(false)}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="card-front">
                <LoginForm setIsRegister={setIsRegister} />
              </div>
              <div className="card-back">
                <RegisterForm setIsRegister={setIsRegister} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;