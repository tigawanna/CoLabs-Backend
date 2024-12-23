import { db } from "./db/client.ts";


const projects = await db.query.projectsTable.findMany({
  with: {
    collaborators: true,
  },
});

console.log("=== projects === ",projects)

// const users = await db.query.usersTable.findMany({
//     with: {
//         projects: true,
//     },
// });

// console.log("=== users === ",users)
