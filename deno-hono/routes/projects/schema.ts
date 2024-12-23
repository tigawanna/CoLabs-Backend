import { z } from "@hono/zod-openapi";
import { listRecordSchema } from "../../utils/response.ts";

const ParamsSchema = z.object({
  id: z
    .string()
    .min(3)
    .openapi({
      param: {
        name: "id",
        in: "path",
      },
      example: "1212121",
    }),
});

const ProjectsSchema = listRecordSchema.extend({});
