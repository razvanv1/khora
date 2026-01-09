/*
 * KHORA Blender Page - Digital Blender / Smart Chef
 * Design: Cosmic Nebula Interface - Central energy orb with drag-drop
 * Features: Recipe generation, ingredient combination, AI suggestions
 */

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChefHat, Clock, Flame, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import CosmicBackground from "@/components/CosmicBackground";
import Navigation from "@/components/Navigation";
import IngredientSphere from "@/components/IngredientSphere";
import { ingredients, type Ingredient } from "@/data/ingredients";

// Sample recipes that can be generated
const sampleRecipes = [
  {
    id: "r1",
    name: "Golden Buddha Bowl",
    image: "/images/khora_recipe_card.png",
    time: "25 min",
    match: 95,
    ingredients: ["c003", "l004", "v001", "v010", "n010"],
    description: "A nourishing bowl with quinoa, roasted chickpeas, fresh greens, and tahini drizzle.",
  },
  {
    id: "r2",
    name: "Tropical Green Smoothie",
    image: "/images/khora_home_pantry.png",
    time: "5 min",
    match: 88,
    ingredients: ["f001", "f007", "v001", "d001", "s005"],
    description: "Energizing blend of mango, banana, spinach, and matcha.",
  },
  {
    id: "r3",
    name: "Mediterranean Lentil Stew",
    image: "/images/khora_digital_blender.png",
    time: "35 min",
    match: 92,
    ingredients: ["l001", "v008", "v015", "v016", "s009"],
    description: "Hearty red lentil stew with tomatoes, garlic, and turmeric.",
  },
];

