import type { z } from "zod";

import { and, getTableName, ilike } from "drizzle-orm";

import { userTable } from "@/db/schema/auth";
import { BaseCrudService } from "@/services/base-crud-service";

import type {
  listUserQueryParamsSchema,
  userInsertSchema,
  userUpdateSchema,
} from "./user.schema";

export class UserService extends BaseCrudService<
      typeof userTable,
  z.infer<typeof userInsertSchema>,
  z.infer<typeof userUpdateSchema>
> {
  constructor() {
    super(userTable, getTableName(userTable));
  }

  // Override or add custom methods
  override async findAll(query: z.infer<typeof listUserQueryParamsSchema>) {
    const { search, ...paginationQuery } = query;
    const conditions = and(
      search ? ilike(userTable.name, `%${search}%`) : undefined,
    );

    return super.findAll(paginationQuery, conditions);
  }
}
