"use client";

import { useState } from "react";

const eventTypes = [
  { id: "bar-night", label: "Bar Night Activation", desc: "Weekly game night at your venue", price: "$200–$400/night" },
  { id: "rental", label: "Equipment Rental", desc: "Tailgates, frat parties, backyard events", price: "$150–$300" },
  { id: "private", label: "Private Party", desc: "Birthdays, celebrations, group outings", price: "$500–$1,000" },
  { id: "corporate", label: "Corporate Event", desc: "Team building, company picnics, off-sites", price: "$750–$4,000" },
];

export default function Book() {
  const [selectedType, setSelectedType] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-cream">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="text-5xl mb-4">🏈</div>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-black text-dark mb-3">
            You&apos;re In!
          </h1>
          <p className="text-text-muted text-base mb-6">
            Thanks for reaching out. Neal will get back to you within 24 hours to set up your event.
          </p>
          <a
            href="tel:5123871885"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-gold to-gold-dark text-dark font-bold rounded-xl text-base"
          >
            Call Now — (512) 387-1885
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-dark py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-gold text-xs tracking-[4px] uppercase font-bold mb-3">Book an Event</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl font-black text-white mb-4">
            Bring Folwing to Your Venue
          </h1>
          <p className="text-white/60 text-base max-w-lg mx-auto">
            Free test night available — I bring the equipment, you bring the crowd. Zero risk.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 sm:py-16 bg-cream">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Event Type */}
            <div>
              <label className="text-gold text-xs tracking-[3px] uppercase font-bold block mb-4">
                What type of event?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {eventTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedType(type.id)}
                    className={`text-left p-4 rounded-xl border-2 transition-all ${
                      selectedType === type.id
                        ? "border-gold bg-gold/5 shadow-md"
                        : "border-gray-200 bg-white hover:border-gold/40"
                    }`}
                  >
                    <div className="font-bold text-dark text-sm">{type.label}</div>
                    <div className="text-text-muted text-xs mt-1">{type.desc}</div>
                    <div className="text-gold font-semibold text-xs mt-2">{type.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <label className="text-gold text-xs tracking-[3px] uppercase font-bold block mb-4">
                Your Information
              </label>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="text-dark text-sm font-medium block mb-1">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-dark text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="text-dark text-sm font-medium block mb-1">Phone</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-dark text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold"
                      placeholder="(512) 555-0000"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="text-dark text-sm font-medium block mb-1">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-dark text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold"
                    placeholder="you@email.com"
                  />
                </div>
              </div>
            </div>

            {/* Venue / Event Details */}
            <div>
              <label className="text-gold text-xs tracking-[3px] uppercase font-bold block mb-4">
                Event Details
              </label>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="venue" className="text-dark text-sm font-medium block mb-1">Venue / Location</label>
                    <input
                      id="venue"
                      name="venue"
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-dark text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold"
                      placeholder="Bar name or address"
                    />
                  </div>
                  <div>
                    <label htmlFor="date" className="text-dark text-sm font-medium block mb-1">Preferred Date</label>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-dark text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="guests" className="text-dark text-sm font-medium block mb-1">Estimated Guests</label>
                  <input
                    id="guests"
                    name="guests"
                    type="number"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-dark text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold"
                    placeholder="20"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="text-dark text-sm font-medium block mb-1">Anything else?</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-dark text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold resize-none"
                    placeholder="Tell us about your event..."
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-gold to-gold-dark text-dark font-bold rounded-xl text-lg hover:shadow-[0_0_30px_rgba(196,162,101,0.3)] transition-all"
            >
              Submit Request
            </button>

            <p className="text-center text-text-light text-xs">
              Or call directly: <a href="tel:5123871885" className="text-gold font-semibold">(512) 387-1885</a>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
