import { Hono } from "npm:hono";
import { db } from "../../db/client.ts";

const app = new Hono();

app.get("/", async (c) => {
  try {
    const projects = await db.query.projectsTable.findMany({
      with: {
        collaborators: true,
      },
    });
    return c.json(projects);
  } catch (error) {
    console.error(error);
    if(error instanceof Error) return c.json(error.message, 500);
  }
});

export { app as projectsRoute };
