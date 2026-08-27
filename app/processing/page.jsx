'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/src/components/layout/DashboardLayout';
import { Cpu, CheckCircle2, ArrowRight, Database, Activity, Sparkles } from 'lucide-react';

export default function ProcessingPage() {
  const [progress, setProgress] = useState(15);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const router = useRouter();

  const steps = [
    { title: "Parsing raw clinical documents & imaging scans", detail: "PDF & OCR text normalization complete." },
    { title: "Medical LLM entity extraction & LOINC term linking", detail: "Demographics, vitals, & lab panels structured." },
    { title: "Generating 768-dimensional semantic vector embeddings", detail: "Dense embeddings stored in Vector DB index." },
    { title: "Running Disease Prediction Engine algorithms", detail: "Diabetes, Heart, Kidney, & Liver models evaluated." },
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setProgress(40);
      setCurrentStepIndex(1);
    }, 800);

    const timer2 = setTimeout(() => {
      setProgress(75);
      setCurrentStepIndex(2);
    }, 1700);

    const timer3 = setTimeout(() => {
      setProgress(100);
      setCurrentStepIndex(3);
    }, 2600);

    const timer4 = setTimeout(() => {
      router.push('/report');
    }, 3400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [router]);

  return (
    <DashboardLayout>
      <div style={{ maxWidth: 800, margin: '40px auto 0' }}>
        <div className="dash-card" style={{ background: 'radial-gradient(120% 120% at 0% 0%, rgba(20, 50, 70, 0.8) 0%, rgba(8, 22, 32, 0.95) 100%)', border: '1px solid rgba(127, 231, 196, 0.3)', padding: 40, textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(127, 231, 196, 0.15)', border: '2px solid var(--mint)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--mint)' }}>
            <Cpu size={32} style={{ animation: 'pulse 1.5s ease-in-out infinite' }} />
          </div>

          <div className="cx-badge" style={{ marginBottom: 12 }}>
            <Sparkles size={13} /> AI Processing Pipeline (Cloud VM)
          </div>

          <h1 style={{ fontSize: 28, color: 'var(--text-light)', marginBottom: 8 }}>
            Processing Your Medical Documents...
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 15, maxWidth: 520, margin: '0 auto 32px' }}>
            The Medical LLM is parsing clinical entities, generating vector embeddings, and computing disease prediction risk scores.
          </p>

          {/* PROGRESS BAR */}
          <div style={{ background: 'rgba(6, 18, 26, 0.8)', height: 12, borderRadius: 100, border: '1px solid var(--ink-line)', overflow: 'hidden', marginBottom: 32 }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, var(--mint), var(--coral))', transition: 'width 0.6s ease' }} />
          </div>

          {/* STEP INDICATORS */}
          <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
            {steps.map((s, i) => {
              const isDone = i <= currentStepIndex;
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 18px',
                    borderRadius: 12,
                    background: isDone ? 'rgba(127, 231, 196, 0.08)' : 'rgba(6, 18, 26, 0.4)',
                    border: `1px solid ${isDone ? 'rgba(127, 231, 196, 0.3)' : 'var(--ink-line)'}`,
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <CheckCircle2 size={18} style={{ color: isDone ? 'var(--mint)' : 'var(--text-muted)' }} />
                    <div>
                      <div style={{ color: isDone ? 'var(--text-light)' : 'var(--text-muted)', fontWeight: 500, fontSize: 14 }}>
                        {s.title}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.detail}</div>
                    </div>
                  </div>
                  {isDone && <span style={{ fontSize: 11, fontFamily: 'IBM Plex Mono, monospace', color: 'var(--mint)' }}>Completed</span>}
                </div>
              );
            })}
          </div>

          <button
            onClick={() => router.push('/report')}
            className="cx-btn-primary"
            style={{ padding: '14px 28px', fontSize: 15, margin: '0 auto' }}
          >
            View Diagnosis Report <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
