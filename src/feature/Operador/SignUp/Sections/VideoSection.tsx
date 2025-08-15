import React from "react";
import { motion } from "framer-motion";

const VideoSection: React.FC = () => {
  return (
    <div className=" pt-24 text-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl text-[#00E1C8] font-bold mb-4 ">
              Conoce más sobre Puntos Smart
            </h3>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Mira este video explicativo sobre nuestra visión y cómo estamos
              revolucionando la forma en que los negocios conectan con sus
              clientes.
            </p>
          </div>
          <motion.div
            className="rounded-2xl overflow-hidden shadow-2xl relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://api-dashboard.puntossmart.com/img/videoexplicativo.mp4"
                title="CEO Puntos Smart - Visión y Funcionalidad"
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default VideoSection;
