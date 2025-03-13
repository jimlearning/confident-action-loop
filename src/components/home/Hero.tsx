
import { motion } from 'framer-motion';
import { LightbulbIcon } from 'lucide-react';
import { HomeHeader } from '@/resources/home.json';

interface HeroProps {
  data: HomeHeader;
}

const Hero = ({ data }: HeroProps) => {
  return (
    <motion.div
      className="w-full max-w-6xl px-4 md:px-8 pt-16 pb-12 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="inline-flex items-center justify-center gap-3 mb-4 px-4 py-2 rounded-full bg-primary/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <LightbulbIcon className="w-5 h-5 text-primary" />
        <span className="text-primary font-medium">{data.subtitle}</span>
      </motion.div>
      
      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {data.title}
      </motion.h1>
      <motion.p
        className="text-xl text-muted-foreground max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {data.description}
      </motion.p>
    </motion.div>
  );
};

export default Hero;
