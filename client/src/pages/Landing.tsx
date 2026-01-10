/*
 * KHORA Landing Page - Design Premium tip Revistă
 * Branding, beneficii, probleme vegani, educație, Unlearning
 * Limba: Română
 */

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, ArrowDown, Leaf, BookOpen, Utensils, Droplets,
  Heart, Brain, Sparkles, ChevronDown, Check,
  AlertTriangle, Lightbulb, HelpCircle, X
} from "lucide-react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";

export default function Landing() {
  const [, setLocation] = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  const startOnboarding = () => {
    setLocation('/onboarding');
  };

  const goToBlog = () => {
    setLocation('/blog');
  };

  // FAQ Data
  const faqItems = [
    {
      question: "Ce înseamnă Khora?",
      answer: "Khora (χώρα) este un concept din filosofia greacă veche, introdus de Plato în dialogul Timaeus. Înseamnă 'spațiul care oferă un loc pentru a fi' - un receptacul de transformare. Pentru noi, Khora reprezintă spațiul în care te transformi prin alimentație conștientă. Nu doar mănânci - devii."
    },
    {
      question: "De ce 'Unlearning' (Dezvățare)?",
      answer: "Industria alimentară ne-a învățat că 'vegan = sănătos automat'. Aceasta este o minciună profitabilă. Khora te ajută să dezveti aceste mituri și să înveți adevărul: că chips-urile vegane sunt tot junk food, că maioneza vegetală e 80% ulei rafinat, că 'plant-based' nu înseamnă 'bun pentru tine'. Dezvățarea este primul pas spre o alimentație cu adevărat sănătoasă."
    },
    {
      question: "Khora este gratuită?",
      answer: "Da, Khora este complet gratuită. Creezi un profil personalizat, primești calcule nutriționale adaptate pentru tine, accesezi rețete și articole educative - totul fără costuri. Misiunea noastră este să facem educația nutrițională vegană accesibilă tuturor."
    },
    {
      question: "Ce face Khora diferită de alte aplicații?",
      answer: "Khora nu e doar un tracker de calorii. Este un ecosistem educațional care: (1) marchează vizibil junk food-ul vegan, (2) oferă un Health Score pentru fiecare ingredient, (3) calculează nu doar calorii, ci și micronutrienți critici pentru vegani (B12, fier, zinc, omega-3), (4) te învață să gândești critic despre ce mănânci."
    },
    {
      question: "Am nevoie de cunoștințe despre nutriție?",
      answer: "Nu. Khora este proiectată pentru oricine, de la începători la vegani experimentați. Îți punem întrebări simple (vârstă, greutate, obiective) și facem toate calculele în spate. Tu primești recomandări clare, fără jargon tehnic."
    }
  ];

  return (
    <div ref={containerRef} className="bg-[#0a1628] text-white">
      
      {/* ==================== HERO SECTION ==================== */}
      <motion.section 
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="min-h-screen relative flex flex-col items-center justify-center px-6 overflow-hidden"
      >
        {/* Background */}
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
            className="mb-6"
          >
            <h1 className="text-6xl md:text-7xl font-light tracking-wider mb-2">
              KH<span className="text-[#2dd4bf]">O</span>RA
            </h1>
            <p className="text-white/40 text-sm tracking-[0.3em] uppercase">
              χώρα · Spațiul Transformării
            </p>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/70 font-light mb-10 leading-relaxed"
          >
            Dezvață ce ai crezut despre nutriția vegană.
            <br />
            <span className="text-[#d4a574]">Învață ce contează cu adevărat.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={startOnboarding}
              className="px-8 py-4 rounded-full text-white font-medium flex items-center gap-3 group"
              style={{ background: 'linear-gradient(135deg, #d4a574, #b8956a)' }}
            >
              Începe Acum
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={goToBlog}
              className="px-8 py-4 rounded-full text-white/70 font-medium flex items-center gap-3 border border-white/20 hover:bg-white/5 transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              Citește Articolele
            </button>
          </motion.div>

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
              <span className="text-xs tracking-wider">Descoperă povestea</span>
              <ArrowDown className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ==================== CE ESTE KHORA ==================== */}
      <section className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-[#2dd4bf]/80 text-sm tracking-wider uppercase mb-4 block">
              Filosofie
            </span>
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              Ce este <span className="text-[#2dd4bf]">Khora</span>?
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-3xl bg-gradient-to-br from-[#2dd4bf]/10 to-[#0a1628] border border-[#2dd4bf]/20"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-24 h-24 rounded-2xl bg-[#2dd4bf]/20 flex items-center justify-center flex-shrink-0">
                <span className="text-4xl font-light text-[#2dd4bf]">χ</span>
              </div>
              <div>
                <p className="text-white/70 text-lg leading-relaxed mb-4">
                  <strong className="text-white">Khora (χώρα)</strong> este un concept din filosofia greacă veche, 
                  introdus de Plato. Înseamnă <em>"spațiul care oferă un loc pentru a fi"</em> - 
                  un receptacul de transformare, locul în care devenirea are loc.
                </p>
                <p className="text-white/50 leading-relaxed">
                  Pentru noi, Khora este spațiul în care te transformi prin alimentație conștientă. 
                  Nu doar mănânci - <strong className="text-[#2dd4bf]">devii</strong>.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== UNLEARNING SECTION ==================== */}
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
              Dezvățare
            </span>
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              Vegan <span className="text-[#f97316]">≠</span> Sănătos
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Cea mai mare minciună a industriei alimentare: că orice e "plant-based" e automat bun pentru tine.
            </p>
          </motion.div>

          {/* Unlearning Points */}
          <div className="space-y-6 mb-12">
            {[
              {
                myth: "Dacă e vegan, e sănătos",
                truth: "Chips-urile vegane au aceleași calorii goale ca cele normale. Maioneza vegetală e 80% ulei rafinat. Cârnații vegani sunt ultra-procesați.",
                icon: AlertTriangle,
                color: "#ef4444"
              },
              {
                myth: "Natural înseamnă sigur în orice cantitate",
                truth: "Nucile sunt sănătoase, dar 100g = 650 calorii. Fructele uscate sunt concentrate de zahăr. Cantitățile contează, indiferent de sursă.",
                icon: AlertTriangle,
                color: "#f97316"
              },
              {
                myth: "Dieta vegană e completă nutrițional",
                truth: "Fără suplimentare, riști deficiențe de B12 (100% obligatoriu), vitamina D, fier (+80% necesar), zinc (+50% necesar), omega-3 DHA/EPA.",
                icon: AlertTriangle,
                color: "#eab308"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <div>
                    <p className="text-white/40 text-sm mb-1 line-through">{item.myth}</p>
                    <p className="text-white/80">{item.truth}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <button
              onClick={startOnboarding}
              className="px-8 py-4 rounded-full text-white font-medium flex items-center gap-3 mx-auto group"
              style={{ background: 'linear-gradient(135deg, #d4a574, #b8956a)' }}
            >
              Începe Dezvățarea
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ==================== COMPARAȚIE VIZUALĂ ==================== */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-white/40 text-sm tracking-wider uppercase mb-4 block">
              Educație
            </span>
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              Junk Food vs Whole Food
            </h2>
          </motion.div>

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
                  <X className="w-5 h-5 text-[#ef4444]" />
                </div>
                <h3 className="text-lg font-medium text-[#ef4444]">Evită</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Maioneză vegetală (ulei rafinat 80%)",
                  "Chips-uri 'plant-based'",
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
                <h3 className="text-lg font-medium text-[#22c55e]">Alege</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Leguminoase (proteine + fibre)",
                  "Nuci și semințe crude",
                  "Legume proaspete",
                  "Cereale integrale",
                  "Fructe întregi"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-white/60 text-sm">
                    <span className="text-[#22c55e] mt-1">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Health Score Info */}
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
              Superfoods-urile primesc nota maximă. Junk food-ul vegan e marcat vizibil.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ==================== FUNCȚIONALITĂȚI ==================== */}
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
              Funcționalități
            </span>
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              Ce oferă <span className="text-[#2dd4bf]">Khora</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Sparkles, title: "Generator Rețete", desc: "Spune-ne ce ai. Primești rețete.", color: "#d4a574" },
              { icon: Droplets, title: "Tracking Hidratare", desc: "Calculăm. Tu bei și bifezi.", color: "#60a5fa" },
              { icon: Heart, title: "Suplimente Smart", desc: "Remindere B12, D3, Omega-3.", color: "#ec4899" },
              { icon: BookOpen, title: "Educație Vegană", desc: "Articole bazate pe știință.", color: "#a78bfa" },
              { icon: Brain, title: "Profil Personalizat", desc: "Calcule adaptate pentru tine.", color: "#2dd4bf" },
              { icon: Leaf, title: "Cămara Digitală", desc: "Organizează ingredientele.", color: "#84cc16" }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${feature.color}20` }}
                >
                  <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">{feature.title}</h3>
                <p className="text-white/50 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <button
              onClick={startOnboarding}
              className="px-8 py-4 rounded-full text-white font-medium flex items-center gap-3 mx-auto group"
              style={{ background: 'linear-gradient(135deg, #d4a574, #b8956a)' }}
            >
              Creează-ți Profilul
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#0a1628] via-[#0f1d32] to-[#0a1628]">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-[#a78bfa]/80 text-sm tracking-wider uppercase mb-4 block">
              Întrebări Frecvente
            </span>
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              Ai <span className="text-[#a78bfa]">întrebări</span>?
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-5 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#a78bfa]" />
                    <span className="text-white font-medium">{item.question}</span>
                  </div>
                  <ChevronDown 
                    className={`w-5 h-5 text-white/40 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} 
                  />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-0">
                        <p className="text-white/60 text-sm leading-relaxed pl-8">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
            Gata să <span className="text-[#2dd4bf]">începi</span>?
          </h2>
          <p className="text-white/50 text-lg mb-8">
            În 2 minute îți creezi profilul personalizat. Apoi, Khora face restul.
          </p>
          
          <button
            onClick={startOnboarding}
            className="px-10 py-5 rounded-full text-white text-lg font-medium flex items-center gap-3 mx-auto group"
            style={{ background: 'linear-gradient(135deg, #d4a574, #b8956a)' }}
          >
            Creează-ți Profilul Gratuit
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

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
            <button onClick={goToBlog} className="hover:text-white transition-colors">
              Blog
            </button>
            <span className="text-white/20">|</span>
            <span>χώρα · Spațiul Transformării</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
