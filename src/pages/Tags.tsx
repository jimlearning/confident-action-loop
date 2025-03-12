import BentoGrid from '@/components/BentoGrid';
import BentoItem from '@/components/BentoItem';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Tag as TagIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

// 模拟标签数据
const tags = [
  {
    name: '自信',
    count: 5,
    color: 'from-purple-900/20 to-purple-800/10 border-purple-900/20',
    titleColor: 'text-purple-400',
    iconColor: 'text-purple-400',
    description: '关于建立自信、克服自我怀疑和发展积极自我认知的书籍和方法。',
    books: [
      { id: 'confidence-trap', title: '自信的陷阱' },
      { id: 'mindset', title: '终身成长' },
      { id: 'daring-greatly', title: '敢于冒险' },
      { id: 'six-pillars-of-self-esteem', title: '自尊的六大支柱' },
    ]
  },
  {
    name: '习惯',
    count: 7,
    color: 'from-blue-900/20 to-blue-800/10 border-blue-900/20',
    titleColor: 'text-blue-400',
    iconColor: 'text-blue-400',
    description: '探讨习惯形成、改变和优化的书籍，帮助读者建立积极的日常习惯和行为模式。',
    books: [
      { id: 'atomic-habits', title: '原子习惯' },
      { id: 'power-of-habit', title: '习惯的力量' },
      { id: 'tiny-habits', title: '微习惯' },
      { id: 'one-small-step', title: '小步前进' },
    ]
  },
  {
    name: '思维方式',
    count: 9,
    color: 'from-green-900/20 to-green-800/10 border-green-900/20',
    titleColor: 'text-green-400',
    iconColor: 'text-green-400',
    description: '关于思维模式、认知偏见和决策过程的书籍，帮助读者培养更有效的思考方式。',
    books: [
      { id: 'thinking-fast-slow', title: '思考，快与慢' },
      { id: 'mindset', title: '终身成长' },
      { id: 'black-box-thinking', title: '黑箱思维' },
      { id: 'thinking-in-systems', title: '系统思考' },
    ]
  },
  {
    name: '专注力',
    count: 6,
    color: 'from-orange-900/20 to-orange-800/10 border-orange-900/20',
    titleColor: 'text-orange-400',
    iconColor: 'text-orange-400',
    description: '探讨如何在分心的世界中培养和保持专注力，提高工作效率和创造力的书籍。',
    books: [
      { id: 'deep-work', title: '深度工作' },
      { id: 'hyperfocus', title: '超专注力' },
      { id: 'indistractable', title: '不受干扰' },
      { id: 'flow', title: '心流' },
    ]
  },
  {
    name: '正念',
    count: 8,
    color: 'from-teal-900/20 to-teal-800/10 border-teal-900/20',
    titleColor: 'text-teal-400',
    iconColor: 'text-teal-400',
    description: '关于冥想、正念练习和活在当下的书籍，帮助读者培养内心平静和情绪平衡。',
    books: [
      { id: 'power-of-now', title: '当下的力量' },
      { id: 'wherever-you-go', title: '无论你去哪里' },
      { id: 'mindfulness-in-plain-english', title: '正念的诀窍' },
      { id: 'why-we-sleep', title: '为什么要睡觉' },
    ]
  },
  {
    name: '效率',
    count: 10,
    color: 'from-indigo-900/20 to-indigo-800/10 border-indigo-900/20',
    titleColor: 'text-indigo-400',
    iconColor: 'text-indigo-400',
    description: '关于时间管理、工作流程优化和提高生产力的书籍，帮助读者更高效地完成任务。',
    books: [
      { id: 'getting-things-done', title: '搞定' },
      { id: 'eat-that-frog', title: '先吃掉那只青蛙' },
      { id: 'one-thing', title: '最重要的事只有一件' },
      { id: 'four-hour-work-week', title: '每周工作4小时' },
    ]
  },
];

const Tags = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center overflow-x-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-bento-purple/20 rounded-full filter blur-[120px] opacity-20" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-bento-blue/20 rounded-full filter blur-[120px] opacity-20" />
      </div>

      <Navbar />

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
        <div className="bg-white/5 border border-border rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">热门标签</h2>
          <div className="flex flex-wrap gap-3">
            {tags.map((tag, index) => (
              <motion.a
                key={tag.name}
                href={`#${tag.name}`}
                className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-br ${tag.color} hover:shadow-lg transition-all`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.7, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <TagIcon className={`w-5 h-5 ${tag.iconColor}`} />
                <span className={tag.titleColor}>{tag.name}</span>
                <span className="ml-2 text-sm text-foreground/50">{tag.count}</span>
              </motion.a>
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
            // 移除 id prop，因为 BentoItem 组件不接受该属性
          >
            <div className="space-y-4 mt-2">
              <p>{tag.description}</p>

              <div className="bg-white/30 p-4 rounded-lg dark:bg-white/5">
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
                  to={`/books?tag=${tag.name}`}
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
        className="w-full py-8 text-center text-muted-foreground text-sm border-t border-muted/10 mt-auto"
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

export default Tags;