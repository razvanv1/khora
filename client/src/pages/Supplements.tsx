/*
 * KHORA Supplements Page - Supplement Tracking
 * Design: Premium Apple Glass - Clean, functional
 * Features: Daily supplements, add any supplement, timing
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pill, Plus, Clock, Check, X, Trash2, Info } from "lucide-react";
import CosmicBackground from "@/components/CosmicBackground";
import Navigation from "@/components/Navigation";

// Supplement suggestions by category
const supplementSuggestions: Record<string, string[]> = {
  "Vitamine": ["Vitamina B12", "Vitamina D3", "Vitamina C", "Vitamina E", "Vitamina K2", "Complex B", "Acid Folic"],
  "Minerale": ["Magneziu", "Zinc", "Fier", "Calciu", "Seleniu", "Iod", "Potasiu"],
  "Adaptogeni": ["Ashwagandha", "Rhodiola", "Ginseng", "Maca", "Reishi", "Lion's Mane", "Cordyceps"],
  "Superfoods": ["Spirulina", "Chlorella", "Moringa", "Acai", "Goji", "Camu Camu", "Baobab"],
  "Digestie": ["Probiotice", "Prebiotice", "Enzime digestive", "Fibre", "L-Glutamina"],
  "Acizi grași": ["Omega-3 (Alge)", "DHA", "EPA", "GLA", "Ulei de in"],
};

// Default supplements
const defaultSupplements = [
  { id: "1", name: "Vitamina B12", time: "08:00", category: "Vitamine", taken: false, note: "Esențial pentru vegani - 2500mcg/săptămână" },
  { id: "2", name: "Vitamina D3", time: "08:00", category: "Vitamine", taken: false, note: "Cu mâncare grasă pentru absorbție" },
  { id: "3", name: "Omega-3 (Alge)", time: "12:00", category: "Acizi grași", taken: false, note: "Sursă vegană de DHA și EPA" },
  { id: "4", name: "Magneziu", time: "21:00", category: "Minerale", taken: false, note: "Seara pentru somn mai bun" },
];

const supplementCategories = [
  { id: "vitamine", name: "Vitamine", color: "#f97316" },
  { id: "minerale", name: "Minerale", color: "#8b5cf6" },
  { id: "adaptogeni", name: "Adaptogeni", color: "#22c55e" },
  { id: "superfoods", name: "Superfoods", color: "#00d4aa" },
  { id: "digestie", name: "Digestie", color: "#3b82f6" },
  { id: "acizi-grasi", name: "Acizi grași", color: "#eab308" },
];

interface Supplement {
  id: string;
  name: string;
  time: string;
  category: string;
  taken: boolean;
  note?: string;
}

export default function Supplements() {
  const [supplements, setSupplements] = useState<Supplement[]>(defaultSupplements);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSupplement, setNewSupplement] = useState({ 
    name: "", 
    time: "08:00", 
    category: "Vitamine",
    note: ""
  });
  const [showSuggestions, setShowSuggestions] = useState(false);

  const takenCount = supplements.filter(s => s.taken).length;
  const progress = supplements.length > 0 ? (takenCount / supplements.length) * 100 : 0;

  const toggleSupplement = (id: string) => {
    setSupplements(prev => 
      prev.map(s => s.id === id ? { ...s, taken: !s.taken } : s)
    );
  };

  const addSupplement = () => {
    if (newSupplement.name.trim()) {
      const newSupp: Supplement = {
        id: Date.now().toString(),
        name: newSupplement.name.trim(),
        time: newSupplement.time,
        category: newSupplement.category,
        taken: false,
        note: newSupplement.note || undefined,
      };
      setSupplements(prev => [...prev, newSupp]);
      setNewSupplement({ name: "", time: "08:00", category: "Vitamine", note: "" });
      setShowAddModal(false);
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (suggestion: string) => {
    setNewSupplement(prev => ({ ...prev, name: suggestion }));
    setShowSuggestions(false);
  };

  const deleteSupplement = (id: string) => {
    setSupplements(prev => prev.filter(s => s.id !== id));
  };

  // Group supplements by time
  const groupedByTime = supplements.reduce((acc, sup) => {
    const timeKey = sup.time;
    if (!acc[timeKey]) acc[timeKey] = [];
    acc[timeKey].push(sup);
    return acc;
  }, {} as Record<string, Supplement[]>);

  const sortedTimes = Object.keys(groupedByTime).sort();

  // Get current suggestions based on selected category
  const currentSuggestions = supplementSuggestions[newSupplement.category] || [];

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
            Suplimente
          </h1>
          <p className="text-white/50 text-sm">
            Tracking zilnic pentru suplimente esențiale
          </p>
        </motion.header>

        {/* Progress */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="px-6 py-6"
        >
          <div 
            className="p-5 rounded-2xl"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-white font-medium">Progres zilnic</span>
              <span className="text-[#00d4aa] font-semibold">{takenCount}/{supplements.length}</span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #00d4aa 0%, #22c55e 100%)' }}
              />
            </div>
            {progress === 100 && (
              <p className="text-[#00d4aa] text-sm mt-2 text-center">
                Toate suplimentele luate azi!
              </p>
            )}
          </div>
        </motion.section>

        {/* Info Box */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="px-6 mb-4"
        >
          <div 
            className="p-4 rounded-xl flex items-start gap-3"
            style={{
              background: 'rgba(249, 115, 22, 0.1)',
              border: '1px solid rgba(249, 115, 22, 0.2)',
            }}
          >
            <Info className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="text-orange-300 font-medium mb-1">Suplimente esențiale pentru vegani:</p>
              <p className="text-white/60">B12 (obligatoriu), D3 (iarna), Omega-3 din alge, eventual Iod și Zinc</p>
            </div>
          </div>
        </motion.section>

        {/* Supplements by Time */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="px-6"
        >
          {sortedTimes.length > 0 ? (
            sortedTimes.map((time) => (
              <div key={time} className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-white/40" />
                  <span className="text-white/60 text-sm font-medium">{time}</span>
                </div>
                
                <div className="space-y-2">
                  {groupedByTime[time].map((supplement, index) => {
                    const category = supplementCategories.find(c => c.name === supplement.category);
                    return (
                      <motion.div
                        key={supplement.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-center justify-between p-4 rounded-xl transition-all"
                        style={{
                          background: supplement.taken 
                            ? 'rgba(0, 212, 170, 0.1)' 
                            : 'rgba(255, 255, 255, 0.04)',
                          border: supplement.taken 
                            ? '1px solid rgba(0, 212, 170, 0.2)' 
                            : '1px solid rgba(255, 255, 255, 0.08)',
                        }}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div 
                            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: `${category?.color || '#666'}20` }}
                          >
                            <Pill className="w-5 h-5" style={{ color: category?.color || '#666' }} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className={`font-medium text-sm truncate ${supplement.taken ? 'text-white line-through opacity-60' : 'text-white/80'}`}>
                              {supplement.name}
                            </p>
                            <p className="text-white/40 text-xs truncate">
                              {supplement.category}
                              {supplement.note && ` • ${supplement.note}`}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            onClick={() => deleteSupplement(supplement.id)}
                            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-white/30 hover:text-red-400" />
                          </button>
                          <button
                            onClick={() => toggleSupplement(supplement.id)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                              supplement.taken 
                                ? 'bg-[#00d4aa]' 
                                : 'bg-white/10 border border-white/20'
                            }`}
                          >
                            {supplement.taken && <Check className="w-5 h-5 text-[#0a0f1a]" />}
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <div 
              className="text-center py-8 rounded-xl mb-4"
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              <Pill className="w-10 h-10 text-white/20 mx-auto mb-3" />
              <p className="text-white/40">Niciun supliment adăugat</p>
              <p className="text-white/30 text-sm">Apasă butonul de mai jos pentru a adăuga</p>
            </div>
          )}

          {/* Add Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="w-full py-4 rounded-xl text-white/60 flex items-center justify-center gap-2 transition-colors hover:text-white hover:bg-white/5"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px dashed rgba(255, 255, 255, 0.1)',
            }}
          >
            <Plus className="w-5 h-5" />
            Adaugă supliment
          </button>
        </motion.section>

        {/* Add Modal */}
        <AnimatePresence>
          {showAddModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-end justify-center p-4"
              onClick={() => {
                setShowAddModal(false);
                setShowSuggestions(false);
              }}
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
                className="relative w-full max-w-md rounded-3xl p-6 max-h-[85vh] overflow-y-auto"
                style={{
                  background: 'rgba(20, 25, 40, 0.98)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setShowSuggestions(false);
                  }}
                  className="absolute top-4 right-4 p-2 rounded-full"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <X className="w-5 h-5 text-white/60" />
                </button>

                <h3 className="text-xl font-bold text-white mb-6">
                  Adaugă supliment
                </h3>

                {/* Category Selection FIRST */}
                <div className="mb-4">
                  <label className="text-white/60 text-sm mb-2 block">Categorie</label>
                  <div className="grid grid-cols-3 gap-2">
                    {supplementCategories.map(cat => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setNewSupplement(prev => ({ ...prev, category: cat.name, name: "" }));
                          setShowSuggestions(true);
                        }}
                        className="py-2 px-3 rounded-lg text-xs font-medium transition-all"
                        style={{
                          background: newSupplement.category === cat.name ? `${cat.color}20` : 'rgba(255, 255, 255, 0.05)',
                          color: newSupplement.category === cat.name ? cat.color : 'rgba(255, 255, 255, 0.6)',
                          border: `1px solid ${newSupplement.category === cat.name ? cat.color : 'rgba(255, 255, 255, 0.1)'}`,
                        }}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Suggestions */}
                {showSuggestions && currentSuggestions.length > 0 && (
                  <div className="mb-4">
                    <label className="text-white/60 text-sm mb-2 block">Sugestii rapide</label>
                    <div className="flex flex-wrap gap-2">
                      {currentSuggestions.map(suggestion => (
                        <button
                          key={suggestion}
                          type="button"
                          onClick={() => selectSuggestion(suggestion)}
                          className="px-3 py-1.5 rounded-lg text-xs transition-all hover:bg-white/10"
                          style={{
                            background: newSupplement.name === suggestion ? 'rgba(0, 212, 170, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                            border: newSupplement.name === suggestion ? '1px solid rgba(0, 212, 170, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
                            color: newSupplement.name === suggestion ? '#00d4aa' : 'rgba(255, 255, 255, 0.7)',
                          }}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Name Input */}
                <div className="mb-4">
                  <label className="text-white/60 text-sm mb-2 block">Nume (sau scrie manual)</label>
                  <input
                    type="text"
                    value={newSupplement.name}
                    onChange={(e) => setNewSupplement(prev => ({ ...prev, name: e.target.value }))}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Ex: Vitamina B12, Fier, Zinc..."
                    className="w-full px-4 py-3 rounded-xl text-white placeholder-white/30 outline-none"
                    style={{
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  />
                </div>

                {/* Time Input */}
                <div className="mb-4">
                  <label className="text-white/60 text-sm mb-2 block">Ora de administrare</label>
                  <div className="grid grid-cols-4 gap-2 mb-2">
                    {["08:00", "12:00", "18:00", "21:00"].map(time => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setNewSupplement(prev => ({ ...prev, time }))}
                        className="py-2 rounded-lg text-sm transition-all"
                        style={{
                          background: newSupplement.time === time ? 'rgba(0, 212, 170, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                          border: newSupplement.time === time ? '1px solid rgba(0, 212, 170, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
                          color: newSupplement.time === time ? '#00d4aa' : 'rgba(255, 255, 255, 0.6)',
                        }}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                  <input
                    type="time"
                    value={newSupplement.time}
                    onChange={(e) => setNewSupplement(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-white outline-none"
                    style={{
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  />
                </div>

                {/* Note Input */}
                <div className="mb-6">
                  <label className="text-white/60 text-sm mb-2 block">Notă (opțional)</label>
                  <input
                    type="text"
                    value={newSupplement.note}
                    onChange={(e) => setNewSupplement(prev => ({ ...prev, note: e.target.value }))}
                    placeholder="Ex: Cu mâncare, pe stomacul gol..."
                    className="w-full px-4 py-3 rounded-xl text-white placeholder-white/30 outline-none"
                    style={{
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  />
                </div>

                <button
                  onClick={addSupplement}
                  disabled={!newSupplement.name.trim()}
                  className="w-full py-4 rounded-2xl font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    background: newSupplement.name.trim() 
                      ? 'linear-gradient(135deg, #00d4aa 0%, #00a388 100%)'
                      : 'rgba(255, 255, 255, 0.1)',
                    color: newSupplement.name.trim() ? '#0a0f1a' : 'rgba(255, 255, 255, 0.4)',
                  }}
                >
                  Adaugă {newSupplement.name || "supliment"}
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
