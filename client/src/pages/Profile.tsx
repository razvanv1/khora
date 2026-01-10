/*
 * KHORA Profile Page - Premium Apple VisionOS 2026
 * Design: Cosmic Blue + Golden Accent + Glassmorphism
 * Limba: Română
 * Features: Acces la onboarding, setări profil, statistici personalizate
 */

import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  User, 
  Settings, 
  RefreshCw, 
  Activity,
  Droplets,
  Flame,
  Target,
  ChevronRight,
  BookOpen,
  LogOut
} from "lucide-react";
import Navigation from "@/components/Navigation";
import { useUserProfile, calculateMetrics } from "@/hooks/useUserProfile";

export default function Profile() {
  const { profile, clearProfile } = useUserProfile();
  const metrics = profile ? calculateMetrics(profile) : null;

  const handleResetOnboarding = () => {
    if (confirm('Vrei să refaci quiz-ul de personalizare? Datele actuale vor fi șterse.')) {
      clearProfile();
      window.location.href = '/onboarding';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1628] relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: 'url(/images/khora_profile.webp)' }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/60 via-[#0a1628]/80 to-[#0a1628]" />

      {/* Content */}
      <div className="relative z-10 min-h-screen px-6 pt-12 pb-32">
        
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl font-light text-white mb-1">Profilul Meu</h1>
          <p className="text-white/50 text-sm">Setări și personalizare</p>
        </motion.header>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-3xl mb-6"
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          {/* Avatar */}
          <div className="flex items-center gap-4 mb-6">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ 
                background: 'linear-gradient(135deg, rgba(212, 165, 116, 0.3) 0%, rgba(45, 212, 191, 0.3) 100%)',
                border: '2px solid rgba(212, 165, 116, 0.5)'
              }}
            >
              <User className="w-8 h-8 text-[#d4a574]" />
            </div>
            <div>
              <h2 className="text-white font-medium text-lg">
                {profile?.name || 'Utilizator'}
              </h2>
              <p className="text-white/50 text-sm">{profile?.email || 'Fără email'}</p>
            </div>
          </div>

          {/* Stats Grid */}
          {metrics && (
            <div className="grid grid-cols-2 gap-3">
              <div 
                className="p-4 rounded-2xl"
                style={{ background: 'rgba(255, 255, 255, 0.04)' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="w-4 h-4 text-[#d4a574]" />
                  <span className="text-white/50 text-xs">BMR</span>
                </div>
                <p className="text-white font-semibold">{metrics.bmr} kcal</p>
              </div>
              
              <div 
                className="p-4 rounded-2xl"
                style={{ background: 'rgba(255, 255, 255, 0.04)' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-[#2dd4bf]" />
                  <span className="text-white/50 text-xs">TDEE</span>
                </div>
                <p className="text-white font-semibold">{metrics.tdee} kcal</p>
              </div>
              
              <div 
                className="p-4 rounded-2xl"
                style={{ background: 'rgba(255, 255, 255, 0.04)' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-green-400" />
                  <span className="text-white/50 text-xs">Calorii Zilnice</span>
                </div>
                <p className="text-white font-semibold">{metrics.targetCalories} kcal</p>
              </div>
              
              <div 
                className="p-4 rounded-2xl"
                style={{ background: 'rgba(255, 255, 255, 0.04)' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="w-4 h-4 text-blue-400" />
                  <span className="text-white/50 text-xs">Hidratare</span>
                </div>
                <p className="text-white font-semibold">{(metrics.dailyWaterMl / 1000).toFixed(1)} L</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Menu Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          {/* Refă Quiz */}
          <button
            onClick={handleResetOnboarding}
            className="w-full p-4 rounded-2xl flex items-center justify-between group"
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
                <RefreshCw className="w-5 h-5 text-[#d4a574]" />
              </div>
              <div className="text-left">
                <h3 className="text-white font-medium text-sm">Refă Quiz-ul</h3>
                <p className="text-white/60 text-xs">Actualizează preferințele tale</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-white/60 group-hover:text-white/60 transition-colors" />
          </button>

          {/* Blog */}
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
              <ChevronRight className="w-4 h-4 text-white/60 group-hover:text-white/60 transition-colors" />
            </div>
          </Link>

          {/* Setări */}
          <Link href="/settings">
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
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <Settings className="w-5 h-5 text-white/70" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">Setări</h3>
                  <p className="text-white/60 text-xs">Notificări, limbă, confidențialitate</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-white/60 group-hover:text-white/60 transition-colors" />
            </div>
          </Link>

          {/* Deconectare */}
          <button
            onClick={handleResetOnboarding}
            className="w-full p-4 rounded-2xl flex items-center justify-between group"
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
            }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(239, 68, 68, 0.15)' }}
              >
                <LogOut className="w-5 h-5 text-red-400" />
              </div>
              <div className="text-left">
                <h3 className="text-red-400 font-medium text-sm">Resetează Profilul</h3>
                <p className="text-red-400/60 text-xs">Șterge toate datele</p>
              </div>
            </div>
          </button>
        </motion.div>

        {/* Version */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-white/20 text-xs mt-8"
        >
          KHORA v1.0 - Nutriție Holistică Vegană
        </motion.p>
      </div>

      {/* Navigation */}
      <Navigation />
    </div>
  );
}
