import { motion } from "framer-motion";
import { ReactNode } from 'react';

interface IconWrapperProps {
  children: ReactNode;
}

const IconWrapper = ({ children }: IconWrapperProps) => {
  return (
    <motion.div 
      className="w-40 h-40 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4"
      whileHover={{ 
        scale: 1.1,
        rotate: 360,
        backgroundColor: '#93C5FD'
      }}
      transition={{ 
        duration: 0.8,
        type: "spring",
        bounce: 0.4
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default IconWrapper;