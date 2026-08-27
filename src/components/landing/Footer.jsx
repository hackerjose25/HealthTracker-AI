'use client';

import React, { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

export function Footer() {
  const [openIndex, setOpenIndex] = useState(null);

  const contributors = [
    { username: 'yugindhanam', avatar: 'https://github.com/yugindhanam.png' },
    { username: 'hackerjose25', avatar: 'https://github.com/hackerjose25.png' },
    { username: 'TonyKishore002', avatar: 'https://github.com/TonyKishore002.png' },
    { username: '7bryan7', avatar: 'https://github.com/7bryan7.png' },
    { username: 'Dani-AX1423', avatar: 'https://github.com/Dani-AX1423.png' },
    { username: 'twiddle7', avatar: 'https://github.com/twiddle7.png' },
  ];

  const faqs = [
    {
      q: "How does Health Tracker AI read documents?",
      a: "Uses OCR & medical LLMs to extract data from handwriting, scans, & lab reports."
    },
    {
      q: "Is my medical data safe & private?",
      a: "Yes. 100% on-device storage or end-to-end AES-256 cloud encryption."
    },
    {
      q: "Can I share reports with my doctor?",
      a: "Yes. Generate temporary secure links or QR codes for physician review."
    },
    {
      q: "Is this a substitute for medical advice?",
      a: "No. It is an information organizer to assist doctor consultations."
    }
  ];

  return (
    <footer className="cx-footer">
      <div className="wrap">
        <div className="cx-footer-top" style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 40, alignItems: 'start' }}>
          {/* LEFT CORNER: LOGO, BRAND DESCRIPTION, & CONTRIBUTORS */}
          <div>
            <div className="cx-logo" style={{ color: "var(--text-light)" }}>
              Health Tracker AI
            </div>
            <p className="cx-footer-tag" style={{ maxWidth: 420 }}>
              An AI-integrated platform for storing, understanding, and forecasting your lifetime health story.
            </p>

            {/* MADE WITH HANDS OF SECTION (3 COLUMNS x 2 ROWS) */}
            <div style={{ marginTop: 24 }}>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>Made with hands of:</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, maxWidth: 520 }}>
                {contributors.map((c) => (
                  <a
                    key={c.username}
                    href={`https://github.com/${c.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      fontSize: 12,
                      color: 'var(--mint)',
                      background: 'rgba(127, 231, 196, 0.1)',
                      border: '1px solid rgba(127, 231, 196, 0.25)',
                      padding: '5px 10px 5px 6px',
                      borderRadius: 100,
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <img
                      src={c.avatar}
                      alt={c.username}
                      style={{ width: 22, height: 22, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.username}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT-MOST CORNER: COMPACT FAQ CARD EMBEDDED DIRECTLY IN FOOTER */}
          <div
            style={{
              background: "rgba(14, 34, 48, 0.6)",
              border: "1px solid var(--ink-line)",
              borderRadius: 16,
              padding: 20,
              boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, paddingBottom: 10, borderBottom: "1px solid rgba(30, 61, 75, 0.5)" }}>
              <HelpCircle size={16} style={{ color: "var(--mint)" }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-light)", fontFamily: "IBM Plex Mono, monospace", letterSpacing: "0.04em" }}>
                FREQUENTLY ASKED QUESTIONS
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {faqs.map((faq, i) => {
                const isOpen = openIndex === i;
                return (
                  <div
                    key={i}
                    style={{
                      background: "rgba(6, 18, 26, 0.6)",
                      border: `1px solid ${isOpen ? "rgba(127, 231, 196, 0.3)" : "rgba(30, 61, 75, 0.5)"}`,
                      borderRadius: 8,
                      overflow: "hidden",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background: "transparent",
                        border: "none",
                        color: "var(--text-light)",
                        fontSize: 12.5,
                        fontWeight: 500,
                        textAlign: "left",
                        cursor: "pointer",
                        fontFamily: "inherit",
                        gap: 10,
                      }}
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        size={14}
                        style={{
                          color: isOpen ? "var(--mint)" : "var(--text-muted)",
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.2s ease",
                          flexShrink: 0,
                        }}
                      />
                    </button>

                    {isOpen && (
                      <div style={{ padding: "0 12px 10px", fontSize: 12, color: "var(--text-muted)", lineHeight: 1.5 }}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* FOOTER BOTTOM */}
        <div className="cx-footer-bottom">
          <span>© 2026 Health Tracker AI Inc. All rights reserved.</span>
          <span className="cx-disclaimer">
            Health Tracker AI is a health information organizer and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified physician.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
