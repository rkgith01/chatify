import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { loadS3IntoPinecone } from "@/lib/pinecone";
import { gets3Url } from "@/lib/s3";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();

    const { file_key, file_name } = body;
    console.log({ file_key, file_name });
    // const docs = await loadS3IntoPinecone(file_key)
    await loadS3IntoPinecone(file_key);
    const chat_id = await db
      .insert(chats)
      .values({
        fileKey: file_key,
        pdfName: file_name,
        pdfURL: gets3Url(file_key),
        userId,
      })
      .returning({
        insertedId: chats.id,
      });
    return NextResponse.json(
      { chat_id: chat_id[0].insertedId },
      { status: 200 }
    );

    // console.log({docs})
    // return NextResponse.json({docs})
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

// export default POST
