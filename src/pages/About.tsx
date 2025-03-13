import BentoGrid from '@/components/BentoGrid';
import BentoItem from '@/components/BentoItem';
import { motion } from 'framer-motion';
import { BookOpen, Github, Linkedin, Mail, Twitter } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center overflow-x-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-bento-purple/20 rounded-full filter blur-[120px] opacity-20" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-bento-blue/20 rounded-full filter blur-[120px] opacity-20" />
      </div>

      {/* About Header */}
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
          关于<span className="text-primary">我</span>
        </motion.h1>
        <motion.p
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          热爱阅读，分享知识，用直观的方式呈现复杂概念
        </motion.p>
      </motion.div>

      {/* About Content */}
      <BentoGrid className="px-4 md:px-8 mb-12">
        {/* Profile Section */}
        <BentoItem
          title="个人简介"
          titleColor="text-blue-400"
          className="md:col-span-3 bg-gradient-to-br from-blue-900/20 to-blue-800/10 border-blue-900/20"
          icon={<BookOpen className="w-5 h-5 text-blue-400" />}
          chip="👋 你好"
          delay={1}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div className="md:col-span-1 flex flex-col items-center">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                  <span className="text-6xl">👨‍💻</span>
                </div>
              </div>

              <div className="flex space-x-3 mt-4">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-muted/10 rounded-full hover:bg-muted/20 transition-colors text-foreground">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-muted/10 rounded-full hover:bg-muted/20 transition-colors text-foreground">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-muted/10 rounded-full hover:bg-muted/20 transition-colors text-foreground">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="mailto:example@example.com" className="p-2 bg-muted/10 rounded-full hover:bg-muted/20 transition-colors text-foreground">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="md:col-span-2 space-y-4">
              <p className="text-lg">
                我是一名热爱阅读和知识分享的终身学习者。通过创建这个读书笔记网站，我希望能将复杂的书籍内容转化为直观、易于理解的知识图谱，帮助更多人快速掌握核心概念。
              </p>
              <p>
                我相信知识的力量，也相信知识应该以更加友好和高效的方式传播。每一本书都蕴含着宝贵的智慧，而我的目标是提炼出这些精华，并以视觉化的方式呈现出来。
              </p>
              <p>
                无论你是想快速了解一本书的核心观点，还是寻找学习的灵感，希望这个网站能够为你提供帮助。
              </p>
            </div>
          </div>
        </BentoItem>

        {/* Reading Philosophy */}
        <BentoItem
          title="阅读理念"
          titleColor="text-purple-400"
          className="md:col-span-3 bg-gradient-to-br from-purple-900/20 to-purple-800/10 border-purple-900/20"
          chip="📚 我的方法"
          delay={2}
        >
          <div className="space-y-4 mt-2">
            <p className="text-lg">
              我的阅读和笔记方法基于以下几个核心理念：
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/5 p-4 rounded-lg">
                <h3 className="font-medium text-purple-300 mb-2 text-lg">概念可视化</h3>
                <p>将抽象概念转化为视觉化的图表和框架，使复杂理论更易理解和记忆。</p>
              </div>

              <div className="bg-white/5 p-4 rounded-lg">
                <h3 className="font-medium text-purple-300 mb-2 text-lg">实用主义</h3>
                <p>注重提取可立即应用于实际生活的知识点和行动建议。</p>
              </div>

              <div className="bg-white/5 p-4 rounded-lg">
                <h3 className="font-medium text-purple-300 mb-2 text-lg">跨领域连接</h3>
                <p>寻找不同领域知识之间的联系，构建更全面的知识网络。</p>
              </div>
            </div>
          </div>
        </BentoItem>

        {/* Reading Stats */}
        <BentoItem
          title="阅读统计"
          titleColor="text-green-400"
          className="md:col-span-3 bg-gradient-to-br from-green-900/20 to-green-800/10 border-green-900/20"
          chip="📊 数据"
          delay={3}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <div className="bg-white/5 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-primary">42</p>
              <p className="text-sm text-muted-foreground mt-1">今年已读书籍</p>
            </div>

            <div className="bg-white/5 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-primary">12</p>
              <p className="text-sm text-muted-foreground mt-1">已创建Cheat Sheet</p>
            </div>

            <div className="bg-white/5 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-primary">5</p>
              <p className="text-sm text-muted-foreground mt-1">最常阅读类别</p>
            </div>

            <div className="bg-white/5 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-primary">320+</p>
              <p className="text-sm text-muted-foreground mt-1">总阅读小时</p>
            </div>
          </div>

          <div className="mt-6 bg-white/5 p-4 rounded-lg">
            <h3 className="font-medium text-green-400 mb-3">2023年阅读目标进度</h3>
            <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-green-300 h-full rounded-full" style={{ width: '75%' }}></div>
            </div>
            <p className="text-right text-sm mt-1 text-muted-foreground">75% (42/56本)</p>
          </div>
        </BentoItem>

        {/* Contact Section */}
        <BentoItem
          title="联系我"
          titleColor="text-orange-400"
          className="md:col-span-3 bg-gradient-to-br from-orange-900/20 to-orange-800/10 border-orange-900/20"
          chip="💌 交流"
          delay={4}
        >
          <div className="mt-4 space-y-4">
            <p>
              如果你有任何问题、建议或合作意向，欢迎通过以下方式联系我：
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <a
                href="mailto:example@example.com"
                className="flex items-center space-x-3 p-4 bg-muted/5 rounded-lg hover:bg-muted/10 transition-colors"
              >
                <Mail className="w-6 h-6 text-orange-400" />
                <span>example@example.com</span>
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 bg-muted/5 rounded-lg hover:bg-muted/10 transition-colors"
              >
                <Twitter className="w-6 h-6 text-orange-400" />
                <span>@username</span>
              </a>
            </div>

            <p className="text-muted-foreground mt-6">
              我也很乐意听取你对网站的反馈，或者关于你希望看到的书籍Cheat Sheet的建议。
            </p>
          </div>
        </BentoItem>
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

export default About;