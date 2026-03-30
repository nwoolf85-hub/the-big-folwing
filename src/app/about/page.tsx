import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 sm:py-28 bg-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="/fowling-setup-outdoor.jpg" alt="" fill className="object-cover" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <p className="text-gold text-xs tracking-[4px] uppercase font-bold mb-3">About</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
            The Story Behind the Throw
          </h1>
          <p className="text-white/60 text-base max-w-xl mx-auto">
            How a beer rep from Austin turned a tailgate game into a business.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-gold text-xs tracking-[4px] uppercase font-bold mb-3">The Origin</p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-black text-dark mb-4">
                Fowling Was Born by Accident
              </h2>
              <p className="text-text-muted leading-relaxed mb-4">
                In 2001 at the Indianapolis 500, a stray football knocked over a set of bowling pins. The crowd went wild. A sport was born.
              </p>
              <p className="text-text-muted leading-relaxed mb-4">
                Now it&apos;s played in warehouses across Detroit, Indianapolis, and beyond — but nobody brought it to Austin. Until now.
              </p>
              <p className="text-text-muted leading-relaxed">
                The Big Folwing is the mobile version — no warehouse needed. We bring the lanes to your bar, your backyard, your tailgate. Set up in 15 minutes. Under $200 a lane.
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden h-[350px]">
              <Image
                src="/fowling-stock.jpg"
                alt="Fowling in action"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="relative overflow-hidden">
        <div className="relative h-[400px] sm:h-[450px]">
          <Image
            src="/neal-founder-wide.jpg"
            alt="Neal Woolf — Founder"
            fill
            className="object-cover object-[center_18%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/60 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full">
              <div className="max-w-sm">
                <p className="text-gold text-xs tracking-[4px] uppercase font-bold mb-3">Founder</p>
                <h2 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl font-black text-white mb-3">
                  Neal Woolf
                </h2>
                <p className="text-white/70 text-base mb-2">Woolf Ventures LLC</p>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  B2B sales operator in Austin&apos;s convenience store market. Former beer rep who knows every bar owner on the east side. Built the tech, built the brand, now building the lanes.
                </p>
                <p className="text-white/40 text-sm">Austin, Texas</p>
                <div className="flex gap-4 mt-4">
                  <a href="mailto:neal@woolfventures.co" className="text-gold text-sm hover:text-gold-light transition-colors">
                    neal@woolfventures.co
                  </a>
                  <a href="tel:5123871885" className="text-gold text-sm hover:text-gold-light transition-colors">
                    (512) 387-1885
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Bring */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-gold text-xs tracking-[4px] uppercase font-bold mb-3">What We Bring</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-black text-dark">
              Everything You Need. Nothing You Don&apos;t.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-6 border-l-4 border-l-gold">
              <h3 className="font-bold text-dark text-base mb-2">🏈 All Equipment</h3>
              <p className="text-text-muted text-sm">Pins, platforms, footballs, lane markers. Show up and throw.</p>
            </div>
            <div className="bg-white rounded-xl p-6 border-l-4 border-l-gold">
              <h3 className="font-bold text-dark text-base mb-2">📱 Waiver + Payment App</h3>
              <p className="text-text-muted text-sm">Digital waivers on iPad. Card payments. Everything tracked.</p>
            </div>
            <div className="bg-white rounded-xl p-6 border-l-4 border-l-gold">
              <h3 className="font-bold text-dark text-base mb-2">🎨 Brand + Marketing</h3>
              <p className="text-text-muted text-sm">Logo, mascot, website, social media. Professional from day one.</p>
            </div>
            <div className="bg-white rounded-xl p-6 border-l-4 border-l-gold">
              <h3 className="font-bold text-dark text-base mb-2">⚖️ TX-Compliant Waiver</h3>
              <p className="text-text-muted text-sm">Express negligence doctrine compliant. Built for Texas law.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Lebowski Quote */}
      <section className="bg-navy py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Image
            src="/wolf-mascot-scene.png"
            alt="Wolf Mascot"
            width={80}
            height={80}
            className="mx-auto mb-4 rounded-xl"
          />
          <p className="font-[family-name:var(--font-playfair)] text-gold-light text-xl italic mb-2">
            &quot;The Pins Abide.&quot;
          </p>
          <p className="text-white/30 text-xs tracking-[3px] uppercase mb-8">
            The Big Folwing — Austin, Texas
          </p>
          <Link
            href="/book"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-gold to-gold-dark text-dark font-bold rounded-xl text-lg"
          >
            Book Your Event
          </Link>
        </div>
      </section>
    </div>
  );
}
