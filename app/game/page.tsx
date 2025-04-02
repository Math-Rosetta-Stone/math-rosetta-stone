"use client";

import { AnimatePresence, motion } from "framer-motion";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUserData } from "../hooks/userdata";
import LoadingAnimation from "@/components/ui/loadinganimation";
import { SelectUser } from "../db/schema";
import { withAuth } from "@/lib/withAuth";

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

async function GamePage({ user }: { user: SelectUser }) {
  const basePath = usePathname();
  const { isLoading } = useUserData();
  if (isLoading) return <LoadingAnimation />;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
          className="flex flex-col items-center justify-center min-h-screen text-center">
          <div className="text-4xl font-black">
            Choose a game and start learning!
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-5">
            {gamesList.map(game => (
              <Link
                href={`${basePath}/${game.route}`}
                className="flex flex-col place-content-center aspect-square p-3
                rounded-xl shadow-sm border border-neutral-300
                text-center text-wrap text-lg font-black
                ease-in duration-200 text-slate-900
                underline underline-offset-2 decoration-dashed decoration-1 decoration-slate-900
                hover:text-slate-50 hover:bg-slate-900 hover:decoration-slate-50">
                {game.name}
              </Link>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default withAuth(GamePage);
