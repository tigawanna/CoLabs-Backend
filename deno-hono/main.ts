import { Hono } from 'npm:hono'
import { projectsRoute } from "./routes/projects/index.ts";

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})
app.route("/projects", projectsRoute)

Deno.serve({port:5000},app.fetch)
