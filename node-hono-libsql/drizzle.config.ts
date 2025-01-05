import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { envVariables } from "./src/env.js";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}
export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
