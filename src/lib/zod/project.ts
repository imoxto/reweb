import { z } from "zod";

export const projectFormSchema = z.object({
  name: z.string().min(2, {
    message: "Project name must be at least 2 characters.",
  }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .optional(),
  slug: z
    .string()
    .min(2, {
      message: "Slug must be at least 2 characters.",
    })
    .regex(/^\w[\w-]+$/, {
      message:
        "Slug must contain only alphanumeric characters.",
    })
    .optional(),
});

export const createProjectSchema = projectFormSchema
export const updateProjectSchema = projectFormSchema.partial()

export type ProjectFormSchema = z.infer<typeof projectFormSchema>;
export type CreateProjectSchema = z.infer<typeof createProjectSchema>;
export type UpdateProjectSchema = z.infer<typeof updateProjectSchema>;
