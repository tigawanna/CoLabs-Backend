/* eslint-disable no-console */
import type { Logger } from "drizzle-orm/logger";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { drizzle as pgDrizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

import { envVariables } from "@/env";
import { ANSIColors } from "@/utils/text";

import { formatSqlQuery } from "./helpers/query-logger";
import * as auditLogSchema from "./schema/auditlogs";
import * as authSchema from "./schema/auth";

class MyLogger implements Logger {
  logQuery(query: string, params: unknown[]): void {
    console.log(ANSIColors.Bright, "\n=== DRIZZLE QUERY ===");
    console.log("", formatSqlQuery(query), "\n");
    if (params && params.length > 0) {
      console.log(ANSIColors.Bright, "=== DRIZZLE PARAMS === ", ANSIColors.Reset, params, "\n");
      // console.log(params)
    }
  }
}

const RETRY_ATTEMPTS = 5;
const RETRY_DELAY = 2_000;

async function createLocalPool() {
  const { Pool } = pg;
  const pool = new Pool({
    max: 20,
    idleTimeoutMillis: 50_000,
    connectionTimeoutMillis: 5_000,
    connectionString: envVariables.DATABASE_URL,
  });

  // Test connection with retries
  for (let i = 0; i < RETRY_ATTEMPTS; i++) {
    try {
      const client = await pool.connect();

      console.log(`${ANSIColors.FgGreen}Successfully connected to local database at \n=> ${envVariables.DATABASE_URL}${ANSIColors.Reset}`);
      client.release();
      return pool;
    }
    catch (error) {
      console.error(`Connection attempt ${i + 1} failed:`, error);
      if (i < RETRY_ATTEMPTS - 1) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      }
    }
  }
  throw new Error("Failed to connect to database after multiple attempts");
}

export const SCHEMAS = { ...authSchema, ...auditLogSchema };
// const SCHEMAS = { };
export async function createDB() {
  if (envVariables.NODE_ENV === "development") {
    const pool = await createLocalPool();
    return pgDrizzle({
      client: pool,
      schema: SCHEMAS,
      logger: envVariables.LOG_LEVEL === "debug" && new MyLogger(),
    });
  }
  console.log(`${ANSIColors.FgGreen}Successfully connected to neon database at ${envVariables.DATABASE_URL}${ANSIColors.Reset}`);
  return drizzle({
    client: neon(envVariables.DATABASE_URL),
    schema: SCHEMAS,
  });
}

export const db = await createDB().catch((error) => {
  console.error("Failed to initialize database:", error);
  process.exit(1);
});

// export const db = drizzle({
//   client: neon(envVariables.DATABASE_URL),
//   schema: SCHEMAS,
// });

//  run only use for local
// const pool = await createLocalPool();
// export const db = pgDrizzle({
//   client: pool,
//   schema: SCHEMAS,
//   logger: envVariables.LOG_LEVEL === "debug" && new MyLogger(),
// });
