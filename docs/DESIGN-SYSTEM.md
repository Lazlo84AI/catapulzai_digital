# DESIGN SYSTEM — CatapulZ AI

---

## Identité visuelle

**Mood :** Dark, premium, tech-forward. Énergie sans agressivité.
**Référence esthétique :** Agence tech parisienne × startup IA × cabinet de conseil haut de gamme.

---

## Palette de couleurs

```css
:root {
  /* Backgrounds */
  --color-bg:        #0a0a0f;   /* Background principal */
  --color-surface:   #111118;   /* Cards, panels */
  --color-surface-2: #1a1a24;   /* Hover states, borders */

  /* Accents */
  --color-accent:    #e8ff47;   /* Jaune électrique — CTA, highlights */
  --color-accent-2:  #7c6cfc;   /* Violet — secondaire, badges */

  /* Texte */
  --color-text:      #f0f0f0;   /* Corps de texte principal */
  --color-muted:     #666680;   /* Texte secondaire, placeholders */
  --color-border:    rgba(255,255,255,0.07); /* Bordures subtiles */
}
```

---

## Typographie

```css
/* Display / Titres */
font-family: 'Syne', sans-serif;
/* Weights utilisés : 700, 800 */

/* Corps / UI */
font-family: 'DM Sans', sans-serif;
/* Weights : 300 (light), 400, 500 */
```

**Import Google Fonts :**
```html
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
```

---

## Composants UI de base

### Button Primary (CTA)
```tsx
className="bg-[#e8ff47] text-[#0a0a0f] font-bold font-display px-6 py-3 rounded-lg hover:brightness-110 transition"
```

### Input / Email Field
```tsx
className="w-full bg-[#111118] border border-white/7 rounded-lg px-5 py-4 text-[#f0f0f0] focus:outline-none focus:border-[#e8ff47]/35 placeholder:text-[#666680] transition"
```

### Card
```tsx
className="bg-[#111118] border border-white/7 rounded-xl p-8 hover:border-[#e8ff47]/30 hover:-translate-y-1 transition-all duration-200"
```

---

## Espacement

- Sections : `py-20` mobile → `py-28` desktop
- Container : `max-w-6xl mx-auto px-5 md:px-8`
- Cards gap : `gap-6` → `gap-8`

---

## Effets visuels signature

- **Noise overlay :** opacité 0.025, position fixed
- **Gradient mesh :** radial-gradients violet + jaune en arrière-plan
- **Badge animé :** point pulsant + border accent
- **Hover line :** pseudo-élément ::after scaleX sur les cards
