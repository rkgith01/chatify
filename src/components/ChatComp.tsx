"use client";
import { MessagesSquare, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { Input } from "./ui/input";

import { useChat } from "ai/react";
import { Button } from "./ui/button";
import Messages from "./Messages";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Message } from "ai";

type Props = { chatId: number };

const ChatComp = ({ chatId }: Props) => {
  const messageBoxref = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const res = await axios.post<Message[]>("/api/get-messages", { chatId });
      return res.data;
    },
  });

  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/chat",
    body: {
      chatId,
    },
    initialMessages: data || [],
  });

  // return (
  //   <div>
  //     <aside className="flex flex-col w-full h-screen px-5 py-8 overflow-y-auto bg-gray-400 border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
  //       <Link href="#" className="flex items-center justify-center space-x-2">
  //         <MessageCircle className="h-6 w-6 mr-2" />
  //         Chats
  //       </Link>

  //       <div className="flex flex-col justify-between flex-1 mt-6">
  //         <nav className="flex-1 -mx-3 space-y-3 ">

  //         </nav>
  //         <Messages messages={messages} isLoading={isLoading}/>

  //         <div className="mt-6">
  //           <div className="relative">
  //             <form
  //               onSubmit={handleSubmit}
  //               className="flex items-center justify-center sticky bottom-0 inset-x-0 rounded"
  //             >
  //               <Input
  //                 className="w-full  text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
  //                 placeholder="Ask any question..?"
  //                 value={input}
  //                 onChange={handleInputChange}
  //               />
  //               <Button className="ml-2 bg-blue-500">
  //                 <Send className="h-[1.5rem] w-auto" />
  //               </Button>
  //             </form>
  //           </div>
  //         </div>
  //       </div>
  //     </aside>
  //   </div>
  // );

  useEffect(() => {
    let div = messageBoxref.current;
    if (div) {
      div.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);
  return (
    <div className="flex flex-col h-screen">
      <aside className="flex flex-col flex-grow px-5 py-8 overflow-y-auto bg-gray-400 border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
        <div className="flex items-center justify-center space-x-2">
          <MessagesSquare className="h-6 w-6 mr-2" />
          Chats
        </div>

        <nav className="flex-1 -mx-3 mt-6">
          <div>
            <Messages
              messages={messages}
              isLoading={isLoading}
              messageBoxref={messageBoxref}
            />
          </div>
        </nav>
      </aside>

      <div className="sticky bottom-0 inset-x-0 bg-slate-400  dark:bg-gray-900 dark:border-gray-600">
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center py-2 px-4"
        >
          <Input
            className="flex-grow text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            placeholder="Ask any question..?"
            value={input}
            onChange={handleInputChange}
          />
          <Button className="ml-2 bg-blue-500">
            <Send className="h-[1.5rem] w-auto" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatComp;
