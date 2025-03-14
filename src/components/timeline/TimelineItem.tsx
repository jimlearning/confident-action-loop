
import { useThemeContext } from '@/contexts/theme-provider';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, CalendarDays, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import RatingStars from '@/components/RatingStars';

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
  tags?: string[];
  rating?: number;
}

interface TimelineItemProps {
  book: TimelineBook;
  index: number;
  isFirst?: boolean;
  isLast?: boolean;
}

const TimelineItem = ({ book, index, isFirst, isLast }: TimelineItemProps) => {
  const { theme } = useThemeContext();
  const isDark = theme === 'dark';

  return (
    <motion.div
      className="relative w-full flex items-start gap-4 pl-8 py-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      {/* Timeline dot and connector */}
      <div className="absolute left-4 top-0 h-full">
        <div className="relative h-full flex flex-col items-center">
          {/* 虚线 */}
          <div
            className={cn(
              "absolute w-[2px] border-l border-dashed border-muted-foreground/50",
              !(isFirst && isLast) && (isFirst ? "top-[calc(50%+8px)] bottom-0" : isLast ? "top-0 bottom-[calc(50%-8px)]" : "top-0 bottom-0")
            )}
          />
          {/* 时间点 */}
          <div className="absolute top-[calc(50%-16px)] h-8 w-8 flex items-center justify-center bg-primary rounded-full z-10 shadow-md ring-1 ring-border/5">
            <CalendarDays className="w-4 h-4 text-primary-foreground" />
          </div>
        </div>
      </div>

      {/* Content - 改为类似 BentoItem 的卡片样式 */}
      <div className={cn(
        "w-full rounded-xl p-5 transition-all duration-300 ml-4",
        "bg-gradient-to-br border hover:shadow-lg",
        book.coverColor
      )}>
        {/* 保留时间和分类信息 */}
        <div className="flex items-center gap-1 mb-3">
          <div className={cn("flex items-center justify-center h-8 w-8 rounded-full", "bg-background/20")}>
            <BookOpen className={cn("w-4 h-4", book.iconColor || "text-primary")} />
          </div>
          <div className="flex items-center gap-1">
            <p className={cn("text-sm font-medium", book.titleColor)}>
              {new Date(book.date).toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </p>
            <div className="h-1 w-1 ml-2 rounded-full bg-foreground/40" />
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-background/20">
              {book.category}
            </span>
          </div>
        </div>

        {/* 书籍标题和作者 */}
        <h3 className={cn("text-xl font-bold mb-2", book.titleColor)}>{book.title}</h3>
        <p className="text-sm mb-3 text-foreground/80">作者: {book.author}</p>

        {/* 描述 */}
        <p className="text-sm text-foreground/70 mb-4">{book.description}</p>

        {/* 标签 - 如果有的话 */}
        {book.tags && book.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {book.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 rounded-md bg-background/20 text-xs"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* 底部区域 - 评分和链接 */}
        <div className="flex items-center justify-between mt-3">
          {book.rating && <RatingStars rating={book.rating} />}

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
      </div>
    </motion.div>
  );
};

export default TimelineItem;
