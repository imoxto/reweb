import { createResourceAndEmbeddings } from "../db/model/resource";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings } from "@langchain/openai";
import type Tpdf from "pdf-parse";

const embedder = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
  dimensions: 1536,
});


export async function processTextFile({file, projectId}: {file: File; projectId: string}) {
  const text = (await file.text()).trim();

  const splitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
    chunkSize: 1024,
    chunkOverlap: 192,
  });

  const splitDocuments = await splitter.createDocuments([text]);
  console.log(
    "Split documents",
    JSON.stringify(splitDocuments.map((doc) => doc.metadata), null, 2)
  );

  if (!splitDocuments.length) {
    throw new Error("No content to create resource");
  }

  console.log(`document ${file.name} has ${splitDocuments.length} chunks`);

  await createResourceAndEmbeddings({
    generateEmbeddings: async () => {
      const generatedEmbeddings = await embedder.embedDocuments(
        splitDocuments.map((doc) => doc.pageContent)
      );
      const embeddings = generatedEmbeddings.map((embedding, index) => ({
        content: splitDocuments[index].pageContent,
        metadata: splitDocuments[index].metadata as any,
        embedding,
      }));
      return embeddings;
    },
    resource: { name: file.name, projectId, type: "text" },
  });

  return splitDocuments;
}

export async function processPdfFile({file, projectId}: {file: File; projectId: string}) {
  const fileArrayBuffer = await file.arrayBuffer();
  //@ts-ignore
  const pdf = await import("pdf-parse/lib/pdf-parse.js") as Tpdf;
  const parsedPdf = await pdf(Buffer.from(fileArrayBuffer));
  const text = parsedPdf.text;
  const splitter = new RecursiveCharacterTextSplitter({
    separators: ["\n\n", "\n"],
    chunkSize: 1024,
    chunkOverlap: 192,
  });
  const splitDocuments = await splitter.createDocuments([text]);
  if (!splitDocuments.length) {
    throw new Error("No content to create resource");
  }

  console.log(`document ${file.name} has ${splitDocuments.length} chunks`);

  await createResourceAndEmbeddings({
    generateEmbeddings: async () => {
      const generatedEmbeddings = await embedder.embedDocuments(
        splitDocuments.map((doc) => doc.pageContent)
      );
      const embeddings = generatedEmbeddings.map((embedding, index) => ({
        content: splitDocuments[index].pageContent,
        metadata: splitDocuments[index].metadata as any,
        embedding,
      }));
      return embeddings;
    },
    resource: { name: file.name, projectId, type: "pdf" },
  });

  return splitDocuments;
}