import React from "react";
import { UserButton, auth } from "@clerk/nextjs";
import UserHeader from "./UserHeader";
import Image from "next/image";
let pageData = {
  titleHeader: "Chatify- chat to any pdf",
  titleLine: "Get answers from pdf files ",
  description: "Experience best converstions with any pdf!",
  loggedInDesc:
    "Explore your chats to any pdf, choose any pdf file from the list and start converstion",
};

const MainPageHeader = async () => {
  const { userId } = await auth();
  // console.log()
  const isAuthorized = !!userId;
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h1 className="font-serif bg-gradient-to-r from-yellow-300 via-blue-500 to-orange-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl animate-pulse">
        {pageData.titleHeader}
      </h1>
      <div className="font-serif bg-gradient-to-r from-yellow-300 via-blue-500 to-orange-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl sm:block p-1">
        {/* {isAuthorized ? "Hello " + user?.firstName : " "} */}
        {isAuthorized ? <UserHeader /> : pageData.titleLine}
      </div>

      <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed leading-relaxed line-clamp-3">
        {isAuthorized ? pageData.loggedInDesc : pageData.description}
      </p>

      {/* user btn */}
      <div className="mx-auto flex justify-center items-center max-w-xl mt-8">
        {isAuthorized ? <UserButton afterSignOutUrl="/" /> : ""}
      </div>
    </div>
  );
};

export default MainPageHeader;
