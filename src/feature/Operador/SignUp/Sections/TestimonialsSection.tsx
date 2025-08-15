import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "../Data/data";

const TestimonialsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const filteredTestimonials =
    activeTab === "all"
      ? testimonials
      : testimonials.filter((t) => t.type === activeTab);

  return (
    <div className="py-24 text-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Historias de Éxito con
              <br />
              <span className="text-5xl md:text-6xl bg-gradient-to-r from-[#00E1C8] to-[#3944EB] bg-clip-text text-transparent">
                Puntos Smart
              </span>
            </h2>
            <p className="max-w-2xl mx-auto text-lg mb-8 text-gray-200">
              Descubre cómo Puntos Smart está transformando la experiencia tanto
              de comercios como de usuarios mientras genera un impacto positivo en el planeta.
            </p>
            <div className="flex justify-center mb-12">
              <div className="bg-gray-800/70 p-1 rounded-full inline-flex shadow-lg">
                <button
                  className={`px-5 py-2 rounded-full transition-all ${
                    activeTab === "all"
                      ? "bg-blue-600 text-white"
                      : "text-gray-200 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("all")}
                >
                  Todos
                </button>
                <button
                  className={`px-5 py-2 rounded-full transition-all ${
                    activeTab === "commerce"
                      ? "bg-blue-600 text-white"
                      : "text-gray-200 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("commerce")}
                >
                  Comercios
                </button>
                <button
                  className={`px-5 py-2 rounded-full transition-all ${
                    activeTab === "user"
                      ? "bg-blue-600 text-white"
                      : "text-gray-200 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("user")}
                >
                  Usuarios
                </button>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {filteredTestimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: testimonial.id * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
                }}
              >
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00E1C8] to-[#3944EB] flex items-center justify-center text-white text-xl font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">{testimonial.name}</h3>
                      {testimonial.business && (
                        <p className="text-gray-300">{testimonial.business}</p>
                      )}
                      <div className="flex mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className="text-yellow-300 fill-yellow-300"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <blockquote className="text-gray-200 italic mb-6">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="grid grid-cols-3 gap-2">
                    {testimonial.stats.map((stat, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-700/50 p-3 rounded-lg text-center"
                      >
                        <div className="text-xl font-bold text-yellow-300">
                          {stat.value}
                        </div>
                        <div className="text-xs text-gray-300">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
