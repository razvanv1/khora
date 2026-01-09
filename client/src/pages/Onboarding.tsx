/*
 * KHORA Onboarding - Premium Apple VisionOS 2026
 * Limba: Română
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, User, Mail, Scale, Ruler, Activity, Target, Leaf, Check } from "lucide-react";
import { useLocation } from "wouter";
import { UserProfile, calculateMetrics, MealPreferences } from "@/hooks/useUserProfile";

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

const dietaryStyles = [
  { id: 'standard-vegan', label: 'Vegan Standard' },
  { id: 'raw-vegan', label: 'Raw Vegan' },
  { id: 'wfpb', label: 'Whole Food Plant-Based' },
  { id: 'high-protein', label: 'High Protein Vegan' },
  { id: 'low-carb', label: 'Low Carb Vegan' },
];

const cookingStyles = ['Smoothie', 'Supă', 'Salată', 'Bowl', 'Sandwich', 'Gătit la cuptor', 'Prăjit', 'Raw', 'Fiert'];

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    email: '', name: '', sex: '' as 'male' | 'female' | '', age: '', weight: '', height: '',
    activityLevel: '' as UserProfile['activityLevel'] | '', goal: '' as UserProfile['goal'] | '',
    dietaryStyle: 'standard-vegan',
    mealPreferences: { breakfast: [], lunch: [], dinner: [], snacks: [] } as MealPreferences,
    cookingStyles: [] as string[], allergies: [] as string[],
  });
  const [showResults, setShowResults] = useState(false);

  const totalSteps = 7;

  const updateField = (field: string, value: any) => setFormData(prev => ({ ...prev, [field]: value }));
  const toggleCookingStyle = (style: string) => setFormData(prev => ({
    ...prev, cookingStyles: prev.cookingStyles.includes(style) ? prev.cookingStyles.filter(s => s !== style) : [...prev.cookingStyles, style]
  }));

  const canProceed = () => {
    switch (step) {
      case 0: return formData.email.includes('@') && formData.name.length > 0;
      case 1: return formData.sex !== '';
      case 2: return formData.age !== '' && parseInt(formData.age) > 0;
      case 3: return formData.weight !== '' && formData.height !== '';
      case 4: return formData.activityLevel !== '';
      case 5: return formData.goal !== '';
      case 6: return formData.cookingStyles.length > 0;
      default: return true;
    }
  };

  const handleNext = () => { if (step < totalSteps - 1) setStep(step + 1); else setShowResults(true); };
  const handleBack = () => { if (showResults) setShowResults(false); else if (step > 0) setStep(step - 1); };

  const handleComplete = () => {
    const profile: UserProfile = {
      email: formData.email, name: formData.name, sex: formData.sex as 'male' | 'female',
      age: parseInt(formData.age), weight: parseFloat(formData.weight), height: parseFloat(formData.height),
      activityLevel: formData.activityLevel as UserProfile['activityLevel'], goal: formData.goal as UserProfile['goal'],
      dietaryStyle: formData.dietaryStyle, mealPreferences: formData.mealPreferences,
      cookingStyles: formData.cookingStyles, allergies: formData.allergies,
      onboardingCompleted: true, createdAt: new Date().toISOString(),
    };
    onComplete(profile);
    setLocation('/');
  };

  const getMetrics = () => {
    if (!formData.sex || !formData.age || !formData.weight || !formData.height || !formData.activityLevel || !formData.goal) return null;
    return calculateMetrics({
      email: formData.email, name: formData.name, sex: formData.sex as 'male' | 'female',
      age: parseInt(formData.age), weight: parseFloat(formData.weight), height: parseFloat(formData.height),
      activityLevel: formData.activityLevel as UserProfile['activityLevel'], goal: formData.goal as UserProfile['goal'],
      dietaryStyle: formData.dietaryStyle, mealPreferences: formData.mealPreferences,
      cookingStyles: formData.cookingStyles, allergies: formData.allergies, onboardingCompleted: false, createdAt: '',
    });
  };

  const progress = ((step + 1) / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-[#0a1628] relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30" style={{ backgroundImage: 'url(/images/khora_onboarding.png)' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/70 via-[#0a1628]/90 to-[#0a1628]" />

      <div className="relative z-10 min-h-screen px-6 pt-12 pb-24">
        {/* Progress */}
        {!showResults && (
          <div className="mb-8">
            <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, #d4a574 0%, #2dd4bf 100%)' }} />
            </div>
            <p className="text-white/40 text-xs mt-2 text-center">Pasul {step + 1} din {totalSteps}</p>
          </div>
        )}

        <h1 className="sr-only">Bine ai venit la Khora - Nutriție vegană personalizată</h1>

        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div key={step} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
              {step === 0 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(212, 165, 116, 0.15)' }}>
                      <Mail className="w-8 h-8 text-[#d4a574]" />
                    </div>
                    <h2 className="text-2xl font-light text-white mb-2">Bine ai venit la Khora</h2>
                    <p className="text-white/60">Să începem cu datele tale de bază</p>
                  </div>
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">Numele tău</label>
                    <input type="text" value={formData.name} onChange={(e) => updateField('name', e.target.value)} placeholder="Introdu numele" className="w-full px-5 py-4 rounded-2xl text-white placeholder-white/30 outline-none" style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }} />
                  </div>
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">Adresa de email</label>
                    <input type="email" value={formData.email} onChange={(e) => updateField('email', e.target.value)} placeholder="email@exemplu.com" className="w-full px-5 py-4 rounded-2xl text-white placeholder-white/30 outline-none" style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }} />
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(139, 92, 246, 0.15)' }}><User className="w-8 h-8 text-purple-400" /></div>
                    <h2 className="text-2xl font-light text-white mb-2">Sexul tău</h2>
                    <p className="text-white/60">Pentru calculul metabolismului bazal</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[{ id: 'male', label: 'Masculin' }, { id: 'female', label: 'Feminin' }].map(option => (
                      <button key={option.id} onClick={() => updateField('sex', option.id)} className="p-6 rounded-2xl text-center" style={{ background: formData.sex === option.id ? 'rgba(212, 165, 116, 0.15)' : 'rgba(255, 255, 255, 0.04)', border: formData.sex === option.id ? '2px solid rgba(212, 165, 116, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)' }}>
                        <span className={`font-medium ${formData.sex === option.id ? 'text-[#d4a574]' : 'text-white/70'}`}>{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-light text-white mb-2">Câți ani ai?</h2>
                    <p className="text-white/60">Vârsta influențează necesarul caloric</p>
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <button onClick={() => updateField('age', String(Math.max(1, parseInt(formData.age || '25') - 1)))} className="w-14 h-14 rounded-full flex items-center justify-center text-2xl text-white" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>-</button>
                    <input type="number" value={formData.age} onChange={(e) => updateField('age', e.target.value)} placeholder="25" className="w-32 text-center text-5xl font-bold text-white bg-transparent outline-none" />
                    <button onClick={() => updateField('age', String(Math.min(120, parseInt(formData.age || '25') + 1)))} className="w-14 h-14 rounded-full flex items-center justify-center text-2xl text-white" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>+</button>
                  </div>
                  <p className="text-center text-white/40 text-sm">ani</p>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(34, 197, 94, 0.15)' }}><Scale className="w-8 h-8 text-green-400" /></div>
                    <h2 className="text-2xl font-light text-white mb-2">Măsurătorile tale</h2>
                    <p className="text-white/60">Pentru calcule precise</p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-white/70 text-sm mb-2 block">Greutate (kg)</label>
                      <input type="number" value={formData.weight} onChange={(e) => updateField('weight', e.target.value)} placeholder="70" className="w-full px-5 py-4 rounded-2xl text-white placeholder-white/30 outline-none" style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }} />
                    </div>
                    <div>
                      <label className="text-white/70 text-sm mb-2 block">Înălțime (cm)</label>
                      <input type="number" value={formData.height} onChange={(e) => updateField('height', e.target.value)} placeholder="175" className="w-full px-5 py-4 rounded-2xl text-white placeholder-white/30 outline-none" style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }} />
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(249, 115, 22, 0.15)' }}><Activity className="w-8 h-8 text-orange-400" /></div>
                    <h2 className="text-2xl font-light text-white mb-2">Nivelul de activitate</h2>
                  </div>
                  <div className="space-y-3">
                    {activityOptions.map(option => (
                      <button key={option.id} onClick={() => updateField('activityLevel', option.id)} className="w-full p-4 rounded-xl text-left" style={{ background: formData.activityLevel === option.id ? 'rgba(212, 165, 116, 0.15)' : 'rgba(255, 255, 255, 0.04)', border: formData.activityLevel === option.id ? '2px solid rgba(212, 165, 116, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)' }}>
                        <p className={`font-medium ${formData.activityLevel === option.id ? 'text-[#d4a574]' : 'text-white'}`}>{option.label}</p>
                        <p className="text-white/50 text-sm">{option.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(45, 212, 191, 0.15)' }}><Target className="w-8 h-8 text-[#2dd4bf]" /></div>
                    <h2 className="text-2xl font-light text-white mb-2">Obiectivul tău</h2>
                  </div>
                  <div className="space-y-3 mb-6">
                    {goalOptions.map(option => (
                      <button key={option.id} onClick={() => updateField('goal', option.id)} className="w-full p-4 rounded-xl text-left" style={{ background: formData.goal === option.id ? 'rgba(45, 212, 191, 0.15)' : 'rgba(255, 255, 255, 0.04)', border: formData.goal === option.id ? '2px solid rgba(45, 212, 191, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)' }}>
                        <p className={`font-medium ${formData.goal === option.id ? 'text-[#2dd4bf]' : 'text-white'}`}>{option.label}</p>
                        <p className="text-white/50 text-sm">{option.description}</p>
                      </button>
                    ))}
                  </div>
                  <div>
                    <label className="text-white/70 text-sm mb-3 block">Stil alimentar</label>
                    <div className="flex flex-wrap gap-2">
                      {dietaryStyles.map(diet => (
                        <button key={diet.id} onClick={() => updateField('dietaryStyle', diet.id)} className="px-4 py-2 rounded-xl text-sm" style={{ background: formData.dietaryStyle === diet.id ? 'rgba(212, 165, 116, 0.2)' : 'rgba(255, 255, 255, 0.04)', border: formData.dietaryStyle === diet.id ? '1px solid rgba(212, 165, 116, 0.5)' : '1px solid rgba(255, 255, 255, 0.08)', color: formData.dietaryStyle === diet.id ? '#d4a574' : 'rgba(255,255,255,0.6)' }}>
                          {diet.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 6 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(212, 165, 116, 0.15)' }}><Leaf className="w-8 h-8 text-[#d4a574]" /></div>
                    <h2 className="text-2xl font-light text-white mb-2">Stiluri de gătit preferate</h2>
                    <p className="text-white/60">Selectează cel puțin unul</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cookingStyles.map(style => (
                      <button key={style} onClick={() => toggleCookingStyle(style)} className="px-4 py-2 rounded-xl text-sm" style={{ background: formData.cookingStyles.includes(style) ? 'rgba(212, 165, 116, 0.2)' : 'rgba(255, 255, 255, 0.04)', border: formData.cookingStyles.includes(style) ? '1px solid rgba(212, 165, 116, 0.5)' : '1px solid rgba(255, 255, 255, 0.08)', color: formData.cookingStyles.includes(style) ? '#d4a574' : 'rgba(255,255,255,0.6)' }}>
                        {style}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div key="results" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(45, 212, 191, 0.15)' }}><Check className="w-8 h-8 text-[#2dd4bf]" /></div>
                <h2 className="text-2xl font-light text-white mb-2">Profilul tău</h2>
                <p className="text-white/60">Calculat pe baza datelor tale</p>
              </div>
              {getMetrics() && (
                <div className="p-5 rounded-2xl mb-6" style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 rounded-xl" style={{ background: 'rgba(212, 165, 116, 0.1)' }}><p className="text-2xl font-semibold text-[#d4a574]">{getMetrics()!.bmr}</p><p className="text-white/40 text-xs">BMR (kcal)</p></div>
                    <div className="text-center p-3 rounded-xl" style={{ background: 'rgba(45, 212, 191, 0.1)' }}><p className="text-2xl font-semibold text-[#2dd4bf]">{getMetrics()!.tdee}</p><p className="text-white/40 text-xs">TDEE (kcal)</p></div>
                    <div className="text-center p-3 rounded-xl" style={{ background: 'rgba(96, 165, 250, 0.1)' }}><p className="text-2xl font-semibold text-[#60a5fa]">{getMetrics()!.targetCalories}</p><p className="text-white/40 text-xs">Target (kcal)</p></div>
                    <div className="text-center p-3 rounded-xl" style={{ background: 'rgba(34, 197, 94, 0.1)' }}><p className="text-2xl font-semibold text-green-400">{(getMetrics()!.dailyWaterMl / 1000).toFixed(1)}L</p><p className="text-white/40 text-xs">Hidratare</p></div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                    <div className="flex justify-between text-sm"><span className="text-white/50">Proteine</span><span className="text-white">{getMetrics()!.proteinGrams}g</span></div>
                    <div className="flex justify-between text-sm"><span className="text-white/50">Fibre</span><span className="text-white">{getMetrics()!.fiberGrams}g</span></div>
                    <div className="flex justify-between text-sm"><span className="text-white/50">BMI</span><span className="text-white">{getMetrics()!.bmi}</span></div>
                  </div>
                </div>
              )}
              <p className="text-white/40 text-xs text-center">Formule: Mifflin-St Jeor, recomandări OMS</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="fixed bottom-8 left-6 right-6 flex gap-3">
          {(step > 0 || showResults) && (
            <button onClick={handleBack} className="flex-1 py-4 rounded-2xl font-medium flex items-center justify-center gap-2 text-white" style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
              <ArrowLeft className="w-5 h-5" />Înapoi
            </button>
          )}
          <button onClick={showResults ? handleComplete : handleNext} disabled={!showResults && !canProceed()} className="flex-1 py-4 rounded-2xl font-medium flex items-center justify-center gap-2 text-[#0a1628] disabled:opacity-50" style={{ background: 'linear-gradient(135deg, #d4a574 0%, #e8c9a8 100%)', boxShadow: '0 0 30px rgba(212, 165, 116, 0.3)' }}>
            {showResults ? "Începe" : "Continuă"}<ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
