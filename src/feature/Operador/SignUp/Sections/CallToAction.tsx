import React from "react";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";

interface CallToActionProps {
  onClick: () => void;
}

const CallToAction: React.FC<CallToActionProps> = ({ onClick }) => {
  return (
    <div className=" text-center py-12">
      <motion.button
        className="bg-gradient-to-r from-[#8e9ef6] to-[#00E1C8] text-gray-900 px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
      >
        <UserPlus className="w-5 h-5" />
        Únete a Puntos Smart
      </motion.button>
    </div>
    
  );
};

export default CallToAction;
