import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { usersTable } from "./schema/users.ts";
import { projectsTable } from "./schema/project.ts";


// Use pg driver.
const { Pool } = pg;

// Instantiate Drizzle client with pg driver and schema.
export const db = drizzle({
  client: new Pool({
    connectionString: Deno.env.get("DATABASE_URL"),
  }),
  schema: {usersTable,projectsTable },
});



