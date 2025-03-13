
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CheckSquare } from 'lucide-react';

interface Rule {
  title: string;
  content: string;
  titleColor: string;
  className: string;
  iconColor: string;
}

interface ConfidenceRulesProps {
  rules: Rule[];
}

const ConfidenceRules: React.FC<ConfidenceRulesProps> = ({ rules }) => {
  return (
    <motion.div
      className="w-full max-w-7xl px-4 md:px-8 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold">自信的规则</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rules.map((rule, index) => (
            <motion.div
              key={rule.title}
              className={cn(
                "p-6 rounded-xl border bg-gradient-to-br",
                rule.className
              )}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index + 0.7, duration: 0.3 }}
            >
              <div className="flex items-start gap-3">
                <CheckSquare className={cn("w-6 h-6 mt-1", rule.iconColor)} />
                <div>
                  <h3 className={cn("text-lg font-semibold", rule.titleColor)}>
                    {rule.title}
                  </h3>
                  <p className="mt-2 text-foreground/80">{rule.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ConfidenceRules;
