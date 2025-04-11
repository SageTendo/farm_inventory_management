import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./database/schema/index.ts",
  out: "./database/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
});
