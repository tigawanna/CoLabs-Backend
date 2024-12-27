"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_node_server = require("@hono/node-server");

// src/env.ts
var import_config = require("dotenv/config");
var import_zod = require("zod");
var env = {
  port: parseInt(process.env.PORT || "3000"),
  dbUrl: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV
};
var envScheme = import_zod.z.object({
  port: import_zod.z.number(),
  dbUrl: import_zod.z.string(),
  NODE_ENV: import_zod.z.enum(["development", "test", "production"])
});
var envVariables = envScheme.parse(env);

// src/index.ts
var import_hono5 = require("hono");
var import_hono_openapi4 = require("hono-openapi");

// node_modules/.pnpm/@scalar+hono-api-reference@0.5.165_hono@4.6.14/node_modules/@scalar/hono-api-reference/dist/honoApiReference.js
var import_html = require("hono/html");
var customThemeCSS = `
.light-mode {
  color-scheme: light;
  --scalar-color-1: #2a2f45;
  --scalar-color-2: #757575;
  --scalar-color-3: #8e8e8e;
  --scalar-color-disabled: #b4b1b1;
  --scalar-color-ghost: #a7a7a7;
  --scalar-color-accent: #0099ff;
  --scalar-background-1: #fff;
  --scalar-background-2: #f6f6f6;
  --scalar-background-3: #e7e7e7;
  --scalar-background-4: rgba(0, 0, 0, 0.06);
  --scalar-background-accent: #8ab4f81f;

  --scalar-border-color: rgba(0, 0, 0, 0.1);
  --scalar-scrollbar-color: rgba(0, 0, 0, 0.18);
  --scalar-scrollbar-color-active: rgba(0, 0, 0, 0.36);
  --scalar-lifted-brightness: 1;
  --scalar-backdrop-brightness: 1;

  --scalar-shadow-1: 0 1px 3px 0 rgba(0, 0, 0, 0.11);
  --scalar-shadow-2: rgba(0, 0, 0, 0.08) 0px 13px 20px 0px,
    rgba(0, 0, 0, 0.08) 0px 3px 8px 0px, #eeeeed 0px 0 0 1px;

  --scalar-button-1: rgb(49 53 56);
  --scalar-button-1-color: #fff;
  --scalar-button-1-hover: rgb(28 31 33);

  --scalar-color-green: #069061;
  --scalar-color-red: #ef0006;
  --scalar-color-yellow: #edbe20;
  --scalar-color-blue: #0082d0;
  --scalar-color-orange: #fb892c;
  --scalar-color-purple: #5203d1;
}

.dark-mode {
  color-scheme: dark;
  --scalar-color-1: rgba(255, 255, 245, .86);
  --scalar-color-2: rgba(255, 255, 245, .6);
  --scalar-color-3: rgba(255, 255, 245, .38);
  --scalar-color-disabled: rgba(255, 255, 245, .25);
  --scalar-color-ghost: rgba(255, 255, 245, .25);
  --scalar-color-accent: #e36002;
  --scalar-background-1: #1e1e20;
  --scalar-background-2: #2a2a2a;
  --scalar-background-3: #505053;
  --scalar-background-4: rgba(255, 255, 255, 0.06);
  --scalar-background-accent: #e360021f;

  --scalar-border-color: rgba(255, 255, 255, 0.1);
  --scalar-scrollbar-color: rgba(255, 255, 255, 0.24);
  --scalar-scrollbar-color-active: rgba(255, 255, 255, 0.48);
  --scalar-lifted-brightness: 1.45;
  --scalar-backdrop-brightness: 0.5;

  --scalar-shadow-1: 0 1px 3px 0 rgb(0, 0, 0, 0.1);
  --scalar-shadow-2: rgba(15, 15, 15, 0.2) 0px 3px 6px,
    rgba(15, 15, 15, 0.4) 0px 9px 24px, 0 0 0 1px rgba(255, 255, 255, 0.1);

  --scalar-button-1: #f6f6f6;
  --scalar-button-1-color: #000;
  --scalar-button-1-hover: #e7e7e7;

  --scalar-color-green: #3dd68c;
  --scalar-color-red: #f66f81;
  --scalar-color-yellow: #f9b44e;
  --scalar-color-blue: #5c73e7;
  --scalar-color-orange: #ff8d4d;
  --scalar-color-purple: #b191f9;
}
/* Sidebar */
.light-mode .t-doc__sidebar {
  --scalar-sidebar-background-1: var(--scalar-background-1);
  --scalar-sidebar-item-hover-color: currentColor;
  --scalar-sidebar-item-hover-background: var(--scalar-background-2);
  --scalar-sidebar-item-active-background: var(--scalar-background-accent);
  --scalar-sidebar-border-color: var(--scalar-border-color);
  --scalar-sidebar-color-1: var(--scalar-color-1);
  --scalar-sidebar-color-2: var(--scalar-color-2);
  --scalar-sidebar-color-active: var(--scalar-color-accent);
  --scalar-sidebar-search-background: var(--scalar-background-2);
  --scalar-sidebar-search-border-color: var(--scalar-sidebar-border-color);
  --scalar-sidebar-search-color: var(--scalar-color-3);
}

.dark-mode .sidebar {
  --scalar-sidebar-background-1: #161618;
  --scalar-sidebar-item-hover-color: var(--scalar-color-accent);
  --scalar-sidebar-item-hover-background: transparent;
  --scalar-sidebar-item-active-background: transparent;
  --scalar-sidebar-border-color: transparent;
  --scalar-sidebar-color-1: var(--scalar-color-1);
  --scalar-sidebar-color-2: var(--scalar-color-2);
  --scalar-sidebar-color-active: var(--scalar-color-accent);
  --scalar-sidebar-search-background: #252529;
  --scalar-sidebar-search-border-color: transparent;
  --scalar-sidebar-search-color: var(--scalar-color-3);
}
`;
var javascript = (configuration) => {
  const defaultConfiguration = {
    _integration: "hono"
  };
  return import_html.html`
    <script
      id="api-reference"
      type="application/json"
      data-configuration="${JSON.stringify({
    ...defaultConfiguration,
    ...configuration
  }).split('"').join("&quot;")}">
      ${(0, import_html.raw)(configuration.spec?.content ? typeof configuration.spec?.content === "function" ? JSON.stringify(configuration.spec?.content()) : JSON.stringify(configuration.spec?.content) : "")}
    </script>
    <script src="${configuration.cdn || "https://cdn.jsdelivr.net/npm/@scalar/api-reference"}"></script>
  `;
};
var apiReference = (options) => async (c) => {
  return c.html(
    /* html */
    `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${options?.pageTitle ?? "API Reference"}</title>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1" />
          <style>
            ${options.theme ? null : customThemeCSS}
          </style>
        </head>
        <body>
          ${javascript(options)}
        </body>
      </html>
    `
  );
};

