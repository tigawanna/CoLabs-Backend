import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as userSchema from "./schema/users.ts";
import * as projectSchema from "./schema/project.ts";
import type { Logger } from "drizzle-orm/logger";
import { formatSqlQuery } from "./helpers/query-logger.ts";
import { envVariables } from "@/env.ts";

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
    connectionString: envVariables.dbUrl,
  }),
  schema: { ...userSchema, ...projectSchema },
  logger: envVariables.NODE_ENV === "development"?new MyLogger():false,
});
