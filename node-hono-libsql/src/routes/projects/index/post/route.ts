import { returnValidationData } from "@/utils/errors.js";
import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/zod";
import { InsertDBProjectSchema, InsertProjectsErrorSchema, SelectDBProjectSchema } from "@/routes/projects/schemas.js"
import { createProject } from "./handler.js";

const app = new Hono();

app.post(
  "/",
  describeRoute({
    description: "add a project",
    responses: {
      200: {
        content: {
          "application/json": {
            schema: resolver(SelectDBProjectSchema),
          },
        },
        description: "New project added",
      },
      400: {
        content: {
          "application/json": {
            schema: resolver(InsertProjectsErrorSchema),
          },
        },
        description: "Bad request parameters",
      },
      500: {
        content: {
          "application/json": {
            schema: resolver(InsertProjectsErrorSchema),
          },
        },
        description: "Internal error",
      },
    },
  }),
  validator("json", InsertDBProjectSchema, (hook, c) => {
    if (!hook.success) {
      return c.json(
        {
          message: "incorrect body parameters",
          code: 400,
          data: returnValidationData(hook.error),
        },
        400
      );
    }
  }),
  (c) => {
    return createProject(c);
  }
);

export { app as projectsPostRoute };
