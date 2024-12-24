import { z } from "@hono/zod-openapi";

export const baseErrorSchema = z.object({
  code: z.number().openapi({
    example: 400,
  }),
  message: z.string().openapi({
    example: "Bad Request",
  }),
  errors:z.record(z.string(), z.string()).optional(),
});
export const baseRecordSchema = z
  .object({
    id: z.string(),
    created_at: z.string(),
    updated_at: z.string().nullable()
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
  page: z
    .number()
    .optional()
    .default(1)
    .openapi({
      param: {
        name: "page",
        in: "query",
      },
      description: "Page number",
      example: 1,
    }),

  perPage: z
    .number()
    .default(10)
    .optional()
    .openapi({
      param: {
        name: "page",
        in: "query",
      },
      description: "Page number",
      example: 1,
    }),
});


