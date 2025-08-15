import React from "react";
import { motion } from "framer-motion";
import { impactData, environmentalData } from "../Data/data";

const ImpactSection: React.FC = () => {
  return (
    <div className="py-24 text-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Impacto Positivo
            </h2>
            <p className="text-white/90 max-w-[43rem] mx-auto">
              Con Puntos Smart, cada compra contribuye a combatir problemas
              globales como el desperdicio de alimentos y la emisión de gases de
              efecto invernadero.
            </p>
            <p className="text-white/90 max-w-3xl mx-auto">
              <span>El impacto de Puntos Smart en tu negocio.</span>
            </p>
            <p className="text-white/90 max-w-3xl mx-auto">
              <span>Tu pequeña acción genera un gran impacto.</span>
            </p>
          </div>

          <motion.div
            className="bg-gray-800 rounded-2xl p-8 mb-12 shadow-xl border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-center text-white">
              El impacto de Puntos Smart en tu negocio
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {impactData.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="bg-gray-700/50 rounded-xl p-6 text-center border border-gray-700 hover:border-blue-500 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.3)",
                  }}
                >
                  <div className="bg-gray-800 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                    {item.icon}
                  </div>
                  <div className="text-3xl font-bold text-blue-400 mb-1">
                    {item.value}
                  </div>
                  <div className="text-gray-300">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            className="bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-center text-white">
              Impacto ambiental y social
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {environmentalData.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="bg-gray-700/50 rounded-xl p-6 text-center border border-gray-700 hover:border-green-500 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(74, 222, 128, 0.3)",
                  }}
                >
                  <div className="bg-gray-800 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                    {item.icon}
                  </div>
                  <div className="text-3xl font-bold text-green-400 mb-1">
                    {item.value}
                  </div>
                  <div className="text-gray-300">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ImpactSection;
