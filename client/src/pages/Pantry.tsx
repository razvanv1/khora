/*
 * KHORA Pantry Page - Premium Apple VisionOS 2026
 * Design: Cosmic Blue + Golden Accent + Glassmorphism
 * Limba: Română
 */

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, X, ChefHat, AlertTriangle, Star, Leaf, Filter } from "lucide-react";
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

const filterOptions = [
  { id: 'all', label: 'Toate' },
  { id: 'superfoods', label: 'Superfoods' },
  { id: 'high-protein', label: 'Proteină' },
  { id: 'junk', label: 'Procesate' },
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

  const displayedIngredients = useMemo(() => {
    let result: Ingredient[] = [];
    
    if (searchQuery) {
      result = searchIngredients(searchQuery);
    } else if (selectedCategory) {
      result = getIngredientsByCategory(selectedCategory);
    } else {
      result = ingredients;
    }
    
    if (activeFilter === 'superfoods') {
      result = result.filter(i => i.healthScore >= 9);
    } else if (activeFilter === 'high-protein') {
      result = result.filter(i => i.protein >= 10);
    } else if (activeFilter === 'junk') {
      result = result.filter(i => i.isJunkFood);
    }
    
    return result;
  }, [selectedCategory, searchQuery, activeFilter]);

  const togglePantryItem = (id: string) => {
    setPantryItems(prev => {
      const updated = prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id];
      localStorage.setItem('khora_my_pantry', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-[#0a1628] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30" style={{ backgroundImage: 'url(/images/khora_home_pantry.png)' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/60 via-[#0a1628]/80 to-[#0a1628]" />

      <div className="relative z-10 min-h-screen px-4 pt-12 pb-32">
        {/* Header */}
        <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-light text-white">Cămara Digitală</h1>
              <p className="text-white/50 text-sm">{pantryItems.length} ingrediente selectate</p>
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
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
            <input type="text" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setSelectedCategory(null); }} placeholder="Caută ingrediente..." className="w-full pl-12 pr-10 py-3 rounded-2xl text-white placeholder-white/30 outline-none" style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }} />
            {searchQuery && <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2"><X className="w-5 h-5 text-white/30" /></button>}
          </div>

          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {filterOptions.map(filter => (
              <button key={filter.id} onClick={() => setActiveFilter(filter.id)} className="px-4 py-2 rounded-xl text-sm whitespace-nowrap flex-shrink-0 flex items-center gap-1" style={{ background: activeFilter === filter.id ? 'rgba(212, 165, 116, 0.2)' : 'rgba(255, 255, 255, 0.04)', border: activeFilter === filter.id ? '1px solid rgba(212, 165, 116, 0.5)' : '1px solid rgba(255, 255, 255, 0.08)', color: activeFilter === filter.id ? '#d4a574' : 'rgba(255,255,255,0.6)' }}>
                {filter.id === 'superfoods' && <Star className="w-3 h-3" />}
                {filter.id === 'junk' && <AlertTriangle className="w-3 h-3" />}
                {filter.label}
              </button>
            ))}
          </div>
        </motion.header>

        {/* Categories */}
        {!searchQuery && !selectedCategory && activeFilter === 'all' && (
          <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-6">
            <h2 className="text-white/70 text-sm mb-3">Categorii</h2>
            <div className="grid grid-cols-4 gap-2">
              {categories.slice(0, 12).map((category, index) => (
                <motion.button key={category.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }} onClick={() => setSelectedCategory(category.id)} className="p-3 rounded-xl text-center" style={{ background: `${category.color}15`, border: `1px solid ${category.color}30` }}>
                  <span className="text-xl block mb-1">{category.icon}</span>
                  <span className="text-white/70 text-[10px]">{category.name}</span>
                </motion.button>
              ))}
            </div>
            {categories.length > 12 && (
              <div className="grid grid-cols-4 gap-2 mt-2">
                {categories.slice(12).map((category, index) => (
                  <motion.button key={category.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: (12 + index) * 0.03 }} onClick={() => setSelectedCategory(category.id)} className="p-3 rounded-xl text-center" style={{ background: `${category.color}15`, border: `1px solid ${category.color}30` }}>
                    <span className="text-xl block mb-1">{category.icon}</span>
                    <span className="text-white/70 text-[10px]">{category.name}</span>
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
            <button onClick={() => setSelectedCategory(null)} className="text-white/50 text-sm">← Înapoi</button>
          </div>
        )}

        {/* Results Count */}
        {(searchQuery || selectedCategory || activeFilter !== 'all') && (
          <p className="text-white/40 text-xs mb-3">{displayedIngredients.length} rezultate</p>
        )}

        {/* Ingredients Grid */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 gap-3">
          {displayedIngredients.map((ingredient, index) => (
            <motion.div key={ingredient.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.02 }} onClick={() => setSelectedIngredient(ingredient)} className={`relative p-3 rounded-xl cursor-pointer ${pantryItems.includes(ingredient.id) ? 'ring-2 ring-[#2dd4bf]' : ''}`} style={{ background: ingredient.isJunkFood ? 'rgba(239, 68, 68, 0.08)' : ingredient.healthScore >= 9 ? 'rgba(34, 197, 94, 0.08)' : 'rgba(255, 255, 255, 0.04)', border: `1px solid ${ingredient.isJunkFood ? 'rgba(239, 68, 68, 0.2)' : ingredient.healthScore >= 9 ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 255, 255, 0.08)'}` }}>
              {/* Health Score */}
              <div className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: `${getHealthScoreColor(ingredient.healthScore)}20`, color: getHealthScoreColor(ingredient.healthScore) }}>{ingredient.healthScore}</div>
              
              {/* Badges */}
              {ingredient.isJunkFood && <div className="absolute top-2 left-2"><AlertTriangle className="w-4 h-4 text-orange-400" /></div>}
              {ingredient.healthScore >= 9 && !ingredient.isJunkFood && <div className="absolute top-2 left-2"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /></div>}

              <div className="flex items-start justify-between mb-2 mt-4">
                <span className="text-2xl">{ingredient.emoji}</span>
                <button onClick={(e) => { e.stopPropagation(); togglePantryItem(ingredient.id); }} className="p-1 rounded-full" style={{ background: pantryItems.includes(ingredient.id) ? 'rgba(45, 212, 191, 0.2)' : 'rgba(255, 255, 255, 0.1)' }}>
                  {pantryItems.includes(ingredient.id) ? <X className="w-4 h-4 text-[#2dd4bf]" /> : <Plus className="w-4 h-4 text-white/60" />}
                </button>
              </div>

              <h3 className="text-white font-medium text-sm mb-1 truncate">{ingredient.name}</h3>
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/50">{ingredient.calories} kcal</span>
                <span className="text-[#2dd4bf]">{ingredient.protein}g</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {displayedIngredients.length === 0 && (
          <div className="text-center py-12">
            <Leaf className="w-12 h-12 text-white/20 mx-auto mb-3" />
            <p className="text-white/40">Niciun ingredient găsit</p>
          </div>
        )}
      </div>

      {/* Ingredient Detail Modal */}
      <AnimatePresence>
        {selectedIngredient && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: 'rgba(0,0,0,0.6)' }} onClick={() => setSelectedIngredient(null)}>
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25 }} className="w-full max-w-lg p-6 rounded-t-3xl max-h-[80vh] overflow-y-auto" style={{ background: '#0f1729', border: '1px solid rgba(255, 255, 255, 0.1)' }} onClick={e => e.stopPropagation()}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{selectedIngredient.emoji}</span>
                  <div>
                    <h2 className="text-xl font-medium text-white">{selectedIngredient.name}</h2>
                    <p className="text-white/50 text-sm">{selectedIngredient.category}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedIngredient(null)} className="text-white/50 hover:text-white"><X className="w-6 h-6" /></button>
              </div>

              {/* Health Score */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold" style={{ background: `${getHealthScoreColor(selectedIngredient.healthScore)}20`, color: getHealthScoreColor(selectedIngredient.healthScore) }}>{selectedIngredient.healthScore}</div>
                <div>
                  <p className="text-white text-sm font-medium">Health Score</p>
                  <p className="text-white/50 text-xs">{selectedIngredient.healthScore >= 9 ? 'Superaliment' : selectedIngredient.healthScore >= 7 ? 'Foarte sănătos' : selectedIngredient.healthScore >= 5 ? 'Moderat' : selectedIngredient.healthScore >= 3 ? 'Consum limitat' : 'Evită'}</p>
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

              {/* Nutrition */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 rounded-xl text-center" style={{ background: 'rgba(255, 255, 255, 0.04)' }}>
                  <p className="text-2xl font-semibold text-white">{selectedIngredient.calories}</p>
                  <p className="text-white/40 text-xs">kcal / 100g</p>
                </div>
                <div className="p-3 rounded-xl text-center" style={{ background: 'rgba(45, 212, 191, 0.1)' }}>
                  <p className="text-2xl font-semibold text-[#2dd4bf]">{selectedIngredient.protein}g</p>
                  <p className="text-white/40 text-xs">proteine</p>
                </div>
              </div>

              {/* Add Button */}
              <button onClick={() => togglePantryItem(selectedIngredient.id)} className="w-full p-4 rounded-2xl font-medium" style={{ background: pantryItems.includes(selectedIngredient.id) ? 'rgba(255, 255, 255, 0.1)' : 'linear-gradient(135deg, #d4a574 0%, #e8c9a8 100%)', color: pantryItems.includes(selectedIngredient.id) ? '#fff' : '#0a1628' }}>
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
