import { getResource, getResources } from "@/lib/db/model/resource";
import { unstable_cacheTag as cacheTag } from "next/cache";
import { getCachedUserProject } from "./project";
import { GLOBAL_TAG, projectResourcesTag, projectTag, RESOURCES_TAG, resourceTag } from "./helper";

export async function getCachedResources({
  userId,
  projectSlug,
}: {
  userId: string;
  projectSlug: string;
}) {
  "use cache";
  const userProject = await getCachedUserProject({ userId, projectSlug });
  if (!userProject) {
    return null;
  }

  cacheTag(projectResourcesTag(userProject.project.id), RESOURCES_TAG, GLOBAL_TAG);
  const cachedResources = await getResources({ projectId: userProject.project.id });
  return cachedResources;
}

export async function getCachedResource({
  id,
  userId,
  projectSlug,
}: {
  id: string;
  userId: string;
  projectSlug: string;
}) {
  "use cache";
  const userProject = await getCachedUserProject({ userId, projectSlug });
  if (!userProject) {
    return null;
  }
  cacheTag(resourceTag(id), projectResourcesTag(userProject.project.id), GLOBAL_TAG);
  const cachedResource = await getResource({ id });
  return cachedResource;
}
