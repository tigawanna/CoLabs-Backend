import { db } from "@/db/client.js";
import { projectsTable } from "@/db/schema/project.js";
import type { Context } from "hono";
import { z } from "zod";

type ContextInput = {
  in: {
    query: {
      page?: string | undefined;
      perPage?: string | undefined;
    };
  };
  out: {
    query: {
      page: string;
      perPage?: string | undefined;
    };
  };
};
export async function getProjectsWithCollaborators(c: Context<{}, "/", ContextInput>) {
  try {
    const page = Number(c.req.query().page);
    const perPage = Number(c.req.query().perPage);
    const skip = (page - 1) * perPage;
    const totalItems = await db.$count(projectsTable);
    const totalPages = Math.ceil(totalItems / perPage);
    const projects: any[] = await db.query.projectsTable.findMany({
      limit: perPage,
      offset: skip,
      with: {
        collaborators: {
          limit: 5,
        },
      },
    });
    return c.json(
      {
        page,
        perPage,
        totalItems,
        totalPages,
        items: projects,
      },
      200
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json(
        {
          message: error.message,
          code: 400,
          data: {
            name: {
              message: "Something went wrong",
              code: "authorization_required",
            } as const,
          },
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
            message: "Something went wrong",
            code: "authorization_required",
          } as const,
        },
      },
      500
    );
  }
}
