import { pgTable, text, integer } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
const users = pgTable("users", {
  id: integer().generatedAlwaysAsIdentity().primaryKey(),
  name: text().notNull(),
  age: integer().notNull(),
});
const userSelectSchema = createSelectSchema(users);
