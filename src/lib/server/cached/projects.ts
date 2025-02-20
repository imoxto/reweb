import { unstable_cacheTag as cacheTag } from "next/cache";
import { getUserProject, getUserProjects } from "@/lib/db/model";

export function getUserProjectsTag({ userId }: { userId: string }) {
  return `user-${userId}-projects`;
}

export async function getCachedUserProjects({ userId }: { userId: string }) {
  "use cache";
  cacheTag(getUserProjectsTag({ userId }));

  const projects = await getUserProjects({ userId });
  return projects;
}

export function getUserProjectTag({
  projectSlug,
  userId,
}: {
  projectSlug: string;
  userId: string;
}) {
  return `user-${userId}-project-${projectSlug}`;
}

export async function getCachedUserProject({
  projectSlug,
  userId,
}: {
  projectSlug: string;
  userId: string;
}) {
  "use cache";
  cacheTag(getUserProjectTag({ projectSlug, userId }));
  const project = await getUserProject({ projectSlug, userId });
  return project;
}
