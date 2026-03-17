import { useState, useEffect } from "react";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
interface FormData {
  nom: string; email: string; telephone: string;
  prix_willing: string; prix_autre: string;
  blocage_action: string; blocage_autre: string;
  fonction: string; taille_entreprise: string; secteur: string;
  processus: string[]; niveau_ia: string; blocage_description: string;
  timing: string; engagement_6mois: string;
}

const INITIAL: FormData = {
  nom: "", email: "", telephone: "",
  prix_willing: "", prix_autre: "",
  blocage_action: "", blocage_autre: "",
  fonction: "", taille_entreprise: "", secteur: "",
  processus: [], niveau_ia: "", blocage_description: "",
  timing: "", engagement_6mois: "",
};

const PINK = "#FF398E";
const GREEN = "#00D1CE";
const CARD = "#0f0f18";
const STORAGE_KEY = "fsa_lead_form";

const css = `
  .lf-wrap {
    width: 100%; max-width: 640px; margin: 0 auto;
    background: ${CARD}; border: 1px solid rgba(255,255,255,0.1);
    border-radius: 24px; padding: 40px;
    box-shadow: 0 40px 100px rgba(0,0,0,0.6);
  }
  @media (max-width: 640px) { .lf-wrap { padding: 28px 20px; border-radius: 16px; } }
  .lf-progress { display: flex; align-items: center; gap: 8px; margin-bottom: 32px; }
  .lf-progress-step { flex: 1; height: 3px; border-radius: 100px; background: rgba(255,255,255,0.08); transition: background 0.4s; }
  .lf-progress-step.done { background: ${PINK}; }
  .lf-progress-label { font-size: 11px; font-weight: 600; color: #555570; letter-spacing: 0.08em; white-space: nowrap; }
  .lf-step-title { font-family: 'Raleway', sans-serif; font-size: 20px; font-weight: 900; letter-spacing: -0.5px; margin-bottom: 6px; }
  .lf-step-sub { font-size: 13px; color: #7a7a98; margin-bottom: 28px; line-height: 1.6; }
  .lf-field { margin-bottom: 18px; }
  .lf-label { font-size: 12px; font-weight: 600; color: #9a9ab0; letter-spacing: 0.04em; text-transform: uppercase; margin-bottom: 7px; display: block; }
  .lf-input { width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 12px 16px; font-family: 'DM Sans', sans-serif; font-size: 15px; color: #f0f0f0; outline: none; transition: border-color 0.2s, box-shadow 0.2s; box-sizing: border-box; }
  .lf-input::placeholder { color: #444460; }
  .lf-input:focus { border-color: rgba(255,57,142,0.4); box-shadow: 0 0 0 3px rgba(255,57,142,0.06); }
  .lf-input.error { border-color: rgba(255,80,80,0.5); }
  .lf-error { font-size: 11px; color: #ff5050; margin-top: 5px; }
  .lf-select { width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 12px 16px; font-family: 'DM Sans', sans-serif; font-size: 15px; color: #f0f0f0; outline: none; transition: border-color 0.2s; box-sizing: border-box; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23666680' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 16px center; }
  .lf-select:focus { border-color: rgba(255,57,142,0.4); }
  .lf-select option { background: #0f0f18; color: #f0f0f0; }
  .lf-textarea { width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 12px 16px; font-family: 'DM Sans', sans-serif; font-size: 15px; color: #f0f0f0; outline: none; transition: border-color 0.2s; box-sizing: border-box; resize: vertical; min-height: 88px; line-height: 1.6; }
  .lf-textarea::placeholder { color: #444460; }
  .lf-textarea:focus { border-color: rgba(255,57,142,0.4); box-shadow: 0 0 0 3px rgba(255,57,142,0.06); }
  .lf-pills { display: flex; flex-direction: column; gap: 8px; }
  .lf-pill { display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 12px 16px; cursor: pointer; transition: border-color 0.2s, background 0.2s; font-size: 14px; }
  .lf-pill:hover { border-color: rgba(255,57,142,0.3); background: rgba(255,57,142,0.04); }
  .lf-pill.selected { border-color: ${PINK}; background: rgba(255,57,142,0.08); }
  .lf-pill-dot { width: 16px; height: 16px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.2); flex-shrink: 0; transition: all 0.2s; display: flex; align-items: center; justify-content: center; }
  .lf-pill.selected .lf-pill-dot { border-color: ${PINK}; background: ${PINK}; }
  .lf-nav { display: flex; gap: 12px; margin-top: 32px; }
  .lf-btn-prev { flex: 1; padding: 14px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.12); background: transparent; color: #9a9ab0; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
  .lf-btn-prev:hover { border-color: rgba(255,255,255,0.25); color: #f0f0f0; }
  .lf-btn-next { flex: 2; padding: 14px; border-radius: 10px; border: none; background: ${PINK}; color: #fff; font-family: 'Raleway', sans-serif; font-size: 15px; font-weight: 800; cursor: pointer; transition: filter 0.2s, transform 0.15s; }
  .lf-btn-next:hover:not(:disabled) { filter: brightness(1.1); transform: translateY(-1px); }
  .lf-btn-next:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
  .lf-success { text-align: center; padding: 20px 0; }
  .lf-success-icon { font-size: 52px; margin-bottom: 20px; }
  .lf-success-title { font-family: 'Raleway', sans-serif; font-size: 26px; font-weight: 900; letter-spacing: -0.5px; margin-bottom: 10px; color: ${GREEN}; }
  .lf-success-text { font-size: 15px; color: #7a7a98; line-height: 1.7; }
  .lf-slide-in { animation: lfSlideIn 0.35s cubic-bezier(0.16,1,0.3,1) both; }
  @keyframes lfSlideIn { from { opacity: 0; transform: translateX(24px); } to { opacity: 1; transform: translateX(0); } }
  .lf-chips { display: flex; flex-wrap: wrap; gap: 8px; }
  .lf-chip { padding: 8px 14px; border-radius: 100px; font-size: 12px; font-weight: 600; border: 1px solid rgba(255,255,255,0.1); color: #666680; cursor: pointer; transition: all 0.2s; background: transparent; }
  .lf-chip:hover { border-color: rgba(255,57,142,0.4); color: #f0f0f0; }
  .lf-chip.selected { border-color: ${PINK}; color: ${PINK}; background: rgba(255,57,142,0.08); }
  .lf-chip.capped { opacity: 0.35; cursor: not-allowed; }
  .lf-other { margin-top: 8px; }
`;

