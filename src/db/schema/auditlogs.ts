import { relations } from "drizzle-orm";
import { jsonb, pgEnum, pgTable, text } from "drizzle-orm/pg-core";

import { commonColumns } from "../helpers/columns";
import { user } from "./auth";

export const auditAction = [
  "LIST",
  "CREATE",
  "UPDATE",
  "DELETE",
  "LOGIN",
  "LOGOUT",
  "PASSWORD_RESET",
  "EMAIL_VERIFY",
] as const;
export const auditActionEnum = pgEnum("action", auditAction);

export const auditLogsTable = pgTable("audit_logs", {
  ...commonColumns,
  userId: text("user_id").references(() => user.id),
  table: text("table").notNull(),
  action: auditActionEnum("action").notNull(),
  oldData: jsonb("old_data").$type<Record<string, any>>(),
  newData: jsonb("new_data").$type<Record<string, any>>(),
  ipAddress: text("ip_address"),
});

export const auditLogRelations = relations(auditLogsTable, ({ one }) => ({
  user: one(user, {
    fields: [auditLogsTable.userId],
    references: [user.id],
  }),
}));
