/*
 * KHORA Hydration Page - Smart Liquid Tracking
 * Design: Premium Apple Glass - Clean, functional
 * Features: 
 * - Target configurabil (default 3.5L)
 * - Calculator total lichide (apă + ceai + cafea + alte)
 * - Porții standard și intervale recomandate
 * - Medii științifice pentru consum
 * - FĂRĂ notificări false
 */

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Droplets, 
  Plus, 
  Minus, 
  Clock, 
  Coffee, 
  Leaf,
  X,
  Settings,
  Info,
  Zap,
  Wine
} from "lucide-react";
import CosmicBackground from "@/components/CosmicBackground";
import Navigation from "@/components/Navigation";

// Beverage types with scientific recommendations
const beverageTypes = [
  { 
    id: "water", 
    name: "Apă", 
    icon: Droplets, 
    color: "#3b82f6", 
    defaultMl: 250,
    recommendation: "8-10 pahare/zi (2-2.5L)",
    interval: "La fiecare 1-2 ore",
    countsAs: 1.0 // 100% hidratare
  },
  { 
    id: "green-tea", 
    name: "Ceai Verde", 
    icon: Leaf, 
    color: "#22c55e", 
    defaultMl: 200,
    recommendation: "2-3 căni/zi",
    interval: "Dimineața și după-amiaza",
    countsAs: 0.9 // 90% hidratare
  },
  { 
    id: "herbal-tea", 
    name: "Ceai de Plante", 
    icon: Leaf, 
    color: "#84cc16", 
    defaultMl: 200,
    recommendation: "2-4 căni/zi",
    interval: "Oricând, ideal seara",
    countsAs: 0.95 // 95% hidratare
  },
  { 
    id: "matcha", 
    name: "Matcha", 
    icon: Zap, 
    color: "#00d4aa", 
    defaultMl: 150,
    recommendation: "1-2 căni/zi",
    interval: "Dimineața, 30 min după masă",
    countsAs: 0.85 // 85% hidratare
  },
  { 
    id: "coffee", 
    name: "Cafea", 
    icon: Coffee, 
    color: "#a16207", 
    defaultMl: 150,
    recommendation: "Max 3-4 căni/zi",
    interval: "Nu după ora 14:00",
    countsAs: 0.5 // 50% hidratare (diuretic)
  },
  { 
    id: "smoothie", 
    name: "Smoothie", 
    icon: Droplets, 
    color: "#ec4899", 
    defaultMl: 300,
    recommendation: "1-2/zi",
    interval: "Dimineața sau ca gustare",
    countsAs: 0.8 // 80% hidratare
  },
  { 
    id: "juice", 
    name: "Suc Natural", 
    icon: Wine, 
    color: "#f97316", 
    defaultMl: 200,
    recommendation: "Max 1 pahar/zi",
    interval: "Cu masa",
    countsAs: 0.7 // 70% hidratare
  },
];

// Scientific hydration recommendations
const hydrationRecommendations = {
  sedentary: { ml: 2500, label: "Sedentar" },
  moderate: { ml: 3000, label: "Activitate moderată" },
  active: { ml: 3500, label: "Activ" },
  athlete: { ml: 4000, label: "Sportiv" },
};

interface DrinkLog {
  id: string;
  type: string;
  ml: number;
  time: Date;
  effectiveMl: number; // ml ajustat pentru hidratare
}

