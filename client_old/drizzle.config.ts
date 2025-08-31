import { defineConfig } from "drizzle-kit";
import { env } from "./src/config";
import { join } from "path";

const dbFile =
  process.env.DB_PATH && process.env.DB_NAME
    ? `file:${process.env.DB_PATH}/${process.env.DB_NAME}`
    : "file:./out/database/app.db";

export default defineConfig({
  dialect: "sqlite",
  schema: "src/database/schema/index.ts",
  out: "migrations",
  dbCredentials: {
    url: dbFile,
  },
});
