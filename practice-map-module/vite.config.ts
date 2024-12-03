import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // use mkcert to generate localhost.pem and localhost-key.pem if you want to use https
    https: {
      key: "./localhost-key.pem",
      cert: "./localhost.pem",
    },
  },
});
