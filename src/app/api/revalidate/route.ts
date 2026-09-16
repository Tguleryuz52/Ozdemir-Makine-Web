import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

// Sanity Studio → publish → bu route çağrılır → ilgili tag revalidate olur → site anında güncellenir.
// Studio → API → Webhooks → Create:
//   URL:     https://<domain>/api/revalidate
//   Trigger: On create/update/delete
//   Filter:  _type in ["machine","post","galleryItem","siteSettings","stockCategory"]
//   Secret:  SANITY_WEBHOOK_SECRET .env değeri (Sensitive)
//   Payload: Include drafts YES (Studio drafts test edilebilsin)

type WebhookBody = { _type?: string };

const TYPE_TO_TAG: Record<string, string> = {
  machine: "machine",
  post: "post",
  galleryItem: "gallery",
  siteSettings: "settings",
  stockCategory: "stock",
};

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, error: "SECRET_MISSING" }, { status: 500 });
  }

  const { isValidSignature, body } = await parseBody<WebhookBody>(req, secret);
  if (!isValidSignature) {
    return NextResponse.json({ ok: false, error: "INVALID_SIGNATURE" }, { status: 401 });
  }
  if (!body?._type) {
    return NextResponse.json({ ok: false, error: "MISSING_TYPE" }, { status: 400 });
  }

  const tag = TYPE_TO_TAG[body._type];
  if (!tag) {
    return NextResponse.json({ ok: true, skipped: body._type });
  }
  // expire:0 → publish sonrası bir sonraki istek blocking fetch olur, taze veri garantili.
  // CMS publish sıklığı düşük (günde birkaç kez); marjinal yavaşlık, taze içerik uğruna.
  revalidateTag(tag, { expire: 0 });
  return NextResponse.json({ ok: true, revalidated: tag });
}
