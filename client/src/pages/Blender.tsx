/*
 * KHORA Blender Page - Recipe Generator
 * Design: Premium Apple Glass - Clean, functional
 * ALL ingredients available, no limits
 */

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChefHat, Clock, Users, ArrowLeft, Plus, X, Search, Flame, Trash2, Check, Sparkles } from "lucide-react";
import { Link } from "wouter";
import CosmicBackground from "@/components/CosmicBackground";
import Navigation from "@/components/Navigation";
import { ingredients, categories, searchIngredients, getIngredientsByCategory, type Ingredient } from "@/data/ingredients";

// Recipe database
const recipeDatabase = [
  {
    id: "r1",
    name: "Buddha Bowl cu Quinoa",
    time: "25 min",
    servings: 2,
    difficulty: "Ușor",
    calories: 420,
    requiredCategories: ["cereale", "legume-frunze", "leguminoase"],
    ingredients: ["Quinoa", "Năut", "Avocado", "Spanac", "Roșii cherry", "Tahini"],
    steps: [
      "Fierbe quinoa conform instrucțiunilor de pe pachet",
      "Prăjește năutul cu puțin ulei și condimente",
      "Taie avocado și roșiile cherry",
      "Aranjează toate ingredientele în bol",
      "Adaugă dressing de tahini deasupra"
    ]
  },
  {
    id: "r2",
    name: "Smoothie Verde Energizant",
    time: "5 min",
    servings: 1,
    difficulty: "Ușor",
    calories: 180,
    requiredCategories: ["fructe", "legume-frunze", "lapte-vegetal"],
    ingredients: ["Banană", "Spanac", "Lapte de migdale", "Semințe de chia"],
    steps: [
      "Pune toate ingredientele în blender",
      "Mixează până obții o consistență cremoasă",
      "Servește imediat"
    ]
  },
  {
    id: "r3",
    name: "Curry de Linte Roșie",
    time: "35 min",
    servings: 4,
    difficulty: "Mediu",
    calories: 320,
    requiredCategories: ["leguminoase", "legume-fructe", "condimente"],
    ingredients: ["Linte roșie", "Lapte de cocos", "Roșii", "Ceapă", "Usturoi", "Curry", "Turmeric"],
    steps: [
      "Călește ceapa și usturoiul",
      "Adaugă condimentele și prăjește 1 minut",
      "Adaugă lintea și roșiile",
      "Toarnă laptele de cocos și lasă să fiarbă 25 minute",
      "Servește cu orez"
    ]
  },
  {
    id: "r4",
    name: "Salată Mediteraneană",
    time: "15 min",
    servings: 2,
    difficulty: "Ușor",
    calories: 280,
    requiredCategories: ["legume-fructe", "uleiuri"],
    ingredients: ["Castraveți", "Roșii", "Ceapă roșie", "Măsline", "Ulei de măsline", "Lămâie"],
    steps: [
      "Taie legumele în cuburi",
      "Amestecă într-un bol mare",
      "Adaugă măslinele",
      "Stropește cu ulei de măsline și suc de lămâie",
      "Condimentează cu sare și piper"
    ]
  },
  {
    id: "r5",
    name: "Hummus Clasic",
    time: "10 min",
    servings: 4,
    difficulty: "Ușor",
    calories: 150,
    requiredCategories: ["leguminoase", "nuci-seminte"],
    ingredients: ["Năut", "Tahini", "Usturoi", "Lămâie", "Ulei de măsline"],
    steps: [
      "Scurge năutul și păstrează puțin lichid",
      "Pune năutul în blender cu tahini și usturoi",
      "Adaugă suc de lămâie și mixează",
      "Adaugă lichid până la consistența dorită",
      "Servește cu ulei de măsline deasupra"
    ]
  },
  {
    id: "r6",
    name: "Paste cu Pesto de Busuioc",
    time: "20 min",
    servings: 2,
    difficulty: "Ușor",
    calories: 450,
    requiredCategories: ["fainuri", "nuci-seminte", "ierburi"],
    ingredients: ["Paste", "Busuioc", "Nuci de pin", "Usturoi", "Ulei de măsline", "Drojdie nutritivă"],
    steps: [
      "Fierbe pastele al dente",
      "Mixează busuiocul cu nucile, usturoiul și uleiul",
      "Adaugă drojdia nutritivă pentru un gust de brânză",
      "Amestecă pastele cu pesto",
      "Servește imediat"
    ]
  },
  {
    id: "r7",
    name: "Supă Cremă de Dovleac",
    time: "40 min",
    servings: 4,
    difficulty: "Mediu",
    calories: 180,
    requiredCategories: ["legume-fructe", "lapte-vegetal", "condimente"],
    ingredients: ["Dovleac", "Ceapă", "Usturoi", "Lapte de cocos", "Ghimbir"],
    steps: [
      "Coace dovleacul la cuptor 30 minute",
      "Călește ceapa și usturoiul",
      "Adaugă dovleacul copt și laptele de cocos",
      "Mixează până devine cremos",
      "Condimentează cu ghimbir și servește"
    ]
  },
  {
    id: "r8",
    name: "Tofu Scramble",
    time: "15 min",
    servings: 2,
    difficulty: "Ușor",
    calories: 220,
    requiredCategories: ["proteine-vegetale", "legume-fructe", "condimente"],
    ingredients: ["Tofu", "Turmeric", "Ceapă", "Ardei", "Spanac", "Drojdie nutritivă"],
    steps: [
      "Sfărâmă tofu-ul cu mâinile",
      "Călește ceapa și ardeiul",
      "Adaugă tofu-ul și turmericul",
      "Prăjește 5-7 minute",
      "Adaugă spanacul și drojdia nutritivă"
    ]
  },
  {
    id: "r9",
    name: "Overnight Oats cu Fructe",
    time: "5 min + noapte",
    servings: 1,
    difficulty: "Ușor",
    calories: 350,
    requiredCategories: ["cereale", "lapte-vegetal", "fructe"],
    ingredients: ["Ovăz", "Lapte de ovăz", "Semințe de chia", "Banană", "Afine", "Sirop de arțar"],
    steps: [
      "Amestecă ovăzul cu laptele vegetal",
      "Adaugă semințele de chia",
      "Lasă la frigider peste noapte",
      "Dimineața adaugă fructele proaspete",
      "Îndulcește cu sirop de arțar"
    ]
  },
  {
    id: "r10",
    name: "Stir-Fry Asian cu Tofu",
    time: "25 min",
    servings: 2,
    difficulty: "Mediu",
    calories: 380,
    requiredCategories: ["proteine-vegetale", "legume-fructe", "fermentate"],
    ingredients: ["Tofu", "Broccoli", "Ardei", "Morcovi", "Sos de soia", "Ghimbir", "Usturoi"],
    steps: [
      "Presează și taie tofu-ul în cuburi",
      "Prăjește tofu-ul până devine auriu",
      "Călește legumele în wok",
      "Adaugă sosul de soia și condimentele",
      "Servește cu orez"
    ]
  },
  {
    id: "r11",
    name: "Energy Balls cu Curmale",
    time: "15 min",
    servings: 12,
    difficulty: "Ușor",
    calories: 95,
    requiredCategories: ["nuci-seminte", "fructe", "superfoods"],
    ingredients: ["Curmale", "Migdale", "Cacao raw", "Cocos", "Semințe de chia"],
    steps: [
      "Pune curmalele în blender",
      "Adaugă migdalele și mixează",
      "Adaugă cacao și semințele",
      "Formează bile mici",
      "Rulează în fulgi de cocos"
    ]
  },
  {
    id: "r12",
    name: "Wrap cu Falafel",
    time: "30 min",
    servings: 4,
    difficulty: "Mediu",
    calories: 420,
    requiredCategories: ["leguminoase", "fainuri", "legume-fructe"],
    ingredients: ["Năut", "Pătrunjel", "Ceapă", "Usturoi", "Lipie", "Salată", "Roșii", "Tahini"],
    steps: [
      "Mixează năutul cu ierburile și condimentele",
      "Formează chifteluțe și prăjește-le",
      "Încălzește lipiile",
      "Asamblează wrap-ul cu legume și falafel",
      "Adaugă sos de tahini"
    ]
  }
];

