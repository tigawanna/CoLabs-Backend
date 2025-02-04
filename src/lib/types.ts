import type { HttpBindings } from "@hono/node-server";
import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";
import type { PinoLogger } from "@tigawanna/hono-pino";

import type { UserItem } from "@/api/user/user.schema";

import type { auth } from "./auth";

export interface AppBindings {
  Variables: {
    logger: PinoLogger;
    viewer: UserItem;
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
  Bindings: HttpBindings;
};

export type AppOpenAPI = OpenAPIHono<AppBindings>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppBindings>;
