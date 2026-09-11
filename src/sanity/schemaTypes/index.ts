import { type SchemaTypeDefinition } from "sanity";
import { machine } from "./machine";
import { post } from "./post";
import { galleryItem } from "./galleryItem";
import { siteSettings } from "./siteSettings";

// Şema kaydı. Yeni tipler eklendikçe buraya girer.
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [machine, post, galleryItem, siteSettings],
};
