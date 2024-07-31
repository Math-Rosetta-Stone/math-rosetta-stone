"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
        className="flex flex-col items-center justify-center text-center"
      >
        <div className="text-4xl font-black">
          Welcome to Math Rosetta Stone
        </div>

        <div className="text-2xl font-black">
          <Link
            href="/login"
            className="ease-in-out duration-200
            text-slate-900 hover:text-slate-200
            hover:drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
            underline underline-offset-2 decoration-dashed decoration-1
            hover:no-underline"
          >
            Login
          </Link> to get back in action! Don't have an account
          ? <Link
            href="/register"
            className="ease-in-out duration-200
            text-slate-900 hover:text-slate-200
            hover:drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
            underline underline-offset-2 decoration-dashed decoration-1
            hover:no-underline"
          >
            Sign up
          </Link> and start learning!
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
