"use client";

import * as React from "react";
import { ChevronsUpDown, Notebook, Plus, Folder, Home, MessageSquareText } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useParams, useRouter } from "next/navigation";

export function ProjectsSwitcher({
  projects = [],
}: {
  projects?: {
    name: string;
    role: string;
    slug: string;
  }[];
}) {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const params = useParams();
  const projectSlug = params.projectSlug;
  const activeProject = projects.find(p=>p.slug===projectSlug)

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {activeProject ? (
                <>
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Folder className="size-4 shrink-0" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {activeProject.name}
                    </span>
                    <span className="truncate text-xs">
                      {activeProject.role}
                    </span>
                  </div>
                </>
              ) : (
                "No projects selected"
              )}
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Projects
            </DropdownMenuLabel>
            {projects.map((project, index) => (
              <DropdownMenuItem
                key={project.name}
                onClick={() => router.push(`/dashboard/projects/${project.slug}`)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <Folder className="size-4 shrink-0" />
                </div>
                {project.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2 p-2"
              onClick={() => router.push("/dashboard/projects/new")}
            >
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">
                Add project
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
      {activeProject && (
        <SidebarMenuItem>
          <SidebarMenuButton onClick={() => router.push(`/dashboard/projects/${activeProject.slug}`)}>
            <Home className="size-4 shrink-0" /> {activeProject.name} home
          </SidebarMenuButton>
          <SidebarMenuButton onClick={() => router.push(`/dashboard/projects/${activeProject.slug}/resources`)}>
            <Notebook className="size-4 shrink-0" /> Resources
          </SidebarMenuButton>
          <SidebarMenuButton onClick={() => router.push(`/dashboard/projects/${activeProject.slug}/chat`)}>
            <MessageSquareText className="size-4 shrink-0" /> Chat
          </SidebarMenuButton>
        </SidebarMenuItem>
      )}
    </SidebarMenu>
  );
}
