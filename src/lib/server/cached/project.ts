import { unstable_cacheTag as cacheTag } from "next/cache";
import { getUserProject, getUserProjects } from "@/lib/db/model/project";
import { GLOBAL_TAG, PROJECTS_TAG, projectSlugTag, userTag } from "./helper";


export async function getCachedUserProjects({ userId }: { userId: string }) {
  "use cache";
  cacheTag(userTag(userId), PROJECTS_TAG, GLOBAL_TAG);

  const projects = await getUserProjects({ userId });
  return projects;
}

export async function getCachedUserProject({
  projectSlug,
  userId,
}: {
  projectSlug: string;
  userId: string;
}) {
  "use cache";
  cacheTag(userTag(userId), projectSlugTag(projectSlug), GLOBAL_TAG);
  const project = await getUserProject({ projectSlug, userId });
  return project;
}
