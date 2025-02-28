import { relations } from "drizzle-orm";
import { project, userProject } from "./project";
import { resource, embedding } from "./resource";
import { thread, message } from "./thread";
import { user } from "./auth";

export const projectRelations = relations(project, ({ many }) => ({
  users: many(userProject),
}));

export const userProjectRelations = relations(userProject, ({ one }) => ({
  project: one(project, {
    fields: [userProject.projectId],
    references: [project.id],
  }),
  user: one(user, {
    fields: [userProject.userId],
    references: [user.id],
  }),
}));

export const userRelations = relations(user, ({ many }) => ({
  projects: many(userProject),
}));

export const resourceRelations = relations(resource, ({ one, many }) => ({
  project: one(project, {
    fields: [resource.projectId],
    references: [project.id],
  }),
  embeddings: many(embedding),
}));

export const embeddingRelations = relations(embedding, ({ one }) => ({
  resource: one(resource, {
    fields: [embedding.resourceId],
    references: [resource.id],
  }),
}));

export const threadRelations = relations(thread, ({ one, many }) => ({
  project: one(project, {
    fields: [thread.projectId],
    references: [project.id],
  }),
  messages: many(message),
}));

export const messageRelations = relations(message, ({ one }) => ({
  thread: one(thread, {
    fields: [message.threadId],
    references: [thread.id],
  }),
}));
