// Loading environment variables from .env files
// https://docs.astro.build/en/guides/configuring-astro/#environment-variables
import { loadEnv } from "vite";
const {
  PUBLIC_SANITY_STUDIO_PROJECT_ID,
  PUBLIC_SANITY_STUDIO_DATASET,
  PUBLIC_SANITY_PROJECT_ID,
  PUBLIC_SANITY_DATASET,
} = loadEnv(import.meta.env.MODE, process.cwd(), "");
import { defineConfig } from "astro/config";

// Different environments use different variables
const projectId = PUBLIC_SANITY_STUDIO_PROJECT_ID || PUBLIC_SANITY_PROJECT_ID;
const dataset = PUBLIC_SANITY_STUDIO_DATASET || PUBLIC_SANITY_DATASET;

import sanity from "@sanity/astro";
import react from "@astrojs/react";

// Change this depending on your hosting provider (Vercel, Netlify etc)
// https://docs.astro.build/en/guides/server-side-rendering/#adding-an-adapter
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  vite: {
    define: {
    'process.env': {},
  },
  resolve: {
    alias: {
      process: 'process/browser',
    },
  },
    optimizeDeps: {
      exclude: ['chunk-3ELGFXP2.js', 'chunk-JD2VGPCS.js', 'chunk-AOPXVOHO.js'], 
    },
  },
  // Hybrid+adapter is required to support embedded Sanity Studio
   output: "server",
  adapter: vercel(),
  integrations: [sanity({
    projectId,
    dataset,
    studioBasePath: "/admin",
    stega: {
      studioUrl: "/admin",
    },
    useCdn: false,
    // `false` if you want to ensure fresh data
    apiVersion: "2024-01-17" // Set to date of setup to use the latest API version
  }), react() // Required for Sanity Studio
  ]
});