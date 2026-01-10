#!/usr/bin/env python3
"""
Script pentru extinderea bazei de date cu ingrediente vegane
Adaugă ingrediente lipsă din lista originală + extensii noi
"""

# Ingrediente noi de adăugat - organizate pe categorii
new_ingredients = []

# ===== OȚET & AROME (categorie nouă) =====
otet_arome = [
    {"id": "oa001", "name": "Oțet de vin roșu", "category": "otet-arome", "emoji": "🍷", "color": "#7c3aed", "healthScore": 7, "calories": 19, "protein": 0, "isJunkFood": False, "tags": ["acid", "vinaigrette"]},
    {"id": "oa002", "name": "Oțet balsamic", "category": "otet-arome", "emoji": "🍷", "color": "#7c3aed", "healthScore": 7, "calories": 88, "protein": 0.5, "isJunkFood": False, "tags": ["italian", "dulce-acid"]},
    {"id": "oa003", "name": "Oțet de mere", "category": "otet-arome", "emoji": "🍎", "color": "#7c3aed", "healthScore": 8, "calories": 21, "protein": 0, "isJunkFood": False, "tags": ["digestie", "detox"]},
    {"id": "oa004", "name": "Mirin", "category": "otet-arome", "emoji": "🍶", "color": "#7c3aed", "healthScore": 5, "calories": 241, "protein": 0.3, "isJunkFood": False, "tags": ["japonez", "dulce"]},
    {"id": "oa005", "name": "Esență de vanilie", "category": "otet-arome", "emoji": "🌸", "color": "#7c3aed", "healthScore": 6, "calories": 288, "protein": 0.1, "isJunkFood": False, "tags": ["deserturi", "aromat"]},
    {"id": "oa006", "name": "Extract de migdale", "category": "otet-arome", "emoji": "🥜", "color": "#7c3aed", "healthScore": 6, "calories": 288, "protein": 0.1, "isJunkFood": False, "tags": ["deserturi", "aromat"]},
    {"id": "oa007", "name": "Vin roșu pentru gătit", "category": "otet-arome", "emoji": "🍷", "color": "#7c3aed", "healthScore": 5, "calories": 85, "protein": 0.1, "isJunkFood": False, "tags": ["sosuri", "francez"]},
    {"id": "oa008", "name": "Vin alb pentru gătit", "category": "otet-arome", "emoji": "🍷", "color": "#7c3aed", "healthScore": 5, "calories": 82, "protein": 0.1, "isJunkFood": False, "tags": ["sosuri", "risotto"]},
]
new_ingredients.extend(otet_arome)

# ===== ÎNGROȘĂTORI & GELIFIANTI (categorie nouă) =====
ingrosatori = [
    {"id": "ig001", "name": "Pectină", "category": "ingrosatori", "emoji": "🧪", "color": "#8b5cf6", "healthScore": 7, "calories": 162, "protein": 0, "isJunkFood": False, "tags": ["gem", "gelifiant"]},
    {"id": "ig002", "name": "Xanthan gum", "category": "ingrosatori", "emoji": "🧪", "color": "#8b5cf6", "healthScore": 6, "calories": 333, "protein": 0, "isJunkFood": False, "tags": ["stabilizator", "fără-gluten"]},
    {"id": "ig003", "name": "Guar gum", "category": "ingrosatori", "emoji": "🧪", "color": "#8b5cf6", "healthScore": 6, "calories": 0, "protein": 0, "isJunkFood": False, "tags": ["fibre", "stabilizator"]},
    {"id": "ig004", "name": "Amidon de porumb", "category": "ingrosatori", "emoji": "🧪", "color": "#8b5cf6", "healthScore": 5, "calories": 381, "protein": 0.3, "isJunkFood": False, "tags": ["îngroșător", "sosuri"]},
    {"id": "ig005", "name": "Amidon de cartof", "category": "ingrosatori", "emoji": "🧪", "color": "#8b5cf6", "healthScore": 5, "calories": 357, "protein": 0.1, "isJunkFood": False, "tags": ["îngroșător", "fără-gluten"]},
    {"id": "ig006", "name": "Gellan gum", "category": "ingrosatori", "emoji": "🧪", "color": "#8b5cf6", "healthScore": 6, "calories": 0, "protein": 0, "isJunkFood": False, "tags": ["gelifiant", "vegan"]},
]
new_ingredients.extend(ingrosatori)

# ===== BAZE SUPE & STOCURI (categorie nouă) =====
baze_supe = [
    {"id": "bs001", "name": "Bulion de legume", "category": "baze-supe", "emoji": "🍲", "color": "#f59e0b", "healthScore": 7, "calories": 13, "protein": 0.5, "isJunkFood": False, "tags": ["bază", "supe"]},
    {"id": "bs002", "name": "Stoc de ciuperci", "category": "baze-supe", "emoji": "🍲", "color": "#f59e0b", "healthScore": 8, "calories": 15, "protein": 0.7, "isJunkFood": False, "tags": ["umami", "intens"]},
    {"id": "bs003", "name": "Cuburi legume", "category": "baze-supe", "emoji": "🍲", "color": "#f59e0b", "healthScore": 5, "calories": 200, "protein": 5, "isJunkFood": False, "tags": ["rapid", "sare"]},
    {"id": "bs004", "name": "Stoc de legume concentrat", "category": "baze-supe", "emoji": "🍲", "color": "#f59e0b", "healthScore": 6, "calories": 30, "protein": 1, "isJunkFood": False, "tags": ["intens", "bază"]},
]
new_ingredients.extend(baze_supe)

