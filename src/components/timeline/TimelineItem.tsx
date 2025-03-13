
import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useThemeContext } from '@/contexts/theme-provider';
import { cn } from '@/lib/utils';

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

interface TimelineItemProps {
  book: TimelineBook;
  index: number;
}

const TimelineItem = ({ book, index }: TimelineItemProps) => {
  const isEven = index % 2 === 0;
  const { theme } = useThemeContext();
  const isDark = theme === 'dark';
  
  return (
    <motion.div
      className={cn(
        "relative p-4 mb-8",
        isEven ? "md:pr-8 md:mr-4" : "md:pl-8 md:ml-4"
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      {/* Timeline connector line (visible only on mobile) */}
      <div className={cn(
        "absolute left-0 top-0 bottom-0 border-l-2 border-dashed md:hidden",
        isDark ? "border-white/20" : "border-black/20"
      )} />
      
      {/* Timeline connector for desktop view */}
      <div className={cn(
        "hidden md:block absolute top-1/2 h-0.5 border-t-2 border-dashed w-8",
        isDark ? "border-white/20" : "border-black/20",
        isEven ? "right-0" : "left-0"
      )} />
      
      {/* Date bubble */}
      <div className="absolute left-0 -translate-x-1/2 top-0 h-8 w-8 flex items-center justify-center bg-primary rounded-full md:hidden">
        <CalendarDays className="w-4 h-4 text-primary-foreground" />
      </div>
      
      {/* Date bubble for desktop */}
      <div className={cn(
        "hidden md:flex absolute top-1/2 -translate-y-1/2 h-8 w-8 items-center justify-center bg-primary rounded-full",
        isEven ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"
      )}>
        <CalendarDays className="w-4 h-4 text-primary-foreground" />
      </div>
      
      {/* Content */}
      <div className={cn(
        "rounded-xl p-4 transition-all duration-300 max-w-md mx-auto",
        "bg-gradient-to-br border hover:shadow-lg",
        book.coverColor
      )}>
        <div className="flex items-center gap-3 mb-2">
          <p className={cn("text-sm font-medium", book.titleColor)}>
            {new Date(book.date).toLocaleDateString('zh-CN', { 
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </p>
          <div className="h-1 w-1 rounded-full bg-foreground/40" />
          <p className="text-sm text-foreground/70">{book.category}</p>
        </div>
        
        <h3 className={cn("text-xl font-bold mb-2", book.titleColor)}>{book.title}</h3>
        <p className="text-sm mb-3 text-foreground/80">作者: {book.author}</p>
        <p className="text-sm text-foreground/60 mb-4">{book.description}</p>
        
        <Link
          to={`/books/${book.id}`}
          className={cn(
            "inline-flex items-center text-sm font-medium transition-colors",
            book.titleColor, "hover:underline"
          )}
        >
          阅读笔记 <ArrowRight className="ml-1 w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
};

export default TimelineItem;