export default function LeadFormIA() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(() => {
    try { const s = localStorage.getItem(STORAGE_KEY); return s ? { ...INITIAL, ...JSON.parse(s) } : INITIAL; }
    catch { return INITIAL; }
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const id = "lf-styles";
    if (!document.getElementById(id)) {
      const el = document.createElement("style"); el.id = id; el.textContent = css;
      document.head.appendChild(el);
    }
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
  }, [data]);

  const set = (field: keyof FormData, val: string | string[]) => {
    setData(d => ({ ...d, [field]: val }));
    setErrors(e => ({ ...e, [field]: undefined }));
  };

  const toggleChip = (val: string) => {
    const arr = data.processus;
    if (arr.includes(val)) set("processus", arr.filter(v => v !== val));
    else if (arr.length < 3) set("processus", [...arr, val]);
  };

  const validate = (s: number) => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (s === 1) {
      if (!data.nom.trim()) e.nom = "Ton prénom est requis";
      if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Email invalide";
      if (!data.prix_willing) e.prix_willing = "Choisis une option";
      if (!data.blocage_action) e.blocage_action = "Choisis un blocage";
    }
    if (s === 2) {
      if (!data.fonction) e.fonction = "Requis";
      if (!data.taille_entreprise) e.taille_entreprise = "Requis";
      if (!data.secteur.trim()) e.secteur = "Requis";
    }
    if (s === 3) {
      if (data.processus.length === 0) e.processus = "Choisis au moins un processus";
      if (!data.niveau_ia) e.niveau_ia = "Requis";
      if (!data.blocage_description.trim()) e.blocage_description = "Requis";
    }
    if (s === 4) {
      if (!data.timing) e.timing = "Requis";
      if (!data.engagement_6mois) e.engagement_6mois = "Requis";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validate(step)) return;
    setAnimKey(k => k + 1); setStep(s => s + 1);
  };

  const prev = () => { setAnimKey(k => k + 1); setStep(s => s - 1); };

  const submit = async () => {
    if (!validate(4)) return;
    setLoading(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, timestamp: new Date().toISOString(), uuid: crypto.randomUUID(), source: "landing_formation_agentique" }),
      });
    } catch {}
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    setLoading(false); setDone(true);
  };

  const Radio = ({ field, val, label }: { field: keyof FormData; val: string; label: string }) => (
    <div className={`lf-pill${data[field] === val ? " selected" : ""}`} onClick={() => set(field, val)}>
      <span className="lf-pill-dot">
        {data[field] === val && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff", display: "block" }} />}
      </span>
      {label}
    </div>
  );

  if (done) return (
    <div className="lf-wrap">
      <div className="lf-success">
        <div className="lf-success-icon">🚀</div>
        <div className="lf-success-title">Merci {data.nom.split(" ")[0]} !</div>
        <div className="lf-success-text">
          Ta candidature est reçue. Wilfried reviendra vers toi sous 48h pour discuter de la prochaine étape.<br /><br />
          En attendant, rejoins-nous sur LinkedIn →
        </div>
      </div>
    </div>
  );

  return (
    <div className="lf-wrap">
      <div className="lf-progress">
        {[1, 2, 3, 4].map(i => <div key={i} className={`lf-progress-step${step >= i ? " done" : ""}`} />)}
        <span className="lf-progress-label">{step}/4</span>
      </div>

      <div key={animKey} className="lf-slide-in">

        {step === 1 && <>
          <div className="lf-step-title">Parlons de toi</div>
          <div className="lf-step-sub">2 minutes — on veut comprendre où tu en es.</div>

          <div className="lf-field">
            <label className="lf-label">Prénom *</label>
            <input className={`lf-input${errors.nom ? " error" : ""}`} placeholder="Ton prénom" value={data.nom} onChange={e => set("nom", e.target.value)} />
            {errors.nom && <div className="lf-error">{errors.nom}</div>}
          </div>

          <div className="lf-field">
            <label className="lf-label">Email *</label>
            <input className={`lf-input${errors.email ? " error" : ""}`} type="email" placeholder="ton@email.com" value={data.email} onChange={e => set("email", e.target.value)} />
            <div style={{ fontSize: 11, color: "#444460", marginTop: 5 }}>Pas de spam — juste pour que tu sois au courant de tout.</div>
            {errors.email && <div className="lf-error">{errors.email}</div>}
          </div>

          <div className="lf-field">
            <label className="lf-label">Téléphone (optionnel)</label>
            <input className="lf-input" type="tel" placeholder="+33 6 00 00 00 00" value={data.telephone} onChange={e => set("telephone", e.target.value)} />
          </div>

          <div className="lf-field">
            <label className="lf-label">Combien serais-tu prêt(e) à payer pour une formation qui résout ça ? *</label>
            <div className="lf-pills">
              <Radio field="prix_willing" val="97€/mois" label="97€/mois" />
              <Radio field="prix_willing" val="147€/mois" label="147€/mois" />
              <Radio field="prix_willing" val="autre" label="Autre" />
            </div>
            {data.prix_willing === "autre" && (
              <div className="lf-other">
                <input className="lf-input" placeholder="Précise ton budget..." value={data.prix_autre} onChange={e => set("prix_autre", e.target.value)} />
              </div>
            )}
            {errors.prix_willing && <div className="lf-error">{errors.prix_willing}</div>}
          </div>

          <div className="lf-field">
            <label className="lf-label">Ton principal blocage pour passer à l'action sur l'IA agentique ? *</label>
            <div className="lf-pills">
              <Radio field="blocage_action" val="ne_sais_pas" label="Je ne sais pas où commencer" />
              <Radio field="blocage_action" val="pas_application" label="Je ne trouve pas d'application dans mon quotidien" />
              <Radio field="blocage_action" val="pas_temps" label="Je n'ai pas le temps de suivre une formation" />
              <Radio field="blocage_action" val="autre" label="Autre" />
            </div>
            {data.blocage_action === "autre" && (
              <div className="lf-other">
                <input className="lf-input" placeholder="Décris ton blocage..." value={data.blocage_autre} onChange={e => set("blocage_autre", e.target.value)} />
              </div>
            )}
            {errors.blocage_action && <div className="lf-error">{errors.blocage_action}</div>}
          </div>
        </>}

        {step === 2 && <>
          <div className="lf-step-title">Ton contexte</div>
          <div className="lf-step-sub">Pour t'envoyer les bons cas d'usage.</div>

          <div className="lf-field">
            <label className="lf-label">Fonction *</label>
            <select className={`lf-select${errors.fonction ? " error" : ""}`} value={data.fonction} onChange={e => set("fonction", e.target.value)}>
              <option value="">Sélectionne ta fonction</option>
              <option value="entrepreneur">Entrepreneur / Fondateur</option>
              <option value="executive">Executive / Manager</option>
              <option value="consultant">Consultant / Freelance</option>
              <option value="ingenieur_ia">Futur ingénieur IA</option>
              <option value="autre">Autre</option>
            </select>
            {errors.fonction && <div className="lf-error">{errors.fonction}</div>}
          </div>

          <div className="lf-field">
            <label className="lf-label">Taille entreprise *</label>
            <select className={`lf-select${errors.taille_entreprise ? " error" : ""}`} value={data.taille_entreprise} onChange={e => set("taille_entreprise", e.target.value)}>
              <option value="">Sélectionne la taille</option>
              <option value="solo">Solo / 1-5</option>
              <option value="5-20">5-20</option>
              <option value="20-100">20-100</option>
              <option value="100+">100+</option>
            </select>
            {errors.taille_entreprise && <div className="lf-error">{errors.taille_entreprise}</div>}
          </div>

          <div className="lf-field">
            <label className="lf-label">Secteur *</label>
            <input className={`lf-input${errors.secteur ? " error" : ""}`} placeholder="Ex : conseil, SaaS, hôtellerie, recrutement..." value={data.secteur} onChange={e => set("secteur", e.target.value)} />
            {errors.secteur && <div className="lf-error">{errors.secteur}</div>}
          </div>
        </>}

        {step === 3 && <>
          <div className="lf-step-title">Ton besoin</div>
          <div className="lf-step-sub">Qu'est-ce qu'on va automatiser ensemble ?</div>

          <div className="lf-field">
            <label className="lf-label">Processus à automatiser * <span style={{ color: "#555570", textTransform: "none", letterSpacing: 0, fontWeight: 400 }}>(max 3)</span></label>
            <div className="lf-chips">
              {["Prospection", "Qualification leads", "Création contenu", "Support client", "Opérations", "Veille", "Product dev", "Autre"].map(v => {
                const sel = data.processus.includes(v);
                const capped = data.processus.length >= 3 && !sel;
                return (
                  <div key={v} className={`lf-chip${sel ? " selected" : ""}${capped ? " capped" : ""}`}
                    onClick={() => !capped && toggleChip(v)}>{v}</div>
                );
              })}
            </div>
            {errors.processus && <div className="lf-error">{errors.processus}</div>}
          </div>

          <div className="lf-field">
            <label className="lf-label">Niveau IA actuel *</label>
            <div className="lf-pills">
              {[
                { val: "debutant", label: "Débutant — je découvre" },
                { val: "chatgpt_occ", label: "ChatGPT occasionnel" },
                { val: "outils_ia", label: "Outils IA réguliers" },
                { val: "agents_dep", label: "J'ai déjà déployé des agents" },
                { val: "indus", label: "En cours d'industrialisation" },
              ].map(o => <Radio key={o.val} field="niveau_ia" val={o.val} label={o.label} />)}
            </div>
            {errors.niveau_ia && <div className="lf-error">{errors.niveau_ia}</div>}
          </div>

          <div className="lf-field">
            <label className="lf-label">Décris ton blocage principal *</label>
            <textarea className="lf-textarea" placeholder="Ex : J'essaie d'automatiser ma prospection avec N8N mais je bloque sur la connexion CRM..." value={data.blocage_description} onChange={e => set("blocage_description", e.target.value)} />
            {errors.blocage_description && <div className="lf-error">{errors.blocage_description}</div>}
          </div>
        </>}

        {step === 4 && <>
          <div className="lf-step-title">Prêt(e) à démarrer ?</div>
          <div className="lf-step-sub">Dernière ligne droite.</div>

          <div className="lf-field">
            <label className="lf-label">Quand veux-tu démarrer ? *</label>
            <div className="lf-pills">
              {[
                { val: "cette_semaine", label: "Cette semaine" },
                { val: "15_jours", label: "Dans 15 jours" },
                { val: "1_mois", label: "Dans 1 mois" },
                { val: "info", label: "Je veux en savoir plus d'abord" },
              ].map(o => <Radio key={o.val} field="timing" val={o.val} label={o.label} />)}
            </div>
            {errors.timing && <div className="lf-error">{errors.timing}</div>}
          </div>

          <div className="lf-field">
            <label className="lf-label">Engagement 6 mois minimum — tu te projettes comment ? *</label>
            <div style={{ fontSize: 12, color: "#555570", marginBottom: 10, lineHeight: 1.6 }}>
              Le minimum de 6 mois n'est pas un piège — c'est le temps réel pour mettre en exécution et voir les résultats.
            </div>
            <div className="lf-pills">
              {[
                { val: "oui_pret", label: "✅ Oui, je suis prêt(e)" },
                { val: "oui_questions", label: "Oui mais j'ai des questions" },
                { val: "pas_sur", label: "Pas sûr(e) — on peut en discuter ?" },
                { val: "non", label: "Non, j'ai autre chose en tête" },
              ].map(o => <Radio key={o.val} field="engagement_6mois" val={o.val} label={o.label} />)}
            </div>
            {errors.engagement_6mois && <div className="lf-error">{errors.engagement_6mois}</div>}
          </div>
        </>}

        <div className="lf-nav">
          {step > 1 && <button className="lf-btn-prev" onClick={prev}>← Précédent</button>}
          {step < 4
            ? <button className="lf-btn-next" onClick={next}>Suivant →</button>
            : <button className="lf-btn-next" onClick={submit} disabled={loading}>
                {loading ? "Envoi en cours…" : "🚀 Envoyer ma candidature"}
              </button>
          }
        </div>
      </div>
    </div>
  );
}
