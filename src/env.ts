/* eslint-disable node/no-process-env */
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import path from "node:path";
import { z } from "zod";

expand(
  config({
    path: path.resolve(process.cwd(), process.env.NODE_ENV === "test" ? ".env.test" : ".env"),
  }),
);

const EnvSchema = z
  .object({
    GITHUB_CLIENT_ID: z.string().min(5),
    GITHUB_CLIENT_SECRET: z.string().min(5),
    BETTER_AUTH_SECRET: z.string().min(10),
    API_URL: z.string().url(),
    BETTER_AUTH_URL: z.string().url(),
    NODE_ENV: z.string().default("development"),
    PORT: z.coerce.number().default(5000),
    LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]),
    DATABASE_URL: z.string().url(),
    FRONTEND_URL: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.API_URL !== data.BETTER_AUTH_URL) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "API_URL and BETTER_AUTH_URL must be the same",
      });
    }
  });

export type env = z.infer<typeof EnvSchema>;

// eslint-disable-next-line ts/no-redeclare
const { data: env, error } = EnvSchema.safeParse(process.env);

if (error) {
  console.error("❌ Invalid env:");
  console.error(JSON.stringify(error.flatten().fieldErrors, null, 2));
  process.exit(1);
}

const envVariables = env!;
export { envVariables };