// src/index.ts
var import_swagger_ui = require("@hono/swagger-ui");

// src/routes/home/index.ts
var import_zod2 = require("hono-openapi/zod");
var import_hono_openapi = require("hono-openapi");
var import_zod3 = require("zod");
var import_hono = require("hono");

// src/utils/errors.ts
var import_zod_openapi = require("@hono/zod-openapi");
function returnValidationData(errorResponse) {
  const issues = errorResponse.issues;
  const errors = issues.reduce(
    (acc, issue) => {
      acc[issue.path.join(".")] = { code: "validation_failed", message: issue.message };
      return acc;
    },
    {}
  );
  return errors;
}

// src/routes/home/index.ts
var responseSchema = import_zod3.z.object({
  message: import_zod3.z.string()
});
var paramsSchema = import_zod3.z.object({
  name: import_zod3.z.string()
});
var app = new import_hono.Hono();
app.get(
  "/",
  (0, import_hono_openapi.describeRoute)({
    description: "Say hello to the user",
    responses: {
      200: {
        description: "Successful response",
        content: {
          "text/plain": { schema: (0, import_zod2.resolver)(responseSchema) }
        }
      }
    }
  }),
  (0, import_zod2.validator)("query", paramsSchema, (hook, c) => {
    console.log("=== h===", hook);
    if (!hook.success) {
      return c.json(
        { message: "incorrect query parameters", code: 400, data: returnValidationData(hook.error) },
        400
      );
    }
  }),
  (c) => {
    const query = c.req.valid("query");
    return c.text(`Hello ${query?.name ?? "Hono"}!`);
  }
);

