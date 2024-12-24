
import { projectsRoute } from "./routes/projects/index.route.ts";
import { OpenAPIHono,z } from "@hono/zod-openapi";
import { parseZodError } from "./utils/errors.ts";
import { swaggerUI } from "@hono/swagger-ui";
import { rootGetRoute } from "./routes/home/home.get.ts";
const app = new OpenAPIHono({
  defaultHook: (result, c) => {
    if (!result.success && result.error && result.error instanceof z.ZodError) {
      return c.json(
        {
          message: "Validation error",
          code: 400,
          errors: parseZodError(result.error),
        },
        400
      );
    }
  },
});

app.openapi(rootGetRoute, (c) => {
  return c.json({
    message: "Welecome to honojs-auth-server",
  }, 200);
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
    title: "SIMPLE AUTH SERVER",
  },
});


app.route("/projects", projectsRoute)

Deno.serve({port:5000},app.fetch)
