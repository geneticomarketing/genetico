"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/landing/navbar";
import { MotionSafariFix } from "@/components/MotionSafariFix";
import LS from "@/components/LS";
import { Footer } from "@/components/landing/footer";

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return children;
  }

  return (
    <div className="bg-navy flex min-h-full flex-col">
      <MotionSafariFix />
      <LS />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
