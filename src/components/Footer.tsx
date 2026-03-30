import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/woolf-logo-final.jpeg"
                alt="Woolf Ventures"
                width={48}
                height={48}
                className="rounded-full object-cover border border-gold/40"
              />
              <div>
                <span className="font-[family-name:var(--font-playfair)] font-bold text-white text-lg block">
                  The Big Folwing
                </span>
                <span className="text-gold/70 text-xs tracking-wider uppercase">
                  Woolf Ventures LLC
                </span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Football meets bowling pins. Austin&apos;s first mobile fowling experience.
              Bar activations, private events, and corporate team building.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gold text-xs tracking-[3px] uppercase font-bold mb-4">
              Quick Links
            </h3>
            <div className="flex flex-col gap-2">
              <Link href="/how-to-play" className="text-white/60 hover:text-gold text-sm transition-colors">
                How to Play
              </Link>
              <Link href="/book" className="text-white/60 hover:text-gold text-sm transition-colors">
                Book an Event
              </Link>
              <Link href="/waiver" className="text-white/60 hover:text-gold text-sm transition-colors">
                Sign Waiver
              </Link>
              <Link href="/about" className="text-white/60 hover:text-gold text-sm transition-colors">
                About
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gold text-xs tracking-[3px] uppercase font-bold mb-4">
              Contact
            </h3>
            <div className="flex flex-col gap-2 text-sm">
              <a href="mailto:neal@woolfventures.co" className="text-white/60 hover:text-gold transition-colors">
                neal@woolfventures.co
              </a>
              <a href="tel:5123871885" className="text-white/60 hover:text-gold transition-colors">
                (512) 387-1885
              </a>
              <span className="text-white/40">Austin, Texas</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} Woolf Ventures LLC. All rights reserved.
          </p>
          <p className="font-[family-name:var(--font-playfair)] text-gold/40 text-sm italic">
            &quot;The Pins Abide.&quot;
          </p>
        </div>
      </div>
    </footer>
  );
}
