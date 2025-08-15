import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import IconWrapper from "../../../../shared/components/Atoms/IconWrapper/IconWrapper";
import { Benefit, benefits } from "../Data/data";

const BenefitsSection: React.FC = () => {
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);

  const openModal = (benefitId: number) => {
    const benefit = benefits.find((b) => b.id === benefitId);
    if (benefit) setSelectedBenefit(benefit);
  };

  const closeModal = () => setSelectedBenefit(null);

  return (
    <div className="text-white py-16">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-center text-3xl font-bold mb-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
        >
          <span className="block">Impulsa tu negocio con</span>
          <span className="text-5xl md:text-4xl bg-gradient-to-r from-[#00E1C8] to-[#3944EB] bg-clip-text text-transparent">
          Puntos Smart
          </span>

          <span className="block">y fideliza a tus clientes</span>
        </motion.h2>

        <div className="grid md:grid-cols-4 gap-8 mt-12 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              className="text-center bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-all duration-300 relative overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                type: "spring",
                stiffness: 50,
              }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/30 to-blue-600/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
              <div className="relative z-10">
                <IconWrapper>{benefit.icon}</IconWrapper>
                <h3 className="font-semibold text-xl mb-2 text-blue-300">
                  {benefit.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  {benefit.shortDescription}
                </p>
                <button
                  onClick={() => openModal(benefit.id)}
                  className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors duration-300 text-sm font-medium"
                >
                  Ver detalles
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedBenefit && (
            <motion.div
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <motion.div
                className="bg-gray-800 max-w-2xl rounded-xl overflow-auto h-auto max-h-[92vh]"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-gradient-to-r from-blue-800 to-blue-600 p-6 relative">
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-1 rounded-full transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
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
                  <div className="flex items-center">
                    <div className="bg-white/10 p-4 rounded-full mr-4">
                      {selectedBenefit.icon}
                    </div>
                    <h3 className="text-2xl font-bold">
                      {selectedBenefit.title}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-semibold mb-2 text-blue-300">
                    Descripción
                  </h4>
                  <p className="text-gray-300">
                    {selectedBenefit.fullDescription}
                  </p>
                  <h4 className="text-xl font-semibold mb-2 text-blue-300 mt-6">
                    Características
                  </h4>
                  <ul className="space-y-2">
                    {selectedBenefit.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <h4 className="text-xl font-semibold mb-2 text-blue-300 mt-6">
                    Caso de Éxito
                  </h4>
                  <div className="bg-gray-700/50 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="text-gray-300 italic">
                      {selectedBenefit.caseStudy}
                    </p>
                  </div>
                  <div className="mt-8 flex justify-end">
                    <button
                      className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                      onClick={closeModal}
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BenefitsSection;
