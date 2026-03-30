import Image from "next/image";
import Link from "next/link";

const stats = [
  { value: "0", label: "Competitors in ATX" },
  { value: "300+", label: "Outdoor Days/Year" },
  { value: "<$500", label: "Launch Cost" },
  { value: "$100K+", label: "Year 1 Potential" },
];

const features = [
  {
    icon: "🏈",
    title: "Dead Simple Rules",
    desc: "Throw a football at 10 bowling pins 30 feet away. Knock them all down. No shoes, no rented balls, no lane reservations.",
  },
  {
    icon: "🍻",
    title: "Built for Bars & Patios",
    desc: "One lane = 10 ft x 40 ft. Works on patios, parking lots, warehouses, backyards. Players drink while they play.",
  },
  {
    icon: "📸",
    title: "Instantly Viral",
    desc: "Every throw gets filmed. Gutter balls are as entertaining as strikes. Free social media marketing — every player becomes a promoter.",
  },
  {
    icon: "💰",
    title: "$10 Per Player",
    desc: "Impulse price point. Groups of 4–8 per round. $40–80 per group, multiple groups per hour. Pure incremental revenue.",
  },
];

const tiers = [
  {
    name: "Bar Night",
    desc: "Weekly slow-night activation. I bring the equipment, you bring the crowd.",
    price: "$200–$400/night",
    details: "20–30 players at $10/each. 2x per week.",
  },
  {
    name: "Equipment Rental",
    desc: "Frat houses, tailgates, corporate picnics. Drop off and pick up.",
    price: "$150–$300/rental",
    details: "Self-service with setup instructions.",
  },
  {
    name: "Staffed Events",
    desc: "Private parties, corporate team building, festivals. Full service with a game manager.",
    price: "$500–$2,000",
    details: "Includes equipment, staffing, and tournament management.",
  },
];

