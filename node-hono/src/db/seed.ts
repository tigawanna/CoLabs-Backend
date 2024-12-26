import { seed, reset } from "drizzle-seed";
import { usersTable } from "./schema/users.ts";
import { projectsTable, projectCollaboratorsTable } from "./schema/project.ts";
import { db } from "./client.ts";


const schema = { usersTable, projectsTable, projectCollaboratorsTable };
// console.log("Deno env ", Deno.env.get("DATABASE_URL"));
// @ts-expect-error : the types for seed and db have drifted but this still workd
await reset(db, schema);
// @ts-expect-error : the types for seed and db have drifted but this still workd
// await seed(db, { usersTable },{count:20,})
// .refine((f) => ({
//   users: {
//     columns: {
//       id: uuidv7(),
//     }
//   },
// }));

  await seed(db,schema).refine((f) => ({
    users: {
      columns: {
        id: f.uuid(),
      },
      count: 20,
    },
    projects: {
      columns: {
        id: f.uuid(),
        issuesCount: f.int({
          minValue: 0,
          maxValue: 2578,
        }),
        forksCount: f.int({
          minValue: 0,
          maxValue: 2578,
        }),
        starCount: f.int({
          minValue: 0,
          maxValue: 2578,
        }),
        compensation: f.boolean()
          ? {
              monetization_type: "Monetized",
              amount: f.int({ minValue: 0, maxValue: 100 }),
              currency: "USD",
              duration: f.int({ minValue: 0, maxValue: 100 }),
              frequency: "Per Month",
            }
          : {
              monetization_type: "Non-monetized",
            },
      },
      count: 30,
    },
    projects_collaborators: {
      columns: {
        id: f.uuid(),
      },
      count: 30,
    },
  }));
// // @ts-expect-error : the types for seed and db have drifted but this still workd
// await seed(db, { projectsTable }).refine((f) => ({
//   projects: {
//     columns: {
//       id: f.uuid(),
//       issuesCount: f.int({
//         minValue: 0,
//         maxValue: 2578,
//       }),
//       forksCount: f.int({
//         minValue: 0,
//         maxValue: 2578,
//       }),
//       starCount: f.int({
//         minValue: 0,
//         maxValue: 2578,
//       }),
//       compensation: f.boolean()
//         ? {
//             monetization_type: "Monetized",
//             amount: f.int({ minValue: 0, maxValue: 100 }),
//             currency: "USD",
//             duration: f.int({ minValue: 0, maxValue: 100 }),
//             frequency: "Per Month",
//           }
//         : {
//             monetization_type: "Non-monetized",
//           },
//     },
//     count: 30,
//   },
// }));
// // @ts-expect-error : the types for seed and db have drifted but this still workd
// await seed(db, { projectCollaboratorsTable }).refine((f) => ({
//   projects_collaborators: {
//     columns: {
//       id: f.uuid(),
//     },
//     count: 30,
//   },
// }));
