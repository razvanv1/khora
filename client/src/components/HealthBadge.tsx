/*
 * KHORA Health Badge Component
 * Displays Health Score, calories, protein, and junk food warnings
 */

import { motion } from "framer-motion";
import { AlertTriangle, Star, Flame, Dumbbell } from "lucide-react";
import type { Ingredient } from "@/data/ingredients";

// Helper functions
function getHealthScoreColor(score: number): string {
  if (score >= 9) return '#00d4aa';
  if (score >= 7) return '#22c55e';
  if (score >= 5) return '#fbbf24';
  if (score >= 3) return '#f97316';
  return '#ef4444';
}

function getHealthScoreLabel(score: number): string {
  if (score >= 9) return 'Superfood';
  if (score >= 7) return 'Sănătos';
  if (score >= 5) return 'Moderat';
  if (score >= 3) return 'Limitat';
  return 'Evită';
}

function getProcessingLabel(isJunkFood: boolean): string {
  return isJunkFood ? 'Ultra-procesat' : 'Minim procesat';
}

interface HealthBadgeProps {
  ingredient: Ingredient;
  size?: "sm" | "md" | "lg";
  showDetails?: boolean;
}

export default function HealthBadge({ ingredient, size = "md", showDetails = false }: HealthBadgeProps) {
  const scoreColor = getHealthScoreColor(ingredient.healthScore);
  const scoreLabel = getHealthScoreLabel(ingredient.healthScore);
  
  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2",
  };

  return (
    <div className="space-y-2">
      {/* Main Health Score Badge */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`inline-flex items-center gap-2 rounded-full ${sizeClasses[size]}`}
        style={{
          background: `${scoreColor}20`,
          border: `1px solid ${scoreColor}40`,
        }}
      >
        {ingredient.healthScore >= 9 ? (
          <Star className="w-4 h-4" style={{ color: scoreColor }} />
        ) : ingredient.isJunkFood ? (
          <AlertTriangle className="w-4 h-4" style={{ color: scoreColor }} />
        ) : null}
        
        <span style={{ color: scoreColor }} className="font-semibold">
          {ingredient.healthScore}/10
        </span>
        <span className="text-white/60">{scoreLabel}</span>
      </motion.div>

      {/* Junk Food Warning */}
      {ingredient.isJunkFood && (
        <motion.div
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-start gap-2 p-3 rounded-xl"
          style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
          }}
        >
          <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-400 font-medium text-sm">Junk Food Vegan</p>
            <p className="text-white/50 text-xs mt-1">Produs ultra-procesat. Consumă cu moderație.</p>
          </div>
        </motion.div>
      )}

      {/* Nutritional Details */}
      {showDetails && (
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-2"
        >
          <div 
            className="p-2 rounded-lg flex items-center gap-2"
            style={{ background: 'rgba(255, 255, 255, 0.05)' }}
          >
            <Flame className="w-4 h-4 text-orange-400" />
            <div>
              <p className="text-white/60 text-xs">Calorii</p>
              <p className="text-white font-medium text-sm">{ingredient.calories} kcal</p>
            </div>
          </div>
          
          <div 
            className="p-2 rounded-lg flex items-center gap-2"
            style={{ background: 'rgba(255, 255, 255, 0.05)' }}
          >
            <Dumbbell className="w-4 h-4 text-blue-400" />
            <div>
              <p className="text-white/60 text-xs">Proteine</p>
              <p className="text-white font-medium text-sm">{ingredient.protein}g</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Processing Level */}
      {showDetails && (
        <div className="flex items-center gap-2 text-xs">
          <span className="text-white/60">Procesare:</span>
          <span 
            className="px-2 py-0.5 rounded-full"
            style={{
              background: ingredient.isJunkFood ? 'rgba(239, 68, 68, 0.2)' : 'rgba(0, 212, 170, 0.2)',
              color: ingredient.isJunkFood ? '#ef4444' : '#00d4aa',
            }}
          >
            {getProcessingLabel(ingredient.isJunkFood)}
          </span>
        </div>
      )}
    </div>
  );
}

// Compact inline badge for lists
export function HealthScoreInline({ score, isJunkFood }: { score: number; isJunkFood: boolean }) {
  const color = getHealthScoreColor(score);
  
  return (
    <span 
      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium"
      style={{
        background: `${color}20`,
        color: color,
      }}
    >
      {isJunkFood && <AlertTriangle className="w-3 h-3" />}
      {score}/10
    </span>
  );
}
