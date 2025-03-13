
import { useThemeContext } from '@/contexts/theme-provider';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';

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

const TimelineItem = ({ book, index, hasNext, hasPrev }: TimelineItemProps & { hasNext?: boolean, hasPrev?: boolean }) => {
  const { theme } = useThemeContext();
  const isDark = theme === 'dark';

  return (
    <motion.div
      className="relative w-full flex items-start gap-4 pl-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      {/* Timeline dot and connector */}
      <div className="absolute left-0 top-0 h-full">
        <div className="relative h-full flex flex-col items-center">
          {/* 时间点 */}
          <div className="absolute top-[calc(50%-16px)] h-8 w-8 flex items-center justify-center bg-primary rounded-full z-10">
            <CalendarDays className="w-4 h-4 text-primary-foreground" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={cn(
        "w-full rounded-xl p-4 transition-all duration-300 ml-4",
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
