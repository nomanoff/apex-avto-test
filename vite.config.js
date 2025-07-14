import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "My Test PWA",
        short_name: "TestPWA",
        description: "Just testing Vite + React + PWA",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "/icon-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "/icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "/icon-96x96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "/icon-72x72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "/icon-48x48.png",
            sizes: "48x48",
            type: "image/png",
          },
        ],
      },
      workbox: {
        navigateFallback: "/index.html",
      },
    }),
  ],
});
