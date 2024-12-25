import { OpenAPIHono, z } from "@hono/zod-openapi";
import { db } from "drizzle-client";
import { getProjectsRoute } from "./index-routes.ts";
import { projectsTable } from "../../db/schema/project.ts";

const app = new OpenAPIHono();
//GET /projects
app.openapi(getProjectsRoute, async (c) => {
  try {
    const page = Number(c.req.query().page);
    const perPage = Number(c.req.query().perPage);
    const skip = (page - 1) * perPage;
    const totalItems = await db.$count(projectsTable);
    const totalPages = Math.ceil(totalItems / perPage);
    const projects = await db.query.projectsTable.findMany({
      limit: perPage,
      offset: skip,
      with: {
        collaborators: {
          limit: 5,
        },
      },
    });
    return c.json(
      {
        page,
        perPage,
        totalItems,
        totalPages,
        items: projects,
      },
      200
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json(
        {
          message: error.message,
          code: 400,
          data: {
            name: {
              message: "Something went wrong",
              code: "authorization_required",
            } as const,
          },
        },
        400
      );
    }
    return c.json(
      {
        message: "Something went wrong",
        code: 500,
        data: {
          name: {
            message: "Something went wrong",
            code: "authorization_required",
          } as const,
        },
      },
      500
    );
  }
});
export { app as projectsRoute };
