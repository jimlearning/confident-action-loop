
import BentoGrid from '@/components/BentoGrid';
import BentoItem from '@/components/BentoItem';
import BookQuotes from '@/components/BookQuotes';
import ConfidenceRules from '@/components/ConfidenceRules';
import Navbar from '@/components/Navbar';
import { cn } from '@/lib/utils';
import { getBookData } from '@/utils/data';
import { motion, useAnimation } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowRightFromLine,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  Heart,
  Lightbulb,
  Star,
  Tag,
  XCircle
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// 渲染星级评分
const RatingStars = ({ rating }: { rating: number }) => {
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

// 动态获取图标
const getIconComponent = (iconName: string) => {
  const icons: Record<string, React.ReactNode> = {
    BrainCircuit: <BrainCircuit className="w-5 h-5" />,
    Heart: <Heart className="w-5 h-5" />,
    Lightbulb: <Lightbulb className="w-5 h-5" />,
    ArrowRightFromLine: <ArrowRightFromLine className="w-5 h-5" />
  };
  
  return icons[iconName] || <BookOpen className="w-5 h-5" />;
};

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
        // 获取主书籍数据
        const bookData = await getBookData(bookId);
        setBook(bookData);
        
        if (bookData) {
          // 获取相关书籍数据 (最多3本)
          const relatedPromises = bookData.tags
            .slice(0, 3)
            .map(async (tag: string) => {
              const tagBooks = await getBookData(tag);
              return tagBooks;
            });
            
          const related = await Promise.all(relatedPromises);
          const filteredRelated = related.filter(book => book && book.id !== bookId);
          setRelatedBooks(filteredRelated.slice(0, 3));
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error loading book data:", error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, [bookId]);

  useEffect(() => {
    if (book) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, book]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
        <Navbar />
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
        <Navbar />
        <div className="text-center mt-24">
          <h1 className="text-3xl font-bold mb-4">书籍未找到</h1>
          <p className="mb-6 text-muted-foreground">抱歉，我们找不到您请求的书籍</p>
          <Link to="/archives" className="text-primary flex items-center justify-center hover:underline">
            <ArrowLeft className="mr-2 w-4 h-4" /> 返回归档
          </Link>
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

      <Navbar />

      {/* Book Header */}
      <motion.header
        className="w-full py-8 px-4 md:px-8 flex flex-col items-center justify-center text-center mt-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/archives" className="self-start flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回归档
        </Link>

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

      {/* Book Content */}
      <motion.div
        className="w-full max-w-7xl px-4 md:px-8 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <BentoGrid>
          {/* Misconception vs Reality */}
          <BentoItem
            title={book.content.misconception.title}
            titleColor="text-destructive"
            className="md:col-span-3 bg-gradient-to-br from-destructive/20 to-destructive/10 border-destructive/20"
            icon={<XCircle className="w-5 h-5 text-destructive" />}
            chip="🚨 危险思维"
            delay={1}
          >
            <div className="space-y-2">
              <p className="font-medium">{book.content.misconception.content}</p>
              <div className="flex items-center mt-3">
                <ArrowRight className="w-4 h-4 mr-2 text-destructive" />
                <p>{book.content.misconception.detail}</p>
              </div>
            </div>
          </BentoItem>

          <BentoItem
            title={book.content.reality.title}
            titleColor="text-green-400"
            className="md:col-span-3 bg-gradient-to-br from-green-900/20 to-green-800/10 border-green-900/20"
            icon={<CheckCircle2 className="w-5 h-5 text-green-400" />}
            chip="✅ 有效方法"
            delay={2}
          >
            <div className="flex items-center space-x-2">
              {book.content.reality.content.split(' → ').map((step: string, index: number, array: string[]) => (
                <React.Fragment key={step}>
                  <span className="px-2 py-1 bg-muted rounded-lg">{step}</span>
                  {index < array.length - 1 && <ArrowRight className="w-4 h-4" />}
                </React.Fragment>
              ))}
            </div>
          </BentoItem>

          {/* Content Sections */}
          {book.content.sections.map((section: any, index: number) => (
            <BentoItem
              key={section.title}
              title={section.title}
              titleColor={section.titleColor}
              className={`md:col-span-3 bg-gradient-to-br ${section.className}`}
              icon={getIconComponent(section.icon)}
              chip={section.chip}
              delay={index + 3}
            >
              {/* Render section content based on its structure */}
              {Array.isArray(section.content) && section.content.every((item: any) => item.title && item.description) ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {section.content.map((item: { title: string; description: string }) => (
                    <div key={item.title} className="bg-muted/5 p-3 rounded-lg border border-border">
                      <p className={`font-medium ${section.titleColor} mb-2`}>{item.title}</p>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4 mt-2">
                  {section.content.map((item: any, i: number) => (
                    <div key={i} className="bg-muted/5 p-4 rounded-lg border border-border">
                      <h3 className="font-medium mb-2">{item.title}</h3>
                      {item.description && <p className="text-muted-foreground">{item.description}</p>}
                      {item.values && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                          {item.values.map((value: { name: string; description: string }) => (
                            <div key={value.name} className="bg-muted/5 p-2 rounded-lg border border-border">
                              <span className={`font-medium ${section.titleColor}`}>{value.name}：</span>
                              <span className="text-muted-foreground">{value.description}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {item.strategies && (
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          {item.strategies.map((strategy: string, idx: number) => (
                            <li key={idx}>{strategy}</li>
                          ))}
                        </ul>
                      )}
                      {item.examples && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {item.examples.map((example: { title: string; steps: string[] }) => (
                            <div key={example.title} className="bg-muted/5 p-3 rounded-lg border border-border">
                              <p className={`font-medium ${section.titleColor} mb-2`}>{example.title}</p>
                              <div className="flex items-center space-x-2">
                                {example.steps.map((step: string, stepIdx: number, arr: string[]) => (
                                  <React.Fragment key={step}>
                                    <span className="px-2 py-1 bg-muted rounded-lg text-muted-foreground">{step}</span>
                                    {stepIdx < arr.length - 1 && <ArrowRight className="w-4 h-4 text-muted-foreground" />}
                                  </React.Fragment>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {item.steps && (
                        <div className="space-y-3 mt-2">
                          {item.steps.map((step: { number: number; title: string; description: string }) => (
                            <div key={step.number} className="flex items-start space-x-3">
                              <div className="bg-primary/10 text-primary font-medium rounded-full w-6 h-6 flex items-center justify-center shrink-0">
                                {step.number}
                              </div>
                              <div>
                                <p className="font-medium">{step.title}</p>
                                <p className="text-muted-foreground">{step.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {item.type === "error" && (
                        <div className="flex items-center mt-2">
                          <XCircle className="w-5 h-5 text-destructive mr-2" />
                          <p>{item.description}</p>
                        </div>
                      )}
                      {item.type === "success" && !item.steps && (
                        <div className="flex items-center mt-2">
                          <CheckCircle2 className="w-5 h-5 text-green-400 mr-2" />
                          <p>{item.description}</p>
                        </div>
                      )}
                      {item.type === "highlight" && (
                        <div className="mt-2 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                          <p className="font-medium text-center">{item.description}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </BentoItem>
          ))}
        </BentoGrid>
      </motion.div>

      {/* Key Points */}
      <motion.div
        className="w-full max-w-7xl px-4 md:px-8 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="bg-muted/5 border border-border rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">核心要点</h2>
          <div className="space-y-3">
            {book.content.keyPoints.map((point: string, index: number) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="mt-1">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <p className="flex-1 text-foreground">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Additional Components */}
      {book.hasConfidenceRules && <ConfidenceRules />}
      {book.hasBookQuotes && <BookQuotes />}

      {/* Related Books */}
      {relatedBooks.length > 0 && (
        <motion.div
          className="w-full max-w-7xl px-4 md:px-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6">相关书籍</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedBooks.map((relatedBook) => (
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
}

export default BookDetail;
