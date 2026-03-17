import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LeadFormIA from "../components/LeadFormIA";

const PINK = "#FF398E";
const BG   = "#0a0a0f";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@700;800;900&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${BG}; margin: 0; }

  .qf { font-family: 'DM Sans', sans-serif; background: ${BG}; color: #f0f0f0; min-height: 100svh; }

  .qf-noise {
    position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }
  .qf-mesh {
    position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background: radial-gradient(ellipse 60% 50% at 20% 30%, rgba(255,57,142,0.08) 0%, transparent 70%);
  }

  /* NAV */
  .qf-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    display: flex; align-items: center; justify-content: space-between;
    padding: 16px 40px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    backdrop-filter: blur(24px);
    background: rgba(10,10,15,0.9);
  }
  .qf-nav-logo { font-family: 'Raleway', sans-serif; font-size: 20px; font-weight: 900; letter-spacing: -0.5px; display: flex; align-items: baseline; cursor: pointer; }
  .qf-nav-logo-z, .qf-nav-logo-ai { color: ${PINK}; }
  .qf-nav-logo-ai { font-size: 12px; font-weight: 700; margin-left: 1px; letter-spacing: 0.05em; }
  .qf-nav-back {
    display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 500; color: #666680;
    cursor: pointer; padding: 8px 16px; border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.08); background: transparent;
    transition: color 0.2s, border-color 0.2s, background 0.2s;
  }
  .qf-nav-back:hover { color: #f0f0f0; border-color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.04); }
  .qf-nav-back svg { transition: transform 0.2s; }
  .qf-nav-back:hover svg { transform: translateX(-3px); }
  @media (max-width: 640px) { .qf-nav { padding: 14px 20px; } .qf-nav-back span { display: none; } }

  /* MAIN */
  .qf-main {
    position: relative; z-index: 1;
    min-height: 100svh; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 120px 24px 80px;
  }

  /* HEADER */
  .qf-header { text-align: center; margin-bottom: 48px; max-width: 560px; }
  .qf-eyebrow { font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: ${PINK}; margin-bottom: 10px; }
  .qf-title { font-family: 'Raleway', sans-serif; font-size: clamp(26px, 3.5vw, 40px); font-weight: 900; letter-spacing: -1px; line-height: 1.1; margin-bottom: 12px; }
  .qf-sub { font-size: 15px; color: #7a7a98; line-height: 1.7; }
`;

export default function QuestionnaireFormation() {
  const navigate = useNavigate();

  useEffect(() => {
    const id = "qf-styles";
    if (!document.getElementById(id)) {
      const el = document.createElement("style"); el.id = id; el.textContent = css;
      document.head.appendChild(el);
    }
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  return (
    <div className="qf">
      <div className="qf-noise" />
      <div className="qf-mesh" />

      <nav className="qf-nav">
        <div className="qf-nav-logo" onClick={() => navigate("/")}>
          Catapul<span className="qf-nav-logo-z">Z</span><span className="qf-nav-logo-ai">AI</span>
        </div>
        <button className="qf-nav-back" onClick={() => navigate("/ecosystem/formationsystemeagentique")}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M8.5 2.5L4 7l4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Retour à la formation</span>
        </button>
      </nav>

      <main className="qf-main">
        <div className="qf-header">
          <p className="qf-eyebrow">Candidature</p>
          <h1 className="qf-title">Rejoindre Master Agentic AI</h1>
          <p className="qf-sub">Wilfried lit chaque candidature. 4 questions — 2 minutes — pour s'assurer que la formation correspond exactement à ce que tu cherches.</p>
        </div>
        <LeadFormIA />
      </main>
    </div>
  );
}
