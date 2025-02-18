import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUserProjects } from "@/lib/db/model";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default async function ProjectsPage() {
  const session = await getSession();
  if (!session?.user) {
    redirect("/auth/signin");
  }

  const projects = await getUserProjects({ userId: session.user.id });

  return (
    <main className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Link href="/dashboard/projects/new">
          <Button>
            <Plus className="size-4" />
            New Project
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map(({ project }) => (
          <Link key={project.id} href={`/dashboard/projects/${project.slug}`}>
            <Card className="hover:bg-muted/50 transition-colors">
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {project.description || "No description"}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
