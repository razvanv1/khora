/*
 * KHORA Landing Page - Design Premium tip Revistă
 * Branding, beneficii, probleme vegani, educație
 */

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, ArrowDown, Leaf, BookOpen, Utensils, Droplets,
  Heart, Brain, Sparkles, ChevronRight, Play, Check,
  AlertTriangle, Lightbulb, Users, TrendingUp
} from "lucide-react";
import { useLocation } from "wouter";

export default function Landing() {
  const [, setLocation] = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  const startOnboarding = () => {
    setLocation('/onboarding');
  };

  return (
    <div ref={containerRef} className="bg-[#0a1628] text-white">
      
      {/* ==================== HERO SECTION ==================== */}
      <motion.section 
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="min-h-screen relative flex flex-col items-center justify-center px-6 overflow-hidden"
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/khora_hero_bg.png)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/60 via-[#0a1628]/80 to-[#0a1628]" />
        
        {/* Content */}
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-7xl font-light tracking-wider mb-2">
              KH<span className="text-[#2dd4bf]">O</span>RA
            </h1>
            <p className="text-white/40 text-sm tracking-[0.3em] uppercase">
              Nutriție Holistică Vegană
            </p>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/70 font-light mb-12 leading-relaxed"
          >
            Ghidul tău complet pentru un stil de viață vegan 
            <span className="text-[#d4a574]"> sănătos</span>, 
            <span className="text-[#2dd4bf]"> echilibrat</span> și 
            <span className="text-[#a78bfa]"> sustenabil</span>.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onClick={startOnboarding}
            className="px-8 py-4 rounded-full text-white font-medium flex items-center gap-3 mx-auto group"
            style={{ background: 'linear-gradient(135deg, #d4a574, #b8956a)' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Începe Călătoria
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-white/30"
            >
              <span className="text-xs tracking-wider">Descoperă mai mult</span>
              <ArrowDown className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ==================== PROBLEMA VEGANILOR ==================== */}
      <section className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-[#ef4444]/80 text-sm tracking-wider uppercase mb-4 block">
              Provocarea
            </span>
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              Veganismul <span className="text-[#ef4444]">nu e simplu</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Mulți vegani se confruntă cu aceleași probleme. Khora le rezolvă pe toate.
            </p>
          </motion.div>

          {/* Problem Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: AlertTriangle,
                title: "Deficiențe nutriționale",
                desc: "B12, fier, zinc, omega-3 - fără un plan, corpul suferă în tăcere.",
                color: "#ef4444"
              },
              {
                icon: Utensils,
                title: "Ce gătesc azi?",
                desc: "Aceleași 5 rețete la nesfârșit. Plictiseala ucide motivația.",
                color: "#f97316"
              },
              {
                icon: BookOpen,
                title: "Informații contradictorii",
                desc: "Un articol zice una, altul zice opusul. Cui să crezi?",
                color: "#eab308"
              },
              {
                icon: TrendingUp,
                title: "Vegan ≠ Sănătos",
                desc: "Chips-uri vegane, maioneză vegetală, junk food 'plant-based' - capcane peste tot.",
                color: "#a855f7"
              }
            ].map((problem, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${problem.color}20` }}
                >
                  <problem.icon className="w-6 h-6" style={{ color: problem.color }} />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">{problem.title}</h3>
                <p className="text-white/50 text-sm">{problem.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SOLUȚIA KHORA ==================== */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: 'url(/images/khora_digital_blender.png)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-transparent to-[#0a1628]" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-[#2dd4bf]/80 text-sm tracking-wider uppercase mb-4 block">
              Soluția
            </span>
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              Khora <span className="text-[#2dd4bf]">te ghidează</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Un ecosistem complet pentru stilul tău de viață vegan. Totul personalizat pentru tine.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Sparkles,
                title: "Generator Rețete",
                desc: "Spune-ne ce ai în frigider. Primești rețete personalizate instant.",
                color: "#d4a574"
              },
              {
                icon: Droplets,
                title: "Tracking Hidratare",
                desc: "Calculăm cât ai nevoie. Tu doar bei și bifezi.",
                color: "#60a5fa"
              },
              {
                icon: Heart,
                title: "Suplimente Smart",
                desc: "Reminder-e pentru B12, D3, Omega-3. Nu mai uiți niciodată.",
                color: "#ec4899"
              },
              {
                icon: BookOpen,
                title: "Educație Vegană",
                desc: "Articole bazate pe știință, nu pe păreri. Învață ce contează.",
                color: "#a78bfa"
              },
              {
                icon: Brain,
                title: "Profil Personalizat",
                desc: "Calculăm caloriile, proteinele, apa - totul adaptat pentru tine.",
                color: "#2dd4bf"
              },
              {
                icon: Leaf,
                title: "Cămara Digitală",
                desc: "Organizează ingredientele. Vezi ce ai, ce lipsește, ce expiră.",
                color: "#84cc16"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group cursor-pointer"
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${feature.color}20` }}
                >
                  <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">{feature.title}</h3>
                <p className="text-white/50 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== EDUCAȚIE - VEGAN ≠ SĂNĂTOS ==================== */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#0a1628] via-[#0f1d32] to-[#0a1628]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-[#f97316]/80 text-sm tracking-wider uppercase mb-4 block">
              Educație
            </span>
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              Vegan <span className="text-[#f97316]">≠</span> Sănătos
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Cea mai mare capcană a veganismului: să crezi că orice e plant-based e automat sănătos.
            </p>
          </motion.div>

          {/* Comparison */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Bad */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-6 rounded-2xl bg-[#ef4444]/10 border border-[#ef4444]/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#ef4444]/20 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-[#ef4444]" />
                </div>
                <h3 className="text-lg font-medium text-[#ef4444]">Junk Food Vegan</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Maioneză vegetală (ulei rafinat 80%)",
                  "Chips-uri 'plant-based' (aceleași calorii goale)",
                  "Burgeri vegani ultra-procesați",
                  "Înghețată de cocos (zahăr + grăsimi)",
                  "Brânză vegană (amidon + ulei)"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-white/60 text-sm">
                    <span className="text-[#ef4444] mt-1">×</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Good */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-6 rounded-2xl bg-[#22c55e]/10 border border-[#22c55e]/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#22c55e]/20 flex items-center justify-center">
                  <Check className="w-5 h-5 text-[#22c55e]" />
                </div>
                <h3 className="text-lg font-medium text-[#22c55e]">Whole Food Vegan</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Leguminoase (proteine + fibre + minerale)",
                  "Nuci și semințe crude (omega-3 + zinc)",
                  "Legume proaspete (vitamine + antioxidanți)",
                  "Cereale integrale (energie susținută)",
                  "Fructe întregi (fibre + hidratare)"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-white/60 text-sm">
                    <span className="text-[#22c55e] mt-1">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Insight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 rounded-2xl bg-[#d4a574]/10 border border-[#d4a574]/20 text-center"
          >
            <Lightbulb className="w-8 h-8 text-[#d4a574] mx-auto mb-3" />
            <p className="text-white/70">
              În Khora, fiecare ingredient are un <strong className="text-[#d4a574]">Health Score</strong>. 
              Superfoods-urile primesc nota maximă. Junk food-ul vegan e marcat vizibil ca atare.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ==================== TESTIMONIALE / SOCIAL PROOF ==================== */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-[#a78bfa]/80 text-sm tracking-wider uppercase mb-4 block">
              Comunitate
            </span>
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              Nu ești <span className="text-[#a78bfa]">singur</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Mii de vegani folosesc Khora pentru a-și simplifica viața și a mânca mai sănătos.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-16">
            {[
              { value: "500+", label: "Ingrediente", color: "#2dd4bf" },
              { value: "100+", label: "Rețete", color: "#d4a574" },
              { value: "4", label: "Articole Educative", color: "#a78bfa" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-light mb-2" style={{ color: stat.color }}>
                  {stat.value}
                </p>
                <p className="text-white/40 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(/images/khora_onboarding_bg.png)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/90 to-[#0a1628]" />
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Gata să începi?
          </h2>
          <p className="text-white/50 text-lg mb-8">
            În 2 minute îți creezi profilul personalizat. Apoi, Khora face restul.
          </p>
          
          <motion.button
            onClick={startOnboarding}
            className="px-10 py-5 rounded-full text-white text-lg font-medium flex items-center gap-3 mx-auto group"
            style={{ background: 'linear-gradient(135deg, #d4a574, #b8956a)' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Creează-ți Profilul Gratuit
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <p className="text-white/30 text-sm mt-6">
            Fără card. Fără spam. Doar nutriție vegană personalizată.
          </p>
        </motion.div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-light tracking-wider">
              KH<span className="text-[#2dd4bf]">O</span>RA
            </span>
            <span className="text-white/30 text-sm">© 2026</span>
          </div>
          <div className="flex items-center gap-6 text-white/40 text-sm">
            <button onClick={() => setLocation('/blog')} className="hover:text-white transition-colors">
              Blog
            </button>
            <span className="text-white/20">|</span>
            <span>Nutriție Holistică Vegană</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
