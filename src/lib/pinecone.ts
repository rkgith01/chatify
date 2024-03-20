import { downloadFroms3 } from "@/lib/s3-server";
import { Pinecone, PineconeRecord, RecordMetadata } from "@pinecone-database/pinecone";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import {
  Document,
  RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";
import { getEmbedding } from "./embedding";
import md5 from "md5";
import { convertToAscii } from "./utils";

// let pinecone: Pinecone | null = null;

// export const getPinecone = async () => {
//   if (!pinecone) {
//     pinecone = new Pinecone({
//       apiKey: process.env.PINECONE_API_KEY!,
//     });
//   }
//  return pinecone
// };

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});
// const index = pc.index("chatify");
// await pc.describeIndex('serverless-index');

type PDFpage = {
  pageContent: string;
  metadata: {
    loc: { pageNumber: number };
  };
};

export const loadS3IntoPinecone = async (fileKey: string) => {
  try {
    console.log("Downloading s3 into file system");

    const file_name = await downloadFroms3(fileKey);

    if (!file_name) {
      throw new Error("File name is undefined after downloading from S3.");
    }

    const loader = new PDFLoader(file_name);
    console.log({ loader });
    const docs = (await loader.load()) as PDFpage[];

    const documents = await Promise.all(docs.map(prepDocs));

    const vectors = await Promise.all(documents.flat().map(embedDocumnet));

    // const pc  = new Pinecone()
    const index = pc.index("chatify");

    const nameSpace = index.namespace(convertToAscii(fileKey))

    await nameSpace.upsert(vectors as PineconeRecord<RecordMetadata>[]);
    
    // return docs.map((doc) => ({ ...doc, metadata: { fileKey } }));
    return documents[0];
  } catch (error) {
    console.error("An error occurred while loading S3 into Pinecone:", error);
    // Handle the error appropriately
    // You might want to re-throw the error or return a specific result
  }
};

async function embedDocumnet(doc: Document) {
  try {
    const embedding = await getEmbedding(doc.pageContent);
    const hash = md5(doc.pageContent);

    return {
      id: hash,
      values: embedding,
      metadata: {
        text: doc.metadata.text,
        pageNumber: doc.metadata.pageNumber,
      },
    } as PineconeRecord;
  } catch (error) {
    console.log("Error embedding document", error);
  }
}

export const truncateString = (str: string, bytes: number) => {
  const enc = new TextEncoder();
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};

async function prepDocs(page: PDFpage) {
  let { pageContent, metadata } = page;
  pageContent = pageContent.replace(/\n/g, "");

  const splitter = new RecursiveCharacterTextSplitter();
  const docs = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: truncateString(pageContent, 36000),
      },
    }),
  ]);
  return docs;
}
