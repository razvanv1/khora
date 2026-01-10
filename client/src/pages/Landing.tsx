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
              <span className="block text-lg md:text-xl font-normal text-white/60 mt-2">Aplicație de Nutriție Vegană</span>
            </h1>
            <p className="text-white/40 text-sm tracking-[0.3em] uppercase">
              χώρα · Spațiul Transformării
            </p>
          </motion.div>

          {/* Tagline - H2 for SEO */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/70 font-light mb-10 leading-relaxed"
          >
            Dezvață ce ai crezut despre nutriția vegană.
            <br />
            <span className="text-[#d4a574]">Învață ce contează cu adevărat.</span>
          </motion.h2>

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

      {/* ==================== SHARE CTA ==================== */}
      <section className="py-16 px-6 bg-gradient-to-b from-[#0a1628] to-[#0f1d32]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h3 className="text-2xl font-light mb-4">Îți place <span className="text-[#2dd4bf]">Khora</span>?</h3>
          <p className="text-white/50 mb-6">
            Ajută-ne să ajungem la mai mulți oameni care vor să mănânce sănătos.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button 
              onClick={() => {
                navigator.share?.({
                  title: 'Khora - Nutriție Vegană Holistică',
                  text: 'Descoperă Khora, aplicația care te ajută să mănânci vegan și sănătos.',
                  url: window.location.origin
                });
              }}
              className="px-6 py-3 rounded-full bg-[#2dd4bf]/20 text-[#2dd4bf] hover:bg-[#2dd4bf]/30 transition-colors flex items-center gap-2"
            >
              <ArrowRight className="w-4 h-4" />
              Distribuie
            </button>
            <a 
              href="mailto:hello@dezvatare.ro?subject=Feedback%20Khora"
              className="px-6 py-3 rounded-full bg-white/10 text-white/70 hover:bg-white/20 transition-colors flex items-center gap-2"
            >
              Trimite feedback
            </a>
          </div>
        </motion.div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="py-12 px-6 border-t border-white/10 bg-[#060d18]">
        <div className="max-w-5xl mx-auto">
          {/* Main Footer */}
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="md:col-span-1">
              <span className="text-2xl font-light tracking-wider block mb-3">
                KH<span className="text-[#2dd4bf]">O</span>RA
              </span>
              <p className="text-white/40 text-sm leading-relaxed">
                χώρα · Spațiul Transformării
              </p>
              <p className="text-white/30 text-xs mt-2">
                Nutriție vegană personalizată
              </p>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white/60 text-sm font-medium mb-4 uppercase tracking-wider">Legal</h4>
              <ul className="space-y-2">
                <li><a href="/terms" className="text-white/40 text-sm hover:text-white transition-colors">Termeni și Condiții</a></li>
                <li><a href="/privacy" className="text-white/40 text-sm hover:text-white transition-colors">Politica de Confidențialitate</a></li>
                <li><a href="/cookies" className="text-white/40 text-sm hover:text-white transition-colors">Politica de Cookie-uri</a></li>
              </ul>
            </div>

            {/* Resurse */}
            <div>
              <h4 className="text-white/60 text-sm font-medium mb-4 uppercase tracking-wider">Resurse</h4>
              <ul className="space-y-2">
                <li><button onClick={goToBlog} className="text-white/40 text-sm hover:text-white transition-colors">Blog Educațional</button></li>
                <li><a href="/contact" className="text-white/40 text-sm hover:text-white transition-colors">Contact</a></li>
                <li><a href="https://dezvatare.ro" target="_blank" rel="noopener noreferrer" className="text-white/40 text-sm hover:text-white transition-colors">The Unlearning School</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white/60 text-sm font-medium mb-4 uppercase tracking-wider">Contact</h4>
              <ul className="space-y-2 text-white/40 text-sm">
                <li>hello@dezvatare.ro</li>
                <li>0722 598 346</li>
                <li className="text-white/30 text-xs">București, România</li>
              </ul>
              <div className="flex gap-3 mt-4">
                <a href="https://linkedin.com/company/theunlearningschool" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="https://instagram.com/theunlearningschool" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://wa.me/40722598346" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-xs">
              © 2026 Khora. Toate drepturile rezervate. Un proiect The Unlearning School.
            </p>
            <p className="text-white/20 text-xs">
              Fondat de Răzvan Vâlceanu · Antreprenor în comportamentul schimbării și unlearning · Trainer și Instructor Yoga certificat
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
