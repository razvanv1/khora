/*
 * KHORA Ingredients Database - Complete Vegan Database
 * Contains ALL ingredients from original list + extensions
 * Health Score: 1-10 (10 = superfood, 1 = ultra-processed junk)
 */

export interface Ingredient {
  id: string;
  name: string;
  category: string;
  emoji: string;
  color: string;
  healthScore: number;
  calories: number;
  protein: number;
  isJunkFood: boolean;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export const categories: Category[] = [
  { id: "cereale", name: "Cereale & Fulgi", color: "#f59e0b", icon: "🌾" },
  { id: "fainuri", name: "Făinuri", color: "#d97706", icon: "🥖" },
  { id: "leguminoase", name: "Leguminoase", color: "#84cc16", icon: "🫘" },
  { id: "proteine-vegetale", name: "Proteine Vegetale", color: "#22c55e", icon: "💪" },
  { id: "nuci-seminte", name: "Nuci & Semințe", color: "#a16207", icon: "🥜" },
  { id: "unturi-creme", name: "Unturi & Creme", color: "#ca8a04", icon: "🧈" },
  { id: "lapte-vegetal", name: "Lapte Vegetal", color: "#f5f5f4", icon: "🥛" },
  { id: "fermentate", name: "Alimente Fermentate", color: "#f97316", icon: "🥒" },
  { id: "uleiuri", name: "Uleiuri & Grăsimi", color: "#fbbf24", icon: "🫒" },
  { id: "inlocuitori-oua", name: "Înlocuitori Ouă", color: "#fde047", icon: "🥚" },
  { id: "legume-radacinoase", name: "Legume Rădăcinoase", color: "#f97316", icon: "🥕" },
  { id: "legume-frunze", name: "Legume Frunze", color: "#22c55e", icon: "🥬" },
  { id: "legume-allium", name: "Allium & Aromate", color: "#a3e635", icon: "🧅" },
  { id: "legume-fructe", name: "Legume-Fructe", color: "#ef4444", icon: "🍅" },
  { id: "ciuperci", name: "Ciuperci", color: "#a8a29e", icon: "🍄" },
  { id: "fructe", name: "Fructe", color: "#f472b6", icon: "🍎" },
  { id: "alge", name: "Alge & Marine", color: "#14b8a6", icon: "🌊" },
  { id: "condimente", name: "Condimente", color: "#dc2626", icon: "🌶️" },
  { id: "ierburi", name: "Ierburi", color: "#16a34a", icon: "🌿" },
  { id: "otet-arome", name: "Oțet & Arome", color: "#7c3aed", icon: "🍷" },
  { id: "indulcitori", name: "Îndulcitori", color: "#fbbf24", icon: "🍯" },
  { id: "sosuri", name: "Sosuri & Dressinguri", color: "#dc2626", icon: "🥫" },
  { id: "superfoods", name: "Superfoods", color: "#00d4aa", icon: "⭐" },
  { id: "bauturi", name: "Băuturi", color: "#3b82f6", icon: "☕" },
  { id: "suplimente", name: "Suplimente", color: "#a855f7", icon: "💊" },
  { id: "junk-vegan", name: "Junk Food Vegan", color: "#ef4444", icon: "⚠️" },
];

export const ingredients: Ingredient[] = [
  // ===== CEREALE & FULGI =====
  { id: "c001", name: "Ovăz instant", category: "cereale", emoji: "🌾", color: "#f59e0b", healthScore: 7, calories: 379, protein: 13.2, isJunkFood: false, tags: ["mic-dejun", "fibre", "energie"] },
  { id: "c002", name: "Ovăz integral", category: "cereale", emoji: "🌾", color: "#f59e0b", healthScore: 10, calories: 389, protein: 16.9, isJunkFood: false, tags: ["mic-dejun", "fibre", "proteine"] },
  { id: "c003", name: "Ovăz steel-cut", category: "cereale", emoji: "🌾", color: "#f59e0b", healthScore: 10, calories: 379, protein: 13.2, isJunkFood: false, tags: ["mic-dejun", "fibre"] },
  { id: "c004", name: "Quinoa", category: "cereale", emoji: "🌾", color: "#f59e0b", healthScore: 10, calories: 368, protein: 14.1, isJunkFood: false, tags: ["proteine-complete", "fără-gluten", "superfood"] },
  { id: "c005", name: "Bulgur", category: "cereale", emoji: "🌾", color: "#f59e0b", healthScore: 9, calories: 342, protein: 12.3, isJunkFood: false, tags: ["fibre", "mediteranean"] },
  { id: "c006", name: "Couscous integral", category: "cereale", emoji: "🌾", color: "#f59e0b", healthScore: 8, calories: 376, protein: 12.8, isJunkFood: false, tags: ["rapid", "mediteranean"] },
  { id: "c007", name: "Orez brun", category: "cereale", emoji: "🍚", color: "#f59e0b", healthScore: 9, calories: 362, protein: 7.5, isJunkFood: false, tags: ["fibre", "fără-gluten"] },
  { id: "c008", name: "Orez basmati", category: "cereale", emoji: "🍚", color: "#f59e0b", healthScore: 7, calories: 356, protein: 7.1, isJunkFood: false, tags: ["aromat", "asiatic"] },
  { id: "c009", name: "Orez sălbatic", category: "cereale", emoji: "🍚", color: "#f59e0b", healthScore: 10, calories: 357, protein: 14.7, isJunkFood: false, tags: ["proteine", "fibre", "premium"] },
  { id: "c010", name: "Mei", category: "cereale", emoji: "🌾", color: "#f59e0b", healthScore: 9, calories: 378, protein: 11, isJunkFood: false, tags: ["fără-gluten", "alcalin"] },
  { id: "c011", name: "Hrișcă", category: "cereale", emoji: "🌾", color: "#f59e0b", healthScore: 10, calories: 343, protein: 13.3, isJunkFood: false, tags: ["fără-gluten", "proteine-complete"] },
  { id: "c012", name: "Gris", category: "cereale", emoji: "🌾", color: "#f59e0b", healthScore: 6, calories: 360, protein: 12.7, isJunkFood: false, tags: ["rapid"] },
  { id: "c013", name: "Orz", category: "cereale", emoji: "🌾", color: "#f59e0b", healthScore: 8, calories: 354, protein: 12.5, isJunkFood: false, tags: ["fibre", "beta-glucan"] },
  { id: "c014", name: "Sorg", category: "cereale", emoji: "🌾", color: "#f59e0b", healthScore: 9, calories: 329, protein: 10.6, isJunkFood: false, tags: ["fără-gluten", "antic"] },
  { id: "c015", name: "Amarant", category: "cereale", emoji: "🌾", color: "#f59e0b", healthScore: 10, calories: 371, protein: 13.6, isJunkFood: false, tags: ["proteine-complete", "fără-gluten", "superfood"] },
  { id: "c016", name: "Tapioca", category: "cereale", emoji: "🌾", color: "#f59e0b", healthScore: 5, calories: 358, protein: 0.2, isJunkFood: false, tags: ["fără-gluten"] },

  // ===== FĂINURI =====
  { id: "f001", name: "Făină integrală grâu", category: "fainuri", emoji: "🥖", color: "#d97706", healthScore: 8, calories: 340, protein: 13.2, isJunkFood: false, tags: ["fibre", "panificație"] },
  { id: "f002", name: "Făină albă", category: "fainuri", emoji: "🥖", color: "#d97706", healthScore: 4, calories: 364, protein: 10.3, isJunkFood: false, tags: ["panificație", "rafinată"] },
  { id: "f003", name: "Făină de secară", category: "fainuri", emoji: "🥖", color: "#d97706", healthScore: 8, calories: 325, protein: 10.9, isJunkFood: false, tags: ["fibre", "pâine"] },
  { id: "f004", name: "Făină de ovăz", category: "fainuri", emoji: "🥖", color: "#d97706", healthScore: 9, calories: 404, protein: 14.7, isJunkFood: false, tags: ["fibre", "proteine"] },
  { id: "f005", name: "Făină de năut", category: "fainuri", emoji: "🥖", color: "#d97706", healthScore: 10, calories: 387, protein: 22.4, isJunkFood: false, tags: ["proteine", "fără-gluten"] },
  { id: "f006", name: "Făină de migdale", category: "fainuri", emoji: "🥖", color: "#d97706", healthScore: 9, calories: 590, protein: 21, isJunkFood: false, tags: ["keto", "fără-gluten", "proteine"] },
  { id: "f007", name: "Făină de cocos", category: "fainuri", emoji: "🥖", color: "#d97706", healthScore: 9, calories: 443, protein: 19.3, isJunkFood: false, tags: ["fibre", "fără-gluten", "keto"] },
  { id: "f008", name: "Făină de hrișcă", category: "fainuri", emoji: "🥖", color: "#d97706", healthScore: 9, calories: 335, protein: 12.6, isJunkFood: false, tags: ["fără-gluten", "proteine"] },
  { id: "f009", name: "Făină de orez", category: "fainuri", emoji: "🥖", color: "#d97706", healthScore: 7, calories: 366, protein: 5.9, isJunkFood: false, tags: ["fără-gluten"] },
  { id: "f010", name: "Făină de porumb", category: "fainuri", emoji: "🥖", color: "#d97706", healthScore: 7, calories: 361, protein: 6.9, isJunkFood: false, tags: ["fără-gluten", "mămăligă"] },
  { id: "f011", name: "Făină de spelta", category: "fainuri", emoji: "🥖", color: "#d97706", healthScore: 8, calories: 338, protein: 14.6, isJunkFood: false, tags: ["antic", "fibre"] },
  { id: "f012", name: "Făină de teff", category: "fainuri", emoji: "🥖", color: "#d97706", healthScore: 10, calories: 367, protein: 13.3, isJunkFood: false, tags: ["fără-gluten", "fier", "superfood"] },

  // ===== LEGUMINOASE =====
  { id: "l001", name: "Linte roșie", category: "leguminoase", emoji: "🫘", color: "#84cc16", healthScore: 10, calories: 358, protein: 24.6, isJunkFood: false, tags: ["proteine", "fier", "rapid"] },
  { id: "l002", name: "Linte verde", category: "leguminoase", emoji: "🫘", color: "#84cc16", healthScore: 10, calories: 352, protein: 24.6, isJunkFood: false, tags: ["proteine", "fibre"] },
  { id: "l003", name: "Linte maro", category: "leguminoase", emoji: "🫘", color: "#84cc16", healthScore: 10, calories: 352, protein: 25.8, isJunkFood: false, tags: ["proteine", "fibre"] },
  { id: "l004", name: "Năut", category: "leguminoase", emoji: "🫘", color: "#84cc16", healthScore: 10, calories: 364, protein: 19, isJunkFood: false, tags: ["proteine", "fibre", "hummus"] },
  { id: "l005", name: "Fasole roșie", category: "leguminoase", emoji: "🫘", color: "#84cc16", healthScore: 10, calories: 333, protein: 23.6, isJunkFood: false, tags: ["proteine", "fibre"] },
  { id: "l006", name: "Fasole neagră", category: "leguminoase", emoji: "🫘", color: "#84cc16", healthScore: 10, calories: 341, protein: 21.6, isJunkFood: false, tags: ["proteine", "antioxidanți"] },
  { id: "l007", name: "Fasole cannellini", category: "leguminoase", emoji: "🫘", color: "#84cc16", healthScore: 9, calories: 333, protein: 23.4, isJunkFood: false, tags: ["proteine", "italian"] },
  { id: "l008", name: "Fasole borlotti", category: "leguminoase", emoji: "🫘", color: "#84cc16", healthScore: 9, calories: 335, protein: 23.0, isJunkFood: false, tags: ["proteine", "fibre"] },
  { id: "l009", name: "Mazăre uscată", category: "leguminoase", emoji: "🫘", color: "#84cc16", healthScore: 9, calories: 352, protein: 24.6, isJunkFood: false, tags: ["proteine", "fibre"] },
  { id: "l010", name: "Mazăre verde conservă", category: "leguminoase", emoji: "🫘", color: "#84cc16", healthScore: 7, calories: 81, protein: 5.4, isJunkFood: false, tags: ["rapid", "garnitură"] },
  { id: "l011", name: "Edamame congelat", category: "leguminoase", emoji: "🫘", color: "#84cc16", healthScore: 10, calories: 121, protein: 11.9, isJunkFood: false, tags: ["proteine-complete", "asiatic"] },
  { id: "l012", name: "Soia boabe", category: "leguminoase", emoji: "🫘", color: "#84cc16", healthScore: 10, calories: 446, protein: 36.5, isJunkFood: false, tags: ["proteine-complete", "versatil"] },

  // ===== PROTEINE VEGETALE =====
  { id: "p001", name: "Tofu natural", category: "proteine-vegetale", emoji: "💪", color: "#22c55e", healthScore: 10, calories: 76, protein: 8, isJunkFood: false, tags: ["proteine-complete", "versatil", "asiatic"] },
  { id: "p002", name: "Tofu afumat", category: "proteine-vegetale", emoji: "💪", color: "#22c55e", healthScore: 9, calories: 140, protein: 16, isJunkFood: false, tags: ["proteine", "aromat"] },
  { id: "p003", name: "Tofu silken", category: "proteine-vegetale", emoji: "💪", color: "#22c55e", healthScore: 9, calories: 55, protein: 4.8, isJunkFood: false, tags: ["cremos", "deserturi"] },
  { id: "p004", name: "Tempeh", category: "proteine-vegetale", emoji: "💪", color: "#22c55e", healthScore: 10, calories: 193, protein: 20.3, isJunkFood: false, tags: ["proteine", "fermentat", "probiotice"] },
  { id: "p005", name: "Seitan", category: "proteine-vegetale", emoji: "💪", color: "#22c55e", healthScore: 8, calories: 370, protein: 75, isJunkFood: false, tags: ["proteine-maxime", "gluten"] },
  { id: "p006", name: "TVP (soia texturată)", category: "proteine-vegetale", emoji: "💪", color: "#22c55e", healthScore: 8, calories: 327, protein: 52, isJunkFood: false, tags: ["proteine", "economic"] },
  { id: "p007", name: "Proteine mazăre texturate", category: "proteine-vegetale", emoji: "💪", color: "#22c55e", healthScore: 8, calories: 338, protein: 50, isJunkFood: false, tags: ["proteine", "fără-soia"] },
  { id: "p008", name: "Jackfruit conservat", category: "proteine-vegetale", emoji: "🍈", color: "#22c55e", healthScore: 7, calories: 95, protein: 1.7, isJunkFood: false, tags: ["textură-carne", "pulled"] },

  // ===== NUCI & SEMINȚE =====
  { id: "n001", name: "Migdale", category: "nuci-seminte", emoji: "🥜", color: "#a16207", healthScore: 10, calories: 579, protein: 21.2, isJunkFood: false, tags: ["proteine", "vitamina-E", "snack"] },
  { id: "n002", name: "Nuci caju", category: "nuci-seminte", emoji: "🥜", color: "#a16207", healthScore: 9, calories: 553, protein: 18.2, isJunkFood: false, tags: ["cremos", "zinc"] },
  { id: "n003", name: "Nuci braziliene", category: "nuci-seminte", emoji: "🥜", color: "#a16207", healthScore: 10, calories: 659, protein: 14.3, isJunkFood: false, tags: ["seleniu", "tiroidă"] },
  { id: "n004", name: "Nuci pecan", category: "nuci-seminte", emoji: "🥜", color: "#a16207", healthScore: 9, calories: 691, protein: 9.2, isJunkFood: false, tags: ["antioxidanți"] },
  { id: "n005", name: "Nuci (walnut)", category: "nuci-seminte", emoji: "🥜", color: "#a16207", healthScore: 10, calories: 654, protein: 15.2, isJunkFood: false, tags: ["omega-3", "creier"] },
  { id: "n006", name: "Alune de pădure", category: "nuci-seminte", emoji: "🥜", color: "#a16207", healthScore: 9, calories: 628, protein: 15, isJunkFood: false, tags: ["vitamina-E"] },
  { id: "n007", name: "Arahide", category: "nuci-seminte", emoji: "🥜", color: "#a16207", healthScore: 8, calories: 567, protein: 25.8, isJunkFood: false, tags: ["proteine", "economic"] },
  { id: "n008", name: "Semințe de in", category: "nuci-seminte", emoji: "🌱", color: "#a16207", healthScore: 10, calories: 534, protein: 18.3, isJunkFood: false, tags: ["omega-3", "fibre", "lignani"] },
  { id: "n009", name: "Semințe de chia", category: "nuci-seminte", emoji: "🌱", color: "#a16207", healthScore: 10, calories: 486, protein: 16.5, isJunkFood: false, tags: ["omega-3", "fibre", "superfood"] },
  { id: "n010", name: "Semințe de dovleac", category: "nuci-seminte", emoji: "🌱", color: "#a16207", healthScore: 10, calories: 559, protein: 30.2, isJunkFood: false, tags: ["zinc", "proteine", "magneziu"] },
  { id: "n011", name: "Semințe floarea-soarelui", category: "nuci-seminte", emoji: "🌻", color: "#a16207", healthScore: 9, calories: 584, protein: 20.8, isJunkFood: false, tags: ["vitamina-E", "seleniu"] },
  { id: "n012", name: "Semințe de cânepă", category: "nuci-seminte", emoji: "🌱", color: "#a16207", healthScore: 10, calories: 553, protein: 31.6, isJunkFood: false, tags: ["proteine-complete", "omega", "superfood"] },
  { id: "n013", name: "Susan", category: "nuci-seminte", emoji: "🌱", color: "#a16207", healthScore: 9, calories: 573, protein: 17.7, isJunkFood: false, tags: ["calciu", "fier"] },
  { id: "n014", name: "Tahini", category: "nuci-seminte", emoji: "🥜", color: "#a16207", healthScore: 9, calories: 595, protein: 17, isJunkFood: false, tags: ["calciu", "cremos"] },

  // ===== UNTURI & CREME =====
  { id: "u001", name: "Unt de caju", category: "unturi-creme", emoji: "🧈", color: "#ca8a04", healthScore: 8, calories: 587, protein: 17.6, isJunkFood: false, tags: ["cremos", "dulce"] },
  { id: "u002", name: "Unt de migdale", category: "unturi-creme", emoji: "🧈", color: "#ca8a04", healthScore: 9, calories: 614, protein: 21, isJunkFood: false, tags: ["proteine", "vitamina-E"] },
  { id: "u003", name: "Unt de arahide natural", category: "unturi-creme", emoji: "🧈", color: "#ca8a04", healthScore: 8, calories: 588, protein: 25, isJunkFood: false, tags: ["proteine", "economic"] },
  { id: "u004", name: "Unt de nuci mix", category: "unturi-creme", emoji: "🧈", color: "#ca8a04", healthScore: 8, calories: 607, protein: 15, isJunkFood: false, tags: ["variat"] },
  { id: "u005", name: "Cremă de alune", category: "unturi-creme", emoji: "🧈", color: "#ca8a04", healthScore: 5, calories: 628, protein: 15, isJunkFood: false, tags: ["desert"] },

  // ===== LAPTE VEGETAL =====
  { id: "lv001", name: "Lapte de soia neîndulcit", category: "lapte-vegetal", emoji: "🥛", color: "#f5f5f4", healthScore: 10, calories: 33, protein: 3.3, isJunkFood: false, tags: ["proteine", "calciu", "versatil"] },
  { id: "lv002", name: "Lapte de ovăz", category: "lapte-vegetal", emoji: "🥛", color: "#f5f5f4", healthScore: 8, calories: 46, protein: 1, isJunkFood: false, tags: ["cremos", "cafea", "sustenabil"] },
  { id: "lv003", name: "Lapte de migdale", category: "lapte-vegetal", emoji: "🥛", color: "#f5f5f4", healthScore: 7, calories: 17, protein: 0.6, isJunkFood: false, tags: ["low-cal", "vitamina-E"] },
  { id: "lv004", name: "Lapte de orez", category: "lapte-vegetal", emoji: "🥛", color: "#f5f5f4", healthScore: 6, calories: 47, protein: 0.3, isJunkFood: false, tags: ["hipoalergenic", "dulce"] },
  { id: "lv005", name: "Lapte de caju", category: "lapte-vegetal", emoji: "🥛", color: "#f5f5f4", healthScore: 7, calories: 25, protein: 0.9, isJunkFood: false, tags: ["cremos"] },
  { id: "lv006", name: "Lapte de cocos (băutură)", category: "lapte-vegetal", emoji: "🥛", color: "#f5f5f4", healthScore: 7, calories: 45, protein: 0.5, isJunkFood: false, tags: ["tropical", "cremos"] },
  { id: "lv007", name: "Lapte de cânepă", category: "lapte-vegetal", emoji: "🥛", color: "#f5f5f4", healthScore: 9, calories: 46, protein: 3, isJunkFood: false, tags: ["omega", "proteine"] },
  { id: "lv008", name: "Lapte de macadamia", category: "lapte-vegetal", emoji: "🥛", color: "#f5f5f4", healthScore: 7, calories: 55, protein: 1, isJunkFood: false, tags: ["cremos", "premium"] },
  { id: "lv009", name: "Iaurt vegetal soia", category: "lapte-vegetal", emoji: "🥛", color: "#f5f5f4", healthScore: 9, calories: 50, protein: 4, isJunkFood: false, tags: ["probiotice", "proteine"] },
  { id: "lv010", name: "Iaurt vegetal cocos", category: "lapte-vegetal", emoji: "🥛", color: "#f5f5f4", healthScore: 7, calories: 110, protein: 1, isJunkFood: false, tags: ["cremos", "desert"] },
  { id: "lv011", name: "Iaurt vegetal ovăz", category: "lapte-vegetal", emoji: "🥛", color: "#f5f5f4", healthScore: 7, calories: 70, protein: 2, isJunkFood: false, tags: ["fibre"] },
  { id: "lv012", name: "Smântână vegană", category: "lapte-vegetal", emoji: "🥛", color: "#f5f5f4", healthScore: 6, calories: 180, protein: 1, isJunkFood: false, tags: ["gătit", "cremos"] },

  // ===== ALIMENTE FERMENTATE =====
  { id: "fe001", name: "Kimchi vegan", category: "fermentate", emoji: "🥒", color: "#f97316", healthScore: 10, calories: 15, protein: 1.1, isJunkFood: false, tags: ["probiotice", "coreean", "picant"] },
  { id: "fe002", name: "Murături", category: "fermentate", emoji: "🥒", color: "#f97316", healthScore: 8, calories: 11, protein: 0.3, isJunkFood: false, tags: ["probiotice", "tradițional"] },
  { id: "fe003", name: "Varză murată", category: "fermentate", emoji: "🥬", color: "#f97316", healthScore: 10, calories: 19, protein: 0.9, isJunkFood: false, tags: ["probiotice", "vitamina-C"] },
  { id: "fe004", name: "Miso alb", category: "fermentate", emoji: "🍶", color: "#f97316", healthScore: 9, calories: 199, protein: 12.8, isJunkFood: false, tags: ["umami", "japonez", "probiotice"] },
  { id: "fe005", name: "Miso roșu", category: "fermentate", emoji: "🍶", color: "#f97316", healthScore: 9, calories: 199, protein: 12.8, isJunkFood: false, tags: ["umami", "intens"] },
  { id: "fe006", name: "Sos de soia", category: "fermentate", emoji: "🍶", color: "#f97316", healthScore: 7, calories: 53, protein: 8.1, isJunkFood: false, tags: ["umami", "asiatic"] },
  { id: "fe007", name: "Tamari", category: "fermentate", emoji: "🍶", color: "#f97316", healthScore: 8, calories: 60, protein: 10.5, isJunkFood: false, tags: ["umami", "fără-gluten"] },
  { id: "fe008", name: "Natto", category: "fermentate", emoji: "🫘", color: "#f97316", healthScore: 10, calories: 211, protein: 19.4, isJunkFood: false, tags: ["vitamina-K2", "probiotice", "japonez"] },
  { id: "fe009", name: "Kombucha", category: "fermentate", emoji: "🍵", color: "#f97316", healthScore: 8, calories: 30, protein: 0, isJunkFood: false, tags: ["probiotice", "băutură"] },

  // ===== ULEIURI & GRĂSIMI =====
  { id: "ul001", name: "Ulei măsline extravirgin", category: "uleiuri", emoji: "🫒", color: "#fbbf24", healthScore: 10, calories: 884, protein: 0, isJunkFood: false, tags: ["omega-9", "mediteranean", "premium"] },
  { id: "ul002", name: "Ulei de rapiță", category: "uleiuri", emoji: "🫒", color: "#fbbf24", healthScore: 8, calories: 884, protein: 0, isJunkFood: false, tags: ["omega-3", "neutru"] },
  { id: "ul003", name: "Ulei de cocos", category: "uleiuri", emoji: "🥥", color: "#fbbf24", healthScore: 7, calories: 862, protein: 0, isJunkFood: false, tags: ["MCT", "prăjit"] },
  { id: "ul004", name: "Ulei de susan", category: "uleiuri", emoji: "🫒", color: "#fbbf24", healthScore: 8, calories: 884, protein: 0, isJunkFood: false, tags: ["asiatic", "aromat"] },
  { id: "ul005", name: "Ulei de avocado", category: "uleiuri", emoji: "🥑", color: "#fbbf24", healthScore: 9, calories: 884, protein: 0, isJunkFood: false, tags: ["punct-fum-înalt", "premium"] },
  { id: "ul006", name: "Ulei floarea-soarelui", category: "uleiuri", emoji: "🌻", color: "#fbbf24", healthScore: 6, calories: 884, protein: 0, isJunkFood: false, tags: ["neutru", "prăjit"] },
  { id: "ul007", name: "Ulei de in", category: "uleiuri", emoji: "🫒", color: "#fbbf24", healthScore: 10, calories: 884, protein: 0, isJunkFood: false, tags: ["omega-3", "salate", "nu-încălzi"] },
  { id: "ul008", name: "Margarină vegetală", category: "uleiuri", emoji: "🧈", color: "#fbbf24", healthScore: 4, calories: 717, protein: 0, isJunkFood: true, tags: ["procesat", "tartine"] },

  // ===== ÎNLOCUITORI OUĂ =====
  { id: "io001", name: "Aquafaba", category: "inlocuitori-oua", emoji: "🥚", color: "#fde047", healthScore: 8, calories: 3, protein: 0.1, isJunkFood: false, tags: ["bezele", "maioneza", "zero-waste"] },
  { id: "io002", name: "Semințe in măcinate", category: "inlocuitori-oua", emoji: "🌱", color: "#fde047", healthScore: 10, calories: 534, protein: 18.3, isJunkFood: false, tags: ["omega-3", "legare"] },
  { id: "io003", name: "Piure de banană", category: "inlocuitori-oua", emoji: "🍌", color: "#fde047", healthScore: 8, calories: 89, protein: 1.1, isJunkFood: false, tags: ["dulce", "prăjituri"] },
  { id: "io004", name: "Piure de mere", category: "inlocuitori-oua", emoji: "🍎", color: "#fde047", healthScore: 8, calories: 52, protein: 0.3, isJunkFood: false, tags: ["dulce", "prăjituri"] },
  { id: "io005", name: "Agar-agar", category: "inlocuitori-oua", emoji: "🌊", color: "#fde047", healthScore: 9, calories: 26, protein: 0.5, isJunkFood: false, tags: ["gelifiant", "alge"] },

  // ===== LEGUME RĂDĂCINOASE & CRUCIFERE =====
  { id: "lr001", name: "Morcovi", category: "legume-radacinoase", emoji: "🥕", color: "#f97316", healthScore: 9, calories: 41, protein: 0.9, isJunkFood: false, tags: ["beta-caroten", "fibre"] },
  { id: "lr002", name: "Păstârnac", category: "legume-radacinoase", emoji: "🥕", color: "#f97316", healthScore: 9, calories: 75, protein: 1.2, isJunkFood: false, tags: ["fibre", "dulce"] },
  { id: "lr003", name: "Napi", category: "legume-radacinoase", emoji: "🥕", color: "#f97316", healthScore: 8, calories: 28, protein: 0.9, isJunkFood: false, tags: ["low-carb"] },
  { id: "lr004", name: "Cartofi", category: "legume-radacinoase", emoji: "🥔", color: "#f97316", healthScore: 7, calories: 77, protein: 2, isJunkFood: false, tags: ["energie", "potasiu"] },
  { id: "lr005", name: "Cartofi dulci", category: "legume-radacinoase", emoji: "🍠", color: "#f97316", healthScore: 9, calories: 86, protein: 1.6, isJunkFood: false, tags: ["beta-caroten", "fibre"] },
  { id: "lr006", name: "Sfeclă", category: "legume-radacinoase", emoji: "🫒", color: "#f97316", healthScore: 10, calories: 43, protein: 1.6, isJunkFood: false, tags: ["nitrați", "performanță"] },
  { id: "lr007", name: "Țelină rădăcină", category: "legume-radacinoase", emoji: "🥕", color: "#f97316", healthScore: 8, calories: 42, protein: 1.5, isJunkFood: false, tags: ["low-carb", "aromat"] },
  { id: "lr008", name: "Ridichi", category: "legume-radacinoase", emoji: "🫒", color: "#f97316", healthScore: 9, calories: 16, protein: 0.7, isJunkFood: false, tags: ["picant", "low-cal"] },
  { id: "lr009", name: "Varză albă", category: "legume-radacinoase", emoji: "🥬", color: "#f97316", healthScore: 9, calories: 25, protein: 1.3, isJunkFood: false, tags: ["vitamina-C", "fibre"] },
  { id: "lr010", name: "Varză roșie", category: "legume-radacinoase", emoji: "🥬", color: "#f97316", healthScore: 10, calories: 31, protein: 1.4, isJunkFood: false, tags: ["antociani", "antioxidanți"] },
  { id: "lr011", name: "Broccoli", category: "legume-radacinoase", emoji: "🥦", color: "#22c55e", healthScore: 10, calories: 34, protein: 2.8, isJunkFood: false, tags: ["vitamina-C", "sulforafan", "superfood"] },
  { id: "lr012", name: "Conopidă", category: "legume-radacinoase", emoji: "🥬", color: "#f97316", healthScore: 9, calories: 25, protein: 1.9, isJunkFood: false, tags: ["low-carb", "versatil"] },
  { id: "lr013", name: "Kale", category: "legume-radacinoase", emoji: "🥬", color: "#22c55e", healthScore: 10, calories: 49, protein: 4.3, isJunkFood: false, tags: ["superfood", "calciu", "fier"] },
  { id: "lr014", name: "Varză de Bruxelles", category: "legume-radacinoase", emoji: "🥬", color: "#22c55e", healthScore: 10, calories: 43, protein: 3.4, isJunkFood: false, tags: ["vitamina-K", "fibre"] },

  // ===== LEGUME FRUNZE =====
  { id: "lf001", name: "Spanac baby", category: "legume-frunze", emoji: "🥬", color: "#22c55e", healthScore: 10, calories: 23, protein: 2.9, isJunkFood: false, tags: ["fier", "folat", "smoothie"] },
  { id: "lf002", name: "Spanac matur", category: "legume-frunze", emoji: "🥬", color: "#22c55e", healthScore: 10, calories: 23, protein: 2.9, isJunkFood: false, tags: ["fier", "gătit"] },
  { id: "lf003", name: "Salată romaine", category: "legume-frunze", emoji: "🥬", color: "#22c55e", healthScore: 8, calories: 17, protein: 1.2, isJunkFood: false, tags: ["crocant", "caesar"] },
  { id: "lf004", name: "Salată iceberg", category: "legume-frunze", emoji: "🥬", color: "#22c55e", healthScore: 6, calories: 14, protein: 0.9, isJunkFood: false, tags: ["hidratare", "crocant"] },
  { id: "lf005", name: "Rucola", category: "legume-frunze", emoji: "🥬", color: "#22c55e", healthScore: 9, calories: 25, protein: 2.6, isJunkFood: false, tags: ["picant", "calciu"] },
  { id: "lf006", name: "Frunze de sfeclă", category: "legume-frunze", emoji: "🥬", color: "#22c55e", healthScore: 10, calories: 22, protein: 2.2, isJunkFood: false, tags: ["fier", "zero-waste"] },
  { id: "lf007", name: "Lobodă", category: "legume-frunze", emoji: "🥬", color: "#22c55e", healthScore: 10, calories: 43, protein: 4.3, isJunkFood: false, tags: ["tradițional", "fier"] },
  { id: "lf008", name: "Valeriană", category: "legume-frunze", emoji: "🥬", color: "#22c55e", healthScore: 8, calories: 21, protein: 2, isJunkFood: false, tags: ["delicat", "salată"] },
  { id: "lf009", name: "Mizuna", category: "legume-frunze", emoji: "🥬", color: "#22c55e", healthScore: 9, calories: 21, protein: 2.2, isJunkFood: false, tags: ["japonez", "picant"] },
  { id: "lf010", name: "Frunze de muștar", category: "legume-frunze", emoji: "🥬", color: "#22c55e", healthScore: 9, calories: 27, protein: 2.9, isJunkFood: false, tags: ["picant", "vitamina-K"] },

  // ===== ALLIUM & AROMATE =====
  { id: "al001", name: "Ceapă galbenă", category: "legume-allium", emoji: "🧅", color: "#a3e635", healthScore: 8, calories: 40, protein: 1.1, isJunkFood: false, tags: ["bază", "aromat"] },
  { id: "al002", name: "Ceapă roșie", category: "legume-allium", emoji: "🧅", color: "#a3e635", healthScore: 9, calories: 40, protein: 1.1, isJunkFood: false, tags: ["antociani", "salate"] },
  { id: "al003", name: "Usturoi", category: "legume-allium", emoji: "🧄", color: "#a3e635", healthScore: 10, calories: 149, protein: 6.4, isJunkFood: false, tags: ["alicină", "imunitate", "aromat"] },
  { id: "al004", name: "Praz", category: "legume-allium", emoji: "🧅", color: "#a3e635", healthScore: 9, calories: 61, protein: 1.5, isJunkFood: false, tags: ["delicat", "supe"] },
  { id: "al005", name: "Ceapă verde", category: "legume-allium", emoji: "🧅", color: "#a3e635", healthScore: 8, calories: 32, protein: 1.8, isJunkFood: false, tags: ["proaspăt", "asiatic"] },
  { id: "al006", name: "Șalotă", category: "legume-allium", emoji: "🧅", color: "#a3e635", healthScore: 8, calories: 72, protein: 2.5, isJunkFood: false, tags: ["delicat", "francez"] },

  // ===== LEGUME-FRUCTE =====
  { id: "lfr001", name: "Roșii", category: "legume-fructe", emoji: "🍅", color: "#ef4444", healthScore: 9, calories: 18, protein: 0.9, isJunkFood: false, tags: ["licopen", "vitamina-C"] },
  { id: "lfr002", name: "Roșii cherry", category: "legume-fructe", emoji: "🍅", color: "#ef4444", healthScore: 9, calories: 18, protein: 0.9, isJunkFood: false, tags: ["snack", "salate"] },
  { id: "lfr003", name: "Ardei gras roșu", category: "legume-fructe", emoji: "🫑", color: "#ef4444", healthScore: 10, calories: 31, protein: 1, isJunkFood: false, tags: ["vitamina-C", "dulce"] },
  { id: "lfr004", name: "Ardei gras galben", category: "legume-fructe", emoji: "🫑", color: "#fbbf24", healthScore: 9, calories: 27, protein: 1, isJunkFood: false, tags: ["vitamina-C"] },
  { id: "lfr005", name: "Ardei gras verde", category: "legume-fructe", emoji: "🫑", color: "#22c55e", healthScore: 8, calories: 20, protein: 0.9, isJunkFood: false, tags: ["crocant"] },
  { id: "lfr006", name: "Castraveți", category: "legume-fructe", emoji: "🥒", color: "#22c55e", healthScore: 8, calories: 16, protein: 0.7, isJunkFood: false, tags: ["hidratare", "răcoritor"] },
  { id: "lfr007", name: "Dovlecei", category: "legume-fructe", emoji: "🥒", color: "#22c55e", healthScore: 9, calories: 17, protein: 1.2, isJunkFood: false, tags: ["low-carb", "versatil"] },
  { id: "lfr008", name: "Vinete", category: "legume-fructe", emoji: "🍆", color: "#8b5cf6", healthScore: 8, calories: 25, protein: 1, isJunkFood: false, tags: ["mediteranean", "textură"] },
  { id: "lfr009", name: "Mazăre proaspătă", category: "legume-fructe", emoji: "🫛", color: "#22c55e", healthScore: 9, calories: 81, protein: 5.4, isJunkFood: false, tags: ["proteine", "dulce"] },
  { id: "lfr010", name: "Fasole verde", category: "legume-fructe", emoji: "🫛", color: "#22c55e", healthScore: 9, calories: 31, protein: 1.8, isJunkFood: false, tags: ["fibre", "garnitură"] },
  { id: "lfr011", name: "Porumb boabe", category: "legume-fructe", emoji: "🌽", color: "#fbbf24", healthScore: 7, calories: 86, protein: 3.3, isJunkFood: false, tags: ["dulce", "fibre"] },
  { id: "lfr012", name: "Avocado", category: "legume-fructe", emoji: "🥑", color: "#22c55e", healthScore: 10, calories: 160, protein: 2, isJunkFood: false, tags: ["grăsimi-sănătoase", "potasiu", "superfood"] },
  { id: "lfr013", name: "Dovleac", category: "legume-fructe", emoji: "🎃", color: "#f97316", healthScore: 9, calories: 26, protein: 1, isJunkFood: false, tags: ["beta-caroten", "fibre"] },

  // ===== CIUPERCI =====
  { id: "ci001", name: "Champignon", category: "ciuperci", emoji: "🍄", color: "#a8a29e", healthScore: 8, calories: 22, protein: 3.1, isJunkFood: false, tags: ["vitamina-D", "versatil"] },
  { id: "ci002", name: "Shiitake", category: "ciuperci", emoji: "🍄", color: "#a8a29e", healthScore: 10, calories: 34, protein: 2.2, isJunkFood: false, tags: ["imunitate", "umami", "asiatic"] },
  { id: "ci003", name: "Pleurotus", category: "ciuperci", emoji: "🍄", color: "#a8a29e", healthScore: 9, calories: 33, protein: 3.3, isJunkFood: false, tags: ["textură-carne"] },
  { id: "ci004", name: "Portobello", category: "ciuperci", emoji: "🍄", color: "#a8a29e", healthScore: 9, calories: 22, protein: 2.1, isJunkFood: false, tags: ["burger", "grătar"] },
  { id: "ci005", name: "Enoki", category: "ciuperci", emoji: "🍄", color: "#a8a29e", healthScore: 8, calories: 37, protein: 2.7, isJunkFood: false, tags: ["delicat", "asiatic"] },
  { id: "ci006", name: "Maitake", category: "ciuperci", emoji: "🍄", color: "#a8a29e", healthScore: 10, calories: 31, protein: 1.9, isJunkFood: false, tags: ["imunitate", "adaptogen"] },
  { id: "ci007", name: "Porcini uscate", category: "ciuperci", emoji: "🍄", color: "#a8a29e", healthScore: 9, calories: 296, protein: 30, isJunkFood: false, tags: ["umami", "intens", "italian"] },

  // ===== FRUCTE =====
  { id: "fr001", name: "Banane", category: "fructe", emoji: "🍌", color: "#fbbf24", healthScore: 8, calories: 89, protein: 1.1, isJunkFood: false, tags: ["potasiu", "energie", "smoothie"] },
  { id: "fr002", name: "Mere", category: "fructe", emoji: "🍎", color: "#ef4444", healthScore: 8, calories: 52, protein: 0.3, isJunkFood: false, tags: ["fibre", "pectină"] },
  { id: "fr003", name: "Pere", category: "fructe", emoji: "🍐", color: "#a3e635", healthScore: 8, calories: 57, protein: 0.4, isJunkFood: false, tags: ["fibre", "digestie"] },
  { id: "fr004", name: "Portocale", category: "fructe", emoji: "🍊", color: "#f97316", healthScore: 9, calories: 47, protein: 0.9, isJunkFood: false, tags: ["vitamina-C", "imunitate"] },
  { id: "fr005", name: "Grapefruit", category: "fructe", emoji: "🍊", color: "#f97316", healthScore: 9, calories: 42, protein: 0.8, isJunkFood: false, tags: ["vitamina-C", "metabolism"] },
  { id: "fr006", name: "Kiwi", category: "fructe", emoji: "🥝", color: "#22c55e", healthScore: 10, calories: 61, protein: 1.1, isJunkFood: false, tags: ["vitamina-C", "digestie"] },
  { id: "fr007", name: "Mango", category: "fructe", emoji: "🥭", color: "#fbbf24", healthScore: 8, calories: 60, protein: 0.8, isJunkFood: false, tags: ["tropical", "vitamina-A"] },
  { id: "fr008", name: "Ananas", category: "fructe", emoji: "🍍", color: "#fbbf24", healthScore: 8, calories: 50, protein: 0.5, isJunkFood: false, tags: ["bromelain", "digestie"] },
  { id: "fr009", name: "Afine", category: "fructe", emoji: "🫐", color: "#3b82f6", healthScore: 10, calories: 57, protein: 0.7, isJunkFood: false, tags: ["antioxidanți", "creier", "superfood"] },
  { id: "fr010", name: "Zmeură", category: "fructe", emoji: "🫐", color: "#ec4899", healthScore: 10, calories: 52, protein: 1.2, isJunkFood: false, tags: ["fibre", "antioxidanți"] },
  { id: "fr011", name: "Mure", category: "fructe", emoji: "🫐", color: "#6b21a8", healthScore: 10, calories: 43, protein: 1.4, isJunkFood: false, tags: ["fibre", "vitamina-C"] },
  { id: "fr012", name: "Căpșuni", category: "fructe", emoji: "🍓", color: "#ef4444", healthScore: 9, calories: 32, protein: 0.7, isJunkFood: false, tags: ["vitamina-C", "antioxidanți"] },
  { id: "fr013", name: "Curmale uscate", category: "fructe", emoji: "🫒", color: "#a16207", healthScore: 7, calories: 282, protein: 2.5, isJunkFood: false, tags: ["energie", "îndulcitor-natural"] },
  { id: "fr014", name: "Smochine uscate", category: "fructe", emoji: "🫒", color: "#a16207", healthScore: 8, calories: 249, protein: 3.3, isJunkFood: false, tags: ["fibre", "calciu"] },
  { id: "fr015", name: "Prune uscate", category: "fructe", emoji: "🫒", color: "#6b21a8", healthScore: 8, calories: 240, protein: 2.2, isJunkFood: false, tags: ["digestie", "fibre"] },
  { id: "fr016", name: "Pepene galben", category: "fructe", emoji: "🍈", color: "#fbbf24", healthScore: 8, calories: 34, protein: 0.8, isJunkFood: false, tags: ["hidratare", "vitamina-A"] },
  { id: "fr017", name: "Lămâie", category: "fructe", emoji: "🍋", color: "#fbbf24", healthScore: 9, calories: 29, protein: 1.1, isJunkFood: false, tags: ["vitamina-C", "detox"] },
  { id: "fr018", name: "Lime", category: "fructe", emoji: "🍋", color: "#22c55e", healthScore: 9, calories: 30, protein: 0.7, isJunkFood: false, tags: ["vitamina-C", "cocktail"] },

  // ===== ALGE & MARINE =====
  { id: "ag001", name: "Nori", category: "alge", emoji: "🌊", color: "#14b8a6", healthScore: 10, calories: 35, protein: 5.8, isJunkFood: false, tags: ["iod", "sushi", "B12"] },
  { id: "ag002", name: "Wakame", category: "alge", emoji: "🌊", color: "#14b8a6", healthScore: 10, calories: 45, protein: 3, isJunkFood: false, tags: ["iod", "calciu", "japonez"] },
  { id: "ag003", name: "Kombu", category: "alge", emoji: "🌊", color: "#14b8a6", healthScore: 10, calories: 43, protein: 1.7, isJunkFood: false, tags: ["umami", "dashi", "iod"] },
  { id: "ag004", name: "Arame", category: "alge", emoji: "🌊", color: "#14b8a6", healthScore: 9, calories: 306, protein: 7.5, isJunkFood: false, tags: ["fier", "calciu"] },
  { id: "ag005", name: "Spirulină", category: "alge", emoji: "🌊", color: "#14b8a6", healthScore: 10, calories: 290, protein: 57, isJunkFood: false, tags: ["proteine", "B12", "superfood"] },
  { id: "ag006", name: "Chlorella", category: "alge", emoji: "🌊", color: "#14b8a6", healthScore: 10, calories: 411, protein: 58, isJunkFood: false, tags: ["detox", "proteine", "superfood"] },

  // ===== CONDIMENTE =====
  { id: "co001", name: "Sare de mare", category: "condimente", emoji: "🧂", color: "#dc2626", healthScore: 5, calories: 0, protein: 0, isJunkFood: false, tags: ["minerale", "bază"] },
  { id: "co002", name: "Sare roz Himalaya", category: "condimente", emoji: "🧂", color: "#dc2626", healthScore: 6, calories: 0, protein: 0, isJunkFood: false, tags: ["minerale", "premium"] },
  { id: "co003", name: "Piper negru", category: "condimente", emoji: "🌶️", color: "#dc2626", healthScore: 8, calories: 251, protein: 10.4, isJunkFood: false, tags: ["piperine", "absorbție"] },
  { id: "co004", name: "Turmeric", category: "condimente", emoji: "🌶️", color: "#fbbf24", healthScore: 10, calories: 354, protein: 7.8, isJunkFood: false, tags: ["curcumină", "antiinflamator", "superfood"] },
  { id: "co005", name: "Curry powder", category: "condimente", emoji: "🌶️", color: "#fbbf24", healthScore: 8, calories: 325, protein: 12.7, isJunkFood: false, tags: ["amestec", "indian"] },
  { id: "co006", name: "Garam masala", category: "condimente", emoji: "🌶️", color: "#dc2626", healthScore: 8, calories: 379, protein: 15, isJunkFood: false, tags: ["indian", "aromat"] },
  { id: "co007", name: "Boia dulce", category: "condimente", emoji: "🌶️", color: "#dc2626", healthScore: 8, calories: 282, protein: 14.1, isJunkFood: false, tags: ["vitamina-A", "culoare"] },
  { id: "co008", name: "Boia afumată", category: "condimente", emoji: "🌶️", color: "#dc2626", healthScore: 8, calories: 282, protein: 14.1, isJunkFood: false, tags: ["afumat", "spaniol"] },
  { id: "co009", name: "Chimen", category: "condimente", emoji: "🌶️", color: "#dc2626", healthScore: 8, calories: 375, protein: 17.8, isJunkFood: false, tags: ["digestie", "indian"] },
  { id: "co010", name: "Coriandru semințe", category: "condimente", emoji: "🌶️", color: "#dc2626", healthScore: 8, calories: 298, protein: 12.4, isJunkFood: false, tags: ["aromat", "indian"] },
  { id: "co011", name: "Scorțișoară", category: "condimente", emoji: "🌶️", color: "#a16207", healthScore: 9, calories: 247, protein: 4, isJunkFood: false, tags: ["glicemie", "dulce"] },
  { id: "co012", name: "Ghimbir", category: "condimente", emoji: "🫚", color: "#fbbf24", healthScore: 10, calories: 80, protein: 1.8, isJunkFood: false, tags: ["digestie", "antiinflamator", "superfood"] },
  { id: "co013", name: "Semințe de muștar", category: "condimente", emoji: "🌶️", color: "#dc2626", healthScore: 8, calories: 508, protein: 26.1, isJunkFood: false, tags: ["picant", "proteine"] },
  { id: "co014", name: "Fenicul", category: "condimente", emoji: "🌶️", color: "#dc2626", healthScore: 8, calories: 345, protein: 15.8, isJunkFood: false, tags: ["digestie", "aromat"] },
  { id: "co015", name: "Anason stelat", category: "condimente", emoji: "🌶️", color: "#dc2626", healthScore: 8, calories: 337, protein: 17.6, isJunkFood: false, tags: ["asiatic", "aromat"] },
  { id: "co016", name: "Cuișoare", category: "condimente", emoji: "🌶️", color: "#dc2626", healthScore: 8, calories: 274, protein: 6, isJunkFood: false, tags: ["antibacterian", "aromat"] },

  // ===== IERBURI =====
  { id: "ie001", name: "Pătrunjel", category: "ierburi", emoji: "🌿", color: "#16a34a", healthScore: 9, calories: 36, protein: 3, isJunkFood: false, tags: ["vitamina-K", "detox"] },
  { id: "ie002", name: "Coriandru verde", category: "ierburi", emoji: "🌿", color: "#16a34a", healthScore: 9, calories: 23, protein: 2.1, isJunkFood: false, tags: ["detox", "asiatic"] },
  { id: "ie003", name: "Mărar", category: "ierburi", emoji: "🌿", color: "#16a34a", healthScore: 8, calories: 43, protein: 3.5, isJunkFood: false, tags: ["digestie", "tradițional"] },
  { id: "ie004", name: "Busuioc", category: "ierburi", emoji: "🌿", color: "#16a34a", healthScore: 9, calories: 23, protein: 3.2, isJunkFood: false, tags: ["italian", "aromat"] },
  { id: "ie005", name: "Oregano", category: "ierburi", emoji: "🌿", color: "#16a34a", healthScore: 9, calories: 265, protein: 9, isJunkFood: false, tags: ["antibacterian", "mediteranean"] },
  { id: "ie006", name: "Cimbru", category: "ierburi", emoji: "🌿", color: "#16a34a", healthScore: 9, calories: 101, protein: 5.6, isJunkFood: false, tags: ["imunitate", "aromat"] },
  { id: "ie007", name: "Rozmarin", category: "ierburi", emoji: "🌿", color: "#16a34a", healthScore: 9, calories: 131, protein: 3.3, isJunkFood: false, tags: ["memorie", "aromat"] },
  { id: "ie008", name: "Salvie", category: "ierburi", emoji: "🌿", color: "#16a34a", healthScore: 9, calories: 315, protein: 10.6, isJunkFood: false, tags: ["cognitiv", "aromat"] },
  { id: "ie009", name: "Mentă", category: "ierburi", emoji: "🌿", color: "#16a34a", healthScore: 9, calories: 70, protein: 3.8, isJunkFood: false, tags: ["digestie", "răcoritor"] },
  { id: "ie010", name: "Tarhon", category: "ierburi", emoji: "🌿", color: "#16a34a", healthScore: 8, calories: 295, protein: 22.8, isJunkFood: false, tags: ["francez", "aromat"] },
  { id: "ie011", name: "Leuștean", category: "ierburi", emoji: "🌿", color: "#16a34a", healthScore: 8, calories: 20, protein: 3.5, isJunkFood: false, tags: ["tradițional", "supe"] },

  // ===== ÎNDULCITORI =====
  { id: "in001", name: "Sirop de arțar", category: "indulcitori", emoji: "🍯", color: "#fbbf24", healthScore: 6, calories: 260, protein: 0, isJunkFood: false, tags: ["minerale", "natural"] },
  { id: "in002", name: "Sirop de agave", category: "indulcitori", emoji: "🍯", color: "#fbbf24", healthScore: 5, calories: 310, protein: 0, isJunkFood: false, tags: ["IG-scăzut"] },
  { id: "in003", name: "Sirop de curmale", category: "indulcitori", emoji: "🍯", color: "#a16207", healthScore: 7, calories: 282, protein: 2.5, isJunkFood: false, tags: ["minerale", "natural"] },
  { id: "in004", name: "Zahăr de cocos", category: "indulcitori", emoji: "🍯", color: "#a16207", healthScore: 6, calories: 375, protein: 0, isJunkFood: false, tags: ["IG-scăzut", "minerale"] },
  { id: "in005", name: "Stevia", category: "indulcitori", emoji: "🌿", color: "#22c55e", healthScore: 8, calories: 0, protein: 0, isJunkFood: false, tags: ["zero-calorii", "natural"] },
  { id: "in006", name: "Eritritol", category: "indulcitori", emoji: "🍯", color: "#f5f5f4", healthScore: 7, calories: 0, protein: 0, isJunkFood: false, tags: ["zero-calorii", "keto"] },
  { id: "in007", name: "Zahăr brun", category: "indulcitori", emoji: "🍯", color: "#a16207", healthScore: 4, calories: 380, protein: 0, isJunkFood: false, tags: ["minerale"] },
  { id: "in008", name: "Zahăr trestie nerafinat", category: "indulcitori", emoji: "🍯", color: "#a16207", healthScore: 5, calories: 387, protein: 0, isJunkFood: false, tags: ["minerale"] },

  // ===== SOSURI & DRESSINGURI =====
  { id: "so001", name: "Muștar Dijon", category: "sosuri", emoji: "🥫", color: "#dc2626", healthScore: 7, calories: 66, protein: 4.4, isJunkFood: false, tags: ["picant", "francez"] },
  { id: "so002", name: "Muștar boabe", category: "sosuri", emoji: "🥫", color: "#dc2626", healthScore: 8, calories: 66, protein: 4.4, isJunkFood: false, tags: ["textură", "gourmet"] },
  { id: "so003", name: "Ketchup natural", category: "sosuri", emoji: "🥫", color: "#dc2626", healthScore: 5, calories: 112, protein: 1.7, isJunkFood: false, tags: ["dulce", "tomate"] },
  { id: "so004", name: "Maioneză vegană", category: "sosuri", emoji: "🥫", color: "#fde047", healthScore: 3, calories: 680, protein: 0.5, isJunkFood: true, tags: ["procesat", "grăsimi"] },
  { id: "so005", name: "Pesto vegan", category: "sosuri", emoji: "🥫", color: "#22c55e", healthScore: 7, calories: 387, protein: 5, isJunkFood: false, tags: ["busuioc", "italian"] },
  { id: "so006", name: "Sos BBQ vegan", category: "sosuri", emoji: "🥫", color: "#dc2626", healthScore: 4, calories: 172, protein: 0.8, isJunkFood: true, tags: ["dulce", "afumat"] },
  { id: "so007", name: "Salsa", category: "sosuri", emoji: "🥫", color: "#ef4444", healthScore: 8, calories: 36, protein: 1.5, isJunkFood: false, tags: ["mexican", "proaspăt"] },
  { id: "so008", name: "Chimichurri", category: "sosuri", emoji: "🥫", color: "#22c55e", healthScore: 9, calories: 200, protein: 2, isJunkFood: false, tags: ["argentinian", "ierburi"] },
  { id: "so009", name: "Sos hoisin vegan", category: "sosuri", emoji: "🥫", color: "#a16207", healthScore: 5, calories: 220, protein: 3, isJunkFood: false, tags: ["asiatic", "dulce"] },
  { id: "so010", name: "Sos sriracha", category: "sosuri", emoji: "🌶️", color: "#dc2626", healthScore: 6, calories: 93, protein: 2.4, isJunkFood: false, tags: ["picant", "asiatic"] },
  { id: "so011", name: "Sos teriyaki vegan", category: "sosuri", emoji: "🥫", color: "#a16207", healthScore: 5, calories: 89, protein: 5.9, isJunkFood: false, tags: ["japonez", "dulce-sărat"] },
  { id: "so012", name: "Sos Worcestershire vegan", category: "sosuri", emoji: "🥫", color: "#a16207", healthScore: 6, calories: 78, protein: 0, isJunkFood: false, tags: ["umami", "britanic"] },
  { id: "so013", name: "Pastă de tomate", category: "sosuri", emoji: "🥫", color: "#ef4444", healthScore: 8, calories: 82, protein: 4.3, isJunkFood: false, tags: ["licopen", "bază"] },
  { id: "so014", name: "Pastă de curry", category: "sosuri", emoji: "🥫", color: "#ef4444", healthScore: 7, calories: 150, protein: 2, isJunkFood: false, tags: ["asiatic", "aromat"] },

  // ===== SUPERFOODS =====
  { id: "sf001", name: "Pudră de maca", category: "superfoods", emoji: "⭐", color: "#00d4aa", healthScore: 10, calories: 325, protein: 14.3, isJunkFood: false, tags: ["energie", "hormoni", "adaptogen"] },
  { id: "sf002", name: "Pudră de lucuma", category: "superfoods", emoji: "⭐", color: "#00d4aa", healthScore: 9, calories: 329, protein: 4, isJunkFood: false, tags: ["îndulcitor", "beta-caroten"] },
  { id: "sf003", name: "Pudră de moringa", category: "superfoods", emoji: "⭐", color: "#00d4aa", healthScore: 10, calories: 64, protein: 9.4, isJunkFood: false, tags: ["proteine", "fier", "antiinflamator"] },
  { id: "sf004", name: "Pudră de açaí", category: "superfoods", emoji: "⭐", color: "#00d4aa", healthScore: 10, calories: 534, protein: 8.1, isJunkFood: false, tags: ["antioxidanți", "energie"] },
  { id: "sf005", name: "Goji berries", category: "superfoods", emoji: "⭐", color: "#00d4aa", healthScore: 10, calories: 349, protein: 14.3, isJunkFood: false, tags: ["antioxidanți", "vitamina-C"] },
  { id: "sf006", name: "Cacao raw", category: "superfoods", emoji: "⭐", color: "#00d4aa", healthScore: 10, calories: 228, protein: 19.6, isJunkFood: false, tags: ["magneziu", "antioxidanți"] },
  { id: "sf007", name: "Fulgi drojdie inactivă", category: "superfoods", emoji: "⭐", color: "#00d4aa", healthScore: 10, calories: 325, protein: 50, isJunkFood: false, tags: ["B12", "proteine", "umami"] },
  { id: "sf008", name: "Pudră de baobab", category: "superfoods", emoji: "⭐", color: "#00d4aa", healthScore: 10, calories: 240, protein: 2.3, isJunkFood: false, tags: ["vitamina-C", "fibre"] },
  { id: "sf009", name: "Pudră de camu camu", category: "superfoods", emoji: "⭐", color: "#00d4aa", healthScore: 10, calories: 17, protein: 0.4, isJunkFood: false, tags: ["vitamina-C-maxim"] },
  { id: "sf010", name: "Matcha", category: "superfoods", emoji: "🍵", color: "#00d4aa", healthScore: 10, calories: 324, protein: 30.6, isJunkFood: false, tags: ["L-teanină", "antioxidanți", "energie"] },

  // ===== BĂUTURI =====
  { id: "ba001", name: "Ceai verde", category: "bauturi", emoji: "🍵", color: "#3b82f6", healthScore: 10, calories: 1, protein: 0, isJunkFood: false, tags: ["antioxidanți", "L-teanină"] },
  { id: "ba002", name: "Ceai negru", category: "bauturi", emoji: "🍵", color: "#3b82f6", healthScore: 8, calories: 1, protein: 0, isJunkFood: false, tags: ["energie", "teanină"] },
  { id: "ba003", name: "Ceai rooibos", category: "bauturi", emoji: "🍵", color: "#3b82f6", healthScore: 9, calories: 1, protein: 0, isJunkFood: false, tags: ["fără-cofeină", "antioxidanți"] },
  { id: "ba004", name: "Ceai de mușețel", category: "bauturi", emoji: "🍵", color: "#3b82f6", healthScore: 9, calories: 1, protein: 0, isJunkFood: false, tags: ["relaxare", "somn"] },
  { id: "ba005", name: "Ceai de ghimbir", category: "bauturi", emoji: "🍵", color: "#3b82f6", healthScore: 10, calories: 1, protein: 0, isJunkFood: false, tags: ["digestie", "imunitate"] },
  { id: "ba006", name: "Cafea", category: "bauturi", emoji: "☕", color: "#3b82f6", healthScore: 7, calories: 2, protein: 0.3, isJunkFood: false, tags: ["energie", "antioxidanți"] },
  { id: "ba007", name: "Pudră proteică vegană", category: "bauturi", emoji: "💪", color: "#3b82f6", healthScore: 8, calories: 120, protein: 24, isJunkFood: false, tags: ["proteine", "sport"] },
  { id: "ba008", name: "Kombucha", category: "bauturi", emoji: "🍵", color: "#3b82f6", healthScore: 8, calories: 30, protein: 0, isJunkFood: false, tags: ["probiotice", "fermentat"] },

  // ===== SUPLIMENTE =====
  { id: "su001", name: "Vitamina B12", category: "suplimente", emoji: "💊", color: "#a855f7", healthScore: 10, calories: 0, protein: 0, isJunkFood: false, tags: ["esențial", "energie", "nervi"] },
  { id: "su002", name: "Vitamina D3 vegană", category: "suplimente", emoji: "💊", color: "#a855f7", healthScore: 10, calories: 0, protein: 0, isJunkFood: false, tags: ["oase", "imunitate"] },
  { id: "su003", name: "Omega-3 din alge", category: "suplimente", emoji: "💊", color: "#a855f7", healthScore: 10, calories: 0, protein: 0, isJunkFood: false, tags: ["creier", "inimă", "DHA-EPA"] },
  { id: "su004", name: "Fier", category: "suplimente", emoji: "💊", color: "#a855f7", healthScore: 8, calories: 0, protein: 0, isJunkFood: false, tags: ["energie", "sânge"] },
  { id: "su005", name: "Zinc", category: "suplimente", emoji: "💊", color: "#a855f7", healthScore: 9, calories: 0, protein: 0, isJunkFood: false, tags: ["imunitate", "piele"] },
  { id: "su006", name: "Magneziu", category: "suplimente", emoji: "💊", color: "#a855f7", healthScore: 9, calories: 0, protein: 0, isJunkFood: false, tags: ["mușchi", "somn", "stres"] },
  { id: "su007", name: "Iod", category: "suplimente", emoji: "💊", color: "#a855f7", healthScore: 9, calories: 0, protein: 0, isJunkFood: false, tags: ["tiroidă", "metabolism"] },
  { id: "su008", name: "Probiotice vegane", category: "suplimente", emoji: "💊", color: "#a855f7", healthScore: 10, calories: 0, protein: 0, isJunkFood: false, tags: ["digestie", "imunitate"] },
  { id: "su009", name: "Ashwagandha", category: "suplimente", emoji: "💊", color: "#a855f7", healthScore: 9, calories: 0, protein: 0, isJunkFood: false, tags: ["adaptogen", "stres", "energie"] },
  { id: "su010", name: "Rhodiola", category: "suplimente", emoji: "💊", color: "#a855f7", healthScore: 9, calories: 0, protein: 0, isJunkFood: false, tags: ["adaptogen", "performanță"] },
  { id: "su011", name: "Creatină", category: "suplimente", emoji: "💊", color: "#a855f7", healthScore: 8, calories: 0, protein: 0, isJunkFood: false, tags: ["sport", "mușchi", "creier"] },

  // ===== JUNK FOOD VEGAN =====
  { id: "jf001", name: "Chips-uri vegane", category: "junk-vegan", emoji: "⚠️", color: "#ef4444", healthScore: 2, calories: 536, protein: 6, isJunkFood: true, tags: ["procesat", "sare", "grăsimi"] },
  { id: "jf002", name: "Înghețată vegană", category: "junk-vegan", emoji: "⚠️", color: "#ef4444", healthScore: 3, calories: 200, protein: 2, isJunkFood: true, tags: ["zahăr", "procesat"] },
  { id: "jf003", name: "Brânză vegană procesată", category: "junk-vegan", emoji: "⚠️", color: "#ef4444", healthScore: 3, calories: 313, protein: 3, isJunkFood: true, tags: ["procesat", "aditivi"] },
  { id: "jf004", name: "Cârnați vegani", category: "junk-vegan", emoji: "⚠️", color: "#ef4444", healthScore: 3, calories: 280, protein: 18, isJunkFood: true, tags: ["procesat", "sodiu"] },
  { id: "jf005", name: "Nuggets vegani", category: "junk-vegan", emoji: "⚠️", color: "#ef4444", healthScore: 3, calories: 250, protein: 14, isJunkFood: true, tags: ["procesat", "prăjit"] },
  { id: "jf006", name: "Pizza vegană congelată", category: "junk-vegan", emoji: "⚠️", color: "#ef4444", healthScore: 3, calories: 240, protein: 8, isJunkFood: true, tags: ["procesat", "sodiu"] },
  { id: "jf007", name: "Biscuiți vegani", category: "junk-vegan", emoji: "⚠️", color: "#ef4444", healthScore: 2, calories: 480, protein: 5, isJunkFood: true, tags: ["zahăr", "procesat"] },
  { id: "jf008", name: "Ciocolată vegană cu zahăr", category: "junk-vegan", emoji: "⚠️", color: "#ef4444", healthScore: 4, calories: 535, protein: 5, isJunkFood: true, tags: ["zahăr", "procesat"] },
  { id: "jf009", name: "Băuturi energizante vegane", category: "junk-vegan", emoji: "⚠️", color: "#ef4444", healthScore: 1, calories: 45, protein: 0, isJunkFood: true, tags: ["zahăr", "cofeină", "aditivi"] },
  { id: "jf010", name: "Bacon vegan", category: "junk-vegan", emoji: "⚠️", color: "#ef4444", healthScore: 2, calories: 300, protein: 10, isJunkFood: true, tags: ["procesat", "sodiu", "aditivi"] },
  { id: "jf011", name: "Burgeri vegani", category: "junk-vegan", emoji: "⚠️", color: "#ef4444", healthScore: 4, calories: 250, protein: 19, isJunkFood: true, tags: ["procesat", "rapid"] },
];

// Helper functions
export function getIngredientsByCategory(categoryId: string): Ingredient[] {
  return ingredients.filter(i => i.category === categoryId);
}

export function searchIngredients(query: string): Ingredient[] {
  const q = query.toLowerCase();
  return ingredients.filter(i => 
    i.name.toLowerCase().includes(q) ||
    i.tags.some(t => t.toLowerCase().includes(q)) ||
    i.category.toLowerCase().includes(q)
  );
}

export function getIngredientsByTag(tag: string): Ingredient[] {
  return ingredients.filter(i => i.tags.includes(tag));
}

export function getSuperfoods(): Ingredient[] {
  return ingredients.filter(i => i.healthScore >= 9 && !i.isJunkFood);
}

export function getJunkFood(): Ingredient[] {
  return ingredients.filter(i => i.isJunkFood);
}

export function getHighProtein(minProtein: number = 15): Ingredient[] {
  return ingredients.filter(i => i.protein >= minProtein && !i.isJunkFood);
}

export function getLowCalorie(maxCalories: number = 50): Ingredient[] {
  return ingredients.filter(i => i.calories <= maxCalories);
}

export const allTags = Array.from(new Set(ingredients.flatMap(i => i.tags))).sort();
