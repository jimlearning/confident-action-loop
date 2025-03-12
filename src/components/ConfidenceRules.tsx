
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import BentoGrid from './BentoGrid';
import BentoItem from './BentoItem';

const ConfidenceRules = () => {
  return (
    <motion.div
      className="w-full max-w-7xl px-4 md:px-8 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      <motion.h2 
        className="text-2xl md:text-3xl font-bold mb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        赢得自信的十条规则
      </motion.h2>
      
      <BentoGrid className="px-4 md:px-8 mb-12">
        <BentoItem 
          title="规则一：放弃追求完美" 
          titleColor="text-yellow-400"
          className="md:col-span-3 bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 border-yellow-900/20"
          icon={<BookOpen className="w-5 h-5 text-yellow-400" />}
          chip="规则 1"
          delay={8}
        >
          <p>追求完美会让你陷入无尽的自我怀疑。接受"足够好"，专注于进步而非完美。记住：完美主义是自信的敌人，对自己的要求过高会阻碍行动。</p>
        </BentoItem>
        
        <BentoItem 
          title="规则二：拥抱失败" 
          titleColor="text-yellow-400"
          className="md:col-span-3 bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 border-yellow-900/20"
          icon={<BookOpen className="w-5 h-5 text-yellow-400" />}
          chip="规则 2"
          delay={9}
        >
          <p>失败不是终点，而是成长的机会。每次失败都带来宝贵的经验和教训，帮助你在下次做得更好。面对失败的勇气本身就是自信的表现。</p>
        </BentoItem>
        
        <BentoItem 
          title="规则三：小步前进" 
          titleColor="text-yellow-400"
          className="md:col-span-3 bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 border-yellow-900/20"
          icon={<BookOpen className="w-5 h-5 text-yellow-400" />}
          chip="规则 3"
          delay={10}
        >
          <p>不要期望一步登天。将大目标分解为小步骤，每完成一步都是一次自信的积累。渐进式的挑战让你在舒适区边缘持续成长，而不是被困在恐惧中。</p>
        </BentoItem>
        
        <BentoItem 
          title="规则四：关注价值观而非恐惧" 
          titleColor="text-yellow-400"
          className="md:col-span-3 bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 border-yellow-900/20"
          icon={<BookOpen className="w-5 h-5 text-yellow-400" />}
          chip="规则 4"
          delay={11}
        >
          <p>行动的动力应该来自于你的核心价值观，而不是恐惧。问自己："这件事对我有什么意义？"当价值观驱动你的行为时，恐惧就会退居次要位置。</p>
        </BentoItem>
        
        <BentoItem 
          title="规则五：培养正念意识" 
          titleColor="text-yellow-400"
          className="md:col-span-3 bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 border-yellow-900/20"
          icon={<BookOpen className="w-5 h-5 text-yellow-400" />}
          chip="规则 5"
          delay={12}
        >
          <p>学会觉察自己的想法和情绪，但不被它们控制。当消极思维出现时，简单地观察它们，然后让它们自然消散。正念帮助你与恐惧共处，而不是陷入恐惧。</p>
        </BentoItem>
        
        <BentoItem 
          title="规则六：重新定义自信" 
          titleColor="text-yellow-400"
          className="md:col-span-3 bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 border-yellow-900/20"
          icon={<BookOpen className="w-5 h-5 text-yellow-400" />}
          chip="规则 6"
          delay={13}
        >
          <p>自信不是没有恐惧，而是despite恐惧依然勇敢行动的能力。不要等待恐惧消失才行动，学会在恐惧存在的情况下依然前行。</p>
        </BentoItem>
        
        <BentoItem 
          title="规则七：停止自我比较" 
          titleColor="text-yellow-400"
          className="md:col-span-3 bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 border-yellow-900/20"
          icon={<BookOpen className="w-5 h-5 text-yellow-400" />}
          chip="规则 7"
          delay={14}
        >
          <p>与他人比较是自信的大敌。每个人都有自己的旅程和步调。专注于自己的进步，与昨天的自己比较，而不是与别人的高光时刻进行对比。</p>
        </BentoItem>
        
        <BentoItem 
          title="规则八：庆祝小胜利" 
          titleColor="text-yellow-400"
          className="md:col-span-3 bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 border-yellow-900/20"
          icon={<BookOpen className="w-5 h-5 text-yellow-400" />}
          chip="规则 8"
          delay={15}
        >
          <p>不要只关注远大目标而忽视日常的小进步。每个小胜利都值得庆祝，它们是自信建立的基石。记录自己的成长历程，欣赏每一步的勇气和努力。</p>
        </BentoItem>
        
        <BentoItem 
          title="规则九：建立支持系统" 
          titleColor="text-yellow-400"
          className="md:col-span-3 bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 border-yellow-900/20"
          icon={<BookOpen className="w-5 h-5 text-yellow-400" />}
          chip="规则 9"
          delay={16}
        >
          <p>寻找理解和支持你的人，与他们分享你的恐惧和挑战。良好的支持系统能提供情感支持、客观反馈和必要的鼓励，帮助你度过自我怀疑的时刻。</p>
        </BentoItem>
        
        <BentoItem 
          title="规则十：保持耐心" 
          titleColor="text-yellow-400"
          className="md:col-span-3 bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 border-yellow-900/20"
          icon={<BookOpen className="w-5 h-5 text-yellow-400" />}
          chip="规则 10"
          delay={17}
        >
          <p>建立真正的自信是一个长期过程，没有捷径。对自己保持耐心，接受成长的起伏。持续的行动和实践，终将塑造出坚实的自信基础。</p>
        </BentoItem>
      </BentoGrid>
    </motion.div>
  );
};

export default ConfidenceRules;
