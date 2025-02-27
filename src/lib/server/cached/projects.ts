import { unstable_cacheTag as cacheTag } from "next/cache";
import { getUserProject, getUserProjects } from "@/lib/db/model";
import { GLOBAL_TAG } from "./helper";

export function getUserProjectsTag({ userId }: { userId: string }) {
  return [`user-${userId}-projects`, GLOBAL_TAG];
}

export async function getCachedUserProjects({ userId }: { userId: string }) {
  "use cache";
  cacheTag(...getUserProjectsTag({ userId }));

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
  return [`user-${userId}`, `project-${projectSlug}`, GLOBAL_TAG];
}

export async function getCachedUserProject({
  projectSlug,
  userId,
}: {
  projectSlug: string;
  userId: string;
}) {
  "use cache";
  cacheTag(...getUserProjectTag({ projectSlug, userId }));
  const project = await getUserProject({ projectSlug, userId });
  return project;
}
