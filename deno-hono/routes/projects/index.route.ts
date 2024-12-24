import { OpenAPIHono, z } from "@hono/zod-openapi";
import { db } from "drizzle-client";
import { getProjectsRoute } from "./index.schema.ts";

const app = new OpenAPIHono();
// app.route("/", getProjectsRoute);
app.openapi(getProjectsRoute, async (c) => {
  try {
    const page = Number(c.req.query().page);
    const perPage = Number(c.req.query().perPage);
    const skip = (page - 1) * (perPage);
    console.log({ page, perPage, skip });
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
    if(error instanceof z.ZodError){
      return c.json(
        {
          message:error.message,
          code: 400,
          data: {
            name:{
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
        code: 400,
        data: {
          name:{
            message: "Something went wrong",
            code: "authorization_required",
          } as const,
        },
      },
      400
    );
  }
});
export { app as projectsRoute };
