
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Star, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RatingStarsProps {
  rating: number;
}

export const RatingStars = ({ rating }: RatingStarsProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            "w-4 h-4",
            i < fullStars
              ? "text-yellow-400 fill-yellow-400"
              : i === fullStars && hasHalfStar
                ? "text-yellow-400 fill-yellow-400/50"
                : "text-muted-foreground"
          )}
        />
      ))}
      <span className="ml-1 text-sm text-muted-foreground">{rating?.toFixed(1)}</span>
    </div>
  );
};

interface BookHeaderProps {
  book: any;
}

const BookHeader = ({ book }: BookHeaderProps) => {
  if (!book) return null;

  return (
    <motion.header
      className="w-full py-8 px-4 md:px-8 flex flex-col items-center justify-center text-center mt-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button
        onClick={() => window.history.back()}
        className="self-start flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        返回
      </button>

      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/60 to-secondary/60 rounded-lg blur opacity-20"></div>
        <div className="relative px-7 py-4 bg-card rounded-lg border border-border">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            《{book.title}》
          </h1>
          <p className="text-lg text-muted-foreground mt-2">{book.subtitle}</p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center">
              <BookOpen className="w-4 h-4 mr-2 text-muted-foreground" />
              <span className="text-muted-foreground">{book.author} · {book.publishYear}</span>
            </div>

            <div className="flex items-center">
              <Tag className="w-4 h-4 mr-2 text-muted-foreground" />
              <span className="text-muted-foreground">{book.category}</span>
            </div>

            <RatingStars rating={book.rating} />
          </div>

          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {book.tags.map((tag: string) => (
              <Link
                key={tag}
                to={`/tags/${encodeURIComponent(tag)}`}
                className="px-3 py-1 rounded-full bg-muted hover:bg-muted/80 transition-colors text-sm text-muted-foreground"
              >
                {tag}
              </Link>
            ))}
          </div>

          <p className="mt-6 text-lg text-foreground/90 max-w-2xl">
            {book.description}
          </p>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default BookHeader;
