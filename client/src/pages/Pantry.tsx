/*
 * KHORA Pantry Page - Premium Apple VisionOS 2026
 * Design: Cosmic Blue + Golden Accent + Glassmorphism
 * Limba: Română
 * Filtre avansate: Proteine, Grăsimi, Fibre, Health Score, Superfoods, Junk Food
 */

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, X, ChefHat, AlertTriangle, Star, Leaf, Filter, SlidersHorizontal, Flame, Dumbbell, Wheat } from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import { ingredients, categories, getIngredientsByCategory, searchIngredients, type Ingredient } from "@/data/ingredients";

const getHealthScoreColor = (score: number): string => {
  if (score >= 9) return '#22c55e';
  if (score >= 7) return '#84cc16';
  if (score >= 5) return '#eab308';
  if (score >= 3) return '#f97316';
  return '#ef4444';
};

// Filtre principale
const mainFilters = [
  { id: 'all', label: 'Toate', icon: null },
  { id: 'superfoods', label: 'Superfoods', icon: Star },
  { id: 'high-protein', label: 'Proteine', icon: Dumbbell },
  { id: 'high-fiber', label: 'Fibre', icon: Wheat },
  { id: 'low-fat', label: 'Low Fat', icon: Flame },
  { id: 'junk', label: 'Procesate', icon: AlertTriangle },
];

// Intervale pentru Health Score
const healthScoreRanges = [
  { id: 'all', label: 'Toate', min: 1, max: 10 },
  { id: 'excellent', label: '9-10 Excelent', min: 9, max: 10 },
  { id: 'good', label: '7-8 Bun', min: 7, max: 8 },
  { id: 'moderate', label: '5-6 Moderat', min: 5, max: 6 },
  { id: 'low', label: '1-4 Scăzut', min: 1, max: 4 },
];

