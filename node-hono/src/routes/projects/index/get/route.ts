import { returnValidationData } from "@/utils/errors.js";
import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/zod";
import { ListProjectsErrorSchema, ListProjectsSchema, ProjectsParamsSchema } from "@/routes/projects/schemas.js";
import { getProjectsWithCollaborators } from "./handler.js";

const app = new Hono();

app.get(
  "/",
  describeRoute({
    description: "get projects with collaborators",
    responses: {
      200: {
        content: {
          "application/json": {
            schema: resolver(ListProjectsSchema),
          },
        },
        description: "projects with collaborators retrieved",
      },
      400: {
        content: {
          "application/json": {
            schema: resolver(ListProjectsErrorSchema),
          },
        },
        description: "Bad request parameters",
      },
      500: {
        content: {
          "application/json": {
            schema: resolver(ListProjectsErrorSchema),
          },
        },
        description: "Internal error fetching projects",
      },
    },
  }),
  validator("query", ProjectsParamsSchema, (hook, c) => {
    if (!hook.success) {
      return c.json(
        {
          message: "incorrect query parameters",
          code: 400,
          data: returnValidationData(hook.error),
        },
        400
      );
    }
  }),
  (c) => {
    return getProjectsWithCollaborators(c);
  }
);

export { app as projectsGetRoute };
