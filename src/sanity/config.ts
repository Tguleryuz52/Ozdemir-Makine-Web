import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schema } from "./schemaTypes";
import { structure } from "./structure";
import { apiVersion, dataset, projectId } from "./env";

// Gömülü Studio config'i. Panel /studio altında yaşar. (Root sanity.config.ts bunu re-export eder.)
export default defineConfig({
  basePath: "/studio",
  title: "Özdemir Makine",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
