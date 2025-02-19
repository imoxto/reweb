import { getSession } from "@/lib/auth";
import { ProjectsSwitcher } from "./projects-switcher";
import { getCachedUserProjects } from "@/lib/server/cached/projects";

export async function ProjectsSwitcherWrapper() {
  const session = await getSession();
  if (!session?.user) return null;

  const userProjects = await getCachedUserProjects({ userId: session.user.id });
  
  const projects = userProjects.map(({ project, project_user }) => ({
    name: project.name,
    role: project_user.role,
    slug: project.slug,
  }));

  return <ProjectsSwitcher projects={projects} />;
}