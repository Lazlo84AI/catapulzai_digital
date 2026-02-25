# ROADMAP — CatapulZ Digital Ecosystem

---

## Vision globale

Construire un écosystème digital complet d'acquisition et de gestion client
basé sur l'IA — de la vitrine au CRM agentique.

---

## Phase 1 — Site vitrine + Capture leads
**Status : 🟡 En cours**

- [x] Structure projet & documentation
- [x] Homepage responsive (Hero + Piliers + Email form)
- [ ] Connexion Supabase table `leads`
- [ ] Navigation desktop + mobile
- [ ] Page À propos
- [ ] Page Offres
- [ ] Déploiement Vercel / Netlify
- [ ] Connexion domaine URL existant

---

## Phase 2 — Landing pages + Emailing
**Status : ⬜ À venir**

- [ ] Système de landing pages ventures (`/ventures/:slug`)
- [ ] Lead magnets avec téléchargement
- [ ] Campagnes emailing automatisées (N8N)
- [ ] Dashboard analytics basique

---

## Phase 3 — CRM + Acquisition outbound
**Status : ⬜ À venir**

- [ ] CRM maison (interface de gestion des leads)
- [ ] Enrichissement LinkedIn
- [ ] Pipeline Google Maps
- [ ] Scoring et qualification automatique
- [ ] Sync Gmail / Outlook

---

## Phase 4 — Couche agentique IA
**Status : ⬜ À venir**

- [ ] Orchestration N8N multi-agents
- [ ] Agents Dust connectés au CRM
- [ ] Agent qualification leads
- [ ] Agent rédaction emails personnalisés

---

## Décisions techniques actées

| Décision | Choix | Raison |
|----------|-------|--------|
| Frontend | React + TypeScript + Tailwind | Stack maîtrisée |
| BDD | Supabase | Auth + DB + Storage en un |
| Bundler | Vite | Rapidité DX |
| Routing | React Router v6 | Standard |
| Deploy | Vercel | CI/CD automatique |
