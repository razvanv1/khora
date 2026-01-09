/*
 * KHORA Hydration Page - Premium Apple VisionOS 2026
 * Design: Cosmic Blue + Golden Accent + Glassmorphism
 * Limba: Română
 * Features: Tracking lichide, calculator total, recomandări științifice
 */

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Droplets, 
  Plus, 
  Coffee, 
  Leaf,
  Sparkles,
  Target,
  Clock,
  X,
  Settings,
  Info,
  Zap
} from "lucide-react";
import Navigation from "@/components/Navigation";
import { useUserProfile, calculateMetrics } from "@/hooks/useUserProfile";

interface DrinkEntry {
  id: string;
  type: string;
  amount: number;
  hydrationFactor: number;
  time: string;
}

const drinkTypes = [
  { id: 'water', label: 'Apă', icon: Droplets, color: '#60a5fa', factor: 1.0, defaultAmount: 250 },
  { id: 'green-tea', label: 'Ceai Verde', icon: Leaf, color: '#22c55e', factor: 0.9, defaultAmount: 200 },
  { id: 'herbal-tea', label: 'Ceai Plante', icon: Leaf, color: '#84cc16', factor: 0.95, defaultAmount: 200 },
  { id: 'matcha', label: 'Matcha', icon: Zap, color: '#2dd4bf', factor: 0.85, defaultAmount: 150 },
  { id: 'coffee', label: 'Cafea', icon: Coffee, color: '#d4a574', factor: 0.5, defaultAmount: 150 },
  { id: 'smoothie', label: 'Smoothie', icon: Sparkles, color: '#a78bfa', factor: 0.8, defaultAmount: 300 },
];