// src/routes/projects/main.ts
var import_hono4 = require("hono");

// src/routes/projects/index/get/route.ts
var import_hono2 = require("hono");
var import_hono_openapi2 = require("hono-openapi");
var import_zod6 = require("hono-openapi/zod");

// src/db/schema/project.ts
var project_exports = {};
__export(project_exports, {
  platformEnum: () => platformEnum,
  projectCollaboratorsTable: () => projectCollaboratorsTable,
  projectCollaboratorsTableRelations: () => projectCollaboratorsTableRelations,
  projectTypeEnum: () => projectTypeEnum,
  projectsTable: () => projectsTable,
  projectsTableRelations: () => projectsTableRelations
});
var import_pg_core3 = require("drizzle-orm/pg-core");

// src/db/helpers/columns.ts
var import_pg_core = require("drizzle-orm/pg-core");
var import_uuidv7 = require("uuidv7");
var commonColumns = {
  id: (0, import_pg_core.text)().$defaultFn(() => (0, import_uuidv7.uuidv7)()).primaryKey(),
  updated_at: (0, import_pg_core.timestamp)(),
  created_at: (0, import_pg_core.timestamp)().defaultNow()
};

// src/db/schema/users.ts
var users_exports = {};
__export(users_exports, {
  usersTable: () => usersTable,
  usersTableRElations: () => usersTableRElations
});
var import_pg_core2 = require("drizzle-orm/pg-core");
var import_drizzle_orm = require("drizzle-orm");
var usersTable = (0, import_pg_core2.pgTable)("users", {
  ...commonColumns,
  name: (0, import_pg_core2.varchar)({ length: 255 }).notNull(),
  email: (0, import_pg_core2.varchar)({ length: 255 }).notNull().unique()
});
var usersTableRElations = (0, import_drizzle_orm.relations)(usersTable, ({ one }) => ({
  projects: one(projectsTable, {
    fields: [usersTable.id],
    references: [projectsTable.owner]
  })
}));

// src/db/schema/project.ts
var import_drizzle_orm2 = require("drizzle-orm");
var projectType = ["private", "open-source"];
var platforms = ["web", "mobile", "desktop"];
var projectTypeEnum = (0, import_pg_core3.pgEnum)("project_type", projectType);
var platformEnum = (0, import_pg_core3.pgEnum)("platform", platforms);
var projectsTable = (0, import_pg_core3.pgTable)(
  "projects",
  {
    ...commonColumns,
    title: (0, import_pg_core3.varchar)({ length: 255 }).unique().notNull(),
    description: (0, import_pg_core3.varchar)({ length: 255 }).notNull(),
    owner: (0, import_pg_core3.text)().references(() => usersTable.id).notNull(),
    type: projectTypeEnum().default("open-source"),
    platform: platformEnum().default("web"),
    compensation: (0, import_pg_core3.jsonb)().default({
      monetization_type: "Non-monetized"
    }),
    link: (0, import_pg_core3.varchar)({ length: 255 }),
    // counts
    //  these values don't need to be saved in the database and can be derived from the github api
    languages: (0, import_pg_core3.varchar)({ length: 255 }).notNull(),
    issuesCount: (0, import_pg_core3.integer)().default(0),
    forksCount: (0, import_pg_core3.integer)().default(0),
    starCount: (0, import_pg_core3.integer)().default(0),
    lastCommitDate: (0, import_pg_core3.timestamp)({ withTimezone: true, mode: "string" }).defaultNow()
  },
  (t) => [{
    index: (0, import_pg_core3.index)().on(t.owner, t.title)
  }]
);
var projectCollaboratorsTable = (0, import_pg_core3.pgTable)(
  "projects_collaborators",
  {
    ...commonColumns,
    project_id: (0, import_pg_core3.text)().references(() => projectsTable.id).notNull(),
    user_id: (0, import_pg_core3.text)().references(() => usersTable.id).notNull()
  },
  // composite primary key
  (t) => [
    {
      pk: (0, import_pg_core3.primaryKey)({ columns: [t.user_id, t.project_id] }),
      unq: (0, import_pg_core3.unique)().on(t.user_id, t.project_id)
    }
  ]
);
var projectsTableRelations = (0, import_drizzle_orm2.relations)(projectsTable, ({ one, many }) => ({
  owner: one(usersTable, {
    fields: [projectsTable.owner],
    references: [usersTable.id]
  }),
  collaborators: many(projectCollaboratorsTable)
}));
var projectCollaboratorsTableRelations = (0, import_drizzle_orm2.relations)(
  projectCollaboratorsTable,
  ({ one }) => ({
    project: one(projectsTable, {
      fields: [projectCollaboratorsTable.project_id],
      references: [projectsTable.id]
    }),
    user: one(usersTable, {
      fields: [projectCollaboratorsTable.user_id],
      references: [usersTable.id]
    })
  })
);

