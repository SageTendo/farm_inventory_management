import { defineConfig } from "vite";

// https://vitejs.dev/config
export default defineConfig({
  build: {
    rollupOptions: {
      external: ["drizzle-orm", "better-sqlite3", "sqlite3"],
    },
    lib: {
      entry: "src/main.ts",
      formats: ["cjs"],
    },
  },
});
