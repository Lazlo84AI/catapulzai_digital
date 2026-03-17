import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const PINK   = "#FF398E";
const BLUE   = "#0986F1";
const GREEN  = "#00D1CE";
const ORANGE = "#FF7A00";
const VIOLET = "#7c6cfc";
const BG     = "#0a0a0f";
const CARD   = "#0f0f18";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@700;800;900&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  .fsa { font-family: 'DM Sans', sans-serif; background: ${BG}; color: #f0f0f0; overflow-x: hidden; }
  .fsa-noise { position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: 0.025; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
  .fsa-mesh { position: fixed; inset: 0; z-index: 0; pointer-events: none; background: radial-gradient(ellipse 60% 50% at 10% 20%, rgba(255,57,142,0.09) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 90% 80%, rgba(9,134,241,0.07) 0%, transparent 70%); }
  .fsa-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 200; display: flex; align-items: center; justify-content: space-between; padding: 16px 40px; border-bottom: 1px solid rgba(255,255,255,0.07); backdrop-filter: blur(24px); background: rgba(10,10,15,0.9); }
  .fsa-nav-logo { font-family: 'Raleway', sans-serif; font-size: 20px; font-weight: 900; letter-spacing: -0.5px; display: flex; align-items: baseline; cursor: pointer; }
  .fsa-nav-logo-z, .fsa-nav-logo-ai { color: ${PINK}; }
  .fsa-nav-logo-ai { font-size: 12px; font-weight: 700; margin-left: 1px; letter-spacing: 0.05em; }
  .fsa-nav-back { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 500; color: #666680; cursor: pointer; padding: 8px 16px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08); background: transparent; transition: color 0.2s, border-color 0.2s, background 0.2s; }
  .fsa-nav-back:hover { color: #f0f0f0; border-color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.04); }
  .fsa-nav-back svg { transition: transform 0.2s; }
  .fsa-lang-btn { display: flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 7px; border: 1px solid rgba(255,255,255,0.15); background: transparent; color: #9a9ab0; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
.fsa-lang-btn:hover { border-color: rgba(255,255,255,0.3); color: #f0f0f0; }
  .fsa-nav-back:hover svg { transform: translateX(-3px); }
  @media (max-width: 640px) { .fsa-nav { padding: 14px 20px; } .fsa-nav-back span { display: none; } }
  .fsa-hero { position: relative; z-index: 1; min-height: 100svh; display: flex; flex-direction: column; justify-content: center; padding: 130px 40px 100px; max-width: 1100px; margin: 0 auto; }
  @media (max-width: 640px) { .fsa-hero { padding: 110px 20px 80px; } }
  .fsa-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,57,142,0.07); border: 1px solid rgba(255,57,142,0.22); padding: 5px 14px; border-radius: 100px; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; color: ${PINK}; text-transform: uppercase; margin-bottom: 24px; animation: fsaFadeUp 0.5s ease both; }
  .fsa-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: ${PINK}; animation: fsaPulse 2s infinite; }
  .fsa-persona-tabs { display: flex; gap: 8px; margin-bottom: 32px; flex-wrap: wrap; animation: fsaFadeUp 0.5s 0.1s ease both; }
  .fsa-persona-tab { padding: 6px 16px; border-radius: 100px; font-size: 12px; font-weight: 600; border: 1px solid rgba(255,255,255,0.1); color: #666680; cursor: pointer; transition: all 0.2s; background: transparent; }
  .fsa-persona-tab.active { border-color: ${PINK}; color: ${PINK}; background: rgba(255,57,142,0.07); }
  .fsa-h1 { font-family: 'Raleway', sans-serif; font-size: clamp(32px, 4.8vw, 64px); font-weight: 900; line-height: 1.05; letter-spacing: -2px; margin-bottom: 20px; animation: fsaFadeUp 0.5s 0.05s ease both; }
  .fsa-h1 span { color: ${PINK}; }
  .fsa-hero-sub { font-size: clamp(15px, 1.7vw, 19px); line-height: 1.7; color: #9a9ab0; font-weight: 300; margin-bottom: 36px; max-width: 760px; animation: fsaFadeUp 0.5s 0.15s ease both; min-height: 90px; }
  .fsa-hero-bullets { display: flex; flex-direction: column; gap: 12px; margin-bottom: 40px; animation: fsaFadeUp 0.5s 0.2s ease both; }
  .fsa-hero-bullet { display: flex; align-items: flex-start; gap: 12px; font-size: 15px; line-height: 1.5; color: #f0f0f0; }
  .fsa-hero-bullet-icon { font-size: 16px; flex-shrink: 0; margin-top: 1px; }
  .fsa-cta-block { animation: fsaFadeUp 0.5s 0.25s ease both; }
  .fsa-cta-btn { display: inline-flex; align-items: center; gap: 10px; background: ${PINK}; color: #fff; padding: 16px 28px; border-radius: 10px; border: none; cursor: pointer; font-family: 'Raleway', sans-serif; font-size: 16px; font-weight: 800; text-decoration: none; transition: filter 0.2s, transform 0.15s; letter-spacing: 0.01em; }
  .fsa-cta-btn:hover { filter: brightness(1.1); transform: translateY(-1px); }
  .fsa-cta-reassurance { display: flex; gap: 20px; margin-top: 14px; flex-wrap: wrap; }
  .fsa-cta-micro { font-size: 12px; color: #f0f0f0; display: flex; align-items: center; gap: 6px; }
  .fsa-cta-micro::before { content: "✓"; color: ${GREEN}; font-weight: 700; }
  .fsa-proof { position: relative; z-index: 5; border-top: 1px solid rgba(255,255,255,0.06); padding: 60px 40px; }
  @media (max-width: 640px) { .fsa-proof { padding: 48px 20px; } }
  .fsa-proof-inner { max-width: 1100px; margin: 0 auto; }
  .fsa-proof-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 36px; gap: 20px; flex-wrap: wrap; }
  .fsa-proof-nav { display: flex; gap: 10px; }
  .fsa-proof-btn { width: 40px; height: 40px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.12); background: transparent; color: #f0f0f0; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s, border-color 0.2s; font-size: 16px; flex-shrink: 0; }
  .fsa-proof-btn:hover { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.25); }
  .fsa-proof-viewport { overflow: hidden; }
  .fsa-proof-track { display: flex; gap: 20px; transition: transform 0.45s cubic-bezier(0.16,1,0.3,1); }
  .fsa-proof-card { background: ${CARD}; border: 1px solid rgba(255,255,255,0.07); border-radius: 20px; padding: 32px 28px; text-align: center; flex-shrink: 0; width: calc((100% - 40px) / 3); transition: border-color 0.25s, transform 0.25s; }
  .fsa-proof-card:hover { border-color: rgba(255,57,142,0.25); transform: translateY(-3px); }
  @media (max-width: 768px) { .fsa-proof-card { width: 100%; } }
  .fsa-proof-icon { font-size: 24px; margin-bottom: 12px; }
  .fsa-proof-val { font-family: 'Raleway', sans-serif; font-size: clamp(32px, 3.5vw, 48px); font-weight: 900; letter-spacing: -2px; margin-bottom: 8px; color: #f0f0f0; }
  .fsa-proof-lbl { font-size: 13px; color: #f0f0f0; line-height: 1.5; font-weight: 500; }
  .fsa-proof-context { font-size: 11px; color: #9a9ab0; margin-top: 6px; font-style: italic; }
  .fsa-proof-dots { display: flex; gap: 6px; align-items: center; margin-top: 24px; justify-content: center; }
  .fsa-proof-dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.15); cursor: pointer; transition: width 0.3s, background 0.3s; }
  .fsa-proof-dot.active { width: 20px; border-radius: 3px; background: ${PINK}; }
  .fsa-section { position: relative; z-index: 5; padding: 80px 40px 100px; border-top: 1px solid rgba(255,255,255,0.06); }
  @media (max-width: 640px) { .fsa-section { padding: 60px 20px 72px; } }
  .fsa-section-inner { max-width: 1100px; margin: 0 auto; }
  .fsa-eyebrow { font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: ${PINK}; margin-bottom: 10px; }
  .fsa-title { font-family: 'Raleway', sans-serif; font-size: clamp(26px, 3.2vw, 44px); font-weight: 900; letter-spacing: -1px; line-height: 1.1; margin-bottom: 16px; }
  .fsa-subtitle { font-size: 16px; color: #7a7a98; font-weight: 300; line-height: 1.7; margin-bottom: 52px; max-width: 620px; }
  .fsa-benefits-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  @media (max-width: 768px) { .fsa-benefits-grid { grid-template-columns: 1fr; gap: 16px; } }
  .fsa-benefit-card { background: ${CARD}; border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 36px 32px; position: relative; overflow: hidden; transition: transform 0.25s, border-color 0.25s; }
  .fsa-benefit-card:hover { transform: translateY(-3px); border-color: rgba(255,255,255,0.16); }
  .fsa-benefit-bar { position: absolute; top: 0; left: 0; right: 0; height: 3px; border-radius: 20px 20px 0 0; }
  /* CHIFFRES BLANCS VISIBLES */
  .fsa-benefit-num { font-family: 'Raleway', sans-serif; font-size: 80px; font-weight: 900; line-height: 1; letter-spacing: -5px; color: #ffffff; position: absolute; top: 14px; right: 20px; user-select: none; opacity: 0.28; }
  .fsa-benefit-avail { display: inline-flex; align-items: center; gap: 6px; padding: 3px 10px; border-radius: 100px; font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 12px; }
  .fsa-benefit-avail.now { background: rgba(0,209,206,0.1); border: 1px solid rgba(0,209,206,0.3); color: ${GREEN}; }
  .fsa-benefit-avail.soon { background: rgba(255,122,0,0.08); border: 1px solid rgba(255,122,0,0.25); color: ${ORANGE}; }
  .fsa-benefit-avail.later { background: rgba(124,108,252,0.08); border: 1px solid rgba(124,108,252,0.25); color: ${VIOLET}; }
  .fsa-benefit-title { font-family: 'Raleway', sans-serif; font-size: clamp(17px, 1.7vw, 21px); font-weight: 800; letter-spacing: -0.3px; line-height: 1.2; margin-bottom: 10px; }
  .fsa-benefit-sub { font-size: 13px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; margin-bottom: 14px; }
  .fsa-benefit-desc { font-size: 14px; line-height: 1.75; color: #7a7a98; font-weight: 300; margin-bottom: 20px; }
  .fsa-benefit-results { display: flex; flex-direction: column; gap: 8px; }
  .fsa-benefit-result { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; line-height: 1.5; color: #9a9ab0; }
  .fsa-benefit-result::before { content: "→"; flex-shrink: 0; font-weight: 700; }
  .fsa-pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; align-items: start; }
  @media (max-width: 900px) { .fsa-pricing-grid { grid-template-columns: 1fr; max-width: 480px; } }
  .fsa-pricing-card { background: ${CARD}; border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 36px 28px; position: relative; overflow: hidden; transition: transform 0.25s, border-color 0.25s; }
  .fsa-pricing-card.featured { border-color: ${PINK}; box-shadow: 0 0 40px rgba(255,57,142,0.1); }
  .fsa-pricing-card:hover { transform: translateY(-3px); }
  .fsa-pricing-badge { display: inline-block; padding: 4px 12px; border-radius: 100px; font-size: 10px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; background: ${PINK}; color: #fff; margin-bottom: 20px; }
  .fsa-pricing-coming { display: inline-block; padding: 4px 12px; border-radius: 100px; font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; border: 1px solid rgba(255,255,255,0.15); color: #666680; margin-bottom: 20px; }
  .fsa-pricing-name { font-family: 'Raleway', sans-serif; font-size: 20px; font-weight: 900; letter-spacing: -0.3px; margin-bottom: 6px; }
  .fsa-pricing-for { font-size: 13px; color: #555570; line-height: 1.6; margin-bottom: 24px; }
  .fsa-pricing-price { font-family: 'Raleway', sans-serif; font-size: 42px; font-weight: 900; letter-spacing: -2px; margin-bottom: 4px; }
  .fsa-pricing-price span { font-size: 16px; letter-spacing: 0; font-weight: 400; color: #555570; vertical-align: super; }
  .fsa-pricing-cycle { font-size: 12px; color: #555570; margin-bottom: 28px; }
  .fsa-pricing-items { display: flex; flex-direction: column; gap: 10px; margin-bottom: 28px; }
  .fsa-pricing-item { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; line-height: 1.5; color: #9a9ab0; }
  .fsa-pricing-check { color: ${GREEN}; font-size: 14px; flex-shrink: 0; font-weight: 700; }
  .fsa-pricing-cta { display: block; width: 100%; padding: 14px; border-radius: 10px; border: none; font-family: 'Raleway', sans-serif; font-size: 14px; font-weight: 800; cursor: pointer; text-align: center; transition: filter 0.2s, transform 0.15s; }
  .fsa-pricing-cta.primary { background: ${PINK}; color: #fff; }
  .fsa-pricing-cta.secondary { background: rgba(255,255,255,0.05); color: #666680; border: 1px solid rgba(255,255,255,0.1); cursor: default; }
  .fsa-pricing-cta.primary:hover { filter: brightness(1.1); transform: translateY(-1px); }
  .fsa-garantie { margin-top: 40px; padding: 24px 28px; background: rgba(255,57,142,0.05); border: 1px solid rgba(255,57,142,0.2); border-radius: 14px; display: flex; align-items: center; gap: 16px; max-width: 600px; }
  .fsa-garantie-icon { font-size: 28px; flex-shrink: 0; }
  .fsa-garantie-title { font-family: 'Raleway', sans-serif; font-size: 15px; font-weight: 800; color: ${PINK}; margin-bottom: 4px; }
  .fsa-garantie-text { font-size: 13px; color: #7a7a98; line-height: 1.6; }
  .fsa-cases-list { display: flex; flex-direction: column; gap: 24px; }
  .fsa-case-item { background: ${CARD}; border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 36px 32px; display: grid; grid-template-columns: 1fr 2fr; gap: 40px; align-items: start; transition: border-color 0.25s; }
  .fsa-case-item:hover { border-color: rgba(255,255,255,0.16); }
  @media (max-width: 768px) { .fsa-case-item { grid-template-columns: 1fr; gap: 20px; } }
  .fsa-case-tag { font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 8px; }
  .fsa-case-persona { font-family: 'Raleway', sans-serif; font-size: clamp(18px, 1.8vw, 24px); font-weight: 900; letter-spacing: -0.5px; line-height: 1.15; margin-bottom: 14px; }
  .fsa-case-stats-col { display: flex; flex-direction: column; gap: 16px; }
  .fsa-case-stat-val { font-family: 'Raleway', sans-serif; font-size: 28px; font-weight: 900; letter-spacing: -1px; }
  .fsa-case-stat-lbl { font-size: 12px; color: #7a7a98; margin-top: 2px; }
  .fsa-case-problem { font-size: 14px; color: #7a7a98; line-height: 1.75; font-style: italic; margin-bottom: 20px; padding: 14px 18px; border-left: 2px solid rgba(255,255,255,0.1); }
  .fsa-case-solution-label { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #444460; margin-bottom: 10px; }
  .fsa-case-agents { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
  .fsa-case-agent { display: flex; align-items: center; gap: 10px; font-size: 13px; color: #9a9ab0; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 10px 14px; }
  .fsa-case-author { font-size: 12px; font-weight: 600; margin-top: 8px; }
  .fsa-cta-section { position: relative; z-index: 5; padding: 80px 40px 100px; border-top: 1px solid rgba(255,255,255,0.06); text-align: center; }
  @media (max-width: 640px) { .fsa-cta-section { padding: 60px 20px 80px; } }
  .fsa-cta-section-inner { max-width: 720px; margin: 0 auto; }
  .fsa-cta-section .fsa-title { font-size: clamp(28px, 3.8vw, 52px); margin-bottom: 16px; }
  .fsa-cta-section-sub { font-size: 17px; color: #7a7a98; line-height: 1.7; margin-bottom: 40px; }
  .fsa-faq-list { display: flex; flex-direction: column; gap: 12px; }
  .fsa-faq-item { background: ${CARD}; border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; overflow: hidden; transition: border-color 0.2s; }
  .fsa-faq-item.open { border-color: rgba(255,57,142,0.25); }
  .fsa-faq-q { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 20px 24px; background: transparent; border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600; color: #f0f0f0; text-align: left; gap: 16px; }
  .fsa-faq-chevron { font-size: 18px; color: ${PINK}; flex-shrink: 0; transition: transform 0.3s; }
  .fsa-faq-item.open .fsa-faq-chevron { transform: rotate(45deg); }
  .fsa-faq-a { max-height: 0; overflow: hidden; transition: max-height 0.35s ease; }
  .fsa-faq-item.open .fsa-faq-a { max-height: 500px; }
  .fsa-faq-a-inner { padding: 0 24px 20px; font-size: 14px; line-height: 1.78; color: #7a7a98; font-weight: 300; }
  .fsa-footer { position: relative; z-index: 10; background: #080810; border-top: 1px solid rgba(255,255,255,0.08); }
  .fsa-footer-main { max-width: 1100px; margin: 0 auto; padding: 64px 40px 40px; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; }
  @media (max-width: 900px) { .fsa-footer-main { grid-template-columns: 1fr 1fr; gap: 32px; } }
  @media (max-width: 640px) { .fsa-footer-main { grid-template-columns: 1fr; padding: 48px 20px 32px; } }
  .fsa-footer-logo { font-family: 'Raleway', sans-serif; font-size: 20px; font-weight: 900; letter-spacing: -0.5px; display: flex; align-items: baseline; margin-bottom: 14px; }
  .fsa-footer-logo-z, .fsa-footer-logo-ai { color: ${PINK}; }
  .fsa-footer-logo-ai { font-size: 12px; font-weight: 700; margin-left: 1px; letter-spacing: 0.05em; }
  .fsa-footer-desc { font-size: 13px; line-height: 1.7; color: #555570; max-width: 260px; }
  .fsa-footer-col-title { font-family: 'Raleway', sans-serif; font-size: 11px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: #f0f0f0; margin-bottom: 14px; }
  .fsa-footer-links { display: flex; flex-direction: column; gap: 9px; }
  .fsa-footer-links a { font-size: 13px; color: #555570; text-decoration: none; transition: color 0.2s; }
  .fsa-footer-links a:hover { color: #f0f0f0; }
  .fsa-footer-bottom { max-width: 1100px; margin: 0 auto; padding: 20px 40px 28px; display: flex; align-items: center; justify-content: space-between; gap: 16px; border-top: 1px solid rgba(255,255,255,0.05); flex-wrap: wrap; }
  @media (max-width: 640px) { .fsa-footer-bottom { flex-direction: column; text-align: center; padding: 20px; } }
  .fsa-footer-copy { font-size: 12px; color: #444460; }
  .fsa-footer-legal { display: flex; gap: 20px; }
  .fsa-footer-legal a { font-size: 12px; color: #444460; text-decoration: none; transition: color 0.2s; }
  .fsa-footer-legal a:hover { color: #666680; }
  @keyframes fsaFadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fsaPulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(1.4); } }
`;

const personas = [
  { label: "Entrepreneur", text: "Ta tête déborde d'idées, mais tu manques de bras pour exécuter ? Construis une armée d'agents IA qui déploient tes stratégies 24/7 — sans recrutement, sans management, sans erreur humaine." },
  { label: "Executive", text: "Tu veux gagner du temps, devenir incontournable dans ta boîte sur l'IA, apprendre à gérer des ingénieurs IA, à faire des retours sur des systèmes agentiques et t'assurer d'être la personne qui reste toujours la référente sur l'implémentation IA." },
  { label: "Wannabe AI builder de ta boite ?", text: "Tu veux devenir l'acteur phare de l'IA dans ta boîte. Tu veux être l'ingénieur IA et l'architecte IA de référence — la personne en charge de builder les systèmes IA et d'orchestrer la transformation de ta boite." },
];

const proofMetrics = [
  { icon: "🤖", val: "40", lbl: "Systèmes IA développés personnellement", context: "par Wilfried, fondateur de la formation", color: PINK },
  { icon: "🎓", val: "10", lbl: "Personnes formées en one-to-one", context: "accompagnement individuel par Wilfried", color: BLUE },
  { icon: "📈", val: "5k → 23k", lbl: "Followers LinkedIn", context: "croissance de l'audience de Wilfried sur l'IA", color: GREEN },
  { icon: "📄", val: "−85%", lbl: "De temps en construction de propal", context: "cabinet conseil réseau de freelances", color: ORANGE },
  { icon: "💻", val: "−85%", lbl: "De temps de développement", context: "grâce au vibe coding & Claude Code", color: VIOLET },
  { icon: "🏨", val: "−97%", lbl: "D'attente clients non traitée en hôtel", context: "boutique-hôtel avec agents IA vocaux", color: GREEN },
  { icon: "⏱️", val: "−92%", lbl: "De temps de prospection", context: "chez nos utilisateurs formation", color: PINK },
];

const benefits = [
  {
    num: "01", color: PINK, avail: "now", availLabel: "✦ Disponible maintenant",
    // MODIFIÉ : titre + desc
    title: "Maîtriser Claude — comme un ingénieur",
    sub: "Maîtrise les LLMs comme un pro, pas comme un touriste ChatGPT",
    desc: "Tu apprends à piloter Claude (ainsi que les prompts pour ChatGPT, Gemini et Perplexity) — et à construire des instructions qui produisent exactement ce que tu veux, à chaque fois. Tu apprends à construire des agents IA avec mémoire contextuelle, ses outils, sa base de connaissance anti-hallucinations et à créer des conseillers IA personnalisés sur des points précis de ton quotidien.",
    results: [
      "Génération de contenus 10x plus rapide et pertinents",
      "Bases de connaissance bien rédigées pour zéro hallucination",
      "Agents IA avec mémoire contextuelle long-terme",
      "Conseillers IA sur-mesure : mental, closing, communication diplomatique",
      "Analyse de données complexes en 3 minutes au lieu de 3 heures",
    ],
  },
  {
    num: "02", color: GREEN, avail: "now", availLabel: "✦ Disponible maintenant",
    title: "Vibe coding — crée tes produits sans coder",
    sub: "Développe tes propres outils SaaS en pilotant Claude",
    desc: "Tu découvres le framework et la méthode des meilleurs UX et product designers pour le front-end, combiné au framework des meilleurs architectes et développeurs pour garder des produits clairs, reprenables par un profil tech et industrialisables. Tu apprends aussi les frameworks essentiels pour éviter les failles de sécurité.",
    results: [
      "Outil sur-mesure pour ton business en 48h au lieu de 3 mois",
      "Architecture propre, industrialisable, reprise par n'importe quel dev",
      "Frameworks UX/Product design pour des interfaces mémorables",
      "Bonnes pratiques sécurité pour éviter les failles critiques",
      "Économie de 20 000 à 50 000€ de dev externe",
    ],
  },
  {
    num: "03", color: ORANGE, avail: "soon", availLabel: "⏳ Fin Mars",
    title: "Orchestration et connexion aux outils",
    sub: "Branche tes agents sur tes outils métier",
    // MODIFIÉ : desc
    desc: "Tu maîtrises Dust et N8N pour créer des workflows agentiques connectés à ton infrastructure. Tes agents récupèrent des données, prennent des décisions, utilisent des outils et se parlent entre eux — sans intervention humaine. Cette partie te permet de commencer à créer des systèmes composés de plusieurs agents qui collaborent.",
    results: [
      "Pipeline de prospection 100% automatisé (scraping → enrichissement → outreach → suivi)",
      "Qualification de leads sans jamais ouvrir un tableur",
      "Support client niveau 1 géré par IA avec escalade intelligente",
    ],
  },
  {
    num: "04", color: BLUE, avail: "soon", availLabel: "⏳ Fin Mars",
    title: "Architectures agentiques avancées",
    sub: "MCP, RAG et multi-agents qui se coordonnent seuls",
    // MODIFIÉ : desc + results
    desc: "Tu apprends à designer des systèmes réellement hyper intelligents, capables d'apprendre d'eux-mêmes — des architectures RAG (Retrieval-Augmented Generation) et MCP (Model Context Protocol) où plusieurs agents collaborent : un agent scrape le web, un autre enrichit les données, un troisième check le profil, un quatrième rédige les messages. C'est la brique la plus technique — et la plus puissante. Mais tout à fait accessible pour des profils non techniques. L'intérêt : recréer des salariés polyvalents de A à Z.",
    results: [
      "Système de veille concurrentielle automatisé (scraping + analyse + synthèse + alerte)",
      "Machine à leads qui tourne H24 sans supervision",
      "Production de contenu multi-format coordonnée par IA",
      "Les règles de cybersécurité à mettre en place pour éviter tout débordement",
    ],
  },
  {
    num: "05", color: VIOLET, avail: "soon", availLabel: "⏳ Fin Mars",
    title: "Agents IA vocaux synchronisés",
    sub: "La voix comme interface de tes systèmes IA",
    desc: "Tu apprends à créer des agents vocaux connectés en temps réel à tes bases de données, ton Notion ou ton CRM — avec un système d'orchestration qui route chaque demande exactement là où elle doit aller. Tu apprends aussi à générer des voix ultra-humaines en optimisant la latence, et tu découvres les modèles algorithmiques pour maximiser les performances vocales.",
    results: [
      "Système d'orchestration vocal : chaque requête routée au bon agent, au bon moment",
      "Voix ultra-humaines avec optimisation de la latence et des modèles de synthèse",
      "Hôtellerie : synchronisation des to-dos équipes en temps réel via agent vocal",
      "Commercial : auto-complétion du CRM à la voix depuis sa voiture",
      "Knowledge base : interrogation instantanée de ton Notion par la voix",
    ],
  },
  {
    num: "06", color: "#e040fb", avail: "later", availLabel: "🚀 Mi-Avril",
    title: "OpenClaw — orchestration IA avancée",
    sub: "Le framework ultime pour piloter des agents complexes",
    desc: "Tu découvres OpenClaw, le framework open-source pour orchestrer des agents IA avec des capacités étendues : navigation web autonome, interactions système, exécution de tâches complexes multi-étapes. Tu apprends à combiner OpenClaw avec Claude pour créer des agents capables d'agir réellement sur ton environnement numérique.",
    results: [
      "Agents capables d'interagir avec n'importe quelle interface web",
      "Orchestration de tâches longues et complexes sans supervision",
      "Automatisation de workflows qui nécessitaient un humain devant l'écran",
    ],
  },
];

const pricing = [
  {
    featured: true, badge: "⭐ Formation",
    name: "Master Agentic AI",
    forWho: "Entrepreneurs et executives qui veulent maîtriser l'IA agentique avec accompagnement continu.",
    price: "97", currency: "€", cycle: "/ mois — Résiliable après 6 mois",
    items: [
      "Accès immédiat à tous les modules (4 modules core)",
      "30+ heures de contenu structuré",
      "Templates et prompts sectoriels prêts à l'emploi",
      "Cas d'usage verticaux (conseil, SaaS, recrutement, hôtellerie)",
      "Mises à jour continues (nouveaux outils IA, nouvelles architectures)",
      "Contenu sectoriel ajouté chaque mois",
      "Résiliable après 6 mois minimum",
    ],
    cta: "🚀 Rejoindre la formation", ctaStyle: "primary",
  },
  {
    featured: false, badge: "À venir",
    name: "Coach d'Exécution IA",
    forWho: "Entrepreneurs qui veulent ancrer les réflexes IA au quotidien avec un coach dédié.",
    price: "~300", currency: "€", cycle: "par mois — Disponibilité à venir",
    items: [
      "Tout le contenu Master Agentic AI",
      "Coach IA personnalisé au quotidien",
      "Exercices quotidiens sur-mesure",
      "Suivi de progression agentique",
      "Répond à toutes tes questions sur la formation",
      "T'aide à brainstormer sur ce que peut faire l'IA pour toi",
      "T'aide à traduire ça en architecture IA concrète",
      "Te donne un programme complet step by step",
      "Cet agent IA est le double du cerveau de Wilfried",
    ],
    cta: "Disponible prochainement", ctaStyle: "secondary",
  },
  {
    featured: false, badge: "À venir",
    name: "Accompagnement 1-to-1",
    forWho: "Executives et fondateurs qui veulent déployer un système agentique stratégique rapidement.",
    price: "Sur\u00a0devis", currency: "", cycle: "Sur demande — Disponibilité limitée",
    items: [
      "Revue de ton architecture agentique",
      "Accompagnement sur un cas d'usage prioritaire",
      "Sessions individuelles avec Wilfried",
    ],
    cta: "Contacter Wilfried", ctaStyle: "secondary",
  },
];

const cases = [
  {
    color: GREEN, tag: "Hôtellerie boutique",
    persona: "La direction libérée du quotidien opérationnel",
    problem: "\"Le directeur était au bord du burnout — ses équipes (réception, gouvernance, techniciens) le bombardaient de demandes toute la journée. L'IA a tout changé.\"",
    author: "— Marine L., directrice boutique-hôtel",
    agents: ["🎤 Agent Vocal Ops — aide les équipes à communiquer entre elles sans passer par la direction", "📚 Agent Formation — maintient les équipes au top des réglementations, procédures et machines", "🧠 Agent Q&A — répond aux questions opérationnelles pour libérer la direction"],
    stats: [{ val: "−80%", lbl: "Sollicitations direction" }, { val: "100%", lbl: "Direction libérée" }, { val: "H24", lbl: "Support équipes actif" }],
  },
  {
    color: BLUE, tag: "Chasseur de têtes",
    persona: "200 profils sourcés et scorés par jour",
    problem: "\"Mon agent IA fait le boulot de 3 recruteurs juniors. Je me concentre sur les entretiens finaux et la relation client. Mon CA a doublé en 4 mois.\"",
    author: "— Alexandre P., headhunter tech",
    agents: ["🔎 Agent Sourcing — scrape profils LinkedIn et appels d'offres 24/24", "🎙️ Agent Interview — prépare les questions et analyse les réponses durant l'interview", "⚡ Agent Scoring — fit candidature + gap analysis", "📝 Agent Proposal — génère les propals sur-mesure"],
    stats: [{ val: "200", lbl: "Profils/jour" }, { val: "+60%", lbl: "Taux de réponse" }, { val: "÷2", lbl: "Time-to-hire" }],
  },
  {
    color: PINK, tag: "Coach indépendance financière",
    persona: "3x plus de contenu, 3x plus de leads",
    problem: "\"Avant je passais 20h/semaine entre création de contenu et prospection. Aujourd'hui mes agents IA font tourner la machine pendant que je suis en session coaching.\"",
    author: "— Julie M., coach business & indépendance financière",
    agents: ["🎯 Agent Contenu — crée la stratégie, génère posts LinkedIn, Instagram et scripts vidéo, puis poste automatiquement", "🔍 Agent Veille des tendances — surveille les tendances du domaine 24/7", "📣 Agent SDR — qualifie les leads et fait l'outreach séquencé"],
    stats: [{ val: "+300%", lbl: "Contenu publié" }, { val: "−20h", lbl: "Par semaine" }, { val: "+45%", lbl: "Conversion outbound" }],
  },
  {
    color: VIOLET, tag: "Cabinet de formation",
    persona: "Webinaires automatisés, tunnel de vente alimenté en continu",
    problem: "\"On était mauvais sur la promo de nos formations. Les webinaires étaient sous-exploités, le suivi post-événement inexistant. L'IA a industrialisé toute la machine.\"",
    author: "— Pierre B., co-fondateur école hybride",
    agents: ["📅 Agent Webinaire — crée, schedule et relance les inscrits automatiquement", "🎙️ Agent Script — génère les scripts de webinaires adaptés à chaque formation", "🔥 Agent Post-webinaire — reprend contact pour inciter à entrer dans le tunnel de vente", "📊 Agent Suivi — (en cours) suivi personnalisé de la progression des apprenants"],
    stats: [{ val: "+4x", lbl: "Webinaires lancés" }, { val: "+55%", lbl: "Conversion post-event" }, { val: "0h", lbl: "Admin webinaire" }],
  },
  {
    color: ORANGE, tag: "Cabinet conseil — réseau de freelances",
    persona: "La création de propal passe de 2 jours à 2 heures",
    problem: "\"La construction de propal n'est pas rémunérée — et ça nous coûtait des heures chaque semaine. Maintenant l'architecture IA fait le travail, nos freelances se concentrent sur la livraison.\"",
    author: "— Marc D., fondateur cabinet conseil & réseau de freelances",
    agents: ["📄 Agent Propal — génère les propositions commerciales sur-mesure depuis le brief client", "📊 Agent PowerPoint — structure les livrables avec le framework stratégique du cabinet", "🗄️ Agent Archiviste (RAG) — interroge la base de propals passées pour réutiliser les meilleures formulations"],
    stats: [{ val: "−85%", lbl: "Temps de création propal" }, { val: "2h", lbl: "Au lieu de 2 jours" }, { val: "0€", lbl: "Temps non facturé" }],
  },
];

const faqs = [
  { q: "Ai-je besoin de compétences techniques ?", a: "Non. Si tu sais utiliser ChatGPT, tu as le niveau requis. On part de zéro et on monte progressivement. Les modules techniques sont expliqués pas à pas." },
  { q: "Combien de temps pour voir les premiers résultats ?", a: "Dès la semaine 1 tu déploies ton premier agent IA fonctionnel. En 4 semaines tu as un système complet opérationnel." },
  { q: "Cette formation est-elle adaptée à mon secteur ?", a: "Oui. Les principes agentiques s'appliquent à tous les secteurs. On fournit des cas d'usage sectoriels (conseil, SaaS, services, hôtellerie, recrutement)." },
  { q: "Quelle différence avec une formation ChatGPT classique ?", a: "Les formations ChatGPT t'apprennent à discuter avec un chatbot. Ici tu apprends à construire des systèmes autonomes qui exécutent des tâches complexes 24/7 sans toi. C'est de l'ingénierie, pas du prompting de surface." },
  { q: "Puis-je payer en plusieurs fois ?", a: "Non. Le paiement en plusieurs fois n'est pas disponible actuellement. La formation est en mensualisation à 97€/mois, résiliable après 6 mois." },
  { q: "La formation est-elle mise à jour ?", a: "Oui, inclus dans ton abonnement mensuel. L'IA agentique évolue vite — on met à jour le contenu régulièrement avec les nouvelles capacités et outils, et on ajoute du contenu sectoriel chaque mois." },
];

export default function FormationSystemeAgentique() {
  const navigate = useNavigate();
  const [activePersona, setActivePersona] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const VISIBLE = 3;
  const [proofIndex, setProofIndex] = useState(0);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const maxIndex = proofMetrics.length - VISIBLE;

  const proofNext = () => setProofIndex(i => (i >= maxIndex ? 0 : i + 1));
  const proofPrev = () => setProofIndex(i => (i <= 0 ? maxIndex : i - 1));

  useEffect(() => {
    autoRef.current = setInterval(proofNext, 4000);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [maxIndex]);

  const pauseAuto = () => { if (autoRef.current) clearInterval(autoRef.current); };
  const resumeAuto = () => { autoRef.current = setInterval(proofNext, 4000); };

  useEffect(() => {
    const id = "fsa-styles";
    if (!document.getElementById(id)) {
      const el = document.createElement("style"); el.id = id; el.textContent = css;
      document.head.appendChild(el);
    }
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  const goQuestionnaire = () => navigate("/ecosystem/formationsystemeagentique/questionnaire");

  const cardWidthPct = 100 / VISIBLE;
  const gapPx = 20;
  const translateX = `calc(-${proofIndex * cardWidthPct}% - ${proofIndex * gapPx / VISIBLE}px)`;

  return (
    <div className="fsa">
      <div className="fsa-noise" />
      <div className="fsa-mesh" />

      <nav className="fsa-nav">
        <div className="fsa-nav-logo" onClick={() => navigate("/")}>
          Catapul<span className="fsa-nav-logo-z">Z</span><span className="fsa-nav-logo-ai">AI</span>
        </div>
        <button className="fsa-nav-back" onClick={() => navigate("/")}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M8.5 2.5L4 7l4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Accueil CatapulZ AI</span>
        </button>
        <button className="fsa-lang-btn" onClick={() => window.location.href = "/ecosystem/IAagenticsystemtraining"}>🇬🇧 EN</button>
      </nav>

      <section className="fsa-hero">
        <div className="fsa-badge"><span className="fsa-badge-dot" />Pour entrepreneurs, executives et futurs ingénieurs IA</div>
        <h1 className="fsa-h1">
          Construis ton armée d'<span>agents IA</span><br />
          — focus sur tes objectifs —<br />
          par toi-même
        </h1>
        <div className="fsa-persona-tabs">
          {personas.map((p, i) => (
            <button key={p.label} className={`fsa-persona-tab${activePersona === i ? " active" : ""}`} onClick={() => setActivePersona(i)}>{p.label}</button>
          ))}
        </div>
        <p className="fsa-hero-sub">{personas[activePersona].text}</p>
        <div className="fsa-hero-bullets">
          {[
            { icon: "⚡", text: "Multiplie ta productivité par 100 sans ajouter une seule personne à ton équipe" },
            { icon: "💰", text: "Apprends où commencer à mettre de l'IA dans ta boite pour être super ROIste" },
            { icon: "🤖", text: "Automatise prospection, qualification, contenu, support et opérations" },
            { icon: "🛠️", text: "Maîtrise Claude, Claude Code, Dust, N8N, Gemini, Supabase — sans être développeur" },
            { icon: "🏗️", text: "Conçois des architectures multi-agents adaptées à tes objectifs" },
          ].map(b => (
            <div key={b.text} className="fsa-hero-bullet">
              <span className="fsa-hero-bullet-icon">{b.icon}</span><span>{b.text}</span>
            </div>
          ))}
        </div>
        <div className="fsa-cta-block">
          <button className="fsa-cta-btn" onClick={goQuestionnaire}>🔥 Rejoindre la formation</button>
          <div className="fsa-cta-reassurance">
            <span className="fsa-cta-micro">Formation 100% en ligne</span>
            <span className="fsa-cta-micro">Accès immédiat après paiement</span>
            <span className="fsa-cta-micro">Pas de prérequis technique</span>
          </div>
        </div>
      </section>

      <div className="fsa-proof">
        <div className="fsa-proof-inner">
          <div className="fsa-proof-header">
            <div>
              <p className="fsa-eyebrow">Preuves</p>
              <h2 className="fsa-title" style={{ fontSize: "clamp(22px, 2.8vw, 36px)", marginBottom: 0 }}>Des chiffres qui parlent d'eux-mêmes</h2>
            </div>
            <div className="fsa-proof-nav">
              <button className="fsa-proof-btn" onClick={() => { pauseAuto(); proofPrev(); resumeAuto(); }}>←</button>
              <button className="fsa-proof-btn" onClick={() => { pauseAuto(); proofNext(); resumeAuto(); }}>→</button>
            </div>
          </div>
          <div className="fsa-proof-viewport" onMouseEnter={pauseAuto} onMouseLeave={resumeAuto}>
            <div className="fsa-proof-track" style={{ transform: `translateX(${translateX})` }}>
              {proofMetrics.map((m, i) => (
                <div key={i} className="fsa-proof-card" style={{ borderTop: `3px solid ${m.color}` }}>
                  <div className="fsa-proof-icon">{m.icon}</div>
                  <div className="fsa-proof-val">{m.val}</div>
                  <div className="fsa-proof-lbl">{m.lbl}</div>
                  <div className="fsa-proof-context">{m.context}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="fsa-proof-dots">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <div key={i} className={`fsa-proof-dot${proofIndex === i ? " active" : ""}`}
                onClick={() => { pauseAuto(); setProofIndex(i); resumeAuto(); }} />
            ))}
          </div>
        </div>
      </div>

      <section className="fsa-section" id="programme">
        <div className="fsa-section-inner">
          <p className="fsa-eyebrow">Programme</p>
          <h2 className="fsa-title">Ce que tu sais faire à la fin de cette formation</h2>
          <p className="fsa-subtitle">6 blocs compétences pour devenir ingénieur IA agentique opérationnel.</p>
          <div className="fsa-benefits-grid">
            {benefits.map(b => (
              <div key={b.num} className="fsa-benefit-card">
                <div className="fsa-benefit-bar" style={{ background: b.color }} />
                <div className="fsa-benefit-num">{b.num}</div>
                <div className={`fsa-benefit-avail ${b.avail}`}>{b.availLabel}</div>
                <div className="fsa-benefit-sub" style={{ color: b.color }}>{b.sub}</div>
                <h3 className="fsa-benefit-title">{b.title}</h3>
                <p className="fsa-benefit-desc">{b.desc}</p>
                <div className="fsa-benefit-results">
                  {b.results.map(r => <div key={r} className="fsa-benefit-result" style={{ color: b.color }}>{r}</div>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fsa-section" id="pricing">
        <div className="fsa-section-inner">
          <p className="fsa-eyebrow">Tarifs</p>
          <h2 className="fsa-title">Choisis ton niveau d'engagement</h2>
          <p className="fsa-subtitle">Une formation mensuelle, deux niveaux d'accompagnement à venir.</p>
          <div className="fsa-pricing-grid">
            {pricing.map(p => (
              <div key={p.name} className={`fsa-pricing-card${p.featured ? " featured" : ""}`}>
                {p.featured ? <span className="fsa-pricing-badge">{p.badge}</span> : <span className="fsa-pricing-coming">{p.badge}</span>}
                <div className="fsa-pricing-name">{p.name}</div>
                <div className="fsa-pricing-for">{p.forWho}</div>
                <div className="fsa-pricing-price">{p.currency && <span>{p.currency}</span>}{p.price}</div>
                <div className="fsa-pricing-cycle">{p.cycle}</div>
                <div className="fsa-pricing-items">
                  {p.items.map(item => (
                    <div key={item} className="fsa-pricing-item">
                      <span className="fsa-pricing-check">✓</span><span>{item}</span>
                    </div>
                  ))}
                </div>
                <button className={`fsa-pricing-cta ${p.ctaStyle}`}
                  onClick={() => p.ctaStyle === "primary" && goQuestionnaire()}>
                  {p.cta}
                </button>
              </div>
            ))}
          </div>
          <div className="fsa-garantie">
            <span className="fsa-garantie-icon">⚡</span>
            <div>
              <div className="fsa-garantie-title">Garantie remboursement 3 jours</div>
              <div className="fsa-garantie-text">Si dans les 3 premiers jours la formation ne correspond pas, remboursement intégral. Simple email, aucune justification. Les frais Stripe seront déduits du remboursement.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="fsa-section" id="resultats">
        <div className="fsa-section-inner">
          <p className="fsa-eyebrow">Résultats</p>
          <h2 className="fsa-title">Ils ont transformé leur business avec leurs agents IA</h2>
          <p className="fsa-subtitle">5 cas d'usage concrets déployés par nos clients et étudiants.</p>
          <div className="fsa-cases-list">
            {cases.map(c => (
              <div key={c.tag} className="fsa-case-item" style={{ borderLeft: `3px solid ${c.color}` }}>
                <div>
                  <div className="fsa-case-tag" style={{ color: c.color }}>{c.tag}</div>
                  <div className="fsa-case-persona">{c.persona}</div>
                  <div className="fsa-case-stats-col" style={{ marginTop: 20 }}>
                    {c.stats.map(s => (
                      <div key={s.lbl}>
                        <div className="fsa-case-stat-val" style={{ color: c.color }}>{s.val}</div>
                        <div className="fsa-case-stat-lbl">{s.lbl}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="fsa-case-problem">{c.problem}</p>
                  <p className="fsa-case-solution-label">Agents déployés</p>
                  <div className="fsa-case-agents">
                    {c.agents.map(a => <div key={a} className="fsa-case-agent">{a}</div>)}
                  </div>
                  <div className="fsa-case-author" style={{ color: c.color }}>{c.author}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="fsa-cta-section">
        <div className="fsa-cta-section-inner">
          <p className="fsa-eyebrow" style={{ textAlign: "center" }}>Prêt(e) à passer à l'action ?</p>
          <h2 className="fsa-title">Transforme ton business avec une armée d'agents IA</h2>
          <p className="fsa-cta-section-sub">Rejoins la formation aujourd'hui et commence à déployer tes premiers agents cette semaine.</p>
          <button className="fsa-cta-btn" style={{ margin: "0 auto", display: "inline-flex" }} onClick={goQuestionnaire}>
            🚀 Accéder à la formation maintenant
          </button>
          <div className="fsa-cta-reassurance" style={{ justifyContent: "center", marginTop: 16 }}>
            <span className="fsa-cta-micro">Paiement sécurisé</span>
            <span className="fsa-cta-micro">Accès instantané</span>
            <span className="fsa-cta-micro">Garantie 3 jours</span>
          </div>
        </div>
      </div>

      <section className="fsa-section" id="faq">
        <div className="fsa-section-inner">
          <p className="fsa-eyebrow">FAQ</p>
          <h2 className="fsa-title">Questions fréquentes</h2>
          <div className="fsa-faq-list" style={{ marginTop: 40 }}>
            {faqs.map((f, i) => (
              <div key={f.q} className={`fsa-faq-item${openFaq === i ? " open" : ""}`}>
                <button className="fsa-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{f.q}</span><span className="fsa-faq-chevron">+</span>
                </button>
                <div className="fsa-faq-a"><div className="fsa-faq-a-inner">{f.a}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="fsa-footer">
        <div className="fsa-footer-main">
          <div>
            <div className="fsa-footer-logo">Catapul<span className="fsa-footer-logo-z">Z</span><span className="fsa-footer-logo-ai">AI</span></div>
            <p className="fsa-footer-desc">Ingénieur & architecte IA. Spécialiste systèmes agentiques pour entrepreneurs.</p>
          </div>
          <div>
            <p className="fsa-footer-col-title">Formation</p>
            <nav className="fsa-footer-links">
              <a href="#programme">Programme</a>
              <a href="#resultats">Témoignages</a>
              <a href="#pricing">Tarifs</a>
              <a href="#faq">FAQ</a>
            </nav>
          </div>
          <div>
            <p className="fsa-footer-col-title">Légal</p>
            <nav className="fsa-footer-links">
              <a href="/mentions-legales">Mentions légales</a>
              <a href="/cgv">CGV</a>
              <a href="/politique-confidentialite">Confidentialité</a>
            </nav>
          </div>
          <div>
            <p className="fsa-footer-col-title">Contact</p>
            <nav className="fsa-footer-links">
              <a href="mailto:wilfried@catapulzai.eu">wilfried@catapulzai.eu</a>
              <a href="https://www.linkedin.com/in/wilfriedderenty" target="_blank" rel="noopener noreferrer" style={{ color: PINK }}>LinkedIn →</a>
            </nav>
          </div>
        </div>
        <div className="fsa-footer-bottom">
          <p className="fsa-footer-copy">© {new Date().getFullYear()} CatapulZ AI — Tous droits réservés</p>
          <div className="fsa-footer-legal">
            <a href="/mentions-legales">Mentions légales</a>
            <a href="/politique-confidentialite">Confidentialité</a>
            <a href="/cgv">CGV</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
