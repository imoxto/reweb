import { Suspense } from "react";
import { UpdateProjectForm } from "./update-project-form";
import { getSession } from "@/lib/auth";
import { getCachedUserProject } from "@/lib/server/cached/project";

async function UpdateProjectFormWrapper({
  projectSlug,
}: {
  projectSlug: string;
}) {
  const session = await getSession();
  if (!session?.user) return null;

  const userProject = await getCachedUserProject({
    projectSlug,
    userId: session.user.id,
  });

  return <UpdateProjectForm values={{
    name: userProject.project.name,
    description: userProject.project.description?? undefined,
    slug: userProject.project.slug,
  }} />;
}


export default async function NewProjectPage({
  params,
}: {
  params: Promise<{ projectSlug: string }>;
}) {
  const { projectSlug } = await params;
  return (
    <main className="flex h-full flex-col items-center justify-center">
        <UpdateProjectFormWrapper projectSlug={projectSlug} />
    </main>
  );
}
