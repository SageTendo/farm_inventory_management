import { defineConfig } from "drizzle-kit";

const dbFile =
  process.env.DB_PATH && process.env.DB_NAME
    ? `file:${process.env.DB_PATH}/${process.env.DB_NAME}`
    : "file:./out/database/app.db";

export default defineConfig({
  dialect: "sqlite",
  schema: "src/main/database/schema/index.ts",
  out: "src/main/migrations",
  dbCredentials: {
    url: dbFile,
  },
});
