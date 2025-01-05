import { db } from "@/db/client.ts";
import { envVariables } from "@/env.ts";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";


export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
  }),
  socialProviders: {
    github: {
      clientId: envVariables.GITHUB_CLIENT_ID,
      clientSecret: envVariables.GITHUB_CLIENT_SECRET,
      scope:["user","repo",]
    },
  },
});