# ===== PANIFICAȚIE & CONSERVARE (categorie nouă) =====
panificatie = [
    {"id": "pa001", "name": "Drojdie proaspătă", "category": "panificatie", "emoji": "🍞", "color": "#d97706", "healthScore": 8, "calories": 105, "protein": 8.4, "isJunkFood": False, "tags": ["pâine", "B-vitamine"]},
    {"id": "pa002", "name": "Drojdie uscată activă", "category": "panificatie", "emoji": "🍞", "color": "#d97706", "healthScore": 8, "calories": 325, "protein": 40.4, "isJunkFood": False, "tags": ["pâine", "depozitare"]},
    {"id": "pa003", "name": "Bicarbonat de sodiu", "category": "panificatie", "emoji": "🍞", "color": "#d97706", "healthScore": 5, "calories": 0, "protein": 0, "isJunkFood": False, "tags": ["afânător", "curățare"]},
    {"id": "pa004", "name": "Praf de copt", "category": "panificatie", "emoji": "🍞", "color": "#d97706", "healthScore": 5, "calories": 53, "protein": 0, "isJunkFood": False, "tags": ["afânător", "prăjituri"]},
    {"id": "pa005", "name": "Malț de orz", "category": "panificatie", "emoji": "🍞", "color": "#d97706", "healthScore": 6, "calories": 361, "protein": 10.3, "isJunkFood": False, "tags": ["pâine", "îndulcitor"]},
    {"id": "pa006", "name": "Lapte vegetal praf", "category": "panificatie", "emoji": "🍞", "color": "#d97706", "healthScore": 6, "calories": 496, "protein": 26.3, "isJunkFood": False, "tags": ["depozitare", "prăjituri"]},
]
new_ingredients.extend(panificatie)

# ===== SNACKURI & TOPPINGURI (categorie nouă) =====
snackuri = [
    {"id": "sn001", "name": "Granola", "category": "snackuri", "emoji": "🥣", "color": "#f59e0b", "healthScore": 7, "calories": 489, "protein": 10.5, "isJunkFood": False, "tags": ["mic-dejun", "fibre"]},
    {"id": "sn002", "name": "Muesli fără miere", "category": "snackuri", "emoji": "🥣", "color": "#f59e0b", "healthScore": 8, "calories": 340, "protein": 9.7, "isJunkFood": False, "tags": ["mic-dejun", "raw"]},
    {"id": "sn003", "name": "Fulgi de cocos", "category": "snackuri", "emoji": "🥥", "color": "#f59e0b", "healthScore": 7, "calories": 660, "protein": 6.9, "isJunkFood": False, "tags": ["topping", "tropical"]},
    {"id": "sn004", "name": "Chipsuri de kale", "category": "snackuri", "emoji": "🥬", "color": "#f59e0b", "healthScore": 9, "calories": 200, "protein": 10, "isJunkFood": False, "tags": ["snack-sănătos", "fibre"]},
    {"id": "sn005", "name": "Crackers integrali", "category": "snackuri", "emoji": "🍘", "color": "#f59e0b", "healthScore": 6, "calories": 440, "protein": 9.5, "isJunkFood": False, "tags": ["snack", "fibre"]},
    {"id": "sn006", "name": "Migdale prăjite", "category": "snackuri", "emoji": "🥜", "color": "#f59e0b", "healthScore": 8, "calories": 598, "protein": 21, "isJunkFood": False, "tags": ["snack", "proteine"]},
    {"id": "sn007", "name": "Semințe de mac", "category": "snackuri", "emoji": "🌱", "color": "#f59e0b", "healthScore": 8, "calories": 525, "protein": 18, "isJunkFood": False, "tags": ["topping", "calciu"]},
    {"id": "sn008", "name": "Linte prăjită crunch", "category": "snackuri", "emoji": "🫘", "color": "#f59e0b", "healthScore": 9, "calories": 352, "protein": 25, "isJunkFood": False, "tags": ["snack-sănătos", "proteine"]},
]
new_ingredients.extend(snackuri)

