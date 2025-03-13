
import BentoGrid from '@/components/BentoGrid';
import BentoItem from '@/components/BentoItem';
import { motion } from 'framer-motion';
import { ArrowRight, BrainCircuit, BookOpen, CheckCircle2, Heart, Lightbulb, XCircle } from 'lucide-react';
import React from 'react';

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
  if (!book || !book.content) return null;

  return (
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
            {book.content.reality.content.split(' → ').map((step: string, index: number, array: string[]) => (
              <React.Fragment key={step}>
                <span className="px-2 py-1 bg-muted rounded-lg">{step}</span>
                {index < array.length - 1 && <ArrowRight className="w-4 h-4" />}
              </React.Fragment>
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
                            <div className="flex items-center space-x-2">
                              {example.steps.map((step: string, stepIdx: number, arr: string[]) => (
                                <React.Fragment key={step}>
                                  <span className="px-2 py-1 bg-muted rounded-lg text-muted-foreground">{step}</span>
                                  {stepIdx < arr.length - 1 && <ArrowRight className="w-4 h-4 text-muted-foreground" />}
                                </React.Fragment>
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
