import ChatComp from "@/components/ChatComp";
import Footer from "@/components/Footer";
import PdfViewer from "@/components/PdfViewer";
import SideBar from "@/components/SideBar";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import {checkSubscription} from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    chatId: string;
  };
};

const ChatPage = async ({ params: { chatId } }: Props) => {
  const { userId } = await auth();

  const isPro = await checkSubscription()
  if (!userId) {
    return redirect("/sign-in");
  }
  const chatsToRead = await db
    .select()
    .from(chats)
    .where(eq(chats.userId, userId));

  if (!chatsToRead) {
    return redirect("/");
  }

  if (!chatsToRead.find((chat) => chat.id === parseInt(chatId))) {
    return redirect("/");
  }

  const currentChat = chatsToRead.find((chat) => chat.id === parseInt(chatId));

  return (
    <>
      <div className="flex max-h-screen">
        {/* sidebar */}
        <div className="flex-[1] max-w-xs">
          <SideBar chats={chatsToRead} chatId={parseInt(chatId)} isPro={isPro} />
        </div>
        {/* pdfv viewer */}
        <div className="max-h-screen p-4 overflow-scroll flex-[5]">
          <PdfViewer pdf_url={currentChat?.pdfURL || ""} />
        </div>
        {/* chat component */}
        <div className="flex-[3] border-1-4 border-l-slate-300">
          <ChatComp chatId={parseInt(chatId)} />
        </div>
        {/* footer component */}
      </div>    
      {/* <div className="flex-[3] border-1-4 border-l-slate-300">
        <Footer />
      </div> */}
    </>
  );
};

export default ChatPage;
