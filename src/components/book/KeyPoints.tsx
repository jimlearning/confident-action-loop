
import { motion } from 'framer-motion';

interface KeyPointsProps {
  points: string[];
  controls: any;
}

const KeyPoints = ({ points, controls }: KeyPointsProps) => {
  if (!points || points.length === 0) return null;
  
  return (
    <motion.div
      className="w-full max-w-7xl px-4 md:px-8 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      <div className="bg-muted/5 border border-border rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">核心要点</h2>
        <div className="space-y-3">
          {points.map((point: string, index: number) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="mt-1">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <p className="flex-1 text-foreground">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default KeyPoints;
