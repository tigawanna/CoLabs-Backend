import { db } from "@/db/client.js";

export async function getProjects() {
  const projects = await db.query.projectsTable.findMany({
    with: {
      collaborators: true,
    },
  });
  return projects;
}
