import { eq, and } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { db } from "..";
import { resource } from "../schema";

export async function createResource({
  projectId,
  name,
  type,
}: {
  projectId: string;
  name: string;
  type: string;
}) {
  const createdResource = await db.insert(resource).values({
    id: uuidv4(),
    projectId,
    name,
    type,
  });
  return createdResource;
}

export async function getResource({
  id,
}: {
  id: string;
}) {
  const retrievedResource = await db.select().from(resource).where(eq(resource.id, id));
  return retrievedResource;
}

export async function getResources({
  projectId,
}: {
  projectId: string;
}) {
  const retrievedResources = await db.select().from(resource).where(eq(resource.projectId, projectId));
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
  const updatedResource = await db.update(resource).set({ name, type, publishedAt }).where(eq(resource.id, id));
  return updatedResource;
}
