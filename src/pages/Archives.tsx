
import Navbar from '@/components/Navbar';
import { getTimelineData } from '@/utils/data';
import { motion } from 'framer-motion';
import { 
  Archive, ArrowRight, BookOpen, CalendarDays 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

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

interface TimelineYear {
  year: string;
  books: TimelineBook[];
}

const TimelineItem = ({ book, index }: { book: TimelineBook; index: number }) => {
  const isEven = index % 2 === 0;
  const { theme } = useTheme();
  
  return (
    <motion.div
      className={cn(
        "relative pl-10 pb-10 md:pb-0 md:pl-0",
        isEven ? "md:text-right md:pr-8 md:pl-0" : "md:text-left md:pl-8 md:ml-auto"
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      {/* Timeline connector line */}
      <div className={cn(
        "absolute left-0 top-0 bottom-0 border-l-2 border-dashed md:left-1/2 md:-translate-x-1/2",
        theme === 'dark' ? "border-white/20" : "border-black/20"
      )} />
      
      {/* Date bubble */}
      <div className="absolute left-0 -translate-x-1/2 top-0 h-8 w-8 flex items-center justify-center bg-primary rounded-full md:left-1/2">
        <CalendarDays className="w-4 h-4 text-primary-foreground" />
      </div>
      
      {/* Content */}
      <div className={cn(
        "rounded-xl p-4 transition-all duration-300 md:w-[calc(50%-2rem)] md:max-w-md",
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

const YearSection = ({ year, books }: TimelineYear) => {
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

const Archives = () => {
  const [timelineData, setTimelineData] = useState<TimelineYear[]>([]);
  
  useEffect(() => {
    const data = getTimelineData();
    setTimelineData(data.years);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center overflow-x-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-bento-purple/20 rounded-full filter blur-[120px] opacity-20" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-bento-blue/20 rounded-full filter blur-[120px] opacity-20" />
      </div>

      <Navbar />

      {/* Archives Header */}
      <motion.div
        className="w-full max-w-7xl px-4 md:px-8 mt-24 mb-12 text-center"
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
          <Archive className="w-5 h-5 text-primary" />
          <span className="text-primary font-medium">时间轴视图</span>
        </motion.div>
        
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          阅读<span className="text-primary">归档</span>
        </motion.h1>
        <motion.p
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          按照时间顺序查看我的阅读历程
        </motion.p>
      </motion.div>

      {/* Timeline View */}
      <motion.div
        className="w-full max-w-5xl px-4 md:px-8 mb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        {timelineData.map((yearData) => (
          <YearSection key={yearData.year} {...yearData} />
        ))}
      </motion.div>

      {/* Footer */}
      <motion.footer
        className="w-full py-8 text-center text-muted-foreground text-sm border-t border-border mt-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} 读书笔记 Cheat Sheets. 保留所有权利。</p>
          <p className="mt-2">设计灵感来源于极简主义设计原则</p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Archives;
