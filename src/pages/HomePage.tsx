import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   TOKENS COULEURS
───────────────────────────────────────────── */
const BLUE   = "#0986F1";
const PINK   = "#FF398E";
const GREEN  = "#00D1CE";
const ORANGE = "#FF7A00";
const VIOLET = "#7c6cfc";

/* ─────────────────────────────────────────────
   COPY
───────────────────────────────────────────── */
const copy = {
  badge: "Consulting · Ingénierie · Venture IA",
  heroTitles: [
    "Votre activité tourne.\nMême quand vous ne travaillez pas.",
    "Votre boîte vaut 10x plus\nquand elle tourne sans vous.",
    "Devenez la personne la plus\nproductive de votre secteur.",
    "Dormez tranquille.\nVotre pipeline tourne tout seul.",
    "Travaillez moins.\nProduisez plus. Dormez mieux.",
    "Fini de choisir\nentre croître et souffler.",
    "La vie du patron,\nsans les tâches du patron.",
    "Votre meilleure année.\nSans vos pires semaines.",
    "Faites en une semaine\nce que vos concurrents\nfont en un trimestre.",
    "Vos revenus montent.\nVotre charge mentale descend.",
    "Votre business s'occupe de l'argent.\nVous, de votre famille.",
    "Riche et présent pour votre famille.\nEnfin les deux en même temps.",
  ],
  heroParagraph:
    "CatapulZAI est un service à destination des entrepreneurs et des professionnels sur-motivés à tirer le maximum de valeur de l'IA pour leurs avenirs.",
  emailLabel: "Recevez nos ressources IA exclusives — gratuit",
  emailPlaceholder: "votre@email.com",
  emailCTA: "Rejoindre →",
  emailMicro: "Pas de spam. Désabonnement en 1 clic.",
  emailSuccess: "Bienvenue dans l'écosystème CatapulZ. À très vite.",
  pillarsTitle: "Trois façons de travailler ensemble",
  pillarsEyebrow: "Nos services",
  pillarsNav: ["1 — CONSULTING IA", "2 — INGÉNIERIE IA", "3 — VENTURE IA"],
  pillars: [
    {
      num: "01", tag: "CONSULTING IA",
      title: "Transformez votre activité : Audit, Stratégie, Roadmap IA et architecture cible",
      desc: "Auditez votre organisation et construisez une roadmap IA priorisée par ROI immédiat. Chaque recommandation est actionnable dans les 25 jours.",
      accent: BLUE, id: "pillar-0",
    },
    {
      num: "02", tag: "INGÉNIERIE IA",
      title: "Développement d'application IA et Systèmes agentiques sur mesure",
      desc: "Conception et déploiement de systèmes agentiques sur mesure avec agents autonomes et architecture technique (no-code, code et industrialisable) adaptée à vos processus métiers.",
      accent: ORANGE, id: "pillar-1",
    },
    {
      num: "03", tag: "VENTURE IA",
      title: "Lancez votre offre IA ou votre business IA pour valoriser votre entreprise",
      desc: "Construire et lancer de nouveaux produits, services et business centrés sur l'IA avec un système d'acquisition client IA — inbound et outbound — dès le premier jour.",
      accent: GREEN, id: "pillar-2",
    },
  ],
  navLinks: [
    { label: "Services", href: "#offres" },
    { label: "Business Cases", href: "#business-cases" },
    { label: "Ventures", href: "#ventures" },
  ],
  navCTA: "Démarrer un projet →",
};

