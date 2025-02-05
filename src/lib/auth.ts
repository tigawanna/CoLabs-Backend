import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";

import { db } from "@/db/client"; // your drizzle instance
import { envVariables } from "@/env";
import { allowedOrigins } from "@/middlewares/cors-middlewares";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
  }),
  trustedOrigins: [...allowedOrigins],
  plugins: [
    openAPI(),
  ],
  advanced: {
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
    },

  },

  socialProviders: {
    github: {
      scopes: ["public_repo", "read:user"],
      clientId: envVariables.GITHUB_CLIENT_ID,
      clientSecret: envVariables.GITHUB_CLIENT_SECRET,

      mapProfileToUser(profile) {
        console.log("====  mapProfileToUser:profile === ", profile);
        return {
          // githubAccessToken: profile.,
          lastName: profile.name.split(" ")[1],
        };
      },
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
        input: false, // don't allow user to set role
      },
      githubAccessToken: {
        type: "string",
        required: false,
      },
    },
  },
  mapProfileToUser: (profile: any) => {
    console.log("====  mapProfileToUser:profile === ", profile);
    return {
      ...profile,
    };
  },
});
