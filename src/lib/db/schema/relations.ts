import { relations } from "drizzle-orm";
import { project, userProject } from "./project";
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

