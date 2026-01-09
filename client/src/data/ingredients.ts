/*
 * KHORA Ingredients Database
 * Extended vegan ingredients with Health Score, calories, and Junk Food markers
 * 
 * Health Score System (1-10):
 * 10 = Superingredient (whole food, nutrient-dense, minimal processing)
 * 7-9 = Healthy (minimally processed, good nutritional profile)
 * 4-6 = Moderate (some processing, balanced nutrition)
 * 1-3 = Junk Food (ultra-processed, high calories, low nutrients)
 */

export interface Ingredient {
  id: string;
  name: string;
  emoji: string;
  category: string;
  subcategory: string;
  color: string;
  tags: string[];
  nutritionalHighlight?: string;
  // NEW: Health & Nutrition Data
  healthScore: number; // 1-10, 10 being superingredient
  calories: number; // per 100g
  protein: number; // grams per 100g
  isJunkFood: boolean; // true for ultra-processed vegan foods
  processingLevel: 'whole' | 'minimal' | 'processed' | 'ultra-processed';
  warningNote?: string; // Warning for junk food items
}

export const categories = [
  { id: "cereals", name: "Cereale", emoji: "🌾", color: "#eab308" },
  { id: "legumes", name: "Leguminoase", emoji: "🫘", color: "#f59e0b" },
  { id: "vegetables", name: "Legume", emoji: "🥬", color: "#22c55e" },
  { id: "fruits", name: "Fructe", emoji: "🍎", color: "#ef4444" },
  { id: "nuts", name: "Nuci & Semințe", emoji: "🥜", color: "#a16207" },
  { id: "proteins", name: "Proteine", emoji: "🥗", color: "#8b5cf6" },
  { id: "dairy-alt", name: "Alternative Lactate", emoji: "🥛", color: "#f5f5f5" },
  { id: "herbs", name: "Ierburi & Condimente", emoji: "🌿", color: "#16a34a" },
  { id: "oils", name: "Uleiuri & Grăsimi", emoji: "🫒", color: "#84cc16" },
  { id: "sweeteners", name: "Îndulcitori", emoji: "🍯", color: "#fbbf24" },
  { id: "superfoods", name: "Superfoods", emoji: "⭐", color: "#00d4aa" },
  { id: "beverages", name: "Băuturi", emoji: "🍵", color: "#38bdf8" },
  { id: "junk-vegan", name: "Procesate Vegan", emoji: "⚠️", color: "#ef4444" },
];

