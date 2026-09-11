// Sanity ortam değişkenleri.
// ⚠️ src/sanity/ içinde @/ alias YOK — sadece relative (./) import kullanılır; çünkü Sanity
// CLI bundler'ı tsconfig path alias'ını çözemez. Uygulamanın geri kalanı @/sanity/... kullanır.

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) throw new Error(errorMessage);
  return v;
}

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Eksik ortam değişkeni: NEXT_PUBLIC_SANITY_DATASET",
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Eksik ortam değişkeni: NEXT_PUBLIC_SANITY_PROJECT_ID",
);
