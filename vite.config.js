import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",

      includeAssets: [
        "favicon.ico",
        "pwa-192x192.png",
        "pwa-512x512.png",
      ],

    manifest: {
  id: "/",

  name: "نيده - كل خدمات البلد",
  short_name: "نيده",

  description:
    "منصة نيده للوصول إلى الخدمات والمحلات والصنايعية وأهم خدمات البلد.",

  lang: "ar",
  dir: "rtl",

  start_url: "/",
  scope: "/",

  display: "standalone",

  orientation: "portrait",

  theme_color: "#367b61",
  background_color: "#f8f9f4",

  icons: [
    {
      src: "/pwa-192x192.png",
      sizes: "192x192",
      type: "image/png",
      purpose: "any",
    },
    {
      src: "/pwa-512x512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any",
    },
    {
      src: "/pwa-512x512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "maskable",
    },
  ],
},

      workbox: {
        cleanupOutdatedCaches: true,

        globPatterns: [
          "**/*.{js,css,html,ico,png,svg,webp,woff,woff2}",
        ],

        navigateFallback: "/index.html",
      },

      devOptions: {
        enabled: true,
      },
    }),
  ],
});