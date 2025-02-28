import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";
import { project } from "./project";

export const thread = pgTable("thread", {
  id: uuid("id").$defaultFn(() => uuidv4()).primaryKey(),
  name: text("name").notNull(),
  projectId: uuid("project_id").references(() => project.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const message = pgTable(
  "message",
  {
    id: uuid("id").primaryKey().$default(()=>uuidv4()),
    role: text("role").$type<"user"|"assistant">().$defaultFn(()=>'user'),
    content: text("content").notNull(),
    threadId: uuid("resource_id")
      .references(() => thread.id, {
        onUpdate: "cascade",
        onDelete: "cascade",
      })
      .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  }
);