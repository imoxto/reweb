import { getSession } from "@/lib/auth";
import { getUserProjects } from "@/lib/db/model";
import { ProjectsSwitcher } from "./projects-switcher";

export async function ProjectsSwitcherWrapper() {
  const session = await getSession();
  if (!session?.user) return null;

  const userProjects = await getUserProjects({ userId: session.user.id });
  
  const projects = userProjects.map(({ project }) => ({
    name: project.name,
    plan: "Free", // You can modify this based on your plan implementation
    slug: project.slug,
  }));

  return <ProjectsSwitcher projects={projects} />;
}