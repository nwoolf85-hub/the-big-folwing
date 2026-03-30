"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

export default function HeroBanner() {
  const [throwState, setThrowState] = useState<"ready" | "throwing" | "hit" | "miss">("ready");
  const [cycle, setCycle] = useState(0);
  const [pinSeeds, setPinSeeds] = useState<number[]>([]);

  // Generate random seeds for pin scatter directions each cycle
  useEffect(() => {
    setPinSeeds(Array.from({ length: 10 }, () => Math.random()));
  }, [cycle]);

  const startCycle = useCallback(() => {
    setThrowState("ready");

    const t1 = setTimeout(() => setThrowState("throwing"), 1400);
    const t2 = setTimeout(() => {
      setThrowState(Math.random() > 0.4 ? "hit" : "miss"); // 60% strikes
    }, 2600);
    const t3 = setTimeout(() => setCycle((c) => c + 1), 4800);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  useEffect(() => {
    const cleanup = startCycle();
    return cleanup;
  }, [cycle, startCycle]);

  return (
    <div className="hero-banner">
      {/* Wolf mascot — real image */}
      <div className="wolf-container">
        <Image
          src="/wolf-mascot-scene.png"
          alt="The Big Folwing Wolf"
          width={280}
          height={280}
          className={`wolf-img ${throwState === "throwing" ? "wolf-throwing" : ""}`}
          priority
        />
      </div>

      {/* Football */}
      <div className={`fb fb-${throwState}`}>
        <svg viewBox="0 0 44 28" className="fb-svg">
          <ellipse cx="22" cy="14" rx="20" ry="12" fill="#6B3410" />
          <ellipse cx="22" cy="14" rx="18" ry="11" fill="#8B4513" />
          <ellipse cx="22" cy="13" rx="16" ry="9" fill="#A0522D" />
          <line x1="22" y1="4" x2="22" y2="24" stroke="#fff" strokeWidth="1.5" />
          <path d="M 16 7 L 18 9.5 M 16 11 L 18 13.5 M 16 15 L 18 17.5" stroke="#fff" strokeWidth="1" strokeLinecap="round" />
          <path d="M 26 7 L 28 9.5 M 26 11 L 28 13.5 M 26 15 L 28 17.5" stroke="#fff" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </div>

      {/* Pins */}
      <div className="pins-area">
        {[...Array(10)].map((_, i) => {
          const row = i < 1 ? 0 : i < 3 ? 1 : i < 6 ? 2 : 3;
          const col = i < 1 ? 0 : i < 3 ? i - 1 : i < 6 ? i - 3 : i - 6;
          const rowWidth = row === 0 ? 1 : row === 1 ? 2 : row === 2 ? 3 : 4;
          const xOff = (col - (rowWidth - 1) / 2) * 30;
          const yOff = row * 24 - 36;

          const seed = pinSeeds[i] ?? 0.5;
          const angle = (seed - 0.5) * 140;
          const dx = (seed > 0.5 ? 1 : -1) * (15 + seed * 35);
          const dy = -(25 + seed * 45);
          const delay = seed * 0.25;

          return (
            <div
              key={`${cycle}-${i}`}
              className={`pin ${throwState === "hit" ? "pin-scatter" : ""} ${throwState === "ready" ? "pin-appear" : ""}`}
              style={{
                left: `calc(50% + ${xOff}px)`,
                top: `calc(50% + ${yOff}px)`,
                animationDelay: `${delay}s`,
                // @ts-expect-error CSS custom properties
                "--scatter-rot": `${angle}deg`,
                "--scatter-x": `${dx}px`,
                "--scatter-y": `${dy}px`,
              }}
            >
              <svg viewBox="0 0 16 40" className="pin-svg">
                <ellipse cx="8" cy="36" rx="7" ry="4" fill="#ccc" />
                <rect x="3" y="20" width="10" height="16" rx="3" fill="#f0f0f0" />
                <path d="M 4 20 Q 8 13 12 20" fill="#f0f0f0" />
                <ellipse cx="8" cy="11" rx="5.5" ry="7" fill="#fff" />
                <rect x="3.5" y="17" width="9" height="2.5" rx="1" fill="#cc0000" />
                <rect x="4" y="22" width="8" height="2" rx="1" fill="#cc0000" />
              </svg>
            </div>
          );
        })}
      </div>

      {/* Impact flash */}
      {throwState === "hit" && <div className="impact-flash" />}

      {/* Result text */}
      {throwState === "hit" && (
        <div className="result-text strike">STRIKE!</div>
      )}
      {throwState === "miss" && (
        <div className="result-text gutter">Gutter Ball!</div>
      )}

      {/* Bottom title bar */}
      <div className="banner-bottom">
        <span>THE BIG FOLWING</span>
      </div>

      <style>{`
        .hero-banner {
          width: 100%;
          height: 260px;
          background: #000;
          position: relative;
          overflow: hidden;
          border-bottom: 3px solid #C4A265;
        }
        @media (min-width: 640px) {
          .hero-banner { height: 300px; }
        }
        @media (min-width: 1024px) {
          .hero-banner { height: 340px; }
        }

        /* Subtle radial glow behind the action */
        .hero-banner::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -55%);
          width: 600px;
          height: 400px;
          background: radial-gradient(ellipse, rgba(196,162,101,0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Wolf image */
        .wolf-container {
          position: absolute;
          left: 3%;
          bottom: 20px;
          z-index: 10;
        }
        @media (min-width: 640px) {
          .wolf-container { left: 6%; bottom: 15px; }
        }
        @media (min-width: 1024px) {
          .wolf-container { left: 10%; }
        }
        .wolf-img {
          width: 150px;
          height: 150px;
          object-fit: contain;
          filter: drop-shadow(0 0 20px rgba(196,162,101,0.2));
          transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        @media (min-width: 640px) {
          .wolf-img { width: 200px; height: 200px; }
        }
        @media (min-width: 1024px) {
          .wolf-img { width: 250px; height: 250px; }
        }
        .wolf-throwing {
          transform: rotate(-6deg) scale(1.03);
        }

        /* Football */
        .fb {
          position: absolute;
          width: 32px;
          height: 20px;
          z-index: 12;
          opacity: 0;
        }
        @media (min-width: 640px) {
          .fb { width: 38px; height: 24px; }
        }
        .fb-svg {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 3px 8px rgba(0,0,0,0.6));
        }
        .fb-ready {
          left: 22%;
          bottom: 55%;
          opacity: 0;
        }
        .fb-throwing {
          animation: fb-arc 1.2s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
        }
        .fb-hit {
          opacity: 0;
        }
        .fb-miss {
          animation: fb-miss 1.0s ease-out forwards;
        }

        @keyframes fb-arc {
          0%   { left: 22%; bottom: 55%; opacity: 1; transform: rotate(0deg); }
          25%  { left: 38%; bottom: 75%; opacity: 1; transform: rotate(-150deg); }
          55%  { left: 55%; bottom: 65%; opacity: 1; transform: rotate(-320deg); }
          100% { left: 68%; bottom: 48%; opacity: 1; transform: rotate(-540deg); }
        }

        @keyframes fb-miss {
          0%   { left: 22%; bottom: 55%; opacity: 1; transform: rotate(0deg); }
          30%  { left: 40%; bottom: 78%; opacity: 1; transform: rotate(-200deg); }
          100% { left: 88%; bottom: 10%; opacity: 0.3; transform: rotate(-650deg); }
        }

        /* Pins */
        .pins-area {
          position: absolute;
          right: 12%;
          bottom: 40px;
          width: 130px;
          height: 110px;
          z-index: 8;
        }
        @media (min-width: 640px) {
          .pins-area { right: 16%; width: 140px; height: 120px; bottom: 45px; }
        }
        @media (min-width: 1024px) {
          .pins-area { right: 20%; width: 150px; height: 130px; }
        }
        .pin {
          position: absolute;
          width: 16px;
          height: 40px;
          transform-origin: bottom center;
        }
        .pin-svg {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 2px 5px rgba(0,0,0,0.5));
        }
        .pin-appear {
          animation: pin-pop 0.35s ease-out forwards;
        }
        .pin-scatter {
          animation: pin-fly 0.55s cubic-bezier(0.15, 0.8, 0.25, 1) forwards;
        }

        @keyframes pin-pop {
          0%   { opacity: 0; transform: translateY(-12px) scale(0.8); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes pin-fly {
          0%   { transform: rotate(0deg) translate(0, 0); opacity: 1; }
          30%  { opacity: 1; }
          100% { transform: rotate(var(--scatter-rot)) translate(var(--scatter-x), var(--scatter-y)); opacity: 0; }
        }

        /* Impact flash */
        .impact-flash {
          position: absolute;
          right: 15%;
          bottom: 35%;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(196,162,101,0.4) 0%, transparent 70%);
          animation: flash-pop 0.4s ease-out forwards;
          z-index: 7;
          pointer-events: none;
        }
        @keyframes flash-pop {
          0%   { transform: scale(0); opacity: 1; }
          50%  { transform: scale(1.5); opacity: 0.8; }
          100% { transform: scale(2); opacity: 0; }
        }

        /* Result text */
        .result-text {
          position: absolute;
          top: 22%;
          left: 50%;
          z-index: 20;
          font-family: var(--font-playfair);
          font-weight: 900;
          letter-spacing: 3px;
          animation: text-boom 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          pointer-events: none;
        }
        .strike {
          font-size: 36px;
          color: #C4A265;
          text-shadow: 0 0 40px rgba(196,162,101,0.5), 0 0 80px rgba(196,162,101,0.2), 0 4px 12px rgba(0,0,0,0.8);
        }
        .gutter {
          font-size: 26px;
          color: rgba(255,255,255,0.45);
          font-style: italic;
          text-shadow: 0 3px 10px rgba(0,0,0,0.7);
          letter-spacing: 1px;
        }
        @media (min-width: 640px) {
          .strike { font-size: 52px; }
          .gutter { font-size: 34px; }
        }
        @media (min-width: 1024px) {
          .strike { font-size: 64px; }
          .gutter { font-size: 40px; }
        }

        @keyframes text-boom {
          0%   { transform: translate(-50%, -50%) scale(0) rotate(-8deg); opacity: 0; }
          50%  { transform: translate(-50%, -50%) scale(1.2) rotate(3deg); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 1; }
        }

        /* Bottom title */
        .banner-bottom {
          position: absolute;
          bottom: 8px;
          left: 0;
          right: 0;
          text-align: center;
          z-index: 15;
          pointer-events: none;
        }
        .banner-bottom span {
          font-family: var(--font-playfair);
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 10px;
          color: rgba(196,162,101,0.3);
          text-transform: uppercase;
        }
        @media (min-width: 640px) {
          .banner-bottom span { font-size: 14px; letter-spacing: 14px; }
        }
      `}</style>
    </div>
  );
}
