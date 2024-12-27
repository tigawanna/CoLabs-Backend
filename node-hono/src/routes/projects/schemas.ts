import { projectsTable } from "@/db/schema/project.js";
import {
  baseErrorSchema,
  listResponseBodySchema,
  listResponseParamsSchema,
} from "@/utils/schema/response.js";
import { createSelectSchema, createUpdateSchema, createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const SelectDBProjectSchema = createSelectSchema(projectsTable);

export const UpdateDBProjectSchema = createUpdateSchema(projectsTable);

export const InsertDBProjectSchema = createInsertSchema(projectsTable);

export const ProjectsParamsSchema = listResponseParamsSchema.extend({});

export const ListProjectsSchema = listResponseBodySchema;

export const ListProjectsErrorSchema = baseErrorSchema.extend({});

export const InsertProjectsErrorSchema = baseErrorSchema.extend({});
