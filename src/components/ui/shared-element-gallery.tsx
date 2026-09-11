"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

// 21st.dev "shared-element gallery" — himon diline uyarlandı: token'lı renkler (ink/paper/
// brand), himon köşe yarıçapı (rounded-lg ~8px), off-white placeholder tile. Masonry +
// paylaşımlı öğe (layoutId) geçişi ve dikey sürükle-kapat modal korundu.
//
// ⚠️ Bilinçli olarak motion.img: layoutId ile thumbnail↔modal arasında akan paylaşımlı öğe
// animasyonu için aynı native <img> gerekli (next/image fill masonry'nin değişken yüksekliğini
// bozar ve layout animasyonuyla oynamaz). Görsel yokken tile bir <div> placeholder'dır.

interface ImageData {
  id: string;
  src: string;
  alt?: string;
}

interface GalleryContextType {
  selectedImage: ImageData | null;
  setSelectedImage: (image: ImageData | null) => void;
}

const GalleryContext = React.createContext<GalleryContextType | null>(null);

// himon yumuşak yay — linear yasak, spring ile organik geçiş.
const spring = { type: "spring", stiffness: 350, damping: 35, mass: 1 } as const;

/** Kök — açılan görselin durumunu tutar, modalı basar. */
export function Gallery({ children }: { children: React.ReactNode }) {
  const [selectedImage, setSelectedImage] = React.useState<ImageData | null>(null);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = selectedImage ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  return (
    <GalleryContext.Provider value={{ selectedImage, setSelectedImage }}>
      {children}
      <GalleryModal />
    </GalleryContext.Provider>
  );
}

/** Responsive masonry — CSS columns. */
export function GalleryGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4", className)}>
      {children}
    </div>
  );
}

/** Tek galeri karesi. src boşsa tıklanamaz off-white placeholder olarak durur. */
export function GalleryImage({
  src,
  alt,
  id,
  className,
}: {
  src: string;
  alt?: string;
  id: string;
  className?: string;
}) {
  const context = React.useContext(GalleryContext);
  if (!context) throw new Error("GalleryImage must be used within a Gallery");

  // Görsel yok → statik placeholder tile (masonry yüksekliği className'deki aspect'ten gelir)
  if (!src) {
    return (
      <div
        className={cn(
          "mb-5 grid break-inside-avoid place-items-center rounded-lg bg-paper",
          className
        )}
      >
        <span className="text-[13px] font-medium uppercase tracking-[0.14em] text-ink/25">
          Özdemir
        </span>
      </div>
    );
  }

  return (
    <motion.div
      whileHover="hover"
      whileTap="tap"
      className={cn(
        "relative mb-5 cursor-zoom-in break-inside-avoid overflow-hidden rounded-lg bg-paper",
        className
      )}
      onClick={() => context.setSelectedImage({ id, src, alt })}
    >
      <motion.img
        layoutId={`gallery-${id}`}
        src={src}
        alt={alt ?? "Galeri görseli"}
        loading="lazy"
        className="h-auto w-full rounded-lg object-cover"
        variants={{ hover: { scale: 1.03 }, tap: { scale: 0.98 } }}
        transition={spring}
      />
      <motion.div
        variants={{ hover: { opacity: 1 }, tap: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none absolute inset-0 rounded-lg bg-ink/10"
      />
    </motion.div>
  );
}

/** Genişletilmiş görünüm — paylaşımlı öğe + dikey sürükle-kapat. */
function GalleryModal() {
  const context = React.useContext(GalleryContext);
  if (!context) return null;
  const { selectedImage, setSelectedImage } = context;

  return (
    <AnimatePresence>
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Buzlu koyu zemin */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-ink/80 backdrop-blur-2xl"
            onClick={() => setSelectedImage(null)}
          />

          {/* Sürükleme alanı */}
          <motion.div
            className="relative z-10 flex h-full w-full cursor-zoom-out items-center justify-center"
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.8}
            onDragEnd={(_e, info) => {
              if (Math.abs(info.offset.y) > 100 || Math.abs(info.velocity.y) > 300) {
                setSelectedImage(null);
              }
            }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              layoutId={`gallery-${selectedImage.id}`}
              src={selectedImage.src}
              alt={selectedImage.alt ?? "Seçili galeri görseli"}
              className="h-auto max-h-[90vh] w-auto max-w-[95vw] rounded-lg object-contain shadow-2xl will-change-transform"
              draggable={false}
              transition={spring}
            />
          </motion.div>

          {/* Kapat */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.1, duration: 0.2 }}
            className="absolute right-6 top-6 z-50 grid size-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            onClick={() => setSelectedImage(null)}
            aria-label="Galeriyi kapat"
          >
            <X className="size-5" strokeWidth={1.8} />
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
}
