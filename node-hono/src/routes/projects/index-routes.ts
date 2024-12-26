import { createRoute } from "@hono/zod-openapi";
import { ProjectsParamsSchema, ProjectsSchema, ListProjectsErrorSchema, projectInsertSchema } from "./route-schemas.js";

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
      description: "Bad request",
    },
    500: {
      content: {
        "application/json": {
          schema: ListProjectsErrorSchema,
        },
      },
      description: "Internal error fetching projects",
    },
  },
});

export const createProjectsRoute = createRoute({
  method: "post",
  request: {
    body: {
      content: {
        "application/json": {
          schema: projectInsertSchema,
        },
      },
    },
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
      description: "Bad request",
    },
    500: {
      content: {
        "application/json": {
          schema: ListProjectsErrorSchema,
        },
      },
      description: "Internal error fetching projects",
    },
  },
});
