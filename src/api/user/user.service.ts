import type { z } from "zod";

import { and, getTableName, ilike } from "drizzle-orm";

import { user } from "@/db/schema/auth";
import { BaseCrudService } from "@/services/base-crud-service";

import type {
  listUserQueryParamsSchema,
  userInsertSchema,
  userUpdateSchema,
} from "./user.schema";

export class UserService extends BaseCrudService<
      typeof user,
  z.infer<typeof userInsertSchema>,
  z.infer<typeof userUpdateSchema>
> {
  constructor() {
    super(user, getTableName(user));
  }

  // Override or add custom methods
  override async findAll(query: z.infer<typeof listUserQueryParamsSchema>) {
    const { search, ...paginationQuery } = query;
    const conditions = and(
      search ? ilike(user.name, `%${search}%`) : undefined,
    );

    return super.findAll(paginationQuery, conditions);
  }
}
