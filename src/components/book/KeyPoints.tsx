
import { motion, AnimationControls } from 'framer-motion';

type KeyPoint = string | { title: string; points: string[] };

interface KeyPointsProps {
  points: KeyPoint[];
  controls: AnimationControls;
}

const KeyPoints = ({ points, controls }: KeyPointsProps) => {
  if (!points || points.length === 0) return null;

  const renderPoint = (point: string, index: number) => (
    <div key={index} className="flex items-start space-x-3">
      <div className="mt-1.5">
        <div className="w-2 h-2 rounded-full bg-primary" />
      </div>
      <p className="flex-1 text-foreground/80">{point}</p>
    </div>
  );

  const renderPoints = () => {
    // If points is an array of strings
    if (typeof points[0] === 'string') {
      return (
        <div className="space-y-2">
          {(points as string[]).map((point, index) => renderPoint(point, index))}
        </div>
      );
    }

    // If points is an array of objects
    return (
      <div className="space-y-6">
        {(points as { title: string; points: string[] }[]).map((section, index) => (
          <div key={index} className="space-y-3">
            <h3 className="text-lg font-medium text-foreground/90">{section.title}</h3>
            <div className="space-y-2">
              {section.points.map((point, pointIndex) => renderPoint(point, pointIndex))}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <motion.div
      className="w-full max-w-7xl px-4 md:px-8 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      <div className="bg-muted/5 border border-border rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">核心要点</h2>
        {renderPoints()}
      </div>
    </motion.div>
  );
};

export default KeyPoints;
