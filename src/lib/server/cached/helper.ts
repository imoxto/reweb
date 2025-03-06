import { revalidateTag } from "next/cache";

export const GLOBAL_TAG = "*";

export const PROJECTS_TAG = "projects";

export function projectResourcesTag(projectId: string) {
  return `projectResources-${projectId}`;
}

export function projectTag(id: string) {
  return `project-${id}`;
}

export function projectSlugTag(slug: string) {
  return `projectSlug-${slug}`;
}

export const RESOURCES_TAG = "resources";
export function resourceTag(id: string) {
  return `resource-${id}`;
}

export const THREADS_TAG = "threads";
export function threadTag(id: string) {
  return `thread-${id}`;
}

export function userProjectsTag(userId: string) {
  return `userProjects-${userId}`;
}

export function userTag(id: string) {
  return `user-${id}`;
}

export function revalidateTags(tags: string[]) {
  tags.forEach((tag) => {
    revalidateTag(tag);
  });
}
