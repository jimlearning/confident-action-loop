
import BentoGrid from '@/components/BentoGrid';
import BentoItem from '@/components/BentoItem';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, BrainCircuit, CheckCircle2, Heart, Lightbulb, XCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';

// 动态获取图标
const getIconComponent = (iconName: string) => {
  const icons: Record<string, React.ReactNode> = {
    BrainCircuit: <BrainCircuit className="w-5 h-5" />,
    Heart: <Heart className="w-5 h-5" />,
    Lightbulb: <Lightbulb className="w-5 h-5" />,
    ArrowRightFromLine: <ArrowRight className="w-5 h-5" />
  };

  return icons[iconName] || <BookOpen className="w-5 h-5" />;
};

interface BookContentProps {
  book: any;
  controls: any;
}

const BookContent = ({ book, controls }: BookContentProps) => {
  const [isReady, setIsReady] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    const bookId = book?.id || 'unknown';
    console.log(`BookContent组件: 开始验证书籍 ${bookId} 数据`);
    
    // 确保控件可用
    if (!controls) {
      console.error(`BookContent组件: controls对象缺失`);
      setValidationError('动画控制器缺失');
      setIsReady(false);
      return;
    }
    
    // 确保book对象存在
    if (!book) {
      console.error(`BookContent组件: book对象缺失`);
      setValidationError('书籍数据缺失');
      setIsReady(false);
      return;
    }
    
    // 确保book.content存在
    if (!book.content) {
      console.error(`BookContent组件: 书籍 ${bookId} 的content字段缺失`, book);
      setValidationError('书籍内容数据缺失');
      setIsReady(false);
      return;
    }
    
    // 验证content的主要结构
    const { misconception, reality, sections } = book.content;
    
    console.log(`BookContent组件: 验证书籍 ${bookId} 的content字段`, {
      hasMisconception: !!misconception,
      hasReality: !!reality,
      hasSections: !!sections,
      sectionsIsArray: Array.isArray(sections)
    });
    
    if (!misconception || !reality || !sections || !Array.isArray(sections)) {
      console.error(`BookContent组件: 书籍 ${bookId} 的content结构无效`, { 
        misconception, reality, sections 
      });
      setValidationError('书籍内容结构无效');
      setIsReady(false);
      return;
    }
    
    // 验证misconception和reality的结构
    console.log(`BookContent组件: 验证书籍 ${bookId} 的misconception和reality字段`, {
      misconceptionComplete: !!(misconception.title && misconception.content),
      realityComplete: !!(reality.title && reality.content)
    });
    
    if (!misconception.title || !misconception.content || !reality.title || !reality.content) {
      console.error(`BookContent组件: 书籍 ${bookId} 的misconception或reality字段缺失`, { 
        misconception, reality 
      });
      setValidationError('书籍内容字段不完整');
      setIsReady(false);
      return;
    }
    
    // 验证sections数组
    console.log(`BookContent组件: 验证书籍 ${bookId} 的sections数组`, {
      sectionsLength: sections.length
    });
    
    if (sections.length === 0) {
      console.error(`BookContent组件: 书籍 ${bookId} 的sections数组为空`);
      setValidationError('书籍章节内容为空');
      setIsReady(false);
      return;
    }
    
    // 所有验证通过
    console.log(`BookContent组件: 书籍 ${bookId} 数据验证通过`);
    setValidationError(null);
    setIsReady(true);
  }, [book, controls]);

  if (!isReady) {
    return (
      <div className="w-full max-w-7xl px-4 md:px-8 mb-12 text-center text-muted-foreground">
        <div className="p-6 border border-destructive/30 rounded-xl bg-destructive/5">
          <p className="text-lg font-medium">正在准备书籍内容...</p>
          {validationError && (
            <p className="mt-2 text-sm text-destructive">错误: {validationError}</p>
          )}
          <p className="mt-4 text-sm">如果问题持续存在，请尝试刷新页面或返回书籍列表重新选择</p>
          <div className="mt-4 animate-pulse">
            <div className="h-2 bg-muted-foreground/20 rounded w-3/4 mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  // 数据已验证通过，安全地解构
  const { misconception, reality, sections } = book.content;

  return (
    <motion.div
      className="w-full max-w-7xl px-4 md:px-8 mb-12"
      initial={false}
      animate={controls}
      transition={{ duration: 0.5 }}
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
          <div className="flex items-center gap-2 flex-wrap">
            {book.content.reality.content.split(' → ').map((step: string, index: number, array: string[]) => (
              <div key={step} className="flex items-center gap-2">
                <span className="px-2 py-1 bg-muted rounded-lg whitespace-nowrap">{step}</span>
                {index < array.length - 1 && <ArrowRight className="w-4 h-4 flex-shrink-0" />}
              </div>
            ))}
          </div>
        </BentoItem>

        {/* Content Sections */}
        {book.content.sections.map((section: any, index: number) => (
          <BentoItem
            key={section.title}
            title={section.title}
            titleColor={section.titleColor}
            className={`md:col-span-3 bg-gradient-to-br ${section.className}`}
            icon={getIconComponent(section.icon)}
            chip={section.chip}
            delay={index + 3}
          >
            {/* Render section content based on its structure */}
            {Array.isArray(section.content) && section.content.every((item: any) => item.title && item.description) ? (
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
                {section.content.map((item: any, i: number) => (
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
                        {item.strategies.map((strategy: string, idx: number) => (
                          <li key={idx}>{strategy}</li>
                        ))}
                      </ul>
                    )}
                    {item.examples && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {item.examples.map((example: { title: string; steps: string[] }) => (
                          <div key={example.title} className="bg-muted/5 p-3 rounded-lg border border-border">
                            <p className={`font-medium ${section.titleColor} mb-2`}>{example.title}</p>
                            <div className="flex items-center gap-2 flex-wrap">
                              {example.steps.map((step: string, stepIdx: number, arr: string[]) => (
                                <div key={step} className="flex items-center gap-2">
                                  <span className="px-2 py-1 bg-muted rounded-lg text-muted-foreground whitespace-nowrap">{step}</span>
                                  {stepIdx < arr.length - 1 && <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {item.steps && (
                      <div className="space-y-3 mt-2">
                        {item.steps.map((step: { number: number; title: string; description: string }) => (
                          <div key={step.number} className="flex items-start space-x-3">
                            <div className="bg-primary/10 text-primary font-medium rounded-full w-6 h-6 flex items-center justify-center shrink-0">
                              {step.number}
                            </div>
                            <div>
                              <p className="font-medium">{step.title}</p>
                              <p className="text-muted-foreground">{step.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {item.type === "error" && (
                      <div className="flex items-center mt-2">
                        <XCircle className="w-5 h-5 text-destructive mr-2" />
                        <p>{item.description}</p>
                      </div>
                    )}
                    {item.type === "success" && !item.steps && (
                      <div className="flex items-center mt-2">
                        <CheckCircle2 className="w-5 h-5 text-green-400 mr-2" />
                        <p>{item.description}</p>
                      </div>
                    )}
                    {item.type === "highlight" && (
                      <div className="mt-2 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                        <p className="font-medium text-center">{item.description}</p>
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
  );
};

export default BookContent;
