/*
 * KHORA Navigation Component
 * Design: Premium Apple Glass - Clean navigation
 */

import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { 
  Compass, 
  ChefHat, 
  Droplets, 
  Pill,
  Sparkles,
  BookOpen
} from "lucide-react";

const navItems = [
  { path: "/", icon: Compass, label: "Acasă" },
  { path: "/pantry", icon: Sparkles, label: "Cămară" },
  { path: "/blender", icon: ChefHat, label: "Rețete" },
  { path: "/hydrate", icon: Droplets, label: "Hidratare" },
  { path: "/supplements", icon: Pill, label: "Suplimente" },
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
      <div className="px-2 py-2 flex items-center gap-1 rounded-2xl"
        style={{
          background: 'rgba(255, 255, 255, 0.06)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 24px -1px rgba(0, 0, 0, 0.3)',
        }}>
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
                    ? 'bg-gradient-to-r from-[#00d4aa] to-[#00a388] text-[#0a0f1a]' 
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] mt-1 font-medium">{item.label}</span>
                
                {isActive && (
                  <motion.div
                    layoutId="nav-glow"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      boxShadow: '0 0 20px rgba(0, 212, 170, 0.4)',
                    }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
