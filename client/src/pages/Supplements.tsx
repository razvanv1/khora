/*
 * KHORA Supplements Page - Premium Apple VisionOS 2026
 * Design: Cosmic Blue + Golden Accent + Glassmorphism
 * Limba: Română
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pill, Plus, Clock, Check, X, Trash2, Info, Sun, Zap, Brain, Heart, Leaf } from "lucide-react";
import Navigation from "@/components/Navigation";

const supplementSuggestions: Record<string, string[]> = {
  "Vitamine": ["Vitamina B12", "Vitamina D3", "Vitamina C", "Vitamina E", "Vitamina K2", "Complex B", "Acid Folic"],
  "Minerale": ["Magneziu", "Zinc", "Fier", "Calciu", "Seleniu", "Iod", "Potasiu"],
  "Adaptogeni": ["Ashwagandha", "Rhodiola", "Ginseng", "Maca", "Reishi", "Lion's Mane", "Cordyceps"],
  "Superfoods": ["Spirulina", "Chlorella", "Moringa", "Acai", "Goji", "Camu Camu", "Baobab"],
  "Digestie": ["Probiotice", "Prebiotice", "Enzime digestive", "Fibre", "L-Glutamina"],
  "Acizi grași": ["Omega-3 (Alge)", "DHA", "EPA", "GLA", "Ulei de in"],
};

const supplementCategories = [
  { id: "vitamine", name: "Vitamine", color: "#f59e0b", icon: Sun },
  { id: "minerale", name: "Minerale", color: "#60a5fa", icon: Zap },
  { id: "adaptogeni", name: "Adaptogeni", color: "#a78bfa", icon: Brain },
  { id: "superfoods", name: "Superfoods", color: "#22c55e", icon: Leaf },
  { id: "digestie", name: "Digestie", color: "#3b82f6", icon: Heart },
  { id: "acizi-grasi", name: "Acizi grași", color: "#eab308", icon: Heart },
];

interface Supplement {
  id: string;
  name: string;
  time: string;
  category: string;
  taken: boolean;
  note?: string;
}

const defaultSupplements: Supplement[] = [
  { id: "1", name: "Vitamina B12", time: "08:00", category: "Vitamine", taken: false, note: "Esențial pentru vegani" },
  { id: "2", name: "Vitamina D3", time: "08:00", category: "Vitamine", taken: false, note: "Cu mâncare grasă" },
  { id: "3", name: "Omega-3 (Alge)", time: "12:00", category: "Acizi grași", taken: false, note: "Sursă vegană DHA/EPA" },
  { id: "4", name: "Magneziu", time: "21:00", category: "Minerale", taken: false, note: "Seara pentru somn" },
];

export default function Supplements() {
  const [supplements, setSupplements] = useState<Supplement[]>(() => {
    const saved = localStorage.getItem('khora_supplements_list');
    return saved ? JSON.parse(saved) : defaultSupplements;
  });
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSupplement, setNewSupplement] = useState({ name: "", time: "08:00", category: "Vitamine", note: "" });
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    localStorage.setItem('khora_supplements_list', JSON.stringify(supplements));
  }, [supplements]);

  // Reset taken status daily
  useEffect(() => {
    const lastReset = localStorage.getItem('khora_supplements_reset');
    const today = new Date().toDateString();
    if (lastReset !== today) {
      setSupplements(prev => prev.map(s => ({ ...s, taken: false })));
      localStorage.setItem('khora_supplements_reset', today);
    }
  }, []);

  const takenCount = supplements.filter(s => s.taken).length;
  const progress = supplements.length > 0 ? (takenCount / supplements.length) * 100 : 0;

  const toggleSupplement = (id: string) => {
    setSupplements(prev => prev.map(s => s.id === id ? { ...s, taken: !s.taken } : s));
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

  const deleteSupplement = (id: string) => {
    setSupplements(prev => prev.filter(s => s.id !== id));
  };

  const groupedByTime = supplements.reduce((acc, sup) => {
    if (!acc[sup.time]) acc[sup.time] = [];
    acc[sup.time].push(sup);
    return acc;
  }, {} as Record<string, Supplement[]>);

  const sortedTimes = Object.keys(groupedByTime).sort();
  const currentSuggestions = supplementSuggestions[newSupplement.category] || [];

  return (
    <div className="min-h-screen bg-[#0a1628] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40" style={{ backgroundImage: 'url(/images/khora_supplements.png)' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/60 via-[#0a1628]/80 to-[#0a1628]" />

      <div className="relative z-10 min-h-screen px-6 pt-12 pb-32">
        {/* Header */}
        <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
          <h1 className="text-2xl font-light text-white mb-1">Suplimente</h1>
          <p className="text-white/50 text-sm">Tracking zilnic vitamine și minerale</p>
        </motion.header>

        {/* Progress */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-5 rounded-2xl mb-6" style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/70 text-sm">Progres Azi</span>
            <span className="text-[#d4a574] font-medium">{takenCount}/{supplements.length}</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, #d4a574 0%, #2dd4bf 100%)' }} />
          </div>
        </motion.div>

        {/* Info */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="p-4 rounded-xl mb-6 flex items-start gap-3" style={{ background: 'rgba(212, 165, 116, 0.1)', border: '1px solid rgba(212, 165, 116, 0.2)' }}>
          <Info className="w-5 h-5 text-[#d4a574] flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="text-[#d4a574] font-medium mb-1">Esențiale pentru vegani:</p>
            <p className="text-white/60">B12 (obligatoriu), D3 (iarna), Omega-3 din alge, Iod și Zinc</p>
          </div>
        </motion.div>

        {/* Supplements List */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          {sortedTimes.length > 0 ? (
            sortedTimes.map((time) => (
              <div key={time} className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-white/40" />
                  <span className="text-white/60 text-sm">{time}</span>
                </div>
                <div className="space-y-2">
                  {groupedByTime[time].map((supplement) => {
                    const category = supplementCategories.find(c => c.name === supplement.category);
                    return (
                      <div key={supplement.id} className="flex items-center justify-between p-4 rounded-xl" style={{ background: supplement.taken ? 'rgba(45, 212, 191, 0.1)' : 'rgba(255, 255, 255, 0.04)', border: supplement.taken ? '1px solid rgba(45, 212, 191, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)' }}>
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${category?.color || '#666'}20` }}>
                            <Pill className="w-5 h-5" style={{ color: category?.color || '#666' }} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className={`font-medium text-sm truncate ${supplement.taken ? 'text-white/50 line-through' : 'text-white'}`}>{supplement.name}</p>
                            <p className="text-white/40 text-xs truncate">{supplement.category}{supplement.note && ` • ${supplement.note}`}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button onClick={() => deleteSupplement(supplement.id)} className="p-2 rounded-lg hover:bg-white/10">
                            <Trash2 className="w-4 h-4 text-white/30 hover:text-red-400" />
                          </button>
                          <button onClick={() => toggleSupplement(supplement.id)} className={`w-8 h-8 rounded-full flex items-center justify-center ${supplement.taken ? 'bg-[#2dd4bf]' : 'bg-white/10 border border-white/20'}`}>
                            {supplement.taken && <Check className="w-5 h-5 text-[#0a1628]" />}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 rounded-xl mb-4" style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <Pill className="w-10 h-10 text-white/20 mx-auto mb-3" />
              <p className="text-white/40">Niciun supliment adăugat</p>
            </div>
          )}

          {/* Add Button */}
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setShowAddModal(true)} className="w-full p-4 rounded-2xl font-medium flex items-center justify-center gap-2 text-[#0a1628] mt-4" style={{ background: 'linear-gradient(135deg, #d4a574 0%, #e8c9a8 100%)', boxShadow: '0 0 30px rgba(212, 165, 116, 0.3)' }}>
            <Plus className="w-5 h-5" />
            Adaugă Supliment
          </motion.button>
        </motion.div>

        {/* Add Modal */}
        <AnimatePresence>
          {showAddModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: 'rgba(0,0,0,0.6)' }} onClick={() => setShowAddModal(false)}>
              <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25 }} className="w-full max-w-lg p-6 rounded-t-3xl max-h-[85vh] overflow-y-auto" style={{ background: '#0f1729', border: '1px solid rgba(255, 255, 255, 0.1)' }} onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-medium text-white">Adaugă Supliment</h2>
                  <button onClick={() => setShowAddModal(false)} className="text-white/50 hover:text-white"><X className="w-6 h-6" /></button>
                </div>

                {/* Category */}
                <div className="mb-4">
                  <label className="text-white/70 text-sm mb-2 block">Categorie</label>
                  <div className="grid grid-cols-3 gap-2">
                    {supplementCategories.map(cat => (
                      <button key={cat.id} onClick={() => { setNewSupplement(prev => ({ ...prev, category: cat.name, name: "" })); setShowSuggestions(true); }} className="py-2 px-3 rounded-lg text-xs font-medium" style={{ background: newSupplement.category === cat.name ? `${cat.color}20` : 'rgba(255, 255, 255, 0.05)', color: newSupplement.category === cat.name ? cat.color : 'rgba(255, 255, 255, 0.6)', border: `1px solid ${newSupplement.category === cat.name ? cat.color : 'rgba(255, 255, 255, 0.1)'}` }}>
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Suggestions */}
                {showSuggestions && currentSuggestions.length > 0 && (
                  <div className="mb-4">
                    <label className="text-white/70 text-sm mb-2 block">Sugestii</label>
                    <div className="flex flex-wrap gap-2">
                      {currentSuggestions.map(suggestion => (
                        <button key={suggestion} onClick={() => setNewSupplement(prev => ({ ...prev, name: suggestion }))} className="px-3 py-1.5 rounded-lg text-xs" style={{ background: newSupplement.name === suggestion ? 'rgba(212, 165, 116, 0.2)' : 'rgba(255, 255, 255, 0.05)', border: newSupplement.name === suggestion ? '1px solid rgba(212, 165, 116, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)', color: newSupplement.name === suggestion ? '#d4a574' : 'rgba(255,255,255,0.5)' }}>
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Name */}
                <div className="mb-4">
                  <label className="text-white/70 text-sm mb-2 block">Nume</label>
                  <input type="text" value={newSupplement.name} onChange={e => setNewSupplement(prev => ({ ...prev, name: e.target.value }))} placeholder="Ex: Vitamina B12" className="w-full px-4 py-3 rounded-xl text-white placeholder-white/30 outline-none" style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }} />
                </div>

                {/* Time */}
                <div className="mb-4">
                  <label className="text-white/70 text-sm mb-2 block">Ora</label>
                  <input type="time" value={newSupplement.time} onChange={e => setNewSupplement(prev => ({ ...prev, time: e.target.value }))} className="w-full px-4 py-3 rounded-xl text-white outline-none" style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }} />
                </div>

                {/* Note */}
                <div className="mb-6">
                  <label className="text-white/70 text-sm mb-2 block">Notă (opțional)</label>
                  <input type="text" value={newSupplement.note} onChange={e => setNewSupplement(prev => ({ ...prev, note: e.target.value }))} placeholder="Ex: Cu mâncare" className="w-full px-4 py-3 rounded-xl text-white placeholder-white/30 outline-none" style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }} />
                </div>

                {/* Add */}
                <button onClick={addSupplement} disabled={!newSupplement.name.trim()} className="w-full p-4 rounded-2xl font-medium text-[#0a1628] disabled:opacity-50" style={{ background: 'linear-gradient(135deg, #d4a574 0%, #e8c9a8 100%)' }}>
                  Adaugă
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Navigation />
    </div>
  );
}
