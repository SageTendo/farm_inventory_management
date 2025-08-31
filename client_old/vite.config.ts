import { defineConfig } from "vite";
import path from "node:path";
import electron from "vite-plugin-electron/simple";
import react from "@vitejs/plugin-react";
import { externalizeDeps } from "vite-plugin-externalize-deps";

export default defineConfig({
  plugins: [
    react(),
    externalizeDeps({
      include: ["@libsql/*"], // don't bundle libsql native deps
    }),
    electron({
      main: {
        entry: "electron/main.ts",
      },
      preload: {
        input: path.join(__dirname, "electron/preload.ts"),
      },
    }),
  ],
  build: {
    rollupOptions: {
      external: [
        "@libsql/client",
        "@libsql/linux-x64-gnu",
        "@libsql/win32-x64-msvc",
      ],
    },
    commonjsOptions: {
      ignoreDynamicRequires: true, // let Node resolve them at runtime
    },
  },
});
