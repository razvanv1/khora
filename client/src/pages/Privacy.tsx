import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Privacy() {
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
          <h1 className="text-lg font-medium">Politica de Confidențialitate</h1>
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
            <h2 className="text-2xl font-semibold text-[#d4a574] mb-4">1. Introducere</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              The Unlearning School respectă confidențialitatea datelor dumneavoastră personale și se angajează 
              să le protejeze în conformitate cu Regulamentul General privind Protecția Datelor (GDPR) – 
              Regulamentul (UE) 2016/679.
            </p>
            <p className="text-white/80 leading-relaxed">
              Această politică explică ce date colectăm, cum le folosim și drepturile pe care le aveți 
              în legătură cu datele dumneavoastră personale.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[#d4a574] mb-4">2. Operatorul de Date</h2>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-white/80"><strong>The Unlearning School</strong></p>
              <p className="text-white/60">Reprezentant: Răzvan Vâlceanu</p>
              <p className="text-white/60">Adresă: 1, Aleea Pasărea în Văzduh, București, România</p>
              <p className="text-white/60">Email: hello@dezvatare.ro</p>
              <p className="text-white/60">Telefon: 0722 598 346</p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[#d4a574] mb-4">3. Datele pe Care le Colectăm</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Colectăm următoarele categorii de date personale:
            </p>
            <ul className="text-white/80 space-y-3">
              <li>
                <strong>Date de identificare:</strong> nume, adresă de email
              </li>
              <li>
                <strong>Date de profil nutrițional:</strong> vârstă, sex, greutate, înălțime, nivel de activitate, 
                preferințe alimentare, alergii (furnizate voluntar în procesul de onboarding)
              </li>
              <li>
                <strong>Date de utilizare:</strong> ingrediente selectate, rețete vizualizate, progres hidratare
              </li>
              <li>
                <strong>Date tehnice:</strong> adresă IP, tip browser, dispozitiv utilizat
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[#d4a574] mb-4">4. Scopurile Prelucrării</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Folosim datele dumneavoastră pentru:
            </p>
            <ul className="text-white/80 space-y-2">
              <li>Personalizarea experienței în aplicație (recomandări nutriționale, target calorii/hidratare)</li>
              <li>Furnizarea serviciilor solicitate (generare rețete, tracking progres)</li>
              <li>Comunicări despre actualizări și conținut educativ (cu consimțământul dumneavoastră)</li>
              <li>Îmbunătățirea aplicației pe baza analizei agregate a utilizării</li>
              <li>Respectarea obligațiilor legale</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[#d4a574] mb-4">5. Temeiul Legal</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Prelucrăm datele dumneavoastră pe baza:
            </p>
            <ul className="text-white/80 space-y-2">
              <li><strong>Consimțământului</strong> – pentru comunicări de marketing și date de profil opționale</li>
              <li><strong>Executării contractului</strong> – pentru furnizarea serviciilor aplicației</li>
              <li><strong>Interesului legitim</strong> – pentru îmbunătățirea serviciilor și securitate</li>
              <li><strong>Obligației legale</strong> – pentru conformitate cu legislația aplicabilă</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[#d4a574] mb-4">6. Drepturile Dumneavoastră (GDPR)</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Conform GDPR, aveți următoarele drepturi:
            </p>
            <ul className="text-white/80 space-y-3">
              <li><strong>Dreptul de acces</strong> – să solicitați o copie a datelor personale</li>
              <li><strong>Dreptul la rectificare</strong> – să corectați datele inexacte</li>
              <li><strong>Dreptul la ștergere</strong> – să solicitați ștergerea datelor ("dreptul de a fi uitat")</li>
              <li><strong>Dreptul la restricționare</strong> – să limitați prelucrarea datelor</li>
              <li><strong>Dreptul la portabilitate</strong> – să primiți datele într-un format structurat</li>
              <li><strong>Dreptul de opoziție</strong> – să vă opuneți prelucrării în anumite situații</li>
              <li><strong>Dreptul de retragere a consimțământului</strong> – în orice moment, fără a afecta legalitatea prelucrării anterioare</li>
            </ul>
            <p className="text-white/80 leading-relaxed mt-4">
              Pentru a vă exercita drepturile, contactați-ne la <strong>hello@dezvatare.ro</strong>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[#d4a574] mb-4">7. Păstrarea Datelor</h2>
            <p className="text-white/80 leading-relaxed">
              Păstrăm datele dumneavoastră atât timp cât aveți un cont activ sau cât este necesar pentru 
              a vă furniza serviciile. După ștergerea contului, datele vor fi eliminate în termen de 30 de zile, 
              cu excepția cazurilor în care legea impune păstrarea lor pentru o perioadă mai lungă.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[#d4a574] mb-4">8. Securitatea Datelor</h2>
            <p className="text-white/80 leading-relaxed">
              Implementăm măsuri tehnice și organizatorice adecvate pentru a proteja datele dumneavoastră 
              împotriva accesului neautorizat, pierderii sau distrugerii. Acestea includ criptarea datelor 
              în tranzit și în repaus, autentificarea securizată și monitorizarea accesului.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[#d4a574] mb-4">9. Transferuri Internaționale</h2>
            <p className="text-white/80 leading-relaxed">
              Datele dumneavoastră sunt stocate pe servere situate în Uniunea Europeană. În cazul în care 
              este necesar un transfer în afara UE, vom asigura garanții adecvate conform GDPR.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[#d4a574] mb-4">10. Plângeri</h2>
            <p className="text-white/80 leading-relaxed">
              Dacă considerați că drepturile dumneavoastră au fost încălcate, aveți dreptul să depuneți 
              o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP):
            </p>
            <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-white/60">Website: www.dataprotection.ro</p>
              <p className="text-white/60">Email: anspdcp@dataprotection.ro</p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[#d4a574] mb-4">11. Contact</h2>
            <p className="text-white/80 leading-relaxed">
              Pentru orice întrebări legate de această politică sau de datele dumneavoastră personale:
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
