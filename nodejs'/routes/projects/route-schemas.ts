import {
  listResponseParamsSchema,
  listResponseBodySchema,
  baseErrorSchema,
} from "../../utils/response.ts";
import { createSelectSchema, createUpdateSchema, createInsertSchema } from "drizzle-zod";
import { projectsTable } from "../../db/schema/project.ts";

// @ts-expect-error : it works fine as avalidator
export const projectSelectSchema = createSelectSchema(projectsTable);

// @ts-expect-error : it works fine as avalidator
export const projectUpdateSchema = createUpdateSchema(projectsTable);

// @ts-expect-error : it works fine as avalidator
export const projectInsertSchema = createInsertSchema(projectsTable);

export const ProjectsParamsSchema = listResponseParamsSchema.extend({});
export const ProjectsSchema = listResponseBodySchema.omit({ items: true }).extend({
  items: projectSelectSchema.array(),
});
export const ListProjectsErrorSchema = baseErrorSchema.extend({});