/* ─────────────────────────────────────────────
   CSS
───────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@700;800;900&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #0a0a0f; margin: 0; }

  .cz { font-family: 'DM Sans', sans-serif; background: #0a0a0f; color: #f0f0f0; overflow-x: hidden; }

  .cz-noise {
    position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }
  .cz-mesh {
    position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 65% 55% at 15% 15%, rgba(124,108,252,0.12) 0%, transparent 70%),
      radial-gradient(ellipse 45% 45% at 85% 85%, rgba(255,57,142,0.07) 0%, transparent 70%);
  }

  /* ── NAV ── */
  .cz-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    display: flex; align-items: center; justify-content: space-between;
    padding: 18px 40px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    backdrop-filter: blur(24px);
    background: rgba(10,10,15,0.85);
  }
  .cz-logo { font-family: 'Raleway', sans-serif; font-size: 21px; font-weight: 900; letter-spacing: -0.5px; display: flex; align-items: baseline; }
  .cz-logo-z, .cz-logo-ai { color: #FF398E; }
  .cz-logo-ai { font-size: 13px; font-weight: 700; margin-left: 1px; letter-spacing: 0.05em; }
  .cz-nav-links { display: flex; gap: 28px; align-items: center; }
  .cz-nav-links a { font-size: 13px; font-weight: 500; color: #666680; text-decoration: none; transition: color 0.2s; }
  .cz-nav-links a:hover { color: #f0f0f0; }
  .cz-nav-cta { background: #FF398E !important; color: #fff !important; padding: 8px 18px; border-radius: 7px; font-weight: 700 !important; font-size: 13px !important; transition: filter 0.2s !important; }
  .cz-nav-cta:hover { filter: brightness(1.1); }
  @media (max-width: 640px) { .cz-nav { padding: 16px 20px; } .cz-nav-links { display: none; } }

  /* ── HERO ── */
  .cz-hero { position: relative; z-index: 1; min-height: 100svh; display: flex; flex-direction: column; justify-content: center; padding: 120px 40px 100px; max-width: 1140px; margin: 0 auto; }
  @media (max-width: 640px) { .cz-hero { padding: 100px 20px 80px; } }

  .cz-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,57,142,0.07); border: 1px solid rgba(255,57,142,0.22); padding: 6px 14px; border-radius: 100px; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; color: #FF398E; text-transform: uppercase; margin-bottom: 28px; animation: czFadeUp 0.5s ease both; }
  .cz-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #FF398E; animation: czPulse 2s infinite; }
  .cz-hero-p { font-size: clamp(15px, 1.8vw, 18px); line-height: 1.7; color: #f0f0f0; font-weight: 300; margin-bottom: 40px; max-width: 720px; animation: czFadeUp 0.5s 0.16s ease both; }

  /* ── H1 ROTATOR ── */
  .cz-h1-track { position: relative; min-height: clamp(120px, 18vw, 260px); margin-bottom: 32px; display: flex; align-items: flex-start; }
  .cz-h1 { font-family: 'Raleway', sans-serif; font-size: clamp(36px, 5.5vw, 76px); font-weight: 900; line-height: 1.05; letter-spacing: -2px; color: #f0f0f0; white-space: pre-line; position: absolute; opacity: 0; transform: translateY(40px); transition: opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1); animation: none; }
  .cz-h1.active { opacity: 1; transform: translateY(0); }
  .cz-h1.exit   { opacity: 0; transform: translateY(-40px); }
  @media (max-width: 640px) { .cz-h1-track { min-height: clamp(160px, 40vw, 280px); } }

  /* ── FORM ── */
  .cz-form-block { animation: czFadeUp 0.5s 0.24s ease both; max-width: 520px; }
  .cz-form-label { font-size: 12px; font-weight: 500; color: #666680; letter-spacing: 0.04em; margin-bottom: 10px; text-transform: uppercase; }
  .cz-form { display: flex; overflow: hidden; border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; background: #111118; transition: border-color 0.2s, box-shadow 0.2s; }
  .cz-form:focus-within { border-color: rgba(255,57,142,0.4); box-shadow: 0 0 0 4px rgba(255,57,142,0.06); }
  .cz-form input { flex: 1; background: transparent; border: none; outline: none; padding: 15px 20px; font-family: 'DM Sans', sans-serif; font-size: 15px; color: #f0f0f0; }
  .cz-form input::placeholder { color: #666680; }
  .cz-form button { background: #FF398E; color: #fff; border: none; padding: 14px 22px; font-family: 'Raleway', sans-serif; font-size: 13px; font-weight: 700; cursor: pointer; white-space: nowrap; transition: filter 0.15s; }
  .cz-form button:hover { filter: brightness(1.1); }
  .cz-form button:disabled { opacity: 0.55; cursor: not-allowed; }
  .cz-form-micro { margin-top: 10px; font-size: 12px; color: #666680; display: flex; align-items: center; gap: 6px; }
  .cz-success { display: flex; align-items: center; gap: 12px; background: rgba(255,57,142,0.07); border: 1px solid rgba(255,57,142,0.25); border-radius: 10px; padding: 16px 20px; font-size: 15px; color: #FF398E; font-weight: 500; }

  /* ── SCROLL HINT ── */
  .cz-scroll-hint { position: fixed; bottom: 36px; left: 50%; transform: translateX(-50%); z-index: 150; display: flex; flex-direction: column; align-items: center; gap: 10px; opacity: 1; transition: opacity 0.5s ease; pointer-events: auto; }
  .cz-scroll-hint.hidden { opacity: 0; pointer-events: none; }
  .cz-scroll-hint-label { font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #555570; }
  .cz-radar-btn { position: relative; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
  .cz-radar-circle { position: absolute; inset: 0; border-radius: 50%; border: 1.5px solid rgba(255,57,142,0.5); }
  .cz-radar-wave { position: absolute; inset: 0; border-radius: 50%; border: 1px solid rgba(255,57,142,0.4); animation: czRadarWave 2.2s ease-out infinite; }
  .cz-radar-wave:nth-child(2) { animation-delay: 0.7s; }
  .cz-radar-wave:nth-child(3) { animation-delay: 1.4s; }
  .cz-radar-icon { position: relative; z-index: 2; animation: czBounce 1.8s ease-in-out infinite; }
  @keyframes czRadarWave { 0% { transform: scale(1); opacity: 0.5; } 100% { transform: scale(2.6); opacity: 0; } }
  @keyframes czBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(5px); } }

  /* ── PILLARS INTRO ── */
  .cz-pillars-intro { position: sticky; top: 72px; z-index: 2; background: #0a0a0f; padding: 52px 40px 40px; border-bottom: 1px solid rgba(255,255,255,0.06); pointer-events: auto; }
  .cz-pillars-intro-inner { max-width: 1140px; margin: 0 auto; }
  @media (max-width: 640px) { .cz-pillars-intro { padding: 40px 20px 28px; } }
  .cz-section-eyebrow { font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #FF398E; margin-bottom: 10px; }
  .cz-section-title { font-family: 'Raleway', sans-serif; font-size: clamp(26px, 3.2vw, 44px); font-weight: 900; letter-spacing: -1px; line-height: 1.1; margin-bottom: 32px; }
  .cz-pillars-nav { display: flex; gap: 12px; max-width: 900px; }
  .cz-pillars-nav-item { flex: 1; padding: 18px 24px; font-family: 'Raleway', sans-serif; font-size: 16px; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; color: #444460; text-align: center; border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; transition: color 0.25s, background 0.25s, border-color 0.25s, transform 0.2s; cursor: pointer; }
  .cz-pillars-nav-item:hover { color: #f0f0f0; background: rgba(255,255,255,0.04); transform: translateY(-2px); }
  .cz-pillars-nav-item.active-0 { color: #0986F1; background: rgba(9,134,241,0.08); border-color: rgba(9,134,241,0.3); }
  .cz-pillars-nav-item.active-1 { color: #FF7A00; background: rgba(255,122,0,0.08); border-color: rgba(255,122,0,0.3); }
  .cz-pillars-nav-item.active-2 { color: #00D1CE; background: rgba(0,209,206,0.08); border-color: rgba(0,209,206,0.3); }
  .cz-pillars-nav-item.active-0:hover, .cz-pillars-nav-item.active-1:hover, .cz-pillars-nav-item.active-2:hover { color: #f0f0f0; background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.08); transform: translateY(-2px); }
  @media (max-width: 640px) { .cz-pillars-nav { flex-direction: column; } }

  /* ── STACK CARDS ── */
  .cz-stack-container { position: relative; z-index: 5; max-width: 960px; margin: 0 auto; padding: 0 40px 120px; display: flex; flex-direction: column; gap: 24px; }
  @media (max-width: 640px) { .cz-stack-container { padding: 0 20px 80px; gap: 16px; } }
  .cz-stack-slot { position: relative; }
  .cz-stack-card { opacity: 0; transform: translateY(40px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .cz-stack-card.visible { opacity: 1; transform: translateY(0); }
  .cz-stack-card-inner { width: 100%; max-width: 920px; background: #0f0f18; border: 1px solid rgba(255,255,255,0.09); border-radius: 24px; padding: 56px 52px; display: grid; grid-template-columns: 200px 1fr; gap: 52px; align-items: start; box-shadow: 0 32px 80px rgba(0,0,0,0.6); position: relative; overflow: hidden; }
  .cz-stack-card-bar { position: absolute; top: 0; left: 0; right: 0; height: 3px; border-radius: 24px 24px 0 0; }
  @media (max-width: 768px) { .cz-stack-card-inner { grid-template-columns: 1fr; gap: 24px; padding: 32px 28px; } }
  .cz-card-num { font-family: 'Raleway', sans-serif; font-size: 110px; font-weight: 900; line-height: 1; letter-spacing: -8px; color: rgba(255,255,255,0.35); margin-bottom: -12px; user-select: none; }
  .cz-card-num-label { font-family: 'Raleway', sans-serif; font-size: 12px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 4px; opacity: 0.4; }
  .cz-card-tag { font-family: 'Raleway', sans-serif; font-size: 20px; font-weight: 900; letter-spacing: 0.04em; text-transform: uppercase; line-height: 1.15; }
  .cz-card-right { padding-top: 4px; }
  .cz-card-title { font-family: 'Raleway', sans-serif; font-size: clamp(19px, 2.2vw, 28px); font-weight: 800; letter-spacing: -0.4px; line-height: 1.25; margin-bottom: 20px; }
  .cz-card-desc { font-size: 15px; line-height: 1.78; color: #7a7a98; font-weight: 300; }

  /* ── TEXT ROTATOR ── */
  .cz-rotator { position: relative; z-index: 5; padding: 80px 40px 100px; text-align: center; border-top: 1px solid rgba(255,255,255,0.06); max-width: 860px; margin: 0 auto; }
  @media (max-width: 640px) { .cz-rotator { padding: 60px 20px 72px; } }
  .cz-rotator-label { font-size: 13px; font-weight: 400; color: #555570; margin-bottom: 20px; }
  .cz-rotator-track { position: relative; min-height: 120px; overflow: hidden; display: flex; align-items: center; justify-content: center; }
  .cz-rotator-item { position: absolute; left: 0; right: 0; font-family: 'Raleway', sans-serif; font-size: clamp(24px, 3.6vw, 48px); font-weight: 800; letter-spacing: -1px; line-height: 1.15; opacity: 0; transform: translateY(50px); transition: opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1); white-space: pre-line; padding: 0 16px; }
  .cz-rotator-item.active { opacity: 1; transform: translateY(0); }
  .cz-rotator-item.exit   { opacity: 0; transform: translateY(-50px); }
  .cz-rotator-cursor { display: inline-block; width: 2px; height: 0.8em; background: currentColor; margin-left: 5px; vertical-align: middle; border-radius: 1px; animation: czBlink 1s step-end infinite; }
  @keyframes czBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

  /* ── CASES CAROUSEL (business-cases) ── */
  .cz-cases { position: relative; z-index: 5; padding: 80px 40px 100px; border-top: 1px solid rgba(255,255,255,0.06); }
  @media (max-width: 640px) { .cz-cases { padding: 60px 20px 72px; } }
  .cz-cases-inner { max-width: 1100px; margin: 0 auto; }
  .cz-cases-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 48px; gap: 24px; flex-wrap: wrap; }
  .cz-cases-nav-btns { display: flex; gap: 10px; }
  .cz-cases-btn { width: 44px; height: 44px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.12); background: transparent; color: #f0f0f0; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s, border-color 0.2s; font-size: 18px; }
  .cz-cases-btn:hover { background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.25); }
  .cz-cases-dots { display: flex; gap: 8px; align-items: center; margin-bottom: 32px; }
  .cz-cases-dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.15); transition: width 0.3s, background 0.3s; cursor: pointer; }
  .cz-cases-dot.active { width: 24px; border-radius: 3px; background: #FF398E; }
  .cz-case-card { background: #0f0f18; border: 1px solid rgba(255,255,255,0.09); border-radius: 24px; overflow: hidden; display: grid; grid-template-columns: 1fr 1fr; min-height: 460px; box-shadow: 0 32px 80px rgba(0,0,0,0.5); }
  @media (max-width: 768px) { .cz-case-card { grid-template-columns: 1fr; } }
  .cz-case-left { padding: 52px 48px; display: flex; flex-direction: column; justify-content: space-between; border-right: 1px solid rgba(255,255,255,0.07); }
  @media (max-width: 768px) { .cz-case-left { padding: 36px 28px; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.07); } }
  .cz-case-tag { display: inline-flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 20px; }
  .cz-case-tag-dot { width: 6px; height: 6px; border-radius: 50%; }
  .cz-case-benefit { font-family: 'Raleway', sans-serif; font-size: clamp(22px, 2.8vw, 36px); font-weight: 900; letter-spacing: -0.8px; line-height: 1.1; margin-bottom: 20px; }
  .cz-case-problem { font-size: 14px; line-height: 1.7; color: #7a7a98; font-weight: 300; margin-bottom: 28px; font-style: italic; }
  .cz-case-stats { display: flex; gap: 24px; flex-wrap: wrap; }
  .cz-case-stat-val { font-family: 'Raleway', sans-serif; font-size: 28px; font-weight: 900; letter-spacing: -1px; }
  .cz-case-stat-lbl { font-size: 11px; color: #7a7a98; font-weight: 500; margin-top: 2px; }
  .cz-case-right { padding: 52px 48px; display: flex; flex-direction: column; gap: 28px; }
  @media (max-width: 768px) { .cz-case-right { padding: 36px 28px; } }
  .cz-case-section-title { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #444460; margin-bottom: 12px; }
  .cz-case-agents { display: flex; flex-direction: column; gap: 10px; }
  .cz-case-agent { display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; padding: 12px 16px; font-size: 14px; font-weight: 500; }
  .cz-case-agent-icon { font-size: 16px; flex-shrink: 0; }
  .cz-case-tech { display: flex; gap: 8px; flex-wrap: wrap; }
  .cz-case-tech-pill { padding: 5px 12px; border-radius: 100px; font-size: 11px; font-weight: 700; letter-spacing: 0.05em; border: 1px solid rgba(255,255,255,0.1); color: #888; }

  /* ── MÉTHODOLOGIE ── */
  .cz-method { position: relative; z-index: 5; padding: 80px 40px 100px; border-top: 1px solid rgba(255,255,255,0.06); }
  @media (max-width: 640px) { .cz-method { padding: 60px 20px 72px; } }
  .cz-method-inner { max-width: 1100px; margin: 0 auto; }
  .cz-method-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 48px; }
  @media (max-width: 768px) { .cz-method-grid { grid-template-columns: 1fr; } }
  .cz-method-card { background: #0f0f18; border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 40px 36px; position: relative; overflow: hidden; transition: border-color 0.3s, transform 0.3s; }
  .cz-method-card:hover { border-color: rgba(255,255,255,0.18); transform: translateY(-3px); }
  .cz-method-card-bar { position: absolute; top: 0; left: 0; right: 0; height: 2px; border-radius: 20px 20px 0 0; }
  .cz-method-num { font-family: 'Raleway', sans-serif; font-size: 64px; font-weight: 900; line-height: 1; letter-spacing: -4px; color: rgba(255,255,255,0.06); position: absolute; top: 20px; right: 28px; user-select: none; }
  .cz-method-tag { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 12px; }
  .cz-method-title { font-family: 'Raleway', sans-serif; font-size: clamp(17px, 1.6vw, 22px); font-weight: 800; letter-spacing: -0.3px; line-height: 1.2; margin-bottom: 20px; }
  .cz-method-sub { font-size: 13px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: #666680; margin-bottom: 10px; margin-top: 16px; }
  .cz-method-items { list-style: none; display: flex; flex-direction: column; gap: 7px; }
  .cz-method-item { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; line-height: 1.5; color: #9a9ab0; }
  .cz-method-item-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; margin-top: 6px; }

  /* ── VENTURES / SPIN-OFFS ── */
  .cz-ventures { position: relative; z-index: 5; padding: 80px 40px 100px; border-top: 1px solid rgba(255,255,255,0.06); }
  @media (max-width: 640px) { .cz-ventures { padding: 60px 20px 72px; } }
  .cz-ventures-inner { max-width: 1100px; margin: 0 auto; }
  .cz-ventures-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 48px; gap: 24px; flex-wrap: wrap; }
  .cz-ventures-slider { overflow: hidden; }
  .cz-venture-card { background: #0f0f18; border: 1px solid rgba(255,255,255,0.09); border-radius: 24px; overflow: hidden; display: grid; grid-template-columns: 1fr 1.2fr; min-height: 420px; box-shadow: 0 32px 80px rgba(0,0,0,0.5); }
  @media (max-width: 768px) { .cz-venture-card { grid-template-columns: 1fr; } }
  .cz-venture-left { padding: 52px 48px; display: flex; flex-direction: column; justify-content: space-between; border-right: 1px solid rgba(255,255,255,0.07); }
  @media (max-width: 768px) { .cz-venture-left { padding: 36px 28px; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.07); } }
  .cz-venture-badge { display: inline-flex; align-items: center; gap: 8px; font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; padding: 4px 12px; border-radius: 100px; border: 1px solid; margin-bottom: 24px; }
  .cz-venture-name { font-family: 'Raleway', sans-serif; font-size: clamp(32px, 4vw, 56px); font-weight: 900; letter-spacing: -2px; line-height: 1; margin-bottom: 16px; }
  .cz-venture-tagline { font-size: 16px; font-weight: 400; color: #9a9ab0; line-height: 1.6; margin-bottom: 28px; }
  .cz-venture-desc { font-size: 14px; line-height: 1.75; color: #666680; font-weight: 300; }
  .cz-venture-right { padding: 52px 48px; display: flex; flex-direction: column; gap: 20px; justify-content: center; }
  @media (max-width: 768px) { .cz-venture-right { padding: 36px 28px; } }
  .cz-venture-features { display: flex; flex-direction: column; gap: 14px; }
  .cz-venture-feature { display: flex; align-items: flex-start; gap: 14px; padding: 14px 18px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; }
  .cz-venture-feature-icon { font-size: 20px; flex-shrink: 0; }
  .cz-venture-feature-title { font-size: 13px; font-weight: 600; margin-bottom: 3px; }
  .cz-venture-feature-desc { font-size: 12px; color: #666680; line-height: 1.5; }
  .cz-venture-status { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; margin-top: 8px; }
  .cz-venture-status-dot { width: 7px; height: 7px; border-radius: 50%; animation: czPulse 2s infinite; }
  .cz-ventures-dots { display: flex; gap: 8px; align-items: center; margin-top: 28px; }
  .cz-ventures-dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.15); transition: width 0.3s, background 0.3s; cursor: pointer; }
  .cz-ventures-dot.active { width: 24px; border-radius: 3px; background: #FF398E; }

  /* ── FOOTER SEO ── */
  .cz-footer-wrap { position: relative; z-index: 10; background: #080810; border-top: 1px solid rgba(255,255,255,0.08); }
  .cz-footer-main { max-width: 1140px; margin: 0 auto; padding: 64px 40px 40px; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; }
  @media (max-width: 900px) { .cz-footer-main { grid-template-columns: 1fr 1fr; gap: 32px; } }
  @media (max-width: 640px) { .cz-footer-main { grid-template-columns: 1fr; padding: 48px 20px 32px; } }
  .cz-footer-brand-desc { font-size: 14px; line-height: 1.7; color: #555570; margin-top: 16px; max-width: 280px; }
  .cz-footer-tagline { font-size: 12px; color: #444460; margin-top: 12px; font-style: italic; }
  .cz-footer-col-title { font-family: 'Raleway', sans-serif; font-size: 12px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: #f0f0f0; margin-bottom: 16px; }
  .cz-footer-links { display: flex; flex-direction: column; gap: 10px; }
  .cz-footer-links a { font-size: 13px; color: #555570; text-decoration: none; transition: color 0.2s; }
  .cz-footer-links a:hover { color: #f0f0f0; }
  .cz-footer-address { font-size: 13px; color: #444460; line-height: 1.8; font-style: normal; }
  .cz-footer-bottom { max-width: 1140px; margin: 0 auto; padding: 20px 40px 28px; display: flex; align-items: center; justify-content: space-between; gap: 16px; border-top: 1px solid rgba(255,255,255,0.05); flex-wrap: wrap; }
  @media (max-width: 640px) { .cz-footer-bottom { flex-direction: column; text-align: center; padding: 20px; } }
  .cz-footer-copy { font-size: 12px; color: #444460; }
  .cz-footer-legal { display: flex; gap: 20px; }
  .cz-footer-legal a { font-size: 12px; color: #444460; text-decoration: none; transition: color 0.2s; }
  .cz-footer-legal a:hover { color: #666680; }
  .cz-footer-seo-signals { max-width: 1140px; margin: 0 auto; padding: 0 40px 24px; }
  @media (max-width: 640px) { .cz-footer-seo-signals { padding: 0 20px 20px; } }
  .cz-footer-seo-text { font-size: 11px; color: #2a2a3a; line-height: 1.6; }

  /* ── KEYFRAMES ── */
  @keyframes czFadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes czPulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(1.4); } }
`;

/* ─────────────────────────────────────────────
   DONNÉES MÉTHODOLOGIE
───────────────────────────────────────────── */
const methodPillars = [
  {
    num: "1", color: BLUE,
    tag: "Agentic Experience Design",
    title: "Des systèmes qui apprennent, s'adaptent et se corrigent",
    sections: [
      {
        sub: "RAG Systems Auto-Correctifs",
        items: ["Retrieval Augmented Generation", "Intégration données externes temps réel", "Apprentissage continu, pas figé"],
      },
      {
        sub: "MCP — Model Context Protocol",
        items: ["Orchestration fine entre agents", "Contrôle déterministe (pas aléatoire)", "Agents coordonnés, pas autonomes non supervisés"],
      },
    ],
  },
  {
    num: "2", color: ORANGE,
    tag: "Vibe Coding Tech",
    title: "Une ingénierie pensée produit, pas infrastructure",
    sections: [
      {
        sub: "Principes fondateurs",
        items: ["Ingénierie déterministe, pas aléatoire", "Focus UX/Product Design", "Architecture optimisée pour la vitesse"],
      },
    ],
  },
  {
    num: "3", color: GREEN,
    tag: "Écosystème Automatisé",
    title: "Vos outils existants, amplifiés par l'IA",
    sections: [
      {
        sub: "Intégrations natives",
        items: ["Connexion outils existants (Salesforce, Teams, Copilot)", "APIs & intégrations sur-mesure"],
      },
    ],
  },
  {
    num: "4", color: VIOLET,
    tag: "Infrastructure IA",
    title: "Une base prête pour scaler sans refondre",
    sections: [
      {
        sub: "Architecture modulaire",
        items: ["Infrastructures modulaires prêtes pour l'IA", "Connexion des outils existants (Salesforce, Teams, Copilot)", "APIs sur-mesure et interopérabilité SI"],
      },
    ],
  },
];

/* ─────────────────────────────────────────────
   DONNÉES VENTURES
───────────────────────────────────────────── */
const ventures = [
  {
    color: GREEN,
    badge: "Spin-off Hospitality",
    name: "Yemaya",
    tagline: "AI for Boutique Hotel",
    desc: "Yemaya est le premier OS IA conçu spécifiquement pour les hôtels boutique indépendants — automatisant les opérations, formant les équipes et fidélisant les clients sans perdre l'âme humaine de l'hôtellerie de caractère.",
    features: [
      { icon: "🎤", title: "Voice Ops", desc: "Rapports de shift et réclamations à la voix, sans tablette ni formulaire" },
      { icon: "🧠", title: "Knowledge Base IA", desc: "Chaque employé a accès à toute la connaissance de l'hôtel en temps réel" },
      { icon: "⭐", title: "Guest Experience AI", desc: "Personnalisation des séjours et suivi automatisé de la satisfaction client" },
      { icon: "📊", title: "Ops Dashboard", desc: "Vision temps réel sur les performances sans noyade dans les données" },
    ],
    status: "En cours de déploiement",
    statusColor: GREEN,
  },
];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function HomePage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [scrollHintVisible, setScrollHintVisible] = useState(true);
  const [activeNav, setActiveNav] = useState(-1);
  const [caseIndex, setCaseIndex] = useState(0);
  const [ventureIndex, setVentureIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const rotatorPhrases = [
    { text: "Faire vos to-dos à la voix", color: PINK },
    { text: "Faire un follow up\npersonnalisé et automatisé", color: BLUE },
    { text: "Créez des contenus uniques\nsans burn-out", color: GREEN },
    { text: "Remplir le CRM\nau volant d'une voiture", color: PINK },
    { text: "Former vos équipes automatiquement", color: BLUE },
    { text: "Transformer vos données en décision", color: GREEN },
    { text: "Multiplier vos capacités sans recruter", color: PINK },
    { text: "Scalez sans augmenter vos coûts", color: BLUE },
    { text: "Répondre aux appels d'offres\nautomatiquement", color: GREEN },
    { text: "Évaluez automatiquement\ntel ou tel dossier", color: PINK },
    { text: "Avoir un agent qui sait\ntout de votre entreprise", color: BLUE },
    { text: "Coachez vos équipes\nsur la nouvelle stratégie", color: GREEN },
    { text: "Déployez vos agents en 4 semaines", color: PINK },
  ];
  const [rotatorIndex, setRotatorIndex] = useState(0);
  const [rotatorState, setRotatorState] = useState<"active" | "exit">("active");
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroState, setHeroState] = useState<"active" | "exit">("active");

  const cases = [
    {
      num: "01", tag: "Content Engine IA", color: PINK,
      benefit: "Publiez 6x plus. Travaillez 83% moins. Qualité équivalente.",
      problem: "\"Je passais 2h par post, seule face à ma caméra, sans savoir quoi dire ni sur quoi faire ma veille.\"",
      agents: [
        { icon: "🔍", label: "Agent Veille — scrape l'actu secteur 24/7" },
        { icon: "🎯", label: "Agent Stratégie — s'assure du respect de la stratégie" },
        { icon: "✍️", label: "Agent Rédaction — génère et publie les posts" },
        { icon: "🎙️", label: "Agent Interviewer — podcast automatique" },
      ],
      stats: [{ val: "+300%", lbl: "Production" }, { val: "-83%", lbl: "Temps/post" }, { val: "+45%", lbl: "Engagement" }],
      tech: ["N8N", "Dust", "ElevenLabs", "Firecrawl", "Unipile"],
    },
    {
      num: "02", tag: "AI Sales & RevOps", color: ORANGE,
      benefit: "Système super follow-up avec votre CRM qui se remplit tout seul.",
      problem: "\"Mon CRM n'était jamais à jour. Mes commerciaux perdaient 3h/semaine en admin au lieu de vendre.\"",
      agents: [
        { icon: "🧠", label: "Agent Stratégie — aligne les actions commerciales sur la performance" },
        { icon: "🎯", label: "Agent Cohort Focus — score, priorise et questionne sur mesure" },
        { icon: "⏰", label: "Agent Relance — vous dit quoi dire, quoi faire et quand le faire" },
        { icon: "📞", label: "Agent Rappel — relance les no-shows par IA vocale" },
        { icon: "📋", label: "Agent CRM — remplit Folk/Attio depuis la voix" },
      ],
      stats: [{ val: "+77%", lbl: "Qualification" }, { val: "-55%", lbl: "No-shows" }, { val: "-3h", lbl: "Admin/semaine" }],
      tech: ["N8N", "Vapi", "Folk", "Attio", "Dust", "FullEnrich"],
    },
    {
      num: "03", tag: "Hospitality OS", color: GREEN,
      benefit: "Vos équipes savent quoi faire. Sans vous appeler.",
      problem: "\"Entre les shifts, tout se perd. Personne ne sait ce qui s'est passé la veille. Le management croule sous les demandes basiques.\"",
      agents: [
        { icon: "🎤", label: "Voice AI Ops — gestion intégrale des rapports d'activité et des réclamations, à la voix" },
        { icon: "🧠", label: "Agent Training AI — quiz, répétition espacée, Q&A 24/7 pour garder les connaissances au top" },
        { icon: "📚", label: "Agent Knowledge — connaît tous vos docs et répond à toutes les questions de vos équipes" },
      ],
      stats: [{ val: "-40%", lbl: "Incidents" }, { val: "-86%", lbl: "Demandes management" }, { val: "+100%", lbl: "Autonomie équipes" }],
      tech: ["Vapi", "N8N", "Dust", "ElevenLabs"],
    },
    {
      num: "04", tag: "Headhunter IA", color: BLUE,
      benefit: "Répondez à 4x plus d'appels d'offres. En 4h au lieu de 5 jours.",
      problem: "\"On ratait des deals faute de temps pour répondre. Le matching était manuel, les propals génériques.\"",
      agents: [
        { icon: "🔎", label: "Agent Sourcing — scrape CVs et appels d'offres 24/24" },
        { icon: "⚡", label: "Agent Scoring — fit candidatures + gap analysis" },
        { icon: "🎙️", label: "Agent Analyste Interview — prépare les questions, enregistre le call, vous donne son avis" },
        { icon: "📝", label: "Agent Proposal — génère la propal sur-mesure" },
      ],
      stats: [{ val: "-90%", lbl: "Temps de réponse" }, { val: "+337%", lbl: "Volume propals" }, { val: "+87%", lbl: "Taux conversion" }],
      tech: ["N8N", "Dust", "Playwright", "Unipile"],
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRotatorState("exit");
      setTimeout(() => { setRotatorIndex((i) => (i + 1) % rotatorPhrases.length); setRotatorState("active"); }, 420);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroState("exit");
      setTimeout(() => { setHeroIndex((i) => (i + 1) % copy.heroTitles.length); setHeroState("active"); }, 500);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const id = "cz-styles";
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id; el.textContent = css;
      document.head.appendChild(el);
    }
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollHintVisible(window.scrollY < 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target as HTMLElement;
            const i = Number(card.dataset.index ?? 0);
            setTimeout(() => { card.classList.add("visible"); setActiveNav(i); }, i * 120);
            observer.unobserve(card);
          }
        });
      },
      { threshold: 0.2 }
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("done");
  };

  const scrollToPillars = () => document.getElementById("offres")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="cz">
      {/* ── SEO: JSON-LD Structured Data ── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "CatapulZ AI",
        "description": "Cabinet de conseil et d'ingénierie en intelligence artificielle. Systèmes agentiques, automatisation IA, consulting stratégique IA pour entreprises et entrepreneurs.",
        "url": "https://catapulz.ai",
        "logo": "https://catapulz.ai/logo.png",
        "foundingDate": "2024",
        "address": { "@type": "PostalAddress", "addressCountry": "FR", "addressLocality": "Paris" },
        "areaServed": ["FR", "BE", "CH", "LU"],
        "serviceType": ["Consulting IA", "Ingénierie IA", "Systèmes agentiques", "Automatisation intelligente"],
        "knowsAbout": ["Intelligence Artificielle", "LLM", "RAG", "MCP", "N8N", "Agents IA", "Automatisation"],
        "sameAs": ["https://www.linkedin.com/company/catapulz-ai"],
      })}} />

      <div className="cz-noise" />
      <div className="cz-mesh" />

      {/* ── NAV ── */}
      <nav className="cz-nav" aria-label="Navigation principale">
        <div className="cz-logo" aria-label="CatapulZ AI - Accueil">
          Catapul<span className="cz-logo-z">Z</span><span className="cz-logo-ai">AI</span>
        </div>
        <div className="cz-nav-links" role="navigation">
          {copy.navLinks.map((l) => (
            <a key={l.label} href={l.href}>{l.label}</a>
          ))}
          <a href="#contact" className="cz-nav-cta">{copy.navCTA}</a>
        </div>
      </nav>

      {/* ── SCROLL HINT ── */}
      <div className={`cz-scroll-hint${scrollHintVisible ? "" : " hidden"}`} aria-hidden="true">
        <span className="cz-scroll-hint-label">Scroll down</span>
        <div className="cz-radar-btn" onClick={scrollToPillars}>
          <div className="cz-radar-wave" /><div className="cz-radar-wave" /><div className="cz-radar-wave" />
          <div className="cz-radar-circle" />
          <svg className="cz-radar-icon" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 3.5v11M4 9.5l5 5 5-5" stroke="#FF398E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="cz-hero" aria-label="Proposition de valeur CatapulZ AI" id="contact">
        <div className="cz-badge"><span className="cz-badge-dot" />{copy.badge}</div>
        <div className="cz-h1-track">
          <h1 className={`cz-h1 ${heroState}`}>{copy.heroTitles[heroIndex]}</h1>
        </div>
        <p className="cz-hero-p">{copy.heroParagraph}</p>
        <div className="cz-form-block">
          <p className="cz-form-label">{copy.emailLabel}</p>
          {status === "done" ? (
            <div className="cz-success"><span>✦</span><span>{copy.emailSuccess}</span></div>
          ) : (
            <>
              <form className="cz-form" onSubmit={handleSubmit}>
                <input type="email" placeholder={copy.emailPlaceholder} value={email} onChange={(e) => setEmail(e.target.value)} required aria-label="Votre adresse email" />
                <button type="submit" disabled={status === "loading"}>{status === "loading" ? "…" : copy.emailCTA}</button>
              </form>
              <p className="cz-form-micro"><span>🔒</span><span>{copy.emailMicro}</span></p>
            </>
          )}
        </div>
      </section>

      {/* ── SERVICES / PILLARS ── */}
      <div className="cz-pillars-intro" id="offres" aria-label="Nos services IA">
        <div className="cz-pillars-intro-inner">
          <p className="cz-section-eyebrow">{copy.pillarsEyebrow}</p>
          <h2 className="cz-section-title">{copy.pillarsTitle}</h2>
          <div className="cz-pillars-nav" role="tablist">
            {copy.pillarsNav.map((label, i) => (
              <div key={label} role="tab" className={`cz-pillars-nav-item${activeNav === i ? ` active-${i}` : ""}`}
                onClick={() => {
                  const el = document.getElementById(`pillar-${i}`);
                  if (!el) return;
                  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 280, behavior: "smooth" });
                }}>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── STACK CARDS ── */}
      <div className="cz-stack-container">
        {copy.pillars.map((p, i) => (
          <div key={p.tag} className="cz-stack-slot" id={p.id}>
            <div className="cz-stack-card" ref={(el) => { cardRefs.current[i] = el; }} data-index={i} style={{ zIndex: 10 + i }}>
              <div className="cz-stack-card-inner">
                <div className="cz-stack-card-bar" style={{ background: p.accent }} />
                <div className="cz-card-left">
                  <div className="cz-card-num">{p.num}</div>
                  <div className="cz-card-num-label">{p.num} —</div>
                  <div className="cz-card-tag" style={{ color: p.accent }}>{p.tag}</div>
                </div>
                <div className="cz-card-right">
                  <h3 className="cz-card-title">{p.title}</h3>
                  <p className="cz-card-desc">{p.desc}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── TEXT ROTATOR ── */}
      <div className="cz-rotator" aria-hidden="true">
        <p className="cz-rotator-label">Avec CatapulZ AI, vous pouvez</p>
        <div className="cz-rotator-track">
          <span className={`cz-rotator-item ${rotatorState}`} style={{ color: rotatorPhrases[rotatorIndex].color }}>
            {rotatorPhrases[rotatorIndex].text}
            <span className="cz-rotator-cursor" />
          </span>
        </div>
      </div>

      {/* ── BUSINESS CASES ── */}
      <section className="cz-cases" id="business-cases" aria-label="Études de cas IA déployés">
        <div className="cz-cases-inner">
          <div className="cz-cases-header">
            <div>
              <p className="cz-section-eyebrow">Cas concrets déployés</p>
              <h2 className="cz-section-title">4 cas de systèmes agentiques. Vrais résultats.</h2>
            </div>
            <div className="cz-cases-nav-btns">
              <button className="cz-cases-btn" aria-label="Cas précédent" onClick={() => setCaseIndex((i) => (i - 1 + cases.length) % cases.length)}>←</button>
              <button className="cz-cases-btn" aria-label="Cas suivant" onClick={() => setCaseIndex((i) => (i + 1) % cases.length)}>→</button>
            </div>
          </div>
          <div className="cz-cases-dots" role="tablist">
            {cases.map((_, i) => (
              <div key={i} role="tab" aria-selected={i === caseIndex} className={`cz-cases-dot${i === caseIndex ? " active" : ""}`} onClick={() => setCaseIndex(i)} />
            ))}
          </div>
          {(() => {
            const c = cases[caseIndex];
            return (
              <article className="cz-case-card" style={{ borderTop: `3px solid ${c.color}` }}>
                <div className="cz-case-left">
                  <div>
                    <div className="cz-case-tag" style={{ color: c.color }}>
                      <span className="cz-case-tag-dot" style={{ background: c.color }} />{c.num} — {c.tag}
                    </div>
                    <h3 className="cz-case-benefit">{c.benefit}</h3>
                    <p className="cz-case-problem">{c.problem}</p>
                  </div>
                  <div className="cz-case-stats">
                    {c.stats.map((s) => (
                      <div key={s.lbl}>
                        <div className="cz-case-stat-val" style={{ color: c.color }}>{s.val}</div>
                        <div className="cz-case-stat-lbl">{s.lbl}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="cz-case-right">
                  <div>
                    <p className="cz-case-section-title">Les agents déployés</p>
                    <div className="cz-case-agents">
                      {c.agents.map((a) => (
                        <div key={a.label} className="cz-case-agent">
                          <span className="cz-case-agent-icon">{a.icon}</span>
                          <span>{a.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="cz-case-section-title">Stack technique</p>
                    <div className="cz-case-tech">
                      {c.tech.map((t) => (
                        <span key={t} className="cz-case-tech-pill" style={{ borderColor: `${c.color}33`, color: c.color }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })()}
        </div>
      </section>

      {/* ── MÉTHODOLOGIE ── */}
      <section className="cz-method" id="methodologie" aria-label="Méthode CatapulZ AI — 3 Piliers">
        <div className="cz-method-inner">
          <p className="cz-section-eyebrow">Notre approche</p>
          <h2 className="cz-section-title">Méthode CatapulZ — 4 piliers techniques</h2>
          <div className="cz-method-grid">
            {methodPillars.map((p) => (
              <article key={p.num} className="cz-method-card">
                <div className="cz-method-card-bar" style={{ background: p.color }} />
                <div className="cz-method-num">{p.num}</div>
                <div className="cz-method-tag" style={{ color: p.color }}>⚡ {p.tag}</div>
                <h3 className="cz-method-title">{p.title}</h3>
                {p.sections.map((sec) => (
                  <div key={sec.sub}>
                    <p className="cz-method-sub">{sec.sub}</p>
                    <ul className="cz-method-items">
                      {sec.items.map((item) => (
                        <li key={item} className="cz-method-item">
                          <span className="cz-method-item-dot" style={{ background: p.color }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── VENTURES / SPIN-OFFS ── */}
      <section className="cz-ventures" id="ventures" aria-label="Spin-offs et ventures CatapulZ AI">
        <div className="cz-ventures-inner">
          <div className="cz-ventures-header">
            <div>
              <p className="cz-section-eyebrow">Spin-offs & Ventures</p>
              <h2 className="cz-section-title">Nous lançons aussi des business IA<br/>avec nos clients & partenaires.</h2>
            </div>
            {ventures.length > 1 && (
              <div className="cz-cases-nav-btns">
                <button className="cz-cases-btn" onClick={() => setVentureIndex((i) => (i - 1 + ventures.length) % ventures.length)}>←</button>
                <button className="cz-cases-btn" onClick={() => setVentureIndex((i) => (i + 1) % ventures.length)}>→</button>
              </div>
            )}
          </div>

          {(() => {
            const v = ventures[ventureIndex];
            return (
              <article className="cz-venture-card" style={{ borderTop: `3px solid ${v.color}` }}>
                <div className="cz-venture-left">
                  <div>
                    <div className="cz-venture-badge" style={{ color: v.color, borderColor: `${v.color}44`, background: `${v.color}0d` }}>
                      ✦ {v.badge}
                    </div>
                    <div className="cz-venture-name" style={{ color: v.color }}>{v.name}</div>
                    <div className="cz-venture-tagline">{v.tagline}</div>
                    <p className="cz-venture-desc">{v.desc}</p>
                  </div>
                  <div className="cz-venture-status">
                    <span className="cz-venture-status-dot" style={{ background: v.statusColor }} />
                    <span style={{ color: v.statusColor }}>{v.status}</span>
                  </div>
                </div>
                <div className="cz-venture-right">
                  <div className="cz-venture-features">
                    {v.features.map((f) => (
                      <div key={f.title} className="cz-venture-feature">
                        <span className="cz-venture-feature-icon">{f.icon}</span>
                        <div>
                          <div className="cz-venture-feature-title" style={{ color: v.color }}>{f.title}</div>
                          <div className="cz-venture-feature-desc">{f.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })()}

          {ventures.length > 1 && (
            <div className="cz-ventures-dots">
              {ventures.map((_, i) => (
                <div key={i} className={`cz-ventures-dot${i === ventureIndex ? " active" : ""}`} onClick={() => setVentureIndex(i)} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER SEO/GEO ── */}
      <footer className="cz-footer-wrap" itemScope itemType="https://schema.org/Organization">
        <div className="cz-footer-main">
          {/* Colonne Brand */}
          <div>
            <div className="cz-logo" aria-label="CatapulZ AI" itemProp="name">
              Catapul<span className="cz-logo-z">Z</span><span className="cz-logo-ai">AI</span>
            </div>
            <p className="cz-footer-brand-desc" itemProp="description">
              Cabinet de conseil et d'ingénierie en intelligence artificielle. Nous déployons des systèmes agentiques sur mesure pour les entrepreneurs, PME et grands groupes en France et en Europe.
            </p>
            <p className="cz-footer-tagline">Exploitez la version IA de vous-même et de votre activité.</p>
          </div>

          {/* Services */}
          <div>
            <p className="cz-footer-col-title">Services</p>
            <nav className="cz-footer-links" aria-label="Services CatapulZ">
              <a href="#offres">Consulting IA</a>
              <a href="#offres">Ingénierie IA</a>
              <a href="#offres">Venture IA</a>
              <a href="#methodologie">Notre méthode</a>
            </nav>
          </div>

          {/* Ressources */}
          <div>
            <p className="cz-footer-col-title">Ressources</p>
            <nav className="cz-footer-links" aria-label="Ressources">
              <a href="#business-cases">Études de cas</a>
              <a href="#ventures">Nos Ventures</a>
              <a href="#contact">Newsletter IA</a>
            </nav>
          </div>

          {/* Contact & localisation */}
          <div>
            <p className="cz-footer-col-title">Contact</p>
            <address className="cz-footer-address" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <span itemProp="addressLocality">Paris</span>,{" "}
              <span itemProp="addressCountry">France</span>
              <br />
              <a href="mailto:hello@catapulz.ai" style={{ color: "#555570", textDecoration: "none" }}>hello@catapulz.ai</a>
              <br />
              <a href="https://www.linkedin.com/company/catapulz-ai" rel="noopener noreferrer" target="_blank" style={{ color: "#FF398E", textDecoration: "none", fontSize: "12px" }}>
                LinkedIn →
              </a>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="cz-footer-bottom">
          <p className="cz-footer-copy">
            © {new Date().getFullYear()} CatapulZ AI — Tous droits réservés · SIRET en cours d'enregistrement
          </p>
          <div className="cz-footer-legal">
            <a href="/mentions-legales">Mentions légales</a>
            <a href="/politique-confidentialite">Confidentialité</a>
            <a href="/cgv">CGV</a>
          </div>
        </div>

        {/* GEO signals — texte sémantique pour LLMs et moteurs */}
        <div className="cz-footer-seo-signals" aria-hidden="true">
          <p className="cz-footer-seo-text">
            CatapulZ AI est un cabinet français spécialisé en intelligence artificielle appliquée aux entreprises. Nous intervenons en consulting IA, ingénierie de systèmes agentiques et lancement de ventures IA pour des entrepreneurs, PME et organisations en France, Belgique, Suisse et Luxembourg. Notre approche combine RAG, MCP (Model Context Protocol), orchestration multi-agents avec N8N et Dust, et déploiement de solutions vocales avec Vapi et ElevenLabs. Nos cas d'usage couvrent la génération de contenu IA, l'automatisation commerciale (Sales RevOps), l'IA pour l'hôtellerie boutique, et le recrutement augmenté par l'IA.
          </p>
        </div>
      </footer>
    </div>
  );
}
