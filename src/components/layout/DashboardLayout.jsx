'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, ShieldAlert } from 'lucide-react';
import { useHealth } from '@/src/context/HealthContext';

export function DashboardLayout({ children }) {
  const { user, authInitialized, patient, logout } = useHealth();
  const router = useRouter();

  useEffect(() => {
    if (authInitialized && !user) {
      router.push('/login');
    }
  }, [authInitialized, user, router]);

  if (!authInitialized) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'var(--ink-deep)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-light)',
        fontFamily: 'IBM Plex Mono, monospace',
        gap: 20,
        padding: 24,
      }}>
        {/* Heart/Lifeline Trace Pulse */}
        <div style={{ position: 'relative', width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '2px solid var(--mint)',
            animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
            opacity: 0.75,
          }} />
          <div style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: 'rgba(127, 231, 196, 0.1)',
            border: '2px solid var(--mint)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 'auto',
          }}>
            <ShieldAlert size={20} style={{ color: 'var(--mint)' }} />
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-light)', margin: '0 0 8px 0', letterSpacing: '0.05em' }}>
            SECURING CONNECTION
          </h3>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>
            Initializing Encrypted Patient Session...
          </p>
        </div>
      </div>
    );
  }

  // If we are authenticated, but the redirect hasn't processed yet, render nothing
  if (!user) {
    return null;
  }

  return (
    <div className="dash-shell" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--ink-deep)' }}>
      {/* TOP FULL-WIDTH HEADER */}
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
            {user.picture ? (
              <img
                src={user.picture}
                alt={user.name}
                referrerPolicy="no-referrer"
                style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--mint)' }}
              />
            ) : (
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--mint)', color: 'var(--ink-deep)', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>
                {(user.name || patient.name).charAt(0)}
              </div>
            )}
            <span>{user.name || patient.name}</span>
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
