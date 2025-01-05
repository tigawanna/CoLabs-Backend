import { auth } from "@/lib/auth.ts";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
    return c.json({
        message: "this is auth route",
    });
})
export { app as authRoute };
