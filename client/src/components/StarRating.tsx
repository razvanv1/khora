import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

export default function StarRating({
  rating,
  onRatingChange,
  readonly = false,
  size = "md",
  showValue = false,
}: StarRatingProps) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const handleClick = (value: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(value);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          type="button"
          onClick={() => handleClick(star)}
          whileHover={!readonly ? { scale: 1.2 } : {}}
          whileTap={!readonly ? { scale: 0.9 } : {}}
          disabled={readonly}
          className={`${readonly ? "cursor-default" : "cursor-pointer"} focus:outline-none`}
        >
          <Star
            className={`${sizes[size]} transition-colors ${
              star <= rating
                ? "fill-[#d4a574] text-[#d4a574]"
                : "fill-transparent text-white/60"
            }`}
          />
        </motion.button>
      ))}
      {showValue && (
        <span className="ml-2 text-sm text-white/60">
          {rating > 0 ? rating.toFixed(1) : "-"}
        </span>
      )}
    </div>
  );
}
