import React, { useState } from 'react';

const API = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// ─── Design Tokens ────────────────────────────────────────────────────────────
const css = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --cream: #f7f4ef;
    --ink: #1a1814;
    --ink2: #3d3a35;
    --muted: #9a9590;
    --green: #2d6a4f;
    --green-light: #d8f3dc;
    --amber: #b5451b;
    --amber-light: #fde8d8;
    --blue: #1d3557;
    --blue-light: #e8f0fe;
    --red: #c1121f;
    --red-light: #fde8e8;
    --border: #e5e0d8;
    --shadow: 0 2px 16px rgba(26,24,20,0.08);
    --shadow-lg: 0 8px 40px rgba(26,24,20,0.12);
  }

  body {
    background: var(--cream);
    color: var(--ink);
    font-family: 'Cabinet Grotesk', sans-serif;
    min-height: 100vh;
  }

  .mono { font-family: 'Fira Code', monospace; }

  /* ── Layout ── */
  .app { min-height: 100vh; }

  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 48px;
    border-bottom: 1px solid var(--border);
    background: var(--cream);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 20px;
    font-weight: 900;
    letter-spacing: -0.5px;
    color: var(--ink);
  }

  .logo-dot { color: var(--amber); }

  .nav-tag {
    font-family: 'Fira Code', monospace;
    font-size: 11px;
    padding: 4px 10px;
    border: 1px solid var(--border);
    color: var(--muted);
    letter-spacing: 1px;
  }

  .hero {
    max-width: 900px;
    margin: 0 auto;
    padding: 80px 24px 48px;
    text-align: center;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--green-light);
    color: var(--green);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 6px 14px;
    margin-bottom: 28px;
  }

  .hero h1 {
    font-size: clamp(40px, 6vw, 72px);
    font-weight: 900;
    line-height: 1.0;
    letter-spacing: -2px;
    color: var(--ink);
    margin-bottom: 20px;
  }

  .hero h1 em {
    font-style: normal;
    color: var(--amber);
    position: relative;
  }

  .hero p {
    font-size: 18px;
    color: var(--muted);
    line-height: 1.7;
    max-width: 560px;
    margin: 0 auto 48px;
  }

  /* ── Feature Pills ── */
  .features {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-bottom: 56px;
  }

  .feature-pill {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border: 1px solid var(--border);
    background: white;
    font-size: 13px;
    font-weight: 600;
    color: var(--ink2);
    box-shadow: var(--shadow);
  }

  .feature-pill span { font-size: 16px; }

  /* ── Main Form Card ── */
  .main-card {
    max-width: 860px;
    margin: 0 auto;
    padding: 0 24px 80px;
  }

  .card {
    background: white;
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
    padding: 40px;
    margin-bottom: 24px;
    position: relative;
    animation: fadeUp 0.4s ease both;
  }

  .card-label {
    font-family: 'Fira Code', monospace;
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 12px;
  }

  .title-input {
    width: 100%;
    border: 1px solid var(--border);
    background: var(--cream);
    padding: 12px 16px;
    font-family: 'Cabinet Grotesk', sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: var(--ink);
    outline: none;
    margin-bottom: 24px;
    transition: border-color 0.15s;
  }

  .title-input:focus { border-color: var(--amber); }

  .textarea-wrap { position: relative; }

  .transcript-box {
    width: 100%;
    min-height: 220px;
    border: 1px solid var(--border);
    background: var(--cream);
    padding: 18px;
    font-family: 'Fira Code', monospace;
    font-size: 13px;
    color: var(--ink);
    line-height: 1.7;
    resize: vertical;
    outline: none;
    transition: border-color 0.15s;
  }

  .transcript-box:focus { border-color: var(--amber); }

  .char-count {
    position: absolute;
    bottom: 12px;
    right: 16px;
    font-family: 'Fira Code', monospace;
    font-size: 11px;
    color: var(--muted);
  }

  /* ── Sample buttons ── */
  .sample-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 14px;
    flex-wrap: wrap;
  }

  .sample-label {
    font-family: 'Fira Code', monospace;
    font-size: 11px;
    color: var(--muted);
    letter-spacing: 1px;
  }

  .sample-btn {
    padding: 5px 12px;
    border: 1px solid var(--border);
    background: transparent;
    font-family: 'Cabinet Grotesk', sans-serif;
    font-size: 12px;
    font-weight: 600;
    color: var(--ink2);
    cursor: pointer;
    transition: all 0.15s;
  }

  .sample-btn:hover { border-color: var(--amber); color: var(--amber); background: var(--amber-light); }

  /* ── Submit Button ── */
  .submit-btn {
    width: 100%;
    padding: 18px;
    background: var(--ink);
    color: var(--cream);
    border: none;
    font-family: 'Cabinet Grotesk', sans-serif;
    font-size: 16px;
    font-weight: 800;
    letter-spacing: 0.5px;
    cursor: pointer;
    margin-top: 24px;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .submit-btn:hover { background: var(--amber); transform: translateY(-2px); box-shadow: var(--shadow-lg); }
  .submit-btn:disabled { background: #ccc; cursor: not-allowed; transform: none; box-shadow: none; }

  /* ── Loading ── */
  .loading-card {
    background: white;
    border: 1px solid var(--border);
    padding: 60px 40px;
    text-align: center;
    max-width: 860px;
    margin: 0 auto 24px;
  }

  .loading-steps { margin-top: 32px; }

  .loading-step {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid var(--border);
    font-size: 14px;
    color: var(--muted);
    font-family: 'Fira Code', monospace;
  }

  .loading-step.active { color: var(--amber); }
  .loading-step.done { color: var(--green); }

  .step-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--border);
    flex-shrink: 0;
  }

  .step-dot.active { background: var(--amber); animation: pulse 1s ease infinite; }
  .step-dot.done { background: var(--green); }

  @keyframes pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.4);opacity:0.7} }

  /* ── Results ── */
  .results-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 24px;
    flex-wrap: wrap;
    margin-bottom: 6px;
  }

  .results-title { font-size: 24px; font-weight: 900; letter-spacing: -0.5px; }
  .results-subtitle { font-size: 14px; color: var(--muted); margin-top: 4px; }

  .lang-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    background: var(--blue-light);
    color: var(--blue);
    font-size: 12px;
    font-weight: 700;
    font-family: 'Fira Code', monospace;
    flex-shrink: 0;
  }

  /* ── Score Ring ── */
  .score-section {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 32px;
    align-items: center;
  }

  .score-ring {
    position: relative;
    width: 120px;
    height: 120px;
    flex-shrink: 0;
  }

  .score-ring svg { transform: rotate(-90deg); }

  .score-center {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .score-number { font-size: 32px; font-weight: 900; letter-spacing: -1px; }
  .score-label { font-size: 10px; font-family: 'Fira Code', monospace; color: var(--muted); letter-spacing: 1px; }

  .score-info { }
  .score-verdict { font-size: 17px; font-weight: 700; margin-bottom: 10px; }

  /* ── Tags ── */
  .tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }

  .tag {
    padding: 4px 12px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.5px;
  }

  .tag-green { background: var(--green-light); color: var(--green); }
  .tag-amber { background: var(--amber-light); color: var(--amber); }
  .tag-blue { background: var(--blue-light); color: var(--blue); }
  .tag-red { background: var(--red-light); color: var(--red); }

  /* ── Roast Box ── */
  .roast-box {
    background: var(--ink);
    color: var(--cream);
    padding: 20px 24px;
    margin-top: 20px;
    position: relative;
  }

  .roast-label {
    font-family: 'Fira Code', monospace;
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--amber);
    margin-bottom: 8px;
  }

  .roast-text { font-size: 15px; line-height: 1.6; font-style: italic; }

  /* ── Section Headers ── */
  .section-title {
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid var(--border);
  }

  /* ── Action Items ── */
  .action-item {
    display: grid;
    grid-template-columns: 1fr auto auto;
    gap: 16px;
    align-items: center;
    padding: 16px 0;
    border-bottom: 1px solid var(--border);
  }

  .action-item:last-child { border-bottom: none; }

  .action-task { font-size: 15px; font-weight: 600; color: var(--ink); }
  .action-owner {
    font-family: 'Fira Code', monospace;
    font-size: 12px;
    color: var(--amber);
    background: var(--amber-light);
    padding: 3px 10px;
    white-space: nowrap;
  }

  .action-deadline {
    font-family: 'Fira Code', monospace;
    font-size: 11px;
    color: var(--muted);
    white-space: nowrap;
  }

  /* ── Participants ── */
  .participant-row {
    display: grid;
    grid-template-columns: 120px 1fr auto;
    align-items: center;
    gap: 16px;
    padding: 12px 0;
    border-bottom: 1px solid var(--border);
  }

  .participant-row:last-child { border-bottom: none; }

  .participant-name { font-size: 15px; font-weight: 700; }

  .bar-wrap { height: 8px; background: var(--border); position: relative; }

  .bar-fill {
    height: 100%;
    background: var(--ink);
    transition: width 1s ease;
  }

  .participant-meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
  }

  .participant-pct { font-family: 'Fira Code', monospace; font-size: 13px; font-weight: 500; }

  .role-badge {
    font-size: 10px;
    font-weight: 700;
    padding: 2px 8px;
    letter-spacing: 0.5px;
  }

  /* ── Email Draft ── */
  .email-box {
    background: var(--cream);
    border: 1px solid var(--border);
    padding: 24px;
    font-family: 'Fira Code', monospace;
    font-size: 13px;
    line-height: 1.8;
    color: var(--ink2);
    white-space: pre-wrap;
    position: relative;
  }

  .copy-btn {
    position: absolute;
    top: 12px;
    right: 12px;
    padding: 6px 14px;
    background: var(--ink);
    color: var(--cream);
    border: none;
    font-family: 'Cabinet Grotesk', sans-serif;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.15s;
  }

  .copy-btn:hover { background: var(--amber); }

  /* ── Summary ── */
  .summary-text {
    font-size: 16px;
    line-height: 1.8;
    color: var(--ink2);
  }

  /* ── Reset ── */
  .reset-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    border: 2px solid var(--border);
    background: transparent;
    font-family: 'Cabinet Grotesk', sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: var(--ink2);
    cursor: pointer;
    margin: 0 auto;
    transition: all 0.15s;
  }

  .reset-btn:hover { border-color: var(--ink); color: var(--ink); }

  /* ── Error ── */
  .error-box {
    background: var(--red-light);
    border: 1px solid var(--red);
    padding: 16px 20px;
    color: var(--red);
    font-size: 14px;
    margin-bottom: 16px;
    font-family: 'Fira Code', monospace;
  }

  /* ── Animations ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: none; }
  }

  /* ── Responsive ── */
  @media (max-width: 640px) {
    .navbar { padding: 16px 20px; }
    .hero { padding: 48px 20px 32px; }
    .card { padding: 24px 20px; }
    .score-section { grid-template-columns: 1fr; }
    .action-item { grid-template-columns: 1fr; gap: 8px; }
    .participant-row { grid-template-columns: 100px 1fr; }
    .participant-meta { display: none; }
  }
