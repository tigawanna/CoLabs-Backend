import { pgTable, varchar } from "drizzle-orm/pg-core";
import { commonColumns } from "../helpers/columns.js";
import { relations } from "drizzle-orm";
import { projectsTable } from "./project.js";

export const usersTable = pgTable("users", {
  ...commonColumns,
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});


export const usersTableRElations = relations(usersTable, ({ one }) => ({
  projects:one(projectsTable,{
    fields: [usersTable.id],
    references: [projectsTable.owner],
  }),
  
}))
