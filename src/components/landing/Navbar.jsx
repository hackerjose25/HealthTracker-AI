'use client';

import React from "react";
import Link from "next/link";
import { LogIn, UploadCloud, Activity } from "lucide-react";

export function Navbar({ navScrolled }) {
  return (
    <nav className={`cx-nav ${navScrolled ? "scrolled" : ""}`}>
      <div className="cx-nav-inner">
        <Link href="/" className="cx-logo">
          
          Health Tracker AI
        </Link>
        
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          
          <Link href="/login" className="cx-nav-cta" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
