'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/src/components/layout/DashboardLayout';
import {
  FileText,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Printer,
  Share2,
  QrCode,
  Sparkles,
  TrendingUp,
  MessageSquare,
  Send,
} from 'lucide-react';
import { useHealth } from '@/src/context/HealthContext';

export default function ReportPage() {
  const { patient, documents, predictions } = useHealth();
  const [shareGenerated, setShareGenerated] = useState(false);

  // Embedded chat state
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hello! I am your AI Assistant. Have any questions about your diagnosis report or disease risk predictions?' },
  ]);
  const [chatInput, setChatInput] = useState('');

  const handlePrint = () => {
    window.print();
  };

  const handleChatSend = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');

    setTimeout(() => {
      let reply = "";
      const lower = userText.toLowerCase();
      if (lower.includes('diabetes') || lower.includes('hba1c')) {
        reply = "Your Diabetes Risk Score is 18% (Low Risk). Your HbA1c improved from 5.9% in 2021 to 5.4% in your latest report, moving out of pre-diabetic range.";
      } else if (lower.includes('heart') || lower.includes('cardiac')) {
        reply = "Your Heart Disease Risk Score is 12% (Optimal). Your echocardiogram ejection fraction is 62% (normal) and blood pressure is 118/76 mmHg.";
      } else {
        reply = "All 4 disease prediction models (Diabetes, Heart, Kidney, Liver) show low/optimal risk scores. Continue your current health management routine!";
      }

      setChatMessages((prev) => [...prev, { sender: 'bot', text: reply }]);
    }, 800);
  };

  return (
    <DashboardLayout>
      {/* PAGE HEADER */}
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 28, color: 'var(--text-light)' }}>Patient Diagnosis & Intelligence Report</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 15, marginTop: 4 }}>
            Synthesized AI diagnosis report generated from your uploaded clinical records.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={handlePrint} className="cx-btn-ghost" style={{ padding: '10px 18px', fontSize: 14 }}>
            <Printer size={16} /> Print / Export PDF
          </button>
          <button onClick={() => setShareGenerated(!shareGenerated)} className="cx-btn-primary" style={{ padding: '10px 20px', fontSize: 14 }}>
            <Share2 size={16} /> Share With Doctor
          </button>
        </div>
      </div>

      {shareGenerated && (
        <div
          style={{
            marginBottom: 24,
            padding: 20,
            borderRadius: 14,
            background: 'rgba(127, 231, 196, 0.1)',
            border: '1px solid rgba(127, 231, 196, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 20,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <QrCode size={40} style={{ color: 'var(--mint)' }} />
            <div>
              <div style={{ color: 'var(--text-light)', fontWeight: 600, fontSize: 15 }}>
                Doctor Access QR Code & Link Generated
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                https://healthtracker.ai/report/pat_892401 (Encrypted • Valid for 48 Hours)
              </div>
            </div>
          </div>
          <button
            onClick={() => navigator.clipboard?.writeText('https://healthtracker.ai/report/pat_892401')}
            style={{
              padding: '8px 14px',
              borderRadius: 8,
              background: 'var(--mint)',
              color: 'var(--ink-deep)',
              border: 'none',
              fontWeight: 600,
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            Copy Link
          </button>
        </div>
      )}

      {/* 4 DISEASE PREDICTION RISK SCORES GRID */}
      <div className="dash-grid-4" style={{ marginBottom: 24 }}>
        {predictions.map((p) => (
          <div
            key={p.id}
            style={{
              background: 'rgba(14, 34, 48, 0.6)',
              border: '1px solid rgba(127, 231, 196, 0.25)',
              borderRadius: 16,
              padding: 20,
            }}
          >
            <div style={{ fontSize: 12, fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-muted)', marginBottom: 6 }}>
              {p.category}
            </div>
            <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-light)', marginBottom: 12 }}>
              {p.disease}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 36, fontWeight: 600, color: 'var(--mint)' }}>
                {p.riskScore}%
              </span>
              <span style={{ fontSize: 12, color: 'var(--mint)', background: 'rgba(127,231,196,0.15)', padding: '2px 8px', borderRadius: 4 }}>
                {p.status}
              </span>
            </div>
            <div className="cx-risk-bar-track" style={{ marginTop: 12 }}>
              <div className="cx-risk-bar-fill" style={{ width: `${p.riskScore}%`, background: 'var(--mint)' }} />
            </div>
          </div>
        ))}
      </div>

      {/* MAIN DIAGNOSIS REPORT BODY */}
      <div className="dash-grid-2" style={{ gridTemplateColumns: '1.2fr 1fr' }}>
        {/* LEFT COLUMN: DIAGNOSIS & CLINICAL BIOMARKERS */}
        <div>
          {/* EXECUTIVE SUMMARY */}
          <div className="dash-card">
            <div className="dash-card-header">
              <div className="dash-card-title">
                <Sparkles size={18} style={{ color: 'var(--mint)' }} />
                Executive AI Clinical Summary
              </div>
            </div>

            <p style={{ color: 'var(--text-light)', fontSize: 14.5, lineHeight: 1.6, background: 'rgba(6, 18, 26, 0.6)', padding: 16, borderRadius: 10, border: '1px solid var(--ink-line)' }}>
              Analysis of digitized records ({documents.length} files) for patient <strong>{patient.name}</strong> ({patient.age}M). Longitudinal data indicates stable cardiovascular parameters (EF 62%), controlled lipid levels, and a favorable metabolic trajectory (HbA1c reduced to 5.4%). 5-year disease prediction scores confirm low risk across Diabetes, Cardiac, Renal, and Hepatic models.
            </p>
          </div>

          {/* PARSED LAB BIOMARKERS */}
          <div className="dash-card">
            <div className="dash-card-header">
              <div className="dash-card-title">
                <TrendingUp size={18} style={{ color: 'var(--mint)' }} />
                Parsed Clinical Biomarkers & Vitals
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 8, background: 'rgba(6, 18, 26, 0.6)', fontSize: 13.5 }}>
                <span style={{ color: 'var(--text-muted)' }}>HbA1c (Glycated Hemoglobin)</span>
                <span style={{ color: 'var(--mint)', fontWeight: 600 }}>5.4% (Normal)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 8, background: 'rgba(6, 18, 26, 0.6)', fontSize: 13.5 }}>
                <span style={{ color: 'var(--text-muted)' }}>Fasting Glucose</span>
                <span style={{ color: 'var(--text-light)', fontWeight: 600 }}>94 mg/dL</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 8, background: 'rgba(6, 18, 26, 0.6)', fontSize: 13.5 }}>
                <span style={{ color: 'var(--text-muted)' }}>Total Cholesterol</span>
                <span style={{ color: 'var(--text-light)', fontWeight: 600 }}>182 mg/dL</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 8, background: 'rgba(6, 18, 26, 0.6)', fontSize: 13.5 }}>
                <span style={{ color: 'var(--text-muted)' }}>Ejection Fraction (Cardiac)</span>
                <span style={{ color: 'var(--mint)', fontWeight: 600 }}>62% (Normal EF)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 8, background: 'rgba(6, 18, 26, 0.6)', fontSize: 13.5 }}>
                <span style={{ color: 'var(--text-muted)' }}>Serum Creatinine (Renal)</span>
                <span style={{ color: 'var(--text-light)', fontWeight: 600 }}>0.95 mg/dL</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: RECOMMENDATIONS & INTERACTIVE AI CHAT */}
        <div>
          {/* RECOMMENDATIONS CARD */}
          <div className="dash-card">
            <div className="dash-card-header">
              <div className="dash-card-title">
                <CheckCircle2 size={18} style={{ color: 'var(--mint)' }} />
                AI Preventative Recommendations
              </div>
            </div>

            <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--text-body)', fontSize: 14, lineHeight: 1.7 }}>
              <li style={{ marginBottom: 6 }}>Maintain low-glycemic Mediterranean dietary plan.</li>
              <li style={{ marginBottom: 6 }}>Continue prescribed low-dose statin therapy.</li>
              <li style={{ marginBottom: 6 }}>Schedule routine follow-up lipid screening in Oct 2026.</li>
              <li style={{ marginBottom: 6 }}>Maintain 150+ minutes of weekly moderate aerobic activity.</li>
            </ul>
          </div>

          {/* REPORT AI ASSISTANT CHAT */}
          <div className="dash-card">
            <div className="dash-card-header">
              <div className="dash-card-title">
                <MessageSquare size={18} style={{ color: 'var(--mint)' }} />
                Ask AI About This Report
              </div>
            </div>

            <div style={{ background: 'rgba(6, 18, 26, 0.8)', padding: 14, borderRadius: 10, border: '1px solid var(--ink-line)', maxHeight: 200, overflowY: 'auto', marginBottom: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {chatMessages.map((m, idx) => (
                <div key={idx} style={{ fontSize: 13, color: m.sender === 'user' ? 'var(--mint)' : 'var(--text-light)', background: m.sender === 'user' ? 'rgba(127,231,196,0.1)' : 'rgba(14,34,48,0.8)', padding: '8px 12px', borderRadius: 8 }}>
                  <strong>{m.sender === 'user' ? 'You' : 'AI Assistant'}:</strong> {m.text}
                </div>
              ))}
            </div>

            <form onSubmit={handleChatSend} style={{ display: 'flex', gap: 8 }}>
              <input
                type="text"
                placeholder="Ask about your report..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: 8,
                  border: '1px solid var(--ink-line)',
                  background: 'rgba(6, 18, 26, 0.8)',
                  color: 'var(--text-light)',
                  fontSize: 13,
                }}
              />
              <button type="submit" className="cx-btn-primary" style={{ padding: '10px 14px', borderRadius: 8 }}>
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
