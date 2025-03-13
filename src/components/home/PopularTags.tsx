
import { motion } from 'framer-motion';
import { Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface TagData {
  name: string;
  count: number;
  color: string;
  titleColor: string;
  iconColor: string;
}

interface PopularTagsProps {
  tags: TagData[];
}

const PopularTags = ({ tags }: PopularTagsProps) => {
  return (
    <div className="w-full max-w-6xl px-4 py-12">
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="inline-flex items-center justify-center gap-3 mb-4 px-4 py-2 rounded-full bg-primary/10">
          <Tag className="w-5 h-5 text-primary" />
          <span className="text-primary font-medium">热门标签</span>
        </div>
        
        <h2 className="text-3xl font-bold mb-2">
          探索常见的<span className="text-primary">阅读主题</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          这些标签涵盖了最常见的阅读主题和概念
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {tags.map((tag, index) => (
          <motion.div
            key={tag.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <Link to={`/tags/${tag.name}`}>
              <div className={cn(
                "rounded-xl p-4 h-full border transition-transform duration-300 hover:scale-105",
                "bg-gradient-to-br", tag.color
              )}>
                <h3 className={cn("text-lg font-bold mb-2", tag.titleColor)}>
                  {tag.name}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-foreground/60">
                    {tag.count} 本书籍
                  </span>
                  <div className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center",
                    "bg-background/10"
                  )}>
                    <Tag className={cn("w-4 h-4", tag.iconColor)} />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PopularTags;
