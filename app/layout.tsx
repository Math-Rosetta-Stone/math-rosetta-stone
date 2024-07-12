import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Math Rosetta Stone",
  description: "Learn math in english",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative">
        <div
          className="fixed top-0 flex flex-row justify-start items-center
          w-full h-[6vh] pt-2 px-3 backdrop-blur-sm
          font-black"
        >
          <Link
            href="/"
            className="rounded-md p-1
            ease-in-out duration-200
            text-slate-900
            underline underline-offset-2 decoration-dashed decoration-1 decoration-slate-900
            hover:text-slate-50 hover:bg-slate-900 hover:decoration-slate-50"
          >
            Math Rosetta Stone
          </Link>
        </div>

        {children}
      </body>
    </html>
  );
}
