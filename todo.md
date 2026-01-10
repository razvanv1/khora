## Legal & Footer GDPR
- [x] Elimina minciunile din Landing Page (mii de vegani, etc.)
- [x] Înlocuiește cu date reale din app (teasing, nu fake stats)
- [x] Adaugă date contact The Unlearning School
- [x] Adaugă date contact Răzvan Vâlceanu
- [x] Crează pagina Termeni și Condiții
- [x] Crează pagina Politica de Confidențialitate (GDPR)
- [x] Crează pagina Cookie Policy
- [x] Crează pagina Contact
- [x] Footer complet legal pentru UE
- [x] CTA-uri de viralizare (share socials)
- [x] Încurajare feedback/propuneri de la utilizatori


## Email System & Cămară - Prioritar
- [x] Implementare email funcțional la înregistrare user (welcome email)
- [x] Implementare notificare email admin când user nou se înregistrează
- [x] Populare Cămară cu toate 500+ ingrediente din lista originală (430+ ingrediente adăugate)
- [x] Filtre avansate: grăsimi, fibre, proteine, superaliment, calorii, etc.
- [x] Schema.org markup pentru rețete și articole blog


## Sistem Favorite Rețete
- [x] Hook useFavoriteRecipes pentru gestionarea favoritelor cu localStorage
- [x] Actualizare pagina Recipes cu buton favorite funcțional
- [x] Creare pagină dedicată pentru rețete favorite
- [x] Integrare în navigație (rută /recipes/favorites)


## Actualizare Descriere Fondator
- [x] Actualizare bio Răzvan: antreprenor în comportamentul schimbării și unlearning, trainer certificat, instructor yoga certificat
- [x] Eliminare referință Bitdefender


## SEO Fix - Home Page
- [x] Adăugare H1 heading pe pagina principală (/) - existentă cu sr-only text
- [x] Adăugare H2 headings pe pagina principală (/) - existentă


## SEO Tehnic & Performanță
- [x] Creare sitemap.xml pentru indexare Google
- [x] Creare robots.txt pentru crawlere
- [x] Optimizare meta tags (title, description, og:tags)
- [x] Implementare lazy loading pentru imagini (component LazyImage)
- [x] Adăugare preconnect/prefetch pentru resurse externe
- [x] Optimizare Core Web Vitals (LCP, FID, CLS) - build chunks, preload hero


## Bilingv & Social Media
- [x] Generare imagine OG 1200x630px pentru social media
- [x] Implementare sistem i18n bilingv RO/EN
- [x] Switch de limbă în UI (LanguageSwitcher component)


## Sistem Feedback & Rating Suplimente
- [x] Componenta StarRating pentru evaluare
- [x] Modal feedback cu rating și comentariu
- [x] Persistență în localStorage
- [x] Afișare rating per supliment


## URGENT - Email & Admin Panel
- [x] Fix sistem email - notificări prin Forge API
- [x] Fix sistem email - admin primește notificări
- [x] Panou admin cu autentificare (existentă la /admin)
- [x] Dashboard admin: statistici useri
- [x] Dashboard admin: lista contacte/emailuri
- [x] Credențiale admin documentate (ADMIN_ACCESS.md)


## Share Suplimente Social Media
- [x] Componentă ShareButton cu opțiuni Facebook, Twitter, WhatsApp, LinkedIn, Copy Link
- [x] Integrare în pagina Supplements
- [x] Preview image pentru share (foloseste OG image global)


## FAQ Section SEO/GEO
- [x] Creare pagină FAQ dedicată (/faq)
- [x] Schema.org FAQPage extins (15 întrebări)
- [x] Întrebări relevante pentru nutriție vegană România
- [x] Categorii: Nutriție Vegană, Suplimente, Hidratare, Rețete, Aplicație
- [x] Căutare și filtrare FAQ


## Link FAQ în Navigare
- [x] Adăugare link FAQ în Navigation (icon HelpCircle)
- [x] Adăugare link FAQ în Footer (secțiunea Resurse)


## URGENT BUGS
- [x] Fix NaN în calculatorul de energie zilnică și fibre (validare + fallback)
- [x] Fix notificări la înregistrare user nou (apel server la saveProfile)


## Articole Evergreen SEO/GEO/AEO
- [x] Articol: "Ghid Complet Nutriție Vegană România 2026" (2500 cuvinte, 5 FAQ)
- [x] Articol: "Vitamina B12 pentru Vegani - Ghid Complet" (2200 cuvinte, 5 FAQ)
- [x] Articol: "Proteine Vegetale Complete - Surse și Combinații" (2000 cuvinte, 5 FAQ)
- [x] FAQ section în fiecare articol (People Also Ask optimizat)
- [x] Sitemap.xml actualizat cu articolele noi
- [x] Schema.org FAQPage markup în BlogArticle (JSON-LD + microdata)


## URL Update & Lighthouse Fixes
- [x] Actualizare toate URL-urile la https://khora.manus.space
- [x] OG image URL corect pentru share social media
- [ ] Fix performanță: optimizare imagini
- [ ] Fix performanță: reducere JavaScript
- [x] Fix accesibilitate: link-uri fără nume (adăugat aria-label)
- [ ] Fix best practices: API-uri depreciate


## Performance & Accessibility Fixes
- [x] Conversie imagini PNG la WebP (13 imagini)
- [x] Compresie imagini (reducere de la ~70MB la ~2.3MB)
- [x] Lazy loading pentru pagini (React.lazy + Suspense)
- [x] Code splitting pentru JavaScript (manual chunks in vite.config)
- [x] Fix contrast culori (text-white/30,40 -> text-white/60)


## BUG FIX - Traduceri EN
- [x] Fix Landing.tsx să folosească traducerile i18n (hero, filosofie, unlearning, CTA)
- [x] Traduceri complete RO/EN pentru toate secțiunile Landing