`;

// ─── Sample Transcripts ───────────────────────────────────────────────────────
const SAMPLES = {
  English: `Alex: Okay team, let's start the standup. John, what did you do yesterday?
John: I finished the login page and pushed the PR. Needs review.
Alex: Great, I'll review it by EOD. Sarah, your update?
Sarah: Still working on the database migration. Should be done by tomorrow.
Alex: Okay, make sure you test it on staging first. Any blockers?
Sarah: I need the AWS credentials from DevOps.
Alex: I'll ping Rahul right after this call. John, can you document the API endpoints today?
John: Sure, I'll have it done by 3 PM.
Alex: Perfect. Let's sync again tomorrow same time. Meeting adjourned.`,

  Hinglish: `Priya: Okay team, chal shuru karte hain. Aaj ka update do sablog.
Rahul: Bhai maine payment gateway ka integration complete kar diya. Testing pending hai.
Priya: Achha, testing kab tak hogi?
Rahul: Kal tak ho jayegi, pakka.
Ankit: Mera UI part almost done hai, bas ek bug fix baki hai. Shaam tak resolve ho jayega.
Priya: Okay good. Aur client ko demo kab dena hai?
Rahul: Client ne Friday mention kiya tha.
Priya: Theek hai. Ankit, Friday se pehle bug fix karna zaroori hai. Rahul, testing complete karke mujhe notify karna.
Ankit: Done bhai, tension mat lo.
Priya: Aur haan, deployment ke liye server credentials chahiye. Koi arrange karega?
Rahul: Main DevOps se bol deta hoon aaj hi.
Priya: Perfect. Kal 10 baje phir milte hain.`
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function scoreColor(score) {
  if (score >= 80) return '#2d6a4f';
  if (score >= 60) return '#b5451b';
  return '#c1121f';
}