# ===== DULCIURI & COFETĂRIE (categorie nouă) =====
dulciuri = [
    {"id": "du001", "name": "Cacao pudră", "category": "dulciuri", "emoji": "🍫", "color": "#78350f", "healthScore": 9, "calories": 228, "protein": 19.6, "isJunkFood": False, "tags": ["antioxidanți", "magneziu"]},
    {"id": "du002", "name": "Ciocolată neagră 70%", "category": "dulciuri", "emoji": "🍫", "color": "#78350f", "healthScore": 7, "calories": 598, "protein": 7.8, "isJunkFood": False, "tags": ["antioxidanți", "desert"]},
    {"id": "du003", "name": "Chipsuri ciocolată vegane", "category": "dulciuri", "emoji": "🍫", "color": "#78350f", "healthScore": 5, "calories": 479, "protein": 4.5, "isJunkFood": False, "tags": ["prăjituri", "desert"]},
    {"id": "du004", "name": "Zahăr pudră", "category": "dulciuri", "emoji": "🍬", "color": "#78350f", "healthScore": 3, "calories": 389, "protein": 0, "isJunkFood": False, "tags": ["glazură", "desert"]},
    {"id": "du005", "name": "Cremă de caju deserturi", "category": "dulciuri", "emoji": "🍨", "color": "#78350f", "healthScore": 7, "calories": 553, "protein": 18, "isJunkFood": False, "tags": ["raw", "cremos"]},
    {"id": "du006", "name": "Nibs de cacao", "category": "dulciuri", "emoji": "🍫", "color": "#78350f", "healthScore": 10, "calories": 228, "protein": 14, "isJunkFood": False, "tags": ["raw", "antioxidanți", "superfood"]},
]
new_ingredients.extend(dulciuri)

# ===== PLANTE MEDICINALE & ADAPTOGENI (categorie nouă) =====
plante_medicinale = [
    {"id": "pm001", "name": "Ginseng", "category": "plante-medicinale", "emoji": "🌿", "color": "#059669", "healthScore": 9, "calories": 0, "protein": 0, "isJunkFood": False, "tags": ["adaptogen", "energie", "cognitiv"]},
    {"id": "pm002", "name": "Reishi", "category": "plante-medicinale", "emoji": "🍄", "color": "#059669", "healthScore": 10, "calories": 0, "protein": 0, "isJunkFood": False, "tags": ["adaptogen", "imunitate", "somn"]},
    {"id": "pm003", "name": "Lion's Mane", "category": "plante-medicinale", "emoji": "🍄", "color": "#059669", "healthScore": 10, "calories": 0, "protein": 0, "isJunkFood": False, "tags": ["cognitiv", "nervos", "focus"]},
    {"id": "pm004", "name": "Cordyceps", "category": "plante-medicinale", "emoji": "🍄", "color": "#059669", "healthScore": 10, "calories": 0, "protein": 0, "isJunkFood": False, "tags": ["energie", "sport", "rezistență"]},
    {"id": "pm005", "name": "Chaga", "category": "plante-medicinale", "emoji": "🍄", "color": "#059669", "healthScore": 10, "calories": 0, "protein": 0, "isJunkFood": False, "tags": ["antioxidanți", "imunitate"]},
    {"id": "pm006", "name": "Mucuna pruriens", "category": "plante-medicinale", "emoji": "🌿", "color": "#059669", "healthScore": 9, "calories": 0, "protein": 0, "isJunkFood": False, "tags": ["dopamină", "stare", "hormoni"]},
    {"id": "pm007", "name": "Schisandra", "category": "plante-medicinale", "emoji": "🫐", "color": "#059669", "healthScore": 9, "calories": 0, "protein": 0, "isJunkFood": False, "tags": ["adaptogen", "ficat", "energie"]},
    {"id": "pm008", "name": "Tulsi (Busuioc Sfânt)", "category": "plante-medicinale", "emoji": "🌿", "color": "#059669", "healthScore": 9, "calories": 0, "protein": 0, "isJunkFood": False, "tags": ["stres", "adaptogen", "ayurveda"]},
    {"id": "pm009", "name": "Gotu Kola", "category": "plante-medicinale", "emoji": "🌿", "color": "#059669", "healthScore": 9, "calories": 0, "protein": 0, "isJunkFood": False, "tags": ["cognitiv", "piele", "circulație"]},
    {"id": "pm010", "name": "Eleuthero", "category": "plante-medicinale", "emoji": "🌿", "color": "#059669", "healthScore": 9, "calories": 0, "protein": 0, "isJunkFood": False, "tags": ["adaptogen", "rezistență", "energie"]},
    {"id": "pm011", "name": "Astragalus", "category": "plante-medicinale", "emoji": "🌿", "color": "#059669", "healthScore": 9, "calories": 0, "protein": 0, "isJunkFood": False, "tags": ["imunitate", "longevitate", "TCM"]},
    {"id": "pm012", "name": "Shatavari", "category": "plante-medicinale", "emoji": "🌿", "color": "#059669", "healthScore": 9, "calories": 0, "protein": 0, "isJunkFood": False, "tags": ["hormoni", "feminin", "ayurveda"]},
]
new_ingredients.extend(plante_medicinale)

# ===== INGREDIENTE PENTRU CHEESE VEGAN (categorie nouă) =====
cheese_vegan = [
    {"id": "cv001", "name": "Caju crud înmuiat", "category": "cheese-vegan", "emoji": "🧀", "color": "#fbbf24", "healthScore": 9, "calories": 553, "protein": 18, "isJunkFood": False, "tags": ["bază-cheese", "cremos"]},
    {"id": "cv002", "name": "Migdale înmuiate", "category": "cheese-vegan", "emoji": "🧀", "color": "#fbbf24", "healthScore": 9, "calories": 579, "protein": 21, "isJunkFood": False, "tags": ["bază-cheese", "ricotta"]},
    {"id": "cv003", "name": "Tapioca pentru elasticitate", "category": "cheese-vegan", "emoji": "🧀", "color": "#fbbf24", "healthScore": 5, "calories": 358, "protein": 0.2, "isJunkFood": False, "tags": ["mozzarella", "stretchy"]},
    {"id": "cv004", "name": "Lapte cocos cremă", "category": "cheese-vegan", "emoji": "🧀", "color": "#fbbf24", "healthScore": 7, "calories": 230, "protein": 2.3, "isJunkFood": False, "tags": ["cremos", "deserturi"]},
    {"id": "cv005", "name": "Culturi lactice vegane", "category": "cheese-vegan", "emoji": "🧀", "color": "#fbbf24", "healthScore": 9, "calories": 0, "protein": 0, "isJunkFood": False, "tags": ["fermentare", "iaurt"]},
]
new_ingredients.extend(cheese_vegan)

