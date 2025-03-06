import { eq, and, isNotNull } from "drizzle-orm";
import { db } from "..";
import { resource, embedding, InsertResource, InsertEmbedding } from "../schema";

export async function createResourceAndEmbeddings(params: {
  generateEmbeddings: () => Promise<Array<Omit<InsertEmbedding, "resourceId">>>;
  resource: InsertResource;
}) {
  const [insertedResource] = await db
    .insert(resource)
    .values(params.resource)
    .onConflictDoNothing()
    .returning();
  if (!insertedResource) {
    return;
  }
  const generatedEmbeddings = await params.generateEmbeddings();
  await db.insert(embedding).values(
    generatedEmbeddings.map((embedding) => ({
      ...embedding,
      resourceId: insertedResource.id,
    }))
  );
}


export async function getResource({ id }: { id: string }) {
  const retrievedResource = await db
    .select()
    .from(resource)
    .where(eq(resource.id, id));
  return retrievedResource;
}

export async function getResources({
  projectId,
  publishedOnly = false,
}: {
  projectId: string;
  publishedOnly?: boolean;
}) {
  const retrievedResources = await db
    .select()
    .from(resource)
    .where(
      publishedOnly
        ? and(
            eq(resource.projectId, projectId),
            isNotNull(resource.publishedAt)
          )
        : eq(resource.projectId, projectId)
    );
  return retrievedResources;
}

export async function updateResource({
  id,
  name,
  type,
  publishedAt,
}: {
  id: string;
  name: string;
  type: string;
  publishedAt: Date;
}) {
  const updatedResource = await db
    .update(resource)
    .set({ name, type, publishedAt })
    .where(eq(resource.id, id));
  return updatedResource;
}

export async function deleteResource({ id }: { id: string }) {
  const deletedResource = await db.delete(resource).where(eq(resource.id, id));
  return deletedResource;
}
