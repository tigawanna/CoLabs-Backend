import { z } from "@hono/zod-openapi";

const errorMessageEnums = [
  "validation_required",
  "authorization_required",
  "not_found",
  "conflict",
] as const;

export const baseErrorSchema = z.object({
  code: z.number().openapi({
    example: 400,
  }),
  message: z.string().openapi({
    example: "Bad Request",
  }),
  data: z
    .record(
      z.string(),
      z.object({
        message: z.string().openapi({
          example: "Bad Request",
        }),
        code: z.enum(errorMessageEnums).openapi({
          example: "validation_required",
        }),
      })
    )
    .optional()
    .default({}),
});
export const baseRecordSchema = z
  .object({
    id: z.string(),
    created_at: z.string(),
    updated_at: z.string().nullable(),
  })
  .and(z.record(z.string(), z.any()));

export const listResponseBodySchema = z.object({
  page: z.number(),
  perPage: z.number(),
  totalItems: z.number(),
  totalPages: z.number(),
  items: z.array(baseRecordSchema),
});

export const listResponseParamsSchema = z.object({
  page: z.string().optional().default("1"),
  perPage: z.string().default("12").optional(),
});