# ===== LEGUME SUPLIMENTARE =====
legume_extra = [
    {"id": "le001", "name": "Anghinare", "category": "legume-fructe", "emoji": "🌿", "color": "#22c55e", "healthScore": 9, "calories": 47, "protein": 3.3, "isJunkFood": False, "tags": ["fibre", "ficat", "prebiotice"]},
    {"id": "le002", "name": "Sparanghel", "category": "legume-fructe", "emoji": "🌿", "color": "#22c55e", "healthScore": 10, "calories": 20, "protein": 2.2, "isJunkFood": False, "tags": ["folat", "detox", "premium"]},
    {"id": "le003", "name": "Avocado", "category": "legume-fructe", "emoji": "🥑", "color": "#22c55e", "healthScore": 10, "calories": 160, "protein": 2, "isJunkFood": False, "tags": ["grăsimi-sănătoase", "potasiu", "superfood"]},
    {"id": "le004", "name": "Țelină tulpină", "category": "legume-fructe", "emoji": "🥬", "color": "#22c55e", "healthScore": 9, "calories": 16, "protein": 0.7, "isJunkFood": False, "tags": ["hidratare", "low-cal", "detox"]},
    {"id": "le005", "name": "Fenicul bulb", "category": "legume-fructe", "emoji": "🌿", "color": "#22c55e", "healthScore": 9, "calories": 31, "protein": 1.2, "isJunkFood": False, "tags": ["digestie", "aromat"]},
    {"id": "le006", "name": "Pak choi", "category": "legume-frunze", "emoji": "🥬", "color": "#22c55e", "healthScore": 10, "calories": 13, "protein": 1.5, "isJunkFood": False, "tags": ["calciu", "asiatic", "vitamina-K"]},
    {"id": "le007", "name": "Bok choy", "category": "legume-frunze", "emoji": "🥬", "color": "#22c55e", "healthScore": 10, "calories": 13, "protein": 1.5, "isJunkFood": False, "tags": ["calciu", "asiatic"]},
    {"id": "le008", "name": "Radicchio", "category": "legume-frunze", "emoji": "🥬", "color": "#a855f7", "healthScore": 9, "calories": 23, "protein": 1.4, "isJunkFood": False, "tags": ["amar", "italian", "antioxidanți"]},
    {"id": "le009", "name": "Andive", "category": "legume-frunze", "emoji": "🥬", "color": "#22c55e", "healthScore": 9, "calories": 17, "protein": 1.3, "isJunkFood": False, "tags": ["amar", "belgian", "fibre"]},
    {"id": "le010", "name": "Frunze de nap", "category": "legume-frunze", "emoji": "🥬", "color": "#22c55e", "healthScore": 10, "calories": 32, "protein": 1.5, "isJunkFood": False, "tags": ["calciu", "vitamina-K"]},
    {"id": "le011", "name": "Swiss chard", "category": "legume-frunze", "emoji": "🥬", "color": "#22c55e", "healthScore": 10, "calories": 19, "protein": 1.8, "isJunkFood": False, "tags": ["magneziu", "fier", "colorat"]},
    {"id": "le012", "name": "Collard greens", "category": "legume-frunze", "emoji": "🥬", "color": "#22c55e", "healthScore": 10, "calories": 32, "protein": 3, "isJunkFood": False, "tags": ["calciu", "vitamina-K", "southern"]},
    {"id": "le013", "name": "Broccolini", "category": "legume-radacinoase", "emoji": "🥦", "color": "#22c55e", "healthScore": 10, "calories": 35, "protein": 3.7, "isJunkFood": False, "tags": ["vitamina-C", "premium"]},
    {"id": "le014", "name": "Romanesco", "category": "legume-radacinoase", "emoji": "🥦", "color": "#22c55e", "healthScore": 10, "calories": 25, "protein": 2.5, "isJunkFood": False, "tags": ["vitamina-C", "fractal", "premium"]},
    {"id": "le015", "name": "Kohlrabi", "category": "legume-radacinoase", "emoji": "🥬", "color": "#22c55e", "healthScore": 9, "calories": 27, "protein": 1.7, "isJunkFood": False, "tags": ["vitamina-C", "low-carb"]},
]
new_ingredients.extend(legume_extra)

