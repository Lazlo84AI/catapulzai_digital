import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   TOKEN COULEURS — charte graphique CatapulZ
   Rose    : #FF398E  (accent principal)
   Bleu    : #0986F1
   Cyan    : #00D1CE
   Orange  : #FF7A00
   Violet  : #7c6cfc  (accent secondaire)
───────────────────────────────────────────── */
const BLUE  = "#0986F1";
const PINK  = "#FF398E";
const GREEN = "#00D1CE";

/* ─────────────────────────────────────────────
   COPY
───────────────────────────────────────────── */
const copy = {
  badge: "Consulting · Ingénierie · Venture IA",
  heroTitle: "Plus de performance et moins de charge mentale. Exploitez la version IA de votre activité.",
  heroParagraph:
    "CatapulZ AI est un service de consulting, développement et venture building basé sur l'IA, utilisant des systèmes agentiques et du vibe coding pour donner la possibilité à des entrepreneurs, PME et executives de tirer le meilleur parti de l'IA pour leur avenir.",
  emailLabel: "Recevez nos ressources IA exclusives — gratuit",
  emailPlaceholder: "votre@email.com",
  emailCTA: "Rejoindre →",
  emailMicro: "Pas de spam. Désabonnement en 1 clic.",
  emailSuccess: "Bienvenue dans l'écosystème CatapulZ. À très vite.",
  pillarsTitle: "Trois façons de travailler ensemble",
  pillarsEyebrow: "Trois façons de travailler ensemble",
  pillarsNav: ["1 — CONSULTING IA", "2 — INGÉNIERIE IA", "3 — VENTURE IA"],
  pillars: [
    {
      num: "01",
      tag: "CONSULTING IA",
      title: "Transformez votre activité : Audit, Stratégie, Roadmap IA et architecture cible",
      desc: "Auditez votre organisation et construisez une roadmap IA priorisée par ROI immédiat. Chaque recommandation est actionnable dans les 25 jours.",
      accent: BLUE,
      id: "pillar-0",
    },
    {
      num: "02",
      tag: "INGÉNIERIE IA",
      title: "Développement d'application IA et Systèmes agentiques sur mesure",
      desc: "Conception et déploiement de systèmes agentiques sur mesure avec agents autonomes et architecture technique (no-code, code et industrialisable) adaptée à vos processus métiers.",
      accent: PINK,
      id: "pillar-1",
    },
    {
      num: "03",
      tag: "VENTURE IA",
      title: "Lancez votre offre IA ou votre business IA pour valoriser votre entreprise",
      desc: "Construire et lancer de nouveaux produits, services et business centrés sur l'IA avec un système d'acquisition client IA — inbound (création de contenu et référencement) et outbound (targeting multicanal : mail, LinkedIn, WhatsApp) — dès le premier jour.",
      accent: GREEN,
      id: "pillar-2",
    },
  ],
  navLinks: [
    { label: "Offres", href: "#offres" },
    { label: "Ventures", href: "#ventures" },
    { label: "Contact", href: "#contact" },
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

  .cz {
    font-family: 'DM Sans', sans-serif;
    background: #0a0a0f;
    color: #f0f0f0;
    overflow-x: hidden;
  }

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
  .cz-logo {
    font-family: 'Raleway', sans-serif;
    font-size: 21px; font-weight: 900; letter-spacing: -0.5px;
    display: flex; align-items: baseline;
  }
  .cz-logo-z, .cz-logo-ai { color: #FF398E; }
  .cz-logo-ai { font-size: 13px; font-weight: 700; margin-left: 1px; letter-spacing: 0.05em; }
  .cz-nav-links { display: flex; gap: 28px; align-items: center; }
  .cz-nav-links a {
    font-size: 13px; font-weight: 500; color: #666680;
    text-decoration: none; transition: color 0.2s;
  }
  .cz-nav-links a:hover { color: #f0f0f0; }
  .cz-nav-cta {
    background: #FF398E !important; color: #fff !important;
    padding: 8px 18px; border-radius: 7px;
    font-weight: 700 !important; font-size: 13px !important;
    transition: filter 0.2s !important;
  }
  .cz-nav-cta:hover { filter: brightness(1.1); }
  @media (max-width: 640px) {
    .cz-nav { padding: 16px 20px; }
    .cz-nav-links { display: none; }
  }

  /* ── HERO ── */
  .cz-hero {
    position: relative; z-index: 1;
    min-height: 100svh;
    display: flex; flex-direction: column; justify-content: center;
    padding: 120px 40px 100px;
    max-width: 1140px; margin: 0 auto;
  }
  @media (max-width: 640px) { .cz-hero { padding: 100px 20px 80px; } }

  .cz-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255,57,142,0.07); border: 1px solid rgba(255,57,142,0.22);
    padding: 6px 14px; border-radius: 100px;
    font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
    color: #FF398E; text-transform: uppercase;
    margin-bottom: 28px; animation: czFadeUp 0.5s ease both;
  }
  .cz-badge-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: #FF398E; animation: czPulse 2s infinite;
  }
  .cz-h1 {
    font-family: 'Raleway', sans-serif;
    font-size: clamp(40px, 6vw, 84px);
    font-weight: 900; line-height: 1.0; letter-spacing: -3px;
    margin-bottom: 32px; color: #f0f0f0;
    animation: czFadeUp 0.5s 0.08s ease both; width: 100%;
  }
  .cz-hero-p {
    font-size: clamp(15px, 1.8vw, 18px); line-height: 1.7;
    color: #f0f0f0; font-weight: 300; margin-bottom: 40px; max-width: 720px;
    animation: czFadeUp 0.5s 0.16s ease both;
  }

  /* ── FORM ── */
  .cz-form-block { animation: czFadeUp 0.5s 0.24s ease both; max-width: 520px; }
  .cz-form-label {
    font-size: 12px; font-weight: 500; color: #666680;
    letter-spacing: 0.04em; margin-bottom: 10px; text-transform: uppercase;
  }
  .cz-form {
    display: flex; overflow: hidden;
    border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; background: #111118;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .cz-form:focus-within {
    border-color: rgba(255,57,142,0.4);
    box-shadow: 0 0 0 4px rgba(255,57,142,0.06);
  }
  .cz-form input {
    flex: 1; background: transparent; border: none; outline: none;
    padding: 15px 20px; font-family: 'DM Sans', sans-serif; font-size: 15px; color: #f0f0f0;
  }
  .cz-form input::placeholder { color: #666680; }
  .cz-form button {
    background: #FF398E; color: #fff; border: none; padding: 14px 22px;
    font-family: 'Raleway', sans-serif; font-size: 13px; font-weight: 700;
    cursor: pointer; white-space: nowrap; transition: filter 0.15s;
  }
  .cz-form button:hover { filter: brightness(1.1); }
  .cz-form button:disabled { opacity: 0.55; cursor: not-allowed; }
  .cz-form-micro { margin-top: 10px; font-size: 12px; color: #666680; display: flex; align-items: center; gap: 6px; }
  .cz-success {
    display: flex; align-items: center; gap: 12px;
    background: rgba(255,57,142,0.07); border: 1px solid rgba(255,57,142,0.25);
    border-radius: 10px; padding: 16px 20px;
    font-size: 15px; color: #FF398E; font-weight: 500;
  }

  /* ── SCROLL HINT — fixe en bas, radar ── */
  .cz-scroll-hint {
    position: fixed; bottom: 36px; left: 50%;
    transform: translateX(-50%);
    z-index: 150;
    display: flex; flex-direction: column; align-items: center; gap: 10px;
    opacity: 1; transition: opacity 0.5s ease;
    pointer-events: auto;
  }
  .cz-scroll-hint.hidden { opacity: 0; pointer-events: none; }
  .cz-scroll-hint-label {
    font-size: 10px; font-weight: 700; letter-spacing: 0.14em;
    text-transform: uppercase; color: #555570;
  }
  .cz-radar-btn {
    position: relative; width: 48px; height: 48px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
  }
  .cz-radar-circle {
    position: absolute; inset: 0; border-radius: 50%;
    border: 1.5px solid rgba(255,57,142,0.5);
  }
  .cz-radar-wave {
    position: absolute; inset: 0; border-radius: 50%;
    border: 1px solid rgba(255,57,142,0.4);
    animation: czRadarWave 2.2s ease-out infinite;
  }
  .cz-radar-wave:nth-child(2) { animation-delay: 0.7s; }
  .cz-radar-wave:nth-child(3) { animation-delay: 1.4s; }
  .cz-radar-icon {
    position: relative; z-index: 2;
    animation: czBounce 1.8s ease-in-out infinite;
  }

  @keyframes czRadarWave {
    0%   { transform: scale(1); opacity: 0.5; }
    100% { transform: scale(2.6); opacity: 0; }
  }
  @keyframes czBounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(5px); }
  }

  /* ── PILLARS INTRO (sticky) ── */
  .cz-pillars-intro {
    position: sticky; top: 72px; z-index: 2;
    background: #0a0a0f;
    padding: 52px 40px 40px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    pointer-events: none;
  }
  .cz-pillars-intro-inner { max-width: 1140px; margin: 0 auto; }
  @media (max-width: 640px) { .cz-pillars-intro { padding: 40px 20px 28px; } }

  .cz-section-eyebrow {
    font-size: 11px; font-weight: 600; letter-spacing: 0.12em;
    text-transform: uppercase; color: #FF398E; margin-bottom: 10px;
  }
  .cz-section-title {
    font-family: 'Raleway', sans-serif;
    font-size: clamp(26px, 3.2vw, 44px);
    font-weight: 900; letter-spacing: -1px; line-height: 1.1;
    margin-bottom: 32px;
  }

  .cz-pillars-nav {
    display: flex; gap: 0;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px; overflow: hidden;
    max-width: 640px;
  }
  .cz-pillars-nav-item {
    flex: 1; padding: 12px 16px;
    font-family: 'Raleway', sans-serif;
    font-size: 12px; font-weight: 800;
    letter-spacing: 0.05em; text-transform: uppercase;
    color: #444460; text-align: center;
    border-right: 1px solid rgba(255,255,255,0.08);
    transition: color 0.35s, background 0.35s;
    cursor: pointer;
  }
  .cz-pillars-nav-item:last-child { border-right: none; }
  .cz-pillars-nav-item:hover { color: #f0f0f0; }
  .cz-pillars-nav-item.active-0 { color: #0986F1; background: rgba(9,134,241,0.06); }
  .cz-pillars-nav-item.active-1 { color: #FF398E; background: rgba(255,57,142,0.06); }
  .cz-pillars-nav-item.active-2 { color: #00D1CE; background: rgba(0,209,206,0.06); }
  @media (max-width: 640px) {
    .cz-pillars-nav { flex-direction: column; }
    .cz-pillars-nav-item { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.08); }
  }

  /* ── STACK CARDS ── */
  .cz-stack-container {
    position: relative; z-index: 5;
    max-width: 960px; margin: 0 auto;
    padding: 0 40px 120px;
    display: flex; flex-direction: column; gap: 24px;
  }
  @media (max-width: 640px) { .cz-stack-container { padding: 0 20px 80px; gap: 16px; } }

  .cz-stack-slot { position: relative; }

  .cz-stack-card {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .cz-stack-card.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .cz-stack-card-inner {
    width: 100%; max-width: 920px;
    background: #0f0f18;
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 24px;
    padding: 56px 52px;
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 52px; align-items: start;
    box-shadow: 0 32px 80px rgba(0,0,0,0.6);
    position: relative; overflow: hidden;
  }
  .cz-stack-card-bar {
    position: absolute; top: 0; left: 0; right: 0; height: 3px;
    border-radius: 24px 24px 0 0;
  }

  @media (max-width: 768px) {
    .cz-stack-card-inner { grid-template-columns: 1fr; gap: 24px; padding: 32px 28px; }
  }

  .cz-card-num {
    font-family: 'Raleway', sans-serif;
    font-size: 110px; font-weight: 900; line-height: 1; letter-spacing: -8px;
    color: rgba(255,255,255,0.035); margin-bottom: -12px; user-select: none;
  }
  .cz-card-num-label {
    font-family: 'Raleway', sans-serif;
    font-size: 12px; font-weight: 800; letter-spacing: 0.1em;
    text-transform: uppercase; margin-bottom: 4px; opacity: 0.4;
  }
  .cz-card-tag {
    font-family: 'Raleway', sans-serif;
    font-size: 20px; font-weight: 900; letter-spacing: 0.04em;
    text-transform: uppercase; line-height: 1.15;
  }
  .cz-card-right { padding-top: 4px; }
  .cz-card-title {
    font-family: 'Raleway', sans-serif;
    font-size: clamp(19px, 2.2vw, 28px);
    font-weight: 800; letter-spacing: -0.4px;
    line-height: 1.25; margin-bottom: 20px;
  }
  .cz-card-desc {
    font-size: 15px; line-height: 1.78; color: #7a7a98; font-weight: 300;
  }

  /* ── FOOTER ── */
  .cz-footer {
    position: relative; z-index: 10;
    border-top: 1px solid rgba(255,255,255,0.07);
    padding: 28px 40px;
    display: flex; align-items: center; justify-content: space-between;
    max-width: 1140px; margin: 0 auto;
    background: #0a0a0f;
  }
  .cz-footer-logo {
    font-family: 'Raleway', sans-serif; font-size: 15px; font-weight: 900;
    display: flex; align-items: baseline;
  }
  .cz-footer-copy { font-size: 12px; color: #666680; }
  @media (max-width: 640px) {
    .cz-footer { flex-direction: column; gap: 10px; text-align: center; padding: 24px 20px; }
  }

  /* ── KEYFRAMES ── */
  @keyframes czFadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes czPulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(1.4); }
  }
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function HomePage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [scrollHintVisible, setScrollHintVisible] = useState(true);
  const [activeNav, setActiveNav] = useState(-1);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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
            setTimeout(() => {
              card.classList.add("visible");
              setActiveNav(i);
            }, i * 120);
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

  const scrollToPillars = () => {
    document.getElementById("offres")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="cz">
      <div className="cz-noise" />
      <div className="cz-mesh" />

      {/* NAV */}
      <nav className="cz-nav">
        <div className="cz-logo">
          Catapul<span className="cz-logo-z">Z</span><span className="cz-logo-ai">AI</span>
        </div>
        <div className="cz-nav-links">
          {copy.navLinks.map((l) => (
            <a key={l.label} href={l.href}>{l.label}</a>
          ))}
          <a href="#contact" className="cz-nav-cta">{copy.navCTA}</a>
        </div>
      </nav>

      {/* SCROLL HINT */}
      <div className={`cz-scroll-hint${scrollHintVisible ? "" : " hidden"}`}>
        <span className="cz-scroll-hint-label">Scroll down</span>
        <div className="cz-radar-btn" onClick={scrollToPillars}>
          <div className="cz-radar-wave" />
          <div className="cz-radar-wave" />
          <div className="cz-radar-wave" />
          <div className="cz-radar-circle" />
          <svg className="cz-radar-icon" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 3.5v11M4 9.5l5 5 5-5" stroke="#FF398E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* HERO */}
      <section className="cz-hero">
        <div className="cz-badge">
          <span className="cz-badge-dot" />
          {copy.badge}
        </div>
        <h1 className="cz-h1">{copy.heroTitle}</h1>
        <p className="cz-hero-p">{copy.heroParagraph}</p>

        <div className="cz-form-block" id="contact">
          <p className="cz-form-label">{copy.emailLabel}</p>
          {status === "done" ? (
            <div className="cz-success"><span>✦</span><span>{copy.emailSuccess}</span></div>
          ) : (
            <>
              <form className="cz-form" onSubmit={handleSubmit}>
                <input
                  type="email" placeholder={copy.emailPlaceholder}
                  value={email} onChange={(e) => setEmail(e.target.value)} required
                />
                <button type="submit" disabled={status === "loading"}>
                  {status === "loading" ? "…" : copy.emailCTA}
                </button>
              </form>
              <p className="cz-form-micro"><span>🔒</span><span>{copy.emailMicro}</span></p>
            </>
          )}
        </div>
      </section>

      {/* PILLARS INTRO */}
      <div className="cz-pillars-intro" id="offres">
        <div className="cz-pillars-intro-inner">
          <p className="cz-section-eyebrow">{copy.pillarsEyebrow}</p>
          <h2 className="cz-section-title">{copy.pillarsTitle}</h2>
          <div className="cz-pillars-nav">
            {copy.pillarsNav.map((label, i) => (
              <div
                key={label}
                className={`cz-pillars-nav-item${activeNav === i ? ` active-${i}` : ""}`}
                onClick={() => {
                  document.getElementById(`pillar-${i}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
              >
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
            <div
              className="cz-stack-card"
              ref={(el) => { cardRefs.current[i] = el; }}
              data-index={i}
              style={{ zIndex: 10 + i }}
            >
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

      {/* FOOTER */}
      <footer className="cz-footer">
        <div className="cz-footer-logo">
          Catapul<span className="cz-logo-z">Z</span><span className="cz-logo-ai">AI</span>
        </div>
        <p className="cz-footer-copy">
          © {new Date().getFullYear()} CatapulZ AI — Tous droits réservés
        </p>
      </footer>
    </div>
  );
}
