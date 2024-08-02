"use client";

import { AnimatePresence, motion } from "framer-motion";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const gamesList = [
  {
    name: "Matching",
    route: "matching",
  },
  {
    name: "Hangman",
    route: "hangman",
  },
  {
    name: "Multiple-choice questions",
    route: "mcq",
  },
  {
    name: "Logos quiz",
    route: "logo",
  },
  {
    name: "Fill in the blanks",
    route: "fib",
  },
  {
    name: "Listening",
    route: "listen",
  },
];

export default function Games() {
  const basePath = usePathname();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/user")
      .then((res) => {
        if (res.status === 401) {
          return router.push("/");
        } else if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        setIsLoading(false);
        return res.json()
      });
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
        className="flex flex-col items-center justify-center min-h-screen text-center"
      >
        <div className="text-4xl font-black">
          Choose a game and start learning!
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-5">
          {gamesList.map((game) => (
            <Link
              href={`${basePath}/${game.route}`}
              className="flex flex-col place-content-center aspect-square p-3
              rounded-xl shadow-sm border border-neutral-300
              text-center text-wrap text-lg font-black
              ease-in duration-200 text-slate-900
              underline underline-offset-2 decoration-dashed decoration-1 decoration-slate-900
              hover:text-slate-50 hover:bg-slate-900 hover:decoration-slate-50"
            >
              {game.name}
            </Link>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
