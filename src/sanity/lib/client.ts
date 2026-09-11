import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

// Sunucu tarafı okuma client'ı. Token server-only (NEXT_PUBLIC değil → client bundle'a sızmaz);
// private dataset'ten de okur. perspective:"published" → sadece yayınlanmış içerik, taslaklar hariç.
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  token: process.env.SANITY_API_READ_TOKEN,
});
