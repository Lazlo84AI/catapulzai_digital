# BUSINESS RULES — CatapulZ AI

> Règles métier et logique fonctionnelle. Toute décision de code doit
> être cohérente avec ces règles.

---

## Capture de leads

1. **Un email = un lead unique.** Pas de doublons. En cas de soumission
   d'un email déjà existant, afficher le même message de succès (sécurité anti-énumération).

2. **Source obligatoire.** Chaque lead doit avoir une `source` :
   `homepage`, `landing_[slug]`, `crm_manual`, `gmaps`, `linkedin`.

3. **Pas de données sensibles côté client.** La clé Supabase `anon`
   ne donne accès qu'à l'INSERT sur `leads`.

---

## Formulaires

1. Validation côté client d'abord, puis côté Supabase.
2. Message de succès toujours positif — jamais d'erreur technique visible.
3. Bouton désactivé pendant le chargement — pas de double submit.

---

## Contenu éditorial

1. **Langue principale : Français.**
2. **Ton :** Professionnel, direct, sans jargon inutile.
3. **Value prop principale :** "Tirez de vrais revenus de l'IA"
   → toujours présente sur la homepage et les landing pages.

---

## Sécurité

1. Variables d'environnement : jamais en dur dans le code.
2. `.env.local` dans `.gitignore` systématiquement.
3. RLS Supabase activé sur toutes les tables.

---

## Performance

1. LCP < 2.5s sur mobile 4G.
2. Images en WebP, lazy loading systématique.
3. Fonts : `display=swap`.
4. Code splitting par route (lazy imports React).

---

## Déploiement

1. Branche `main` = production.
2. Branche `dev` = développement local.
3. Preview deployments sur chaque PR (Vercel).
