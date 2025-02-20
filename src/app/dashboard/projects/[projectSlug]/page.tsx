import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSession } from "@/lib/auth";
import { getCachedUserProject } from "@/lib/server/cached/projects";
import { redirect } from "next/navigation";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectSlug: string }>;
}) {
  const token = await getSession()
  if (!token?.user.id) return redirect("/api/auth/login")
    
  const projectSlug= (await params).projectSlug
  const projectResponse = await getCachedUserProject({projectSlug, userId: token.user.id})
  
  return (
    <main className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Projects</h1>
      </div>

      <Card className="hover:bg-muted/50 transition-colors">
        <CardHeader>
          <CardTitle>{projectResponse.project.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {projectResponse.project.description || "No description"}
          </p>
          <p className="text-sm text-muted-foreground">
            {projectResponse.project.slug}
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
