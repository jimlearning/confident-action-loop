
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import BentoGrid from '../BentoGrid';
import BentoItem from '../BentoItem';
import { getBookData } from '@/utils/data';
import { useParams } from 'react-router-dom';

const ConfidenceRules = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [rules, setRules] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!bookId) return;
      
      try {
        const bookData = await getBookData(bookId);
        if (bookData && bookData.rules) {
          setRules(bookData.rules);
        }
      } catch (error) {
        console.error("Error loading confidence rules:", error);
      }
    };
    
    fetchData();
  }, [bookId]);

  if (!rules || rules.length === 0) return null;
  
  return (
    <motion.div
      className="w-full max-w-7xl px-4 md:px-8 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      <motion.h2 
        className="text-2xl md:text-3xl font-bold mb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        赢得自信的十条规则
      </motion.h2>
      
      <BentoGrid className="px-4 md:px-8 mb-12">
        {rules.map((rule, index) => (
          <BentoItem 
            key={index}
            title={rule.title} 
            titleColor={rule.titleColor || "text-yellow-400"}
            className={`md:col-span-3 bg-gradient-to-br ${rule.className || "from-yellow-900/20 to-yellow-800/10 border-yellow-900/20"}`}
            icon={<BookOpen className={`w-5 h-5 ${rule.iconColor || "text-yellow-400"}`} />}
            chip={`规则 ${index + 1}`}
            delay={8 + index}
          >
            <p>{rule.content}</p>
          </BentoItem>
        ))}
      </BentoGrid>
    </motion.div>
  );
};

export default ConfidenceRules;
