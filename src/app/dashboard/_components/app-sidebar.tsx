import {
  Sidebar,
  SidebarRail,
  SidebarFooter,
  SidebarTrigger,
  SidebarHeader,
  SidebarContent,
} from "@/components/ui/sidebar";
import { getSession } from "@/lib/auth";
import { getCachedUserProjects } from "@/lib/server/cached/project";
import { NavUser } from "./nav-user";
import { ProjectsSwitcher } from "./projects-switcher";
import { Suspense } from "react";

async function ProjectsSwitcherWrapper() {
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent className="p-2">
        <ProjectsSwitcherWrapper />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
