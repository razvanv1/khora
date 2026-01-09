/*
 * KHORA Ingredient Sphere Component
 * Design: Glowing 3D glass spheres representing food ingredients
 * Interaction: Draggable with light trail effect
 */

import { motion } from "framer-motion";
import { useState } from "react";

interface IngredientSphereProps {
  id: string;
  name: string;
  emoji: string;
  color: string;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  onDragEnd?: (id: string) => void;
  selected?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "w-16 h-16",
  md: "w-20 h-20",
  lg: "w-24 h-24",
};

const emojiSizes = {
  sm: "text-2xl",
  md: "text-3xl",
  lg: "text-4xl",
};

export default function IngredientSphere({
  id,
  name,
  emoji,
  color,
  size = "md",
  onClick,
  onDragEnd,
  selected = false,
  className = "",
}: IngredientSphereProps) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.5}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => {
        setIsDragging(false);
        onDragEnd?.(id);
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        relative cursor-grab active:cursor-grabbing
        ${sizeClasses[size]}
        ${className}
      `}
      style={{ zIndex: isDragging ? 100 : 1 }}
    >
      {/* Outer Glow */}
      <motion.div
        animate={{
          scale: selected ? [1, 1.2, 1] : 1,
          opacity: selected ? [0.5, 0.8, 0.5] : 0.3,
        }}
        transition={{
          duration: 2,
          repeat: selected ? Infinity : 0,
          ease: "easeInOut",
        }}
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
          filter: 'blur(10px)',
        }}
      />

      {/* Main Sphere */}
      <div
        className={`
          relative ${sizeClasses[size]} rounded-full
          flex items-center justify-center
          transition-all duration-300
        `}
        style={{
          background: `
            radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, ${color}20 0%, transparent 50%),
            linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)
          `,
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.1) inset,
            0 -4px 16px rgba(255, 255, 255, 0.1) inset,
            ${selected ? `0 0 30px ${color}60` : 'none'}
          `,
          backdropFilter: 'blur(8px)',
        }}
      >
        <span className={`${emojiSizes[size]} select-none`}>{emoji}</span>
      </div>

      {/* Label */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap"
      >
        <span className="text-xs text-white/70 font-medium">{name}</span>
      </motion.div>

      {/* Selection Ring */}
      {selected && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute inset-0 rounded-full border-2"
          style={{ borderColor: color }}
        />
      )}
    </motion.div>
  );
}
