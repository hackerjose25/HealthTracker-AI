'use client';

import React from "react";

const TRACE_PATH = "M0,150 L120,150 L145,90 L165,180 L190,60 L215,150 L340,150 C 400,150 430,110 470,110 C 560,110 560,150 650,150 C 730,150 760,70 850,70 C 950,70 980,40 1180,20";

const MARKERS = [
  { x: 145, y: 90, label: "Born", sub: "Record #1", cls: "" },
  { x: 340, y: 150, label: "2016", sub: "Vaccination log", cls: "" },
  { x: 470, y: 110, label: "2021", sub: "Lab panel", cls: "mint" },
  { x: 650, y: 150, label: "2023", sub: "Scan report", cls: "" },
  { x: 850, y: 70, label: "Today", sub: "Full history read", cls: "mint" },
  { x: 1050, y: 27, label: "Predicted", sub: "Risk trend, 5yr", cls: "coral" },
];

export function TraceHero() {
  return (
    <svg
      className="cx-trace-wrap"
      viewBox="0 0 1180 220"
      width="100%"
      height="auto"
      role="img"
      aria-label="Animated timeline of health records leading to a predicted risk curve"
    >
      <defs>
        <linearGradient id="lineGradStatic" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2C5364" />
          <stop offset="55%" stopColor="#3f6a63" />
          <stop offset="100%" stopColor="#5a3b2c" />
        </linearGradient>
        <linearGradient id="sweep" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="260" y2="0">
          <stop offset="0%" stopColor="#7FE7C4" stopOpacity="0" />
          <stop offset="50%" stopColor="#7FE7C4" stopOpacity="1" />
          <stop offset="100%" stopColor="#E4572E" stopOpacity="0" />
          <animateTransform attributeName="gradientTransform" type="translate" from="-260 0" to="1180 0" dur="4.5s" repeatCount="indefinite" />
        </linearGradient>
      </defs>

      <path d={TRACE_PATH} fill="none" stroke="url(#lineGradStatic)" strokeWidth="1.5" opacity="0.6" />
      <path d={TRACE_PATH} fill="none" stroke="url(#sweep)" strokeWidth="2.5" />

      <circle r="5" fill="#7FE7C4" style={{ filter: "drop-shadow(0 0 6px #7FE7C4)" }}>
        <animateMotion dur="4.5s" repeatCount="indefinite" path={TRACE_PATH} />
      </circle>

      {MARKERS.map((p, i) => (
        <g key={i}>
          {(p.cls === "mint" || p.cls === "coral") && (
            <circle className="cx-ping" cx={p.x} cy={p.y} r="5" fill="none" stroke={p.cls === "coral" ? "#E4572E" : "#7FE7C4"} strokeWidth="1.5" style={{ animationDelay: `${i * 0.3}s` }} />
          )}
          <circle className={`cx-trace-dot ${p.cls}`} cx={p.x} cy={p.y} r="5" style={{ animationDelay: `${i * 0.25}s` }} />
          <text className={`cx-trace-label ${p.cls === "coral" ? "hi" : ""}`} x={p.x} y={p.y - 16} textAnchor="middle">{p.label}</text>
          <text className="cx-trace-label" x={p.x} y={p.y + 26} textAnchor="middle" opacity="0.7">{p.sub}</text>
        </g>
      ))}
    </svg>
  );
}

export default TraceHero;
