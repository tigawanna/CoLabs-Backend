import { z } from "@hono/zod-openapi";

// deno-lint-ignore no-explicit-any
export function parseZodError(errorResponse: z.ZodError<any>) {
  const issues = errorResponse.issues;
  const errors = issues.reduce((acc: Record<string, string>, issue) => {
    acc[issue.path.join(".")] = issue.message;
    return acc;
  }, {});
  return errors;
}
