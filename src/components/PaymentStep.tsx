"use client";

import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

export default function PaymentStep({
  onSuccess,
  onBack,
}: {
  onSuccess: () => void;
  onBack: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePay(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message || "Please check your card details.");
      setProcessing(false);
      return;
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/waiver?success=true`,
      },
      redirect: "if_required",
    });

    if (confirmError) {
      setError(confirmError.message || "Payment failed. Please try again.");
      setProcessing(false);
      return;
    }

    // Payment succeeded without redirect
    setProcessing(false);
    onSuccess();
  }

  return (
    <div>
      <div className="text-center mb-6">
        <div className="text-5xl mb-3">🏈</div>
        <h1 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl font-black text-dark mb-2">
          Almost There!
        </h1>
        <div className="inline-block bg-dark rounded-xl px-5 py-2 mb-2">
          <span className="font-[family-name:var(--font-playfair)] text-2xl font-black text-gold">
            $10.00
          </span>
          <span className="text-white/60 text-sm ml-2">Game Entry</span>
        </div>
        <p className="text-text-muted text-sm">Waiver signed. Now just pay to play.</p>
      </div>

      <form onSubmit={handlePay} className="space-y-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5">
          <PaymentElement
            options={{
              layout: "tabs",
              wallets: { applePay: "auto", googlePay: "auto" },
            }}
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onBack}
            disabled={processing}
            className="px-6 py-4 border-2 border-gray-200 text-text-muted font-bold rounded-xl text-base disabled:opacity-50"
          >
            &larr; Back
          </button>
          <button
            type="submit"
            disabled={!stripe || processing}
            className={`flex-1 py-4 font-bold rounded-xl text-xl transition-all ${
              processing
                ? "bg-gray-200 text-gray-500 cursor-wait"
                : "bg-gradient-to-r from-gold to-gold-dark text-dark"
            }`}
          >
            {processing ? "Processing..." : "Pay $10"}
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 text-text-light text-xs">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Secured by Stripe &middot; 256-bit encryption
        </div>
      </form>
    </div>
  );
}
