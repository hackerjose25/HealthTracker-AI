'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/src/components/layout/DashboardLayout';
import { FileText, Calendar, AlertTriangle, CheckCircle2, TrendingUp, Search, Filter, ShieldCheck, ChevronRight } from 'lucide-react';
import { useHealth } from '@/src/context/HealthContext';

export default function TimelinePage() {
  const { documents, patient } = useHealth();
  const [selectedDoc, setSelectedDoc] = useState(documents[0]);
  const [filterCategory, setFilterCategory] = useState('All');

  const filteredDocs = filterCategory === 'All'
    ? documents
    : documents.filter((d) => d.category === filterCategory);

  return (
    <DashboardLayout>
      <div style={{ marginBottom: 24 }}>
        <div className="cx-kicker" style={{ gap: 8 }}>
          <FileText size={14} /> STEP 4: DISPLAY IN WEBAPP — DOCUMENT ANALYSIS & TIMELINE
        </div>
        <h1 style={{ fontSize: 28, color: 'var(--text-light)' }}>Structured Patient Timeline & Insights</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 15, marginTop: 4 }}>
          Continuous chronological history of medical reports, linked entity extractions, and longitudinal lab trends.
        </p>
      </div>

      {/* LAB TRENDS OVERVIEW BANNER */}
      <div className="dash-card">
        <div className="dash-card-header">
          <div className="dash-card-title">
            <TrendingUp size={18} style={{ color: 'var(--mint)' }} />
            Longitudinal Lab Trends & Biomarker Insights (2016 – 2026)
          </div>
          <span style={{ fontSize: 12, fontFamily: 'IBM Plex Mono, monospace', color: 'var(--mint)' }}>
            AI SYNTHESIS
          </span>
        </div>

        <div className="dash-grid-4">
          <div style={{ background: 'rgba(6, 18, 26, 0.6)', padding: 16, borderRadius: 12, border: '1px solid var(--ink-line)' }}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>HbA1c Trajectory</div>
            <div style={{ fontSize: 24, fontWeight: 600, color: 'var(--mint)', marginTop: 4 }}>5.4%</div>
            <div style={{ fontSize: 12, color: 'var(--mint)', marginTop: 2 }}>↓ Improved from 5.9% (2021)</div>
          </div>

          <div style={{ background: 'rgba(6, 18, 26, 0.6)', padding: 16, borderRadius: 12, border: '1px solid var(--ink-line)' }}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Total Cholesterol</div>
            <div style={{ fontSize: 24, fontWeight: 600, color: 'var(--text-light)', marginTop: 4 }}>182 mg/dL</div>
            <div style={{ fontSize: 12, color: 'var(--mint)', marginTop: 2 }}>↓ Normal range (Statin response)</div>
          </div>

          <div style={{ background: 'rgba(6, 18, 26, 0.6)', padding: 16, borderRadius: 12, border: '1px solid var(--ink-line)' }}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Ejection Fraction (Heart)</div>
            <div style={{ fontSize: 24, fontWeight: 600, color: 'var(--mint)', marginTop: 4 }}>62%</div>
            <div style={{ fontSize: 12, color: 'var(--mint)', marginTop: 2 }}>✓ Normal Left Ventricular Function</div>
          </div>

          <div style={{ background: 'rgba(6, 18, 26, 0.6)', padding: 16, borderRadius: 12, border: '1px solid var(--ink-line)' }}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Serum Creatinine (Kidney)</div>
            <div style={{ fontSize: 24, fontWeight: 600, color: 'var(--text-light)', marginTop: 4 }}>0.95 mg/dL</div>
            <div style={{ fontSize: 12, color: 'var(--mint)', marginTop: 2 }}>✓ eGFR &gt; 90 (Normal)</div>
          </div>
        </div>
      </div>

      {/* MAIN TIMELINE & DOCUMENT DETAIL SPLIT */}
      <div className="dash-grid-2" style={{ gridTemplateColumns: '1.1fr 1fr' }}>
        {/* TIMELINE LIST */}
        <div className="dash-card">
          <div className="dash-card-header">
            <div className="dash-card-title">
              <Calendar size={18} style={{ color: 'var(--mint)' }} />
              Chronological Record Index ({filteredDocs.length})
            </div>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: 8,
                border: '1px solid var(--ink-line)',
                background: 'rgba(6, 18, 26, 0.8)',
                color: 'var(--text-light)',
                fontSize: 13,
              }}
            >
              <option value="All">All Categories</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Radiology">Radiology</option>
              <option value="Lab Report">Lab Report</option>
              <option value="Immunization">Immunization</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {filteredDocs.map((doc) => {
              const isSelected = selectedDoc?.id === doc.id;
              return (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc)}
                  style={{
                    padding: 16,
                    borderRadius: 12,
                    border: `1px solid ${isSelected ? 'var(--mint)' : 'rgba(30, 61, 75, 0.6)'}`,
                    background: isSelected ? 'rgba(127, 231, 196, 0.08)' : 'rgba(6, 18, 26, 0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span
                        style={{
                          fontFamily: 'IBM Plex Mono, monospace',
                          fontSize: 11,
                          color: 'var(--mint)',
                          background: 'rgba(127, 231, 196, 0.1)',
                          padding: '2px 8px',
                          borderRadius: 4,
                        }}
                      >
                        {doc.date}
                      </span>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{doc.category}</span>
                    </div>
                    <ChevronRight size={16} style={{ color: isSelected ? 'var(--mint)' : 'var(--text-muted)' }} />
                  </div>

                  <div style={{ color: 'var(--text-light)', fontWeight: 600, fontSize: 15, marginTop: 8 }}>
                    {doc.name}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.4 }}>
                    {doc.summary}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SELECTED DOCUMENT ANALYSIS */}
        <div className="dash-card">
          {selectedDoc ? (
            <div>
              <div className="dash-card-header">
                <div className="dash-card-title">
                  <FileText size={18} style={{ color: 'var(--mint)' }} />
                  Extracted Analysis Summary
                </div>
                <span className="dash-step-tag">{selectedDoc.type}</span>
              </div>

              <h3 style={{ fontSize: 18, color: 'var(--text-light)', marginBottom: 6 }}>{selectedDoc.name}</h3>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>
                Provider: <strong>{selectedDoc.provider}</strong> • Date: <strong>{selectedDoc.date}</strong>
              </div>

              <div style={{ marginBottom: 20 }}>
                <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 12, color: 'var(--mint)', marginBottom: 6 }}>
                  AI CLINICAL SUMMARY
                </div>
                <p style={{ background: 'rgba(6, 18, 26, 0.6)', padding: 14, borderRadius: 10, border: '1px solid var(--ink-line)', fontSize: 14, color: 'var(--text-light)', lineHeight: 1.5 }}>
                  {selectedDoc.summary}
                </p>
              </div>

              {selectedDoc.abnormalities && selectedDoc.abnormalities.length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 12, color: 'var(--coral)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <AlertTriangle size={14} /> HIGHLIGHTS & ABNORMALITIES DETECTED
                  </div>
                  {selectedDoc.abnormalities.map((ab, idx) => (
                    <div key={idx} style={{ background: 'rgba(228, 87, 46, 0.12)', padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(228, 87, 46, 0.3)', color: '#F3F7F1', fontSize: 13, marginBottom: 6 }}>
                      ⚠️ {ab}
                    </div>
                  ))}
                </div>
              )}

              <div>
                <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 12, color: 'var(--mint)', marginBottom: 6 }}>
                  EXTRACTED LAB VALUES & VITALS
                </div>
                <div style={{ background: 'rgba(6, 18, 26, 0.6)', padding: 14, borderRadius: 10, border: '1px solid var(--ink-line)' }}>
                  {Object.entries(selectedDoc.extractedJSON.labResults || {}).map(([key, val]) => (
                    <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(30, 61, 75, 0.4)', fontSize: 13 }}>
                      <span style={{ color: 'var(--text-muted)', textTransform: 'capitalize' }}>{key}</span>
                      <span style={{ color: 'var(--text-light)', fontWeight: 600 }}>{val}</span>
                    </div>
                  ))}
                  {Object.keys(selectedDoc.extractedJSON.labResults || {}).length === 0 && (
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic' }}>
                      No discrete numerical lab values parsed in this imaging/vaccine record.
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ color: 'var(--text-muted)', textTransform: 'uppercase', textAlign: 'center', padding: 40 }}>
              Select a document from the left timeline to view extracted details.
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
