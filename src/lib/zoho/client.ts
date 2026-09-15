// Zoho CRM — Insert Leads v8 helper.
// OAuth self-client + refresh_token akışı. Access token 1 saat geçerli, in-memory cache tutulur
// (edge/serverless soğuk başlatta yenilenir; sıcak instance'da tek istek/saat). Bellek üstü
// önbellek çünkü Vercel edge/serverless'ta paylaşımlı KV yok — proje küçük, yeter.

import "server-only";

const ACCOUNTS = process.env.ZOHO_CRM_ACCOUNTS_DOMAIN ?? "accounts.zoho.eu";
const API = process.env.ZOHO_CRM_API_DOMAIN ?? "www.zohoapis.eu";
const CLIENT_ID = process.env.ZOHO_CRM_CLIENT_ID ?? "";
const CLIENT_SECRET = process.env.ZOHO_CRM_CLIENT_SECRET ?? "";
const REFRESH_TOKEN = process.env.ZOHO_CRM_REFRESH_TOKEN ?? "";

let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.value;
  }
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    throw new Error("ZOHO_CRM_CREDS_MISSING");
  }
  const params = new URLSearchParams({
    refresh_token: REFRESH_TOKEN,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: "refresh_token",
  });
  const res = await fetch(`https://${ACCOUNTS}/oauth/v2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`ZOHO_TOKEN_HTTP_${res.status}`);
  }
  const json = (await res.json()) as { access_token?: string; expires_in?: number; error?: string };
  if (!json.access_token) {
    throw new Error(`ZOHO_TOKEN_ERROR_${json.error ?? "UNKNOWN"}`);
  }
  cachedToken = {
    value: json.access_token,
    expiresAt: Date.now() + (json.expires_in ?? 3600) * 1000,
  };
  return cachedToken.value;
}

export type LeadInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
  machineCode?: string;
  machineTitle?: string;
  machineSlug?: string;
  leadSource: string;
  campaign?: string;
};

// Zoho Leads modülüne oluşturduğumuz "İlgilendiği Makine (PressXchange)" Lookup field'ı.
// Semantik olarak "PressXchange" ama pratikte tüm website lead'leri de buraya bağlanıyor —
// Lead_Source zaten kaynağı ayırıyor. Yeni bir "Website" field açmadık, aynı slotu paylaşıyoruz.
const PRODUCT_LOOKUP_API_NAME = "lgilendi_i_Makine_PressXchange";

// Product_Code (ör "60016") ile Zoho Products modülünde arama. Bulursa {id, name} döner,
// bulamazsa null. Fail-soft: hata durumunda null, lead yine oluşsun (lookup atanmaz sadece).
async function findProductByCode(
  token: string,
  code: string,
): Promise<{ id: string; name: string } | null> {
  const criteria = encodeURIComponent(`(Product_Code:equals:${code})`);
  const url = `https://${API}/crm/v8/Products/search?criteria=${criteria}&fields=Product_Name,Product_Code`;
  try {
    const res = await fetch(url, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
      cache: "no-store",
    });
    if (res.status === 204 || !res.ok) return null;
    const json = (await res.json()) as {
      data?: Array<{ id: string; Product_Name?: string }>;
    };
    const hit = json.data?.[0];
    return hit ? { id: hit.id, name: hit.Product_Name ?? "" } : null;
  } catch {
    return null;
  }
}

export type LeadResult = {
  ok: boolean;
  id?: string;
  code?: string;
  detail?: unknown;
};

export async function insertLead(input: LeadInput): Promise<LeadResult> {
  const token = await getAccessToken();

  // Zoho Description alanı — satış temsilcisinin ilk baktığı yer. Emoji YOK
  // çünkü Zoho font'u desteklemiyor, '?' olarak render ediyor. Düz ASCII başlıklar.
  const isQuote = input.leadSource.includes("Makine Teklifi");
  const title = isQuote ? "WEBSITE - FIYAT TEKLIFI TALEBI" : "WEBSITE - GENEL ILETISIM";
  const now = new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Istanbul",
  }).format(new Date());

  // Makine sayfa linki — satış temsilcisi Zoho'dan direkt siteye gitsin
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";
  const machineUrl =
    siteUrl && input.machineSlug ? `${siteUrl}/makineler/${input.machineSlug}` : "";

  const machineBlock =
    input.machineTitle || input.machineCode
      ? [
          ">> ILGILENDIGI MAKINE",
          input.machineTitle ?? "-",
          input.machineCode ? `Urun Kodu: ${input.machineCode}` : null,
          machineUrl ? `Makine Sayfasi: ${machineUrl}` : null,
          "",
        ]
          .filter(Boolean)
          .join("\n")
      : "";

  const description = [
    "===============================",
    title,
    "===============================",
    "",
    machineBlock,
    ">> MUSTERI MESAJI",
    input.message,
    "",
    ">> KAYNAK BILGISI",
    input.campaign ? `Kampanya: ${input.campaign}` : "Kampanya: (organik/direkt)",
    `Talep Tarihi: ${now}`,
    "===============================",
  ]
    .filter((s) => s !== "")
    .join("\n");

  // Makine kodu varsa Zoho Products'ta ara → bulursa Lookup field'a bağla.
  // Fail-soft: bulamazsa/hata olursa lead yine oluşur, sadece dropdown boş kalır.
  let productLookup: { id: string } | null = null;
  if (input.machineCode) {
    const hit = await findProductByCode(token, input.machineCode);
    if (hit) productLookup = { id: hit.id };
  }

  const data: Record<string, unknown> = {
    First_Name: input.firstName,
    Last_Name: input.lastName || "—",
    Email: input.email,
    Phone: input.phone,
    Company: input.company || "—",
    Lead_Source: input.leadSource,
    Description: description,
  };
  if (productLookup) {
    data[PRODUCT_LOOKUP_API_NAME] = productLookup;
  }

  const res = await fetch(`https://${API}/crm/v8/Leads`, {
    method: "POST",
    headers: {
      Authorization: `Zoho-oauthtoken ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: [data], trigger: ["approval", "workflow", "blueprint"] }),
    cache: "no-store",
  });

  const json = (await res.json()) as {
    data?: Array<{ code?: string; status?: string; details?: { id?: string } }>;
    message?: string;
  };
  const row = json.data?.[0];
  if (res.ok && row?.status === "success") {
    return { ok: true, id: row.details?.id, code: row.code };
  }
  return { ok: false, code: row?.code ?? "HTTP_" + res.status, detail: json };
}
