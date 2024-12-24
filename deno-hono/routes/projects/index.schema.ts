
import { createRoute,z } from "@hono/zod-openapi";
import { listResponseParamsSchema, listResponseBodySchema, baseErrorSchema } from "../../utils/response.ts";

export const ProjectsParamsSchema = listResponseParamsSchema.extend({});
export const ProjectsSchema = listResponseBodySchema.extend({});
export const ListProjectsErrorSchema = baseErrorSchema.extend({});

export const getProjectsRoute = createRoute({
  method: "get",
  request: {
    query: ProjectsParamsSchema,
  },
  path: "/",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: ProjectsSchema,
        },
      },
      description: "Retrieve the user",
    },
    400: {
      content: {
        "application/json": {
          schema: ListProjectsErrorSchema,
        },
      },
      description: "User not found",
    },
  },
});
