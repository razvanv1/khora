import type { Translations } from "./ro";

export const en: Translations = {
  // Common
  common: {
    loading: "Loading...",
    error: "Error",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    add: "Add",
    search: "Search",
    filter: "Filter",
    all: "All",
    none: "None",
    yes: "Yes",
    no: "No",
    back: "Back",
    next: "Next",
    previous: "Previous",
    close: "Close",
    submit: "Submit",
    reset: "Reset",
  },

  // Navigation
  nav: {
    home: "Home",
    pantry: "Pantry",
    recipes: "Recipes",
    blender: "Generator",
    hydrate: "Hydration",
    supplements: "Supplements",
    blog: "Blog",
    profile: "Profile",
    contact: "Contact",
    favorites: "Favorites",
  },

  // Landing Page
  landing: {
    title: "KHORA",
    subtitle: "Premium Vegan Nutrition App",
    tagline: "Unlearn what you thought about vegan nutrition.",
    taglineHighlight: "Learn what truly matters.",
    ctaStart: "Get Started",
    ctaArticles: "Read Articles",
    discoverStory: "Discover the story",
    scrollDown: "Scroll down",
    philosophy: "Philosophy",
    whatIsKhora: "What is Khora?",
    khoraDescription1: "is a concept from ancient Greek philosophy, introduced by Plato. It means",
    khoraDescription2: "the space that provides a place for being",
    khoraDescription3: "- a receptacle of transformation, the place where becoming happens.",
    khoraDescription4: "For us, Khora is the space where you transform through conscious eating. You don't just eat -",
    khoraDescription5: "you become",
    unlearning: "Unlearning",
    veganNotHealthy: "Vegan ≠ Healthy",
    biggestLie: "The biggest lie of the food industry: that anything \"plant-based\" is automatically good for you.",
    myth1: "If it's vegan, it's healthy",
    truth1: "Vegan chips have the same empty calories as regular ones. Plant-based mayo is 80% refined oil. Vegan sausages are ultra-processed.",
    myth2: "Natural means safe in any quantity",
    truth2: "Nuts are healthy, but 100g = 650 calories. Dried fruits are concentrated sugar. Quantities matter, regardless of source.",
    myth3: "A vegan diet is nutritionally complete",
    truth3: "Without supplementation, you risk deficiencies in B12 (100% mandatory), vitamin D, iron (+80% needed), zinc (+50% needed), omega-3 DHA/EPA.",
    whatWeTeach: "What we teach in Khora",
    features: "Features",
    faq: "Frequently Asked Questions",
    readyToStart: "Ready to start?",
    joinCommunity: "Join the community of vegans learning to eat consciously.",
    startFree: "Start Free",
  },

  // Home Page
  home: {
    title: "Khora - Premium Vegan Nutrition",
    subtitle: "Holistic Vegan Nutrition",
    welcome: "Welcome",
    heroTitle: "Your Digital Pantry for Vegan Recipes",
    heroDescription: "Transform your kitchen into a spatial computing experience. Discover recipes created from your ingredients.",
    features: {
      pantry: {
        title: "Digital Pantry",
        description: "Your ingredients organized like a constellation",
      },
      recipes: {
        title: "Recipe Generator",
        description: "Combine ingredients, discover recipes",
      },
      hydrate: {
        title: "Hydration",
        description: "Liquid tracking with personalized recommendations",
      },
      supplements: {
        title: "Supplements",
        description: "Manage your vitamins and minerals",
      },
    },
    blog: {
      title: "Nutrition Blog",
      description: "Educational vegan articles",
    },
    profile: {
      title: "My Profile",
      description: "Settings and personalization",
    },
  },

  // Pantry
  pantry: {
    title: "Digital Pantry",
    subtitle: "Your ingredients organized like a constellation",
    searchPlaceholder: "Search ingredients...",
    categories: "Categories",
    allCategories: "All categories",
    filters: {
      title: "Advanced Filters",
      healthScore: "Health Score",
      minProtein: "Min Protein (g)",
      maxCalories: "Max Calories",
      superfoods: "Superfoods Only",
      apply: "Apply Filters",
      reset: "Reset",
    },
    ingredient: {
      calories: "Calories",
      protein: "Protein",
      carbs: "Carbs",
      fat: "Fat",
      fiber: "Fiber",
      healthScore: "Health Score",
    },
    empty: "No ingredients found",
    addToPantry: "Add to pantry",
    removeFromPantry: "Remove from pantry",
  },

  // Recipes
  recipes: {
    title: "Vegan Recipes",
    subtitle: "Discover delicious and healthy recipes",
    searchPlaceholder: "Search recipes...",
    favorites: "Favorites",
    allRecipes: "All Recipes",
    noFavorites: "No favorite recipes yet",
    noFavoritesDescription: "Add recipes to favorites by clicking the heart icon",
    addToFavorites: "Add to favorites",
    removeFromFavorites: "Remove from favorites",
    viewRecipe: "View recipe",
    ingredients: "Ingredients",
    instructions: "Instructions",
    nutrition: "Nutritional Information",
    prepTime: "Prep time",
    cookTime: "Cook time",
    servings: "Servings",
    difficulty: {
      easy: "Easy",
      medium: "Medium",
      hard: "Hard",
    },
  },

  // Hydration
  hydrate: {
    title: "Hydration",
    subtitle: "Monitor your liquid intake",
    dailyGoal: "Daily goal",
    consumed: "Consumed",
    remaining: "Remaining",
    addWater: "Add water",
    addTea: "Add tea",
    addJuice: "Add juice",
    history: "History",
    streak: "Day streak",
    tips: {
      title: "Hydration tips",
      tip1: "Drink a glass of water in the morning",
      tip2: "Carry a water bottle with you",
      tip3: "Set regular reminders",
    },
  },

  // Supplements
  supplements: {
    title: "Supplements",
    subtitle: "Manage your vitamins and minerals",
    essential: "Essential for vegans",
    b12: {
      title: "Vitamin B12",
      description: "Essential for the nervous system",
    },
    d3: {
      title: "Vitamin D3",
      description: "For bones and immunity",
    },
    omega3: {
      title: "Omega-3 (DHA/EPA)",
      description: "For brain and heart",
    },
    iron: {
      title: "Iron",
      description: "For energy and oxygenation",
    },
    taken: "Taken",
    notTaken: "Not taken",
    markAsTaken: "Mark as taken",
    schedule: "Schedule",
    reminder: "Reminder",
  },

  // Blog
  blog: {
    title: "Vegan Nutrition Blog",
    subtitle: "Educational articles for a healthy life",
    readMore: "Read more",
    readTime: "min read",
    categories: "Categories",
    recentPosts: "Recent Posts",
    relatedPosts: "Related Posts",
    share: "Share",
    author: "Author",
    publishedOn: "Published on",
  },

  // Profile
  profile: {
    title: "My Profile",
    personalInfo: "Personal Information",
    name: "Name",
    email: "Email",
    age: "Age",
    gender: "Gender",
    weight: "Weight",
    height: "Height",
    activityLevel: "Activity level",
    goal: "Goal",
    dietaryStyle: "Dietary style",
    preferences: "Preferences",
    notifications: "Notifications",
    language: "Language",
    theme: "Theme",
    logout: "Logout",
    deleteAccount: "Delete account",
  },

  // Contact
  contact: {
    title: "Contact",
    subtitle: "We're here to help",
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send message",
    success: "Message sent successfully!",
    error: "An error occurred. Please try again.",
    founder: {
      title: "Founder",
      description: "Entrepreneur in behavior change and unlearning, certified trainer and certified yoga instructor.",
    },
  },

  // Onboarding
  onboarding: {
    welcome: "Welcome to Khora!",
    step1: {
      title: "About you",
      description: "Tell us a few things about yourself",
    },
    step2: {
      title: "Your goals",
      description: "What do you want to achieve?",
    },
    step3: {
      title: "Dietary preferences",
      description: "Personalize your experience",
    },
    finish: "Finish",
    skip: "Skip",
  },

  // Footer
  footer: {
    rights: "All rights reserved",
    privacy: "Privacy Policy",
    terms: "Terms and Conditions",
    cookies: "Cookie Policy",
    gdpr: "GDPR",
    madeWith: "Made with",
    by: "by",
  },

  // Errors
  errors: {
    notFound: "Page not found",
    serverError: "Server error",
    networkError: "Network error",
    unauthorized: "Unauthorized",
    forbidden: "Access forbidden",
  },
};
