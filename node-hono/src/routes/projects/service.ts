import { db } from "../../db/client.ts";

export async function getProjects() {
  const projects = await db.query.projectsTable.findMany({
    with: {
      collaborators: true,
    },
  });
  return projects;
}
