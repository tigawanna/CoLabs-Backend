import { desc, eq } from "drizzle-orm";
import { getContext } from "hono/context-storage";

import type { CreateAuditlogs } from "@/api/auditlogs/auditlogs.schema";
import type { AppBindings } from "@/lib/types";

import { db } from "@/db/client";
import { auditLogsTable } from "@/db/schema/auditlogs";

export const auditAction = {
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  PASSWORD_RESET: "PASSWORD_RESET",
  EMAIL_VERIFY: "EMAIL_VERIFY",
} as const;
export type AuditAction = keyof typeof auditAction;

export class AuditLogService {
  async create(data: CreateAuditlogs) {
    return db.insert(auditLogsTable).values(data).returning();
  }

  async findByUser(userId: string) {
    return db
      .select()
      .from(auditLogsTable)
      .where(eq(auditLogsTable.userId, userId))
      .orderBy(desc(auditLogsTable.created_at));
  }

  async createChangeLog(
    {
      userId,
      table,
      oldData,
      newData,
      ipAddress,
    }: Omit<CreateAuditlogs, "action">,
  ) {
    return this.create(
      {
        userId,
        action: auditAction.UPDATE,
        table,
        oldData,
        newData,
        ipAddress,
      },
    );
  }

  async logLogin({ table, userId }: { userId: string;table: string }) {
    const ctx = getContext<AppBindings>();
    const ipAddress = ctx.env.incoming.socket?.remoteAddress;
    return this.create(
      {
        userId,
        table,
        action: auditAction.LOGIN,
        ipAddress,
      },
    );
  }

  async logLogout({ table, userId }: { userId: string;table: string }) {
    const ctx = getContext<AppBindings>();
    const ipAddress = ctx.env.incoming.socket?.remoteAddress;
    return this.create(
      {
        userId,
        action: auditAction.LOGOUT,
        table,
        ipAddress,
      },
    );
  }
}