export default function Hydration() {
  const { profile } = useUserProfile();
  const metrics = profile ? calculateMetrics(profile) : null;
  
  const [entries, setEntries] = useState<DrinkEntry[]>(() => {
    const saved = localStorage.getItem('khora_hydration_today');
    if (saved) {
      const data = JSON.parse(saved);
      if (data.date === new Date().toDateString()) {
        return data.entries;
      }
    }
    return [];
  });

  const [showAddModal, setShowAddModal] = useState(false);

  const dailyTarget = metrics?.dailyWaterMl || 3000;

  useEffect(() => {
    localStorage.setItem('khora_hydration_today', JSON.stringify({
      date: new Date().toDateString(),
      entries
    }));
  }, [entries]);

  const totals = useMemo(() => {
    let totalRaw = 0;
    let totalEffective = 0;
    const byType: Record<string, number> = {};

    entries.forEach(e => {
      totalRaw += e.amount;
      totalEffective += e.amount * e.hydrationFactor;
      byType[e.type] = (byType[e.type] || 0) + e.amount;
    });

    return { totalRaw, totalEffective, byType };
  }, [entries]);

  const progress = Math.min((totals.totalEffective / dailyTarget) * 100, 100);
  const remaining = Math.max(dailyTarget - totals.totalEffective, 0);

  const addDrink = (typeId: string, amount?: number) => {
    const drinkType = drinkTypes.find(d => d.id === typeId);
    if (!drinkType) return;

    const newEntry: DrinkEntry = {
      id: Date.now().toString(),
      type: typeId,
      amount: amount || drinkType.defaultAmount,
      hydrationFactor: drinkType.factor,
      time: new Date().toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' })
    };

    setEntries(prev => [...prev, newEntry]);
    setShowAddModal(false);
  };

  const removeEntry = (id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0a1628] relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: 'url(/images/khora_hydration.png)' }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/60 via-[#0a1628]/80 to-[#0a1628]" />

      {/* Content */}
      <div className="relative z-10 min-h-screen px-6 pt-12 pb-32">
        
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-2xl font-light text-white mb-1">Hidratare</h1>
          <p className="text-white/50 text-sm">Tracking lichide zilnic</p>
        </motion.header>

        {/* Progress Circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-6"
        >
          <div className="relative w-48 h-48">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="12"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                fill="none"
                stroke="url(#hydrationGradient)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={553}
                strokeDashoffset={553 - (553 * progress) / 100}
                style={{ transition: 'stroke-dashoffset 0.5s ease' }}
              />
              <defs>
                <linearGradient id="hydrationGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#2dd4bf" />
                </linearGradient>
              </defs>
            </svg>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-light text-white">
                {(totals.totalEffective / 1000).toFixed(1)}L
              </span>
              <span className="text-white/50 text-sm">
                din {(dailyTarget / 1000).toFixed(1)}L
              </span>
              <span className="text-[#2dd4bf] text-xs mt-1">
                {progress.toFixed(0)}%
              </span>
            </div>
          </div>
        </motion.div>

        {/* Remaining */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-center mb-6"
        >
          {remaining > 0 ? (
            <p className="text-white/60 text-sm">
              Mai ai nevoie de <span className="text-[#60a5fa] font-medium">{Math.round(remaining)} ml</span>
            </p>
          ) : (
            <p className="text-[#2dd4bf] text-sm font-medium">Obiectiv atins!</p>
          )}
        </motion.div>

        {/* Quick Add Water Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => addDrink('water', 250)}
            className="px-8 py-4 rounded-2xl font-medium flex items-center gap-3 text-[#0a1628]"
            style={{
              background: 'linear-gradient(135deg, #60a5fa 0%, #2dd4bf 100%)',
              boxShadow: '0 0 30px rgba(96, 165, 250, 0.3)',
            }}
          >
            <Plus className="w-5 h-5" />
            Adaugă 250ml Apă
          </motion.button>
        </motion.div>

        {/* Drink Types Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <h2 className="text-white/70 text-sm mb-3">Adaugă altă băutură</h2>
          <div className="grid grid-cols-3 gap-2">
            {drinkTypes.filter(d => d.id !== 'water').map(drink => (
              <motion.button
                key={drink.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => addDrink(drink.id)}
                className="p-3 rounded-xl flex flex-col items-center gap-2"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <drink.icon className="w-5 h-5" style={{ color: drink.color }} />
                <span className="text-white/60 text-xs">{drink.label}</span>
                <span className="text-white/30 text-[10px]">{drink.defaultAmount}ml</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-4 rounded-2xl mb-6"
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <h2 className="text-white/70 text-sm mb-3">Rezumat Azi</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 rounded-xl" style={{ background: 'rgba(96, 165, 250, 0.1)' }}>
              <p className="text-xl font-semibold text-[#60a5fa]">{totals.totalRaw}</p>
              <p className="text-white/40 text-xs">ml consumat</p>
            </div>
            <div className="text-center p-3 rounded-xl" style={{ background: 'rgba(45, 212, 191, 0.1)' }}>
              <p className="text-xl font-semibold text-[#2dd4bf]">{Math.round(totals.totalEffective)}</p>
              <p className="text-white/40 text-xs">ml hidratare</p>
            </div>
          </div>
        </motion.div>

        {/* Today's Log */}
        {entries.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-white/70 text-sm mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Jurnal ({entries.length})
            </h2>
            
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {entries.slice().reverse().map(entry => {
                const drinkType = drinkTypes.find(d => d.id === entry.type);
                return (
                  <div
                    key={entry.id}
                    className="p-3 rounded-xl flex items-center justify-between"
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      {drinkType && (
                        <drinkType.icon className="w-4 h-4" style={{ color: drinkType.color }} />
                      )}
                      <div>
                        <p className="text-white text-sm">{drinkType?.label}</p>
                        <p className="text-white/40 text-xs">{entry.amount}ml • {entry.time}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeEntry(entry.id)}
                      className="text-white/30 hover:text-red-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 p-4 rounded-2xl"
          style={{
            background: 'rgba(45, 212, 191, 0.1)',
            border: '1px solid rgba(45, 212, 191, 0.2)',
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-4 h-4 text-[#2dd4bf]" />
            <h3 className="text-[#2dd4bf] text-sm font-medium">Știai că?</h3>
          </div>
          <p className="text-white/60 text-xs leading-relaxed">
            Cafeaua contribuie doar 50% la hidratare din cauza efectului diuretic. 
            Ceaiul verde și infuziile sunt mult mai eficiente (90-95%).
          </p>
        </motion.div>
      </div>

      {/* Navigation */}
      <Navigation />
    </div>
  );
}