# ===== FRUCTE SUPLIMENTARE =====
fructe_extra = [
    {"id": "fx001", "name": "Papaya", "category": "fructe", "emoji": "🍈", "color": "#f97316", "healthScore": 9, "calories": 43, "protein": 0.5, "isJunkFood": False, "tags": ["enzime", "digestie", "tropical"]},
    {"id": "fx002", "name": "Guava", "category": "fructe", "emoji": "🍈", "color": "#22c55e", "healthScore": 10, "calories": 68, "protein": 2.6, "isJunkFood": False, "tags": ["vitamina-C-maxim", "tropical"]},
    {"id": "fx003", "name": "Passion fruit", "category": "fructe", "emoji": "🍇", "color": "#a855f7", "healthScore": 9, "calories": 97, "protein": 2.2, "isJunkFood": False, "tags": ["fibre", "tropical", "aromat"]},
    {"id": "fx004", "name": "Dragon fruit", "category": "fructe", "emoji": "🍈", "color": "#ec4899", "healthScore": 8, "calories": 60, "protein": 1.2, "isJunkFood": False, "tags": ["antioxidanți", "exotic"]},
    {"id": "fx005", "name": "Lychee", "category": "fructe", "emoji": "🍇", "color": "#f472b6", "healthScore": 7, "calories": 66, "protein": 0.8, "isJunkFood": False, "tags": ["vitamina-C", "asiatic"]},
    {"id": "fx006", "name": "Rambutan", "category": "fructe", "emoji": "🍇", "color": "#ef4444", "healthScore": 7, "calories": 82, "protein": 0.7, "isJunkFood": False, "tags": ["exotic", "asiatic"]},
    {"id": "fx007", "name": "Durian", "category": "fructe", "emoji": "🍈", "color": "#fbbf24", "healthScore": 7, "calories": 147, "protein": 1.5, "isJunkFood": False, "tags": ["exotic", "energie", "controversat"]},
    {"id": "fx008", "name": "Carambola (Star fruit)", "category": "fructe", "emoji": "⭐", "color": "#fbbf24", "healthScore": 8, "calories": 31, "protein": 1, "isJunkFood": False, "tags": ["vitamina-C", "decorativ"]},
    {"id": "fx009", "name": "Caise", "category": "fructe", "emoji": "🍑", "color": "#f97316", "healthScore": 9, "calories": 48, "protein": 1.4, "isJunkFood": False, "tags": ["beta-caroten", "potasiu"]},
    {"id": "fx010", "name": "Piersici", "category": "fructe", "emoji": "🍑", "color": "#f97316", "healthScore": 8, "calories": 39, "protein": 0.9, "isJunkFood": False, "tags": ["vitamina-C", "vară"]},
    {"id": "fx011", "name": "Nectarine", "category": "fructe", "emoji": "🍑", "color": "#f97316", "healthScore": 8, "calories": 44, "protein": 1.1, "isJunkFood": False, "tags": ["vitamina-C", "vară"]},
    {"id": "fx012", "name": "Cireșe", "category": "fructe", "emoji": "🍒", "color": "#dc2626", "healthScore": 9, "calories": 63, "protein": 1.1, "isJunkFood": False, "tags": ["antioxidanți", "somn", "melatonină"]},
    {"id": "fx013", "name": "Vișine", "category": "fructe", "emoji": "🍒", "color": "#dc2626", "healthScore": 9, "calories": 50, "protein": 1, "isJunkFood": False, "tags": ["antiinflamator", "recuperare"]},
    {"id": "fx014", "name": "Prune proaspete", "category": "fructe", "emoji": "🍇", "color": "#6b21a8", "healthScore": 8, "calories": 46, "protein": 0.7, "isJunkFood": False, "tags": ["digestie", "fibre"]},
    {"id": "fx015", "name": "Rodii", "category": "fructe", "emoji": "🍎", "color": "#dc2626", "healthScore": 10, "calories": 83, "protein": 1.7, "isJunkFood": False, "tags": ["antioxidanți", "inimă", "superfood"]},
    {"id": "fx016", "name": "Coacăze negre", "category": "fructe", "emoji": "🫐", "color": "#1e1b4b", "healthScore": 10, "calories": 63, "protein": 1.4, "isJunkFood": False, "tags": ["vitamina-C", "antioxidanți"]},
    {"id": "fx017", "name": "Coacăze roșii", "category": "fructe", "emoji": "🍇", "color": "#dc2626", "healthScore": 9, "calories": 56, "protein": 1.4, "isJunkFood": False, "tags": ["vitamina-C", "fibre"]},
    {"id": "fx018", "name": "Agrișe", "category": "fructe", "emoji": "🍇", "color": "#22c55e", "healthScore": 9, "calories": 44, "protein": 0.9, "isJunkFood": False, "tags": ["vitamina-C", "fibre"]},
]
new_ingredients.extend(fructe_extra)

