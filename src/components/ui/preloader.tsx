"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

// Açılış: paper zeminde logo aşağıdan yukarı "dolar", sonra perde yukarı kalkıp sayfayı açar.
// Hızlı (~1.5s) · sadece clip/transform · reduced-motion'da atlanır · yalnız tam yüklemede.
export function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // reduced-motion → anında kapat (0ms), normalde ~1s göster. setState effect gövdesinde
    // senkron çağrılmaz, timeout callback'inde kalır (react-hooks/set-state-in-effect).
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setShow(false), reduced ? 0 : 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-paper"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="relative h-12 w-[220px] lg:h-14 lg:w-[260px]">
            {/* Boş (soluk) logo */}
            <Image src="/logo_main.png" alt="" fill sizes="260px" priority className="object-contain object-center opacity-[0.14] invert" />
            {/* Dolan logo — aşağıdan yukarı clip reveal */}
            <motion.div
              className="absolute inset-0"
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={{ clipPath: "inset(0% 0 0 0)" }}
              transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
            >
              <Image src="/logo_main.png" alt="Özdemir Makine" fill sizes="260px" priority className="object-contain object-center invert" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
