import { Hono } from "npm:hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export { app as projectsRoute };
