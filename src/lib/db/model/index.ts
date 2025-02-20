import { eq, and } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { db } from "..";
import { InsertProject, project, user, userProject } from "../schema";

export async function createProject(params: {
  projectInput: Omit<InsertProject, "slug"> & { slug?: string };
  userId: string;
}) {
  const insertedProject = await db.transaction(async (tx) => {
    const uuid = uuidv4();
    const result = await tx
      .insert(project)
      .values({
        ...params.projectInput,
        id: uuid,
        slug: params.projectInput.slug ?? uuid,
      })
      .returning({ id: project.id, slug: project.slug });
    await tx.insert(userProject).values({
      projectId: result[0].id,
      userId: params.userId,
      role: "owner",
    });
    return result[0];
  });
  return insertedProject;
}

export async function getUserProject({
  projectSlug,
  userId,
}: {
  projectSlug: string;
  userId: string;
}) {
  const [retrievedProject] =await db
    .select()
    .from(project)
    .innerJoin(userProject, eq(project.id, userProject.projectId))
    .where(
      and(eq(project.slug, projectSlug), eq(userProject.userId, userId))
    ).limit(1)

  return retrievedProject;
}

export async function getUserProjects({ userId }: { userId: string }) {
  const retrievedProjects = await db
    .select()
    .from(userProject)
    .innerJoin(project, eq(project.id, userProject.projectId))
    .where(eq(userProject.userId, userId));
  return retrievedProjects;
}

export async function getProjectUsers({ projectId }: { projectId: string }) {
  const retrievedProjectUsers = await db
    .select()
    .from(userProject)
    .innerJoin(user, eq(user.id, userProject.userId))
    .where(eq(userProject.projectId, projectId));
  return retrievedProjectUsers;
}

export async function getAllProjectUsers({ userId }: { userId: string }) {
  // this will be complex... need to get all users that are in any project with the user
}
