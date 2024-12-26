import { seed, reset } from "drizzle-seed";
import { usersTable } from "./schema/users.js";
import { projectsTable, projectCollaboratorsTable } from "./schema/project.js";
import { db } from "./client.js";


const schema = { usersTable, projectsTable, projectCollaboratorsTable };
// console.log("Deno env ", Deno.env.get("DATABASE_URL"));

await reset(db, schema);

// await seed(db, schema).refine((f) => ({
//     usersTable: {
//       columns: {
//         id: f.uuid(),
//       },
//       count: 20,
//     },
//     projectsTable: {
//       columns: {
//         id: f.uuid(),
//         issuesCount: f.int({
//           minValue: 0,
//           maxValue: 2578,
//         }),
//         forksCount: f.int({
//           minValue: 0,
//           maxValue: 2578,
//         }),
//         starCount: f.int({
//           minValue: 0,
//           maxValue: 2578,
//         }),
//         compensation: f.boolean().then((isMonetized) =>
//           isMonetized
//             ? {
//                 monetization_type: "Monetized",
//                 amount: f.int({ minValue: 0, maxValue: 100 }),
//                 currency: "USD",
//                 duration: f.int({ minValue: 0, maxValue: 100 }),
//                 frequency: "Per Month",
//               }
//             : {
//                 monetization_type: "Non-monetized",
//               }
//         ),
//       },
//       count: 30,
//     },
//     projectCollaboratorsTable: {
//       columns: {
//         id: f.uuid(),
//       },
//       count: 30,
//     },
//   }));
// // // @ts-expect-error : the types for seed and db have drifted but this still workd

