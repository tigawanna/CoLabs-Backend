import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as userSchema from "./schema/users.ts";
import * as projectSchema from "./schema/project.ts";
import { Logger } from "drizzle-orm/logger";
import { formatSqlQuery } from "./helpers/query-logger.ts";

class MyLogger implements Logger {
  logQuery(query: string, params: unknown[]): void {
    console.log("=== DRIZZLE QUERY ===");
    console.log(`%c${formatSqlQuery(query)}`, "color:cyan");
    if (params && params.length > 0) {
      console.log("=== DRIZZLE PARAMS ===");
      console.log(`%c${JSON.stringify(params)}`, "color:blue");
    }
  }
}

// Use pg driver.
const { Pool } = pg;
// Instantiate Drizzle client with pg driver and schema.
export const db = drizzle({
  client: new Pool({
    connectionString: Deno.env.get("DATABASE_URL"),
  }),
  schema: { ...userSchema, ...projectSchema },
  logger: Deno.env.get("DEV")?new MyLogger():false,
});
