import { defineConfig } from "drizzle-kit";
import { env } from "./src/config";

export default defineConfig({
  dialect: "sqlite",
  schema: env.DB_PATH + "/schema/index.ts",
  out: env.DB_MIGRATIONS_PATH,
  dbCredentials: {
    url: env.DB_FILE as string,
  },
});
