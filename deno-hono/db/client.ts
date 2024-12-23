import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as userSchema from "./schema/users.ts";
import * as projectSchema from "./schema/project.ts";



// Use pg driver.
const { Pool } = pg;

// Instantiate Drizzle client with pg driver and schema.
export const db = drizzle({
  client: new Pool({
    connectionString: Deno.env.get("DATABASE_URL"),
  }),
  schema: { ...userSchema, ...projectSchema },
  logger: true,
  
});



