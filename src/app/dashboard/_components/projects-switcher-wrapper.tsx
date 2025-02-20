import { getSession } from "@/lib/auth";
import { ProjectsSwitcher } from "./projects-switcher";
import { getCachedUserProjects } from "@/lib/server/cached/projects";
import { Suspense } from "react";

export async function ProjectsSwitcherWrapper() {
  const session = await getSession();
  if (!session?.user) return null;

  const userProjects = await getCachedUserProjects({ userId: session.user.id });

  const projects = userProjects.map(({ project, project_user }) => ({
    name: project.name,
    role: project_user.role,
    slug: project.slug,
  }));

  return (
    <Suspense>
      <ProjectsSwitcher projects={projects} />
    </Suspense>
  );
}
