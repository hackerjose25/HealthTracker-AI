'use client';

import React, { useEffect, useRef, useState } from "react";
import { Database, Brain, Activity, Lock, ShieldCheck, ArrowRight, Check, FileStack, Sparkles, MessageSquare, AlertCircle, TrendingUp, CheckCircle2, ChevronDown } from "lucide-react";

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

function TabShowcase() {
  const [activeTab, setActiveTab] = useState("timeline");

  const tabs = [
    {
      id: "timeline",
      label: "Timeline View",
      title: "Your entire medical history, chronologically indexed",
      desc: "Every blood report, MRI scan, and prescription dated and linked. Easily visualize your patient journey without searching through old emails or folders.",
      widget: (
        <div className="cx-widget-card showcase-widget">
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
      )
    },
    {
      id: "analysis",
      label: "AI Analysis",
      title: "Ask medical-domain AI across multiple documents",
      desc: "Connect the dots. Ask things like 'Did my cholesterol increase from 2021 to 2024?' and let our clinical-grade AI compare and analyze trends over time.",
      widget: (
        <div className="cx-widget-card showcase-widget">
          <div className="cx-widget-header">
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}><MessageSquare size={13} /> ASSISTANT CHAT</span>
            <span style={{ color: "var(--mint)" }}>MULTI-DOC READ</span>
          </div>
          <div className="cx-widget-chat-bubble user">
            "Compare my 2021 blood work with my 2024 panel — did my HbA1c change?"
          </div>
          <div className="cx-widget-chat-bubble">
            <div style={{ fontSize: 11, color: "var(--mint)", marginBottom: 4, fontWeight: 600 }}>Health Tracker AI</div>
            Your HbA1c improved from <strong>5.9% (2021)</strong> to <strong>5.4% (2024)</strong>, moving out of pre-diabetic range following your prescribed dietary adjustments.
          </div>
        </div>
      )
    },
    {
      id: "forecast",
      label: "Risk Forecast",
      title: "Predictive health intelligence over a 5-year horizon",
      desc: "Health Tracker AI continuously evaluates your trajectory. Identify potential risks before they turn into diagnoses and receive proactive preventive strategies.",
      widget: (
        <div className="cx-widget-card showcase-widget">
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
      )
    }
  ];

  const currentTab = tabs.find(t => t.id === activeTab);

  return (
    <div className="cx-showcase">
      <div className="cx-showcase-tabs">
        {tabs.map(t => (
          <button
            key={t.id}
            className={`cx-showcase-tab ${activeTab === t.id ? "active" : ""}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="cx-showcase-content">
        <div className="cx-showcase-text">
          <h3>{currentTab.title}</h3>
          <p>{currentTab.desc}</p>
        </div>
        <div className="cx-showcase-visual">
          {currentTab.widget}
        </div>
      </div>
    </div>
  );
}

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "How does Health Tracker AI read scanned or handwritten documents?",
      a: "Health Tracker AI uses advanced OCR (Optical Character Recognition) paired with medical-domain LLMs. It interprets handwriting, scans, lab results, and complex tables, translating medical jargon into plain English."
    },
    {
      q: "Is my medical data safe and private?",
      a: "Absolutely. Security is our foundation. You can store your records 100% locally on your device with no cloud uploads, or choose to sync with end-to-end encryption (AES-256) backed by secure cloud vaults."
    },
    {
      q: "Do I need to pay to get started?",
      a: "No, Health Tracker AI offers a free tier that lets you upload up to 20 files to organize, synthesize, and search your timeline. Premium plans are available for extensive medical histories."
    },
    {
      q: "Can I share my medical timeline with my doctor?",
      a: "Yes. You can generate a temporary secure link or a local QR code. Doctors can scan it to view your structured timeline, key findings, and summary graphs instantly without installing the app."
    },
    {
      q: "Is this app a substitute for professional medical advice?",
      a: "No. Health Tracker AI is a personal health record organizer and information tool. It is designed to help you prepare for physician visits and identify historical trends, but never to diagnose or treat conditions."
    }
  ];

  return (
    <div className="cx-faq-accordion">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className={`cx-faq-item ${isOpen ? "open" : ""}`}>
            <button className="cx-faq-trigger" onClick={() => setOpenIndex(isOpen ? null : i)}>
              <span>{faq.q}</span>
              <ChevronDown size={18} className="cx-faq-chevron" />
            </button>
            <div className="cx-faq-content" style={{ maxHeight: isOpen ? "200px" : "0" }}>
              <p>{faq.a}</p>
            </div>
          </div>
        );
      })}
    </div>
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
          <div className="cx-logo"><span className="cx-logo-mark" />Health Tracker AI</div>
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
            Health Tracker AI stores your medical history in one timeline, then uses medical-domain AI to connect the dots
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
            <h2>Your health history is scattered across portals, PDFs, and paper files.</h2>
            <p className="sub">
              One clinic has your blood work. Another has your MRI scan. Because these documents are isolated,
              critical health trends go unnoticed until they become symptoms.
            </p>
          </Reveal>
          
          <div className="cx-problem-split">
            <Reveal>
              <div className="cx-compare-card problem-before">
                <div className="cx-compare-title">
                  <span>Cryptic & Scattered Files</span>
                  <AlertCircle size={16} style={{ color: "var(--coral)" }} />
                </div>
                <div className="cx-files-list">
                  <div className="cx-file-item error">
                    <span className="cx-file-icon">📄</span>
                    <span className="cx-file-name">scan_9023_final_copy.pdf</span>
                    <span className="cx-file-meta">Unknown date</span>
                  </div>
                  <div className="cx-file-item error">
                    <span className="cx-file-icon">📄</span>
                    <span className="cx-file-name">IMG_29841.jpg</span>
                    <span className="cx-file-meta">Photo gallery</span>
                  </div>
                  <div className="cx-file-item error">
                    <span className="cx-file-icon">📄</span>
                    <span className="cx-file-name">blood_report_2021_rev3.pdf</span>
                    <span className="cx-file-meta">Email attachment</span>
                  </div>
                </div>
                <p className="cx-compare-note">Isolated data — no timeline, no trends, no context.</p>
              </div>
            </Reveal>
            
            <Reveal delay={100}>
              <div className="cx-compare-card now problem-after">
                <div className="cx-compare-title">
                  <span>Organized by Health Tracker AI</span>
                  <Sparkles size={16} style={{ color: "var(--mint)" }} />
                </div>
                <div className="cx-files-list">
                  <div className="cx-file-item success">
                    <span className="cx-file-icon">🩺</span>
                    <span className="cx-file-name">Mayo Clinic / Lumbar Spine MRI</span>
                    <span className="cx-file-meta">Mar 02, 2023</span>
                  </div>
                  <div className="cx-file-item success">
                    <span className="cx-file-icon">🧪</span>
                    <span className="cx-file-name">LabCorp / Comprehensive Blood Panel</span>
                    <span className="cx-file-meta">Oct 14, 2021</span>
                  </div>
                  <div className="cx-file-item success">
                    <span className="cx-file-icon">💊</span>
                    <span className="cx-file-name">Stanford Health / Cardiac Stress Report</span>
                    <span className="cx-file-meta">Jan 19, 2025</span>
                  </div>
                </div>
                <p className="cx-compare-note">Chronological health history organized as a single continuous story.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SHOWCASE SECTION */}
      <section className="cx-section dim">
        <div className="wrap">
          <Reveal>
            <div className="cx-kicker">Interactive Showcase</div>
            <h2 className="center">Explore the core platform capabilities</h2>
            <p className="sub center">Switch between views to see how Health Tracker AI interprets your clinical journey.</p>
          </Reveal>
          <Reveal delay={100}>
            <TabShowcase />
          </Reveal>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="cx-stats-bar">
        <div className="wrap cx-stats-grid">
          <div className="cx-stat-item">
            <div className="cx-stat-val">73%</div>
            <div className="cx-stat-lbl">of critical health patterns span multiple documents</div>
          </div>
          <div className="cx-stat-item">
            <div className="cx-stat-val">5 min</div>
            <div className="cx-stat-lbl">average time to digitize 10+ years of records</div>
          </div>
          <div className="cx-stat-item">
            <div className="cx-stat-val">100%</div>
            <div className="cx-stat-lbl">on-device storage option — offline & fully private</div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="cx-section" id="how">
        <div className="wrap">
          <Reveal>
            <div className="cx-kicker">How It Works</div>
            <h2>Three steps to permanent health clarity.</h2>
            <p className="sub">Our AI workflow simplifies record organization, analysis, and early warnings.</p>
          </Reveal>
          
          <div className="cx-steps-timeline">
            <div className="cx-timeline-line" />
            
            <Reveal>
              <div className="cx-step-item">
                <div className="cx-step-num">01</div>
                <div className="cx-step-text">
                  <h3>Upload any health document</h3>
                  <p>Drag in PDFs, snap photos of prescriptions, or upload lab reports. Health Tracker AI automatically parses the clinical text, dates the record, and adds it to your timeline.</p>
                </div>
              </div>
            </Reveal>
            
            <Reveal delay={100}>
              <div className="cx-step-item">
                <div className="cx-step-num">02</div>
                <div className="cx-step-text">
                  <h3>AI reads and synthesizes your history</h3>
                  <p>Our medical-domain LLM compares old and new data. It highlights changes, translates confusing clinical terms, and cross-references multiple reports to spot trendlines.</p>
                </div>
              </div>
            </Reveal>
            
            <Reveal delay={200}>
              <div className="cx-step-item">
                <div className="cx-step-num">03</div>
                <div className="cx-step-text">
                  <h3>Receive active health insights</h3>
                  <p>Get automatic risk assessments and prepare focused questions for your doctor. Health Tracker AI points out anomalies and schedules routine check-up alerts.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FEATURE GRID SECTION */}
      <section className="cx-section dim">
        <div className="wrap">
          <Reveal>
            <div className="cx-kicker">Features</div>
            <h2>Built for patients, backed by advanced AI</h2>
            <p className="sub">Every feature is designed to bring visibility and continuity to your medical history.</p>
          </Reveal>
          
          <div className="cx-features-grid">
            <Reveal>
              <div className="cx-grid-card">
                <div className="cx-grid-icon"><Database size={24} /></div>
                <h3>Lifetime Secure Vault</h3>
                <p>Store clinical summaries, scans, and notes dated chronologically from birth onward.</p>
              </div>
            </Reveal>
            
            <Reveal delay={50}>
              <div className="cx-grid-card">
                <div className="cx-grid-icon"><Brain size={24} /></div>
                <h3>Medical-Domain AI</h3>
                <p>Powered by advanced models trained on clinical datasets for high-accuracy summaries.</p>
              </div>
            </Reveal>
            
            <Reveal delay={100}>
              <div className="cx-grid-card">
                <div className="cx-grid-icon"><Activity size={24} /></div>
                <h3>Longitudinal ML</h3>
                <p>Forecast 5-year risk trends using medical intelligence across different document points.</p>
              </div>
            </Reveal>
            
            <Reveal delay={150}>
              <div className="cx-grid-card">
                <div className="cx-grid-icon"><MessageSquare size={24} /></div>
                <h3>Natural Language Chat</h3>
                <p>Ask plain-language questions across multiple medical files and get instant comparative insights.</p>
              </div>
            </Reveal>
            
            <Reveal delay={200}>
              <div className="cx-grid-card">
                <div className="cx-grid-icon"><Lock size={24} /></div>
                <h3>Privacy First</h3>
                <p>Choose 100% on-device local execution or secure end-to-end encrypted cloud synchronization.</p>
              </div>
            </Reveal>
            
            <Reveal delay={250}>
              <div className="cx-grid-card">
                <div className="cx-grid-icon"><Sparkles size={24} /></div>
                <h3>Doctor-Ready Summaries</h3>
                <p>Export structured checklists and questions to make physician consultations productive.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PRIVACY SECTION */}
      <section className="cx-section" id="privacy">
        <div className="wrap">
          <div className="cx-privacy-layout">
            <Reveal>
              <div className="cx-privacy-info">
                <div className="cx-kicker">Privacy By Design</div>
                <h2>Your clinical data is yours alone. Period.</h2>
                <p className="sub" style={{ marginTop: 12 }}>We don't train models on your personal files, and we never sell your health history. Choose where your records reside.</p>
                
                <div className="cx-trust-badges">
                  <div className="cx-badge"><ShieldCheck size={14} /> Zero-Knowledge</div>
                  <div className="cx-badge"><Lock size={14} /> AES-256 Encrypted</div>
                  <div className="cx-badge"><Check size={14} /> HIPAA Aligned</div>
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
                      Records are end-to-end encrypted and synced via secure vaults, accessible across all your authorized devices.
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

      {/* FAQ SECTION */}
      <section className="cx-section dim">
        <div className="wrap">
          <Reveal>
            <div className="cx-kicker" style={{ display: "flex", justifyContent: "center" }}>FAQ</div>
            <h2 style={{ textAlign: "center", margin: "0 auto" }}>Frequently Asked Questions</h2>
            <p className="sub" style={{ textAlign: "center", margin: "18px auto 0" }}>Answers to common questions about security, features, and platform usage.</p>
          </Reveal>
          <Reveal delay={100}>
            <FAQAccordion />
          </Reveal>
        </div>
      </section>

      {/* WAITLIST CTA SECTION */}
      <section className="cx-cta" id="join">
        <div className="wrap">
          <Reveal>
            <div className="cx-kicker" style={{ justifyContent: "center", display: "flex" }}>Early Access</div>
            <h2>Be the first to experience Health Tracker AI.</h2>
            <p className="sub">We are building the future of personal health intelligence in the open. Request early access below.</p>
            <div className="cx-cta-container">
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
              <p className="cx-form-note">Health Tracker AI is in early development. This preview demonstrates upcoming core product capabilities.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="cx-footer">
        <div className="wrap">
          <div className="cx-footer-top">
            <div>
              <div className="cx-logo" style={{ color: "var(--text-light)" }}><span className="cx-logo-mark" />Health Tracker AI</div>
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
            <span>© 2026 Health Tracker AI Inc. All rights reserved.</span>
            <span className="cx-disclaimer">Health Tracker AI is a health information organizer and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified physician.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
