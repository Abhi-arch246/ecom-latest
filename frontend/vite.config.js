import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    build: {
      outDir: path.resolve(__dirname, "dist"),
      rollupOptions: {
        input: {
          index: path.resolve(__dirname, "src/index.html"),
        },
      },
    },
    proxy: {
      "/api": {
        target: "http://localhost:5050/",
        changeOrigin: true,
      },
    },
  },
});
