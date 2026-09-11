"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity/config";

// Sanity config'i client sınırının arkasında yüklenir — aksi halde Next 16/Turbopack
// config'i RSC katmanında derler, 'swr' react-server sürümüne düşer ve 'default export'
// bulunamaz. Bu sınır sayesinde swr tarayıcı sürümüne çözülür.
export default function Studio() {
  return <NextStudio config={config} />;
}
