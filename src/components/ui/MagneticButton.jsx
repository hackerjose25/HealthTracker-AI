'use client';

import React, { useRef } from "react";

export function MagneticButton({ children, className, href, onClick, type = "button" }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${relX * 0.18}px, ${relY * 0.28}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  const Tag = href ? "a" : "button";

  return (
    <Tag
      ref={ref}
      href={href}
      type={href ? undefined : type}
      onClick={onClick}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {children}
    </Tag>
  );
}

export default MagneticButton;
