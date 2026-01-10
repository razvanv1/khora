/*
 * KHORA Blog Articles
 * Educational content about healthy vegan nutrition
 */

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  emoji: string;
  category: string;
  readTime: string;
  publishDate: string;
  featured: boolean;
  heroImage: string;
  excerpt: string;
  content: string[];
  tags: string[];
  // SEO/AEO fields
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  faq?: { question: string; answer: string }[];
  tableOfContents?: { id: string; title: string; level: number }[];
  author?: string;
  authorBio?: string;
  lastUpdated?: string;
  wordCount?: number;
}

export const blogArticles: BlogArticle[] = [
  {
    id: "1",
    slug: "vegan-nu-inseamna-sanatos",
    title: "Vegan ≠ Sănătos: Adevărul despre alimentele vegane procesate",
    subtitle: "De ce eticheta 'vegan' nu garantează o alimentație sănătoasă",
    emoji: "⚠️",
    category: "Educație",
    readTime: "8 min",
    publishDate: "2026-01-09",
    featured: true,
    heroImage: "/images/khora_recipe_card.png",
    excerpt: "Studiile recente din The Lancet arată că alimentele vegane ultra-procesate cresc riscul de boli cardiovasculare cu 5% și mortalitatea cu 13%. Află cum să faci alegeri informate.",
    tags: ["educație", "procesate", "sănătate"],
    content: [
      "# Vegan ≠ Sănătos: Adevărul despre alimentele vegane procesate",
      "## Introducere: Mirajul etichetei \"Vegan\"",
      "În ultimii ani, piața produselor vegane a explodat. De la burgeri Beyond Meat la brânzeturi pe bază de caju și înghețate din lapte de cocos, opțiunile par nesfârșite. Dar există o capcană periculoasă: **presupunerea că \"vegan\" înseamnă automat \"sănătos\"**.",
      "> **Studiu Lancet 2024**: Consumul de alimente vegane ultra-procesate crește riscul de boli cardiovasculare cu 5% și riscul de deces prematur cu 13%.",
      "## Ce sunt alimentele ultra-procesate?",
      "Conform clasificării NOVA, alimentele ultra-procesate sunt formulări industriale create din substanțe derivate din alimente și aditivi:",
      "### Caracteristici ale alimentelor ultra-procesate:",
      "- **Densitate energetică ridicată** - multe calorii, puțini nutrienți",
      "- **Conținut mare de sodiu** - 800-1200mg per porție",
      "- **Grăsimi rafinate** - uleiuri de palmier, cocos rafinat",
      "- **Zahăr adăugat sau îndulcitori** - sirop de porumb, maltodextrină",
      "- **Aditivi** - emulgatori, stabilizatori, arome artificiale",
      "## Exemple concrete de \"Junk Food Vegan\"",
      "### 1. Burgeri vegani comerciali (Beyond, Impossible)",
      "- **Calorii**: 250-290 kcal/burger | **Sodiu**: 390-450mg | **Health Score Khora**: 3/10",
      "- **Ingrediente**: 20+ componente, inclusiv metilceluloză, extract de drojdie",
      "- **Alternativă sănătoasă**: Burger de linte și năut făcut acasă (Health Score: 8/10)",
      "### 2. Maioneză vegană",
      "- **Calorii**: 680 kcal/100g | **Proteine**: 0.5g | **Health Score Khora**: 2/10",
      "- **Ingrediente**: Ulei de rapiță, amidon modificat, emulgatori",
      "- **Alternativă sănătoasă**: Hummus sau avocado zdrobit (Health Score: 9/10)",
      "### 3. Brânză vegană procesată",
      "- **Calorii**: 310 kcal/100g | **Proteine**: 2g (vs. 25g în brânza tradițională) | **Health Score Khora**: 2/10",
      "- **Alternativă sănătoasă**: Brânză de caju fermentată acasă (Health Score: 7/10)",
      "## Studii științifice relevante",
      "### Studiul The Lancet Regional Health Europe (2024)",
      "Cercetătorii au analizat datele a peste 118.000 de participanți și au descoperit:",
      "- Alimentele vegetale **întregi** reduc riscul cardiovascular cu 7%",
      "- Alimentele vegetale **ultra-procesate** cresc riscul cu 5%",
      "- Diferența netă: **12 puncte procentuale** între cele două categorii",
      "## Cum să identifici alimentele vegane nesănătoase",
      "### Semnale de alarmă pe etichetă:",
      "1. **Lista lungă de ingrediente** (>10 componente)",
      "2. **Ingrediente pe care nu le recunoști** (metilceluloză, caragenan)",
      "3. **Uleiuri rafinate** în primele 3 ingrediente",
      "4. **Zahăr sub diverse nume** (sirop de orez, maltoză, dextroză)",
      "5. **\"Aromă naturală\"** - adesea procesat chimic",
      "## Sistemul Health Score Khora",
      "- **9-10**: Superingredient (spanac, quinoa, semințe de chia)",
      "- **7-8**: Sănătos (tofu, tempeh, lapte de ovăz nesaturat)",
      "- **5-6**: Moderat (seitan, unele paste)",
      "- **3-4**: Procesat (burgeri vegani, cârnați)",
      "- **1-2**: Junk Food (maioneză vegană, chips-uri, Oreo)",
      "## Concluzii și recomandări",
      "### Regula 80/20",
      "- **80%** din alimentație: alimente întregi, neprocesate",
      "- **20%** (maxim): alimente procesate, pentru ocazii speciale",
      "### Prioritizează:",
      "✅ Leguminoase (linte, năut, fasole) | ✅ Cereale integrale (quinoa, orez brun) | ✅ Legume și fructe proaspete | ✅ Nuci și semințe crude | ✅ Tofu și tempeh",
      "### Limitează:",
      "❌ Substitute de carne ultra-procesate | ❌ Brânzeturi vegane comerciale | ❌ Deserturi vegane industriale | ❌ Băuturi energizante \"vegane\"",
      "## Mesajul final",
      "**Veganismul poate fi extraordinar de sănătos** - dar numai când este bazat pe alimente întregi, neprocesate. Nu lăsa marketingul să te păcălească: un burger Beyond Meat nu este mai sănătos decât o salată de linte.",
      "---",
      "*Surse: The Lancet Regional Health Europe (2024), BBC Future, The Vegan Society, Harvard Health*"
    ]
  },
  {
    id: "2",
    slug: "ghid-incepatori-dieta-vegana",
    title: "Ghidul complet pentru începători în dieta vegană",
    subtitle: "Tot ce trebuie să știi pentru o tranziție sănătoasă",
    emoji: "🌱",
    category: "Ghid",
    readTime: "12 min",
    publishDate: "2026-01-08",
    featured: false,
    heroImage: "/images/khora_home_pantry.png",
    excerpt: "Tranziția la o dietă vegană poate părea copleșitoare. Acest ghid te va ajuta să faci pașii corecți pentru o alimentație echilibrată.",
    tags: ["începători", "ghid", "tranziție"],
    content: [
      "# Ghidul complet pentru începători în dieta vegană",
      "## De ce să alegi o dietă vegană?",
      "Motivele sunt diverse: sănătate, mediu, etică animală, sau pur și simplu curiozitate. Indiferent de motivație, o dietă vegană bine planificată poate oferi toate nutrientele necesare.",
      "## Nutrienții esențiali și sursele lor vegane",
      "### 1. Proteine (50-60g/zi)",
      "**Mituri demontate**: Nu ai nevoie să combini proteine la fiecare masă. Corpul stochează aminoacizi.",
      "**Surse excelente**: Linte (24g/100g), Năut (19g/100g), Tofu (8g/100g), Tempeh (19g/100g), Semințe de cânepă (31g/100g)",
      "### 2. Vitamina B12 (2.4mcg/zi) - OBLIGATORIU SUPLIMENTAT",
      "**Important**: B12 nu se găsește în mod natural în plante. Suplimentarea este esențială.",
      "**Opțiuni**: Supliment zilnic (25-100mcg), Supliment săptămânal (2000mcg), Alimente fortifiate",
      "### 3. Fier (18mg/zi pentru femei, 8mg pentru bărbați)",
      "**Sfat**: Consumă vitamina C împreună cu fierul pentru absorbție optimă.",
      "**Surse**: Linte (6.6mg/100g), Spanac (2.7mg/100g), Tofu (5.4mg/100g), Semințe de dovleac (8.8mg/100g)",
      "### 4. Omega-3 (ALA: 1.6g/zi)",
      "**Surse**: Semințe de in (22.8g ALA/100g), Semințe de chia (17.8g ALA/100g), Nuci (9g ALA/100g)",
      "### 5. Calciu (1000mg/zi)",
      "**Surse**: Tofu cu calciu (350mg/100g), Kale (150mg/100g), Tahini (426mg/100g), Lapte vegetal fortificat",
      "## Greșeli frecvente de evitat",
      "1. **Nu suplimentezi B12** - Poate duce la anemie și probleme neurologice",
      "2. **Te bazezi pe procesate** - Burgeri vegani zilnic nu sunt sănătoși",
      "3. **Nu mănânci suficiente calorii** - Legumele au densitate calorică mică",
      "4. **Ignori proteinele** - Include leguminoase la fiecare masă",
      "5. **Renunți prea repede** - Dă-ți 3-4 săptămâni să te adaptezi",
      "## Concluzie",
      "O dietă vegană poate fi incredibil de sănătoasă și satisfăcătoare. Cheia este planificarea și focusul pe alimente întregi, neprocesate.",
      "---",
      "*Bazat pe recomandările Academy of Nutrition and Dietetics și Harvard T.H. Chan School of Public Health*"
    ]
  },
  {
    id: "3",
    slug: "superfoods-vegane-top-10",
    title: "Top 10 Superfoods Vegane pentru Energie și Vitalitate",
    subtitle: "Ingredientele cu cel mai mare impact asupra sănătății tale",
    emoji: "⭐",
    category: "Nutriție",
    readTime: "6 min",
    publishDate: "2026-01-07",
    featured: false,
    heroImage: "/images/khora_digital_blender.png",
    excerpt: "Descoperă cele mai puternice alimente vegane care îți pot transforma sănătatea. De la spirulină la semințe de chia.",
    tags: ["superfoods", "energie", "nutriție"],
    content: [
      "# Top 10 Superfoods Vegane pentru Energie și Vitalitate",
      "## Ce face un aliment \"superfood\"?",
      "Termenul \"superfood\" se referă la alimente cu: densitate nutrițională excepțională, compuși bioactivi unici, beneficii dovedite pentru sănătate.",
      "## 1. Spirulină - Regina Algelor 🌀",
      "**Health Score: 10/10** | Proteine: 65% | Fier: 28.5mg/100g",
      "Beneficii: Detoxifiere de metale grele, suport imunitar, energie susținută. Cum să o consumi: 1-3g/zi în smoothie.",
      "## 2. Semințe de Chia ⚫",
      "**Health Score: 10/10** | Omega-3: 17.8g/100g | Fibre: 34g/100g",
      "Beneficii: Sațietate prelungită, sănătatea digestivă, hidratare (absorb de 10x greutatea în apă).",
      "## 3. Quinoa - Cereala Completă 🌾",
      "**Health Score: 10/10** | Proteină completă cu toți cei 9 aminoacizi esențiali",
      "Beneficii: Energie stabilă (GI scăzut), construcție musculară, fără gluten.",
      "## 4. Kale - Verdele Suprem 🥬",
      "**Health Score: 10/10** | Vitamina K: 817% DV | Vitamina C: 200% DV",
      "Beneficii: Antiinflamator puternic, sănătatea oaselor, detoxifiere hepatică.",
      "## 5. Turmeric - Aurul Antiinflamator 🟡",
      "**Health Score: 10/10** | Curcumină: 3% (compusul activ)",
      "Sfat: Absorbția crește de 2000% cu piper negru. Cel mai puternic antiinflamator natural.",
      "## 6. Semințe de Cânepă 🌿",
      "**Health Score: 10/10** | Proteine: 31.6g/100g (complete!) | Omega-6:Omega-3 raport ideal 3:1",
      "## 7. Afine - Bombele Antioxidante 🫐",
      "**Health Score: 10/10** | Cel mai ridicat nivel de antocianine dintre fructe",
      "Beneficii: Sănătatea creierului și memoriei, protecție cardiovasculară.",
      "## 8. Avocado - Grăsimea Perfectă 🥑",
      "**Health Score: 10/10** | Grăsimi mononesaturate: 15g/100g | Mai mult potasiu decât banana",
      "## 9. Matcha - Focus Zen 🍵",
      "**Health Score: 10/10** | L-Teanină pentru calm și focus | Cafeină cu eliberare lentă",
      "## 10. Cacao Raw - Ciocolata Medicinală 🍫",
      "**Health Score: 9/10** | Magneziu: 499mg/100g (125% DV) | Concentrație record de flavonoide",
      "## Cum să integrezi superfood-urile zilnic",
      "**Smoothie de dimineață**: spirulină + chia + afine + cacao raw",
      "**Bowl de prânz**: quinoa + avocado + kale + semințe de cânepă",
      "**Ritual de seară**: Golden milk cu turmeric",
      "---",
      "*Toate ingredientele sunt disponibile în baza de date Khora cu Health Score maxim*"
    ]
  },
  {
    id: "4",
    slug: "hidratare-si-suplimente-vegane",
    title: "Hidratare inteligentă și suplimente esențiale pentru vegani",
    subtitle: "Ghidul complet pentru optimizarea sănătății tale",
    emoji: "💧",
    category: "Sănătate",
    readTime: "7 min",
    publishDate: "2026-01-06",
    featured: false,
    heroImage: "/images/khora_taste_profile.png",
    excerpt: "Apa nu este suficientă. Descoperă cum să te hidratezi optim și ce suplimente sunt cu adevărat necesare.",
    tags: ["hidratare", "suplimente", "sănătate"],
    content: [
      "# Hidratare inteligentă și suplimente esențiale pentru vegani",
      "## Partea 1: Hidratarea - Mai mult decât apă",
      "### Cât ar trebui să bei?",
      "**Formula simplă**: Greutate (kg) × 30ml = ml apă/zi. Exemplu: 70kg × 30 = 2100ml (2.1L)",
      "**Ajustări**: +500ml pentru exerciții fizice, +300ml în zilele calde, +200ml dacă consumi cafea",
      "### Hidratare funcțională",
      "**Apă de cocos** 🥥 - Electroliți naturali, ideal post-antrenament (Health Score: 8/10)",
      "**Ceai verde / Matcha** 🍵 - Antioxidanți + hidratare, dimineața pentru energie (Health Score: 10/10)",
      "**Apă cu lămâie** 🍋 - Alcalinizare, vitamina C, prima băutură dimineața",
      "### Semne de deshidratare",
      "Urina galben închis, oboseală inexplicabilă, dureri de cap, piele uscată, dificultăți de concentrare",
      "## Partea 2: Suplimente esențiale",
      "### OBLIGATORII (non-negociabil)",
      "**1. Vitamina B12** 💊 - Nu există în plante. Deficiența cauzează anemie, probleme neurologice.",
      "Doză: Zilnic 25-100mcg SAU Săptămânal 2000mcg",
      "**2. Vitamina D3 (din licheni)** ☀️ - Majoritatea populației este deficitară.",
      "Doză: 1000-2000 IU/zi. Testează anual, preferabil toamna.",
      "### RECOMANDATE",
      "**3. Omega-3 (EPA/DHA din alge)** 🌊 - Corpul convertește slab ALA în EPA/DHA (doar 5-10%)",
      "Doză: 250-500mg EPA+DHA/zi",
      "**4. Iod** 🧂 - Dacă nu consumi alge sau sare iodată. Doză: 150mcg/zi",
      "**5. Zinc** - Absorbția din plante este mai scăzută. Doză: 8-11mg/zi",
      "### Programul zilnic de suplimente",
      "**Dimineața** (cu micul dejun): B12, Vitamina D3, Omega-3",
      "**Seara** (cu cina): Zinc, Magneziu (ajută somnul)",
      "### Sfaturi importante",
      "- Nu lua fierul cu cafeaua - reduce absorbția cu 80%",
      "- D3 cu grăsimi - este liposolubilă",
      "- B12 separat de vitamina C în cantități mari",
      "## Concluzie",
      "Hidratarea și suplimentarea corectă sunt pilonii unei diete vegane de succes. Focusează-te pe B12 și D3 ca bază.",
      "---",
      "*Consultă un medic sau nutriționist înainte de a începe orice suplimentare*"
    ]
  }
];

export const getFeaturedArticle = () => 
  blogArticles.find(a => a.featured);

export const getArticleBySlug = (slug: string) => 
  blogArticles.find(a => a.slug === slug);

export const getArticlesByCategory = (category: string) => 
  blogArticles.filter(a => a.category === category);
