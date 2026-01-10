/*
 * KHORA Recipes Page
 * Design: Cosmic Nebula Interface - Recipe cards gallery
 * Includes Schema.org structured data for recipes (SEO)
 */

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Flame, Heart, ChefHat, Users } from "lucide-react";
import { Link } from "wouter";
import CosmicBackground from "@/components/CosmicBackground";
import Navigation from "@/components/Navigation";

// Recipe data with full schema.org compatible fields
const recipes = [
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
    saved: true,
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
    saved: false,
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
    saved: true,
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
];

// Generate Schema.org Recipe structured data
function generateRecipeSchema(recipe: typeof recipes[0]) {
  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    "name": recipe.name,
    "description": recipe.description,
    "image": recipe.image,
    "author": {
      "@type": "Organization",
      "name": "Khora - Nutriție Vegană"
    },
    "datePublished": "2025-01-01",
    "prepTime": recipe.prepTime,
    "cookTime": recipe.cookTime,
    "totalTime": recipe.totalTime,
    "recipeYield": `${recipe.servings} porții`,
    "recipeCategory": recipe.category,
    "recipeCuisine": recipe.cuisine,
    "keywords": recipe.tags.join(", "),
    "recipeIngredient": recipe.ingredients,
    "recipeInstructions": recipe.instructions.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "text": step
    })),
    "nutrition": {
      "@type": "NutritionInformation",
      "calories": `${recipe.nutrition.calories} kcal`,
      "proteinContent": `${recipe.nutrition.protein}g`,
      "carbohydrateContent": `${recipe.nutrition.carbs}g`,
      "fatContent": `${recipe.nutrition.fat}g`,
      "fiberContent": `${recipe.nutrition.fiber}g`
    },
    "suitableForDiet": "https://schema.org/VeganDiet"
  };
}

// Generate ItemList schema for recipe collection
function generateRecipeListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Rețete Vegane Khora",
    "description": "Colecție de rețete vegane sănătoase și delicioase",
    "numberOfItems": recipes.length,
    "itemListElement": recipes.map((recipe, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Recipe",
        "name": recipe.name,
        "url": `https://khora.app/recipes/${recipe.id}`
      }
    }))
  };
}

export default function Recipes() {
  // Inject Schema.org structured data
  useEffect(() => {
    // Remove existing schema scripts
    const existingSchemas = document.querySelectorAll('script[data-schema="recipes"]');
    existingSchemas.forEach(el => el.remove());

    // Add ItemList schema for the collection
    const listSchema = document.createElement('script');
    listSchema.type = 'application/ld+json';
    listSchema.setAttribute('data-schema', 'recipes');
    listSchema.textContent = JSON.stringify(generateRecipeListSchema());
    document.head.appendChild(listSchema);

    // Add individual Recipe schemas
    recipes.forEach(recipe => {
      const recipeSchema = document.createElement('script');
      recipeSchema.type = 'application/ld+json';
      recipeSchema.setAttribute('data-schema', 'recipes');
      recipeSchema.textContent = JSON.stringify(generateRecipeSchema(recipe));
      document.head.appendChild(recipeSchema);
    });

    // Update page title
    document.title = "Rețete Vegane | Khora";

    // Cleanup on unmount
    return () => {
      const schemas = document.querySelectorAll('script[data-schema="recipes"]');
      schemas.forEach(el => el.remove());
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <CosmicBackground />
      
      <main className="relative z-10 min-h-screen pb-44">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-8 px-6"
        >
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Rețete Vegane
          </h1>
          <p className="text-white/50 text-sm">Descoperiri culinare sănătoase</p>
        </motion.header>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="px-6 py-8"
        >
          {recipes.length > 0 ? (
            <div className="grid gap-4">
              {recipes.map((recipe, index) => (
                <motion.article
                  key={recipe.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="rounded-2xl overflow-hidden cursor-pointer"
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                  itemScope
                  itemType="https://schema.org/Recipe"
                >
                  <meta itemProp="name" content={recipe.name} />
                  <meta itemProp="description" content={recipe.description} />
                  <meta itemProp="totalTime" content={recipe.totalTime} />
                  
                  <div 
                    className="h-40 bg-cover bg-center relative"
                    style={{ 
                      backgroundImage: `url(${recipe.image})`,
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    }}
                  >
                    <img 
                      itemProp="image" 
                      src={recipe.image} 
                      alt={recipe.name}
                      className="hidden"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <button className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center bg-black/30 backdrop-blur-sm">
                      <Heart 
                        className={`w-4 h-4 ${recipe.saved ? 'fill-red-500 text-red-500' : 'text-white'}`} 
                      />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-semibold text-lg" itemProp="name">{recipe.name}</h3>
                    <p className="text-white/40 text-sm mt-1 line-clamp-2" itemProp="description">
                      {recipe.description}
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-white/50 text-sm">
                      <span className="flex items-center gap-1" itemProp="totalTime" content={recipe.totalTime}>
                        <Clock className="w-4 h-4" />
                        {recipe.displayTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-4 h-4" />
                        <span itemProp="nutrition" itemScope itemType="https://schema.org/NutritionInformation">
                          <span itemProp="calories">{recipe.calories} cal</span>
                        </span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span itemProp="recipeYield">{recipe.servings} porții</span>
                      </span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      {recipe.tags.map(tag => (
                        <span 
                          key={tag}
                          className="text-xs px-2 py-1 rounded-full"
                          style={{
                            background: 'rgba(0, 212, 170, 0.15)',
                            color: '#00d4aa',
                          }}
                          itemProp="keywords"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <ChefHat className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <h3 className="text-white/60 text-lg mb-2">Încă nu ai rețete</h3>
              <p className="text-white/40 text-sm mb-6">Începe prin a adăuga ingrediente în cămară</p>
              <Link href="/blender">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-6 py-3 rounded-xl font-medium"
                  style={{
                    background: 'linear-gradient(135deg, #00d4aa 0%, #00a388 100%)',
                    color: '#0a0f1a',
                  }}
                >
                  Creează Prima Rețetă
                </motion.button>
              </Link>
            </div>
          )}
        </motion.section>
      </main>

      <Navigation />
    </div>
  );
}
