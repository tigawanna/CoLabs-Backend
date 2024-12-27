import { serve } from "@hono/node-server";
import { envVariables } from "./env.js";
import { Hono } from "hono";
import { openAPISpecs } from "hono-openapi";
import { apiReference } from "@scalar/hono-api-reference";
import { swaggerUI } from "@hono/swagger-ui";
import { homeRoute } from "./routes/home/index.js";
import { projectsRoute } from "./routes/projects/main.js";
import { projectsGetRoute } from "./routes/projects/index/get/route.js";
import { projectsPostRoute } from "./routes/projects/index/post/route.js";


const app = new Hono();


app.route("/",homeRoute)
// app.route("/projects", projectsRoute);
app.route("/projects", projectsGetRoute);
app.route("/projects", projectsPostRoute);


const port = envVariables.port || 5000;
console.log(`Server is running on http://localhost:${port}`);
app.get(
  "/openapi",
  openAPISpecs(app, {
    documentation: {
      info: { title: "Collabs Backend API", version: "1.0.0", description: "Collabs Nodejs Backend Backend" },
      servers: [{ url: `http://localhost:${port}`, description: "Local Server" }],
    },
  })
);

app.get(
  "/docs",
  apiReference({
    theme: "saturn",
    spec: { url: "/openapi" },
  })
);

app.get("/swagger", swaggerUI({ url: "/openapi" }));

serve({
  fetch: app.fetch,
  port,
});
