/*
 * KHORA Home Page
 * Design: Cosmic Nebula Interface - Apple VisionOS 2026 Aesthetic
 * Features: Immersive hero, floating ingredients, spatial navigation
 */

import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Sparkles, ChefHat, Droplets, Leaf } from "lucide-react";
import CosmicBackground from "@/components/CosmicBackground";
import Navigation from "@/components/Navigation";

const featuredIngredients = [
  { id: "1", name: "Avocado", emoji: "🥑", color: "#22c55e", delay: 0 },
  { id: "2", name: "Quinoa", emoji: "🌾", color: "#eab308", delay: 0.1 },
  { id: "3", name: "Tomato", emoji: "🍅", color: "#ef4444", delay: 0.2 },
  { id: "4", name: "Spinach", emoji: "🥬", color: "#22c55e", delay: 0.3 },
  { id: "5", name: "Chickpeas", emoji: "🫘", color: "#f59e0b", delay: 0.4 },
  { id: "6", name: "Mango", emoji: "🥭", color: "#f97316", delay: 0.5 },
];

const features = [
  {
    icon: Sparkles,
    title: "Smart Pantry",
    description: "Your ingredients as a living constellation",
    color: "#00d4aa",
    gradient: "from-[#00d4aa]/20 to-[#00a388]/10",
  },
  {
    icon: ChefHat,
    title: "AI Chef",
    description: "Recipes generated from what you have",
    color: "#ffb347",
    gradient: "from-[#ffb347]/20 to-[#ff8c00]/10",
  },
  {
    icon: Droplets,
    title: "Hydration",
    description: "Intelligent water & supplement tracking",
    color: "#38bdf8",
    gradient: "from-[#38bdf8]/20 to-[#0ea5e9]/10",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <CosmicBackground />
      
      {/* Hero Section */}
      <main className="relative z-10 min-h-screen flex flex-col">
        {/* Logo & Tagline */}
        <motion.header
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="pt-16 px-6 text-center"
        >
          {/* Floating Leaf Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 212, 170, 0.2) 0%, rgba(0, 163, 136, 0.1) 100%)',
              border: '1px solid rgba(0, 212, 170, 0.3)',
              boxShadow: '0 0 40px rgba(0, 212, 170, 0.2)',
            }}
          >
            <Leaf className="w-8 h-8 text-[#00d4aa]" />
          </motion.div>

          <h1 
            className="text-6xl md:text-8xl font-bold tracking-tight mb-4" 
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white"
            >
              KH
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="inline-block"
              style={{
                background: 'linear-gradient(135deg, #00d4aa 0%, #00a388 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 20px rgba(0, 212, 170, 0.5))',
              }}
            >
              O
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white"
            >
              RA
            </motion.span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-white/50 text-lg md:text-xl max-w-md mx-auto font-light tracking-wide"
          >
            Holistic Nutrition, Spatially Reimagined
          </motion.p>
        </motion.header>

        {/* Floating Ingredients Constellation */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.5 }}
          className="flex-1 flex items-center justify-center py-8 relative"
        >
          <div className="relative w-full max-w-md h-72">
            {/* Central Glow */}
            <div 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(0, 212, 170, 0.15) 0%, transparent 70%)',
                filter: 'blur(30px)',
              }}
            />
            
            {/* Orbiting Ingredients */}
            {featuredIngredients.map((ingredient, index) => {
              const angle = (index / featuredIngredients.length) * Math.PI * 2 - Math.PI / 2;
              const radius = 100 + (index % 2) * 30;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius * 0.7;
              
              return (
                <motion.div
                  key={ingredient.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                  }}
                  transition={{ 
                    delay: 0.8 + ingredient.delay,
                    duration: 0.6,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                >
                  <motion.div
                    animate={{ 
                      y: [0, -8, 0],
                      rotate: [0, 5, 0, -5, 0],
                    }}
                    transition={{ 
                      duration: 4 + index * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative"
                  >
                    {/* Glow */}
                    <div 
                      className="absolute inset-0 rounded-full blur-xl opacity-40"
                      style={{ background: ingredient.color }}
                    />
                    
                    {/* Sphere */}
                    <div
                      className="relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center"
                      style={{
                        background: `
                          radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%),
                          radial-gradient(circle at 70% 70%, ${ingredient.color}30 0%, transparent 50%),
                          linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)
                        `,
                        boxShadow: `
                          0 8px 32px rgba(0, 0, 0, 0.3),
                          0 0 0 1px rgba(255, 255, 255, 0.1) inset,
                          0 -4px 16px rgba(255, 255, 255, 0.1) inset
                        `,
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      <span className="text-2xl md:text-3xl">{ingredient.emoji}</span>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Welcome Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="px-6 text-center mb-8"
        >
          <h2 
            className="text-2xl md:text-3xl font-semibold text-white mb-4" 
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Welcome to the Future of Nutrition
          </h2>
          <p className="text-white/40 max-w-md mx-auto mb-8 leading-relaxed">
            Transform your kitchen into a spatial computing experience. 
            Discover recipes crafted from your ingredients.
          </p>
          
          <Link href="/pantry">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #00d4aa 0%, #00a388 100%)',
                color: '#0a0f1a',
                boxShadow: '0 8px 32px rgba(0, 212, 170, 0.4), 0 0 0 1px rgba(255,255,255,0.1) inset',
              }}
            >
              Begin Your Journey
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.section>

        {/* Features Grid */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="px-6 pb-36"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative p-6 rounded-2xl transition-all duration-500 cursor-pointer overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                {/* Hover Glow */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${feature.color}15 0%, transparent 70%)`,
                  }}
                />
                
                <div 
                  className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{ 
                    background: `linear-gradient(135deg, ${feature.color}25 0%, ${feature.color}10 100%)`,
                    boxShadow: `0 0 20px ${feature.color}20`,
                    border: `1px solid ${feature.color}30`,
                  }}
                >
                  <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                </div>
                
                <h3 className="relative text-white font-semibold mb-2 text-lg">{feature.title}</h3>
                <p className="relative text-white/40 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      <Navigation />
    </div>
  );
}
