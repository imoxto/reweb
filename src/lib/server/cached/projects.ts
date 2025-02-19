import { unstable_cacheTag as cacheTag } from "next/cache"
import { getUserProjects } from "@/lib/db/model"

export function getUserProjectsTag({ userId }: { userId: string }) {
  return `user-projects-${userId}`
}

export async function getCachedUserProjects({ userId }: { userId: string }) {
  "use cache"
  cacheTag(getUserProjectsTag({ userId }))
  return await getUserProjects({userId})
}