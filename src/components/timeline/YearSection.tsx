
import { useThemeContext } from '@/contexts/theme-provider';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import TimelineItem from './TimelineItem';

interface TimelineBook {
  id: string;
  title: string;
  author: string;
  date: string;
  description: string;
  category: string;
  coverColor: string;
  titleColor: string;
  iconColor: string;
}

interface YearSectionProps {
  year: string;
  books: TimelineBook[];
}

const YearSection = ({ year, books }: YearSectionProps) => {
  const { theme } = useThemeContext();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <div>
      <motion.div
        className="relative mb-4 flex items-center justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={cn(
          "text-4xl font-bold",
          isDark ? "text-foreground/80" : "text-foreground/80"
        )}>
          {year}
        </div>
      </motion.div>

      <div className="relative flex flex-col items-center">
        {books.map((book, index) => (
          <TimelineItem 
            key={book.id}
            book={book} 
            index={index}
            isFirst={index === 0}
            isLast={index === books.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default YearSection;
