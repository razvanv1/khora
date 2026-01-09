/*
 * KHORA User Profile Hook
 * Manages user data, calculations, and localStorage persistence
 * Complete scientific formulas for vegan nutrition
 */

import { useState, useEffect, useCallback } from 'react';

// Dietary style options
export const dietaryStyles = [
  { id: 'standard-vegan', label: 'Vegan Standard', description: 'Alimentație vegană echilibrată' },
  { id: 'raw-vegan', label: 'Raw Vegan', description: 'Alimente crude, neprocesate termic' },
  { id: 'high-protein', label: 'High Protein Vegan', description: 'Focus pe proteine vegetale' },
  { id: 'low-carb', label: 'Low Carb Vegan', description: 'Carbohidrați reduși' },
  { id: 'whole-food', label: 'Whole Food Plant-Based', description: 'Alimente integrale, nerafinate' },
  { id: 'gluten-free', label: 'Gluten-Free Vegan', description: 'Fără gluten' },
  { id: 'soy-free', label: 'Soy-Free Vegan', description: 'Fără soia' },
  { id: 'nut-free', label: 'Nut-Free Vegan', description: 'Fără nuci' },
];

// Meal type preferences
export const mealTypeOptions = {
  breakfast: [
    { id: 'smoothie', label: 'Smoothie' },
    { id: 'porridge', label: 'Porridge / Terci' },
    { id: 'toast', label: 'Toast / Pâine' },
    { id: 'fruits', label: 'Fructe proaspete' },
    { id: 'pancakes', label: 'Clătite vegane' },
    { id: 'granola', label: 'Granola cu lapte vegetal' },
  ],
  lunch: [
    { id: 'salad', label: 'Salată' },
    { id: 'soup', label: 'Supă / Ciorbă' },
    { id: 'sandwich', label: 'Sandwich / Wrap' },
    { id: 'bowl', label: 'Buddha Bowl' },
    { id: 'pasta', label: 'Paste' },
    { id: 'stir-fry', label: 'Stir-fry / Wok' },
  ],
  dinner: [
    { id: 'cooked-warm', label: 'Gătit cald' },
    { id: 'salad', label: 'Salată' },
    { id: 'soup', label: 'Supă ușoară' },
    { id: 'raw', label: 'Raw / Crude' },
    { id: 'curry', label: 'Curry / Tocăniță' },
    { id: 'roasted', label: 'Legume la cuptor' },
  ],
  snacks: [
    { id: 'fruits', label: 'Fructe' },
    { id: 'nuts', label: 'Nuci și semințe' },
    { id: 'dried-fruits', label: 'Fructe uscate' },
    { id: 'bars', label: 'Batoane energetice' },
    { id: 'hummus', label: 'Hummus cu legume' },
    { id: 'smoothie', label: 'Smoothie' },
  ],
};

// Cooking style preferences
export const cookingStyles = [
  { id: 'smoothie', label: 'Smoothie', icon: '🥤' },
  { id: 'soup', label: 'Supă', icon: '🍲' },
  { id: 'salad', label: 'Salată', icon: '🥗' },
  { id: 'sandwich', label: 'Sandwich', icon: '🥪' },
  { id: 'bowl', label: 'Bowl', icon: '🍜' },
  { id: 'baked', label: 'La cuptor', icon: '🫕' },
  { id: 'fried', label: 'Prăjit', icon: '🍳' },
  { id: 'raw', label: 'Raw', icon: '🥬' },
  { id: 'boiled', label: 'Fiert', icon: '♨️' },
  { id: 'steamed', label: 'La abur', icon: '💨' },
];

export interface MealPreferences {
  breakfast: string[];
  lunch: string[];
  dinner: string[];
  snacks: string[];
}

export interface UserProfile {
  email: string;
  name: string;
  sex: 'male' | 'female';
  age: number;
  weight: number; // kg
  height: number; // cm
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'athlete';
  goal: 'lose' | 'maintain' | 'gain';
  dietaryStyle: string;
  mealPreferences: MealPreferences;
  cookingStyles: string[];
  allergies: string[];
  onboardingCompleted: boolean;
  createdAt: string;
}

export interface CalculatedMetrics {
  // Body composition
  bmi: number;
  bmiCategory: string;
  idealWeightMin: number; // Devine formula
  idealWeightMax: number;
  bodyFatEstimate: number; // US Navy formula approximation
  
  // Energy
  bmr: number; // Basal Metabolic Rate (Mifflin-St Jeor)
  rmr: number; // Resting Metabolic Rate
  tdee: number; // Total Daily Energy Expenditure
  targetCalories: number;
  
