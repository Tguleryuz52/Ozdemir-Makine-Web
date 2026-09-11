import Studio from "./Studio";

// Gömülü Sanity Studio — /studio altındaki tüm alt yolları yakalar ([[...tool]]).
// Config import'u client sınırında (Studio.tsx); sunucu sayfası sadece kabuk + metadata.
export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <Studio />;
}
