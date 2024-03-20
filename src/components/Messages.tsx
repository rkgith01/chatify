import { cn } from "@/lib/utils";
import { Message } from "ai/react";
import { Loader2 } from "lucide-react";
import React from "react";

type Props = {
  messages: Message[];
  isLoading: boolean;
  messageBoxref: React.RefObject<HTMLDivElement>;
};

const Messages = ({ messages, isLoading, messageBoxref }: Props) => {
  if (isLoading) {
    return (
      //  <div className="flex flex-col gap-2 px-4">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loader2 className="animate-spin w-6 h-6" />
      </div>
    );
  }
  if (!messages) return <></>;
  return (
    <div className="flex flex-col gap-2 px-4">
      {messages.map((message) => {
        return (
          <div
            key={message.id}
            className={cn("flex", {
              "justify-end pl-10": message.role === "user",
              "justify-start pr-10": message.role === "assistant",
            })}
          >
            <div
              className={cn(
                "rounded-lg px-3 text-sm py-1 shadow-md ring-1 ring-gray-900/10",
                {
                  "bg-blue-500 text-white": message.role === "user",
                  "bg-gray-700 text-white": message.role === "assistant",
                }
              )}
            >
              <p>{message.content}</p>
              <div ref={messageBoxref}></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
