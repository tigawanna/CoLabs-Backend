
import { pgTable, text, integer } from "drizzle-orm/pg-core";
import { createSelectSchema } from "npm:drizzle-zod@^0.6.1";
const users = pgTable("users", {
  id: integer().generatedAlwaysAsIdentity().primaryKey(),
  name: text().notNull(),
  age: integer().notNull(),
});
const userSelectSchema = createSelectSchema(users);
