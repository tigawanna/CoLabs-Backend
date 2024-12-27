import { Hono } from "hono";
import { projectsGetRoute } from "./index/get/route.js";
import { projectsPostRoute } from "./index/post/route.js";

const app = new Hono();

app.route("/", projectsGetRoute);
app.route("/", projectsPostRoute);

export { app as projectsRoute };
