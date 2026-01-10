# Khora Admin Access

## Acces Admin Dashboard

**URL:** `/admin`

### Cine are acces?
- **Owner-ul proiectului** (tu, Răzvan) - autentificat automat prin Manus OAuth
- Rolul `admin` este atribuit automat owner-ului proiectului

### Cum accesezi?
1. Navighează la `https://[domeniul-tau]/admin`
2. Dacă nu ești autentificat, vei fi redirecționat să te loghezi
3. După autentificare, vei vedea dashboard-ul admin

### Ce poți face în Admin Dashboard?

#### 📊 Dashboard
- **Total Abonați** - numărul total de utilizatori înscriși prin onboarding
- **Utilizatori Activi** - utilizatori care s-au logat
- **Emailuri Trimise** - numărul de emailuri trimise azi
- **Notificări Necitite** - alerte noi despre activitate

#### 📧 Abonați
- Lista completă a abonaților
- Email, nume, data înscrierii
- Status welcome email (trimis/netrimis)

#### 👥 Utilizatori
- Lista utilizatorilor logați
- Email, nume, rol, data creării contului

#### 📬 Email Log
- Istoric emailuri trimise
- Destinatar, tip, subiect, status, data

#### 🔔 Notificări
- Notificări despre utilizatori noi
- Marchează ca citite individual sau toate

### Notificări Automate

Când un utilizator nou se înscrie:
1. **Notificare în dashboard** - apare în secțiunea Notificări
2. **Notificare push** - primești notificare pe dispozitiv (dacă e configurat)
3. **Email la hello@dezvatare.ro** - primești email cu detaliile utilizatorului

### Troubleshooting

**Nu pot accesa /admin:**
- Verifică să fii logat cu contul owner
- Verifică în consolă dacă ai rolul `admin`

**Nu primesc notificări:**
- Notificările sunt trimise prin Manus Forge API
- Verifică în Email Log dacă emailurile sunt marcate ca "sent"

---

*Documentație generată pentru Khora - The Unlearning School*
