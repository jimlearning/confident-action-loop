
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
    <div className="mb-16">
      <motion.div
        className="relative mb-8 flex items-center justify-center"
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

      <div className="relative flex flex-col items-center gap-6">
        {books.map((book, index) => (
          <div key={book.id} className="relative w-full">
            {/* 中轴线，只在非第一个项目的上方显示 */}
            {index > 0 && (
              <div className={cn(
                "absolute left-1/2 top-[-24px] h-[24px] w-[2px] -translate-x-1/2 border-l border-dashed -z-1",
                isDark ? "border-muted-foreground/75" : "border-muted-foreground/75"
              )} />
            )}
            <TimelineItem book={book} index={index} />
          </div>  
        ))}
      </div>
    </div>
  );
};

export default YearSection;
