/*
 * KHORA Favorite Recipes Page
 * Design: Cosmic Nebula Interface - Saved recipes collection
 * Dedicated page for viewing and managing favorite recipes
 */

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Flame, Heart, Users, ArrowLeft, Trash2, Share2 } from "lucide-react";
import { Link, useLocation } from "wouter";
import CosmicBackground from "@/components/CosmicBackground";
import Navigation from "@/components/Navigation";
import { recipes, Recipe, getRecipesByIds } from "@/data/recipes";
import { useFavoriteRecipes } from "@/hooks/useFavoriteRecipes";

export default function FavoriteRecipes() {
  const [, setLocation] = useLocation();
  const { 
    favorites, 
    isFavorite, 
    toggleFavorite, 
    favoritesCount, 
    clearFavorites,
    getFavoriteIds 
  } = useFavoriteRecipes();

  // Get favorite recipes data
  const favoriteRecipes = getRecipesByIds(getFavoriteIds());

  // Sort by most recently added
  const sortedFavorites = [...favoriteRecipes].sort((a, b) => {
    const favA = favorites.find(f => f.id === a.id);
    const favB = favorites.find(f => f.id === b.id);
    if (!favA || !favB) return 0;
    return new Date(favB.addedAt).getTime() - new Date(favA.addedAt).getTime();
  });

  useEffect(() => {
    document.title = "Rețete Favorite | Khora";
  }, []);

  const handleFavoriteClick = (e: React.MouseEvent, recipeId: string) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(recipeId);
  };

  const handleClearAll = () => {
    if (window.confirm('Sigur vrei să ștergi toate rețetele favorite?')) {
      clearFavorites();
    }
  };

  const handleShare = async () => {
    const recipeNames = sortedFavorites.map(r => `• ${r.name}`).join('\n');
    const shareText = `🌱 Rețetele mele vegane favorite din Khora:\n\n${recipeNames}\n\nDescoperă și tu rețete sănătoase pe khora.app`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Rețetele mele favorite - Khora',
          text: shareText,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText);
      alert('Lista a fost copiată în clipboard!');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <CosmicBackground />
      
      <main className="relative z-10 min-h-screen pb-44">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-8 px-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setLocation('/recipes')}
              className="p-2 rounded-xl transition-all hover:bg-white/10"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <ArrowLeft className="w-5 h-5 text-white/60" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Rețete Favorite
              </h1>
              <p className="text-white/50 text-sm">
                {favoritesCount} {favoritesCount === 1 ? 'rețetă salvată' : 'rețete salvate'}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          {favoritesCount > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex gap-2"
            >
              <button
                onClick={handleShare}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all"
                style={{
                  background: 'rgba(0, 212, 170, 0.1)',
                  border: '1px solid rgba(0, 212, 170, 0.2)',
                }}
              >
                <Share2 className="w-4 h-4 text-[#00d4aa]" />
                <span className="text-[#00d4aa] text-sm font-medium">Distribuie Lista</span>
              </button>
              <button
                onClick={handleClearAll}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all hover:bg-red-500/20"
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                }}
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </motion.div>
          )}
        </motion.header>

        {/* Recipes Grid */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="px-6 py-6"
        >
          {sortedFavorites.length > 0 ? (
            <div className="grid gap-4">
              <AnimatePresence mode="popLayout">
                {sortedFavorites.map((recipe, index) => {
                  const favData = favorites.find(f => f.id === recipe.id);
                  const addedDate = favData ? new Date(favData.addedAt).toLocaleDateString('ro-RO') : '';
                  
                  return (
                    <motion.article
                      key={recipe.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      className="rounded-2xl overflow-hidden cursor-pointer"
                      style={{
                        background: 'rgba(255, 255, 255, 0.06)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      <div 
                        className="h-36 bg-cover bg-center relative"
                        style={{ 
                          backgroundImage: `url(${recipe.image})`,
                          backgroundColor: 'rgba(255,255,255,0.1)',
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        
                        {/* Remove from Favorites Button */}
                        <motion.button 
                          onClick={(e) => handleFavoriteClick(e, recipe.id)}
                          whileTap={{ scale: 0.9 }}
                          className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all"
                          style={{
                            background: 'rgba(239, 68, 68, 0.3)',
                            border: '1px solid rgba(239, 68, 68, 0.5)',
                          }}
                        >
                          <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                        </motion.button>

                        {/* Added Date Badge */}
                        <div
                          className="absolute top-3 left-3 px-2 py-1 rounded-full"
                          style={{
                            background: 'rgba(0, 0, 0, 0.4)',
                            backdropFilter: 'blur(10px)',
                          }}
                        >
                          <span className="text-xs text-white/70">Salvat {addedDate}</span>
                        </div>
                      </div>

                      <div className="p-4">
                        <h3 className="text-white font-semibold text-lg">{recipe.name}</h3>
                        <p className="text-white/40 text-sm mt-1 line-clamp-2">
                          {recipe.description}
                        </p>
                        <div className="flex items-center gap-4 mt-3 text-white/50 text-sm">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {recipe.displayTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <Flame className="w-4 h-4" />
                            {recipe.calories} cal
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {recipe.servings} porții
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
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div 
                className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <Heart className="w-12 h-12 text-white/20" />
              </div>
              <h3 className="text-white/60 text-xl font-semibold mb-2">
                Nicio rețetă favorită
              </h3>
              <p className="text-white/40 text-sm mb-8 max-w-xs mx-auto">
                Explorează rețetele noastre și apasă pe inimă pentru a le salva aici
              </p>
              <Link href="/recipes">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-xl font-medium"
                  style={{
                    background: 'linear-gradient(135deg, #00d4aa 0%, #00a388 100%)',
                    color: '#0a0f1a',
                  }}
                >
                  Descoperă Rețete
                </motion.button>
              </Link>
            </motion.div>
          )}
        </motion.section>

        {/* Quick Stats */}
        {favoritesCount > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="px-6 pb-8"
          >
            <div 
              className="rounded-2xl p-4"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <h4 className="text-white/40 text-xs uppercase tracking-wider mb-3">
                Sumar Nutrițional
              </h4>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-[#00d4aa] text-lg font-bold">
                    {Math.round(sortedFavorites.reduce((sum, r) => sum + r.nutrition.calories, 0) / sortedFavorites.length)}
                  </p>
                  <p className="text-white/40 text-xs">Cal/rețetă</p>
                </div>
                <div>
                  <p className="text-[#00d4aa] text-lg font-bold">
                    {Math.round(sortedFavorites.reduce((sum, r) => sum + r.nutrition.protein, 0) / sortedFavorites.length)}g
                  </p>
                  <p className="text-white/40 text-xs">Proteine</p>
                </div>
                <div>
                  <p className="text-[#00d4aa] text-lg font-bold">
                    {Math.round(sortedFavorites.reduce((sum, r) => sum + r.nutrition.fiber, 0) / sortedFavorites.length)}g
                  </p>
                  <p className="text-white/40 text-xs">Fibre</p>
                </div>
                <div>
                  <p className="text-[#00d4aa] text-lg font-bold">
                    {Math.round(sortedFavorites.reduce((sum, r) => sum + parseInt(r.displayTime), 0) / sortedFavorites.length)}
                  </p>
                  <p className="text-white/40 text-xs">Min/rețetă</p>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </main>

      <Navigation />
    </div>
  );
}