# ===== CIUPERCI SUPLIMENTARE =====
ciuperci_extra = [
    {"id": "cx001", "name": "Ciuperci cremini", "category": "ciuperci", "emoji": "🍄", "color": "#a8a29e", "healthScore": 9, "calories": 22, "protein": 3.1, "isJunkFood": False, "tags": ["umami", "versatil"]},
    {"id": "cx002", "name": "King oyster", "category": "ciuperci", "emoji": "🍄", "color": "#a8a29e", "healthScore": 9, "calories": 35, "protein": 3.3, "isJunkFood": False, "tags": ["textură-carne", "asiatic"]},
    {"id": "cx003", "name": "Chanterelle", "category": "ciuperci", "emoji": "🍄", "color": "#fbbf24", "healthScore": 9, "calories": 38, "protein": 1.5, "isJunkFood": False, "tags": ["gourmet", "aromat"]},
    {"id": "cx004", "name": "Morel", "category": "ciuperci", "emoji": "🍄", "color": "#a8a29e", "healthScore": 9, "calories": 31, "protein": 3.1, "isJunkFood": False, "tags": ["gourmet", "rar", "premium"]},
    {"id": "cx005", "name": "Black truffle", "category": "ciuperci", "emoji": "🍄", "color": "#1e1b4b", "healthScore": 8, "calories": 284, "protein": 5.5, "isJunkFood": False, "tags": ["luxury", "aromat", "premium"]},
    {"id": "cx006", "name": "Ciuperci de pădure mix", "category": "ciuperci", "emoji": "🍄", "color": "#a8a29e", "healthScore": 9, "calories": 30, "protein": 2.5, "isJunkFood": False, "tags": ["wild", "aromat"]},
]
new_ingredients.extend(ciuperci_extra)

# ===== CONDIMENTE SUPLIMENTARE =====
condimente_extra = [
    {"id": "cx001", "name": "Cardamom", "category": "condimente", "emoji": "🌶️", "color": "#22c55e", "healthScore": 9, "calories": 311, "protein": 10.8, "isJunkFood": False, "tags": ["aromat", "indian", "digestie"]},
    {"id": "cx002", "name": "Nucșoară", "category": "condimente", "emoji": "🌶️", "color": "#a16207", "healthScore": 8, "calories": 525, "protein": 5.8, "isJunkFood": False, "tags": ["aromat", "deserturi"]},
    {"id": "cx003", "name": "Mace", "category": "condimente", "emoji": "🌶️", "color": "#f97316", "healthScore": 8, "calories": 475, "protein": 6.7, "isJunkFood": False, "tags": ["aromat", "indian"]},
    {"id": "cx004", "name": "Sumac", "category": "condimente", "emoji": "🌶️", "color": "#dc2626", "healthScore": 9, "calories": 239, "protein": 5, "isJunkFood": False, "tags": ["acid", "oriental", "antioxidanți"]},
    {"id": "cx005", "name": "Za'atar", "category": "condimente", "emoji": "🌶️", "color": "#22c55e", "healthScore": 9, "calories": 276, "protein": 9.1, "isJunkFood": False, "tags": ["oriental", "amestec"]},
    {"id": "cx006", "name": "Harissa", "category": "condimente", "emoji": "🌶️", "color": "#dc2626", "healthScore": 8, "calories": 77, "protein": 3, "isJunkFood": False, "tags": ["picant", "african-nord"]},
    {"id": "cx007", "name": "Ras el hanout", "category": "condimente", "emoji": "🌶️", "color": "#f97316", "healthScore": 8, "calories": 300, "protein": 10, "isJunkFood": False, "tags": ["marocan", "amestec"]},
    {"id": "cx008", "name": "Berbere", "category": "condimente", "emoji": "🌶️", "color": "#dc2626", "healthScore": 8, "calories": 300, "protein": 10, "isJunkFood": False, "tags": ["etiopian", "amestec"]},
    {"id": "cx009", "name": "Chimion negru (Nigella)", "category": "condimente", "emoji": "🌶️", "color": "#1e1b4b", "healthScore": 9, "calories": 345, "protein": 16.4, "isJunkFood": False, "tags": ["imunitate", "oriental"]},
    {"id": "cx010", "name": "Fenugreek", "category": "condimente", "emoji": "🌶️", "color": "#fbbf24", "healthScore": 9, "calories": 323, "protein": 23, "isJunkFood": False, "tags": ["indian", "glicemie"]},
    {"id": "cx011", "name": "Asafoetida", "category": "condimente", "emoji": "🌶️", "color": "#fbbf24", "healthScore": 8, "calories": 297, "protein": 4, "isJunkFood": False, "tags": ["indian", "digestie", "înlocuitor-usturoi"]},
    {"id": "cx012", "name": "Paprika ungurească", "category": "condimente", "emoji": "🌶️", "color": "#dc2626", "healthScore": 8, "calories": 282, "protein": 14, "isJunkFood": False, "tags": ["dulce", "unguresc"]},
    {"id": "cx013", "name": "Chili flakes", "category": "condimente", "emoji": "🌶️", "color": "#dc2626", "healthScore": 8, "calories": 314, "protein": 12, "isJunkFood": False, "tags": ["picant", "topping"]},
    {"id": "cx014", "name": "Cayenne", "category": "condimente", "emoji": "🌶️", "color": "#dc2626", "healthScore": 8, "calories": 318, "protein": 12, "isJunkFood": False, "tags": ["picant", "metabolism"]},
    {"id": "cx015", "name": "Piper alb", "category": "condimente", "emoji": "🌶️", "color": "#f5f5f4", "healthScore": 8, "calories": 296, "protein": 10.4, "isJunkFood": False, "tags": ["asiatic", "subtil"]},
]
new_ingredients.extend(condimente_extra)

