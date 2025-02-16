import {
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";
import { user } from "./auth";

export const project = pgTable("project", {
  id: uuid("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  slug: text("slug").notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export type SelectProject = typeof project.$inferSelect;
export type InsertProject = typeof project.$inferInsert;

export const userProject = pgTable(
  "project_user",
  {
    projectId: uuid("project_id").references(() => project.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    userId: uuid("user_id").references(() => user.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    role: text("role")
      .$type<"owner" | "admin" | "member" | "viewer">()
      .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.projectId] })]
);

export type SelectUserProject = typeof userProject.$inferSelect;
export type InsertUserProject = typeof userProject.$inferInsert;
