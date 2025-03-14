
import BentoGrid from '@/components/BentoGrid';
import BentoItem from '@/components/BentoItem';
import { cn } from '@/lib/utils';
import { getAllTags } from '@/utils/data';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Tag as TagIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface TagData {
  name: string;
  count: number;
  color: string;
  titleColor: string;
  iconColor: string;
  description: string;
  books: Array<{ id: string; title: string }>;
}

const Tags = () => {
  const [tags, setTags] = useState<TagData[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTags = async () => {
      try {
        // 模拟异步加载
        const data = await Promise.resolve(getAllTags());
        setTags(data);
      } finally {
        setIsLoading(false);
      }
    };

    loadTags();
  }, []);

  // 骨架屏占位
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-muted rounded w-64"></div>
          <div className="h-4 bg-muted rounded w-48"></div>
          <div className="grid grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-20 bg-muted rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center overflow-x-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-bento-purple/20 rounded-full filter blur-[120px] opacity-20" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-bento-blue/20 rounded-full filter blur-[120px] opacity-20" />
      </div>

      {/* Tags Header */}
      <motion.div
        className="w-full max-w-7xl px-4 md:px-8 mt-24 mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          书籍<span className="text-primary">标签</span>
        </motion.h1>
        <motion.p
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          按照不同主题和概念浏览书籍，发现新的阅读灵感
        </motion.p>
      </motion.div>

      {/* Tags Cloud */}
      <motion.div
        className="w-full max-w-7xl px-4 md:px-8 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="bg-muted/5 border border-border rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6">热门标签</h2>
          <div className="flex flex-wrap gap-4">
            {tags.map((tag, index) => (
              <TagItem
                key={tag.name}
                tag={tag}
                index={index}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Tags Grid */}
      <BentoGrid className="px-4 md:px-8 mb-12">
        {tags.map((tag, index) => (
          <BentoItem
            key={tag.name}
            title={tag.name}
            titleColor={tag.titleColor}
            className={`md:col-span-3 bg-gradient-to-br ${tag.color}`}
            icon={<TagIcon className={`w-5 h-5 ${tag.iconColor}`} />}
            chip={`${tag.count} 本书`}
            delay={index + 1}
          >
            <div className="space-y-4 mt-2">
              <p>{tag.description}</p>

              <div className="p-4 rounded-lg bg-background/30 text-foreground/50 dark:bg-white/10 dark:text-white/50">
                <h3 className="font-medium mb-3">相关书籍：</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tag.books.map(book => (
                    <Link
                      key={book.id}
                      to={`/books/${book.id}`}
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted/10 transition-colors"
                    >
                      <BookOpen className="w-4 h-4 flex-shrink-0" />
                      <span>{book.title}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <Link
                  to={`/tags/${encodeURIComponent(tag.name)}`}
                  className="flex items-center text-primary hover:underline"
                >
                  查看全部 <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
          </BentoItem>
        ))}
      </BentoGrid>

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

const TagItem = React.memo(({ tag, index }: { tag: TagData; index: number }) => (
  <Link to={`/tags/${encodeURIComponent(tag.name)}`}>
    <motion.div
      className={cn(
        // "flex items-center space-x-2 px-4 py-2 rounded-full bg-muted/50 border border-border hover:bg-muted transition-colors",
        "flex items-center gap-2 px-4 py-3 rounded-full",
        "transition-all hover:shadow-lg border",
        "bg-gradient-to-br cursor-pointer",
        tag.color
      )}
      whileHover={{ scale: 1.02, type: "spring" }}
      whileTap={{ scale: 0.98, type: "spring" }}
    >
      <TagIcon className={cn("w-5 h-5", tag.iconColor)} />
      <div>
        <span className={cn("font-medium", tag.titleColor)}>{tag.name}</span>
        <span className="ml-2 text-sm text-foreground/50">{tag.count} 本书</span>
      </div>
    </motion.div>
  </Link>
));

TagItem.displayName = "TagItem";

export default Tags;
