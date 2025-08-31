import { defineConfig } from "drizzle-kit";
import { env } from "./src/config";
import { join } from "path";

export default defineConfig({
  dialect: "sqlite",
  schema: "src/database/schema/index.ts",
  out: "src/database/migrations",
  dbCredentials: {
    url: join(env.DB_PATH, env.DB_NAME),
  },
});
