"use client";

import { usePathname } from "next/navigation";

// Gömülü Sanity Studio (/studio) altında site header/footer/smooth-scroll gizlenir —
// panel tam ekran ve temiz kalsın. Server bileşenler (Footer) children olarak geçtiği için
// server-render özelliklerini kaybetmez.
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/studio")) return null;
  return <>{children}</>;
}
