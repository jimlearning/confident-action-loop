import BentoGrid from '@/components/BentoGrid';
import BentoItem from '@/components/BentoItem';
import BookQuotes from '@/components/BookQuotes';
import ConfidenceRules from '@/components/ConfidenceRules';
import Navbar from '@/components/Navbar';
import { cn } from '@/lib/utils';
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
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

// 模拟数据 - 在实际应用中可以从API获取
const booksData = {
  'confidence-trap': {
    id: 'confidence-trap',
    title: '自信的陷阱',
    subtitle: 'Cheat Sheet',
    description: '探讨如何通过行动建立真正的自信，而不是等待自信才行动',
    author: '罗里·瓦登',
    publishYear: '2019',
    category: '心理学',
    tags: ['自信', '心理学', '个人成长'],
    rating: 4.5,
    coverColor: 'from-purple-900/20 to-purple-800/10 border-purple-900/20',
    titleColor: 'text-purple-400',
    iconColor: 'text-purple-400',
    hasConfidenceRules: true,
    hasBookQuotes: true,
    content: {
      misconception: {
        title: "误区",
        content: "等待自信才去行动",
        detail: "陷入\"逃避-焦虑-更不自信\"循环"
      },
      reality: {
        title: "正确路径",
        content: "行动 → 体验 → 成长 → 自信"
      },
      sections: [
        {
          title: "1. 思维层面：培养心理灵活性",
          titleColor: "text-blue-400",
          className: "from-blue-900/20 to-blue-800/10 border-blue-900/20",
          icon: <BrainCircuit className="w-5 h-5 text-blue-400" />,
          chip: "🔹 心理建设",
          content: [
            { title: "🔸 正念思维", description: "觉察想法，不被\"我不行\"左右" },
            { title: "🔸 接受情绪", description: "恐惧是正常的，与之共存而非对抗" },
            { title: "🔸 认知调整", description: "失败=成长的一部分，采用\"成长型思维\"" }
          ]
        },
        {
          title: "2. 动力层面：用价值观驱动行动",
          titleColor: "text-purple-400",
          className: "from-purple-900/20 to-purple-800/10 border-purple-900/20",
          icon: <Heart className="w-5 h-5 text-purple-400" />,
          chip: "🔹 价值导向",
          content: [
            { title: "核心问题", description: "如果没有恐惧，我想成为什么样的人？" },
            { title: "价值观", values: [
              { name: "勇敢", description: "敢于面对挑战" },
              { name: "成长", description: "重视学习和进步" },
              { name: "影响力", description: "希望帮助他人" },
              { name: "真实", description: "表达自己而非取悦他人" }
            ]},
            { title: "行动策略", strategies: [
              "关注\"我为什么做这件事\"，而不是\"我是否害怕\"",
              "让价值观指引，而非等待情绪合适"
            ]}
          ]
        },
        {
          title: "3. 行动层面：渐进式挑战，积累经验",
          titleColor: "text-orange-400",
          className: "from-orange-900/20 to-orange-800/10 border-orange-900/20",
          icon: <Lightbulb className="w-5 h-5 text-orange-400" />,
          chip: "🔹 具体方法",
          content: [
            { title: "🛠 小步前进", description: "从低压力场景练习，逐步升级挑战" },
            { title: "🛠 暴露疗法", description: "重复接触恐惧，降低敏感度" },
            { title: "🛠 构建正向反馈", description: "记录微小进步，强化成长感" },
            { title: "示例", examples: [
              { title: "害怕演讲？ 🎤", steps: ["先录音练习", "试讲给朋友听", "小场合演讲"] },
              { title: "社交焦虑？ 😊", steps: ["先微笑", "小寒暄", "参与对话"] }
            ]}
          ]
        },
        {
          title: "4. 自信成长路径总结",
          titleColor: "text-teal-400",
          className: "from-teal-900/20 to-teal-800/10 border-teal-900/20",
          icon: <ArrowRightFromLine className="w-5 h-5 text-teal-400" />,
          chip: "🔹 成长路径",
          content: [
            { title: "错误路径", description: "等待自信 → 逃避挑战 → 更不自信", type: "error" },
            { title: "正确路径", steps: [
              { number: 1, title: "心理灵活性", description: "觉察 & 接受恐惧" },
              { number: 2, title: "价值观驱动", description: "让意义大于恐惧" },
              { number: 3, title: "渐进式挑战", description: "行动积累经验" },
              { number: 4, title: "建立自信", description: "通过行动塑造信念" }
            ], type: "success" },
            { title: "核理念", description: "自信 = 即使恐惧，依然敢去做！", type: "highlight" }
          ]
        }
      ],
      keyPoints: [
        "自信是行动的结果，而不是前提！",
        "恐惧并不会消失，真正的自信是\"尽管害怕，仍然行动\"！"
      ]
    }
  },
  'atomic-habits': {
    id: 'atomic-habits',
    title: '原子习惯',
    subtitle: 'Cheat Sheet',
    description: '如何通过微小的改变实现巨大的成果，建立积极的习惯系统',
    author: '詹姆斯·克利尔',
    publishYear: '2018',
    category: '个人成长',
    tags: ['习惯', '自我提升', '效率'],
    rating: 4.8,
    coverColor: 'from-blue-900/20 to-blue-800/10 border-blue-900/20',
    titleColor: 'text-blue-400',
    iconColor: 'text-blue-400',
    hasConfidenceRules: false,
    hasBookQuotes: true,
    content: {
      misconception: {
        title: "误区",
        content: "关注结果而非系统",
        detail: "只追求目标，忽视习惯的力量"
      },
      reality: {
        title: "正确路径",
        content: "身份 → 系统 → 过程 → 结果"
      },
      sections: [
        {
          title: "1. 习惯的四法则",
          titleColor: "text-blue-400",
          className: "from-blue-900/20 to-blue-800/10 border-blue-900/20",
          icon: <BrainCircuit className="w-5 h-5 text-blue-400" />,
          chip: "🔹 核心框架",
          content: [
            { title: "🔸 第一法则：让它显而易见", description: "环境设计，提示链，习惯叠加" },
            { title: "🔸 第二法则：让它有吸引力", description: "欲望捆绑，加入社群，改变心态" },
            { title: "🔸 第三法则：让它简单易行", description: "减少阻力，环境优化，两分钟法则" },
            { title: "🔸 第四法则：让它令人满足", description: "即时满足，习惯追踪，不破坏连续" }
          ]
        }
      ],
      keyPoints: [
        "习惯是复利的力量，每天进步1%，一年后你将提升37倍",
        "你的习惯塑造了你的身份，而不仅仅是达成目标"
      ]
    }
  }
};

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

