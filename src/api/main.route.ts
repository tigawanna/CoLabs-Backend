import { createRouter } from "@/lib/create-app";

import auditlogsRoutes from "./auditlogs/auditlogs.index";
import userRoutes from "./user/user.index";

const mainrouter = createRouter();
mainrouter.route("/api/user", userRoutes);
mainrouter.route("/api/auditlogs", auditlogsRoutes);
export default mainrouter;
