import { serve } from '@hono/node-server'
import { OpenAPIHono, z } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { parseZodError } from './utils/errors.js';
import { projectsRoute } from './routes/projects/index.route.js';
import { rootGetRoute } from './routes/home/home.get.js';

const app = new OpenAPIHono({
  defaultHook: (result, c) => {
    if (!result.success && result.error && result.error instanceof z.ZodError) {
      return c.json(
        {
          message: "Validation error",
          code: 400,
          data: parseZodError(result.error),
        },
        400
      );
    }
  },
});

app.route("/projects", projectsRoute);

app.openapi(rootGetRoute, (c) => {
  return c.json(
    {
      message: "Welecome to collab backend",
    },
    200
  );
});

app.get(
  "/ui",
  swaggerUI({
    url: "/doc",
  })
);

app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Collabs Backend",
  },
});


const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
