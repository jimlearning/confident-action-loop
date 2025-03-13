
import { getBookData, getRelatedBooks } from '@/utils/data';
import { motion, useAnimation } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Import our extracted components
import BookContent from '@/components/book/BookContent';
import BookHeader from '@/components/book/BookHeader';
import BookQuotes from '@/components/book/BookQuotes';
import ConfidenceRules from '@/components/book/ConfidenceRules';
import KeyPoints from '@/components/book/KeyPoints';
import RelatedBooks from '@/components/book/RelatedBooks';

const BookDetail = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [relatedBooks, setRelatedBooks] = useState<any[]>([]);
  const controls = useAnimation();

  useEffect(() => {
    const fetchData = async () => {
      if (!bookId) return;

      try {
        setLoading(true);
        // Get main book data
        const bookData = await getBookData(bookId);
        setBook(bookData);

        if (bookData && bookData.tags) {
          // Get related books
          const related = await getRelatedBooks(bookId, bookData.tags);
          setRelatedBooks(related);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error loading book data:", error);
        setLoading(false);
      }
    };

    fetchData();
    // Reset state when bookId changes
    return () => {
      setBook(null);
      setRelatedBooks([]);
      setLoading(true);
    };
  }, [bookId]);

  useEffect(() => {
    if (book) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, book]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
        <div className="mt-24 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-4 text-muted-foreground">加载中...</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
        <div className="text-center mt-24">
          <h1 className="text-3xl font-bold mb-4">书籍未找到</h1>
          <p className="mb-6 text-muted-foreground">抱歉，我们找不到您请求的书籍</p>
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors mx-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center overflow-x-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full filter blur-[120px] opacity-20" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/20 rounded-full filter blur-[120px] opacity-20" />
      </div>

      {/* Book Header */}
      <BookHeader book={book} />

      {/* Book Content */}
      <BookContent book={book} controls={controls} />

      {/* Key Points */}
      {book.content?.keyPoints && (
        <KeyPoints points={book.content.keyPoints} controls={controls} />
      )}

      {/* Additional Components */}
      {book.hasConfidenceRules && book.rules && <ConfidenceRules rules={book.rules} />}
      {book.hasBookQuotes && book.quotes && <BookQuotes quotes={book.quotes} />}

      {/* Related Books */}
      {relatedBooks.length > 0 && (
        <RelatedBooks books={relatedBooks} controls={controls} />
      )}

      {/* Footer */}
      <motion.footer
        className="w-full py-8 text-center text-muted-foreground text-sm border-t border-border mt-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} 读书笔记 Cheat Sheets. 保留所有权利。</p>
          <p className="mt-2">将复杂的书籍精华浓缩为直观的知识图谱</p>
        </div>
      </motion.footer>
    </div>
  );
};

export default BookDetail;
