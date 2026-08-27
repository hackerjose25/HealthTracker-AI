'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/src/components/layout/DashboardLayout';
import { FileSpreadsheet, Printer, Download, Share2, QrCode, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { useHealth } from '@/src/context/HealthContext';

export default function ReportsPage() {
  const { patient, documents, predictions } = useHealth();
  const [shareGenerated, setShareGenerated] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <DashboardLayout>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div className="cx-kicker" style={{ gap: 8 }}>
            <FileSpreadsheet size={14} /> STEP 4: DISPLAY IN WEBAPP — REPORT GENERATION
          </div>
          <h1 style={{ fontSize: 28, color: 'var(--text-light)' }}>Comprehensive Patient Health Summary Report</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 15, marginTop: 4 }}>
            Synthesized multi-year comparative analysis, AI risk scores, and doctor-ready clinical overview.
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
                Secure Doctor Access Link & QR Code Generated
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                https://healthtracker.ai/share/pat_892401_sec_9023 (Expires in 48 hours)
              </div>
            </div>
          </div>
          <button
            onClick={() => navigator.clipboard?.writeText('https://healthtracker.ai/share/pat_892401_sec_9023')}
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

      {/* PRINTABLE REPORT PREVIEW CONTAINER */}
      <div
        style={{
          background: 'rgba(14, 34, 48, 0.7)',
          border: '1px solid var(--ink-line)',
          borderRadius: 20,
          padding: 40,
          boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
        }}
      >
        {/* REPORT HEADER */}
        <div
          style={{
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center',
            paddingBottom: 24,
            borderBottom: '1px solid var(--ink-line)',
            marginBottom: 32,
          }}
        >
          <div>
            <div className="cx-logo" style={{ marginBottom: 6 }}>
              Health Tracker AI — Clinical Summary
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
              Generated on {new Date().toLocaleDateString()} • Zero-Knowledge Vault Export
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-light)' }}>{patient.name}</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
              ID: {patient.id} • Age: {patient.age} • Blood: {patient.bloodGroup}
            </div>
          </div>
        </div>

        {/* SECTION 1: EXECUTIVE AI SUMMARY */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 18, color: 'var(--mint)', marginBottom: 10, fontFamily: 'IBM Plex Mono, monospace' }}>
            1. EXECUTIVE CLINICAL SUMMARY
          </h3>
          <p style={{ color: 'var(--text-light)', fontSize: 15, lineHeight: 1.6, background: 'rgba(6, 18, 26, 0.6)', padding: 16, borderRadius: 10, border: '1px solid var(--ink-line)' }}>
            Patient Yugin Santhosh (42M) presents with a well-maintained longitudinal health profile spanning 4 digitized clinical records from 2016 through 2026. Key positive trends include an improvement in HbA1c from 5.9% (2021) down to 5.4% (2025), alongside a stable left ventricular ejection fraction (62%) documented on echocardiogram in Jan 2026.
          </p>
        </div>

        {/* SECTION 2: COMPARATIVE BIOMARKER TRENDS */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 18, color: 'var(--mint)', marginBottom: 12, fontFamily: 'IBM Plex Mono, monospace' }}>
            2. COMPARATIVE BIOMARKER ANALYSIS (MULTIPLE YEARS)
          </h3>

          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: 14,
              color: 'var(--text-light)',
            }}
          >
            <thead>
              <tr style={{ background: 'rgba(6, 18, 26, 0.8)', borderBottom: '1px solid var(--ink-line)', textAlign: 'left' }}>
                <th style={{ padding: 12 }}>Biomarker / Test</th>
                <th style={{ padding: 12 }}>2016 Baseline</th>
                <th style={{ padding: 12 }}>2021 Panel</th>
                <th style={{ padding: 12 }}>2026 Current</th>
                <th style={{ padding: 12 }}>Clinical Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(30, 61, 75, 0.4)' }}>
                <td style={{ padding: 12, fontWeight: 500 }}>Fasting Glucose</td>
                <td style={{ padding: 12, color: 'var(--text-muted)' }}>92 mg/dL</td>
                <td style={{ padding: 12, color: 'var(--text-muted)' }}>108 mg/dL</td>
                <td style={{ padding: 12, color: 'var(--text-light)' }}>94 mg/dL</td>
                <td style={{ padding: 12, color: 'var(--mint)' }}>✓ Normal</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(30, 61, 75, 0.4)' }}>
                <td style={{ padding: 12, fontWeight: 500 }}>HbA1c</td>
                <td style={{ padding: 12, color: 'var(--text-muted)' }}>5.2%</td>
                <td style={{ padding: 12, color: 'var(--coral)' }}>5.9% (Elevated)</td>
                <td style={{ padding: 12, color: 'var(--mint)' }}>5.4%</td>
                <td style={{ padding: 12, color: 'var(--mint)' }}>✓ Improved</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(30, 61, 75, 0.4)' }}>
                <td style={{ padding: 12, fontWeight: 500 }}>Total Cholesterol</td>
                <td style={{ padding: 12, color: 'var(--text-muted)' }}>182 mg/dL</td>
                <td style={{ padding: 12, color: 'var(--coral)' }}>215 mg/dL</td>
                <td style={{ padding: 12, color: 'var(--mint)' }}>182 mg/dL</td>
                <td style={{ padding: 12, color: 'var(--mint)' }}>✓ Controlled</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(30, 61, 75, 0.4)' }}>
                <td style={{ padding: 12, fontWeight: 500 }}>Ejection Fraction</td>
                <td style={{ padding: 12, color: 'var(--text-muted)' }}>—</td>
                <td style={{ padding: 12, color: 'var(--text-muted)' }}>—</td>
                <td style={{ padding: 12, color: 'var(--mint)' }}>62%</td>
                <td style={{ padding: 12, color: 'var(--mint)' }}>✓ Normal</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* SECTION 3: DISEASE PREDICTION SCORES */}
        <div>
          <h3 style={{ fontSize: 18, color: 'var(--mint)', marginBottom: 12, fontFamily: 'IBM Plex Mono, monospace' }}>
            3. ML DISEASE PREDICTION ENGINE SCORES
          </h3>

          <div className="dash-grid-4">
            {predictions.map((p) => (
              <div key={p.id} style={{ background: 'rgba(6, 18, 26, 0.6)', padding: 16, borderRadius: 12, border: '1px solid var(--ink-line)' }}>
                <div style={{ fontSize: 13, color: 'var(--text-light)', fontWeight: 600 }}>{p.disease}</div>
                <div style={{ fontSize: 24, fontWeight: 600, color: 'var(--mint)', marginTop: 4 }}>{p.riskScore}%</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>Status: {p.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
