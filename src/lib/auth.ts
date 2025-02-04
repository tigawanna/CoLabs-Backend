import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";

import { db } from "@/db/client"; // your drizzle instance
import { envVariables } from "@/env";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
  }),
  plugins: [
    openAPI(),
  ],
  advanced: {
    // crossSubDomainCookies: {
    //   enabled: true,
    // },
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
    },
  },
  socialProviders: {
    github: {
      clientId: envVariables.GITHUB_CLIENT_ID,
      clientSecret: envVariables.GITHUB_CLIENT_SECRET,
    },
  },
});
