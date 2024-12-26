import "dotenv/config";
import { z } from "zod";

export const env = {
  port: parseInt(process.env.PORT || "3000"),
  dbUrl: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
};

const envScheme = z.object({
  port: z.number(),
  dbUrl: z.string(),
  NODE_ENV: z.enum(["development", "test", "production"]),
});

export const envVariables = envScheme.parse(env);
