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
  Info,
  Clock,
  Droplets,
  Pill,
  BellRing,
  TestTube
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useLanguage } from "@/i18n";
import { useReminders } from "@/hooks/useReminders";

const DAYS = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
const DAY_NAMES = ['Duminică', 'Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă'];

export default function Settings() {
  const { profile, saveProfile, clearProfile } = useUserProfile();
  const { language, setLanguage } = useLanguage();
  const {
    reminders,
    notificationPermission,
    requestPermission,
    toggleReminder,
    updateReminderTime,
    updateReminderDays,
    testNotification,
    hydrationReminders,
    supplementReminders
  } = useReminders();
  
  const [darkMode, setDarkMode] = useState(true);
  const [saved, setSaved] = useState(false);
  const [expandedReminder, setExpandedReminder] = useState<string | null>(null);

  const handleSave = () => {
    localStorage.setItem('khora_settings', JSON.stringify({
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
      localStorage.removeItem('khora_reminders');
      window.location.href = '/';
    }
  };

  const handleRequestPermission = async () => {
    const result = await requestPermission();
    if (result === 'granted') {
      testNotification();
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
          
          {/* Push Notifications Permission */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-5 rounded-2xl"
            style={{
              background: notificationPermission === 'granted' 
                ? 'rgba(45, 212, 191, 0.1)' 
                : 'rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(20px)',
              border: notificationPermission === 'granted'
                ? '1px solid rgba(45, 212, 191, 0.2)'
                : '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BellRing className={`w-5 h-5 ${notificationPermission === 'granted' ? 'text-[#2dd4bf]' : 'text-[#d4a574]'}`} />
                <div>
                  <h2 className="text-white font-medium">Notificări Push</h2>
                  <p className="text-white/50 text-xs">
                    {notificationPermission === 'granted' 
                      ? 'Notificările sunt activate' 
                      : notificationPermission === 'denied'
                        ? 'Notificările sunt blocate în browser'
                        : 'Activează pentru remindere'}
                  </p>
                </div>
              </div>
              
              {notificationPermission === 'granted' ? (
                <button
                  onClick={testNotification}
                  className="px-3 py-2 rounded-lg bg-[#2dd4bf]/20 text-[#2dd4bf] text-sm flex items-center gap-2"
                >
                  <TestTube className="w-4 h-4" />
                  Test
                </button>
              ) : notificationPermission !== 'denied' ? (
                <button
                  onClick={handleRequestPermission}
                  className="px-4 py-2 rounded-lg text-sm font-medium"
                  style={{ background: 'linear-gradient(135deg, #d4a574, #e8c9a8)', color: '#0a1628' }}
                >
                  Activează
                </button>
              ) : (
                <span className="text-red-400 text-xs">Blocat</span>
              )}
            </div>
          </motion.section>

          {/* Hydration Reminders */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="p-5 rounded-2xl"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Droplets className="w-5 h-5 text-[#60a5fa]" />
              <h2 className="text-white font-medium">Remindere Hidratare</h2>
            </div>
            
            <div className="space-y-3">
              {hydrationReminders.map(reminder => (
                <div key={reminder.id} className="rounded-xl bg-white/5 overflow-hidden">
                  <div 
                    className="flex items-center justify-between p-3 cursor-pointer"
                    onClick={() => setExpandedReminder(expandedReminder === reminder.id ? null : reminder.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-white/40" />
                      <span className="text-white/80 text-sm">{reminder.time}</span>
                      <span className="text-white/40 text-xs">
                        {reminder.days.length === 7 ? 'Zilnic' : reminder.days.map(d => DAYS[d]).join(', ')}
                      </span>
                    </div>
                    <label className="relative" onClick={e => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        checked={reminder.enabled}
                        onChange={() => toggleReminder(reminder.id)}
                        disabled={notificationPermission !== 'granted'}
                        className="sr-only peer"
                      />
                      <div className={`w-11 h-6 rounded-full transition-colors ${
                        reminder.enabled && notificationPermission === 'granted'
                          ? 'bg-[#2dd4bf]' 
                          : 'bg-white/20'
                      }`}>
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                          reminder.enabled ? 'translate-x-5' : ''
                        }`} />
                      </div>
                    </label>
                  </div>
                  
                  {expandedReminder === reminder.id && (
                    <div className="px-3 pb-3 space-y-3 border-t border-white/5 pt-3">
                      <div>
                        <label className="text-white/50 text-xs mb-1 block">Ora</label>
                        <input
                          type="time"
                          value={reminder.time}
                          onChange={(e) => updateReminderTime(reminder.id, e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-white/10 text-white border border-white/10 text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-white/50 text-xs mb-1 block">Zile</label>
                        <div className="flex gap-1">
                          {DAYS.map((day, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                const newDays = reminder.days.includes(index)
                                  ? reminder.days.filter(d => d !== index)
                                  : [...reminder.days, index].sort();
                                updateReminderDays(reminder.id, newDays);
                              }}
                              className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                                reminder.days.includes(index)
                                  ? 'bg-[#2dd4bf]/20 text-[#2dd4bf] border border-[#2dd4bf]/30'
                                  : 'bg-white/5 text-white/40 border border-white/10'
                              }`}
                            >
                              {day}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.section>

          {/* Supplement Reminders */}
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
              <Pill className="w-5 h-5 text-[#a78bfa]" />
              <h2 className="text-white font-medium">Remindere Suplimente</h2>
            </div>
            
            <div className="space-y-3">
              {supplementReminders.map(reminder => (
                <div key={reminder.id} className="rounded-xl bg-white/5 overflow-hidden">
                  <div 
                    className="flex items-center justify-between p-3 cursor-pointer"
                    onClick={() => setExpandedReminder(expandedReminder === reminder.id ? null : reminder.id)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{reminder.title.split(' ')[0]}</span>
                      <div>
                        <span className="text-white/80 text-sm">{reminder.title.split(' ').slice(1).join(' ')}</span>
                        <span className="text-white/40 text-xs ml-2">{reminder.time}</span>
                      </div>
                    </div>
                    <label className="relative" onClick={e => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        checked={reminder.enabled}
                        onChange={() => toggleReminder(reminder.id)}
                        disabled={notificationPermission !== 'granted'}
                        className="sr-only peer"
                      />
                      <div className={`w-11 h-6 rounded-full transition-colors ${
                        reminder.enabled && notificationPermission === 'granted'
                          ? 'bg-[#a78bfa]' 
                          : 'bg-white/20'
                      }`}>
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                          reminder.enabled ? 'translate-x-5' : ''
                        }`} />
                      </div>
                    </label>
                  </div>
                  
                  {expandedReminder === reminder.id && (
                    <div className="px-3 pb-3 space-y-3 border-t border-white/5 pt-3">
                      <div>
                        <label className="text-white/50 text-xs mb-1 block">Ora</label>
                        <input
                          type="time"
                          value={reminder.time}
                          onChange={(e) => updateReminderTime(reminder.id, e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-white/10 text-white border border-white/10 text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-white/50 text-xs mb-1 block">Zile</label>
                        <div className="flex gap-1">
                          {DAYS.map((day, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                const newDays = reminder.days.includes(index)
                                  ? reminder.days.filter(d => d !== index)
                                  : [...reminder.days, index].sort();
                                updateReminderDays(reminder.id, newDays);
                              }}
                              className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                                reminder.days.includes(index)
                                  ? 'bg-[#a78bfa]/20 text-[#a78bfa] border border-[#a78bfa]/30'
                                  : 'bg-white/5 text-white/40 border border-white/10'
                              }`}
                            >
                              {day}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.section>

          {/* Language */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
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

          {/* Privacy */}
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
              <h2 className="text-white font-medium">Confidențialitate</h2>
            </div>
            
            <div className="p-3 rounded-xl bg-white/5 mb-4">
              <div className="flex items-start gap-3">
                <Info className="w-4 h-4 text-white/40 mt-0.5 flex-shrink-0" />
                <p className="text-white/60 text-xs leading-relaxed">
                  Datele tale sunt stocate local în browser-ul tău. Nu trimitem date personale către servere externe. 
                  Poți șterge toate datele oricând folosind butonul de mai jos.
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              <Link href="/privacy">
                <button className="w-full p-3 rounded-xl bg-white/5 text-white/80 text-sm text-left hover:bg-white/10 transition-colors">
                  Politica de confidențialitate →
                </button>
              </Link>
              <Link href="/terms">
                <button className="w-full p-3 rounded-xl bg-white/5 text-white/80 text-sm text-left hover:bg-white/10 transition-colors">
                  Termeni și condiții →
                </button>
              </Link>
            </div>
          </motion.section>

          {/* Danger Zone */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="p-5 rounded-2xl"
            style={{
              background: 'rgba(239, 68, 68, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Trash2 className="w-5 h-5 text-red-400" />
              <h2 className="text-red-400 font-medium">Zonă Periculoasă</h2>
            </div>
            
            <button
              onClick={handleDeleteAccount}
              className="w-full p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm hover:bg-red-500/20 transition-colors"
            >
              Șterge toate datele
            </button>
          </motion.section>

          {/* Save Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={handleSave}
            className="w-full p-4 rounded-2xl font-medium flex items-center justify-center gap-2 transition-all"
            style={{ 
              background: saved 
                ? 'rgba(34, 197, 94, 0.2)' 
                : 'linear-gradient(135deg, #d4a574 0%, #e8c9a8 100%)', 
              color: saved ? '#22c55e' : '#0a1628',
              border: saved ? '1px solid rgba(34, 197, 94, 0.3)' : 'none'
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
          </motion.button>

        </div>
      </div>

      <Navigation />
      <Footer />
    </div>
  );
}
