import Image from "next/image";
import { cn } from "@/lib/utils";

// Değiştirilebilir görsel çerçevesi. `src` boşsa zarif marka-mavisi placeholder;
// gerçek görsel gelince tek satır: src ver → next/image fill devreye girer.
// Aspect oranı className ile verilir (ör. "aspect-[16/10]", "aspect-square").
export function MediaFrame({
  src,
  alt,
  label,
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  rounded = true,
}: {
  src?: string;
  alt: string;
  label?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  rounded?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-brand/[0.16] via-paper to-ink/[0.12] ring-1 ring-inset ring-ink/[0.06]",
        rounded && "rounded-[var(--radius-card)]",
        className,
      )}
    >
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 text-ink/35">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3" y="4" width="18" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
            <circle cx="8.5" cy="9.5" r="1.6" stroke="currentColor" strokeWidth="1.4" />
            <path d="m4 17 4.5-4.5a1.5 1.5 0 0 1 2 0L16 18M14 15l1.8-1.8a1.5 1.5 0 0 1 2 0L21 16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-mono text-[11px] uppercase tracking-[0.12em]">
            {label ?? "Görsel"}
          </span>
        </div>
      )}
    </div>
  );
}

export default MediaFrame;
