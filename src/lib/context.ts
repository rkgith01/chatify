import { Pinecone } from "@pinecone-database/pinecone";
import { convertToAscii } from "./utils";
import { getEmbedding } from "./embedding";

export async function getMatchingEmbeddings(
  embeddings: number[],
  fileKey: string
) {
  try {
    const client = new Pinecone({
      //   environment: process.env.PINECONE_ENVIRONMENT!,
      apiKey: process.env.PINECONE_API_KEY!,
    });
    const pineconeIndex = client.index("chatify");
    const namespace = pineconeIndex.namespace(convertToAscii(fileKey));
    const queryResult = await namespace.query({
      topK: 5,
      vector: embeddings,
      includeMetadata: true,
    });

    return queryResult.matches || [];
  } catch (error) {
    console.log("error querying embeddings", error);
    throw error;
  }
}

export async function getContext(query: string, fileKey: string) {

  const queryEmbeddings = await getEmbedding(query);
  const matches = await getMatchingEmbeddings(queryEmbeddings, fileKey);

  const matchingDocs = matches.filter(
    (match) =>  match.score && match.score > 0.7 );

  type Metadata = {
    text: string;
    pageNumber: number;
  };

  let docContext = matchingDocs.map(
    match => (match.metadata as Metadata).text
  );

  return docContext.join("\n").substring(0, 3000); 
}
