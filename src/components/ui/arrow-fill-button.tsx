"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type PointerEvent,
} from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Boyut-bağımsız arrow-fill butonu (21st/hyperiux'ten uyarlandı, vw yerine CSS değişkenleri).
// Boyut tek yerden gelir: --afb-h / --afb-px / --afb-text / --afb-circle / --afb-gap / --afb-arrow.
// Varsayılan header ölçeği (~48px). Hero için className ile daha büyük ver: `[--afb-h:4.5rem] ...`.

const EASE = "cubic-bezier(0.785, 0.135, 0.15, 0.86)";
const COMPACT_BREAKPOINT = 1024;

export interface ArrowFillButtonOwnProps {
  btnText?: string;
  href?: string;
  className?: string;
  bgColor?: string;
  textColor?: string;
  fillBgColor?: string;
  fillTextColor?: string;
  animationDuration?: number;
}

export type ArrowFillButtonProps = ArrowFillButtonOwnProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof ArrowFillButtonOwnProps>;

function ArrowFillButton({
  btnText = "Teklif Al",
  href = "#",
  className = "",
  bgColor = "#0e0e0e",
  textColor = "#ffffff",
  fillBgColor = "#ffffff",
  fillTextColor = "#0e0e0e",
  animationDuration = 450,
  style,
  ...props
}: ArrowFillButtonProps) {
  const [pressed, setPressed] = useState(false);
  const [compact, setCompact] = useState(false);
  const releaseRef = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${COMPACT_BREAKPOINT - 1}px)`);
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => () => {
    if (releaseRef.current) window.clearTimeout(releaseRef.current);
  }, []);

  const onDown = (e: PointerEvent<HTMLAnchorElement>) => {
    props.onPointerDown?.(e);
    if (compact && e.pointerType !== "mouse") setPressed(true);
  };
  const onUp = (e: PointerEvent<HTMLAnchorElement>) => {
    props.onPointerUp?.(e);
    if (compact && e.pointerType !== "mouse") {
      if (releaseRef.current) window.clearTimeout(releaseRef.current);
      releaseRef.current = window.setTimeout(() => setPressed(false), animationDuration);
    }
  };

  const dur = `${animationDuration}ms`;
  // Dolum katmanının başlangıç konumu: sadece sağdaki daireyi kaplar.
  return (
    <a
      href={href}
      {...props}
      data-pressed={pressed ? "true" : "false"}
      onPointerDown={onDown}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      style={
        {
          "--afb-h": "3rem",
          "--afb-px": "1.35rem",
          "--afb-text": "0.9375rem",
          "--afb-circle": "1.9rem",
          "--afb-gap": "0.45rem",
          "--afb-arrow": "0.95rem",
          "--afb-bg": bgColor,
          "--afb-text-color": textColor,
          "--afb-fill": fillBgColor,
          "--afb-fill-text": fillTextColor,
          ...style,
        } as CSSProperties
      }
      className={cn(
        "group relative inline-flex h-[var(--afb-h)] w-fit cursor-pointer items-center overflow-hidden",
        "rounded-full whitespace-nowrap font-medium leading-none tracking-[-0.01em] antialiased",
        "pl-[var(--afb-px)] pr-[calc(var(--afb-circle)+var(--afb-gap)+var(--afb-px))]",
        "text-[length:var(--afb-text)] text-[color:var(--afb-text-color)] bg-[color:var(--afb-bg)]",
        className,
      )}
    >
      {/* Taban metin (dolum öncesi görünen) */}
      <span className="relative z-10">{btnText}</span>

      {/* Dolum zemini: daireden başlar, hover'da tüm butonu kaplar.
          NOT: başlangıç inset'i CLASS ile verilmeli — inline style, group-hover:inset-0'ı ezer. */}
      <span
        aria-hidden
        className="pointer-events-none absolute z-20 rounded-full bg-[color:var(--afb-fill)] inset-[var(--afb-gap)_var(--afb-gap)_var(--afb-gap)_calc(100%-var(--afb-gap)-var(--afb-circle))] transition-all ease-[var(--afb-ease)] group-hover:inset-0 group-data-[pressed=true]:inset-0 motion-reduce:transition-none"
        style={{ transitionDuration: dur, "--afb-ease": EASE } as CSSProperties}
      />

      {/* Dolum metni: hover'da açılan koyu metin */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 flex items-center pl-[var(--afb-px)] pr-[calc(var(--afb-circle)+var(--afb-gap)+var(--afb-px))] text-[color:var(--afb-fill-text)] transition-all ease-[var(--afb-ease)] [clip-path:inset(var(--afb-gap)_var(--afb-gap)_var(--afb-gap)_calc(100%-var(--afb-gap)-var(--afb-circle)))] group-hover:[clip-path:inset(0_0_0_0)] group-data-[pressed=true]:[clip-path:inset(0_0_0_0)] motion-reduce:transition-none"
        style={{ transitionDuration: dur, "--afb-ease": EASE } as CSSProperties}
      >
        {btnText}
      </span>

      {/* Sağdaki ok dairesi (butona oranlı, taşmaz) */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-[var(--afb-gap)] top-1/2 z-30 inline-flex size-[var(--afb-circle)] -translate-y-1/2 items-center justify-center overflow-hidden rounded-full bg-[color:var(--afb-fill)] text-[color:var(--afb-fill-text)]"
      >
        {/* gelen ok */}
        <ArrowRight
          className="absolute size-[var(--afb-arrow)] -translate-x-[170%] scale-0 transition-transform ease-[var(--afb-ease)] group-hover:translate-x-0 group-hover:scale-100 group-data-[pressed=true]:translate-x-0 group-data-[pressed=true]:scale-100 motion-reduce:transition-none"
          style={{ transitionDuration: dur } as CSSProperties}
          strokeWidth={1.8}
        />
        {/* giden ok */}
        <ArrowRight
          className="absolute size-[var(--afb-arrow)] transition-transform ease-[var(--afb-ease)] group-hover:translate-x-[170%] group-hover:scale-0 group-data-[pressed=true]:translate-x-[170%] group-data-[pressed=true]:scale-0 motion-reduce:transition-none"
          style={{ transitionDuration: dur } as CSSProperties}
          strokeWidth={1.8}
        />
      </span>
    </a>
  );
}

export default ArrowFillButton;
