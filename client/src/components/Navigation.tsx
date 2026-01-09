/*
 * KHORA Navigation Component
 * Design: Premium Apple VisionOS 2026 - Glassmorphism
 * Limba: Română
 */

import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { 
  Compass, 
  ChefHat, 
  Droplets, 
  Pill,
  Sparkles,
  User
} from "lucide-react";

const navItems = [
  { path: "/", icon: Compass, label: "Acasă" },
  { path: "/pantry", icon: Sparkles, label: "Cămară" },
  { path: "/blender", icon: ChefHat, label: "Rețete" },
  { path: "/hydrate", icon: Droplets, label: "Hidratare" },
  { path: "/supplements", icon: Pill, label: "Suplimente" },
  { path: "/profile", icon: User, label: "Profil" },
];

export default function Navigation() {
  const [location] = useLocation();

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div 
        className="px-2 py-2 flex items-center gap-1 rounded-2xl"
        style={{
          background: 'rgba(10, 22, 40, 0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(212, 165, 116, 0.2)',
          boxShadow: '0 4px 24px -1px rgba(0, 0, 0, 0.4), 0 0 40px rgba(212, 165, 116, 0.1)',
        }}
      >
        {navItems.map((item) => {
          const isActive = location === item.path;
          const Icon = item.icon;
          
          return (
            <Link key={item.path} href={item.path}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  relative flex flex-col items-center justify-center
                  px-3 py-2 rounded-xl transition-all duration-300
                  ${isActive 
                    ? 'text-[#0a1628]' 
                    : 'text-white/50 hover:text-white/80'
                  }
                `}
                style={isActive ? {
                  background: 'linear-gradient(135deg, #d4a574 0%, #e8c9a8 100%)',
                  boxShadow: '0 0 20px rgba(212, 165, 116, 0.4)',
                } : {}}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] mt-1 font-medium">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
