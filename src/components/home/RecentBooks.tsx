
import { motion } from 'framer-motion';
import { Book, ArrowRight, BookOpen, Tag, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { getTimelineData } from '@/utils/data';
import { useEffect, useState } from 'react';
import BentoGrid from '@/components/BentoGrid';
import BentoItem from '@/components/BentoItem';
import RatingStars from '@/components/RatingStars';

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
  tags: string[];
  rating: number;
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

      {/* Books Grid */}
      <BentoGrid>
        {recentBooks.map((book, index) => (
          <BentoItem
            key={book.id}
            title={book.title}
            titleColor={book.titleColor}
            className={`bg-gradient-to-br ${book.coverColor}`}
            icon={<BookOpen className={`w-5 h-5 ${book.iconColor}`} />}
            delay={index}
            chip={book.category}
          >
            <div className="space-y-3">
              <p className="text-muted-foreground">{book.description}</p>

              <div className="flex flex-wrap gap-2 mt-2">
                {book.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 rounded-md bg-muted/50 text-xs"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between mt-3">
                <RatingStars rating={book.rating} />

                <Link
                  to={`/books/${book.id}`}
                  className="flex items-center text-primary hover:underline"
                >
                  查看详情 <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
          </BentoItem>
        ))}
      </BentoGrid>
    </div>
  );
};

export default RecentBooks;
