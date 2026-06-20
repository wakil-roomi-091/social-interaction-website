import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    // Suppress all warnings during development
    logLevel: "silent",
  },
  build: {
    // Suppress build warnings
    rollupOptions: {
      onwarn: () => {},
    },
  },
});
