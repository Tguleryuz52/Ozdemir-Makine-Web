import { type SchemaTypeDefinition } from "sanity";
import { machine } from "./machine";

// Şema kaydı. Yeni tipler (ör. marka) eklendikçe buraya girer.
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [machine],
};
