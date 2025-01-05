import { Hono } from "hono";
import { projectsGetRoute } from "./index/get/route.ts";
import { projectsPostRoute } from "./index/post/route.ts";

const app = new Hono();

app.route("/", projectsGetRoute);
app.route("/", projectsPostRoute);

export { app as projectsRoute };
