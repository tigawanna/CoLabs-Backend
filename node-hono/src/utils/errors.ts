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

// export const baseErrorSchema = z.object({
//   code: z.number().openapi({
//     example: 400,
//   }),
//   message: z.string().openapi({
//     example: "Bad Request",
//   }),
//   data: z
//     .record(
//       z.string(),
//       z.object({
//         message: z.string().openapi({
//           example: "Bad Request",
//         }),
//         code: z.enum(errorMessageEnums).openapi({
//           example: "validation_failed",
//         }),
//       })
//     )
//     .optional()
//     .default({}),
// });

export function returnValidationData(errorResponse: z.ZodError) {
  const issues = errorResponse.issues;
  const errors = issues.reduce(
    (acc: Record<string, { code: "validation_failed"; message: string }>, issue) => {
      acc[issue.path.join(".")] = { code: "validation_failed", message: issue.message };
      return acc;
    },
    {}
  );
  return errors;
}
