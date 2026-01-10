import { useLanguage, type Language } from "@/i18n";
import { Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const languages: { code: Language; label: string; flag: string }[] = [
  { code: "ro", label: "Română", flag: "🇷🇴" },
  { code: "en", label: "English", flag: "🇬🇧" },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
        aria-label="Change language"
      >
        <Globe className="w-4 h-4 text-white/60" />
        <span className="text-sm text-white/80">{currentLang.flag}</span>
        <span className="text-sm text-white/60 hidden sm:inline">{currentLang.code.toUpperCase()}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 py-2 min-w-[140px] rounded-xl bg-[#0f1f35] border border-white/10 shadow-xl z-50"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full px-4 py-2 flex items-center gap-3 text-left hover:bg-white/5 transition-colors ${
                  language === lang.code ? "bg-white/10" : ""
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className={`text-sm ${language === lang.code ? "text-[#2dd4bf]" : "text-white/70"}`}>
                  {lang.label}
                </span>
                {language === lang.code && (
                  <motion.div
                    layoutId="active-lang"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-[#2dd4bf]"
                  />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
