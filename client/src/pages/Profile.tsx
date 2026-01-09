/*
 * KHORA Profile Page
 * Design: Cosmic Nebula Interface - User settings & taste profile
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Settings, Target, Palette, Bell, LogOut } from "lucide-react";
import CosmicBackground from "@/components/CosmicBackground";
import Navigation from "@/components/Navigation";

const tasteProfiles = [
  { id: "sweet", label: "Sweet", emoji: "🍯", color: "#fbbf24", value: 3 },
  { id: "sour", label: "Sour", emoji: "🍋", color: "#84cc16", value: 2 },
  { id: "spicy", label: "Spicy", emoji: "🌶️", color: "#ef4444", value: 4 },
  { id: "bitter", label: "Bitter", emoji: "🥬", color: "#22c55e", value: 2 },
  { id: "umami", label: "Umami", emoji: "🍄", color: "#f59e0b", value: 5 },
];

const healthGoals = [
  { id: "energy", label: "Energy & Vitality", emoji: "⚡", active: true },
  { id: "detox", label: "Detox & Clarity", emoji: "🧘", active: false },
  { id: "muscle", label: "Strength & Muscle", emoji: "💪", active: true },
  { id: "relax", label: "Relaxation & Sleep", emoji: "😴", active: false },
];

export default function Profile() {
  const [tastes, setTastes] = useState(tasteProfiles);
  const [goals, setGoals] = useState(healthGoals);

  const updateTaste = (id: string, value: number) => {
    setTastes(prev => prev.map(t => t.id === id ? { ...t, value } : t));
  };

  const toggleGoal = (id: string) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, active: !g.active } : g));
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <CosmicBackground />
      
      <main className="relative z-10 min-h-screen pb-32">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-8 px-6"
        >
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Profile
          </h1>
          <p className="text-white/50 text-sm">Customize your experience</p>
        </motion.header>

        {/* User Card */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="px-6 py-6"
        >
          <div 
            className="p-6 rounded-2xl flex items-center gap-4"
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #00d4aa 0%, #00a388 100%)',
              }}
            >
              <User className="w-8 h-8 text-[#0a0f1a]" />
            </div>
            <div>
              <h2 className="text-white font-semibold text-lg">Khora User</h2>
              <p className="text-white/50 text-sm">Premium Member</p>
            </div>
          </div>
        </motion.section>

        {/* Taste Profile */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="px-6 py-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <Palette className="w-5 h-5 text-[#00d4aa]" />
            <h2 className="text-white font-semibold">Taste Profile</h2>
          </div>
          
          <div 
            className="p-4 rounded-2xl space-y-4"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            {tastes.map(taste => (
              <div key={taste.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-sm flex items-center gap-2">
                    <span>{taste.emoji}</span>
                    {taste.label}
                  </span>
                  <span className="text-white/40 text-xs">{taste.value}/5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={taste.value}
                  onChange={(e) => updateTaste(taste.id, parseInt(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, ${taste.color} 0%, ${taste.color} ${(taste.value / 5) * 100}%, rgba(255,255,255,0.1) ${(taste.value / 5) * 100}%, rgba(255,255,255,0.1) 100%)`,
                  }}
                />
              </div>
            ))}
          </div>
        </motion.section>

        {/* Health Goals */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="px-6 py-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-[#ffb347]" />
            <h2 className="text-white font-semibold">Health Goals</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {goals.map(goal => (
              <motion.button
                key={goal.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleGoal(goal.id)}
                className="p-4 rounded-xl text-left transition-all"
                style={{
                  background: goal.active 
                    ? 'rgba(0, 212, 170, 0.15)' 
                    : 'rgba(255, 255, 255, 0.04)',
                  border: goal.active 
                    ? '1px solid rgba(0, 212, 170, 0.3)' 
                    : '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <span className="text-2xl mb-2 block">{goal.emoji}</span>
                <span className={`text-sm ${goal.active ? 'text-white' : 'text-white/60'}`}>
                  {goal.label}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Settings */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="px-6 py-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-5 h-5 text-white/60" />
            <h2 className="text-white font-semibold">Settings</h2>
          </div>
          
          <div 
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <button className="w-full p-4 flex items-center justify-between text-white/80 hover:bg-white/5 transition-colors">
              <span className="flex items-center gap-3">
                <Bell className="w-5 h-5" />
                Notifications
              </span>
              <span className="text-white/40">→</span>
            </button>
            <div className="h-px bg-white/5" />
            <button className="w-full p-4 flex items-center justify-between text-red-400 hover:bg-white/5 transition-colors">
              <span className="flex items-center gap-3">
                <LogOut className="w-5 h-5" />
                Sign Out
              </span>
            </button>
          </div>
        </motion.section>
      </main>

      <Navigation />
    </div>
  );
}
