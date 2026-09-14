"use client";

import Script from "next/script";

// GA4 — consent-first setup.
// - Default consent = "denied" (KVKK); Kabul edilince cookie-banner "granted"e günceller.
// - Measurement ID env'den (NEXT_PUBLIC_GA_ID); yoksa hiç yüklenmez, DOM'a script eklenmez.

export function GA4() {
  // trim: env'e yanlışlıkla başında/sonunda boşluk ile yazılmış olabilir (yaygın hata).
  const id = process.env.NEXT_PUBLIC_GA_ID?.trim();
  if (!id || !id.startsWith("G-")) return null;

  return (
    <>
      <Script
        id="ga4-consent-default"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});
`,
        }}
      />
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script
        id="ga4-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
gtag('js', new Date());
gtag('config', '${id}', { anonymize_ip: true, send_page_view: true });
`,
        }}
      />
    </>
  );
}
