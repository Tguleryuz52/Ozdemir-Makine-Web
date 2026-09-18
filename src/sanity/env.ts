// Sanity ortam değişkenleri.
// ⚠️ src/sanity/ içinde @/ alias YOK — sadece relative (./) import kullanılır; çünkü Sanity
// CLI bundler'ı tsconfig path alias'ını çözemez. Uygulamanın geri kalanı @/sanity/... kullanır.

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "qgzvu8g9";
