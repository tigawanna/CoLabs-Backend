import { db } from "@/db/client.js";
import { projectsTable } from "@/db/schema/project.js";
import { returnValidationData } from "@/utils/errors.js";
import type { Context } from "hono";
import { z } from "zod";
import { InsertDBProjectSchema } from "@/routes/projects/schemas.js";

type Project = z.infer<typeof InsertDBProjectSchema>;
type ContextInput = {
  in: {
    json: Project;
  };
  out: {
    json: Project;
  };
};
export async function createProject(c: Context<{}, "/", ContextInput>) {
  try {
    const bodyValues = await c.req.json();
    const project = await db.insert(projectsTable).values(bodyValues).returning();
    return c.json(project, 200);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const valError = returnValidationData(error);
      console.log({ valError });
      return c.json(
        {
          message: error.message,
          code: 400,
          data: valError,
        },
        400
      );
    }
    return c.json(
      {
        message: "Something went wrong",
        code: 500,
        data: {
          name: {
            message: (error as any)?.message,
            code: "internal_server_error",
          } as const,
        },
      },
      500
    );
  }
}