export const ingredients: Ingredient[] = [
  // SUPERFOODS - Health Score 9-10
  { id: "s001", name: "Spirulină", emoji: "🌀", category: "superfoods", subcategory: "alge", color: "#166534", tags: ["proteină", "detox"], nutritionalHighlight: "65% proteină", healthScore: 10, calories: 26, protein: 5.9, isJunkFood: false, processingLevel: "minimal" },
  { id: "s002", name: "Chlorella", emoji: "🟢", category: "superfoods", subcategory: "alge", color: "#15803d", tags: ["detox", "clorofilă"], nutritionalHighlight: "Clorofilă", healthScore: 10, calories: 45, protein: 6, isJunkFood: false, processingLevel: "minimal" },
  { id: "s003", name: "Maca", emoji: "🌰", category: "superfoods", subcategory: "adaptogeni", color: "#fbbf24", tags: ["energie", "hormonal"], nutritionalHighlight: "Adaptogen", healthScore: 9, calories: 325, protein: 14, isJunkFood: false, processingLevel: "minimal" },
  { id: "s004", name: "Ashwagandha", emoji: "🌿", category: "superfoods", subcategory: "adaptogeni", color: "#84cc16", tags: ["stres", "somn"], nutritionalHighlight: "Adaptogen", healthScore: 9, calories: 245, protein: 3.9, isJunkFood: false, processingLevel: "minimal" },
  { id: "s005", name: "Matcha", emoji: "🍵", category: "superfoods", subcategory: "ceaiuri", color: "#22c55e", tags: ["antioxidanți", "focus"], nutritionalHighlight: "L-Teanină", healthScore: 10, calories: 3, protein: 0.3, isJunkFood: false, processingLevel: "minimal" },
  { id: "s006", name: "Cacao raw", emoji: "🍫", category: "superfoods", subcategory: "cacao", color: "#78350f", tags: ["magneziu", "mood"], nutritionalHighlight: "Magneziu", healthScore: 9, calories: 228, protein: 19.6, isJunkFood: false, processingLevel: "minimal" },
  { id: "s007", name: "Goji", emoji: "🔴", category: "superfoods", subcategory: "fructe", color: "#dc2626", tags: ["antioxidanți", "longevitate"], nutritionalHighlight: "Zeaxantină", healthScore: 9, calories: 349, protein: 14.3, isJunkFood: false, processingLevel: "whole" },
  { id: "s008", name: "Acai", emoji: "🫐", category: "superfoods", subcategory: "fructe", color: "#581c87", tags: ["antioxidanți", "bowl"], nutritionalHighlight: "ORAC ridicat", healthScore: 9, calories: 70, protein: 1.5, isJunkFood: false, processingLevel: "minimal" },
  { id: "s009", name: "Turmeric", emoji: "🟡", category: "superfoods", subcategory: "condimente", color: "#f59e0b", tags: ["antiinflamator", "golden-milk"], nutritionalHighlight: "Curcumină", healthScore: 10, calories: 312, protein: 9.7, isJunkFood: false, processingLevel: "whole" },
  { id: "s010", name: "Pudră proteică mazăre", emoji: "💪", category: "superfoods", subcategory: "proteine", color: "#84cc16", tags: ["sport", "smoothie"], nutritionalHighlight: "BCAA", healthScore: 8, calories: 370, protein: 80, isJunkFood: false, processingLevel: "processed" },

  // CEREALE - Health Score 7-9
  { id: "c001", name: "Ovăz instant", emoji: "🥣", category: "cereals", subcategory: "clasice", color: "#eab308", tags: ["mic-dejun", "energie"], nutritionalHighlight: "Beta-glucan", healthScore: 7, calories: 379, protein: 13.2, isJunkFood: false, processingLevel: "processed" },
  { id: "c002", name: "Ovăz integral", emoji: "🌾", category: "cereals", subcategory: "clasice", color: "#eab308", tags: ["slow-carb", "satietate"], nutritionalHighlight: "Fibre", healthScore: 9, calories: 389, protein: 16.9, isJunkFood: false, processingLevel: "whole" },
  { id: "c003", name: "Quinoa", emoji: "🌾", category: "cereals", subcategory: "premium", color: "#f59e0b", tags: ["superfood", "fără-gluten", "proteină-completă"], nutritionalHighlight: "Proteină completă", healthScore: 10, calories: 368, protein: 14.1, isJunkFood: false, processingLevel: "whole" },
  { id: "c004", name: "Orez brun", emoji: "🍚", category: "cereals", subcategory: "clasice", color: "#a16207", tags: ["asian", "bază"], nutritionalHighlight: "Seleniu", healthScore: 8, calories: 362, protein: 7.5, isJunkFood: false, processingLevel: "whole" },
  { id: "c005", name: "Orez basmati", emoji: "🍚", category: "cereals", subcategory: "clasice", color: "#f5f5dc", tags: ["indian", "aromatic"], nutritionalHighlight: "GI mediu", healthScore: 7, calories: 350, protein: 7.1, isJunkFood: false, processingLevel: "minimal" },
  { id: "c006", name: "Bulgur", emoji: "🌾", category: "cereals", subcategory: "clasice", color: "#d4a574", tags: ["mediteranean", "rapid"], nutritionalHighlight: "Fibre", healthScore: 8, calories: 342, protein: 12.3, isJunkFood: false, processingLevel: "minimal" },
  { id: "c007", name: "Hrișcă", emoji: "🌾", category: "cereals", subcategory: "premium", color: "#8b7355", tags: ["fără-gluten", "detox"], nutritionalHighlight: "Rutină", healthScore: 9, calories: 343, protein: 13.3, isJunkFood: false, processingLevel: "whole" },
  { id: "c008", name: "Mei", emoji: "🌾", category: "cereals", subcategory: "clasice", color: "#ffd700", tags: ["antic", "alcalin", "fără-gluten"], nutritionalHighlight: "Magneziu", healthScore: 8, calories: 378, protein: 11, isJunkFood: false, processingLevel: "whole" },
  { id: "c009", name: "Amarant", emoji: "🌾", category: "cereals", subcategory: "premium", color: "#8b0000", tags: ["aztec", "superfood"], nutritionalHighlight: "Lizină", healthScore: 9, calories: 371, protein: 13.6, isJunkFood: false, processingLevel: "whole" },
  { id: "c010", name: "Teff", emoji: "🌾", category: "cereals", subcategory: "premium", color: "#654321", tags: ["etiopian", "fără-gluten"], nutritionalHighlight: "Fier, Calciu", healthScore: 9, calories: 367, protein: 13.3, isJunkFood: false, processingLevel: "whole" },

  // LEGUMINOASE - Health Score 8-10
  { id: "l001", name: "Linte roșie", emoji: "🔴", category: "legumes", subcategory: "linte", color: "#dc2626", tags: ["indian", "rapidă"], nutritionalHighlight: "Fier", healthScore: 9, calories: 352, protein: 24.6, isJunkFood: false, processingLevel: "whole" },
  { id: "l002", name: "Linte verde", emoji: "🟢", category: "legumes", subcategory: "linte", color: "#16a34a", tags: ["french", "salate"], nutritionalHighlight: "Folat", healthScore: 9, calories: 352, protein: 24.6, isJunkFood: false, processingLevel: "whole" },
  { id: "l003", name: "Linte Beluga", emoji: "⚫", category: "legumes", subcategory: "linte", color: "#1f2937", tags: ["premium", "caviar-vegan"], nutritionalHighlight: "Antocianine", healthScore: 10, calories: 352, protein: 25, isJunkFood: false, processingLevel: "whole" },
  { id: "l004", name: "Năut", emoji: "🫘", category: "legumes", subcategory: "fasole", color: "#f5deb3", tags: ["hummus", "falafel"], nutritionalHighlight: "Proteină, Fibre", healthScore: 9, calories: 364, protein: 19, isJunkFood: false, processingLevel: "whole" },
  { id: "l005", name: "Fasole neagră", emoji: "🫘", category: "legumes", subcategory: "fasole", color: "#1f2937", tags: ["cuban", "burritos"], nutritionalHighlight: "Antocianine", healthScore: 9, calories: 341, protein: 21.6, isJunkFood: false, processingLevel: "whole" },
  { id: "l006", name: "Fasole roșie", emoji: "🫘", category: "legumes", subcategory: "fasole", color: "#b91c1c", tags: ["chili", "mexican"], nutritionalHighlight: "Potasiu", healthScore: 9, calories: 333, protein: 23.6, isJunkFood: false, processingLevel: "whole" },
  { id: "l007", name: "Edamame", emoji: "🫛", category: "legumes", subcategory: "soia", color: "#84cc16", tags: ["japonez", "snack"], nutritionalHighlight: "Proteină completă", healthScore: 9, calories: 121, protein: 11.9, isJunkFood: false, processingLevel: "whole" },

  // LEGUME - Health Score 9-10
  { id: "v001", name: "Spanac", emoji: "🥬", category: "vegetables", subcategory: "frunze", color: "#166534", tags: ["fier", "smoothie"], nutritionalHighlight: "Fier, K", healthScore: 10, calories: 23, protein: 2.9, isJunkFood: false, processingLevel: "whole" },
  { id: "v002", name: "Kale", emoji: "🥬", category: "vegetables", subcategory: "frunze", color: "#14532d", tags: ["superfood", "chips"], nutritionalHighlight: "Vitamina K", healthScore: 10, calories: 49, protein: 4.3, isJunkFood: false, processingLevel: "whole" },
  { id: "v003", name: "Broccoli", emoji: "🥦", category: "vegetables", subcategory: "crucifere", color: "#15803d", tags: ["proteină", "detox"], nutritionalHighlight: "Sulforafan", healthScore: 10, calories: 34, protein: 2.8, isJunkFood: false, processingLevel: "whole" },
  { id: "v004", name: "Conopidă", emoji: "🥬", category: "vegetables", subcategory: "crucifere", color: "#fefce8", tags: ["low-carb", "versatil"], nutritionalHighlight: "Vitamina C", healthScore: 9, calories: 25, protein: 1.9, isJunkFood: false, processingLevel: "whole" },
  { id: "v005", name: "Morcov", emoji: "🥕", category: "vegetables", subcategory: "rădăcini", color: "#f97316", tags: ["beta-caroten", "snack"], nutritionalHighlight: "Vitamina A", healthScore: 9, calories: 41, protein: 0.9, isJunkFood: false, processingLevel: "whole" },
  { id: "v006", name: "Sfeclă roșie", emoji: "🟣", category: "vegetables", subcategory: "rădăcini", color: "#7c2d12", tags: ["detox", "sport"], nutritionalHighlight: "Nitrați", healthScore: 9, calories: 43, protein: 1.6, isJunkFood: false, processingLevel: "whole" },
  { id: "v007", name: "Cartof dulce", emoji: "🍠", category: "vegetables", subcategory: "rădăcini", color: "#ea580c", tags: ["energie", "fitness"], nutritionalHighlight: "Beta-caroten", healthScore: 9, calories: 86, protein: 1.6, isJunkFood: false, processingLevel: "whole" },
  { id: "v008", name: "Roșii", emoji: "🍅", category: "vegetables", subcategory: "fructe-legume", color: "#dc2626", tags: ["licopen", "italian"], nutritionalHighlight: "Licopen", healthScore: 9, calories: 18, protein: 0.9, isJunkFood: false, processingLevel: "whole" },
  { id: "v009", name: "Ardei gras", emoji: "🫑", category: "vegetables", subcategory: "fructe-legume", color: "#ef4444", tags: ["vitamina-c", "colorat"], nutritionalHighlight: "Vitamina C", healthScore: 9, calories: 31, protein: 1, isJunkFood: false, processingLevel: "whole" },
  { id: "v010", name: "Avocado", emoji: "🥑", category: "vegetables", subcategory: "fructe-legume", color: "#65a30d", tags: ["grăsimi-bune", "cremozitate"], nutritionalHighlight: "Grăsimi mono", healthScore: 10, calories: 160, protein: 2, isJunkFood: false, processingLevel: "whole" },
  { id: "v011", name: "Usturoi", emoji: "🧄", category: "vegetables", subcategory: "aromatice", color: "#fefce8", tags: ["imunitate", "aromatic"], nutritionalHighlight: "Alicină", healthScore: 10, calories: 149, protein: 6.4, isJunkFood: false, processingLevel: "whole" },
  { id: "v012", name: "Ghimbir", emoji: "🫚", category: "vegetables", subcategory: "aromatice", color: "#fcd34d", tags: ["antiinflamator", "digestiv"], nutritionalHighlight: "Gingerol", healthScore: 10, calories: 80, protein: 1.8, isJunkFood: false, processingLevel: "whole" },

  // FRUCTE - Health Score 8-9
  { id: "f001", name: "Banane", emoji: "🍌", category: "fruits", subcategory: "tropicale", color: "#fde047", tags: ["energie", "potasiu"], nutritionalHighlight: "Potasiu", healthScore: 8, calories: 89, protein: 1.1, isJunkFood: false, processingLevel: "whole" },
  { id: "f002", name: "Afine", emoji: "🫐", category: "fruits", subcategory: "fructe-pădure", color: "#4338ca", tags: ["antioxidanți", "creier"], nutritionalHighlight: "Antocianine", healthScore: 10, calories: 57, protein: 0.7, isJunkFood: false, processingLevel: "whole" },
  { id: "f003", name: "Căpșuni", emoji: "🍓", category: "fruits", subcategory: "fructe-pădure", color: "#dc2626", tags: ["vitamina-c", "desert"], nutritionalHighlight: "Vitamina C", healthScore: 9, calories: 32, protein: 0.7, isJunkFood: false, processingLevel: "whole" },
  { id: "f004", name: "Mere", emoji: "🍎", category: "fruits", subcategory: "pomacee", color: "#dc2626", tags: ["fibre", "snack"], nutritionalHighlight: "Pectină", healthScore: 8, calories: 52, protein: 0.3, isJunkFood: false, processingLevel: "whole" },
  { id: "f005", name: "Portocale", emoji: "🍊", category: "fruits", subcategory: "citrice", color: "#f97316", tags: ["vitamina-c", "imunitate"], nutritionalHighlight: "Vitamina C", healthScore: 9, calories: 47, protein: 0.9, isJunkFood: false, processingLevel: "whole" },
  { id: "f006", name: "Lămâie", emoji: "🍋", category: "fruits", subcategory: "citrice", color: "#fde047", tags: ["detox", "alcalin"], nutritionalHighlight: "Vitamina C", healthScore: 9, calories: 29, protein: 1.1, isJunkFood: false, processingLevel: "whole" },

  // NUCI & SEMINȚE - Health Score 8-10
  { id: "n001", name: "Migdale", emoji: "🥜", category: "nuts", subcategory: "nuci", color: "#a16207", tags: ["vitamina-e", "lapte"], nutritionalHighlight: "Vitamina E", healthScore: 9, calories: 579, protein: 21.2, isJunkFood: false, processingLevel: "whole" },
  { id: "n002", name: "Nuci caju", emoji: "🥜", category: "nuts", subcategory: "nuci", color: "#fef3c7", tags: ["cremozitate", "sosuri"], nutritionalHighlight: "Magneziu", healthScore: 8, calories: 553, protein: 18.2, isJunkFood: false, processingLevel: "whole" },
  { id: "n003", name: "Nuci", emoji: "🥜", category: "nuts", subcategory: "nuci", color: "#78350f", tags: ["omega-3", "creier"], nutritionalHighlight: "Omega-3 ALA", healthScore: 10, calories: 654, protein: 15.2, isJunkFood: false, processingLevel: "whole" },
  { id: "n004", name: "Semințe de in", emoji: "🌰", category: "nuts", subcategory: "semințe", color: "#78350f", tags: ["omega-3", "hormonal"], nutritionalHighlight: "Lignani", healthScore: 10, calories: 534, protein: 18.3, isJunkFood: false, processingLevel: "whole" },
  { id: "n005", name: "Semințe de chia", emoji: "⚫", category: "nuts", subcategory: "semințe", color: "#1f2937", tags: ["omega-3", "pudding"], nutritionalHighlight: "Omega-3", healthScore: 10, calories: 486, protein: 16.5, isJunkFood: false, processingLevel: "whole" },
  { id: "n006", name: "Semințe de cânepă", emoji: "🌿", category: "nuts", subcategory: "semințe", color: "#166534", tags: ["proteină-completă", "omega"], nutritionalHighlight: "Proteină completă", healthScore: 10, calories: 553, protein: 31.6, isJunkFood: false, processingLevel: "whole" },

  // PROTEINE VEGETALE - Health Score variabil
  { id: "p001", name: "Tofu", emoji: "🧈", category: "proteins", subcategory: "soia", color: "#fefce8", tags: ["versatil", "proteină"], nutritionalHighlight: "Proteină completă", healthScore: 8, calories: 76, protein: 8, isJunkFood: false, processingLevel: "processed" },
  { id: "p002", name: "Tempeh", emoji: "🧱", category: "proteins", subcategory: "fermentat", color: "#a16207", tags: ["probiotice", "proteină"], nutritionalHighlight: "Fermentat", healthScore: 9, calories: 193, protein: 19, isJunkFood: false, processingLevel: "processed" },
  { id: "p003", name: "Seitan", emoji: "🥩", category: "proteins", subcategory: "gluten", color: "#78350f", tags: ["textură-carne", "proteină-mare"], nutritionalHighlight: "75g proteină/100g", healthScore: 6, calories: 370, protein: 75, isJunkFood: false, processingLevel: "processed" },

  // ⚠️ JUNK FOOD VEGAN - Health Score 1-4
  { id: "j001", name: "Maioneză vegană", emoji: "🥫", category: "junk-vegan", subcategory: "sosuri", color: "#ef4444", tags: ["ultra-procesat", "grăsimi"], nutritionalHighlight: "⚠️ Ultra-procesat", healthScore: 2, calories: 680, protein: 0.5, isJunkFood: true, processingLevel: "ultra-processed", warningNote: "Conține uleiuri rafinate, aditivi și emulgatori. Alternativă sănătoasă: hummus sau avocado zdrobit." },
  { id: "j002", name: "Cârnați vegani", emoji: "🌭", category: "junk-vegan", subcategory: "carne-fals", color: "#ef4444", tags: ["ultra-procesat", "sodiu"], nutritionalHighlight: "⚠️ Sodiu ridicat", healthScore: 3, calories: 290, protein: 18, isJunkFood: true, processingLevel: "ultra-processed", warningNote: "Conține 800-1200mg sodiu/100g, arome artificiale și conservanți. Alternativă: tempeh marinat." },
  { id: "j003", name: "Burger vegan procesat", emoji: "🍔", category: "junk-vegan", subcategory: "carne-fals", color: "#ef4444", tags: ["ultra-procesat", "aditivi"], nutritionalHighlight: "⚠️ 20+ ingrediente", healthScore: 3, calories: 250, protein: 19, isJunkFood: true, processingLevel: "ultra-processed", warningNote: "Beyond/Impossible: conțin metilceluloză, ulei de cocos rafinat, arome. Alternativă: burger de linte sau năut făcut acasă." },
  { id: "j004", name: "Brânză vegană procesată", emoji: "🧀", category: "junk-vegan", subcategory: "lactate-fals", color: "#ef4444", tags: ["ultra-procesat", "amidon"], nutritionalHighlight: "⚠️ Fără nutrienți", healthScore: 2, calories: 310, protein: 2, isJunkFood: true, processingLevel: "ultra-processed", warningNote: "Bazată pe amidon și uleiuri, fără proteine sau calciu semnificativ. Alternativă: brânză de caju fermentată." },
  { id: "j005", name: "Nuggets vegani", emoji: "🍗", category: "junk-vegan", subcategory: "carne-fals", color: "#ef4444", tags: ["ultra-procesat", "prăjit"], nutritionalHighlight: "⚠️ Grăsimi trans", healthScore: 2, calories: 280, protein: 12, isJunkFood: true, processingLevel: "ultra-processed", warningNote: "Prăjite în uleiuri industriale, conțin amidon modificat și arome. Alternativă: tofu crispy la cuptor." },
  { id: "j006", name: "Înghețată vegană comercială", emoji: "🍦", category: "junk-vegan", subcategory: "deserturi", color: "#ef4444", tags: ["ultra-procesat", "zahăr"], nutritionalHighlight: "⚠️ Zahăr ridicat", healthScore: 3, calories: 240, protein: 2, isJunkFood: true, processingLevel: "ultra-processed", warningNote: "20-25g zahăr/porție, ulei de cocos rafinat, gume. Alternativă: nice cream din banane înghețate." },
  { id: "j007", name: "Chips-uri vegane", emoji: "🥔", category: "junk-vegan", subcategory: "snacks", color: "#ef4444", tags: ["ultra-procesat", "sare"], nutritionalHighlight: "⚠️ Calorii goale", healthScore: 2, calories: 536, protein: 6, isJunkFood: true, processingLevel: "ultra-processed", warningNote: "Prăjite în ulei, sodiu ridicat, fără fibre sau vitamine. Alternativă: chips de kale sau legume deshidratate." },
  { id: "j008", name: "Bacon vegan", emoji: "🥓", category: "junk-vegan", subcategory: "carne-fals", color: "#ef4444", tags: ["ultra-procesat", "arome"], nutritionalHighlight: "⚠️ Arome artificiale", healthScore: 2, calories: 320, protein: 8, isJunkFood: true, processingLevel: "ultra-processed", warningNote: "Bazat pe gluten sau soia texturată, cu arome de fum și coloranți. Alternativă: morcovi marinați și copți." },
  { id: "j009", name: "Smântână vegană", emoji: "🥛", category: "junk-vegan", subcategory: "lactate-fals", color: "#ef4444", tags: ["ultra-procesat", "emulgatori"], nutritionalHighlight: "⚠️ Fără proteine", healthScore: 2, calories: 190, protein: 0.5, isJunkFood: true, processingLevel: "ultra-processed", warningNote: "Ulei de cocos, amidon, emulgatori. Zero proteine sau calciu. Alternativă: caju înmuiat mixat." },
  { id: "j010", name: "Biscuiți Oreo", emoji: "🍪", category: "junk-vegan", subcategory: "deserturi", color: "#ef4444", tags: ["ultra-procesat", "zahăr"], nutritionalHighlight: "⚠️ Zahăr + grăsimi", healthScore: 1, calories: 480, protein: 4, isJunkFood: true, processingLevel: "ultra-processed", warningNote: "Tehnic vegani, dar conțin zahăr, ulei de palmier, sirop de porumb. Alternativă: energy balls cu curmale." },

  // BĂUTURI - Health Score variabil
  { id: "b001", name: "Ceai verde", emoji: "🍵", category: "beverages", subcategory: "ceaiuri", color: "#22c55e", tags: ["antioxidanți", "metabolism"], nutritionalHighlight: "EGCG", healthScore: 10, calories: 1, protein: 0, isJunkFood: false, processingLevel: "minimal" },
  { id: "b002", name: "Apă de cocos", emoji: "🥥", category: "beverages", subcategory: "hidratare", color: "#fefce8", tags: ["electroliți", "sport"], nutritionalHighlight: "Potasiu", healthScore: 8, calories: 19, protein: 0.7, isJunkFood: false, processingLevel: "minimal" },
  { id: "b003", name: "Kombucha", emoji: "🫖", category: "beverages", subcategory: "fermentate", color: "#f59e0b", tags: ["probiotice", "gut"], nutritionalHighlight: "Probiotice", healthScore: 7, calories: 30, protein: 0, isJunkFood: false, processingLevel: "processed" },
  { id: "b004", name: "Suc de fructe comercial", emoji: "🧃", category: "beverages", subcategory: "sucuri", color: "#f97316", tags: ["zahăr", "procesat"], nutritionalHighlight: "⚠️ Zahăr adăugat", healthScore: 3, calories: 45, protein: 0.5, isJunkFood: true, processingLevel: "ultra-processed", warningNote: "Fără fibre, zahăr concentrat. Alternativă: smoothie cu fructe întregi." },
  { id: "b005", name: "Băuturi energizante vegane", emoji: "⚡", category: "beverages", subcategory: "energizante", color: "#ef4444", tags: ["cafeină", "zahăr"], nutritionalHighlight: "⚠️ Stimulanți", healthScore: 2, calories: 45, protein: 0, isJunkFood: true, processingLevel: "ultra-processed", warningNote: "Cafeină sintetică, taurină, zahăr sau îndulcitori artificiali. Alternativă: matcha sau ceai verde." },

  // ALTERNATIVE LACTATE - Health Score variabil
  { id: "d001", name: "Lapte de migdale (nesaturat)", emoji: "🥛", category: "dairy-alt", subcategory: "lapte", color: "#fefce8", tags: ["low-cal", "smoothie"], nutritionalHighlight: "Vitamina E", healthScore: 6, calories: 17, protein: 0.6, isJunkFood: false, processingLevel: "processed" },
  { id: "d002", name: "Lapte de ovăz (nesaturat)", emoji: "🥛", category: "dairy-alt", subcategory: "lapte", color: "#f5f5dc", tags: ["cremozitate", "cafea"], nutritionalHighlight: "Beta-glucan", healthScore: 7, calories: 45, protein: 1, isJunkFood: false, processingLevel: "processed" },
  { id: "d003", name: "Lapte de cocos (conservă)", emoji: "🥥", category: "dairy-alt", subcategory: "lapte", color: "#fefce8", tags: ["curry", "deserturi"], nutritionalHighlight: "MCT", healthScore: 7, calories: 197, protein: 2.2, isJunkFood: false, processingLevel: "minimal" },
  { id: "d004", name: "Iaurt cocos natural", emoji: "🥥", category: "dairy-alt", subcategory: "iaurt", color: "#fefce8", tags: ["probiotice", "mic-dejun"], nutritionalHighlight: "Probiotice", healthScore: 7, calories: 185, protein: 2, isJunkFood: false, processingLevel: "processed" },
];

