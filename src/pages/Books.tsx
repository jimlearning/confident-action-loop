import BentoGrid from '@/components/BentoGrid';
import BentoItem from '@/components/BentoItem';
import Navbar from '@/components/Navbar';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Star, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

// 模拟数据 - 在实际应用中可以从API获取
const books = [
  {
    id: 'confidence-trap',
    title: '自信的陷阱',
    description: '探讨如何通过行动建立真正的自信，而不是等待自信才行动',
    category: '心理学',
    tags: ['自信', '心理学', '个人成长'],
    rating: 4.5,
    coverColor: 'from-primary/20 to-primary/10 border-primary/20',
    titleColor: 'text-primary',
    iconColor: 'text-primary'
  },
  {
    id: 'atomic-habits',
    title: '原子习惯',
    description: '如何通过微小的改变实现巨大的成果，建立积极的习惯系统',
    category: '个人成长',
    tags: ['习惯', '自我提升', '效率'],
    rating: 4.8,
    coverColor: 'from-yellow-900/30 to-purple-800/20 border-purple-900/30',
    titleColor: 'text-yellow-600',
    iconColor: 'text-yellow-600'
  },
  {
    id: 'thinking-fast-slow',
    title: '思考，快与慢',
    description: '探索人类思维的两种模式，以及它们如何影响我们的决策和判断',
    category: '心理学',
    tags: ['认知心理学', '决策', '行为经济学'],
    rating: 4.6,
    coverColor: 'from-purple-900/30 to-purple-800/20 border-purple-900/30',
    titleColor: 'text-purple-400',
    iconColor: 'text-purple-400'
  },
  {
    id: 'deep-work',
    title: '深度工作',
    description: '在注意力分散的世界中，如何培养专注力并创造有价值的工作',
    category: '效率',
    tags: ['专注力', '生产力', '工作方法'],
    rating: 4.7,
    coverColor: 'from-orange-900/20 to-orange-800/10 border-orange-900/20',
    titleColor: 'text-orange-400',
    iconColor: 'text-orange-400'
  },
  {
    id: 'mindset',
    title: '终身成长',
    description: '探讨固定思维模式与成长思维模式的区别，以及如何培养成长型思维',
    category: '心理学',
    tags: ['思维模式', '成长', '学习'],
    rating: 4.5,
    coverColor: 'from-teal-900/20 to-teal-800/10 border-teal-900/20',
    titleColor: 'text-teal-400',
    iconColor: 'text-teal-400'
  },
  {
    id: 'power-of-now',
    title: '当下的力量',
    description: '如何通过活在当下，摆脱思想的束缚，获得内心的平静与力量',
    category: '心灵成长',
    tags: ['正念', '冥想', '心灵'],
    rating: 4.4,
    coverColor: 'from-indigo-900/20 to-indigo-800/10 border-indigo-900/20',
    titleColor: 'text-indigo-400',
    iconColor: 'text-indigo-400'
  },
  {
    id: 'emotional-intelligence',
    title: '情绪智力',
    description: '了解情绪如何影响思维和行为，以及如何有效管理情绪',
    category: '心理学',
    tags: ['情绪管理', '自我意识', '社交技能'],
    rating: 4.3,
    coverColor: 'from-pink-900/20 to-pink-800/10 border-pink-900/20',
    titleColor: 'text-pink-400',
    iconColor: 'text-pink-400'
  },
  {
    id: 'mans-search-for-meaning',
    title: '活出生命的意义',
    description: '探索如何在苦难中找到生命的意义和目的',
    category: '哲学',
    tags: ['意义', '存在主义', '心理学'],
    rating: 4.7,
    coverColor: 'from-yellow-900/20 to-yellow-800/10 border-yellow-900/20',
    titleColor: 'text-yellow-400',
    iconColor: 'text-yellow-400'
  },
  {
    id: 'getting-things-done',
    title: '搞定',
    description: '一种实用的时间管理和个人生产力提升系统',
    category: '效率',
    tags: ['时间管理', '生产力', '组织'],
    rating: 4.5,
    coverColor: 'from-cyan-900/20 to-cyan-800/10 border-cyan-900/20',
    titleColor: 'text-cyan-400',
    iconColor: 'text-cyan-400'
  }
];

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
      <span className="ml-1 text-sm text-muted-foreground">{rating.toFixed(1)}</span>
    </div>
  );
};

const Books = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center overflow-x-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-bento-purple/20 rounded-full filter blur-[120px] opacity-20" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-bento-blue/20 rounded-full filter blur-[120px] opacity-20" />
      </div>

      <Navbar />

      {/* Books Header */}
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
          我的<span className="text-primary">书籍</span>笔记
        </motion.h1>
        <motion.p
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          浏览所有书籍的Cheat Sheets，快速获取核心知识
        </motion.p>
      </motion.div>

      {/* Filter Options */}
      <motion.div
        className="w-full max-w-7xl px-4 md:px-8 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="flex flex-wrap gap-3 justify-center">
          <button className="px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary hover:bg-primary/30 transition-colors">
            全部
          </button>
          <button className="px-4 py-2 rounded-full bg-muted/50 border border-border hover:bg-muted transition-colors">
            心理学
          </button>
          <button className="px-4 py-2 rounded-full bg-muted/50 border border-border hover:bg-muted transition-colors">
            个人成长
          </button>
          <button className="px-4 py-2 rounded-full bg-muted/50 border border-border hover:bg-muted transition-colors">
            效率
          </button>
          <button className="px-4 py-2 rounded-full bg-muted/50 border border-border hover:bg-muted transition-colors">
            心灵成长
          </button>
          <button className="px-4 py-2 rounded-full bg-muted/50 border border-border hover:bg-muted transition-colors">
            哲学
          </button>
        </div>
      </motion.div>

      {/* Books Grid */}
      <BentoGrid className="px-4 md:px-8 mb-12">
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
                {book.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted/50 text-muted-foreground"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
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

export default Books;