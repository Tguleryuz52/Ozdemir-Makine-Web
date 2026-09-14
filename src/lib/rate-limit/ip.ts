// Basit IP başına rate-limit — in-memory. Vercel'de tek serverless instance içinde geçerli;
// yüksek yükte KV/Redis'e taşınmalı. B2B teklif formu için (günde ~10 lead) yeter.
// 5 dakikalık pencere · 3 isteğe kadar OK.

import "server-only";

type Entry = { count: number; resetAt: number };
const bucket = new Map<string, Entry>();

const WINDOW_MS = 5 * 60_000;
const MAX_REQUESTS = 3;

export function checkRateLimit(ip: string): { ok: boolean; retryAfter?: number } {
  const now = Date.now();
  const entry = bucket.get(ip);

  if (!entry || entry.resetAt < now) {
    bucket.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }
  if (entry.count >= MAX_REQUESTS) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  entry.count += 1;
  return { ok: true };
}

// Fetch API sızıntısını temizle — hafızayı büyümesin diye periyodik.
if (typeof globalThis !== "undefined") {
  const g = globalThis as { __ipBucketSweep?: NodeJS.Timeout };
  if (!g.__ipBucketSweep) {
    g.__ipBucketSweep = setInterval(() => {
      const now = Date.now();
      for (const [ip, e] of bucket) {
        if (e.resetAt < now) bucket.delete(ip);
      }
    }, WINDOW_MS);
  }
}
