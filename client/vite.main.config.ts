import { defineConfig } from "vite";

// https://vitejs.dev/config
export default defineConfig({
  build: {
    sourcemap: true,
    rollupOptions: {
      external: ["drizzle-orm", "better-sqlite3", "sqlite3"],
    },
    lib: {
      entry: "src/main.ts",
      fileName: "main",
      formats: ["cjs"],
    },
  },
});
