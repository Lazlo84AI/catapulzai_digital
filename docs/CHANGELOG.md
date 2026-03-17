# CHANGELOG — CatapulZ Digital Ecosystem

Format : [DATE] — [TYPE] — Description
Types : INIT | FEAT | FIX | REFACTOR | STYLE | DOCS | INFRA

---

## 2026

### [2026-03-17] — FEAT — Landing page Formation Système Agentique (FR)

**Nouveau fichier :** `src/pages/FormationSystemeAgentique.tsx`

- Landing page complète pour la formation "Master Agentic AI"
- Route : `/ecosystem/formationsystemeagentique`
- Sections : Hero avec tabs personas (3), Carrousel métriques (7 cartes autoplay), Programme (6 blocs bénéfices), Pricing (3 cards), Use Cases (5 cas clients), CTA rappel, FAQ accordion (6 questions), Footer 4 colonnes
- Personas : Entrepreneur / Executive / Wannabe AI builder
- Métriques sociales : 40 systèmes, 10 personnes formées, 5k→23k LinkedIn, −85% propal, −85% dev, −97% hôtel, −92% prospection
- Pricing : Master Agentic AI (97€/mois), Coach d'Exécution IA (à venir ~300€), Accompagnement 1-to-1 (devis)
- Coach IA : 9 items dont "double du cerveau de Wilfried", brainstorm architecture, programme step by step
- Use cases : Hôtellerie boutique, Chasseur de têtes, Coach financière, Cabinet formation, Cabinet conseil réseau freelances
- Garantie 3 jours intégrée dans la page pricing
- Design : même système (Raleway + DM Sans, dark mode #0a0a0f, accents PINK/BLUE/GREEN/ORANGE/VIOLET)
- Chiffres décoratifs 01–06 en blanc semi-transparent (opacity 0.28)

**Nouveau fichier :** `src/components/LeadFormIA.tsx`

- Formulaire de qualification 4 étapes avec barre de progression
- Étape 1 : Identité (prénom, email, téléphone optionnel) + prix willing + blocage action
- Étape 2 : Contexte business (fonction, taille entreprise, secteur)
- Étape 3 : Besoin (processus à automatiser chips, niveau IA, blocage principal)
- Étape 4 : Engagement (timing, engagement 6 mois)
- Auto-save localStorage (`fsa_lead_form`)
- Validation temps réel par étape
- POST vers `/api/leads` avec timestamp + UUID + source

---

### [2026-03-17] — FEAT — Page Questionnaire de qualification

**Nouveau fichier :** `src/pages/QuestionnaireFormation.tsx`

- Route dédiée : `/ecosystem/formationsystemeagentique/questionnaire`
- Page standalone avec nav (logo + retour formation) et fond dark cohérent
- Intègre le composant `LeadFormIA` avec header contextuel
- Copy : "Wilfried lit chaque candidature. 4 questions — 2 minutes."
- Tous les CTAs de la landing redirigent vers cette page (Hero, Pricing, CTA rappel)
- `App.tsx` mis à jour avec la route `/ecosystem/formationsystemeagentique/questionnaire`

---

### [2026-03-17] — FEAT — Dropdown Services dans la nav HomePage

**Fichier modifié :** `src/pages/HomePage.tsx`

- Remplacement du lien "Services" par un dropdown au survol
- Dropdown : 🎓 Formation → `/ecosystem/formationsystemeagentique` | 📅 Prestation → `https://cal.com/wilfried-de-renty-timeslots`
- CSS ajouté : `.cz-nav-dropdown`, `.cz-nav-dropdown-menu`, `.cz-nav-dropdown-item`
- Animation : fade + translateY au survol, rotation de la chevron

---

### [2026-03-18] — FEAT — Version anglaise du site (UK native)

**Nouveau fichier :** `src/pages/HomePageEN.tsx`

- Route : `/US`
- Traduction intégrale en anglais UK natif (pas de traduction automatique)
- Même architecture que HomePage.tsx : H1 rotator, email form, pillars, business cases, méthodologie, ventures, footer SEO
- Adaptation culturelle : "bespoke" vs "sur-mesure", "fortnight" rhythm, tone UK professionnel
- Dropdown Services : 🎓 Training → `/ecosystem/IAagenticsystemtraining` | 📅 Consulting → cal.com
- Toggle 🇫🇷 FR dans la nav → redirige vers `/`
- JSON-LD Schema.org mis à jour pour la version EN

**Nouveau fichier :** `src/pages/FormationSystemeAgentiqueEN.tsx`

- Route : `/ecosystem/IAagenticsystemtraining`
- Route questionnaire : `/ecosystem/IAagenticsystemtraining/apply`
- Traduction intégrale UK native de la landing formation
- Sections identiques à la version FR : Hero, Evidence carousel, Curriculum (6 modules), Pricing, Results (5 use cases), FAQ, Footer
- Adaptations UK : "cancellable" / "bespoke" / "fortnight" / £ dans les use cases
- Toggle 🇫🇷 FR dans la nav → redirige vers `/ecosystem/formationsystemeagentique`
- Nav : logo → `/US`, bouton retour → "Back to CatapulZ AI"

**Fichier modifié :** `src/App.tsx`

- 2 nouvelles routes ajoutées : `/US` et `/ecosystem/IAagenticsystemtraining`
- Route questionnaire EN : `/ecosystem/IAagenticsystemtraining/apply`
- Total routes actives : 5 (FR home, FR landing, FR questionnaire, EN home, EN landing)

---

### [2026-03-18] — STYLE — Refonte typographies landing page

**Fichier modifié :** `src/pages/FormationSystemeAgentique.tsx`

- Carrousel métriques : valeurs et labels passent en blanc (#f0f0f0), contexte en #9a9ab0
- Chiffres décoratifs (01–06) : passage de `rgba(255,255,255,0.05)` à blanc avec `opacity: 0.28`

---

### [2026-03-18] — FEAT — Enrichissement contenu des modules de formation

**Fichier modifié :** `src/pages/FormationSystemeAgentique.tsx` + `FormationSystemeAgentiqueEN.tsx`

- Module 01 renommé : "Maîtriser Claude — comme un ingénieur"
- Module 01 : ajout mémoire contextuelle, bases anti-hallucination, conseillers IA quotidiens (mental, closing, diplomatie)
- Module 02 : ajout frameworks UX/Product design, architectes/devs, frameworks cybersécurité
- Module 03 : précision "systèmes composés de plusieurs agents qui collaborent"
- Module 04 : réécriture complète — systèmes auto-apprenants, check de profil, "recréer des salariés polyvalents de A à Z", accessible non-techniques. Ajout flèche cybersécurité
- Module 05 : ajout orchestration vocale (routing), voix ultra-humaines, optimisation latence, modèles algorithmiques de synthèse
- Coach IA : 9 items (4 existants + 5 nouveaux dont "double du cerveau de Wilfried")

---

<!-- Template pour les prochaines entrées :

### [YYYY-MM-DD] — [TYPE] — Titre court
- Detail 1
- Detail 2
- Impact : [composants / tables / pages affectés]

-->
