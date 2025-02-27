import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSession } from "@/lib/auth";
import { getCachedUserProject } from "@/lib/server/cached/projects";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { DeleteProjectDialog } from "./_components/delete-project-dialog";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectSlug: string }>;
}) {
  const token = await getSession();
  if (!token?.user.id) return redirect("/api/auth/login");

  const projectSlug = (await params).projectSlug;
  const projectResponse = await getCachedUserProject({
    projectSlug,
    userId: token.user.id,
  });

  return (
    <main className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Project Details</h1>
          <p className="text-sm text-muted-foreground">
            View and manage your project settings
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/projects/${projectSlug}/edit`}>
            <Button variant="outline">
              <Pencil className="w-4 h-4 mr-2" />
              Edit Project
            </Button>
          </Link>
          <DeleteProjectDialog project={{name: projectResponse.project.name, slug: projectResponse.project.slug}} />
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-sm font-medium">Name</h3>
              <p className="text-sm text-muted-foreground">
                {projectResponse.project.name}
              </p>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium">Description</h3>
              <p className="text-sm text-muted-foreground">
                {projectResponse.project.description || "No description"}
              </p>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium">Slug</h3>
              <p className="text-sm text-muted-foreground">
                {projectResponse.project.slug}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
