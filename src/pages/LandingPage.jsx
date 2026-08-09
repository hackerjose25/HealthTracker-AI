'use client';

import React, { useEffect, useRef, useState } from "react";
import { Database, Brain, Activity, Lock, ShieldCheck, ArrowRight, Check, FileStack, Sparkles, MessageSquare, AlertCircle, TrendingUp, CheckCircle2 } from "lucide-react";

function useReveal() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); io.disconnect(); } },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
}

function Reveal({ children, delay = 0 }) {
  const [ref, inView] = useReveal();
  return (
    <div ref={ref} className={`cx-reveal ${inView ? "in" : ""}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const TRACE_PATH = "M0,150 L120,150 L145,90 L165,180 L190,60 L215,150 L340,150 C 400,150 430,110 470,110 C 560,110 560,150 650,150 C 730,150 760,70 850,70 C 950,70 980,40 1180,20";

const MARKERS = [
  { x: 145, y: 90, label: "Born", sub: "Record #1", cls: "" },
  { x: 340, y: 150, label: "2016", sub: "Vaccination log", cls: "" },
  { x: 470, y: 110, label: "2021", sub: "Lab panel", cls: "mint" },
  { x: 650, y: 150, label: "2023", sub: "Scan report", cls: "" },
  { x: 850, y: 70, label: "Today", sub: "Full history read", cls: "mint" },
  { x: 1050, y: 27, label: "Predicted", sub: "Risk trend, 5yr", cls: "coral" },
];

function TraceHero() {
  return (
    <svg className="cx-trace-wrap" viewBox="0 0 1180 220" width="100%" height="auto" role="img" aria-label="Animated timeline of health records leading to a predicted risk curve">
      <defs>
        <linearGradient id="lineGradStatic" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2C5364" />
          <stop offset="55%" stopColor="#3f6a63" />
          <stop offset="100%" stopColor="#5a3b2c" />
        </linearGradient>
        <linearGradient id="sweep" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="260" y2="0">
          <stop offset="0%" stopColor="#7FE7C4" stopOpacity="0" />
          <stop offset="50%" stopColor="#7FE7C4" stopOpacity="1" />
          <stop offset="100%" stopColor="#E4572E" stopOpacity="0" />
          <animateTransform attributeName="gradientTransform" type="translate" from="-260 0" to="1180 0" dur="4.5s" repeatCount="indefinite" />
        </linearGradient>
      </defs>

      <path d={TRACE_PATH} fill="none" stroke="url(#lineGradStatic)" strokeWidth="1.5" opacity="0.6" />
      <path d={TRACE_PATH} fill="none" stroke="url(#sweep)" strokeWidth="2.5" />

      <circle r="5" fill="#7FE7C4" style={{ filter: "drop-shadow(0 0 6px #7FE7C4)" }}>
        <animateMotion dur="4.5s" repeatCount="indefinite" path={TRACE_PATH} />
      </circle>

      {MARKERS.map((p, i) => (
        <g key={i}>
          {(p.cls === "mint" || p.cls === "coral") && (
            <circle className="cx-ping" cx={p.x} cy={p.y} r="5" fill="none" stroke={p.cls === "coral" ? "#E4572E" : "#7FE7C4"} strokeWidth="1.5" style={{ animationDelay: `${i * 0.3}s` }} />
          )}
          <circle className={`cx-trace-dot ${p.cls}`} cx={p.x} cy={p.y} r="5" style={{ animationDelay: `${i * 0.25}s` }} />
          <text className={`cx-trace-label ${p.cls === "coral" ? "hi" : ""}`} x={p.x} y={p.y - 16} textAnchor="middle">{p.label}</text>
          <text className="cx-trace-label" x={p.x} y={p.y + 26} textAnchor="middle" opacity="0.7">{p.sub}</text>
        </g>
      ))}
    </svg>
  );
}

function MagneticButton({ children, className, href, onClick, type = "button" }) {
  const ref = useRef(null);
  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${relX * 0.18}px, ${relY * 0.28}px)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = "translate(0,0)"; };
  const Tag = href ? "a" : "button";
  return (
    <Tag ref={ref} href={href} type={href ? undefined : type} onClick={onClick} className={className}
      onMouseMove={handleMove} onMouseLeave={reset}>
      {children}
    </Tag>
  );
}

export default function LandingPage() {
  const [tab, setTab] = useState("device");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [navScrolled, setNavScrolled] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrollTop = h.scrollTop || document.body.scrollTop;
      const height = h.scrollHeight - h.clientHeight;
      setProgress(height > 0 ? (scrollTop / height) * 100 : 0);
      setNavScrolled(scrollTop > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleHeroMove = (e) => {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width) * 100;
    const my = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${mx}%`);
    el.style.setProperty("--my", `${my}%`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="cx">
      <div className="cx-progress" style={{ width: `${progress}%` }} />

      <nav className={`cx-nav ${navScrolled ? "scrolled" : ""}`}>
        <div className="cx-nav-inner">
          <div className="cx-logo"><span className="cx-logo-mark" />Continuum</div>
          <div className="cx-nav-links">
            <a href="#product">Product</a>
            <a href="#how">How it works</a>
            <a href="#privacy">Privacy</a>
          </div>
          <a href="#join" className="cx-nav-cta">Join waitlist</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="cx-hero" ref={heroRef} onMouseMove={handleHeroMove}>
        <div className="cx-hero-inner">
          <div className="cx-eyebrow"><span className="dot" />AI-integrated health records, from birth onward</div>
          <h1>Every record you've ever had, read as <em>one</em> story.</h1>
          <p className="lede">
            Continuum stores your medical history in one timeline, then uses medical-domain AI to connect the dots
            across reports, prescriptions, and scans — so it can flag risks no single document ever could.
          </p>
          <div className="cx-hero-ctas">
            <MagneticButton href="#join" className="cx-btn-primary">Join the waitlist <ArrowRight size={16} /></MagneticButton>
            <a href="#how" className="cx-btn-ghost">See how it works</a>
          </div>
          <TraceHero />
        </div>
      </header>

      {/* PROBLEM SECTION */}
      <section className="cx-section" id="product">
        <div className="wrap">
          <Reveal>
            <div className="cx-kicker">The Problem</div>
            <h2>Your health data has always lived in pieces.</h2>
            <p className="sub">One app stores your prescriptions. Another summarizes a single lab report. None of them
              read your history as a whole — so nothing warns you before small findings become a real risk.</p>
          </Reveal>
          <div className="cx-compare">
            <Reveal>
              <div className="cx-compare-card">
                <div className="cx-compare-title">
                  <span>Scattered, today</span>
                  <AlertCircle size={16} style={{ color: "var(--coral)" }} />
                </div>
                <div className="cx-scatter">
                  <span className="cx-chip" style={{ "--r": "-3deg", "--d": "0s" }}>Lab PDF, 2019</span>
                  <span className="cx-chip" style={{ "--r": "2deg", "--d": ".3s" }}>X-ray, phone gallery</span>
                  <span className="cx-chip" style={{ "--r": "-1deg", "--d": ".6s" }}>Prescription photo</span>
                  <span className="cx-chip" style={{ "--r": "4deg", "--d": ".9s" }}>MRI report, folder A</span>
                  <span className="cx-chip" style={{ "--r": "-2deg", "--d": "1.2s" }}>Discharge summary</span>
                  <span className="cx-chip" style={{ "--r": "1deg", "--d": "1.5s" }}>Blood work, email</span>
                </div>
                <p className="cx-compare-note">Isolated documents — no cross-examination or historical continuity.</p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="cx-compare-card now">
                <div className="cx-compare-title">
                  <span>One thread, with Continuum</span>
                  <Sparkles size={16} style={{ color: "var(--mint)" }} />
                </div>
                <div className="cx-thread-row">
                  <div className="cx-thread-node"><FileStack /></div>
                  <div className="cx-thread-line" />
                  <div className="cx-thread-node"><Activity /></div>
                  <div className="cx-thread-line" />
                  <div className="cx-thread-node"><Brain /></div>
                  <div className="cx-thread-line" />
                  <div className="cx-thread-node"><ShieldCheck /></div>
                </div>
                <p className="cx-compare-note">Every record dated, indexed, and analyzed together in one continuous timeline.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="cx-section dim" id="how">
        <div className="wrap">
          <Reveal>
            <div className="cx-kicker">How It Works</div>
            <h2>Store it. Understand it. See what's ahead.</h2>
            <p className="sub">Three integrated layers working continuously along your lifetime health story.</p>
          </Reveal>

          <div className="cx-features">
            {/* FEATURE 1 */}
            <Reveal>
              <div className="cx-feature-card">
                <div>
                  <div className="cx-feature-badge"><Database size={14} /> Layer 01 • Lifetime Vault</div>
                  <h3>Store every record, dated & organized</h3>
                  <p>Diagnostic reports, prescriptions, scans, and procedure notes, arranged chronologically from birth onward. Keep everything local on your device, or sync with zero-knowledge encrypted cloud backup.</p>
                  <div className="cx-feature-tags">
                    <span className="cx-feature-tag">On-Device or Cloud</span>
                    <span className="cx-feature-tag">Supabase Encrypted</span>
                    <span className="cx-feature-tag">Timestamped Index</span>
                  </div>
                </div>

                <div className="cx-widget-card">
                  <div className="cx-widget-header">
                    <span>TIMELINE INDEX</span>
                    <span style={{ color: "var(--mint)" }}>34 RECORDS CONNECTED</span>
                  </div>
                  <div className="cx-widget-timeline-item">
                    <CheckCircle2 size={16} style={{ color: "var(--mint)" }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ color: "var(--text-light)", fontWeight: 500 }}>Comprehensive Blood Panel</div>
                      <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Oct 14, 2021 • LabCorp</div>
                    </div>
                    <span style={{ fontSize: 11, background: "rgba(127,231,196,0.1)", color: "var(--mint)", padding: "2px 8px", borderRadius: 4 }}>Linked</span>
                  </div>
                  <div className="cx-widget-timeline-item">
                    <CheckCircle2 size={16} style={{ color: "var(--mint)" }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ color: "var(--text-light)", fontWeight: 500 }}>MRI Lumbar Spine</div>
                      <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Mar 02, 2023 • Mayo Clinic</div>
                    </div>
                    <span style={{ fontSize: 11, background: "rgba(127,231,196,0.1)", color: "var(--mint)", padding: "2px 8px", borderRadius: 4 }}>Linked</span>
                  </div>
                  <div className="cx-widget-timeline-item">
                    <CheckCircle2 size={16} style={{ color: "var(--mint)" }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ color: "var(--text-light)", fontWeight: 500 }}>Cardiac Stress Echocardiogram</div>
                      <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Jan 19, 2025 • Stanford Health</div>
                    </div>
                    <span style={{ fontSize: 11, background: "rgba(228,87,46,0.15)", color: "var(--coral)", padding: "2px 8px", borderRadius: 4 }}>New Record</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* FEATURE 2 */}
            <Reveal delay={100}>
              <div className="cx-feature-card">
                <div>
                  <div className="cx-feature-badge"><Brain size={14} /> Layer 02 • Clinical AI Synthesis</div>
                  <h3>Ask questions across your whole history</h3>
                  <p>Point the assistant at two, five, or all of your historical documents. Ask complex multi-year questions in plain language and receive precise, clinical-grade comparative analysis.</p>
                  <div className="cx-feature-tags">
                    <span className="cx-feature-tag">Multi-Document RAG</span>
                    <span className="cx-feature-tag">MedGemma & Med42 AI</span>
                    <span className="cx-feature-tag">Plain-Language Answers</span>
                  </div>
                </div>

                <div className="cx-widget-card">
                  <div className="cx-widget-header">
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}><MessageSquare size={13} /> ASSISTANT CHAT</span>
                    <span style={{ color: "var(--mint)" }}>MULTI-DOC READ</span>
                  </div>
                  <div className="cx-widget-chat-bubble user">
                    "Compare my 2021 blood work with my 2024 panel — did my HbA1c change?"
                  </div>
                  <div className="cx-widget-chat-bubble">
                    <div style={{ fontSize: 11, color: "var(--mint)", marginBottom: 4, fontWeight: 600 }}>Continuum Clinical AI</div>
                    Your HbA1c improved from <strong>5.9% (2021)</strong> to <strong>5.4% (2024)</strong>, moving out of pre-diabetic range following your prescribed dietary adjustments.
                  </div>
                </div>
              </div>
            </Reveal>

            {/* FEATURE 3 */}
            <Reveal delay={200}>
              <div className="cx-feature-card">
                <div>
                  <div className="cx-feature-badge"><Activity size={14} /> Layer 03 • Predictive Health Intelligence</div>
                  <h3>See risk before it becomes a diagnosis</h3>
                  <p>On a regular automated schedule, Continuum evaluates your multi-year trajectory to estimate emerging health risks — providing early warning indicators and proactive preventive guidance.</p>
                  <div className="cx-feature-tags">
                    <span className="cx-feature-tag">Risk Forecasting</span>
                    <span className="cx-feature-tag">Longitudinal ML</span>
                    <span className="cx-feature-tag">Actionable Protocols</span>
                  </div>
                </div>

                <div className="cx-widget-card">
                  <div className="cx-widget-header">
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}><TrendingUp size={13} style={{ color: "var(--mint)" }} /> FORECAST MODEL</span>
                    <span style={{ color: "var(--mint)" }}>5-YEAR HORIZON</span>
                  </div>
                  <div className="cx-widget-risk-meter">
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                        <span style={{ color: "var(--text-light)" }}>Cardiovascular Risk Profile</span>
                        <span style={{ color: "var(--mint)", fontWeight: 600 }}>Optimal • Low (8%)</span>
                      </div>
                      <div className="cx-risk-bar-track">
                        <div className="cx-risk-bar-fill" style={{ width: "12%", background: "var(--mint)" }} />
                      </div>
                    </div>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                        <span style={{ color: "var(--text-light)" }}>Metabolic Trend Stability</span>
                        <span style={{ color: "var(--mint)", fontWeight: 600 }}>94% Positive</span>
                      </div>
                      <div className="cx-risk-bar-track">
                        <div className="cx-risk-bar-fill" style={{ width: "94%", background: "linear-gradient(90deg, var(--mint), #52c29d)" }} />
                      </div>
                    </div>
                    <div style={{ fontSize: 12.5, color: "var(--text-muted)", marginTop: 4, background: "rgba(14, 34, 48, 0.6)", padding: "10px 12px", borderRadius: 8, border: "1px solid rgba(30, 61, 75, 0.6)" }}>
                      💡 Recommended action: Schedule routine 2-year lipid panel screening in Q3 2026.
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PRIVACY SECTION */}
      <section className="cx-section" id="privacy">
        <div className="wrap">
          <div className="cx-privacy">
            <Reveal>
              <div>
                <div className="cx-kicker">Privacy By Design</div>
                <h2>Your medical data is yours alone.</h2>
                <div className="cx-priv-list" style={{ marginTop: 28 }}>
                  <div className="cx-priv-item">
                    <Lock />
                    <div>
                      <h4>Complete Storage Choice</h4>
                      <p>Store records 100% locally on your personal device with zero cloud uploads, or opt into end-to-end encrypted cloud sync across devices.</p>
                    </div>
                  </div>
                  <div className="cx-priv-item">
                    <ShieldCheck />
                    <div>
                      <h4>Explicit Action Required</h4>
                      <p>Records are only read by the AI assistant when explicitly attached to a question — nothing is scanned silently in the background.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="cx-toggle-card">
                <div className="cx-toggle-head">
                  <div className={`cx-toggle-slider ${tab === "cloud" ? "cloud" : ""}`} />
                  <button className={`cx-toggle-btn ${tab === "device" ? "on" : ""}`} onClick={() => setTab("device")}>On This Device</button>
                  <button className={`cx-toggle-btn ${tab === "cloud" ? "on" : ""}`} onClick={() => setTab("cloud")}>Synced To Cloud</button>
                </div>
                <div className="cx-toggle-body" key={tab}>
                  {tab === "device" ? (
                    <>
                      Records remain strictly local to your computer or phone. Zero network communication occurs without your consent.
                      <ul>
                        <li><Check /> No account or sign-in required</li>
                        <li><Check /> Works 100% offline without internet</li>
                        <li><Check /> You hold complete control of your data files</li>
                      </ul>
                    </>
                  ) : (
                    <>
                      Records are end-to-end encrypted and synced via Supabase PostgreSQL, accessible across all your authorized devices.
                      <ul>
                        <li><Check /> Reach your timeline from phone, tablet, or web</li>
                        <li><Check /> AES-256 encryption at rest and TLS 1.3 in transit</li>
                        <li><Check /> One-click export or permanent deletion anytime</li>
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WAITLIST CTA SECTION */}
      <section className="cx-cta" id="join">
        <div className="wrap">
          <Reveal>
            <div className="cx-kicker" style={{ justifyContent: "center", display: "flex" }}>Early Access</div>
            <h2>Be the first to experience Continuum.</h2>
            <p className="sub">We are building the future of personal health intelligence in the open. Request early access below.</p>
            {!submitted ? (
              <form className="cx-form" onSubmit={handleSubmit}>
                <input
                  className="cx-input"
                  type="email"
                  required
                  placeholder="enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email address"
                />
                <MagneticButton type="submit" onClick={handleSubmit} className="cx-btn-primary">
                  Join Waitlist <ArrowRight size={16} />
                </MagneticButton>
              </form>
            ) : (
              <div className="cx-success"><Check size={18} /> You're on the list — we will reach out soon.</div>
            )}
            <p className="cx-form-note">Continuum is in early development. This preview demonstrates upcoming core product capabilities.</p>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="cx-footer">
        <div className="wrap">
          <div className="cx-footer-top">
            <div>
              <div className="cx-logo" style={{ color: "var(--text-light)" }}><span className="cx-logo-mark" />Continuum</div>
              <p className="cx-footer-tag">An AI-integrated platform for storing, understanding, and forecasting your lifetime health story.</p>
            </div>
            <div className="cx-footer-cols">
              <div className="cx-footer-col">
                <h5>Product</h5>
                <a href="#product">Overview</a>
                <a href="#how">How it works</a>
                <a href="#privacy">Privacy</a>
              </div>
              <div className="cx-footer-col">
                <h5>Company</h5>
                <a href="#">About</a>
                <a href="#">Contact</a>
                <a href="#join">Waitlist</a>
              </div>
            </div>
          </div>
          <div className="cx-footer-bottom">
            <span>© 2026 Continuum Inc. All rights reserved.</span>
            <span className="cx-disclaimer">Continuum is an health information organizer and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified physician.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
