/**
 * KHORA Onboarding - Optional, Simple
 * Saves data to localStorage for persistence
 */

import { useState } from "react";
import { useLocation, Link } from "wouter";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    weight: '',
    height: '',
    goal: 'maintain'
  });
  const [showResults, setShowResults] = useState(false);

  const totalSteps = 6;

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
    // Save to localStorage
    localStorage.setItem('khora_user_data', JSON.stringify(formData));
    setLocation('/');
  };

  const handleSkip = () => {
    // Skip onboarding - redirect to home
    setLocation('/');
  };

  const progress = ((step + 1) / totalSteps) * 100;

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-semibold text-gray-700 mb-2 block">Cum te numești?</span>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Exemplu: Ana"
                className="input"
              />
            </label>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-semibold text-gray-700 mb-2 block">Email</span>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="ana@exemplu.ro"
                className="input"
              />
              <p className="text-xs text-gray-500 mt-2">Vei primi email-ul de bun venit</p>
            </label>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-semibold text-gray-700 mb-2 block">Vârstă (ani)</span>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                placeholder="25"
                className="input"
              />
            </label>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-semibold text-gray-700 mb-2 block">Greutate (kg)</span>
              <input
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                placeholder="65"
                className="input"
              />
            </label>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-semibold text-gray-700 mb-2 block">Înălțime (cm)</span>
              <input
                type="number"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                placeholder="170"
                className="input"
              />
            </label>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-semibold text-gray-700 mb-2 block">Care este obiectivul tău?</span>
              <div className="space-y-2">
                {[
                  { id: 'lose', label: '📉 Vreau să slăbesc' },
                  { id: 'maintain', label: '⚖️ Vreau să mențin greutatea' },
                  { id: 'gain', label: '📈 Vreau să câștig masă musculară' }
                ].map((option) => (
                  <label key={option.id} className="flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer" style={{
                    borderColor: formData.goal === option.id ? '#16a34a' : '#e5e7eb',
                    backgroundColor: formData.goal === option.id ? '#f0fdf4' : 'white'
                  }}>
                    <input
                      type="radio"
                      name="goal"
                      value={option.id}
                      checked={formData.goal === option.id}
                      onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-900">{option.label}</span>
                  </label>
                ))}
              </div>
            </label>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {!showResults ? (
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center mb-8">
              <Link href="/landing">
                <a className="inline-flex items-center gap-2 mb-6 text-green-600 hover:text-green-700">
                  <ArrowLeft className="w-4 h-4" />
                  Înapoi
                </a>
              </Link>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Configurare Profil
              </h1>
              <p className="text-gray-600">Pasul {step + 1} din {totalSteps}</p>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Form */}
            <div className="bg-gray-50 p-6 rounded-lg">
              {renderStep()}
            </div>

            {/* Navigation */}
            <div className="flex gap-3">
              <button
                onClick={handleBack}
                disabled={step === 0}
                className="flex-1 btn btn-secondary disabled:opacity-50"
              >
                <ArrowLeft className="w-4 h-4" />
                Înapoi
              </button>
              <button
                onClick={handleNext}
                disabled={!formData[Object.keys(formData)[step] as keyof typeof formData]}
                className="flex-1 btn btn-primary disabled:opacity-50"
              >
                {step === totalSteps - 1 ? 'Rezultate' : 'Înainte'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Skip Option */}
            <div className="text-center">
              <button
                onClick={handleSkip}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Omite pentru acum
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Results */}
            <div className="text-center mb-8">
              <Check className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Gata!
              </h1>
              <p className="text-gray-600">Iată datele tale</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Nume:</span>
                <span className="font-semibold text-gray-900">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-semibold text-gray-900">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Vârstă:</span>
                <span className="font-semibold text-gray-900">{formData.age} ani</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Greutate:</span>
                <span className="font-semibold text-gray-900">{formData.weight} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Înălțime:</span>
                <span className="font-semibold text-gray-900">{formData.height} cm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Obiectiv:</span>
                <span className="font-semibold text-gray-900">
                  {formData.goal === 'lose' ? 'Slăbire' : formData.goal === 'gain' ? 'Câștig Masă' : 'Menținere'}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleBack}
                className="flex-1 btn btn-secondary"
              >
                Înapoi
              </button>
              <button
                onClick={handleComplete}
                className="flex-1 btn btn-primary"
              >
                Continuă
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