// src/utils/schema/response.ts
var import_zod_openapi2 = require("@hono/zod-openapi");
var errorMessageEnums = [
  "validation_failed",
  "authorization_required",
  "internal_server_error",
  "not_found",
  "conflict"
];
var baseErrorSchema = import_zod_openapi2.z.object({
  code: import_zod_openapi2.z.number().openapi({
    example: 400
  }),
  message: import_zod_openapi2.z.string().openapi({
    example: "Bad Request"
  }),
  data: import_zod_openapi2.z.record(
    import_zod_openapi2.z.string(),
    import_zod_openapi2.z.object({
      message: import_zod_openapi2.z.string().openapi({
        example: "Bad Request"
      }),
      code: import_zod_openapi2.z.enum(errorMessageEnums).openapi({
        example: "validation_failed"
      })
    })
  ).optional().default({})
});
var baseRecordSchema = import_zod_openapi2.z.object({
  id: import_zod_openapi2.z.string(),
  created_at: import_zod_openapi2.z.string(),
  updated_at: import_zod_openapi2.z.string().nullable()
}).and(import_zod_openapi2.z.record(import_zod_openapi2.z.string(), import_zod_openapi2.z.any()));
var listResponseBodySchema = import_zod_openapi2.z.object({
  page: import_zod_openapi2.z.number(),
  perPage: import_zod_openapi2.z.number(),
  totalItems: import_zod_openapi2.z.number(),
  totalPages: import_zod_openapi2.z.number(),
  items: import_zod_openapi2.z.array(baseRecordSchema)
});
var listResponseParamsSchema = import_zod_openapi2.z.object({
  page: import_zod_openapi2.z.string().optional().default("1"),
  perPage: import_zod_openapi2.z.string().default("12").optional()
});

// src/routes/projects/schemas.ts
var import_drizzle_zod = require("drizzle-zod");
var import_zod4 = require("zod");
var SelectDBProjectSchema = (0, import_drizzle_zod.createSelectSchema)(projectsTable).extend({
  compensation: import_zod4.z.union([
    import_zod4.z.object({
      monetization_type: import_zod4.z.literal("Monetized"),
      amount: import_zod4.z.number(),
      currency: import_zod4.z.string(),
      frequency: import_zod4.z.enum(["Per Hour", "Per Month", "Per Milestone", "Per Project"]),
      duration: import_zod4.z.number()
    }),
    import_zod4.z.object({
      monetization_type: import_zod4.z.literal("Non-monetized")
    })
  ])
});
var UpdateDBProjectSchema = (0, import_drizzle_zod.createUpdateSchema)(projectsTable).extend({
  compensation: import_zod4.z.union([
    import_zod4.z.object({
      monetization_type: import_zod4.z.literal("Monetized"),
      amount: import_zod4.z.number(),
      currency: import_zod4.z.string(),
      frequency: import_zod4.z.enum(["Per Hour", "Per Month", "Per Milestone", "Per Project"]),
      duration: import_zod4.z.number()
    }),
    import_zod4.z.object({
      monetization_type: import_zod4.z.literal("Non-monetized")
    })
  ])
});
var InsertDBProjectSchema = (0, import_drizzle_zod.createInsertSchema)(projectsTable).extend({
  compensation: import_zod4.z.union([
    import_zod4.z.object({
      monetization_type: import_zod4.z.literal("Monetized"),
      amount: import_zod4.z.number(),
      currency: import_zod4.z.string(),
      frequency: import_zod4.z.enum(["Per Hour", "Per Month", "Per Milestone", "Per Project"]),
      duration: import_zod4.z.number()
    }),
    import_zod4.z.object({
      monetization_type: import_zod4.z.literal("Non-monetized")
    })
  ])
});
var ProjectsParamsSchema = listResponseParamsSchema.extend({});
var ListProjectsSchema = listResponseBodySchema.extend({
  items: SelectDBProjectSchema.array()
});
var ListProjectsErrorSchema = baseErrorSchema.extend({});
var InsertProjectsErrorSchema = baseErrorSchema.extend({});

