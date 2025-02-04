import { createRouter } from "@/lib/create-app";

import { userCreateHandler, userCreateRoute } from "./user.create";
import { userDeleteHandler, userDeleteRoute } from "./user.delete";
import { userListHandler, userListRoute } from "./user.list";
import { userGetOneHandler, userGetOneRoute } from "./user.one";
import { userUpdateHandler, userUpdateRoute } from "./user.update";

const router = createRouter()
  .openapi(userListRoute, userListHandler)
  .openapi(userGetOneRoute, userGetOneHandler)
  .openapi(userCreateRoute, userCreateHandler)
  .openapi(userUpdateRoute, userUpdateHandler)
  .openapi(userDeleteRoute, userDeleteHandler);

export default router;
