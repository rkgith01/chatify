import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import UploadFile from "./UploadFile";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import {checkSubscription} from "@/lib/subscription";
import SubButton from "./SubButton";
import { Button } from "./ui/button";

const LoggedInContent = async () => {
  const { userId } = await auth();

  const isPro = await checkSubscription();

  let firstChat;
  if (userId) {
    firstChat = await db.select().from(chats).where(eq(chats.userId, userId));
    if (firstChat) {
      firstChat = firstChat[0];
    }
  }

  return (
    <>
      <div className="w-full flex flex-col sm:flex-row md:flex-row lg:flex-row gap-2 justify-center items-center ">
        {firstChat && (
          <>
            <Link href={`/chat/${firstChat.id}`}>
              <Button className="flex justify-center items-center rounded border border-blue-600 bg-blue-800 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto w-full">
                <span>Go to Chats</span>
                <MessageCircle className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <div className="w-auto">
              <SubButton isPro={isPro} />
            </div>
            {/* <Link
             href={isPro ? "/api/subscription" : "/api/stripe"}
              className="flex items-center justify-center space-x-2"
            >
            </Link> */}
          </>
        )}
      </div>
      <div className="md:w-1/2 w-full">
        <UploadFile />
      </div>
    </>
  );
};

export default LoggedInContent;
