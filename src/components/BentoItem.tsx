
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import AnimatedTitle from './AnimatedTitle';

interface BentoItemProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  titleColor?: string;
  colSpan?: number;
  rowSpan?: number;
  icon?: React.ReactNode;
  delay?: number;
  chip?: string;
  hoverEffect?: boolean;
}

const BentoItem: React.FC<BentoItemProps> = ({
  title,
  children,
  className,
  titleColor = "text-white",
  colSpan = 1,
  rowSpan = 1,
  icon,
  delay = 0,
  chip,
  hoverEffect = true,
}) => {
  return (
    <motion.div
      className={cn(
        "bento-item",
        colSpan === 2 ? "md:col-span-2" : colSpan === 3 ? "md:col-span-3" : "",
        rowSpan === 2 ? "md:row-span-2" : "",
        hoverEffect ? "hover:shadow-bento-hover transform hover:-translate-y-1" : "",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: delay * 0.1, 
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={hoverEffect ? { scale: 1.02 } : {}}
      whileTap={hoverEffect ? { scale: 0.98 } : {}}
    >
      <div className="bento-item-content">
        {chip && (
          <span className="chip animate-fade-in mb-4" style={{ animationDelay: `${delay * 100 + 200}ms` }}>
            {chip}
          </span>
        )}
        
        <div className="flex items-center space-x-2 mb-3">
          {icon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: delay * 0.1 + 0.2, duration: 0.3 }}
              className="text-white/90"
            >
              {icon}
            </motion.div>
          )}
          <AnimatedTitle delay={delay * 0.1 + 0.1} className={titleColor}>
            {title}
          </AnimatedTitle>
        </div>
        
        <motion.div
          className="mt-1 text-white/70 text-sm md:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay * 0.1 + 0.3, duration: 0.5 }}
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BentoItem;
