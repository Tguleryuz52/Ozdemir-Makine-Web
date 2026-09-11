import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

// Sanity görselinden optimize URL üretir. Kullanım: urlForImage(src).width(800).url()
export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}
