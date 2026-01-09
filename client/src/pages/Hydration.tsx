/*
 * KHORA Hydration Page
 * Design: Cosmic Nebula Interface - Water & supplement tracking
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Droplets, Plus, Minus, Clock, Pill, Check } from "lucide-react";
import CosmicBackground from "@/components/CosmicBackground";
import Navigation from "@/components/Navigation";

const supplements = [
  { id: "1", name: "Matcha", emoji: "🍵", time: "9:00 AM", taken: true },
  { id: "2", name: "Spirulina", emoji: "🌀", time: "12:00 PM", taken: true },
  { id: "3", name: "Ashwagandha", emoji: "🌿", time: "8:00 PM", taken: false },
  { id: "4", name: "Magneziu", emoji: "💊", time: "9:00 PM", taken: false },
];

export default function Hydration() {
  const [waterIntake, setWaterIntake] = useState(1500); // ml
  const [dailyGoal] = useState(2500); // ml
  const [supplementList, setSupplementList] = useState(supplements);

  const progress = Math.min((waterIntake / dailyGoal) * 100, 100);

  const addWater = (amount: number) => {
    setWaterIntake(prev => Math.max(0, prev + amount));
  };

  const toggleSupplement = (id: string) => {
    setSupplementList(prev => 
      prev.map(s => s.id === id ? { ...s, taken: !s.taken } : s)
    );
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
            Hydration
          </h1>
          <p className="text-white/50 text-sm">Stay balanced, stay vital</p>
        </motion.header>

        {/* Water Tracker */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="px-6 py-8"
        >
          <div 
            className="p-6 rounded-3xl"
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            {/* Circular Progress */}
            <div className="relative w-48 h-48 mx-auto mb-6">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="12"
                />
                <motion.circle
                  cx="96"
                  cy="96"
                  r="88"
                  fill="none"
                  stroke="url(#waterGradient)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "0 553" }}
                  animate={{ strokeDasharray: `${(progress / 100) * 553} 553` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="waterGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#00d4aa" />
                  </linearGradient>
                </defs>
              </svg>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Droplets className="w-8 h-8 text-[#38bdf8] mb-2" />
                <span className="text-3xl font-bold text-white">{waterIntake}</span>
                <span className="text-white/50 text-sm">/ {dailyGoal} ml</span>
              </div>
            </div>

            {/* Quick Add Buttons */}
            <div className="flex justify-center gap-3">
              {[150, 250, 500].map(amount => (
                <motion.button
                  key={amount}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addWater(amount)}
                  className="px-4 py-2 rounded-xl text-sm font-medium"
                  style={{
                    background: 'rgba(56, 189, 248, 0.15)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    color: '#38bdf8',
                  }}
                >
                  +{amount}ml
                </motion.button>
              ))}
            </div>

            {/* Manual Adjust */}
            <div className="flex items-center justify-center gap-4 mt-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => addWater(-100)}
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                }}
              >
                <Minus className="w-5 h-5 text-white/60" />
              </motion.button>
              <span className="text-white/40 text-sm">Adjust</span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => addWater(100)}
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                }}
              >
                <Plus className="w-5 h-5 text-white/60" />
              </motion.button>
            </div>
          </div>
        </motion.section>

        {/* Supplements */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="px-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Pill className="w-5 h-5 text-[#00d4aa]" />
            <h2 className="text-white font-semibold">Today's Supplements</h2>
          </div>

          <div className="space-y-3">
            {supplementList.map((supplement, index) => (
              <motion.div
                key={supplement.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                onClick={() => toggleSupplement(supplement.id)}
                className="p-4 rounded-xl flex items-center justify-between cursor-pointer transition-all"
                style={{
                  background: supplement.taken 
                    ? 'rgba(0, 212, 170, 0.1)' 
                    : 'rgba(255, 255, 255, 0.04)',
                  border: supplement.taken 
                    ? '1px solid rgba(0, 212, 170, 0.2)' 
                    : '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{supplement.emoji}</span>
                  <div>
                    <span className={`font-medium ${supplement.taken ? 'text-white' : 'text-white/80'}`}>
                      {supplement.name}
                    </span>
                    <div className="flex items-center gap-1 text-white/40 text-xs">
                      <Clock className="w-3 h-3" />
                      {supplement.time}
                    </div>
                  </div>
                </div>
                
                <div 
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    supplement.taken 
                      ? 'bg-[#00d4aa]' 
                      : 'bg-white/10 border border-white/20'
                  }`}
                >
                  {supplement.taken && <Check className="w-4 h-4 text-[#0a0f1a]" />}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Add Supplement Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="w-full mt-4 p-4 rounded-xl text-white/50 text-sm flex items-center justify-center gap-2 transition-colors hover:text-white"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px dashed rgba(255, 255, 255, 0.1)',
            }}
          >
            <Plus className="w-4 h-4" />
            Add Supplement
          </motion.button>
        </motion.section>
      </main>

      <Navigation />
    </div>
  );
}