  // Macronutrients
  proteinGrams: number;
  proteinCalories: number;
  carbsGrams: number;
  carbsCalories: number;
  fatGrams: number;
  fatCalories: number;
  fiberGrams: number;
  
  // Hydration
  dailyWaterMl: number;
  waterPerKg: number;
  
  // Vegan-specific micronutrients (RDA)
  vitaminB12Mcg: number;
  vitaminDIU: number;
  omega3Mg: number;
  ironMg: number;
  calciumMg: number;
  zincMg: number;
  iodMcg: number;
  seleniumMcg: number;
  
  // Limits
  sodiumMaxMg: number;
  addedSugarMaxG: number;
  
  // Ratios
  omega6to3Ratio: string;
}

const STORAGE_KEY = 'khora_user_profile';

// Activity level multipliers for TDEE calculation
const activityMultipliers = {
  sedentary: 1.2,      // Little or no exercise
  light: 1.375,        // Light exercise 1-3 days/week
  moderate: 1.55,      // Moderate exercise 3-5 days/week
  active: 1.725,       // Hard exercise 6-7 days/week
  athlete: 1.9,        // Very hard exercise, physical job
};

// Goal calorie adjustments
const goalAdjustments = {
  lose: -500,    // 500 kcal deficit for ~0.5kg/week loss
  maintain: 0,
  gain: 300,     // 300 kcal surplus for lean gain
};

