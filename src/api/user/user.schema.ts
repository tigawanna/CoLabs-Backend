import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";

import { user } from "@/db/schema/auth";
import { genericQueryParamsSchema } from "@/schemas/shared-schema";

export const userSelectSchema = createSelectSchema(user);
export const userInsertSchema = createInsertSchema(user);
export const userUpdateSchema = createUpdateSchema(user);

export type UserItem = z.infer<typeof userSelectSchema>;
export type UpdateUser = z.infer<typeof userUpdateSchema>;
export type CreateUser = z.infer<typeof userInsertSchema>;

const sortBy = ["createdAt"] as const satisfies Array<keyof UserItem>;

export const listUserQueryParamsSchema = genericQueryParamsSchema.extend({
  sort: z.enum(sortBy).optional(),
});

export const viewUserParamsSchema = z.object({
  id: z.string(),
});

export type ListUserQueryParams = z.infer<typeof listUserQueryParamsSchema>;
export type ViewUserParams = z.infer<typeof viewUserParamsSchema>;
