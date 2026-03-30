"use client";

import { useEffect, useState } from "react";

export default function HeroBanner() {
  const [throwState, setThrowState] = useState<"ready" | "throwing" | "hit" | "miss">("ready");
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const sequence = () => {
      setThrowState("ready");

      const throwTimer = setTimeout(() => {
        setThrowState("throwing");
      }, 1200);

      const resultTimer = setTimeout(() => {
        // 70% strikes, 30% misses
        const isHit = Math.random() > 0.3;
        setThrowState(isHit ? "hit" : "miss");
      }, 2400);

      const resetTimer = setTimeout(() => {
        setCycle((c) => c + 1);
      }, 4200);

      return () => {
        clearTimeout(throwTimer);
        clearTimeout(resultTimer);
        clearTimeout(resetTimer);
      };
    };

    const cleanup = sequence();
    return cleanup;
  }, [cycle]);

  return (
    <div className="hero-banner">
      {/* Wolf */}
      <div className={`wolf ${throwState === "throwing" ? "wolf-throw" : ""}`}>
        <div className="wolf-body">
          {/* Wolf head */}
          <svg viewBox="0 0 120 120" className="wolf-svg">
            {/* Ears */}
            <polygon points="25,35 35,5 48,30" fill="#C4A265" />
            <polygon points="72,30 85,5 95,35" fill="#C4A265" />
            <polygon points="30,33 38,12 46,30" fill="#1B2D45" />
            <polygon points="74,30 82,12 90,33" fill="#1B2D45" />
            {/* Head */}
            <ellipse cx="60" cy="55" rx="38" ry="35" fill="#C4A265" />
            {/* Face darker */}
            <ellipse cx="60" cy="58" rx="30" ry="28" fill="#a8863e" />
            {/* Eyes */}
            <ellipse cx="45" cy="48" rx="6" ry="7" fill="#fff" />
            <ellipse cx="75" cy="48" rx="6" ry="7" fill="#fff" />
            <circle cx="46" cy="47" r="3.5" fill="#0D1B2A" />
            <circle cx="76" cy="47" r="3.5" fill="#0D1B2A" />
            <circle cx="47" cy="46" r="1.2" fill="#fff" />
            <circle cx="77" cy="46" r="1.2" fill="#fff" />
            {/* Sunglasses */}
            <rect x="33" y="41" width="22" height="14" rx="4" fill="#0D1B2A" opacity="0.85" />
            <rect x="65" y="41" width="22" height="14" rx="4" fill="#0D1B2A" opacity="0.85" />
            <line x1="55" y1="48" x2="65" y2="48" stroke="#0D1B2A" strokeWidth="2" />
            {/* Orange lens reflection */}
            <rect x="36" y="43" width="8" height="4" rx="2" fill="#E8740C" opacity="0.6" />
            <rect x="68" y="43" width="8" height="4" rx="2" fill="#E8740C" opacity="0.6" />
            {/* Snout */}
            <ellipse cx="60" cy="68" rx="14" ry="10" fill="#e8c49a" />
            <ellipse cx="60" cy="64" rx="6" ry="4" fill="#1A1A1A" />
            {/* Mouth / grin */}
            <path d="M 48 72 Q 54 80 60 72 Q 66 80 72 72" stroke="#1A1A1A" strokeWidth="1.5" fill="none" />
            {/* Mane / fluff */}
            <ellipse cx="28" cy="60" rx="10" ry="18" fill="#C4A265" opacity="0.6" />
            <ellipse cx="92" cy="60" rx="10" ry="18" fill="#C4A265" opacity="0.6" />
          </svg>
          {/* Wolf arm — throwing motion */}
          <div className={`wolf-arm ${throwState === "throwing" ? "arm-throw" : "arm-ready"}`}>
            <svg viewBox="0 0 60 20" className="arm-svg">
              <path d="M 0 10 Q 20 2 40 8 Q 50 10 58 6" stroke="#a8863e" strokeWidth="6" fill="none" strokeLinecap="round" />
              {/* Paw */}
              <circle cx="56" cy="6" r="5" fill="#C4A265" />
            </svg>
          </div>
        </div>
      </div>

      {/* Football */}
      <div className={`football ${throwState === "throwing" ? "football-fly" : ""} ${throwState === "hit" ? "football-hit" : ""} ${throwState === "miss" ? "football-miss" : ""} ${throwState === "ready" ? "football-ready" : ""}`}>
        <svg viewBox="0 0 40 24" className="football-svg">
          <ellipse cx="20" cy="12" rx="18" ry="10" fill="#8B4513" />
          <ellipse cx="20" cy="12" rx="16" ry="9" fill="#A0522D" />
          <line x1="20" y1="3" x2="20" y2="21" stroke="#fff" strokeWidth="1.2" />
          <path d="M 14 6 L 16 8 M 14 10 L 16 12 M 14 14 L 16 16" stroke="#fff" strokeWidth="0.8" />
          <path d="M 24 6 L 26 8 M 24 10 L 26 12 M 24 14 L 26 16" stroke="#fff" strokeWidth="0.8" />
        </svg>
      </div>

      {/* Pins */}
      <div className="pins-group">
        {[...Array(10)].map((_, i) => {
          const row = i < 1 ? 0 : i < 3 ? 1 : i < 6 ? 2 : 3;
          const col = i < 1 ? 0 : i < 3 ? i - 1 : i < 6 ? i - 3 : i - 6;
          const rowWidth = row === 0 ? 1 : row === 1 ? 2 : row === 2 ? 3 : 4;
          const x = (col - (rowWidth - 1) / 2) * 28;
          const y = row * 22 - 30;

          // Randomize which pins get hit
          const hitDelay = Math.random() * 0.3;
          const hitAngle = (Math.random() - 0.5) * 120;
          const hitDistance = 10 + Math.random() * 30;

          return (
            <div
              key={i}
              className={`pin ${throwState === "hit" ? "pin-hit" : ""} ${throwState === "ready" ? "pin-reset" : ""}`}
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                animationDelay: throwState === "hit" ? `${hitDelay}s` : "0s",
                // @ts-expect-error CSS custom properties
                "--hit-angle": `${hitAngle}deg`,
                "--hit-x": `${hitDistance * (Math.random() > 0.5 ? 1 : -1)}px`,
                "--hit-y": `${-20 - Math.random() * 40}px`,
              }}
            >
              <svg viewBox="0 0 14 36" className="pin-svg">
                {/* Pin body */}
                <ellipse cx="7" cy="32" rx="6" ry="4" fill="#ddd" />
                <rect x="3" y="18" width="8" height="14" rx="2" fill="#f5f5f5" />
                <path d="M 4 18 Q 7 12 10 18" fill="#f5f5f5" />
                <ellipse cx="7" cy="10" rx="5" ry="6" fill="#fff" />
                {/* Red stripes */}
                <rect x="3.5" y="15" width="7" height="2" rx="1" fill="#cc0000" />
                <rect x="4" y="19" width="6" height="1.5" rx="0.5" fill="#cc0000" />
              </svg>
            </div>
          );
        })}
      </div>

      {/* Strike text */}
      {throwState === "hit" && (
        <div className="strike-text">STRIKE!</div>
      )}
      {throwState === "miss" && (
        <div className="miss-text">Gutter Ball!</div>
      )}

      {/* Title overlay */}
      <div className="banner-title">
        <span className="banner-title-text">THE BIG FOLWING</span>
      </div>

      <style>{`
        .hero-banner {
          width: 100%;
          height: 280px;
          background: linear-gradient(135deg, #0D1B2A 0%, #1B2D45 50%, #0D1B2A 100%);
          position: relative;
          overflow: hidden;
          border-bottom: 3px solid #C4A265;
        }

        /* Subtle grid lines like a sports field */
        .hero-banner::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(196,162,101,0.03) 80px, rgba(196,162,101,0.03) 81px),
            repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(196,162,101,0.03) 40px, rgba(196,162,101,0.03) 41px);
        }

        /* Ground line */
        .hero-banner::after {
          content: '';
          position: absolute;
          bottom: 50px;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent 5%, rgba(196,162,101,0.15) 20%, rgba(196,162,101,0.25) 50%, rgba(196,162,101,0.15) 80%, transparent 95%);
        }

        /* Wolf */
        .wolf {
          position: absolute;
          left: 8%;
          bottom: 50px;
          width: 100px;
          height: 100px;
          z-index: 10;
          transition: transform 0.3s ease;
        }
        .wolf-throw {
          transform: rotate(-8deg);
        }
        .wolf-body {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .wolf-svg {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 4px 12px rgba(0,0,0,0.5));
        }
        .wolf-arm {
          position: absolute;
          right: -15px;
          top: 55%;
          width: 60px;
          height: 20px;
          transform-origin: left center;
          transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .arm-ready {
          transform: rotate(20deg);
        }
        .arm-throw {
          transform: rotate(-60deg);
        }
        .arm-svg {
          width: 100%;
          height: 100%;
        }

        /* Football */
        .football {
          position: absolute;
          width: 36px;
          height: 22px;
          z-index: 8;
          opacity: 0;
        }
        .football-svg {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 2px 6px rgba(0,0,0,0.4));
        }
        .football-ready {
          left: 15%;
          bottom: 110px;
          opacity: 0;
        }
        .football-fly {
          animation: football-arc 1.2s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
          opacity: 1;
        }
        .football-hit {
          left: 72%;
          bottom: 95px;
          opacity: 0;
        }
        .football-miss {
          animation: football-miss-arc 1s ease-out forwards;
          opacity: 1;
        }

        @keyframes football-arc {
          0% { left: 18%; bottom: 120px; opacity: 1; transform: rotate(0deg); }
          30% { left: 40%; bottom: 200px; opacity: 1; transform: rotate(-180deg); }
          60% { left: 60%; bottom: 160px; opacity: 1; transform: rotate(-360deg); }
          100% { left: 72%; bottom: 100px; opacity: 1; transform: rotate(-540deg); }
        }

        @keyframes football-miss-arc {
          0% { left: 18%; bottom: 120px; opacity: 1; transform: rotate(0deg); }
          30% { left: 40%; bottom: 210px; opacity: 1; transform: rotate(-180deg); }
          70% { left: 65%; bottom: 180px; opacity: 1; transform: rotate(-400deg); }
          100% { left: 85%; bottom: 20px; opacity: 0.5; transform: rotate(-600deg); }
        }

        /* Pins */
        .pins-group {
          position: absolute;
          right: 15%;
          bottom: 55px;
          width: 120px;
          height: 100px;
          z-index: 5;
        }
        .pin {
          position: absolute;
          width: 14px;
          height: 36px;
          transform-origin: bottom center;
          transition: opacity 0.3s ease;
        }
        .pin-svg {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
        }
        .pin-reset {
          animation: pin-appear 0.4s ease-out forwards;
        }
        .pin-hit {
          animation: pin-fly 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        @keyframes pin-fly {
          0% { transform: rotate(0deg) translate(0, 0); opacity: 1; }
          40% { opacity: 1; }
          100% {
            transform: rotate(var(--hit-angle)) translate(var(--hit-x), var(--hit-y));
            opacity: 0;
          }
        }

        @keyframes pin-appear {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        /* Strike / Miss text */
        .strike-text {
          position: absolute;
          top: 30%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0);
          font-family: var(--font-playfair);
          font-size: 48px;
          font-weight: 900;
          color: #C4A265;
          text-shadow: 0 0 30px rgba(196,162,101,0.6), 0 4px 12px rgba(0,0,0,0.5);
          animation: pop-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          z-index: 20;
          letter-spacing: 4px;
        }
        .miss-text {
          position: absolute;
          top: 30%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0);
          font-family: var(--font-playfair);
          font-size: 32px;
          font-weight: 700;
          font-style: italic;
          color: rgba(255,255,255,0.5);
          text-shadow: 0 2px 8px rgba(0,0,0,0.5);
          animation: pop-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          z-index: 20;
        }

        @keyframes pop-in {
          0% { transform: translate(-50%, -50%) scale(0) rotate(-5deg); }
          60% { transform: translate(-50%, -50%) scale(1.15) rotate(2deg); }
          100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
        }

        /* Title */
        .banner-title {
          position: absolute;
          bottom: 10px;
          left: 0;
          right: 0;
          text-align: center;
          z-index: 15;
        }
        .banner-title-text {
          font-family: var(--font-playfair);
          font-size: 14px;
          font-weight: 900;
          letter-spacing: 8px;
          color: rgba(196,162,101,0.4);
          text-transform: uppercase;
        }

        @media (min-width: 768px) {
          .hero-banner {
            height: 340px;
          }
          .wolf {
            width: 130px;
            height: 130px;
            left: 10%;
          }
          .pins-group {
            right: 18%;
            width: 140px;
            height: 120px;
          }
          .strike-text {
            font-size: 64px;
          }
          .banner-title-text {
            font-size: 16px;
            letter-spacing: 12px;
          }
        }
      `}</style>
    </div>
  );
}
