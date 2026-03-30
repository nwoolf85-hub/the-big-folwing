"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isKiosk = pathname === "/waiver";

  if (isKiosk) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <Header />
      <main className="flex-1 pt-16 sm:pt-20">{children}</main>
      <Footer />
    </>
  );
}
