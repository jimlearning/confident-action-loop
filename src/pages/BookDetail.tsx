
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

interface Rule {
  title: string;
  content: string;
  titleColor: string;
  className: string;
  iconColor: string;
}

interface BookQuote {
  title: string;
  content: string;
  page?: string;
  titleColor: string;
  className: string;
  iconColor: string;
  source?: string;
}

interface KeyPoint {
  title: string;
  points: string[];
}

interface BookData {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  rating: number;
  hasConfidenceRules?: boolean;
  hasBookQuotes?: boolean;
  rules?: Rule[];
  quotes?: BookQuote[];
  content: {
    misconception: {
      title: string;
      content: string;
      detail?: string;
    };
    reality: {
      title: string;
      content: string;
      steps?: string[];
    };
    sections: Array<{
      title: string;
      content: any;
      titleColor?: string;
      className?: string;
      icon?: string;
      chip?: string;
    }>;
    keyPoints?: KeyPoint[];
  };
}

const BookDetail = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [book, setBook] = useState<BookData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [relatedBooks, setRelatedBooks] = useState<BookData[]>([]);
  const controls = useAnimation();

  useEffect(() => {
    let isMounted = true;
    let bookDataCache: BookData | null = null;
    const controller = new AbortController();
    
    const fetchData = async () => {
      if (!bookId) {
        setError('无效的书籍 ID');
        return;
      }

      try {
        if (!isMounted) return;

        setLoading(true);
        setError(null);
        controls.set({ opacity: 0, y: 20 });
        
        const bookData = await getBookData(bookId);
        
        if (controller.signal.aborted || !isMounted) return;
        
        if (!bookData) {
          throw new Error('无法加载书籍数据');
        }

        // 验证数据结构
        const requiredFields = ['id', 'title', 'content'] as const;
        const missingFields = requiredFields.filter(field => !(field in bookData));
        if (missingFields.length > 0) {
          throw new Error(`书籍数据结构不完整: 缺少 ${missingFields.join(', ')}`);
        }

        // 验证content结构
        const { misconception, reality, sections } = bookData.content;
        if (!misconception || !reality || !sections) {
          throw new Error('书籍内容结构不完整');
        }

        // 缓存数据并更新状态
        bookDataCache = bookData as BookData;
        await new Promise(resolve => requestAnimationFrame(resolve));
        
        if (controller.signal.aborted || !isMounted) return;
        
        setBook(bookDataCache);
        
        // 获取相关书籍
        if (bookDataCache.tags?.length > 0) {
          try {
            const related = await getRelatedBooks(bookId, bookDataCache.tags);
            if (isMounted && !controller.signal.aborted) {
              setRelatedBooks(related as BookData[]);
            }
          } catch {
            if (isMounted) setRelatedBooks([]);
          }
        }

        // 更新最终状态
        if (isMounted) {
          setLoading(false);
          setError(null);
          controls.start({ opacity: 1, y: 0 });
        }
      } catch (error) {
        if (isMounted) {
          const errorMessage = error instanceof Error ? error.message : '加载失败';
          setError(errorMessage);
          setLoading(false);
          
          // 如果还有重试机会，则等待后重试
          if (loadAttempt < 2) {
            setTimeout(() => {
              if (isMounted) {
                setLoadAttempt(prev => prev + 1);
              }
            }, 2000);
          }
        }
      }
    };

    fetchData();
    
    return () => {
      isMounted = false;
      controller.abort();
      bookDataCache = null;
    };
  }, [bookId, loadAttempt, controls]);

  // 初始化动画控制器
  useEffect(() => {
    if (!loading && !error && book) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.set({ opacity: 0, y: 20 });
    }
  }, [controls, book, error, loading]);

  if (loading || error) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
        <div className="mt-24 text-center max-w-md mx-auto px-4">
          {loading ? (
            <>
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
              <p className="mt-4 text-muted-foreground">正在加载书籍内容...</p>
              <p className="mt-2 text-sm text-muted-foreground">这可能需要几秒钟的时间</p>
            </>
          ) : error ? (
            <div className="p-6 border border-destructive/30 rounded-xl bg-destructive/5">
              <h2 className="text-xl font-semibold mb-2">加载失败</h2>
              <p className="text-destructive mb-4">{error}</p>
              {loadAttempt < 2 ? (
                <p className="text-sm text-muted-foreground">正在尝试重新加载...</p>
              ) : (
                <button
                  onClick={() => window.history.back()}
                  className="flex items-center text-muted-foreground hover:text-foreground transition-colors mx-auto"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  返回
                </button>
              )}
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
        <div className="text-center mt-24 max-w-md mx-auto px-4">
          <div className="p-6 border border-border rounded-xl bg-muted/5">
            <h1 className="text-2xl font-bold mb-4">书籍未找到</h1>
            <p className="mb-6 text-muted-foreground">抱歉，我们无法找到该书籍的内容。这可能是因为书籍不存在或者已被移除。</p>
            <button
              onClick={() => window.history.back()}
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors mx-auto"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回书籍列表
            </button>
          </div>
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
      {book && book.content && (
        <BookContent book={book} controls={controls} />
      )}

      {/* Key Points */}
      {book.content?.keyPoints && book.content.keyPoints.length > 0 && (
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
