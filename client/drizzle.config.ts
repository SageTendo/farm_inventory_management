import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: process.env.DB_PATH + "/schema/index.ts",
  out: process.env.DB_MIGRATIONS_PATH,
  dbCredentials: {
    url: process.env.DB_FILE as string,
  },
});
