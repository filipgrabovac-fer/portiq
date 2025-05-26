import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    "import.meta.env.GOOGLE_CLIENT_ID": JSON.stringify(
      process.env.GOOGLE_CLIENT_ID
    ),
    "import.meta.env.GOOGLE_CLIENT_SECRET": JSON.stringify(
      process.env.GOOGLE_CLIENT_SECRET
    ),
    "import.meta.env.GOOGLE_REDIRECT_URI": JSON.stringify(
      process.env.GOOGLE_REDIRECT_URI
    ),
    "import.meta.env.LINKEDIN_CLIENT_ID": JSON.stringify(
      process.env.LINKEDIN_CLIENT_ID
    ),
    "import.meta.env.LINKEDIN_CLIENT_SECRET": JSON.stringify(
      process.env.LINKEDIN_CLIENT_SECRET
    ),
    "import.meta.env.LINKEDIN_REDIRECT_URI": JSON.stringify(
      process.env.LINKEDIN_REDIRECT_URI
    ),
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
    watch: {
      usePolling: true,
    },
  },
});
