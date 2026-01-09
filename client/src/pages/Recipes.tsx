/*
 * KHORA Recipes Page
 * Design: Cosmic Nebula Interface - Recipe cards gallery
 */

import { motion } from "framer-motion";
import { Clock, Flame, Heart, ChefHat } from "lucide-react";
import { Link } from "wouter";
import CosmicBackground from "@/components/CosmicBackground";
import Navigation from "@/components/Navigation";

const recipes = [
  {
    id: "1",
    name: "Golden Buddha Bowl",
    image: "/images/khora_recipe_card.png",
    time: "25 min",
    calories: 450,
    tags: ["High Protein", "Gluten Free"],
    saved: true,
  },
  {
    id: "2",
    name: "Green Power Smoothie",
    image: "/images/khora_home_pantry.png",
    time: "5 min",
    calories: 280,
    tags: ["Quick", "Detox"],
    saved: false,
  },
  {
    id: "3",
    name: "Mediterranean Quinoa",
    image: "/images/khora_digital_blender.png",
    time: "30 min",
    calories: 520,
    tags: ["Mediterranean", "Fiber Rich"],
    saved: true,
  },
];

export default function Recipes() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <CosmicBackground />
      
      <main className="relative z-10 min-h-screen pb-44">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-8 px-6"
        >
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Recipes
          </h1>
          <p className="text-white/50 text-sm">Your culinary discoveries</p>
        </motion.header>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="px-6 py-8"
        >
          {recipes.length > 0 ? (
            <div className="grid gap-4">
              {recipes.map((recipe, index) => (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="rounded-2xl overflow-hidden cursor-pointer"
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div 
                    className="h-40 bg-cover bg-center relative"
                    style={{ 
                      backgroundImage: `url(${recipe.image})`,
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <button className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center bg-black/30 backdrop-blur-sm">
                      <Heart 
                        className={`w-4 h-4 ${recipe.saved ? 'fill-red-500 text-red-500' : 'text-white'}`} 
                      />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-semibold text-lg">{recipe.name}</h3>
                    <div className="flex items-center gap-4 mt-2 text-white/50 text-sm">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {recipe.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-4 h-4" />
                        {recipe.calories} cal
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
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <ChefHat className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <h3 className="text-white/60 text-lg mb-2">No recipes yet</h3>
              <p className="text-white/40 text-sm mb-6">Start by adding ingredients to your pantry</p>
              <Link href="/blender">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-6 py-3 rounded-xl font-medium"
                  style={{
                    background: 'linear-gradient(135deg, #00d4aa 0%, #00a388 100%)',
                    color: '#0a0f1a',
                  }}
                >
                  Create Your First Recipe
                </motion.button>
              </Link>
            </div>
          )}
        </motion.section>
      </main>

      <Navigation />
    </div>
  );
}
