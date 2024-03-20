import { SignIn, SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  let title = "Welcome to Chatify";
  let description =
    "Elevate your conversations with Chatify, the ultimate chat to pdf app seamlessly combining text and PDFs. Effortlessly, discuss, and collaborate on documents within the fluidity of a chat interface.   Revolutionize your communication experience with the power of Chatify powered with OpenAI GPT";

  return (
    <section className="bg-gradient-to-r from-slate-800 to-white dark:bg-gray-900 min-h-screen">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gradient-to-br from-cyan-200 to-orange-500 bg-gray-900  lg:col-span-5 lg:h-full xl:col-span-6">
          {/* <Image
            alt=""
            src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
            width={1920}
            height={1080}
          /> */}

          <div className="hidden lg:relative lg:block lg:p-12">
            <a className="block text-white" href="#">
              <span className="sr-only">Home</span>
              <Image
                src="/logo.png"
                width={100}
                height={100}
                alt="chatify logo"
                className="rounded-full h-[85px] w-[85px]"
              />
            </a>

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              {title}
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">{description}</p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <a
                className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20 dark:bg-gray-900"
                href="#"
              >
                <span className="sr-only">Home</span>
                <Image
                  src="/logo.png"
                  width={100}
                  height={100}
                  alt="chatify logo"
                  className="rounded-full h-[65px] w-[65px]"
                />
              </a>

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
                {title}
              </h1>

              <p className="mt-4 leading-relaxed text-black dark:text-gray-400">
                {description}
              </p>
            </div>
            <div className=" pt-2 mt-2">
              <SignUp />
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
