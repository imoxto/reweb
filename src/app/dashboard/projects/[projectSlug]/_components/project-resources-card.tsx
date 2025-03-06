import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { getCachedResources } from "@/lib/server/cached/resource";
import { getSession } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";

export async function ProjectResourcesCard({
  projectSlug,
}: {
  projectSlug: string;
}) {
  const session = await getSession<true>();
  const resources = await getCachedResources({
    userId: session.user.id,
    projectSlug,
  });

  return (
    <Card>
      <CardHeader className="space-y-0 flex flex-row items-center justify-between">
        <CardTitle>Project Resources</CardTitle>
        <Link href={`/dashboard/projects/${projectSlug}/resources/new`} className="text-decoration-none">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Create Resource
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {resources && resources.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => (
              <Link
                key={resource.id}
                href={`/dashboard/projects/${projectSlug}/resources/${resource.id}`}
              >
                <Card className={"hover:bg-muted/50 transition-colors"}>
                  <CardHeader>
                    <CardTitle>{resource.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {resource.type}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Link
                      href={`/dashboard/projects/${projectSlug}/resources/${resource.id}/edit`}
                    >
                      <Button variant="ghost" size="icon" asChild>
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">No resources found</p>
        )}
      </CardContent>
    </Card>
  );
}
