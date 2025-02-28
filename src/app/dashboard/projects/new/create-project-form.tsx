"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateProjectSchema, createProjectSchema } from "@/lib/zod/project";
import { createProjectAction } from "@/lib/server/actions";
import { toast } from "@/hooks/use-toast";



export function CreateProjectForm({
  values = {
    name: "",
    description: "",
    slug: "",
  },
}: {
  values?: CreateProjectSchema;
}) {
  const router = useRouter();
  const form = useForm<CreateProjectSchema>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: values.name,
      description: values.description,
      slug: values.slug,
    },
  });

  async function onSubmit(values: CreateProjectSchema) {
    try {
      const res = await createProjectAction(values);
      console.log(res);
      router.push(`/dashboard/projects/${res.slug}`);
    } catch (error: any) {
      console.error("Failed to create project:", error);
      toast({
        title: "Failed to create project",
        description: error.message ?? "An unknown error occurred",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Create New Project</CardTitle>
            <CardDescription>
              Create a new project to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My Awesome Project" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your project's display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your project..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A brief description of your project.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="my-awesome-project" {...field} />
                  </FormControl>
                  <FormDescription>
                    The URL-friendly name of your project.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit">Create Project</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

