/*
 * KHORA Home Page - Premium Apple VisionOS 2026
 * Design: Cosmic Blue + Golden Accent + Glassmorphism
 * Limba: Română
 */

import { useAuth } from "@/_core/hooks/useAuth";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Sparkles, 
  ChefHat, 
  Droplets, 
  Pill, 
  BookOpen,
  ArrowRight,
  User
} from "lucide-react";
import Navigation from "@/components/Navigation";

const features = [
  {
    icon: Sparkles,
    title: "Cămara Digitală",
    description: "Ingredientele tale organizate ca o constelație",
    href: "/pantry",
    color: "#2dd4bf"
  },
  {
    icon: ChefHat,
    title: "Generator Rețete",
    description: "Combină ingrediente, descoperă rețete",
    href: "/blender",
    color: "#d4a574"
  },
  {
    icon: Droplets,
    title: "Hidratare",
    description: "Tracking lichide cu recomandări personalizate",
    href: "/hydrate",
    color: "#60a5fa"
  },
  {
    icon: Pill,
    title: "Suplimente",
    description: "Gestionează vitaminele și mineralele",
    href: "/supplements",
    color: "#a78bfa"
  }
];

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-[#0a1628] relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: 'url(/images/khora_hero_bg.webp)' }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/40 via-transparent to-[#0a1628]" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col px-6 pt-12 pb-32">
        
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-light tracking-wider text-white mb-2">
            Khora - Nutriție Vegană Premium
          </h1>
          <p className="text-white/60 text-sm tracking-wide">
            Nutriție Holistică Vegană
          </p>
          {isAuthenticated && user && (
            <p className="text-[#2dd4bf] text-xs mt-2">
              Bine ai venit, {user.name || 'Utilizator'}
            </p>
          )}
        </motion.header>

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl font-light text-white mb-3 leading-relaxed">
            Cămara Ta Digitală de Rețete Vegane
          </h2>
          <p className="text-white/50 text-sm max-w-xs mx-auto">
            Transformă bucătăria într-o experiență de spatial computing. 
            Descoperă rețete create din ingredientele tale.
          </p>
        </motion.section>

        {/* Feature Cards */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-2 gap-4 mb-8"
        >
          {features.map((feature, index) => (
            <Link key={feature.href} href={feature.href}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="p-5 rounded-2xl cursor-pointer group"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110"
                  style={{ 
                    background: `${feature.color}15`,
                    boxShadow: `0 0 20px ${feature.color}20`
                  }}
                >
                  <feature.icon className="w-5 h-5" style={{ color: feature.color }} />
                </div>
                <h3 className="text-white font-medium text-sm mb-1">{feature.title}</h3>
                <p className="text-white/60 text-xs leading-relaxed">{feature.description}</p>
              </motion.div>
            </Link>
          ))}
        </motion.section>

        {/* Quick Actions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="space-y-3"
        >
          {/* Blog Link */}
          <Link href="/blog">
            <div 
              className="p-4 rounded-2xl flex items-center justify-between group cursor-pointer"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(34, 197, 94, 0.15)' }}
                >
                  <BookOpen className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">Blog Nutriție</h3>
                  <p className="text-white/60 text-xs">Articole educative vegane</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-white/60 group-hover:text-white/60 transition-colors" />
            </div>
          </Link>

          {/* Profile Link */}
          <Link href="/profile">
            <div 
              className="p-4 rounded-2xl flex items-center justify-between group cursor-pointer"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(212, 165, 116, 0.15)' }}
                >
                  <User className="w-5 h-5 text-[#d4a574]" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">Profilul Meu</h3>
                  <p className="text-white/60 text-xs">Setări și personalizare</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-white/60 group-hover:text-white/60 transition-colors" />
            </div>
          </Link>
        </motion.section>
      </div>

      {/* Navigation */}
      <Navigation />
    </div>
  );
}
