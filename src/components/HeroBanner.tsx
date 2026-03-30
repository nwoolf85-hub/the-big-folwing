"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

export default function HeroBanner() {
  const [phase, setPhase] = useState<"ready" | "throw" | "strike" | "miss">("ready");
  const [cycle, setCycle] = useState(0);

  const runCycle = useCallback(() => {
    setPhase("ready");
    const isStrike = Math.random() > 0.4; // 60% strikes

    const t1 = setTimeout(() => setPhase("throw"), 1000);
    const t2 = setTimeout(() => setPhase(isStrike ? "strike" : "miss"), 2200);
    const t3 = setTimeout(() => setCycle((c) => c + 1), 4400);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  useEffect(() => {
    const cleanup = runCycle();
    return cleanup;
  }, [cycle, runCycle]);

  const isStrike = phase === "strike";
  const isMiss = phase === "miss";

  // Pin colors matching the original concept
  const pinColors = ["#E53E3E", "#3B82F6", "#22C55E", "#F97316", "#A855F7", "#EAB308", "#EC4899", "#14B8A6", "#E53E3E", "#3B82F6"];
  // Scatter positions for each pin (from the original concept art layout)
  const pinScatter = [
    { x: -40, y: -80, rot: -50 },
    { x: 70, y: -60, rot: 35 },
    { x: 30, y: 60, rot: 75 },
    { x: -20, y: -120, rot: -70 },
    { x: 90, y: 20, rot: 20 },
    { x: -60, y: -140, rot: -30 },
    { x: 50, y: 90, rot: 55 },
    { x: 15, y: -100, rot: -45 },
    { x: -40, y: 80, rot: 85 },
    { x: 110, y: -30, rot: 15 },
  ];

  return (
    <div className="folwing-hero-banner">
      {/* Background glow */}
      <div className="bg-glow" />

      {/* The Wolf — big circular logo with warm glow */}
      <div className="wolf-logo">
        <div className="wolf-glow" />
        <Image
          src="/woolf-logo-final.jpeg"
          alt="The Folwing Wolf"
          width={200}
          height={200}
          className="wolf-head"
          priority
        />
      </div>

      {/* SVG scene — trajectory arc, football, pins */}
      <svg className="scene-svg" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid meet">
        {/* Trajectory arc (dashed) */}
        <path
          d="M260,200 Q500,20 750,200"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2"
          strokeDasharray="8,8"
          fill="none"
          className={`traj ${phase === "throw" || isStrike || isMiss ? "traj-show" : ""}`}
        />

        {/* Small footballs along trajectory (ghost trail) */}
        {phase === "throw" && (
          <>
            <ellipse cx="380" cy="100" rx="8" ry="5" fill="#8B4513" opacity="0.2" transform="rotate(-40, 380, 100)" />
            <ellipse cx="480" cy="60" rx="9" ry="5.5" fill="#8B4513" opacity="0.25" transform="rotate(-15, 480, 60)" />
            <ellipse cx="580" cy="70" rx="10" ry="6" fill="#8B4513" opacity="0.3" transform="rotate(10, 580, 70)" />
            <ellipse cx="660" cy="120" rx="11" ry="6.5" fill="#8B4513" opacity="0.35" transform="rotate(35, 660, 120)" />
          </>
        )}

        {/* Main football */}
        <g className={`main-ball ${phase === "throw" ? "ball-flying" : ""} ${isStrike ? "ball-impact" : ""} ${isMiss ? "ball-missed" : ""}`}>
          <ellipse cx="0" cy="0" rx="18" ry="10" fill="#8B4513" stroke="#6B3410" strokeWidth="1.5" />
          <line x1="-10" y1="0" x2="10" y2="0" stroke="white" strokeWidth="2" opacity="0.9" />
          <line x1="-5" y1="-4.5" x2="-5" y2="4.5" stroke="white" strokeWidth="1.2" opacity="0.7" />
          <line x1="0" y1="-5.5" x2="0" y2="5.5" stroke="white" strokeWidth="1.2" opacity="0.7" />
          <line x1="5" y1="-4.5" x2="5" y2="4.5" stroke="white" strokeWidth="1.2" opacity="0.7" />
        </g>

        {/* Impact explosion (on strike) */}
        {isStrike && (
          <g className="impact-fx">
            <circle cx="740" cy="200" r="30" fill="#FF6B00" opacity="0.12" />
            <circle cx="740" cy="200" r="50" fill="#FF6B00" opacity="0.06" />
            <circle cx="740" cy="200" r="70" fill="none" stroke="#FF6B00" strokeWidth="2" opacity="0.15" />
            <line x1="740" y1="200" x2="760" y2="168" stroke="#FFD700" strokeWidth="2" opacity="0.5" strokeLinecap="round" />
            <line x1="740" y1="200" x2="775" y2="185" stroke="#FF6B00" strokeWidth="2" opacity="0.4" strokeLinecap="round" />
            <line x1="740" y1="200" x2="720" y2="162" stroke="#FFD700" strokeWidth="1.5" opacity="0.35" strokeLinecap="round" />
            <line x1="740" y1="200" x2="780" y2="210" stroke="#FF6B00" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
          </g>
        )}

        {/* Colorful bowling pins */}
        {isStrike ? (
          /* Scattered pins on strike */
          pinScatter.map((p, i) => (
            <g
              key={`scatter-${cycle}-${i}`}
              className="pin-scatter-g"
              style={{ animationDelay: `${i * 0.04}s` }}
              transform={`translate(${740 + p.x}, ${200 + p.y}) rotate(${p.rot})`}
            >
              <path d="M-7,22 Q-9,20 -9,16 L-9,10 Q-9,4.5 -5.5,1 Q-3,-3 0,-4.5 Q3,-3 5.5,1 Q9,4.5 9,10 L9,16 Q9,20 7,22 Z" fill="white" stroke="#eee" strokeWidth="0.5" />
              <path d="M-7,10 Q0,8 7,10" stroke={pinColors[i]} strokeWidth="2.5" fill="none" />
              <path d="M-5.5,14 Q0,12.5 5.5,14" stroke={pinColors[i]} strokeWidth="1.5" fill="none" />
            </g>
          ))
        ) : (
          /* Standing pins in formation (before strike) */
          [...Array(10)].map((_, i) => {
            const row = i < 1 ? 0 : i < 3 ? 1 : i < 6 ? 2 : 3;
            const col = i < 1 ? 0 : i < 3 ? i - 1 : i < 6 ? i - 3 : i - 6;
            const rowWidth = row === 0 ? 1 : row === 1 ? 2 : row === 2 ? 3 : 4;
            const px = 740 + (col - (rowWidth - 1) / 2) * 30;
            const py = 160 + row * 28;
            return (
              <g key={`stand-${cycle}-${i}`} transform={`translate(${px}, ${py})`} className={phase === "ready" ? "pin-appear-g" : ""} style={{ animationDelay: `${i * 0.05}s` }}>
                <path d="M-7,22 Q-9,20 -9,16 L-9,10 Q-9,4.5 -5.5,1 Q-3,-3 0,-4.5 Q3,-3 5.5,1 Q9,4.5 9,10 L9,16 Q9,20 7,22 Z" fill="white" stroke="#eee" strokeWidth="0.5" />
                <path d="M-7,10 Q0,8 7,10" stroke={pinColors[i]} strokeWidth="2.5" fill="none" />
                <path d="M-5.5,14 Q0,12.5 5.5,14" stroke={pinColors[i]} strokeWidth="1.5" fill="none" />
                <ellipse cx="0" cy="22" rx="9" ry="3" fill="#f0f0f0" />
              </g>
            );
          })
        )}

        {/* STRIKE! text */}
        {isStrike && (
          <text x="800" y="120" className="strike-svg-text" transform="rotate(-12, 800, 120)">STRIKE!</text>
        )}

        {/* Ground line */}
        <line x1="50" y1="320" x2="950" y2="320" stroke="rgba(255,107,0,0.12)" strokeWidth="1.5" />
      </svg>

      {/* Miss text (outside SVG for better font rendering) */}
      {isMiss && <div className="miss-label">Gutter Ball!</div>}

      <style>{`
        .folwing-hero-banner {
          width: 100%;
          height: 300px;
          background: #0a0a0a;
          position: relative;
          overflow: hidden;
          border-bottom: 3px solid #C4A265;
        }
        @media (min-width: 640px) { .folwing-hero-banner { height: 360px; } }
        @media (min-width: 1024px) { .folwing-hero-banner { height: 400px; } }

        .bg-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 30% 55%, rgba(255,107,0,0.08) 0%, transparent 50%);
          pointer-events: none;
        }

        /* ── Wolf Logo ── */
        .wolf-logo {
          position: absolute;
          left: 8%;
          top: 50%;
          transform: translateY(-55%);
          z-index: 10;
        }
        @media (min-width: 640px) { .wolf-logo { left: 10%; } }
        @media (min-width: 1024px) { .wolf-logo { left: 12%; } }

        .wolf-glow {
          position: absolute;
          inset: -20px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,107,0,0.25) 0%, rgba(255,107,0,0.05) 60%, transparent 80%);
          pointer-events: none;
        }

        .wolf-head {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          position: relative;
          z-index: 2;
          box-shadow: 0 0 40px rgba(255,107,0,0.25);
        }
        @media (min-width: 640px) { .wolf-head { width: 160px; height: 160px; } }
        @media (min-width: 1024px) { .wolf-head { width: 190px; height: 190px; } }

        /* ── SVG Scene ── */
        .scene-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 5;
          pointer-events: none;
        }

        /* Trajectory */
        .traj { opacity: 0; transition: opacity 0.3s; }
        .traj-show { opacity: 1; }

        /* Football animation */
        .main-ball {
          opacity: 0;
        }
        .ball-flying {
          animation: fly-arc 1.2s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
        }
        .ball-impact {
          opacity: 0;
        }
        .ball-missed {
          animation: fly-miss 1.0s ease-out forwards;
        }

        @keyframes fly-arc {
          0%   { transform: translate(260px, 200px) rotate(0deg); opacity: 1; }
          20%  { transform: translate(380px, 100px) rotate(-100deg); opacity: 1; }
          50%  { transform: translate(520px, 60px) rotate(-250deg); opacity: 1; }
          80%  { transform: translate(680px, 140px) rotate(-430deg); opacity: 1; }
          100% { transform: translate(740px, 200px) rotate(-540deg); opacity: 0; }
        }

        @keyframes fly-miss {
          0%   { transform: translate(260px, 200px) rotate(0deg); opacity: 1; }
          25%  { transform: translate(420px, 80px) rotate(-150deg); opacity: 1; }
          60%  { transform: translate(620px, 50px) rotate(-380deg); opacity: 1; }
          100% { transform: translate(950px, 350px) rotate(-700deg); opacity: 0.2; }
        }

        /* Pin appear */
        .pin-appear-g {
          animation: pin-pop 0.3s ease-out both;
        }
        @keyframes pin-pop {
          0%   { opacity: 0; transform: translate(var(--x, 0), -10px) scale(0.8); }
          100% { opacity: 1; transform: translate(var(--x, 0), 0) scale(1); }
        }

        /* Pin scatter on strike */
        .pin-scatter-g {
          animation: pin-fly-out 0.6s cubic-bezier(0.15, 0.8, 0.25, 1) both;
        }
        @keyframes pin-fly-out {
          0%   { opacity: 1; }
          100% { opacity: 0.7; }
        }

        /* Impact */
        .impact-fx {
          animation: impact-pop 0.5s ease-out both;
        }
        @keyframes impact-pop {
          0%   { opacity: 0; transform: scale(0.5); }
          50%  { opacity: 1; transform: scale(1.2); }
          100% { opacity: 0.8; transform: scale(1); }
        }

        /* STRIKE text in SVG */
        .strike-svg-text {
          font-family: 'Bebas Neue', var(--font-playfair), sans-serif;
          font-size: 40px;
          fill: #FF6B00;
          opacity: 0;
          letter-spacing: 6px;
          animation: strike-pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.15s forwards;
        }
        @keyframes strike-pop {
          0%   { opacity: 0; transform: rotate(-12deg) scale(0); }
          60%  { opacity: 0.35; transform: rotate(-12deg) scale(1.2); }
          100% { opacity: 0.3; transform: rotate(-12deg) scale(1); }
        }

        /* Miss label */
        .miss-label {
          position: absolute;
          top: 25%;
          right: 15%;
          font-family: var(--font-playfair);
          font-size: 28px;
          font-weight: 700;
          font-style: italic;
          color: rgba(255,255,255,0.3);
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
          z-index: 20;
          animation: pop-in 0.35s ease-out forwards;
        }
        @media (min-width: 640px) { .miss-label { font-size: 36px; } }
        @keyframes pop-in {
          0%   { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
