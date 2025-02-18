import {
  Sidebar,
  SidebarRail,
  SidebarFooter,
  SidebarTrigger,
  SidebarHeader,
  SidebarContent,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { ProjectsSwitcherWrapper } from "./projects-switcher-wrapper";

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
