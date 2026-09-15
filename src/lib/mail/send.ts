// Resend ile e-posta gönderimi. Sadece server tarafı — key kesinlikle client'a sızmasın.
// Prod domain doğrulanana dek FROM = "Özdemir Makine <onboarding@resend.dev>" test adresi.
// Domain doğrulanınca FROM_EMAIL env'den okunur.

import "server-only";
import { Resend } from "resend";

const KEY = process.env.RESEND_API_KEY;
const FROM = process.env.MAIL_FROM ?? "Özdemir Makine <onboarding@resend.dev>";

function client() {
  if (!KEY) throw new Error("RESEND_API_KEY_MISSING");
  return new Resend(KEY);
}

export type SendResult = { ok: boolean; id?: string; error?: string };

async function send(to: string, subject: string, html: string): Promise<SendResult> {
  try {
    const { data, error } = await client().emails.send({
      from: FROM,
      to,
      subject,
      html,
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true, id: data?.id };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

const BRAND = "#0a509e";

// -- Kullanıcıya teşekkür ---------------------------------------------------
export function sendThankYou(input: {
  to: string;
  firstName: string;
  machineTitle?: string;
}): Promise<SendResult> {
  const subject = input.machineTitle
    ? `Talebiniz alındı — ${input.machineTitle}`
    : "Talebiniz alındı — Özdemir Makine";
  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#F2F0EC;font-family:'Helvetica Neue',Arial,sans-serif;color:#0E0E0E">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;padding:32px;border:1px solid rgba(14,14,14,.08)">
    <div style="font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:${BRAND};font-weight:600;margin-bottom:12px">Özdemir Makine</div>
    <h1 style="font-size:22px;margin:0 0 12px;line-height:1.25">Merhaba ${escape(input.firstName)},</h1>
    <p style="margin:0 0 12px;line-height:1.6">Talebinizi aldık, teşekkür ederiz. ${input.machineTitle ? `<strong>${escape(input.machineTitle)}</strong> hakkında ` : ""}en kısa sürede sizinle iletişime geçeceğiz.</p>
    <p style="margin:0 0 20px;line-height:1.6;color:rgba(14,14,14,.7)">Mesai saatleri içinde genellikle aynı gün, dışında ilk iş günü dönüş sağlıyoruz.</p>
    <hr style="border:none;border-top:1px solid rgba(14,14,14,.08);margin:24px 0">
    <p style="margin:0;font-size:13px;color:rgba(14,14,14,.6);line-height:1.5">
      Özdemir Makine · <a href="https://ozdemirmakine.com.tr" style="color:${BRAND};text-decoration:none">ozdemirmakine.com.tr</a><br>
      Bağlar Mah. Osmanpaşa Cad. 12. Sk. No: 1/Z1 Bağcılar, İstanbul
    </p>
  </div>
</body></html>`;
  return send(input.to, subject, html);
}

// -- Ofise bildirim ---------------------------------------------------------
export function sendOfficeNotify(input: {
  to: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
  machineTitle?: string;
  machineCode?: string;
  campaign?: string;
  zohoStatus: "ok" | "fail";
  zohoId?: string;
  zohoError?: string;
}): Promise<SendResult> {
  const status = input.zohoStatus === "ok"
    ? `<span style="color:#16a34a">✓ CRM'e yazıldı (ID: ${input.zohoId ?? "-"})</span>`
    : `<span style="color:#dc2626">✗ CRM'e YAZILAMADI — ${escape(input.zohoError ?? "bilinmeyen")}</span>`;
  const subject = `Yeni Lead — ${input.firstName} ${input.lastName}${input.machineTitle ? ` · ${input.machineTitle}` : ""}`;
  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#F2F0EC;font-family:'Helvetica Neue',Arial,sans-serif;color:#0E0E0E">
  <div style="max-width:640px;margin:0 auto;background:#fff;border-radius:16px;padding:28px;border:1px solid rgba(14,14,14,.08)">
    <div style="font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:${BRAND};font-weight:600;margin-bottom:8px">Yeni Lead</div>
    <h1 style="font-size:20px;margin:0 0 16px">${escape(input.firstName)} ${escape(input.lastName)}</h1>
    <p style="margin:0 0 16px">${status}</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      ${row("E-posta", `<a href="mailto:${input.email}" style="color:${BRAND}">${escape(input.email)}</a>`)}
      ${row("Telefon", `<a href="tel:${input.phone.replace(/\D/g, "")}" style="color:${BRAND}">${escape(input.phone)}</a>`)}
      ${input.company ? row("Firma", escape(input.company)) : ""}
      ${input.machineTitle ? row("Makine", `${escape(input.machineTitle)}${input.machineCode ? ` (${escape(input.machineCode)})` : ""}`) : ""}
      ${input.campaign ? row("Kampanya", escape(input.campaign)) : ""}
    </table>
    <div style="margin-top:20px;padding:16px;background:#F2F0EC;border-radius:8px;white-space:pre-wrap;font-size:14px;line-height:1.6">${escape(input.message)}</div>
    <p style="margin:20px 0 0;font-size:12px;color:rgba(14,14,14,.5)">Özdemir Web · otomatik bildirim</p>
  </div>
</body></html>`;
  return send(input.to, subject, html);
}

function row(label: string, value: string): string {
  return `<tr><td style="padding:6px 0;color:rgba(14,14,14,.6);width:120px">${label}</td><td style="padding:6px 0">${value}</td></tr>`;
}

function escape(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c);
}
