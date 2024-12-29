import {
  pgTable,
  varchar,
  integer,
  pgEnum,
  jsonb,
  text,
  timestamp,
  primaryKey,
  unique,
  index,
} from "drizzle-orm/pg-core";
import { commonColumns } from "../helpers/columns.ts";
import { usersTable } from "./users.ts";
import { relations } from "drizzle-orm";


const projectType = ["private", "open-source"] as const;
const platforms = ["web", "mobile", "desktop"] as const;

export const projectTypeEnum = pgEnum("project_type", projectType);
export const platformEnum = pgEnum("platform", platforms);

export const projectsTable = pgTable("projects", {
  ...commonColumns,
  title: varchar({ length: 255 }).unique().notNull(),
  description: varchar({ length: 255 }).notNull(),
  owner: text()
    .references(() => usersTable.id)
    .notNull(),
  type: projectTypeEnum().default("open-source"),
  platform: platformEnum().default("web"),
  compensation: jsonb().default({
    monetization_type: "Non-monetized",
  }),
  link: varchar({ length: 255 }),
  // counts
  //  these values don't need to be saved in the database and can be derived from the github api
  languages: varchar({ length: 255 }).notNull(),
  issuesCount: integer().default(0),
  forksCount: integer().default(0),
  starCount: integer().default(0),
  lastCommitDate: timestamp({ withTimezone: true, mode: "string" }).defaultNow(),

},(t) => [{
  index: index().on(t.owner, t.title)
}]
);

export const projectCollaboratorsTable = pgTable(
  "projects_collaborators",
  {
    ...commonColumns,
    project_id: text()
      .references(() => projectsTable.id)
      .notNull(),
    user_id: text()
      .references(() => usersTable.id)
      .notNull(),
  },
  // composite primary key
  (t) => [
    {
      pk: primaryKey({ columns: [t.user_id, t.project_id] }),
      unq: unique().on(t.user_id, t.project_id),
    },
  ]
);

export const projectsTableRelations = relations(projectsTable, ({ one,many }) => ({
  owner: one(usersTable, {
    fields: [projectsTable.owner],
    references: [usersTable.id],
  }),
  collaborators: many(projectCollaboratorsTable),
}));

export const projectCollaboratorsTableRelations = relations(
  projectCollaboratorsTable,
  ({ one }) => ({
    project: one(projectsTable, {
      fields: [projectCollaboratorsTable.project_id],
      references: [projectsTable.id],
    }),
    user: one(usersTable, {
      fields: [projectCollaboratorsTable.user_id],
      references: [usersTable.id],
    }),
  })
)

