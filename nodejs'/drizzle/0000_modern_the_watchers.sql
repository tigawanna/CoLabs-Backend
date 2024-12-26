CREATE TYPE "public"."platform" AS ENUM('web', 'mobile', 'desktop');--> statement-breakpoint
CREATE TYPE "public"."project_type" AS ENUM('private', 'open-source');--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "projects_collaborators" (
	"id" text PRIMARY KEY NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"project_id" text NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" text PRIMARY KEY NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"owner" text NOT NULL,
	"type" "project_type" DEFAULT 'open-source',
	"platform" "platform" DEFAULT 'web',
	"compensation" jsonb DEFAULT '{"monetization_type":"Non-monetized"}'::jsonb,
	"link" varchar(255),
	"languages" varchar(255) NOT NULL,
	"issuesCount" integer DEFAULT 0,
	"forksCount" integer DEFAULT 0,
	"starCount" integer DEFAULT 0,
	"lastCommitDate" timestamp with time zone DEFAULT now(),
	CONSTRAINT "projects_title_unique" UNIQUE("title")
);
--> statement-breakpoint
ALTER TABLE "projects_collaborators" ADD CONSTRAINT "projects_collaborators_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects_collaborators" ADD CONSTRAINT "projects_collaborators_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_owner_users_id_fk" FOREIGN KEY ("owner") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;