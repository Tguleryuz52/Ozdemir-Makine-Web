import { type NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { z } from "zod";
import { insertLead, type LeadInput } from "@/lib/zoho/client";
import { sendOfficeNotify, sendThankYou } from "@/lib/mail/send";
import { checkRateLimit } from "@/lib/rate-limit/ip";

// Form → bu route → Zoho CRM Lead + kullanıcıya teşekkür + ofise bildirim.
// Zoho fail etse bile ofis mail alır → hiçbir lead sessizce kaybolmaz.
// Honeypot: `website` alanı gizli, dolusa 200 döner ama Zoho/mail gitmez (bot şüphesiz sansın).

const schema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email().max(200),
  phone: z.string().min(6).max(30),
  company: z.string().max(200).optional(),
  message: z.string().min(1).max(2000),
  makineKodu: z.string().max(120).optional(),
  makineSlug: z.string().max(200).optional(), // sayfa linki için
  leadSource: z.string().max(120).default("Website — İletişim"),
  kampanya: z.string().max(200).optional(),
  makineBaslik: z.string().max(200).optional(), // istemciden gelen kullanıcı-dostu ad (mail için)
  website: z.string().max(0).optional(), // honeypot: bot dolduracak, insan boş bırakacak
});

function getIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]?.trim() ?? "unknown";
  const real = req.headers.get("x-real-ip");
  return real ?? "unknown";
}

export async function POST(req: NextRequest) {
  const ip = getIp(req);
  const rl = checkRateLimit(ip);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "RATE_LIMIT", retryAfter: rl.retryAfter },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter ?? 60) } },
    );
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "INVALID_JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "VALIDATION", detail: parsed.error.flatten() }, { status: 422 });
  }
  const b = parsed.data;

  // Honeypot: bot 'website' alanını doldurur; başarı gibi yanıt döneriz, arka planda hiçbir şey yapmayız.
  if (b.website && b.website.length > 0) {
    return NextResponse.json({ ok: true, silent: true });
  }

  const leadInput: LeadInput = {
    firstName: b.firstName,
    lastName: b.lastName,
    email: b.email,
    phone: b.phone,
    company: b.company,
    message: b.message,
    machineCode: b.makineKodu,
    machineTitle: b.makineBaslik,
    machineSlug: b.makineSlug,
    leadSource: b.leadSource,
    campaign: b.kampanya,
  };

  // 1) Zoho CRM'e yaz
  let zoho: Awaited<ReturnType<typeof insertLead>>;
  try {
    zoho = await insertLead(leadInput);
  } catch (e) {
    zoho = { ok: false, code: (e as Error).message };
  }

  const officeTo = process.env.LEAD_NOTIFY_EMAIL;
  const machineTitle = b.makineBaslik;

  // 2) Kullanıcıya teşekkür maili — Zoho durumu ne olursa olsun git (dönüş sözü verdik)
  const userMail = sendThankYou({ to: b.email, firstName: b.firstName, machineTitle });

  // 3) Ofise bildirim (Zoho status ile) — güvenlik ağı: Zoho fail ederse buradan görülür
  const officeMail = officeTo
    ? sendOfficeNotify({
        to: officeTo,
        firstName: b.firstName,
        lastName: b.lastName,
        email: b.email,
        phone: b.phone,
        company: b.company,
        message: b.message,
        machineTitle,
        machineCode: b.makineKodu,
        campaign: b.kampanya,
        zohoStatus: zoho.ok ? "ok" : "fail",
        zohoId: zoho.id,
        zohoError: zoho.ok ? undefined : String(zoho.code ?? "UNKNOWN"),
      })
    : Promise.resolve({ ok: false, error: "LEAD_NOTIFY_EMAIL_MISSING" });

  const [userResult, officeResult] = await Promise.all([userMail, officeMail]);

  // Kullanıcıya sadece "aldık" cevabı ver — arka plandaki hatalar loglara ve ofis mail'ine düşer.
  if (!zoho.ok || !userResult.ok || !officeResult.ok) {
    const detail = {
      zoho: zoho.ok ? "ok" : zoho.code,
      userMail: userResult.ok ? "ok" : userResult.error,
      officeMail: officeResult.ok ? "ok" : officeResult.error,
    };
    console.error("[lead] partial failure", detail);
    // Sentry alarmı — lead kaybı riskini anında gör (email dahil: kaybolan lead'i kurtarabilmek için;
    // kendi özel Sentry projemiz, meşru iş amacı).
    Sentry.captureMessage("Lead partial failure (Zoho/mail)", {
      level: zoho.ok ? "warning" : "error",
      extra: { ...detail, email: b.email, machineCode: b.makineKodu, campaign: b.kampanya },
    });
  }
  return NextResponse.json({ ok: true });
}
