import { OpenAPIHono, z } from "@hono/zod-openapi";
import { createRoute } from "@hono/zod-openapi";
import { listResponseBodySchema, listResponseParamsSchema } from "../../utils/response.ts";
import { db } from "drizzle-client";

export const ProjectsParamsSchema = listResponseParamsSchema.extend({});
export const ProjectsSchema = listResponseBodySchema.extend({});

export const getProjectsRoute = createRoute({
  method: "get",
  request: {
    params: ProjectsParamsSchema,
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
    404: {
      content: {
        "application/json": {
          schema: z.object({
            error: z.string(),
            fields: z.record(z.string(), z.string()).optional(),
          }),
        },
      },
      description: "User not found",
    },
  },
});

const app = new OpenAPIHono();
// app.route("/", getProjectsRoute);
app.openapi(getProjectsRoute, async (c) => {
  try {
    const projects = await db.query.projectsTable.findMany({
      with: {
        collaborators: true,
      },
    });
    return c.json(
      {
        page: 1,
        perPage: 10,
        totalItems: projects.length,
        totalPages: 1,
        items: projects,
      },
      200
    );
  } catch (error) {
    console.error(error);
    return c.json(
      {
        error: "User not found",
        fields: {
          name: "filed is required",
        },
      },
      404
    );
  }
});
export {app as projectsRoute}
