import {
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";
import { user } from "./auth";
import { ProjectRole } from "@/lib/constants/permissions";

export const project = pgTable("project", {
  id: uuid("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  slug: text("slug").unique().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type SelectProject = typeof project.$inferSelect;
export type InsertProject = typeof project.$inferInsert;

export const userProject = pgTable(
  "project_user",
  {
    projectId: uuid("project_id").references(() => project.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }).notNull(),
    userId: text("user_id").references(() => user.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }).notNull(),
    role: text("role")
      .$type<ProjectRole>()
      .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.projectId] })]
);

export type SelectUserProject = typeof userProject.$inferSelect;
export type InsertUserProject = typeof userProject.$inferInsert;