function tagClass(tag) {
  const positive = ['Productive', 'Focused', 'Decision-Made', 'Action-Heavy'];
  const negative = ['Unproductive', 'Off-Track', 'No Decisions'];
  const neutral = ['Discussion-Heavy', 'Too Long', 'Follow-Up Needed'];
  if (positive.includes(tag)) return 'tag tag-green';
  if (negative.includes(tag)) return 'tag tag-red';
  if (neutral.includes(tag)) return 'tag tag-amber';
  return 'tag tag-blue';
}

function roleColor(role) {
  const map = { Dominant: '#b5451b', Active: '#2d6a4f', Passive: '#1d3557', Silent: '#9a9590' };
  return map[role] || '#9a9590';
}

function roleBg(role) {
  const map = { Dominant: '#fde8d8', Active: '#d8f3dc', Passive: '#e8f0fe', Silent: '#f0ede8' };
  return map[role] || '#f0ede8';
}

// ─── Components ───────────────────────────────────────────────────────────────

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        Meet<span className="logo-dot">Smart</span>
      </div>
      <div className="nav-tag mono">AI · EN · HI · HINGLISH</div>
    </nav>
  );
}

function ScoreRing({ score }) {
  const color = scoreColor(score);
  const r = 50;
  const circ = 2 * Math.PI * r;
  const fill = (score / 100) * circ;

  return (
    <div className="score-ring">
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={r} fill="none" stroke="#e5e0d8" strokeWidth="10" />
        <circle cx="60" cy="60" r={r} fill="none" stroke={color} strokeWidth="10"
          strokeDasharray={`${fill} ${circ}`} strokeLinecap="round" />
      </svg>
      <div className="score-center">
        <div className="score-number" style={{ color }}>{score}</div>
        <div className="score-label">/ 100</div>
      </div>
    </div>
  );
}

