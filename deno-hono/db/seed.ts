import { seed } from "drizzle-seed";
import { usersTable } from "./schema/users.ts";
import { projectsTable } from "./schema/project.ts";
import { db } from "./client.ts";

console.log("Deno env ", Deno.env.get("DATABASE_URL"));
// @ts-expect-error : the types for seed and db have drifted but this still workd
await seed(db, {usersTable,projectsTable}, { count: 1000 });