// Helper functions
export const getIngredientsByCategory = (categoryId: string) => 
  ingredients.filter(i => i.category === categoryId);

export const searchIngredients = (query: string) => 
  ingredients.filter(i => 
    i.name.toLowerCase().includes(query.toLowerCase()) ||
    i.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
  );

export const getIngredientById = (id: string) => 
  ingredients.find(i => i.id === id);

export const getJunkFoodItems = () => 
  ingredients.filter(i => i.isJunkFood);

export const getSuperfoods = () => 
  ingredients.filter(i => i.healthScore >= 9);

export const getHealthScoreColor = (score: number): string => {
  if (score >= 9) return "#00d4aa"; // Superingredient - Teal
  if (score >= 7) return "#22c55e"; // Healthy - Green
  if (score >= 5) return "#f59e0b"; // Moderate - Amber
  if (score >= 3) return "#f97316"; // Low - Orange
  return "#ef4444"; // Junk Food - Red
};

export const getHealthScoreLabel = (score: number): string => {
  if (score >= 9) return "Superingredient";
  if (score >= 7) return "Sănătos";
  if (score >= 5) return "Moderat";
  if (score >= 3) return "Procesat";
  return "Junk Food";
};

export const getProcessingLabel = (level: string): string => {
  switch (level) {
    case 'whole': return 'Întreg/Natural';
    case 'minimal': return 'Minim procesat';
    case 'processed': return 'Procesat';
    case 'ultra-processed': return 'Ultra-procesat';
    default: return level;
  }
};
