"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import type { ReactNode } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function StripeProvider({
  clientSecret,
  children,
}: {
  clientSecret: string;
  children: ReactNode;
}) {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "flat",
          variables: {
            fontFamily: "Inter, system-ui, sans-serif",
            colorPrimary: "#C4A265",
            colorBackground: "#ffffff",
            colorText: "#1A1A1A",
            colorDanger: "#dc2626",
            borderRadius: "12px",
            spacingUnit: "4px",
            fontSizeBase: "16px",
          },
          rules: {
            ".Input": {
              border: "1px solid #e5e7eb",
              padding: "14px 16px",
              boxShadow: "none",
            },
            ".Input:focus": {
              border: "1px solid #C4A265",
              boxShadow: "0 0 0 2px rgba(196, 162, 101, 0.25)",
            },
            ".Label": {
              fontWeight: "500",
              fontSize: "14px",
              marginBottom: "6px",
            },
          },
        },
      }}
    >
      {children}
    </Elements>
  );
}
