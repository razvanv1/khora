/*
 * KHORA Recipes Data
 * Centralized recipe data for reuse across components
 */

export interface Recipe {
  id: string;
  name: string;
  description: string;
  image: string;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  displayTime: string;
  calories: number;
  servings: number;
  category: string;
  cuisine: string;
  tags: string[];
  ingredients: string[];
  instructions: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
}

export const recipes: Recipe[] = [
  {
    id: "1",
    name: "Golden Buddha Bowl",
    description: "Un Buddha Bowl nutritiv cu tofu auriu, quinoa, legume proaspete și dressing tahini. Perfect pentru un prânz sățios și sănătos.",
    image: "/images/khora_recipe_card.png",
    prepTime: "PT15M",
    cookTime: "PT10M",
    totalTime: "PT25M",
    displayTime: "25 min",
    calories: 450,
    servings: 2,
    category: "Main Course",
    cuisine: "Asian Fusion",
    tags: ["High Protein", "Gluten Free"],
    ingredients: [
      "200g tofu extra-firm",
      "150g quinoa",
      "100g edamame",
      "1 avocado",
      "100g varză roșie",
      "2 morcovi",
      "2 linguri tahini",
      "1 lingură sos de soia",
      "1 lingură ulei de susan"
    ],
    instructions: [
      "Fierbe quinoa conform instrucțiunilor de pe ambalaj.",
      "Taie tofu în cuburi și prăjește-l în ulei de susan până devine auriu.",
      "Pregătește legumele: taie varza în fâșii subțiri, morcovii în julienne.",
      "Prepară dressingul amestecând tahini cu sos de soia și puțină apă.",
      "Asamblează bolul: quinoa la bază, apoi tofu, legume și edamame.",
      "Topping cu avocado feliat și dressing tahini."
    ],
    nutrition: {
      calories: 450,
      protein: 22,
      carbs: 45,
      fat: 18,
      fiber: 12
    }
  },
  {
    id: "2",
    name: "Green Power Smoothie",
    description: "Smoothie energizant cu spanac, banană, avocado și lapte de migdale. Ideal pentru micul dejun sau ca snack post-antrenament.",
    image: "/images/khora_home_pantry.png",
    prepTime: "PT5M",
    cookTime: "PT0M",
    totalTime: "PT5M",
    displayTime: "5 min",
    calories: 280,
    servings: 1,
    category: "Beverage",
    cuisine: "International",
    tags: ["Quick", "Detox"],
    ingredients: [
      "2 căni spanac proaspăt",
      "1 banană congelată",
      "1/2 avocado",
      "250ml lapte de migdale",
      "1 lingură semințe de chia",
      "1 linguriță miere de agave",
      "Câteva cuburi de gheață"
    ],
    instructions: [
      "Pune toate ingredientele în blender.",
      "Mixează la viteză mare timp de 60 secunde.",
      "Ajustează consistența cu mai mult lapte dacă e necesar.",
      "Servește imediat pentru prospețime maximă."
    ],
    nutrition: {
      calories: 280,
      protein: 8,
      carbs: 35,
      fat: 14,
      fiber: 10
    }
  },
  {
    id: "3",
    name: "Mediterranean Quinoa Salad",
    description: "Salată mediteraneană cu quinoa, roșii cherry, castraveți, măsline și dressing de lămâie. Perfectă pentru vară.",
    image: "/images/khora_digital_blender.png",
    prepTime: "PT15M",
    cookTime: "PT15M",
    totalTime: "PT30M",
    displayTime: "30 min",
    calories: 520,
    servings: 4,
    category: "Salad",
    cuisine: "Mediterranean",
    tags: ["Mediterranean", "Fiber Rich"],
    ingredients: [
      "200g quinoa",
      "200g roșii cherry",
      "1 castravete mare",
      "100g măsline Kalamata",
      "1 ceapă roșie",
      "50g pătrunjel proaspăt",
      "3 linguri ulei de măsline extravirgin",
      "Zeama de la 1 lămâie",
      "Sare și piper după gust"
    ],
    instructions: [
      "Fierbe quinoa în apă cu sare, apoi lasă să se răcească.",
      "Taie roșiile cherry în jumătăți, castravetele în cuburi.",
      "Feliază ceapa roșie subțire și tocă pătrunjelul.",
      "Amestecă toate legumele cu quinoa răcită.",
      "Prepară dressingul din ulei, zeamă de lămâie, sare și piper.",
      "Toarnă dressingul peste salată și amestecă bine.",
      "Lasă să se odihnească 10 minute înainte de servire."
    ],
    nutrition: {
      calories: 520,
      protein: 15,
      carbs: 58,
      fat: 24,
      fiber: 9
    }
  },
  {
    id: "4",
    name: "Creamy Mushroom Risotto",
    description: "Risotto cremos cu ciuperci shiitake și parmezan vegan. Un fel principal elegant și satisfăcător.",
    image: "/images/khora_recipe_card.png",
    prepTime: "PT10M",
    cookTime: "PT35M",
    totalTime: "PT45M",
    displayTime: "45 min",
    calories: 480,
    servings: 3,
    category: "Main Course",
    cuisine: "Italian",
    tags: ["Comfort Food", "Italian"],
    ingredients: [
      "300g orez arborio",
      "200g ciuperci shiitake",
      "100g ciuperci champignon",
      "1 ceapă",
      "3 căței de usturoi",
      "150ml vin alb sec",
      "1L supă de legume",
      "50g parmezan vegan",
      "2 linguri ulei de măsline"
    ],
    instructions: [
      "Încălzește supa de legume și menține-o caldă.",
      "Călește ceapa și usturoiul în ulei de măsline.",
      "Adaugă ciupercile și gătește până se înmoaie.",
      "Adaugă orezul și prăjește 2 minute.",
      "Toarnă vinul și amestecă până se absoarbe.",
      "Adaugă supa treptat, câte un polonic, amestecând constant.",
      "La final, adaugă parmezanul vegan și amestecă."
    ],
    nutrition: {
      calories: 480,
      protein: 12,
      carbs: 65,
      fat: 16,
      fiber: 4
    }
  },
  {
    id: "5",
    name: "Spicy Thai Peanut Noodles",
    description: "Tăiței cu sos cremos de arahide și legume crocante. Gata în 20 de minute!",
    image: "/images/khora_home_pantry.png",
    prepTime: "PT10M",
    cookTime: "PT10M",
    totalTime: "PT20M",
    displayTime: "20 min",
    calories: 520,
    servings: 2,
    category: "Main Course",
    cuisine: "Thai",
    tags: ["Quick", "Spicy", "Asian"],
    ingredients: [
      "200g tăiței de orez",
      "100g unt de arahide",
      "2 linguri sos de soia",
      "1 lingură ulei de susan",
      "1 ardei gras roșu",
      "100g edamame",
      "2 cepe verzi",
      "1 morcov",
      "Semințe de susan pentru servire"
    ],
    instructions: [
      "Fierbe tăițeii conform instrucțiunilor.",
      "Prepară sosul: amestecă untul de arahide, sosul de soia și uleiul de susan.",
      "Taie legumele în fâșii subțiri.",
      "Scurge tăițeii și amestecă-i cu sosul.",
      "Adaugă legumele și edamame.",
      "Servește cu semințe de susan deasupra."
    ],
    nutrition: {
      calories: 520,
      protein: 18,
      carbs: 55,
      fat: 26,
      fiber: 6
    }
  },
  {
    id: "6",
    name: "Chocolate Avocado Mousse",
    description: "Desert cremos și sănătos cu avocado și cacao. Fără zahăr rafinat, bogat în grăsimi sănătoase.",
    image: "/images/khora_digital_blender.png",
    prepTime: "PT10M",
    cookTime: "PT0M",
    totalTime: "PT10M",
    displayTime: "10 min",
    calories: 220,
    servings: 4,
    category: "Dessert",
    cuisine: "International",
    tags: ["No Sugar", "Healthy Dessert"],
    ingredients: [
      "2 avocado coapte",
      "4 linguri cacao pudră",
      "4 linguri sirop de arțar",
      "1 linguriță extract de vanilie",
      "Un praf de sare",
      "Fructe de pădure pentru servire"
    ],
    instructions: [
      "Curăță avocado și pune pulpa în blender.",
      "Adaugă cacao, siropul de arțar, vanilia și sarea.",
      "Mixează până obții o cremă fină.",
      "Împarte în 4 boluri și refrigerează 30 minute.",
      "Servește cu fructe de pădure deasupra."
    ],
    nutrition: {
      calories: 220,
      protein: 3,
      carbs: 22,
      fat: 15,
      fiber: 8
    }
  }
];

// Get recipe by ID
export function getRecipeById(id: string): Recipe | undefined {
  return recipes.find(r => r.id === id);
}

// Get recipes by IDs
export function getRecipesByIds(ids: string[]): Recipe[] {
  return recipes.filter(r => ids.includes(r.id));
}

// Get recipes by category
export function getRecipesByCategory(category: string): Recipe[] {
  return recipes.filter(r => r.category === category);
}

// Get recipes by tag
export function getRecipesByTag(tag: string): Recipe[] {
  return recipes.filter(r => r.tags.includes(tag));
}

// Get all unique categories
export function getAllCategories(): string[] {
  return Array.from(new Set(recipes.map(r => r.category)));
}

// Get all unique tags
export function getAllTags(): string[] {
  return Array.from(new Set(recipes.flatMap(r => r.tags)));
}
