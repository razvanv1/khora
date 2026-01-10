/**
 * KHORA FAQ Page - SEO & GEO Optimized
 * Schema.org FAQPage pentru Google Featured Snippets
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, HelpCircle, Leaf, Pill, Droplets, Heart, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  // Nutriție Vegană Generală
  {
    category: "Nutriție Vegană",
    question: "Ce este Khora și cum mă poate ajuta?",
    answer: "Khora este o aplicație gratuită de nutriție vegană care te ajută să găsești rețete personalizate bazate pe ingredientele din cămara ta, să-ți monitorizezi hidratarea zilnică și să ții evidența suplimentelor esențiale precum B12, D3 și Omega-3. Aplicația calculează automat necesarul tău caloric și de macronutrienți bazat pe profilul tău."
  },
  {
    category: "Nutriție Vegană",
    question: "Este dieta vegană sănătoasă pe termen lung?",
    answer: "Da, o dietă vegană bine planificată este sănătoasă și poate oferi toate nutrientele necesare. Studiile arată că veganii au risc mai scăzut de boli cardiovasculare, diabet tip 2 și anumite tipuri de cancer. Este important să consumi o varietate de alimente și să suplimentezi B12, care nu se găsește în plantele."
  },
  {
    category: "Nutriție Vegană",
    question: "Cum obțin suficiente proteine ca vegan în România?",
    answer: "Sursele excelente de proteine vegetale disponibile în România includ: leguminoase (linte, năut, fasole - 15-25g proteine/100g), tofu și tempeh (15-20g/100g), seitan (25g/100g), quinoa (14g/100g), semințe de cânepă (30g/100g), și combinații de cereale cu leguminoase. Un adult are nevoie de aproximativ 0.8-1g proteine per kg corp zilnic."
  },
  {
    category: "Nutriție Vegană",
    question: "Ce alimente vegane găsesc în supermarketurile din România?",
    answer: "În România găsești: lapte vegetal (soia, ovăz, migdale) în Kaufland, Lidl, Carrefour; tofu și tempeh în Mega Image și magazinele bio; leguminoase și cereale integrale în toate supermarketurile; fructe și legume locale; semințe și nuci. Branduri populare: Alpro, Oatly, Provamel, și produse românești de la Sano Vita."
  },
  // Suplimente
  {
    category: "Suplimente",
    question: "Ce suplimente sunt obligatorii pentru vegani?",
    answer: "Vitamina B12 este singurul supliment OBLIGATORIU pentru vegani, deoarece nu se găsește în plante. Doza recomandată: 2500mcg săptămânal sau 250mcg zilnic. Alte suplimente recomandate: Vitamina D3 (mai ales iarna în România), Omega-3 din alge (DHA/EPA), și opțional Iod, Zinc și Fier dacă dieta nu le acoperă."
  },
  {
    category: "Suplimente",
    question: "De unde cumpăr suplimente vegane în România?",
    answer: "Suplimente vegane de calitate găsești la: farmacii (Catena, Sensiblu, Dr. Max), magazine online (vegis.ro, rawboost.ro, vifruviu.ro), magazine bio (Plafar, Bio Corner), și pe eMAG sau Amazon. Branduri recomandate: Solgar, NOW Foods, Garden of Life, Viridian. Verifică întotdeauna să fie certificate vegan."
  },
  {
    category: "Suplimente",
    question: "Cât B12 trebuie să iau zilnic?",
    answer: "Există două opțiuni pentru suplimentarea cu B12: 1) Doză zilnică: 250-500mcg cianocobalamină sau metilcobalamină; 2) Doză săptămânală: 2500mcg o dată pe săptămână. Ambele metode sunt eficiente. B12 se absoarbe mai bine în doze mici, dar corpul poate stoca excesul. Verifică nivelul B12 prin analize de sânge anual."
  },
  {
    category: "Suplimente",
    question: "Am nevoie de Omega-3 dacă mănânc semințe de in?",
    answer: "Semințele de in conțin ALA (acid alfa-linolenic), dar conversia în DHA și EPA (formele active) este foarte ineficientă (sub 5%). Pentru sănătatea creierului și inimii, se recomandă suplimentarea cu Omega-3 din alge (250-500mg DHA+EPA zilnic), mai ales pentru gravide, copii și persoane peste 50 ani."
  },
  // Hidratare
  {
    category: "Hidratare",
    question: "Câtă apă trebuie să beau zilnic?",
    answer: "Formula generală: 30-35ml apă per kg corp. Pentru o persoană de 70kg, înseamnă 2.1-2.5 litri zilnic. Factorii care cresc necesarul: activitate fizică, temperatură ridicată, consum de cafea/alcool, alăptare. Khora calculează automat necesarul tău bazat pe greutate, activitate și climat."
  },
  {
    category: "Hidratare",
    question: "Contează și apa din fructe și legume?",
    answer: "Da! Fructele și legumele contribuie semnificativ la hidratare. Castraveții conțin 96% apă, pepenii 92%, roșiile 94%, portocalele 87%. O dietă bogată în fructe și legume poate acoperi 20-30% din necesarul de lichide. Khora ia în calcul și acest aport când îți calculează hidratarea."
  },
  // Rețete
  {
    category: "Rețete",
    question: "Cum funcționează generatorul de rețete Khora?",
    answer: "Adaugi ingredientele disponibile în Cămara Digitală, iar Khora îți sugerează rețete care le folosesc. Poți filtra după: timp de preparare, nivel de dificultate, calorii, tip de masă (mic dejun, prânz, cină), și preferințe (raw, fără gluten, high-protein). Fiecare rețetă include valori nutriționale complete."
  },
  {
    category: "Rețete",
    question: "Ce rețete vegane sunt populare în România?",
    answer: "Rețete tradiționale românești vegane: fasole bătută, zacuscă, salată de vinete, ciorbă de legume, sarmale în foi de viță cu orez, mămăligă cu ciuperci, plăcinte cu varză. Khora include și adaptări vegane ale rețetelor clasice: mici din linte, piftie din ciuperci, cozonac vegan."
  },
  // Aplicație
  {
    category: "Aplicație",
    question: "Este Khora gratuită?",
    answer: "Da, Khora este 100% gratuită. Toate funcționalitățile sunt disponibile fără plată: Cămara Digitală cu 500+ ingrediente, generator de rețete, tracking hidratare, monitorizare suplimente, calculator nutrițional personalizat, și articole educaționale despre nutriția vegană."
  },
  {
    category: "Aplicație",
    question: "Pot folosi Khora offline?",
    answer: "Khora funcționează cel mai bine cu conexiune la internet pentru sincronizare și actualizări. Totuși, datele tale (ingrediente, suplimente, hidratare) sunt salvate local și poți accesa funcționalitățile de bază offline. Rețetele și articolele necesită conexiune pentru încărcare."
  },
  {
    category: "Aplicație",
    question: "Cum îmi protejează Khora datele personale?",
    answer: "Khora respectă GDPR și nu vinde datele tale. Informațiile de profil sunt stocate securizat și criptat. Nu colectăm date sensibile de sănătate. Poți șterge contul și toate datele oricând din setări. Citește Politica de Confidențialitate pentru detalii complete."
  },
];

const categories = ["Toate", "Nutriție Vegană", "Suplimente", "Hidratare", "Rețete", "Aplicație"];

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Toate");
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const filteredFAQs = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Toate" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleItem = (index: number) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Nutriție Vegană": return <Leaf className="w-4 h-4" />;
      case "Suplimente": return <Pill className="w-4 h-4" />;
      case "Hidratare": return <Droplets className="w-4 h-4" />;
      case "Rețete": return <Heart className="w-4 h-4" />;
      default: return <HelpCircle className="w-4 h-4" />;
    }
  };

  // Inject FAQ Schema for SEO
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqData.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    script.id = "faq-schema";
    
    const existing = document.getElementById("faq-schema");
    if (existing) existing.remove();
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById("faq-schema");
      if (el) el.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a1628] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0d1f3c] to-[#0a1628]" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#2dd4bf]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-[#d4a574]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen px-6 pt-12 pb-32">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="mb-8"
        >
          <Link href="/">
            <a className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Înapoi</span>
            </a>
          </Link>
          <h1 className="text-3xl font-light text-white mb-2">Întrebări Frecvente</h1>
          <p className="text-white/60">Răspunsuri la cele mai comune întrebări despre nutriția vegană</p>
        </motion.header>

        {/* Search */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Caută întrebări..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#2dd4bf]/50"
            />
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.15 }}
          className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-[#2dd4bf] text-[#0a1628] font-medium"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* FAQ List */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          {filteredFAQs.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
              className="rounded-xl overflow-hidden"
              style={{ 
                background: 'rgba(255, 255, 255, 0.03)', 
                border: '1px solid rgba(255, 255, 255, 0.08)' 
              }}
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-5 py-4 flex items-start gap-4 text-left"
              >
                <span className="p-2 rounded-lg bg-[#2dd4bf]/10 text-[#2dd4bf] flex-shrink-0 mt-0.5">
                  {getCategoryIcon(item.category)}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="text-xs text-[#d4a574] uppercase tracking-wider mb-1 block">
                    {item.category}
                  </span>
                  <h3 className="text-white font-medium pr-8">{item.question}</h3>
                </div>
                <ChevronDown 
                  className={`w-5 h-5 text-white/40 flex-shrink-0 transition-transform ${
                    openItems.has(index) ? "rotate-180" : ""
                  }`} 
                />
              </button>
              
              <AnimatePresence>
                {openItems.has(index) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pl-[4.5rem]">
                      <p className="text-white/70 text-sm leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/60">Nu am găsit întrebări pentru căutarea ta.</p>
              <p className="text-white/40 text-sm mt-1">Încearcă alte cuvinte cheie.</p>
            </div>
          )}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-6 rounded-2xl text-center"
          style={{ 
            background: 'linear-gradient(135deg, rgba(45, 212, 191, 0.1) 0%, rgba(212, 165, 116, 0.1) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <h3 className="text-white font-medium mb-2">Nu ai găsit răspunsul?</h3>
          <p className="text-white/60 text-sm mb-4">Contactează-ne și îți răspundem în cel mai scurt timp.</p>
          <Link href="/contact">
            <a className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2dd4bf] text-[#0a1628] font-medium hover:bg-[#2dd4bf]/90 transition-colors">
              Contactează-ne
            </a>
          </Link>
        </motion.div>
      </div>

      <Navigation />
    </div>
  );
}
