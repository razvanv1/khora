/**
 * KHORA Home - Simple, Functional Dashboard
 * Clean FoodTech design with data persistence
 */

import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Leaf, Plus, LogOut, Settings, BookOpen, HelpCircle } from "lucide-react";
import Footer from "@/components/Footer";

interface UserData {
  name: string;
  email: string;
  weight: number;
  height: number;
  age: number;
  goal: string;
}

export default function Home() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<UserData | null>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    // Load user data from localStorage
    const saved = localStorage.getItem('khora_user_data');
    if (saved) {
      setUser(JSON.parse(saved));
    } else {
      // No user data - redirect to onboarding
      setLocation('/onboarding');
    }
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem('khora_user_data');
    setLocation('/landing');
  };

  const handleStartOnboarding = () => {
    setLocation('/onboarding');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-green-200 border-t-green-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Se încarcă...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="container-max py-4 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-amber-500 rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">KHORA</span>
            </a>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Bine ai venit, <strong>{user.name}</strong>!
            </span>
            <Link href="/settings">
              <a className="btn btn-ghost">
                <Settings className="w-5 h-5" />
              </a>
            </Link>
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="btn btn-ghost"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container-max py-12">
        <div className="max-w-4xl">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Bun venit la KHORA! 🌱
            </h1>
            <p className="text-lg text-gray-600">
              Aplicația ta personală pentru nutriție vegană. Urmărește ingrediente, generează rețete, monitorizează sănătatea.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="card">
              <div className="text-sm text-gray-600 mb-2">Vârstă</div>
              <div className="text-3xl font-bold text-gray-900">{user.age}</div>
              <div className="text-xs text-gray-500 mt-2">ani</div>
            </div>
            <div className="card">
              <div className="text-sm text-gray-600 mb-2">Greutate</div>
              <div className="text-3xl font-bold text-gray-900">{user.weight}</div>
              <div className="text-xs text-gray-500 mt-2">kg</div>
            </div>
            <div className="card">
              <div className="text-sm text-gray-600 mb-2">Obiectiv</div>
              <div className="text-xl font-bold text-green-600 capitalize">
                {user.goal === 'lose' ? 'Slăbire' : user.goal === 'gain' ? 'Câștig Masă' : 'Menținere'}
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Link href="/pantry">
              <a className="card card-hover group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition">
                    <Leaf className="w-6 h-6 text-green-600" />
                  </div>
                  <Plus className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Cămara Digitală
                </h3>
                <p className="text-gray-600 text-sm">
                  Urmărește 430+ ingrediente vegane cu date nutriționale complete.
                </p>
              </a>
            </Link>

            <Link href="/blender">
              <a className="card card-hover group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-200 transition">
                    <span className="text-xl">🍽️</span>
                  </div>
                  <Plus className="w-5 h-5 text-gray-400 group-hover:text-amber-600 transition" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Generator Rețete
                </h3>
                <p className="text-gray-600 text-sm">
                  Creează rețete personalizate pe baza ingredientelor tale.
                </p>
              </a>
            </Link>

            <Link href="/hydrate">
              <a className="card card-hover group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition">
                    <span className="text-xl">💧</span>
                  </div>
                  <Plus className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Hidratare
                </h3>
                <p className="text-gray-600 text-sm">
                  Monitorizează consumul zilnic de apă cu recomandări personalizate.
                </p>
              </a>
            </Link>

            <Link href="/supplements">
              <a className="card card-hover group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition">
                    <span className="text-xl">💊</span>
                  </div>
                  <Plus className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Suplimente
                </h3>
                <p className="text-gray-600 text-sm">
                  Gestionează vitaminele și mineralele esențiale pentru vegani.
                </p>
              </a>
            </Link>
          </div>

          {/* Info Links */}
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            <Link href="/blog">
              <a className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <BookOpen className="w-5 h-5 text-green-600" />
                <div>
                  <div className="font-semibold text-gray-900">Blog</div>
                  <div className="text-sm text-gray-600">Articole educative vegane</div>
                </div>
              </a>
            </Link>
            <Link href="/faq">
              <a className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <HelpCircle className="w-5 h-5 text-green-600" />
                <div>
                  <div className="font-semibold text-gray-900">FAQ</div>
                  <div className="text-sm text-gray-600">Întrebări frecvente</div>
                </div>
              </a>
            </Link>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-900">
            <strong>⚠️ Disclaimer:</strong> Recomandările din Khora sunt orientative și nu înlocuiesc consultul cu un profesionist de sănătate. Consultă întotdeauna cu un medic înainte de a face schimbări semnificative în dietă.
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Ești sigur că vrei să te deconectezi?
            </h3>
            <p className="text-gray-600 mb-6">
              Datele tale vor rămâne salvate în browser. Poți să te conectezi din nou oricând.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 btn btn-secondary"
              >
                Anulare
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 btn btn-primary"
              >
                Deconectare
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
