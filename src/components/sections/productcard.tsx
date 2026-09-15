import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight, Tag } from "lucide-react";
import Link from "next/link";

export interface ProductCardProps {
  id?: string;
  brand: string;
  model: string;
  condition: string;
  year?: number;
  price?: string;
  priceOnRequest: boolean;
  image?: string;
  href: string;
  className?: string;
}

// Gerçek fotoğraf gelene kadar marka-mavisi soyut placeholder (harici görsel yok).
const PLACEHOLDER_BG =
  "radial-gradient(135% 135% at 20% 0%, var(--brand-bright), var(--brand) 48%, var(--brand-deep))";

export function ProductCard({
  brand,
  model,
  condition,
  year,
  price,
  priceOnRequest,
  image,
  href,
  className,
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn("w-full h-full", className)}
    >
      <Link href={href} className="block h-full">
        {/* Daha az yuvarlak (rounded-xl) keskin ve profesyonel kart tasarımı */}
        <div className="group relative h-full flex flex-col overflow-hidden rounded-xl border border-ink/10 bg-white shadow-sm transition-all duration-300 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5">
          {/* Image Section */}
          <div className="relative aspect-[4/3] overflow-hidden bg-ink shrink-0">
            <motion.div
              className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
              style={
                image
                  ? { backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" }
                  : { background: PLACEHOLDER_BG }
              }
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              <Badge
                variant="secondary"
                className="bg-white/95 backdrop-blur-md text-ink hover:bg-white border-none px-3 py-1 font-mono text-[10px] uppercase tracking-widest font-semibold shadow-sm"
              >
                {condition}
              </Badge>
            </div>
            
            {year ? (
              <div className="absolute bottom-4 left-4 flex gap-2 z-10">
                <Badge
                  variant="secondary"
                  className="bg-ink/70 text-white backdrop-blur-md hover:bg-ink/80 border-white/10 shadow-sm"
                >
                  Yıl: {year}
                </Badge>
              </div>
            ) : null}

            {/* Hover Overlay Action */}
            <div className="absolute inset-0 flex items-center justify-center bg-ink/20 backdrop-blur-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-full bg-brand px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-brand/25"
              >
                <span>Detayları İncele</span>
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-1 flex-col p-6">
            <span className="mb-2 block font-mono text-[11px] font-medium uppercase tracking-widest text-ink/50">
              {brand}
            </span>
            <h3 className="mb-4 text-[1.2rem] font-medium leading-[1.2] tracking-tight text-ink transition-colors group-hover:text-brand lg:text-[1.3rem]">
              {model}
            </h3>

            <div className="mt-auto flex items-center justify-between border-t border-ink/10 pt-4">
              <div className="flex items-center gap-1.5 text-ink/60">
                <Tag className="h-4 w-4" />
                <span className="text-[13.5px]">Fiyat</span>
              </div>
              <span
                className={cn(
                  "font-medium text-[15px]",
                  priceOnRequest ? "text-brand font-semibold" : "text-ink"
                )}
              >
                {priceOnRequest ? "Fiyat Sorunuz" : price}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
