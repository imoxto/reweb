import { eq, and } from "drizzle-orm";
import { db } from "..";
import {
  InsertProject,
  InsertUserProject,
  project,
  user,
  userProject,
} from "../schema";

export async function createProject(
  projectInput: InsertProject,
  userProjectInput: InsertUserProject
) {
  const insertedProject = await db.transaction(async (tx) => {
    const result = await tx
      .insert(project)
      .values(projectInput)
      .returning({ id: project.id });

    await tx
      .insert(userProject)
      .values({
        projectId: result[0].id,
        userId: userProjectInput.userId,
        role: userProjectInput.role,
      });
  });
  return insertedProject;
}

export async function getUserProject({
  projectId,
  userId,
}: {
  projectId: string;
  userId: string;
}) {
  const retrievedProject = await db
    .select()
    .from(userProject)
    .innerJoin(project, eq(project.id, userProject.projectId))
    .where(
      and(eq(userProject.projectId, projectId), eq(userProject.userId, userId))
    );
  return retrievedProject;
}

export async function getUserProjects({ userId }: { userId: string }) {
  const retrievedProjects = await db.select().from(userProject).innerJoin(project, eq(project.id, userProject.projectId)).where(eq(userProject.userId, userId))
  return retrievedProjects;
}

export async function getProjectUsers({ projectId }: { projectId: string }) {
  const retrievedProjectUsers = await db.select().from(userProject).innerJoin(user, eq(user.id, userProject.userId)).where(eq(userProject.projectId, projectId))
  return retrievedProjectUsers;
}

export async function getAllProjectUsers({ userId }: { userId: string }) {
  // this will be complex... need to get all users that are in any project with the user
}






