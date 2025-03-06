"use server";
import { getSession } from "@/lib/auth";
import {
  createProject,
  deleteProject,
  updateProject,
} from "@/lib/db/model/project";
import { createProjectSchema, updateProjectSchema } from "@/lib/zod/project";
import { getCachedUserProject } from "../cached/project";
import {
  projectResourcesTag,
  projectSlugTag,
  projectTag,
  revalidateTags,
  userProjectsTag,
} from "../cached/helper";

export async function createProjectAction(values: any) {
  const token = await getSession();
  if (!token?.user) {
    throw new Error("Unauthorized");
  }

  const { name, description, slug } = createProjectSchema.parse(values);

  const project = await createProject({
    userId: token.user.id,
    projectInput: {
      name,
      description,
      slug,
    },
  });

  revalidateTags([
    userProjectsTag(token.user.id),
    projectTag(project.id),
    projectResourcesTag(project.id),
    projectSlugTag(project.slug),
  ]);

  return project;
}

export async function updateProjectAction(currentSlug: string, values: any) {
  const token = await getSession();
  if (!token?.user) {
    throw new Error("Unauthorized");
  }

  const { name, description, slug } = updateProjectSchema.parse(values);

  const userProject = await getCachedUserProject({
    projectSlug: currentSlug,
    userId: token.user.id,
  });

  // TODO: check if user has permission to update project

  const project = await updateProject({
    projectId: userProject.project.id,
    projectInput: { name, description, slug },
  });

  revalidateTags([
    projectTag(project.id),
    userProjectsTag(token.user.id),
    ...(project.slug === currentSlug
      ? [projectSlugTag(project.slug)]
      : [projectSlugTag(currentSlug), projectSlugTag(project.slug)]),
  ]);

  return project;
}

export async function deleteProjectAction(projectSlug: string) {
  const token = await getSession();
  if (!token?.user) {
    throw new Error("Unauthorized");
  }

  const userProject = await getCachedUserProject({
    projectSlug,
    userId: token.user.id,
  });

  // TODO: check if user has permission to delete project

  await deleteProject({ projectId: userProject.project.id });

  revalidateTags([
    userProjectsTag(token.user.id),
    projectTag(userProject.project.id),
    projectResourcesTag(userProject.project.id),
    projectSlugTag(projectSlug),
  ]);
}
