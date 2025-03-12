
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { 
  Target, 
  Heart, 
  LightbulbIcon, 
  Lightbulb, 
  MoveRight, 
  ArrowRight, 
  CheckCircle2,
  XCircle,
  BrainCircuit,
  ArrowRightFromLine
} from 'lucide-react';
import BentoGrid from '@/components/BentoGrid';
import BentoItem from '@/components/BentoItem';
import Header from '@/components/Header';
import ConfidenceRules from '@/components/ConfidenceRules';
import BookQuotes from '@/components/BookQuotes';
import { cn } from '@/lib/utils';

const Index = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center overflow-x-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-bento-purple/20 rounded-full filter blur-[120px] opacity-20" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-bento-blue/20 rounded-full filter blur-[120px] opacity-20" />
      </div>
      
      <Header />
      
      {/* Main Misconception vs Reality */}
      <motion.div
        className="w-full max-w-7xl px-4 md:px-8 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <BentoItem 
            title="误区"
            titleColor="text-red-400"
            className="bg-gradient-to-br from-red-900/20 to-red-800/10 border-red-900/20"
            icon={<XCircle className="w-5 h-5 text-red-400" />}
            chip="🚨 危险思维"
            delay={1}
          >
            <div className="space-y-2">
              <p className="font-medium">等待自信才去行动</p>
              <div className="flex items-center mt-3">
                <ArrowRight className="w-4 h-4 mr-2 text-red-400" />
                <p>陷入"逃避-焦虑-更不自信"循环</p>
              </div>
            </div>
          </BentoItem>
          
          <BentoItem 
            title="正确路径" 
            titleColor="text-green-400"
            className="bg-gradient-to-br from-green-900/20 to-green-800/10 border-green-900/20"
            icon={<CheckCircle2 className="w-5 h-5 text-green-400" />}
            chip="✅ 有效方法"
            delay={2}
          >
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-white/10 rounded-lg">行动</span>
              <ArrowRight className="w-4 h-4" />
              <span className="px-2 py-1 bg-white/10 rounded-lg">体验</span>
              <ArrowRight className="w-4 h-4" />
              <span className="px-2 py-1 bg-white/10 rounded-lg">成长</span>
              <ArrowRight className="w-4 h-4" />
              <span className="px-2 py-1 bg-white/10 rounded-lg">自信</span>
            </div>
          </BentoItem>
        </div>
      </motion.div>
      
      {/* Main Content */}
      <BentoGrid className="px-4 md:px-8 mb-12">
        {/* Mental Flexibility */}
        <BentoItem 
          title="1. 思维层面：培养心理灵活性" 
          titleColor="text-blue-400"
          className="md:col-span-3 bg-gradient-to-br from-blue-900/20 to-blue-800/10 border-blue-900/20"
          icon={<BrainCircuit className="w-5 h-5 text-blue-400" />}
          chip="🔹 心理建设"
          delay={3}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-white/5 p-3 rounded-lg">
              <p className="font-medium text-blue-300 mb-2">🔸 正念思维</p>
              <p>觉察想法，不被"我不行"左右</p>
            </div>
            <div className="bg-white/5 p-3 rounded-lg">
              <p className="font-medium text-blue-300 mb-2">🔸 接受情绪</p>
              <p>恐惧是正常的，与之共存而非对抗</p>
            </div>
            <div className="bg-white/5 p-3 rounded-lg">
              <p className="font-medium text-blue-300 mb-2">🔸 认知调整</p>
              <p>失败=成长的一部分，采用"成长型思维"</p>
            </div>
          </div>
        </BentoItem>
        
        {/* Value-Driven Action */}
        <BentoItem 
          title="2. 动力层面：用价值观驱动行动" 
          titleColor="text-purple-400"
          className="md:col-span-3 bg-gradient-to-br from-purple-900/20 to-purple-800/10 border-purple-900/20"
          icon={<Heart className="w-5 h-5 text-purple-400" />}
          chip="🔹 价值导向"
          delay={4}
        >
          <div className="space-y-4 mt-2">
            <p className="font-medium">🔹 问自己：<span className="text-purple-300">如果没有恐惧，我想成为什么样的人？</span></p>
            
            <div>
              <p className="font-medium mb-2 flex items-center">
                <Target className="w-4 h-4 mr-2 text-purple-400" />
                <span>识别核心价值观（示例）：</span>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 ml-6">
                <div className="bg-white/5 p-2 rounded-lg">
                  <span className="font-medium text-purple-300">勇敢：</span>敢于面对挑战
                </div>
                <div className="bg-white/5 p-2 rounded-lg">
                  <span className="font-medium text-purple-300">成长：</span>重视学习和进步
                </div>
                <div className="bg-white/5 p-2 rounded-lg">
                  <span className="font-medium text-purple-300">影响力：</span>希望帮助他人
                </div>
                <div className="bg-white/5 p-2 rounded-lg">
                  <span className="font-medium text-purple-300">真实：</span>表达自己而非取悦他人
                </div>
              </div>
            </div>
            
            <div>
              <p className="font-medium mb-2 flex items-center">
                <Target className="w-4 h-4 mr-2 text-purple-400" />
                <span>行动策略：</span>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-6">
                <li>关注<span className="font-medium text-purple-300">"我为什么做这件事"</span>，而不是"我是否害怕"</li>
                <li>让价值观指引，而非等待情绪合适</li>
              </ul>
            </div>
          </div>
        </BentoItem>
        
        {/* Progressive Challenges */}
        <BentoItem 
          title="3. 行动层面：渐进式挑战，积累经验" 
          titleColor="text-orange-400"
          className="md:col-span-3 bg-gradient-to-br from-orange-900/20 to-orange-800/10 border-orange-900/20"
          icon={<Lightbulb className="w-5 h-5 text-orange-400" />}
          chip="🔹 具体方法"
          delay={5}
        >
          <div className="space-y-4 mt-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-white/5 p-3 rounded-lg">
                <p className="font-medium text-orange-300 mb-1">🛠 小步前进</p>
                <p>从低压力场景练习，逐步升级挑战</p>
              </div>
              <div className="bg-white/5 p-3 rounded-lg">
                <p className="font-medium text-orange-300 mb-1">🛠 暴露疗法</p>
                <p>重复接触恐惧，降低敏感度</p>
              </div>
              <div className="bg-white/5 p-3 rounded-lg">
                <p className="font-medium text-orange-300 mb-1">🛠 构建正向反馈</p>
                <p>记录微小进步，强化成长感</p>
              </div>
            </div>
            
            <div>
              <p className="font-medium mb-3">📌 示例：</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                <div className="bg-white/5 p-3 rounded-lg">
                  <p className="font-medium text-orange-300 mb-2">害怕演讲？ 🎤</p>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-white/10 rounded-lg">先录音练习</span>
                    <ArrowRight className="w-4 h-4" />
                    <span className="px-2 py-1 bg-white/10 rounded-lg">试讲给朋友听</span>
                    <ArrowRight className="w-4 h-4" />
                    <span className="px-2 py-1 bg-white/10 rounded-lg">小场合演讲</span>
                  </div>
                </div>
                <div className="bg-white/5 p-3 rounded-lg">
                  <p className="font-medium text-orange-300 mb-2">社交焦虑？ 😊</p>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-white/10 rounded-lg">先微笑</span>
                    <ArrowRight className="w-4 h-4" />
                    <span className="px-2 py-1 bg-white/10 rounded-lg">小寒暄</span>
                    <ArrowRight className="w-4 h-4" />
                    <span className="px-2 py-1 bg-white/10 rounded-lg">参与对话</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BentoItem>
        
        {/* Growth Path Summary */}
        <BentoItem 
          title="4. 自信成长路径总结" 
          titleColor="text-teal-400"
          className="md:col-span-3 bg-gradient-to-br from-teal-900/20 to-teal-800/10 border-teal-900/20"
          icon={<ArrowRightFromLine className="w-5 h-5 text-teal-400" />}
          chip="🔹 成长路径"
          delay={6}
        >
          <div className="space-y-4 mt-2">
            <div className="bg-red-900/20 p-3 rounded-lg border border-red-900/30">
              <p className="font-medium text-red-400 mb-1 flex items-center">
                <XCircle className="w-4 h-4 mr-2" />
                错误路径
              </p>
              <p>等待自信 → 逃避挑战 → 更不自信</p>
            </div>
            
            <div className="bg-green-900/20 p-3 rounded-lg border border-green-900/30">
              <p className="font-medium text-green-400 mb-1 flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                正确路径
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                <div className="bg-white/5 p-2 rounded-lg">
                  <span className="inline-block w-6 h-6 text-center bg-teal-900/40 rounded-full mr-2">1</span>
                  <span className="font-medium text-teal-300">心理灵活性</span> → 觉察 & 接受恐惧
                </div>
                <div className="bg-white/5 p-2 rounded-lg">
                  <span className="inline-block w-6 h-6 text-center bg-teal-900/40 rounded-full mr-2">2</span>
                  <span className="font-medium text-teal-300">价值观驱动</span> → 让意义大于恐惧
                </div>
                <div className="bg-white/5 p-2 rounded-lg">
                  <span className="inline-block w-6 h-6 text-center bg-teal-900/40 rounded-full mr-2">3</span>
                  <span className="font-medium text-teal-300">渐进式挑战</span> → 行动积累经验
                </div>
                <div className="bg-white/5 p-2 rounded-lg">
                  <span className="inline-block w-6 h-6 text-center bg-teal-900/40 rounded-full mr-2">4</span>
                  <span className="font-medium text-teal-300">建立自信</span> → 通过行动塑造信念
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
              <p className="font-medium text-center">
                <span className="text-teal-300 text-lg">💡 自信 = 即使恐惧，依然敢去做！</span>
              </p>
            </div>
          </div>
        </BentoItem>
        
        {/* Key Memory Points */}
        <BentoItem 
          title="关键记忆点" 
          titleColor="text-white"
          className="md:col-span-3 bg-gradient-to-br from-white/10 to-white/5 border-white/20"
          chip="📌 永远记住"
          delay={7}
        >
          <div className="space-y-3 mt-3">
            <div className="bg-white/5 p-3 rounded-lg flex items-start">
              <CheckCircle2 className="w-5 h-5 mr-3 text-green-400 mt-0.5 flex-shrink-0" />
              <p className="text-lg font-medium">自信是行动的结果，而不是前提！</p>
            </div>
            <div className="bg-white/5 p-3 rounded-lg flex items-start">
              <CheckCircle2 className="w-5 h-5 mr-3 text-green-400 mt-0.5 flex-shrink-0" />
              <p className="text-lg font-medium">恐惧并不会消失，真正的自信是"尽管害怕，仍然行动"！</p>
            </div>
          </div>
        </BentoItem>
      </BentoGrid>
      
      {/* Ten Rules to Build Confidence */}
      <ConfidenceRules />
      
      {/* Key Quotes from the Book */}
      <BookQuotes />
      
      <motion.footer
        className="w-full py-8 text-center text-white/50 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        设计灵感来源于极简主义设计原则
      </motion.footer>
    </div>
  );
};

export default Index;