// src/db/client.ts
var import_node_postgres = require("drizzle-orm/node-postgres");
var import_pg = __toESM(require("pg"), 1);

// src/db/helpers/query-logger.ts
function formatSqlQuery(query) {
  const keywords = [
    "SELECT",
    "FROM",
    "WHERE",
    "LEFT JOIN",
    "RIGHT JOIN",
    "INNER JOIN",
    "OUTER JOIN",
    "ON",
    "AND",
    "OR",
    "GROUP BY",
    "ORDER BY",
    "HAVING",
    "LIMIT",
    "OFFSET",
    "LATERAL",
    "COALESCE",
    "JSON_AGG",
    "JSON_BUILD_ARRAY"
  ];
  let formattedQuery = query.replace(/\s+/g, " ").trim();
  formattedQuery = formattedQuery.replace(/"([^"]+)"/g, (match) => {
    return match.replace(/\s+/g, "_SPACE_");
  });
  formattedQuery = formattedQuery.replace(/\bSELECT\b/i, "SELECT\n");
  keywords.forEach((keyword) => {
    if (keyword !== "SELECT") {
      const regex = new RegExp(`\\b${keyword}\\b`, "gi");
      formattedQuery = formattedQuery.replace(regex, `
${keyword}`);
    }
  });
  formattedQuery = formattedQuery.replace(/,/g, ",\n");
  formattedQuery = formattedQuery.replace(/_SPACE_/g, " ");
  const lines = formattedQuery.split("\n");
  let indentLevel = 0;
  formattedQuery = lines.map((line) => {
    line = line.trim();
    if (line.startsWith(")")) {
      indentLevel = Math.max(0, indentLevel - 1);
    }
    const indentedLine = "  ".repeat(indentLevel) + line;
    if (line.includes("(") && !line.includes(")")) {
      indentLevel++;
    }
    return indentedLine;
  }).join("\n");
  return formattedQuery;
}

// src/db/client.ts
var MyLogger = class {
  logQuery(query, params) {
    console.log("=== DRIZZLE QUERY ===");
    console.log(`%c${formatSqlQuery(query)}`, "color:cyan");
    if (params && params.length > 0) {
      console.log("=== DRIZZLE PARAMS ===");
      console.log(`%c${JSON.stringify(params)}`, "color:blue");
    }
  }
};
var { Pool } = import_pg.default;
var db = (0, import_node_postgres.drizzle)({
  client: new Pool({
    connectionString: envVariables.dbUrl
  }),
  schema: { ...users_exports, ...project_exports },
  logger: envVariables.NODE_ENV === "development" ? new MyLogger() : false
});

// src/routes/projects/index/get/handler.ts
var import_zod5 = require("zod");
async function getProjectsWithCollaborators(c) {
  try {
    const page = Number(c.req.query().page);
    const perPage = Number(c.req.query().perPage);
    const skip = (page - 1) * perPage;
    const totalItems = await db.$count(projectsTable);
    const totalPages = Math.ceil(totalItems / perPage);
    const projects = await db.query.projectsTable.findMany({
      limit: perPage,
      offset: skip,
      with: {
        collaborators: {
          limit: 5
        }
      }
    });
    return c.json(
      {
        page,
        perPage,
        totalItems,
        totalPages,
        items: projects
      },
      200
    );
  } catch (error) {
    if (error instanceof import_zod5.z.ZodError) {
      return c.json(
        {
          message: error.message,
          code: 400,
          data: {
            name: {
              message: "Something went wrong",
              code: "authorization_required"
            }
          }
        },
        400
      );
    }
    return c.json(
      {
        message: "Something went wrong",
        code: 500,
        data: {
          name: {
            message: "Something went wrong",
            code: "authorization_required"
          }
        }
      },
      500
    );
  }
}