export default function Pantry() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [pantryItems, setPantryItems] = useState<string[]>(() => {
    const saved = localStorage.getItem('khora_my_pantry');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [healthScoreFilter, setHealthScoreFilter] = useState("all");
  const [minProtein, setMinProtein] = useState(0);
  const [maxCalories, setMaxCalories] = useState(1000);

  const displayedIngredients = useMemo(() => {
    let result: Ingredient[] = [];
    
    if (searchQuery) {
      result = searchIngredients(searchQuery);
    } else if (selectedCategory) {
      result = getIngredientsByCategory(selectedCategory);
    } else {
      result = ingredients;
    }
    
    // Filtru principal
    if (activeFilter === 'superfoods') {
      result = result.filter(i => i.healthScore >= 9 && !i.isJunkFood);
    } else if (activeFilter === 'high-protein') {
      result = result.filter(i => i.protein >= 15);
    } else if (activeFilter === 'high-fiber') {
      result = result.filter(i => (i.fiber ?? 0) >= 5 || i.tags.includes('fibre'));
    } else if (activeFilter === 'low-fat') {
      result = result.filter(i => (i.fat ?? 0) <= 5 || i.calories <= 100);
    } else if (activeFilter === 'junk') {
      result = result.filter(i => i.isJunkFood);
    }
    
    // Filtru Health Score
    if (healthScoreFilter !== 'all') {
      const range = healthScoreRanges.find(r => r.id === healthScoreFilter);
      if (range) {
        result = result.filter(i => i.healthScore >= range.min && i.healthScore <= range.max);
      }
    }
    
    // Filtre avansate
    if (minProtein > 0) {
      result = result.filter(i => i.protein >= minProtein);
    }
    if (maxCalories < 1000) {
      result = result.filter(i => i.calories <= maxCalories);
    }
    
    return result;
  }, [selectedCategory, searchQuery, activeFilter, healthScoreFilter, minProtein, maxCalories]);

  const togglePantryItem = (id: string) => {
    setPantryItems(prev => {
      const updated = prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id];
      localStorage.setItem('khora_my_pantry', JSON.stringify(updated));
      return updated;
    });
  };

  const resetFilters = () => {
    setActiveFilter('all');
    setHealthScoreFilter('all');
    setMinProtein(0);
    setMaxCalories(1000);
    setShowAdvancedFilters(false);
  };

  const hasActiveFilters = activeFilter !== 'all' || healthScoreFilter !== 'all' || minProtein > 0 || maxCalories < 1000;

  return (
    <div className="min-h-screen bg-[#0a1628] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30" style={{ backgroundImage: 'url(/images/khora_home_pantry.webp)' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/60 via-[#0a1628]/80 to-[#0a1628]" />

      <div className="relative z-10 min-h-screen px-4 pt-12 pb-32">
        {/* Header */}
        <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-light text-white">Cămara Digitală</h1>
              <p className="text-white/50 text-sm">{pantryItems.length} ingrediente selectate • {displayedIngredients.length} afișate</p>
            </div>
            {pantryItems.length > 0 && (
              <Link href="/blender">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-4 py-2 rounded-xl flex items-center gap-2 font-medium text-sm" style={{ background: 'linear-gradient(135deg, #d4a574 0%, #e8c9a8 100%)', color: '#0a1628' }}>
                  <ChefHat className="w-4 h-4" />
                  Gătește
                </motion.button>
              </Link>
            )}
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
            <input 
              type="text" 
              value={searchQuery} 
              onChange={(e) => { setSearchQuery(e.target.value); setSelectedCategory(null); }} 
              placeholder="Caută ingrediente..." 
              className="w-full pl-12 pr-20 py-3 rounded-2xl text-white placeholder-white/30 outline-none" 
              style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }} 
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {searchQuery && (
                <button onClick={() => setSearchQuery("")}>
                  <X className="w-5 h-5 text-white/60 hover:text-white/60" />
                </button>
              )}
              <button 
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`p-2 rounded-lg transition-colors ${showAdvancedFilters || hasActiveFilters ? 'bg-[#d4a574]/20 text-[#d4a574]' : 'text-white/60 hover:text-white/60'}`}
              >
                <SlidersHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {mainFilters.map(filter => {
              const Icon = filter.icon;
              return (
                <button 
                  key={filter.id} 
                  onClick={() => setActiveFilter(filter.id)} 
                  className="px-4 py-2 rounded-xl text-sm whitespace-nowrap flex-shrink-0 flex items-center gap-1.5 transition-all" 
                  style={{ 
                    background: activeFilter === filter.id ? 'rgba(212, 165, 116, 0.2)' : 'rgba(255, 255, 255, 0.04)', 
                    border: activeFilter === filter.id ? '1px solid rgba(212, 165, 116, 0.5)' : '1px solid rgba(255, 255, 255, 0.08)', 
                    color: activeFilter === filter.id ? '#d4a574' : 'rgba(255,255,255,0.6)' 
                  }}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  {filter.label}
                </button>
              );
            })}
          </div>

          {/* Advanced Filters Panel */}
          <AnimatePresence>
            {showAdvancedFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 p-4 rounded-2xl" style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-medium text-sm">Filtre Avansate</h3>
                    {hasActiveFilters && (
                      <button onClick={resetFilters} className="text-[#d4a574] text-xs hover:underline">
                        Resetează
                      </button>
                    )}
                  </div>

                  {/* Health Score Filter */}
                  <div className="mb-4">
                    <label className="text-white/60 text-xs mb-2 block">Health Score</label>
                    <div className="flex flex-wrap gap-2">
                      {healthScoreRanges.map(range => (
                        <button
                          key={range.id}
                          onClick={() => setHealthScoreFilter(range.id)}
                          className="px-3 py-1.5 rounded-lg text-xs transition-all"
                          style={{
                            background: healthScoreFilter === range.id ? 'rgba(45, 212, 191, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                            border: healthScoreFilter === range.id ? '1px solid rgba(45, 212, 191, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
                            color: healthScoreFilter === range.id ? '#2dd4bf' : 'rgba(255,255,255,0.5)'
                          }}
                        >
                          {range.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Protein Slider */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-white/60 text-xs">Proteine minime</label>
                      <span className="text-[#2dd4bf] text-xs font-medium">{minProtein}g+</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={minProtein}
                      onChange={(e) => setMinProtein(Number(e.target.value))}
                      className="w-full h-2 rounded-full appearance-none cursor-pointer"
                      style={{ 
                        background: `linear-gradient(to right, #2dd4bf ${minProtein * 2}%, rgba(255,255,255,0.1) ${minProtein * 2}%)` 
                      }}
                    />
                  </div>

                  {/* Calories Slider */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-white/60 text-xs">Calorii maxime</label>
                      <span className="text-[#d4a574] text-xs font-medium">{maxCalories} kcal</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      step="50"
                      value={maxCalories}
                      onChange={(e) => setMaxCalories(Number(e.target.value))}
                      className="w-full h-2 rounded-full appearance-none cursor-pointer"
                      style={{ 
                        background: `linear-gradient(to right, #d4a574 ${maxCalories / 10}%, rgba(255,255,255,0.1) ${maxCalories / 10}%)` 
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        {/* Categories */}
        {!searchQuery && !selectedCategory && activeFilter === 'all' && !hasActiveFilters && (
          <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-6">
            <h2 className="text-white/70 text-sm mb-3">Categorii ({categories.length})</h2>
            <div className="grid grid-cols-4 gap-2">
              {categories.slice(0, 16).map((category, index) => (
                <motion.button 
                  key={category.id} 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: index * 0.02 }} 
                  onClick={() => setSelectedCategory(category.id)} 
                  className="p-3 rounded-xl text-center hover:scale-105 transition-transform" 
                  style={{ background: `${category.color}15`, border: `1px solid ${category.color}30` }}
                >
                  <span className="text-xl block mb-1">{category.icon}</span>
                  <span className="text-white/70 text-[10px] line-clamp-1">{category.name}</span>
                </motion.button>
              ))}
            </div>
            {categories.length > 16 && (
              <div className="grid grid-cols-4 gap-2 mt-2">
                {categories.slice(16).map((category, index) => (
                  <motion.button 
                    key={category.id} 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: (16 + index) * 0.02 }} 
                    onClick={() => setSelectedCategory(category.id)} 
                    className="p-3 rounded-xl text-center hover:scale-105 transition-transform" 
                    style={{ background: `${category.color}15`, border: `1px solid ${category.color}30` }}
                  >
                    <span className="text-xl block mb-1">{category.icon}</span>
                    <span className="text-white/70 text-[10px] line-clamp-1">{category.name}</span>
                  </motion.button>
                ))}
              </div>
            )}
          </motion.section>
        )}

        {/* Selected Category Header */}
        {selectedCategory && (
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-medium">{categories.find(c => c.id === selectedCategory)?.name}</h2>
            <button onClick={() => setSelectedCategory(null)} className="text-white/50 text-sm hover:text-white/70">← Înapoi</button>
          </div>
        )}

        {/* Results Count & Active Filters Summary */}
        {(searchQuery || selectedCategory || hasActiveFilters) && (
          <div className="flex items-center justify-between mb-3">
            <p className="text-white/60 text-xs">{displayedIngredients.length} rezultate</p>
            {hasActiveFilters && (
              <button onClick={resetFilters} className="text-[#d4a574] text-xs flex items-center gap-1 hover:underline">
                <X className="w-3 h-3" />
                Șterge filtre
              </button>
            )}
          </div>
        )}

        {/* Ingredients Grid */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 gap-3">
          {displayedIngredients.map((ingredient, index) => (
            <motion.div 
              key={ingredient.id} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: Math.min(index * 0.015, 0.3) }} 
              onClick={() => setSelectedIngredient(ingredient)} 
              className={`relative p-3 rounded-xl cursor-pointer transition-all hover:scale-[1.02] ${pantryItems.includes(ingredient.id) ? 'ring-2 ring-[#2dd4bf]' : ''}`} 
              style={{ 
                background: ingredient.isJunkFood 
                  ? 'rgba(239, 68, 68, 0.08)' 
                  : ingredient.healthScore >= 9 
                    ? 'rgba(34, 197, 94, 0.08)' 
                    : 'rgba(255, 255, 255, 0.04)', 
                border: `1px solid ${
                  ingredient.isJunkFood 
                    ? 'rgba(239, 68, 68, 0.2)' 
                    : ingredient.healthScore >= 9 
                      ? 'rgba(34, 197, 94, 0.2)' 
                      : 'rgba(255, 255, 255, 0.08)'
                }` 
              }}
            >
              {/* Health Score Badge */}
              <div 
                className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" 
                style={{ 
                  background: `${getHealthScoreColor(ingredient.healthScore)}20`, 
                  color: getHealthScoreColor(ingredient.healthScore) 
                }}
              >
                {ingredient.healthScore}
              </div>
              
              {/* Status Badges */}
              {ingredient.isJunkFood && (
                <div className="absolute top-2 left-2">
                  <AlertTriangle className="w-4 h-4 text-orange-400" />
                </div>
              )}
              {ingredient.healthScore >= 9 && !ingredient.isJunkFood && (
                <div className="absolute top-2 left-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                </div>
              )}

              <div className="flex items-start justify-between mb-2 mt-4">
                <span className="text-2xl">{ingredient.emoji}</span>
                <button 
                  onClick={(e) => { e.stopPropagation(); togglePantryItem(ingredient.id); }} 
                  className="p-1 rounded-full transition-colors" 
                  style={{ background: pantryItems.includes(ingredient.id) ? 'rgba(45, 212, 191, 0.2)' : 'rgba(255, 255, 255, 0.1)' }}
                >
                  {pantryItems.includes(ingredient.id) 
                    ? <X className="w-4 h-4 text-[#2dd4bf]" /> 
                    : <Plus className="w-4 h-4 text-white/60" />
                  }
                </button>
              </div>

              <h3 className="text-white font-medium text-sm mb-1 truncate">{ingredient.name}</h3>
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/50">{ingredient.calories} kcal</span>
                <span className="text-[#2dd4bf]">{ingredient.protein}g prot</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {displayedIngredients.length === 0 && (
          <div className="text-center py-12">
            <Leaf className="w-12 h-12 text-white/20 mx-auto mb-3" />
            <p className="text-white/60 mb-2">Niciun ingredient găsit</p>
            {hasActiveFilters && (
              <button onClick={resetFilters} className="text-[#d4a574] text-sm hover:underline">
                Resetează filtrele
              </button>
            )}
          </div>
        )}
      </div>

      {/* Ingredient Detail Modal */}
      <AnimatePresence>
        {selectedIngredient && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-50 flex items-end justify-center" 
            style={{ background: 'rgba(0,0,0,0.6)' }} 
            onClick={() => setSelectedIngredient(null)}
          >
            <motion.div 
              initial={{ y: '100%' }} 
              animate={{ y: 0 }} 
              exit={{ y: '100%' }} 
              transition={{ type: 'spring', damping: 25 }} 
              className="w-full max-w-lg p-6 rounded-t-3xl max-h-[80vh] overflow-y-auto" 
              style={{ background: '#0f1729', border: '1px solid rgba(255, 255, 255, 0.1)' }} 
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{selectedIngredient.emoji}</span>
                  <div>
                    <h2 className="text-xl font-medium text-white">{selectedIngredient.name}</h2>
                    <p className="text-white/50 text-sm">{categories.find(c => c.id === selectedIngredient.category)?.name || selectedIngredient.category}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedIngredient(null)} className="text-white/50 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Health Score */}
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold" 
                  style={{ 
                    background: `${getHealthScoreColor(selectedIngredient.healthScore)}20`, 
                    color: getHealthScoreColor(selectedIngredient.healthScore) 
                  }}
                >
                  {selectedIngredient.healthScore}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Health Score</p>
                  <p className="text-white/50 text-xs">
                    {selectedIngredient.healthScore >= 9 ? 'Superaliment' 
                      : selectedIngredient.healthScore >= 7 ? 'Foarte sănătos' 
                      : selectedIngredient.healthScore >= 5 ? 'Moderat' 
                      : selectedIngredient.healthScore >= 3 ? 'Consum limitat' 
                      : 'Evită'}
                  </p>
                </div>
              </div>

              {/* Junk Food Warning */}
              {selectedIngredient.isJunkFood && (
                <div className="p-3 rounded-xl mb-4 flex items-start gap-3" style={{ background: 'rgba(249, 115, 22, 0.1)', border: '1px solid rgba(249, 115, 22, 0.3)' }}>
                  <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  <div>
                    <p className="text-orange-400 font-medium text-sm">Produs procesat</p>
                    <p className="text-white/60 text-xs">Consum ocazional. Vegan nu înseamnă automat sănătos.</p>
                  </div>
                </div>
              )}

              {/* Superaliment Badge */}
              {selectedIngredient.healthScore >= 9 && !selectedIngredient.isJunkFood && (
                <div className="p-3 rounded-xl mb-4 flex items-start gap-3" style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                  <Star className="w-5 h-5 text-green-400 fill-green-400 flex-shrink-0" />
                  <div>
                    <p className="text-green-400 font-medium text-sm">Superaliment</p>
                    <p className="text-white/60 text-xs">Densitate nutrițională ridicată. Recomandare: consum regulat.</p>
                  </div>
                </div>
              )}

              {/* Nutrition Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 rounded-xl text-center" style={{ background: 'rgba(255, 255, 255, 0.04)' }}>
                  <p className="text-2xl font-semibold text-white">{selectedIngredient.calories}</p>
                  <p className="text-white/60 text-xs">kcal / 100g</p>
                </div>
                <div className="p-3 rounded-xl text-center" style={{ background: 'rgba(45, 212, 191, 0.1)' }}>
                  <p className="text-2xl font-semibold text-[#2dd4bf]">{selectedIngredient.protein}g</p>
                  <p className="text-white/60 text-xs">proteine</p>
                </div>
              </div>

              {/* Tags */}
              {selectedIngredient.tags.length > 0 && (
                <div className="mb-4">
                  <p className="text-white/60 text-xs mb-2">Etichete</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedIngredient.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="px-2 py-1 rounded-lg text-xs"
                        style={{ background: 'rgba(255, 255, 255, 0.06)', color: 'rgba(255,255,255,0.6)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Add Button */}
              <button 
                onClick={() => togglePantryItem(selectedIngredient.id)} 
                className="w-full p-4 rounded-2xl font-medium transition-all" 
                style={{ 
                  background: pantryItems.includes(selectedIngredient.id) 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'linear-gradient(135deg, #d4a574 0%, #e8c9a8 100%)', 
                  color: pantryItems.includes(selectedIngredient.id) ? '#fff' : '#0a1628' 
                }}
              >
                {pantryItems.includes(selectedIngredient.id) ? 'Elimină din cămară' : 'Adaugă în cămară'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navigation />
    </div>
  );
}
