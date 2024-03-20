import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "@/components/Provider";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chatify",
  description:
    "Elevate your conversations with Chatify, the ultimate chat app seamlessly combining text and PDFs. Effortlessly share, discuss, and collaborate on documents within the fluidity of a chat interface. Revolutionize your communication experience with the power of Chatify.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <Provider>
        <html lang="en">
          <head>
            <link rel="icon" href="/logo.png" />
          </head>
          <body className={inter.className}>
            {children}
            <ToastContainer />
          </body>
        </html>
      </Provider>
    </ClerkProvider>
  );
}
