/*
 * KHORA Home Page - Premium Apple Glass VisionOS Design
 * Design: Spatial Food Computing - Futuristic, immersive, functional
 * NO emoji, mature design, all buttons functional
 */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Leaf, 
  ChefHat, 
  Droplets, 
  Pill, 
  ArrowRight, 
  Sparkles,
  BookOpen,
  Utensils,
  Zap
} from "lucide-react";
import CosmicBackground from "@/components/CosmicBackground";
import Navigation from "@/components/Navigation";

// Floating ingredient orbs data
const floatingOrbs = [
  { name: "Quinoa", color: "#f59e0b", delay: 0, x: "15%", y: "20%" },
  { name: "Kale", color: "#22c55e", delay: 0.5, x: "80%", y: "15%" },
  { name: "Avocado", color: "#84cc16", delay: 1, x: "10%", y: "60%" },
  { name: "Tofu", color: "#f5f5f4", delay: 1.5, x: "85%", y: "55%" },
  { name: "Spirulina", color: "#14b8a6", delay: 2, x: "25%", y: "75%" },
  { name: "Chia", color: "#6b7280", delay: 2.5, x: "70%", y: "70%" },
];

export default function Home() {
  const [activeOrb, setActiveOrb] = useState<number | null>(null);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <CosmicBackground />
      
      {/* Floating Ingredient Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {floatingOrbs.map((orb, index) => (
          <motion.div
            key={orb.name}
            className="absolute w-16 h-16 rounded-full pointer-events-auto cursor-pointer"
            style={{
              left: orb.x,
              top: orb.y,
              background: `radial-gradient(circle at 30% 30%, ${orb.color}40, ${orb.color}10)`,
              border: `1px solid ${orb.color}30`,
              boxShadow: `0 0 40px ${orb.color}20, inset 0 0 20px ${orb.color}10`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: activeOrb === index ? 1 : 0.6, 
              scale: activeOrb === index ? 1.2 : 1,
              y: [0, -15, 0],
            }}
            transition={{
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
              y: { duration: 4 + index * 0.5, repeat: Infinity, ease: "easeInOut", delay: orb.delay }
            }}
            onMouseEnter={() => setActiveOrb(index)}
            onMouseLeave={() => setActiveOrb(null)}
          >
            {activeOrb === index && (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap"
                style={{ color: orb.color }}
              >
                {orb.name}
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>

      <main className="relative z-10 min-h-screen flex flex-col">
        {/* Hero Section */}
        <section className="flex-1 flex flex-col items-center justify-center px-6 pt-12 pb-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <div 
              className="w-24 h-24 rounded-3xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 212, 170, 0.2) 0%, rgba(0, 212, 170, 0.05) 100%)',
                border: '1px solid rgba(0, 212, 170, 0.3)',
                boxShadow: '0 0 60px rgba(0, 212, 170, 0.2)',
              }}
            >
              <Leaf className="w-12 h-12" style={{ color: '#00d4aa' }} />
            </div>
          </motion.div>

          {/* Brand Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-6xl md:text-7xl font-bold tracking-tight mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            <span className="text-white">KH</span>
            <span style={{ color: '#00d4aa' }}>O</span>
            <span className="text-white">RA</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-white/50 text-lg md:text-xl mb-10 text-center max-w-md"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Holistic Nutrition, Spatially Reimagined
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Link href="/pantry">
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(0, 212, 170, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-4 rounded-2xl font-semibold text-lg flex items-center gap-3 transition-all"
                style={{
                  background: 'linear-gradient(135deg, #00d4aa 0%, #00b894 100%)',
                  color: '#0a0a0f',
                  boxShadow: '0 0 30px rgba(0, 212, 170, 0.3)',
                }}
              >
                Începe Acum
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </section>

        {/* Features Grid */}
        <section className="px-6 pb-44">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto"
          >
            {/* Cămara Digitală */}
            <Link href="/pantry">
              <FeatureCard
                icon={<Utensils className="w-6 h-6" />}
                title="Cămara Digitală"
                description="Gestionează ingredientele tale. Vizualizează Health Score și identifică alimentele procesate."
                color="#00d4aa"
                delay={0}
              />
            </Link>

            {/* Generator Rețete */}
            <Link href="/blender">
              <FeatureCard
                icon={<ChefHat className="w-6 h-6" />}
                title="Generator Rețete"
                description="Combină ingredientele și generează rețete personalizate bazate pe ce ai în cămară."
                color="#a855f7"
                delay={0.1}
              />
            </Link>

            {/* Hidratare */}
            <Link href="/hydration">
              <FeatureCard
                icon={<Droplets className="w-6 h-6" />}
                title="Hidratare"
                description="Tracking pentru apă, ceaiuri și băuturi. Setează remindere inteligente pentru hidratare."
                color="#3b82f6"
                delay={0.2}
              />
            </Link>

            {/* Suplimente */}
            <Link href="/supplements">
              <FeatureCard
                icon={<Pill className="w-6 h-6" />}
                title="Suplimente"
                description="Monitorizează suplimentele esențiale. Primește remindere pentru B12, D3, Omega-3."
                color="#f59e0b"
                delay={0.3}
              />
            </Link>
          </motion.div>

          {/* Secondary Features */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mt-4"
          >
            {/* Blog */}
            <Link href="/blog">
              <FeatureCardSmall
                icon={<BookOpen className="w-5 h-5" />}
                title="Blog Educativ"
                description="Articole despre nutriție vegană și capcanele alimentelor procesate."
                color="#ec4899"
              />
            </Link>

            {/* Superfoods */}
            <Link href="/pantry?filter=superfoods">
              <FeatureCardSmall
                icon={<Sparkles className="w-5 h-5" />}
                title="Superfoods"
                description="Descoperă ingredientele cu cel mai mare potențial nutrițional."
                color="#00d4aa"
              />
            </Link>
          </motion.div>
        </section>
      </main>

      <Navigation />
    </div>
  );
}

// Feature Card Component
function FeatureCard({ 
  icon, 
  title, 
  description, 
  color, 
  delay 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 + delay, duration: 0.5 }}
      whileHover={{ 
        scale: 1.02, 
        boxShadow: `0 0 40px ${color}20`,
      }}
      className="p-6 rounded-3xl cursor-pointer transition-all h-full"
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div 
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
        style={{
          background: `${color}15`,
          border: `1px solid ${color}30`,
        }}
      >
        <span style={{ color }}>{icon}</span>
      </div>
      <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
      <p className="text-white/50 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

// Small Feature Card Component
function FeatureCardSmall({ 
  icon, 
  title, 
  description, 
  color 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  color: string;
}) {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.02, 
        boxShadow: `0 0 30px ${color}15`,
      }}
      className="p-5 rounded-2xl cursor-pointer transition-all flex items-start gap-4"
      style={{
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div 
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          background: `${color}15`,
          border: `1px solid ${color}30`,
        }}
      >
        <span style={{ color }}>{icon}</span>
      </div>
      <div>
        <h3 className="text-white font-medium mb-1">{title}</h3>
        <p className="text-white/40 text-sm">{description}</p>
      </div>
    </motion.div>
  );
}
