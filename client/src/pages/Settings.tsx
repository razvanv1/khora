/*
 * KHORA Settings Page - Setări Profil
 * Permite utilizatorilor să-și modifice preferințele
 */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  ArrowLeft, 
  Bell, 
  Moon, 
  Globe, 
  Shield, 
  Trash2,
  Save,
  Check,
  Info
} from "lucide-react";
import Navigation from "@/components/Navigation";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useLanguage } from "@/i18n";

export default function Settings() {
  const { profile, saveProfile, clearProfile } = useUserProfile();
  const { language, setLanguage } = useLanguage();
  
  const [notifications, setNotifications] = useState({
    hydration: true,
    supplements: true,
    recipes: false
  });
  
  const [darkMode, setDarkMode] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('khora_settings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setNotifications(parsed.notifications || notifications);
      setDarkMode(parsed.darkMode ?? true);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('khora_settings', JSON.stringify({
      notifications,
      darkMode,
      language
    }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDeleteAccount = () => {
    if (confirm('Ești sigur că vrei să ștergi toate datele? Această acțiune este ireversibilă.')) {
      clearProfile();
      localStorage.removeItem('khora_settings');
      localStorage.removeItem('khora_hydration');
      localStorage.removeItem('khora_supplements');
      localStorage.removeItem('khora_favorites');
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1628] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0f2847] to-[#0a1628]" />

      {/* Content */}
      <div className="relative z-10 min-h-screen px-6 pt-12 pb-32">
        
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <Link href="/profile">
            <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <ArrowLeft className="w-5 h-5 text-white/70" />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-light text-white">Setări</h1>
            <p className="text-white/50 text-sm">Personalizează experiența ta</p>
          </div>
        </motion.header>

        {/* Settings Sections */}
        <div className="space-y-6">
          
          {/* Notifications */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-5 rounded-2xl"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-5 h-5 text-[#d4a574]" />
              <h2 className="text-white font-medium">Notificări</h2>
            </div>
            
            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <span className="text-white/80 text-sm">Remindere hidratare</span>
                <input 
                  type="checkbox" 
                  checked={notifications.hydration}
                  onChange={(e) => setNotifications({...notifications, hydration: e.target.checked})}
                  className="w-5 h-5 rounded accent-[#2dd4bf]"
                />
              </label>
              
              <label className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <span className="text-white/80 text-sm">Remindere suplimente</span>
                <input 
                  type="checkbox" 
                  checked={notifications.supplements}
                  onChange={(e) => setNotifications({...notifications, supplements: e.target.checked})}
                  className="w-5 h-5 rounded accent-[#2dd4bf]"
                />
              </label>
              
              <label className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <span className="text-white/80 text-sm">Sugestii rețete noi</span>
                <input 
                  type="checkbox" 
                  checked={notifications.recipes}
                  onChange={(e) => setNotifications({...notifications, recipes: e.target.checked})}
                  className="w-5 h-5 rounded accent-[#2dd4bf]"
                />
              </label>
            </div>
          </motion.section>

          {/* Language */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-5 rounded-2xl"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-5 h-5 text-[#60a5fa]" />
              <h2 className="text-white font-medium">Limbă</h2>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setLanguage('ro')}
                className={`flex-1 p-3 rounded-xl text-sm font-medium transition-all ${
                  language === 'ro' 
                    ? 'bg-[#2dd4bf]/20 text-[#2dd4bf] border border-[#2dd4bf]/30' 
                    : 'bg-white/5 text-white/60 border border-white/10'
                }`}
              >
                🇷🇴 Română
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`flex-1 p-3 rounded-xl text-sm font-medium transition-all ${
                  language === 'en' 
                    ? 'bg-[#2dd4bf]/20 text-[#2dd4bf] border border-[#2dd4bf]/30' 
                    : 'bg-white/5 text-white/60 border border-white/10'
                }`}
              >
                🇬🇧 English
              </button>
            </div>
          </motion.section>

          {/* Privacy & Data */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-5 rounded-2xl"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-[#22c55e]" />
              <h2 className="text-white font-medium">Confidențialitate & Date</h2>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-white/5">
                <div className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-white/40 flex-shrink-0 mt-0.5" />
                  <p className="text-white/60 text-xs leading-relaxed">
                    Datele tale sunt stocate local în browser (localStorage) și nu sunt trimise către servere externe. 
                    Poți șterge oricând toate datele folosind butonul de mai jos.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Link href="/privacy" className="flex-1">
                  <button className="w-full p-3 rounded-xl bg-white/5 text-white/70 text-sm hover:bg-white/10 transition-colors">
                    Politica de Confidențialitate
                  </button>
                </Link>
                <Link href="/terms" className="flex-1">
                  <button className="w-full p-3 rounded-xl bg-white/5 text-white/70 text-sm hover:bg-white/10 transition-colors">
                    Termeni și Condiții
                  </button>
                </Link>
              </div>
            </div>
          </motion.section>

          {/* Danger Zone */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-5 rounded-2xl"
            style={{
              background: 'rgba(239, 68, 68, 0.05)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Trash2 className="w-5 h-5 text-red-400" />
              <h2 className="text-red-400 font-medium">Zonă Periculoasă</h2>
            </div>
            
            <p className="text-white/50 text-sm mb-4">
              Ștergerea contului va elimina toate datele tale: profil, preferințe, istoric hidratare, suplimente și rețete favorite.
            </p>
            
            <button
              onClick={handleDeleteAccount}
              className="w-full p-3 rounded-xl bg-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/30 transition-colors"
            >
              Șterge toate datele
            </button>
          </motion.section>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={handleSave}
              className="w-full py-4 rounded-xl text-white font-medium flex items-center justify-center gap-2 transition-all"
              style={{ 
                background: saved 
                  ? 'linear-gradient(135deg, #22c55e, #16a34a)' 
                  : 'linear-gradient(135deg, #d4a574, #b8956a)' 
              }}
            >
              {saved ? (
                <>
                  <Check className="w-5 h-5" />
                  Salvat!
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Salvează setările
                </>
              )}
            </button>
          </motion.div>

        </div>

        {/* Version */}
        <p className="text-center text-white/20 text-xs mt-8">
          KHORA v1.0 - Nutriție Holistică Vegană
        </p>
      </div>

      {/* Navigation */}
      <Navigation />
    </div>
  );
}
