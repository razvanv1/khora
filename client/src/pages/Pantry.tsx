/*
 * KHORA Pantry Page - Digital Pantry / Cămara Digitală
 * Design: Cosmic Nebula Interface - Ingredient constellation
 * Features: Category nebulae, ingredient spheres, Health Score, Junk Food warnings
 */

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, X, ChefHat, AlertTriangle, Star, Flame, Dumbbell, Filter } from "lucide-react";
import { Link } from "wouter";
import CosmicBackground from "@/components/CosmicBackground";
import Navigation from "@/components/Navigation";
import IngredientSphere from "@/components/IngredientSphere";
import { HealthScoreInline } from "@/components/HealthBadge";
import { 
  ingredients, 
  categories, 
  getIngredientsByCategory, 
  searchIngredients, 
  type Ingredient 
} from "@/data/ingredients";

// Helper functions for health score display
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

export default function Pantry() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [pantryItems, setPantryItems] = useState<string[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const [showJunkFoodOnly, setShowJunkFoodOnly] = useState(false);
  const [showSuperfoodsOnly, setShowSuperfoodsOnly] = useState(false);

  const displayedIngredients = useMemo(() => {
    let result: Ingredient[] = [];
    
    if (searchQuery) {
      result = searchIngredients(searchQuery);
    } else if (selectedCategory) {
      result = getIngredientsByCategory(selectedCategory);
    }
    
    if (showJunkFoodOnly) {
      result = (result.length > 0 ? result : ingredients).filter(i => i.isJunkFood);
    }
    if (showSuperfoodsOnly) {
      result = (result.length > 0 ? result : ingredients).filter(i => i.healthScore >= 9);
    }
    
    return result;
  }, [selectedCategory, searchQuery, showJunkFoodOnly, showSuperfoodsOnly]);

  const pantryIngredients = useMemo(() => 
    ingredients.filter(i => pantryItems.includes(i.id)),
    [pantryItems]
  );

  const togglePantryItem = (id: string) => {
    setPantryItems(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <CosmicBackground />
      
      <main className="relative z-10 min-h-screen pb-32">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-8 px-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Cămara Ta
              </h1>
              <p className="text-white/50 text-sm">
                {pantryItems.length} ingrediente în constelație
              </p>
            </div>
            
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSearch(!showSearch)}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                style={{
                  background: showSearch ? 'rgba(0, 212, 170, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Search className="w-5 h-5 text-white" />
              </motion.button>
              
              {pantryItems.length > 0 && (
                <Link href="/blender">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 h-10 rounded-xl flex items-center gap-2 font-medium"
                    style={{
                      background: 'linear-gradient(135deg, #00d4aa 0%, #00a388 100%)',
                      color: '#0a0f1a',
                    }}
                  >
                    <ChefHat className="w-4 h-4" />
                    Gătește
                  </motion.button>
                </Link>
              )}
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 mb-4 flex-wrap">
            <button
              onClick={() => {
                setShowSuperfoodsOnly(!showSuperfoodsOnly);
                setShowJunkFoodOnly(false);
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                showSuperfoodsOnly ? 'scale-105' : ''
              }`}
              style={{
                background: showSuperfoodsOnly ? 'rgba(0, 212, 170, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${showSuperfoodsOnly ? 'rgba(0, 212, 170, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
                color: showSuperfoodsOnly ? '#00d4aa' : 'rgba(255, 255, 255, 0.6)',
              }}
            >
              <Star className="w-3 h-3" />
              Superfoods
            </button>
            
            <button
              onClick={() => {
                setShowJunkFoodOnly(!showJunkFoodOnly);
                setShowSuperfoodsOnly(false);
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                showJunkFoodOnly ? 'scale-105' : ''
              }`}
              style={{
                background: showJunkFoodOnly ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${showJunkFoodOnly ? 'rgba(239, 68, 68, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
                color: showJunkFoodOnly ? '#ef4444' : 'rgba(255, 255, 255, 0.6)',
              }}
            >
              <AlertTriangle className="w-3 h-3" />
              Junk Food
            </button>
          </div>

          {/* Search Bar */}
          <AnimatePresence>
            {showSearch && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    placeholder="Caută ingrediente..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setSelectedCategory(null);
                    }}
                    className="w-full pl-12 pr-4 py-3 rounded-xl text-white placeholder-white/40 outline-none"
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                    >
                      <X className="w-5 h-5 text-white/40" />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        {/* My Pantry Items */}
        {pantryItems.length > 0 && !searchQuery && !selectedCategory && !showJunkFoodOnly && !showSuperfoodsOnly && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-6 mb-8"
          >
            <h2 className="text-lg font-semibold text-white mb-4">În Cămara Ta</h2>
            <div className="flex flex-wrap gap-6 justify-center">
              {pantryIngredients.slice(0, 8).map((ingredient, index) => (
                <motion.div
                  key={ingredient.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedIngredient(ingredient)}
                  className="cursor-pointer"
                >
                  <IngredientSphere
                    {...ingredient}
                    size="sm"
                    selected={true}
                    onClick={() => togglePantryItem(ingredient.id)}
                  />
                </motion.div>
              ))}
              {pantryItems.length > 8 && (
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-white/50 text-sm"
                  style={{ background: 'rgba(255,255,255,0.05)' }}>
                  +{pantryItems.length - 8}
                </div>
              )}
            </div>
          </motion.section>
        )}

        {/* Category Nebulae */}
        {!searchQuery && !selectedCategory && !showJunkFoodOnly && !showSuperfoodsOnly && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="px-6"
          >
            <h2 className="text-lg font-semibold text-white mb-4">Explorează Categorii</h2>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className="relative p-4 rounded-2xl text-center transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${category.color}15 0%, ${category.color}05 100%)`,
                    border: category.id === 'junk-vegan' 
                      ? '1px solid rgba(239, 68, 68, 0.3)' 
                      : '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity"
                    style={{
                      boxShadow: `0 0 30px ${category.color}30`,
                    }}
                  />
                  <span className="text-3xl mb-2 block">{category.icon}</span>
                  <span className="text-white/80 text-xs font-medium">{category.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.section>
        )}

        {/* Filtered Results (Superfoods or Junk Food) */}
        {(showJunkFoodOnly || showSuperfoodsOnly) && !selectedCategory && !searchQuery && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                {showJunkFoodOnly && <><AlertTriangle className="w-5 h-5 text-red-400" /> Junk Food Vegan</>}
                {showSuperfoodsOnly && <><Star className="w-5 h-5 text-[#00d4aa]" /> Superfoods</>}
              </h2>
              <button
                onClick={() => {
                  setShowJunkFoodOnly(false);
                  setShowSuperfoodsOnly(false);
                }}
                className="text-white/50 text-sm hover:text-white transition-colors"
              >
                ← Înapoi
              </button>
            </div>

            {showJunkFoodOnly && (
              <div 
                className="p-4 rounded-xl mb-6"
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                }}
              >
                <p className="text-red-400 text-sm">
                  ⚠️ Aceste alimente sunt tehnic vegane, dar sunt ultra-procesate și nesănătoase. 
                  Consumă-le rar și preferă alternativele naturale.
                </p>
              </div>
            )}
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {displayedIngredients.map((ingredient, index) => (
                <motion.div
                  key={ingredient.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => setSelectedIngredient(ingredient)}
                  className={`relative p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                    pantryItems.includes(ingredient.id) ? 'ring-2 ring-[#00d4aa]' : ''
                  }`}
                  style={{
                    background: ingredient.isJunkFood 
                      ? 'rgba(239, 68, 68, 0.08)' 
                      : ingredient.healthScore >= 9
                        ? 'rgba(0, 212, 170, 0.08)'
                        : 'rgba(255, 255, 255, 0.04)',
                    border: `1px solid ${
                      ingredient.isJunkFood 
                        ? 'rgba(239, 68, 68, 0.2)' 
                        : ingredient.healthScore >= 9
                          ? 'rgba(0, 212, 170, 0.2)'
                          : 'rgba(255, 255, 255, 0.08)'
                    }`,
                  }}
                >
                  {/* Badge */}
                  {(ingredient.isJunkFood || ingredient.healthScore >= 9) && (
                    <div className="absolute -top-1 -right-1">
                      <span 
                        className="flex items-center justify-center w-6 h-6 rounded-full text-xs"
                        style={{
                          background: ingredient.isJunkFood ? 'rgba(239, 68, 68, 0.9)' : 'rgba(0, 212, 170, 0.9)',
                          color: 'white',
                        }}
                      >
                        {ingredient.isJunkFood ? '⚠️' : '⭐'}
                      </span>
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-2">
                    <span className="text-3xl">{ingredient.emoji}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePantryItem(ingredient.id);
                      }}
                      className="p-1 rounded-full transition-all"
                      style={{
                        background: pantryItems.includes(ingredient.id) 
                          ? 'rgba(0, 212, 170, 0.2)' 
                          : 'rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      {pantryItems.includes(ingredient.id) ? (
                        <X className="w-4 h-4 text-[#00d4aa]" />
                      ) : (
                        <Plus className="w-4 h-4 text-white/60" />
                      )}
                    </button>
                  </div>

                  <h3 className="text-white font-medium text-sm mb-1 line-clamp-1">
                    {ingredient.name}
                  </h3>

                  <div className="flex items-center gap-2">
                    <HealthScoreInline 
                      score={ingredient.healthScore} 
                      isJunkFood={ingredient.isJunkFood} 
                    />
                    <span className="text-white/30 text-xs">
                      {ingredient.calories} kcal
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Ingredient Grid (Category or Search) */}
        {(selectedCategory || searchQuery) && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">
                {searchQuery 
                  ? `Rezultate pentru "${searchQuery}"`
                  : categories.find(c => c.id === selectedCategory)?.name
                }
              </h2>
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchQuery("");
                }}
                className="text-white/50 text-sm hover:text-white transition-colors"
              >
                ← Înapoi
              </button>
            </div>

            {selectedCategory === 'junk-vegan' && (
              <div 
                className="p-4 rounded-xl mb-6"
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                }}
              >
                <p className="text-red-400 text-sm">
                  ⚠️ <strong>Atenție:</strong> Aceste produse sunt vegane dar ultra-procesate. 
                  Conțin aditivi, uleiuri rafinate și au valoare nutrițională scăzută.
                </p>
              </div>
            )}
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {displayedIngredients.map((ingredient, index) => (
                <motion.div
                  key={ingredient.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => setSelectedIngredient(ingredient)}
                  className={`relative p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                    pantryItems.includes(ingredient.id) ? 'ring-2 ring-[#00d4aa]' : ''
                  }`}
                  style={{
                    background: ingredient.isJunkFood 
                      ? 'rgba(239, 68, 68, 0.08)' 
                      : 'rgba(255, 255, 255, 0.04)',
                    border: `1px solid ${ingredient.isJunkFood ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.08)'}`,
                  }}
                >
                  {/* Badges */}
                  {ingredient.isJunkFood && (
                    <div className="absolute -top-1 -right-1">
                      <span 
                        className="flex items-center justify-center w-6 h-6 rounded-full text-xs"
                        style={{ background: 'rgba(239, 68, 68, 0.9)', color: 'white' }}
                      >
                        ⚠️
                      </span>
                    </div>
                  )}
                  {ingredient.healthScore >= 9 && !ingredient.isJunkFood && (
                    <div className="absolute -top-1 -right-1">
                      <span 
                        className="flex items-center justify-center w-6 h-6 rounded-full text-xs"
                        style={{ background: 'rgba(0, 212, 170, 0.9)', color: 'white' }}
                      >
                        ⭐
                      </span>
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-2">
                    <span className="text-3xl">{ingredient.emoji}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePantryItem(ingredient.id);
                      }}
                      className="p-1 rounded-full transition-all"
                      style={{
                        background: pantryItems.includes(ingredient.id) 
                          ? 'rgba(0, 212, 170, 0.2)' 
                          : 'rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      {pantryItems.includes(ingredient.id) ? (
                        <X className="w-4 h-4 text-[#00d4aa]" />
                      ) : (
                        <Plus className="w-4 h-4 text-white/60" />
                      )}
                    </button>
                  </div>

                  <h3 className="text-white font-medium text-sm mb-1 line-clamp-1">
                    {ingredient.name}
                  </h3>

                  <div className="flex items-center gap-2">
                    <HealthScoreInline 
                      score={ingredient.healthScore} 
                      isJunkFood={ingredient.isJunkFood} 
                    />
                    <span className="text-white/30 text-xs">
                      {ingredient.calories} kcal
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {displayedIngredients.length === 0 && (
              <div className="text-center py-12 text-white/40">
                Nu s-au găsit ingrediente
              </div>
            )}
          </motion.section>
        )}

        {/* Ingredient Detail Modal */}
        <AnimatePresence>
          {selectedIngredient && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-end justify-center p-4"
              onClick={() => setSelectedIngredient(null)}
            >
              <div 
                className="absolute inset-0"
                style={{ background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(8px)' }}
              />
              
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-lg rounded-3xl p-6 max-h-[80vh] overflow-y-auto"
                style={{
                  background: 'rgba(20, 25, 40, 0.95)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedIngredient(null)}
                  className="absolute top-4 right-4 p-2 rounded-full"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <X className="w-5 h-5 text-white/60" />
                </button>

                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div 
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
                    style={{
                      background: `${selectedIngredient.color}20`,
                      border: `1px solid ${selectedIngredient.color}40`,
                    }}
                  >
                    {selectedIngredient.emoji}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-1">
                      {selectedIngredient.name}
                    </h2>
                    <p className="text-white/50 text-sm">
                      {categories.find(c => c.id === selectedIngredient.category)?.name}
                    </p>
                  </div>
                </div>

                {/* Health Score */}
                <div className="mb-6">
                  <div 
                    className="p-4 rounded-2xl"
                    style={{
                      background: `${getHealthScoreColor(selectedIngredient.healthScore)}15`,
                      border: `1px solid ${getHealthScoreColor(selectedIngredient.healthScore)}30`,
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white font-medium">Health Score</span>
                      <div className="flex items-center gap-2">
                        <span 
                          className="text-2xl font-bold"
                          style={{ color: getHealthScoreColor(selectedIngredient.healthScore) }}
                        >
                          {selectedIngredient.healthScore}/10
                        </span>
                        <span 
                          className="px-2 py-1 rounded-full text-xs font-medium"
                          style={{
                            background: `${getHealthScoreColor(selectedIngredient.healthScore)}20`,
                            color: getHealthScoreColor(selectedIngredient.healthScore),
                          }}
                        >
                          {getHealthScoreLabel(selectedIngredient.healthScore)}
                        </span>
                      </div>
                    </div>
                    
                    {/* Score Bar */}
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedIngredient.healthScore * 10}%` }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="h-full rounded-full"
                        style={{ background: getHealthScoreColor(selectedIngredient.healthScore) }}
                      />
                    </div>
                  </div>
                </div>

                {/* Junk Food Warning */}
                {selectedIngredient.isJunkFood && (
                  <div 
                    className="p-4 rounded-2xl mb-6"
                    style={{
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-red-400 font-medium text-sm mb-1">Atenție: Junk Food Vegan</p>
                        <p className="text-white/60 text-sm">Acest produs este ultra-procesat. Consumă cu moderație.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Nutritional Info */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div 
                    className="p-4 rounded-xl"
                    style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Flame className="w-4 h-4 text-orange-400" />
                      <span className="text-white/50 text-sm">Calorii</span>
                    </div>
                    <p className="text-white text-xl font-bold">{selectedIngredient.calories} <span className="text-sm font-normal text-white/50">kcal/100g</span></p>
                  </div>
                  
                  <div 
                    className="p-4 rounded-xl"
                    style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Dumbbell className="w-4 h-4 text-blue-400" />
                      <span className="text-white/50 text-sm">Proteine</span>
                    </div>
                    <p className="text-white text-xl font-bold">{selectedIngredient.protein} <span className="text-sm font-normal text-white/50">g/100g</span></p>
                  </div>
                </div>

                {/* Processing Level */}
                <div 
                  className="p-4 rounded-xl mb-6"
                  style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                >
                  <span className="text-white/50 text-sm">Nivel de procesare</span>
                  <p className="text-white font-medium mt-1">
                    {getProcessingLabel(selectedIngredient.isJunkFood)}
                  </p>
                </div>

                {/* Health Score Highlight */}
                <div 
                  className="p-4 rounded-xl mb-6"
                  style={{ 
                    background: selectedIngredient.isJunkFood 
                      ? 'rgba(239, 68, 68, 0.1)' 
                      : 'rgba(0, 212, 170, 0.1)' 
                  }}
                >
                  <span className="text-white/50 text-sm">Evaluare nutrițională</span>
                  <p 
                    className="font-medium mt-1"
                    style={{ 
                      color: getHealthScoreColor(selectedIngredient.healthScore) 
                    }}
                  >
                    {getHealthScoreLabel(selectedIngredient.healthScore)} - Score {selectedIngredient.healthScore}/10
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedIngredient.tags.map(tag => (
                    <span 
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: 'rgba(255, 255, 255, 0.6)',
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Add to Pantry Button */}
                <button
                  onClick={() => togglePantryItem(selectedIngredient.id)}
                  className="w-full py-4 rounded-2xl font-semibold transition-all"
                  style={{
                    background: pantryItems.includes(selectedIngredient.id)
                      ? 'rgba(239, 68, 68, 0.2)'
                      : 'linear-gradient(135deg, #00d4aa 0%, #00a388 100%)',
                    color: pantryItems.includes(selectedIngredient.id) ? '#ef4444' : '#0a0f1a',
                  }}
                >
                  {pantryItems.includes(selectedIngredient.id) ? 'Elimină din cămară' : 'Adaugă în cămară'}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Navigation />
    </div>
  );
}