const revenue = [
  { type: "Bar Night", players: "20–30", price: "$10/pp", revenue: "$200–$300", freq: "2x/week" },
  { type: "Weekend Event", players: "40–60", price: "$10/pp", revenue: "$400–$600", freq: "1–2x/week" },
  { type: "Private Party", players: "15–30", price: "Flat rate", revenue: "$500–$1,000", freq: "2–4x/mo" },
  { type: "Corporate", players: "30–80", price: "$25–50/pp", revenue: "$750–$4,000", freq: "1–2x/mo" },
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/fowling-warehouse-lanes.jpg"
          alt="Fowling lanes"
          fill
          className="object-cover object-[center_40%]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/20 via-dark/50 to-dark/95" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <Image
            src="/wolf-mascot-scene.png"
            alt="The Big Folwing Wolf Mascot"
            width={160}
            height={160}
            className="mx-auto mb-6 rounded-2xl animate-float"
          />
          <p className="text-gold text-xs sm:text-sm tracking-[6px] uppercase font-bold mb-4">
            Woolf Ventures LLC Presents
          </p>
          <h1 className="font-[family-name:var(--font-playfair)] text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-[0.95] mb-4">
            THE BIG<br />FOLWING
          </h1>
          <p className="font-[family-name:var(--font-playfair)] text-gold text-xl sm:text-2xl italic mb-6">
            &quot;The Pins Abide.&quot;
          </p>
          <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            Football meets bowling pins. A mobile entertainment concept built for Austin&apos;s bars, patios, and private events.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-gold to-gold-dark text-dark font-bold rounded-xl text-lg hover:shadow-[0_0_30px_rgba(196,162,101,0.3)] transition-all"
            >
              Book an Event
            </Link>
            <Link
              href="/how-to-play"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-gold/40 text-gold font-bold rounded-xl text-lg hover:bg-gold/10 transition-all"
            >
              How to Play
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-navy py-8">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-black text-gold">
                {stat.value}
              </div>
              <div className="text-white/50 text-[10px] sm:text-xs tracking-[2px] uppercase mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What Is Folwing */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-gold text-xs tracking-[4px] uppercase font-bold mb-3">The Concept</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-black text-dark mb-3">
              Throw a Football. Knock Down Pins.
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Pins fly. People lose their minds. Friends film everything. Welcome to the game nobody knew they needed.
            </p>
          </div>

          {/* Hero photo */}
          <div className="relative rounded-2xl overflow-hidden mb-12">
            <Image
              src="/fowling-hero-impact.jpg"
              alt="Football about to strike pins"
              width={1200}
              height={500}
              className="w-full h-[300px] sm:h-[400px] object-cover object-[center_45%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <h3 className="font-[family-name:var(--font-playfair)] text-xl sm:text-2xl font-black text-white mb-1">
                It&apos;s That Simple.
              </h3>
              <p className="text-white/70 text-sm">
                No experience needed. Just grab a football and let it fly.
              </p>
            </div>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-surface border border-gray-100 rounded-xl p-6 border-l-4 border-l-gold hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl mb-2">{f.icon}</div>
                <h3 className="font-bold text-dark text-lg mb-1">{f.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Tiers */}
      <section className="py-16 sm:py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-gold text-xs tracking-[4px] uppercase font-bold mb-3">Services</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-black text-dark mb-3">
              Three Ways to Play
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all group"
              >
                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-dark mb-2">
                  {tier.name}
                </h3>
                <p className="text-text-muted text-sm mb-4 leading-relaxed">{tier.desc}</p>
                <div className="font-[family-name:var(--font-playfair)] text-2xl font-black text-gold mb-2">
                  {tier.price}
                </div>
                <p className="text-text-light text-xs">{tier.details}</p>
                <Link
                  href="/book"
                  className="mt-6 inline-flex items-center text-gold font-semibold text-sm group-hover:translate-x-1 transition-transform"
                >
                  Book Now →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Revenue Projections — the pitch closer */}
      <section className="py-16 sm:py-24 bg-navy">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-gold text-xs tracking-[4px] uppercase font-bold mb-3">The Numbers</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-black text-white mb-3">
              Why Austin. Why Now. Why This Works.
            </h2>
            <p className="text-white/50 text-base max-w-xl mx-auto">
              Zero competition. Elite football culture. 300 days of outdoor weather.
            </p>
          </div>

          {/* Revenue table */}
          <div className="bg-navy-light rounded-2xl overflow-hidden border border-white/10 mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-gold text-[10px] tracking-[2px] uppercase font-bold px-6 py-4">Event Type</th>
                    <th className="text-left text-gold text-[10px] tracking-[2px] uppercase font-bold px-4 py-4 hidden sm:table-cell">Players</th>
                    <th className="text-left text-gold text-[10px] tracking-[2px] uppercase font-bold px-4 py-4 hidden sm:table-cell">Price</th>
                    <th className="text-left text-gold text-[10px] tracking-[2px] uppercase font-bold px-4 py-4">Revenue</th>
                    <th className="text-left text-gold text-[10px] tracking-[2px] uppercase font-bold px-4 py-4 hidden md:table-cell">Frequency</th>
                  </tr>
                </thead>
                <tbody>
                  {revenue.map((r) => (
                    <tr key={r.type} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-3 text-white font-semibold text-sm">{r.type}</td>
                      <td className="px-4 py-3 text-white/60 text-sm hidden sm:table-cell">{r.players}</td>
                      <td className="px-4 py-3 text-white/60 text-sm hidden sm:table-cell">{r.price}</td>
                      <td className="px-4 py-3 text-green-400 font-bold text-sm">{r.revenue}</td>
                      <td className="px-4 py-3 text-white/40 text-sm hidden md:table-cell">{r.freq}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CTA box */}
          <div className="bg-gradient-to-r from-gold to-gold-dark rounded-2xl p-8 text-center">
            <p className="text-dark/70 font-semibold text-sm mb-2">
              Equipment pays for itself on night one.
            </p>
            <p className="font-[family-name:var(--font-playfair)] text-3xl font-black text-dark mb-2">
              Same Events. More Money.
            </p>
            <p className="text-dark/60 text-sm">
              Under $200 per lane. Under $500 total launch cost.
            </p>
          </div>
        </div>
      </section>

      {/* Photo Strip */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative rounded-2xl overflow-hidden h-[250px]">
              <Image
                src="/fowling-setup-outdoor.jpg"
                alt="Outdoor fowling setup"
                fill
                className="object-cover object-[center_45%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-white/90 text-xs tracking-[2px] uppercase font-bold">The Setup — Outdoor Ready</p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden h-[250px]">
              <Image
                src="/fowling-strike-action.jpg"
                alt="Strike action shot"
                fill
                className="object-cover object-[center_35%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-white/90 text-xs tracking-[2px] uppercase font-bold">The Strike — Game On</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 bg-dark">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Image
            src="/wolf-mascot-scene.png"
            alt="Wolf Mascot"
            width={100}
            height={100}
            className="mx-auto mb-6 rounded-xl"
          />
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-black text-white mb-4">
            Ready to Bring Folwing to Your Venue?
          </h2>
          <p className="text-white/50 text-base mb-8 max-w-lg mx-auto">
            Free test night — I bring the equipment, you bring the crowd. Zero risk.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-gold to-gold-dark text-dark font-bold rounded-xl text-lg hover:shadow-[0_0_30px_rgba(196,162,101,0.3)] transition-all"
          >
            Book Your Test Night
          </Link>
        </div>
      </section>
    </div>
  );
}
