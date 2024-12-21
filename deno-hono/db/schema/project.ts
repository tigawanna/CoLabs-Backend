import { pgTable, varchar, integer, pgEnum, jsonb } from "drizzle-orm/pg-core";
import { commonColumns } from "../helpers/columns.ts";

const projectType = ["private", "open-source"] as const;
const platforms = ["web", "mobile", "desktop"] as const;

export const projectTypeEnum = pgEnum("project_type", projectType);
export const platformEnum = pgEnum("platform", platforms);

export const projectsTable = pgTable("projects", {
  ...commonColumns,
  title: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  owner: varchar({ length: 255 }).notNull(),
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
  lastCommitDate: varchar({ length: 255 }),
  collaborators: varchar({ length: 255 }).default("[]"),
});
