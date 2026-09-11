import { defineCliConfig } from "sanity/cli";

// projectId/dataset public bilgidir (NEXT_PUBLIC), gizli değil — CLI için burada sabit.
export default defineCliConfig({
  api: { projectId: "qgzvu8g9", dataset: "production" },
});
