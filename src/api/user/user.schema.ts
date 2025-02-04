import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";

import { userTable } from "@/db/schema/auth";
import { genericQueryParamsSchema } from "@/schemas/shared-schema";

export const userSelectSchema = createSelectSchema(userTable);
export const userInsertSchema = createInsertSchema(userTable);
export const userUpdateSchema = createUpdateSchema(userTable);

export type UserItem = z.infer<typeof userSelectSchema>;
export type UpdateUser = z.infer<typeof userUpdateSchema>;
export type CreateUser = z.infer<typeof userInsertSchema>;

const sortBy = ["created_at"] as const satisfies Array<keyof UserItem>;

export const listUserQueryParamsSchema = genericQueryParamsSchema.extend({
  sort: z.enum(sortBy).optional(),
});

export const viewUserParamsSchema = z.object({
  id: z.string(),
});

export type ListUserQueryParams = z.infer<typeof listUserQueryParamsSchema>;
export type ViewUserParams = z.infer<typeof viewUserParamsSchema>;