export default function Blender() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showRecipes, setShowRecipes] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<typeof recipeDatabase[0] | null>(null);

  // Get ALL ingredients based on search or category - NO LIMITS
  const displayedIngredients = useMemo(() => {
    if (searchQuery) {
      return searchIngredients(searchQuery);
    }
    if (selectedCategory) {
      return getIngredientsByCategory(selectedCategory);
    }
    // Show all healthy ingredients by default, sorted by health score
    return ingredients
      .filter(i => !i.isJunkFood)
      .sort((a, b) => b.healthScore - a.healthScore);
  }, [searchQuery, selectedCategory]);

  const selectedItems = useMemo(() => 
    ingredients.filter(i => selectedIngredients.includes(i.id)),
    [selectedIngredients]
  );

  // Calculate matching recipes
  const matchingRecipes = useMemo(() => {
    if (selectedIngredients.length < 2) return [];
    
    const selectedCats = new Set(selectedItems.map(i => i.category));
    
    return recipeDatabase
      .map(recipe => {
        const matchCount = recipe.requiredCategories.filter(cat => selectedCats.has(cat)).length;
        const matchPercent = Math.round((matchCount / recipe.requiredCategories.length) * 100);
        return { ...recipe, matchPercent };
      })
      .filter(r => r.matchPercent >= 33)
      .sort((a, b) => b.matchPercent - a.matchPercent);
  }, [selectedIngredients, selectedItems]);

  const toggleIngredient = (id: string) => {
    setSelectedIngredients(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  const clearAll = () => {
    setSelectedIngredients([]);
    setShowRecipes(false);
  };

  const generateRecipes = () => {
    if (selectedIngredients.length >= 2) {
      setShowRecipes(true);
    }
  };

  // Recipe Detail View
  if (selectedRecipe) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <CosmicBackground />
        <main className="relative z-10 min-h-screen pb-32 px-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setSelectedRecipe(null)}
            className="flex items-center gap-2 pt-8 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Înapoi la rețete
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <h1 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              {selectedRecipe.name}
            </h1>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 text-white/60">
                <Clock className="w-4 h-4" />
                {selectedRecipe.time}
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <Users className="w-4 h-4" />
                {selectedRecipe.servings} porții
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <Flame className="w-4 h-4" />
                {selectedRecipe.calories} kcal/porție
              </div>
            </div>

            <div 
              className="p-5 rounded-2xl mb-6"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <h3 className="text-white font-semibold mb-3">Ingrediente</h3>
              <ul className="space-y-2">
                {selectedRecipe.ingredients.map((ing, i) => (
                  <li key={i} className="text-white/70 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00d4aa]" />
                    {ing}
                  </li>
                ))}
              </ul>
            </div>

            <div 
              className="p-5 rounded-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <h3 className="text-white font-semibold mb-3">Pași de preparare</h3>
              <ol className="space-y-4">
                {selectedRecipe.steps.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span 
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium"
                      style={{
                        background: 'rgba(0, 212, 170, 0.2)',
                        color: '#00d4aa',
                      }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-white/70">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        </main>
        <Navigation />
      </div>
    );
  }

  // Recipes List View
  if (showRecipes) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <CosmicBackground />
        <main className="relative z-10 min-h-screen pb-32 px-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setShowRecipes(false)}
            className="flex items-center gap-2 pt-8 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Înapoi la ingrediente
          </motion.button>

          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-white mt-6 mb-2"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Rețete Sugerate
          </motion.h1>
          <p className="text-white/50 text-sm mb-6">
            {matchingRecipes.length} rețete bazate pe {selectedIngredients.length} ingrediente
          </p>

          <div className="space-y-4">
            {matchingRecipes.length > 0 ? (
              matchingRecipes.map((recipe, index) => (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedRecipe(recipe)}
                  className="p-5 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-white font-semibold text-lg">{recipe.name}</h3>
                    <span 
                      className="px-2 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: recipe.matchPercent >= 80 
                          ? 'rgba(0, 212, 170, 0.2)' 
                          : recipe.matchPercent >= 50
                          ? 'rgba(251, 191, 36, 0.2)'
                          : 'rgba(255, 255, 255, 0.1)',
                        color: recipe.matchPercent >= 80 ? '#00d4aa' : recipe.matchPercent >= 50 ? '#fbbf24' : '#fff',
                      }}
                    >
                      {recipe.matchPercent}% potrivire
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-white/50 text-sm">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {recipe.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="w-4 h-4" />
                      {recipe.calories} kcal
                    </span>
                    <span>{recipe.difficulty}</span>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <ChefHat className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <p className="text-white/40 mb-2">
                  Nu am găsit rețete potrivite
                </p>
                <p className="text-white/30 text-sm">
                  Încearcă să adaugi mai multe ingrediente din categorii diferite
                </p>
              </div>
            )}
          </div>
        </main>
        <Navigation />
      </div>
    );
  }

  // Main Ingredient Selection View
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
              <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Generator Rețete
              </h1>
              <p className="text-white/50 text-sm">
                {selectedIngredients.length} ingrediente selectate
              </p>
            </div>
            
            {selectedIngredients.length > 0 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearAll}
                className="px-3 py-2 rounded-xl flex items-center gap-2 text-sm"
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  color: '#ef4444',
                }}
              >
                <Trash2 className="w-4 h-4" />
                Șterge
              </motion.button>
            )}
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
            <input
              type="text"
              placeholder="Caută ingrediente..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedCategory(null);
              }}
              className="w-full pl-12 pr-4 py-3 rounded-xl text-white placeholder-white/30 outline-none"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            />
          </div>

          {/* Categories - ALL categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSearchQuery("");
              }}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-all"
              style={{
                background: !selectedCategory ? 'rgba(0, 212, 170, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${!selectedCategory ? 'rgba(0, 212, 170, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
                color: !selectedCategory ? '#00d4aa' : 'rgba(255, 255, 255, 0.6)',
              }}
            >
              Toate
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSearchQuery("");
                }}
                className="flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap"
                style={{
                  background: selectedCategory === cat.id ? `${cat.color}20` : 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${selectedCategory === cat.id ? `${cat.color}40` : 'rgba(255, 255, 255, 0.1)'}`,
                  color: selectedCategory === cat.id ? cat.color : 'rgba(255, 255, 255, 0.6)',
                }}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </motion.header>

        {/* Selected Ingredients Bar */}
        <AnimatePresence>
          {selectedIngredients.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="px-6 py-3"
            >
              <div 
                className="p-4 rounded-2xl"
                style={{
                  background: 'rgba(0, 212, 170, 0.05)',
                  border: '1px solid rgba(0, 212, 170, 0.1)',
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white/60 text-sm">Selectate:</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={generateRecipes}
                    disabled={selectedIngredients.length < 2}
                    className="px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all disabled:opacity-50"
                    style={{
                      background: selectedIngredients.length >= 2 
                        ? 'linear-gradient(135deg, #00d4aa 0%, #00b894 100%)'
                        : 'rgba(255, 255, 255, 0.1)',
                      color: selectedIngredients.length >= 2 ? '#0a0a0f' : 'rgba(255, 255, 255, 0.4)',
                    }}
                  >
                    <Sparkles className="w-4 h-4" />
                    Generează ({matchingRecipes.length})
                  </motion.button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedItems.slice(0, 10).map(ing => (
                    <motion.span
                      key={ing.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="px-2 py-1 rounded-full text-xs flex items-center gap-1"
                      style={{
                        background: `${ing.color}20`,
                        border: `1px solid ${ing.color}30`,
                        color: ing.color,
                      }}
                    >
                      {ing.name}
                      <button onClick={() => toggleIngredient(ing.id)}>
                        <X className="w-3 h-3" />
                      </button>
                    </motion.span>
                  ))}
                  {selectedItems.length > 10 && (
                    <span className="text-white/40 text-xs px-2 py-1">
                      +{selectedItems.length - 10} altele
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ingredients Grid - ALL ingredients */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-6 pt-2"
        >
          <p className="text-white/40 text-xs mb-3">
            {displayedIngredients.length} ingrediente disponibile
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
            {displayedIngredients.map((ing, index) => {
              const isSelected = selectedIngredients.includes(ing.id);
              return (
                <motion.button
                  key={ing.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: Math.min(index * 0.01, 0.5) }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => toggleIngredient(ing.id)}
                  className="p-3 rounded-xl text-left transition-all relative"
                  style={{
                    background: isSelected 
                      ? `${ing.color}15`
                      : 'rgba(255, 255, 255, 0.03)',
                    border: `1px solid ${isSelected ? `${ing.color}40` : 'rgba(255, 255, 255, 0.06)'}`,
                  }}
                >
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center"
                      style={{ background: ing.color }}
                    >
                      <Check className="w-2.5 h-2.5 text-black" />
                    </motion.div>
                  )}
                  <span className="text-xl block mb-1">{ing.emoji}</span>
                  <span className="text-white text-xs font-medium block truncate">{ing.name}</span>
                  <span className="text-white/30 text-[10px]">{ing.protein}g</span>
                  {ing.isJunkFood && (
                    <span 
                      className="absolute bottom-1 right-1 text-[8px] px-1 rounded"
                      style={{ background: 'rgba(239, 68, 68, 0.3)', color: '#ef4444' }}
                    >
                      JF
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
          
          {displayedIngredients.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white/40">Nu s-au găsit ingrediente</p>
            </div>
          )}
        </motion.section>
      </main>

      <Navigation />
    </div>
  );
}
