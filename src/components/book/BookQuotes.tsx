
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Quote } from 'lucide-react';

interface BookQuote {
  title: string;
  content: string;
  page?: string;
  titleColor: string;
  className: string;
  iconColor: string;
  source?: string;
}

interface BookQuotesProps {
  quotes: BookQuote[];
}

const BookQuotes: React.FC<BookQuotesProps> = ({ quotes }) => {
  return (
    <motion.div
      className="w-full max-w-7xl px-4 md:px-8 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold">书中名言</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {quotes.map((quote, index) => (
            <motion.div
              key={quote.title}
              className={cn(
                "p-6 rounded-xl border bg-gradient-to-br",
                quote.className
              )}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index + 0.9, duration: 0.3 }}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <Quote className={cn("w-8 h-8 flex-shrink-0", quote.iconColor)} />
                <div className="space-y-2">
                  <h3 className={cn("text-lg font-semibold", quote.titleColor)}>
                    {quote.title}
                  </h3>
                  <p className="text-foreground/80 italic leading-relaxed">"{quote.content}"</p>
                  {quote.page && (
                    <div className="text-sm text-muted-foreground">
                      页码: {quote.page}
                    </div>
                  )}
                  {quote.source && (
                    <div className="text-sm text-muted-foreground">
                      来源: {quote.source}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default BookQuotes;
