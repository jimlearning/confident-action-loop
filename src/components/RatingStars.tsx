import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

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

export default RatingStars;