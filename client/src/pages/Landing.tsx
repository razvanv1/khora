/**
 * KHORA Landing Page - FoodTech Clean Design
 * Clear value proposition, simple navigation
 */

import { useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  Leaf, 
  Zap, 
  Heart, 
  Users, 
  ArrowRight, 
  Check,
  Menu,
  X,
  Globe
} from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/i18n";

export default function Landing() {
  const [, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, language } = useLanguage();

  const features = [
    {
      icon: Leaf,
      title: language === 'en' ? 'Smart Pantry' : 'Cămara Inteligentă',
      description: language === 'en' 
        ? 'Track 430+ vegan ingredients with nutritional data' 
        : 'Urmărește 430+ ingrediente vegane cu date nutriționale complete'
    },
    {
      icon: Zap,
      title: language === 'en' ? 'Recipe Generator' : 'Generator Rețete',
      description: language === 'en'
        ? 'Create personalized recipes based on your ingredients'
        : 'Creează rețete personalizate pe baza ingredientelor tale'
    },
    {
      icon: Heart,
      title: language === 'en' ? 'Health Tracking' : 'Urmărire Sănătate',
      description: language === 'en'
        ? 'Monitor hydration, supplements, and nutrition goals'
        : 'Monitorizează hidratare, suplimente și obiective nutriționale'
    },
    {
      icon: Users,
      title: language === 'en' ? 'Community' : 'Comunitate',
      description: language === 'en'
        ? 'Learn from vegan nutrition experts and peers'
        : 'Învață de la experți și alți utilizatori vegani'
    }
  ];

  const benefits = [
    language === 'en' ? 'Free forever' : 'Gratuit pentru totdeauna',
    language === 'en' ? 'No ads' : 'Fără reclame',
    language === 'en' ? 'Your data stays private' : 'Datele tale rămân private',
    language === 'en' ? 'Works offline' : 'Funcționează offline',
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container-max py-4 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-amber-500 rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">KHORA</span>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition">
              {language === 'en' ? 'Features' : 'Caracteristici'}
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition">
              {language === 'en' ? 'How it works' : 'Cum funcționează'}
            </a>
            <a href="#faq" className="text-gray-600 hover:text-gray-900 transition">
              FAQ
            </a>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <button
                onClick={() => setLocation('/onboarding')}
                className="btn btn-primary"
              >
                {language === 'en' ? 'Get Started' : 'Începe Acum'}
              </button>
            </div>
          </nav>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-4">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <nav className="container-max py-4 space-y-3">
              <a href="#features" className="block text-gray-600 hover:text-gray-900">
                {language === 'en' ? 'Features' : 'Caracteristici'}
              </a>
              <a href="#how-it-works" className="block text-gray-600 hover:text-gray-900">
                {language === 'en' ? 'How it works' : 'Cum funcționează'}
              </a>
              <a href="#faq" className="block text-gray-600 hover:text-gray-900">
                FAQ
              </a>
              <button
                onClick={() => {
                  setLocation('/onboarding');
                  setMobileMenuOpen(false);
                }}
                className="w-full btn btn-primary mt-4"
              >
                {language === 'en' ? 'Get Started' : 'Începe Acum'}
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="container-max py-20 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {language === 'en' 
              ? 'Your Personal Vegan Nutrition Companion'
              : 'Asistentul Tău Personal de Nutriție Vegană'}
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {language === 'en'
              ? 'Track ingredients, generate recipes, monitor hydration, and optimize your vegan nutrition. All free, all private, all in one place.'
              : 'Urmărește ingrediente, generează rețete, monitorizează hidratare și optimizează nutriția vegană. Totul gratuit, privat și într-un singur loc.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setLocation('/onboarding')}
              className="btn btn-primary px-8 py-3 text-lg"
            >
              {language === 'en' ? 'Start Free' : 'Începe Gratuit'}
              <ArrowRight className="w-5 h-5" />
            </button>
            <Link href="/blog">
              <a className="btn btn-outline px-8 py-3 text-lg">
                {language === 'en' ? 'Learn More' : 'Află Mai Mult'}
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-20">
        <div className="container-max">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'en' ? 'Everything You Need' : 'Tot Ce Ai Nevoie'}
          </h2>
          <p className="text-gray-600 mb-16 max-w-2xl">
            {language === 'en'
              ? 'A complete toolkit for vegan nutrition optimization'
              : 'Un set complet de instrumente pentru optimizarea nutriției vegane'}
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="card card-hover">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container-max py-20">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          {language === 'en' ? 'Why Choose Khora?' : 'De Ce Alege Khora?'}
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl">
          {language === 'en'
            ? 'Built for real people, with real values'
            : 'Construit pentru oameni adevărați, cu valori adevărate'}
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="text-gray-900 font-medium">{benefit}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-gray-50 py-20">
        <div className="container-max">
          <h2 className="text-4xl font-bold text-gray-900 mb-16">
            {language === 'en' ? 'How It Works' : 'Cum Funcționează'}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: language === 'en' ? 'Sign Up' : 'Înregistrare',
                description: language === 'en'
                  ? 'Create your free account in seconds'
                  : 'Creează-ți contul gratuit în secunde'
              },
              {
                step: '2',
                title: language === 'en' ? 'Add Ingredients' : 'Adaugă Ingrediente',
                description: language === 'en'
                  ? 'Track what you have in your kitchen'
                  : 'Urmărește ce ai în bucătărie'
              },
              {
                step: '3',
                title: language === 'en' ? 'Get Recipes' : 'Primește Rețete',
                description: language === 'en'
                  ? 'Generate personalized vegan recipes'
                  : 'Generează rețete vegane personalizate'
              }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-max py-20">
        <div className="bg-gradient-to-r from-green-600 to-amber-500 rounded-2xl p-12 md:p-16 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            {language === 'en'
              ? 'Ready to Transform Your Nutrition?'
              : 'Gata să-ți Transformi Nutriția?'}
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            {language === 'en'
              ? 'Join thousands of vegans optimizing their health with Khora'
              : 'Alătură-te miilor de vegani care-și optimizează sănătatea cu Khora'}
          </p>
          <button
            onClick={() => setLocation('/onboarding')}
            className="btn bg-white text-green-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
          >
            {language === 'en' ? 'Get Started Free' : 'Începe Gratuit'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="container-max">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-5 h-5 text-green-400" />
                <span className="font-bold text-lg">KHORA</span>
              </div>
              <p className="text-gray-400 text-sm">
                {language === 'en'
                  ? 'Vegan nutrition, simplified'
                  : 'Nutriție vegană, simplificată'}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{language === 'en' ? 'Product' : 'Produs'}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#features" className="hover:text-white transition">{language === 'en' ? 'Features' : 'Caracteristici'}</a></li>
                <li><Link href="/blog"><a className="hover:text-white transition">Blog</a></Link></li>
                <li><Link href="/faq"><a className="hover:text-white transition">FAQ</a></Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{language === 'en' ? 'Legal' : 'Legal'}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/privacy"><a className="hover:text-white transition">{language === 'en' ? 'Privacy' : 'Confidențialitate'}</a></Link></li>
                <li><Link href="/terms"><a className="hover:text-white transition">{language === 'en' ? 'Terms' : 'Termeni'}</a></Link></li>
                <li><Link href="/contact"><a className="hover:text-white transition">{language === 'en' ? 'Contact' : 'Contact'}</a></Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{language === 'en' ? 'Follow' : 'Urmărește'}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="https://facebook.com/dezvatare" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Facebook</a></li>
                <li><a href="https://instagram.com/dezvatare" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Instagram</a></li>
                <li><a href="mailto:hello@dezvatare.ro" className="hover:text-white transition">Email</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2026 Khora. {language === 'en' ? 'All rights reserved.' : 'Toate drepturile rezervate.'}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
