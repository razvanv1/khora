/*
 * KHORA Onboarding Page - Personalized Quiz
 * Design: Premium Apple Glass - Spatial Computing aesthetic
 * Features: Email collection, complete personalization quiz, scientific calculations
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  ArrowLeft, 
  User, 
  Mail, 
  Scale, 
  Ruler, 
  Activity, 
  Target,
  Leaf,
  Check,
  Utensils,
  Coffee,
  Sun,
  Moon
} from "lucide-react";
import { useLocation } from "wouter";
import CosmicBackground from "@/components/CosmicBackground";
import { 
  UserProfile, 
  calculateMetrics, 
  dietaryStyles, 
  mealTypeOptions, 
  cookingStyles,
  MealPreferences 
} from "@/hooks/useUserProfile";

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const activityOptions = [
  { id: 'sedentary', label: 'Sedentar', description: 'Muncă de birou, fără exerciții' },
  { id: 'light', label: 'Ușor activ', description: 'Exerciții ușoare 1-3 zile/săpt.' },
  { id: 'moderate', label: 'Moderat activ', description: 'Exerciții moderate 3-5 zile/săpt.' },
  { id: 'active', label: 'Foarte activ', description: 'Exerciții intense 6-7 zile/săpt.' },
  { id: 'athlete', label: 'Sportiv', description: 'Antrenament intens zilnic' },
];

const goalOptions = [
  { id: 'lose', label: 'Slăbire', description: 'Deficit caloric controlat' },
  { id: 'maintain', label: 'Menținere', description: 'Echilibru caloric' },
  { id: 'gain', label: 'Masă musculară', description: 'Surplus caloric moderat' },
];

const allergyOptions = [
  'Gluten', 'Soia', 'Nuci', 'Arahide', 'Susan', 'Porumb', 'Latex (fructe cross-reactive)'
];

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    sex: '' as 'male' | 'female' | '',
    age: '',
    weight: '',
    height: '',
    activityLevel: '' as UserProfile['activityLevel'] | '',
    goal: '' as UserProfile['goal'] | '',
    dietaryStyle: 'standard-vegan',
    mealPreferences: {
      breakfast: [] as string[],
      lunch: [] as string[],
      dinner: [] as string[],
      snacks: [] as string[],
    } as MealPreferences,
    cookingStyles: [] as string[],
    allergies: [] as string[],
  });
  const [showResults, setShowResults] = useState(false);

  const totalSteps = 9;

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleMealPreference = (meal: keyof MealPreferences, pref: string) => {
    setFormData(prev => ({
      ...prev,
      mealPreferences: {
        ...prev.mealPreferences,
        [meal]: prev.mealPreferences[meal].includes(pref)
          ? prev.mealPreferences[meal].filter(p => p !== pref)
          : [...prev.mealPreferences[meal], pref]
      }
    }));
  };

  const toggleCookingStyle = (style: string) => {
    setFormData(prev => ({
      ...prev,
      cookingStyles: prev.cookingStyles.includes(style)
        ? prev.cookingStyles.filter(s => s !== style)
        : [...prev.cookingStyles, style]
    }));
  };

  const toggleAllergy = (allergy: string) => {
    setFormData(prev => ({
      ...prev,
      allergies: prev.allergies.includes(allergy)
        ? prev.allergies.filter(a => a !== allergy)
        : [...prev.allergies, allergy]
    }));
  };

  const canProceed = () => {
    switch (step) {
      case 0: return formData.email.includes('@') && formData.name.length > 0;
      case 1: return formData.sex !== '';
      case 2: return formData.age !== '' && parseInt(formData.age) > 0;
      case 3: return formData.weight !== '' && formData.height !== '';
      case 4: return formData.activityLevel !== '';
      case 5: return formData.goal !== '';
      case 6: return formData.dietaryStyle !== '';
      case 7: return true; // Meal preferences optional
      case 8: return formData.cookingStyles.length > 0;
      default: return true;
    }
  };

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (showResults) {
      setShowResults(false);
    } else if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    const profile: UserProfile = {
      email: formData.email,
      name: formData.name,
      sex: formData.sex as 'male' | 'female',
      age: parseInt(formData.age),
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
      activityLevel: formData.activityLevel as UserProfile['activityLevel'],
      goal: formData.goal as UserProfile['goal'],
      dietaryStyle: formData.dietaryStyle,
      mealPreferences: formData.mealPreferences,
      cookingStyles: formData.cookingStyles,
      allergies: formData.allergies,
      onboardingCompleted: true,
      createdAt: new Date().toISOString(),
    };
    onComplete(profile);
    setLocation('/');
  };

  const getMetrics = () => {
    if (!formData.sex || !formData.age || !formData.weight || !formData.height || 
        !formData.activityLevel || !formData.goal) {
      return null;
    }
    const tempProfile: UserProfile = {
      email: formData.email,
      name: formData.name,
      sex: formData.sex as 'male' | 'female',
      age: parseInt(formData.age),
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
      activityLevel: formData.activityLevel as UserProfile['activityLevel'],
      goal: formData.goal as UserProfile['goal'],
      dietaryStyle: formData.dietaryStyle,
      mealPreferences: formData.mealPreferences,
      cookingStyles: formData.cookingStyles,
      allergies: formData.allergies,
      onboardingCompleted: false,
      createdAt: '',
    };
    return calculateMetrics(tempProfile);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: 'rgba(0, 212, 170, 0.15)' }}
              >
                <Mail className="w-8 h-8 text-[#00d4aa]" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Bine ai venit la Khora</h2>
              <p className="text-white/60">Să începem cu datele tale de bază</p>
            </div>

            <div>
              <label className="text-white/70 text-sm mb-2 block">Numele tău</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Introdu numele"
                className="w-full px-5 py-4 rounded-2xl text-white text-lg placeholder-white/30 outline-none transition-all focus:ring-2 focus:ring-[#00d4aa]/50"
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              />
            </div>

            <div>
              <label className="text-white/70 text-sm mb-2 block">Adresa de email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="email@exemplu.com"
                className="w-full px-5 py-4 rounded-2xl text-white text-lg placeholder-white/30 outline-none transition-all focus:ring-2 focus:ring-[#00d4aa]/50"
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              />
              <p className="text-white/40 text-xs mt-2">
                Vei primi recomandări personalizate și progresul tău
              </p>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: 'rgba(139, 92, 246, 0.15)' }}
              >
                <User className="w-8 h-8 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Sexul tău</h2>
              <p className="text-white/60">Necesar pentru calculul metabolismului bazal</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { id: 'male', label: 'Masculin', icon: '♂' },
                { id: 'female', label: 'Feminin', icon: '♀' },
              ].map(option => (
                <button
                  key={option.id}
                  onClick={() => updateField('sex', option.id)}
                  className="p-6 rounded-2xl text-center transition-all"
                  style={{
                    background: formData.sex === option.id 
                      ? 'rgba(0, 212, 170, 0.15)' 
                      : 'rgba(255, 255, 255, 0.04)',
                    border: formData.sex === option.id 
                      ? '2px solid rgba(0, 212, 170, 0.5)' 
                      : '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <span className="text-4xl mb-2 block">{option.icon}</span>
                  <span className={`font-medium ${formData.sex === option.id ? 'text-[#00d4aa]' : 'text-white/70'}`}>
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: 'rgba(59, 130, 246, 0.15)' }}
              >
                <span className="text-3xl">🎂</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Câți ani ai?</h2>
              <p className="text-white/60">Vârsta influențează necesarul caloric</p>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => updateField('age', String(Math.max(1, parseInt(formData.age || '25') - 1)))}
                className="w-14 h-14 rounded-full flex items-center justify-center text-2xl text-white"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                -
              </button>
              
              <input
                type="number"
                value={formData.age}
                onChange={(e) => updateField('age', e.target.value)}
                placeholder="25"
                className="w-32 text-center text-5xl font-bold text-white bg-transparent outline-none"
                min="1"
                max="120"
              />
              
              <button
                onClick={() => updateField('age', String(Math.min(120, parseInt(formData.age || '25') + 1)))}
                className="w-14 h-14 rounded-full flex items-center justify-center text-2xl text-white"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                +
              </button>
            </div>
            <p className="text-center text-white/40 text-sm">ani</p>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: 'rgba(34, 197, 94, 0.15)' }}
              >
                <Scale className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Măsurătorile tale</h2>
              <p className="text-white/60">Pentru calcule precise de BMI și necesar caloric</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-white/70 text-sm mb-2 block flex items-center gap-2">
                  <Scale className="w-4 h-4" /> Greutate (kg)
                </label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => updateField('weight', e.target.value)}
                  placeholder="70"
                  className="w-full px-5 py-4 rounded-2xl text-white text-xl placeholder-white/30 outline-none"
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                />
              </div>

              <div>
                <label className="text-white/70 text-sm mb-2 block flex items-center gap-2">
                  <Ruler className="w-4 h-4" /> Înălțime (cm)
                </label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => updateField('height', e.target.value)}
                  placeholder="175"
                  className="w-full px-5 py-4 rounded-2xl text-white text-xl placeholder-white/30 outline-none"
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: 'rgba(249, 115, 22, 0.15)' }}
              >
                <Activity className="w-8 h-8 text-orange-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Nivelul de activitate</h2>
              <p className="text-white/60">Cât de activ ești în mod obișnuit?</p>
            </div>

            <div className="space-y-3">
              {activityOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => updateField('activityLevel', option.id)}
                  className="w-full p-4 rounded-xl text-left transition-all"
                  style={{
                    background: formData.activityLevel === option.id 
                      ? 'rgba(0, 212, 170, 0.15)' 
                      : 'rgba(255, 255, 255, 0.04)',
                    border: formData.activityLevel === option.id 
                      ? '2px solid rgba(0, 212, 170, 0.5)' 
                      : '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-medium ${formData.activityLevel === option.id ? 'text-[#00d4aa]' : 'text-white'}`}>
                        {option.label}
                      </p>
                      <p className="text-white/50 text-sm">{option.description}</p>
                    </div>
                    {formData.activityLevel === option.id && (
                      <Check className="w-5 h-5 text-[#00d4aa]" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: 'rgba(236, 72, 153, 0.15)' }}
              >
                <Target className="w-8 h-8 text-pink-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Obiectivul tău</h2>
              <p className="text-white/60">Ce vrei să atingi?</p>
            </div>

            <div className="space-y-3">
              {goalOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => updateField('goal', option.id)}
                  className="w-full p-5 rounded-xl text-left transition-all"
                  style={{
                    background: formData.goal === option.id 
                      ? 'rgba(0, 212, 170, 0.15)' 
                      : 'rgba(255, 255, 255, 0.04)',
                    border: formData.goal === option.id 
                      ? '2px solid rgba(0, 212, 170, 0.5)' 
                      : '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-medium text-lg ${formData.goal === option.id ? 'text-[#00d4aa]' : 'text-white'}`}>
                        {option.label}
                      </p>
                      <p className="text-white/50 text-sm">{option.description}</p>
                    </div>
                    {formData.goal === option.id && (
                      <Check className="w-5 h-5 text-[#00d4aa]" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: 'rgba(34, 197, 94, 0.15)' }}
              >
                <Leaf className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Stilul tău alimentar</h2>
              <p className="text-white/60">Ce tip de alimentație vegană preferi?</p>
            </div>

            <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-2">
              {dietaryStyles.map(style => (
                <button
                  key={style.id}
                  onClick={() => updateField('dietaryStyle', style.id)}
                  className="w-full p-4 rounded-xl text-left transition-all"
                  style={{
                    background: formData.dietaryStyle === style.id 
                      ? 'rgba(0, 212, 170, 0.15)' 
                      : 'rgba(255, 255, 255, 0.04)',
                    border: formData.dietaryStyle === style.id 
                      ? '2px solid rgba(0, 212, 170, 0.5)' 
                      : '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-medium ${formData.dietaryStyle === style.id ? 'text-[#00d4aa]' : 'text-white'}`}>
                        {style.label}
                      </p>
                      <p className="text-white/50 text-sm">{style.description}</p>
                    </div>
                    {formData.dietaryStyle === style.id && (
                      <Check className="w-5 h-5 text-[#00d4aa]" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Allergies */}
            <div className="mt-6">
              <p className="text-white/70 text-sm mb-3">Alergii sau intoleranțe (opțional)</p>
              <div className="flex flex-wrap gap-2">
                {allergyOptions.map(allergy => (
                  <button
                    key={allergy}
                    onClick={() => toggleAllergy(allergy)}
                    className="px-3 py-1.5 rounded-full text-xs transition-all"
                    style={{
                      background: formData.allergies.includes(allergy) 
                        ? 'rgba(239, 68, 68, 0.2)' 
                        : 'rgba(255, 255, 255, 0.05)',
                      border: formData.allergies.includes(allergy) 
                        ? '1px solid rgba(239, 68, 68, 0.4)' 
                        : '1px solid rgba(255, 255, 255, 0.1)',
                      color: formData.allergies.includes(allergy) 
                        ? '#fca5a5' 
                        : 'rgba(255, 255, 255, 0.6)',
                    }}
                  >
                    {allergy}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: 'rgba(249, 115, 22, 0.15)' }}
              >
                <Utensils className="w-8 h-8 text-orange-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Preferințe pe mese</h2>
              <p className="text-white/60">Ce îți place să mănânci la fiecare masă?</p>
            </div>

            <div className="space-y-5 max-h-[55vh] overflow-y-auto pr-2">
              {/* Breakfast */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Coffee className="w-4 h-4 text-yellow-400" />
                  <span className="text-white font-medium">Mic dejun</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {mealTypeOptions.breakfast.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => toggleMealPreference('breakfast', opt.id)}
                      className="px-3 py-1.5 rounded-lg text-xs transition-all"
                      style={{
                        background: formData.mealPreferences.breakfast.includes(opt.id) 
                          ? 'rgba(0, 212, 170, 0.2)' 
                          : 'rgba(255, 255, 255, 0.05)',
                        border: formData.mealPreferences.breakfast.includes(opt.id) 
                          ? '1px solid rgba(0, 212, 170, 0.4)' 
                          : '1px solid rgba(255, 255, 255, 0.1)',
                        color: formData.mealPreferences.breakfast.includes(opt.id) 
                          ? '#00d4aa' 
                          : 'rgba(255, 255, 255, 0.7)',
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lunch */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sun className="w-4 h-4 text-orange-400" />
                  <span className="text-white font-medium">Prânz</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {mealTypeOptions.lunch.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => toggleMealPreference('lunch', opt.id)}
                      className="px-3 py-1.5 rounded-lg text-xs transition-all"
                      style={{
                        background: formData.mealPreferences.lunch.includes(opt.id) 
                          ? 'rgba(0, 212, 170, 0.2)' 
                          : 'rgba(255, 255, 255, 0.05)',
                        border: formData.mealPreferences.lunch.includes(opt.id) 
                          ? '1px solid rgba(0, 212, 170, 0.4)' 
                          : '1px solid rgba(255, 255, 255, 0.1)',
                        color: formData.mealPreferences.lunch.includes(opt.id) 
                          ? '#00d4aa' 
                          : 'rgba(255, 255, 255, 0.7)',
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dinner */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Moon className="w-4 h-4 text-blue-400" />
                  <span className="text-white font-medium">Cină</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {mealTypeOptions.dinner.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => toggleMealPreference('dinner', opt.id)}
                      className="px-3 py-1.5 rounded-lg text-xs transition-all"
                      style={{
                        background: formData.mealPreferences.dinner.includes(opt.id) 
                          ? 'rgba(0, 212, 170, 0.2)' 
                          : 'rgba(255, 255, 255, 0.05)',
                        border: formData.mealPreferences.dinner.includes(opt.id) 
                          ? '1px solid rgba(0, 212, 170, 0.4)' 
                          : '1px solid rgba(255, 255, 255, 0.1)',
                        color: formData.mealPreferences.dinner.includes(opt.id) 
                          ? '#00d4aa' 
                          : 'rgba(255, 255, 255, 0.7)',
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Snacks */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🍎</span>
                  <span className="text-white font-medium">Gustări</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {mealTypeOptions.snacks.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => toggleMealPreference('snacks', opt.id)}
                      className="px-3 py-1.5 rounded-lg text-xs transition-all"
                      style={{
                        background: formData.mealPreferences.snacks.includes(opt.id) 
                          ? 'rgba(0, 212, 170, 0.2)' 
                          : 'rgba(255, 255, 255, 0.05)',
                        border: formData.mealPreferences.snacks.includes(opt.id) 
                          ? '1px solid rgba(0, 212, 170, 0.4)' 
                          : '1px solid rgba(255, 255, 255, 0.1)',
                        color: formData.mealPreferences.snacks.includes(opt.id) 
                          ? '#00d4aa' 
                          : 'rgba(255, 255, 255, 0.7)',
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: 'rgba(139, 92, 246, 0.15)' }}
              >
                <span className="text-3xl">👨‍🍳</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Stiluri de gătit preferate</h2>
              <p className="text-white/60">Cum îți place să prepari mâncarea?</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {cookingStyles.map(style => (
                <button
                  key={style.id}
                  onClick={() => toggleCookingStyle(style.id)}
                  className="p-4 rounded-xl text-center transition-all"
                  style={{
                    background: formData.cookingStyles.includes(style.id) 
                      ? 'rgba(0, 212, 170, 0.15)' 
                      : 'rgba(255, 255, 255, 0.04)',
                    border: formData.cookingStyles.includes(style.id) 
                      ? '2px solid rgba(0, 212, 170, 0.5)' 
                      : '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <span className="text-2xl mb-1 block">{style.icon}</span>
                  <span className={`text-sm font-medium ${formData.cookingStyles.includes(style.id) ? 'text-[#00d4aa]' : 'text-white/70'}`}>
                    {style.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderResults = () => {
    const metrics = getMetrics();
    if (!metrics) return null;

    return (
      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
        <div className="text-center mb-4">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3"
            style={{ background: 'linear-gradient(135deg, #00d4aa 0%, #22c55e 100%)' }}
          >
            <Leaf className="w-8 h-8 text-[#0a0f1a]" />
          </div>
          <h2 className="text-xl font-bold text-white mb-1">
            Planul tău, {formData.name}!
          </h2>
          <p className="text-white/60 text-sm">Calculat științific pentru tine</p>
        </div>

        {/* Body Stats */}
        <div 
          className="p-4 rounded-2xl"
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <h3 className="text-white/60 text-xs uppercase tracking-wider mb-3">Corp</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-white font-bold text-xl">{metrics.bmi}</p>
              <p className="text-[#00d4aa] text-xs">{metrics.bmiCategory}</p>
            </div>
            <div>
              <p className="text-white font-bold text-xl">{metrics.idealWeightMin}-{metrics.idealWeightMax}kg</p>
              <p className="text-white/50 text-xs">Greutate ideală</p>
            </div>
          </div>
        </div>

        {/* Calories & Macros */}
        <div 
          className="p-4 rounded-2xl"
          style={{
            background: 'rgba(249, 115, 22, 0.1)',
            border: '1px solid rgba(249, 115, 22, 0.2)',
          }}
        >
          <h3 className="text-orange-300 text-xs uppercase tracking-wider mb-3">Energie zilnică</h3>
          <p className="text-white font-bold text-3xl mb-3">{metrics.targetCalories} kcal</p>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div>
              <p className="text-white font-semibold">{metrics.proteinGrams}g</p>
              <p className="text-white/50 text-[10px]">Proteine</p>
            </div>
            <div>
              <p className="text-white font-semibold">{metrics.carbsGrams}g</p>
              <p className="text-white/50 text-[10px]">Carbs</p>
            </div>
            <div>
              <p className="text-white font-semibold">{metrics.fatGrams}g</p>
              <p className="text-white/50 text-[10px]">Grăsimi</p>
            </div>
            <div>
              <p className="text-white font-semibold">{metrics.fiberGrams}g</p>
              <p className="text-white/50 text-[10px]">Fibre</p>
            </div>
          </div>
        </div>

        {/* Hydration */}
        <div 
          className="p-4 rounded-2xl"
          style={{
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
          }}
        >
          <h3 className="text-blue-300 text-xs uppercase tracking-wider mb-2">Hidratare</h3>
          <p className="text-white font-bold text-2xl">{(metrics.dailyWaterMl / 1000).toFixed(1)}L / zi</p>
          <p className="text-white/50 text-xs">{metrics.waterPerKg}ml per kg corp</p>
        </div>

        {/* Vegan Supplements */}
        <div 
          className="p-4 rounded-2xl"
          style={{
            background: 'rgba(139, 92, 246, 0.1)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
          }}
        >
          <h3 className="text-purple-300 text-xs uppercase tracking-wider mb-3">Suplimente esențiale vegane</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-white/60">B12</span>
              <span className="text-white">{metrics.vitaminB12Mcg}mcg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">D3</span>
              <span className="text-white">{metrics.vitaminDIU}IU</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Omega-3</span>
              <span className="text-white">{metrics.omega3Mg}mg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Fier</span>
              <span className="text-white">{metrics.ironMg}mg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Zinc</span>
              <span className="text-white">{metrics.zincMg}mg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Iod</span>
              <span className="text-white">{metrics.iodMcg}mcg</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <CosmicBackground />
      
      <main className="relative z-10 min-h-screen flex flex-col px-6 py-6">
        {/* Progress bar */}
        {!showResults && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/50 text-sm">Pas {step + 1} din {totalSteps}</span>
              <span className="text-white/50 text-sm">{Math.round(((step + 1) / totalSteps) * 100)}%</span>
            </div>
            <div className="h-1 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #00d4aa 0%, #22c55e 100%)' }}
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={showResults ? 'results' : step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {showResults ? renderResults() : renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-6 max-w-md mx-auto w-full">
          <button
            onClick={handleBack}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all ${
              step === 0 && !showResults ? 'opacity-0 pointer-events-none' : 'text-white/60 hover:text-white'
            }`}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            Înapoi
          </button>

          {showResults ? (
            <button
              onClick={handleComplete}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-[#0a0f1a]"
              style={{
                background: 'linear-gradient(135deg, #00d4aa 0%, #22c55e 100%)',
              }}
            >
              Începe
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all disabled:opacity-40"
              style={{
                background: canProceed() 
                  ? 'linear-gradient(135deg, #00d4aa 0%, #22c55e 100%)'
                  : 'rgba(255, 255, 255, 0.1)',
                color: canProceed() ? '#0a0f1a' : 'rgba(255, 255, 255, 0.4)',
              }}
            >
              {step === totalSteps - 1 ? 'Rezultate' : 'Continuă'}
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
