import BentoGrid from '@/components/BentoGrid';
import BentoItem from '@/components/BentoItem';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

// 模拟分类数据
const categories = [
  {
    name: '心理学',
    count: 12,
    color: 'from-purple-900/20 to-purple-800/10 border-purple-900/20',
    titleColor: 'text-purple-400',
    iconColor: 'text-purple-400',
    description: '探索人类思维、行为和情感的科学，包括认知心理学、行为心理学和积极心理学等领域的书籍。',
    books: [
      { id: 'confidence-trap', title: '自信的陷阱' },
      { id: 'thinking-fast-slow', title: '思考，快与慢' },
      { id: 'mindset', title: '终身成长' },
      { id: 'emotional-intelligence', title: '情绪智力' },
    ]
  },
  {
    name: '个人成长',
    count: 15,
    color: 'from-blue-900/20 to-blue-800/10 border-blue-900/20',
    titleColor: 'text-blue-400',
    iconColor: 'text-blue-400',
    description: '关注个人发展、自我提升和生活质量改善的书籍，包括习惯养成、目标设定和自我管理等主题。',
    books: [
      { id: 'atomic-habits', title: '原子习惯' },
      { id: 'deep-work', title: '深度工作' },
      { id: 'power-of-now', title: '当下的力量' },
      { id: 'four-hour-work-week', title: '每周工作4小时' },
    ]
  },
  {
    name: '效率',
    count: 8,
    color: 'from-green-900/20 to-green-800/10 border-green-900/20',
    titleColor: 'text-green-400',
    iconColor: 'text-green-400',
    description: '专注于提高工作和生活效率的方法论，包括时间管理、注意力管理和工作流程优化等内容。',
    books: [
      { id: 'deep-work', title: '深度工作' },
      { id: 'getting-things-done', title: '搞定' },
      { id: 'one-thing', title: '最重要的事只有一件' },
      { id: 'eat-that-frog', title: '先吃掉那只青蛙' },
    ]
  },
  {
    name: '心灵成长',
    count: 6,
    color: 'from-orange-900/20 to-orange-800/10 border-orange-900/20',
    titleColor: 'text-orange-400',
    iconColor: 'text-orange-400',
    description: '关注内在平静、正念和精神成长的书籍，包括冥想、自我接纳和内心平衡等主题。',
    books: [
      { id: 'power-of-now', title: '当下的力量' },
      { id: 'untethered-soul', title: '无束缚的灵魂' },
      { id: 'mans-search-for-meaning', title: '活出生命的意义' },
      { id: 'alchemist', title: '牧羊少年奇幻之旅' },
    ]
  },
  {
    name: '哲学',
    count: 7,
    color: 'from-teal-900/20 to-teal-800/10 border-teal-900/20',
    titleColor: 'text-teal-400',
    iconColor: 'text-teal-400',
    description: '探讨人类存在、知识、价值和理性等根本问题的书籍，包括古典哲学和现代哲学思想。',
    books: [
      { id: 'meditations', title: '沉思录' },
      { id: 'sophie-world', title: '苏菲的世界' },
      { id: 'republic', title: '理想国' },
      { id: 'thus-spoke-zarathustra', title: '查拉图斯特拉如是说' },
    ]
  },
  {
    name: '商业与领导力',
    count: 10,
    color: 'from-indigo-900/20 to-indigo-800/10 border-indigo-900/20',
    titleColor: 'text-indigo-400',
    iconColor: 'text-indigo-400',
    description: '关注商业策略、管理技巧和领导力发展的书籍，适合企业家和管理者阅读。',
    books: [
      { id: 'start-with-why', title: '从问题出发' },
      { id: 'good-to-great', title: '从优秀到卓越' },
      { id: 'lean-startup', title: '精益创业' },
      { id: 'zero-to-one', title: '从0到1' },
    ]
  },
];

const Categories = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center overflow-x-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-bento-purple/20 rounded-full filter blur-[120px] opacity-20" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-bento-blue/20 rounded-full filter blur-[120px] opacity-20" />
      </div>

      <Navbar />

      {/* Categories Header */}
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
          书籍<span className="text-primary">分类</span>
        </motion.h1>
        <motion.p
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          按照不同主题浏览书籍，探索你感兴趣的领域
        </motion.p>
      </motion.div>

      {/* Categories Grid */}
      <BentoGrid className="px-4 md:px-8 mb-12">
        {categories.map((category, index) => (
          <BentoItem
            key={category.name}
            title={category.name}
            titleColor={category.titleColor}
            className={`md:col-span-3 bg-gradient-to-br ${category.color}`}
            icon={<BookOpen className={`w-5 h-5 ${category.iconColor}`} />}
            chip={`${category.count} 本书`}
            delay={index + 1}
          >
            <div className="space-y-4 mt-2">
              <p>{category.description}</p>

              <div className="bg-white/30 p-4 rounded-lg dark:bg-white/5">
                <h3 className="font-medium mb-3">热门书籍：</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {category.books.map(book => (
                    <Link
                      key={book.id}
                      to={`/books/${book.id}`}
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <BookOpen className="w-4 h-4 flex-shrink-0" />
                      <span>{book.title}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <Link
                  to={`/categories/${category.name}`}
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

export default Categories;