const BookDetail = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const controls = useAnimation();

  // 获取书籍数据
  const book = bookId ? booksData[bookId as keyof typeof booksData] : null;

  useEffect(() => {
    if (book) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, book]);

  if (!book) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
        <Navbar />
        <div className="text-center mt-24">
          <h1 className="text-3xl font-bold mb-4">书籍未找到</h1>
          <p className="mb-6 text-muted-foreground">抱歉，我们找不到您请求的书籍</p>
          <Link to="/books" className="text-primary flex items-center justify-center hover:underline">
            <ArrowLeft className="mr-2 w-4 h-4" /> 返回书籍列表
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
        <Link to="/books" className="self-start flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回书籍列表
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
              {book.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/books?tag=${tag}`}
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
              {book.content.reality.content.split(' → ').map((step, index, array) => (
                <React.Fragment key={step}>
                  <span className="px-2 py-1 bg-muted rounded-lg">{step}</span>
                  {index < array.length - 1 && <ArrowRight className="w-4 h-4" />}
                </React.Fragment>
              ))}
            </div>
          </BentoItem>

          {/* Content Sections */}
          {book.content.sections.map((section, index) => (
            <BentoItem
              key={section.title}
              title={section.title}
              titleColor={section.titleColor}
              className={`md:col-span-3 bg-gradient-to-br ${section.className}`}
              icon={section.icon}
              chip={section.chip}
              delay={index + 3}
            >
              {/* Render section content based on its structure */}
              {Array.isArray(section.content) ? (
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
                  {section.content.map((item: {
                    title: string;
                    description?: string;
                    values?: Array<{ name: string; description: string }>;
                    strategies?: string[];
                    examples?: Array<{
                      title: string;
                      steps: string[];
                    }>;
                  }, i: number) => (
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
                          {item.strategies.map((strategy: string) => (
                            <li key={strategy}>{strategy}</li>
                          ))}
                        </ul>
                      )}
                      {item.examples && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {item.examples.map((example: { title: string; steps: string[] }) => (
                            <div key={example.title} className="bg-muted/5 p-3 rounded-lg border border-border">
                              <p className={`font-medium ${section.titleColor} mb-2`}>{example.title}</p>
                              <div className="flex items-center space-x-2">
                                {example.steps.map((step: string, i: number, arr: string[]) => (
                                  <React.Fragment key={step}>
                                    <span className="px-2 py-1 bg-muted rounded-lg text-muted-foreground">{step}</span>
                                    {i < arr.length - 1 && <ArrowRight className="w-4 h-4 text-muted-foreground" />}
                                  </React.Fragment>
                                ))}
                              </div>
                            </div>
                          ))}
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
            {book.content.keyPoints.map((point: string) => (
              <div key={point} className="flex items-start space-x-3">
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
      <motion.div
        className="w-full max-w-7xl px-4 md:px-8 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-6">相关书籍</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.values(booksData)
            .filter(relatedBook =>
              relatedBook.id !== book.id &&
              (relatedBook.category === book.category ||
              relatedBook.tags.some(tag => book.tags.includes(tag)))
            )
            .slice(0, 3)
            .map(relatedBook => (
              <Link
                key={relatedBook.id}
                to={`/books/${relatedBook.id}`}
                className="group"
              >
                <motion.div
                  className={`p-6 rounded-xl bg-gradient-to-br ${relatedBook.coverColor} border border-white/10 h-full flex flex-col transition-all duration-300 group-hover:shadow-lg group-hover:border-white/20`}
                  whileHover={{ y: -5 }}
                >
                  <BookOpen className={`w-10 h-10 ${relatedBook.iconColor} mb-4`} />
                  <h3 className="text-xl font-semibold mb-2">{relatedBook.title}</h3>
                  <p className="text-white/70 text-sm mb-3 flex-grow">{relatedBook.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/50">{relatedBook.category}</span>
                    <RatingStars rating={relatedBook.rating} />
                  </div>
                </motion.div>
              </Link>
            ))}
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        className="w-full py-8 text-center text-white/50 text-sm border-t border-white/10 mt-auto"
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