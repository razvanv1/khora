/*
 * KHORA Onboarding - 9 Pași cu Explicații Umane
 * Fără jargon tehnic, fără acronime, ton calm și uman
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, ArrowLeft, Mail, User, Scale, Ruler, 
  Activity, Target, Leaf, Utensils, AlertCircle, Check,
  Droplets, Dumbbell, Apple, Heart
} from "lucide-react";
import { useLocation } from "wouter";
import { UserProfile, calculateMetrics, MealPreferences } from "@/hooks/useUserProfile";

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    email: '', name: '', sex: '' as 'male' | 'female' | '', 
    age: '', weight: '', height: '',
    activityLevel: '' as UserProfile['activityLevel'] | '', 
    goal: '' as UserProfile['goal'] | '',
    dietaryStyle: 'standard-vegan',
    mealPreferences: { 
      mealsPerDay: 3,
      breakfast: true,
      smoothies: false,
      soups: false,
      cookedVsRaw: 'mixed',
      cookingTime: 'medium'
    },
    allergies: [] as string[],
    otherAllergy: ''
  });
  const [showResults, setShowResults] = useState(false);

  const totalSteps = 9;

  const updateField = (field: string, value: any) => setFormData(prev => ({ ...prev, [field]: value }));
  
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
      case 0: return formData.name.length > 0 && formData.email.includes('@');
      case 1: return formData.sex !== '';
      case 2: return formData.age !== '' && parseInt(formData.age) > 0;
      case 3: return formData.weight !== '' && formData.height !== '';
      case 4: return formData.activityLevel !== '';
      case 5: return formData.goal !== '';
      case 6: return formData.dietaryStyle !== '';
      case 7: return true; // Preferințe mese - opțional
      case 8: return true; // Alergii - opțional
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
      mealPreferences: {
        breakfast: formData.mealPreferences.breakfast ? ['da'] : [],
        lunch: [],
        dinner: [],
        snacks: []
      },
      cookingStyles: [],
      allergies: formData.allergies,
      onboardingCompleted: true,
      createdAt: new Date().toISOString()
    };
    onComplete(profile);
    setLocation('/');
  };

  // Calculează rezultatele
  const getResults = () => {
    if (!formData.weight || !formData.height || !formData.age || !formData.sex || !formData.activityLevel || !formData.goal) {
      return null;
    }
    
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
      mealPreferences: { breakfast: [], lunch: [], dinner: [], snacks: [] },
      cookingStyles: [],
      allergies: formData.allergies,
      onboardingCompleted: true,
      createdAt: new Date().toISOString()
    };
    
    return calculateMetrics(profile);
  };

  const progress = ((step + 1) / totalSteps) * 100;

  // Render step content
  const renderStep = () => {
    switch (step) {
      // PASUL 1: Identitate minimă
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-[#d4a574]/20 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-[#d4a574]" />
              </div>
              <h2 className="text-2xl font-light text-white mb-2">Bine ai venit la Khora</h2>
              <p className="text-white/50 text-sm max-w-xs mx-auto">
                Hai să ne cunoaștem. Aceste date ne ajută să-ți păstrăm profilul și recomandările personalizate.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-white/70 text-sm mb-2 block">Cum te numești?</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="Numele tău"
                  className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#d4a574]/50"
                />
              </div>
              <div>
                <label className="text-white/70 text-sm mb-2 block">Adresa ta de email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="email@exemplu.com"
                  className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#d4a574]/50"
                />
                <p className="text-white/30 text-xs mt-2">Folosim emailul pentru a-ți salva preferințele.</p>
              </div>
            </div>
          </div>
        );

      // PASUL 2: Sex
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-[#60a5fa]/20 flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-[#60a5fa]" />
              </div>
              <h2 className="text-2xl font-light text-white mb-2">Date de bază</h2>
              <p className="text-white/50 text-sm max-w-xs mx-auto">
                Aceste informații ne ajută să estimăm mai precis de câte calorii și nutrienți ai nevoie zilnic.
              </p>
            </div>
            
            <div className="space-y-3">
              <p className="text-white/70 text-sm mb-3">Care este sexul tău biologic?</p>
              {[
                { id: 'female', label: 'Femeie' },
                { id: 'male', label: 'Bărbat' }
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => updateField('sex', option.id)}
                  className={`w-full p-4 rounded-xl text-left transition-all ${
                    formData.sex === option.id
                      ? 'bg-[#d4a574]/20 border-[#d4a574]/50'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  } border`}
                >
                  <span className="text-white font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        );

      // PASUL 3: Vârstă
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-[#a78bfa]/20 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-[#a78bfa]" />
              </div>
              <h2 className="text-2xl font-light text-white mb-2">Câți ani ai?</h2>
              <p className="text-white/50 text-sm max-w-xs mx-auto">
                Vârsta influențează metabolismul și necesarul de nutrienți. Nu te judecăm, doar calculăm.
              </p>
            </div>
            
            <div>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => updateField('age', e.target.value)}
                placeholder="Ex: 32"
                min="16"
                max="100"
                className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white text-center text-2xl placeholder-white/30 focus:outline-none focus:border-[#d4a574]/50"
              />
              <p className="text-white/30 text-xs mt-2 text-center">ani</p>
            </div>
          </div>
        );

      // PASUL 4: Greutate și Înălțime
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-[#2dd4bf]/20 flex items-center justify-center mx-auto mb-4">
                <Scale className="w-8 h-8 text-[#2dd4bf]" />
              </div>
              <h2 className="text-2xl font-light text-white mb-2">Corpul tău</h2>
              <p className="text-white/50 text-sm max-w-xs mx-auto">
                Folosim aceste date ca să estimăm de câte calorii, apă și nutrienți ai nevoie zilnic.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-white/70 text-sm mb-2 block">Greutatea actuală</label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => updateField('weight', e.target.value)}
                    placeholder="Ex: 65"
                    className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#d4a574]/50 pr-12"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40">kg</span>
                </div>
              </div>
              <div>
                <label className="text-white/70 text-sm mb-2 block">Înălțimea</label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.height}
                    onChange={(e) => updateField('height', e.target.value)}
                    placeholder="Ex: 170"
                    className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#d4a574]/50 pr-12"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40">cm</span>
                </div>
              </div>
            </div>
          </div>
        );

      // PASUL 5: Nivel de activitate
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-[#f97316]/20 flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-[#f97316]" />
              </div>
              <h2 className="text-2xl font-light text-white mb-2">Cât de activ ești?</h2>
              <p className="text-white/50 text-sm max-w-xs mx-auto">
                Activitatea fizică influențează câtă energie consumi zilnic.
              </p>
            </div>
            
            <div className="space-y-3">
              {[
                { id: 'sedentary', label: 'Sedentar', desc: 'Lucrez mult la birou, fără exerciții regulate' },
                { id: 'light', label: 'Ușor activ', desc: 'Mers zilnic, mișcare ușoară, treburi casnice' },
                { id: 'moderate', label: 'Activ', desc: 'Sport de 3-4 ori pe săptămână' },
                { id: 'active', label: 'Foarte activ', desc: 'Sport intens sau muncă fizică zilnică' },
                { id: 'athlete', label: 'Sportiv de performanță', desc: 'Antrenament intens zilnic, competiții' }
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => updateField('activityLevel', option.id)}
                  className={`w-full p-4 rounded-xl text-left transition-all ${
                    formData.activityLevel === option.id
                      ? 'bg-[#d4a574]/20 border-[#d4a574]/50'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  } border`}
                >
                  <span className="text-white font-medium block">{option.label}</span>
                  <span className="text-white/40 text-sm">{option.desc}</span>
                </button>
              ))}
            </div>
          </div>
        );

      // PASUL 6: Obiectiv principal
      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-[#22c55e]/20 flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-[#22c55e]" />
              </div>
              <h2 className="text-2xl font-light text-white mb-2">Care e obiectivul tău?</h2>
              <p className="text-white/50 text-sm max-w-xs mx-auto">
                Alegerea ta influențează câte calorii, ce combinații și ce tip de mese îți sugerăm.
              </p>
            </div>
            
            <div className="space-y-3">
              {[
                { id: 'lose', label: 'Vreau să slăbesc', desc: 'Deficit caloric controlat, mese sățioase' },
                { id: 'maintain', label: 'Vreau să mă mențin', desc: 'Echilibru caloric, varietate în mese' },
                { id: 'gain', label: 'Vreau masă musculară', desc: 'Surplus caloric moderat, proteine crescute' },
                { id: 'energy', label: 'Vreau energie și focus', desc: 'Alimente energizante, evitarea zahărului' },
                { id: 'digestion', label: 'Vreau digestie mai bună', desc: 'Fibre, fermentate, mese ușoare' }
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => updateField('goal', option.id)}
                  className={`w-full p-4 rounded-xl text-left transition-all ${
                    formData.goal === option.id
                      ? 'bg-[#d4a574]/20 border-[#d4a574]/50'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  } border`}
                >
                  <span className="text-white font-medium block">{option.label}</span>
                  <span className="text-white/40 text-sm">{option.desc}</span>
                </button>
              ))}
            </div>
          </div>
        );

      // PASUL 7: Stil alimentar
      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-[#84cc16]/20 flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-[#84cc16]" />
              </div>
              <h2 className="text-2xl font-light text-white mb-2">Stilul tău alimentar</h2>
              <p className="text-white/50 text-sm max-w-xs mx-auto">
                Fără judecăți. Doar adaptăm rețetele la preferințele tale.
              </p>
            </div>
            
            <div className="space-y-3">
              {[
                { id: 'standard-vegan', label: 'Vegan', desc: 'Fără produse de origine animală' },
                { id: 'raw-vegan', label: 'Raw Vegan', desc: 'Alimente crude, neprocesate termic' },
                { id: 'wfpb', label: 'Whole Food Plant-Based', desc: 'Alimente integrale, minimul procesat' },
                { id: 'high-protein', label: 'Vegan High Protein', desc: 'Focus pe proteine vegetale' },
                { id: 'flexible', label: 'Vegan Flexibil', desc: 'Predominant vegan, ocazional flexibil' }
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => updateField('dietaryStyle', option.id)}
                  className={`w-full p-4 rounded-xl text-left transition-all ${
                    formData.dietaryStyle === option.id
                      ? 'bg-[#d4a574]/20 border-[#d4a574]/50'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  } border`}
                >
                  <span className="text-white font-medium block">{option.label}</span>
                  <span className="text-white/40 text-sm">{option.desc}</span>
                </button>
              ))}
            </div>
          </div>
        );

      // PASUL 8: Preferințe de mese
      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-[#ec4899]/20 flex items-center justify-center mx-auto mb-4">
                <Utensils className="w-8 h-8 text-[#ec4899]" />
              </div>
              <h2 className="text-2xl font-light text-white mb-2">Preferințe de mese</h2>
              <p className="text-white/50 text-sm max-w-xs mx-auto">
                Spune-ne cum îți place să mănânci, ca să-ți sugerăm rețete potrivite.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-white/70 text-sm mb-3 block">Câte mese pe zi?</label>
                <div className="flex gap-2">
                  {[2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        mealPreferences: { ...prev.mealPreferences, mealsPerDay: num }
                      }))}
                      className={`flex-1 py-3 rounded-xl text-center transition-all ${
                        formData.mealPreferences.mealsPerDay === num
                          ? 'bg-[#d4a574]/20 border-[#d4a574]/50 text-white'
                          : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                      } border`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-white/70 text-sm block">Ce îți place?</label>
                {[
                  { key: 'breakfast', label: 'Mic dejun consistent' },
                  { key: 'smoothies', label: 'Smoothie-uri' },
                  { key: 'soups', label: 'Supe cremă' }
                ].map((pref) => (
                  <button
                    key={pref.key}
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      mealPreferences: { 
                        ...prev.mealPreferences, 
                        [pref.key]: !prev.mealPreferences[pref.key as keyof typeof prev.mealPreferences] 
                      }
                    }))}
                    className={`w-full p-3 rounded-xl text-left transition-all flex items-center justify-between ${
                      formData.mealPreferences[pref.key as keyof typeof formData.mealPreferences]
                        ? 'bg-[#d4a574]/20 border-[#d4a574]/50'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    } border`}
                  >
                    <span className="text-white">{pref.label}</span>
                    {formData.mealPreferences[pref.key as keyof typeof formData.mealPreferences] && (
                      <Check className="w-5 h-5 text-[#d4a574]" />
                    )}
                  </button>
                ))}
              </div>

              <div>
                <label className="text-white/70 text-sm mb-3 block">Cât timp ai pentru gătit?</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'quick', label: 'Rapid', desc: '< 15 min' },
                    { id: 'medium', label: 'Mediu', desc: '15-30 min' },
                    { id: 'long', label: 'Relaxat', desc: '30+ min' }
                  ].map((time) => (
                    <button
                      key={time.id}
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        mealPreferences: { ...prev.mealPreferences, cookingTime: time.id }
                      }))}
                      className={`p-3 rounded-xl text-center transition-all ${
                        formData.mealPreferences.cookingTime === time.id
                          ? 'bg-[#d4a574]/20 border-[#d4a574]/50'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      } border`}
                    >
                      <span className="text-white text-sm block">{time.label}</span>
                      <span className="text-white/40 text-xs">{time.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      // PASUL 9: Alergii și intoleranțe
      case 8:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-[#ef4444]/20 flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-[#ef4444]" />
              </div>
              <h2 className="text-2xl font-light text-white mb-2">Alergii sau intoleranțe?</h2>
              <p className="text-white/50 text-sm max-w-xs mx-auto">
                Excludem automat ingredientele care nu ți se potrivesc din toate rețetele.
              </p>
            </div>
            
            <div className="space-y-3">
              {[
                { id: 'gluten', label: 'Gluten' },
                { id: 'soy', label: 'Soia' },
                { id: 'nuts', label: 'Nuci și alune' },
                { id: 'fodmap', label: 'FODMAP sensibil' },
                { id: 'nightshades', label: 'Solanacee (roșii, ardei)' }
              ].map((allergy) => (
                <button
                  key={allergy.id}
                  onClick={() => toggleAllergy(allergy.id)}
                  className={`w-full p-4 rounded-xl text-left transition-all flex items-center justify-between ${
                    formData.allergies.includes(allergy.id)
                      ? 'bg-[#ef4444]/20 border-[#ef4444]/50'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  } border`}
                >
                  <span className="text-white">{allergy.label}</span>
                  {formData.allergies.includes(allergy.id) && (
                    <Check className="w-5 h-5 text-[#ef4444]" />
                  )}
                </button>
              ))}
              
              <div>
                <input
                  type="text"
                  value={formData.otherAllergy}
                  onChange={(e) => updateField('otherAllergy', e.target.value)}
                  placeholder="Altele (opțional)"
                  className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#d4a574]/50"
                />
              </div>
            </div>
            
            <p className="text-white/30 text-xs text-center">
              Poți sări acest pas dacă nu ai restricții alimentare.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  // Render rezultate finale
  const renderResults = () => {
    const results = getResults();
    if (!results) return null;

    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-[#22c55e]/20 flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-[#22c55e]" />
          </div>
          <h2 className="text-2xl font-light text-white mb-2">Profilul tău e gata, {formData.name}!</h2>
          <p className="text-white/50 text-sm max-w-xs mx-auto">
            Am calculat recomandările tale personalizate. Iată ce am aflat:
          </p>
        </div>

        <div className="space-y-4">
          {/* Calorii */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-[#f97316]/20 flex items-center justify-center">
                <Apple className="w-5 h-5 text-[#f97316]" />
              </div>
              <div>
                <p className="text-white font-medium">{Math.round(results.targetCalories)} kcal/zi</p>
                <p className="text-white/40 text-xs">Energie zilnică</p>
              </div>
            </div>
            <p className="text-white/50 text-sm">
              Aceasta este cantitatea estimată de energie de care corpul tău are nevoie zilnic, ținând cont de corpul tău și nivelul de activitate.
            </p>
          </div>

          {/* Apă */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-[#60a5fa]/20 flex items-center justify-center">
                <Droplets className="w-5 h-5 text-[#60a5fa]" />
              </div>
              <div>
                <p className="text-white font-medium">{(results.dailyWaterMl / 1000).toFixed(1)} litri/zi</p>
                <p className="text-white/40 text-xs">Hidratare</p>
              </div>
            </div>
            <p className="text-white/50 text-sm">
              Pentru corpul tău, recomandarea este {(results.dailyWaterMl / 1000).toFixed(1)} litri pe zi. Aplicația îți va sugera ceaiuri, supe și lichide care contribuie la acest necesar.
            </p>
          </div>

          {/* Proteine */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-[#a78bfa]/20 flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-[#a78bfa]" />
              </div>
              <div>
                <p className="text-white font-medium">{Math.round(results.proteinGrams)} g/zi</p>
                <p className="text-white/40 text-xs">Proteine</p>
              </div>
            </div>
            <p className="text-white/50 text-sm">
              Ai nevoie de aproximativ {Math.round(results.proteinGrams)}g proteine pe zi pentru sațietate și menținerea masei musculare. Rețetele tale vor fi construite în jurul acestui prag.
            </p>
          </div>

          {/* Fibre */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-[#22c55e]/20 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-[#22c55e]" />
              </div>
              <div>
                <p className="text-white font-medium">{Math.round(results.fiberGrams)} g/zi</p>
                <p className="text-white/40 text-xs">Fibre</p>
              </div>
            </div>
            <p className="text-white/50 text-sm">
              Fibrele ajută digestia și controlul apetitului. Targetul tău zilnic este {Math.round(results.fiberGrams)}g.
            </p>
          </div>

          {/* Greutate de referință */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-[#2dd4bf]/20 flex items-center justify-center">
                <Scale className="w-5 h-5 text-[#2dd4bf]" />
              </div>
              <div>
                <p className="text-white font-medium">{results.idealWeightMin.toFixed(0)} - {results.idealWeightMax.toFixed(0)} kg</p>
                <p className="text-white/40 text-xs">Zonă orientativă</p>
              </div>
            </div>
            <p className="text-white/50 text-sm">
              Aceasta este o zonă orientativă unde corpul tău funcționează, de obicei, mai eficient. Nu e o țintă rigidă, ci un reper.
            </p>
          </div>
        </div>

        {/* Ce urmează */}
        <div className="p-4 rounded-xl bg-[#d4a574]/10 border border-[#d4a574]/20">
          <p className="text-white/80 text-sm">
            De acum, rețetele, combinațiile, smoothie-urile și sugestiile tale sunt adaptate exact pe stilul tău. Poți modifica oricând aceste setări din Profil.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0a1628] relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20" 
        style={{ backgroundImage: 'url(/images/khora_onboarding_bg.png)' }} 
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/80 via-[#0a1628]/95 to-[#0a1628]" />

      <div className="relative z-10 min-h-screen px-6 pt-8 pb-24">
        {/* Progress */}
        {!showResults && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/40 text-xs">Pasul {step + 1} din {totalSteps}</span>
              <span className="text-white/40 text-xs">{Math.round(progress)}%</span>
            </div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #d4a574, #2dd4bf)' }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={showResults ? 'results' : step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="pb-20"
          >
            {showResults ? renderResults() : renderStep()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0a1628] via-[#0a1628] to-transparent">
          <div className="flex gap-3">
            {(step > 0 || showResults) && (
              <button
                onClick={handleBack}
                className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Înapoi
              </button>
            )}
            
            {showResults ? (
              <button
                onClick={handleComplete}
                className="flex-1 py-4 rounded-xl text-white font-medium flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg, #d4a574, #b8956a)' }}
              >
                Începe experiența
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`flex-1 py-4 rounded-xl text-white font-medium flex items-center justify-center gap-2 transition-all ${
                  canProceed()
                    ? 'opacity-100'
                    : 'opacity-50 cursor-not-allowed'
                }`}
                style={{ background: canProceed() ? 'linear-gradient(135deg, #d4a574, #b8956a)' : 'rgba(255,255,255,0.1)' }}
              >
                {step === totalSteps - 1 ? 'Vezi rezultatele' : 'Continuă'}
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