# ===== BĂUTURI SUPLIMENTARE =====
bauturi_extra = [
    {"id": "bx001", "name": "Cafea", "category": "bauturi", "emoji": "☕", "color": "#78350f", "healthScore": 7, "calories": 2, "protein": 0.3, "isJunkFood": False, "tags": ["energie", "antioxidanți"]},
    {"id": "bx002", "name": "Ceai de mentă", "category": "bauturi", "emoji": "🍵", "color": "#22c55e", "healthScore": 9, "calories": 0, "protein": 0, "isJunkFood": False, "tags": ["digestie", "răcoritor"]},
    {"id": "bx003", "name": "Ceai de ghimbir", "category": "bauturi", "emoji": "🍵", "color": "#fbbf24", "healthScore": 9, "calories": 0, "protein": 0, "isJunkFood": False, "tags": ["digestie", "antiinflamator"]},
    {"id": "bx004", "name": "Ceai de hibiscus", "category": "bauturi", "emoji": "🌺", "color": "#dc2626", "healthScore": 9, "calories": 0, "protein": 0, "isJunkFood": False, "tags": ["tensiune", "antioxidanți"]},
    {"id": "bx005", "name": "Ceai de lavandă", "category": "bauturi", "emoji": "💜", "color": "#a855f7", "healthScore": 8, "calories": 0, "protein": 0, "isJunkFood": False, "tags": ["relaxare", "somn"]},
    {"id": "bx006", "name": "Pudră proteică vegană", "category": "bauturi", "emoji": "💪", "color": "#22c55e", "healthScore": 8, "calories": 120, "protein": 24, "isJunkFood": False, "tags": ["proteine", "sport"]},
    {"id": "bx007", "name": "Apă de cocos", "category": "bauturi", "emoji": "🥥", "color": "#f5f5f4", "healthScore": 9, "calories": 19, "protein": 0.7, "isJunkFood": False, "tags": ["hidratare", "electroliți"]},
    {"id": "bx008", "name": "Suc de țelină", "category": "bauturi", "emoji": "🥬", "color": "#22c55e", "healthScore": 9, "calories": 16, "protein": 0.7, "isJunkFood": False, "tags": ["detox", "alcalin"]},
]
new_ingredients.extend(bauturi_extra)

# ===== TOMATE & DERIVATE =====
tomate_extra = [
    {"id": "tx001", "name": "Roșii uscate", "category": "legume-fructe", "emoji": "🍅", "color": "#dc2626", "healthScore": 9, "calories": 258, "protein": 14.1, "isJunkFood": False, "tags": ["umami", "licopen", "italian"]},
    {"id": "tx002", "name": "Roșii San Marzano", "category": "legume-fructe", "emoji": "🍅", "color": "#dc2626", "healthScore": 9, "calories": 18, "protein": 0.9, "isJunkFood": False, "tags": ["italian", "sosuri", "premium"]},
    {"id": "tx003", "name": "Passata de roșii", "category": "sosuri", "emoji": "🍅", "color": "#dc2626", "healthScore": 8, "calories": 24, "protein": 1.3, "isJunkFood": False, "tags": ["italian", "bază"]},
]
new_ingredients.extend(tomate_extra)

# ===== JUNK FOOD VEGAN SUPLIMENTAR =====
junk_extra = [
    {"id": "jx001", "name": "Maioneză vegană comercială", "category": "junk-vegan", "emoji": "⚠️", "color": "#ef4444", "healthScore": 2, "calories": 680, "protein": 0.5, "isJunkFood": True, "tags": ["procesat", "grăsimi", "aditivi"]},
    {"id": "jx002", "name": "Cream cheese vegan", "category": "junk-vegan", "emoji": "⚠️", "color": "#ef4444", "healthScore": 3, "calories": 250, "protein": 2, "isJunkFood": True, "tags": ["procesat", "aditivi"]},
    {"id": "jx003", "name": "Salam vegan", "category": "junk-vegan", "emoji": "⚠️", "color": "#ef4444", "healthScore": 2, "calories": 290, "protein": 15, "isJunkFood": True, "tags": ["procesat", "sodiu", "aditivi"]},
    {"id": "jx004", "name": "Hot dogs vegani", "category": "junk-vegan", "emoji": "⚠️", "color": "#ef4444", "healthScore": 2, "calories": 260, "protein": 12, "isJunkFood": True, "tags": ["procesat", "sodiu"]},
    {"id": "jx005", "name": "Prăjituri vegane comerciale", "category": "junk-vegan", "emoji": "⚠️", "color": "#ef4444", "healthScore": 2, "calories": 400, "protein": 4, "isJunkFood": True, "tags": ["zahăr", "procesat"]},
    {"id": "jx006", "name": "Cereale dulci vegane", "category": "junk-vegan", "emoji": "⚠️", "color": "#ef4444", "healthScore": 3, "calories": 380, "protein": 6, "isJunkFood": True, "tags": ["zahăr", "procesat"]},
    {"id": "jx007", "name": "Batoane proteice vegane", "category": "junk-vegan", "emoji": "⚠️", "color": "#ef4444", "healthScore": 4, "calories": 250, "protein": 20, "isJunkFood": True, "tags": ["procesat", "îndulcitori"]},
    {"id": "jx008", "name": "Smoothie-uri comerciale", "category": "junk-vegan", "emoji": "⚠️", "color": "#ef4444", "healthScore": 4, "calories": 150, "protein": 2, "isJunkFood": True, "tags": ["zahăr", "procesat"]},
]
new_ingredients.extend(junk_extra)

