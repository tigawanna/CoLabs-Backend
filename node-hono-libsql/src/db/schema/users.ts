import { pgTable, varchar, text } from "drizzle-orm/pg-core";
import { commonColumns } from "../helpers/columns.ts";
import { relations } from "drizzle-orm";
import { projectsTable } from "./project.ts";

export const usersTabl = pgTable("users", {
  ...commonColumns,
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  githubUsername: varchar({ length: 255 }).notNull().unique(),
  location: varchar({ length: 255 }),
  avatarUrl: text(),
});



