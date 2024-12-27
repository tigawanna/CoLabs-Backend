import { projectsTable } from "@/db/schema/project.js";
import {
  baseErrorSchema,
  listResponseBodySchema,
  listResponseParamsSchema,
} from "@/utils/schema/response.js";
import { createSelectSchema, createUpdateSchema, createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const SelectDBProjectSchema = createSelectSchema(projectsTable).extend({
  
  compensation: z.union([
    z.object({
      monetization_type: z.literal("Monetized"),
      amount: z.number(),
      currency: z.string(),
      frequency: z.enum(["Per Hour", "Per Month", "Per Milestone", "Per Project"]),
      duration: z.number(),
    }),
    z.object({
      monetization_type: z.literal("Non-monetized"),
    }),
  ]),
});

export const UpdateDBProjectSchema = createUpdateSchema(projectsTable).extend({
  compensation: z.union([
    z.object({
      monetization_type: z.literal("Monetized"),
      amount: z.number(),
      currency: z.string(),
      frequency: z.enum(["Per Hour", "Per Month", "Per Milestone", "Per Project"]),
      duration: z.number(),
    }),
    z.object({
      monetization_type: z.literal("Non-monetized"),
    }),
  ]),
});

export const InsertDBProjectSchema = createInsertSchema(projectsTable).extend({
  compensation: z.union([
    z.object({
      monetization_type: z.literal("Monetized"),
      amount: z.number(),
      currency: z.string(),
      frequency: z.enum(["Per Hour", "Per Month", "Per Milestone", "Per Project"]),
      duration: z.number(),
    }),
    z.object({
      monetization_type: z.literal("Non-monetized"),
    }),
  ]),
});

export const ProjectsParamsSchema = listResponseParamsSchema.extend({});

export const ListProjectsSchema = listResponseBodySchema.extend({
  items: SelectDBProjectSchema.array(),
});

export const ListProjectsErrorSchema = baseErrorSchema.extend({});

export const InsertProjectsErrorSchema = baseErrorSchema.extend({});