export function calculateMetrics(profile: UserProfile): CalculatedMetrics {
  const { sex, age, weight, height, activityLevel, goal, dietaryStyle } = profile;

  // ==================== BODY COMPOSITION ====================
  
  // BMI Calculation
  const heightM = height / 100;
  const bmi = weight / (heightM * heightM);
  
  let bmiCategory: string;
  if (bmi < 18.5) bmiCategory = 'Subponderal';
  else if (bmi < 25) bmiCategory = 'Normal';
  else if (bmi < 30) bmiCategory = 'Supraponderal';
  else bmiCategory = 'Obezitate';

  // Ideal Weight - Devine Formula (1974)
  // Men: 50 + 2.3 × (height in inches - 60)
  // Women: 45.5 + 2.3 × (height in inches - 60)
  const heightInches = height / 2.54;
  let idealWeightBase: number;
  if (sex === 'male') {
    idealWeightBase = 50 + 2.3 * (heightInches - 60);
  } else {
    idealWeightBase = 45.5 + 2.3 * (heightInches - 60);
  }
  const idealWeightMin = Math.round(idealWeightBase * 0.9);
  const idealWeightMax = Math.round(idealWeightBase * 1.1);

  // Body Fat Estimate (simplified US Navy approximation)
  // This is a rough estimate without waist/neck measurements
  let bodyFatEstimate: number;
  if (sex === 'male') {
    bodyFatEstimate = 1.20 * bmi + 0.23 * age - 16.2;
  } else {
    bodyFatEstimate = 1.20 * bmi + 0.23 * age - 5.4;
  }
  bodyFatEstimate = Math.max(5, Math.min(50, bodyFatEstimate));

  // ==================== ENERGY CALCULATIONS ====================

  // BMR using Mifflin-St Jeor Equation (most accurate for general population)
  // Men: BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age(y) + 5
  // Women: BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age(y) - 161
  let bmr: number;
  if (sex === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // RMR (Resting Metabolic Rate) - slightly higher than BMR
  // RMR ≈ BMR × 1.1
  const rmr = Math.round(bmr * 1.1);

  // TDEE (Total Daily Energy Expenditure)
  const tdee = Math.round(bmr * activityMultipliers[activityLevel]);

  // Target calories based on goal
  const targetCalories = Math.round(tdee + goalAdjustments[goal]);

  // ==================== MACRONUTRIENTS ====================

  // Protein needs based on goal, activity, and dietary style
  // Sedentary: 0.8g/kg, Active: 1.2-1.6g/kg, Athlete/Gain: 1.6-2.2g/kg
  // Vegans may need +10% due to lower digestibility of plant proteins
  let proteinMultiplier: number;
  if (goal === 'gain' || activityLevel === 'athlete') {
    proteinMultiplier = 2.0;
  } else if (activityLevel === 'active' || activityLevel === 'moderate') {
    proteinMultiplier = 1.4;
  } else if (dietaryStyle === 'high-protein') {
    proteinMultiplier = 1.8;
  } else {
    proteinMultiplier = 1.0;
  }
  // Add 10% for vegan protein digestibility
  proteinMultiplier *= 1.1;
  const proteinGrams = Math.round(weight * proteinMultiplier);
  const proteinCalories = proteinGrams * 4;

  // Fat: 25-35% of calories (9 kcal/g)
  // Lower for weight loss, higher for low-carb
  let fatPercent = 0.28;
  if (goal === 'lose') fatPercent = 0.25;
  if (dietaryStyle === 'low-carb') fatPercent = 0.40;
  const fatCalories = targetCalories * fatPercent;
  const fatGrams = Math.round(fatCalories / 9);

  // Carbs: remainder (4 kcal/g)
  const carbsCalories = targetCalories - proteinCalories - fatCalories;
  const carbsGrams = Math.round(Math.max(0, carbsCalories / 4));

  // Fiber: 14g per 1000 kcal (Institute of Medicine)
  const fiberGrams = Math.round((targetCalories / 1000) * 14);

  // ==================== HYDRATION ====================

  // Daily water intake: 30-40ml per kg body weight
  // Athletes need more: 35-40ml per kg
  const waterPerKg = activityLevel === 'athlete' ? 40 : 
                     activityLevel === 'active' ? 35 : 
                     activityLevel === 'moderate' ? 33 : 30;
  const dailyWaterMl = Math.round(weight * waterPerKg);

  // ==================== VEGAN MICRONUTRIENTS (RDA) ====================

  // Vitamin B12: 2.4mcg/day (critical for vegans - must supplement)
  const vitaminB12Mcg = 2.4;

  // Vitamin D: 600-1000 IU/day (higher in winter, for those with limited sun)
  const vitaminDIU = age > 70 ? 800 : 600;

  // Omega-3 (DHA + EPA from algae): 250-500mg/day
  const omega3Mg = activityLevel === 'athlete' ? 500 : 250;

  // Iron: 8mg men, 18mg women (vegans need 1.8x due to lower absorption)
  // Plant iron (non-heme) has ~5-12% absorption vs 15-35% for heme iron
  const baseIron = sex === 'male' ? 8 : 18;
  const ironMg = Math.round(baseIron * 1.8);

  // Calcium: 1000mg/day (1200mg for 50+ women)
  const calciumMg = (sex === 'female' && age >= 50) ? 1200 : 1000;

  // Zinc: 8mg women, 11mg men (vegans need +50% due to phytates)
  const baseZinc = sex === 'male' ? 11 : 8;
  const zincMg = Math.round(baseZinc * 1.5);

  // Iodine: 150mcg/day (critical - use iodized salt or seaweed)
  const iodMcg = 150;

  // Selenium: 55mcg/day
  const seleniumMcg = 55;

  // ==================== LIMITS ====================

  // Sodium: max 2300mg/day (1500mg for hypertension)
  const sodiumMaxMg = 2300;

  // Added sugar: max 25g women, 36g men (AHA recommendation)
  const addedSugarMaxG = sex === 'male' ? 36 : 25;

  // ==================== RATIOS ====================

  // Omega-6:Omega-3 ratio - ideal 4:1 or lower
  // Most Western diets are 15:1 to 20:1
  const omega6to3Ratio = '4:1 sau mai mic';

  return {
    bmi: Math.round(bmi * 10) / 10,
    bmiCategory,
    idealWeightMin,
    idealWeightMax,
    bodyFatEstimate: Math.round(bodyFatEstimate * 10) / 10,
    
    bmr: Math.round(bmr),
    rmr,
    tdee,
    targetCalories,
    
    proteinGrams,
    proteinCalories,
    carbsGrams,
    carbsCalories,
    fatGrams,
    fatCalories,
    fiberGrams,
    
    dailyWaterMl,
    waterPerKg,
    
    vitaminB12Mcg,
    vitaminDIU,
    omega3Mg,
    ironMg,
    calciumMg,
    zincMg,
    iodMcg,
    seleniumMcg,
    
    sodiumMaxMg,
    addedSugarMaxG,
    
    omega6to3Ratio,
  };
}

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [metrics, setMetrics] = useState<CalculatedMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load profile from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as UserProfile;
        setProfile(parsed);
        setMetrics(calculateMetrics(parsed));
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save profile to localStorage
  const saveProfile = useCallback((newProfile: UserProfile) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
      setProfile(newProfile);
      setMetrics(calculateMetrics(newProfile));
    } catch (error) {
      console.error('Error saving user profile:', error);
    }
  }, []);

  // Update specific fields
  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    if (profile) {
      const updated = { ...profile, ...updates };
      saveProfile(updated);
    }
  }, [profile, saveProfile]);

  // Clear profile (for testing/reset)
  const clearProfile = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setProfile(null);
    setMetrics(null);
  }, []);

  // Check if onboarding is needed
  const needsOnboarding = !isLoading && (!profile || !profile.onboardingCompleted);

  return {
    profile,
    metrics,
    isLoading,
    needsOnboarding,
    saveProfile,
    updateProfile,
    clearProfile,
  };
}

export default useUserProfile;
