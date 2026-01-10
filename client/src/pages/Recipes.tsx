/*
 * KHORA Recipes Page
 * Design: Cosmic Nebula Interface - Recipe cards gallery
 * Includes Schema.org structured data for recipes (SEO)
 * With favorite recipes functionality
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Flame, Heart, ChefHat, Users, Filter, Star } from "lucide-react";
import { Link } from "wouter";
import CosmicBackground from "@/components/CosmicBackground";
import Navigation from "@/components/Navigation";
import { recipes, Recipe, getAllCategories, getAllTags } from "@/data/recipes";
import { useFavoriteRecipes } from "@/hooks/useFavoriteRecipes";

// Generate Schema.org Recipe structured data
function generateRecipeSchema(recipe: Recipe) {
  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    "name": recipe.name,
    "description": recipe.description,
    "image": recipe.image,
    "author": {
      "@type": "Organization",
      "name": "Khora - Nutriție Vegană"
    },
    "datePublished": "2025-01-01",
    "prepTime": recipe.prepTime,
    "cookTime": recipe.cookTime,
    "totalTime": recipe.totalTime,
    "recipeYield": `${recipe.servings} porții`,
    "recipeCategory": recipe.category,
    "recipeCuisine": recipe.cuisine,
    "keywords": recipe.tags.join(", "),
    "recipeIngredient": recipe.ingredients,
    "recipeInstructions": recipe.instructions.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "text": step
    })),
    "nutrition": {
      "@type": "NutritionInformation",
      "calories": `${recipe.nutrition.calories} kcal`,
      "proteinContent": `${recipe.nutrition.protein}g`,
      "carbohydrateContent": `${recipe.nutrition.carbs}g`,
      "fatContent": `${recipe.nutrition.fat}g`,
      "fiberContent": `${recipe.nutrition.fiber}g`
    },
    "suitableForDiet": "https://schema.org/VeganDiet"
  };
}

// Generate ItemList schema for recipe collection
function generateRecipeListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Rețete Vegane Khora",
    "description": "Colecție de rețete vegane sănătoase și delicioase",
    "numberOfItems": recipes.length,
    "itemListElement": recipes.map((recipe, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Recipe",
        "name": recipe.name,
        "url": `https://khora.manus.space/recipes/${recipe.id}`
      }
    }))
  };
}

type FilterType = 'all' | 'favorites' | string;

export default function Recipes() {
  const { isFavorite, toggleFavorite, favoritesCount } = useFavoriteRecipes();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [showFilters, setShowFilters] = useState(false);
  
  const categories = getAllCategories();
  const tags = getAllTags();

  // Filter recipes based on active filter
  const filteredRecipes = recipes.filter(recipe => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'favorites') return isFavorite(recipe.id);
    // Check if filter is a category or tag
    if (categories.includes(activeFilter)) return recipe.category === activeFilter;
    if (tags.includes(activeFilter)) return recipe.tags.includes(activeFilter);
    return true;
  });

  // Inject Schema.org structured data
  useEffect(() => {
    // Remove existing schema scripts
    const existingSchemas = document.querySelectorAll('script[data-schema="recipes"]');
    existingSchemas.forEach(el => el.remove());

    // Add ItemList schema for the collection
    const listSchema = document.createElement('script');
    listSchema.type = 'application/ld+json';
    listSchema.setAttribute('data-schema', 'recipes');
    listSchema.textContent = JSON.stringify(generateRecipeListSchema());
    document.head.appendChild(listSchema);

    // Add individual Recipe schemas
    recipes.forEach(recipe => {
      const recipeSchema = document.createElement('script');
      recipeSchema.type = 'application/ld+json';
      recipeSchema.setAttribute('data-schema', 'recipes');
      recipeSchema.textContent = JSON.stringify(generateRecipeSchema(recipe));
      document.head.appendChild(recipeSchema);
    });

    // Update page title
    document.title = "Rețete Vegane | Khora";

    // Cleanup on unmount
    return () => {
      const schemas = document.querySelectorAll('script[data-schema="recipes"]');
      schemas.forEach(el => el.remove());
    };
  }, []);

  const handleFavoriteClick = (e: React.MouseEvent, recipeId: string) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(recipeId);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <CosmicBackground />
      
      <main className="relative z-10 min-h-screen pb-44">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-8 px-6"
        >
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Rețete Vegane
            </h1>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 rounded-xl transition-all"
              style={{
                background: showFilters ? 'rgba(0, 212, 170, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                border: showFilters ? '1px solid rgba(0, 212, 170, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Filter className={`w-5 h-5 ${showFilters ? 'text-[#00d4aa]' : 'text-white/60'}`} />
            </button>
          </div>
          <p className="text-white/50 text-sm">
            {filteredRecipes.length} rețete {activeFilter === 'favorites' && `• ${favoritesCount} favorite`}
          </p>
        </motion.header>

        {/* Filter Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="px-6 py-4"
        >
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeFilter === 'all' 
                  ? 'bg-[#00d4aa] text-[#0a0f1a]' 
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              Toate
            </button>
            <button
              onClick={() => setActiveFilter('favorites')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                activeFilter === 'favorites' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              <Heart className={`w-4 h-4 ${activeFilter === 'favorites' ? 'fill-white' : ''}`} />
              Favorite {favoritesCount > 0 && `(${favoritesCount})`}
            </button>
          </div>

          {/* Extended Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pt-4 space-y-3">
                  {/* Categories */}
                  <div>
                    <p className="text-white/40 text-xs mb-2 uppercase tracking-wider">Categorii</p>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(category => (
                        <button
                          key={category}
                          onClick={() => setActiveFilter(category)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                            activeFilter === category 
                              ? 'bg-[#00d4aa]/20 text-[#00d4aa] border border-[#00d4aa]/30' 
                              : 'bg-white/5 text-white/50 hover:bg-white/10'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <p className="text-white/40 text-xs mb-2 uppercase tracking-wider">Etichete</p>
                    <div className="flex flex-wrap gap-2">
                      {tags.map(tag => (
                        <button
                          key={tag}
                          onClick={() => setActiveFilter(tag)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                            activeFilter === tag 
                              ? 'bg-[#00d4aa]/20 text-[#00d4aa] border border-[#00d4aa]/30' 
                              : 'bg-white/5 text-white/50 hover:bg-white/10'
                          }`}
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {activeFilter !== 'all' && (
                    <button
                      onClick={() => setActiveFilter('all')}
                      className="text-[#00d4aa] text-sm hover:underline"
                    >
                      Șterge filtrele
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="px-6 pb-8"
        >
          {filteredRecipes.length > 0 ? (
            <div className="grid gap-4">
              <AnimatePresence mode="popLayout">
                {filteredRecipes.map((recipe, index) => (
                  <motion.article
                    key={recipe.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    className="rounded-2xl overflow-hidden cursor-pointer"
                    style={{
                      background: 'rgba(255, 255, 255, 0.06)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                    itemScope
                    itemType="https://schema.org/Recipe"
                  >
                    <meta itemProp="name" content={recipe.name} />
                    <meta itemProp="description" content={recipe.description} />
                    <meta itemProp="totalTime" content={recipe.totalTime} />
                    
                    <div 
                      className="h-40 bg-cover bg-center relative"
                      style={{ 
                        backgroundImage: `url(${recipe.image})`,
                        backgroundColor: 'rgba(255,255,255,0.1)',
                      }}
                    >
                      <img 
                        itemProp="image" 
                        src={recipe.image} 
                        alt={recipe.name}
                        className="hidden"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      
                      {/* Favorite Button */}
                      <motion.button 
                        onClick={(e) => handleFavoriteClick(e, recipe.id)}
                        whileTap={{ scale: 0.9 }}
                        className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all"
                        style={{
                          background: isFavorite(recipe.id) 
                            ? 'rgba(239, 68, 68, 0.3)' 
                            : 'rgba(0, 0, 0, 0.3)',
                          border: isFavorite(recipe.id)
                            ? '1px solid rgba(239, 68, 68, 0.5)'
                            : '1px solid rgba(255, 255, 255, 0.2)',
                        }}
                      >
                        <Heart 
                          className={`w-5 h-5 transition-all ${
                            isFavorite(recipe.id) 
                              ? 'fill-red-500 text-red-500' 
                              : 'text-white hover:text-red-400'
                          }`} 
                        />
                      </motion.button>

                      {/* Favorite Badge */}
                      {isFavorite(recipe.id) && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute top-3 left-3 px-2 py-1 rounded-full flex items-center gap-1"
                          style={{
                            background: 'rgba(239, 68, 68, 0.2)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                          }}
                        >
                          <Star className="w-3 h-3 text-red-400 fill-red-400" />
                          <span className="text-xs text-red-400 font-medium">Favorit</span>
                        </motion.div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-semibold text-lg" itemProp="name">{recipe.name}</h3>
                      <p className="text-white/40 text-sm mt-1 line-clamp-2" itemProp="description">
                        {recipe.description}
                      </p>
                      <div className="flex items-center gap-4 mt-3 text-white/50 text-sm">
                        <span className="flex items-center gap-1" itemProp="totalTime" content={recipe.totalTime}>
                          <Clock className="w-4 h-4" />
                          {recipe.displayTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Flame className="w-4 h-4" />
                          <span itemProp="nutrition" itemScope itemType="https://schema.org/NutritionInformation">
                            <span itemProp="calories">{recipe.calories} cal</span>
                          </span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span itemProp="recipeYield">{recipe.servings} porții</span>
                        </span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        {recipe.tags.map(tag => (
                          <span 
                            key={tag}
                            className="text-xs px-2 py-1 rounded-full"
                            style={{
                              background: 'rgba(0, 212, 170, 0.15)',
                              color: '#00d4aa',
                            }}
                            itemProp="keywords"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-20">
              {activeFilter === 'favorites' ? (
                <>
                  <Heart className="w-16 h-16 text-white/20 mx-auto mb-4" />
                  <h3 className="text-white/60 text-lg mb-2">Nicio rețetă favorită</h3>
                  <p className="text-white/40 text-sm mb-6">
                    Apasă pe inimă pentru a salva rețetele preferate
                  </p>
                  <motion.button
                    onClick={() => setActiveFilter('all')}
                    whileHover={{ scale: 1.05 }}
                    className="px-6 py-3 rounded-xl font-medium"
                    style={{
                      background: 'linear-gradient(135deg, #00d4aa 0%, #00a388 100%)',
                      color: '#0a0f1a',
                    }}
                  >
                    Vezi Toate Rețetele
                  </motion.button>
                </>
              ) : (
                <>
                  <ChefHat className="w-16 h-16 text-white/20 mx-auto mb-4" />
                  <h3 className="text-white/60 text-lg mb-2">Nicio rețetă găsită</h3>
                  <p className="text-white/40 text-sm mb-6">Încearcă alt filtru</p>
                  <motion.button
                    onClick={() => setActiveFilter('all')}
                    whileHover={{ scale: 1.05 }}
                    className="px-6 py-3 rounded-xl font-medium"
                    style={{
                      background: 'linear-gradient(135deg, #00d4aa 0%, #00a388 100%)',
                      color: '#0a0f1a',
                    }}
                  >
                    Șterge Filtrele
                  </motion.button>
                </>
              )}
            </div>
          )}
        </motion.section>
      </main>

      <Navigation />
    </div>
  );
}
