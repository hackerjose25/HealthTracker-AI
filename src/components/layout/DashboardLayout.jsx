'use client';

import React from 'react';
import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { useHealth } from '@/src/context/HealthContext';

export function DashboardLayout({ children }) {
  const { user, patient, logout } = useHealth();

  return (
    <div className="dash-shell" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--ink-deep)' }}>
      {/* TOP FULL-WIDTH HEADER WITHOUT STEP PILLS */}
      <header
        style={{
          height: 72,
          background: 'rgba(6, 18, 26, 0.95)',
          backdropFilter: 'blur(14px)',
          borderBottom: '1px solid var(--ink-line)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        {/* BRAND LOGO */}
        <Link href="/" className="dash-logo" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontFamily: 'Fraunces, serif', fontWeight: 600, fontSize: 18, color: 'var(--text-light)' }}>
              Health Tracker AI
            </span>
            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10.5, color: 'var(--mint)' }}>
              Patient Diagnostic Platform
            </span>
          </div>
        </Link>

        {/* USER PROFILE & LOGOUT */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-light)' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--mint)', color: 'var(--ink-deep)', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>
              {patient.name.charAt(0)}
            </div>
            <span>{patient.name}</span>
          </div>

          {user && (
            <button onClick={logout} className="dash-logout-btn" style={{ width: 'auto', padding: '6px 14px', fontSize: 12 }}>
              <LogOut size={13} /> Log Out
            </button>
          )}
        </div>
      </header>

      {/* FULL-WIDTH CENTERED CONTENT BODY */}
      <main style={{ flex: 1, padding: '36px 32px', maxWidth: 1180, width: '100%', margin: '0 auto' }}>
        {children}
      </main>

      {/* MINIMAL FOOTER */}
      <footer style={{ borderTop: '1px solid var(--ink-line)', padding: '20px 32px', textAlign: 'center', fontSize: 12.5, color: 'var(--text-muted)', background: '#040D13' }}>
        <span>© 2026 Health Tracker AI. Encryption: AES-256 Zero-Knowledge Vault.</span>
      </footer>
    </div>
  );
}

export default DashboardLayout;
