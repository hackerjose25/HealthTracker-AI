'use client';

import React, { useEffect, useRef, useState } from "react";
import { Navbar } from "./Navbar";
import { HeroSection } from "./HeroSection";
import { Footer } from "./Footer";

export function LandingPage() {
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

  return (
    <div className="cx">
      <div className="cx-progress" style={{ width: `${progress}%` }} />
      {/* 1. HEADER / NAVBAR */}
      <Navbar navScrolled={navScrolled} />

      {/* 2. HERO WITH TRACE LIFELINE ANIMATION */}
      <HeroSection heroRef={heroRef} onMouseMove={handleHeroMove} />

      {/* 3. FOOTER WITH INTERACTIVE FAQ BUTTON MODAL */}
      <Footer />
    </div>
  );
}

export default LandingPage;