export default function Blender() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [isBlending, setIsBlending] = useState(false);
  const [generatedRecipes, setGeneratedRecipes] = useState<typeof sampleRecipes>([]);
  const [showRecipes, setShowRecipes] = useState(false);

  const selectedItems = useMemo(() => 
    ingredients.filter(i => selectedIngredients.includes(i.id)),
    [selectedIngredients]
  );

  const suggestedIngredients = useMemo(() => 
    ingredients.slice(0, 12).filter(i => !selectedIngredients.includes(i.id)),
    [selectedIngredients]
  );

  const toggleIngredient = (id: string) => {
    setSelectedIngredients(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  const handleBlend = async () => {
    if (selectedIngredients.length < 2) return;
    
    setIsBlending(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate recipes based on selected ingredients
    const recipes = sampleRecipes.map(recipe => ({
      ...recipe,
      match: Math.floor(Math.random() * 20) + 80,
    })).sort((a, b) => b.match - a.match);
    
    setGeneratedRecipes(recipes);
    setIsBlending(false);
    setShowRecipes(true);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <CosmicBackground />
      
      <main className="relative z-10 min-h-screen pb-32">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-8 px-6 text-center"
        >
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Digital Blender
          </h1>
          <p className="text-white/50 text-sm">
            Combine. Create. Discover.
          </p>
        </motion.header>

        {!showRecipes ? (
          <>
            {/* Central Blender Orb */}
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center justify-center py-8"
            >
              {/* The Blender */}
              <motion.div
                animate={{
                  scale: isBlending ? [1, 1.2, 1] : 1,
                  rotate: isBlending ? 360 : 0,
                }}
                transition={{
                  duration: isBlending ? 2 : 0,
                  repeat: isBlending ? Infinity : 0,
                  ease: "linear",
                }}
                onClick={handleBlend}
                className="relative w-48 h-48 cursor-pointer"
              >
                {/* Outer Glow Rings */}
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(0, 212, 170, 0.3) 0%, transparent 70%)',
                    filter: 'blur(20px)',
                  }}
                />
                
                {/* Inner Orb */}
                <div
                  className="absolute inset-4 rounded-full flex items-center justify-center"
                  style={{
                    background: `
                      radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 50%),
                      linear-gradient(135deg, rgba(0, 212, 170, 0.3) 0%, rgba(139, 92, 246, 0.2) 100%)
                    `,
                    boxShadow: `
                      0 0 60px rgba(0, 212, 170, 0.4),
                      0 0 0 1px rgba(255, 255, 255, 0.1) inset
                    `,
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  {isBlending ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-12 h-12 text-[#00d4aa]" />
                    </motion.div>
                  ) : (
                    <ChefHat className="w-12 h-12 text-white/80" />
                  )}
                </div>

                {/* Selected Ingredients orbiting */}
                {selectedItems.slice(0, 6).map((ingredient, index) => {
                  const angle = (index / Math.min(selectedItems.length, 6)) * Math.PI * 2;
                  const radius = 90;
                  
                  return (
                    <motion.div
                      key={ingredient.id}
                      animate={{
                        x: Math.cos(angle + (isBlending ? Date.now() / 500 : 0)) * radius,
                        y: Math.sin(angle + (isBlending ? Date.now() / 500 : 0)) * radius,
                      }}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                        style={{
                          background: 'rgba(255,255,255,0.1)',
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(255,255,255,0.2)',
                        }}
                      >
                        {ingredient.emoji}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Blend Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBlend}
                disabled={selectedIngredients.length < 2 || isBlending}
                className="mt-8 px-8 py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50"
                style={{
                  background: selectedIngredients.length >= 2 
                    ? 'linear-gradient(135deg, #00d4aa 0%, #00a388 100%)'
                    : 'rgba(255, 255, 255, 0.1)',
                  color: selectedIngredients.length >= 2 ? '#0a0f1a' : 'rgba(255,255,255,0.5)',
                  boxShadow: selectedIngredients.length >= 2 
                    ? '0 8px 32px rgba(0, 212, 170, 0.3)'
                    : 'none',
                }}
              >
                {isBlending ? 'Creating Magic...' : `Blend ${selectedIngredients.length} Ingredients`}
              </motion.button>
            </motion.section>

            {/* Selected Ingredients */}
            {selectedItems.length > 0 && (
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-6 mb-6"
              >
                <h2 className="text-sm font-medium text-white/60 mb-3">Selected Ingredients</h2>
                <div className="flex flex-wrap gap-2">
                  {selectedItems.map(ingredient => (
                    <motion.button
                      key={ingredient.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => toggleIngredient(ingredient.id)}
                      className="px-3 py-1.5 rounded-full text-sm flex items-center gap-2"
                      style={{
                        background: `${ingredient.color}20`,
                        border: `1px solid ${ingredient.color}40`,
                      }}
                    >
                      <span>{ingredient.emoji}</span>
                      <span className="text-white/80">{ingredient.name}</span>
                      <span className="text-white/40">×</span>
                    </motion.button>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Suggested Ingredients */}
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="px-6"
            >
              <h2 className="text-sm font-medium text-white/60 mb-3">Add Ingredients</h2>
              <div className="flex flex-wrap gap-4 justify-center">
                {suggestedIngredients.map((ingredient, index) => (
                  <motion.div
                    key={ingredient.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <IngredientSphere
                      {...ingredient}
                      size="sm"
                      selected={selectedIngredients.includes(ingredient.id)}
                      onClick={() => toggleIngredient(ingredient.id)}
                    />
                  </motion.div>
                ))}
              </div>
              
              <Link href="/pantry">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="w-full mt-6 py-3 rounded-xl text-white/60 text-sm transition-colors hover:text-white"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  Browse All Ingredients →
                </motion.button>
              </Link>
            </motion.section>
          </>
        ) : (
          /* Generated Recipes */
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-6 py-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Your Recipes</h2>
              <button
                onClick={() => {
                  setShowRecipes(false);
                  setGeneratedRecipes([]);
                }}
                className="text-white/50 text-sm hover:text-white"
              >
                ← Try Again
              </button>
            </div>

            <div className="space-y-4">
              {generatedRecipes.map((recipe, index) => (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-2xl cursor-pointer"
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div className="flex gap-4">
                    <div 
                      className="w-24 h-24 rounded-xl bg-cover bg-center flex-shrink-0"
                      style={{ 
                        backgroundImage: `url(${recipe.image})`,
                        backgroundColor: 'rgba(255,255,255,0.1)',
                      }}
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h3 className="text-white font-semibold">{recipe.name}</h3>
                        <span 
                          className="text-xs px-2 py-1 rounded-full"
                          style={{
                            background: 'rgba(0, 212, 170, 0.2)',
                            color: '#00d4aa',
                          }}
                        >
                          {recipe.match}% match
                        </span>
                      </div>
                      <p className="text-white/50 text-sm mt-1 line-clamp-2">{recipe.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-white/40 text-xs">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {recipe.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Flame className="w-3 h-3" />
                          {recipe.ingredients.length} ingredients
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </main>

      <Navigation />
    </div>
  );
}
