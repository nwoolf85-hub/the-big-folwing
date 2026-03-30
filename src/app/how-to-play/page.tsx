import Image from "next/image";

const steps = [
  { num: 1, title: "Sign the Waiver & Pay", desc: "Quick digital waiver on the iPad + $10 card payment. Takes 60 seconds. Then you're in." },
  { num: 2, title: "Pick Your Team", desc: "Play 1-on-1, 2-on-2, or doubles. Teams stand at opposite ends of the lane, each behind their own set of 10 pins." },
  { num: 3, title: "Coin Toss", desc: "Flip a coin to decide who throws first. Winner chooses." },
  { num: 4, title: "Throw!", desc: "Stand behind your lane and throw the football at your opponent's pins 32 feet away. Any throwing style — overhand, spiral, lob, whatever works. You have 20 seconds per throw." },
  { num: 5, title: "Alternate Throws", desc: "Teams take turns throwing. If you're playing doubles, teammates alternate throws within your team." },
  { num: 6, title: "Knock 'Em All Down", desc: "First team to knock down all 10 of the opponent's pins wins the frame. Match is best 2 out of 3 frames." },
  { num: 7, title: "Celebrate", desc: "Pins down? You win. Now go buy a round and talk trash. That's the game." },
];

const rules = [
  { title: "Throw from behind your lane", desc: "Men throw from behind the back edge. Women throw from behind the front edge. Stay consistent each frame." },
  { title: "Same arm, every throw", desc: "Pick an arm and stick with it for the whole match. No switching." },
  { title: "20 seconds per throw", desc: "Step up, aim, throw. No stalling. Keep the game moving." },
  { title: "Don't touch the pins", desc: "No hands on pins during play. If you knock your own pins over — they stay down. Only the football does the work." },
  { title: "No interfering with the ball", desc: "Once the football is thrown, let it fly. No blocking, swatting, or catching." },
  { title: "Tied? Sudden death.", desc: "If both teams clear their pins at the same time — one pin each, coin toss for first throw, first to knock it down wins." },
  { title: "Best 2 out of 3", desc: "Win two frames and you win the match. Pins reset between frames." },
  { title: "Have fun", desc: "Sportsmanship, trash talk (friendly), and good vibes. If you're not laughing, you're doing it wrong." },
];

const gameStats = [
  { value: "10", label: "Bowling Pins" },
  { value: "1", label: "Football" },
  { value: "32 ft", label: "Throwing Distance" },
  { value: "2", label: "Teams" },
  { value: "$10", label: "To Play" },
];

export default function HowToPlay() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 sm:py-28 bg-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="/fowling-hero-impact.jpg" alt="" fill className="object-cover" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <Image
            src="/wolf-mascot-scene.png"
            alt="Wolf Mascot"
            width={120}
            height={120}
            className="mx-auto mb-6 rounded-xl"
          />
          <p className="text-gold text-xs tracking-[4px] uppercase font-bold mb-3">How to Play</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
            What Is Fowling?
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Football + Bowling Pins = The Game Nobody Knew They Needed
          </p>
        </div>
      </section>

      {/* Core concept */}
      <section className="bg-navy py-8">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-gold-light text-lg font-semibold">
            Throw a football. Knock down bowling pins. First team to clear all 10 pins wins.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-10">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-3 sm:grid-cols-5 gap-4">
          {gameStats.map((s) => (
            <div key={s.label} className="text-center bg-surface rounded-xl p-4 border-t-2 border-gold">
              <div className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl font-black text-gold">
                {s.value}
              </div>
              <div className="text-text-light text-[9px] sm:text-[10px] tracking-[2px] uppercase mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Step by Step */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-gold text-xs tracking-[4px] uppercase font-bold mb-3">Step by Step</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-black text-dark">
              How to Play
            </h2>
          </div>

          <div className="space-y-4">
            {steps.map((step) => (
              <div key={step.num} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-gold text-white font-bold text-lg flex items-center justify-center flex-shrink-0">
                  {step.num}
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="font-bold text-dark text-base mb-1">{step.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rules */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-gold text-xs tracking-[4px] uppercase font-bold mb-3">Official Rules</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-black text-dark">
              The Rules
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rules.map((rule) => (
              <div
                key={rule.title}
                className="bg-white rounded-xl p-5 border-l-4 border-l-gold"
              >
                <h3 className="font-bold text-dark text-sm mb-1">{rule.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{rule.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pro Tip */}
      <section className="bg-white py-10">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-cream border-l-4 border-gold rounded-r-xl p-6">
            <p className="text-text-muted text-sm leading-relaxed">
              <strong className="text-dark">Pro tip:</strong> Spirals are accurate but bounce off pins. Wobbly throws have more impact. The best throwers find the sweet spot between accuracy and chaos. Also — watch your shins. Pins fly back.
            </p>
          </div>
        </div>
      </section>

      {/* Lebowski quote */}
      <section className="bg-navy py-10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="font-[family-name:var(--font-playfair)] text-gold-light text-lg italic">
            &quot;Mark it zero if you step over the line.&quot;
          </p>
          <p className="text-white/30 text-[10px] tracking-[3px] uppercase mt-2">
            House Rule #1
          </p>
        </div>
      </section>
    </div>
  );
}
