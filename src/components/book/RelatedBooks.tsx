import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import RatingStars from '@/components/RatingStars';

interface RelatedBooksProps {
  books: any[];
  controls: any;
}

const RelatedBooks = ({ books, controls }: RelatedBooksProps) => {
  if (!books || books.length === 0) return null;
  
  return (
    <motion.div
      className="w-full max-w-7xl px-4 md:px-8 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-6">相关书籍</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {books.map((relatedBook) => (
          <Link
            key={relatedBook.id}
            to={`/books/${relatedBook.id}`}
            className="group"
          >
            <motion.div
              className={`p-6 rounded-xl bg-gradient-to-br ${relatedBook.coverColor} border border-border h-full flex flex-col transition-all duration-300 group-hover:shadow-lg group-hover:border-border/50`}
              whileHover={{ y: -5 }}
            >
              <BookOpen className={`w-10 h-10 ${relatedBook.iconColor} mb-4`} />
              <h3 className="text-xl font-semibold mb-2">{relatedBook.title}</h3>
              <p className="text-muted-foreground text-sm mb-3 flex-grow">{relatedBook.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{relatedBook.category}</span>
                <RatingStars rating={relatedBook.rating} />
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default RelatedBooks;
