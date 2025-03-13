
import { motion } from 'framer-motion';
import { Book, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { getTimelineData } from '@/utils/data';
import { useEffect, useState } from 'react';

interface BookType {
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

const RecentBooks = () => {
  const [recentBooks, setRecentBooks] = useState<BookType[]>([]);
  
  useEffect(() => {
    const data = getTimelineData();
    // Get the most recent books (first 4 books from the most recent year)
    if (data.years.length > 0) {
      const latestYear = data.years[0];
      setRecentBooks(latestYear.books.slice(0, 4));
    }
  }, []);

  return (
    <div className="w-full max-w-6xl px-4 py-12">
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="inline-flex items-center justify-center gap-3 mb-4 px-4 py-2 rounded-full bg-primary/10">
          <Book className="w-5 h-5 text-primary" />
          <span className="text-primary font-medium">最新阅读</span>
        </div>
        
        <h2 className="text-3xl font-bold mb-2">
          近期<span className="text-primary">阅读</span>书籍
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          这些是我最近阅读的一些书籍，点击查看详细笔记
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {recentBooks.map((book, index) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <Link to={`/books/${book.id}`}>
              <div className={cn(
                "rounded-xl p-4 h-full border transition-transform duration-300 hover:scale-105",
                "bg-gradient-to-br", book.coverColor
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
                <p className="text-sm mb-2 text-foreground/80">作者: {book.author}</p>
                <p className="text-sm text-foreground/60 mb-4 line-clamp-2">{book.description}</p>
                
                <div className={cn(
                  "inline-flex items-center text-sm font-medium transition-colors",
                  book.titleColor, "hover:underline"
                )}>
                  阅读笔记 <ArrowRight className="ml-1 w-4 h-4" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentBooks;
