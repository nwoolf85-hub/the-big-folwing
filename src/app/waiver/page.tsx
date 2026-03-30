"use client";

import { useState, useRef } from "react";
import Image from "next/image";

type WaiverStep = "info" | "waiver" | "sign" | "done";

export default function Waiver() {
  const [step, setStep] = useState<WaiverStep>("info");
  const [isMinor, setIsMinor] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function clearSignature() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSigned(false);
  }

  function startDrawing(e: React.TouchEvent | React.MouseEvent) {
    setIsDrawing(true);
    setHasSigned(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#1A1A1A";
    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    ctx.beginPath();
    ctx.moveTo(x * scaleX, y * scaleY);
  }

  function draw(e: React.TouchEvent | React.MouseEvent) {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    ctx.lineTo(x * scaleX, y * scaleY);
    ctx.stroke();
  }

  function stopDrawing() {
    setIsDrawing(false);
  }

  function handleSubmitWaiver() {
    setStep("done");
  }

  // Completed screen
  if (step === "done") {
    return (
      <div className="kiosk-mode flex items-center justify-center bg-dark p-6">
        <div className="text-center max-w-md">
          <div className="text-7xl mb-6">🏈</div>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl font-black text-white mb-4">
            You&apos;re In!
          </h1>
          <p className="text-gold text-xl font-semibold mb-2">Waiver signed successfully.</p>
          <p className="text-white/50 text-base mb-8">
            Grab a football and get ready to throw. The pins are waiting.
          </p>
          <button
            onClick={() => {
              setStep("info");
              setHasSigned(false);
              setIsMinor(false);
              clearSignature();
            }}
            className="px-10 py-5 bg-gradient-to-r from-gold to-gold-dark text-dark font-bold rounded-2xl text-xl"
          >
            Next Player
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100dvh-4rem)] sm:min-h-[calc(100dvh-5rem)] flex flex-col">
      {/* Progress bar */}
      <div className="bg-dark px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-2">
          {(["info", "waiver", "sign"] as WaiverStep[]).map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                  step === s
                    ? "bg-gold text-dark"
                    : (["info", "waiver", "sign"].indexOf(step) > i)
                      ? "bg-green-500 text-white"
                      : "bg-white/10 text-white/40"
                }`}
              >
                {["info", "waiver", "sign"].indexOf(step) > i ? "✓" : i + 1}
              </div>
              {i < 2 && <div className="flex-1 h-0.5 bg-white/10 rounded" />}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 bg-cream flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-xl">

          {/* STEP 1: Player Info */}
          {step === "info" && (
            <div>
              <div className="text-center mb-8">
                <Image
                  src="/wolf-mascot-scene.png"
                  alt="Wolf"
                  width={80}
                  height={80}
                  className="mx-auto mb-4 rounded-xl"
                />
                <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-black text-dark mb-2">
                  Sign the Waiver
                </h1>
                <p className="text-text-muted">Quick form, then you throw.</p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep("waiver");
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="w-name" className="text-dark text-sm font-medium block mb-1">Full Name</label>
                    <input
                      id="w-name"
                      type="text"
                      required
                      className="w-full px-4 py-4 rounded-xl border border-gray-200 bg-white text-dark text-base focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="w-dob" className="text-dark text-sm font-medium block mb-1">Date of Birth</label>
                    <input
                      id="w-dob"
                      type="date"
                      required
                      className="w-full px-4 py-4 rounded-xl border border-gray-200 bg-white text-dark text-base focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="w-email" className="text-dark text-sm font-medium block mb-1">Email</label>
                    <input
                      id="w-email"
                      type="email"
                      required
                      className="w-full px-4 py-4 rounded-xl border border-gray-200 bg-white text-dark text-base focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold"
                      placeholder="you@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="w-phone" className="text-dark text-sm font-medium block mb-1">Phone</label>
                    <input
                      id="w-phone"
                      type="tel"
                      required
                      className="w-full px-4 py-4 rounded-xl border border-gray-200 bg-white text-dark text-base focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold"
                      placeholder="(512) 555-0000"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="w-ec-name" className="text-dark text-sm font-medium block mb-1">Emergency Contact</label>
                    <input
                      id="w-ec-name"
                      type="text"
                      required
                      className="w-full px-4 py-4 rounded-xl border border-gray-200 bg-white text-dark text-base focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold"
                      placeholder="Contact name"
                    />
                  </div>
                  <div>
                    <label htmlFor="w-ec-phone" className="text-dark text-sm font-medium block mb-1">Emergency Phone</label>
                    <input
                      id="w-ec-phone"
                      type="tel"
                      required
                      className="w-full px-4 py-4 rounded-xl border border-gray-200 bg-white text-dark text-base focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold"
                      placeholder="(512) 555-0000"
                    />
                  </div>
                </div>

                {/* Minor toggle */}
                <div className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-200">
                  <input
                    id="is-minor"
                    type="checkbox"
                    checked={isMinor}
                    onChange={(e) => setIsMinor(e.target.checked)}
                    className="w-5 h-5 accent-gold"
                  />
                  <label htmlFor="is-minor" className="text-dark text-sm font-medium">
                    Participant is under 18 (parent/guardian signing)
                  </label>
                </div>

                {isMinor && (
                  <div className="bg-white rounded-xl p-4 border border-gold/30 space-y-3">
                    <p className="text-gold text-xs tracking-[2px] uppercase font-bold">Minor Information</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="minor-name" className="text-dark text-xs font-medium block mb-1">Minor&apos;s Name</label>
                        <input
                          id="minor-name"
                          type="text"
                          required
                          className="w-full px-3 py-3 rounded-lg border border-gray-200 bg-surface text-dark text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                          placeholder="Minor's full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="minor-dob" className="text-dark text-xs font-medium block mb-1">Minor&apos;s DOB</label>
                        <input
                          id="minor-dob"
                          type="date"
                          required
                          className="w-full px-3 py-3 rounded-lg border border-gray-200 bg-surface text-dark text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-5 bg-gradient-to-r from-gold to-gold-dark text-dark font-bold rounded-xl text-xl"
                >
                  Continue →
                </button>
              </form>
            </div>
          )}

          {/* STEP 2: Waiver Text */}
          {step === "waiver" && (
            <div>
              <div className="text-center mb-6">
                <h1 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl font-black text-dark mb-2">
                  Liability Waiver
                </h1>
                <p className="text-text-muted text-sm">Please read carefully before signing</p>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 max-h-[50vh] overflow-y-auto text-sm text-text-muted leading-relaxed space-y-4 mb-6">
                <p className="font-bold text-dark text-xs uppercase tracking-wider text-center border-b border-gray-200 pb-3">
                  Release and Waiver of Liability, Assumption of Risk, and Indemnity Agreement
                </p>
                <p className="text-xs text-center text-text-light">The Big Folwing &bull; Woolf Ventures LLC &bull; Austin, Texas</p>

                <p><strong className="text-dark">PLEASE READ THIS DOCUMENT CAREFULLY BEFORE SIGNING.</strong> This is a legally binding agreement. By signing, you are waiving certain legal rights, including the right to sue for negligence.</p>

                <p><strong className="text-dark">1. Description of Activity:</strong> The Big Folwing is a recreational sporting activity in which participants throw regulation footballs at standard bowling pins on an elevated platform. The activity takes place at various venues including bars, restaurants, patios, parking lots, outdoor event spaces, and private properties in and around Austin, Texas.</p>

                <p><strong className="text-dark">2. Acknowledgment of Risks:</strong> Participant acknowledges that fowling involves inherent risks including being struck by footballs or ricocheting pins, tripping or falling on playing surfaces, muscle strains and musculoskeletal injuries, collisions with other participants or equipment, and injuries aggravated by alcohol consumption.</p>

                <div className="bg-amber-50 border-2 border-dark rounded-lg p-4">
                  <p className="font-bold text-dark text-xs uppercase">3. RELEASE OF LIABILITY FOR NEGLIGENCE</p>
                  <p className="mt-2 text-xs leading-relaxed">IN CONSIDERATION OF BEING PERMITTED TO PARTICIPATE IN FOWLING ACTIVITIES, PARTICIPANT HEREBY VOLUNTARILY RELEASES AND DISCHARGES THE RELEASED PARTIES FROM ANY AND ALL LIABILITY, INCLUDING CLAIMS ARISING FROM NEGLIGENCE, WHILE PARTICIPATING IN FOWLING ACTIVITIES OR WHILE ON THE PREMISES.</p>
                </div>

                <p><strong className="text-dark">4. Indemnification:</strong> Participant agrees to indemnify, defend, and hold harmless the Released Parties from any claims brought by third parties as a result of Participant&apos;s actions during fowling activities.</p>

                <p><strong className="text-dark">5. Alcohol Acknowledgment:</strong> Participant is solely responsible for their decision to consume alcohol. Participant agrees not to participate while intoxicated. The Released Parties reserve the right to refuse participation to any impaired person.</p>

                <p><strong className="text-dark">6. Medical Authorization:</strong> In an emergency, Participant authorizes the Released Parties to secure emergency medical treatment on their behalf.</p>

                <p><strong className="text-dark">7. Photo/Video Release:</strong> Participant grants permission to use their likeness in photographs, videos, and media for promotional purposes.</p>

                <p><strong className="text-dark">8. Venue Rules:</strong> Participant agrees to follow all rules, remain behind the throw line, not enter the pin area during play, and conduct themselves in a sportsmanlike manner.</p>

                <p><strong className="text-dark">9. Governing Law:</strong> This Agreement is governed by the laws of the State of Texas. Disputes shall be subject to courts in Travis County, Texas.</p>

                {isMinor && (
                  <div className="border border-gold/30 rounded-lg p-4 bg-gold/5">
                    <p className="font-bold text-dark text-xs uppercase mb-2">Parent/Guardian Consent for Minor</p>
                    <p className="text-xs">I, the parent/guardian, consent to the minor&apos;s participation and release the Released Parties from all claims, including claims for the minor&apos;s medical expenses, WHETHER CAUSED BY NEGLIGENCE OR OTHERWISE.</p>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep("info")}
                  className="px-6 py-4 border-2 border-gray-200 text-text-muted font-bold rounded-xl text-base"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setStep("sign")}
                  className="flex-1 py-4 bg-gradient-to-r from-gold to-gold-dark text-dark font-bold rounded-xl text-xl"
                >
                  I Agree — Sign Now
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Signature */}
          {step === "sign" && (
            <div>
              <div className="text-center mb-6">
                <h1 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl font-black text-dark mb-2">
                  Sign Below
                </h1>
                <p className="text-text-muted text-sm">Use your finger or stylus</p>
              </div>

              <div className="bg-white rounded-2xl border-2 border-gray-200 p-2 mb-4">
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={200}
                  className="w-full h-[150px] sm:h-[180px] rounded-xl bg-surface cursor-crosshair touch-none"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                />
              </div>

              <div className="flex gap-3 mb-6">
                <button
                  onClick={clearSignature}
                  className="px-6 py-3 border border-gray-200 text-text-muted font-medium rounded-xl text-sm"
                >
                  Clear
                </button>
                <button
                  onClick={() => setStep("waiver")}
                  className="px-6 py-3 border border-gray-200 text-text-muted font-medium rounded-xl text-sm"
                >
                  ← Back
                </button>
              </div>

              <button
                onClick={handleSubmitWaiver}
                disabled={!hasSigned}
                className={`w-full py-5 font-bold rounded-xl text-xl transition-all ${
                  hasSigned
                    ? "bg-gradient-to-r from-gold to-gold-dark text-dark"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {hasSigned ? "Submit Waiver ✓" : "Sign above to continue"}
              </button>

              <p className="text-center text-text-light text-xs mt-3">
                By signing, you confirm you have read and agree to the full waiver above.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
