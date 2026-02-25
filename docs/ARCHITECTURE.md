# ARCHITECTURE — CatapulZ Digital Ecosystem

---

## Structure de dossiers cible

```
CatapulZAI_ecosystem/
│
├── docs/                          # Documentation projet (ce dossier)
│   ├── CONTEXT.md                 # Contexte général — lire en premier
│   ├── ARCHITECTURE.md            # Ce fichier
│   ├── DESIGN-SYSTEM.md           # Tokens, typo, couleurs, composants
│   ├── SUPABASE.md                # Schéma BDD, tables, RLS policies
│   ├── ROADMAP.md                 # Phases et objectifs
│   ├── BUSINESS-RULES.md          # Règles métier et logique fonctionnelle
│   └── CHANGELOG.md               # Historique des modifications
│
├── src/
│   ├── components/
│   │   ├── ui/                    # Composants atomiques (Button, Input, Card…)
│   │   ├── layout/                # Nav, Footer, PageWrapper
│   │   └── sections/              # Blocs de page (Hero, Pillars, LeadForm…)
│   │
│   ├── pages/                     # Pages React (routing)
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx
│   │   └── ventures/              # Landing pages thématiques IA
│   │
│   ├── lib/
│   │   ├── supabase.ts            # Client Supabase + helpers
│   │   └── utils.ts               # Fonctions utilitaires
│   │
│   ├── hooks/                     # Custom React hooks
│   ├── types/                     # Types TypeScript globaux
│   ├── styles/                    # globals.css, tailwind config
│   └── assets/                    # Images, icons, fonts locaux
│
├── public/                        # Fichiers statiques
├── .env.local                     # Variables d'environnement (NON commité)
├── .env.example                   # Template variables (commité)
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

---

## Conventions de nommage

| Type | Convention | Exemple |
|------|-----------|---------|
| Composants React | PascalCase | `HeroSection.tsx` |
| Hooks | camelCase + use | `useLeadForm.ts` |
| Fonctions utilitaires | camelCase | `formatDate.ts` |
| Types/Interfaces | PascalCase + suffix | `LeadFormData` |
| Variables CSS / tokens | kebab-case | `--color-accent` |
| Tables Supabase | snake_case | `leads`, `email_campaigns` |

---

## Principes architecturaux

- **Mobile-first** systématiquement — breakpoints Tailwind : sm / md / lg / xl
- **Composants atomiques** : un composant = une responsabilité
- **Pas de logique métier dans les composants UI** — passer par les hooks
- **Supabase client singleton** — instancié une seule fois dans `lib/supabase.ts`
- **Variables d'environnement** : jamais de clé en dur dans le code
- **Performance** : lazy loading des pages, images optimisées WebP

---

## Routing cible (React Router v6)

```
/                    → HomePage
/a-propos            → AboutPage
/offres              → OffresPage
/ventures/:slug      → VentureLandingPage
/ressources          → LeadMagnetsPage
/crm                 → CRMDashboard (auth required)
```

---

## Variables d'environnement requises

```bash
# .env.local
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_SITE_URL=http://localhost:5173
```