# ===== LEGUMINOASE SUPLIMENTARE =====
leguminoase_extra = [
    {"id": "lx001", "name": "Fasole mung", "category": "leguminoase", "emoji": "🫘", "color": "#84cc16", "healthScore": 10, "calories": 347, "protein": 23.9, "isJunkFood": False, "tags": ["asiatic", "germeni", "proteine"]},
    {"id": "lx002", "name": "Fasole adzuki", "category": "leguminoase", "emoji": "🫘", "color": "#84cc16", "healthScore": 10, "calories": 329, "protein": 19.9, "isJunkFood": False, "tags": ["japonez", "deserturi", "proteine"]},
    {"id": "lx003", "name": "Fasole lima", "category": "leguminoase", "emoji": "🫘", "color": "#84cc16", "healthScore": 9, "calories": 338, "protein": 21.5, "isJunkFood": False, "tags": ["fibre", "fier"]},
    {"id": "lx004", "name": "Fasole pinto", "category": "leguminoase", "emoji": "🫘", "color": "#84cc16", "healthScore": 9, "calories": 347, "protein": 21.4, "isJunkFood": False, "tags": ["mexican", "fibre"]},
    {"id": "lx005", "name": "Linte beluga", "category": "leguminoase", "emoji": "🫘", "color": "#1e1b4b", "healthScore": 10, "calories": 352, "protein": 25, "isJunkFood": False, "tags": ["premium", "proteine", "elegant"]},
    {"id": "lx006", "name": "Linte du Puy", "category": "leguminoase", "emoji": "🫘", "color": "#22c55e", "healthScore": 10, "calories": 352, "protein": 25, "isJunkFood": False, "tags": ["francez", "premium"]},
]
new_ingredients.extend(leguminoase_extra)

# ===== NUCI SUPLIMENTARE =====
nuci_extra = [
    {"id": "nx001", "name": "Nuci macadamia", "category": "nuci-seminte", "emoji": "🥜", "color": "#a16207", "healthScore": 8, "calories": 718, "protein": 7.9, "isJunkFood": False, "tags": ["grăsimi-sănătoase", "premium"]},
    {"id": "nx002", "name": "Fistic", "category": "nuci-seminte", "emoji": "🥜", "color": "#22c55e", "healthScore": 9, "calories": 562, "protein": 20.2, "isJunkFood": False, "tags": ["proteine", "snack"]},
    {"id": "nx003", "name": "Castane", "category": "nuci-seminte", "emoji": "🌰", "color": "#a16207", "healthScore": 8, "calories": 213, "protein": 2.4, "isJunkFood": False, "tags": ["carbohidrați", "fibre", "iarnă"]},
    {"id": "nx004", "name": "Pinoli (semințe de pin)", "category": "nuci-seminte", "emoji": "🌱", "color": "#a16207", "healthScore": 9, "calories": 673, "protein": 13.7, "isJunkFood": False, "tags": ["pesto", "italian", "premium"]},
]
new_ingredients.extend(nuci_extra)

# Generez codul TypeScript pentru ingrediente noi
def generate_ts_code():
    lines = []
    
    # Adaug categoriile noi
    new_categories = [
        '  { id: "otet-arome", name: "Oțet & Arome", color: "#7c3aed", icon: "🍷" },',
        '  { id: "ingrosatori", name: "Îngroșători", color: "#8b5cf6", icon: "🧪" },',
        '  { id: "baze-supe", name: "Baze Supe", color: "#f59e0b", icon: "🍲" },',
        '  { id: "panificatie", name: "Panificație", color: "#d97706", icon: "🍞" },',
        '  { id: "snackuri", name: "Snackuri", color: "#f59e0b", icon: "🥣" },',
        '  { id: "dulciuri", name: "Dulciuri", color: "#78350f", icon: "🍫" },',
        '  { id: "plante-medicinale", name: "Plante Medicinale", color: "#059669", icon: "🌿" },',
        '  { id: "cheese-vegan", name: "Cheese Vegan", color: "#fbbf24", icon: "🧀" },',
    ]
    
    lines.append("\n// ===== CATEGORII NOI =====")
    for cat in new_categories:
        lines.append(cat)
    
    lines.append("\n// ===== INGREDIENTE NOI =====")
    
    for ing in new_ingredients:
        tags_str = ', '.join([f'"{t}"' for t in ing['tags']])
        line = f'  {{ id: "{ing["id"]}", name: "{ing["name"]}", category: "{ing["category"]}", emoji: "{ing["emoji"]}", color: "{ing["color"]}", healthScore: {ing["healthScore"]}, calories: {ing["calories"]}, protein: {ing["protein"]}, isJunkFood: {"true" if ing["isJunkFood"] else "false"}, tags: [{tags_str}] }},'
        lines.append(line)
    
    return '\n'.join(lines)

# Scriu rezultatul
output = generate_ts_code()
print(output)
print(f"\n// Total ingrediente noi: {len(new_ingredients)}")
