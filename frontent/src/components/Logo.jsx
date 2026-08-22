import React from 'react';

export default function Logo({ size = 40, iconOnly = false, className = '' }) {
  // If size is passed, we scale the SVG width/height accordingly.
  // Standard aspect ratio of the full logo is 1:1.15 (width:height) to accommodate the text underneath.
  const width = size;
  const height = iconOnly ? size : Math.round(size * 1.25);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 145"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Tripora Logo"
    >
      {/* ── Sky Background (Inside the frame) ── */}
      <rect x="25" y="25" width="70" height="65" rx="2" fill="#FFFFFF" />

      {/* ── Clouds (Faded silhouettes in the background sky) ── */}
      {/* Left cloud */}
      <path
        d="M28 42 C33 42 35 44 38 44 C41 44 43 42 45 42 L45 46 L28 46 Z"
        fill="#252238"
        opacity="0.12"
      />
      {/* Right cloud */}
      <path
        d="M72 38 C75 38 78 39 82 39 C85 39 88 38 90 38 L90 42 L72 42 Z"
        fill="#252238"
        opacity="0.12"
      />

      {/* ── Mountain Body ── */}
      {/* Left Slope (Dark Shadow Side) */}
      <path
        d="M20 90 L60 14 L57 28 L64 42 L55 56 L61 70 L51 90 Z"
        fill="#252238"
      />
      {/* Right Slope (White Highlight Side) */}
      <path
        d="M60 14 L100 90 L51 90 L61 70 L55 56 L64 42 L57 28 Z"
        fill="#FFFFFF"
      />

      {/* ── Mountain Ridge Accent lines (Details to match the sketch) ── */}
      <path
        d="M60 14 L57 28 L64 42 L55 56 L61 70 L51 90"
        stroke="#252238"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right slope shadow lines (shading) */}
      <path
        d="M68 36 L66 40 M78 58 L74 62 M84 72 L80 78 M90 82 L86 86"
        stroke="#252238"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.25"
      />

      {/* ── Thick Outer Badge Frame (Mountain pops out at the top) ── */}
      <rect
        x="25"
        y="25"
        width="70"
        height="65"
        rx="2"
        stroke="#252238"
        strokeWidth="5.5"
        strokeLinejoin="miter"
      />

      {/* ── Winding River (Starts at the mountain center-base and winds down) ── */}
      <path
        d="M58 56 Q53 62 57 66 T42 76 Q50 83 67 87 L56 87 Q45 82 50 75 T55 64 Z"
        fill="#FFFFFF"
      />
      {/* River outline to separate it from the mountain highlights */}
      <path
        d="M58 56 Q53 62 57 66 T42 76 Q50 83 67 87 M56 87 Q45 82 50 75 T55 64"
        stroke="#252238"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* ── Brand Typography (Excluded if iconOnly is true) ── */}
      {!iconOnly && (
        <g>
          {/* TRIPORA (Bold Slab-Serif Font Style) */}
          <text
            x="60"
            y="118"
            fontFamily="'Outfit', 'Inter', sans-serif"
            fontWeight="900"
            fontSize="16"
            fill="#252238"
            textAnchor="middle"
            letterSpacing="1.2"
          >
            TRIPORA
          </text>
          {/* SINCE 2026 (Clean Monospace Sub-Text) */}
          <text
            x="60"
            y="136"
            fontFamily="'Inter', sans-serif"
            fontWeight="700"
            fontSize="8.5"
            fill="#252238"
            textAnchor="middle"
            letterSpacing="3.5"
          >
            SINCE 2026
          </text>
        </g>
      )}
    </svg>
  );
}
