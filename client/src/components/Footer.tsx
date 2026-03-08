/**
 * KHORA Footer Component
 * Shared footer for all internal pages (Home, Pantry, Recipes, etc.)
 * Includes links to public pages, legal, and social media
 */

import { Link } from "wouter";
import { 
  Mail, 
  MapPin, 
  Phone, 
  Facebook, 
  Instagram, 
  Linkedin,
  HelpCircle,
  BookOpen,
  FileText,
  Shield,
  Cookie
} from "lucide-react";
import { useLanguage } from "@/i18n";

export default function Footer() {
  const { t, language } = useLanguage();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a1628]/80 backdrop-blur-md border-t border-white/10 mt-16 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand & About */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-light tracking-wider mb-2">
                <span className="text-[#2dd4bf]">KH</span>
                <span className="text-white">ORA</span>
              </h3>
              <p className="text-white/60 text-sm">
                {language === 'en' 
                  ? 'Premium vegan nutrition app with spatial computing interface'
                  : 'Aplicație premium de nutriție vegană cu interfață de spatial computing'}
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-white font-medium text-sm uppercase tracking-wider">
              {language === 'en' ? 'Navigation' : 'Navigare'}
            </h4>
            <nav className="space-y-2">
              <Link href="/landing">
                <a className="text-white/60 hover:text-white/90 text-sm transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#2dd4bf] rounded-full" />
                  {language === 'en' ? 'Home' : 'Acasă'}
                </a>
              </Link>
              <Link href="/blog">
                <a className="text-white/60 hover:text-white/90 text-sm transition-colors flex items-center gap-2">
                  <BookOpen className="w-3 h-3" />
                  {language === 'en' ? 'Blog' : 'Blog'}
                </a>
              </Link>
              <Link href="/faq">
                <a className="text-white/60 hover:text-white/90 text-sm transition-colors flex items-center gap-2">
                  <HelpCircle className="w-3 h-3" />
                  {language === 'en' ? 'FAQ' : 'FAQ'}
                </a>
              </Link>
              <Link href="/contact">
                <a className="text-white/60 hover:text-white/90 text-sm transition-colors flex items-center gap-2">
                  <Mail className="w-3 h-3" />
                  {language === 'en' ? 'Contact' : 'Contact'}
                </a>
              </Link>
            </nav>
          </div>

          {/* Legal & Resources */}
          <div className="space-y-3">
            <h4 className="text-white font-medium text-sm uppercase tracking-wider">
              {language === 'en' ? 'Legal' : 'Legal'}
            </h4>
            <nav className="space-y-2">
              <Link href="/privacy">
                <a className="text-white/60 hover:text-white/90 text-sm transition-colors flex items-center gap-2">
                  <Shield className="w-3 h-3" />
                  {language === 'en' ? 'Privacy Policy' : 'Politica de Confidențialitate'}
                </a>
              </Link>
              <Link href="/terms">
                <a className="text-white/60 hover:text-white/90 text-sm transition-colors flex items-center gap-2">
                  <FileText className="w-3 h-3" />
                  {language === 'en' ? 'Terms & Conditions' : 'Termeni și Condiții'}
                </a>
              </Link>
              <Link href="/cookies">
                <a className="text-white/60 hover:text-white/90 text-sm transition-colors flex items-center gap-2">
                  <Cookie className="w-3 h-3" />
                  {language === 'en' ? 'Cookie Policy' : 'Politica de Cookie'}
                </a>
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h4 className="text-white font-medium text-sm uppercase tracking-wider">
              {language === 'en' ? 'Contact' : 'Contact'}
            </h4>
            <div className="space-y-2">
              <a 
                href="mailto:hello@dezvatare.ro"
                className="text-white/60 hover:text-white/90 text-sm transition-colors flex items-center gap-2"
              >
                <Mail className="w-3 h-3" />
                hello@dezvatare.ro
              </a>
              <p className="text-white/60 text-sm flex items-center gap-2">
                <MapPin className="w-3 h-3" />
                {language === 'en' ? 'Romania' : 'România'}
              </p>
              <div className="flex gap-3 pt-2">
                <a 
                  href="https://facebook.com/dezvatare" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-[#2dd4bf] transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href="https://instagram.com/dezvatare" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-[#2dd4bf] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="https://linkedin.com/company/dezvatare" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-[#2dd4bf] transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/50">
          <p>
            © {currentYear} {language === 'en' ? 'Khora - Vegan Nutrition' : 'Khora - Nutriție Vegană'}. {language === 'en' ? 'All rights reserved.' : 'Toate drepturile rezervate.'}
          </p>
          <p className="mt-4 md:mt-0">
            {language === 'en' 
              ? 'Made with 🌱 by The Unlearning School'
              : 'Creat cu 🌱 de The Unlearning School'}
          </p>
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
          <p className="text-xs text-white/50">
            {language === 'en'
              ? '⚕️ Medical Disclaimer: The information provided by Khora is for educational purposes only and should not be considered as medical advice. Always consult with a qualified healthcare professional before making significant dietary changes.'
              : '⚕️ Disclaimer Medical: Informațiile furnizate de Khora sunt doar în scop educativ și nu trebuie considerate sfaturi medicale. Consultați întotdeauna cu un profesionist de sănătate calificat înainte de a face schimbări semnificative în dietă.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
