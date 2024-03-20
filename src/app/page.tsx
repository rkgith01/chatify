import LoggedInContent from "@/components/LoggedInContent";
import LoggedOutContent from "@/components/LoggedOutContent";
import MainPageHeader from "@/components/MainPageHeader";
import UserHeader from "@/components/UserHeader";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import {checkSubscription} from "@/lib/subscription";
import { UserButton, auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import Image from "next/image";

export default async function Home() {
  const { userId } = await auth();
  const isAuthorized = !!userId;

  const isPro = await checkSubscription()

  let firstChat;
  if (userId) {
    firstChat = await db.select().from(chats).where(eq(chats.userId, userId));
    if (firstChat) {
      firstChat = firstChat[0];
    }
  }

  return (
    <main>
      <section className="min-h-screen bg-cyan-800 text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          {/* go to chats btn & file upload or login */}
          <div className="lg:mr-[4rem]">
            <Image
              src="/logo.png"
              alt="Chatify"
              width={220}
              height={220}
              className="mx-auto rounded-full shadow-2xl mb-2"
            />
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 w-full">
            <MainPageHeader />
            {/* login content go to chats btn  */}
            {isAuthorized && firstChat && <LoggedInContent />}
            {/* login btn screenshots logged-out info */}
            {!isAuthorized && <LoggedOutContent isPro={isPro} />}
          </div>
        </div>
      </section>
      <footer className="bg-cyan-800">
        <p className="text-center text-gray-400 text-xs">
          © 2024 Chatify. All rights reserved.
        </p>
        <p className="text-center text-gray-400 text-[8px]">
          Built by Raj kapadia.
        </p>
      </footer>
    </main>
  );
}
