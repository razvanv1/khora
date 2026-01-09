/*
 * KHORA Hydration Page - Water & Beverage Tracking
 * Design: Premium Apple Glass - Clean, functional
 * Features: Water tracking, tea reminders, daily goals
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droplets, Plus, Minus, Bell, Clock, Check, Coffee, Leaf, X } from "lucide-react";
import CosmicBackground from "@/components/CosmicBackground";
import Navigation from "@/components/Navigation";

// Beverage types
const beverageTypes = [
  { id: "water", name: "Apă", icon: Droplets, color: "#3b82f6", ml: 250 },
  { id: "tea", name: "Ceai", icon: Leaf, color: "#22c55e", ml: 200 },
  { id: "coffee", name: "Cafea", icon: Coffee, color: "#a16207", ml: 150 },
  { id: "juice", name: "Suc natural", icon: Droplets, color: "#f97316", ml: 200 },
];

// Reminder presets
const reminderPresets = [
  { id: "morning", time: "08:00", label: "Dimineața", message: "Începe ziua cu un pahar de apă" },
  { id: "midmorning", time: "10:30", label: "Mijlocul dimineții", message: "Pauză de hidratare" },
  { id: "lunch", time: "12:30", label: "Prânz", message: "Bea apă înainte de masă" },
  { id: "afternoon", time: "15:00", label: "După-amiază", message: "Ceai verde pentru energie" },
  { id: "evening", time: "18:00", label: "Seara", message: "Hidratare înainte de cină" },
  { id: "night", time: "21:00", label: "Noaptea", message: "Ultimul pahar de apă" },
];

export default function Hydration() {
  const [dailyGoal] = useState(2500);
  const [currentIntake, setCurrentIntake] = useState(0);
  const [todayLog, setTodayLog] = useState<Array<{ type: string; ml: number; time: Date }>>([]);
  const [activeReminders, setActiveReminders] = useState<string[]>(["morning", "lunch", "afternoon"]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedBeverage, setSelectedBeverage] = useState(beverageTypes[0]);
  const [customAmount, setCustomAmount] = useState(250);

  const progress = Math.min((currentIntake / dailyGoal) * 100, 100);

  const addBeverage = (type: typeof beverageTypes[0], amount: number) => {
    setCurrentIntake(prev => prev + amount);
    setTodayLog(prev => [...prev, { type: type.id, ml: amount, time: new Date() }]);
    setShowAddModal(false);
  };

  const quickAdd = (type: typeof beverageTypes[0]) => {
    addBeverage(type, type.ml);
  };

  const toggleReminder = (id: string) => {
    setActiveReminders(prev => 
      prev.includes(id) 
        ? prev.filter(r => r !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <CosmicBackground />
      
      <main className="relative z-10 min-h-screen pb-32">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-8 px-6"
        >
          <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Hidratare
          </h1>
          <p className="text-white/50 text-sm">
            Tracking zilnic pentru apă și băuturi
          </p>
        </motion.header>

        {/* Progress Circle */}
        <motion.section
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center py-8"
        >
          <div className="relative w-48 h-48">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="12"
              />
              <motion.circle
                cx="96"
                cy="96"
                r="88"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={553}
                initial={{ strokeDashoffset: 553 }}
                animate={{ strokeDashoffset: 553 - (553 * progress) / 100 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#00d4aa" />
                </linearGradient>
              </defs>
            </svg>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Droplets className="w-8 h-8 text-blue-400 mb-2" />
              <span className="text-3xl font-bold text-white">
                {currentIntake}
              </span>
              <span className="text-white/50 text-sm">/ {dailyGoal} ml</span>
            </div>
          </div>

          <p className="mt-4 text-white/60 text-sm">
            {progress >= 100 
              ? "Obiectiv atins!" 
              : `Mai ai ${dailyGoal - currentIntake} ml până la obiectiv`
            }
          </p>
        </motion.section>

        {/* Quick Add Buttons */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="px-6 mb-8"
        >
          <h2 className="text-white/60 text-sm font-medium mb-3">Adaugă rapid</h2>
          <div className="grid grid-cols-4 gap-3">
            {beverageTypes.map(beverage => {
              const Icon = beverage.icon;
              return (
                <motion.button
                  key={beverage.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => quickAdd(beverage)}
                  className="p-4 rounded-2xl flex flex-col items-center gap-2 transition-all"
                  style={{
                    background: `${beverage.color}15`,
                    border: `1px solid ${beverage.color}30`,
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color: beverage.color }} />
                  <span className="text-white/80 text-xs">{beverage.name}</span>
                  <span className="text-white/40 text-xs">{beverage.ml}ml</span>
                </motion.button>
              );
            })}
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="w-full mt-3 py-3 rounded-xl text-white/60 text-sm flex items-center justify-center gap-2 transition-colors hover:text-white"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <Plus className="w-4 h-4" />
            Cantitate personalizată
          </button>
        </motion.section>

        {/* Today's Log */}
        {todayLog.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-6 mb-8"
          >
            <h2 className="text-white/60 text-sm font-medium mb-3">Astăzi</h2>
            <div 
              className="rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              {todayLog.slice(-5).reverse().map((entry, index) => {
                const beverage = beverageTypes.find(b => b.id === entry.type) || beverageTypes[0];
                const Icon = beverage.icon;
                return (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 border-b border-white/5 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: `${beverage.color}20` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: beverage.color }} />
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">{beverage.name}</p>
                        <p className="text-white/40 text-xs">
                          {entry.time.toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    <span className="text-white/60 text-sm">+{entry.ml} ml</span>
                  </div>
                );
              })}
            </div>
          </motion.section>
        )}

        {/* Reminders */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="px-6"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-white/60 text-sm font-medium flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Remindere
            </h2>
          </div>
          
          <div 
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            {reminderPresets.map((reminder) => (
              <div 
                key={reminder.id}
                className="flex items-center justify-between p-4 border-b border-white/5 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ 
                      background: activeReminders.includes(reminder.id) 
                        ? 'rgba(0, 212, 170, 0.2)' 
                        : 'rgba(255, 255, 255, 0.05)' 
                    }}
                  >
                    <Clock 
                      className="w-5 h-5" 
                      style={{ 
                        color: activeReminders.includes(reminder.id) ? '#00d4aa' : 'rgba(255,255,255,0.4)' 
                      }} 
                    />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{reminder.label}</p>
                    <p className="text-white/40 text-xs">{reminder.time} - {reminder.message}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => toggleReminder(reminder.id)}
                  className={`w-12 h-7 rounded-full transition-all duration-300 ${
                    activeReminders.includes(reminder.id) ? 'bg-[#00d4aa]' : 'bg-white/10'
                  }`}
                >
                  <motion.div
                    animate={{ x: activeReminders.includes(reminder.id) ? 22 : 4 }}
                    className="w-5 h-5 rounded-full bg-white shadow-md"
                  />
                </button>
              </div>
            ))}
          </div>

          <p className="text-white/30 text-xs text-center mt-4">
            Activează notificările în browser pentru a primi remindere
          </p>
        </motion.section>

        {/* Add Modal */}
        <AnimatePresence>
          {showAddModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-end justify-center p-4"
              onClick={() => setShowAddModal(false)}
            >
              <div 
                className="absolute inset-0"
                style={{ background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(8px)' }}
              />
              
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-md rounded-3xl p-6"
                style={{
                  background: 'rgba(20, 25, 40, 0.95)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <button
                  onClick={() => setShowAddModal(false)}
                  className="absolute top-4 right-4 p-2 rounded-full"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <X className="w-5 h-5 text-white/60" />
                </button>

                <h3 className="text-xl font-bold text-white mb-6 text-center">
                  Adaugă băutură
                </h3>

                <div className="grid grid-cols-4 gap-2 mb-6">
                  {beverageTypes.map(beverage => {
                    const Icon = beverage.icon;
                    const isSelected = selectedBeverage.id === beverage.id;
                    return (
                      <button
                        key={beverage.id}
                        onClick={() => setSelectedBeverage(beverage)}
                        className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-all ${
                          isSelected ? 'ring-2 ring-[#00d4aa]' : ''
                        }`}
                        style={{
                          background: isSelected ? `${beverage.color}20` : 'rgba(255, 255, 255, 0.05)',
                          border: `1px solid ${isSelected ? beverage.color : 'rgba(255, 255, 255, 0.1)'}`,
                        }}
                      >
                        <Icon className="w-5 h-5" style={{ color: beverage.color }} />
                        <span className="text-white/80 text-xs">{beverage.name}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-center gap-6 mb-6">
                  <button
                    onClick={() => setCustomAmount(Math.max(50, customAmount - 50))}
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <Minus className="w-5 h-5 text-white" />
                  </button>
                  
                  <div className="text-center">
                    <span className="text-4xl font-bold text-white">{customAmount}</span>
                    <span className="text-white/50 text-lg ml-1">ml</span>
                  </div>
                  
                  <button
                    onClick={() => setCustomAmount(Math.min(1000, customAmount + 50))}
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <Plus className="w-5 h-5 text-white" />
                  </button>
                </div>

                <div className="flex gap-2 mb-6">
                  {[100, 200, 250, 500].map(amount => (
                    <button
                      key={amount}
                      onClick={() => setCustomAmount(amount)}
                      className={`flex-1 py-2 rounded-lg text-sm transition-all ${
                        customAmount === amount ? 'bg-[#00d4aa] text-[#0a0f1a]' : 'bg-white/5 text-white/60'
                      }`}
                    >
                      {amount}ml
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => addBeverage(selectedBeverage, customAmount)}
                  className="w-full py-4 rounded-2xl font-semibold transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #00d4aa 0%, #00a388 100%)',
                    color: '#0a0f1a',
                  }}
                >
                  Adaugă {customAmount}ml {selectedBeverage.name}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Navigation />
    </div>
  );
}
