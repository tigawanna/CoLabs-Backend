import { resolver, validator as ZodValidator } from "hono-openapi/zod";
import { describeRoute } from "hono-openapi";
import { z } from "zod";
import { Hono } from "hono";
import { returnValidationData } from "@/utils/errors.js";

const responseSchema = z.object({
  message: z.string(),
});
const paramsSchema = z.object({
  name: z.string(),
});
const app = new Hono();

app.get(
  "/",
  describeRoute({
    description: "Say hello to the user",

    responses: {
      200: {
        description: "Successful response",
        content: {
          "text/plain": { schema: resolver(responseSchema) },
        },
      },
    },
  }),
  ZodValidator("query", paramsSchema, (hook, c) => {
    console.log("=== h===", hook);
    if (!hook.success) {
      return c.json(
        { message:"incorrect query parameters",code: 400, data: returnValidationData(hook.error) },
        400
      );
    }
  }),
  (c) => {
    const query = c.req.valid("query");
    return c.text(`Hello ${query?.name ?? "Hono"}!`);
  }
);

export { app as homeRoute };
