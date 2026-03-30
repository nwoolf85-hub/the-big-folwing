"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

export default function HeroBanner() {
  const [phase, setPhase] = useState<"ready" | "windup" | "throw" | "strike" | "miss">("ready");
  const [cycle, setCycle] = useState(0);
  const [pinSeeds, setPinSeeds] = useState<number[]>([]);

  useEffect(() => {
    setPinSeeds(Array.from({ length: 10 }, () => Math.random()));
  }, [cycle]);

  const runCycle = useCallback(() => {
    setPhase("ready");
    const isStrike = Math.random() > 0.4; // 60% strikes

    const t1 = setTimeout(() => setPhase("windup"), 800);
    const t2 = setTimeout(() => setPhase("throw"), 1400);
    const t3 = setTimeout(() => setPhase(isStrike ? "strike" : "miss"), 2600);
    const t4 = setTimeout(() => setCycle((c) => c + 1), 4600);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  useEffect(() => {
    const cleanup = runCycle();
    return cleanup;
  }, [cycle, runCycle]);

  const isHit = phase === "strike";
  const isMiss = phase === "miss";
  const showResult = isHit || isMiss;

  return (
    <div className="folwing-banner">
      {/* THE WOLF — big, prominent, the star */}
      <div className={`the-wolf ${phase === "windup" ? "wolf-windup" : ""} ${phase === "throw" ? "wolf-release" : ""}`}>
        <Image
          src="/wolf-mascot-scene.png"
          alt="The Big Folwing Wolf"
          width={600}
          height={500}
          className="wolf-image"
          priority
        />
      </div>

      {/* FOOTBALL — flies from the wolf to the pins */}
      <div className={`the-ball ${phase === "throw" ? "ball-fly" : ""} ${isHit ? "ball-hit" : ""} ${isMiss ? "ball-miss" : ""}`}>
        <svg viewBox="0 0 48 30" className="ball-svg">
          <ellipse cx="24" cy="15" rx="22" ry="13" fill="#6B3410" />
          <ellipse cx="24" cy="14.5" rx="20" ry="12" fill="#8B4513" />
          <ellipse cx="24" cy="14" rx="18" ry="10.5" fill="#A0522D" />
          <line x1="24" y1="4" x2="24" y2="25" stroke="#fff" strokeWidth="1.8" />
          <path d="M 17 7 L 19.5 10 M 17 12 L 19.5 15 M 17 17 L 19.5 20" stroke="#fff" strokeWidth="1.1" strokeLinecap="round" />
          <path d="M 28.5 7 L 31 10 M 28.5 12 L 31 15 M 28.5 17 L 31 20" stroke="#fff" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
      </div>

      {/* PINS — right side, waiting to get wrecked */}
      <div className="the-pins">
        {[...Array(10)].map((_, i) => {
          const row = i < 1 ? 0 : i < 3 ? 1 : i < 6 ? 2 : 3;
          const col = i < 1 ? 0 : i < 3 ? i - 1 : i < 6 ? i - 3 : i - 6;
          const rowWidth = row === 0 ? 1 : row === 1 ? 2 : row === 2 ? 3 : 4;
          const xOff = (col - (rowWidth - 1) / 2) * 32;
          const yOff = row * 26;

          const s = pinSeeds[i] ?? 0.5;
          return (
            <div
              key={`${cycle}-${i}`}
              className={`a-pin ${isHit ? "pin-boom" : ""} ${phase === "ready" ? "pin-reset" : ""}`}
              style={{
                left: `calc(50% + ${xOff}px)`,
                top: `${yOff}px`,
                animationDelay: isHit ? `${s * 0.2}s` : `${s * 0.3}s`,
                // @ts-expect-error CSS custom properties
                "--fly-rot": `${(s - 0.5) * 160}deg`,
                "--fly-x": `${(s > 0.5 ? 1 : -1) * (20 + s * 40)}px`,
                "--fly-y": `${-(30 + s * 50)}px`,
              }}
            >
              <svg viewBox="0 0 18 44" className="pin-svg">
                <ellipse cx="9" cy="40" rx="8" ry="4" fill="#bbb" />
                <rect x="3" y="22" width="12" height="18" rx="3" fill="#eee" />
                <path d="M 4.5 22 Q 9 14 13.5 22" fill="#eee" />
                <ellipse cx="9" cy="12" rx="6" ry="8" fill="#fff" />
                <rect x="4" y="19" width="10" height="3" rx="1" fill="#cc0000" />
                <rect x="4.5" y="25" width="9" height="2" rx="1" fill="#cc0000" />
              </svg>
            </div>
          );
        })}
      </div>

      {/* RESULT TEXT */}
      {isHit && <div className="result-pop strike-pop">STRIKE!</div>}
      {isMiss && <div className="result-pop miss-pop">Gutter Ball!</div>}

      {/* Impact burst on strike */}
      {isHit && <div className="boom-burst" />}

      <style>{`
        .folwing-banner {
          width: 100%;
          height: 300px;
          background: #000;
          position: relative;
          overflow: hidden;
          border-bottom: 3px solid #C4A265;
        }
        @media (min-width: 640px) { .folwing-banner { height: 360px; } }
        @media (min-width: 1024px) { .folwing-banner { height: 400px; } }

        /* ============ THE WOLF ============ */
        .the-wolf {
          position: absolute;
          left: -2%;
          bottom: -10px;
          z-index: 10;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @media (min-width: 640px) { .the-wolf { left: 2%; } }
        @media (min-width: 1024px) { .the-wolf { left: 5%; } }

        .wolf-image {
          width: 260px;
          height: auto;
          filter: drop-shadow(0 0 30px rgba(196,162,101,0.15));
        }
        @media (min-width: 640px) { .wolf-image { width: 340px; } }
        @media (min-width: 1024px) { .wolf-image { width: 400px; } }

        .wolf-windup {
          transform: rotate(6deg) scale(1.02);
        }
        .wolf-release {
          transform: rotate(-8deg) scale(1.04);
          transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        /* ============ FOOTBALL ============ */
        .the-ball {
          position: absolute;
          width: 44px;
          height: 28px;
          z-index: 15;
          opacity: 0;
          pointer-events: none;
        }
        @media (min-width: 640px) { .the-ball { width: 50px; height: 32px; } }
        .ball-svg {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 4px 10px rgba(0,0,0,0.7));
        }
        .ball-fly {
          animation: ball-arc 1.2s cubic-bezier(0.2, 0.6, 0.3, 1) forwards;
        }
        .ball-hit { opacity: 0; }
        .ball-miss {
          animation: ball-whiff 1.0s ease-out forwards;
        }

        @keyframes ball-arc {
          0%   { left: 28%; top: 30%; opacity: 1; transform: rotate(0deg) scale(1); }
          20%  { left: 40%; top: 15%; opacity: 1; transform: rotate(-120deg) scale(0.95); }
          50%  { left: 58%; top: 12%; opacity: 1; transform: rotate(-280deg) scale(0.9); }
          85%  { left: 72%; top: 28%; opacity: 1; transform: rotate(-460deg) scale(0.85); }
          100% { left: 76%; top: 32%; opacity: 0; transform: rotate(-540deg) scale(0.8); }
        }
        @media (min-width: 640px) {
          @keyframes ball-arc {
            0%   { left: 32%; top: 28%; opacity: 1; transform: rotate(0deg); }
            20%  { left: 44%; top: 10%; opacity: 1; transform: rotate(-120deg); }
            50%  { left: 60%; top: 8%;  opacity: 1; transform: rotate(-280deg); }
            85%  { left: 74%; top: 25%; opacity: 1; transform: rotate(-460deg); }
            100% { left: 78%; top: 30%; opacity: 0; transform: rotate(-540deg); }
          }
        }

        @keyframes ball-whiff {
          0%   { left: 28%; top: 30%; opacity: 1; transform: rotate(0deg); }
          25%  { left: 42%; top: 10%; opacity: 1; transform: rotate(-160deg); }
          60%  { left: 62%; top: 5%;  opacity: 1; transform: rotate(-380deg); }
          100% { left: 92%; top: 60%; opacity: 0.2; transform: rotate(-700deg); }
        }
        @media (min-width: 640px) {
          @keyframes ball-whiff {
            0%   { left: 32%; top: 28%; opacity: 1; transform: rotate(0deg); }
            25%  { left: 48%; top: 8%;  opacity: 1; transform: rotate(-160deg); }
            60%  { left: 68%; top: 3%;  opacity: 1; transform: rotate(-380deg); }
            100% { left: 95%; top: 55%; opacity: 0.2; transform: rotate(-700deg); }
          }
        }

        /* ============ PINS ============ */
        .the-pins {
          position: absolute;
          right: 8%;
          top: 50%;
          transform: translateY(-50%);
          width: 140px;
          height: 120px;
          z-index: 8;
        }
        @media (min-width: 640px) {
          .the-pins { right: 12%; width: 150px; height: 130px; }
        }
        @media (min-width: 1024px) {
          .the-pins { right: 16%; width: 160px; height: 140px; }
        }

        .a-pin {
          position: absolute;
          width: 18px;
          height: 44px;
          transform-origin: bottom center;
        }
        .pin-svg {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 3px 6px rgba(0,0,0,0.5));
        }
        .pin-reset {
          animation: pin-stand 0.3s ease-out forwards;
        }
        .pin-boom {
          animation: pin-explode 0.5s cubic-bezier(0.15, 0.8, 0.25, 1) forwards;
        }

        @keyframes pin-stand {
          0%   { opacity: 0; transform: translateY(-15px) scale(0.7); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pin-explode {
          0%   { transform: rotate(0) translate(0, 0); opacity: 1; }
          25%  { opacity: 1; }
          100% { transform: rotate(var(--fly-rot)) translate(var(--fly-x), var(--fly-y)); opacity: 0; }
        }

        /* ============ BOOM BURST ============ */
        .boom-burst {
          position: absolute;
          right: 12%;
          top: 40%;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(196,162,101,0.5) 0%, rgba(196,162,101,0.1) 40%, transparent 70%);
          animation: burst 0.5s ease-out forwards;
          z-index: 7;
          pointer-events: none;
        }
        @keyframes burst {
          0%   { transform: translate(-50%, -50%) scale(0); opacity: 1; }
          60%  { transform: translate(-50%, -50%) scale(2); opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
        }

        /* ============ RESULT TEXT ============ */
        .result-pop {
          position: absolute;
          top: 15%;
          left: 55%;
          transform: translate(-50%, -50%) scale(0);
          font-family: var(--font-playfair);
          font-weight: 900;
          z-index: 20;
          pointer-events: none;
          animation: pop-boom 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .strike-pop {
          font-size: 42px;
          color: #C4A265;
          text-shadow:
            0 0 40px rgba(196,162,101,0.6),
            0 0 80px rgba(196,162,101,0.3),
            0 4px 16px rgba(0,0,0,0.9);
          letter-spacing: 5px;
        }
        .miss-pop {
          font-size: 28px;
          color: rgba(255,255,255,0.4);
          font-style: italic;
          text-shadow: 0 3px 12px rgba(0,0,0,0.8);
          letter-spacing: 2px;
        }
        @media (min-width: 640px) {
          .strike-pop { font-size: 58px; }
          .miss-pop { font-size: 36px; }
        }
        @media (min-width: 1024px) {
          .strike-pop { font-size: 72px; letter-spacing: 8px; }
          .miss-pop { font-size: 44px; }
        }

        @keyframes pop-boom {
          0%   { transform: translate(-50%, -50%) scale(0) rotate(-5deg); opacity: 0; }
          60%  { transform: translate(-50%, -50%) scale(1.15) rotate(2deg); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
