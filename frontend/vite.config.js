import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    build: {
      outDir: "../dist",
    },
    proxy: {
      "/api": {
        target: "http://localhost:5050/",
        changeOrigin: true,
      },
    },
  },
});