export default function Hydration() {
  const [activityLevel, setActivityLevel] = useState<keyof typeof hydrationRecommendations>("moderate");
  const [dailyGoal, setDailyGoal] = useState(hydrationRecommendations.moderate.ml);
  const [drinkLog, setDrinkLog] = useState<DrinkLog[]>([]);
  const [showAddDrink, setShowAddDrink] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedBeverage, setSelectedBeverage] = useState(beverageTypes[0]);
  const [customMl, setCustomMl] = useState(250);

  // Calculate totals
  const totals = useMemo(() => {
    const byType: Record<string, number> = {};
    let totalRaw = 0;
    let totalEffective = 0;

    drinkLog.forEach(log => {
      byType[log.type] = (byType[log.type] || 0) + log.ml;
      totalRaw += log.ml;
      totalEffective += log.effectiveMl;
    });

    return { byType, totalRaw, totalEffective };
  }, [drinkLog]);

  const progressPercent = Math.min((totals.totalEffective / dailyGoal) * 100, 100);
  const remaining = Math.max(dailyGoal - totals.totalEffective, 0);

  // Add drink to log
  const addDrink = (type: string, ml: number) => {
    const beverage = beverageTypes.find(b => b.id === type) || beverageTypes[0];
    const newLog: DrinkLog = {
      id: Date.now().toString(),
      type,
      ml,
      time: new Date(),
      effectiveMl: Math.round(ml * beverage.countsAs),
    };
    setDrinkLog(prev => [newLog, ...prev]);
    setShowAddDrink(false);
  };

  // Quick add water
  const quickAddWater = () => {
    addDrink("water", 250);
  };

  // Remove drink from log
  const removeDrink = (id: string) => {
    setDrinkLog(prev => prev.filter(log => log.id !== id));
  };

  // Get beverage info
  const getBeverageInfo = (type: string) => {
    return beverageTypes.find(b => b.id === type) || beverageTypes[0];
  };

  // Update goal based on activity level
  const updateActivityLevel = (level: keyof typeof hydrationRecommendations) => {
    setActivityLevel(level);
    setDailyGoal(hydrationRecommendations[level].ml);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <CosmicBackground />
      
      <main className="relative z-10 min-h-screen pb-32 px-6">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-8 flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Hidratare
            </h1>
            <p className="text-white/50 text-sm">
              Tracking inteligent pentru lichide
            </p>
          </div>
          <button
            onClick={() => setShowSettings(true)}
            className="p-3 rounded-xl"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Settings className="w-5 h-5 text-white/60" />
          </button>
        </motion.header>

        {/* Progress Circle */}
        <motion.section
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mt-6 flex flex-col items-center"
        >
          <div className="relative w-52 h-52">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="104"
                cy="104"
                r="94"
                fill="none"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="12"
              />
              <motion.circle
                cx="104"
                cy="104"
                r="94"
                fill="none"
                stroke="url(#hydrationGradient)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={590}
                initial={{ strokeDashoffset: 590 }}
                animate={{ strokeDashoffset: 590 - (590 * progressPercent) / 100 }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))',
                }}
              />
              <defs>
                <linearGradient id="hydrationGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#00d4aa" />
                </linearGradient>
              </defs>
            </svg>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Droplets className="w-7 h-7 text-blue-400 mb-1" />
              <span className="text-3xl font-bold text-white">{totals.totalEffective}</span>
              <span className="text-white/50 text-sm">/ {dailyGoal} ml</span>
              <span className="text-blue-400 text-xs font-medium mt-1">
                {Math.round(progressPercent)}% completat
              </span>
            </div>
          </div>

          {/* Remaining info */}
          <div className="mt-4 text-center">
            {remaining > 0 ? (
              <p className="text-white/60 text-sm">
                Mai ai nevoie de <span className="text-blue-400 font-semibold">{remaining} ml</span> pentru obiectivul zilnic
              </p>
            ) : (
              <p className="text-[#00d4aa] text-sm font-medium">
                Obiectiv atins! Excelent!
              </p>
            )}
          </div>

          {/* Quick Add Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={quickAddWater}
            className="mt-5 px-8 py-4 rounded-2xl font-semibold flex items-center gap-3"
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
            }}
          >
            <Plus className="w-5 h-5" />
            Adaugă 250ml Apă
          </motion.button>

          <button
            onClick={() => setShowAddDrink(true)}
            className="mt-3 text-white/50 text-sm hover:text-white transition-colors"
          >
            Adaugă altă băutură
          </button>
        </motion.section>

        {/* Summary by Type */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <h2 className="text-lg font-semibold text-white mb-3">Rezumat Azi</h2>
          
          <div 
            className="p-4 rounded-2xl"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="text-center p-3 rounded-xl" style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
                <p className="text-2xl font-bold text-blue-400">{totals.totalRaw}</p>
                <p className="text-white/50 text-xs">ml total consumat</p>
              </div>
              <div className="text-center p-3 rounded-xl" style={{ background: 'rgba(0, 212, 170, 0.1)' }}>
                <p className="text-2xl font-bold text-[#00d4aa]">{totals.totalEffective}</p>
                <p className="text-white/50 text-xs">ml hidratare efectivă</p>
              </div>
            </div>
            
            {Object.keys(totals.byType).length > 0 && (
              <div className="space-y-2">
                {Object.entries(totals.byType).map(([type, ml]) => {
                  const bev = getBeverageInfo(type);
                  const BevIcon = bev.icon;
                  return (
                    <div key={type} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BevIcon className="w-4 h-4" style={{ color: bev.color }} />
                        <span className="text-white/70 text-sm">{bev.name}</span>
                      </div>
                      <span className="text-white/50 text-sm">{ml} ml</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.section>

        {/* Recommendations */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-white/40" />
            <h2 className="text-sm font-medium text-white/60">Recomandări științifice</h2>
          </div>
          
          <div 
            className="p-4 rounded-2xl space-y-3"
            style={{
              background: 'rgba(59, 130, 246, 0.05)',
              border: '1px solid rgba(59, 130, 246, 0.1)',
            }}
          >
            <p className="text-white/70 text-sm">
              <span className="text-blue-400 font-medium">Target zilnic:</span> {dailyGoal/1000}L ({hydrationRecommendations[activityLevel].label})
            </p>
            <p className="text-white/70 text-sm">
              <span className="text-blue-400 font-medium">Interval optim:</span> 200-300ml la fiecare 1-2 ore
            </p>
            <p className="text-white/70 text-sm">
              <span className="text-blue-400 font-medium">Notă:</span> Cafeaua contează doar 50% pentru hidratare (efect diuretic)
            </p>
          </div>
        </motion.section>

        {/* Today's Log */}
        {drinkLog.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6"
          >
            <h2 className="text-lg font-semibold text-white mb-3">Jurnal Azi</h2>
            
            <div className="space-y-2">
              {drinkLog.slice(0, 10).map((log, index) => {
                const beverage = getBeverageInfo(log.type);
                const BevIcon = beverage.icon;
                return (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-xl"
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{ background: `${beverage.color}20` }}
                      >
                        <BevIcon className="w-4 h-4" style={{ color: beverage.color }} />
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">{beverage.name}</p>
                        <p className="text-white/40 text-xs">
                          {log.time.toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-white/60 text-sm">{log.ml} ml</span>
                        {log.effectiveMl !== log.ml && (
                          <p className="text-white/30 text-xs">({log.effectiveMl} ml efectiv)</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeDrink(log.id)}
                        className="text-white/30 hover:text-red-400 transition-colors p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        )}

        {/* Beverage Types Quick Reference */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <h2 className="text-lg font-semibold text-white mb-3">Băuturi Rapide</h2>
          
          <div className="grid grid-cols-4 gap-2">
            {beverageTypes.slice(0, 4).map((bev) => {
              const BevIcon = bev.icon;
              return (
                <motion.button
                  key={bev.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addDrink(bev.id, bev.defaultMl)}
                  className="p-3 rounded-xl flex flex-col items-center gap-1"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <BevIcon className="w-5 h-5" style={{ color: bev.color }} />
                  <span className="text-white text-xs font-medium">{bev.name}</span>
                  <span className="text-white/40 text-[10px]">{bev.defaultMl}ml</span>
                </motion.button>
              );
            })}
          </div>
        </motion.section>
      </main>

      {/* Add Drink Modal */}
      <AnimatePresence>
        {showAddDrink && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center"
            style={{ background: 'rgba(0, 0, 0, 0.6)' }}
            onClick={() => setShowAddDrink(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg p-6 rounded-t-3xl max-h-[80vh] overflow-y-auto"
              style={{
                background: 'rgba(20, 20, 30, 0.98)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Adaugă Băutură</h3>
                <button
                  onClick={() => setShowAddDrink(false)}
                  className="text-white/50 hover:text-white p-2"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Beverage Selection */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                {beverageTypes.map((bev) => {
                  const BevIcon = bev.icon;
                  const isSelected = selectedBeverage.id === bev.id;
                  return (
                    <button
                      key={bev.id}
                      onClick={() => {
                        setSelectedBeverage(bev);
                        setCustomMl(bev.defaultMl);
                      }}
                      className="p-3 rounded-xl flex flex-col items-center gap-1 transition-all"
                      style={{
                        background: isSelected ? `${bev.color}20` : 'rgba(255, 255, 255, 0.05)',
                        border: `1px solid ${isSelected ? `${bev.color}40` : 'rgba(255, 255, 255, 0.1)'}`,
                      }}
                    >
                      <BevIcon className="w-5 h-5" style={{ color: isSelected ? bev.color : 'rgba(255, 255, 255, 0.5)' }} />
                      <span className={`text-xs ${isSelected ? 'text-white' : 'text-white/50'}`}>{bev.name}</span>
                      <span className="text-white/30 text-[10px]">{Math.round(bev.countsAs * 100)}% hidr.</span>
                    </button>
                  );
                })}
              </div>

              {/* Selected beverage info */}
              <div 
                className="p-3 rounded-xl mb-4"
                style={{
                  background: `${selectedBeverage.color}10`,
                  border: `1px solid ${selectedBeverage.color}20`,
                }}
              >
                <p className="text-white/70 text-xs">
                  <span style={{ color: selectedBeverage.color }} className="font-medium">Recomandare:</span> {selectedBeverage.recommendation}
                </p>
                <p className="text-white/50 text-xs mt-1">
                  <span className="font-medium">Interval:</span> {selectedBeverage.interval}
                </p>
              </div>

              {/* Amount Selector */}
              <div className="flex items-center justify-center gap-6 mb-6">
                <button
                  onClick={() => setCustomMl(Math.max(50, customMl - 50))}
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <Minus className="w-5 h-5 text-white" />
                </button>
                
                <div className="text-center">
                  <span className="text-4xl font-bold text-white">{customMl}</span>
                  <span className="text-white/50 text-lg ml-1">ml</span>
                  <p className="text-white/30 text-xs mt-1">
                    ({Math.round(customMl * selectedBeverage.countsAs)} ml efectiv)
                  </p>
                </div>
                
                <button
                  onClick={() => setCustomMl(customMl + 50)}
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <Plus className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Quick amounts */}
              <div className="flex gap-2 mb-6">
                {[100, 200, 250, 300, 500].map(amount => (
                  <button
                    key={amount}
                    onClick={() => setCustomMl(amount)}
                    className={`flex-1 py-2 rounded-lg text-sm transition-all ${
                      customMl === amount ? 'text-[#0a0f1a]' : 'text-white/60'
                    }`}
                    style={{
                      background: customMl === amount ? selectedBeverage.color : 'rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    {amount}
                  </button>
                ))}
              </div>

              {/* Add Button */}
              <button
                onClick={() => addDrink(selectedBeverage.id, customMl)}
                className="w-full py-4 rounded-2xl font-semibold text-lg"
                style={{
                  background: `linear-gradient(135deg, ${selectedBeverage.color} 0%, ${selectedBeverage.color}cc 100%)`,
                  color: '#fff',
                }}
              >
                Adaugă {selectedBeverage.name}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center"
            style={{ background: 'rgba(0, 0, 0, 0.6)' }}
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg p-6 rounded-t-3xl"
              style={{
                background: 'rgba(20, 20, 30, 0.98)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Setări Hidratare</h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-white/50 hover:text-white p-2"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-6">
                <label className="text-white/60 text-sm mb-3 block">Nivel de activitate</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(hydrationRecommendations).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => updateActivityLevel(key as keyof typeof hydrationRecommendations)}
                      className="p-4 rounded-xl text-left transition-all"
                      style={{
                        background: activityLevel === key ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        border: `1px solid ${activityLevel === key ? 'rgba(59, 130, 246, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
                      }}
                    >
                      <p className={`font-medium ${activityLevel === key ? 'text-blue-400' : 'text-white/70'}`}>
                        {value.label}
                      </p>
                      <p className="text-white/40 text-sm">{value.ml / 1000}L / zi</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="text-white/60 text-sm mb-2 block">Target personalizat (ml)</label>
                <input
                  type="number"
                  value={dailyGoal}
                  onChange={(e) => setDailyGoal(Math.max(1000, Math.min(6000, parseInt(e.target.value) || 2500)))}
                  className="w-full px-4 py-3 rounded-xl text-white outline-none"
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                />
                <p className="text-white/40 text-xs mt-2">
                  Recomandare: 2.5L - 4L în funcție de activitate
                </p>
              </div>

              <button
                onClick={() => setShowSettings(false)}
                className="w-full py-4 rounded-2xl font-semibold"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                }}
              >
                Salvează
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navigation />
    </div>
  );
}
