
import { motion } from 'framer-motion';
import { useThemeContext } from '@/contexts/theme-provider';
import { cn } from '@/lib/utils';
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
    <div className="mb-16">
      <motion.div
        className="relative mb-8 flex items-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={cn(
          "text-4xl font-bold mr-4",
          isDark ? "text-foreground/80" : "text-foreground/80"
        )}>
          {year}
        </div>
        <div className={cn(
          "flex-grow h-0.5",
          isDark ? "bg-border" : "bg-border"
        )} />
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        {books.map((book, index) => (
          <TimelineItem key={book.id} book={book} index={index} />
        ))}
      </div>
    </div>
  );
};

export default YearSection;
