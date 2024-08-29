// Different environments use different variables
const projectId =
  import.meta.env.PUBLIC_SANITY_STUDIO_PROJECT_ID! ||
  import.meta.env.PUBLIC_SANITY_PROJECT_ID!;
const dataset =
  import.meta.env.PUBLIC_SANITY_STUDIO_DATASET! ||
  import.meta.env.PUBLIC_SANITY_DATASET!;

// Feel free to remove this check if you don't need it
if (!projectId || !dataset) {
  throw new Error(
    `Missing environment variable(s). Check if named correctly in .env file.\n\nShould be:\nPUBLIC_SANITY_STUDIO_PROJECT_ID=${projectId}\nPUBLIC_SANITY_STUDIO_DATASET=${dataset}\n\nAvailable environment variables:\n${JSON.stringify(
      import.meta.env,
      null,
      2
    )}`
  );
}

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schema";
import { assist } from "@sanity/assist";
import { presentationTool } from "@sanity/presentation";
import { resolve } from "./src/utils/resolve";

// Load environment variables
const { VITE_DEV_PREVIEW_URL, VITE_PROD_PREVIEW_URL } = import.meta.env;

// Determine the preview URL based on the environment
const isProduction = import.meta.env.PROD;
const previewUrl = isProduction
  ? VITE_PROD_PREVIEW_URL
  : VITE_DEV_PREVIEW_URL || location.origin;

export default defineConfig({
  name: "project-name",
  title: "Project Name",
  projectId,
  dataset,
  plugins: [
    structureTool(),
    visionTool(),
    assist(),
    presentationTool({
      resolve,
      previewUrl,
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
