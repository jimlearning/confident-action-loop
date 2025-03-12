
import React from 'react';
import { motion } from 'framer-motion';
import { Quote, BookOpen, MessageSquareQuote, PilcrowSquare } from 'lucide-react';
import BentoGrid from './BentoGrid';
import BentoItem from './BentoItem';

const BookQuotes = () => {
  // Array of gradient backgrounds for variety
  const gradients = [
    'bg-gradient-to-br from-purple-900/30 to-purple-800/20',
    'bg-gradient-to-br from-blue-900/30 to-blue-800/20',
    'bg-gradient-to-br from-green-900/30 to-green-800/20',
    'bg-gradient-to-br from-teal-900/30 to-teal-800/20',
  ];
  
  // Array of border colors
  const borders = [
    'border-purple-900/30',
    'border-blue-900/30',
    'border-green-900/30',
    'border-teal-900/30',
  ];
  
  // Array of accent colors for quotes
  const accentColors = [
    'text-purple-300',
    'text-blue-300',
    'text-green-300',
    'text-teal-300',
  ];
  
  // Array of icons for variety
  const icons = [
    <Quote className="w-5 h-5 text-purple-400" />,
    <MessageSquareQuote className="w-5 h-5 text-blue-400" />,
    <BookOpen className="w-5 h-5 text-green-400" />,
    <PilcrowSquare className="w-5 h-5 text-teal-400" />,
  ];

  return (
    <motion.div
      className="w-full max-w-7xl px-4 md:px-8 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.5 }}
    >
      <motion.h2 
        className="text-2xl md:text-3xl font-bold mb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
      >
        原文摘录
      </motion.h2>
      
      <BentoGrid className="px-4 md:px-8 mb-12">
        <BentoItem 
          title="关于自信的本质" 
          titleColor={accentColors[0]}
          className={`md:col-span-3 ${gradients[0]} border-${borders[0]}`}
          icon={icons[0]}
          chip="摘录 1-5"
          delay={18}
          hoverEffect={false}
        >
          <div className="grid grid-cols-1 gap-4 mt-2">
            {/* Enhanced styling for each quote */}
            <motion.div 
              className="bg-white/10 p-4 rounded-lg border border-white/10 shadow-md"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start space-x-3">
                <Quote className={`w-7 h-7 ${accentColors[0]} mt-1 flex-shrink-0`} />
                <p className={`text-lg italic ${accentColors[0]}`}>"自信不是一种感觉，而是一种能力——即使在恐惧存在的情况下依然能够采取行动的能力。"</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white/10 p-4 rounded-lg border border-white/10 shadow-md"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start space-x-3">
                <Quote className={`w-7 h-7 ${accentColors[0]} mt-1 flex-shrink-0`} />
                <p className={`text-lg italic ${accentColors[0]}`}>"等待自信出现再行动，就像等待游泳技能凭空出现后才下水一样荒谬。"</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white/10 p-4 rounded-lg border border-white/10 shadow-md"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start space-x-3">
                <Quote className={`w-7 h-7 ${accentColors[0]} mt-1 flex-shrink-0`} />
                <p className={`text-lg italic ${accentColors[0]}`}>"真正的自信并非没有恐惧，而是学会与恐惧共处，不让它主导你的选择。"</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white/10 p-4 rounded-lg border border-white/10 shadow-md"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start space-x-3">
                <Quote className={`w-7 h-7 ${accentColors[0]} mt-1 flex-shrink-0`} />
                <p className={`text-lg italic ${accentColors[0]}`}>"自信不是一种天生特质，而是通过行动和经验逐步建立的结果。"</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white/10 p-4 rounded-lg border border-white/10 shadow-md"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start space-x-3">
                <Quote className={`w-7 h-7 ${accentColors[0]} mt-1 flex-shrink-0`} />
                <p className={`text-lg italic ${accentColors[0]}`}>"每次你选择尽管恐惧依然行动，都是在为自己的自信账户存入一笔财富。"</p>
              </div>
            </motion.div>
          </div>
        </BentoItem>
        
        <BentoItem 
          title="关于思维方式" 
          titleColor={accentColors[1]}
          className={`md:col-span-3 ${gradients[1]} border-${borders[1]}`}
          icon={icons[1]}
          chip="摘录 6-10"
          delay={19}
          hoverEffect={false}
        >
          <div className="grid grid-cols-1 gap-4 mt-2">
            <motion.div 
              className="bg-white/10 p-4 rounded-lg border border-white/10 shadow-md"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start space-x-3">
                <MessageSquareQuote className={`w-7 h-7 ${accentColors[1]} mt-1 flex-shrink-0`} />
                <p className={`text-lg italic ${accentColors[1]}`}>"我们的思想就像水流——你不能阻止它们出现，但可以选择不被它们冲走。"</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white/10 p-4 rounded-lg border border-white/10 shadow-md"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start space-x-3">
                <MessageSquareQuote className={`w-7 h-7 ${accentColors[1]} mt-1 flex-shrink-0`} />
                <p className={`text-lg italic ${accentColors[1]}`}>"成长型思维看待失败为'我还没有成功'，而非'我永远不会成功'。"</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white/10 p-4 rounded-lg border border-white/10 shadow-md"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start space-x-3">
                <MessageSquareQuote className={`w-7 h-7 ${accentColors[1]} mt-1 flex-shrink-0`} />
                <p className={`text-lg italic ${accentColors[1]}`}>"接受不舒服的感觉是成长的前提。舒适区是一个美丽的地方，但什么也不会在那里生长。"</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white/10 p-4 rounded-lg border border-white/10 shadow-md"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start space-x-3">
                <MessageSquareQuote className={`w-7 h-7 ${accentColors[1]} mt-1 flex-shrink-0`} />
                <p className={`text-lg italic ${accentColors[1]}`}>"当你意识到恐惧只是一种感觉，而不是危险的信号时，它就失去了对你的控制力。"</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white/10 p-4 rounded-lg border border-white/10 shadow-md"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start space-x-3">
                <MessageSquareQuote className={`w-7 h-7 ${accentColors[1]} mt-1 flex-shrink-0`} />
                <p className={`text-lg italic ${accentColors[1]}`}>"完美主义是自信的天敌。它让我们相信，除非做得完美，否则就不值得做。"</p>
              </div>
            </motion.div>
          </div>
        </BentoItem>
        
        <BentoItem 
          title="关于行动与价值观" 
          titleColor={accentColors[2]}
          className={`md:col-span-3 ${gradients[2]} border-${borders[2]}`}
          icon={icons[2]}
          chip="摘录 11-15"
          delay={20}
          hoverEffect={false}
        >
          <div className="grid grid-cols-1 gap-4 mt-2">
            <motion.div 
              className="bg-white/10 p-4 rounded-lg border border-white/10 shadow-md"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start space-x-3">
                <BookOpen className={`w-7 h-7 ${accentColors[2]} mt-1 flex-shrink-0`} />
                <p className={`text-lg italic ${accentColors[2]}`}>"当你明确自己的价值观时，就拥有了指南针，即使在恐惧中也能找到前进的方向。"</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white/10 p-4 rounded-lg border border-white/10 shadow-md"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start space-x-3">
                <BookOpen className={`w-7 h-7 ${accentColors[2]} mt-1 flex-shrink-0`} />
                <p className={`text-lg italic ${accentColors[2]}`}>"不要问'我感觉如何'，而要问'这对我有什么意义'。意义感能驱散恐惧的阴影。"</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white/10 p-4 rounded-lg border border-white/10 shadow-md"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start space-x-3">
                <BookOpen className={`w-7 h-7 ${accentColors[2]} mt-1 flex-shrink-0`} />
                <p className={`text-lg italic ${accentColors[2]}`}>"当你因为恐惧而退缩时，不仅失去了一次经验，还强化了逃避的习惯。"</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white/10 p-4 rounded-lg border border-white/10 shadow-md"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start space-x-3">
                <BookOpen className={`w-7 h-7 ${accentColors[2]} mt-1 flex-shrink-0`} />
                <p className={`text-lg italic ${accentColors[2]}`}>"渐进式挑战就像肌肉训练——通过逐渐增加重量，你的承受能力也随之增强。"</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white/10 p-4 rounded-lg border border-white/10 shadow-md"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start space-x-3">
                <BookOpen className={`w-7 h-7 ${accentColors[2]} mt-1 flex-shrink-0`} />
                <p className={`text-lg italic ${accentColors[2]}`}>"每次行动都是一场投票，你要么投给恐惧主导的自己，要么投给勇敢前行的自己。"</p>
              </div>
            </motion.div>
          </div>
        </BentoItem>
        
        <BentoItem 
          title="关于成长与自我接纳" 
          titleColor={accentColors[3]}
          className={`md:col-span-3 ${gradients[3]} border-${borders[3]}`}
          icon={icons[3]}
          chip="摘录 16-20"
          delay={21}
          hoverEffect={false}
        >
          <div className="grid grid-cols-1 gap-4 mt-2">
            <motion.div 
              className="bg-white/10 p-4 rounded-lg border border-white/10 shadow-md"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start space-x-3">
                <PilcrowSquare className={`w-7 h-7 ${accentColors[3]} mt-1 flex-shrink-0`} />
                <p className={`text-lg italic ${accentColors[3]}`}>"自我接纳是自信的基石。只有接受自己的不完美，才能真正开始成长。"</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white/10 p-4 rounded-lg border border-white/10 shadow-md"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start space-x-3">
                <PilcrowSquare className={`w-7 h-7 ${accentColors[3]} mt-1 flex-shrink-0`} />
                <p className={`text-lg italic ${accentColors[3]}`}>"与其与别人比较，不如与昨天的自己比较。唯一重要的竞争是与过去的自己。"</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white/10 p-4 rounded-lg border border-white/10 shadow-md"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start space-x-3">
                <PilcrowSquare className={`w-7 h-7 ${accentColors[3]} mt-1 flex-shrink-0`} />
                <p className={`text-lg italic ${accentColors[3]}`}>"庆祝小胜利不是虚荣，而是承认进步的必要仪式，它为未来的行动提供动力。"</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white/10 p-4 rounded-lg border border-white/10 shadow-md"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start space-x-3">
                <PilcrowSquare className={`w-7 h-7 ${accentColors[3]} mt-1 flex-shrink-0`} />
                <p className={`text-lg italic ${accentColors[3]}`}>"真正的成长发生在你的舒适区与恐惧区之间的那个狭窄空间里。"</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white/10 p-4 rounded-lg border border-white/10 shadow-md"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start space-x-3">
                <PilcrowSquare className={`w-7 h-7 ${accentColors[3]} mt-1 flex-shrink-0`} />
                <p className={`text-lg italic ${accentColors[3]}`}>"自信就像种子，需要时间、行动的水分和耐心的阳光才能茁壮成长。"</p>
              </div>
            </motion.div>
          </div>
        </BentoItem>
      </BentoGrid>
    </motion.div>
  );
};

export default BookQuotes;
