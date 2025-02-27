import { revalidateTag } from "next/cache";

export const GLOBAL_TAG = "*";

export function revalidateTags(tags: string[]) {
  tags.forEach((tag) => {
    revalidateTag(tag);
  });
}
