import { pgTable, varchar } from "drizzle-orm/pg-core";
import { commonColumns } from "../helpers/columns.ts";

export const usersTable = pgTable("users", {
  ...commonColumns,
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});
