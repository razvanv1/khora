import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Terms() {
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
          <h1 className="text-lg font-medium">Termeni și Condiții</h1>
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
            <h2 className="text-2xl font-semibold text-[#d4a574] mb-4">1. Informații Generale</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Khora este o aplicație web dedicată nutriției vegane holistice, dezvoltată și operată de 
              <strong> The Unlearning School</strong>, cu sediul în București, România.
            </p>
            <p className="text-white/80 leading-relaxed">
              Prin accesarea și utilizarea aplicației Khora, acceptați în mod expres acești Termeni și Condiții. 
              Dacă nu sunteți de acord cu oricare dintre prevederile de mai jos, vă rugăm să nu utilizați aplicația.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[#d4a574] mb-4">2. Definiții</h2>
            <ul className="text-white/80 space-y-2">
              <li><strong>"Aplicația"</strong> – platforma web Khora, accesibilă la adresa khora.manus.space</li>
              <li><strong>"Utilizator"</strong> – orice persoană care accesează sau utilizează Aplicația</li>
              <li><strong>"Conținut"</strong> – toate informațiile, rețetele, articolele și datele disponibile în Aplicație</li>
              <li><strong>"Operator"</strong> – The Unlearning School, reprezentată de Răzvan Vâlceanu</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[#d4a574] mb-4">3. Utilizarea Aplicației</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Khora oferă informații educative despre nutriția vegană, rețete, hidratare și suplimente. 
              Conținutul este furnizat exclusiv în scop informativ și nu constituie sfat medical, nutrițional 
              sau de altă natură profesională.
            </p>
            <p className="text-white/80 leading-relaxed">
              <strong>Atenție:</strong> Înainte de a face modificări semnificative în dietă sau de a lua suplimente, 
              consultați un medic sau un nutriționist autorizat.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[#d4a574] mb-4">4. Cont de Utilizator</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Pentru a accesa anumite funcționalități, este necesară crearea unui cont. Sunteți responsabil pentru:
            </p>
            <ul className="text-white/80 space-y-2">
              <li>Furnizarea de informații corecte și actualizate</li>
              <li>Păstrarea confidențialității datelor de autentificare</li>
              <li>Toate activitățile desfășurate prin contul dumneavoastră</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[#d4a574] mb-4">5. Proprietate Intelectuală</h2>
            <p className="text-white/80 leading-relaxed">
              Toate drepturile de proprietate intelectuală asupra Aplicației și Conținutului aparțin 
              The Unlearning School sau licențiatorilor săi. Este interzisă reproducerea, distribuirea 
              sau modificarea conținutului fără acordul scris prealabil.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[#d4a574] mb-4">6. Limitarea Răspunderii</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Aplicația este furnizată "așa cum este", fără garanții de niciun fel. Nu garantăm că:
            </p>
            <ul className="text-white/80 space-y-2">
              <li>Aplicația va funcționa neîntrerupt sau fără erori</li>
              <li>Informațiile sunt complete, exacte sau actualizate</li>
              <li>Rezultatele obținute vor fi cele dorite de utilizator</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[#d4a574] mb-4">7. Modificări ale Termenilor</h2>
            <p className="text-white/80 leading-relaxed">
              Ne rezervăm dreptul de a modifica acești Termeni în orice moment. Modificările vor fi 
              publicate pe această pagină cu data ultimei actualizări. Continuarea utilizării Aplicației 
              după publicarea modificărilor constituie acceptarea noilor Termeni.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[#d4a574] mb-4">8. Legislație Aplicabilă</h2>
            <p className="text-white/80 leading-relaxed">
              Acești Termeni sunt guvernați de legislația română. Orice litigiu va fi soluționat de 
              instanțele competente din București, România.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[#d4a574] mb-4">9. Contact</h2>
            <p className="text-white/80 leading-relaxed">
              Pentru întrebări sau nelămuriri referitoare la acești Termeni, ne puteți contacta la:
            </p>
            <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-white/80"><strong>The Unlearning School</strong></p>
              <p className="text-white/60">Email: hello@dezvatare.ro</p>
              <p className="text-white/60">Telefon: 0722 598 346</p>
              <p className="text-white/60">Adresă: 1, Aleea Pasărea în Văzduh, București, România</p>
            </div>
          </section>
        </motion.article>
      </main>
    </div>
  );
}
