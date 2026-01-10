import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Cookies() {
  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 px-6 py-4" style={{
        background: 'rgba(10, 22, 40, 0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link href="/">
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <h1 className="text-lg font-medium">Politica de Cookie-uri</h1>
        </div>
      </header>

      {/* Content */}
      <main className="px-6 py-12 max-w-4xl mx-auto">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-invert prose-lg max-w-none"
        >
          <p className="text-white/60 text-sm mb-8">Ultima actualizare: 10 Ianuarie 2026</p>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[#d4a574] mb-4">1. Ce Sunt Cookie-urile?</h2>
            <p className="text-white/80 leading-relaxed">
              Cookie-urile sunt fișiere text de mici dimensiuni stocate pe dispozitivul dumneavoastră 
              atunci când vizitați un site web. Acestea permit site-ului să vă recunoască și să 
              rețină informații despre vizita dumneavoastră, cum ar fi preferințele sau starea de autentificare.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[#d4a574] mb-4">2. Tipuri de Cookie-uri Utilizate</h2>
            
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-lg font-medium text-white mb-2">Cookie-uri Esențiale</h3>
                <p className="text-white/60 text-sm mb-2">Necesare pentru funcționarea aplicației</p>
                <ul className="text-white/80 text-sm space-y-1">
                  <li>Autentificare și sesiune utilizator</li>
                  <li>Preferințe de confidențialitate (consimțământ cookie)</li>
                  <li>Securitate și prevenirea fraudei</li>
                </ul>
                <p className="text-[#2dd4bf] text-sm mt-2">Nu pot fi dezactivate</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-lg font-medium text-white mb-2">Cookie-uri Funcționale</h3>
                <p className="text-white/60 text-sm mb-2">Îmbunătățesc experiența de utilizare</p>
                <ul className="text-white/80 text-sm space-y-1">
                  <li>Salvarea preferințelor (limbă, temă)</li>
                  <li>Memorarea ingredientelor selectate</li>
                  <li>Progresul în onboarding</li>
                </ul>
                <p className="text-[#d4a574] text-sm mt-2">Pot fi dezactivate</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-lg font-medium text-white mb-2">Cookie-uri Analitice</h3>
                <p className="text-white/60 text-sm mb-2">Ne ajută să înțelegem cum este folosită aplicația</p>
                <ul className="text-white/80 text-sm space-y-1">
                  <li>Număr de vizitatori și pagini vizualizate</li>
                  <li>Sursa traficului</li>
                  <li>Timp petrecut în aplicație</li>
                </ul>
                <p className="text-[#d4a574] text-sm mt-2">Pot fi dezactivate</p>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[#d4a574] mb-4">3. Durata de Stocare</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 text-white/60">Tip Cookie</th>
                  <th className="text-left py-3 text-white/60">Durată</th>
                </tr>
              </thead>
              <tbody className="text-white/80">
                <tr className="border-b border-white/5">
                  <td className="py-3">Sesiune</td>
                  <td className="py-3">Până la închiderea browserului</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3">Autentificare</td>
                  <td className="py-3">30 de zile</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3">Preferințe</td>
                  <td className="py-3">1 an</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3">Analitice</td>
                  <td className="py-3">2 ani</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[#d4a574] mb-4">4. Gestionarea Cookie-urilor</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Puteți gestiona preferințele pentru cookie-uri în mai multe moduri:
            </p>
            <ul className="text-white/80 space-y-2">
              <li><strong>Banner de consimțământ:</strong> La prima vizită, puteți alege ce tipuri de cookie-uri acceptați</li>
              <li><strong>Setările browserului:</strong> Puteți configura browserul să blocheze sau să șteargă cookie-urile</li>
              <li><strong>Ștergere manuală:</strong> Puteți șterge cookie-urile din setările browserului în orice moment</li>
            </ul>
            <p className="text-white/60 text-sm mt-4">
              Notă: Dezactivarea anumitor cookie-uri poate afecta funcționalitatea aplicației.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[#d4a574] mb-4">5. Cookie-uri Terțe</h2>
            <p className="text-white/80 leading-relaxed">
              Nu utilizăm cookie-uri de la terți pentru publicitate. Singurele servicii terțe care pot 
              plasa cookie-uri sunt cele de analiză (pentru înțelegerea utilizării aplicației) și 
              autentificare OAuth (pentru login securizat).
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[#d4a574] mb-4">6. Actualizări</h2>
            <p className="text-white/80 leading-relaxed">
              Această politică poate fi actualizată periodic. Vă vom notifica despre modificări 
              semnificative prin afișarea unui banner în aplicație.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[#d4a574] mb-4">7. Contact</h2>
            <p className="text-white/80 leading-relaxed">
              Pentru întrebări despre cookie-uri:
            </p>
            <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-white/80"><strong>The Unlearning School</strong></p>
              <p className="text-white/60">Email: hello@dezvatare.ro</p>
            </div>
          </section>
        </motion.article>
      </main>
    </div>
  );
}