function LoadingScreen() {
  const [step, setStep] = React.useState(0);
  const steps = [
    'Detecting language...',
    'Parsing transcript...',
    'Extracting action items...',
    'Analyzing participants...',
    'Computing health score...',
    'Drafting follow-up email...',
    'Generating roast... 🔥',
  ];

  React.useEffect(() => {
    const t = setInterval(() => setStep(s => Math.min(s + 1, steps.length - 1)), 800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="loading-card" style={{ maxWidth: 860, margin: '0 auto 24px', animation: 'fadeUp 0.3s ease' }}>
      <div style={{ fontSize: 36, marginBottom: 8 }}>🧠</div>
      <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Analyzing your meeting...</div>
      <div style={{ fontSize: 14, color: 'var(--muted)', fontFamily: 'Fira Code, monospace' }}>This takes about 5–10 seconds</div>
      <div className="loading-steps" style={{ maxWidth: 400, margin: '32px auto 0', textAlign: 'left' }}>
        {steps.map((s, i) => (
          <div key={i} className={`loading-step ${i < step ? 'done' : i === step ? 'active' : ''}`}>
            <div className={`step-dot ${i < step ? 'done' : i === step ? 'active' : ''}`} />
            {i < step ? '✓ ' : ''}{s}
          </div>
        ))}
      </div>
    </div>
  );
}

function ResultsView({ data, title, onReset }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(data.email_draft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ animation: 'fadeUp 0.4s ease' }}>

      {/* Header */}
      <div className="card">
        <div className="results-header">
          <div>
            <div className="results-title">{title}</div>
            <div className="results-subtitle">Analysis complete — here's your full meeting intelligence report</div>
          </div>
          <div className="lang-badge">
            🌐 {data.language_detected}
          </div>
        </div>

        {/* Score */}
        <div className="score-section" style={{ marginTop: 28 }}>
          <ScoreRing score={data.health_score} />
          <div className="score-info">
            <div className="score-verdict">{data.health_verdict}</div>
            <div className="tags">
              {data.tags.map(t => <span key={t} className={tagClass(t)}>{t}</span>)}
            </div>
          </div>
        </div>

        {/* Roast */}
        <div className="roast-box">
          <div className="roast-label">🔥 AI Roast</div>
          <div className="roast-text">"{data.roast}"</div>
        </div>
      </div>

      {/* Summary */}
      <div className="card">
        <div className="section-title">📋 Summary</div>
        <div className="summary-text">{data.summary}</div>
      </div>

      {/* Action Items */}
      <div className="card">
        <div className="section-title">✅ Action Items ({data.action_items.length})</div>
        {data.action_items.length === 0 ? (
          <div style={{ color: 'var(--muted)', fontFamily: 'Fira Code, monospace', fontSize: 13 }}>No action items detected.</div>
        ) : (
          data.action_items.map((item, i) => (
            <div className="action-item" key={i}>
              <div className="action-task">{item.task}</div>
              <div className="action-owner">{item.owner}</div>
              <div className="action-deadline">📅 {item.deadline}</div>
            </div>
          ))
        )}
      </div>

      {/* Participants */}
      {data.participants.length > 0 && (
        <div className="card">
          <div className="section-title">👥 Participation Analysis</div>
          {data.participants.map((p, i) => (
            <div className="participant-row" key={i}>
              <div className="participant-name">{p.name}</div>
              <div className="bar-wrap">
                <div className="bar-fill" style={{ width: `${p.percentage}%`, background: roleColor(p.role) }} />
              </div>
              <div className="participant-meta">
                <div className="participant-pct">{p.percentage}%</div>
                <div className="role-badge" style={{ background: roleBg(p.role), color: roleColor(p.role) }}>{p.role}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Email Draft */}
      <div className="card">
        <div className="section-title">📧 Follow-up Email Draft</div>
        <div className="email-box">
          <button className="copy-btn" onClick={handleCopy}>
            {copied ? '✓ Copied!' : 'Copy'}
          </button>
          {data.email_draft}
        </div>
      </div>

      <div style={{ textAlign: 'center', padding: '16px 0 40px' }}>
        <button className="reset-btn" onClick={onReset}>
          ↺ Analyze Another Meeting
        </button>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [transcript, setTranscript] = useState('');
  const [title, setTitle] = useState('');
  const [screen, setScreen] = useState('input'); // input | loading | results
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (transcript.trim().length < 50) {
      setError('Please paste a longer transcript (at least 50 characters).');
      return;
    }
    setError('');
    setScreen('loading');

    try {
      const res = await fetch(`${API}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript,
          meeting_title: title || 'Team Meeting'
        })
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || `Server error ${res.status}`);
      }
      const data = await res.json();
      setResult(data);
      setScreen('results');
    } catch (e) {
      setError(e.message);
      setScreen('input');
    }
  };

  const handleReset = () => {
    setScreen('input');
    setResult(null);
    setTranscript('');
    setTitle('');
    setError('');
  };

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <Navbar />

        {screen === 'input' && (
          <>
            <div className="hero">
              <div className="hero-badge">🇮🇳 Supports English + Hinglish</div>
              <h1>Your meetings,<br /><em>brutally analyzed.</em></h1>
              <p>Paste any transcript or chat — in English, Hinglish, or both. Get a summary, action items, participation breakdown, health score, and a follow-up email in seconds.</p>
              <div className="features">
                <div className="feature-pill"><span>📋</span> Smart Summary</div>
                <div className="feature-pill"><span>✅</span> Action Items</div>
                <div className="feature-pill"><span>👥</span> Who Talked Most</div>
                <div className="feature-pill"><span>📊</span> Health Score</div>
                <div className="feature-pill"><span>🔥</span> Meeting Roast</div>
                <div className="feature-pill"><span>📧</span> Email Draft</div>
              </div>
            </div>

            <div className="main-card">
              {error && <div className="error-box">⚠ {error}</div>}

              <div className="card">
                <div className="card-label">Meeting Title (optional)</div>
                <input
                  className="title-input"
                  placeholder="e.g. Weekly Standup, Sprint Planning, Client Call..."
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />

                <div className="card-label">Paste Transcript or Chat</div>
                <div className="textarea-wrap">
                  <textarea
                    className="transcript-box"
                    placeholder={`Paste your meeting transcript, WhatsApp chat, Zoom captions, Slack thread...\n\nWorks with English, Hindi, Hinglish — any mix!\n\nExample:\nRahul: Bhai payment gateway done ho gaya\nPriya: Great! Testing kab tak?\nRahul: Kal tak pakka`}
                    value={transcript}
                    onChange={e => setTranscript(e.target.value)}
                  />
                  <div className="char-count">{transcript.length} chars</div>
                </div>

                <div className="sample-row">
                  <span className="sample-label">TRY SAMPLE:</span>
                  <button className="sample-btn" onClick={() => { setTranscript(SAMPLES.English); setTitle('Engineering Standup'); }}>
                    🇬🇧 English
                  </button>
                  <button className="sample-btn" onClick={() => { setTranscript(SAMPLES.Hinglish); setTitle('Product Team Sync'); }}>
                    🇮🇳 Hinglish
                  </button>
                </div>

                <button
                  className="submit-btn"
                  onClick={handleAnalyze}
                  disabled={transcript.trim().length < 50}
                >
                  Analyze Meeting →
                </button>
              </div>
            </div>
          </>
        )}

        {screen === 'loading' && (
          <div style={{ padding: '48px 24px 0' }}>
            <LoadingScreen />
          </div>
        )}

        {screen === 'results' && result && (
          <div style={{ padding: '48px 24px 0', maxWidth: 860, margin: '0 auto' }}>
            <ResultsView data={result} title={title || 'Team Meeting'} onReset={handleReset} />
          </div>
        )}

        <div style={{ textAlign: 'center', padding: '32px 24px', borderTop: '1px solid var(--border)', fontFamily: 'Fira Code, monospace', fontSize: 11, color: 'var(--muted)', letterSpacing: 2 }}>
          MEETSMART · FASTAPI + LLAMA 3.3 + REACT · FREE & OPEN SOURCE
        </div>
      </div>
    </>
  );
}
