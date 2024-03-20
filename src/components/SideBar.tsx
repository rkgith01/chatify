"use client";
import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { MessageCircle, PlusSquare, SquareGantt, Zap } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import axios from "axios";
import SubButton from "./SubButton";

type Props = {
  chats: DrizzleChat[];
  chatId: number;
  isPro: boolean;
};

const SideBar = ({ chats, chatId, isPro }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleSubscriptions = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/stripe");
      window.location.href = res.data.url;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto  border-r rtl:border-r-0 rtl:border-l bg-gray-900 border-gray-700">
      <Link href="/" className="flex items-center justify-center space-x-2">
        <Image
          className="w-auto h-[100px] rounded-full"
          src="/logo.png"
          alt="logo image"
          width={100}
          height={100}
        />
      </Link>

      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav className="-mx-3 space-y-6 ">
          <div className="space-y-3 ">
            {/* <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">analytics</label> */}
            <Link href="/">
              <Button className="w-full border-separate border-white border">
                <PlusSquare className="h-6 w-6 mr-2" /> New Chat
              </Button>
            </Link>

            <div className="flex flex-col gap-2 mt-4">
              {chats.map((chat) => (
                <Link
                  className={cn(
                    "flex items-center px-3 py-2 text-gray-500 transition-colors duration-300 transform rounded-lg dark:text-gray-200",
                    {
                      "hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200":
                        chat.id !== chatId,
                      "bg-blue-700 text-white": chat.id === chatId,
                    }
                  )}
                  key={chat.id}
                  href={`/chat/${chat.id}`}
                >
                  <MessageCircle className="h-6 w-6 mr-2" />
                  <p>{chat.pdfName}</p>
                </Link>
              ))}
            </div>

            <div className="absolute bottom-4 left-4"></div>
          </div>
        </nav>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-500 flex-wrap w-full">
        <Button
          onClick={handleSubscriptions}
          disabled={loading}
          className={
            isPro
              ? "bg-blue-600 hover:bg-blue-700"
              : "mt-2 rounded border border-blue-600 bg-gradient-to-r from-orange-400 via-cyan-400 to-blue-500  w-full"
          }
        >
          {isPro ? (
            <>
              Manage Subscription
              <SquareGantt color="white" className="ml-2 w-5 h-5 " />
            </>
          ) : (
            <>
              Upgrade to Pro
              <Zap color="black" className="ml-2 w-5 h-5 fill-black" />
            </>
          )}
        </Button>
        {/* <div className="w-2/3">
          <SubButton isPro={isPro} />
        </div> */}
        <div className="flex gap-2">
          <Link href="/home">Home</Link>
          <Link href="/source">Source</Link>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
