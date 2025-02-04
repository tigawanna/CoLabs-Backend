import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod";

import { auditAction, auditLogsTable } from "@/db/schema/auditlogs";
import { genericQueryParamsSchema } from "@/schemas/shared-schema";

export const brokenauditlogsSelectSchema = createSelectSchema(auditLogsTable);
export const auditlogsInsertSchema = createInsertSchema(auditLogsTable);
export const auditlogsUpdateSchema = createUpdateSchema(auditLogsTable);

export const auditlogsSelectSchema = brokenauditlogsSelectSchema.omit({
  oldData: true,
  newData: true,
}).extend({
  oldData: z.record(z.string(), z.any()).nullable().nullable(),
  newData: z.record(z.string(), z.any()).nullable().nullable(),
});

export type AuditlogsItem = z.infer<typeof auditlogsSelectSchema>;
export type UpdateAuditlogs = z.infer<typeof auditlogsUpdateSchema>;
export type CreateAuditlogs = z.infer<typeof auditlogsInsertSchema>;

const sortBy = ["created_at"] as const satisfies Array<keyof AuditlogsItem>;

export const listAuditlogsQueryParamsSchema = genericQueryParamsSchema.extend({
  sort: z.enum(sortBy).optional(),
  // entity: z.string().optional(),
  // action: z.string().optional(),
  table: z.string().optional(),
  action: z.enum(auditAction).optional(),
});

export const viewAuditlogsParamsSchema = z.object({
  id: z.string(),
});

export type listAuditlogsQueryParams = z.infer<
  typeof listAuditlogsQueryParamsSchema
>;
export type viewAuditlogsParams = z.infer<typeof viewAuditlogsParamsSchema>;
