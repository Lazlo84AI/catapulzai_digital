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
  .fsa-nav-right { display: flex; align-items: center; gap: 12px; }
  .fsa-nav-back { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 500; color: #666680; cursor: pointer; padding: 8px 16px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08); background: transparent; transition: color 0.2s, border-color 0.2s, background 0.2s; }
  .fsa-nav-back:hover { color: #f0f0f0; border-color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.04); }
  .fsa-nav-back svg { transition: transform 0.2s; }
  .fsa-nav-back:hover svg { transform: translateX(-3px); }
  .fsa-lang-btn { display: flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 7px; border: 1px solid rgba(255,255,255,0.15); background: transparent; color: #9a9ab0; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
  .fsa-lang-btn:hover { border-color: rgba(255,255,255,0.3); color: #f0f0f0; }
  @media (max-width: 640px) { .fsa-nav { padding: 14px 20px; } .fsa-nav-back span { display: none; } .fsa-lang-btn span { display: none; } }
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
  { label: "Entrepreneur", text: "Your head is bursting with ideas, but you're short on hands to execute? Build an army of AI agents that deploy your strategies 24/7 — no recruitment, no management, no human error." },
  { label: "Executive", text: "You want to save time, become indispensable in your company on AI, learn to manage AI engineers, give feedback on agentic systems, and ensure you remain the definitive reference on AI implementation within your organisation." },
  { label: "Aspiring AI Builder?", text: "You want to become the leading AI figure in your company. You want to be the AI engineer and architect of reference — the person in charge of building AI systems and orchestrating your company's transformation." },
];

const proofMetrics = [
  { icon: "🤖", val: "40", lbl: "AI systems built personally", context: "by Wilfried, founder of this training", color: PINK },
  { icon: "🎓", val: "10", lbl: "People trained one-to-one", context: "individual coaching by Wilfried", color: BLUE },
  { icon: "📈", val: "5k → 23k", lbl: "LinkedIn followers", context: "growth of Wilfried's AI audience", color: GREEN },
  { icon: "📄", val: "−85%", lbl: "Time spent building proposals", context: "consulting firm with freelance network", color: ORANGE },
  { icon: "💻", val: "−85%", lbl: "Development time saved", context: "through vibe coding & Claude Code", color: VIOLET },
  { icon: "🏨", val: "−97%", lbl: "Unhandled guest requests in hotels", context: "boutique hotel with AI voice agents", color: GREEN },
  { icon: "⏱️", val: "−92%", lbl: "Time spent on prospecting", context: "among our training users", color: PINK },
];

const benefits = [
  {
    num: "01", color: PINK, avail: "now", availLabel: "✦ Available now",
    title: "Mastering Claude — like an engineer",
    sub: "Use LLMs like a pro, not like a ChatGPT tourist",
    desc: "You learn to operate Claude (plus prompting for ChatGPT, Gemini and Perplexity) — and to build instructions that produce exactly what you want, every time. You learn to build AI agents with contextual memory, tools, anti-hallucination knowledge bases, and to create personalised AI advisors for specific areas of your daily life.",
    results: [
      "Content generated 10x faster and more on-point",
      "Well-crafted knowledge bases for zero hallucination",
      "AI agents with long-term contextual memory",
      "Bespoke AI advisors: mindset, closing, diplomatic communication",
      "Complex data analysis in 3 minutes instead of 3 hours",
    ],
  },
  {
    num: "02", color: GREEN, avail: "now", availLabel: "✦ Available now",
    title: "Vibe coding — build products without coding",
    sub: "Develop your own SaaS tools by directing Claude",
    desc: "You discover the framework and method used by the best UX and product designers for front-end, combined with the framework of the best architects and developers to keep products clean, handed off to a technical profile and scalable. You also learn the essential frameworks to avoid security vulnerabilities.",
    results: [
      "Bespoke tool for your business in 48 hours instead of 3 months",
      "Clean, scalable architecture, ready for any developer to pick up",
      "UX/Product design frameworks for memorable interfaces",
      "Security best practices to avoid critical vulnerabilities",
      "Save £20,000 to £50,000 on external development",
    ],
  },
  {
    num: "03", color: ORANGE, avail: "soon", availLabel: "⏳ End of March",
    title: "Orchestration & tool connections",
    sub: "Connect your agents to your business tools",
    desc: "You master Dust and N8N to create agentic workflows connected to your infrastructure. Your agents retrieve data, make decisions, use tools and talk to each other — without human intervention. This module lets you start building systems made up of multiple collaborating agents.",
    results: [
      "Fully automated prospecting pipeline (scraping → enrichment → outreach → follow-up)",
      "Lead qualification without ever opening a spreadsheet",
      "Level-1 customer support managed by AI with intelligent escalation",
    ],
  },
  {
    num: "04", color: BLUE, avail: "soon", availLabel: "⏳ End of March",
    title: "Advanced agentic architectures",
    sub: "MCP, RAG and multi-agents that coordinate themselves",
    desc: "You learn to design truly hyper-intelligent systems capable of learning on their own — RAG (Retrieval-Augmented Generation) and MCP (Model Context Protocol) architectures where multiple agents collaborate: one agent scrapes the web, another enriches the data, a third checks the profile, a fourth writes the messages. This is the most technical module — and the most powerful. Yet perfectly accessible for non-technical profiles. The goal: recreating versatile employees from A to Z.",
    results: [
      "Automated competitive intelligence system (scraping + analysis + synthesis + alerts)",
      "Lead machine running 24/7 unsupervised",
      "Multi-format content production coordinated by AI",
      "Cybersecurity rules to implement to prevent any overreach",
    ],
  },
  {
    num: "05", color: VIOLET, avail: "soon", availLabel: "⏳ End of March",
    title: "Synchronised AI voice agents",
    sub: "Voice as the interface for your AI systems",
    desc: "You learn to create voice agents connected in real time to your databases, Notion or CRM — with an orchestration system that routes every request to exactly where it needs to go. You also learn to generate ultra-human voices by optimising latency, and discover the algorithmic models to maximise voice performance.",
    results: [
      "Voice orchestration: every request routed to the right agent at the right time",
      "Ultra-human voices with latency optimisation and synthesis models",
      "Hospitality: real-time team to-do synchronisation via voice agent",
      "Sales: CRM auto-fill by voice from the car",
      "Knowledge base: instant Notion queries by voice",
    ],
  },
  {
    num: "06", color: "#e040fb", avail: "later", availLabel: "🚀 Mid-April",
    title: "OpenClaw — advanced AI orchestration",
    sub: "The ultimate framework for complex agent control",
    desc: "You discover OpenClaw, the open-source framework for orchestrating AI agents with extended capabilities: autonomous web navigation, system interactions, multi-step complex task execution. You learn to combine OpenClaw with Claude to create agents capable of acting directly within your digital environment.",
    results: [
      "Agents capable of interacting with any web interface",
      "Orchestration of long, complex tasks without supervision",
      "Automation of workflows that previously required a human at the screen",
    ],
  },
];

const pricing = [
  {
    featured: true, badge: "⭐ Training",
    name: "Master Agentic AI",
    forWho: "Entrepreneurs and executives who want to master agentic AI with ongoing support.",
    price: "97", currency: "€", cycle: "/ month — Cancellable after 6 months",
    items: [
      "Immediate access to all modules (4 core modules)",
      "30+ hours of structured content",
      "Ready-to-use sectoral templates and prompts",
      "Vertical use cases (consulting, SaaS, recruitment, hospitality)",
      "Continuous updates (new AI tools, new architectures)",
      "New sectoral content added every month",
      "Cancellable after a minimum of 6 months",
    ],
    cta: "🚀 Join the training", ctaStyle: "primary",
  },
  {
    featured: false, badge: "Coming soon",
    name: "AI Execution Coach",
    forWho: "Entrepreneurs who want to embed daily AI habits with a dedicated coach.",
    price: "~300", currency: "€", cycle: "per month — Availability coming soon",
    items: [
      "All Master Agentic AI content",
      "Personalised daily AI coach",
      "Daily bespoke exercises",
      "Agentic progress tracking",
      "Answers all your questions about the training",
      "Helps you brainstorm what AI can do for you",
      "Translates that into a concrete AI architecture",
      "Gives you a complete step-by-step programme",
      "This AI agent is a digital twin of Wilfried's brain",
    ],
    cta: "Coming soon", ctaStyle: "secondary",
  },
  {
    featured: false, badge: "Coming soon",
    name: "1-to-1 Coaching",
    forWho: "Executives and founders who want to deploy a strategic agentic system rapidly.",
    price: "On\u00a0request", currency: "", cycle: "On demand — Limited availability",
    items: [
      "Review of your agentic architecture",
      "Coaching on a priority use case",
      "Individual sessions with Wilfried",
    ],
    cta: "Contact Wilfried", ctaStyle: "secondary",
  },
];

const cases = [
  {
    color: GREEN, tag: "Boutique hotel",
    persona: "Management freed from operational day-to-day",
    problem: '"The director was on the verge of burnout — teams (reception, housekeeping, maintenance) bombarded him with requests all day. AI changed everything."',
    author: "— Marine L., boutique hotel director",
    agents: ["🎤 Voice Ops Agent — helps teams communicate with each other without going through management", "📚 Training Agent — keeps teams up to speed on regulations, procedures and equipment", "🧠 Q&A Agent — answers operational questions to free up management"],
    stats: [{ val: "−80%", lbl: "Management requests" }, { val: "100%", lbl: "Management freed up" }, { val: "24/7", lbl: "Team support active" }],
  },
  {
    color: BLUE, tag: "Headhunter",
    persona: "200 profiles sourced and scored per day",
    problem: '"My AI agent does the work of 3 junior recruiters. I focus on final interviews and client relationships. My revenue doubled in 4 months."',
    author: "— Alexandre P., tech headhunter",
    agents: ["🔎 Sourcing Agent — scrapes LinkedIn profiles and pitches 24/7", "🎙️ Interview Agent — prepares questions and analyses responses during interviews", "⚡ Scoring Agent — candidate fit + gap analysis", "📝 Proposal Agent — generates bespoke proposals"],
    stats: [{ val: "200", lbl: "Profiles/day" }, { val: "+60%", lbl: "Response rate" }, { val: "÷2", lbl: "Time-to-hire" }],
  },
  {
    color: PINK, tag: "Financial independence coach",
    persona: "3x more content, 3x more leads",
    problem: '"I used to spend 20 hours a week on content creation and prospecting. Now my AI agents run the machine while I\'m in coaching sessions."',
    author: "— Julie M., business & financial independence coach",
    agents: ["🎯 Content Agent — creates strategy, generates LinkedIn, Instagram posts and video scripts, then publishes automatically", "🔍 Trend Monitoring Agent — tracks industry trends 24/7", "📣 SDR Agent — qualifies leads from content and runs sequenced outreach"],
    stats: [{ val: "+300%", lbl: "Content published" }, { val: "−20h", lbl: "Per week" }, { val: "+45%", lbl: "Outbound conversion" }],
  },
  {
    color: VIOLET, tag: "Training provider",
    persona: "Automated webinars, sales funnel fed continuously",
    problem: '"We were poor at promoting our courses. Webinars were under-used, post-event follow-up non-existent. AI industrialised the entire machine."',
    author: "— Pierre B., co-founder hybrid school",
    agents: ["📅 Webinar Agent — creates, schedules and reminds attendees automatically", "🎙️ Script Agent — generates webinar scripts tailored to each course", "🔥 Post-webinar Agent — follows up to encourage entry into the sales funnel", "📊 Tracking Agent — (in development) personalised learner progress tracking"],
    stats: [{ val: "+4x", lbl: "Webinars launched" }, { val: "+55%", lbl: "Post-event conversion" }, { val: "0h", lbl: "Webinar admin" }],
  },
  {
    color: ORANGE, tag: "Consulting firm — freelance network",
    persona: "Proposal creation: from 2 days to 2 hours",
    problem: '"Building proposals is unpaid work — and it was costing us hours every week. Now the AI architecture does the work, our freelancers focus on delivery."',
    author: "— Marc D., founder consulting firm & freelance network",
    agents: ["📄 Proposal Agent — generates bespoke commercial proposals from client brief", "📊 PowerPoint Agent — structures deliverables using the firm\'s strategic framework", "🗄️ Archivist Agent (RAG) — queries the past proposal database to reuse the best formulations"],
    stats: [{ val: "−85%", lbl: "Proposal creation time" }, { val: "2h", lbl: "Instead of 2 days" }, { val: "£0", lbl: "Unpaid time recovered" }],
  },
];

const faqs = [
  { q: "Do I need technical skills?", a: "No. If you can use ChatGPT, you have the required level. We start from scratch and build progressively. Technical modules are explained step by step." },
  { q: "How long before I see the first results?", a: "By week 1 you deploy your first working AI agent. Within 4 weeks you have a complete operational system." },
  { q: "Is this training relevant to my sector?", a: "Yes. Agentic principles apply to all sectors. We provide sectoral use cases (consulting, SaaS, services, hospitality, recruitment)." },
  { q: "What's the difference from a standard ChatGPT course?", a: "ChatGPT courses teach you to chat with a chatbot. Here you learn to build autonomous systems that execute complex tasks 24/7 without you. This is engineering, not surface-level prompting." },
  { q: "Can I pay in instalments?", a: "No. Instalment payments are not currently available. The training is billed monthly at €97/month, cancellable after 6 months." },
  { q: "Is the training kept up to date?", a: "Yes, included in your monthly subscription. Agentic AI evolves quickly — we regularly update content with new capabilities and tools, and add new sectoral content each month." },
];

export default function FormationSystemeAgentiqueEN() {
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
    const id = "fsa-styles-en";
    if (!document.getElementById(id)) {
      const el = document.createElement("style"); el.id = id; el.textContent = css;
      document.head.appendChild(el);
    }
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  const goApply = () => navigate("/ecosystem/IAagenticsystemtraining/apply");
  const cardWidthPct = 100 / VISIBLE;
  const gapPx = 20;
  const translateX = `calc(-${proofIndex * cardWidthPct}% - ${proofIndex * gapPx / VISIBLE}px)`;

  return (
    <div className="fsa">
      <div className="fsa-noise" />
      <div className="fsa-mesh" />

      {/* NAV */}
      <nav className="fsa-nav">
        <div className="fsa-nav-logo" onClick={() => navigate("/US")}>
          Catapul<span className="fsa-nav-logo-z">Z</span><span className="fsa-nav-logo-ai">AI</span>
        </div>
        <div className="fsa-nav-right">
          <button className="fsa-nav-back" onClick={() => navigate("/US")}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M8.5 2.5L4 7l4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Back to CatapulZ AI</span>
          </button>
          <button className="fsa-lang-btn" onClick={() => navigate("/ecosystem/formationsystemeagentique")}>
            🇫🇷 <span>FR</span>
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="fsa-hero">
        <div className="fsa-badge"><span className="fsa-badge-dot" />For entrepreneurs, executives and future AI engineers</div>
        <h1 className="fsa-h1">
          Build your army of <span>AI agents</span><br />
          — focus on your goals —<br />
          by yourself
        </h1>
        <div className="fsa-persona-tabs">
          {personas.map((p, i) => (
            <button key={p.label} className={`fsa-persona-tab${activePersona === i ? " active" : ""}`} onClick={() => setActivePersona(i)}>{p.label}</button>
          ))}
        </div>
        <p className="fsa-hero-sub">{personas[activePersona].text}</p>
        <div className="fsa-hero-bullets">
          {[
            { icon: "⚡", text: "Multiply your productivity by 100 without adding a single person to your team" },
            { icon: "💰", text: "Learn where to start implementing AI in your business to maximise ROI" },
            { icon: "🤖", text: "Automate prospecting, qualification, content, support and operations" },
            { icon: "🛠️", text: "Master Claude, Claude Code, Dust, N8N, Gemini, Supabase — no coding required" },
            { icon: "🏗️", text: "Design multi-agent architectures tailored to your goals" },
          ].map(b => (
            <div key={b.text} className="fsa-hero-bullet">
              <span className="fsa-hero-bullet-icon">{b.icon}</span><span>{b.text}</span>
            </div>
          ))}
        </div>
        <div className="fsa-cta-block">
          <button className="fsa-cta-btn" onClick={goApply}>🔥 Join the training</button>
          <div className="fsa-cta-reassurance">
            <span className="fsa-cta-micro">100% online training</span>
            <span className="fsa-cta-micro">Immediate access after payment</span>
            <span className="fsa-cta-micro">No technical prerequisites</span>
          </div>
        </div>
      </section>

      {/* PROOF CAROUSEL */}
      <div className="fsa-proof">
        <div className="fsa-proof-inner">
          <div className="fsa-proof-header">
            <div>
              <p className="fsa-eyebrow">Evidence</p>
              <h2 className="fsa-title" style={{ fontSize: "clamp(22px, 2.8vw, 36px)", marginBottom: 0 }}>Numbers that speak for themselves</h2>
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

      {/* CURRICULUM */}
      <section className="fsa-section" id="curriculum">
        <div className="fsa-section-inner">
          <p className="fsa-eyebrow">Curriculum</p>
          <h2 className="fsa-title">What you'll be able to do by the end</h2>
          <p className="fsa-subtitle">6 skill modules to become an operational agentic AI engineer.</p>
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

      {/* PRICING */}
      <section className="fsa-section" id="pricing">
        <div className="fsa-section-inner">
          <p className="fsa-eyebrow">Pricing</p>
          <h2 className="fsa-title">Choose your level of commitment</h2>
          <p className="fsa-subtitle">One monthly training, two coaching tiers coming soon.</p>
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
                  onClick={() => p.ctaStyle === "primary" && goApply()}>
                  {p.cta}
                </button>
              </div>
            ))}
          </div>
          <div className="fsa-garantie">
            <span className="fsa-garantie-icon">⚡</span>
            <div>
              <div className="fsa-garantie-title">3-day money-back guarantee</div>
              <div className="fsa-garantie-text">If within the first 3 days the training doesn't match what you're looking for, full refund. One email, no justification needed. Stripe processing fees will be deducted from the refund.</div>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="fsa-section" id="results">
        <div className="fsa-section-inner">
          <p className="fsa-eyebrow">Results</p>
          <h2 className="fsa-title">They transformed their business with their AI agents</h2>
          <p className="fsa-subtitle">5 real-world use cases deployed by our clients and students.</p>
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
                  <p className="fsa-case-solution-label">Deployed agents</p>
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

      {/* CTA REMINDER */}
      <div className="fsa-cta-section">
        <div className="fsa-cta-section-inner">
          <p className="fsa-eyebrow" style={{ textAlign: "center" }}>Ready to take action?</p>
          <h2 className="fsa-title">Transform your business with an army of AI agents</h2>
          <p className="fsa-cta-section-sub">Join the training today and start deploying your first agents this week.</p>
          <button className="fsa-cta-btn" style={{ margin: "0 auto", display: "inline-flex" }} onClick={goApply}>
            🚀 Access the training now
          </button>
          <div className="fsa-cta-reassurance" style={{ justifyContent: "center", marginTop: 16 }}>
            <span className="fsa-cta-micro">Secure payment</span>
            <span className="fsa-cta-micro">Instant access</span>
            <span className="fsa-cta-micro">3-day guarantee</span>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <section className="fsa-section" id="faq">
        <div className="fsa-section-inner">
          <p className="fsa-eyebrow">FAQ</p>
          <h2 className="fsa-title">Frequently asked questions</h2>
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

      {/* FOOTER */}
      <footer className="fsa-footer">
        <div className="fsa-footer-main">
          <div>
            <div className="fsa-footer-logo">Catapul<span className="fsa-footer-logo-z">Z</span><span className="fsa-footer-logo-ai">AI</span></div>
            <p className="fsa-footer-desc">AI engineer & architect. Agentic systems specialist for entrepreneurs.</p>
          </div>
          <div>
            <p className="fsa-footer-col-title">Training</p>
            <nav className="fsa-footer-links">
              <a href="#curriculum">Curriculum</a>
              <a href="#results">Testimonials</a>
              <a href="#pricing">Pricing</a>
              <a href="#faq">FAQ</a>
            </nav>
          </div>
          <div>
            <p className="fsa-footer-col-title">Legal</p>
            <nav className="fsa-footer-links">
              <a href="/mentions-legales">Legal notice</a>
              <a href="/cgv">Terms</a>
              <a href="/politique-confidentialite">Privacy</a>
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
          <p className="fsa-footer-copy">© {new Date().getFullYear()} CatapulZ AI — All rights reserved</p>
          <div className="fsa-footer-legal">
            <a href="/mentions-legales">Legal notice</a>
            <a href="/politique-confidentialite">Privacy</a>
            <a href="/cgv">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
