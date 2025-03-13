
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Quote } from 'lucide-react';
import BentoGrid from '../BentoGrid';
import BentoItem from '../BentoItem';
import { getBookData } from '@/utils/data';
import { useParams } from 'react-router-dom';

const BookQuotes = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [quotes, setQuotes] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!bookId) return;
      
      try {
        const bookData = await getBookData(bookId);
        if (bookData && bookData.quotes) {
          setQuotes(bookData.quotes);
        }
      } catch (error) {
        console.error("Error loading book quotes:", error);
      }
    };
    
    fetchData();
  }, [bookId]);

  if (!quotes || quotes.length === 0) return null;
  
  return (
    <motion.div
      className="w-full max-w-7xl px-4 md:px-8 mb-12"
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
        精选书摘
      </motion.h2>
      
      <BentoGrid className="px-4 md:px-8 mb-12">
        {quotes.map((quote, index) => (
          <BentoItem 
            key={index}
            title={quote.title || "书摘"} 
            titleColor={quote.titleColor || "text-amber-400"}
            className={`md:col-span-3 bg-gradient-to-br ${quote.className || "from-amber-900/20 to-amber-800/10 border-amber-900/20"}`}
            icon={<Quote className={`w-5 h-5 ${quote.iconColor || "text-amber-400"}`} />}
            chip={`书摘 ${index + 1}`}
            delay={8 + index}
          >
            <p className="italic">{quote.content}</p>
            {quote.page && <p className="text-right text-sm mt-2 text-muted-foreground">- 第 {quote.page} 页</p>}
          </BentoItem>
        ))}
      </BentoGrid>
    </motion.div>
  );
};

export default BookQuotes;
