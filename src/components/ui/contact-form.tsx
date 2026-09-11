"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { contactContent } from "@/content/site";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

// himon /contact form uyarlaması. Tek form iki yüzeyde kullanılır:
//  - genel /iletisim
//  - /iletisim?makine=<productCode> → prefillMessage + machineCode gizli alana yazılır
// Gizli alanlar Zoho CRM web formuna bağlanacak (leadSource/kampanya baştan dolu gelsin diye).
// Şimdilik gönderim client-side stub → başarı ekranı. TODO(Zoho): submit'i webform/API'ye bağla.

type FieldName = "firstName" | "lastName" | "company" | "phone" | "email" | "message";

const ORDER: FieldName[] = ["firstName", "lastName", "company", "phone", "email", "message"];

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8h9M8.5 3.5 13 8l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m5 12.5 4.2 4.2L19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// himon: yumuşak Sans etiket (mono değil) — teknik/kalın his gitti, premium.
const labelCls =
  "mb-2 block text-[12px] font-medium uppercase tracking-[0.06em] text-ink/60";
const fieldCls =
  "w-full rounded-lg border border-ink/12 bg-white px-4 py-3.5 text-[16px] leading-tight text-ink outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-ink/35 focus:border-brand focus:ring-2 focus:ring-brand/20";

export interface ContactFormProps {
  /** ?makine=... ile gelindiğinde mesaj alanına önden yazılır. */
  prefillMessage?: string;
  /** Zoho gizli alanı: talebin hangi makineden geldiği. */
  machineCode?: string;
  /** Teklif akışında buton metni değişir. */
  isQuote?: boolean;
  className?: string;
}

export function ContactForm({
  prefillMessage = "",
  machineCode = "",
  isQuote = false,
  className,
}: ContactFormProps) {
  const { fields, submit, submitQuote, assurances, success } = contactContent.form;
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Native HTML5 doğrulaması geçtiyse buraya gelir (form'da noValidate yok).
    // TODO(Zoho): FormData'yı Zoho CRM web formuna / API route'a POST et.
    // Gizli alanlar (makineKodu, leadSource, kampanya) form içinde hazır.
    setSent(true);
  }

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className={cn(
          "flex flex-col items-start gap-5 rounded-2xl border border-ink/10 bg-paper/60 p-8 sm:p-10",
          className,
        )}
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-brand text-white">
          <CheckIcon />
        </span>
        <div>
          <p className="text-heading font-medium tracking-tight text-ink">{success.title}</p>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink/60">{success.body}</p>
        </div>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-1 inline-flex items-center gap-2 text-[14px] font-medium text-brand underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          {success.again}
          <ArrowIcon />
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col", className)}>
      {/* Gizli Zoho alanları — lead kaynağı asla boş gitmesin */}
      <input type="hidden" name="makineKodu" value={machineCode} />
      <input type="hidden" name="leadSource" value={machineCode ? "Website — Makine Teklifi" : "Website — İletişim"} />
      <input type="hidden" name="kampanya" value="" />

      <div className="grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2">
        {ORDER.map((name) => {
          const f = fields[name];
          const isFull = name === "company" || name === "message";
          const isTextarea = name === "message";
          const id = `cf-${name}`;
          return (
            <div key={name} className={cn(isFull && "sm:col-span-2")}>
              <label htmlFor={id} className={labelCls}>
                {f.label}
                {f.required && <span className="ml-1 text-brand">*</span>}
              </label>
              {isTextarea ? (
                <textarea
                  id={id}
                  name={name}
                  required={f.required}
                  rows={5}
                  defaultValue={prefillMessage}
                  placeholder={f.placeholder}
                  className={cn(fieldCls, "resize-none")}
                />
              ) : name === "phone" ? (
                <div className="flex items-stretch overflow-hidden rounded-lg border border-ink/12 bg-white transition-[border-color,box-shadow] duration-200 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20">
                  <select
                    name="telefonKodu"
                    defaultValue="+90"
                    aria-label="Ülke telefon kodu"
                    className="cursor-pointer select-none border-r border-ink/10 bg-paper/50 py-3.5 pl-3.5 pr-2 text-[15px] font-medium text-ink/75 outline-none transition-colors hover:bg-paper focus-visible:bg-paper"
                  >
                    {contactContent.phoneCountries.map((c) => (
                      <option key={c.code} value={c.dial}>
                        {c.flag} {c.dial}
                      </option>
                    ))}
                  </select>
                  <input
                    id={id}
                    name={name}
                    type="tel"
                    inputMode="tel"
                    required={f.required}
                    placeholder={f.placeholder}
                    className="w-full bg-transparent px-4 py-3.5 text-[16px] leading-tight text-ink outline-none placeholder:text-ink/35"
                  />
                </div>
              ) : (
                <input
                  id={id}
                  name={name}
                  type={name === "email" ? "email" : "text"}
                  required={f.required}
                  placeholder={f.placeholder}
                  className={fieldCls}
                />
              )}
            </div>
          );
        })}
      </div>

      <button
        type="submit"
        className="group mt-8 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-ink px-8 py-4 text-[15px] font-medium tracking-tight text-white transition-colors duration-300 hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        {isQuote ? submitQuote : submit}
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          <ArrowIcon />
        </span>
      </button>

      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
        {assurances.map((a) => (
          <li key={a} className="inline-flex items-center gap-1.5 text-[12.5px] text-ink/55">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="shrink-0 text-brand"
            >
              <path
                d="m5 12.5 4.2 4.2L19 7"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {a}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default ContactForm;
