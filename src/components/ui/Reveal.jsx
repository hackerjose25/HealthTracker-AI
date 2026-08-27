'use client';

import React from "react";
import { useReveal } from "@/src/hooks/useReveal";

export function Reveal({ children, delay = 0 }) {
  const [ref, inView] = useReveal();
  return (
    <div
      ref={ref}
      className={`cx-reveal ${inView ? "in" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default Reveal;
