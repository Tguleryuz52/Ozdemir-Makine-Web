// Tek seferlik yardımcı: Zoho'dan aldığın "Grant Code"u "Refresh Token"a çevirir.
// Kullanım:  npx tsx scripts/_zoho-refresh.ts <GRANT_CODE>
// Örn:       npx tsx scripts/_zoho-refresh.ts 1000.abc123def456...
// Client ID + Secret'ı .env.local'deki ZOHO_CRM_CLIENT_ID / ZOHO_CRM_CLIENT_SECRET'ten okur.

import { readFileSync } from "node:fs";

const code = process.argv[2]?.trim();
if (!code) {
  console.error("KULLANIM: npx tsx scripts/_zoho-refresh.ts <GRANT_CODE>");
  process.exit(1);
}

const envText = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
function get(key: string): string {
  const m = envText.match(new RegExp(`^\\s*${key}\\s*=\\s*(.+)$`, "m"));
  return m?.[1]?.trim() ?? "";
}
const clientId = get("ZOHO_CRM_CLIENT_ID");
const clientSecret = get("ZOHO_CRM_CLIENT_SECRET");
const accountsDomain = get("ZOHO_CRM_ACCOUNTS_DOMAIN") || "accounts.zoho.eu";

if (!clientId || !clientSecret) {
  console.error("Hata: ZOHO_CRM_CLIENT_ID veya ZOHO_CRM_CLIENT_SECRET .env.local'de bulunamadı.");
  process.exit(1);
}

const params = new URLSearchParams({
  grant_type: "authorization_code",
  client_id: clientId,
  client_secret: clientSecret,
  code,
});

const url = `https://${accountsDomain}/oauth/v2/token`;
console.log(`→ POST ${url}`);

fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: params.toString(),
})
  .then(async (res) => {
    const json = await res.json();
    if (res.ok && json.refresh_token) {
      console.log("");
      console.log("✅ BAŞARILI — .env.local'e ekle:");
      console.log("");
      console.log(`ZOHO_CRM_REFRESH_TOKEN=${json.refresh_token}`);
      console.log("");
      console.log("(Not: access_token 1 saatte yenilenir, onu almana gerek yok.)");
    } else {
      console.error("❌ Hata:", JSON.stringify(json, null, 2));
      if (json.error === "invalid_code") {
        console.error("\nGrant code süresi doldu veya kullanıldı → yeni bir tane üret.");
      }
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error("❌ Network hatası:", err.message);
    process.exit(1);
  });
