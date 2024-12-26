import { projectsTable } from "@/db/schema/project.js";
import {
  baseErrorSchema,
  listResponseBodySchema,
  listResponseParamsSchema,
} from "@/utils/schema/response.js";
import { createSelectSchema, createUpdateSchema, createInsertSchema } from "drizzle-zod";

export const projectSelectSchema = createSelectSchema(projectsTable);

export const projectUpdateSchema = createUpdateSchema(projectsTable);

export const projectInsertSchema = createInsertSchema(projectsTable);

export const ProjectsParamsSchema = listResponseParamsSchema.extend({});
export const ProjectsSchema = listResponseBodySchema.omit({ items: true }).extend({
  items: projectSelectSchema.array(),
});
export const ListProjectsErrorSchema = baseErrorSchema.extend({});

export const InsertProjectsErrorSchema = baseErrorSchema.extend({});
