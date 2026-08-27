'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ArrowRight, Lock, Mail, User, X, ChevronRight } from 'lucide-react';
import { useHealth } from '@/src/context/HealthContext';

// Google logo SVG
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
    <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
  </svg>
);

// Mock users for Simulation Mode
const MOCK_GOOGLE_USERS = [
  {
    name: 'Alex Johnson',
    email: 'alex.johnson@gmail.com',
    picture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  },
  {
    name: 'Maria Chen',
    email: 'maria.chen@gmail.com',
    picture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
  },
  {
    name: 'David Patel',
    email: 'david.patel@gmail.com',
    picture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
  },
];

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSimModal, setShowSimModal] = useState(false);
  const [isGsiLoading, setIsGsiLoading] = useState(false);
  const { login, loginWithGoogle } = useHealth();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    router.push('/dashboard');
  };

  const decodeJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  };

  const handleGoogleLogin = useCallback(() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    if (!clientId || clientId === 'your_actual_client_id.apps.googleusercontent.com') {
      setShowSimModal(true);
      return;
    }

    if (!window.google) {
      alert('Google Identity Services not loaded yet. Please try again.');
      return;
    }

    setIsGsiLoading(true);
    try {
      const client = window.google.accounts.id;
      client.initialize({
        client_id: clientId,
        callback: (response) => {
          setIsGsiLoading(false);
          const payload = decodeJwt(response.credential);
          if (payload) {
            loginWithGoogle({
              name: payload.name,
              email: payload.email,
              picture: payload.picture,
            });
            router.push('/dashboard');
          }
        },
        auto_select: false,
        cancel_on_tap_outside: true,
      });
      client.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          setIsGsiLoading(false);
          setShowSimModal(true);
        }
      });
    } catch (err) {
      setIsGsiLoading(false);
      console.error('GSI error:', err);
      setShowSimModal(true);
    }
  }, [loginWithGoogle, router]);

  const handleSimulatedLogin = (mockUser) => {
    setShowSimModal(false);
    loginWithGoogle(mockUser);
    router.push('/dashboard');
  };

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" strategy="lazyOnload" />

      <div className="cx" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
        <div style={{ maxWidth: 440, width: '100%', padding: 36, background: 'rgba(14, 34, 48, 0.75)', border: '1px solid var(--ink-line)', borderRadius: 20, backdropFilter: 'blur(16px)', boxShadow: '0 24px 64px rgba(0,0,0,0.4)' }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div className="cx-logo" style={{ justifyContent: 'center', marginBottom: 12 }}>
              Health Tracker AI
            </div>
            <div className="cx-badge" style={{ marginTop: 8 }}>
              <ShieldCheck size={13} /> Step 1: Account Registration
            </div>
            <h2 style={{ fontSize: 24, marginTop: 16, color: 'var(--text-light)' }}>Create your Patient Vault</h2>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 6 }}>
              Set up your AI health records timeline &amp; risk predictions.
            </p>
          </div>

          {/* GOOGLE SIGN-UP BUTTON */}
          <button
            id="google-signup-btn"
            type="button"
            onClick={handleGoogleLogin}
            disabled={isGsiLoading}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              padding: '12px 20px',
              borderRadius: 12,
              border: '1px solid var(--ink-line)',
              background: isGsiLoading ? 'rgba(127,231,196,0.04)' : 'rgba(255,255,255,0.05)',
              color: 'var(--text-light)',
              fontSize: 14,
              fontWeight: 500,
              cursor: isGsiLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              backdropFilter: 'blur(8px)',
              marginBottom: 20,
            }}
            onMouseEnter={(e) => { if (!isGsiLoading) { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(127,231,196,0.4)'; e.currentTarget.style.boxShadow = '0 0 16px rgba(127,231,196,0.12)'; } }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'var(--ink-line)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            {isGsiLoading ? (
              <div style={{ width: 18, height: 18, border: '2px solid var(--mint)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
            ) : (
              <GoogleIcon />
            )}
            {isGsiLoading ? 'Connecting to Google...' : 'Continue with Google'}
          </button>

          {/* DIVIDER */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--ink-line)' }} />
            <span style={{ fontSize: 11, fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>OR REGISTER WITH EMAIL</span>
            <div style={{ flex: 1, height: 1, background: 'var(--ink-line)' }} />
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-muted)', marginBottom: 6 }}>
                FULL NAME
              </label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: 14, top: 14, color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    borderRadius: 10,
                    border: '1px solid var(--ink-line)',
                    background: 'rgba(6, 18, 26, 0.8)',
                    color: 'var(--text-light)',
                    fontSize: 14,
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-muted)', marginBottom: 6 }}>
                EMAIL ADDRESS
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: 14, top: 14, color: 'var(--text-muted)' }} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    borderRadius: 10,
                    border: '1px solid var(--ink-line)',
                    background: 'rgba(6, 18, 26, 0.8)',
                    color: 'var(--text-light)',
                    fontSize: 14,
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-muted)', marginBottom: 6 }}>
                PASSWORD
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: 14, top: 14, color: 'var(--text-muted)' }} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a secure password"
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    borderRadius: 10,
                    border: '1px solid var(--ink-line)',
                    background: 'rgba(6, 18, 26, 0.8)',
                    color: 'var(--text-light)',
                    fontSize: 14,
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="cx-btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: 8, padding: '14px' }}
            >
              Create Vault &amp; Get Started <ArrowRight size={16} />
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 24, fontSize: 13, color: 'var(--text-muted)' }}>
            Already registered?{' '}
            <Link href="/login" style={{ color: 'var(--mint)', fontWeight: 500 }}>
              Log In
            </Link>
          </div>
        </div>
      </div>

      {/* SIMULATION MODE MODAL */}
      {showSimModal && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(4, 13, 19, 0.85)',
            backdropFilter: 'blur(12px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 24,
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowSimModal(false); }}
        >
          <div style={{
            maxWidth: 420, width: '100%',
            background: 'rgba(14, 34, 48, 0.95)',
            border: '1px solid rgba(127, 231, 196, 0.3)',
            borderRadius: 20,
            padding: 28,
            boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 40px rgba(127,231,196,0.08)',
            position: 'relative',
            animation: 'fadeInUp 0.25s ease',
          }}>
            <button
              onClick={() => setShowSimModal(false)}
              style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 4 }}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <div style={{ background: 'rgba(127,231,196,0.12)', border: '1px solid rgba(127,231,196,0.3)', borderRadius: 8, padding: '6px 8px', display: 'flex' }}>
                <ShieldCheck size={16} style={{ color: 'var(--mint)' }} />
              </div>
              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: 'var(--mint)', letterSpacing: '0.08em' }}>SIMULATION MODE</span>
            </div>

            <h3 style={{ fontSize: 19, color: 'var(--text-light)', marginBottom: 8 }}>Continue with Google</h3>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 6, lineHeight: 1.6 }}>
              No Google Client ID is configured. Add your credentials to <code style={{ background: 'rgba(127,231,196,0.1)', padding: '1px 5px', borderRadius: 4, fontSize: 12, color: 'var(--mint)', fontFamily: 'IBM Plex Mono, monospace' }}>.env.local</code>:
            </p>
            <div style={{ background: 'rgba(6,18,26,0.8)', border: '1px solid var(--ink-line)', borderRadius: 8, padding: '10px 14px', marginBottom: 20, fontFamily: 'IBM Plex Mono, monospace', fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.7 }}>
              <span style={{ color: 'var(--mint)' }}>NEXT_PUBLIC_GOOGLE_CLIENT_ID</span>=your_client_id
            </div>

            <p style={{ fontSize: 12, fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-muted)', marginBottom: 12, letterSpacing: '0.06em' }}>
              SELECT A MOCK GOOGLE ACCOUNT:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {MOCK_GOOGLE_USERS.map((u) => (
                <button
                  key={u.email}
                  onClick={() => handleSimulatedLogin(u)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 14px',
                    borderRadius: 12,
                    border: '1px solid var(--ink-line)',
                    background: 'rgba(255,255,255,0.03)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left',
                    width: '100%',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(127,231,196,0.08)'; e.currentTarget.style.borderColor = 'rgba(127,231,196,0.35)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'var(--ink-line)'; }}
                >
                  <img src={u.picture} alt={u.name} style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(127,231,196,0.2)', background: 'rgba(127,231,196,0.1)' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-light)' }}>{u.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{u.email}</div>
                  </div>
                  <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
