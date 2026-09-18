// Faz 3 — Zoho Products -> Sanity makine import'u (metin + fail-soft foto).
// Kullanım:
//   node scripts/import-zoho-machines.mjs --codes 20024,20022     -> sadece bu kodlar (doğrulama)
//   node scripts/import-zoho-machines.mjs 0 30                     -> offset 0, limit 30 (bölük)
//   node scripts/import-zoho-machines.mjs                          -> tüm 166
//   ... --no-photos                                                -> foto atla (sadece metin)
// Idempotent: _id=machine.<Product_Code>. Mevcut gorseller varsa yeniden yüklemez.
import { readFileSync } from "node:fs";
import { createClient } from "@sanity/client";

const ENV = new URL("../.env.local", import.meta.url);
const env = readFileSync(ENV, "utf8");
const g = (k) => env.match(new RegExp("^\\s*" + k + "\\s*=\\s*(.+?)\\s*$", "m"))?.[1]?.replace(/^["']|["']$/g, "").trim() ?? "";
const ACC = g("ZOHO_CRM_ACCOUNTS_DOMAIN") || "accounts.zoho.eu";
const API = g("ZOHO_CRM_API_DOMAIN") || "www.zohoapis.eu";

const sanity = createClient({ projectId: "qgzvu8g9", dataset: "production", apiVersion: "2025-01-01", token: g("SANITY_API_READ_TOKEN"), useCdn: false });

// ---- args ----
const args = process.argv.slice(2);
const noPhotos = args.includes("--photos") ? false : args.includes("--no-photos");
const codesArg = args.includes("--codes") ? args[args.indexOf("--codes") + 1] : null;
const imagesOnly = args.includes("--images-only");
const nums = args.filter((a) => /^\d+$/.test(a)).map(Number);
const [offset, limit] = [nums[0] ?? 0, nums[1] ?? Infinity];
const imagesLimit = imagesOnly ? (nums[0] ?? 30) : null;

// ---- normalizasyon haritaları ----
const BRAND_MAP = { "ASTER":"Aster","BECKER":"Becker","Billhofer":"Billhofer","BLUEMECHANIC":"Bluemechanic","BOBST":"Bobst","DAYUAN":"Dayuan","DGM":"DGM","EUROCUTTER":"Eurocutter","FKS":"FKS","GMB":"GMB","HEIDELBERG":"Heidelberg","HORDA":"Horda","HPM":"HPM","HUATAI":"Huatai","INRAMIK VESTA":"Inramik Vesta","Koenig & Bauer":"Koenig & Bauer","KOLBUS":"Kolbus","MAN ROLAND":"Man Roland","MULLER MARTINI":"Müller Martini","NAGEL":"Nagel","OYANG":"Oyang","POLAR":"Polar","STEINEMANN LOTUS":"Steinemann Lotus","YAWA":"Yawa","YOCO":"Yoco","YUANHENG":"Yuanheng" };
const titleCase = (s) => s.toLowerCase().replace(/(^|\s|&)\p{L}/gu, (m) => m.toUpperCase());
const normBrand = (b) => !b ? "Diğer" : (BRAND_MAP[b] ?? BRAND_MAP[b.toUpperCase()] ?? titleCase(b));

const CAT_MAP = { "Laminasyon Makineleri":"Laminasyon","Kutu Kesim Makineleri":"Kutu Kesim","Kağıt Kesim Makineleri ve Ekipmanları":"Kağıt Kesim","Çanta Yapma Makineleri":"Çanta Yapma","Baskı Sonrası Makineleri":"Baskı Sonrası","Baskı Sonrası":"Baskı Sonrası","Katlama ve Yapıştırma Makineleri":"Katlama & Yapıştırma","Baskı Aksesuarları":"Baskı Aksesuarları","Ofset Baskı":"Ofset Baskı","Palet Çevirme Makineleri":"Palet Çevirme","Kutu Toplama Makineleri":"Kutu Toplama" };
function parseCategory(pc) {
  let grup = "ikinci-el", durum = "İkinci El", rest = (pc || "").trim();
  if (/^SIFIR\b/i.test(rest)) { grup = "sifir"; durum = "Sıfır"; rest = rest.replace(/^SIFIR\s*/i, "").trim(); }
  else if (/^2\.?\s*EL\b/i.test(rest)) { grup = "ikinci-el"; durum = "İkinci El"; rest = rest.replace(/^2\.?\s*EL\s*/i, "").trim(); }
  return { grup, durum, kategori: CAT_MAP[rest] ?? rest ?? "Baskı Sonrası" };
}

// Bir dil bloğunu temizler: tire dizileri, [TR]/[ENG] işaretleri, "ÖZELLİKLER:/DETAILS:"
// başlıkları atılır; ➢ maddeler bullets'a, kalan metin text'e.
function cleanBlock(block) {
  if (!block) return {};
  const bullets = [], keep = [];
  for (const raw of block.split(/\r?\n/)) {
    let l = raw.replace(/[-–—_]{3,}/g, " ").replace(/\s{2,}/g, " ").trim();
    if (!l) continue;
    if (/^\[(TR|EN|DE|ENG)\]$/i.test(l)) continue;
    if (/^(ÖZELLİKLER|ÖZELLIKLERI|DETAYLAR|DETAILS|FEATURES|Özellikleri)\s*:?\s*$/i.test(l)) continue;
    if (l.startsWith("➢")) { const b = l.replace(/^➢\s*/, "").trim(); if (b) bullets.push(b); continue; }
    l = l.replace(/\s*\b(ÖZELLİKLER|DETAYLAR|DETAILS|FEATURES|Özellikleri)\s*:\s*$/i, "").trim();
    if (l) keep.push(l);
  }
  return { text: keep.join("\n").trim() || undefined, bullets: bullets.length ? bullets : undefined };
}
// [ENG]/[EN] işaretinden TR ve EN'i böler, ikisini de temizler.
function parseDesc(desc) {
  if (!desc) return {};
  const [tr, ...enParts] = desc.split(/\[EN(?:G)?\]/i);
  const T = cleanBlock(tr), E = cleanBlock(enParts.join("\n"));
  return { aciklama: T.text, aciklamaEn: E.text, ozellikler: T.bullets };
}

const RENK = { "1":"Tek Renkli","2":"2 Renkli","4":"4 Renkli","5":"5 Renkli","6":"6 Renkli","8":"8 Renkli","10":"10 Renkli" };
const parseRenk = (t) => { const m = (t || "").match(/(\d+)\s*RENK/i); return m ? RENK[m[1]] : undefined; };

const TR = { "ı":"i","İ":"i","ş":"s","Ş":"s","ğ":"g","Ğ":"g","ü":"u","Ü":"u","ö":"o","Ö":"o","ç":"c","Ç":"c" };
const slugify = (s) => (s || "").replace(/[ıİşŞğĞüÜöÖçÇ]/g, (c) => TR[c] || c).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 90);
const deriveModel = (name, brand) => { if (!name) return undefined; const re = new RegExp("^" + (brand || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"); return (brand ? name.replace(re, "").trim() : name) || undefined; };
const rk = () => Math.random().toString(36).slice(2, 14);
const clean = (o) => { for (const k of Object.keys(o)) if (o[k] === undefined) delete o[k]; return o; };

// ---- Zoho ----
async function zohoToken() {
  const r = await fetch(`https://${ACC}/oauth/v2/token`, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ refresh_token: g("ZOHO_CRM_REFRESH_TOKEN"), client_id: g("ZOHO_CRM_CLIENT_ID"), client_secret: g("ZOHO_CRM_CLIENT_SECRET"), grant_type: "refresh_token" }) });
  const j = await r.json();
  if (!j.access_token) throw new Error("Zoho token: " + JSON.stringify(j));
  return j.access_token;
}
async function zohoGet(token, path) {
  const r = await fetch(`https://${API}/crm/v8/${path}`, { headers: { Authorization: `Zoho-oauthtoken ${token}` } });
  if (r.status === 204) return { data: [] };
  if (!r.ok) throw new Error(`GET ${path} -> ${r.status}`);
  return r.json();
}
async function allProducts(token) {
  const fields = "Product_Code,Product_Name,MACHINES,BRAND,YEAR,SIZE,COPY,PRICE,Product_Category,Description";
  const j = await zohoGet(token, `Products?fields=${fields}&per_page=200`);
  return j.data || [];
}

// Ürünün resim eklerini indir -> Sanity'ye yükle -> image objesi dizisi (fail-soft)
async function importPhotos(token, productId) {
  let atts = [];
  try { atts = (await zohoGet(token, `Products/${productId}/Attachments?fields=id,File_Name`)).data || []; }
  catch { return []; }
  const imgs = atts.filter((a) => /\.(jpe?g|png|webp)$/i.test(a.File_Name || ""))
    .sort((a, b) => (a.File_Name || "").localeCompare(b.File_Name || "", undefined, { numeric: true }));
  const out = [];
  for (const a of imgs) {
    try {
      const dr = await fetch(`https://${API}/crm/v8/Products/${productId}/Attachments/${a.id}`, { headers: { Authorization: `Zoho-oauthtoken ${token}` } });
      if (!dr.ok) { console.log(`    ! foto indirme ${a.File_Name} -> ${dr.status}`); continue; }
      const buf = Buffer.from(await dr.arrayBuffer());
      const asset = await sanity.assets.upload("image", buf, { filename: a.File_Name });
      out.push({ _type: "image", _key: rk(), asset: { _type: "reference", _ref: asset._id } });
    } catch (e) { console.log(`    ! foto ${a.File_Name}: ${e.message}`); }
  }
  return out;
}

function buildDoc(p, gorseller) {
  const { grup, durum, kategori } = parseCategory(p.Product_Category);
  const { aciklama, aciklamaEn, ozellikler } = parseDesc(p.Description);
  const marka = normBrand(p.BRAND);
  const name = p.Product_Name || p.MACHINES || p.Product_Code;
  return clean({
    _id: `machine.${p.Product_Code}`,
    _type: "machine",
    baslik: name,
    slug: { _type: "slug", current: "" }, // aşağıda benzersizleştirilir
    marka,
    model: deriveModel(name, p.BRAND),
    urunKodu: String(p.Product_Code),
    yil: typeof p.YEAR === "number" ? p.YEAR : undefined,
    format: p.SIZE || undefined,
    baskiAdedi: p.COPY || undefined,
    grup, durumRozeti: durum, kategori,
    altKategori: kategori === "Ofset Baskı" ? parseRenk(p.Description) || parseRenk(name) : undefined,
    fiyatSorunuz: true, // iş kuralı — fiyat sitede gizli
    vitrin: false,
    aciklama,
    aciklamaEn,
    oneCikanOzellikler: ozellikler,
    gorseller: gorseller.length ? gorseller : undefined,
  });
}

async function run() {
  const token = await zohoToken();
  let products = await allProducts(token);
  products.sort((a, b) => String(a.Product_Code).localeCompare(String(b.Product_Code), undefined, { numeric: true }));
  if (codesArg) { const set = new Set(codesArg.split(",").map((s) => s.trim())); products = products.filter((p) => set.has(String(p.Product_Code))); }
  else if (imagesOnly) { /* hepsini tara, döngüde fotosu olanı al */ }
  else products = products.slice(offset, offset === 0 && limit === Infinity ? undefined : offset + limit);

  console.log(imagesOnly ? `Fotosu olan ilk ${imagesLimit} makine taranıyor...\n` : `İşlenecek ürün: ${products.length} (foto: ${noPhotos ? "HAYIR" : "evet"})\n`);
  const usedSlugs = new Set(await sanity.fetch(`*[_type=="machine"].slug.current`));
  let ok = 0, withPhotos = 0, photoCount = 0;

  for (const p of products) {
    if (imagesOnly && ok >= imagesLimit) break;
    try {
      const existing = await sanity.fetch(`*[_id=="machine.${p.Product_Code}"][0]{ "n": count(gorseller), "s": slug.current }`);
      let gorseller = [];
      if (!noPhotos) {
        if (existing?.n > 0) {
          // MEVCUT fotoyu çek ve KORU (createOrReplace tüm dokümanı değiştirir → yoksa siler)
          gorseller = (await sanity.fetch(`*[_id==$id][0].gorseller`, { id: `machine.${p.Product_Code}` })) || [];
          console.log(`  = ${p.Product_Code} mevcut foto korunuyor (${existing.n})`);
        } else {
          gorseller = await importPhotos(token, p.id);
        }
      }
      // images-only modu: fotosu olmayanı bu turda atla (sonraki fazda gelir)
      if (imagesOnly && gorseller.length === 0) continue;
      const doc = buildDoc(p, gorseller);
      // benzersiz slug
      let base = existing?.s || slugify(doc.baslik) || `makine-${p.Product_Code}`;
      let slug = base;
      if (!existing?.s) { let i = 1; while (usedSlugs.has(slug)) slug = `${base}-${p.Product_Code}`.slice(0, 90) + (i++ > 1 ? `-${i}` : ""); }
      usedSlugs.add(slug);
      doc.slug = { _type: "slug", current: slug };

      await sanity.createOrReplace(doc);
      if (gorseller.length) { withPhotos++; photoCount += gorseller.length; }
      ok++;
      console.log(`✓ ${p.Product_Code} — ${doc.baslik}  [${doc.grup}/${doc.kategori}]  foto:${gorseller.length || (existing?.n ?? 0)}`);
    } catch (e) {
      console.log(`✗ ${p.Product_Code} HATA: ${e.message}`);
    }
  }
  console.log(`\n✅ ${ok}/${products.length} makine yazıldı. Fotolu: ${withPhotos}, toplam foto: ${photoCount}.`);
}
run().catch((e) => { console.error("FATAL:", e); process.exit(1); });
