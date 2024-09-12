import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: { chunkSizeWarningLimit: 5000 },
  base: "/Rust-Base-Builder/",
  resolve: {
    alias: {
      // "@/assets": "/src/assets",
    },
  },
});
