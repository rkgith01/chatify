import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";
import Image from "next/image";
import SubButton from "./SubButton";

let screenShots = [
  {
    alt: "chatpage image",
    src: "/chatify_1.png",
  },
  {
    alt: "mainpage image",
    src: "/chatify_2.png",
  },
  {
    alt: "chatpage2 image",
    src: "/chatify_4.png",
  },
];
const LoggedOutContent = ({isPro}:{isPro: boolean}) => {
  return (
    <>
      <div className="w-full flex flex-col sm:flex-row md:flex-row lg:flex-row items-center gap-2 justify-center">
        <Link href="/sign-in">
          <Button className="w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto flex items-center justify-center">
            Login to start
            <LogIn className="ml-2 h-5 w-5" />
          </Button>
        </Link>

        <span>or</span>
        <div className="w-[205px]">
          <SubButton isPro={isPro} />
        </div>
      </div>

      <div className="flex items-center flex-col justify-center gap-8 mt-4 md:flex-row md:justify-center">
        {screenShots.map((screenshot, index) => (
          <div key={index} className="rounded-xl w-auto">
            <Image
              alt={`Screenshot ${index + 1}`}
              src={screenshot.src}
              width={750}
              height={750}
              className="rounded-lg"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default LoggedOutContent;
