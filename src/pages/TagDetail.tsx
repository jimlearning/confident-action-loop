
import BentoGrid from '@/components/BentoGrid';
import BentoItem from '@/components/BentoItem';
import { cn } from '@/lib/utils';
import { getBookData, getTagByName } from '@/utils/data';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, BookOpen, Star, Tag as TagIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

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

const TagDetail = () => {
  const { tagName } = useParams<{ tagName: string }>();
  const [tag, setTag] = useState<any>(null);
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!tagName) return;

      const decodedTagName = decodeURIComponent(tagName);

      const tagData = getTagByName(decodedTagName);
      setTag(tagData);

      if (tagData?.books) {
        const bookPromises = tagData.books.map((book: { id: string }) =>
          getBookData(book.id)
        );

        const bookData = await Promise.all(bookPromises);
        setBooks(bookData.filter(Boolean));
      }

      setLoading(false);
    };

    fetchData();
  }, [tagName]);

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

  if (!tag) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
        <div className="text-center mt-24">
          <h1 className="text-3xl font-bold mb-4">标签未找到</h1>
          <p className="mb-6 text-muted-foreground">抱歉，我们找不到您请求的标签</p>
          <Link to="/tags" className="text-primary flex items-center justify-center hover:underline">
            <ArrowLeft className="mr-2 w-4 h-4" /> 返回标签列表
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center overflow-x-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-bento-purple/20 rounded-full filter blur-[120px] opacity-20" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-bento-blue/20 rounded-full filter blur-[120px] opacity-20" />
      </div>

      <motion.div
        className="w-full max-w-7xl px-4 md:px-8 mt-12 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/tags" className="flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回标签列表
        </Link>

        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className={cn(
            "p-4 rounded-xl bg-gradient-to-br",
            tag.color
          )}>
            <TagIcon className={cn("w-8 h-8", tag.iconColor)} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              {tag.name} <span className="text-muted-foreground">({tag.count})</span>
            </h1>
            <p className="text-muted-foreground mt-1">{tag.description}</p>
          </div>
        </motion.div>

        <motion.div
          className="h-1 w-full bg-gradient-to-r from-transparent via-border to-transparent mb-12"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        />
      </motion.div>

      <motion.div
        className="w-full max-w-7xl px-4 md:px-8 mb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <BentoGrid>
          {books.map((book, index) => (
            <BentoItem
              key={book.id}
              title={book.title}
              titleColor={book.titleColor}
              className={`md:col-span-3 bg-gradient-to-br ${book.coverColor}`}
              icon={<BookOpen className={`w-5 h-5 ${book.iconColor}`} />}
              delay={index + 1}
            >
              <div className="space-y-4 mt-2">
                <p>{book.description}</p>

                <div className="flex flex-wrap gap-2">
                  {book.tags.map((tag: string) => (
                    <Link
                      key={tag}
                      to={`/tags/${encodeURIComponent(tag)}`}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted/50 text-muted-foreground"
                    >
                      <TagIcon className="w-3 h-3 mr-1" />
                      {tag}
                    </Link>
                  ))}
                </div>

                <div className="flex justify-between items-center">
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
      </motion.div>

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

export default TagDetail;
