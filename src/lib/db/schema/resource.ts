import { index, json, pgTable, text, timestamp, uuid, vector } from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";
import { project } from "./project";
import { EmbeddingMetadata } from "@/lib/constants/embeddings";

export const resource = pgTable("resource", {
  id: uuid("id").$defaultFn(() => uuidv4()).primaryKey(),
  name: text("name").notNull(),
  projectId: uuid("project_id").references(() => project.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }).notNull(),
  publishedAt: timestamp("published_at"),
  type: text("type").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type SelectResource = typeof resource.$inferSelect;
export type InsertResource = typeof resource.$inferInsert;

export const embedding = pgTable(
  "embedding",
  {
    id: uuid("id").primaryKey().$default(()=>uuidv4()),
    content: text("content").notNull(),
    metadata: json("metadata").$type<EmbeddingMetadata>(),
    embedding: vector("embedding", { dimensions: 1536 }).notNull(),
    resourceId: uuid("resource_id")
      .references(() => resource.id, {
        onUpdate: "cascade",
        onDelete: "cascade",
      })
      .notNull(),
  },
  (table) => [
    index("embeddingIndex").using(
      "hnsw",
      table.embedding.op("vector_cosine_ops")
    ),
  ]
);

export type SelectEmbedding = typeof embedding.$inferSelect;
export type InsertEmbedding = typeof embedding.$inferInsert;