// src/routes/projects/index/get/route.ts
var app2 = new import_hono2.Hono();
app2.get(
  "/",
  (0, import_hono_openapi2.describeRoute)({
    description: "get projects with collaborators",
    responses: {
      200: {
        content: {
          "application/json": {
            schema: (0, import_zod6.resolver)(ListProjectsSchema)
          }
        },
        description: "projects with collaborators retrieved"
      },
      400: {
        content: {
          "application/json": {
            schema: (0, import_zod6.resolver)(ListProjectsErrorSchema)
          }
        },
        description: "Bad request parameters"
      },
      500: {
        content: {
          "application/json": {
            schema: (0, import_zod6.resolver)(ListProjectsErrorSchema)
          }
        },
        description: "Internal error fetching projects"
      }
    }
  }),
  (0, import_zod6.validator)("query", ProjectsParamsSchema, (hook, c) => {
    if (!hook.success) {
      return c.json(
        {
          message: "incorrect query parameters",
          code: 400,
          data: returnValidationData(hook.error)
        },
        400
      );
    }
  }),
  (c) => {
    return getProjectsWithCollaborators(c);
  }
);

// src/routes/projects/index/post/route.ts
var import_hono3 = require("hono");
var import_hono_openapi3 = require("hono-openapi");
var import_zod8 = require("hono-openapi/zod");

// src/routes/projects/index/post/handler.ts
var import_zod7 = require("zod");
async function createProject(c) {
  try {
    const bodyValues = await c.req.json();
    const project = await db.insert(projectsTable).values(bodyValues).returning();
    return c.json(project, 200);
  } catch (error) {
    if (error instanceof import_zod7.z.ZodError) {
      const valError = returnValidationData(error);
      console.log({ valError });
      return c.json(
        {
          message: error.message,
          code: 400,
          data: valError
        },
        400
      );
    }
    return c.json(
      {
        message: "Something went wrong",
        code: 500,
        data: {
          name: {
            message: error?.message,
            code: "internal_server_error"
          }
        }
      },
      500
    );
  }
}

// src/routes/projects/index/post/route.ts
var app3 = new import_hono3.Hono();
app3.post(
  "/",
  (0, import_hono_openapi3.describeRoute)({
    description: "add a project",
    responses: {
      200: {
        content: {
          "application/json": {
            schema: (0, import_zod8.resolver)(SelectDBProjectSchema)
          }
        },
        description: "New project added"
      },
      400: {
        content: {
          "application/json": {
            schema: (0, import_zod8.resolver)(InsertProjectsErrorSchema)
          }
        },
        description: "Bad request parameters"
      },
      500: {
        content: {
          "application/json": {
            schema: (0, import_zod8.resolver)(InsertProjectsErrorSchema)
          }
        },
        description: "Internal error"
      }
    }
  }),
  (0, import_zod8.validator)("json", InsertDBProjectSchema, (hook, c) => {
    if (!hook.success) {
      return c.json(
        {
          message: "incorrect body parameters",
          code: 400,
          data: returnValidationData(hook.error)
        },
        400
      );
    }
  }),
  (c) => {
    return createProject(c);
  }
);

// src/routes/projects/main.ts
var app4 = new import_hono4.Hono();
app4.route("/", app2);
app4.route("/", app3);

// src/index.ts
var app5 = new import_hono5.Hono();
app5.route("/", app);
app5.route("/projects", app4);
var port = envVariables.port || 5e3;
console.log(`Server is running on http://localhost:${port}`);
app5.get(
  "/openapi",
  (0, import_hono_openapi4.openAPISpecs)(app5, {
    documentation: {
      info: { title: "Collabs Backend API", version: "1.0.0", description: "Collabs Nodejs Backend Backend" },
      servers: [{ url: `http://localhost:${port}`, description: "Local Server" }]
    }
  })
);
app5.get(
  "/docs",
  apiReference({
    theme: "saturn",
    spec: { url: "/openapi" }
  })
);
app5.get("/swagger", (0, import_swagger_ui.swaggerUI)({ url: "/openapi" }));
(0, import_node_server.serve)({
  fetch: app5.fetch,
  port
});
//# sourceMappingURL=index.cjs.map