
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/use-theme';
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
  const { theme } = useTheme();
  
  return (
    <div className="mb-16">
      <motion.div
        className="relative mb-8 flex items-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={cn(
          "text-4xl font-bold mr-4 opacity-70",
          theme === 'dark' ? "text-white" : "text-black"
        )}>
          {year}
        </div>
        <div className={cn(
          "flex-grow h-0.5",
          theme === 'dark' ? "bg-white/10" : "bg-black/10"
        )} />
      </motion.div>
      
      <div className="md:grid md:grid-cols-2">
        {books.map((book, index) => (
          <TimelineItem key={book.id} book={book} index={index} />
        ))}
      </div>
    </div>
  );
};

export default YearSection;
