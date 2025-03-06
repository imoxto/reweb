import { processPdfFile, processTextFile } from "@/lib/ai/file-processors";
import { projectResourcesTag, revalidateTags } from "@/lib/server/cached/helper";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    // make files typesafe
    const files = formData.getAll("files") as File[];
    const projectId = formData.get("projectId") as string;

    if (files.length < 1) {
      throw new Error("No files uploaded");
    }

    const succeededFiles: string[] = [];
    const failedFiles: string[] = [];

    for (const file of files) {
      const fileType = file.type;
      try {
        if (fileType === "application/pdf") {
          await processPdfFile({ file, projectId });
          succeededFiles.push(file.name);
        } else if (fileType.startsWith("text/")) {
          await processTextFile({ file, projectId });
          succeededFiles.push(file.name);
        }
      } catch (e: any) {
        console.error(e);
        failedFiles.push(file.name);
      }
    }

    revalidateTags([projectResourcesTag(projectId)]);

    return NextResponse.json({
      status: "success",
      message: `${succeededFiles.length} Files processed successfully.${
        failedFiles.length && ` Failed files: ${failedFiles.join(", ")}`
      }`,
    });
  } catch (e: any) {
    return NextResponse.json({ status: "fail", data: e.message });
  }
}
