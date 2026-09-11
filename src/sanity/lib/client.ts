import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

// Sunucu tarafı okuma client'ı. Token server-only (NEXT_PUBLIC değil → client bundle'a sızmaz);
// private dataset'ten de okur. perspective:"published" → sadece yayınlanmış içerik, taslaklar hariç.
//
// useCdn:false — bilerek. Sayfalar zaten ISR ile önbelleklenip statik HTML olarak servis edilir
// (ziyaretçi hızı bundan ETKİLENMEZ). Bu sorgu sadece build/revalidate sırasında koşar; CDN yerine
// doğrudan API'den okuyunca yayınlanan içerik anında tazelenir. Webhook ile "anında yayın" için şart.
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
  token: process.env.SANITY_API_READ_TOKEN,
});
