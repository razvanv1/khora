import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Mail, Phone, MapPin, Linkedin, Instagram, MessageCircle, Send } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with backend
    setSubmitted(true);
  };

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
          <h1 className="text-lg font-medium">Contact</h1>
        </div>
      </header>

      {/* Content */}
      <main className="px-6 py-12 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-light mb-4">Hai să vorbim</h1>
            <p className="text-white/60 max-w-lg mx-auto">
              Ai o întrebare, o sugestie sau vrei să ne spui cum putem îmbunătăți Khora? 
              Suntem aici să ascultăm.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h2 className="text-xl font-medium mb-6 text-[#d4a574]">The Unlearning School</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#d4a574]/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-[#d4a574]" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Email</p>
                      <a href="mailto:hello@dezvatare.ro" className="text-white hover:text-[#d4a574] transition-colors">
                        hello@dezvatare.ro
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#2dd4bf]/20 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-[#2dd4bf]" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Telefon</p>
                      <a href="tel:+40722598346" className="text-white hover:text-[#2dd4bf] transition-colors">
                        0722 598 346
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#60a5fa]/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#60a5fa]" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Adresă</p>
                      <p className="text-white">
                        1, Aleea Pasărea în Văzduh<br />
                        București, România
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-lg font-medium mb-4">Urmărește-ne</h3>
                <div className="flex gap-3">
                  <a 
                    href="https://linkedin.com/company/theunlearningschool" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://instagram.com/theunlearningschool" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://wa.me/40722598346" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* About Founder */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#d4a574]/10 to-transparent border border-[#d4a574]/20">
                <h3 className="text-lg font-medium mb-2">Despre Fondator</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  <strong className="text-white">Răzvan Vâlceanu</strong> – antreprenor în comportamentul schimbării și unlearning, 
                  trainer certificat și instructor de yoga certificat. Fondator al The Unlearning School, 
                  o platformă dedicată dezvățării și transformării personale.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-[#2dd4bf]/20 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-[#2dd4bf]" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Mesaj trimis!</h3>
                  <p className="text-white/60">
                    Îți mulțumim pentru mesaj. Te vom contacta în cel mai scurt timp.
                  </p>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-xl font-medium mb-6">Trimite-ne un mesaj</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Nume</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#d4a574] focus:outline-none transition-colors"
                        placeholder="Numele tău"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-white/60 mb-2">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#d4a574] focus:outline-none transition-colors"
                        placeholder="email@exemplu.ro"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-white/60 mb-2">Telefon (opțional)</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#d4a574] focus:outline-none transition-colors"
                        placeholder="07XX XXX XXX"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-white/60 mb-2">Mesaj</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#d4a574] focus:outline-none transition-colors resize-none"
                        placeholder="Scrie-ne aici..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-[#d4a574] text-[#0a1628] font-medium hover:bg-[#c49464] transition-colors flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Trimite mesajul
                    </button>

                    <p className="text-white/60 text-xs text-center">
                      Prin trimiterea acestui formular, accepți{' '}
                      <Link href="/privacy" className="text-[#d4a574] hover:underline">
                        Politica de Confidențialitate
                      </Link>
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* CTA Share */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#2dd4bf]/10 to-[#d4a574]/10 border border-white/10 text-center"
          >
            <h3 className="text-xl font-medium mb-2">Îți place Khora?</h3>
            <p className="text-white/60 mb-4">
              Ajută-ne să ajungem la mai mulți oameni care vor să mănânce sănătos.
            </p>
            <div className="flex justify-center gap-3">
              <button 
                onClick={() => {
                  navigator.share?.({
                    title: 'Khora - Nutriție Vegană Holistică',
                    text: 'Descoperă Khora, aplicația care te ajută să mănânci vegan și sănătos.',
                    url: window.location.origin
                  });
                }}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Distribuie Khora
              </button>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
