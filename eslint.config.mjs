import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Bu projeye ait olmayan, lint edilmemesi gereken alanlar:
    "ozdmak/**",   // eski site arsivi (git disi, sadece referans icin duruyor)
    ".work/**",    // gecici calisma alani (ekran goruntuleri, loglar)
    "screen/**",   // eski ekran goruntusu klasoru
    "design/**",   // referans materyalleri, kod degil
  ]),
]);

export default eslintConfig;
