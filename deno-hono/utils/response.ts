import { z } from "@hono/zod-openapi";

export const baseRecordSchema = z
  .object({
    id: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
  })
  .and(z.record(z.string(), z.unknown()));

export const listRecordSchema = z.object({
  page: z.number(),
  perPage: z.number(),
  totalItems: z.number(),
  totalPages: z.number(),
  items: z.array(baseRecordSchema),
});

export interface BaseRecord extends Record<string, unknown> {
  id: string;
  created_at: string;
  updated_at: string;
}

export type OneRecord<T extends BaseRecord> = T;

export interface ListRecord<T extends BaseRecord> {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: T[];
}
