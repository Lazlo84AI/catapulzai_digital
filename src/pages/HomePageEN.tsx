import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const BLUE   = "#0986F1";
const PINK   = "#FF398E";
const GREEN  = "#00D1CE";
const ORANGE = "#FF7A00";
const VIOLET = "#7c6cfc";

const copy = {
  badge: "Consulting · Engineering · AI Ventures",
  heroTitles: [
    "Your business keeps running.\nEven when you're not working.",
    "Your company is worth 10x more\nwhen it runs without you.",
    "Become the most productive person\nin your industry.",
    "Sleep soundly.\nYour pipeline runs itself.",
    "Work less.\nProduce more. Sleep better.",
    "Stop choosing\nbetween growth and breathing.",
    "The life of a founder,\nwithout the founder's tasks.",
    "Your best year yet.\nWithout your worst weeks.",
    "Do in one week\nwhat your competitors\ndo in a quarter.",
    "Your revenue grows.\nYour mental load shrinks.",
    "Your business handles the money.\nYou handle your family.",
    "Wealthy and present for your family.\nFinally, both at once.",
  ],
  heroParagraph: "CatapulZAI is a service for entrepreneurs and highly motivated professionals who want to extract maximum value from AI for their future.",
  emailLabel: "Get our exclusive AI resources — free",
  emailPlaceholder: "your@email.com",
  emailCTA: "Join →",
  emailMicro: "No spam. Unsubscribe in one click.",
  emailSuccess: "Welcome to the CatapulZ ecosystem. See you soon.",
  pillarsTitle: "Three ways to work together",
  pillarsEyebrow: "Our services",
  pillarsNav: ["1 — AI CONSULTING", "2 — AI ENGINEERING", "3 — AI VENTURES"],
  pillars: [
    {
      num: "01", tag: "AI CONSULTING",
      title: "Transform your business: AI Audit, Strategy, Roadmap & Target Architecture",
      desc: "Audit your organisation and build an AI roadmap prioritised by immediate ROI. Every recommendation is actionable within 25 days.",
      accent: BLUE, id: "pillar-0",
    },
    {
      num: "02", tag: "AI ENGINEERING",
      title: "Bespoke AI Application Development & Agentic Systems",
      desc: "Design and deployment of tailor-made agentic systems with autonomous agents and technical architecture (no-code, code and scalable) adapted to your business processes.",
      accent: ORANGE, id: "pillar-1",
    },
    {
      num: "03", tag: "AI VENTURES",
      title: "Launch your AI offering or AI business to increase your company's value",
      desc: "Build and launch new products, services and AI-centred businesses with an AI client acquisition system — inbound and outbound — from day one.",
      accent: GREEN, id: "pillar-2",
    },
  ],
  navLinks: [
    { label: "Services", href: "#offres" },
    { label: "Business Cases", href: "#business-cases" },
    { label: "Ventures", href: "#ventures" },
  ],
  navCTA: "Start a project →",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@700;800;900&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #0a0a0f; margin: 0; }
  .cz { font-family: 'DM Sans', sans-serif; background: #0a0a0f; color: #f0f0f0; overflow-x: hidden; }
  .cz-noise { position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: 0.025; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
  .cz-mesh { position: fixed; inset: 0; z-index: 0; pointer-events: none; background: radial-gradient(ellipse 65% 55% at 15% 15%, rgba(124,108,252,0.12) 0%, transparent 70%), radial-gradient(ellipse 45% 45% at 85% 85%, rgba(255,57,142,0.07) 0%, transparent 70%); }
  .cz-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 200; display: flex; align-items: center; justify-content: space-between; padding: 18px 40px; border-bottom: 1px solid rgba(255,255,255,0.07); backdrop-filter: blur(24px); background: rgba(10,10,15,0.85); }
  .cz-logo { font-family: 'Raleway', sans-serif; font-size: 21px; font-weight: 900; letter-spacing: -0.5px; display: flex; align-items: baseline; }
  .cz-logo-z, .cz-logo-ai { color: #FF398E; }
  .cz-logo-ai { font-size: 13px; font-weight: 700; margin-left: 1px; letter-spacing: 0.05em; }
  .cz-nav-links { display: flex; gap: 28px; align-items: center; }
  .cz-nav-links a { font-size: 13px; font-weight: 500; color: #666680; text-decoration: none; transition: color 0.2s; }
  .cz-nav-links a:hover { color: #f0f0f0; }
  .cz-nav-cta { background: #FF398E !important; color: #fff !important; padding: 8px 18px; border-radius: 7px; font-weight: 700 !important; font-size: 13px !important; transition: filter 0.2s !important; }
  .cz-nav-cta:hover { filter: brightness(1.1); }
  .cz-lang-btn { display: flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 7px; border: 1px solid rgba(255,255,255,0.15); background: transparent; color: #9a9ab0; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
  .cz-lang-btn:hover { border-color: rgba(255,255,255,0.3); color: #f0f0f0; }
  .cz-nav-dropdown { position: relative; }
  .cz-nav-dropdown-trigger { font-size: 13px; font-weight: 500; color: #666680; background: none; border: none; padding: 0; font-family: 'DM Sans', sans-serif; cursor: pointer; display: flex; align-items: center; gap: 5px; transition: color 0.2s; }
  .cz-nav-dropdown-trigger svg { transition: transform 0.2s; }
  .cz-nav-dropdown:hover .cz-nav-dropdown-trigger { color: #f0f0f0; }
  .cz-nav-dropdown:hover .cz-nav-dropdown-trigger svg { transform: rotate(180deg); }
  .cz-nav-dropdown-menu { position: absolute; top: calc(100% + 14px); left: 50%; transform: translateX(-50%) translateY(-6px); background: #111118; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 8px; min-width: 180px; opacity: 0; pointer-events: none; transition: opacity 0.2s, transform 0.2s; z-index: 300; box-shadow: 0 16px 40px rgba(0,0,0,0.5); }
  .cz-nav-dropdown:hover .cz-nav-dropdown-menu { opacity: 1; pointer-events: auto; transform: translateX(-50%) translateY(0); }
  .cz-nav-dropdown-item { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: 8px; font-size: 13px; font-weight: 500; color: #9a9ab0; text-decoration: none; transition: background 0.15s, color 0.15s; white-space: nowrap; }
  .cz-nav-dropdown-item:hover { background: rgba(255,255,255,0.06); color: #f0f0f0; }
  .cz-nav-dropdown-item-icon { font-size: 14px; flex-shrink: 0; }
  @media (max-width: 640px) { .cz-nav { padding: 16px 20px; } .cz-nav-links { display: none; } }
  .cz-hero { position: relative; z-index: 1; min-height: 100svh; display: flex; flex-direction: column; justify-content: center; padding: 120px 40px 100px; max-width: 1140px; margin: 0 auto; }
  @media (max-width: 640px) { .cz-hero { padding: 100px 20px 80px; } }
  .cz-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,57,142,0.07); border: 1px solid rgba(255,57,142,0.22); padding: 6px 14px; border-radius: 100px; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; color: #FF398E; text-transform: uppercase; margin-bottom: 28px; animation: czFadeUp 0.5s ease both; }
  .cz-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #FF398E; animation: czPulse 2s infinite; }
  .cz-hero-p { font-size: clamp(15px, 1.8vw, 18px); line-height: 1.7; color: #f0f0f0; font-weight: 300; margin-bottom: 40px; max-width: 720px; animation: czFadeUp 0.5s 0.16s ease both; }
  .cz-h1-track { position: relative; min-height: clamp(120px, 18vw, 260px); margin-bottom: 32px; display: flex; align-items: flex-start; }
  .cz-h1 { font-family: 'Raleway', sans-serif; font-size: clamp(36px, 5.5vw, 76px); font-weight: 900; line-height: 1.05; letter-spacing: -2px; color: #f0f0f0; white-space: pre-line; position: absolute; opacity: 0; transform: translateY(40px); transition: opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1); }
  .cz-h1.active { opacity: 1; transform: translateY(0); }
  .cz-h1.exit { opacity: 0; transform: translateY(-40px); }
  @media (max-width: 640px) { .cz-h1-track { min-height: clamp(160px, 40vw, 280px); } }
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
  @media (max-width: 640px) { .cz-pillars-nav { flex-direction: column; } }
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
  .cz-rotator { position: relative; z-index: 5; padding: 80px 40px 100px; text-align: center; border-top: 1px solid rgba(255,255,255,0.06); max-width: 860px; margin: 0 auto; }
  @media (max-width: 640px) { .cz-rotator { padding: 60px 20px 72px; } }
  .cz-rotator-label { font-size: 13px; font-weight: 400; color: #555570; margin-bottom: 20px; }
  .cz-rotator-track { position: relative; min-height: 120px; overflow: hidden; display: flex; align-items: center; justify-content: center; }
  .cz-rotator-item { position: absolute; left: 0; right: 0; font-family: 'Raleway', sans-serif; font-size: clamp(24px, 3.6vw, 48px); font-weight: 800; letter-spacing: -1px; line-height: 1.15; opacity: 0; transform: translateY(50px); transition: opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1); white-space: pre-line; padding: 0 16px; }
  .cz-rotator-item.active { opacity: 1; transform: translateY(0); }
  .cz-rotator-item.exit { opacity: 0; transform: translateY(-50px); }
  .cz-rotator-cursor { display: inline-block; width: 2px; height: 0.8em; background: currentColor; margin-left: 5px; vertical-align: middle; border-radius: 1px; animation: czBlink 1s step-end infinite; }
  @keyframes czBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
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
  .cz-ventures { position: relative; z-index: 5; padding: 80px 40px 100px; border-top: 1px solid rgba(255,255,255,0.06); }
  @media (max-width: 640px) { .cz-ventures { padding: 60px 20px 72px; } }
  .cz-ventures-inner { max-width: 1100px; margin: 0 auto; }
  .cz-ventures-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 48px; gap: 24px; flex-wrap: wrap; }
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
  @keyframes czFadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes czPulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(1.4); } }
`;

const methodPillars = [
  {
    num: "1", color: BLUE,
    tag: "Agentic Experience Design",
    title: "Systems that learn, adapt and self-correct",
    sections: [
      { sub: "Self-Correcting RAG Systems", items: ["Retrieval Augmented Generation", "Real-time external data integration", "Continuous learning, not static"] },
      { sub: "MCP — Model Context Protocol", items: ["Fine orchestration between agents", "Deterministic control (not random)", "Coordinated agents, not unsupervised autonomy"] },
    ],
  },
  {
    num: "2", color: ORANGE,
    tag: "Vibe Coding Tech",
    title: "Engineering built around product, not infrastructure",
    sections: [
      { sub: "Core principles", items: ["Deterministic engineering, not random", "UX/Product Design focus", "Architecture optimised for speed"] },
    ],
  },
  {
    num: "3", color: GREEN,
    tag: "Automated Ecosystem",
    title: "Your existing tools, amplified by AI",
    sections: [
      { sub: "Native integrations", items: ["Connect existing tools (Salesforce, Teams, Copilot)", "APIs & bespoke integrations"] },
    ],
  },
  {
    num: "4", color: VIOLET,
    tag: "AI Infrastructure",
    title: "A foundation ready to scale without rebuilding",
    sections: [
      { sub: "Modular architecture", items: ["Modular AI-ready infrastructure", "Connect existing tools (Salesforce, Teams, Copilot)", "Bespoke APIs and system interoperability"] },
    ],
  },
];

const ventures = [
  {
    color: GREEN, badge: "Hospitality Spin-off", name: "Yemaya", tagline: "AI for Boutique Hotels",
    desc: "Yemaya is the first AI OS designed specifically for independent boutique hotels — automating operations, training teams and building guest loyalty without losing the human soul of character hospitality.",
    features: [
      { icon: "🎤", title: "Voice Ops", desc: "Shift reports and complaints by voice, without tablets or forms" },
      { icon: "🧠", title: "AI Knowledge Base", desc: "Every employee has instant access to all hotel knowledge in real time" },
      { icon: "⭐", title: "Guest Experience AI", desc: "Personalised stays and automated guest satisfaction follow-up" },
      { icon: "📊", title: "Ops Dashboard", desc: "Real-time performance visibility without drowning in data" },
    ],
    status: "Currently deploying",
    statusColor: GREEN,
  },
];

export default function HomePageEN() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [scrollHintVisible, setScrollHintVisible] = useState(true);
  const [activeNav, setActiveNav] = useState(-1);
  const [caseIndex, setCaseIndex] = useState(0);
  const [ventureIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const rotatorPhrases = [
    { text: "Handle your to-do list by voice", color: PINK },
    { text: "Send personalised follow-ups\nautomatically", color: BLUE },
    { text: "Create unique content\nwithout burnout", color: GREEN },
    { text: "Fill your CRM\nfrom the driver's seat", color: PINK },
    { text: "Train your teams automatically", color: BLUE },
    { text: "Turn your data into decisions", color: GREEN },
    { text: "Multiply your capacity without hiring", color: PINK },
    { text: "Scale without increasing your costs", color: BLUE },
    { text: "Respond to tenders\nautomatically", color: GREEN },
    { text: "Evaluate any file\nautomatically", color: PINK },
    { text: "Have an agent that knows\neverything about your business", color: BLUE },
    { text: "Coach your teams\non the new strategy", color: GREEN },
    { text: "Deploy your agents in 4 weeks", color: PINK },
  ];

  const cases = [
    {
      num: "01", tag: "AI Content Engine", color: PINK,
      benefit: "Publish 6x more. Work 83% less. Same quality.",
      problem: '"I spent 2 hours per post, alone in front of my camera, not knowing what to say or what to research."',
      agents: [
        { icon: "🔍", label: "Monitoring Agent — scrapes sector news 24/7" },
        { icon: "🎯", label: "Strategy Agent — ensures strategic alignment" },
        { icon: "✍️", label: "Writing Agent — generates and publishes posts" },
        { icon: "🎙️", label: "Interview Agent — automated podcast" },
      ],
      stats: [{ val: "+300%", lbl: "Output" }, { val: "-83%", lbl: "Time/post" }, { val: "+45%", lbl: "Engagement" }],
      tech: ["N8N", "Dust", "ElevenLabs", "Firecrawl", "Unipile"],
    },
    {
      num: "02", tag: "AI Sales & RevOps", color: ORANGE,
      benefit: "Super follow-up system with a self-filling CRM.",
      problem: '"My CRM was never up to date. My salespeople wasted 3 hours a week on admin instead of selling."',
      agents: [
        { icon: "🧠", label: "Strategy Agent — aligns sales actions with performance" },
        { icon: "🎯", label: "Cohort Focus Agent — scores, prioritises and engages targets" },
        { icon: "⏰", label: "Follow-up Agent — tells you what to say, do, and when" },
        { icon: "📞", label: "Recall Agent — re-engages no-shows by AI voice call" },
        { icon: "📋", label: "CRM Agent — fills Folk/Attio from voice input" },
      ],
      stats: [{ val: "+77%", lbl: "Qualification" }, { val: "-55%", lbl: "No-shows" }, { val: "-3h", lbl: "Admin/week" }],
      tech: ["N8N", "Vapi", "Folk", "Attio", "Dust", "FullEnrich"],
    },
    {
      num: "03", tag: "Hospitality OS", color: GREEN,
      benefit: "Your teams know what to do. Without calling you.",
      problem: '"Between shifts, everything gets lost. Nobody knows what happened the day before. Management drowns in basic requests."',
      agents: [
        { icon: "🎤", label: "Voice AI Ops — full activity reports and complaints management, by voice" },
        { icon: "🧠", label: "Training AI Agent — quizzes, spaced repetition, 24/7 Q&A to keep knowledge sharp" },
        { icon: "📚", label: "Knowledge Agent — knows all your docs and answers all team questions" },
      ],
      stats: [{ val: "-40%", lbl: "Incidents" }, { val: "-86%", lbl: "Management requests" }, { val: "+100%", lbl: "Team autonomy" }],
      tech: ["Vapi", "N8N", "Dust", "ElevenLabs"],
    },
    {
      num: "04", tag: "AI Headhunter", color: BLUE,
      benefit: "Respond to 4x more pitches. In 4 hours instead of 5 days.",
      problem: '"We missed deals for lack of time to respond. Matching was manual, proposals generic."',
      agents: [
        { icon: "🔎", label: "Sourcing Agent — scrapes CVs and pitches 24/7" },
        { icon: "⚡", label: "Scoring Agent — candidate fit + gap analysis" },
        { icon: "🎙️", label: "Interview Analyst Agent — preps questions, records the call, gives its verdict" },
        { icon: "📝", label: "Proposal Agent — generates a bespoke proposal" },
      ],
      stats: [{ val: "-90%", lbl: "Response time" }, { val: "+337%", lbl: "Proposal volume" }, { val: "+87%", lbl: "Conversion rate" }],
      tech: ["N8N", "Dust", "Playwright", "Unipile"],
    },
  ];

  const [rotatorIndex, setRotatorIndex] = useState(0);
  const [rotatorState, setRotatorState] = useState<"active" | "exit">("active");
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroState, setHeroState] = useState<"active" | "exit">("active");

  useEffect(() => {
    const interval = setInterval(() => {
      setRotatorState("exit");
      setTimeout(() => { setRotatorIndex(i => (i + 1) % rotatorPhrases.length); setRotatorState("active"); }, 420);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroState("exit");
      setTimeout(() => { setHeroIndex(i => (i + 1) % copy.heroTitles.length); setHeroState("active"); }, 500);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const id = "cz-styles-en";
    if (!document.getElementById(id)) {
      const el = document.createElement("style"); el.id = id; el.textContent = css;
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
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target as HTMLElement;
          const i = Number(card.dataset.index ?? 0);
          setTimeout(() => { card.classList.add("visible"); setActiveNav(i); }, i * 120);
          observer.unobserve(card);
        }
      });
    }, { threshold: 0.2 });
    cardRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    await new Promise(r => setTimeout(r, 900));
    setStatus("done");
  };

  const scrollToPillars = () => document.getElementById("offres")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="cz">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "ProfessionalService",
        "name": "CatapulZ AI", "description": "AI consulting and engineering firm. Agentic systems, AI automation, strategic AI consulting for businesses and entrepreneurs.",
        "url": "https://catapulzai.eu/US", "foundingDate": "2024",
        "address": { "@type": "PostalAddress", "addressCountry": "FR", "addressLocality": "Paris" },
        "areaServed": ["FR", "GB", "BE", "CH"],
        "serviceType": ["AI Consulting", "AI Engineering", "Agentic Systems", "Intelligent Automation"],
      })}} />
      <div className="cz-noise" />
      <div className="cz-mesh" />

      {/* NAV */}
      <nav className="cz-nav" aria-label="Main navigation">
        <div className="cz-logo" aria-label="CatapulZ AI - Home">
          Catapul<span className="cz-logo-z">Z</span><span className="cz-logo-ai">AI</span>
        </div>
        <div className="cz-nav-links" role="navigation">
          {copy.navLinks.map(l =>
            l.label === "Services" ? (
              <div key={l.label} className="cz-nav-dropdown">
                <button className="cz-nav-dropdown-trigger">
                  {l.label}
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div className="cz-nav-dropdown-menu">
                  <a href="/ecosystem/IAagenticsystemtraining" className="cz-nav-dropdown-item">
                    <span className="cz-nav-dropdown-item-icon">🎓</span>Training
                  </a>
                  <a href="https://cal.com/wilfried-de-renty-timeslots" target="_blank" rel="noopener noreferrer" className="cz-nav-dropdown-item">
                    <span className="cz-nav-dropdown-item-icon">📅</span>Consulting
                  </a>
                </div>
              </div>
            ) : (
              <a key={l.label} href={l.href}>{l.label}</a>
            )
          )}
          <a href="#contact" className="cz-nav-cta">{copy.navCTA}</a>
          {/* Language toggle */}
          <button className="cz-lang-btn" onClick={() => navigate("/")}>🇫🇷 FR</button>
        </div>
      </nav>

      {/* SCROLL HINT */}
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

      {/* HERO */}
      <section className="cz-hero" aria-label="CatapulZ AI value proposition" id="contact">
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
                <input type="email" placeholder={copy.emailPlaceholder} value={email} onChange={e => setEmail(e.target.value)} required aria-label="Your email address" />
                <button type="submit" disabled={status === "loading"}>{status === "loading" ? "…" : copy.emailCTA}</button>
              </form>
              <p className="cz-form-micro"><span>🔒</span><span>{copy.emailMicro}</span></p>
            </>
          )}
        </div>
      </section>

      {/* SERVICES */}
      <div className="cz-pillars-intro" id="offres" aria-label="Our AI services">
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

      {/* STACK CARDS */}
      <div className="cz-stack-container">
        {copy.pillars.map((p, i) => (
          <div key={p.tag} className="cz-stack-slot" id={p.id}>
            <div className="cz-stack-card" ref={el => { cardRefs.current[i] = el; }} data-index={i} style={{ zIndex: 10 + i }}>
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

      {/* TEXT ROTATOR */}
      <div className="cz-rotator" aria-hidden="true">
        <p className="cz-rotator-label">With CatapulZ AI, you can</p>
        <div className="cz-rotator-track">
          <span className={`cz-rotator-item ${rotatorState}`} style={{ color: rotatorPhrases[rotatorIndex].color }}>
            {rotatorPhrases[rotatorIndex].text}
            <span className="cz-rotator-cursor" />
          </span>
        </div>
      </div>

      {/* BUSINESS CASES */}
      <section className="cz-cases" id="business-cases" aria-label="Deployed AI case studies">
        <div className="cz-cases-inner">
          <div className="cz-cases-header">
            <div>
              <p className="cz-section-eyebrow">Real deployed cases</p>
              <h2 className="cz-section-title">4 agentic systems. Real results.</h2>
            </div>
            <div className="cz-cases-nav-btns">
              <button className="cz-cases-btn" aria-label="Previous case" onClick={() => setCaseIndex(i => (i - 1 + cases.length) % cases.length)}>←</button>
              <button className="cz-cases-btn" aria-label="Next case" onClick={() => setCaseIndex(i => (i + 1) % cases.length)}>→</button>
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
                    {c.stats.map(s => (
                      <div key={s.lbl}>
                        <div className="cz-case-stat-val" style={{ color: c.color }}>{s.val}</div>
                        <div className="cz-case-stat-lbl">{s.lbl}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="cz-case-right">
                  <div>
                    <p className="cz-case-section-title">Deployed agents</p>
                    <div className="cz-case-agents">
                      {c.agents.map(a => (
                        <div key={a.label} className="cz-case-agent">
                          <span className="cz-case-agent-icon">{a.icon}</span>
                          <span>{a.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="cz-case-section-title">Tech stack</p>
                    <div className="cz-case-tech">
                      {c.tech.map(t => (
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

      {/* METHODOLOGY */}
      <section className="cz-method" id="methodology" aria-label="CatapulZ AI Method — 4 Technical Pillars">
        <div className="cz-method-inner">
          <p className="cz-section-eyebrow">Our approach</p>
          <h2 className="cz-section-title">CatapulZ Method — 4 technical pillars</h2>
          <div className="cz-method-grid">
            {methodPillars.map(p => (
              <article key={p.num} className="cz-method-card">
                <div className="cz-method-card-bar" style={{ background: p.color }} />
                <div className="cz-method-num">{p.num}</div>
                <div className="cz-method-tag" style={{ color: p.color }}>⚡ {p.tag}</div>
                <h3 className="cz-method-title">{p.title}</h3>
                {p.sections.map(sec => (
                  <div key={sec.sub}>
                    <p className="cz-method-sub">{sec.sub}</p>
                    <ul className="cz-method-items">
                      {sec.items.map(item => (
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

      {/* VENTURES */}
      <section className="cz-ventures" id="ventures" aria-label="CatapulZ AI Spin-offs and Ventures">
        <div className="cz-ventures-inner">
          <div className="cz-ventures-header">
            <div>
              <p className="cz-section-eyebrow">Spin-offs & Ventures</p>
              <h2 className="cz-section-title">We also launch AI businesses<br/>with our clients & partners.</h2>
            </div>
          </div>
          {(() => {
            const v = ventures[ventureIndex];
            return (
              <article className="cz-venture-card" style={{ borderTop: `3px solid ${v.color}` }}>
                <div className="cz-venture-left">
                  <div>
                    <div className="cz-venture-badge" style={{ color: v.color, borderColor: `${v.color}44`, background: `${v.color}0d` }}>✦ {v.badge}</div>
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
                    {v.features.map(f => (
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
        </div>
      </section>

      {/* FOOTER */}
      <footer className="cz-footer-wrap" itemScope itemType="https://schema.org/Organization">
        <div className="cz-footer-main">
          <div>
            <div className="cz-logo" aria-label="CatapulZ AI" itemProp="name">Catapul<span className="cz-logo-z">Z</span><span className="cz-logo-ai">AI</span></div>
            <p className="cz-footer-brand-desc" itemProp="description">AI consulting and engineering firm. We deploy bespoke agentic systems for entrepreneurs, SMEs and large organisations across Europe.</p>
            <p className="cz-footer-tagline">Unlock the AI version of yourself and your business.</p>
          </div>
          <div>
            <p className="cz-footer-col-title">Services</p>
            <nav className="cz-footer-links" aria-label="CatapulZ Services">
              <a href="#offres">AI Consulting</a>
              <a href="#offres">AI Engineering</a>
              <a href="#offres">AI Ventures</a>
              <a href="#methodology">Our method</a>
            </nav>
          </div>
          <div>
            <p className="cz-footer-col-title">Resources</p>
            <nav className="cz-footer-links">
              <a href="#business-cases">Case studies</a>
              <a href="#ventures">Our Ventures</a>
              <a href="#contact">AI Newsletter</a>
            </nav>
          </div>
          <div>
            <p className="cz-footer-col-title">Contact</p>
            <address className="cz-footer-address" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <span itemProp="addressLocality">Paris</span>, <span itemProp="addressCountry">France</span><br />
              <a href="mailto:hello@catapulzai.eu" style={{ color: "#555570", textDecoration: "none" }}>hello@catapulzai.eu</a><br />
              <a href="https://www.linkedin.com/company/catapulz-ai" rel="noopener noreferrer" target="_blank" style={{ color: "#FF398E", textDecoration: "none", fontSize: "12px" }}>LinkedIn →</a>
            </address>
          </div>
        </div>
        <div className="cz-footer-bottom">
          <p className="cz-footer-copy">© {new Date().getFullYear()} CatapulZ AI — All rights reserved</p>
          <div className="cz-footer-legal">
            <a href="/mentions-legales">Legal notice</a>
            <a href="/politique-confidentialite">Privacy policy</a>
            <a href="/cgv">Terms</a>
          </div>
        </div>
        <div className="cz-footer-seo-signals" aria-hidden="true">
          <p className="cz-footer-seo-text">CatapulZ AI is a French firm specialising in applied artificial intelligence for businesses. We deliver AI consulting, agentic system engineering and AI venture launches for entrepreneurs, SMEs and organisations across France, Belgium, Switzerland and Luxembourg. Our approach combines RAG, MCP (Model Context Protocol), multi-agent orchestration with N8N and Dust, and voice solution deployment with Vapi and ElevenLabs.</p>
        </div>
      </footer>
    </div>
  );
}
