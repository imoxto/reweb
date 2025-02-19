"use server";
import { getSession } from "@/lib/auth";
import { createProject } from "@/lib/db/model";
import { createProjectSchema } from "@/lib/zod/project";
import { revalidateTag } from "next/cache";
import { getUserProjectsTag } from "../cached/projects";

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
    }
  })

  revalidateTag(getUserProjectsTag({ userId: token.user.id }))

  return project
}

