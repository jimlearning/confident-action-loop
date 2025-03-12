
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedTitleProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ 
  children, 
  delay = 0, 
  className = ""
}) => {
  return (
    <motion.h3 
      className={`text-lg md:text-xl font-semibold ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: delay, 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.h3>
  );
};

export default AnimatedTitle;
