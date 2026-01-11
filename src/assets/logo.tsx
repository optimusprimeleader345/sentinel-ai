// Placeholder logo for SentinelAI - can be replaced with actual SVG
import React from 'react';

const Logo = ({ className = "w-12 h-12" }) => (
  <svg
    className={className}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Shield shape */}
    <path
      d="M24 4L36 8V22C36 32 32 38 24 44C16 38 12 32 12 22V8L24 4Z"
      fill="url(#shield-gradient)"
      stroke="url(#shield-border)"
      strokeWidth="2"
      strokeLinejoin="round"
    />

    {/* Inner shield decoration */}
    <path
      d="M20 14L24 18L28 14"
      stroke="url(#shield-accent)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    <defs>
      <linearGradient id="shield-gradient" x1="24" y1="4" x2="24" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="50%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
      <linearGradient id="shield-border" x1="24" y1="0" x2="24" y2="48" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#22d3ee" />
      </linearGradient>
      <linearGradient id="shield-accent" x1="20" y1="14" x2="28" y2="18" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#ef4444" />
      </linearGradient>
    </defs>
  </svg>
);

export default Logo;
