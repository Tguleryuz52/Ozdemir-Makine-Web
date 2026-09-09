import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

// himon alt-çizgi hover linki — tekrar kullanılabilir.
// Çizgi hover'da SOLDAN gelir; mouse çekilince sola geri dönmez, SAĞDAN çıkar.
// Sır: transform-origin dinlenmede "right", hover'da "left". Sadece scaleX transition edilir,
// origin anlık değişir → giriş ve çıkış zıt yönlerden olur. Süre/easing motion token'larından.
export const underlineLinkClass =
  "relative inline-block whitespace-nowrap py-1 font-medium tracking-[-0.02em] " +
  "text-ink/90 transition-colors hover:text-ink " +
  "after:pointer-events-none after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-full " +
  "after:origin-right after:scale-x-0 after:bg-ink after:transition-transform after:duration-[450ms] " +
  "after:ease-out-soft hover:after:origin-left hover:after:scale-x-100 motion-reduce:after:transition-none";

export function UnderlineLink({
  className,
  ...props
}: ComponentProps<typeof Link>) {
  return <Link className={cn(underlineLinkClass, className)} {...props} />;
}

export default UnderlineLink;
