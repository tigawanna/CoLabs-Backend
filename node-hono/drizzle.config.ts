import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { envVariables } from "./src/env.js";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: envVariables.dbUrl,
  },
});
