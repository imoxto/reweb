import { ProjectResourcesCard } from "../_components/project-resources-card";

export default async function ProjectResourcesPage({
  params,
}: {
  params: Promise<{ projectSlug: string }>;
}) {
  const projectSlug = (await params).projectSlug;
  return (
    <main className="container py-8">
      <div className="grid gap-6">
        <ProjectResourcesCard projectSlug={projectSlug} />
      </div>
    </main>
  );
}

